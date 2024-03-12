MapharApp.controller("DroitTransfertStockProfilsController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.appelServiceWeb = $rootScope.ADRESSESERV;//"http://192.168.1.99:6033/Service/";

    $scope.listeDroitTransfertStock = [];
    $scope.tablisteDroitTransfertStock = [];
    $rootScope.infoBulleNombre = "";
    $rootScope.listeOn = "";

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
            "wsProfilwebdroitsaisieentrepot.svc/pvgChargerDansDataSet",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeDroitTransfertStock = JSON.parse(reponse.data);
          $scope.listeDroitTransfertStock =
            $scope.listeDroitTransfertStock.TABLE;
          console.log($scope.listeDroitTransfertStock);
          $rootScope.infoBulleNombre = $scope.listeDroitTransfertStock.length;
          $rootScope.listeOn = $scope.listeDroitTransfertStock[0].SL_MESSAGE;
          if ($scope.listeDroitTransfertStock[0].SL_RESULTAT === "FALSE") {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDroitTransfertStock[0].SL_MESSAGE
            );
          }
        });
    };
    //Fin Liste droit agence

    //Debut Liste Questionnaires
    $scope.ValiderTransfertStock = function () {
      $scope.$emit("LOAD");

      $scope.clsCtcontratgaranties = [];
      $scope.objet_envoie.Objet = [];
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
          PO_CODEPROFILWEB: "",
          EN_CODEENTREPOT: "",
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
        $scope.objetGarentie.PO_CODEPROFILWEB =
          $scope.collectionOperateur.PO_CODEPROFILWEB;
        $scope.objetGarentie.EN_CODEENTREPOT =
          $scope.listeDroitTransfertStock[i].EN_CODEENTREPOT;
        $scope.objetGarentie.COCHER = $scope.listeDroitTransfertStock[i].COCHER;

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
        $scope.objet_envoie.Objet.push($scope.objetGarentie);
      }
      // $scope.objet_envoie = { Objet: $scope.clsCtcontratgaranties };
      console.log($scope.objet_envoie);

      $http
        .post(
          $scope.appelServiceWeb +
            "wsProfilwebdroitsaisieentrepot.svc/pvgAjouterdroit",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.tablisteDroitTransfertStock = JSON.parse(reponse.data);
          $scope.tablisteDroitTransfertStock =
            $scope.tablisteDroitTransfertStock.TABLE;
          console.log($scope.tablisteDroitTransfertStock);
          if ($scope.tablisteDroitTransfertStock[0].SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tablisteDroitTransfertStock[0].SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tablisteDroitTransfertStock[0].SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tablisteDroitTransfertStock[0].SL_MESSAGE
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
