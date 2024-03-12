MapharApp.controller("DroitEntrepotProfilsController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.appelServiceWeb = $rootScope.ADRESSESERV;//"http://192.168.1.99:6033/Service/";

    $scope.FormAddDroitEntrepot = {};
    $scope.listeDroitEntrepot = [];
    $scope.tablisteDroitEntrepot = [];
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
    $scope.afficheListDroitEntrepot = function () {
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
            "wsProfilwebdroitentrepot.svc/pvgChargerDansDataSet",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeDroitEntrepot = JSON.parse(reponse.data);
          $scope.listeDroitEntrepot = $scope.listeDroitEntrepot.TABLE;
          console.log($scope.listeDroitEntrepot);
          $rootScope.infoBulleNombre = $scope.listeDroitEntrepot.length;
          $rootScope.listeOn = $scope.listeDroitEntrepot[0].SL_MESSAGE;
          if ($scope.listeDroitEntrepot[0].EN_CODEENTREPOT != undefined) {
            for (i = 0; $scope.listeDroitEntrepot.length > i; i++) {
              if ($scope.listeDroitEntrepot[i].COCHER == "O") {
                $scope.selectedMore.push($scope.listeDroitEntrepot[i]);
              }
              // break;
            }
            console.log($scope.selectedMore);
          }
        });
    };
    //Fin Liste droit agence

    //Debut Liste Questionnaires
    $scope.ValiderDroitEntrepot = function () {
      $scope.$emit("LOAD");

      $scope.clsCtcontratgaranties = [];
      for (var i = 0; i < $scope.listeDroitEntrepot.length; i++) {
        /* for (var j = 0; j < $scope.selectedMore.length; j++) {
          if (
            $scope.selectedMore[j].EN_DENOMINATION ==
            $scope.listeDroitEntrepot[i].EN_DENOMINATION
          ) {
            if ($scope.listeDroitEntrepot[i].COCHER == "O") {
              $scope.listeDroitEntrepot[i].COCHER = "N";
              break;
            }
            if ($scope.listeDroitEntrepot[i].COCHER == "N") {
              $scope.listeDroitEntrepot[i].COCHER = "O";
              break;
            }
          }
        }*/

        $scope.objetGarentie = {
          EN_CODEENTREPOT: "",
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
        $scope.objetGarentie.EN_CODEENTREPOT =
          $scope.listeDroitEntrepot[i].EN_CODEENTREPOT;
        $scope.objetGarentie.PO_CODEPROFILWEB =
          $scope.collectionOperateur.PO_CODEPROFILWEB;
        $scope.objetGarentie.COCHER = $scope.listeDroitEntrepot[i].COCHER;

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }
      $scope.objet_envoie = { Objet: $scope.clsCtcontratgaranties };

      $http
        .post(
          $scope.appelServiceWeb +
            "wsProfilwebdroitentrepot.svc/pvgAjouterdroit",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.tablisteDroitEntrepot = JSON.parse(reponse.data);
          $scope.tablisteDroitEntrepot = $scope.tablisteDroitEntrepot.TABLE;
          console.log($scope.tablisteDroitEntrepot);
          $scope.nombreInfoBulle = $scope.tablisteDroitEntrepot.length;
          if ($scope.tablisteDroitEntrepot[0].SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tablisteDroitEntrepot[0].SL_MESSAGE
            );
            $scope.selectedMore = [];
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tablisteDroitEntrepot[0].SL_MESSAGE
            );
            $scope.selectedMore = [];
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tablisteDroitEntrepot[0].SL_MESSAGE
          );
          $scope.selectedMore = [];
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
        for (i = 0; $scope.listeDroitEntrepot.length > i; i++) {
          if (
            item.EN_CODEENTREPOT == $scope.listeDroitEntrepot[i].EN_CODEENTREPOT
          ) {
            if ($scope.listeDroitEntrepot[i].COCHER == "O") {
              $scope.listeDroitEntrepot[i].COCHER = "N";
              break;
            }
          }
        }

        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
        for (i = 0; $scope.listeDroitEntrepot.length > i; i++) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].EN_CODEENTREPOT) ==
              parseInt($scope.listeDroitEntrepot[i].EN_CODEENTREPOT)
            ) {
              if ($scope.listeDroitEntrepot[i].COCHER == "N") {
                $scope.listeDroitEntrepot[i].COCHER = "O";
                break;
              }
            }
          }
        }
      }

      console.log($scope.selectedMore);
      /*let idx = $scope.selectedMore.indexOf(item);
      if (idx > -1) {
        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
      }*/
    };
    //CASE A COCHER SUR LA LISTE

    //debut pour annuler la recherche
    $scope.listeDroitEntrepotAnnuler = function () {
      $scope.FormAddDroitEntrepot = "";
    };
    //fin pour annuler la recherche

    //fin Developpement Anicette
  },
]);
