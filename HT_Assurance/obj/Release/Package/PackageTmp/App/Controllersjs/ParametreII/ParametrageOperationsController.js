MapharApp.controller("ParametrageOperationsController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $rootScope.DATE_EX_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    console.log($rootScope.DATE_EX_EXERCICE);

    /*DEBUT ZONE DE DECLARATION*/

    $scope.formParamFamilleOp = {
      code: "",
      nomFamille: "",
      natureFamille: "",
      numeroOrdre: "0",
    };
    $scope.verouCode = true;
    $scope.objet_envoie = [];
    $scope.listeParametrageFamilleOperation = [];
    $scope.tabEngParamFamilleOperation = [];
    $scope.etatEcran = "";
    console.log($scope.etatEcran);
    $scope.listeSuppression = [];
    $scope.listeComboFamilleOperation = [];
    $scope.formParamOperationsTresoreries = {
      codeFamilleOperation: "",
      code: "",
      libelle: "",
      abreviation: "",
      journal: "",
      typeOperation: "",
      natureCompte: "",
      numCompteId: "",
      numCompteLibelle: "",
      numCompteNum: "",
      sens: "",
      montantDefaut: "",
      autoriserModifMontant: "O",
      numOrdre: "",
    };
    $scope.listeParametrageOperationsTresoreries = [];
    $scope.listeComboJournal = [];
    $scope.listeComboNatureCompte = [];
    $scope.listeComboSens = [];
    $scope.listeChampNumeroCompte = [];
    $scope.cpt = 0;
    $scope.tabEngParamOperationsTresoreries = [];
    $scope.listeComboTypeOperation = [];

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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    // debut init liste
    $scope.initListeParamFamilleOperation = function () {
      $scope.afficheListeFamilleOperation();
    };
    // fin init liste

    // debut init liste
    $scope.initListeParamOperationSys = function () {
      $scope.afficheListeParamOperationsSysteme();
    };
    // fin init liste

    // debut init enregistrement famille operation
    $scope.initEngParamFamilleOperation = function () {
      $scope.chargerComboNatureFamille();
    };
    // fin init enregistrement famille operation

    // debut init modification famille operation
    $scope.initModifParamFamilleOperation = function () {
      $scope.etatEcran = "2";
      $scope.chargerComboNatureFamille();
    };
    // fin init modification famille operation

    // debut init enregistrement operations tresoreries
    $scope.initEngParamOperationsTresoreries = function () {
      $scope.cpt = 1;
      console.log($scope.formParamOperationsTresoreries.codeFamilleOperation);
      $scope.formParamOperationsTresoreries.montantDefaut = "0";
      $scope.formParamOperationsTresoreries.numOrdre = "0";
      $scope.testChampTypeOp();
    };
    // fin init enregistrement operations tresoreries

    // debut init modification operations tresoreries
    $scope.initModifParamOperationsTresoreries = function () {
      $scope.etatEcran = "2";
      $scope.testChampTypeOp();
    };
    // fin init modification operations tresoreries

    // debut init liste
    $scope.initListeParamOperationsTresoreriesListe = function () {
      $scope.chargerComboFamilleOperation();
    };
    // fin init liste

    // debut init liste
    $scope.initListeParamOperationsTresoreriesTiersListe = function () {
      $scope.chargerComboFamilleOperationPOTT();
    };
    // fin init liste

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    // debut focus sur le champ
    $scope.desactiverChampRquisParamFamOperation = function () {
      $(document).ready(function () {
        $("#idCode").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomFamille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatureFamille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumeroOrdre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    // fin focus sur le champ

    //debut afficher liste parametrage famille operation
    $scope.afficheListeFamilleOperation = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post(
          "/ParametrageFamilleOperation/ListeParamFamilleOperation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeParametrageFamilleOperation = reponse.data;
          if (
            $scope.listeParametrageFamilleOperation[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeParametrageFamilleOperation[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
        });
    };
    //fin afficher liste parametrage famille operation

    // debut voir l'etat de l'ecran
    $scope.allerAModificationFamOperation = function (info) {
      // creer la session
      sessionStorage.setItem("ligneSelectionnee", JSON.stringify(info));

      // redirection sur la page de modification
      window.location.href =
        "#/parametre2/parametrageOperations/parametrageFamillesOperations/modification";
    };
    // fin voir l'etat de l'ecran

    // debut voir l'etat de l'ecran
    $scope.allerAModificationOpTresorerie = function (info, item) {
      // creer les sessions pour la ligne selectionnée et l'ecran en cours
      sessionStorage.setItem("ligneSelectionnee", JSON.stringify(info));
      sessionStorage.setItem("valeurBtnEng", item);

      if (item == "paramOpTre") {
        // redirection sur la page de modification
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageOperationsTresorerie/modification";
      } else if (item == "paramOpTreTiers") {
        // redirection sur la page de modification
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageOperationsTresorerieTiers/modification";
      } else {
        // redirection sur la page de modification
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageOperationsSysteme/modification";
      }
    };
    // fin voir l'etat de l'ecran

    // debut focus sur le champ
    $scope.desactiverChampRquisOperationsTreListe = function () {
      $(document).ready(function () {
        $("#idNatureFamOp").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    // fin focus sur le champ

    // debut aller a la page d'enregistrement
    $scope.btnEnregistre = function (index) {
      $scope.$emit("LOAD");
      sessionStorage.setItem("valeurBtnEng", index);
      if (index == "famOp") {
        $scope.formParamFamilleOp = {};
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageFamillesOperations/enregistrement";
        $scope.$emit("UNLOAD");
      } else if (index == "paramOpTre") {
        $scope.desactiverChampRquisOperationsTreListe();
        if (
          $scope.formParamOperationsTresoreries.codeFamilleOperation == "" ||
          $scope.formParamOperationsTresoreries.codeFamilleOperation ==
            undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idNatureFamOp").css("background-color", "#FFE9E0");
          $scope.messageErreur = "Veuillez sélectionner une famille opération";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          console.log(
            $scope.formParamOperationsTresoreries.codeFamilleOperation
          );
          window.location.href =
            "#/parametre2/parametrageOperations/parametrageOperationsTresorerie/enregistrement";
          $scope.$emit("UNLOAD");
        }
      } else if (index == "paramOpSys") {
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageOperationsSysteme/enregistrement";
        $scope.$emit("UNLOAD");
      } else {
        $scope.desactiverChampRquisOperationsTreListe();
        if (
          $scope.formParamOperationsTresoreries.codeFamilleOperation == "" ||
          $scope.formParamOperationsTresoreries.codeFamilleOperation ==
            undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idNatureFamOp").css("background-color", "#FFE9E0");
          $scope.messageErreur = "Veuillez sélectionner une famille opération";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          console.log(
            $scope.formParamOperationsTresoreries.codeFamilleOperation
          );
          window.location.href =
            "#/parametre2/parametrageOperations/parametrageOperationsTresorerieTiers/enregistrement";
          $scope.$emit("UNLOAD");
        }
      }
    };
    // fin aller a la page d'enregistrement
    $scope.verifnaturecompte = function () {
      $scope.verouNumCompte = true
     
      if($scope.formParamOperationsTresoreries.natureCompte == undefined || $scope.formParamOperationsTresoreries.natureCompte == "" || $scope.formParamOperationsTresoreries.natureCompte == null){
        $scope.verouNumCompte = false
      }else{
        $scope.formParamOperationsTresoreries.numCompteNum = 0
      }
    }
    $scope.verifnumcompte = function () {
     // $scope.verouNumCompte = true
     
      if($scope.formParamOperationsTresoreries.numCompteNum == undefined || $scope.formParamOperationsTresoreries.numCompteNum == "" || $scope.formParamOperationsTresoreries.numCompteNum == null){
     ///   $scope.verouNumCompte = false
      }else{
        $scope.formParamOperationsTresoreries.natureCompte = ""
      }
    }
    // debut enregistrement du parametrage famille operation
    $scope.validerParamFamilleOperation = function () {
      let typeNumerique = /^[0-9]+$/;

      $scope.desactiverChampRquisParamFamOperation();

      if (
        $scope.formParamFamilleOp.nomFamille === "" ||
        $scope.formParamFamilleOp.nomFamille === undefined ||
        $scope.formParamFamilleOp.natureFamille === "" ||
        $scope.formParamFamilleOp.natureFamille === undefined ||
        $scope.formParamFamilleOp.numeroOrdre === "" ||
        $scope.formParamFamilleOp.numeroOrdre === undefined
      ) {
        $(document).ready(function () {
          if (
            $scope.formParamFamilleOp.nomFamille === "" ||
            $scope.formParamFamilleOp.nomFamille === undefined
          ) {
            $("#idNomFamille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamFamilleOp.natureFamille === "" ||
            $scope.formParamFamilleOp.natureFamille === undefined
          ) {
            $("#idNatureFamille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamFamilleOp.numeroOrdre === "" ||
            $scope.formParamFamilleOp.numeroOrdre === undefined
          ) {
            $("#idNumeroOrdre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
      } else if (
        typeNumerique.test($scope.formParamFamilleOp.numeroOrdre) == false
      ) {
        $("#idNumeroOrdre").css("background-color", "#FFE9E0");
        $scope.messageErreur = "Veuillez renseigner un numéro d'ordre correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.$emit("LOAD");

        if ($scope.etatEcran == "2") {
          $scope.FO_CODEFAMILLEOPERATION = $scope.formParamFamilleOp.code;
          $scope.appelServiceWeb = "ModifParamFamilleOperation";
        } else {
          $scope.FO_CODEFAMILLEOPERATION = "";
          $scope.appelServiceWeb = "AjoutParamFamilleOperation";
        }

        $scope.objet_envoie = [
          {
            FO_CODEFAMILLEOPERATION: $scope.FO_CODEFAMILLEOPERATION,
            FO_LIBELLEFAMILLEOPERATION: $scope.formParamFamilleOp.nomFamille,
            NF_CODENATUREFAMILLEOPERATION:
              $scope.formParamFamilleOp.natureFamille,
            FO_NUMEROORDRE: $scope.formParamFamilleOp.numeroOrdre,
            SL_LIBELLEECRAN: "Parametrage famille operation",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
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
          .post(
            "/ParametrageFamilleOperation/" + $scope.appelServiceWeb,
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.tabEngParamFamilleOperation = reponse.data;
            if (
              $scope.tabEngParamFamilleOperation[0].clsObjetRetour
                .SL_RESULTAT === "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.tabEngParamFamilleOperation[0].clsObjetRetour.SL_MESSAGE
              );
              if ($scope.etatEcran == "2") {
                $scope.etatEcran = "";
                $scope.RetourSurListe = function () {
                  window.location.href =
                    "#/parametre2/parametrageOperations/parametrageFamillesOperations/liste";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.reinitialiser();
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.tabEngParamFamilleOperation[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.tabEngParamFamilleOperation[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    // fin enregistrement du parametrage famille operation

    // debut reinitialisation de la page
    $scope.reinitialiser = function () {
      // desactiver les champs marqués en rouge
      $("#idCode").css("background-color", "#EDEDED");
      $("#idNomFamille").css("background-color", "#FFFFFF");
      $("#idNatureFamille").css("background-color", "#FFFFFF");
      $("#idNumeroOrdre").css("background-color", "#FFFFFF");

      // vider les champs
      $scope.formParamFamilleOp = {};

      // les valeurs par defaut du numero ordre
      $scope.formParamFamilleOp.numeroOrdre = "0";
    };
    // fin reinitialisation de la page

    // debut recuperation de l'id de l'element a supprimer
    $scope.elementASupprimer = function (idElementSuppr) {
      $scope.aSupprimer = idElementSuppr.FO_CODEFAMILLEOPERATION;
    };
    // debut recuperation de l'id de l'element a supprimer

    // debut recuperation de l'id de l'element a supprimer
    $scope.elementASupprimerOT = function (idElementSuppr) {
      $scope.aSupprimer = idElementSuppr.NO_CODENATUREOPERATION;
    };
    // debut recuperation de l'id de l'element a supprimer

    // debut suppression de la liste famille operation
    $scope.supprimer = function (indexASupprimer) {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          FO_CODEFAMILLEOPERATION: indexASupprimer,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post(
          "/ParametrageFamilleOperation/SupprimerParamFamilleOperation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeSuppression = reponse.data;
          if (
            $scope.listeSuppression[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeSuppression[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.listeSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            setTimeout(() => {
              $scope.afficheListeFamilleOperation();
            }, 3600);
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeSuppression[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    // fin suppression de la liste famille operation

    // debut suppression de la liste operations tresoreries
    $scope.supprimerOT = function (indexASupprimer) {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          NO_CODENATUREOPERATION: indexASupprimer,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post(
          "/ParametrageOperationsTresoreries/SupprimerParamOperationsTresoreries/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeSuppression = reponse.data;
          if (
            $scope.listeSuppression[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeSuppression[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.listeSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            if (sessionStorage.getItem("valeurBtnEng") == "paramOpTre") {
              setTimeout(() => {
                $scope.afficheListeParamOperationsTresoreries();
              }, 3600);
            } else if (sessionStorage.getItem("valeurBtnEng") == "paramOpSys") {
              setTimeout(() => {
                $scope.afficheListeParamOperationsSysteme();
              }, 3600);
            } else {
              setTimeout(() => {
                $scope.afficheListeParamOperationsTresoreriesTiers();
              }, 3600);
            }
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeSuppression[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    // fin suppression de la liste operations tresoreries

    //debut charger combo famille operation
    $scope.chargerComboFamilleOperation = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          NF_CODENATUREFAMILLEOPERATION: "01",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post(
          "/ParametrageOperationsTresoreries/ComboFamilleOperation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeComboFamilleOperation = reponse.data;
          console.log($scope.listeComboFamilleOperation);

          $scope.$emit("UNLOAD");
        });
    };
    //fin charger combo famille operation

    //debut charger combo famille operation POTT
    $scope.chargerComboFamilleOperationPOTT = function () {
      $scope.objet_envoie = [
        {
          NF_CODENATUREFAMILLEOPERATION: "02",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post(
          "/ParametrageOperationsTresoreries/ComboFamilleOperation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeComboFamilleOperation = reponse.data;
          console.log($scope.listeComboFamilleOperation);
        });
    };
    //fin charger combo famille operation POTT

    //debut charger champ numero compte
    $scope.leChargement = true;
    $scope.chargerNumeroCompte = function () {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: "",
          NC_CODENATURECOMPTE:
            $scope.formParamOperationsTresoreries.natureCompte,
          SL_LIBELLEECRAN: "Parametrage operations tresoreries",
          SL_LIBELLEMOUCHARD: "champ numero compte",
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
        .post(
          "/ParametrageOperationsTresoreries/ChampNumeroCompte/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeChampNumeroCompte = reponse.data;
          $scope.leChargement = false;
          console.log($scope.listeChampNumeroCompte);
        });
    };
    //fin charger champ numero compte

    //debut afficher liste parametrage des operations de tresorerie
    $scope.afficheListeParamOperationsTresoreries = function () {
      if (
        $scope.formParamOperationsTresoreries.codeFamilleOperation == "" ||
        $scope.formParamOperationsTresoreries.codeFamilleOperation == undefined
      ) {
        $scope.listeParametrageOperationsTresoreries = [];
      } else {
        sessionStorage.setItem(
          "leCodeFamilleOperation",
          JSON.stringify(
            $scope.formParamOperationsTresoreries.codeFamilleOperation
          )
        );
        console.log($scope.formParamOperationsTresoreries.codeFamilleOperation);
        $scope.$emit("LOAD");

        $scope.objet_envoie = [
          {
            NF_CODENATUREFAMILLEOPERATION: "01",
            FO_CODEFAMILLEOPERATION:
              $scope.formParamOperationsTresoreries.codeFamilleOperation,
            ET_TYPEETAT1: "02",
            SL_LIBELLEECRAN: "Liste parametrage des operations de tresoreries",
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
          .post(
            "/ParametrageOperationsTresoreries/ListeParamOperationsTresoreries/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeParametrageOperationsTresoreries = reponse.data;
            console.log($scope.listeParametrageOperationsTresoreries);
            if (
              $scope.listeParametrageOperationsTresoreries[0].clsObjetRetour
                .SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeParametrageOperationsTresoreries[0].clsObjetRetour
                  .SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste parametrage des operations de tresorerie

    //debut afficher liste parametrage des operations de tresorerie tiers
    $scope.afficheListeParamOperationsTresoreriesTiers = function () {
      if (
        $scope.formParamOperationsTresoreries.codeFamilleOperation == "" ||
        $scope.formParamOperationsTresoreries.codeFamilleOperation == undefined
      ) {
        $scope.listeParametrageOperationsTresoreries = [];
      } else {
        sessionStorage.setItem(
          "leCodeFamilleOperation",
          JSON.stringify(
            $scope.formParamOperationsTresoreries.codeFamilleOperation
          )
        );
        console.log($scope.formParamOperationsTresoreries.codeFamilleOperation);
        $scope.$emit("LOAD");

        $scope.objet_envoie = [
          {
            NF_CODENATUREFAMILLEOPERATION: "02",
            FO_CODEFAMILLEOPERATION:
              $scope.formParamOperationsTresoreries.codeFamilleOperation,
            ET_TYPEETAT1: "02",
            SL_LIBELLEECRAN:
              "Liste parametrage des operations de tresoreries tiers",
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
          .post(
            "/ParametrageOperationsTresoreries/ListeParamOperationsTresoreries/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeParametrageOperationsTresoreries = reponse.data;
            console.log($scope.listeParametrageOperationsTresoreries);
            if (
              $scope.listeParametrageOperationsTresoreries[0].clsObjetRetour
                .SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeParametrageOperationsTresoreries[0].clsObjetRetour
                  .SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste parametrage des operations de tresorerie tiers

    //debut afficher liste parametrage des operations systeme
    $scope.afficheListeParamOperationsSysteme = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          NF_CODENATUREFAMILLEOPERATION: "",
          FO_CODEFAMILLEOPERATION: "",
          ET_TYPEETAT1: "03",
          SL_LIBELLEECRAN: "Liste parametrage des operations de systeme",
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
        .post(
          "/ParametrageOperationsTresoreries/ListeParamOperationsTresoreries/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeParametrageOperationsTresoreries = reponse.data;
          console.log($scope.listeParametrageOperationsTresoreries);
          if (
            $scope.listeParametrageOperationsTresoreries[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeParametrageOperationsTresoreries[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
        });
    };
    //fin afficher liste parametrage des operations systeme

    // debut focus sur le champ
    $scope.desactiverChampRquisParamOperationsTre = function () {
      $(document).ready(function () {
        $("#idLibelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAbreviation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idJournal").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeOperation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMontantDefaut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumOrdre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSens").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    // fin focus sur le champ

    // cocher la case
    $scope.cocherLaCase = function (item) {
      if (item == "O") {
        return true;
      }
    };
    // cocher la case

    // debut case a cocher
    $scope.testValAMM = function (item) {
      if ($scope.cpt == 0) {
        $scope.formParamOperationsTresoreries.autoriserModifMontant = "O";
        $scope.cpt++;
      } else {
        $scope.formParamOperationsTresoreries.autoriserModifMontant = "N";
        $scope.cpt = 0;
      }
      console.log($scope.formParamOperationsTresoreries.autoriserModifMontant);
    };
    //  debut case a cocher

    // debut enregistrement du parametrage operations tresoreries (a terminer)
    $scope.validerParamOperationsTresoreries = function () {
      let typeNumerique = /^[0-9]+$/;

      $scope.desactiverChampRquisParamOperationsTre();

      if (
        $scope.formParamOperationsTresoreries.libelle === "" ||
        $scope.formParamOperationsTresoreries.libelle === undefined ||
        $scope.formParamOperationsTresoreries.abreviation === "" ||
        $scope.formParamOperationsTresoreries.abreviation === undefined ||
        $scope.formParamOperationsTresoreries.journal === "" ||
        $scope.formParamOperationsTresoreries.journal === undefined ||
        $scope.formParamOperationsTresoreries.numCompteNum === "" ||
        $scope.formParamOperationsTresoreries.numCompteNum === undefined ||
        $scope.formParamOperationsTresoreries.sens === "" ||
        $scope.formParamOperationsTresoreries.sens === undefined
      ) {
        $(document).ready(function () {
          if (
            $scope.formParamOperationsTresoreries.libelle === "" ||
            $scope.formParamOperationsTresoreries.libelle === undefined
          ) {
            $("#idLibelle").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamOperationsTresoreries.abreviation === "" ||
            $scope.formParamOperationsTresoreries.abreviation === undefined
          ) {
            $("#idAbreviation").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamOperationsTresoreries.journal === "" ||
            $scope.formParamOperationsTresoreries.journal === undefined
          ) {
            $("#idJournal").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamOperationsTresoreries.numCompteNum === "" ||
            $scope.formParamOperationsTresoreries.numCompteNum === undefined
          ) {
            $("#idNumCompte").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamOperationsTresoreries.sens === "" ||
            $scope.formParamOperationsTresoreries.sens === undefined
          ) {
            $("#idSens").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
      } else if (
        $scope.formParamOperationsTresoreries.abreviation.length != 5
      ) {
        $("#idAbreviation").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La taille de l'abréviation doit être 5";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        sessionStorage.getItem("valeurBtnEng") == "paramOpSys" &&
        ($scope.formParamOperationsTresoreries.typeOperation === "" ||
          $scope.formParamOperationsTresoreries.typeOperation === undefined)
      ) {
        $("#idTypeOperation").css("background-color", "#FFE9E0");
        $scope.messageErreur = "Veuillez sélectionner le type opération";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test(
          $scope.formParamOperationsTresoreries.montantDefaut
        ) == false
      ) {
        $("#idMontantDefaut").css("background-color", "#FFE9E0");
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.formParamOperationsTresoreries.numOrdre) ==
        false
      ) {
        $("#idNumOrdre").css("background-color", "#FFE9E0");
        $scope.messageErreur = "Veuillez renseigner un numéro d'ordre correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.$emit("LOAD");

        if ($scope.etatEcran == "2") {
          ($scope.NO_CODENATUREOPERATION =
            $scope.formParamOperationsTresoreries.code),
            ($scope.appelServiceWeb = "ModifParamOperationsTresoreries");
        } else {
          $scope.NO_CODENATUREOPERATION = "";
          $scope.appelServiceWeb = "AjoutParamOperationsTresoreries";
        }

        if (sessionStorage.getItem("valeurBtnEng") == "paramOpTre") {
          $scope.NF_CODENATUREFAMILLEOPERATION = "01";
          $scope.RO_CODENATUREOPERATIONTYPE = "";
          $scope.TYPEOPERATION = "1";
          $scope.SL_LIBELLEECRAN = "Parametrage operations tresoreries";
          $scope.NO_OPERATIONSYSTEME = "N";
          $scope.FO_CODEFAMILLEOPERATION = JSON.parse(
            sessionStorage.getItem("leCodeFamilleOperation")
          );
        } else if (sessionStorage.getItem("valeurBtnEng") == "paramOpSys") {
          $scope.NF_CODENATUREFAMILLEOPERATION = "";
          $scope.FO_CODEFAMILLEOPERATION = "";
          $scope.RO_CODENATUREOPERATIONTYPE =
            $scope.formParamOperationsTresoreries.typeOperation;
          $scope.TYPEOPERATION = "3";
          $scope.SL_LIBELLEECRAN = "Parametrage operations systeme";
          $scope.NO_OPERATIONSYSTEME = "O";
        } else {
          $scope.NF_CODENATUREFAMILLEOPERATION = "02";
          $scope.RO_CODENATUREOPERATIONTYPE = "";
          $scope.TYPEOPERATION = "1";
          $scope.SL_LIBELLEECRAN = "Parametrage operations tresoreries tiers";
          $scope.NO_OPERATIONSYSTEME = "N";
          $scope.FO_CODEFAMILLEOPERATION = JSON.parse(
            sessionStorage.getItem("leCodeFamilleOperation")
          );
        }
      
        $scope.objet_envoie = [
          {
            NO_CODENATUREOPERATION: $scope.NO_CODENATUREOPERATION,
            NO_LIBELLE: $scope.formParamOperationsTresoreries.libelle,
            NO_ABREVIATION: $scope.formParamOperationsTresoreries.abreviation,
            FO_CODEFAMILLEOPERATION: $scope.FO_CODEFAMILLEOPERATION,
            NF_CODENATUREFAMILLEOPERATION: $scope.NF_CODENATUREFAMILLEOPERATION,
            RO_CODENATUREOPERATIONTYPE: $scope.RO_CODENATUREOPERATIONTYPE,
            PL_CODENUMCOMPTE: "",
            PL_NUMCOMPTE: $scope.formParamOperationsTresoreries.numCompteNum,
            NO_MONTANT: $scope.formParamOperationsTresoreries.montantDefaut,
            NO_NUMEROORDRE: $scope.formParamOperationsTresoreries.numOrdre,
            NO_MODIFIERMONTANT:
              $scope.formParamOperationsTresoreries.autoriserModifMontant,
            NO_AFFICHER: "O",
            NO_OPERATIONSYSTEME: $scope.NO_OPERATIONSYSTEME,
            NO_ECRAN: "AU",
            TYPEOPERATION: $scope.TYPEOPERATION,
            NO_SENS: $scope.formParamOperationsTresoreries.sens,
            NC_CODENATURECOMPTE:
              $scope.formParamOperationsTresoreries.natureCompte,
            NC_CODENATURECOMPTECONTREPARTIE: "",
            JO_CODEJOURNAL: $scope.formParamOperationsTresoreries.journal,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: "INSERTIONS",
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
          .post(
            "/ParametrageOperationsTresoreries/" + $scope.appelServiceWeb,
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.tabEngParamOperationsTresoreries = reponse.data;
            if (
              $scope.tabEngParamOperationsTresoreries[0].clsObjetRetour
                .SL_RESULTAT === "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.tabEngParamOperationsTresoreries[0].clsObjetRetour
                  .SL_MESSAGE
              );
              if ($scope.etatEcran == "2") {
                $scope.etatEcran = "";
                $scope.formParamOperationsTresoreries = {};
                if (sessionStorage.getItem("valeurBtnEng") == "paramOpTre") {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/parametre2/parametrageOperations/parametrageOperationsTresorerie/liste";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                } else if (
                  sessionStorage.getItem("valeurBtnEng") == "paramOpSys"
                ) {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/parametre2/parametrageOperations/parametrageOperationsSysteme/liste";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                } else {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/parametre2/parametrageOperations/parametrageOperationsTresorerieTiers/liste";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                }
              } else {
                $scope.btnReinitialiser();
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.tabEngParamOperationsTresoreries[0].clsObjetRetour
                  .SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.tabEngParamOperationsTresoreries[0].clsObjetRetour
                .SL_MESSAGE
            );
          });
      }
    };
    // fin enregistrement du parametrage operations tresoreries

    //Debut choix d'un numero compte
    $scope.verouNumCompte = false;
    $scope.choixNumeroCompte = function (code, denomination, id) {
      $(document).ready(function () {
        $("#idNumCompte").css("background-color", "#EDEDED");
      });
      $scope.formParamOperationsTresoreries.numCompteNum = code;
      $scope.formParamOperationsTresoreries.numCompteLibelle = denomination;
      $scope.formParamOperationsTresoreries.numCompteId = id;
      $scope.verouNumCompte = true;
    };
    //Fin choix d'un numero compte

    $scope.btnRetour = function () {
      if (sessionStorage.getItem("valeurBtnEng") == "paramOpTre") {
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageOperationsTresorerie/liste";
      } else if (sessionStorage.getItem("valeurBtnEng") == "paramOpSys") {
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageOperationsSysteme/liste";
      } else {
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageOperationsTresorerieTiers/liste";
      }
    };

    $scope.voirPlus = function (item) {
      $scope.infoAAfficher = item;
    };

    // debut bouton reinitialiser
    $scope.btnReinitialiser = function () {
      // champ numero compte
      $scope.verouNumCompte = false;

      // desactiver les champs marqués en rouge
      $("#idLibelle").css("background-color", "#FFFFFF");
      $("#idAbreviation").css("background-color", "#FFFFFF");
      $("#idJournal").css("background-color", "#FFFFFF");
      $("#idTypeOperation").css("background-color", "#FFFFFF");
      $("#idNumCompte").css("background-color", "#FFFFFF");
      $("#idSens").css("background-color", "#FFFFFF");

      // vider les champs
      $scope.formParamOperationsTresoreries = {};

      // les valeurs par defaut du checkbox, du montant et du numero ordre
      $scope.cpt = 1;
      $scope.formParamOperationsTresoreries.autoriserModifMontant = "O";
      $scope.formParamOperationsTresoreries.montantDefaut = "0";
      $scope.formParamOperationsTresoreries.numOrdre = "0";
    };
    // fin bouton reinitialiser

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idAbreviation").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumOrdre").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumeroOrdre").maxlength({
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

    // DEBUT COMBOS

    //debut charger combo nature famille
    $scope.chargerComboNatureFamille = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Combo nature famille",
          SL_LIBELLEMOUCHARD: "Chargement combo nature famille",
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
        .post(
          "/ParametrageFamilleOperation/ComboNatureFamille/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeComboNatureFamille = reponse.data;
          if (
            $scope.listeComboNatureFamille[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            if ($scope.etatEcran == "2") {
              $scope.aLaModificationFamOperation();
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeComboNatureFamille[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeComboNatureFamille);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeComboNatureFamille[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin charger combo nature famille

    // debut voir l'etat de l'ecran
    $scope.aLaModificationFamOperation = function () {
      // etat de l'ecran
      $scope.etatEcran = "2";
      console.log($scope.etatEcran);

      // recuperer la session
      $scope.recupererInfoListe = JSON.parse(
        sessionStorage.getItem("ligneSelectionnee")
      );
      console.log($scope.recupererInfoListe);

      // renseigner les champs
      $scope.formParamFamilleOp.code =
        $scope.recupererInfoListe.FO_CODEFAMILLEOPERATION;
      $scope.formParamFamilleOp.nomFamille =
        $scope.recupererInfoListe.FO_LIBELLEFAMILLEOPERATION;
      $scope.formParamFamilleOp.natureFamille =
        $scope.recupererInfoListe.NF_CODENATUREFAMILLEOPERATION;
      $scope.formParamFamilleOp.numeroOrdre =
        $scope.recupererInfoListe.FO_NUMEROORDRE;

      $scope.$emit("UNLOAD");
    };
    // fin voir l'etat de l'ecran

    // parametrage des operations de tresorerie
    // debut test du champ type operation
    $scope.testChampTypeOp = function () {
      $scope.$emit("LOAD");
      $scope.champTypeOperation = sessionStorage.getItem("valeurBtnEng");
      $scope.chargerComboJournal();
    };
    // fin test du champ type operation

    //debut charger combo journal
    $scope.chargerComboJournal = function () {
      if (sessionStorage.getItem("valeurBtnEng") == "paramOpTre") {
        $scope.TJ_CODETYPEJOURNAL = "02";
        $scope.TYPEOPERATION = "01";
        $scope.serviceWeb = "ComboJournal";
      } else if (sessionStorage.getItem("valeurBtnEng") == "paramOpSys") {
        $scope.TJ_CODETYPEJOURNAL = "";
        $scope.TYPEOPERATION = "02";
        $scope.serviceWeb = "ComboJournalSysteme";
      } else {
        $scope.TJ_CODETYPEJOURNAL = "06";
        $scope.TYPEOPERATION = "01";
        $scope.serviceWeb = "ComboJournal";
      }
      $scope.objet_envoie = [
        {
          TJ_CODETYPEJOURNAL: $scope.TJ_CODETYPEJOURNAL,
          SL_LIBELLEECRAN: "Parametrage operations tresoreries",
          SL_LIBELLEMOUCHARD: "combo journal",
          TYPEOPERATION: $scope.TYPEOPERATION,
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
        .post(
          "/ParametrageOperationsTresoreries/" + $scope.serviceWeb,
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeComboJournal = reponse.data;
          if (
            $scope.listeComboJournal[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.chargerComboTypeOperation();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeComboJournal[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeComboJournal);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeComboJournal[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin charger combo journal

    //debut charger combo type operation
    $scope.chargerComboTypeOperation = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Parametrage operations systeme",
          SL_LIBELLEMOUCHARD: "combo type operation",
          TYPEOPERATION: "02",
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
        .post(
          "/ParametrageOperationsTresoreries/ComboTypeOperation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeComboTypeOperation = reponse.data;
          if (
            $scope.listeComboTypeOperation[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.chargerNatureCompte();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeComboTypeOperation[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeComboTypeOperation);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeComboTypeOperation[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin charger combo type operation

    //debut charger combo nature compte
    $scope.chargerNatureCompte = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Parametrage operations tresoreries",
          SL_LIBELLEMOUCHARD: "combo nature compte",
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
        .post(
          "/ParametrageOperationsTresoreries/ComboNatureCompte/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeComboNatureCompte = reponse.data;
          if (
            $scope.listeComboNatureCompte[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.chargerSens();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeComboNatureCompte[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeComboNatureCompte);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeComboNatureCompte[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin charger combo nature compte

    //debut charger combo sens
    $scope.chargerSens = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Parametrage operations tresoreries",
          SL_LIBELLEMOUCHARD: "combo sens",
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
        .post(
          "/ParametrageOperationsTresoreries/ComboSens/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeComboSens = reponse.data;
          if ($scope.listeComboSens[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatEcran == "2") {
              $scope.aLaModificationOpTresorerie();
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeComboSens[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeComboSens);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeComboSens[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin charger combo sens

    // debut voir l'etat de l'ecran
    $scope.aLaModificationOpTresorerie = function () {
      // etat de l'ecran
      $scope.etatEcran = "2";
      console.log($scope.etatEcran);

      // recuperer la session
      $scope.recupererInfoListe = JSON.parse(
        sessionStorage.getItem("ligneSelectionnee")
      );
      console.log($scope.recupererInfoListe);

      // renseigner les champs
      $scope.formParamOperationsTresoreries.code =
        $scope.recupererInfoListe.NO_CODENATUREOPERATION;
      $scope.formParamOperationsTresoreries.libelle =
        $scope.recupererInfoListe.NO_LIBELLE;
      $scope.formParamOperationsTresoreries.abreviation =
        $scope.recupererInfoListe.NO_ABREVIATION;
      $scope.formParamOperationsTresoreries.journal =
        $scope.recupererInfoListe.JO_CODEJOURNAL;
      $scope.formParamOperationsTresoreries.typeOperation =
        $scope.recupererInfoListe.RO_CODENATUREOPERATIONTYPE;
      $scope.formParamOperationsTresoreries.natureCompte =
        $scope.recupererInfoListe.NC_CODENATURECOMPTE;
      $scope.formParamOperationsTresoreries.numCompteNum =
        $scope.recupererInfoListe.PL_NUMCOMPTE;
      $scope.formParamOperationsTresoreries.sens =
        $scope.recupererInfoListe.NO_SENS;
      $scope.formParamOperationsTresoreries.montantDefaut =
        $scope.recupererInfoListe.NO_MONTANT;
      $scope.formParamOperationsTresoreries.autoriserModifMontant =
        $scope.recupererInfoListe.NO_MODIFIERMONTANT;
      $scope.formParamOperationsTresoreries.numOrdre =
        $scope.recupererInfoListe.NO_NUMEROORDRE;
        if($scope.formParamOperationsTresoreries.numCompteNum == undefined || $scope.formParamOperationsTresoreries.numCompteNum == "" || $scope.formParamOperationsTresoreries.numCompteNum == null){
          $scope.formParamOperationsTresoreries.numCompteNum = 0
          }
      // verouiller le champ numero compte
      $scope.verouNumCompte = true;

      // tester l'etat du checkbox
      if ($scope.formParamOperationsTresoreries.autoriserModifMontant == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      $scope.$emit("UNLOAD");
    };
    // fin voir l'etat de l'ecran

    // FIN COMBOS

    /*FIN DEV JJ*/
  },
]);
