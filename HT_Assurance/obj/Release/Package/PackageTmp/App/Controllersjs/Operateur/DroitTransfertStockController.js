MapharApp.controller("DroitTransfertStockController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.listeDroitTransfertStock = [];
    $scope.tablisteDroitTransfertStock = [];
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

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    //debut initialisation
    $scope.initFormAddDroitTransftStock = function () {
      $scope.$emit("LOAD");
      $scope.afficheListDroitTransfertStock();
      $scope.$emit("UNLOAD");
    };
    // fin initialisation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut Developpement  Anicette

    //fin pour annuler la recherche

    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

    //Debut Liste transfert de stock
    $scope.afficheListDroitTransfertStock = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
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
        .post(
          "/DroitTransfertStock/ListeDroitTransfertStock/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeDroitTransfertStock = reponse.data;
          console.log($scope.listeDroitTransfertStock);
        });
    };
    //Fin Liste droit agence

    //Debut Liste Questionnaires
    $scope.ValiderTransfertStock = function () {
      $scope.$emit("LOAD");

      $scope.clsCtcontratgaranties = [];
      for (var i = 0; i < $scope.listeDroitTransfertStock.length; i++) {
        for (var j = 0; j < $scope.selectedMore.length; j++) {
          if (
            $scope.selectedMore[j].EN_DENOMINATION ==
            $scope.listeDroitTransfertStock[i].EN_DENOMINATION
          ) {
            if ($scope.listeDroitTransfertStock[i].COCHER == "O") {
              $scope.listeDroitTransfertStock[i].COCHER = "N";
              break;
            }
            if ($scope.listeDroitTransfertStock[i].COCHER == "N") {
              $scope.listeDroitTransfertStock[i].COCHER = "O";
              break;
            }
          }
        }

        $scope.objetGarentie = {
          OP_CODEOPERATEUR: "",
          EN_CODEENTREPOT:"",
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "DROIT AGENCE",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        };
        $scope.objetGarentie.OP_CODEOPERATEUR = $scope.collectionOperateur.OP_CODEOPERATEUR;
        $scope.objetGarentie.EN_CODEENTREPOT = $scope.listeDroitTransfertStock[i].EN_CODEENTREPOT;
        $scope.objetGarentie.EN_DENOMINATION =
          $scope.listeDroitTransfertStock[i].EN_DENOMINATION;
        $scope.objetGarentie.COCHER = $scope.listeDroitTransfertStock[i].COCHER;
        $scope.objetGarentie.MODIFICATION =
          $scope.listeDroitTransfertStock[i].MODIFICATION;
        $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetGarentie.clsObjetEnvoi.OE_J = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
         

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }
      $scope.objet_envoie = $scope.clsCtcontratgaranties;

      $http
        .post(
          "/DroitTransfertStock/AjoutDroitTransfertStock/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.tablisteDroitTransfertStock = reponse.data;
          console.log($scope.tablisteDroitTransfertStock);
          if (
            $scope.tablisteDroitTransfertStock[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tablisteDroitTransfertStock[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeDroitTransfertStock[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tablisteDroitTransfertStock[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tablisteDroitTransfertStock[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin Liste transfert de stock

    //CASE A COCHER SUR LA LISTE
    $scope.selectedMore = [];
    $scope.existedMore = function (item) {
      if (item == "O") {
        return true;
      }
      //return $scope.selectedMore.indexOf(item) > -1;
    };

    $scope.toggleSelectedMore = function (item) {
      let idx = $scope.selectedMore.indexOf(item);
      if (idx > -1) {
        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
      }
    };
    //CASE A COCHER SUR LA LISTE

    //debut pour annuler la recherche
    $scope.listAnnuler = function () {
      setTimeout($scope.rechargePage, 3600);
    };
    //fin pour annuler la recherche

    //fin Developpement Anicette
  },
]);
