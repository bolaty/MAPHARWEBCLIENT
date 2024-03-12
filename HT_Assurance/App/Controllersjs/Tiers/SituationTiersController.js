MapharApp.controller("SituationTiersController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    //DEBUT MODULE JS
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );

    $rootScope.infoDeLaColl = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    $rootScope.NumSouscripteurSearch = angular.fromJson(
      localStorage.getItem("leNumeroDuTiers")
    );

    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.DATE_PREMIER_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
    //FIN MODULE JS

    /*DEBUT ZONE DE DECLARATION*/

    $scope.objet_envoie = [];
    $scope.FormAddSituationTiers = {
      Code: "",
      Denomination: "",
      Gerant: "",
      SecteurActivite: "",
      Description: "",
      Sexe: "",
      SituationMatri: "",
      DateNaiss: "",
      Profession: "",
      TypeTiers: "",
      Tva: "",
      PlafondCredit: "",
      Asdi: "",
      NumCc: "",
      Telephone: "",
      SiteWeb: "",
      Fax: "",
      Email: "",
      AdresseGeo: "",
    };
    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
    };
    $scope.FormListConsultation = {
      dateDebut: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      dateFin: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      codeMedecin: "",
      nomMedecin: "",
      codePatient: "",
      nomPatient: "",
      numDossier: "",
      Code: "",
    };
    $scope.FormListVentes = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numBordereau: "",
      typeClient: "",
      groupe: "",
      numClient: "",
      nomClient: "",
      numComm: "",
      nomComm: "",
      natArticle: "",
      typeArticle: "",
      article: "",
      operateur: "",
    };
    $scope.listeSecteurActivite = [];
    $scope.listeSexe = [];
    $scope.listeSituationMatri = [];
    $scope.listeProfession = [];
    $scope.listeTypeTiers = [];
    $scope.listeTva = [];
    $scope.listeAsdi = [];
    $scope.listeDesSouscripteursMedecins = [];
    $scope.listeConsultation = [];
    $scope.idConsultation = [];

    /*FIN ZONE DE DECLARATION*/

    //*DEBUT FONCTION GENERALE
    //debut initialisation List Consultation
    $scope.initFormListConsultation = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeTiersSouscripteur();
      $scope.afficheListeTiersSouscripteurMedecin();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation List Consultation

    //debut initialisation List Ventes
    $scope.initFormListeVentes = function () {
      $scope.afficheListeOperateur();
      $scope.afficheListeNatureArticle();
      $scope.afficheListeTypeClient();
    };
    //fin initialisation List Ventes
    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut voir plus multirisque professionnel
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpMultirisquePro", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpMultirisquePro"));
      console.log($scope.recuperer);
    };
    //fin voir plus multirisque professionnel

    //debut aller a saisie rdv
    $scope.redirectSaisieRdv = function () {
      $scope.cacherEnrg = "liste";
      localStorage.setItem("infoBouton", angular.toJson($scope.cacherEnrg));
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/saisie-rdv";
    };
    //fin aller a saisie rdv

    //debut aller a suivi client
    $scope.redirectSuiviClient = function () {
      $scope.cacherEnrg = "liste";
      localStorage.setItem("infoBouton", angular.toJson($scope.cacherEnrg));
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/suivi-client";
    };
    //fin aller a suivi client

    //debut aller a consultation des questionnaires
    $scope.redirectConsultationQuestionnaire = function () {
      window.location.href =
        "#/assurances/contrat/voyage/consultation-questionnaires";
    };
    //fin aller a consultation des questionnaires

    //debut aller a relevé client
    $scope.redirectReleveClient = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/releve-client";
    };
    //fin aller a relevé client

    //debut aller a consultation de reglement
    $scope.redirectConsultReglement = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/consultation-reglement";
    };
    //fin aller a consultation de reglement

    //debut aller a suivi dossier
    $scope.redirectSuiviDossier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/suivi-dossier";
    };
    //fin aller a suivi dossier

    //debut aller a ouverture de dossier
    $scope.redirectOuvertureDossier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/ouverture-dossier";
    };
    //fin aller a ouverture de dossier

    //<----DEBUT REDIRECT LISTE CONTRAT---->

    //<----FIN REDIRECT LISTE CONTRAT---->

    $scope.typeOperation = "";
    $scope.initFormAddSituationTiers = function (item) {
      $scope.FormListConsultation = {};
      if (item == 1) {
        $scope.typeOperation = "client";
        $scope.titreDeLaModal = "Liste des tiers";
        $rootScope.lEcran = item;
        if (
          sessionStorage.getItem("souscripteurChoisi") != null &&
          $rootScope.ecransSituation == item
        ) {
          var lesInfos = JSON.parse(
            localStorage.getItem("CollReglementMultirisquePro")
          );
          sessionStorage.removeItem("souscripteurChoisi");
          $scope.choixSouscripteur2(lesInfos);
        } else {
          $scope.FormListConsultation = {};
          sessionStorage.removeItem("souscripteurChoisi");
        }
      } else if (item == 2) {
        $scope.typeOperation = "fournisseur";
        $scope.titreDeLaModal = "Liste des commerciaux";
        $rootScope.lEcran = item;
      } else {
        $scope.typeOperation = "assureur";
        $scope.titreDeLaModal = "Liste des assureurs";
        $rootScope.lEcran = item;
      }
    };
    //

    //*FIN FONCTION GENERALE

    //DEBUT DEV D.YAYA

    //debut liste operateur
    $scope.afficheListeOperateur = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
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
        .post("/Operateur/ComboOperateur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeOperateur = reponse.data;
        });
    };
    //fin liste operateur

    //debut liste nature article
    $scope.afficheListeNatureArticle = function () {
      $scope.objet_envoie = [
        {
          //"AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          PP_CODEMODEGESTION: "11",
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
        .post("/NatureArticle/ListeNatureArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureArticle = reponse.data;
        });
    };
    //fin liste nature article

    //debut liste type article
    $scope.afficheListeTypeArticle = function (codeNatArt) {
      $scope.objet_envoie = [
        {
          //"AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          NT_CODENATURETYPEARTICLE: codeNatArt,
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
        .post("/TypeArticle/ListeTypeArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeArticle = reponse.data;
        });
    };
    //fin liste type article

    //debut liste type article
    $scope.afficheListeTypeClient = function () {
      $scope.objet_envoie = [
        {
          TP_CODETYPETIERS: "001",
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
        .post("/TypeClient/ListeTypeDuClient/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeClient = reponse.data;
        });
    };
    //fin liste type article

    //debut liste article
    $scope.afficheListeArticle = function (codeTypeArt) {
      $scope.objet_envoie = [
        {
          //"AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          TA_CODETYPEARTICLE: codeTypeArt,
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
        .post("/Article/ListeArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeArticle = reponse.data;
        });
    };
    //fin liste article

    //Debut choix d'un souscripteur liste
    $scope.choixSouscripteurMedecin = function (
      medecinCode,
      denominationMedecin,
      idMedecin
    ) {
      $scope.FormListConsultation.codeMedecin = medecinCode;
      $scope.FormListConsultation.nomMedecin = denominationMedecin;
      if ($scope.etatForm == "2") {
        $scope.FormListConsultation.idModif2 = id;
        $scope.FormListConsultation.idMedecin1 =
          $scope.FormListConsultation.idModif2;
      } else {
        $scope.FormListConsultation.idMedecin1 = idMedecin;
      }

      $scope.verou1 = true;
    };
    //Fin choix d'un souscripteur liste

    //debut liste des souscripteur Consultation liste
    $scope.afficheListeTiersSouscripteurMedecin = function () {
      if (
        ($scope.FormListConsultation.Code == "" ||
          $scope.FormListConsultation.Code == undefined) &&
        ($scope.FormListConsultation.Denomination == "" ||
          $scope.FormListConsultation.Denomination == undefined)
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            TP_CODETYPETIERS: "",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "MEDECIN",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            TP_CODETYPETIERS: "",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormListConsultation.Code,
            TI_DENOMINATION: $scope.FormListConsultation.Denomination,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "MEDECIN",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      }

      $http
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSouscripteursMedecins = reponse.data;
        });
    };
    //fin liste des souscripteur Consultation liste

    //Debut choix d'un souscripteur liste
    $scope.choixSouscripteurPatient = function (code, denomination, id) {
      $scope.FormListConsultation.codePatient = code;
      $scope.FormListConsultation.nomPatient = denomination;
      $scope.FormListConsultation.id1 = id;
      $scope.verou1 = true;
    };
    //Fin choix d'un souscripteur liste

    $scope.leChargement = true;
    //debut liste des souscripteur Consultation liste
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      if (
        ($scope.FormListConsultation.Code == "" ||
          $scope.FormListConsultation.Code == undefined) &&
        ($scope.FormListConsultation.Denomination == "" ||
          $scope.FormListConsultation.Denomination == undefined)
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "CLIENT",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormListConsultation.Code,
            TI_DENOMINATION: $scope.FormListConsultation.Denomination,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "CLIENT",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      }

      $http
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.leChargement = false;
          $scope.listeDesSouscripteurs = reponse.data;
          console.log($scope.listeDesSouscripteurs);
        });
    };
    //fin liste des souscripteur Consultation liste

    $scope.FormSituation = {
      choixRisque: "",
    };

    // debut combo risque
    $scope.listeRisque = [];
    $scope.comboRisque = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "COMBO",
          SL_LIBELLEMOUCHARD: "SITUATION DES TIERS",
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
        .post("/Risque/ListeRisque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeRisque = reponse.data;
        });
    };
    // fin combo risque

    //debut afficher liste operation
    $scope.listeOperation = [];
    $scope.listeOperationObjet = "";
    $scope.afficheListeOperation = function (numTiers) {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_NUMPOLICE: "",
          TI_NUMTIERS: numTiers,
          TI_DENOMINATION: "",
          TI_NUMTIERSCOMMERCIAL: "",
          TI_DENOMINATIONCOMMERCIAL: "",
          DATEDEBUT: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          DATEFIN: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          RQ_CODERISQUE: $scope.FormSituation.choixRisque,
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
        .post("/Contrat/ListeContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeOperation = reponse.data;
          console.log($scope.listeOperation);
          $scope.listeOperationObjet = $scope.listeOperation[0];
          localStorage.setItem(
            "CollReglementMultirisquePro",
            JSON.stringify($scope.listeOperationObjet)
          );
        });
    };
    //fin afficher liste operation

    // Debut garder les infos dans les champs
    $scope.infoGardee = function () {
      sessionStorage.setItem("souscripteurChoisi", "true");
      $rootScope.ecransSituation = 1;
    };
    // fin garder les infos dans les champs

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (lesInfos) {
      $scope.FormListConsultation.id01 = lesInfos.TI_IDTIERS;
      $scope.FormListConsultation.Code = lesInfos.TI_NUMTIERS;

      localStorage.setItem(
        "leNumeroDuTiers",
        JSON.stringify(lesInfos.TI_NUMTIERS)
      );
      localStorage.setItem("CollReglementMultirisquePro", JSON.stringify(lesInfos));

      $scope.FormListConsultation.Denomination = lesInfos.TI_DENOMINATION;
      $scope.FormListConsultation.AdresseGeo = lesInfos.TI_ADRESSEGEOGRAPHIQUE;
      $scope.FormListConsultation.Fax = lesInfos.TI_FAX;
      $scope.FormListConsultation.Telephone = lesInfos.TI_TELEPHONE;
      $scope.FormListConsultation.Tva = lesInfos.TI_TVA;
      $scope.FormListConsultation.Email = lesInfos.TI_EMAIL;
      $scope.FormListConsultation.Sexe = lesInfos.SX_LIBELLE;
      $scope.FormListConsultation.Asdi = lesInfos.TI_ASDI;
      $scope.FormListConsultation.DateNaiss = lesInfos.TI_DATENAISSANCE;
      $scope.FormListConsultation.Gerant = lesInfos.TI_GERANT;
      $scope.FormListConsultation.TypeTiers = lesInfos.TP_LIBELLE;
      $scope.FormListConsultation.Description = lesInfos.TI_DESCRIPTIONTIERS;
      $scope.FormListConsultation.SecteurActivite = lesInfos.AC_LIBELLE;
      $scope.FormListConsultation.Profession = lesInfos.PF_LIBELLE;
      $scope.FormListConsultation.PlafondCredit = lesInfos.TI_PLAFONDCREDIT;
      $scope.FormListConsultation.NumCc = lesInfos.TI_NUMCPTECONTIBUABLE;
      $scope.FormListConsultation.SiteWeb = lesInfos.TI_SITEWEB;

     // $scope.afficheListeOperation($scope.FormListConsultation.Code);

      // $scope.isdisabled = true;
    };

    $scope.choixSouscripteur2 = function (lesInfos) {
      $scope.FormListConsultation.id01 = lesInfos.TI_IDTIERS;
      $scope.FormListConsultation.Code = lesInfos.TI_NUMTIERS;

      localStorage.setItem(
        "leNumeroDuTiers",
        JSON.stringify(lesInfos.TI_NUMTIERS)
      );
      localStorage.setItem("CollReglementMultirisquePro", JSON.stringify(lesInfos));

      $scope.FormListConsultation.Denomination = lesInfos.TI_DENOMINATION;
      $scope.FormListConsultation.AdresseGeo = lesInfos.TI_ADRESSEGEOGRAPHIQUE;
      $scope.FormListConsultation.Fax = lesInfos.TI_FAX;
      $scope.FormListConsultation.Telephone = lesInfos.TI_TELEPHONE;
      $scope.FormListConsultation.Tva = lesInfos.TI_TVA;
      $scope.FormListConsultation.Email = lesInfos.TI_EMAIL;
      $scope.FormListConsultation.Sexe = lesInfos.SX_LIBELLE;
      $scope.FormListConsultation.Asdi = lesInfos.TI_ASDI;
      $scope.FormListConsultation.DateNaiss = lesInfos.TI_DATENAISSANCE;
      $scope.FormListConsultation.Gerant = lesInfos.TI_GERANT;
      $scope.FormListConsultation.TypeTiers = lesInfos.TP_LIBELLE;
      $scope.FormListConsultation.Description = lesInfos.TI_DESCRIPTIONTIERS;
      $scope.FormListConsultation.SecteurActivite = lesInfos.AC_LIBELLE;
      $scope.FormListConsultation.Profession = lesInfos.PF_LIBELLE;
      $scope.FormListConsultation.PlafondCredit = lesInfos.TI_PLAFONDCREDIT;
      $scope.FormListConsultation.NumCc = lesInfos.TI_NUMCPTECONTIBUABLE;
      $scope.FormListConsultation.SiteWeb = lesInfos.TI_SITEWEB;

    //  $scope.afficheListeOperation($scope.FormListConsultation.Code);

      // $scope.isdisabled = true;
    };
    //Fin choix d'un souscripteur

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

    // DEBUT ANNEE BISSEXTILE
    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };
    //FIN ANNEE BISSEXTILE

    //debut pour annuler la recherche
    $scope.listeAnnulerMRP = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idNumSouscripteur").css("background-color", "#FFFFFF");
        $("#idNomSouscripteur").css("background-color", "#FFFFFF");
        $("#idNumCommercial").css("background-color", "#FFFFFF");
        $("#idNomCommercial").css("background-color", "#FFFFFF");
      });
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
    };
    //fin pour annuler la recherche

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    $scope.donnerLeCodeRisque = function (position) {
      $rootScope.maPosition = position;
    };

    //debut afficher liste multirisque pro
    $scope.afficheListeContrat = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
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
        numDePolice === undefined ||
        numSouscrp === undefined ||
        nomSouscrp === undefined ||
        numCom === undefined ||
        nomCom === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numDePolice === undefined) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (numSouscrp === undefined) {
            $("#idNumSouscripteur").css("background-color", "#FFE9E0");
          }
          if (nomSouscrp === undefined) {
            $("#idNomSouscripteur").css("background-color", "#FFE9E0");
          }
          if (numCom === undefined) {
            $("#idNumCommercial").css("background-color", "#FFE9E0");
          }
          if (nomCom === undefined) {
            $("#idNomCommercial").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeContrat = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
        $scope.listeContrat = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeContrat = "";
      } else {
        $scope.leCodeRisque = "";
        if ($rootScope.maPosition === "01") {
          $scope.leCodeRisque = "01";
        } else if ($rootScope.maPosition === "02") {
          $scope.leCodeRisque = "02";
        } else if ($rootScope.maPosition === "03") {
          $scope.leCodeRisque = "03";
        } else if ($rootScope.maPosition === "04") {
          $scope.leCodeRisque = "04";
        } else if ($rootScope.maPosition === "05") {
          $scope.leCodeRisque = "05";
        } else if ($rootScope.maPosition === "06") {
          $scope.leCodeRisque = "06";
        } else if ($rootScope.maPosition === "07") {
          $scope.leCodeRisque = "07";
        } else if ($rootScope.maPosition === "08") {
          $scope.leCodeRisque = "08";
        } else if ($rootScope.maPosition === "09") {
          $scope.leCodeRisque = "09";
        } else if ($rootScope.maPosition === "10") {
          $scope.leCodeRisque = "10";
        }

        $scope.TI_NUMTIERS = "";
        $scope.TI_NUMTIERSCOMMERCIAL = "";
        if ($rootScope.lEcran == 2) {
          $scope.TI_NUMTIERSCOMMERCIAL = $rootScope.NumSouscripteurSearch;
        } else {
          $scope.TI_NUMTIERS = $rootScope.NumSouscripteurSearch;
        }

        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: $scope.leCodeRisque,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp === "" ? $scope.TI_NUMTIERS : numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL:
              numCom === "" ? $scope.TI_NUMTIERSCOMMERCIAL : numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "03",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
          .post("/Contrat/ListeContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContrat = reponse.data;
            if ($scope.listeContrat[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                "Ce tiers n'a pas de contrat en cours d'opération pour ce risque"
              );
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.listeContrat[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste multirisque pro

    //debut fonction pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.FormListConsultation.dateDebut =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListConsultation.dateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListConsultation.codeMedecin = "";
      $scope.FormListConsultation.nomMedecin = "";
      $scope.FormListConsultation.codePatient = "";
      $scope.FormListConsultation.nomPatient = "";
      $scope.FormListConsultation.numDossier = "";
      setTimeout($scope.rechargePage, 3600);
    };
    //fin fonction pour annuler la recherche

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idCode1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnomPatient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCode2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnomMedecin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateDebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateFin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnumDossier").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste Consultation
    $scope.afficheListeConsultation = function (
      dateDebut,
      dateFin,
      codePatient,
      nomPatient,
      codeMedecin,
      nomMedecin,
      numDossier
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

      if (dateDebut !== undefined) {
        $scope.lAnneePeriodeDu = dateDebut.substr(6, 4);
        $scope.leMoisPeriodeDu = dateDebut.substr(3, 2);
        $scope.leJourPeriodeDu = dateDebut.substr(0, 2);
      }
      if (dateFin !== undefined) {
        $scope.lAnneeperiodeAu = dateFin.substr(6, 4);
        $scope.leMoisperiodeAu = dateFin.substr(3, 2);
        $scope.leJourperiodeAu = dateFin.substr(0, 2);
      }

      if (
        dateDebut === "" ||
        dateDebut === undefined ||
        dateFin === "" ||
        dateFin === undefined ||
        codePatient === undefined ||
        nomPatient === undefined ||
        codeMedecin === undefined ||
        nomMedecin === undefined ||
        numDossier === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (dateDebut === "" || dateDebut === undefined) {
            $("#idDateDebut").css("background-color", "#FFE9E0");
          }
          if (dateFin === "" || dateFin === undefined) {
            $("#idDateFin").css("background-color", "#FFE9E0");
          }
          if (codePatient === undefined) {
            $("#Code1").css("background-color", "#FFE9E0");
          }
          if (nomPatient === undefined) {
            $("#idnomPatient").css("background-color", "#FFE9E0");
          }
          if (codeMedecin === undefined) {
            $("#idCode2").css("background-color", "#FFE9E0");
          }
          if (nomMedecin === undefined) {
            $("#idnomMedecin").css("background-color", "#FFE9E0");
          }
          if (numDossier === undefined) {
            $("#idnumDossier").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeConsultation = "";
      } else if (typeDate.test(dateDebut) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateDebut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
          $("#idDateDebut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(dateDebut) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(dateDebut) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listeConsultation = "";
      } else if (
        $scope.dateSuperioriteDebut(dateDebut) >
        $scope.dateSuperioriteFin(dateFin)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateDebut").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeConsultation = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_NUMTIERSPATIENT: codePatient,
            TI_DENOMINATIONPATIENT: nomPatient,
            TI_NUMTIERSMEDECIN: codeMedecin,
            TI_DENOMINATIONMEDECIN: nomMedecin,
            CO_NUMERODOSSIER: numDossier,
            DATEDEBUT: dateDebut,
            DATEFIN: dateFin,
            CO_CODECONSULTATION: "",
            CO_CODECONSULTATION1: "",
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
          .post("/Consultation/ListeConsultation/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeConsultation = reponse.data.reverse();
            if (
              $scope.listeConsultation[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeConsultation[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste Consultation

    //debut annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumBord").css("background-color", "#FFFFFF");
        $("#idNumClient").css("background-color", "#FFFFFF");
        $("#idNumComm").css("background-color", "#FFFFFF");
        $("#idNatArticle").css("background-color", "#FFFFFF");
        $("#idTypeArticle").css("background-color", "#FFFFFF");
        $("#idArticle").css("background-color", "#FFFFFF");
      });
      $scope.FormListVentes = {};
      $scope.FormListVentes.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListVentes.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListVentes.numBordereau = "";
      $scope.FormListVentes.numClient = "";
      $scope.FormListVentes.numComm = "";
    };
    //fin annuler la recherche

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumBord").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumClient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumComm").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatArticle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeArticle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idArticle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste vente
    $scope.afficheListeVente = function (
      periodeDu,
      periodeAu,
      numBordereau,
      typeClient,
      groupe,
      numClient,
      nomClient,
      numComm,
      nomComm,
      natArticle,
      typeArticle,
      article,
      operateur
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      // let typeAlphabetique = /^[a-z-A-Z]/;
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
        $scope.FormListVentes.numBordereau === undefined ||
        typeClient === undefined ||
        groupe === undefined ||
        numClient === undefined ||
        nomClient === undefined ||
        numComm === undefined ||
        nomComm === undefined ||
        natArticle === undefined ||
        typeArticle === undefined ||
        article === undefined ||
        operateur === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numBordereau === undefined) {
            $("#idNumBord").css("background-color", "#FFE9E0");
          }
          if (numClient === undefined) {
            $("#idNumClient").css("background-color", "#FFE9E0");
          }
          if (numComm === undefined) {
            $("#idNumComm").css("background-color", "#FFE9E0");
          }
          if (natArticle === undefined) {
            $("#idNatArticle").css("background-color", "#FFE9E0");
          }
          if (typeArticle === undefined) {
            $("#idTypeArticle").css("background-color", "#FFE9E0");
          }
          if (article === undefined) {
            $("#idArticle").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeVentes = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (natArticle !== "" && (typeArticle == "" || article == "")) {
        $scope.$emit("UNLOAD");
        if (typeArticle == "")
          $("#idTypeArticle").css("background-color", "#FFE9E0");
        if (article == "") $("#idArticle").css("background-color", "#FFE9E0");
        $scope.messageErreur =
          "Sélectionnez le type article et l'article ou déselectionnez la nature article";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $rootScope.dateFinIncorrecte();
        $scope.listeVentes = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $rootScope.dateDebutIncorrecte();
        $scope.listeVentes = "";
      } else {
        // partie a terminer demain
        $scope.objet_envoie = [
          {
            MS_NUMPIECE: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            MS_ANNULATIONPIECE: "N",
            TYPEOPERATION: "01",
            TP_CODETYPETIERS: "001", //
            NT_CODENATURETYPEARTICLE: "",
            CO_NUMCOMMERCIAL: "",
            CO_NOMPRENOM: "",
            NT_CODENATURETIERS: "",
            NO_CODENATUREOPERATION: "''SORT'',''FACT''", //
            AR_CODEARTICLE1: "",
            GP_CODEGROUPE: "",
            TYPELISTE: "",
            CO_CODECONSULTATION: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_NUMTIERS: "",
            TI_DENOMINATION: nomClient,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          .post("/ApproVente/ListeApproVente/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeVentes = reponse.data;
            console.log($scope.listeVentes);
            if ($scope.listeVentes[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeVentes[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste vente

    //FIN DEV D.YAYA

    $scope.retourSurSituation = function () {
      if ($rootScope.retourSitTiersAssureur == "2") {
        window.location.href = "#/Tiers/SituationDesAssureurs";
      } else if ($rootScope.retourSitTiersAssureur == "4") {
        window.location.href = "#/Tiers/SituationDesCommerciaux";
      } else {
        window.location.href = "#/assurances-gestion/Tiers/SituationTiers";
      }
    };

    // DEBUT LES REDIRECTIONS

    //redirectListeConsultation
    $scope.redirectListeConsultation = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/ListeConsultation";
    };
    //redirectListeConsultation

    //redirectListeVentes
    $scope.redirectListeVentes = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href = "#/Assurances-gestion/Tiers/liste/ListeVentes";
    };
    //redirectListeVentes

    //debut aller a relevé commission
    $scope.redirectReleveCommission = function () {
      $rootScope.retourSitTiersAssureur = "1";
      /*  window.location.href =
        "#/assurances/operation/multirisque-pro/liste/releve-commission"; */
      /* window.location.href =
        "#/assurances/operation/multirisque-pro/liste/consultation-reglement"; */
      window.location.href =
        "#/gestion/tiers/situation_tiers/consultation_reglement";
    };
    //fin aller a relevé commission

    //redirectListeConsultation
    $scope.redirectFacturesCumulees = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/FacturesCumulees";
    };
    //redirectListeConsultation

    //redirectMultiRisquePro
    $scope.redirectMultiRisquePro = function () {
      $rootScope.retourSitTiersAssureur = "1";
      $scope.cacherEnrg = "liste";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Multi-Risque-Professionel";
    };
    //redirectMultiRisquePro

    //redirectIndividuelAccident
    $scope.redirectIndividuelAccident = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Individuel-Accident";
    };
    //redirectIndividuelAccident

    //redirectHabitat
    $scope.redirectHabitat = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href = "#/Assurances-gestion/Tiers/liste/Habitat";
    };
    //redirectHabitat

    //redirectAuto
    $scope.redirectAuto = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href = "#/Assurances-gestion/Tiers/liste/Auto";
    };
    //redirectAuto

    //redirectSantePharmacien
    $scope.redirectSantePharmacien = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href = "#/Assurances-gestion/Tiers/liste/SantePharmacien";
    };
    //redirectSantePharmacien

    //redirecSanteAuxilliaire
    $scope.redirecSanteAuxilliaire = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/SanteAuxilliaire";
    };
    //redirecSanteAuxilliaire

    //redirectSanteGSA
    $scope.redirectSanteGSA = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href = "#/Assurances-gestion/Tiers/liste/SanteGSA";
    };
    //redirectSanteGSA

    //redirectVoyage
    $scope.redirectVoyage = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href = "#/Assurances-gestion/Tiers/liste/Voyage";
    };
    //redirectVoyage

    //redirectResponsabiliteCivile
    $scope.redirectResponsabiliteCivile = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Responsabilite-Civile";
    };
    //redirectResponsabiliteCivile

    //redirectTransportEtMarchandise
    $scope.redirectTransportEtMarchandise = function () {
      $rootScope.retourSitTiersAssureur = "1";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Transport-Et-Marchandise";
    };
    //redirectTransportEtMarchandise

    // FIN LES REDIRECTIONS

    /*FIN DEV JJ*/
  },
]);
