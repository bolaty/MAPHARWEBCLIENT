MapharApp.controller("EditionStockController", [
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
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.DATE_PREMIER_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
    $rootScope.DATE_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    console.log($rootScope.infoDeLoperateur);
    console.log($rootScope.CODE_AGENCE);
    console.log($rootScope.DATE_EXERCICE);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormListEditionStock = {
      ZoneOuCoordination: "",
      Succursales: "",
      Entrepots: "",
      Exercice: "",
      Periodicite: "",
      Periode: "",
      DateDebut: "",
      Datefin: "",
      TypeArticle: "",
      Article: "",
      Statut: "",
      TypeEtat: "",
      TypeListe: "",
      TypeClient: "",
      NumLot: "",
      DateExpiration: "",
      StatutPERIODE: "",
    };
    $scope.objet_envoie = [];
    $scope.listeEditionStock = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesSuccursales = [];
    $scope.listeEntrepots = [];
    $scope.listeExercice = [];
    $scope.listePeriodicite = [];
    $scope.listeTypeArticle = [];
    $scope.listeArticle = [];
    $scope.listeStatut = [];
    $scope.listeTypeEtat = [];
    $scope.listeTypeListe = [];
    $scope.listeTypeClient = [];
    $scope.listeNumLot = [];
    $scope.listeDateExpiration = [];
    $scope.testEnregistrement = [];
    $scope.recuperer = [];
    $scope.recupererInfo = [];
    $scope.listeDesExerciceMemo = [];
    $scope.GriseZoneOuCoordination = false;
    $scope.GriseSuccursales = false;
    $scope.GriseEntrepots = false;
    $scope.GriseExercice = false;
    $scope.GrisePeriodicite = false;
    $scope.GrisePeriode = false;
    $scope.GriseDateDebut = false;
    $scope.GriseDatefin = false;
    $scope.GriseTypeArticle = false;
    $scope.GriseArticle = false;
    $scope.GriseStatut = false;
    $scope.GriseTypeEtat = false;
    $scope.GriseTypeListe = false;
    $scope.GriseTypeClient = false;
    $scope.GriseNumLot = false;
    $scope.GriseDateExpiration = false;
    /*DEBUT ZONE DE DECLARATION*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut initialisation FormListEditionStock
    $scope.initFormListEditionStock = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeEditionStock();
      $scope.afficheListeZoneOuCoordination();
      $scope.afficheListeSuccursales();
      $scope.afficheListeEntrepots();
      $scope.afficheListeExercice();
      $scope.afficheListePeriodicite();
      $scope.afficheListeTypeArticle();
      //$scope.afficheListeArticle();
      $scope.afficheListeStatut();
      $scope.afficheListeTypeEtat();
      $scope.afficheListeTypeListe();
      $scope.afficheListeTypeClient();
      $scope.afficheListeNumLot();
      $scope.afficheListeDateExpiration();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation FormListEditionStock

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

    //debut affiche liste contrat
    $scope.afficheListeEditionStock = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "STOCK",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          ET_AFFICHER: "O",
          OD_APERCU: "O",
          SL_LIBELLEECRAN: "EDITION",
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
        .post("/EditionListe/ListeEdition/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEditionStock = reponse.data.reverse();
          console.log($scope.listeEditionStock);
          if (
            $scope.listeEditionStock[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEditionStock[0].clsObjetRetour.SL_MESSAGE
            );
          }
          $scope.$emit("UNLOAD");
        });
    };
    //fin affiche liste contrat

    //debut liste des ZONE
    $scope.afficheListeZoneOuCoordination = function () {
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
        .post("/ZoneEditionCombo/ListeZoneEditionCombo/", $scope.objet_envoie, {
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
          EX_EXERCICE: $rootScope.DATE_EXERCICE,
          SO_CODESOCIETE: "0001",
          ZN_CODEZONE: "",
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
        .post("/ZoneEditionCombo/ListeSuccursales/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSuccursales = reponse.data;
          console.log($scope.listeDesSuccursales);
        });
    };
    //fin liste des Succursales

    //debut liste des Entrepots
    $scope.afficheListeEntrepots = function () {
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
        .post("/Entrepot/ListeEntrepot/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEntrepots = reponse.data;
          console.log($scope.listeEntrepots);
        });
    };
    //fin liste des Entrepots

    //debut liste des Exercice
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
        .post("/ZoneEditionCombo/ListeExercice/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeExercice = reponse.data;
          $scope.listeDesExerciceMemo = []
          for (var index = 0; index < $scope.listeExercice.length; index++) {
            if (parseInt($scope.listeExercice[index].EX_EXERCICE)  <= parseInt($rootScope.DATE_EXERCICE) ) {
              $scope.listeDesExerciceMemo.push($scope.listeExercice[index])
            }
          }
          $scope.listeExercice = $scope.listeDesExerciceMemo;
        });
    };
    //fin liste des Exercice

    //debut liste des Periodicite
    $scope.afficheListePeriodicite = function () {
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
        .post("/ZoneEditionCombo/ListePeriodicite/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listePeriodicite = reponse.data;
          console.log($scope.listePeriodicite);
        });
    };
    //fin liste des Periodicite

    //debut liste Periode
    $scope.afficheListePeriode = function () {
      $scope.objet_envoie = [
        {
          PE_CODEPERIODICITE: $scope.FormListEditionStock.Periodicite,
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
        .post("/ZoneEditionCombo/ListePeriode/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listePeriode = reponse.data;
          console.log($scope.listePeriode);
        });
    };
    //fin liste Periode

    //debut liste des statuts
    $scope.afficheListeStatut = function () {
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
        .post("/StatutSocio/ListeStatutSocio/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeStatut = reponse.data;
          console.log($scope.listeStatut);
        });
    };
    //fin liste des statuts

    //debut ListeTypeClient
    $scope.afficheListeTypeClient = function () {
      $scope.objet_envoie = [
        {
          TP_CODETYPETIERS: "001",
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
        .post("/TypeClient/ListeTypeDuClient/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeClient = reponse.data;
          console.log($scope.listeTypeClient);
        });
    };
    //fin ListeTypeClient

    //debut liste TypeArticle
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
        .post("/TypeArticle/ListeTypeArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeArticle = reponse.data;
          console.log($scope.listeTypeArticle);
        });
    };
    //fin liste TypeArticle

    //debut liste TypeArticle
    $scope.afficheListeArticle = function () {
      $scope.objet_envoie = [
        {
          TA_CODETYPEARTICLE: $scope.FormListEditionStock.TypeArticle,
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
        .post("/Article/ListeArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeArticle = reponse.data;
          console.log($scope.listeArticle);
        });
    };
    //fin liste TypeArticle

    //debut liste TypeEtat
    $scope.afficheListeTypeEtat = function () {
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
        .post("/TypeEtat/ListeTypeEtat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeEtat = reponse.data;
          console.log($scope.listeTypeEtat);
        });
    };
    //fin liste TypeEtat

    //debut liste TypeListe
    $scope.afficheListeTypeListe = function () {
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
        .post("/TypeListe/ListeTypeListe/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeListe = reponse.data;
          console.log($scope.listeTypeListe);
        });
    };
    //fin liste TypeListe

    //debut liste NumLot
    $scope.afficheListeNumLot = function () {
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
        .post("/NumLot/ListeNumLot/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNumLot = reponse.data;
          console.log($scope.listeNumLot);
        });
    };
    //fin liste NumLot

    //debut liste DateExpiration
    $scope.afficheListeDateExpiration = function () {
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
        .post("/DateExpiration/ListeDateExpiration/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDateExpiration = reponse.data;
          console.log($scope.listeDateExpiration);
        });
    };
    //fin liste DateExpiration

    //debut choix de l'etat
    $scope.lIndex = "";
    $scope.choixEtat = function (idEtat, nometat) {
      for (var i = 0; i < $scope.listeEditionStock.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEditionStock.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $scope.indexnometat = nometat;
          $("#idEtat" + idEtat).css("background-color", "beige");
          if (
            $scope.listeEditionStock[j].ET_INDEX == "ST_APPROVISIONNEMENT" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_TRANSFERT" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_INVENTAIRE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionStock.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            ($scope.FormListEditionStock.Entrepots =
              $scope.listeEntrepots[0].EN_CODEENTREPOT),
              ($scope.GriseExercice = false);
            ($scope.FormListEditionStock.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionStock.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            if ($scope.listePeriodicite[0].PE_CODEPERIODICITE != undefined) {
              console.log($scope.listePeriodicite[0].PE_CODEPERIODICITE);
              $scope.FormListEditionStock.Periode =
                $scope.listePeriodicite[0].PE_CODEPERIODICITE;

              if ($scope.listePeriodicite[0].PE_CODEPERIODICITE == 03) {
                $scope.FormListEditionStock.StatutPERIODE = "01";
                console.log($scope.FormListEditionStock.StatutPERIODE);
              }

              $scope.afficheListePeriode();
            }

            $scope.GriseDateDebut = false;
            ($scope.FormListEditionStock.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseDatefin = false);
            ($scope.FormListEditionStock.Datefin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeArticle = true);
            $scope.GriseArticle = true;
            $scope.GriseStatut = true;
            $scope.GriseTypeEtat = true;
            $scope.GriseTypeListe = true;
            $scope.GriseTypeClient = true;
            $scope.GriseNumLot = true;
            $scope.GriseDateExpiration = true;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKDEATAILLEE" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKRESUMEE" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKRESUMEARS" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKDEATAILLEARS"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionStock.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            ($scope.FormListEditionStock.Entrepots =
              $scope.listeEntrepots[0].EN_CODEENTREPOT),
              ($scope.GriseExercice = false);
            ($scope.FormListEditionStock.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionStock.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionStock.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseDateDebut = true;
            $scope.GriseDatefin = false;
            ($scope.FormListEditionStock.Datefin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeArticle = false);
            $scope.GriseArticle = true;
            $scope.GriseStatut = true;
            $scope.GriseTypeEtat = true;
            $scope.GriseTypeListe = false;
            $scope.GriseTypeClient = true;
            $scope.GriseNumLot = false;
            $scope.GriseDateExpiration = false;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_LISTEPERIODIQUEDETAILLE" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_LISTEPERIODIQUERESUME" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_MVTSOCK"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionStock.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            ($scope.FormListEditionStock.Entrepots =
              $scope.listeEntrepots[0].EN_CODEENTREPOT),
              ($scope.GriseExercice = false);
            ($scope.FormListEditionStock.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionStock.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionStock.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseDateDebut = false;
            ($scope.FormListEditionStock.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseDatefin = false);
            ($scope.FormListEditionStock.Datefin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeArticle = false);
            $scope.GriseArticle = true;
            $scope.GriseStatut = true;
            $scope.GriseTypeEtat = true;
            $scope.GriseTypeListe = true;
            $scope.GriseTypeClient = true;
            $scope.GriseNumLot = true;
            $scope.GriseDateExpiration = true;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX == "ST_PRODUITPERIME" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_PRODUITENVOIXPEREMPTIONHV" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_PRODUITENVOIXPEREMPTION"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionStock.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            ($scope.FormListEditionStock.Entrepots =
              $scope.listeEntrepots[0].EN_CODEENTREPOT),
              ($scope.GriseExercice = false);
            ($scope.FormListEditionStock.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionStock.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionStock.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseDateDebut = true;
            $scope.GriseDatefin = false;
            ($scope.FormListEditionStock.Datefin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeArticle = false);
            $scope.GriseArticle = false;
            $scope.GriseStatut = true;
            $scope.GriseTypeEtat = true;
            $scope.GriseTypeListe = true;
            $scope.GriseTypeClient = true;
            $scope.GriseNumLot = true;
            $scope.GriseDateExpiration = true;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONARTICLEPERIME" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_SITUATIONARTICLE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionStock.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            ($scope.FormListEditionStock.Entrepots =
              $scope.listeEntrepots[0].EN_CODEENTREPOT),
              ($scope.GriseExercice = false);
            ($scope.FormListEditionStock.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionStock.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionStock.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseDateDebut = false;
            ($scope.FormListEditionStock.DateDebut =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseDatefin = false);
            ($scope.FormListEditionStock.Datefin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeArticle = false);
            $scope.GriseArticle = false;
            $scope.GriseStatut = true;
            $scope.GriseTypeEtat = true;
            $scope.GriseTypeListe = true;
            $scope.GriseTypeClient = true;
            $scope.GriseNumLot = true;
            $scope.GriseDateExpiration = true;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX == "ST_EVALUATIONSTOCK"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionStock.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            ($scope.FormListEditionStock.Entrepots =
              $scope.listeEntrepots[0].EN_CODEENTREPOT),
              ($scope.GriseExercice = false);
            ($scope.FormListEditionStock.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionStock.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionStock.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseDateDebut = true;
            $scope.GriseDatefin = false;
            ($scope.FormListEditionStock.Datefin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeArticle = false);
            $scope.GriseArticle = true;
            $scope.GriseStatut = true;
            $scope.GriseTypeEtat = true;
            $scope.GriseTypeListe = false;
            $scope.GriseTypeClient = false;
            $scope.GriseNumLot = true;
            $scope.GriseDateExpiration = true;
          }
        }
      }
    };
    //fin choix de l'etat

    //debut pour annuler
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idZoneOuCoordination").css("background-color", "#FFFFFF");
        $("#idSuccursales").css("background-color", "#FFFFFF");
        $("#idEntrepots").css("background-color", "#FFFFFF");
        $("#idExercice").css("background-color", "#FFFFFF");
        $("#idPeriodicite").css("background-color", "#FFFFFF");
        $("#idPeriode").css("background-color", "#FFFFFF");
        $("#idDateDebut").css("background-color", "#FFFFFF");
        $("#idDateFin").css("background-color", "#FFFFFF");
        $("#idTypeArticle").css("background-color", "#FFFFFF");
        $("#idArticle").css("background-color", "#FFFFFF");
        $("#idStatut").css("background-color", "#FFFFFF");
        $("#idTypeEtat").css("background-color", "#FFFFFF");
        $("#idTypeListe").css("background-color", "#FFFFFF");
        $("#idTypeClient").css("background-color", "#FFFFFF");
        $("#idNumLot").css("background-color", "#FFFFFF");
        $("#idDateExpiration").css("background-color", "#FFFFFF");
      });
      $scope.FormListEditionStock.ZoneOuCoordination = "";
      $scope.FormListEditionStock.Succursales = "";
      $scope.FormListEditionStock.Entrepots = "";
      $scope.FormListEditionStock.Exercice = "";
      $scope.FormListEditionStock.Periodicite = "";
      $scope.FormListEditionStock.Periode = "";
      $scope.FormListEditionStock.DateDebut = "";
      $scope.FormListEditionStock.Datefin = "";
      $scope.FormListEditionStock.TypeArticle = "";
      $scope.FormListEditionStock.Article = "";
      $scope.FormListEditionStock.Statut = "";
      $scope.FormListEditionStock.TypeEtat = "";
      $scope.FormListEditionStock.TypeListe = "";
      $scope.FormListEditionStock.TypeClient = "";
      $scope.FormListEditionStock.NumLot = "";
      $scope.FormListEditionStock.DateExpiration = "";
    };
    //fin pour annuler

    //debut focus sur le champ
    $scope.desactiverChampRequisApercu = function () {
      $(document).ready(function () {
        $("#idSuccursales").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEntrepots").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodicite").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriode").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateDebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateFin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout SuiviClient
    $scope.AjoutApercu = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisApercu();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      for (var j = 0; j < $scope.listeEditionStock.length; j++) {
        if (j == $scope.lIndex) {
          if (
            $scope.listeEditionStock[j].ET_INDEX == "ST_APPROVISIONNEMENT" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_TRANSFERT" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_INVENTAIRE"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionStock.Succursales === "" ||
                $scope.FormListEditionStock.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Entrepots === "" ||
                $scope.FormListEditionStock.Entrepots === undefined
              ) {
                $("#idEntrepots").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Exercice === "" ||
                $scope.FormListEditionStock.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Periodicite === "" ||
                $scope.FormListEditionStock.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.StatutPERIODE === "" ||
                $scope.FormListEditionStock.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.DateDebut === "" ||
                $scope.FormListEditionStock.DateDebut === undefined
              ) {
                $("#idDateDebut").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Datefin === "" ||
                $scope.FormListEditionStock.Datefin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKDEATAILLEE" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKRESUMEE" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKRESUMEARS" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONSTOCKDEATAILLEARS"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionStock.Succursales === "" ||
                $scope.FormListEditionStock.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Entrepots === "" ||
                $scope.FormListEditionStock.Entrepots === undefined
              ) {
                $("#idEntrepots").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Exercice === "" ||
                $scope.FormListEditionStock.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Periodicite === "" ||
                $scope.FormListEditionStock.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.StatutPERIODE === "" ||
                $scope.FormListEditionStock.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }

              if (
                $scope.FormListEditionStock.DateFin === "" ||
                $scope.FormListEditionStock.DateFin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_LISTEPERIODIQUEDETAILLE" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_LISTEPERIODIQUERESUME" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_MVTSOCK"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionStock.Succursales === "" ||
                $scope.FormListEditionStock.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Entrepots === "" ||
                $scope.FormListEditionStock.Entrepots === undefined
              ) {
                $("#idEntrepots").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Exercice === "" ||
                $scope.FormListEditionStock.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Periodicite === "" ||
                $scope.FormListEditionStock.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.StatutPERIODE === "" ||
                $scope.FormListEditionStock.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.DateDebut === "" ||
                $scope.FormListEditionStock.DateDebut === undefined
              ) {
                $("#idDateDebut").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Datefin === "" ||
                $scope.FormListEditionStock.Datefin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX == "ST_PRODUITPERIME" ||
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_PRODUITENVOIXPEREMPTIONHV" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_PRODUITENVOIXPEREMPTION"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionStock.Succursales === "" ||
                $scope.FormListEditionStock.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Entrepots === "" ||
                $scope.FormListEditionStock.Entrepots === undefined
              ) {
                $("#idEntrepots").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Exercice === "" ||
                $scope.FormListEditionStock.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Periodicite === "" ||
                $scope.FormListEditionStock.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.StatutPERIODE === "" ||
                $scope.FormListEditionStock.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Datefin === "" ||
                $scope.FormListEditionStock.Datefin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX ==
              "ST_SITUATIONARTICLEPERIME" ||
            $scope.listeEditionStock[j].ET_INDEX == "ST_SITUATIONARTICLE"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionStock.Succursales === "" ||
                $scope.FormListEditionStock.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Entrepots === "" ||
                $scope.FormListEditionStock.Entrepots === undefined
              ) {
                $("#idEntrepots").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Exercice === "" ||
                $scope.FormListEditionStock.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Periodicite === "" ||
                $scope.FormListEditionStock.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.StatutPERIODE === "" ||
                $scope.FormListEditionStock.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.DateDebut === "" ||
                $scope.FormListEditionStock.DateDebut === undefined
              ) {
                $("#idDateDebut").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Datefin === "" ||
                $scope.FormListEditionStock.Datefin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionStock[j].ET_INDEX == "ST_EVALUATIONSTOCK"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionStock.Succursales === "" ||
                $scope.FormListEditionStock.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Entrepots === "" ||
                $scope.FormListEditionStock.Entrepots === undefined
              ) {
                $("#idEntrepots").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Exercice === "" ||
                $scope.FormListEditionStock.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Periodicite === "" ||
                $scope.FormListEditionStock.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.StatutPERIODE === "" ||
                $scope.FormListEditionStock.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionStock.Datefin === "" ||
                $scope.FormListEditionStock.Datefin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          }
        }
      }
    };
    //Fin ajout SuiviClient
  },
]);
