MapharApp.controller("EditionAssuranceController", [
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
    $scope.appelServiceWeb = $rootScope.ADRESSESERV;//"http://192.168.1.100:6033/Service/";
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddEditionAssurance = {
      ZoneCommercial: "",
      Succursales: "",
      Entrepot: "",
      Exercice: "",
      Periodicite: "",
      Periode: "",
      dateDebut: "",
      dateFin: "",
      dateEffet: "", 
      dateEcheance: "",
      Commercial: "",
      CompagnieAssurance: "",
      NatureSinistre: "",
      Pays: "",
      Ville: "",
      Commune: "",
      ZoneMaladie: "",
      ZoneAuto: "",
      Risque: "",
      TypeAffaire: "",
      StatutContrat: "",
      StatutPERIODE: "",
    };

    $scope.listeEditionAssurance = [];
    $scope.listeStatutContrat = [];
    $scope.SL_LIBELLEECRAN = "EDITION ASSURANCE";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";
    $scope.listePays = [];
    $scope.listeVilles = [];
    $scope.listeCommunes = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesSuccursales = [];
    $scope.listeEntrepot = [];
    $scope.listeDesExercice = [];
    $scope.listeDesPeriodicite = [];
    $scope.listeDesPeriode = [];
    $scope.listeTypeAffaire = [];
    $scope.listeDesZoneMaladie = [];
    $scope.listeDesZoneAuto = [];
    $scope.listeNatureSinistre = [];
    $scope.listeDesSouscripteurs = [];
    $scope.listeDesCommerciaux = [];
    $scope.listeRisque = [];
    $scope.recuperationnom = "";
    $scope.recuperationEtIndex = "";
    $scope.RetourInsertedition = [];
    $scope.listeDateDebutFin = [];
    $scope.listeDesAssureurs = [];
    $scope.recuperationnomfichier = "";
    $scope.recuperationLibelleEtat = "";

    $scope.verouNpolice = false;
    $scope.verouZoneCommercial = false;
    $scope.verouSuccursales = false;
    $scope.verouExercice = false;
    $scope.verouPeriodicite = false;
    $scope.verouPeriode = false;
    $scope.verouDateDebut = false;
    $scope.FormAddEditionAssurance.dateDebut =
      $rootScope.DATE_JOURNEE_DE_TRAVAIL;
    $scope.verouDateFin = false;
    $scope.FormAddEditionAssurance.dateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
    $scope.veroudateEffet = true;
    $scope.veroudateEcheance = true;
    $scope.verouCommercial = true;
    $scope.verouCompagnieAssurance = true;
    $scope.verouNatureSinistre = true;
    $scope.verouPays = true;
    $scope.verouVille = true;
    $scope.verouCommune = true;
    $scope.verouZoneMaladie = true;
    $scope.verouZoneAuto = true;
    $scope.verouTypeAffaire = false;
    $scope.verouRisque = false;
    $scope.verouStatutContrat = false;

    $scope.verouPeriod = true;
    $scope.verouPeriodicit = true;
    $scope.statutPage = false;
    $scope.verouGrille = false;
    $scope.veroubtnapercu = true;
    $scope.leChargement = true;
    $scope.RetourInserteditionListe = [];
    $scope.RetourInserteditionApercuListe = [];
    $scope.Chargement = "Chargement en cours...";
    $scope.Adresse = "";
    $scope.statutliste = false;
    $scope.FormAddClient = {
      code: "",
      numPolice: "",
      denomination: ""
    };
    //$scope.verouPosition = false;
   
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

    $scope.initEditionAssurance = function () {
      $scope.afficheListeVille($rootScope.PAYSPARDEFAUT)
      $scope.afficheListeEntrepot();
      $scope.FormAddEditionAssurance.Pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddEditionAssurance.Ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommune($rootScope.VILLEPARDEFAUT)
      this.verouPays = false
      this.verouVille = false
      this.verouCommune = false
      $scope.FormAddEditionAssurance.infoChargement = "Chargement en cours ..."
    };

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV*/

    //debut rafraichir les champs
    $scope.resetFormAddEditAssurance = function () {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#FFFFFF");
      });
    };
    //fin rafraichir les champs

    //debut affiche liste edition assurance
    $scope.afficheListeEdition = function () {
    //  $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "ASSURANCE",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          ET_AFFICHER: "O",
          OD_APERCU: "O",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
        .post("/EditionListe/ListeEdition/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEditionAssurance = reponse.data;
          console.log($scope.listeEditionAssurance);
          if (
            $scope.listeEditionAssurance[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $scope.statutPage = true
            
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEditionAssurance[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeEditionAssurance[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin affiche liste edition assurance

    //debut liste Entrepot
    $scope.afficheListeEntrepot = function () {
      $scope.$emit("LOAD");
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
            $scope.afficheListeZoneEditionCombo();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeEntrepot[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeEntrepot);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste Entrepot

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
        .post("/EditionAssurance/ListeZoneEditionCombo/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesZoneCombo = reponse.data;
          if (
            $scope.listeDesZoneCombo[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeExercice();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesZoneCombo[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeDesZoneCombo);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesZoneCombo[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste des ZONE

    //debut liste des Succursales
    $scope.afficheListeSuccursales = function () {
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $rootScope.DATE_EX_EXERCICE,
          SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
          ZN_CODEZONE: $scope.FormAddEditionAssurance.ZoneCommercial,
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
            $scope.FormAddEditionAssurance.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE;
            $("#idSuccursales").css("background-color", "#FFFFFF");
          } else {
            $scope.FormAddEditionAssurance.Succursales = "";
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeDesSuccursales);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste des Succursales

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
        .post("/EditionAssurance/ListeExercice/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesExercice = reponse.data;
          if ($scope.listeDesExercice[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListePeriodicite();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeDesExercice);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
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
        .post("/EditionAssurance/ListePeriodicite/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPeriodicite = reponse.data;
          if (
            $scope.listeDesPeriodicite[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesPeriodicite[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeDesPeriodicite);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPeriodicite[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste periodicite

    //debut liste periode
    $scope.afficheListePeriode = function () {
      $scope.objet_envoie = [
        {
          PE_CODEPERIODICITE: $scope.FormAddEditionAssurance.Periodicite,
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
        .post("/EditionAssurance/ListePeriode/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPeriode = reponse.data;
          console.log($scope.listeDesPeriode);
          $scope.FormAddEditionAssurance.Periode = "";
          $scope.leMois = $rootScope.DATE_JOURNEE_DE_TRAVAIL.substr(3, 2);
          for (var index = 0; index < $scope.listeDesPeriode.length; index++) {
            if ($scope.listeDesPeriode[index].MO_CODEMOIS == $scope.leMois) {
              $scope.FormAddEditionAssurance.Periode =
                $scope.listeDesPeriode[index].MO_CODEMOIS;
              break;
            }
          }
          if ($scope.FormAddEditionAssurance.Periode != "") {
            $("#idPeriode").css("background-color", "#FFFFFF");
           // $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          $scope.afficheListeDateDebutFin();
        });
    };
    //fin liste periode

    //debut avoir les dates de debut et de fin
    $scope.afficheListeDateDebutFin = function () {
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $scope.FormAddEditionAssurance.Exercice,
          MO_CODEMOIS: $scope.FormAddEditionAssurance.Periode,
          PE_CODEPERIODICITE: $scope.FormAddEditionAssurance.Periodicite,
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
          if ($scope.recuperationnom != "AS_LCTVELLE") {
            $scope.FormAddEditionAssurance.dateDebut =
              $scope.listeDateDebutFin[0].MO_DATEDEBUT;
            $scope.FormAddEditionAssurance.dateFin =
              $scope.listeDateDebutFin[0].MO_DATEFIN;
          } else {
            $scope.lAnnee = $scope.FormAddEditionAssurance.Exercice - 1;
            $scope.FormAddEditionAssurance.dateDebut = "01-01-" + $scope.lAnnee;
            $scope.FormAddEditionAssurance.dateFin = "31-12-" + $scope.lAnnee;
          }
          console.log($scope.listeDateDebutFin);
        });
    };
    //fin avoir les dates de debut et de fin

    //debut liste des pays
    $scope.afficheListePays = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "SANTE GESA",
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
          if ($scope.listePays[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeTypeAffaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listePays[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listePays);
         
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listePays[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste des pays

    //debut liste des villes
    $scope.afficheListeVille = function (id) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,//$scope.FormAddEditionAssurance.Pays,
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeVilles = reponse.data;
        });
    };
    //fin liste des villes

    //debut liste des sections
    $scope.afficheListeCommune = function (id) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,//$scope.FormAddEditionAssurance.Ville,
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeCommunes = reponse.data;
        });
    };
    //fin liste des sections

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/TypeAffaire/ListeTypeAffaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeAffaire = reponse.data;
          if ($scope.listeTypeAffaire[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeZoneAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeTypeAffaire[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaire[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste type d'affaire

    //debut combo Zone cir
    $scope.afficheListeZoneAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "0",
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
        .post("/ZoneAuto/ListeZoneAuto/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesZoneAuto = reponse.data;
          if ($scope.listeDesZoneAuto[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeNatureSinistre();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesZoneAuto[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesZoneAuto[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin combo Zone cir

    //debut combo
    $scope.afficheListeNatureSinistre = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
        .post("/NatureSinistre/ListeNatureSinistre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureSinistre = reponse.data;
          if (
            $scope.listeNatureSinistre[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeTiersSouscripteur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeNatureSinistre[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeNatureSinistre[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin combo

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          TI_NUMTIERS: $scope.FormAddEditionAssurance.code1,
          TI_DENOMINATION: $scope.FormAddEditionAssurance.Commercial,
          SL_LIBELLEECRAN: "SANTE GESA",
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
      $http
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSouscripteurs = reponse.data;
          if (
            $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeTiersCommercial();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste des souscripteur

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      $scope.objet_envoie = [
        {
          "AG_CODEAGENCE": "1000",
            "NT_CODENATURETYPETIERS":"''05''",
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD":"INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE":"fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            }
          /*TI_IDTIERS: "",
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "SANTE GESA",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "COMMERCIAL",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },*/
        },
      ];
      $http
        .post("/SouscripteurCommercial/ComboCommercial/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommerciaux = reponse.data;
          if (
            $scope.listeDesCommerciaux[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.statutContrat();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesCommerciaux[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeDesCommerciaux);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommerciaux[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste des comerciaux

    //debut affiche liste statut du contrat
    $scope.statutContrat = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
        .post("/StatutContrat/ListeStatut/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeStatutContrat = reponse.data;
          if (
            $scope.listeStatutContrat[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.Risque();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeStatutContrat[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeStatutContrat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeStatutContrat[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin affiche liste statut du contrat

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
            $scope.afficheListeEdition();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeDesAssureurs);
          
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin liste des assureur

    //debut affiche liste risque
    $scope.Risque = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          if ($scope.listeRisque[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
           // $scope.$emit("LOAD");
           $scope.afficheListeAssureur()
          
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeRisque[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
          }
          console.log($scope.listeRisque);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeRisque[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.FormAddEditionAssurance.infoChargement = "Une erreur de chargement est survenue veuillez reessayez svp ..."
        });
    };
    //fin affiche liste risque



    $scope.choixExercicechange = function (){
      if($scope.FormAddEditionAssurance.dateDebut == undefined || $scope.FormAddEditionAssurance.dateDebut == "" || $scope.FormAddEditionAssurance.dateDebut == ""){
        $scope.FormAddEditionAssurance.dateDebut = $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
      }
      if($scope.FormAddEditionAssurance.dateFin == undefined || $scope.FormAddEditionAssurance.dateFin == "" || $scope.FormAddEditionAssurance.dateFin == ""){
        $scope.FormAddEditionAssurance.dateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      }
      if( $scope.recuperationEtIndex ==
        "AS_LISTECONTRATSNONRENOUVELLE"){
        $scope.lAnnee = $scope.FormAddEditionAssurance.Exercice - 1;
        $scope.FormAddEditionAssurance.dateDebut =
          "01/01/" + $scope.lAnnee;
        $scope.FormAddEditionAssurance.dateFin = "31/12/" + $scope.lAnnee;
      }
    
    }
   







    $scope.lIndex = "";
    $scope.afficheBouton = [];
    $scope.choixEtat = function (
      idEtat,
      nometat,
      nomfichier,
      LibelleEtat,
      et_index
    ) {
      $scope.recuperationnom = nometat;
      $scope.recuperationnomfichier = nomfichier;
      $scope.recuperationLibelleEtat = LibelleEtat;
      $scope.recuperationEtIndex = et_index;
      console.log($scope.recuperationnom);
      $scope.verouGrille = true
      $scope.verouPeriod = true;
      $scope.verouPeriodicit = true;
      $scope.veroubtnapercu = true;
      $scope.verouRisque = true;
      $scope.FormAddEditionAssurance.Risque = ""
      $scope.FormAddEditionAssurance.Commercial = ""
      
      if($scope.recuperationEtIndex == "AS_AVI_RENOUVELLEMENTPOLICE"){
        $scope.veroubtnapercu = false;
      }
      if($scope.recuperationEtIndex == "AS_AVI_REG_PRIME"){
        $scope.veroubtnapercu = false;
      }
      // demarquer les lignes
      for (var i = 0; i < $scope.listeEditionAssurance.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEditionAssurance.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          // marquer la ligne
          $("#idEtat" + idEtat).css("background-color", "beige");
          if (
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECT" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECTTRANSMIS" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_TAB_GESTION" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECPGASSUR" ||
            $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_LISTESINISTRETRANS" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_GLE" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_SINISTRE" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_COMCT" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTESINISTREREGLE"
          ) {
            $scope.FormAddEditionAssurance.ZoneCommercial =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.FormAddEditionAssurance.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormAddEditionAssurance.Exercice = 
               $rootScope.DATE_EXERCICE;
            $scope.FormAddEditionAssurance.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
              $scope.FormAddEditionAssurance.dateDebut =
              $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
              $scope.FormAddEditionAssurance.dateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            /*  if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
              if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
                $scope.FormAddEditionAssurance.Periode = "01";
                console.log($scope.FormAddEditionAssurance.Periode);
              }
            } */

            if (
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECPGASSUR" ||
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECT" ||
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_COMCT" ||
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_GLE" ||
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_LISTESINISTRETRANS" ||
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_LISTECTTRANSMIS" ||
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_SINISTRE"
            ) {
              $scope.verouDateDebut = true;
              $scope.verouDateFin = false;
              $scope.veroudateEffet = true;
              $scope.veroudateEcheance = true;
              $scope.verouCommercial = true;
              $scope.verouCompagnieAssurance = true;
              $scope.verouNatureSinistre = true;
              $scope.verouPays = true;
              $scope.verouVille = true;
              $scope.verouCommune = true;
              $scope.verouZoneMaladie = true;
              $scope.verouZoneAuto = true;
            //  $scope.verouRisque = true;
              $scope.verouZoneCommercial = false;
              $scope.verouSuccursales = false;
              $scope.verouEntrepot = false;
              $scope.verouExercice = false;
              $scope.verouPeriodicite = false;
              $scope.verouPeriode = false;
              $scope.verouTypeAffaire = false;
              $scope.verouStatutContrat = false;
              $scope.FormAddEditionAssurance.dateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormAddEditionAssurance.dateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              if (
                $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_LISTESINISTRETRANS"
              ) {
                $scope.verouStatutContrat = true;
              }

              if (
                $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECPGASSUR"
              ) {
                $scope.verouTypeAffaire = true;
                $scope.verouStatutContrat = true;
                $scope.verouCompagnieAssurance = false;
              }

              if (
                $scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_GLE" ||
                $scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_SINISTRE"
              ) {
                /*$scope.verouRisque = false;
                $scope.FormAddEditionAssurance.Risque = ""*/
                if (
                  $scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_SINISTRE"
                ) {
                  $scope.verouStatutContrat = true;
                }
              }
            } else {
              $scope.verouDateDebut = false;
              $scope.verouDateFin = false;
              $scope.veroudateEffet = true;
              $scope.veroudateEcheance = true;
              $scope.verouCommercial = true;
              $scope.verouCompagnieAssurance = true;
              $scope.verouNatureSinistre = true;
              $scope.verouPays = true;
              $scope.verouVille = true;
              $scope.verouCommune = true;
              $scope.verouZoneMaladie = true;
              $scope.verouZoneAuto = true;
              $scope.verouTypeAffaire = false;
             // $scope.verouRisque = true;
              $scope.verouStatutContrat = false;
              $scope.verouZoneCommercial = false;
              $scope.verouSuccursales = false;
              $scope.verouEntrepot = false;
              $scope.verouExercice = false;
              $scope.verouPeriodicite = false;
              $scope.verouPeriode = false;
              $scope.FormAddEditionAssurance.dateDebut =
              $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
            $scope.FormAddEditionAssurance.dateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            }

           
            $scope.FormAddEditionAssurance.TypeAffaire = "";
            if ($scope.listeEditionAssurance[j].ET_INDEX == "AS_SIT_GLE") {
              $scope.FormAddEditionAssurance.Risque =
               "";
            } else {
              $scope.FormAddEditionAssurance.Risque = "";
            }

          //  $scope.afficheListePeriode();
            break;
          }else if($scope.listeEditionAssurance[j].ET_INDEX == "AS_REM_CHEQUE"){
            $scope.FormAddEditionAssurance.ZoneCommercial =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.FormAddEditionAssurance.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormAddEditionAssurance.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormAddEditionAssurance.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.verouDateDebut = false;
            $scope.verouDateFin = false;
            $scope.veroudateEffet = true;
            $scope.veroudateEcheance = true;
            $scope.verouCommercial = true;
            $scope.verouCompagnieAssurance = false;
            $scope.verouNatureSinistre = true;
            $scope.verouPays = true;
            $scope.verouVille = true;
            $scope.verouCommune = true;
            $scope.verouZoneMaladie = true;
            $scope.verouZoneAuto = true;
           // $scope.verouRisque = true;
            $scope.verouZoneCommercial = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;
            $scope.verouTypeAffaire = true;
            $scope.verouStatutContrat = true;
            $scope.FormAddEditionAssurance.dateDebut =
            $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
            $scope.FormAddEditionAssurance.dateFin =
            $rootScope.DATE_JOURNEE_DE_TRAVAIL;
         //   $scope.afficheListePeriode();
          }else if($scope.listeEditionAssurance[j].ET_INDEX == "AS_ETAT_SYN"  || $scope.listeEditionAssurance[j].ET_INDEX == "AS_ETAT_CBC"){
            $scope.FormAddEditionAssurance.ZoneCommercial =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.FormAddEditionAssurance.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormAddEditionAssurance.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormAddEditionAssurance.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.verouDateDebut = false;
            $scope.verouDateFin = false;
            $scope.veroudateEffet = true;
            $scope.veroudateEcheance = true;
            $scope.verouCommercial = true;
            $scope.FormAddEditionAssurance.dateDebut =
            $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
            $scope.FormAddEditionAssurance.dateFin =
            $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormAddEditionAssurance.Commercial = ""
            if($scope.listeEditionAssurance[j].ET_INDEX == "AS_ETAT_CBC"){
              $scope.FormAddEditionAssurance.Commercial =
              $scope.listeDesCommerciaux[2].TI_NUMTIERS;
              $scope.verouCommercial = false;
            }
            
            $scope.verouCompagnieAssurance = false;
            $scope.verouNatureSinistre = true;
            $scope.verouPays = true;
            $scope.verouVille = true;
            $scope.verouCommune = true;
            $scope.verouZoneMaladie = true;
            $scope.verouZoneAuto = true;
           // $scope.verouRisque = true;
            $scope.verouZoneCommercial = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;
            $scope.verouTypeAffaire = true;
            $scope.verouStatutContrat = true;
           // $scope.afficheListePeriode();
          }
           else if (
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECTNEW" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_AFFAIRENOUVELLE" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_AFF_NOUV_RENOUV" || 
            $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_ENCAISSEMENTCOMPTANT" ||
            $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_ENCAISSEMENTDIFFERE" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_AVI_REG_PRIME" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTESINISTRENEW" ||
            $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_ETATECHEANCIERPOLICE" ||
            $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_ETATCLIENTENPORTEFEUIL" ||
            $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_LISTECONTRATSNONRENOUVELLE" ||
            $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_AVI_RENOUVELLEMENTPOLICE" ||
            $scope.listeEditionAssurance[j].ET_INDEX == "AS_BORDEREAUP"
          ) {
            $scope.verouDateDebut = false;
           // $scope.verouRisque = true;
            $scope.verouZoneCommercial = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;
            $scope.verouDateFin = false;
            $scope.verouStatutContrat = true;
            $scope.verouPays = true;
            $scope.verouCompagnieAssurance = true;
            $scope.verouCommune = true;
            $scope.verouVille = true;
            $scope.verouNatureSinistre = true;
            $scope.verouZoneMaladie = true;
            $scope.verouZoneAuto = true;
            $scope.verouTypeAffaire = true;

            $scope.FormAddEditionAssurance.TypeAffaire = "";
            $scope.FormAddEditionAssurance.Risque = "";
            $scope.FormAddEditionAssurance.Pays =
              $scope.listePays[57].PY_CODEPAYS;
            $scope.FormAddEditionAssurance.Commercial =
              $scope.listeDesCommerciaux[2].TI_NUMTIERS;
            $scope.FormAddEditionAssurance.ZoneCommercial =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.FormAddEditionAssurance.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormAddEditionAssurance.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormAddEditionAssurance.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
              $scope.FormAddEditionAssurance.dateDebut =
              $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
              $scope.FormAddEditionAssurance.dateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            if (
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECTNEW" ||
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_AFFAIRENOUVELLE" ||
                $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_AFF_NOUV_RENOUV" || 
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_ENCAISSEMENTCOMPTANT" ||
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_ENCAISSEMENTDIFFERE" ||
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_BORDEREAUP" ||
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTESINISTRENEW"
            ) {
              $scope.verouDateDebut = true;
              $scope.FormAddEditionAssurance.dateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.FormAddEditionAssurance.dateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

              if($scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_ENCAISSEMENTDIFFERE"){
                $scope.FormAddEditionAssurance.dateDebut =
                $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
              }
              if($scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_AFF_NOUV_RENOUV"){
                $scope.FormAddEditionAssurance.dateDebut =
                $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
                
                $scope.verouDateDebut = false;
              }
            /*  $scope.verouRisque = false;
              $scope.FormAddEditionAssurance.Risque = ""*/
            }

               //ENCAISSEMENT DE CHEQUE DIFFERE

            if (
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_ENCAISSEMENTDIFFERE" ) {
              $scope.verouDateDebut = false;
            }
            // avis de renouvellement de police
            if (
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_AVI_RENOUVELLEMENTPOLICE" ||
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_ETATCLIENTENPORTEFEUIL" ||
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_AVI_REG_PRIME"
            ) {
             /* $scope.verouRisque = false;
              $scope.FormAddEditionAssurance.Risque = ""*/
              //$scope.FormAddEditionAssurance.Risque =
              //  $scope.listeRisque[0].RQ_CODERISQUE;
              $scope.FormAddEditionAssurance.Commercial = ""
            }

            if (
              $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_ETATECHEANCIERPOLICE"
            ) {
              $scope.veroudateEffet = false;
              $scope.veroudateEcheance = false;
            } else {
              $scope.veroudateEffet = true;
              $scope.veroudateEcheance = true;
            }

            if (
              $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_AFFAIRENOUVELLE" ||
                $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_AFF_NOUV_RENOUV" || 
              $scope.listeEditionAssurance[j].ET_INDEX == "AS_LISTECTNEW"
            ) {
              $scope.verouCommercial = false;
            } else {
              $scope.verouCommercial = true;
            }

            /*if (
                $scope.listeEditionAssurance[j].ET_INDEX ==
                "AS_AFF_NOUV_RENOUV" 
            ) {
              //$scope.FormAddEditionAssurance.Commercial = "00000004"
              $scope.verouCommercial = true;
              
            } */

            if (
              $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_LISTECONTRATSNONRENOUVELLE"
            ) {
              $scope.lAnnee = $scope.FormAddEditionAssurance.Exercice - 1;
              $scope.FormAddEditionAssurance.dateDebut =
                "01/01/" + $scope.lAnnee;
              $scope.FormAddEditionAssurance.dateFin = "31/12/" + $scope.lAnnee;
              $scope.verouDateDebut = true;
              $scope.verouDateFin = true;
             // $scope.verouRisque = false;
              $scope.verouPeriod = false;
              $scope.verouPeriodicit = false;
            } /*else {
              $scope.FormAddEditionAssurance.dateDebut =
              $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
              $scope.FormAddEditionAssurance.dateFin =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            }*/

            if (
              $scope.listeEditionAssurance[j].ET_INDEX ==
              "AS_ETATECHEANCIERPOLICE"
            ) {
              $scope.FormAddEditionAssurance.dateEffet =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.FormAddEditionAssurance.dateEcheance =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            }

           // $scope.afficheListePeriode();
          
            break;
          }
        } else {
          $("#idEtat" + j).css("background-color", "white");
        }
      }
    };




   
    $scope.afficheListeDesClients = function () {
      $scope.$emit("LOAD");
        $scope.statutliste = false;
        $scope.verouNpolice = false;
        
      if(this.FormAddClient.code == undefined || this.FormAddClient.code == null){
        this.FormAddClient.code = ""
      }

      if(this.FormAddClient.denomination == undefined || this.FormAddClient.denomination == null){
        this.FormAddClient.denomination = ""
      }

      if(this.FormAddClient.numPolice == undefined || this.FormAddClient.numPolice == null || this.FormAddClient.numPolice == ""){
        $scope.verouNpolice = false;
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            TI_NUMTIERS: this.FormAddClient.code,
            TI_DENOMINATION: this.FormAddClient.denomination,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $scope.FormAddEditionAssurance.dateDebut,//$rootScope.DATE_PREMIER_EXERCICE,//,
            TI_DATESAISIE2: $scope.FormAddEditionAssurance.dateFin,//$rootScope.DATE_JOURNEE_DE_TRAVAIL,//,
            SL_LIBELLEECRAN: "ECRAN AUTO",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "TIERS",
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
          .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
           
          })
          .then(function (reponse) {
            $scope.listeDesSouscripteurs = reponse.data;
            
            if (
              $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
             
             $scope.statutliste = true;
             
            } else {
              $scope.$emit("UNLOAD");
              $scope.statutliste = false;
              $rootScope.MessageDesListes(
                $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }else{
        $scope.verouNpolice = true;
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            TI_EMAIL: this.FormAddClient.numPolice,
            TI_NUMTIERS: this.FormAddClient.code,
            TI_DENOMINATION: this.FormAddClient.denomination,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $scope.FormAddEditionAssurance.dateDebut,//$rootScope.DATE_PREMIER_EXERCICE,//,
            TI_DATESAISIE2: $scope.FormAddEditionAssurance.dateFin,//$rootScope.DATE_JOURNEE_DE_TRAVAIL,//,
            SL_LIBELLEECRAN: "ECRAN AUTO",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "TIERS",
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
          .post("/SouscripteurCommercial/ListeTiersNew/", $scope.objet_envoie, {
           
          })
          .then(function (reponse) {
            $scope.listeDesSouscripteurs = reponse.data;
            
            if (
              $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
             
             $scope.statutliste = true;
             
            } else {
              $scope.$emit("UNLOAD");
              $scope.statutliste = false;
              $rootScope.MessageDesListes(
                $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }

      
    };
  




    $scope.afficheClientEtat = function () {
      $scope.$emit("LOAD");
      $scope.Chargement = "Chargement en cours...";
        if (
          $scope.FormAddEditionAssurance.Succursales === "" ||
          $scope.FormAddEditionAssurance.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        } else if (
          $scope.FormAddEditionAssurance.Entrepot === "" ||
          $scope.FormAddEditionAssurance.Entrepot === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idEntrepot").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un entrepot"
          );
        } else if (
          $scope.FormAddEditionAssurance.Exercice === "" ||
          $scope.FormAddEditionAssurance.Exercice === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idExercice").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un exercice"
          );
        }/* else if (
          $scope.FormAddEditionAssurance.Periodicite === "" ||
          $scope.FormAddEditionAssurance.Periodicite === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodicite").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une périodicité"
          );
        } else if (
          $scope.FormAddEditionAssurance.Periode === "" ||
          $scope.FormAddEditionAssurance.Periode === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriode").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une période"
          );
        }*/ else if (
          $scope.FormAddEditionAssurance.dateDebut === "" ||
          $scope.FormAddEditionAssurance.dateDebut === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idDateDebut").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez renseigner une date correcte"
          );
        } else if (
          $scope.FormAddEditionAssurance.dateFin === "" ||
          $scope.FormAddEditionAssurance.dateFin === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idDateFin").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez renseigner une date correcte"
          );
        } else if (
          $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
          $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idDateFin").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
              EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
              CA_CODECONTRAT: "",
              DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,//"01-10-2021",//
              DATEFIN: $scope.FormAddEditionAssurance.dateFin,
              OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
              RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
              TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
              TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
              PY_CODEPAYS: "",
              VL_CODEVILLE: "",
              CO_CODECOMMUNE: "",
              ZA_CODEZONEAUTO: "",
              NS_CODENATURESINISTRE: "",
              ZN_CODEZONECOMMERCIAL: "",
              TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
              CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
              SL_LIBELLEECRAN: "Saisie de Continent",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              NOMETAT: $scope.recuperationnomfichier,
              ET_TYPEETAT: "ASAVIEGRIMELISTE",
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              LG_CODELANGUE: "fr",
              // SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];

          $http
            .post("/EditionEtatAssurance/InserteditionlISTE/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.RetourInserteditionListe = reponse.data;
              if (
                $scope.RetourInserteditionListe[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $scope.leChargement = false;
             
               
              } else {
                $scope.$emit("UNLOAD");
                $scope.Chargement = $scope.RetourInserteditionListe[0].clsObjetRetour.SL_MESSAGE;
                $rootScope.MessageDesListes(
                  $scope.RetourInserteditionListe[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $scope.Chargement = $scope.RetourInserteditionListe[0].clsObjetRetour.SL_MESSAGE;
              $rootScope.ProblemeServeur(
                $scope.RetourInserteditionListe[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
    
    }

  /*  $scope.afficheApercuClientEtat = function (info) {
     
      if (
        $scope.FormAddEditionAssurance.Succursales === "" ||
        $scope.FormAddEditionAssurance.Succursales === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idSuccursales").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez selectionner une succursale"
        );
      } else if (
        $scope.FormAddEditionAssurance.Entrepot === "" ||
        $scope.FormAddEditionAssurance.Entrepot === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idEntrepot").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez selectionner un entrepot"
        );
      } else if (
        $scope.FormAddEditionAssurance.Exercice === "" ||
        $scope.FormAddEditionAssurance.Exercice === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idExercice").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez selectionner un exercice"
        );
      } else if (
        $scope.FormAddEditionAssurance.Periodicite === "" ||
        $scope.FormAddEditionAssurance.Periodicite === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodicite").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez selectionner une périodicité"
        );
      } else if (
        $scope.FormAddEditionAssurance.Periode === "" ||
        $scope.FormAddEditionAssurance.Periode === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriode").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez selectionner une période"
        );
      } else if (
        $scope.FormAddEditionAssurance.dateDebut === "" ||
        $scope.FormAddEditionAssurance.dateDebut === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idDateDebut").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez renseigner une date correcte"
        );
      } else if (
        $scope.FormAddEditionAssurance.dateFin === "" ||
        $scope.FormAddEditionAssurance.dateFin === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idDateFin").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez renseigner une date correcte"
        );
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
        $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
            EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
            CA_CODECONTRAT: "",
            DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,//"01-10-2021",//
            DATEFIN: $scope.FormAddEditionAssurance.dateFin,
            OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
            RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
            TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
            TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
            TI_IDTIERSCLIENT: info,
            PY_CODEPAYS: "",
            VL_CODEVILLE: "",
            CO_CODECOMMUNE: "",
            ZA_CODEZONEAUTO: "",
            NS_CODENATURESINISTRE: "",
            ZN_CODEZONECOMMERCIAL: "",
            TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
            CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: "",
            NOMETAT: $scope.recuperationnomfichier,
            ET_TYPEETAT: "ASAVIEGRIME",
            ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
            LG_CODELANGUE: "fr",
            // SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];

        $http
          .post("/EditionEtatAssurance/Insertedition/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.RetourInserteditionListe = reponse.data;
            if (
              $scope.RetourInserteditionListe[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              
              $scope.objet_envoie = [
                {
                  AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
                  EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
                  CA_CODECONTRAT: "",
                  DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,//"01-10-2021",//
                  DATEFIN: $scope.FormAddEditionAssurance.dateFin,
                  OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                  RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
                  TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
                  TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
                  TI_IDTIERSCLIENT: info,
                  PY_CODEPAYS: "",
                  VL_CODEVILLE: "",
                  CO_CODECOMMUNE: "",
                  ZA_CODEZONEAUTO: "",
                  NS_CODENATURESINISTRE: "",
                  ZN_CODEZONECOMMERCIAL: "",
                  TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
                  CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
                  SL_LIBELLEECRAN: "Saisie de Continent",
                  SL_LIBELLEMOUCHARD: "INSERTIONS",
                  TYPEOPERATION: "",
                  NOMETAT: $scope.recuperationnomfichier,
                  ET_TYPEETAT: "ASAVIEGRIMESE",
                  ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                  LG_CODELANGUE: "fr",
                  // SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
                  clsObjetEnvoi: {
                    OE_A: $rootScope.CODE_AGENCE,
                    OE_Y: $rootScope.CODE_OPERATEUR,
                    OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                    OE_E: $rootScope.CODE_ENTREPOT,
                  },
                },
              ];
      
              $http
              .post("/EditionEtatAssurance/InserteditionSource2/", $scope.objet_envoie, {
                //headers: $scope.headers
              })
              .then(function (reponse) {
                $scope.RetourInserteditionListe = reponse.data;
                if (
                  $scope.RetourInserteditionListe[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                  $scope.$emit("UNLOAD");
                 
                  $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtatSousEtat/",
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
                  $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtatSousEtat/",
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

                }
              })
              .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.RetourInserteditionListe[0].clsObjetRetour.SL_MESSAGE
                );
              });



           
             
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.RetourInserteditionListe[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.RetourInserteditionListe[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
  
  }*/

  $scope.afficheApercuClientEtat = function (info) {
    $scope.$emit("LOAD");
    $scope.Chargement = "Chargement en cours...";
    if (
      $scope.FormAddEditionAssurance.Succursales === "" ||
      $scope.FormAddEditionAssurance.Succursales === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idSuccursales").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner une succursale"
      );
    } else if (
      $scope.FormAddEditionAssurance.Entrepot === "" ||
      $scope.FormAddEditionAssurance.Entrepot === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idEntrepot").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner un entrepot"
      );
    } else if (
      $scope.FormAddEditionAssurance.Exercice === "" ||
      $scope.FormAddEditionAssurance.Exercice === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idExercice").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner un exercice"
      );
    }/* else if (
      $scope.FormAddEditionAssurance.Periodicite === "" ||
      $scope.FormAddEditionAssurance.Periodicite === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idPeriodicite").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner une périodicité"
      );
    } else if (
      $scope.FormAddEditionAssurance.Periode === "" ||
      $scope.FormAddEditionAssurance.Periode === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idPeriode").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner une période"
      );
    } */else if (
      $scope.FormAddEditionAssurance.dateDebut === "" ||
      $scope.FormAddEditionAssurance.dateDebut === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idDateDebut").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez renseigner une date correcte"
      );
    } else if (
      $scope.FormAddEditionAssurance.dateFin === "" ||
      $scope.FormAddEditionAssurance.dateFin === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idDateFin").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez renseigner une date correcte"
      );
    } else if (
      $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
      $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateFin").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur =
        "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    } else {
      if($scope.selectFormats == ""){
        $scope.selectFormats = "PDF"
      }
      $scope.objet_envoie = [
        {
          
          AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
          EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
          CA_CODECONTRAT: "",
          DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,//$rootScope.DATE_PREMIER_EXERCICE
          DATEFIN: $scope.FormAddEditionAssurance.dateFin,
          OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
          RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
          TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
          TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
          TI_IDTIERSCLIENT: info,
          EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
          "PY_CODEPAYS": "",
          "VL_CODEVILLE": "",
          "CO_CODECOMMUNE": "",
          "ZA_CODEZONEAUTO": "",
          "NS_CODENATURESINISTRE": "",
          TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
          CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
          ET_TYPEETAT: "ASAVIEGRIME",
          //ENTETE1: $scope.selectFormats,
          "ZN_CODEZONECOMMERCIAL": "",
          "SL_LIBELLEECRAN": "Saisie de Continent",
          "SL_LIBELLEMOUCHARD": "INSERTIONS",
          "TYPEOPERATION": "",
          "LG_CODELANGUE": "fr",
          "vappNomFormule": [
                "Entete1",
                "Entete2",
                "Entete3",
                "Entete4",
                "LibelleEtat",
                "Date1",
                  "Date2"
          ],
          "vappValeurFormule": [
            $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE1,
            $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE2,
            $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE3,
            $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE4,
            "AVIS DE REGLEMENT DES PRIMES D'ASSURANCES",
            $scope.FormAddEditionAssurance.dateDebut,
            $scope.FormAddEditionAssurance.dateFin,
            $scope.selectFormats
            ],
            "ET_DOSSIER": "ASSURANCE",
            "ET_NOMETAT": "SituationCompteClient.rpt",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        },
      ]
        
    /*  $scope.Adresse = $scope.appelServiceWeb.split('/')
      $scope.Adresse = $scope.Adresse[0] + '//' + $scope.Adresse[2]
      $http
        .post($scope.Adresse +
          "/ServiceEdition/wsEditionEtatAssurance.svc/pvgInsertIntoDatasetEtatAssuranceAvisReglementPrime", $scope.objet_envoie, {
          //headers: $scope.headers
        })*/
        $http
        .post(
          "/EditionEtatAssurance/ListeAvisdeReglement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
            $scope.RetourInserteditionApercuListe = reponse.data;
            $scope.RetourInserteditionApercuListe = $scope.RetourInserteditionApercuListe;
           // $scope.RetourInserteditionListe = $scope.listeDemande.TABLE;
            if ($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
              $scope.$emit("UNLOAD");
              toastr["success"]($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE); // Affichage de la notification de succes
              $window.open($scope.RetourInserteditionApercuListe[0].URL_ETAT, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
              $scope.loading = false; 
            } else {
              $scope.Chargement = $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE;
             $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE);
            }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $scope.Chargement = $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE;
          $rootScope.ProblemeServeur(
            $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE
          );
        });
    }
  }

  $scope.afficheApercuEtatEncaissementPrime = function () {
    $scope.$emit("LOAD");
    let typeDate =
    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    $scope.Chargement = "Chargement en cours...";
    if ($scope.FormAddEditionAssurance.dateDebut !== undefined || $scope.FormAddEditionAssurance.dateFin !== undefined) {
      // $scope.FormAddAuto.Effet = dateEffet;
      // $scope.FormAddAuto.Echeance = dateEcheance;
      $scope.lAnneeEffet = $scope.FormAddEditionAssurance.dateDebut.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddEditionAssurance.dateDebut.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddEditionAssurance.dateDebut.substr(0, 2);
      $scope.lAnneeEcheance = $scope.FormAddEditionAssurance.dateFin.substr(6, 4);
      $scope.leMoisEcheance = $scope.FormAddEditionAssurance.dateFin.substr(3, 2);
      $scope.leJourEcheance = $scope.FormAddEditionAssurance.dateFin.substr(0, 2);
    }
    if (
      $scope.FormAddEditionAssurance.Succursales === "" ||
      $scope.FormAddEditionAssurance.Succursales === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idSuccursales").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner une succursale"
      );
    } else if (
      $scope.FormAddEditionAssurance.Entrepot === "" ||
      $scope.FormAddEditionAssurance.Entrepot === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idEntrepot").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner un entrepot"
      );
    } else if (
      $scope.FormAddEditionAssurance.Exercice === "" ||
      $scope.FormAddEditionAssurance.Exercice === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idExercice").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner un exercice"
      );
    }/* else if (
      $scope.FormAddEditionAssurance.Periodicite === "" ||
      $scope.FormAddEditionAssurance.Periodicite === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idPeriodicite").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner une périodicité"
      );
    } else if (
      $scope.FormAddEditionAssurance.Periode === "" ||
      $scope.FormAddEditionAssurance.Periode === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idPeriode").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner une période"
      );
    } */else if (
      $scope.FormAddEditionAssurance.dateDebut === "" ||
      $scope.FormAddEditionAssurance.dateDebut === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idDateDebut").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez renseigner une date correcte"
      );
    } else if (
      $scope.FormAddEditionAssurance.dateFin === "" ||
      $scope.FormAddEditionAssurance.dateFin === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idDateFin").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez renseigner une date correcte"
      );
    } else if (
      $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
      $scope.leMoisEcheance == "02" &&
      $scope.leJourEcheance > "29"
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateFin").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur = "La date de fin n'est pas valide";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    } else if (
      $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
      $scope.leMoisEcheance == "02" &&
      $scope.leJourEcheance > "28"
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateFin").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur = "La date de fin n'est pas valide";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    }else if (
      $scope.anneeBissextile($scope.lAnneeEffet) == false &&
      $scope.leMoisEffet == "02" &&
      $scope.leJourEffet > "29"
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateDebut").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur = "La date de debut n'est pas valide";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    } else if (
      $scope.anneeBissextile($scope.lAnneeEffet) == false &&
      $scope.leMoisEffet == "02" &&
      $scope.leJourEffet > "28"
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateDebut").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur = "La date de debut n'est pas valide";
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
        $("#idDateDebut").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur = "La date fin n'est pas valide";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    }else if (
      ($scope.leMoisEcheance == "04" ||
        $scope.leMoisEcheance == "06" ||
        $scope.leMoisEcheance == "09" ||
        $scope.leMoisEcheance == "11") &&
      $scope.leJourEcheance > "30"
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateFin").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur = "La date de fin n'est pas valide";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    }/*else if (
      $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
      $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateFin").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur =
        "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    }*/ else {
      
      $scope.objet_envoie = [
        {
          
            AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
            EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
            "CA_CODECONTRAT": "",
            DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,//$rootScope.DATE_PREMIER_EXERCICE
            DATEFIN: $scope.FormAddEditionAssurance.dateFin,
            EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
            OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
            RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
            TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
            TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
            "PY_CODEPAYS": "",
            "VL_CODEVILLE": "",
            "CO_CODECOMMUNE": "",
            "ZA_CODEZONEAUTO": "",
            "NS_CODENATURESINISTRE": "",
            "ZN_CODEZONECOMMERCIAL": "",
            TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
            CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "",
            "NOMETAT": "EtatEncaissementChequediffere.rpt",
            "ET_TYPEETAT": "AS_ECAIDIF",
            "ET_LIBELLEETAT": "ETAT DES ENCAISSEMENTS CHEQUES DIFFERES ",
            "LG_CODELANGUE": "fr",
            "vappNomFormule": [
                "Entete1",
                "Entete2",
                "Entete3",
                "Entete4",
                "LibelleEtat",
                "Date1",
                "Date2"
            ],
            "vappValeurFormule": [
                $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE1,
                $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE2,
                $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE3,
                $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE4,
                "ETAT DES ENCAISSEMENTS CHEQUES DIFFERES ",
                $scope.FormAddEditionAssurance.dateDebut,
                $scope.FormAddEditionAssurance.dateFin,

            ],
            "clsObjetEnvoi": {
                "ET_DOSSIER": "ASSURANCE",
                "ET_NOMETAT": "EtatEncaissementChequediffere.rpt",
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
            }
        },
      ]
        
    /*  $scope.Adresse = $scope.appelServiceWeb.split('/')
      $scope.Adresse = $scope.Adresse[0] + '//' + $scope.Adresse[2]
      $http
        .post($scope.Adresse +
          "/ServiceEdition/wsEditionEtatAssurance.svc/pvgInsertIntoDatasetEtatAssuranceAvisReglementPrime", $scope.objet_envoie, {
          //headers: $scope.headers
        })*/
        $http
        .post(
          "/EditionEtatAssurance/ListetatdesPrimeEncaissement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
            $scope.RetourInserteditionApercuListe = reponse.data;
            $scope.RetourInserteditionApercuListe = $scope.RetourInserteditionApercuListe;
           // $scope.RetourInserteditionListe = $scope.listeDemande.TABLE;
            if ($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
              $scope.$emit("UNLOAD");
              toastr["success"]($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE); // Affichage de la notification de succes
              $window.open($scope.RetourInserteditionApercuListe[0].URL_ETAT, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
              $scope.loading = false; 
            } else {
              $scope.Chargement = $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE;
             $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE);
            }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $scope.Chargement = $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE;
          $rootScope.ProblemeServeur(
            $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE
          );
        });
    }
  }

  $scope.afficheApercuInserteditionEtatVentilleAffaireNouvelles = function (info) {
    $scope.$emit("LOAD");
    let typeDate =
    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    $scope.Chargement = "Chargement en cours...";
    if ($scope.FormAddEditionAssurance.dateDebut !== undefined || $scope.FormAddEditionAssurance.dateFin !== undefined) {
      // $scope.FormAddAuto.Effet = dateEffet;
      // $scope.FormAddAuto.Echeance = dateEcheance;
      $scope.lAnneeEffet = $scope.FormAddEditionAssurance.dateDebut.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddEditionAssurance.dateDebut.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddEditionAssurance.dateDebut.substr(0, 2);
      $scope.lAnneeEcheance = $scope.FormAddEditionAssurance.dateFin.substr(6, 4);
      $scope.leMoisEcheance = $scope.FormAddEditionAssurance.dateFin.substr(3, 2);
      $scope.leJourEcheance = $scope.FormAddEditionAssurance.dateFin.substr(0, 2);
    }
    if (
      $scope.FormAddEditionAssurance.Succursales === "" ||
      $scope.FormAddEditionAssurance.Succursales === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idSuccursales").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner une succursale"
      );
    } else if (
      $scope.FormAddEditionAssurance.Entrepot === "" ||
      $scope.FormAddEditionAssurance.Entrepot === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idEntrepot").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner un entrepot"
      );
    } else if (
      $scope.FormAddEditionAssurance.Exercice === "" ||
      $scope.FormAddEditionAssurance.Exercice === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idExercice").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner un exercice"
      );
    }  else if (
      $scope.FormAddEditionAssurance.dateDebut === "" ||
      $scope.FormAddEditionAssurance.dateDebut === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idDateDebut").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez renseigner une date correcte"
      );
    } else if (
      $scope.FormAddEditionAssurance.dateFin === "" ||
      $scope.FormAddEditionAssurance.dateFin === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idDateFin").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez renseigner une date correcte"
      );
    } /*else if (
      $scope.FormAddEditionAssurance.Commercial === "" ||
      $scope.FormAddEditionAssurance.Commercial === undefined
    ) {
      $scope.$emit("UNLOAD");
      $("#idCommercial").css("background-color", "#FFE9E0");
      $rootScope.EnregistrementNonReussi(
        "Veuillez selectionner un commercial"
      );
    }*/ else if (
      $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
      $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
    ) {
      $scope.$emit("UNLOAD");
      $(document).ready(function () {
        $("#idDateFin").css("background-color", "#FFE9E0");
      });
      $scope.messageErreur =
        "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
      $rootScope.MessageDerreurDesTypes($scope.messageErreur);
    } else {
      var libel = "AFFAIRES NOUVELLES"
     /*for(let i =0; i < $scope.listeTypeAffaire.length;i++){
       if($scope.FormAddEditionAssurance.TypeAffaire == $scope.listeTypeAffaire[i].TA_CODETYPEAFFAIRES){
          libel = $scope.listeTypeAffaire[i].TA_LIBLLETYPEAFFAIRES
          break
       }
     }*/
      if($scope.FormAddEditionAssurance.TypeAffaire == "01"){
        libel = "ETAT VENTILE DES AFFAIRES NOUVELLES "
      }else if ($scope.FormAddEditionAssurance.TypeAffaire == "02"){
        libel = "ETAT VENTILE DES RENOUVELLEMENTS "
      }else{
        libel = "ETAT VENTILE DES AFFAIRES NOUVELLES ET DES RENOUVELLEMENTS "
      }

        $scope.objet_envoie = [
          {
            
            AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
            EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
            CA_CODECONTRAT: "",
            DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,//$scope.FormAddEditionAssurance.dateDebut,
            DATEFIN: $scope.FormAddEditionAssurance.dateFin,
            EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
            OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
            RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
            TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
            TI_IDTIERSCOMMERCIAL: "00000004",//$scope.FormAddEditionAssurance.Commercial,
            PY_CODEPAYS: "",
            VL_CODEVILLE: "",
            CO_CODECOMMUNE: "",
            ZA_CODEZONEAUTO: "",
            NS_CODENATURESINISTRE: "",
            TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
            CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: "",
            NOMETAT: "EtatVentilleAffaireNouvelles.rpt",
            ET_TYPEETAT: "AS_AFNVELLE",
            ET_LIBELLEETAT: libel,
            FORMATETAT: info,
            LG_CODELANGUE: "fr",
            ZN_CODEZONECOMMERCIAL:
              $scope.FormAddEditionAssurance.ZoneCommercial,
              "vappNomFormule": [
                  "Entete1",
                  "Entete2",
                  "Entete3",
                  "Entete4",
                  "LibelleEtat",
                  "Date1",
                  "Date2"
              ],
              "vappValeurFormule": [
                  $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE1,
                  $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE2,
                  $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE3,
                  $rootScope.infoDeLoperateur[0].clsAgences[0].ENTETE4,
                  libel,
                  $scope.FormAddEditionAssurance.dateDebut,
                  $scope.FormAddEditionAssurance.dateFin,

              ],
              "clsObjetEnvoi": {
                  "ET_DOSSIER": "ASSURANCE",
                  "ET_NOMETAT": "EtatVentilleAffaireNouvelles.rpt",
                  OE_A: $rootScope.CODE_AGENCE,
                  OE_Y: $rootScope.CODE_OPERATEUR,
                  OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                  OE_E: $rootScope.CODE_ENTREPOT,
              }
          },
        ]
        $http
        .post(
          "/EditionEtatAssurance/InserteditionEtatVentilleAffaireNouvelles/", $scope.objet_envoie, {
        })
        .then(function (reponse) {
            $scope.RetourInserteditionApercuListe = reponse.data;
            $scope.RetourInserteditionApercuListe = $scope.RetourInserteditionApercuListe;
           // $scope.RetourInserteditionListe = $scope.listeDemande.TABLE;
            if ($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
              $scope.$emit("UNLOAD");
              toastr["success"]($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE); // Affichage de la notification de succes
              $window.open($scope.RetourInserteditionApercuListe[0].URL_ETAT, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
              $scope.loading = false; 
            } else {
              $scope.Chargement = $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE;
             $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes($scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE);
            }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $scope.Chargement = $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE;
          $rootScope.ProblemeServeur(
            $scope.RetourInserteditionApercuListe[0].clsObjetRetour.SL_MESSAGE
          );
        });
    }
  }

    /* $scope.recupnom = function (nometat) {
	   $scope.recuperationnom = nometat
	  }*/

    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idDateDebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateFin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodicite").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriode").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEntrepot").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSuccursales").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEcheance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idZoneCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEffet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEcheance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCompagnieAssurance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatureSinistre").focusin(function () {
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
        $("#idZoneMaladie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idZoneAuto").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idRisque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idStatutContrat").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    $scope.apercuEtatRemiseCheque = function (formaEtat) {
      $("#modal_TypeFichier").modal('hide');
      $scope.$emit("LOAD");
      if (
        $scope.FormAddEditionAssurance.Succursales === "" ||
        $scope.FormAddEditionAssurance.Succursales === undefined
      ) {
        $scope.$emit("UNLOAD");
        $("#idSuccursales").css("background-color", "#FFE9E0");
        $rootScope.EnregistrementNonReussi(
          "Veuillez selectionner une succursale"
        );
      }  else if (
        $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
        $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
         if($scope.FormAddEditionAssurance.Risque == undefined || $scope.FormAddEditionAssurance.Risque == "" || $scope.FormAddEditionAssurance.Risque == null){
             $scope.FormAddEditionAssurance.Risque = ""
         } 

         if($scope.FormAddEditionAssurance.TypeAffaire == undefined || $scope.FormAddEditionAssurance.TypeAffaire == "" || $scope.FormAddEditionAssurance.TypeAffaire == null){
            $scope.FormAddEditionAssurance.TypeAffaire = ""
         }

        $scope.objet_envoie = [
          {
            "AG_CODEAGENCE": $scope.FormAddEditionAssurance.Succursales,
            "CA_CODECONTRAT": "0",
            "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
            "DATEDEBUT": $scope.FormAddEditionAssurance.dateDebut,
            "DATEFIN": $scope.FormAddEditionAssurance.dateFin,
            EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
            NOMETAT: $scope.recuperationnomfichier,
            ET_TYPEETAT: $scope.recuperationnom,
            ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
            RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
            TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
            FORMATETAT: formaEtat,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "2",
            "LG_CODELANGUE": "fr",
           /* AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
            EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
            CA_CODECONTRAT: "",
            DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,
            DATEFIN: $scope.FormAddEditionAssurance.dateFin,
            OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
            // SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
            ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
            RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
            TI_IDTIERS: "",
            TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
            CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
            NOMETAT: $scope.recuperationnomfichier,
            ET_TYPEETAT: $scope.recuperationnom,
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: "",
            LG_CODELANGUE: "fr",*/
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];

        $http
          .post("/EditionEtatAssurance/Insertedition3/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.RetourInsertedition = reponse.data;

            /* for (var i = 0; i < $scope.listeEditionAssurance.length; i++) {
              if ("#idEtat" + i != "#idEtat" + idEtat) {
                $("#idEtat" + i).css("background-color", "white");

                $scope.afficheBouton[i] = false;
                $("#idBtnEtat" + i).css("background-color", "white");
              } else {
                $scope.afficheBouton[idEtat] = true;
                $("#idBtnEtat" + idEtat).css("background-color", "beige");
              }
            } */

            if (
              $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $http
                .post(
                  "/EditionEtatAssurance/pvgAfficherEtat2/",
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
  
  $scope.selectFormat = function (formaEtats) {
    $scope.selectFormats = formaEtats
    var element = document.getElementById('doc')
    element.style.border = '2px solid white';
    var element = document.getElementById('PDF')
    element.style.border = '2px solid white';
    var element = document.getElementById('xls')
    element.style.border = '2px solid white';
    var element = document.getElementById('xlsx')
    element.style.border = '2px solid white';

    var element = document.getElementById(formaEtats)
    element.style.border = '2px solid yellow';
  }
    // debut de l'apercu de l'etat
    $scope.apercuEtat = function (formaEtat) {
      $("#modal_TypeFichierGlobale").modal('hide');
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      if($scope.FormAddEditionAssurance.CompagnieAssurance == undefined){
        $scope.FormAddEditionAssurance.CompagnieAssurance = ""
      }
      if (
        $scope.recuperationEtIndex == "AS_LISTECT" ||
        $scope.recuperationEtIndex == "AS_LISTECTTRANSMIS" ||
        // $scope.listeEditionAssurance[j].ET_INDEX == "ASLCHEQUEENS" ||
        $scope.recuperationEtIndex == "AS_LISTESINISTRETRANS" ||
        $scope.recuperationEtIndex == "AS_SIT_GLE" ||
        $scope.recuperationEtIndex == "AS_SIT_SINISTRE" ||
        $scope.recuperationEtIndex == "AS_COMCT" ||
        $scope.recuperationEtIndex == "AS_TAB_GESTION" ||
        $scope.recuperationEtIndex == "AS_LISTESINISTREREGLE"
      ) {
        if (
          $scope.FormAddEditionAssurance.Succursales === "" ||
          $scope.FormAddEditionAssurance.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        } else if (
          $scope.FormAddEditionAssurance.Entrepot === "" ||
          $scope.FormAddEditionAssurance.Entrepot === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idEntrepot").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un entrepot"
          );
        } else if (
          $scope.FormAddEditionAssurance.Exercice === "" ||
          $scope.FormAddEditionAssurance.Exercice === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idExercice").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un exercice"
          );
        }/* else if (
          $scope.FormAddEditionAssurance.Periodicite === "" ||
          $scope.FormAddEditionAssurance.Periodicite === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodicite").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une périodicité"
          );
        } else if (
          $scope.FormAddEditionAssurance.Periode === "" ||
          $scope.FormAddEditionAssurance.Periode === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriode").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une période"
          );
        }*/ else if (
          ($scope.FormAddEditionAssurance.Risque === "" ||
            $scope.FormAddEditionAssurance.Risque === undefined) &&
          $scope.recuperationnom == "ASSITGLE"
        ) {
          $scope.$emit("UNLOAD");
          $("#idRisque").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi("Veuillez selectionner un risque");
        } else if (
          $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
          $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idDateFin").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
              EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
              CA_CODECONTRAT: "",
              DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,
              DATEFIN: $scope.FormAddEditionAssurance.dateFin,
              OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
              // SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
              TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
              TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
              CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
              EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
              FORMATETAT: formaEtat,
              NOMETAT: $scope.recuperationnomfichier,
              ET_TYPEETAT: $scope.recuperationnom,
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
            .post("/EditionEtatAssurance/Insertedition/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.RetourInsertedition = reponse.data;

              /* for (var i = 0; i < $scope.listeEditionAssurance.length; i++) {
                if ("#idEtat" + i != "#idEtat" + idEtat) {
                  $("#idEtat" + i).css("background-color", "white");

                  $scope.afficheBouton[i] = false;
                  $("#idBtnEtat" + i).css("background-color", "white");
                } else {
                  $scope.afficheBouton[idEtat] = true;
                  $("#idBtnEtat" + idEtat).css("background-color", "beige");
                }
              } */

              if (
                $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtat/",
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
      }else  if (
        $scope.recuperationEtIndex == "AS_REM_CHEQUE" 
      ) {
          $scope.$emit("UNLOAD");
          $("#modal_TypeFichier").modal('show');
       }
      else  if (
        $scope.recuperationEtIndex == "AS_ETAT_SYN" 
      ) {
        if (
          $scope.FormAddEditionAssurance.Succursales === "" ||
          $scope.FormAddEditionAssurance.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        }  else if (
          $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
          $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idDateFin").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          $scope.objet_envoie = [
            {

              "AG_CODEAGENCE": $scope.FormAddEditionAssurance.Succursales,
              "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
              "CA_CODECONTRAT": "0",
              "DATEDEBUT": $scope.FormAddEditionAssurance.dateDebut,
              "DATEFIN": $scope.FormAddEditionAssurance.dateFin,
              EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
              "OP_CODEOPERATEUREDITION": $rootScope.CODE_OPERATEUR,
              "RQ_CODERISQUE": $scope.FormAddEditionAssurance.Risque,
              NOMETAT: $scope.recuperationnomfichier,
              ET_TYPEETAT: $scope.recuperationnom,
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              FORMATETAT: formaEtat,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              "LG_CODELANGUE": "fr",

            /*  "AG_CODEAGENCE": $scope.FormAddEditionAssurance.Succursales,
              "CA_CODECONTRAT": "0",
              "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
              "DATEDEBUT": $scope.FormAddEditionAssurance.dateDebut,
              "DATEFIN": $scope.FormAddEditionAssurance.dateFin,
              NOMETAT: $scope.recuperationnomfichier,
              ET_TYPEETAT: $scope.recuperationnom,
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "2",
              "LG_CODELANGUE": "fr",*/

              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];

          $http
            .post("/EditionEtatAssurance/EtatSynoptique/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.RetourInsertedition = reponse.data;

              /* for (var i = 0; i < $scope.listeEditionAssurance.length; i++) {
                if ("#idEtat" + i != "#idEtat" + idEtat) {
                  $("#idEtat" + i).css("background-color", "white");

                  $scope.afficheBouton[i] = false;
                  $("#idBtnEtat" + i).css("background-color", "white");
                } else {
                  $scope.afficheBouton[idEtat] = true;
                  $("#idBtnEtat" + idEtat).css("background-color", "beige");
                }
              } */

              if (
                $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtat/",
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
      else  if (
         $scope.recuperationEtIndex == "AS_ETAT_CBC"
      ) {
        if (
          $scope.FormAddEditionAssurance.Succursales === "" ||
          $scope.FormAddEditionAssurance.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        }  else if (
          $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
          $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idDateFin").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }else if (
          $scope.FormAddEditionAssurance.Commercial === "" ||
          $scope.FormAddEditionAssurance.Commercial === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idCommercial").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un commercial"
          );
        }
         else {
          $scope.objet_envoie = [
            {

              "AG_CODEAGENCE": $scope.FormAddEditionAssurance.Succursales,
              "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
              "CA_CODECONTRAT": "0",
              "DATEDEBUT": $scope.FormAddEditionAssurance.dateDebut,
              "DATEFIN": $scope.FormAddEditionAssurance.dateFin,
              EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
              "OP_CODEOPERATEUREDITION": $rootScope.CODE_OPERATEUR,
              "RQ_CODERISQUE": $scope.FormAddEditionAssurance.Risque,
              NOMETAT: $scope.recuperationnomfichier,
              ET_TYPEETAT: $scope.recuperationnom,
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
              FORMATETAT: formaEtat,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              "LG_CODELANGUE": "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];

          $http
            .post("/EditionEtatAssurance/EtatSynoptique/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.RetourInsertedition = reponse.data;

              /* for (var i = 0; i < $scope.listeEditionAssurance.length; i++) {
                if ("#idEtat" + i != "#idEtat" + idEtat) {
                  $("#idEtat" + i).css("background-color", "white");

                  $scope.afficheBouton[i] = false;
                  $("#idBtnEtat" + i).css("background-color", "white");
                } else {
                  $scope.afficheBouton[idEtat] = true;
                  $("#idBtnEtat" + idEtat).css("background-color", "beige");
                }
              } */

              if (
                $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtat/",
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
      }else if (
        $scope.recuperationEtIndex == "AS_ENCAISSEMENTDIFFERE"
      ) {
        $scope.afficheApercuEtatEncaissementPrime()
      }
       else if (
        $scope.recuperationEtIndex == "AS_LISTECTNEW" ||
        $scope.recuperationEtIndex == "AS_ENCAISSEMENTCOMPTANT" ||
        $scope.recuperationEtIndex == "AS_AVI_REG_PRIME" ||
        $scope.recuperationEtIndex == "AS_LISTESINISTRENEW" ||
        $scope.recuperationEtIndex == "AS_ETATECHEANCIERPOLICE" ||
        $scope.recuperationEtIndex == "AS_ETATCLIENTENPORTEFEUIL" ||
        $scope.recuperationEtIndex == "AS_LISTECONTRATSNONRENOUVELLE" ||
        $scope.recuperationEtIndex == "AS_AVI_RENOUVELLEMENTPOLICE"
      ) {
        if (
          $scope.FormAddEditionAssurance.Succursales === "" ||
          $scope.FormAddEditionAssurance.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        } else if (
          $scope.FormAddEditionAssurance.Entrepot === "" ||
          $scope.FormAddEditionAssurance.Entrepot === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idEntrepot").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un entrepot"
          );
        } else if (
          $scope.FormAddEditionAssurance.Exercice === "" ||
          $scope.FormAddEditionAssurance.Exercice === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idExercice").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un exercice"
          );
        }/* else if (
          $scope.FormAddEditionAssurance.Periodicite === "" ||
          $scope.FormAddEditionAssurance.Periodicite === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodicite").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une périodicité"
          );
        } else if (
          $scope.FormAddEditionAssurance.Periode === "" ||
          $scope.FormAddEditionAssurance.Periode === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriode").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une période"
          );
        } */else if (
          $scope.FormAddEditionAssurance.dateDebut === "" ||
          $scope.FormAddEditionAssurance.dateDebut === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idDateDebut").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez renseigner une date correcte"
          );
        } else if (
          $scope.FormAddEditionAssurance.dateFin === "" ||
          $scope.FormAddEditionAssurance.dateFin === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idDateFin").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez renseigner une date correcte"
          );
        } else if (
          $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
          $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idDateFin").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          if($scope.recuperationEtIndex == "AS_LISTECONTRATSNONRENOUVELLE"){
            $scope.FormAddEditionAssurance.Commercial = ""
          }
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
              EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
              CA_CODECONTRAT: "",
              DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,//"01-10-2021",//
              DATEFIN: $scope.FormAddEditionAssurance.dateFin,
              EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
              OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
              RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
              TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
              TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
              PY_CODEPAYS: "",
              VL_CODEVILLE: "",
              CO_CODECOMMUNE: "",
              ZA_CODEZONEAUTO: "",
              NS_CODENATURESINISTRE: "",
              ZN_CODEZONECOMMERCIAL: "",
              TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
              CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
              SL_LIBELLEECRAN: "Saisie de Continent",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              NOMETAT: $scope.recuperationnomfichier,
              ET_TYPEETAT: $scope.recuperationnom,
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              FORMATETAT: formaEtat,
              LG_CODELANGUE: "fr",
              // SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];

          $http
            .post("/EditionEtatAssurance/Insertedition/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.RetourInsertedition = reponse.data;
              if (
                $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                if($scope.recuperationEtIndex == "AS_AVI_REG_PRIME"){
                  $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtatSousEtat/",
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
                }else{
                  $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtat/",
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
                }
               
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
      } else if ($scope.recuperationEtIndex == "AS_LISTECPGASSUR") {
        if (
          $scope.FormAddEditionAssurance.Succursales === "" ||
          $scope.FormAddEditionAssurance.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        } else if (
          $scope.FormAddEditionAssurance.Entrepot === "" ||
          $scope.FormAddEditionAssurance.Entrepot === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idEntrepot").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un entrepot"
          );
        } else if (
          $scope.FormAddEditionAssurance.Exercice === "" ||
          $scope.FormAddEditionAssurance.Exercice === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idExercice").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un exercice"
          );
        } /*else if (
          $scope.FormAddEditionAssurance.Periodicite === "" ||
          $scope.FormAddEditionAssurance.Periodicite === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodicite").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une périodicité"
          );
        } else if (
          $scope.FormAddEditionAssurance.Periode === "" ||
          $scope.FormAddEditionAssurance.Periode === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriode").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une période"
          );
        }*/ else if (
          $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
          $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idDateFin").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
              EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
              OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
              TP_CODETYPECLIENT: "001",
              TC_CODECOMPTETYPETIERS: "",
              DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,
              DATEFIN: $scope.FormAddEditionAssurance.dateFin,
              EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
              TI_TVA: formaEtat,
              TI_ASDI: "",
              ET_TYPEETAT: $scope.recuperationnom,
              // ET_INDEX: $scope.listeEdition[j].ET_INDEX,
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              SC_CODESECTION: "",
              PY_CODEPAYS: "",
              NT_CODENATURETIERS: "",
             // FORMATETAT: formaEtat,
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
        $scope.recuperationEtIndex == "AS_AFFAIRENOUVELLE" ||
        $scope.recuperationEtIndex == "AS_BORDEREAUP"
      ) {
        if (
          $scope.FormAddEditionAssurance.Succursales === "" ||
          $scope.FormAddEditionAssurance.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une succursale"
          );
        } else if (
          $scope.FormAddEditionAssurance.Entrepot === "" ||
          $scope.FormAddEditionAssurance.Entrepot === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idEntrepot").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un entrepot"
          );
        } else if (
          $scope.FormAddEditionAssurance.Exercice === "" ||
          $scope.FormAddEditionAssurance.Exercice === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idExercice").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un exercice"
          );
        } /*else if (
          $scope.FormAddEditionAssurance.Periodicite === "" ||
          $scope.FormAddEditionAssurance.Periodicite === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodicite").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une périodicité"
          );
        } else if (
          $scope.FormAddEditionAssurance.Periode === "" ||
          $scope.FormAddEditionAssurance.Periode === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriode").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner une période"
          );
        }*/ else if (
          $scope.FormAddEditionAssurance.dateDebut === "" ||
          $scope.FormAddEditionAssurance.dateDebut === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idDateDebut").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez renseigner une date correcte"
          );
        } else if (
          $scope.FormAddEditionAssurance.dateFin === "" ||
          $scope.FormAddEditionAssurance.dateFin === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idDateFin").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez renseigner une date correcte"
          );
        } else if (
          $scope.FormAddEditionAssurance.Commercial === "" ||
          $scope.FormAddEditionAssurance.Commercial === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idCommercial").css("background-color", "#FFE9E0");
          $rootScope.EnregistrementNonReussi(
            "Veuillez selectionner un commercial"
          );
        } else if (
          $scope.dateSuperioriteDebut($scope.FormAddEditionAssurance.dateFin) >
          $scope.dateSuperioriteFin($rootScope.DATE_JOURNEE_DE_TRAVAIL)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idDateFin").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "La date de fin ne peut pas être plus grande que la date de la journée de travail.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         if($scope.recuperationEtIndex == "AS_BORDEREAUP"){
          $scope.FormAddEditionAssurance.Commercial = ""
          $scope.FormAddEditionAssurance.ZoneCommercial = ""
         }
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $scope.FormAddEditionAssurance.Succursales,
              EN_CODEENTREPOT: $scope.FormAddEditionAssurance.Entrepot,
              CA_CODECONTRAT: "",
              DATEDEBUT: $scope.FormAddEditionAssurance.dateDebut,
              DATEFIN: $scope.FormAddEditionAssurance.dateFin,
              EX_EXERCICE:  $scope.FormAddEditionAssurance.Exercice,
              OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
              RQ_CODERISQUE: $scope.FormAddEditionAssurance.Risque,
              TI_IDTIERS: $scope.FormAddEditionAssurance.CompagnieAssurance,
              TI_IDTIERSCOMMERCIAL: $scope.FormAddEditionAssurance.Commercial,
              PY_CODEPAYS: "",
              VL_CODEVILLE: "",
              CO_CODECOMMUNE: "",
              ZA_CODEZONEAUTO: "",
              NS_CODENATURESINISTRE: "",
              TA_CODETYPEAFFAIRES: $scope.FormAddEditionAssurance.TypeAffaire,
              CT_CODESTAUT: $scope.FormAddEditionAssurance.StatutContrat,
              SL_LIBELLEECRAN: "Saisie de Continent",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              NOMETAT: $scope.recuperationnomfichier,
              ET_TYPEETAT: $scope.recuperationnom,
              ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
              FORMATETAT: formaEtat,
              LG_CODELANGUE: "fr",
              ZN_CODEZONECOMMERCIAL:
                $scope.FormAddEditionAssurance.ZoneCommercial,
              // SL_VALEURRETOURS: $scope.recuperationLibelleEtat,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];

          $http
            .post("/EditionEtatAssurance/Insertedition/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.RetourInsertedition = reponse.data;
              if (
                $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $http
                  .post(
                    "/EditionEtatAssurance/pvgAfficherEtat/",
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
      }else if (
        $scope.recuperationEtIndex == "AS_AFF_NOUV_RENOUV" 
      ) {
        $scope.afficheApercuInserteditionEtatVentilleAffaireNouvelles(formaEtat)
      } else {
        $scope.$emit("UNLOAD");
        $rootScope.MessageDesListes("Veuillez sélectionner un état");
      }
    };
    // fin de l'apercu de l'etat
    /*FIN DEV */
  },
]);
