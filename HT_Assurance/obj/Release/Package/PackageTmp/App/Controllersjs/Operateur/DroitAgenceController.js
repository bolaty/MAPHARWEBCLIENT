MapharApp.controller("DroitAgenceController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddDroitAgence = {};
    $scope.listeDroitAgence = [];
    $scope.tablisteDroitAgence = [];
    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

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
    $scope.initFormAddDroitAgence = function () {
      $scope.$emit("LOAD");
      $scope.afficheListDroitAgence();
      $scope.$emit("UNLOAD");
    };
    // fin initialisation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut Developpement  Anicette

    //fin pour annuler la recherche

    //debut session generale pour le contrat operation
    $scope.collectionOp = angular.fromJson(
      localStorage.getItem("CollOperateur")
    );
    //fin session generale pour le contrat operation

    //Debut Liste droit agence
    $scope.afficheListDroitAgence = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
        .post("/DroitAgence/ListeDroitAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeDroitAgence = reponse.data;
          console.log($scope.listeDroitAgence);
        });
    };
    //Fin Liste droit agence

    //Debut Liste Questionnaires
    $scope.ValiderDroitAgence = function () {
      $scope.$emit("LOAD");

      $scope.clsCtcontratgaranties = [];
      for (var i = 0; i < $scope.listeDroitAgence.length; i++) {
        for (var j = 0; j < $scope.selectedMore.length; j++) {
          if (
            $scope.selectedMore[j].AG_RAISONSOCIAL ==
            $scope.listeDroitAgence[i].AG_RAISONSOCIAL
          ) {
            if ($scope.listeDroitAgence[i].COCHER == "O") {
              $scope.listeDroitAgence[i].COCHER = "N";
              break;
            }
            if ($scope.listeDroitAgence[i].COCHER == "N") {
              $scope.listeDroitAgence[i].COCHER = "O";
              break;
            }
          }
        }

        $scope.objetGarentie = {
          AG_CODEAGENCE: "",
          OP_CODEOPERATEUR: "",
          COCHER: "",
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "DROIT AGENCE",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
          },
        };
        $scope.objetGarentie.OP_CODEOPERATEUR = $rootScope.OP_CODEOPERATEUR;
        $scope.objetGarentie.AG_RAISONSOCIAL =
          $scope.listeDroitAgence[i].AG_RAISONSOCIAL;
        $scope.objetGarentie.COCHER = $scope.listeDroitAgence[i].COCHER;
        $scope.objetGarentie.MODIFICATION =
          $scope.listeDroitAgence[i].MODIFICATION;
        $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetGarentie.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.objetGarentie.clsObjetEnvoi.OE_E = $rootScope.CODE_ENTREPOT;

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }
      $scope.objet_envoie = $scope.clsCtcontratgaranties;

      $http
        .post("/DroitAgence/AjoutDroitAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tablisteDroitAgence = reponse.data;
          console.log($scope.tablisteDroitAgence);
          if (
            $scope.tablisteDroitAgence[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tablisteDroitAgence[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi();
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //Fin Liste Questionnaires

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
    $scope.listeDroitAgenceAnnuler = function () {
      $scope.FormAddDroitAgence = "";
    };
    //fin pour annuler la recherche

    //fin Developpement Anicette
  },
]);
