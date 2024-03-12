MapharApp.controller("EditionOutilsSecuriteController", [
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
    $scope.FormListOutilsSecurite = {
      Zone: "",
      Succursales: "",
      Entrepot: "",
      TypeTiers: "",
      NatureTiers: "",
      Pays: "",
      GroupeTiers: "",
      CompteAdditinnel: "",
      TVA: "",
      AIRSI: "",
      DateDebut: "",
      DateFin: "",
      Section: "",
    };
    $scope.FormListOutilsSecurite.DateDebut =
      $rootScope.DATE_JOURNEE_DE_TRAVAIL;
    $scope.FormListOutilsSecurite.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;

    $scope.objet_envoie = [];
    $scope.listeEdition = [];
    $scope.tabEtat = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesSuccursales = [];
    $scope.listeDesTypeTiers = [];
    $scope.listePays = [];
    $scope.listeGroupeTiers = [];
    $scope.listeNatureTiers = [];
    $scope.listeEntrepot = [];
    $scope.listeSection = [];
    $scope.listeCompteAdditionel = [];
    $scope.Zone = false;
    $scope.Succursales = false;
    $scope.Entrepot = false;
    $scope.TypeTiers = false;
    $scope.NatureTiers = false;
    $scope.Pays = false;
    $scope.GroupeTiers = false;
    $scope.CompteAdditinnel = false;
    $scope.TVA = false;
    $scope.AIRSI = false;
    $scope.verouDateDebut = false;
    $scope.verouDateFin = false;
    $scope.Section = false;
    $scope.recuperationnom = "";
    $scope.recuperationnomfichier = "";
    $scope.recuperationEtIndex = "";
    $scope.recuperationLibelleEtat = "";
    $scope.RetourInsertedition = [];
    $scope.btnGenerer = false;
    $scope.fermerBtnGenerer = false;
    $scope.fermerBtnApercu = false;

    /*FIN ZONE DE DECLARATION*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    /*DEBUT FONCTION GENERALE*/

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    $scope.initFormAddEditionTiers = function () {
      $scope.afficheListeEditionOutilsSecurites();
      $scope.afficheListeZoneEditionCombo();
      // $scope.afficheListeTypeTiers();
      // $scope.afficheListePays();
      // $scope.afficheListeGroupeTiers();
      // $scope.afficheListeEntrepot();
      // $scope.afficheListeSection();
    };
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV ANIE*/

    //debut liste des pays
    $scope.afficheListePays = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "EDITION TIERS",
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
        .post("/Pays/ListePays/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listePays = reponse.data;
        });
    };
    //fin liste des pays

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
        .post("/EditionTiers/ListeZoneEditionCombo/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesZoneCombo = reponse.data;
          if (
            $scope.listeDesZoneCombo[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeEntrepot();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
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
          if ($scope.listeEntrepot[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            setTimeout(() => {
              $scope.afficheListeEditionOutilsSecurites();
            }, 10000);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
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

    //debut afficher liste edition
    $scope.afficheListeEditionOutilsSecurites = function () {
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "OUTILSECURITE",
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
          $scope.$emit("UNLOAD");
          $scope.listeEdition = reponse.data;
          console.log($scope.listeEdition);
          if ($scope.listeEdition[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEdition[0].clsObjetRetour.SL_MESSAGE
            );
          }
        });
    };
    //fin afficher liste edition

    //debut liste des Succursales
    $scope.initialiserChamp = function () {
      $scope.FormListOutilsSecurite.Succursales = "";
      $scope.listeDesSuccursales = [];
      $scope.verouSuccursales = true;
    };

    $scope.afficheListeSuccursales = function () {
      $scope.verouSuccursales = true;
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $rootScope.DATE_EX_EXERCICE,
          SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
          ZN_CODEZONE: $scope.FormListOutilsSecurite.Zone,
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
        .post("/EditionAssurance/ListeSuccursales/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSuccursales = reponse.data;
          if (
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.FormListOutilsSecurite.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE;
            $scope.verouSuccursales = false;
          } else {
            $scope.FormListOutilsSecurite.Succursales = "";
            $scope.listeDesSuccursales = [];
          }
          console.log($scope.listeDesSuccursales);
        });
    };
    //fin liste des Succursales

    //debut liste des typefournisseur
    $scope.afficheListeTypeTiers = function () {
      $scope.objet_envoie = [
        {
          TP_CODETYPETIERS: "",
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
        .post("/EditionTiers/ListeTypeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesTypeTiers = reponse.data;
          console.log($scope.listeDesTypeTiers);
        });
    };
    //fin liste des Succursales

    //debut liste des groupes tiers
    $scope.afficheListeGroupeTiers = function () {
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
        .post("/GroupeTiers/ListeGroupeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeGroupeTiers = reponse.data;
          console.log($scope.listeGroupeTiers);
        });
    };
    //fin liste des  groupes tiers

    //debut liste natures tiers
    $scope.afficheListeNatureTiers = function () {
      $scope.objet_envoie = [
        {
          TP_CODETYPETIERS: $scope.FormListOutilsSecurite.TypeTiers,
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
        .post("/NatureTiers/ListeNatureDuTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureTiers = reponse.data;
          console.log($scope.listeNatureTiers);
        });
      $scope.objet_envoie = [
        {
          TC_CODECOMPTETYPETIERS: $scope.FormListOutilsSecurite.TypeTiers,
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
          "/CompteAdditionnel/ListeCompteAdditionnel/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeCompteAdditionel = reponse.data;
          console.log($scope.listeCompteAdditionel);
        });
    };
    //fin liste  natures tiers

    $scope.lIndex = "";
    //debut choix de l'etat
    $scope.choixEtat = function (
      idEtat,
      typeEtat,
      nomEtat,
      LibelleEtat,
      etIndex
    ) {
      $scope.recuperationnom = typeEtat;
      $scope.recuperationnomfichier = nomEtat;
      $scope.recuperationLibelleEtat = LibelleEtat;
      $scope.recuperationEtIndex = etIndex;

      for (var i = 0; i < $scope.listeEdition.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEdition.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $("#idEtat" + idEtat).css("background-color", "beige");

          if ($scope.listeEdition[j].ET_INDEX == "OS_LISTEOP") {
            $scope.FormListOutilsSecurite.Zone =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.FormListOutilsSecurite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListOutilsSecurite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListOutilsSecurite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            break;
          }
        }
      }
    };
    //fin choix de l'etat

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

    //debut aperçu etat
    $scope.apercuEtat = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      if ($scope.recuperationEtIndex == "OS_LISTEOP") {
        if ($scope.recuperationEtIndex == "OS_LISTEOP") {
          if (
            $scope.FormListOutilsSecurite.Zone === "" ||
            $scope.FormListOutilsSecurite.Zone === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idZone").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListOutilsSecurite.Succursales === "" ||
            $scope.FormListOutilsSecurite.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListOutilsSecurite.Entrepot === "" ||
            $scope.FormListOutilsSecurite.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListOutilsSecurite.DateDebut === "" ||
            $scope.FormListOutilsSecurite.DateDebut === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateDebut").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListOutilsSecurite.DateFin === "" ||
            $scope.FormListOutilsSecurite.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: $scope.FormListOutilsSecurite.Succursales,
                EN_CODEENTREPOT: $scope.FormListOutilsSecurite.Entrepot,
                CA_CODECONTRAT: "",
                DATEDEBUT: $scope.FormListOutilsSecurite.DateDebut,
                DATEFIN: $scope.FormListOutilsSecurite.DateFin,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                TA_CODETYPEAFFAIRES: "01",
                RQ_CODERISQUE: "01",
                TI_IDTIERS: "",
                TI_IDTIERSCOMMERCIAL: "",
                PY_CODEPAYS: "",
                VL_CODEVILLE: "",
                CO_CODECOMMUNE: "",
                ZA_CODEZONEAUTO: "",
                NS_CODENATURESINISTRE: "",
                TA_CODETYPEAFFAIRES: "",
                CT_CODESTAUT: "",
                ET_TYPEETAT: $scope.recuperationnom,
                NOMETAT: $scope.recuperationnomfichier,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
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
                "/EditionOutilsEtSecurites/InsertEditionOutilsSecurite/",
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
                      "/EditionOutilsEtSecurites/pvgAfficherEtat/",
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
    //fin aperçu etat

    //debut generer etat
    $scope.genererEtat = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      for (var j = 0; j < $scope.listeEdition.length; j++) {
        if (j == $scope.lIndex) {
          if ($scope.listeEdition[j].ET_INDEX == "CA_RELENCE") {
            if (
              $scope.FormListOutilsSecurite.DateFin === "" ||
              $scope.FormListOutilsSecurite.DateFin === undefined
            ) {
              $("#idDateFin").css("background-color", "#FFE9E0");
            } else if (
              $scope.FormListOutilsSecurite.TypeTiers === "" ||
              $scope.FormListOutilsSecurite.TypeTiers === undefined
            ) {
              $("#idTypeTiers").css("background-color", "#FFE9E0");
            } else if (
              $scope.FormListOutilsSecurite.Entrepot === "" ||
              $scope.FormListOutilsSecurite.Entrepot === undefined
            ) {
              $("#idEntrepot").css("background-color", "#FFE9E0");
            } /* else if (
              $scope.FormListOutilsSecurite.Succursales === "" ||
              $scope.FormListOutilsSecurite.Succursales === undefined
            ) {
              $("#idSuccursales").css("background-color", "#FFE9E0");
            } */ else {
              $scope.objet_envoie = [
                {
                  AG_CODEAGENCE: "1000",
                  EN_CODEENTREPOT: $scope.FormListOutilsSecurite.Entrepot,
                  OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                  ET_TYPEETAT: $scope.listeEdition[j].ET_TYPEETAT,
                  DATEDEBUT: "01-01-1900",
                  DATEFIN: $scope.FormListOutilsSecurite.DateFin,
                  MS_DATERENDEZVOUS1: "01-01-1900",
                  MS_DATERENDEZVOUS2: $scope.FormListOutilsSecurite.DateFin,
                  TC_CODECOMPTETYPETIERS: "",
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
                  "/EditionTiers/InserteditiontiersRelence/",
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
                    $scope.fermerBtnGenerer = true;
                    $scope.fermerBtnApercu = false;
                    /* $http
                      .post(
                        "/EditionTiers/pvgAfficherEtat/",
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
                      }); */
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
    };
    //fin generer etat

    //debut liste des groupes tiers
    $scope.afficheListeSection = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
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
        .post("/Section/ListeSection/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeSection = reponse.data;
          console.log($scope.listeSection);
        });
    };
    //fin liste des  groupes tiers

    /*FIN DEV ANIE*/
  },
]);
