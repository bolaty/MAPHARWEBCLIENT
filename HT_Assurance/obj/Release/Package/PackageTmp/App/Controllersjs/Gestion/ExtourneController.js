MapharApp.controller("ExtourneController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.formEnrgExtourne = {
      datePiece: "",
      numPiece: "",
    };
    $scope.tabEnregExtourne = [];
    ($scope.idPiece = ""),
      ($scope.idatepiece = ""),
      //*FIN FONCTION  DE DECLARATION

      /*DEBUT FONCTION GENERALE*/

      //début loader
      $scope.$on("LOAD", function () {
        $scope.loading = true;
      });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    $scope.initFormAddExtourne = function () {};

    //*FIN FONCTION GENERALE

    //DEBUT DEV ANICETTE

    //Debut Liste Mot De Passe
    $scope.ValiderExtourne = function (datePiece, numPiece) {
      $scope.$emit("LOAD");
      ($scope.idPiece = numPiece), ($scope.idatepiece = datePiece);

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          MV_DATEPIECE: datePiece,
          MV_NUMPIECE: numPiece,
          MV_NUMPIECE1: "",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
        .post("/Extourne/AjoutExtourne/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabEnregExtourne = reponse.data;
          console.log($scope.tabEnregExtourne);
          if ($scope.tabEnregExtourne[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tabEnregExtourne[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.clearlistenregistrement();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tabEnregExtourne[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //Fin Liste Mot De Passe

    $scope.clearlistenregistrement = function () {
      $(document).ready(function () {
        $("#idDate").css("background-color", "#FFFFFF");
        $("#numPiece").css("background-color", "#FFFFFF");
      });
      $scope.formEnrgExtourne = {};
      $scope.initFormAddExtourne();
    };

    //*FIN DEV ANICETTE
  },
]);
