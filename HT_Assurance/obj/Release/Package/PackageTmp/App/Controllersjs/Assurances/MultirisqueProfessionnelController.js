MapharApp.controller("MultirisqueProfessionnelController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.recupInfoDemande = angular.fromJson(
      localStorage.getItem("collectionDemande")
    );

    $scope.FormAddMultirisquePro = {
      id1: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
      idModif1: "",
      code1: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_NUMTIERS : "",
      denomination1: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_DENOMINATION
        : "",
      id2: "",
      idModif2: "",
      code2: "",
      denomination2: "",
      numPolice: "",
      intermediaire: "",
      pays: "",
      ville: "",
      commune: "",
      situationGeo: "",
      effet: "",
      echeance: "",
      assureur: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
        : "",
      interlocuteur: "",
      telInterlocuteur: "",
      designation: "",
      typeAffaire: "",
      valgarantie: "",
      garanties: [],
      primes: [],
    };

    $scope.listeDesGarantie = [];
    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
    };
    $scope.FormListPrime = {
      libelle: "",
      primes: [],
    };
    $scope.FormListGarentie = [
      {
        libelleSousCat: "",
        evenementsAssures: "",
        capitauxAssures: "",
        primes: "",
        apresReduction: "",
        prorata: "",
        franchises: "",
      },
    ];
    $scope.listeDesPays = [];
    $scope.listeDesVilles = [];
    $scope.listeDesCommunes = [];
    $scope.objet_envoie = [];
    $scope.listeDesAssureurs = [];
    $scope.listeDesSouscripteurs = [];
    $scope.listeDesCommerciaux = [];
    $scope.tabGarenties = [];
    $scope.tabPrimes = [];
    $scope.listeTypeAffaire = [];
    $scope.listeContrat = [];
    $scope.listeIntermediaire = [];
    $scope.listeDesignation = [];
    $scope.tabEngMultirisquePro = [];
    $scope.tabModifMultirisquePro = [];
    $scope.elmntSupprimerMultirisquePro = [];
    $scope.recupererInfo = {};
    $scope.modifListeVille = [];
    $scope.modifListeCommune = [];
    $scope.valPrimeTtc = 0;
    $scope.valPrimeNette = 0;
    $scope.valPrimeTtcEnregistrement = 0;
    $scope.valPrimeNetteEnregistrement = 0;
    $scope.SL_LIBELLEECRAN = "CONTRAT MULTIRISQUE PROFESSIONNEL";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeContratAvecAccessoir = []
    $scope.recupererInfoAvecAccessoir = {};
    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/
    //debut localStorage pour cacher enrg
    $scope.recupInfoBouton = angular.fromJson(
      localStorage.getItem("recupInfoBouton")
    );
    console.log($scope.recupInfoBouton);
    //fin localStorage pour cacher enrg

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
        $("#idCode1").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idCode2").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idEffet").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idEcheance").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTel").maxlength({
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

    //debut initialisation add multirisque pro
    $scope.initFormAddMultirisquePro = function () {
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
      $scope.FormAddMultirisquePro.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddMultirisquePro.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeVille($rootScope.PAYSPARDEFAUT)
      setTimeout(function(){$scope.afficheListeCommune($rootScope.VILLEPARDEFAUT)},3000)
    };
    //fin initialisation add multirisque pro

    //debut initialisation modif multirisque pro
    $scope.initModifFormAddMultirisquePro = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };
    //fin initialisation modif multirisque pro

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddMultirisquePro = function () {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#FFFFFF");
        $("#idDenomination1").css("background-color", "#FFFFFF");
        $("#idCode2").css("background-color", "#FFFFFF");
        $("#idDenomination2").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idIntermediaire").css("background-color", "#FFFFFF");
        $("#idPays").css("background-color", "#FFFFFF");
        $("#idVille").css("background-color", "#FFFFFF");
        $("#idCommune").css("background-color", "#FFFFFF");
        $("#idSituationGeo").css("background-color", "#FFFFFF");
        $("#idEffet").css("background-color", "#FFFFFF");
        $("#idEcheance").css("background-color", "#FFFFFF");
        $("#idAssureur").css("background-color", "#FFFFFF");
        $("#idInterlocuteur").css("background-color", "#FFFFFF");
        $("#idTel").css("background-color", "#FFFFFF");
        $("#idDesignation").css("background-color", "#FFFFFF");
        $("#idTypeAff").css("background-color", "#FFFFFF");
      });
      $scope.FormAddMultirisquePro = {};
      $scope.initFormAddMultirisquePro();
      $scope.isDisabled1 = false;
      $scope.isDisabled2 = false;
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //debut voir plus multirisque professionnel
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpMultirisquePro", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpMultirisquePro"));
      console.log($scope.recuperer);
    };
    //fin voir plus multirisque professionnel

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE)
      
    };
    //debut acceder a la page de modification

    //debut recuperer id pour la suppression du contrat
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du contrat

    //debut suppression du contrat
    $scope.supprimeContrat = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: recupId,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDSUPPRESSION,
          TYPEOPERATION: "2",
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
        .post("/Contrat/SuppressionContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.elmntSupprimerMultirisquePro = reponse.data;
          if (
            $scope.elmntSupprimerMultirisquePro[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.elmntSupprimerMultirisquePro[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeContrat[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.elmntSupprimerMultirisquePro[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.elmntSupprimerMultirisquePro[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin suppression du contrat

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
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

    //debut liste des villes pour la modification
    $scope.afficheListeVille = function (id) {
      $scope.listeDesCommunes = [];
      $scope.FormAddMultirisquePro.commune = "";
      //$scope.FormAddMultirisquePro.ville = "";
      if($scope.FormAddMultirisquePro.id == undefined || $scope.FormAddMultirisquePro.id == ""){
        $scope.FormAddMultirisquePro.id = "";
      }
      if($scope.FormAddMultirisquePro.ville == undefined || $scope.FormAddMultirisquePro.ville == ""){
        $scope.FormAddMultirisquePro.ville = "";
      }

      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    $scope.afficheListeVilleModif = function (id) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.verouVille = false;
            $scope.afficheListeCommuneModif($scope.recupererInfo.VL_CODEVILLE);
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVilles[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesVilles);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVilles[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes pour la modification

    //debut liste des communes pour la modification
    $scope.afficheListeCommune = function (id) {
      $scope.FormAddMultirisquePro.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunes = reponse.data;
          if (
            $scope.listeDesCommunes[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };

    $scope.afficheListeCommuneModif = function (id) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunes = reponse.data;
          if (
            $scope.listeDesCommunes[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunes[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunes);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunes[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des communes pour la modification

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function () {
      // $scope.leChargement = true;
      if (
        $scope.FormAddMultirisquePro.code1 == "" &&
        $scope.FormAddMultirisquePro.denomination1 == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
            TI_NUMTIERS: $scope.FormAddMultirisquePro.code1,
            TI_DENOMINATION: $scope.FormAddMultirisquePro.denomination1,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        });
    };
    //fin liste des souscripteur

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      // $scope.leChargement = true;
      if (
        $scope.FormAddMultirisquePro.code2 == "" &&
        $scope.FormAddMultirisquePro.denomination2 == ""
      ) {
        $scope.objet_envoie = [
          {
            TI_IDTIERS: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "COMMERCIAL",
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
            TI_IDTIERS: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddMultirisquePro.code2,
            TI_DENOMINATION: $scope.FormAddMultirisquePro.denomination2,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "COMMERCIAL",
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
          $scope.listeDesCommerciaux = reponse.data;
        });
    };
    //fin liste des comerciaux

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id) {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#EDEDED");
        $("#idDenomination1").css("background-color", "#EDEDED");
      });
      $scope.FormAddMultirisquePro.code1 = code;
      $scope.FormAddMultirisquePro.denomination1 = denomination;
      $scope.FormAddMultirisquePro.id1 = id;
      $scope.isDisabled1 = true;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $(document).ready(function () {
        $("#idCode2").css("background-color", "#EDEDED");
        $("#idDenomination2").css("background-color", "#EDEDED");
      });
      $scope.FormAddMultirisquePro.code2 = code;
      $scope.FormAddMultirisquePro.denomination2 = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddMultirisquePro.idModif2 = id;
        $scope.FormAddMultirisquePro.id2 =
          $scope.FormAddMultirisquePro.idModif2;
      } else {
        $scope.FormAddMultirisquePro.id2 = id;
      }
      $scope.isDisabled2 = true;
    };
    //Fin choix d'un commercial

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
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: "01",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
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
          .post("/Contrat/ListeContratSansAccessoir/", $scope.objet_envoie, {
            //.post("/Contrat/ListeContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContrat = reponse.data.reverse();
            $scope.nombreInfoBulle = $scope.listeContrat.length;
            if ($scope.listeContrat[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeContrat[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste multirisque pro

     //debut afficher liste multirisque pro
     $scope.afficheListeContratAvecAccessoir = function (
      idContrat,
      date
     
    ) {
      $scope.$emit("LOAD");
     
     
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: "01",
            CA_CODECONTRAT: idContrat,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            TI_NUMTIERSCOMMERCIAL: "",
            TI_DENOMINATIONCOMMERCIAL: "",
            DATEDEBUT: date,//"01-01-1900",
            DATEFIN: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
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
          .post("/Contrat/ListeContrat/", $scope.objet_envoie, {
            //.post("/Contrat/ListeContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContratAvecAccessoir = reponse.data.reverse();
            $scope.nombreInfoBulle = $scope.listeContratAvecAccessoir.length;
            if ($scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                "veuillez reessayez svp !!!"
                //$scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_MESSAGE
              );
            }else{
              $scope.recupererInfoAvecAccessoir = $scope.listeContratAvecAccessoir[0]
              sessionStorage.setItem("modifMultirisquePro", JSON.stringify($scope.recupererInfoAvecAccessoir));
              window.location.href =
                "#/assurances/modification/multirisque-professionnel";
            }
          });
     
    };
    //fin afficher liste multirisque pro
    //debut determine une annee bissetile
    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };
    //fin determine une annee bissetile

    //debut test des types sur les grilles
    $scope.confirmerChampsGrilleGarantie = function (grille) {
      $scope.verifie = false;
      let typeNumerique = /^\d+$/;

      if (grille == undefined) {
        $scope.verifie = false;
        return $scope.verifie;
      } else {
        for (var j = 0; j < grille.length; j++) {
          if (
            typeNumerique.test(grille[j].CG_CAPITAUXASSURES) == false ||
            typeNumerique.test(grille[j].CG_PRIMES) == false ||
            typeNumerique.test(grille[j].CG_APRESREDUCTION) == false ||
            typeNumerique.test(grille[j].CG_PRORATA) == false
          ) {
            $scope.verifie = true;
            break;
          }
        }

        return $scope.verifie;
      }
    };
    $scope.confirmerChampsGrillePrime = function (grille) {
      $scope.verifie = false;
      let typeNumerique = /^\d+$/;

      if (grille == undefined) {
        $scope.verifie = false;
        return $scope.verifie;
      } else {
        for (var j = 0; j < grille.length; j++) {
          if (typeNumerique.test(grille[j].CG_PRIMES) == false) {
            $scope.verifie = true;
            break;
          }
        }

        return $scope.verifie;
      }
    };
    //fin test des types sur les grilles

    //debut focus sur le champ enregistrement
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#idCode1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCode2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idIntermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCommune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSituationGeo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEffet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEcheance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAssureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idInterlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTel").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDesignation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeAff").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 0).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 1).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 2).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 3).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 4).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ enregistrement

    //debut ajout du contrat multirisque pro
    $scope.validerFormMultirisquePro = function (dateEffet, dateEcheance) {
      $scope.$emit("LOAD");
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("modifMultirisquePro")
      );

      $scope.desactiverChampRequisEnregistrement();
      $scope.testPrime();
      //$scope.calculPrimeTtc();

      let typeNumerique = /^[0-9]/;
      let typeNumeroTelephone = /^\d+$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      if (
        $scope.FormAddMultirisquePro.effet !== undefined &&
        $scope.FormAddMultirisquePro.echeance !== undefined
      ) {
        $scope.lAnneeEffet = $scope.FormAddMultirisquePro.effet.substr(6, 4);
        $scope.leMoisEffet = $scope.FormAddMultirisquePro.effet.substr(3, 2);
        $scope.leJourEffet = $scope.FormAddMultirisquePro.effet.substr(0, 2);
        $scope.lAnneeEcheance = $scope.FormAddMultirisquePro.echeance.substr(
          6,
          4
        );
        $scope.leMoisEcheance = $scope.FormAddMultirisquePro.echeance.substr(
          3,
          2
        );
        $scope.leJourEcheance = $scope.FormAddMultirisquePro.echeance.substr(
          0,
          2
        );
      }

      // mettre 0 dans les champs de prime si le champ est vide
      if ($scope.etatForm == "2") {
        for (
          var i = 0;
          i < $scope.recupererInfo.clsCtcontratprimes.length;
          i++
        ) {
          if ($scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES == "") {
            $scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES = 0;
          }
        }
      } else {
        for (var i = 0; i < $scope.tabPrimes.length; i++) {
          if ($scope.tabPrimes[i].CG_PRIMES == "") {
            $scope.tabPrimes[i].CG_PRIMES = 0;
          }
        }
      }

      if (
        $scope.FormAddMultirisquePro.code1 === "" ||
        $scope.FormAddMultirisquePro.code1 === undefined ||
        $scope.FormAddMultirisquePro.denomination1 === "" ||
        $scope.FormAddMultirisquePro.denomination1 === undefined ||
        $scope.FormAddMultirisquePro.code2 === "" ||
        $scope.FormAddMultirisquePro.code2 === undefined ||
        $scope.FormAddMultirisquePro.denomination2 === "" ||
        $scope.FormAddMultirisquePro.denomination2 === undefined ||
        $scope.FormAddMultirisquePro.numPolice === "" ||
        $scope.FormAddMultirisquePro.numPolice === undefined ||
        $scope.FormAddMultirisquePro.intermediaire === "" ||
        $scope.FormAddMultirisquePro.intermediaire === undefined ||
        $scope.FormAddMultirisquePro.pays === "" ||
        $scope.FormAddMultirisquePro.pays === undefined ||
        $scope.FormAddMultirisquePro.ville === "" ||
        $scope.FormAddMultirisquePro.ville === undefined ||
        $scope.FormAddMultirisquePro.commune === "" ||
        $scope.FormAddMultirisquePro.commune === undefined ||
        $scope.FormAddMultirisquePro.situationGeo === "" ||
        $scope.FormAddMultirisquePro.situationGeo === undefined ||
        $scope.FormAddMultirisquePro.assureur === "" ||
        $scope.FormAddMultirisquePro.assureur === undefined ||
        $scope.FormAddMultirisquePro.interlocuteur === "" ||
        $scope.FormAddMultirisquePro.interlocuteur === undefined ||
        $scope.FormAddMultirisquePro.telInterlocuteur === "" ||
        $scope.FormAddMultirisquePro.telInterlocuteur === undefined ||
        $scope.FormAddMultirisquePro.designation === "" ||
        $scope.FormAddMultirisquePro.designation === undefined ||
        $scope.FormAddMultirisquePro.typeAffaire === "" ||
        $scope.FormAddMultirisquePro.typeAffaire === undefined ||
        $scope.FormAddMultirisquePro.effet === "" ||
        $scope.FormAddMultirisquePro.effet === undefined ||
        $scope.FormAddMultirisquePro.echeance === "" ||
        $scope.FormAddMultirisquePro.echeance === undefined ||
        $scope.FormAddMultirisquePro.valgarantie === "" ||
        $scope.FormAddMultirisquePro.valgarantie === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddMultirisquePro.code1 === "" ||
            $scope.FormAddMultirisquePro.code1 === undefined
          ) {
            $("#idCode1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.valgarantie === "" ||
            $scope.FormAddMultirisquePro.valgarantie === undefined
          ) {
            $("#idgarantie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.denomination1 === "" ||
            $scope.FormAddMultirisquePro.denomination1 === undefined
          ) {
            $("#idDenomination1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.code2 === "" ||
            $scope.FormAddMultirisquePro.code2 === undefined
          ) {
            $("#idCode2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.denomination2 === "" ||
            $scope.FormAddMultirisquePro.denomination2 === undefined
          ) {
            $("#idDenomination2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.numPolice === "" ||
            $scope.FormAddMultirisquePro.numPolice === undefined
          ) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.intermediaire === "" ||
            $scope.FormAddMultirisquePro.intermediaire === undefined
          ) {
            $("#idIntermediaire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.pays === "" ||
            $scope.FormAddMultirisquePro.pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.ville === "" ||
            $scope.FormAddMultirisquePro.ville === undefined
          ) {
            $("#idVille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.commune === "" ||
            $scope.FormAddMultirisquePro.commune === undefined
          ) {
            $("#idCommune").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.situationGeo === "" ||
            $scope.FormAddMultirisquePro.situationGeo === undefined
          ) {
            $("#idSituationGeo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.assureur === "" ||
            $scope.FormAddMultirisquePro.assureur === undefined
          ) {
            $("#idAssureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.interlocuteur === "" ||
            $scope.FormAddMultirisquePro.interlocuteur === undefined
          ) {
            $("#idInterlocuteur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.telInterlocuteur === "" ||
            $scope.FormAddMultirisquePro.telInterlocuteur === undefined
          ) {
            $("#idTel").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.designation === "" ||
            $scope.FormAddMultirisquePro.designation === undefined
          ) {
            $("#idDesignation").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.typeAffaire === "" ||
            $scope.FormAddMultirisquePro.typeAffaire === undefined
          ) {
            $("#idTypeAff").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.effet === "" ||
            $scope.FormAddMultirisquePro.effet === undefined
          ) {
            $("#idEffet").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddMultirisquePro.echeance === "" ||
            $scope.FormAddMultirisquePro.echeance === undefined
          ) {
            $("#idEcheance").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeNumerique.test($scope.FormAddMultirisquePro.code1) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idCode1").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddMultirisquePro.denomination1) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDenomination1").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une dénomination souscripteur correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.FormAddMultirisquePro.code2) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idCode2").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddMultirisquePro.denomination2) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDenomination2").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une dénomination commercial correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddMultirisquePro.effet) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == true &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddMultirisquePro.echeance) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une dates écheance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == true &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEcheance == "04" ||
          $scope.leMoisEcheance == "06" ||
          $scope.leMoisEcheance == "09" ||
          $scope.leMoisEcheance == "11") &&
        $scope.leJourEcheance > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddMultirisquePro.interlocuteur) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idInterlocuteur").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un nom interlocuteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumeroTelephone.test(
          $scope.FormAddMultirisquePro.telInterlocuteur
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTel").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(dateEffet) >=
        $scope.dateSuperioriteFin(dateEcheance)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idEffet").css("background-color", "#FFE9E0");
        });
        $rootScope.dateEffetIncorrecte();
      } else if ($scope.statutPrimeEnregistrement == true) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFFFFF");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La prime ttc ne doit pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutPrime == true) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFFFFF");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La prime ttc ne doit pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeNette) == 0 ||
        parseInt($scope.valPrimeTtc) == 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La prime nette ou la prime ttc ne doivent pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeTtcEnregistrement) == 0 ||
        parseInt($scope.valPrimeNetteEnregistrement) == 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La prime nette ou la prime ttc ne doivent pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeNette) > parseInt($scope.valPrimeTtc)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
        });
        $scope.messageErreur =
          "La prime nette ne doit être superieure à la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeNetteEnregistrement) >
        parseInt($scope.valPrimeTtcEnregistrement)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
        });
        $scope.messageErreur =
          "La prime nette ne doit être superieure à la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.confirmerChampsGrilleGarantie($scope.tabGarenties) == true ||
        $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.confirmerChampsGrilleGarantie(
          $scope.recupererInfo.clsCtcontratgaranties
        ) == true ||
        $scope.confirmerChampsGrillePrime(
          $scope.recupererInfo.clsCtcontratprimes
        ) == true
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          if ($scope.FormAddMultirisquePro.idModif1 === "") {
            $scope.FormAddMultirisquePro.id1 = $scope.recuperer.TI_IDTIERS;
          }
          if ($scope.FormAddMultirisquePro.idModif2 === "") {
            $scope.FormAddMultirisquePro.id2 =
              $scope.recuperer.TI_IDTIERSCOMMERCIAL;
          }

          $scope.clsCtcontratgaranties = [];
          for (
            var i = 0;
            i < $scope.recupererInfo.clsCtcontratgaranties.length;
            i++
          ) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              GA_CODEGARANTIE: "",
              CG_CAPITAUXASSURES: "",
              CG_PRIMES: "",
              CG_APRESREDUCTION: "",
              CG_PRORATA: "",
              CG_FRANCHISES: "",
              CG_TAUX: "",
              CG_MONTANT: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.recupererInfo.clsCtcontratgaranties[i].GA_CODEGARANTIE;
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_PRORATA;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_FRANCHISES;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          $scope.clsCtcontratprimes = [];
          for (
            var j = 0;
            j < $scope.recupererInfo.clsCtcontratprimes.length;
            j++
          ) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objetPrime.RE_CODERESUME =
              $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }

          $scope.TYPEOPERATION = "1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "MODIFICATION";
        } else {
          $scope.clsCtcontratgaranties = [];
          for (var i = 0; i < $scope.tabGarenties.length; i++) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              GA_CODEGARANTIE: "",
              CG_CAPITAUXASSURES: "",
              CG_PRIMES: "",
              CG_APRESREDUCTION: "",
              CG_PRORATA: "",
              CG_FRANCHISES: "",
              CG_TAUX: "",
              CG_MONTANT: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.tabGarenties[i].GA_CODEGARANTIE;
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.tabGarenties[i].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES = $scope.tabGarenties[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.tabGarenties[i].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA = $scope.tabGarenties[i].CG_PRORATA;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.tabGarenties[i].CG_FRANCHISES;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          $scope.clsCtcontratprimes = [];
          for (var j = 0; j < $scope.tabPrimes.length; j++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objetPrime.RE_CODERESUME = $scope.tabPrimes[j].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR = $scope.tabPrimes[j].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "0";
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "INSERTION";
        }

        $scope.objet_envoie = [
          {
            CA_CODECONTRAT: $scope.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            RQ_CODERISQUE: "01",
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CA_NUMPOLICE: $scope.FormAddMultirisquePro.numPolice,
            IT_CODEINTERMEDIAIRE: $scope.FormAddMultirisquePro.intermediaire,
            TI_IDTIERSASSUREUR: $scope.FormAddMultirisquePro.assureur,
            CO_CODECOMMUNE: $scope.FormAddMultirisquePro.commune,
            CA_SITUATIONGEOGRAPHIQUE: $scope.FormAddMultirisquePro.situationGeo,
            CA_DATEEFFET: $scope.FormAddMultirisquePro.effet,
            CA_DATEECHEANCE: $scope.FormAddMultirisquePro.echeance,
            CA_DATENAISSANCE: "01-01-1900",
            CA_NOMINTERLOCUTEUR: $scope.FormAddMultirisquePro.interlocuteur,
            CA_CONTACTINTERLOCUTEUR:
              $scope.FormAddMultirisquePro.telInterlocuteur,
            DI_CODEDESIGNATION: $scope.FormAddMultirisquePro.designation,
            TA_CODETYPEAFFAIRES: $scope.FormAddMultirisquePro.typeAffaire,
            TI_IDTIERS: $scope.FormAddMultirisquePro.id1,
            TI_IDTIERSCOMMERCIAL: $scope.FormAddMultirisquePro.id2,
            CA_TAUX: "0",
            CA_NUMSERIE: "1000",
            CA_IMMATRICULATION: "",
            CA_PUISSANCEADMISE: "0",
            CA_CHARGEUTILE: "0",
            CA_NBREPLACE: "0",
            CA_VALNEUVE: "0",
            CA_VALVENALE: "0",
            CA_DATEMISECIRCULATION: "01-01-1900",
            CA_CLIENTEXONERETAXE: "N",
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            GR_CODEGARENTIEPRIME: $scope.FormAddMultirisquePro.valgarantie,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
            TYPEOPERATION: $scope.TYPEOPERATION,
            LG_CODELANGUE: "fr",
            DE_CODEDEMANADE: $scope.recupInfoDemande
              ? $scope.recupInfoDemande.DE_CODEDEMANADE
              : "",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
            clsCtcontratgaranties: $scope.clsCtcontratgaranties,
            clsCtcontratprimes: $scope.clsCtcontratprimes,
          },
        ];

        $http
          .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.tabEngMultirisquePro = reponse.data;
            if (
              $scope.tabEngMultirisquePro[0].clsObjetRetour.SL_RESULTAT ===
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.tabEngMultirisquePro[0].clsObjetRetour.SL_MESSAGE
              );
              if ($scope.etatForm == "2") {
                $scope.RetourSurListe = function () {
                  window.location.href =
                    "#/assurances/multirisque-professionnel";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                if (!!localStorage.getItem("collectionDemande")) {
                  localStorage.removeItem("collectionDemande");
                }
                $scope.resetFormAddMultirisquePro();
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.tabEngMultirisquePro[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.tabEngMultirisquePro[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    //debut ajout du contrat multirisque pro

    //debut verification de la prime nette et ttc
    $scope.testPrime = function () {
      $scope.statutPrime = false;
      $scope.statutPrimeEnregistrement = false;
      if ($scope.etatForm == "2") {
        $scope.valPrimeTtcEnregistrement = 1;
        $scope.valPrimeNetteEnregistrement = 1;
        $scope.verifieprime = false;
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeNette =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeTtc =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
          }
        }
      } else {
        $scope.valPrimeTtc = 1;
        $scope.valPrimeNette = 1;
        $scope.statutPrimeEnregistrement = false;
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 01 &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrimeEnregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 01 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeNetteEnregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrimeEnregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeTtcEnregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }
        }
      }
    };
    //fin verification de la prime nette et ttc

    //debut calcul de la prime automatiquement
    $scope.calculprimettc = function () {
      $scope.premierclick = "FALSE";
      $scope.valprimettcaffiche = 0;
      if ($scope.etatForm == "2") {
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES = 0;
          }
        }
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME !== 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES != "" &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES);
          }
        }
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES =
              $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      } else {
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = 0;
          }
        }

        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME !== 05 &&
            $scope.tabPrimes[j].CG_PRIMES != "" &&
            $scope.tabPrimes[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.tabPrimes[j].CG_PRIMES);
          }
        }
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      }
    };
    //fin calcul de la prime automatiquement

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "MultirisqueProfessionnel";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBOS
    $scope.afficheListegarantie = function () {
      $scope.$emit("LOAD");
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "01",
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
        .post("/Garantie/ListeGarantie/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesGarantie = reponse.data;
          if (
            $scope.listeDesGarantie[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesGarantie[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesGarantie);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesGarantie[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    //debut liste des pays
    $scope.afficheListePays = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
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
        .post("/Pays/ListePays/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPays = reponse.data;
          if ($scope.listeDesPays[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeAssureur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPays[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPays);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPays[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des assureur
    $scope.afficheListeAssureur = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
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
        .post("/Assureur/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesAssureurs = reponse.data;
          console.log($scope.listeDesAssureurs);
          if (
            $scope.listeDesAssureurs[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.tableauGarenties();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureurs);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des assureur

    //debut tableau garenties
    $scope.tableauGarenties = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "01",
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
        .post("/Garenties/ListeGarenties/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabGarenties = reponse.data;
          if ($scope.tabGarenties[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabGarenties[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabGarenties);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabGarenties[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau garenties

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "01",
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
        .post("/Primes/ListePrimes/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabPrimes = reponse.data;
          if ($scope.tabPrimes[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeTypeAffaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabPrimes[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabPrimes);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabPrimes[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau primes

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaire = function () {
      $scope.objet_envoie = [
        {
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
        .post("/TypeAffaire/ListeTypeAffaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeAffaire = reponse.data;
          if (
            $scope.listeTypeAffaire[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
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
        .post("/Intermediaire/ListeIntermediaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeIntermediaire = reponse.data;
          if (
            $scope.listeIntermediaire[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeDesignation();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeIntermediaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeIntermediaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeIntermediaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des intermediaire

    //debut liste designation
    $scope.afficheListeDesignation = function () {
      $scope.objet_envoie = [
        {
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
        .post("/Designation/ListeDesignation/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesignation = reponse.data;
          if (
            $scope.listeDesignation[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifMultirisquePro, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesignation[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesignation);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesignation[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste designation

    //debut acceder a la page de modification
    $scope.retourModifMultirisquePro = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifMultirisquePro")
      );
      console.log($scope.recupererInfo);
      $scope.isDisabled1 = true;
      $scope.isDisabled2 = false;

      $scope.FormAddMultirisquePro.code1 = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddMultirisquePro.denomination1 =
        $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddMultirisquePro.code2 =
        $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddMultirisquePro.denomination2 =
        $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddMultirisquePro.numPolice =
        $scope.recupererInfo.CA_NUMPOLICE;
      $scope.FormAddMultirisquePro.intermediaire =
        $scope.recupererInfo.IT_CODEINTERMEDIAIRE;
      $scope.FormAddMultirisquePro.pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddMultirisquePro.ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddMultirisquePro.commune =
        $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddMultirisquePro.situationGeo =
        $scope.recupererInfo.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddMultirisquePro.effet = $scope.recupererInfo.CA_DATEEFFET;
      $scope.FormAddMultirisquePro.echeance =
        $scope.recupererInfo.CA_DATEECHEANCE;
      $scope.FormAddMultirisquePro.assureur =
        $scope.recupererInfo.TI_IDTIERSASSUREUR;
      $scope.FormAddMultirisquePro.interlocuteur =
        $scope.recupererInfo.CA_NOMINTERLOCUTEUR;
      $scope.FormAddMultirisquePro.telInterlocuteur =
        $scope.recupererInfo.CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddMultirisquePro.designation =
        $scope.recupererInfo.DI_CODEDESIGNATION;
      $scope.FormAddMultirisquePro.typeAffaire =
        $scope.recupererInfo.TA_CODETYPEAFFAIRES;
      $scope.FormAddMultirisquePro.valgarantie =
        $scope.recupererInfo.GR_CODEGARENTIEPRIME;

      $scope.afficheListeVilleModif($scope.recupererInfo.PY_CODEPAYS);
    };
    //debut acceder a la page de modification
    // FIN COMBOS

    /*FIN DEV JJ*/
  },
]);
