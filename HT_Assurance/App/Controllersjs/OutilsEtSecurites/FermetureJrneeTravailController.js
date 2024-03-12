MapharApp.controller("FermetureJrneeTravailController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddFermetureJrneeTravail = {
      Date: "",
    };
    $scope.listeFermetureJrneeTravail = [];
    $scope.nombreInfoBulle = "";
    $scope.tablisteFermetureJrneeTravail = [];
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

    /*FIN FONCTION GENERALE*/

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    //debut initialisation
    $scope.initFormAddFermetureJrneeTravail = function () {
      $scope.$emit("LOAD");
      $scope.afficheListFermetureJrneeTravail();
      $scope.$emit("UNLOAD");
    };
    // fin initialisation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut Developpement  Anicette

    //Debut Liste Fermeture JOURNEE DE TRAVAIL
    $scope.afficheListFermetureJrneeTravail = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EX_EXERCICE: $rootScope.DATE_EXERCICE,
          JT_STATUT: "O",
          SL_LIBELLEECRAN: "FERMETURE JOURNEE DE TRAVAIL",
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
        .post("/LaJourneeDeTravail/ListeJourneeTravail/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeFermetureJrneeTravail = reponse.data;
          $scope.nombreInfoBulle = $scope.listeFermetureJrneeTravail.length;
          console.log($scope.listeFermetureJrneeTravail);
        });
    };
    //Fin Liste Fermeture JOURNEE DE TRAVAIL

    $scope.FermetureJrneeTravail = function (id) {
      for (var i = 0; i < $scope.listeFermetureJrneeTravail.length; i++) {
        if (i == id) {
          $scope.FormAddFermetureJrneeTravail.Date =
            $scope.listeFermetureJrneeTravail[i].JT_DATEJOURNEETRAVAIL;
        }
      }
    };

    //Debut Liste Fermeture JOURNEE DE TRAVAIL
    $scope.ValiderFermetureJrneeTravail = function (idJrneTravail) {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          JT_DATEJOURNEETRAVAIL: idJrneTravail,
          JT_STATUT: "F",
          SL_LIBELLEECRAN: "FERMETURE JOURNEE DE TRAVAIL",
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
        .post("/LaJourneeDeTravail/ModifJourneeTravail/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tablisteFermetureJrneeTravail = reponse.data;
          console.log($scope.tablisteFermetureJrneeTravail);
          if (
            $scope.tablisteFermetureJrneeTravail[0].clsObjetRetour
              .SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tablisteFermetureJrneeTravail[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeFermetureJrneeTravail[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
            $scope.resetFormAddFermetureJrneeTravail();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tablisteFermetureJrneeTravail[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //Fin Liste Fermeture JOURNEE DE TRAVAIL

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddFermetureJrneeTravail = function () {
      $(document).ready(function () {
        $("#idDate").css("background-color", "#FFFFFF");
      });
      $scope.FormAddFermetureJrneeTravail = {};
      $scope.initFormAddFermetureJrneeTravail();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //fin Developpement Anicette
  },
]);
