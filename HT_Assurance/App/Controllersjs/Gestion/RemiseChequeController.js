MapharApp.controller("RemiseChequeController", [
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
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    /*DEBUT ZONE DE DECLARATION OVER*/

    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
    };
    $scope.FormAddRemiseCheque = {};
    $scope.listeContrat = [];
    $scope.listeBanqueTire = [];
    $scope.listeBanqueAgence = [];

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
      statut,
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

      if (!statut) {
        $scope.$emit("UNLOAD");
        $rootScope.ChampsNonRenseignescorrect();
      } else if (periodeDu == "" || periodeAu == "") {
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
            TI_NUMTIERS: $rootScope.collectionContartOp.TI_NUMTIERS,
            TI_DENOMINATION: nomSouscrp,
            CA_CODECONTRAT: $rootScope.infocontrat,
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

    // debut bouton de retour
    $scope.boutonRetour = function () {
      if ($rootScope.maPosition === "01") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/multirisque-professionnel";
      } else if ($rootScope.maPosition === "02") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/sante-pharmacien";
      } else if ($rootScope.maPosition === "03") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/individuel-accident";
      } else if ($rootScope.maPosition === "04") {
        window.location.href = "#/gestion/ReglementAssurance/liste/voyage";
      } else if ($rootScope.maPosition === "05") {
        window.location.href = "#/gestion/ReglementAssurance/liste/habitat";
      } else if ($rootScope.maPosition === "06") {
        window.location.href = "#/gestion/ReglementAssurance/liste/auto";
      } else if ($rootScope.maPosition === "07") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/sante-auxiliaire";
      } else if ($rootScope.maPosition === "08") {
        window.location.href = "#/gestion/ReglementAssurance/liste/sante-gesa";
      } else if ($rootScope.maPosition === "09") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/responsabilite-civile";
      } else if ($rootScope.maPosition === "10") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/transport-marchandise";
      }
    };
    // fin bouton de retour

    $scope.initFomrRemiseCheque = function () {
      $scope.afficheListeBanqueTire();
    };

    //debut liste des banques du tiré
    $scope.afficheListeBanqueTire = function () {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: "",
          SL_LIBELLEECRAN: "CHEQUE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "",
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
        .post("/Banque/ListeBanque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueTire = reponse.data;
        });
    };
    //fin liste des banques du tiré

    //debut liste des agences  banques
    $scope.afficheListeBanqueAgence = function (idBqTire) {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: idBqTire,
          SL_LIBELLEECRAN: "CHEQUE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "",
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueAgence = reponse.data;
        });
    };
    //fin liste des  agences de banques

    //debut focus sur le champ
    $scope.desactiverChampRequis = function () {
      $(document).ready(function () {
        $("#idReference").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMontant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEmission").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idBanqueTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAgBanque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomTireur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateReception").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomDeposant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTelDeposant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEffet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idLibellePhoto").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    // debut valider le formulaire de remise de cheque
    $scope.validerFormAddRemiseCheque = function () {
      $scope.$emit("LOAD");
      let typeNumerique = /^([0-9]*)$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequis();

      if ($scope.FormAddRemiseCheque.DateEmission !== undefined) {
        $scope.lAnneeDateEmission =
          $scope.FormAddRemiseCheque.DateEmission.substr(6, 4);
        $scope.leMoisDateEmission =
          $scope.FormAddRemiseCheque.DateEmission.substr(3, 2);
        $scope.leJourDateEmission =
          $scope.FormAddRemiseCheque.DateEmission.substr(0, 2);
      }
      if ($scope.FormAddRemiseCheque.DateReception !== undefined) {
        $scope.lAnneeDateReception =
          $scope.FormAddRemiseCheque.DateReception.substr(6, 4);
        $scope.leMoisDateReception =
          $scope.FormAddRemiseCheque.DateReception.substr(3, 2);
        $scope.leJourDateReception =
          $scope.FormAddRemiseCheque.DateReception.substr(0, 2);
      }
      if ($scope.FormAddRemiseCheque.Effet !== undefined) {
        $scope.lAnneeEffet = $scope.FormAddRemiseCheque.Effet.substr(6, 4);
        $scope.leMoisEffet = $scope.FormAddRemiseCheque.Effet.substr(3, 2);
        $scope.leJourEffet = $scope.FormAddRemiseCheque.Effet.substr(0, 2);
      }

      if (
        $scope.FormAddRemiseCheque.Reference === "" ||
        $scope.FormAddRemiseCheque.Reference === undefined ||
        $scope.FormAddRemiseCheque.Montant === "" ||
        $scope.FormAddRemiseCheque.Montant === undefined ||
        $scope.FormAddRemiseCheque.DateEmission === "" ||
        $scope.FormAddRemiseCheque.DateEmission === undefined ||
        $scope.FormAddRemiseCheque.BanqueTire === "" ||
        $scope.FormAddRemiseCheque.BanqueTire === undefined ||
        $scope.FormAddRemiseCheque.AgBanque === "" ||
        $scope.FormAddRemiseCheque.AgBanque === undefined ||
        $scope.FormAddRemiseCheque.NomTireur === "" ||
        $scope.FormAddRemiseCheque.NomTireur === undefined ||
        $scope.FormAddRemiseCheque.NomTire === "" ||
        $scope.FormAddRemiseCheque.NomTire === undefined ||
        $scope.FormAddRemiseCheque.DateReception === "" ||
        $scope.FormAddRemiseCheque.DateReception === undefined ||
        $scope.FormAddRemiseCheque.NomDeposant === "" ||
        $scope.FormAddRemiseCheque.NomDeposant === undefined ||
        $scope.FormAddRemiseCheque.TelDeposant === "" ||
        $scope.FormAddRemiseCheque.TelDeposant === undefined ||
        $scope.FormAddRemiseCheque.Effet === "" ||
        $scope.FormAddRemiseCheque.Effet === undefined ||
        $scope.FormAddRemiseCheque.LibellePhoto === "" ||
        $scope.FormAddRemiseCheque.LibellePhoto === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddRemiseCheque.Reference === "" ||
            $scope.FormAddRemiseCheque.Reference === undefined
          ) {
            $("#idReference").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner la référence");
          } else if (
            $scope.FormAddRemiseCheque.Montant === "" ||
            $scope.FormAddRemiseCheque.Montant === undefined
          ) {
            $("#idMontant").css("background-color", "#FFE9E0");
            $rootScope.Message(
              "Veuillez renseigner un montant ou un montant correct"
            );
          } else if (
            $scope.FormAddRemiseCheque.DateEmission === "" ||
            $scope.FormAddRemiseCheque.DateEmission === undefined
          ) {
            $("#idDateEmission").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner la date d'émission");
          } else if (
            $scope.FormAddRemiseCheque.BanqueTire === "" ||
            $scope.FormAddRemiseCheque.BanqueTire === undefined
          ) {
            $("#idBanqueTire").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner la banque du tiré");
          } else if (
            $scope.FormAddRemiseCheque.AgBanque === "" ||
            $scope.FormAddRemiseCheque.AgBanque === undefined
          ) {
            $("#idAgBanque").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner l'agence");
          } else if (
            $scope.FormAddRemiseCheque.NomTireur === "" ||
            $scope.FormAddRemiseCheque.NomTireur === undefined
          ) {
            $("#idNomTireur").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner le nom du tireur");
          } else if (
            $scope.FormAddRemiseCheque.NomTire === "" ||
            $scope.FormAddRemiseCheque.NomTire === undefined
          ) {
            $("#idNomTire").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner le nom du tiré");
          } else if (
            $scope.FormAddRemiseCheque.DateReception === "" ||
            $scope.FormAddRemiseCheque.DateReception === undefined
          ) {
            $("#idDateReception").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner la date de réception");
          } else if (
            $scope.FormAddRemiseCheque.NomDeposant === "" ||
            $scope.FormAddRemiseCheque.NomDeposant === undefined
          ) {
            $("#idNomDeposant").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner le nom du déposant");
          } else if (
            $scope.FormAddRemiseCheque.TelDeposant === "" ||
            $scope.FormAddRemiseCheque.TelDeposant === undefined
          ) {
            $("#idTelDeposant").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner le téléphone du déposant");
          } else if (
            $scope.FormAddRemiseCheque.Effet === "" ||
            $scope.FormAddRemiseCheque.Effet === undefined
          ) {
            $("#idEffet").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner la date d'effet");
          } else if (
            $scope.FormAddRemiseCheque.LibellePhoto === "" ||
            $scope.FormAddRemiseCheque.LibellePhoto === undefined
          ) {
            $("#idLibellePhoto").css("background-color", "#FFE9E0");
            $rootScope.Message("Veuillez renseigner le libellé de la photo");
          }
        });
      } else {
        // appel du service web ici
      }
    };
    // fin valider le formulaire de remise de cheque
  },
]);
