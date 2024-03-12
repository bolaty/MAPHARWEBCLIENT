MapharApp.controller("EditionArticlesEtPrestationsController", [
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
    //$rootScope.DATE_PREMIER_EXERCICE = $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
    $rootScope.DATE_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    console.log($rootScope.infoDeLoperateur);
    console.log($rootScope.CODE_AGENCE);
    console.log($rootScope.DATE_EXERCICE);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormListEditionArtEtPrest = {
      ZoneOuCoordination: "",
      Succursales: "",
      Entrepots: "",
      Exercice: "",
      Periodicite: "",
      Periode: "",
      TypeClient: "",
      TypeArticle: "",
      DateDebut: "",
      DateFin: "",
      TypeJourFacturation: "",
      LieuFacturation: "",
      StatutPERIODE: "",
    };
    $scope.objet_envoie = [];
    $scope.listeEditionArtEtPrest = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesSuccursales = [];
    $scope.listeEntrepots = [];
    $scope.listeExercice = [];
    $scope.listePeriodicite = [];
    $scope.listePeriode = [];
    $scope.listeTypeClient = [];
    $scope.listeTypeArticle = [];
    $scope.listeTypeJourFacturation = [];
    $scope.listeLieuFacturation = [];
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
    $scope.GriseTypeClient = false;
    $scope.GriseTypeArticle = false;
    $scope.GriseTypePrestation = false;
    $scope.GriseDateDebut = false;
    $scope.GriseDateFin = false;
    $scope.GriseTypeJourFacturation = false;
    $scope.GriseLieuFacturation = false;
    /*DEBUT ZONE DE DECLARATION*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut initialisation FormListEditionArtEtPrest
    $scope.initFormListEditionArtEtPrest = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeEditionArtEtPrest();
      $scope.afficheListeZoneOuCoordination();
      $scope.afficheListeSuccursales();
      $scope.afficheListeEntrepots();
      $scope.afficheListeExercice();
      $scope.afficheListePeriodicite();
      $scope.afficheListeTypeClient();
      $scope.afficheListeTypeArticle();
      $scope.afficheListeTypeJourFacturation();
      $scope.afficheListeLieuFacturation();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation FormListEditionArtEtPrest

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
    $scope.afficheListeEditionArtEtPrest = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "ARTICLEPRESTATION",
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
          $scope.listeEditionArtEtPrest = reponse.data.reverse();
          console.log($scope.listeEditionArtEtPrest);
          if (
            $scope.listeEditionArtEtPrest[0].clsObjetRetour.SL_RESULTAT ===
            "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEditionArtEtPrest[0].clsObjetRetour.SL_MESSAGE
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

    //debut liste des
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
    //fin liste des

    //debut liste des
    $scope.afficheListePeriode = function () {
      $scope.objet_envoie = [
        {
          PE_CODEPERIODICITE: $scope.FormListEditionArtEtPrest.Periodicite,
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
    //fin liste des Exercice

    //debut liste des TypeClient
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
    //fin liste des TypeClient

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

    //debut liste des LieuFacturation
    $scope.afficheListeLieuFacturation = function () {
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
        .post("/LieuFacturation/ListeLieuFacturation/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeLieuFacturation = reponse.data;
          console.log($scope.listeLieuFacturation);
        });
    };
    //fin liste des LieuFacturation

    //debut liste des TypeFacturation
    $scope.afficheListeTypeJourFacturation = function () {
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
          "/TypeJourFacturation/ListeTypeJourFacturation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeTypeJourFacturation = reponse.data;
          console.log($scope.listeTypeJourFacturation);
        });
    };
    //fin liste des TypeFacturation

    //debut choix de l'etat
    $scope.lIndex = "";
    $scope.choixEtat = function (idEtat, nometat) {
      for (var i = 0; i < $scope.listeEditionArtEtPrest.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEditionArtEtPrest.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $scope.indexnometat = nometat;
          $("#idEtat" + idEtat).css("background-color", "beige");
          if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRIXPRESTATION"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionArtEtPrest.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            $scope.GriseExercice = false;
            ($scope.FormListEditionArtEtPrest.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionArtEtPrest.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            if ($scope.listePeriodicite[0].PE_CODEPERIODICITE != undefined) {
              console.log($scope.listePeriodicite[0].PE_CODEPERIODICITE);
              $scope.FormListEditionArtEtPrest.Periode =
                $scope.listePeriodicite[0].PE_CODEPERIODICITE;

              if ($scope.listePeriodicite[0].PE_CODEPERIODICITE == 03) {
                $scope.FormListEditionArtEtPrest.StatutPERIODE = "01";
                console.log($scope.FormListEditionArtEtPrest.StatutPERIODE);
              }

              $scope.afficheListePeriode();
            }

            $scope.GriseTypeClient = false;
            ($scope.FormListEditionArtEtPrest.TypeClient =
              $scope.listeTypeClient[0].NT_CODENATURETIERS),
              ($scope.GriseTypeArticle = false);
            $scope.GriseDateDebut = true;
            $scope.GriseDateFin = false;
            ($scope.FormListEditionArtEtPrest.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeJourFacturation = false);
            $scope.GriseLieuFacturation = false;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRESTATION"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionArtEtPrest.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = true);
            $scope.GriseExercice = false;
            ($scope.FormListEditionArtEtPrest.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionArtEtPrest.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionArtEtPrest.StatutPERIODE = "01";
            $scope.afficheListePeriode();

            $scope.GriseTypeClient = false;
            ($scope.FormListEditionArtEtPrest.TypeClient =
              $scope.listeTypeClient[0].NT_CODENATURETIERS),
              ($scope.GriseTypeArticle = false);
            $scope.GriseDateDebut = true;
            $scope.GriseDateFin = false;
            ($scope.FormListEditionArtEtPrest.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeJourFacturation = true);
            $scope.GriseLieuFacturation = true;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_ARTICLE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionArtEtPrest.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = true);
            $scope.GriseExercice = false;
            ($scope.FormListEditionArtEtPrest.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionArtEtPrest.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionArtEtPrest.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseTypeClient = false;
            ($scope.FormListEditionArtEtPrest.TypeClient =
              $scope.listeTypeClient[0].NT_CODENATURETIERS),
              ($scope.GriseTypeArticle = false);
            $scope.GriseDateDebut = true;
            $scope.GriseDateFin = false;
            ($scope.FormListEditionArtEtPrest.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeJourFacturation = true);
            $scope.GriseLieuFacturation = true;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_TYPEPRESTATION" ||
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_TYPEARTICLE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionArtEtPrest.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = true);
            $scope.GriseExercice = false;
            ($scope.FormListEditionArtEtPrest.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionArtEtPrest.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionArtEtPrest.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseTypeClient = true;
            $scope.GriseTypeArticle = true;
            $scope.GriseDateDebut = true;
            $scope.GriseDateFin = true;
            $scope.GriseTypeJourFacturation = true;
            $scope.GriseLieuFacturation = true;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRIXVENTEARTICLE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionArtEtPrest.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = false);
            $scope.GriseExercice = false;
            ($scope.FormListEditionArtEtPrest.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionArtEtPrest.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionArtEtPrest.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseTypeClient = false;
            false;
            ($scope.FormListEditionArtEtPrest.TypeClient =
              $scope.listeTypeClient[0].NT_CODENATURETIERS),
              ($scope.GriseTypeArticle = false);
            $scope.GriseDateDebut = true;
            $scope.GriseDateFin = false;
            ($scope.FormListEditionArtEtPrest.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeJourFacturation = false);
            $scope.GriseLieuFacturation = false;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRIXACHATARTICLE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionArtEtPrest.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseEntrepots = true);
            $scope.GriseExercice = false;
            ($scope.FormListEditionArtEtPrest.Exercice =
               $rootScope.DATE_EXERCICE),
              ($scope.GrisePeriodicite = false);
            ($scope.FormListEditionArtEtPrest.Periodicite =
              $scope.listePeriodicite[0].PE_CODEPERIODICITE),
              ($scope.GrisePeriode = false);
            $scope.FormListEditionArtEtPrest.StatutPERIODE = "01";
            $scope.afficheListePeriode();
            $scope.GriseTypeClient = false;
            $scope.GriseTypeArticle = false;
            $scope.GriseDateDebut = true;
            $scope.GriseDateFin = false;
            ($scope.FormListEditionArtEtPrest.DateFin =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL),
              ($scope.GriseTypeJourFacturation = true);
            $scope.GriseLieuFacturation = true;
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
        $("#idTypePrestation").css("background-color", "#FFFFFF");
        $("#idNumLot").css("background-color", "#FFFFFF");
        $("#idDateExpiration").css("background-color", "#FFFFFF");
      });
      $scope.FormListEditionArtEtPrest.ZoneOuCoordination = "";
      $scope.FormListEditionArtEtPrest.Succursales = "";
      $scope.FormListEditionArtEtPrest.Entrepots = "";
      $scope.FormListEditionArtEtPrest.Exercice = "";
      $scope.FormListEditionArtEtPrest.Periodicite = "";
      $scope.FormListEditionArtEtPrest.Periode = "";
      $scope.FormListEditionArtEtPrest.DateDebut = "";
      $scope.FormListEditionArtEtPrest.DateFin = "";
      $scope.FormListEditionArtEtPrest.TypeArticle = "";
      $scope.FormListEditionArtEtPrest.Article = "";
      $scope.FormListEditionArtEtPrest.Statut = "";
      $scope.FormListEditionArtEtPrest.TypeEtat = "";
      $scope.FormListEditionArtEtPrest.TypeListe = "";
      $scope.FormListEditionArtEtPrest.TypeClient = "";
      $scope.FormListEditionArtEtPrest.TypePrestation = "";
      $scope.FormListEditionArtEtPrest.NumLot = "";
      $scope.FormListEditionArtEtPrest.DateExpiration = "";
    };
    //fin pour annuler

    //debut focus sur le champ
    $scope.desactiverChampRequisApercu = function () {
      $(document).ready(function () {
        $("#idSuccursales").focusin(function () {
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
        $("#idTypeClient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeArticle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateDebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateFin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypePrestation").focusin(function () {
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

      for (var j = 0; j < $scope.listeEditionArtEtPrest.length; j++) {
        if (j == $scope.lIndex) {
          if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRIXPRESTATION"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionArtEtPrest.Succursales === "" ||
                $scope.FormListEditionArtEtPrest.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Exercice === "" ||
                $scope.FormListEditionArtEtPrest.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Periodicite === "" ||
                $scope.FormListEditionArtEtPrest.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.StatutPERIODE === "" ||
                $scope.FormListEditionArtEtPrest.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.TypeClient === "" ||
                $scope.FormListEditionArtEtPrest.TypeClient === undefined
              ) {
                $("#idTypeClient").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.TypePrestation === "" ||
                $scope.FormListEditionArtEtPrest.TypePrestation === undefined
              ) {
                $("#idTypePrestation").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.DateFin === "" ||
                $scope.FormListEditionArtEtPrest.DateFin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRESTATION"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionArtEtPrest.Succursales === "" ||
                $scope.FormListEditionArtEtPrest.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Exercice === "" ||
                $scope.FormListEditionArtEtPrest.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Periodicite === "" ||
                $scope.FormListEditionArtEtPrest.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.StatutPERIODE === "" ||
                $scope.FormListEditionArtEtPrest.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.TypeClient === "" ||
                $scope.FormListEditionArtEtPrest.TypeClient === undefined
              ) {
                $("#idTypeClient").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.TypePrestation === "" ||
                $scope.FormListEditionArtEtPrest.TypePrestation === undefined
              ) {
                $("#idTypePrestation").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.DateFin === "" ||
                $scope.FormListEditionArtEtPrest.DateFin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_ARTICLE"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionArtEtPrest.Succursales === "" ||
                $scope.FormListEditionArtEtPrest.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Exercice === "" ||
                $scope.FormListEditionArtEtPrest.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Periodicite === "" ||
                $scope.FormListEditionArtEtPrest.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.StatutPERIODE === "" ||
                $scope.FormListEditionArtEtPrest.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.TypeClient === "" ||
                $scope.FormListEditionArtEtPrest.TypeClient === undefined
              ) {
                $("#idTypeClient").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.DateFin === "" ||
                $scope.FormListEditionArtEtPrest.DateFin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_TYPEPRESTATION" ||
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_TYPEARTICLE"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionArtEtPrest.Succursales === "" ||
                $scope.FormListEditionArtEtPrest.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Exercice === "" ||
                $scope.FormListEditionArtEtPrest.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Periodicite === "" ||
                $scope.FormListEditionArtEtPrest.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.StatutPERIODE === "" ||
                $scope.FormListEditionArtEtPrest.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRIXVENTEARTICLE"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionArtEtPrest.Succursales === "" ||
                $scope.FormListEditionArtEtPrest.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Exercice === "" ||
                $scope.FormListEditionArtEtPrest.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Periodicite === "" ||
                $scope.FormListEditionArtEtPrest.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.StatutPERIODE === "" ||
                $scope.FormListEditionArtEtPrest.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }

              if (
                $scope.FormListEditionArtEtPrest.TypeClient === "" ||
                $scope.FormListEditionArtEtPrest.TypeClient === undefined
              ) {
                $("#idTypeClient").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.DateFin === "" ||
                $scope.FormListEditionArtEtPrest.DateFin === undefined
              ) {
                $("#idDateFin").css("background-color", "#FFE9E0");
              }
            });
            $scope.$emit("UNLOAD");
            $rootScope.ChampsNonRenseignes();
            break;
          } else if (
            $scope.listeEditionArtEtPrest[j].ET_INDEX == "ARP_PRIXACHATARTICLE"
          ) {
            $(document).ready(function () {
              if (
                $scope.FormListEditionArtEtPrest.Succursales === "" ||
                $scope.FormListEditionArtEtPrest.Succursales === undefined
              ) {
                $("#idSuccursales").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Exercice === "" ||
                $scope.FormListEditionArtEtPrest.Exercice === undefined
              ) {
                $("#idExercice").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.Periodicite === "" ||
                $scope.FormListEditionArtEtPrest.Periodicite === undefined
              ) {
                $("#idPeriodicite").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.StatutPERIODE === "" ||
                $scope.FormListEditionArtEtPrest.StatutPERIODE === undefined
              ) {
                $("#idPeriode").css("background-color", "#FFE9E0");
              }
              if (
                $scope.FormListEditionArtEtPrest.DateFin === "" ||
                $scope.FormListEditionArtEtPrest.DateFin === undefined
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
