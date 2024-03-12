MapharApp.controller("ReglementAssuranceIndividuelAccidentController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $scope.FormListReglAssur = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
    };
    $scope.objet_envoie = [];
    $scope.listeOperation = [];
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT MULTIRISQUE PROFESSIONNEL";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    //debut test sur les date
    $scope.dateSuperioriteDebut = function (dateDebut) {
      if (dateDebut !== "") {
        let nouvelleDate = new Date(dateDebut);
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    $scope.dateSuperioriteFin = function (dateFin) {
      if (dateFin !== "") {
        let nouvelleDate = new Date(dateFin);
        nouvelleDate.setFullYear(dateFin.substr(6, 4));
        nouvelleDate.setMonth(dateFin.substr(3, 2));
        nouvelleDate.setDate(dateFin.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    //fin test sur les date

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idPeriodeDu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPeriodeAu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
      };

      return {
        // public functions
        init: function () {
          demos();
        },
      };
    })();

    jQuery(document).ready(function () {
      KTBootstrapMaxlength.init();
    });
    //debut limite des champs

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut afficher liste individuel accident
    $scope.afficheListeReglAssurance = function (
      statut,
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]+$/;
      let typeAlphaNumerique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      if (periodeDu !== undefined) {
        $scope.lAnneePeriodeDu = periodeDu.substr(6, 4);
        $scope.leMoisPeriodeDu = periodeDu.substr(3, 2);
        $scope.leJourPeriodeDu = periodeDu.substr(0, 2);
      }
      if (periodeAu !== undefined) {
        $scope.lAnneeperiodeAu = periodeAu.substr(6, 4);
        $scope.leMoisperiodeAu = periodeAu.substr(3, 2);
        $scope.leJourperiodeAu = periodeAu.substr(0, 2);
      }

      if (!statut) {
        $scope.$emit("UNLOAD");
        $rootScope.ChampsListeInvalide();
        $scope.listeOperation = "";
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
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeOperation = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeOperation = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            RQ_CODERISQUE: "03",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "03",
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
          .post("/Contrat/ListeContratSansAccessoir/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeOperation = reponse.data;
            if (
              $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeOperation[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste individuel accident

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpOpMultirisquePro", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpOpMultirisquePro")
      );
    };
    //fin voir plus

    //debut autre option
    $scope.autreOption = function (collContrat, infoContrat) {
      localStorage.setItem(
        "CollReglementMultirisquePro",
        JSON.stringify(collContrat)
      );
      localStorage.setItem(
        "vpOpMultirisqueProinfocontrat",
        JSON.stringify(infoContrat)
      );
    };
    //fin autre option

    //debut annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.FormListReglAssur.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListReglAssur.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListReglAssur.numPolice = "";
      $scope.FormListReglAssur.numSouscripteur = "";
      $scope.FormListReglAssur.nomSouscripteur = "";
      $scope.FormListReglAssur.numCommercial = "";
      $scope.FormListReglAssur.nomCommercial = "";
    };
    //debut annuler la recherche

    //debut aller a relévé Client
    $scope.redirectReleveClient = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/individuel-accident/liste/releve-client";
    };
    //fin aller a relévé Client

    //debut aller a relévé Commission Assurance
    $scope.redirectReleveCommissionAssurance = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/individuel-accident/liste/releve-commission-assurance";
    };
    //fin aller a relévé Commission Assurance

    //debut aller a Règlement facture client
    $scope.redirectReglementFactureClient = function () {
      $rootScope.retourListe = "individuelAccident";
      window.location.href =
        "#/gestion/ReglementAssurance/individuel-accident/liste/reglement-facture-client";
    };
    //fin aller a Règlement facture client

    //debut aller a Règlement Commission Assurance
    $scope.redirectReglementCommissionAssurance = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/individuel-accident/liste/reglement-commission-assurance";
    };
    //fin aller a Règlement Commission Assurance

    //debut aller a Règlement Commission COMMERCIAUX
    $scope.redirectReglementCommissionCommerciaux = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/individuel-accident/liste/reglement-commission-commerciaux";
    };
    //fin aller a Règlement Commission COMMERCIAUX

    //debut aller a remise chèque sinitre
    $scope.redirectRemiseChequeSinistre = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/individuel-accident/liste/remise-cheque-sinitre";
    };
    //fin aller a remise chèque sinitre

    //debut aller afficher règlement chèque
    $scope.redirectAfficherReglementCheque = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/individuel-accident/liste/afficher-reglement-cheque";
    };
    //debut annuler la recherche

    /*FIN DEV JJ*/
  },
]);
