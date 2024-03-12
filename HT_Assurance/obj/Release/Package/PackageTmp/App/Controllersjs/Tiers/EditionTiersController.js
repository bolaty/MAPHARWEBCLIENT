MapharApp.controller("EditionTiersController", [
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
    $scope.FormListTiers = {
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
    $scope.DateDebut = false;
    $scope.DateFin = false;
    $scope.Section = false;
    $scope.recuperationnom = "";
    $scope.recuperationnomfichier = "";
    $scope.recuperationLibelleEtat = "";
    $scope.recuperationEtIndex = "";
    $scope.RetourInsertedition = [];
    $scope.btnGenerer = false;
    $scope.fermerBtnGenerer = false;
    $scope.fermerBtnApercu = false;
    $scope.tiPros = false;

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
      $scope.FormListTiers.Pays = $rootScope.PAYSPARDEFAUT
      $scope.afficheListeEditionTiers();
      $scope.afficheListeZoneEditionCombo();
      $scope.afficheListeTypeTiers();
      $scope.afficheListePays();
      $scope.afficheListeGroupeTiers();
      $scope.afficheListeEntrepot();
      $scope.afficheListeSection();
      // $scope.afficheListeSuccursales();
    };
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV ANIE*/
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
          console.log($scope.listeEntrepot);
        });
    };
    //fin liste Entrepot

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

    //debut afficher liste edition
    $scope.afficheListeEditionTiers = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "CLIENTFORNISSEUR",
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

    //debut liste des ZONE
    $scope.afficheListeZoneEditionCombo = function () {
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
          console.log($scope.listeDesZoneCombo);
        });
    };
    //fin liste des ZONE

    //debut liste des Succursales
    $scope.afficheListeSuccursales = function () {
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $rootScope.DATE_EX_EXERCICE,
          SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
          ZN_CODEZONE: $scope.FormListTiers.Zone,
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
        .post("/EditionTiers/ListeSuccursales/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSuccursales = reponse.data;
          if (
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE;
          } else {
            $scope.FormListTiers.Succursales = "";
          }
          console.log($scope.listeDesSuccursales);
        });
    };
    //fin liste des Succursales

    //debut liste des typefournisseur
    $scope.afficheListeTypeTiers = function () {
      if ($scope.tiPros == true) {
        $scope.objet_envoie = [
          {
            MG_CODEMODEGESTION: "11",
            EC_CODECRAN: "103",
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
          .post("/EditionTiers/ListeTypeTiersProspect/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listeDesTypeTiers = reponse.data;
            $scope.tiPros = false;
            $scope.FormListTiers.TypeTiers =
              $scope.listeDesTypeTiers[0].TP_CODETYPETIERS;
            $scope.afficheListeNatureTiers();
            console.log($scope.listeDesTypeTiers);
          });
      } else {
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
            $scope.FormListTiers.TypeTiers =
              $scope.listeDesTypeTiers[0].TP_CODETYPETIERS;
            $scope.afficheListeNatureTiers();
            console.log($scope.listeDesTypeTiers);
          });
      }
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
          TP_CODETYPETIERS: $scope.FormListTiers.TypeTiers,
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
          "/NatureTiers/ListeNatureDuTiersSelonType/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeNatureTiers = reponse.data;
          $scope.FormListTiers.NatureTiers =
            $scope.listeNatureTiers[0].NT_CODENATURETIERS;
          console.log($scope.listeNatureTiers);
        });
      $scope.objet_envoie = [
        {
          TC_CODECOMPTETYPETIERS: $scope.FormListTiers.TypeTiers,
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
      $scope.$emit("LOAD");
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

          if (
            $scope.listeEdition[j].ET_INDEX == "TI_LISTETIERS" ||
            $scope.listeEdition[j].ET_INDEX == "TI_LISTEPROSPECT"
          ) {
            $scope.DateDebut = true;
            $scope.Zone = false;
            $scope.Succursales = false;
            /* ($scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE), */
            $scope.FormListTiers.Zone = $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.Entrepot = false;
            ($scope.FormListTiers.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT),
              ($scope.TypeTiers = false);
            if ($scope.listeEdition[j].ET_INDEX == "TI_LISTETIERS") {
              $scope.tiPros = false;
              $scope.afficheListeTypeTiers();
              $scope.CompteAdditinnel = false;
              $scope.GroupeTiers = false;
              $scope.Section = false;
            } else {
              $scope.tiPros = true;
              $scope.afficheListeTypeTiers();
              $scope.CompteAdditinnel = true;
              $scope.GroupeTiers = true;
              $scope.Section = true;
            }

            $scope.NatureTiers = false;
            $scope.Pays = false;
            //$scope.GroupeTiers = false;
            //$scope.CompteAdditinnel = false;
            $scope.TVA = false;
            $scope.AIRSI = false;
            $scope.DateFin = false;
            ($scope.FormListTiers.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              // ($scope.Section = false);

              ($scope.btnGenerer = false);
            $scope.fermerBtnApercu = false;
            break;
          } else if (
            $scope.listeEdition[j].ET_INDEX == "TI_LISTETIERSDEPART" ||
            $scope.listeEdition[j].ET_INDEX == "TI_LISTENEWTIERS"
          ) {
            $scope.tiPros = false;
            $scope.afficheListeTypeTiers();
            $scope.FormListTiers.Zone = $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();

            $scope.DateDebut = false;
            ($scope.FormListTiers.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.Zone = false);
            $scope.Succursales = false;
            /* ($scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE), */
            $scope.Entrepot = false;
            ($scope.FormListTiers.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT),
              ($scope.TypeTiers = false);
            /* ($scope.FormListTiers.TypeTiers =
              $scope.listeDesTypeTiers[0].TP_CODETYPETIERS),*/
            $scope.NatureTiers = false;
            $scope.Pays = false;
            $scope.GroupeTiers = false;
            $scope.CompteAdditinnel = false;
            $scope.TVA = false;
            $scope.AIRSI = false;
            $scope.DateFin = false;
            ($scope.FormListTiers.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.Section = false);

            $scope.btnGenerer = false;
            $scope.fermerBtnApercu = false;
            break;
          } else if (
            $scope.listeEdition[j].ET_INDEX == "TI_LISTETIERSASOLDE" ||
            $scope.listeEdition[j].ET_INDEX == "TI_LISTETIERSASOLDENN"
          ) {
            $scope.DateDebut = true;
            $scope.Zone = false;
            $scope.Succursales = false;
            $scope.tiPros = false;
            $scope.afficheListeTypeTiers();
            $scope.FormListTiers.Zone = $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            /* ($scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE), */
            $scope.Entrepot = false;
            ($scope.FormListTiers.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT),
              ($scope.TypeTiers = false);
            //($scope.FormListTiers.TypeTiers =
            // $scope.listeDesTypeTiers[0].TP_CODETYPETIERS),
            $scope.NatureTiers = false;
            $scope.Pays = false;
            $scope.GroupeTiers = false;
            $scope.CompteAdditinnel = false;
            $scope.TVA = true;
            $scope.AIRSI = true;
            $scope.DateFin = false;
            ($scope.FormListTiers.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.Section = false);

            $scope.btnGenerer = false;
            $scope.fermerBtnApercu = false;
            break;
          } else if ($scope.listeEdition[j].ET_INDEX == "TI_LISTETIERSCHF") {
            $scope.DateDebut = true;
            $scope.Zone = false;
            $scope.Succursales = false;
            $scope.tiPros = false;
            $scope.afficheListeTypeTiers();
            $scope.FormListTiers.Zone = $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            /*  ($scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE), */
            $scope.Entrepot = false;
            ($scope.FormListTiers.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT),
              ($scope.TypeTiers = false);
            //($scope.FormListTiers.TypeTiers =
            //  $scope.listeDesTypeTiers[0].TP_CODETYPETIERS),
            $scope.DateFin = false;
            ($scope.FormListTiers.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.NatureTiers = false);
            $scope.Pays = false;
            $scope.GroupeTiers = false;
            $scope.CompteAdditinnel = false;
            $scope.TVA = true;
            $scope.AIRSI = true;
            $scope.Section = true;

            $scope.btnGenerer = false;
            $scope.fermerBtnApercu = false;
            break;
          } else if ($scope.listeEdition[j].ET_INDEX == "CA_RELENCE") {
            $scope.DateDebut = true;
            $scope.Zone = false;
            $scope.Succursales = false;
            $scope.Entrepot = false;
            $scope.TypeTiers = false;
            $scope.NatureTiers = true;
            $scope.Pays = true;
            $scope.GroupeTiers = false;
            $scope.CompteAdditinnel = false;
            $scope.TVA = true;
            $scope.AIRSI = true;
            $scope.DateFin = false;
            $scope.Section = true;
            $scope.tiPros = false;
            $scope.afficheListeTypeTiers();
            $scope.DateDebut = true;
            $scope.Zone = false;
            $scope.Succursales = false;
            $scope.FormListTiers.Zone = $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            /* ($scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE), */
            ($scope.FormListTiers.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT),
              //  ($scope.FormListTiers.TypeTiers =
              //    $scope.listeDesTypeTiers[0].TP_CODETYPETIERS),
              ($scope.FormListTiers.DateFin =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.btnGenerer = true);
            $scope.fermerBtnApercu = true;
            break;
          } else if ($scope.listeEdition[j].ET_INDEX == "ST_RDV") {
            $scope.DateDebut = false;
            ($scope.FormListTiers.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.Zone = false);
            $scope.Succursales = false;
            //$scope.tiPros = false;
            // $scope.afficheListeTypeTiers();
            /*  ($scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE), */
            $scope.FormListTiers.Zone = $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.Entrepot = false;
            ($scope.FormListTiers.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT),
              ($scope.DateFin = false);
            ($scope.FormListTiers.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.FormListTiers.TypeTiers = "");
            $scope.TypeTiers = true;
            $scope.FormListTiers.NatureTiers = "";
            $scope.NatureTiers = true;
            $scope.Pays = true;
            $scope.GroupeTiers = false;
            $scope.CompteAdditinnel = true;
            $scope.TVA = true;
            $scope.AIRSI = true;
            $scope.DateFin = false;
            $scope.Section = true;

            $scope.btnGenerer = false;
            $scope.fermerBtnApercu = false;
            break;
          } else if (
            $scope.listeEdition[j].ET_INDEX == "CLTF_COMMERCIAUX" ||
            $scope.listeEdition[j].ET_INDEX == "CLTF_CHAUFFEUR" ||
            $scope.listeEdition[j].ET_INDEX == "TI_LISTEVEHICULE"
          ) {
            $scope.DateDebut = true;
            $scope.Zone = false;
            $scope.Succursales = false;
            $scope.tiPros = false;
            $scope.afficheListeTypeTiers();
            $scope.FormListTiers.Zone = $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            /* ($scope.FormListTiers.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE), */
            $scope.Entrepot = false;
            ($scope.FormListTiers.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT),
              ($scope.DateFin = false);
            ($scope.FormListTiers.DateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.TypeTiers = true);
            $scope.NatureTiers = true;
            $scope.Pays = true;
            $scope.GroupeTiers = true;
            $scope.CompteAdditinnel = true;
            $scope.TVA = true;
            $scope.AIRSI = true;
            $scope.Section = true;

            $scope.btnGenerer = false;
            $scope.fermerBtnApercu = false;
            break;
          }
        }
      }
      $scope.$emit("UNLOAD");
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

      if (
        $scope.recuperationEtIndex == "TI_LISTETIERS" ||
        $scope.recuperationEtIndex == "TI_LISTETIERSDEPART" ||
        $scope.recuperationEtIndex == "TI_LISTENEWTIERS" ||
        $scope.recuperationEtIndex == "TI_LISTEPROSPECT" ||
        $scope.recuperationEtIndex == "TI_LISTETIERSASOLDE" ||
        $scope.recuperationEtIndex == "TI_LISTETIERSASOLDENN" ||
        $scope.recuperationEtIndex == "TI_LISTETIERSCHF" ||
        $scope.recuperationEtIndex == "CA_RELENCE" ||
        $scope.recuperationEtIndex == "CLTF_COMMERCIAUX" ||
        $scope.recuperationEtIndex == "ST_RDV" ||
        $scope.recuperationEtIndex == "CLTF_CHAUFFEUR" ||
        $scope.recuperationEtIndex == "TI_LISTEVEHICULE"
      ) {
        if (
          $scope.recuperationEtIndex == "TI_LISTETIERS" ||
          $scope.recuperationEtIndex == "TI_LISTEPROSPECT" ||
          $scope.recuperationEtIndex == "TI_LISTETIERSASOLDE" ||
          $scope.recuperationEtIndex == "TI_LISTETIERSASOLDENN" ||
          $scope.recuperationEtIndex == "TI_LISTETIERSCHF"
        ) {
          if (
            $scope.FormListTiers.DateFin === "" ||
            $scope.FormListTiers.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.TypeTiers === "" ||
            $scope.FormListTiers.TypeTiers === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idTypeTiers").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Entrepot === "" ||
            $scope.FormListTiers.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Succursales === "" ||
            $scope.FormListTiers.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: "1000",
                // AG_CODEAGENCE: $scope.FormListTiers.Succursales,
                EN_CODEENTREPOT: $scope.FormListTiers.Entrepot,
                GP_CODEGROUPE: $scope.FormListTiers.GroupeTiers,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                TP_CODETYPECLIENT: $scope.FormListTiers.TypeTiers,
                TC_CODECOMPTETYPETIERS: "",
                DATEDEBUT: "01-01-1900",
                DATEFIN: $scope.FormListTiers.DateFin,
                TI_TVA: $scope.FormListTiers.TVA,
                TI_ASDI: $scope.FormListTiers.AIRSI,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                SC_CODESECTION: $scope.FormListTiers.Section,
                PY_CODEPAYS: $scope.FormListTiers.Pays,
                NT_CODENATURETIERS: $scope.FormListTiers.NatureTiers,
                SL_LIBELLEECRAN: "Saisie de Continent",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                NOMETAT: $scope.recuperationnomfichier,
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
                "/EditionTiers/InserteditiontiersFournisseur/",
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
          $scope.recuperationEtIndex == "TI_LISTETIERSDEPART" ||
          $scope.recuperationEtIndex == "TI_LISTENEWTIERS"
        ) {
          if (
            $scope.FormListTiers.DateDebut === "" ||
            $scope.FormListTiers.DateDebut === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateDebut").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.DateFin === "" ||
            $scope.FormListTiers.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.TypeTiers === "" ||
            $scope.FormListTiers.TypeTiers === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idTypeTiers").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Entrepot === "" ||
            $scope.FormListTiers.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Succursales === "" ||
            $scope.FormListTiers.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: "1000",
                // AG_CODEAGENCE: $scope.FormListTiers.Succursales,
                EN_CODEENTREPOT: $scope.FormListTiers.Entrepot,
                GP_CODEGROUPE: $scope.FormListTiers.GroupeTiers,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                TP_CODETYPECLIENT: $scope.FormListTiers.TypeTiers,
                TC_CODECOMPTETYPETIERS: $scope.FormListTiers.TypeTiers,
                DATEDEBUT: $scope.FormListTiers.DateDebut,
                DATEFIN: $scope.FormListTiers.DateFin,
                TI_TVA: $scope.FormListTiers.TVA,
                TI_ASDI: $scope.FormListTiers.AIRSI,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                SC_CODESECTION: $scope.FormListTiers.Section,
                PY_CODEPAYS: $scope.FormListTiers.Pays,
                NT_CODENATURETIERS: $scope.FormListTiers.NatureTiers,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                SL_LIBELLEECRAN: "Saisie de Continent",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                NOMETAT: $scope.recuperationnomfichier,
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
                "/EditionTiers/InserteditiontiersFournisseur/",
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
        } else if ($scope.recuperationEtIndex == "CLTF_COMMERCIAUX") {
          if (
            $scope.FormListTiers.DateFin === "" ||
            $scope.FormListTiers.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Entrepot === "" ||
            $scope.FormListTiers.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Succursales === "" ||
            $scope.FormListTiers.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                GP_CODEGROUPE: $scope.FormListTiers.GroupeTiers,
                TI_TVA: $scope.FormListTiers.TVA,
                TI_ASDI: $scope.FormListTiers.AIRSI,
                SC_CODESECTION: $scope.FormListTiers.Section,
                NT_CODENATURETIERS: $scope.FormListTiers.NatureTiers,
                AG_CODEAGENCE: "1000",
                // AG_CODEAGENCE: $scope.FormListTiers.Succursales,
                EN_CODEENTREPOT: $scope.FormListTiers.Entrepot,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                TP_CODETYPECLIENT: $scope.FormListTiers.TypeTiers,
                TC_CODECOMPTETYPETIERS: $scope.FormListTiers.TypeTiers,
                DATEDEBUT: "01-01-1900",
                DATEFIN: $scope.FormListTiers.DateFin,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                PY_CODEPAYS: $scope.FormListTiers.Pays,
                SL_LIBELLEECRAN: "Saisie de Continent",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                NOMETAT: $scope.recuperationnomfichier,
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
                "/EditionTiers/InserteditiontiersCommerciaux/",
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
        } else if ($scope.recuperationEtIndex == "CLTF_CHAUFFEUR") {
          if (
            $scope.FormListTiers.DateFin === "" ||
            $scope.FormListTiers.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Entrepot === "" ||
            $scope.FormListTiers.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Succursales === "" ||
            $scope.FormListTiers.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                GP_CODEGROUPE: $scope.FormListTiers.GroupeTiers,
                TI_TVA: $scope.FormListTiers.TVA,
                TI_ASDI: $scope.FormListTiers.AIRSI,
                SC_CODESECTION: $scope.FormListTiers.Section,
                NT_CODENATURETIERS: $scope.FormListTiers.NatureTiers,
                AG_CODEAGENCE: "1000",
                // AG_CODEAGENCE: $scope.FormListTiers.Succursales,
                EN_CODEENTREPOT: $scope.FormListTiers.Entrepot,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                TP_CODETYPECLIENT: $scope.FormListTiers.TypeTiers,
                TC_CODECOMPTETYPETIERS: $scope.FormListTiers.TypeTiers,
                DATEDEBUT: "01-01-1900",
                DATEFIN: $scope.FormListTiers.DateFin,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                PY_CODEPAYS: $scope.FormListTiers.Pays,
                SL_LIBELLEECRAN: "Saisie de Continent",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                NOMETAT: $scope.recuperationnomfichier,
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
                "/EditionTiers/InserteditiontiersChauffeur/",
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
        } else if ($scope.recuperationEtIndex == "TI_LISTEVEHICULE") {
          if (
            $scope.FormListTiers.DateFin === "" ||
            $scope.FormListTiers.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Entrepot === "" ||
            $scope.FormListTiers.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Succursales === "" ||
            $scope.FormListTiers.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: "1000",
                // AG_CODEAGENCE: $scope.FormListTiers.Succursales,
                EN_CODEENTREPOT: $scope.FormListTiers.Entrepot,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                DATEDEBUT: "01-01-1900",
                DATEFIN: $scope.FormListTiers.DateFin,
                SL_LIBELLEECRAN: "Saisie de Continent",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                NOMETAT: $scope.recuperationnomfichier,
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
                "/EditionTiers/InserteditiontiersVehicule/",
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
        } else if ($scope.recuperationEtIndex == "ST_RDV") {
          if (
            $scope.FormListTiers.DateDebut === "" ||
            $scope.FormListTiers.DateDebut === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateDebut").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.DateFin === "" ||
            $scope.FormListTiers.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Entrepot === "" ||
            $scope.FormListTiers.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else if (
            $scope.FormListTiers.Succursales === "" ||
            $scope.FormListTiers.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $rootScope.ChampsNonRenseignes();
          } else {
            $scope.objet_envoie = [
              {
                GP_CODEGROUPE: $scope.FormListTiers.GroupeTiers,
                AG_CODEAGENCE: "1000",
                // AG_CODEAGENCE: $scope.FormListTiers.Succursales,
                EN_CODEENTREPOT: $scope.FormListTiers.Entrepot,
                MS_DATERENDEZVOUS1: "01-01-1900",
                MS_DATERENDEZVOUS2: $scope.FormListTiers.DateFin,
                DATEDEBUT: $scope.FormListTiers.DateDebut,
                DATEFIN: $scope.FormListTiers.DateFin,
                SL_LIBELLEECRAN: "Saisie de Continent",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                LG_CODELANGUE: "fr",
                NOMETAT: $scope.recuperationnomfichier,
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
                "/EditionTiers/InserteditiontiersRdv/",
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
        } else if ($scope.recuperationEtIndex == "CA_RELENCE") {
          if (
            $scope.FormListTiers.DateFin === "" ||
            $scope.FormListTiers.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
          } else if (
            $scope.FormListTiers.TypeTiers === "" ||
            $scope.FormListTiers.TypeTiers === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idTypeTiers").css("background-color", "#FFE9E0");
          } else if (
            $scope.FormListTiers.Entrepot === "" ||
            $scope.FormListTiers.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
          } else if (
            $scope.FormListTiers.Succursales === "" ||
            $scope.FormListTiers.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
          } else {
            if (
              $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $http
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
                  $scope.fermerBtnGenerer = false;
                  $scope.fermerBtnApercu = true;
                  $scope.loading = false; // Arrêt du chargement
                });
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
              );
            }
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
              $scope.FormListTiers.DateFin === "" ||
              $scope.FormListTiers.DateFin === undefined
            ) {
              $("#idDateFin").css("background-color", "#FFE9E0");
            } else if (
              $scope.FormListTiers.TypeTiers === "" ||
              $scope.FormListTiers.TypeTiers === undefined
            ) {
              $("#idTypeTiers").css("background-color", "#FFE9E0");
            } else if (
              $scope.FormListTiers.Entrepot === "" ||
              $scope.FormListTiers.Entrepot === undefined
            ) {
              $("#idEntrepot").css("background-color", "#FFE9E0");
            } /* else if (
              $scope.FormListTiers.Succursales === "" ||
              $scope.FormListTiers.Succursales === undefined
            ) {
              $("#idSuccursales").css("background-color", "#FFE9E0");
            } */ else {
              $scope.nomDeEtat = "";
              for (var index = 0; index < $scope.listeEdition.length; index++) {
                if ($scope.listeEdition[index].ET_INDEX == "CA_RELENCE") {
                  $scope.nomDeEtat = $scope.listeEdition[index].ET_NOMETAT;
                  break;
                }
              }

              $scope.objet_envoie = [
                {
                  GP_CODEGROUPE: $scope.FormListTiers.GroupeTiers,
                  TI_TVA: $scope.FormListTiers.TVA,
                  TI_ASDI: $scope.FormListTiers.AIRSI,
                  SC_CODESECTION: $scope.FormListTiers.Section,
                  NT_CODENATURETIERS: $scope.FormListTiers.NatureTiers,
                  AG_CODEAGENCE: "1000",
                  EN_CODEENTREPOT: $scope.FormListTiers.Entrepot,
                  OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                  ET_TYPEETAT: $scope.listeEdition[j].ET_TYPEETAT,
                  DATEDEBUT: "01-01-1900",
                  DATEFIN: $scope.FormListTiers.DateFin,
                  MS_DATERENDEZVOUS1: "01-01-1900",
                  MS_DATERENDEZVOUS2: $scope.FormListTiers.DateFin,
                  TC_CODECOMPTETYPETIERS: "",
                  ET_LIBELLEETAT: $scope.nomDeEtat,
                  NOMETAT: $scope.nomDeEtat,
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
