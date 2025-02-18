MapharApp.controller("EditionComptabiliteController", [
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
    $scope.FormListEditionComptabilite = {
      Zone: "",
      Succursales: "",
      DateDebut: "",
      DateFin: "",
      Exercice: "",
      Periodicite: "",
      Periode: "",
      Entrepot: "",
      Options: "",
      TypeTiers: "",
      TypeArticle: "",
      ModeReglement: "",
      NatureOperation: "",
      Journal: "",
      PL_CODENUMCOMPTE: "",
      NumDebut: "",
      NumFin: "",
    };
    $scope.listeEditionComptabilite = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesOptions = [];
    $scope.listeNumeroDebut1 = [];
    $scope.listeDesSuccursales = [];
    $scope.listeEntrepot = [];
    $scope.listeDesStatuts = [];
    $scope.listeDesExercice = [];
    $scope.listeDesExerciceMemo = [];
    $scope.listeDesPeriodicite = [];
    $scope.listeDesPeriode = [];
    $scope.listeNatureOperation = [];
    $scope.listePays = [];
    $scope.listeJournal = [];
    $scope.listeGroupeTiers = [];
    $scope.listeNatureTiers = [];
    $scope.listeTypeArticle = [];
    $scope.listeTypeBalance = [];
    $scope.listeDesModesReglement = [];
    $scope.RetourInsertedition = [];
    $scope.SL_LIBELLEECRAN = "EDITION COMPTABILITE";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";

    $scope.recuperationnom = "";
    $scope.recuperationnomfichier = "";
    $scope.recuperationLibelleEtat = "";
    $scope.recuperationEtIndex = "";

    $scope.verouDateDebut = false;
    $scope.verouDateFin = false;
    $scope.verouZone = false;
    $scope.verouSuccursales = false;
    $scope.verouEntrepot = false;
    $scope.verouTypeTiers = false;
    $scope.verouNatureTiers = false;
    $scope.verouPays = false;
    $scope.verouGroupeTiers = false;
    $scope.verouModeReglement = false;
    $scope.verouNatureOperation = false;
    $scope.verouJournal = false;
    $scope.verouTypeBalance = false;
    $scope.verouOptions = false;
    $scope.verouNumDebut = false;
    $scope.verouNumFin = false;
    $scope.verougroupeTiers = false;
    $scope.verouTypeArticle = false;
    $scope.verouTypePrestation = false;
    $scope.verouNumCompt = false;
    $scope.verouStatut = false;
    $scope.verouExercice = false;
    $scope.verouPeriodicite = false;
    $scope.verouPeriode = false;
    $scope.statutchoixBalance = false;
    $scope.statutchoixgrdliv = false;
    $scope.statutchoixBalancetierougrdlivtiers = false;
    $scope.statutchoixoption = false;

    $scope.TableTemporaire = [];
    $scope.ObjetTemporaire = {
      leCode: "",
      leLibelle: "",
    };
    $scope.leChargement = true;

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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    $scope.initEditionCompta = function () {
      $scope.afficheListeZoneEditionCombo();
      $scope.FormListEditionComptabilite.Pays = $rootScope.PAYSPARDEFAUT
    };

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV ANICETTE*/

    //debut rafraichir les champs de la fenetre
    $scope.resetFormAddEditCompta = function () {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#FFFFFF");
      });
    };
    //fin rafraichir les champs de la fenetre

    //debut affiche liste edition comptabilite
    $scope.affichelisteEditionComptabilite = function () {
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "COMPTABILITE",
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
          $scope.listeEditionComptabilite = reponse.data;
          console.log($scope.listeEditionComptabilite);
          if (
            $scope.listeEditionComptabilite[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            console.log($scope.listeEditionComptabilite);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEditionComptabilite[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeEditionComptabilite[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

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
          "/EditionComptabilite/ListeZoneEditionCombo/",
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
          ZN_CODEZONE: $scope.FormListEditionComptabilite.Zone,
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
        .post("/EditionComptabilite/ListeSuccursales/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSuccursales = reponse.data;
          if (
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            // $scope.afficheListeEntrepot();
            $scope.FormListEditionComptabilite.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE;
          } else {
            //$scope.$emit("UNLOAD");

            $scope.FormListEditionComptabilite.Succursales = "";
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
        .post("/EditionComptabilite/ListeExercice/", $scope.objet_envoie, {
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
        .post("/EditionComptabilite/ListePeriodicite/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPeriodicite = reponse.data;
          if (
            $scope.listeDesPeriodicite[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeModeReglement();
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

    //debut liste du mode de reglement
    $scope.afficheListeModeReglement = function () {
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
        .post("/ModeReglement/ListeModeReglement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesModesReglement = reponse.data;
          if (
            $scope.listeDesModesReglement[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.afficheListeNatureOperation();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesModesReglement[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesModesReglement[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste du mode de reglement

    //debut liste nature operation
    $scope.afficheListeNatureOperation = function () {
      $scope.objet_envoie = [
        {
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
        .post("/NatureOperation/ListeNatureOperation/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureOperation = reponse.data;
          if (
            $scope.listeNatureOperation[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeTypeTiers();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeNatureOperation[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeNatureOperation);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeNatureOperation[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste nature operation

    //debut liste des types tiers
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
          if (
            $scope.listeDesTypeTiers[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeJournal();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesTypeTiers[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesTypeTiers);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesTypeTiers[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des types tiers

    //debut liste des JOURNAUX
    $scope.afficheListeJournal = function () {
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
        .post("/Journal/ListeJournal/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeJournal = reponse.data;
          if ($scope.listeJournal[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeTypeBalance();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeJournal[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeJournal);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeJournal[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des JOURNAUX

    //debut liste des articles
    $scope.afficheListeTypeBalance = function () {
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
        .post("/TypeBalance/ListeTypeBalance/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeBalance = reponse.data;
          if ($scope.listeTypeBalance[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeTypeBalance[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeBalance);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeBalance[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des articles

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
          if ($scope.listePays[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeGroupeTiers();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listePays[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listePays[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

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
          if ($scope.listeGroupeTiers[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeGrandLivre();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeGroupeTiers[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeGroupeTiers);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeGroupeTiers[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des  groupes tiers

    //debut liste des status
    $scope.afficheListeGrandLivre = function () {
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
        .post("/StatutGrandLivre/ListeStatutGrandLivre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesStatuts = reponse.data;
          if ($scope.listeDesStatuts[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            setTimeout(() => {
              $scope.affichelisteEditionComptabilite();
            }, 10000);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesStatuts[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesStatuts);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesStatuts[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des status

    //debut liste periode
    $scope.afficheListePeriode = function () {
      $scope.objet_envoie = [
        {
          PE_CODEPERIODICITE: $scope.FormListEditionComptabilite.Periodicite,
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
          // $scope.FormListEditionComptabilite.Periode = "";
          $scope.leMois = $rootScope.DATE_JOURNEE_DE_TRAVAIL.substr(3, 2);
          for (var index = 0; index < $scope.listeDesPeriode.length; index++) {
            if ($scope.listeDesPeriode[index].MO_CODEMOIS == $scope.leMois) {
              $scope.FormListEditionComptabilite.Periode =
                $scope.listeDesPeriode[index].MO_CODEMOIS;
              break;
            }
          }
          if ($scope.FormListEditionComptabilite.Periode != "") {
            $("#idPeriode").css("background-color", "#FFFFFF");
          }
          if ($scope.statutchoixBalance != true) {
            $scope.afficheListeDateDebutFin();
          }
        });
    };
    //fin liste periode

    //debut avoir les dates de debut et de fin
    $scope.afficheListeDateDebutFin = function () {
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $scope.FormListEditionComptabilite.Exercice,
          MO_CODEMOIS: $scope.FormListEditionComptabilite.Periode,
          PE_CODEPERIODICITE: $scope.FormListEditionComptabilite.Periodicite,
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
          $scope.FormListEditionComptabilite.DateDebut =
            $scope.listeDateDebutFin[0].MO_DATEDEBUT;
          $scope.FormListEditionComptabilite.DateFin =
            $scope.listeDateDebutFin[0].MO_DATEFIN;
          console.log($scope.listeDateDebutFin);
        });
    };
    //fin avoir les dates de debut et de fin

    //debut liste des articles
    $scope.afficheListeTypeArticle = function () {
      $scope.objet_envoie = [
        {
          NT_CODENATURETYPEARTICLE: "02",
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
        .post("/TypeArticle/ListeTypeArticle/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeArticle = reponse.data;
          console.log($scope.listeTypeArticle);
        });
    };
    //fin liste des articles

    $scope.TYPEOPERATION = "";

    //debut liste option
    $scope.afficheListeOption = function () {
      if ($scope.statutchoixoption == true) {
        $scope.TYPEOPERATION = "03";
      } else {
        $scope.TYPEOPERATION = "02";
      }
      /* for (var j = 0; j < $scope.listeEditionComptabilite.length; j++) {
        if (j == $scope.lIndex) {
          if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCE" ||
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCEAVI" ||
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCEAPI" ||
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCETIERS" ||
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_JOURNAL"
          ) {
            $scope.TYPEOPERATION = "02";
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CPT_SITUATIONVENTE"
          ) {
            $scope.TYPEOPERATION = "03";
            break;
          }
        }
      }*/
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Option/ListeOption/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesOptions = reponse.data;

          $scope.FormListEditionComptabilite.Options =
            $scope.listeDesOptions[0].RS_CODERUBRIQUE;

          console.log($scope.listeDesOptions);
        });
    };
    //fin liste option

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      $scope.FormListEditionComptabilite.NumCompt = collection.PL_NUMCOMPTE;
      $scope.FormListEditionComptabilite.PL_CODENUMCOMPTE =
        collection.PL_CODENUMCOMPTE;
      //$scope.FormListEditionComptabilite.N_CompteCoffre = collection.PL_NUMCOMPTE;
      //$scope.FormListEditionComptabilite.PL_CODENUMCOMPTECOFFREFORT = collection.PL_CODENUMCOMPTECOFFREFORT;
    };
    //Fin choix d'un compte

    //debut liste des comptes generaux
    $scope.afficheListeCompteGeneral = function () {
      $scope.leChargement = true;
      $scope.NC_CODENATURECOMPTE = "";
      switch ($scope.FormListEditionComptabilite.typeDuTiers) {
        case "001":
          $scope.NC_CODENATURECOMPTE = "03";
          break;
        case "002":
          $scope.NC_CODENATURECOMPTE = "04";
          break;
        default:
          $scope.NC_CODENATURECOMPTE = "";
      }
      $scope.objet_envoie = [
        {
          //"PL_NUMCOMPTE": "",
          NC_CODENATURECOMPTE: $scope.NC_CODENATURECOMPTE,
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
        .post("/NumCompteGeneral/ListeNumCompteGeneral/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeCompteGeneral = reponse.data;
          $scope.leChargement = false;
          console.log($scope.listeCompteGeneral);
        });
    };
    //fin liste des numéros généraux

    /*$scope.afficheTiers = false;
    $scope.affichePlanComptable = false;*/
    /*  $scope.TableTemporaire = [];
    $scope.ObjetTemporaire = {
      leCode: "",
      leLibelle: "",
    };*/
    //debut liste natures tiers
    $scope.afficheListeNatureTiers = function () {
      $scope.objet_envoie = [
        {
          TP_CODETYPETIERS: $scope.FormListEditionComptabilite.TypeTiers,
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
          // $scope.FormListEditionComptabilite.NatureTiers =
          console.log($scope.listeNatureTiers);
          $scope.TableTemporaire = [];
          if ($scope.statutchoixBalancetierougrdlivtiers == true) {
            $scope.afficheTiers = true;
            $scope.affichePlanComptable = false;
            console.log($scope.affichePlanComptable);
            console.log($scope.afficheTiers);
            $scope.objet_envoie = [
              {
                NT_CODENATURETYPETIERS:
                  $scope.FormListEditionComptabilite.TypeTiers,
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
                SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: $rootScope.CODE_AGENCE,
                  OE_Y: $rootScope.CODE_OPERATEUR,
                  OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                },
              },
            ];
            $http
              .post("/NumeroDebut/listeNumeroDebut/", $scope.objet_envoie, {
                //headers: $scope.headers
              })
              .then(function (reponse) {
                $scope.listeNumeroDebut1 = reponse.data;

                for (var l = 0; l < $scope.listeNumeroDebut1.length; l++) {
                  $scope.ObjetTemporaire = {
                    leCode: $scope.listeNumeroDebut1[l].TI_DENOMINATION,
                    leLibelle: $scope.listeNumeroDebut1[l].TI_DENOMINATION,
                  };
                  $scope.TableTemporaire.push($scope.ObjetTemporaire);
                  $scope.ObjetTemporaire = {
                    leCode: "",
                    leLibelle: "",
                  };
                }

                $scope.FormListEditionComptabilite.NumDebut =
                  $scope.listeNumeroDebut1[0].TI_DENOMINATION;
                $scope.FormListEditionComptabilite.NumFin =
                  $scope.listeNumeroDebut1[0].TI_DENOMINATION;

                console.log($scope.listeNumeroDebut1);
              });
          }
          if ($scope.statutchoixgrdliv == true) {
            $scope.affichePlanComptable = true;
            console.log($scope.affichePlanComptable);
            $scope.afficheTiers = false;
            console.log($scope.afficheTiers);
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
                },
              },
            ];
            $http
              .post(
                "/NumeroDebutPlanComptable/ListeNumeroDebutPlanComptable/",
                $scope.objet_envoie,
                {
                  //headers: $scope.headers
                }
              )
              .then(function (reponse) {
                $scope.listeNumeroDebut1 = reponse.data;

                //  $scope.TableTemporaire = [];
                for (var z = 0; z < $scope.listeNumeroDebut1.length; z++) {
                  $scope.ObjetTemporaire = {
                    leCode: $scope.listeNumeroDebut1[z].PL_NUMCOMPTE,
                    leLibelle: $scope.listeNumeroDebut1[z].PL_NUMCOMPTE,
                  };
                  $scope.TableTemporaire.push($scope.ObjetTemporaire);
                  $scope.ObjetTemporaire = {
                    leCode: "",
                    leLibelle: "",
                  };
                }

                console.log($scope.listeNumeroDebut1);
              });
          }
        });

      /*for (var j = 0; j < $scope.listeEditionComptabilite.length; j++) {
        if (j == $scope.lIndex) {
          if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCETIERS" ||
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_GDLIVRETIERS"
          ) {
            $scope.afficheTiers = true;
            $scope.affichePlanComptable = false;
            console.log($scope.affichePlanComptable);
            console.log($scope.afficheTiers);
            $scope.objet_envoie = [
              {
                NT_CODENATURETYPETIERS:
                  $scope.FormListEditionComptabilite.TypeTiers,
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
                SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: $rootScope.CODE_AGENCE,
                  OE_Y: $rootScope.CODE_OPERATEUR,
                  OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                },
              },
            ];
            $http
              .post("/NumeroDebut/listeNumeroDebut/", $scope.objet_envoie, {
                //headers: $scope.headers
              })
              .then(function (reponse) {
                $scope.listeNumeroDebut1 = reponse.data;

                $scope.TableTemporaire = [];
                for (var l = 0; l < $scope.listeNumeroDebut1.length; l++) {
                  $scope.ObjetTemporaire = {
                    leCode: $scope.listeNumeroDebut1[l].TI_DENOMINATION,
                    leLibelle: $scope.listeNumeroDebut1[l].TI_DENOMINATION,
                  };
                  $scope.TableTemporaire.push($scope.ObjetTemporaire);
                }

                $scope.FormListEditionComptabilite.NumDebut =
                  $scope.listeNumeroDebut1[0].TI_DENOMINATION;
                $scope.FormListEditionComptabilite.NumFin =
                  $scope.listeNumeroDebut1[0].TI_DENOMINATION;

                console.log($scope.listeNumeroDebut1);
              });
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_GDLIVRE"
          ) {
            $scope.affichePlanComptable = true;
            console.log($scope.affichePlanComptable);
            $scope.afficheTiers = false;
            console.log($scope.afficheTiers);
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
                },
              },
            ];
            $http
              .post(
                "/NumeroDebutPlanComptable/ListeNumeroDebutPlanComptable/",
                $scope.objet_envoie,
                {
                  //headers: $scope.headers
                }
              )
              .then(function (reponse) {
                $scope.listeNumeroDebut1 = reponse.data;

                $scope.TableTemporaire = [];
                for (var z = 0; z < $scope.listeNumeroDebut1.length; z++) {
                  $scope.ObjetTemporaire = {
                    leCode: $scope.listeNumeroDebut1[z].PL_NUMCOMPTE,
                    leLibelle: $scope.listeNumeroDebut1[z].PL_NUMCOMPTE,
                  };
                  $scope.TableTemporaire.push($scope.ObjetTemporaire);
                }

                console.log($scope.listeNumeroDebut1);
              });
            break;
          }
        }
      }*/
    };
    //fin liste  natures tiers
    //fin affiche liste edition comptabilite

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

      $scope.statutchoixBalance = false;
      $scope.statutchoixoption = false;
      $scope.statutchoixBalancetierougrdlivtiers = false;
      $scope.statutchoixgrdliv = false;
      $scope.afficheListeOption();
      $scope.FormListEditionComptabilite.TypeTiers =
        $scope.listeDesTypeTiers[0].TP_CODETYPETIERS;
      $scope.FormListEditionComptabilite.NatureTiers =
        $scope.listeDesTypeTiers[0].TP_CODETYPETIERS;
      $scope.afficheListeNatureTiers();
      $scope.FormListEditionComptabilite.Periodicite =
        $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
      $scope.afficheListePeriode();
      $scope.FormListEditionComptabilite.Zone =
        $scope.listeDesZoneCombo[2].ZN_CODEZONE;
      $scope.afficheListeSuccursales();
      for (var i = 0; i < $scope.listeEditionComptabilite.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEditionComptabilite.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $("#idEtat" + idEtat).css("background-color", "beige");

          if ($scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCE") {
            $scope.verouDateDebut = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouNatureTiers = true;
            $scope.verouPays = true;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = false;
            $scope.verouEntrepot = false;
            $scope.verouTypeTiers = true;
            $scope.verouOptions = false;
            $scope.verouNumDebut = true;
            $scope.verouNumFin = true;
            $scope.verougroupeTiers = true;
            $scope.verouTypeArticle = true;
            $scope.verouTypePrestation = true;
            $scope.verouNumCompt = true;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;

            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListEditionComptabilite.TypeBalance =
              $scope.listeTypeBalance[0].TB_CODETYPEBALANCE;
            $scope.FormListEditionComptabilite.Options =
              $scope.listeDesOptions[0].RS_CODERUBRIQUE;

            /* if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           } */

            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCEAVI" ||
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCEAPI"
          ) {
            $scope.statutchoixBalance = true;
            $scope.verouDateDebut = true;
            $scope.verouDateFin = true;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouTypeTiers = true;
            $scope.verouNatureTiers = true;
            $scope.verouPays = true;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = false;
            $scope.verouOptions = false;
            $scope.verouEntrepot = false;
            $scope.verouNumDebut = true;
            $scope.verouNumFin = true;
            $scope.verougroupeTiers = true;
            $scope.verouTypeArticle = true;
            $scope.verouTypePrestation = true;
            $scope.verouNumCompt = true;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;

            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.lAnnee = $rootScope.DATE_JOURNEE_DE_TRAVAIL.substr(6, 4);
            //$scope.lAnnee = $scope.lAnnee - 1;
            $scope.FormListEditionComptabilite.DateDebut =
              "01/01/" + $scope.lAnnee;
            $scope.FormListEditionComptabilite.DateFin =
              "31/12/" + $scope.lAnnee;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListEditionComptabilite.Options =
              $scope.listeDesOptions[0].RS_CODERUBRIQUE;

            /* if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           } */

            //$scope.afficheListePeriode();

            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_BALANCETIERS"
          ) {
            $scope.verouDateDebut = false;
            $scope.verouNatureTiers = false;
            $scope.verouPays = true;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = false;
            $scope.verouOptions = false;
            $scope.verouNumDebut = false;
            $scope.verouNumFin = false;
            $scope.verougroupeTiers = true;
            $scope.verouTypeArticle = true;
            $scope.verouTypePrestation = true;
            $scope.verouNumCompt = false;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouTypeTiers = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;
            $scope.statutchoixBalancetierougrdlivtiers = true;
            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            /*  $scope.FormListEditionComptabilite.TypeTiers =
              $scope.listeDesTypeTiers[0].TP_CODETYPETIERS;*/

            /* $scope.FormListEditionComptabilite.Options =
           $scope.listeDesOptions[0].RS_CODERUBRIQUE; */

            /* $scope.FormListEditionComptabilite.NumDebut =
           $scope.listeNumeroDebut1[0].TI_NUMTIERS;
         $scope.FormListEditionComptabilite.NumFin =
           $scope.listeNumeroDebut1[0].TI_NUMTIERS; */

            /*  if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           }
         } */
            $scope.afficheListePeriode();
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CPT_BROUILLARD"
          ) {
            $scope.verouDateDebut = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouTypeTiers = true;
            $scope.verouNatureTiers = true;
            $scope.verouPays = true;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = false;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = true;
            $scope.verouOptions = true;
            $scope.verouNumDebut = true;
            $scope.verouNumFin = true;
            $scope.verougroupeTiers = false;
            $scope.verouTypeArticle = false;
            $scope.verouTypePrestation = false;
            $scope.verouNumCompt = true;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;

            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListEditionComptabilite.ModeReglement =
              $scope.listeDesModesReglement[0].MR_CODEMODEREGLEMENT;
            $scope.FormListEditionComptabilite.Options =
              $scope.listeDesOptions[0].RS_CODERUBRIQUE;

            /*  if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           }
         } */
            $scope.afficheListePeriode();
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_RESULTAT" ||
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_RESULTATCHARGE"
          ) {
            $scope.verouDateDebut = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouTypeTiers = true;
            $scope.verouNatureTiers = true;
            $scope.verouPays = true;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = true;
            $scope.verouOptions = true;
            $scope.verouNumDebut = true;
            $scope.verouNumFin = true;
            $scope.verougroupeTiers = false;
            $scope.verouTypeArticle = false;
            $scope.verouTypePrestation = false;
            $scope.verouNumCompt = true;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;

            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;

            /*  if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           }
         } */
            $scope.afficheListePeriode();
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_GDLIVRE"
          ) {
            $scope.verouDateDebut = false;
            $scope.verouTypeTiers = true;
            $scope.verouNatureTiers = true;
            $scope.verouPays = true;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = true;
            $scope.verouOptions = true;
            $scope.verouNumDebut = false;
            $scope.verouNumFin = false;
            $scope.verougroupeTiers = true;
            $scope.verouTypeArticle = true;
            $scope.verouTypePrestation = true;
            $scope.verouNumCompt = true;
            $scope.verouStatut = false;
            $scope.verouExercice = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;
            $scope.statutchoixgrdliv = true;
            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListEditionComptabilite.NumDebut =
              $scope.listeNumeroDebut1[0].PL_CODENUMCOMPTE;
            $scope.FormListEditionComptabilite.NumFin =
              $scope.listeNumeroDebut1[0].PL_CODENUMCOMPTE;

            /* if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           }
         } */
            $scope.afficheListePeriode();
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_GDLIVRETIERS"
          ) {
            $scope.verouDateDebut = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouTypeTiers = false;
            $scope.verouNatureTiers = false;
            $scope.verouPays = false;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = true;
            $scope.verouOptions = true;
            $scope.verouNumDebut = false;
            $scope.verouNumFin = false;
            $scope.verougroupeTiers = false;
            $scope.verouTypeArticle = true;
            $scope.verouTypePrestation = true;
            $scope.verouNumCompt = true;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;
            $scope.statutchoixBalancetierougrdlivtiers = true;
            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.TypeTiers =
              $scope.listeDesTypeTiers[0].TP_CODETYPETIERS;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            $scope.FormListEditionComptabilite.NumDebut =
              $scope.listeNumeroDebut1[0].TI_NUMTIERS;
            $scope.FormListEditionComptabilite.NumFin =
              $scope.listeNumeroDebut1[0].TI_NUMTIERS;

            /*  if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           }
         } */
            $scope.afficheListePeriode();
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CA_JOURNAL"
          ) {
            $scope.verouDateDebut = false;
            $scope.verouTypeTiers = true;
            $scope.verouNatureTiers = false;
            $scope.verouPays = true;
            $scope.verouGroupeTiers = true;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = false;
            $scope.verouJournal = false;
            $scope.verouTypeBalance = true;
            $scope.verouOptions = true;
            $scope.verouNumDebut = true;
            $scope.verouNumFin = true;
            $scope.verougroupeTiers = false;
            $scope.verouTypeArticle = true;
            $scope.verouTypePrestation = true;
            $scope.verouNumCompt = true;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouEntrepot = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;

            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;

            /*  if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           }
         } */
            $scope.afficheListePeriode();
            break;
          } else if (
            $scope.listeEditionComptabilite[j].ET_INDEX == "CPT_SITUATIONVENTE"
          ) {
            $scope.verouDateDebut = false;
            $scope.verouDateFin = false;
            $scope.verouZone = false;
            $scope.verouSuccursales = false;
            $scope.verouNatureTiers = false;
            $scope.verouPays = false;
            $scope.verouGroupeTiers = false;
            $scope.verouModeReglement = true;
            $scope.verouNatureOperation = true;
            $scope.verouJournal = true;
            $scope.verouTypeBalance = true;
            $scope.verouOptions = false;
            $scope.verouNumDebut = true;
            $scope.verouNumFin = true;
            $scope.verougroupeTiers = false;
            $scope.verouTypeArticle = true;
            $scope.verouTypePrestation = true;
            $scope.verouNumCompt = true;
            $scope.verouStatut = true;
            $scope.verouExercice = false;
            $scope.verouEntrepot = false;
            $scope.verouTypeTiers = false;
            $scope.verouPeriodicite = false;
            $scope.verouPeriode = false;
            $scope.statutchoixoption = true;
            $scope.listeDesOptions = [];
            $scope.afficheListeOption();
            $scope.FormListEditionComptabilite.Exercice =
               $rootScope.DATE_EXERCICE;
            $scope.FormListEditionComptabilite.Periodicite =
              $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;
            $scope.FormListEditionComptabilite.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.FormListEditionComptabilite.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;

            $scope.FormListEditionComptabilite.Entrepot =
              $scope.listeEntrepot[0].EN_CODEENTREPOT;
            /* $scope.FormListEditionComptabilite.TypeTiers =
              $scope.listeEntrepot[0].TP_CODETYPETIERS;*/

            /* if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE != undefined) {
           console.log($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE);
           $scope.FormListEditionComptabilite.Periode =
             $scope.listeDesPeriodicite[0].PE_CODEPERIODICITE;

           if ($scope.listeDesPeriodicite[0].PE_CODEPERIODICITE == 03) {
             $scope.FormListEditionComptabilite.StatutPERIODE = "01";
             console.log($scope.FormListEditionComptabilite.StatutPERIODE);
           }
         } */
            $scope.afficheListePeriode();
            break;
          }
        }
      }
    };
    //fin choix de l'etat

    //debut focus sur le champ
    $scope.apercuEtat = function (formaEtat) {
      $("#modal_TypeFichierGlobale").modal('hide');
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typemontant = /^[0-9]{1,15}$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      if (
        $scope.recuperationEtIndex == "CA_BALANCE" ||
        $scope.recuperationEtIndex == "CA_BALANCEAVI" ||
        $scope.recuperationEtIndex == "CA_BALANCEAPI" ||
        $scope.recuperationEtIndex == "CA_BALANCETIERS" ||
        $scope.recuperationEtIndex == "CPT_BROUILLARD" ||
        $scope.recuperationEtIndex == "CA_RESULTAT" ||
        $scope.recuperationEtIndex == "CA_GDLIVRE" ||
        $scope.recuperationEtIndex == "CA_RESULTATCHARGE" ||
        $scope.recuperationEtIndex == "CA_GDLIVRETIERS" ||
        // $scope.recuperationEtIndex == "ZEDC" ||
        $scope.recuperationEtIndex == "CA_JOURNAL" ||
        $scope.recuperationEtIndex == "CPT_SITUATIONVENTE"
      ) {
        if (
          $scope.recuperationEtIndex == "CA_BALANCE" ||
          $scope.recuperationEtIndex == "CA_RESULTAT" ||
          $scope.recuperationEtIndex == "CA_RESULTATCHARGE" ||
          $scope.recuperationEtIndex == "CA_GDLIVRE" ||
          $scope.recuperationEtIndex == "CA_JOURNAL"
        ) {
          if (
            $scope.FormListEditionComptabilite.DateDebut === "" ||
            $scope.FormListEditionComptabilite.DateDebut === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateDebut").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de debut";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.DateFin === "" ||
            $scope.FormListEditionComptabilite.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de fin";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Entrepot === "" ||
            $scope.FormListEditionComptabilite.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ Entrepot";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Succursales === "" ||
            $scope.FormListEditionComptabilite.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ succursale";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Exercice === "" ||
            $scope.FormListEditionComptabilite.Exercice === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idExercice").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ exercice";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Periodicite === "" ||
            $scope.FormListEditionComptabilite.Periodicite === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriodicite").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ periodicite";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Periode === "" ||
            $scope.FormListEditionComptabilite.Periode === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriode").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ Periode";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else {
            if (
              $scope.recuperationEtIndex == "CA_BALANCE" ||
              $scope.recuperationEtIndex == "CA_RESULTAT" ||
              $scope.recuperationEtIndex == "CA_RESULTATCHARGE"
            ) {
              if (
                $scope.FormListEditionComptabilite.TypeBalance == "02" &&
                $scope.recuperationEtIndex == "CA_BALANCE"
              ) {
                $scope.recuperationnomfichier = "BalanceQuatreColonnes.rpt";
              } else {
                $scope.recuperationnomfichier = "Balance.rpt";
              }
              // mr diarrasouba doit fournir la variable permettant de faire le choix du mode portrait quand le type balance = 01
              $scope.objet_envoie = [
                {
                  AG_CODEAGENCE: $scope.FormListEditionComptabilite.Succursales,
                  EN_CODEENTREPOT: $scope.FormListEditionComptabilite.Entrepot,
                  TP_CODETYPETIERS: "",
                  TB_CODETYPEBALANCE:
                    $scope.FormListEditionComptabilite.TypeBalance,
                  OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                  DATEDEBUT: $scope.FormListEditionComptabilite.DateDebut,
                  DATEFIN: $scope.FormListEditionComptabilite.DateFin,
                  MR_CODEMODEREGLEMENT:
                    $scope.FormListEditionComptabilite.ModeReglement,
                  NO_CODENATUREOPERATION:
                    $scope.FormListEditionComptabilite.NatureOperation,
                  OP_CODEOPERATEUR: "",// $rootScope.CODE_OPERATEUR,
                  TI_IDTIERSMEDECIN: formaEtat,
                  MV_STATUTGLVRE: $scope.FormListEditionComptabilite.Statut,
                  GP_CODEGROUPE: $scope.FormListEditionComptabilite.groupeTiers,
                  PY_CODEPAYS: $scope.FormListEditionComptabilite.Pays,
                  NT_CODENATURETIERS:
                    $scope.FormListEditionComptabilite.NatureTiers,
                  PL_NUMCOMPTE1: $scope.FormListEditionComptabilite.NumDebut,
                  PL_NUMCOMPTE2: $scope.FormListEditionComptabilite.NumFin,
                  PL_NUMCOMPTETIERS:
                    $scope.FormListEditionComptabilite.NumCompt,
                  PL_OPTION: $scope.FormListEditionComptabilite.Options,
                  NOMETAT: $scope.recuperationnomfichier,
                  ET_INDEX: $scope.recuperationEtIndex,
                  ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                  JO_CODEJOURNAL: $scope.FormListEditionComptabilite.Journal,
                  ET_TYPEETAT: $scope.recuperationnom,
                  //FORMATETAT: formaEtat,
                  SL_LIBELLEECRAN: "Saisie de Continent",
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
                  "/EditionComptabilite/Inserteditioncomptabilite1/",
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
                        "/EditionComptabilite/pvgAfficherEtat1/",
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
            } else {
              $scope.objet_envoie = [
                {
                  AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                  EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                  TP_CODETYPETIERS:
                    $scope.FormListEditionComptabilite.TypeTiers,
                  TB_CODETYPEBALANCE:
                    $scope.FormListEditionComptabilite.TypeBalance,
                  OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                  DATEDEBUT: $scope.FormListEditionComptabilite.DateDebut,
                  DATEFIN: $scope.FormListEditionComptabilite.DateFin,
                  MR_CODEMODEREGLEMENT:
                    $scope.FormListEditionComptabilite.ModeReglement,
                  NO_CODENATUREOPERATION:
                    $scope.FormListEditionComptabilite.NatureOperation,
                  OP_CODEOPERATEUR: "",// $rootScope.CODE_OPERATEUR,
                  TI_IDTIERSMEDECIN: formaEtat,
                  MV_STATUTGLVRE: $scope.FormListEditionComptabilite.Statut,
                  GP_CODEGROUPE: $scope.FormListEditionComptabilite.groupeTiers,
                  PY_CODEPAYS: $scope.FormListEditionComptabilite.Pays,
                  NT_CODENATURETIERS:
                    $scope.FormListEditionComptabilite.NatureTiers,
                  PL_NUMCOMPTE1: $scope.FormListEditionComptabilite.NumDebut,
                  PL_NUMCOMPTE2: $scope.FormListEditionComptabilite.NumFin,
                  PL_NUMCOMPTETIERS:
                    $scope.FormListEditionComptabilite.NumCompt,
                  PL_OPTION: $scope.FormListEditionComptabilite.Options,
                  NOMETAT: $scope.recuperationnomfichier,
                  JO_CODEJOURNAL: $scope.FormListEditionComptabilite.Journal,
                  ET_TYPEETAT: $scope.recuperationnom,
                  ET_INDEX: $scope.recuperationEtIndex,
                  ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                  SL_LIBELLEECRAN: "Saisie de Continent",
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
                  "/EditionComptabilite/Inserteditioncomptabilite1_3/",
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
                        "/EditionComptabilite/pvgAfficherEtat1_3/",
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
        } else if (
          $scope.recuperationEtIndex == "CA_BALANCEAVI" ||
          $scope.recuperationEtIndex == "CA_BALANCEAPI"
        ) {
          if (
            $scope.FormListEditionComptabilite.Entrepot === "" ||
            $scope.FormListEditionComptabilite.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ entrepot";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Succursales === "" ||
            $scope.FormListEditionComptabilite.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ succursales";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Options === "" ||
            $scope.FormListEditionComptabilite.Options === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idOption").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ option";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else {
            if (
              $scope.FormListEditionComptabilite.TypeBalance == "02" &&
              ($scope.recuperationEtIndex == "CA_BALANCEAVI" ||
                $scope.recuperationEtIndex == "CA_BALANCEAPI")
            ) {
              $scope.recuperationnomfichier = "BalanceQuatreColonnes.rpt";
            } else {
              $scope.recuperationnomfichier = "Balance.rpt";
            }
            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: $scope.FormListEditionComptabilite.Succursales,
                EN_CODEENTREPOT: $scope.FormListEditionComptabilite.Entrepot,
                TP_CODETYPETIERS: $scope.FormListEditionComptabilite.TypeTiers,
                TB_CODETYPEBALANCE: "",
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                DATEDEBUT: $scope.FormListEditionComptabilite.DateDebut,
                DATEFIN: $scope.FormListEditionComptabilite.DateFin,
                MR_CODEMODEREGLEMENT:
                  $scope.FormListEditionComptabilite.ModeReglement,
                NO_CODENATUREOPERATION:
                  $scope.FormListEditionComptabilite.NatureOperation,
                OP_CODEOPERATEUR: "",// $rootScope.CODE_OPERATEUR,
                TI_IDTIERSMEDECIN: formaEtat,
                MV_STATUTGLVRE: $scope.FormListEditionComptabilite.Statut,
                GP_CODEGROUPE: $scope.FormListEditionComptabilite.groupeTiers,
                PY_CODEPAYS: $scope.FormListEditionComptabilite.Pays,
                NT_CODENATURETIERS:
                  $scope.FormListEditionComptabilite.NatureTiers,
                PL_NUMCOMPTE1: $scope.FormListEditionComptabilite.NumDebut,
                PL_NUMCOMPTE2: $scope.FormListEditionComptabilite.NumFin,
                PL_NUMCOMPTETIERS: $scope.FormListEditionComptabilite.NumCompt,
                PL_OPTION: $scope.FormListEditionComptabilite.Options,
                NOMETAT: $scope.recuperationnomfichier,
                JO_CODEJOURNAL: $scope.FormListEditionComptabilite.Journal,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                SL_LIBELLEECRAN: "Saisie de Continent",
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
                "/EditionComptabilite/Inserteditioncomptabilite1/",
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
                      "/EditionComptabilite/pvgAfficherEtat1/",
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
        } else if ($scope.recuperationEtIndex == "CA_BALANCETIERS") {
          if (
            $scope.FormListEditionComptabilite.DateDebut === "" ||
            $scope.FormListEditionComptabilite.DateDebut === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateDebut").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de debut";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.DateFin === "" ||
            $scope.FormListEditionComptabilite.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de fin";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.Entrepot === "" ||
            $scope.FormListEditionComptabilite.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ entrepot";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.Succursales === "" ||
            $scope.FormListEditionComptabilite.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ succursales";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.Exercice === "" ||
            $scope.FormListEditionComptabilite.Exercice === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idExercice").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ exercice";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.Periodicite === "" ||
            $scope.FormListEditionComptabilite.Periodicite === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriodicite").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ Periodicite";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.Periode === "" ||
            $scope.FormListEditionComptabilite.Periode === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriode").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ Periode";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.Options === "" ||
            $scope.FormListEditionComptabilite.Options === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idOption").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ Options";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          if (
            $scope.FormListEditionComptabilite.TypeTiers === "" ||
            $scope.FormListEditionComptabilite.TypeTiers === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idTypeTiers").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ typetiers";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else {
            if (
              $scope.FormListEditionComptabilite.TypeBalance == "02" &&
              $scope.recuperationEtIndex == "CA_BALANCETIERS"
            ) {
              $scope.recuperationnomfichier = "BalanceQuatreColonnes.rpt";
            } else {
              $scope.recuperationnomfichier = "BalanceTiers.rpt";
            }

            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                TP_CODETYPETIERS: $scope.FormListEditionComptabilite.TypeTiers,
                TB_CODETYPEBALANCE:
                  $scope.FormListEditionComptabilite.TypeBalance,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                DATEDEBUT: $scope.FormListEditionComptabilite.DateDebut,
                DATEFIN: $scope.FormListEditionComptabilite.DateFin,
                MR_CODEMODEREGLEMENT:
                  $scope.FormListEditionComptabilite.ModeReglement,
                NO_CODENATUREOPERATION:
                  $scope.FormListEditionComptabilite.NatureOperation,
                OP_CODEOPERATEUR: "",// $rootScope.CODE_OPERATEUR,
                TI_IDTIERSMEDECIN: formaEtat,
                MV_STATUTGLVRE: $scope.FormListEditionComptabilite.Statut,
                GP_CODEGROUPE: $scope.FormListEditionComptabilite.groupeTiers,
                PY_CODEPAYS: $scope.FormListEditionComptabilite.Pays,
                NT_CODENATURETIERS:
                  $scope.FormListEditionComptabilite.NatureTiers,
                PL_NUMCOMPTE1: $scope.FormListEditionComptabilite.NumDebut,
                PL_NUMCOMPTE2: $scope.FormListEditionComptabilite.NumFin,
                PL_NUMCOMPTETIERS: $scope.FormListEditionComptabilite.NumCompt,
                PL_OPTION: $scope.FormListEditionComptabilite.Options,
                NOMETAT: $scope.recuperationnomfichier,
                JO_CODEJOURNAL: $scope.FormListEditionComptabilite.Journal,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
                ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                SL_LIBELLEECRAN: "Saisie de Continent",
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
                "/EditionComptabilite/Inserteditioncomptabilite1/",
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
                      "/EditionComptabilite/pvgAfficherEtat1/",
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
        } else if ($scope.recuperationEtIndex == "CPT_BROUILLARD") {
          if (
            $scope.FormListEditionComptabilite.DateDebut === "" ||
            $scope.FormListEditionComptabilite.DateDebut === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateDebut").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de debut";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.DateFin === "" ||
            $scope.FormListEditionComptabilite.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de fin";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Entrepot === "" ||
            $scope.FormListEditionComptabilite.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ entrepot";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Succursales === "" ||
            $scope.FormListEditionComptabilite.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ succursales";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Exercice === "" ||
            $scope.FormListEditionComptabilite.Exercice === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idExercice").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ Exercice";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Periodicite === "" ||
            $scope.FormListEditionComptabilite.Periodicite === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriodicite").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ periodicie";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Periode === "" ||
            $scope.FormListEditionComptabilite.Periode === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriode").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ Periode";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.ModeReglement === "" ||
            $scope.FormListEditionComptabilite.ModeReglement === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idModeReglement").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ mode de reglement";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Options === "" ||
            $scope.FormListEditionComptabilite.Options === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idOption").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ option";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else {
            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                CA_CODECONTRAT: "",
                TI_IDTIERSMEDECIN: formaEtat,
                TB_CODETYPEBALANCE:
                  $scope.FormListEditionComptabilite.TypeBalance,
                DATEDEBUT: $scope.FormListEditionComptabilite.DateDebut,
                DATEFIN: $scope.FormListEditionComptabilite.DateFin,
                OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                NOMETAT: $scope.recuperationnomfichier,
                MR_CODEMODEREGLEMENT:
                  $scope.FormListEditionComptabilite.ModeReglement,
                ET_TYPEETAT: $scope.recuperationnom,
                ET_INDEX: $scope.recuperationEtIndex,
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
                "/EditionComptabilite/Inserteditioncomptabilite1_2/",
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
                      "/EditionComptabilite/pvgAfficherEtat1_2/",
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
          $scope.recuperationEtIndex == "CPT_SITUATIONVENTE" ||
          $scope.recuperationEtIndex == "CA_GDLIVRETIERS"
        ) {
          if (
            $scope.FormListEditionComptabilite.DateDebut === "" ||
            $scope.FormListEditionComptabilite.DateDebut === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateDebut").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de debut";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.DateFin === "" ||
            $scope.FormListEditionComptabilite.DateFin === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idDateFin").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ date de fin";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Entrepot === "" ||
            $scope.FormListEditionComptabilite.Entrepot === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idEntrepot").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ entrepot";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Succursales === "" ||
            $scope.FormListEditionComptabilite.Succursales === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idSuccursales").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ succursale";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Exercice === "" ||
            $scope.FormListEditionComptabilite.Exercice === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idExercice").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ exercice";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Periodicite === "" ||
            $scope.FormListEditionComptabilite.Periodicite === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriodicite").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ periodicite";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.Periode === "" ||
            $scope.FormListEditionComptabilite.Periode === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idPeriode").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ periode";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.FormListEditionComptabilite.TypeTiers === "" ||
            $scope.FormListEditionComptabilite.TypeTiers === undefined
          ) {
            $scope.$emit("UNLOAD");
            $("#idTypeTiers").css("background-color", "#FFE9E0");
            $scope.$emit("UNLOAD");
            $scope.messageErreur =
              "Veuillez renseigner correctement le champ type tiers";
            $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else {
            if ($scope.recuperationEtIndex == "CPT_SITUATIONVENTE") {
              $scope.objet_envoie = [
                {
                  AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                  EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                  TB_CODETYPEBALANCE:
                    $scope.FormListEditionComptabilite.TypeBalance,
                  DATEDEBUT: $scope.FormListEditionComptabilite.DateDebut,
                  DATEFIN: $scope.FormListEditionComptabilite.DateFin,
                  TP_CODETYPETIERS:
                    $scope.FormListEditionComptabilite.TypeTiers,
                  ET_TYPEETAT: $scope.recuperationnom,
                  ET_INDEX: $scope.recuperationEtIndex,
                  ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                  ET_TYPELISTE: $scope.FormListEditionComptabilite.Options,
                  OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                  NOMETAT: $scope.recuperationnomfichier,
                  GP_CODEGROUPE: $scope.FormListEditionComptabilite.groupeTiers,
                  PY_CODEPAYS: $scope.FormListEditionComptabilite.Pays,
                  NT_CODENATURETIERS:
                    $scope.FormListEditionComptabilite.NatureTiers,
                 
                  SL_LIBELLEECRAN: "Saisie de Continent",
                  SL_LIBELLEMOUCHARD: "INSERTIONS",
                  TYPEOPERATION: formaEtat,
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
                  "/EditionComptabilite/Inserteditioncomptabilite2/",
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
                        "/EditionComptabilite/pvgAfficherEtat2/",
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
            } else {
              $scope.objet_envoie = [
                {
                  AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                  EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                  TP_CODETYPETIERS:
                    $scope.FormListEditionComptabilite.TypeTiers,
                  OP_CODEOPERATEUREDITION: $rootScope.CODE_OPERATEUR,
                  DATEDEBUT: $scope.FormListEditionComptabilite.DateDebut,
                  DATEFIN: $scope.FormListEditionComptabilite.DateFin,
                  MR_CODEMODEREGLEMENT:
                    $scope.FormListEditionComptabilite.ModeReglement,
                  NO_CODENATUREOPERATION:
                    $scope.FormListEditionComptabilite.NatureOperation,
                  OP_CODEOPERATEUR:"",// $rootScope.CODE_OPERATEUR,
                  TI_IDTIERSMEDECIN: formaEtat,
                  TB_CODETYPEBALANCE:
                    $scope.FormListEditionComptabilite.TypeBalance,
                  MV_STATUTGLVRE: $scope.FormListEditionComptabilite.Statut,
                  GP_CODEGROUPE: $scope.FormListEditionComptabilite.groupeTiers,
                  PY_CODEPAYS: $scope.FormListEditionComptabilite.Pays,
                  NT_CODENATURETIERS:
                    $scope.FormListEditionComptabilite.NatureTiers,
                  PL_NUMCOMPTE1: $scope.FormListEditionComptabilite.NumDebut,
                  PL_NUMCOMPTE2: $scope.FormListEditionComptabilite.NumFin,
                  PL_NUMCOMPTETIERS:
                    $scope.FormListEditionComptabilite.NumCompt,
                  PL_OPTION: $scope.FormListEditionComptabilite.Options,
                  NOMETAT: $scope.recuperationnomfichier,
                  JO_CODEJOURNAL: $scope.FormListEditionComptabilite.Journal,
                  ET_TYPEETAT: $scope.recuperationnom,
                  ET_INDEX: $scope.recuperationEtIndex,
                  ET_LIBELLEETAT: $scope.recuperationLibelleEtat,
                  SL_LIBELLEECRAN: "Saisie de Continent",
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
                  "/EditionComptabilite/Inserteditioncomptabilite1_3/",
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
                        "/EditionComptabilite/pvgAfficherEtat1_3/",
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
      } else {
        $scope.$emit("UNLOAD");
        $rootScope.MessageDesListes("Veuillez sélectionner un état");
      }
    };

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
        $("#idOption").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idModeReglement").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ
    /*FIN DEV ANICETTE*/
  },
]);
