MapharApp.controller("EditionTresorerieController", [
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
    console.log($rootScope.infoDeLoperateur);
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    /* $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL; */
    // $rootScope.infocontrat = angular.fromJson(localStorage.getItem("vpOpMultirisqueProinfocontrat"));
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    console.log($rootScope.collectionContartOp);
    $rootScope.DATE_EX_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    console.log($rootScope.DATE_EX_EXERCICE);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormListEditionTresor = {
      Zone: "",
      Succursales: "",
      DateDebut: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      DateFin: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      Exercice: "",
      Periodicite: "",
      Periode: "",
      Entrepot: "",
    };
    $scope.objet_envoie = [];
    $scope.listeEdition = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesSuccursales = [];
    $scope.listeEntrepot = [];
    $scope.listeDesExercice = [];
    $scope.listeDesPeriodicite = [];
    $scope.listeDesPeriode = [];
    $scope.listeDateDebutFin = [];
    $scope.listeDesExerciceMemo = [];
    $scope.Zone = false;
    $scope.Succursales = false;
    $scope.Entrepot = false;
    $scope.DateDebut = false;
    $scope.DateFin = false;
    $scope.Exercice = false;
    $scope.Periodicite = false;
    $scope.Periode = false;
    $scope.TypeCaisse = false;
    $scope.recuperationnom = "";
    $scope.recuperationnomfichier = "";
    $scope.recuperationLibelleEtat = "";

    /*FIN ZONE DE DECLARATION*/

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

    //*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    $scope.initFormAddEditionTresorerie = function () {
      $scope.afficheListeZoneEditionCombo();
    };
    //*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut afficher liste edition
    $scope.afficheListeEditionTresorerie = function () {
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "CAISSE",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          ET_AFFICHER: "O",
          OD_APERCU: "O",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          $scope.listeEdition = reponse.data;
          console.log($scope.listeEdition);
          if ($scope.listeEdition[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEdition[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
          }
        });
    };
    //fin afficher liste edition

    //debut choix de l'etat
    $scope.lIndex = "";
    $scope.choixEtat = function (
      idEtat,
      typeEtat,
      nomEtat,
      LibelleEtat,
      etIndex
    ) {
      $scope.$emit("LOAD");
      $scope.recuperationnom = typeEtat;
      $scope.recuperationnomfichier = nomEtat;
      $scope.recuperationLibelleEtat = LibelleEtat;
      $scope.recuperationEtIndex = etIndex;

      // deselectionner les champs du tableau
      for (var i = 0; i < $scope.listeEdition.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEdition.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $("#idEtat" + idEtat).css("background-color", "beige"); //selectionner un element du tableau

          if ($scope.listeEdition[j].ET_INDEX == "CA_BROUILLARD") {
            // si brouillard de caisse
            $scope.Zone = false;
            $scope.Succursales = false;
            $scope.Entrepot = false;
            $scope.DateDebut = true;
            $scope.DateFin = false;
            $scope.Exercice = false;
            $scope.Periodicite = false;
            $scope.Periode = false;
            $scope.TypeCaisse = false;

            $scope.FormListEditionTresor.Zone =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.FormListEditionTresor.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListEditionTresor.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionTresor.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

            if (
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined ||
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != ""
            ) {
              $scope.afficheListePeriode();
            }
            break;
          } else if (
            $scope.listeEdition[j].ET_INDEX == "ST_SITUATIONTRANSPORT" ||
            $scope.listeEdition[j].ET_INDEX == "ST_SITUATIONLIVRAISON" ||
            $scope.listeEdition[j].ET_INDEX == "ST_SITUATIONVENTE"
          ) {
            // si autre etat
            $scope.Zone = false;
            $scope.Succursales = false;
            $scope.Entrepot = false;
            $scope.DateDebut = false;
            $scope.DateFin = false;
            $scope.Exercice = false;
            $scope.Periodicite = false;
            $scope.Periode = false;

            if ($scope.listeEdition[j].ET_INDEX == "ST_SITUATIONTRANSPORT") {
              $scope.DateDebut = true;
              $scope.DateFin = true;
            }

            $scope.FormListEditionTresor.Zone =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.FormListEditionTresor.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListEditionTresor.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionTresor.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

            if (
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined ||
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != ""
            ) {
              $scope.afficheListePeriode();
            }
            break;
          }
        }
      }
      $scope.$emit("UNLOAD");
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
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEntrepot").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSuccursales").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodicite").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriode").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    // debut afficher l'etat
    $scope.RetourInsertedition = [];
    $scope.apercuEtat = function (formaEtat) {
      $("#modal_TypeFichierGlobale").modal('hide');
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      if (
        $scope.recuperationEtIndex == "CA_BROUILLARD" ||
        $scope.recuperationnom == "STP" ||
        $scope.recuperationnom == "SL" ||
        $scope.recuperationnom == "STV"
      ) {
        if (
          $scope.FormListEditionTresor.Succursales === "" ||
          $scope.FormListEditionTresor.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        } else if (
          $scope.FormListEditionTresor.Entrepot === "" ||
          $scope.FormListEditionTresor.Entrepot === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idEntrepot").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un entrepot"
          );
        } else if (
          $scope.FormListEditionTresor.Exercice === "" ||
          $scope.FormListEditionTresor.Exercice === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idExercice").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un exercice"
          );
        } else if (
          $scope.FormListEditionTresor.Periodicite === "" ||
          $scope.FormListEditionTresor.Periodicite === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodicite").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une périodicité"
          );
        } else if (
          $scope.FormListEditionTresor.Periode === "" ||
          $scope.FormListEditionTresor.Periode === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriode").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une période"
          );
        } else {
          for (var j = 0; j < $scope.listeEdition.length; j++) {
            if (j == $scope.lIndex) {
              if ($scope.listeEdition[j].ET_INDEX == "CA_BROUILLARD") {
                $scope.objet_envoie = [
                  {
                    AG_CODEAGENCE: $scope.FormListEditionTresor.Succursales,
                    EN_CODEENTREPOT: $scope.FormListEditionTresor.Entrepot,
                    CA_CODECONTRAT: "",
                    DATEDEBUT: "01-01-1900",
                    DATEFIN: $scope.FormListEditionTresor.DateFin,
                    OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                    MR_CODEMODEREGLEMENT: "",
                    ET_TYPEETAT: "APPA",
                    SL_LIBELLEECRAN: "Saisie de Continent",
                    SL_LIBELLEMOUCHARD: "INSERTIONS",
                    NOMETAT: $scope.recuperationnomfichier,
                    SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
                    ENTETE1: formaEtat,
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
                    "/EditionTresorerie/Inserteditiontresorerie1/",
                    $scope.objet_envoie,
                    {
                      //headers: $scope.headers
                    }
                  )
                  .then(function (reponse) {
                    $scope.RetourInsertedition = reponse.data;
                    if (
                      $scope.RetourInsertedition[0].clsObjetRetour
                        .SL_RESULTAT == "TRUE"
                    ) {
                      $scope.$emit("UNLOAD");
                      $http
                        .post(
                          "/EditionTresorerie/pvgAfficherEtat1/",
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
              } else if (
                $scope.listeEdition[j].ET_INDEX == "ST_SITUATIONTRANSPORT" ||
                $scope.listeEdition[j].ET_INDEX == "ST_SITUATIONLIVRAISON" ||
                $scope.listeEdition[j].ET_INDEX == "ST_SITUATIONVENTE"
              ) {
                $scope.objet_envoie = [
                  {
                    AG_CODEAGENCE: $scope.FormListEditionTresor.Succursales,
                    EN_CODEENTREPOT: $scope.FormListEditionTresor.Entrepot,
                    DATEDEBUT: $scope.FormListEditionTresor.DateDebut,
                    DATEFIN: $scope.FormListEditionTresor.DateFin,
                    TP_CODETYPETIERS: "001",
                    ET_TYPEETAT: $scope.listeEdition[j].ET_TYPEETAT,
                    ET_TYPELISTE: "",
                    OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                    GP_CODEGROUPE: "",
                    PY_CODEPAYS: "",
                    NT_CODENATURETIERS: "",
                    SL_LIBELLEECRAN: "Saisie de Continent",
                    SL_LIBELLEMOUCHARD: "INSERTIONS",
                    NOMETAT: $scope.recuperationnomfichier,
                    SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
                    ENTETE1: formaEtat,
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
                    "/EditionTresorerie/Inserteditiontresorerie2/",
                    $scope.objet_envoie,
                    {
                      //headers: $scope.headers
                    }
                  )
                  .then(function (reponse) {
                    $scope.RetourInsertedition = reponse.data;
                    if (
                      $scope.RetourInsertedition[0].clsObjetRetour
                        .SL_RESULTAT == "TRUE"
                    ) {
                      $scope.$emit("UNLOAD");
                      $http
                        .post(
                          "/EditionTresorerie/pvgAfficherEtat2/",
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
          }
        }
      } else {
        $scope.$emit("UNLOAD");
        $rootScope.ProblemeServeur("Veuillez selectionnez un etat.");
      }
    };
    //fin focus sur le champ

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
          "/EditionTresorerie/ListeZoneEditionCombo/",
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
            $scope.afficheListeEntrepot();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesZoneCombo[0].clsObjetRetour.SL_MESSAGE
            );
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
          ZN_CODEZONE: $scope.FormListEditionTresor.Zone,
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
        .post("/EditionTresorerie/ListeSuccursales/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSuccursales = reponse.data;
          if (
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.FormListEditionTresor.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE;
          } else {
            $scope.FormListEditionTresor.Succursales = "";
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

    //debut liste Entrepot
    $scope.afficheListeEntrepot = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/Entrepot/ListeEntrepot/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEntrepot = reponse.data;
          if ($scope.listeEntrepot[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeExercice();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeEntrepot[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeEntrepot);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeEntrepot[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste Entrepot

    //debut liste exercice
    $scope.afficheListeExercice = function () {
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
        .post("/EditionTresorerie/ListeExercice/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesExercice = reponse.data;
          if ($scope.listeDesExercice[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.listeDesExerciceMemo = []
          for (var index = 0; index < $scope.listeDesExercice.length; index++) {
            if (parseInt($scope.listeDesExercice[index].EX_EXERCICE)  <= parseInt($rootScope.DATE_EXERCICE) ) {
              $scope.listeDesExerciceMemo.push($scope.listeDesExercice[index])
            }
          }
          $scope.listeDesExercice = $scope.listeDesExerciceMemo;
            $scope.afficheListePeriodicite();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesExercice);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste exercice

    //debut liste periodicite
    $scope.afficheListePeriodicite = function () {
      $scope.objet_envoie = [
        {
          PE_CODEPERIODICITE: "",
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
        .post("/EditionTresorerie/ListePeriodicite/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPeriodicite = reponse.data;
          if (
            $scope.listeDesPeriodicite[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            setTimeout(() => {
              $scope.afficheListeEditionTresorerie();
            }, 10000);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesPeriodicite[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPeriodicite);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPeriodicite[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste periodicite

    //debut liste periode
    $scope.afficheListePeriode = function () {
      $scope.objet_envoie = [
        {
          PE_CODEPERIODICITE: $scope.FormListEditionTresor.Periodicite,
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
        .post("/EditionTresorerie/ListePeriode/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPeriode = reponse.data;
          console.log($scope.listeDesPeriode);
          $scope.FormListEditionTresor.Periode = "";
          $scope.leMois = $rootScope.DATE_JOURNEE_DE_TRAVAIL.substr(3, 2);
          for (var index = 0; index < $scope.listeDesPeriode.length; index++) {
            if ($scope.listeDesPeriode[index].MO_CODEMOIS == $scope.leMois) {
              $scope.FormListEditionTresor.Periode =
                $scope.listeDesPeriode[index].MO_CODEMOIS;
              break;
            }
          }
          if ($scope.FormListEditionTresor.Periode != "") {
            $("#idPeriode").css("background-color", "#FFFFFF");
          }
          $scope.afficheListeDateDebutFin();
        });
    };
    //fin liste periode

    //debut avoir les dates de debut et de fin
    $scope.afficheListeDateDebutFin = function () {
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $scope.FormListEditionTresor.Exercice,
          MO_CODEMOIS: $scope.FormListEditionTresor.Periode,
          PE_CODEPERIODICITE: $scope.FormListEditionTresor.Periodicite,
          JT_DATEJOURNEETRAVAIL: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
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
        .post("/EditionAssurance/ListeDateDebutFin/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDateDebutFin = reponse.data;
          $scope.FormListEditionTresor.DateDebut =
            $scope.listeDateDebutFin[0].MO_DATEDEBUT;
          $scope.FormListEditionTresor.DateFin =
            $scope.listeDateDebutFin[0].MO_DATEFIN;
          console.log($scope.listeDateDebutFin);
        });
    };
    //fin avoir les dates de debut et de fin
  },
]);
