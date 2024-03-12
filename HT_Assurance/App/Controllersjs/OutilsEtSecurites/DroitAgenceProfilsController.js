MapharApp.controller("DroitAgenceProfilsController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.appelServiceWeb = $rootScope.ADRESSESERV;//"http://192.168.1.99:6033/Service/";

    $scope.FormAddDroitAgence = {};
    $scope.listeDroitAgence = [];
    $scope.tablisteDroitAgence = [];
    $scope.Objet = [];
    $scope.objet_envoie = {};
    $rootScope.infoBulleNombre = "";
    $rootScope.listeOn = "";

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
      $scope.objet_envoie = {
        Objet: [
          {
            PO_CODEPROFILWEB: $scope.collectionOperateur.PO_CODEPROFILWEB,
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
        ],
      };

      $http
        .post(
          $scope.appelServiceWeb +
            "wsProfilwebdroitagence.svc/pvgChargerDansDataSet",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeDroitAgence = JSON.parse(reponse.data);
          $scope.listeDroitAgence = $scope.listeDroitAgence.TABLE;
          console.log($scope.listeDroitAgence);
          $rootScope.infoBulleNombre = $scope.listeDroitAgence.length;
          $rootScope.listeOn = $scope.listeDroitAgence[0].SL_MESSAGE;
          if ($scope.listeDroitAgence[0].SL_RESULTAT === "FALSE") {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes($scope.listeDroitAgence[0].SL_MESSAGE);
          }
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
          PO_CODEPROFILWEB: "",
          COCHER: "",
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
        };
        // $scope.objetGarentie.PO_CODEPROFILWEB = "2";
        $scope.objetGarentie.AG_CODEAGENCE =
          $scope.listeDroitAgence[i].AG_CODEAGENCE;
        $scope.objetGarentie.PO_CODEPROFILWEB =
          $scope.collectionOperateur.PO_CODEPROFILWEB;
        $scope.objetGarentie.COCHER = $scope.listeDroitAgence[i].COCHER;

        $scope.Objet.push($scope.objetGarentie);
      }
      $scope.objet_envoie = { Objet: $scope.Objet };

      $http
        .post(
          $scope.appelServiceWeb + "wsProfilwebdroitagence.svc/pvgAjouterdroit",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.tablisteDroitAgence = JSON.parse(reponse.data);
          $scope.tablisteDroitAgence = $scope.tablisteDroitAgence.TABLE;
          console.log($scope.tablisteDroitAgence);
          $scope.nombreInfoBulle = $scope.tablisteDroitAgence.length;
          if ($scope.tablisteDroitAgence[0].SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tablisteDroitAgence[0].SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tablisteDroitAgence[0].SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur($scope.tablisteDroitAgence[0].SL_MESSAGE);
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
