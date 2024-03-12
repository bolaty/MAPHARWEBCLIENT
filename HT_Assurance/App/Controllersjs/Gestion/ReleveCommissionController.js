MapharApp.controller("ReleveCommissionController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",

  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.infocontrat = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );
    $scope.collectionContart = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    /* $scope.collectionContart = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    ); */
    console.log($scope.collectionContart);

    /*DEBUT ZONE DE DECLARATION OVER*/

    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
    };

    $scope.listeContrat = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";

    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken

    /*FIN ZONE DE DECLARATION*/
    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    /*DEBUT FONCTION GENERALE*/
    //debut test sur les date
    $scope.dateSuperioriteDebut = function (dateDebut) {
      if (dateDebut != "") {
        let nouvelleDate = new Date();
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    $scope.dateSuperioriteFin = function (dateFin) {
      if (dateFin != "") {
        let nouvelleDate = new Date();
        nouvelleDate.setFullYear(dateFin.substr(6, 4));
        nouvelleDate.setMonth(dateFin.substr(3, 2));
        nouvelleDate.setDate(dateFin.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    //fin test sur les date

    //debut notification champs non renseigné

    //fin notification champs non renseigné

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV OVER*/
    console.log($rootScope.infocontrat);

    //debut afficher liste Auto
    $scope.afficheListeContrat = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      $scope.lAnneePeriodeDu = periodeDu.substr(6, 4);
      $scope.leMoisPeriodeDu = periodeDu.substr(3, 2);
      $scope.leJourPeriodeDu = periodeDu.substr(0, 2);
      $scope.lAnneeperiodeAu = periodeAu.substr(6, 4);
      $scope.leMoisperiodeAu = periodeAu.substr(3, 2);
      $scope.leJourperiodeAu = periodeAu.substr(0, 2);

      if (periodeDu == "" || periodeAu == "") {
        $scope.$emit("UNLOAD");
        $rootScope.DateNonRenseignes();
        $scope.listeContrat = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leMoisPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeContrat = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeContrat = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: "",
            TI_DENOMINATION: nomSouscrp,
            CA_CODECONTRAT: $scope.collectionContart.CA_CODECONTRAT,
            MS_NUMPIECE: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            DATEJOURNEE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            NO_CODENATUREOPERATION: "",
            SL_LIBELLEECRAN: "RELEVE COMMISSION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "RELEVECOMMISSION",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];

        $http
          .post("/Sinistre/ListeReleveCommission/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContrat = reponse.data;
            $scope.nombreInfoBulle = $scope.listeContrat.length;
            console.log($scope.listeContrat);
            if ($scope.listeContrat[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeContrat[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste Auto
    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.$emit("LOAD");
      $scope.FormList = {
        periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
        periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
        numPolice: "",
        numSouscripteur: "",
        nomSouscripteur: "",
      };
      $scope.$emit("UNLOAD");
    };

    // bouton de retour
    $scope.retour = function () {
      if ($rootScope.libelleMenu == "assurance") {
        if ($rootScope.ecranCible == "operationOn") {
          switch ($rootScope.maPosition) {
            case "01":
              window.location.href =
                "#/assurances/operation/liste/multirisque-professionnel";
              break;
            case "02":
              window.location.href =
                "#/assurances/operation/liste/sante-pharmacien";
              break;
            case "03":
              window.location.href =
                "#/assurances/operation/liste/individuel-accident";
              break;
            case "04":
              window.location.href = "#/assurances/operation/liste/voyage";
              break;
            case "05":
              window.location.href = "#/assurances/operation/liste/habitat";
              break;
            case "06":
              window.location.href = "#/assurances/operation/liste/auto";
              break;
            case "07":
              window.location.href =
                "#/assurances/operation/liste/sante-auxiliaire";
              break;
            case "08":
              window.location.href = "#/assurances/operation/liste/sante-gesa";
              break;
            case "09":
              window.location.href =
                "#/assurances/operation/liste/responnsabilite-civile";
              break;
            case "10":
              window.location.href =
                "#/assurances/operation/liste/trasport-marchadise";
              break;
          }
        } else {
          switch ($rootScope.maPosition) {
            case "01":
              window.location.href =
                "#/assurances/relance/liste/multirisque_professionnel";
              break;
            case "02":
              window.location.href =
                "#/assurances/relance/liste/sante_pharmacien";
              break;
            case "03":
              window.location.href =
                "#/assurances/relance/liste/individuel_accident";
              break;
            case "04":
              window.location.href = "#/assurances/relance/liste/voyage";
              break;
            case "05":
              window.location.href = "#/assurances/relance/liste/habitat";
              break;
            case "06":
              window.location.href = "#/assurances/relance/liste/auto";
              break;
            case "07":
              window.location.href =
                "#/assurances/relance/liste/sante_auxiliaire";
              break;
            case "08":
              window.location.href = "#/assurances/relance/liste/sante_gesa";
              break;
            case "09":
              window.location.href =
                "#/assurances/relance/liste/responsabilite_civile";
              break;
            case "10":
              window.location.href =
                "#/assurances/relance/liste/transport_marchandise";
              break;
          }
        }
      } else {
        if ($rootScope.retourSitTiersAssureur == "2") {
          window.location.href = "#/Tiers/SituationDesAssureurs";
        } else if ($rootScope.retourSitTiersAssureur == "1") {
          window.location.href = "#/assurances-gestion/Tiers/SituationTiers";
        } else if ($rootScope.retourSitTiersAssureur == "4") {
          window.location.href = "#/Tiers/SituationDesCommerciaux";
        } /* else {
          window.location.href =
            "#/assurances/operation/liste/multirisque-professionnel";
        } */
      }
    };

    $scope.retourDuReleveCommission = function () {
      if ($rootScope.retourSitTiersAssureur == "2") {
        window.location.href = "#/Tiers/SituationDesAssureurs";
      } else if ($rootScope.retourSitTiersAssureur == "1") {
        window.location.href = "#/assurances-gestion/Tiers/SituationTiers";
      } else if ($rootScope.retourSitTiersAssureur == "3") {
        switch ($scope.collectionContart.RQ_CODERISQUE) {
          case "01":
            window.location.href =
              "#/gestion/ReglementAssurance/liste/multirisque-professionnel";
            break;
          case "02":
            window.location.href =
              "#/gestion/ReglementAssurance/liste/sante-pharmacien";
            break;
          case "03":
            window.location.href =
              "#/gestion/ReglementAssurance/liste/individuel-accident";
            break;
          case "04":
            window.location.href = "#/gestion/ReglementAssurance/liste/voyage";
            break;
          case "05":
            window.location.href = "#/gestion/ReglementAssurance/liste/habitat";
            break;
          case "06":
            window.location.href = "#/gestion/ReglementAssurance/liste/auto";
            break;
          case "07":
            window.location.href =
              "#/gestion/ReglementAssurance/liste/sante-auxiliaire";
            break;
          case "08":
            window.location.href =
              "#/gestion/ReglementAssurance/liste/sante-gesa";
            break;
          case "09":
            window.location.href =
              "#/gestion/ReglementAssurance/liste/responsabilite-civile";
            break;
          case "10":
            window.location.href =
              "#/gestion/ReglementAssurance/liste/transport-marchandise";
            break;
        }
      } else {
        window.location.href =
          "#/assurances/operation/liste/multirisque-professionnel";
      }
    };
  },
]);
