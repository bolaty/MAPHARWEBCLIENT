MapharApp.controller("ClotureDossierController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",

  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.FormListe = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numSinistre: "",
      natureSinistre: "",
    };

    $scope.listeDesPaysOuvertureDSP = [];
    $scope.listeDesVillesOuvertureDSP = [];
    $scope.listeDesCommunesOuvertureDSP = [];
    $scope.listeDesSinistreOuvertureDSP = [];
    $scope.listeOperation = [];
    $scope.listeOuvertureDSP = [];
    $scope.modiftestEnregistrement = [];
    $scope.modifListeVille = [];
    $scope.modifListeCommune = [];
    $scope.testEnregistrement = [];
    $scope.tabEngOuvertureDoc = [];
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT CLOTURE DOSSIER";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDLISTEDOCUMENT = "LISTE DOCUMENT";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDCLOTURE = "CLOTURE";

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

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

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
        $("#idDate").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTempsHeure").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTempsMinute").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idMontant").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idtTel").maxlength({
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

    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation
    $scope.clicRetourListe = function () {
        
      switch ($scope.collectionContartOp.RQ_CODERISQUE) {
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
          case "12":
            window.location.href =
              "#/assurances/operation/liste/MultirisqueImmeuble";
         break;
      }
    };
    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#natureSinistre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut liste des nouveaux sinistres
    $scope.afficheListeOperation = function (
      periodeDu,
      periodeAu,
      numSinistre,
      natureSinistre
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

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

      if (
        periodeDu === "" ||
        periodeDu === undefined ||
        periodeAu === "" ||
        periodeAu === undefined ||
        numSinistre === undefined ||
        natureSinistre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numSinistre === undefined) {
            $("#idNumSin").css("background-color", "#FFE9E0");
          }
          if (natureSinistre === undefined) {
            $("#idNatSinistre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeOperation = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
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
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
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
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listeOperation = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeOperation = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            NS_CODENATURESINISTRE: natureSinistre,
            SI_NUMSINISTRE: numSinistre,
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
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
          .post("/Sinistre/ListeSinistre/", $scope.objet_envoie, {
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
    //fin liste des nouveaux sinistres

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpS", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpS"));
    };
    //fin voir plus

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumSin").css("background-color", "#FFFFFF");
        $("#idNatSinistre").css("background-color", "#FFFFFF");
      });
      $scope.FormListe.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListe.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListe.numSinistre = "";
      $scope.FormListe.natureSinistre = "";
    };
    //fin pour annuler la recherche

    //debut recuperer id pour la clôture du sinistre
    $scope.cloRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la clôture du sinistre

    //debut clôture du sinistre
    $scope.clotureSinistre = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: recupId,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          SI_DATETRANSMISSIONSINISTRE: "01-01-1900",
          SI_DATEVALIDATIONSINISTRE: "01-01-1900",
          SI_DATESUSPENSIONSINISTRE: "01-01-1900",
          SI_DATECLOTURESINISTRE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCLOTURE,
          TYPEOPERATION: "6",
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
        .post("/Sinistre/ActionsSurSinistres/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.elmntCloturerMultirisquePro = reponse.data;
          if (
            $scope.elmntCloturerMultirisquePro[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.ClotureReussie(
              $scope.elmntCloturerMultirisquePro[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.ClotureNonReussie(
              $scope.elmntCloturerMultirisquePro[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.elmntCloturerMultirisquePro[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin clôture du sinistre

    //debut liste des sinitres
    $scope.afficheListeSinistreOuvertureDSP = function () {
      $scope.objet_envoie = [
        {
          NS_CODENATURESINISTRE: "",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Sinistre/ListeNatSinistre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSinistreOuvertureDSP = reponse.data;
        });
    };
    //fin liste des sinistres

    //debut init liste
    $scope.initFormListeClotureDossierSP = function () {
      $scope.afficheListeSinistreOuvertureDSP();
    };
    //fin init liste

    /*FIN DEV JJ*/
  },
]);
