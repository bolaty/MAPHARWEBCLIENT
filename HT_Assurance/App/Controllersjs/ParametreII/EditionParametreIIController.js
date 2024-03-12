MapharApp.controller("EditionParametreIIController", [
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
    $scope.FormListEdition = {
      Zone: "",
      Succursales: "",
      DateDebut: "",
      DateFin: "",
      CompteAmortissement: "",
      TypeBudget: "",
    };
    $scope.objet_envoie = [];
    $scope.listeEdition = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesSuccursales = [];
    $scope.listeTypeTiers = [];
    $scope.listeTypeBudget = [];
    $scope.listeCompteAmortissement = [];
    $scope.Zone = false;
    $scope.verouSuccursale = false;
    $scope.TypeBudget = false;
    $scope.CompteAmortissement = false;
    $scope.DateDebut = false;
    $scope.DateFin = false;
    $scope.RetourInsertedition = [];
    $scope.indexlibetat = "";
    $scope.indexnometat = "";
    $scope.recuperationnom;
    $scope.recuperationnomfichier;
    $scope.recuperationLibelleEtat;
    $scope.recuperationIndexEtat;

    /*FIN ZONE DE DECLARATION*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    $scope.initFormAddEdition = function () {
      $scope.afficheListeEdition();
     
      setTimeout(() => {
        $scope.afficheListeZoneEditionCombo();
      }, 10000);
    };

    /*DEBUT FONCTION GENERALE*/

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV ANIE*/
    //debut liste des ZONE
    $scope.afficheListeZoneEditionCombo = function () {
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
          "/EditionParametreII/ListeZoneEditionCombo/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesZoneCombo = reponse.data;
          if (
            $scope.listeDesZoneCombo[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeTypeBudget();
          } else {
            $scope.$emit("UNLOAD");
           /* $rootScope.EnregistrementNonReussi(
              $scope.listeDesZoneCombo[0].clsObjetRetour.SL_MESSAGE
            );*/
          }
          console.log($scope.listeDesZoneCombo);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesZoneCombo[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des ZONE

    //debut liste des Succursales
    $scope.afficheListeSuccursales = function () {
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $rootScope.DATE_EX_EXERCICE,
          SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
          ZN_CODEZONE: $scope.FormListEdition.Zone,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
        .post("/EditionParametreII/ListeSuccursales/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSuccursales = reponse.data;
          if (
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.FormListEdition.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE;
          } else {
            $scope.FormListEdition.Succursales = "";
          }
          console.log($scope.listeDesSuccursales);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des Succursales

    //debut liste type budget
    $scope.afficheListeTypeBudget = function () {
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
        .post("/TypeBudget/ListeTypeBudget/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeBudget = reponse.data;
          if ($scope.listeTypeBudget[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeCompteAmortissement();
          } else {
            $scope.$emit("UNLOAD");
           /* $rootScope.EnregistrementNonReussi(
              $scope.listeTypeBudget[0].clsObjetRetour.SL_MESSAGE
            );*/
          }
          console.log($scope.listeTypeBudget);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeBudget[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type budget

    //debut liste compte amortissement
    $scope.afficheListeCompteAmortissement = function () {
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
          "/CompteAmortissement/ListeCompteAmortissement/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeCompteAmortissement = reponse.data;
          if (
            $scope.listeCompteAmortissement[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
          
          } else {
            $scope.$emit("UNLOAD");
          /*  $rootScope.EnregistrementNonReussi(
              $scope.listeCompteAmortissement[0].clsObjetRetour.SL_MESSAGE
            );*/
          }
          console.log($scope.listeCompteAmortissement);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeCompteAmortissement[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste compte amortissement

    //debut afficher liste edition
    $scope.afficheListeEdition = function () {
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "PARAMETRECOMPTABILITE",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          ET_AFFICHER: "O",
          OD_APERCU: "O",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "01",
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
        .post("/EditionListe/ListeEdition/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeEdition = reponse.data;
          if ($scope.listeEdition[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEdition[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeEdition);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeEdition[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin afficher liste edition

    $scope.lIndex = "";
    //debut choix de l'etat
    $scope.choixEtat = function (
      idEtat,
      nometat,
      nomfichier,
      LibelleEtat,
      EtIndex
    ) {
      $scope.recuperationnom = nometat;
      $scope.recuperationnomfichier = nomfichier;
      $scope.recuperationLibelleEtat = LibelleEtat;
      $scope.recuperationIndexEtat = EtIndex;
      console.log($scope.indexlibetat);

      for (var i = 0; i < $scope.listeEdition.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEdition.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $("#idEtat" + idEtat).css("background-color", "beige");
          if (
            $scope.listeEdition[j].ET_INDEX == "PAR_PLANCPTABLE" ||
            $scope.listeEdition[j].ET_INDEX == "PAR_JO" ||
            $scope.listeEdition[j].ET_INDEX == "PAR_POSTEBUSINESSPLAN" ||
            $scope.listeEdition[j].ET_INDEX == "PAR_CPTECHARGE"
          ) {
            $scope.Zone = false;
            $scope.verouSuccursale = false;
            $scope.FormListEdition.Zone =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.TypeBudget = true;

            $scope.CompteAmortissement = true;
            $scope.DateDebut = true;
            $scope.FormListEdition.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.DateFin = true;
            $scope.FormListEdition.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEdition.TypeBudget =
              $scope.listeTypeBudget[0].BT_CODETYPEBUDGET;
            $scope.afficheListeSuccursales();
            break;
          } else if (
            $scope.listeEdition[j].ET_INDEX == "PAR_BUDGETPARAMTYPE" ||
            $scope.listeEdition[j].ET_INDEX == "PAR_POSTEBUDGETAIREPARAM" ||
            $scope.listeEdition[j].ET_INDEX ==
              "PAR_POSTEBUDGETAIREPARAMDETAIL" ||
            $scope.listeEdition[j].ET_INDEX == "PAR_POSTEBUSINESSPLANDETAIL" ||
            $scope.listeEdition[j].ET_INDEX == "PAR_POSTETRESORERIE"
          ) {
            $scope.Zone = false;
            $scope.verouSuccursale = false;
            $scope.FormListEdition.Zone =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.TypeBudget = false;
            $scope.CompteAmortissement = true;
            $scope.DateDebut = true;
            $scope.FormListEdition.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.DateFin = true;
            $scope.FormListEdition.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEdition.TypeBudget =
              $scope.listeTypeBudget[0].BT_CODETYPEBUDGET;
            $scope.afficheListeSuccursales();
            break;
          } else if (
            $scope.listeEdition[j].ET_INDEX == "Comp_FamilleImmobilisation"
          ) {
            $scope.Zone = false;
            $scope.verouSuccursale = false;
            $scope.FormListEdition.Zone =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.TypeBudget = true;
            $scope.CompteAmortissement = false;
            $scope.DateDebut = true;
            $scope.FormListEdition.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.DateFin = false;
            $scope.FormListEdition.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEdition.TypeBudget =
              $scope.listeTypeBudget[0].BT_CODETYPEBUDGET;
            $scope.afficheListeSuccursales();
            break;
          }
        }
      }
    };
    //fin choix de l'etat

    //debut focus sur le champ
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idDateDebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateFin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEntrepot").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSuccursales").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    $scope.apercuEtat = function (formaEtat) {
      $("#modal_TypeFichierGlobale").modal('hide');
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      if (
        $scope.recuperationIndexEtat == "PAR_BUDGETPARAMTYPE" ||
        $scope.recuperationIndexEtat == "PAR_PLANCPTABLE" ||
        $scope.recuperationIndexEtat == "PAR_PLANCPTABLE" ||
        $scope.recuperationIndexEtat == "PAR_POSTEBUDGETAIREPARAM" ||
        $scope.recuperationIndexEtat == "PAR_POSTEBUDGETAIREPARAMDETAIL" ||
        $scope.recuperationIndexEtat == "PAR_POSTEBUSINESSPLAN" ||
        $scope.recuperationIndexEtat == "PAR_POSTEBUSINESSPLANDETAIL" ||
        $scope.recuperationIndexEtat == "PAR_POSTETRESORERIE" ||
        $scope.recuperationIndexEtat == "PAR_JO" ||
        $scope.recuperationIndexEtat == "Comp_FamilleImmobilisation" ||
        $scope.recuperationIndexEtat == "PAR_CPTECHARGE"
      ) {
        if (
          $scope.recuperationIndexEtat == "PAR_BUDGETPARAMTYPE" ||
          $scope.recuperationIndexEtat == "PAR_POSTEBUDGETAIREPARAM" ||
          $scope.recuperationIndexEtat == "PAR_POSTEBUDGETAIREPARAMDETAIL" ||
          $scope.recuperationIndexEtat == "PAR_JO" ||
          $scope.recuperationIndexEtat == "PAR_POSTEBUSINESSPLAN" ||
          $scope.recuperationIndexEtat == "PAR_POSTEBUSINESSPLANDETAIL" ||
          $scope.recuperationIndexEtat == "PAR_POSTETRESORERIE"
        ) {
          if (
            $scope.FormListEdition.Succursales === "" ||
            $scope.FormListEdition.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationIndexEtat,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                NOMETAT: $scope.recuperationnomfichier,
                ENTETE1: formaEtat,
                BT_CODETYPEBUDGET: $scope.FormListEdition.TypeBudget,
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
                "/EditionParametreII/InsertEditionBloc1_1/",
                $scope.objet_envoie,
                {
                  //headers: $scope.headers
                }
              )
              .then(function (reponse) {
                $scope.RetourInsertedition = reponse.data;
                if (
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                  $scope.$emit("UNLOAD");
                  $http
                    .post(
                      "/EditionParametreII/pvgAfficherEtat_Bloc1/",
                      $scope.RetourInsertedition
                    )
                    .then(function (result) {
                      if (result.data[0].SL_RESULTAT == "TRUE") {
                        toastr["success"](result.data[0].SL_MESSAGE); // Affichage de la notification de succes
                        $window.open(result.data[0].SL_PATH_FILE, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
                      } else {
                        toastr["error"](result.data[0].SL_MESSAGE); // Affichage de la notification de erreur
                      }
                      $scope.loading = false; // Arrêt du chargement
                    });
                } else {
                  $scope.$emit("UNLOAD");
                  $rootScope.MessageDesListes(
                    $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                  );
                }
              })
              .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                );
              });
          }
        } else if ($scope.recuperationIndexEtat == "PAR_PLANCPTABLE") {
          if (
            $scope.FormListEdition.Succursales === "" ||
            $scope.FormListEdition.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationIndexEtat,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                NOMETAT: $scope.recuperationnomfichier,
                ENTETE1: formaEtat,
                BT_CODETYPEBUDGET: $scope.FormListEdition.TypeBudget,
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
                "/EditionParametreII/InsertEditionBloc1_2/",
                $scope.objet_envoie,
                {
                  //headers: $scope.headers
                }
              )
              .then(function (reponse) {
                $scope.RetourInsertedition = reponse.data;
                if (
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                  $scope.$emit("UNLOAD");
                  $http
                    .post(
                      "/EditionParametreII/pvgAfficherEtat_Bloc1/",
                      $scope.RetourInsertedition
                    )
                    .then(function (result) {
                      if (result.data[0].SL_RESULTAT == "TRUE") {
                        toastr["success"](result.data[0].SL_MESSAGE); // Affichage de la notification de succes
                        $window.open(result.data[0].SL_PATH_FILE, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
                      } else {
                        toastr["error"](result.data[0].SL_MESSAGE); // Affichage de la notification de erreur
                      }
                      $scope.loading = false; // Arrêt du chargement
                    });
                } else {
                  $scope.$emit("UNLOAD");
                  $rootScope.MessageDesListes(
                    $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                  );
                }
              })
              .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                );
              });
          }
        } else if (
          $scope.recuperationIndexEtat == "Comp_FamilleImmobilisation"
        ) {
          if (
            $scope.FormListEdition.Succursales === "" ||
            $scope.FormListEdition.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationIndexEtat,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                NOMETAT: $scope.recuperationnomfichier,
                AG_RAISONSOCIALE: $scope.listeDesSuccursales[0].AG_RAISONSOCIAL,
                BT_CODETYPEBUDGET: $scope.FormListEdition.TypeBudget,
                AG_CODEAGENCE: $scope.FormListEdition.Succursales,
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                PS_CODESOUSPRODUIT: "",
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                DATEDEBUT: "01-01-1900",
                DATEFIN: $scope.FormListEdition.DateFin,
                OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
                ENTETE1: formaEtat,
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
                "/EditionParametreII/InsertEditionBloc2/",
                $scope.objet_envoie,
                {
                  //headers: $scope.headers
                }
              )
              .then(function (reponse) {
                $scope.RetourInsertedition = reponse.data;
                if (
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                  $scope.$emit("UNLOAD");
                  $http
                    .post(
                      "/EditionParametreII/pvgAfficherEtat_Bloc2/",
                      $scope.RetourInsertedition
                    )
                    .then(function (result) {
                      if (result.data[0].SL_RESULTAT == "TRUE") {
                        toastr["success"](result.data[0].SL_MESSAGE); // Affichage de la notification de succes
                        $window.open(result.data[0].SL_PATH_FILE, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
                      } else {
                        toastr["error"](result.data[0].SL_MESSAGE); // Affichage de la notification de erreur
                      }
                      $scope.loading = false; // Arrêt du chargement
                    });
                } else {
                  $scope.$emit("UNLOAD");
                  $rootScope.MessageDesListes(
                    $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                  );
                }
              })
              .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                );
              });
          }
        } else if ($scope.recuperationIndexEtat == "PAR_CPTECHARGE") {
          if (
            $scope.FormListEdition.Succursales === "" ||
            $scope.FormListEdition.Succursales === undefined
          ) {
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationIndexEtat,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                NOMETAT: $scope.recuperationnomfichier,
                ENTETE1: formaEtat,
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
                "/EditionParametreII/InsertEditionBloc3/",
                $scope.objet_envoie,
                {
                  //headers: $scope.headers
                }
              )
              .then(function (reponse) {
                $scope.RetourInsertedition = reponse.data;
                if (
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                  $scope.$emit("UNLOAD");
                  $http
                    .post(
                      "/EditionParametreII/pvgAfficherEtat_Bloc3/",
                      $scope.RetourInsertedition
                    )
                    .then(function (result) {
                      if (result.data[0].SL_RESULTAT == "TRUE") {
                        toastr["success"](result.data[0].SL_MESSAGE); // Affichage de la notification de succes
                        $window.open(result.data[0].SL_PATH_FILE, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
                      } else {
                        toastr["error"](result.data[0].SL_MESSAGE); // Affichage de la notification de erreur
                      }
                      $scope.loading = false; // Arrêt du chargement
                    });
                } else {
                  $scope.$emit("UNLOAD");
                  $rootScope.MessageDesListes(
                    $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                  );
                }
              })
              .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
                );
              });
          }
        }
      } else {
        $scope.$emit("UNLOAD");
        $rootScope.MessageDesListes("Veuillez sélectionner un état");
      }
    };
    //fin focus sur le champ

    /*FIN DEV ANIE*/
  },
]);
