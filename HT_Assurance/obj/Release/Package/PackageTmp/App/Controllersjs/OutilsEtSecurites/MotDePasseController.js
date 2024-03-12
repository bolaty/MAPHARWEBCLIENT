MapharApp.controller("MotDePasseController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddMotDePasse = {
      ancienMotDePasse: "",
      nouveauMotDePasse: "",
      repeterMotDePasse: "",
    };
    $scope.tabEnregMotDePasse = [];
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
    $scope.initFormAddMotDePasse = function () {
      $scope.$emit("LOAD");
      $scope.$emit("UNLOAD");
    };
    // fin initialisation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut Developpement  Anicette

    //Debut Liste Mot De Passe
    $scope.ValiderMotDePasse = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.CODE_OPERATEUR,
          OP_MOTPASSE: $scope.FormAddMotDePasse.nouveauMotDePasse,
          SL_LIBELLEECRAN: "CREATION JOURNEE DE TRAVAIL",
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
        .post("/Operateur/ModifMotDePassOperateur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabEnregMotDePasse = reponse.data;
          console.log($scope.tabEnregMotDePasse);
          if (
            $scope.tabEnregMotDePasse[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tabEnregMotDePasse[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.clearlistenregistrement();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tabEnregMotDePasse[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //Fin Liste Mot De Passe

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.clearlistenregistrement = function () {
      $(document).ready(function () {
        $("#idDate").css("background-color", "#FFFFFF");
      });
      $scope.FormAddMotDePasse = {};
      $scope.initFormAddMotDePasse();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //fin Developpement Anicette
  },
]);
