MapharApp.controller("DroitAutreOperationTiersController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];
    $scope.FormListAutreOperationTiers = {
      Nature_Famille: "",
      FamilleOperation: "",
    };
    $scope.listeAutreOperationTiers = [];
    $scope.listeNatureFamille = [];
    $scope.listeFamilleOperation = [];
    $scope.testValidation = [];
    /*FIN ZONE DE DECLARATION*/

    //DEBUT FONCTION GENERALE

    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut initialisation Autre Operation Tiers
    $scope.initFormAddAutreOperationTiers = function () {
      $scope.$emit("LOAD");
      $scope.afficheListNatureFamille();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation Autre Operation Tiers

    // FIN FONCTION GENERALE

    //DEV ANICETTE

    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

    //Debut Liste Nature Famille
    $scope.afficheListNatureFamille = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "Autre Operation Tiers",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "03",
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
        .post("/NatureFamille/ListeNatureFamille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureFamille = reponse.data;
          console.log($scope.listeNatureFamille);
        });
    };
    //Fin Liste Nature Famille

    //Debut Liste Operation
    $scope.afficheFamilleOperation = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.CODE_OPERATEUR,
          NF_CODENATUREFAMILLEOPERATION:
            $scope.FormListAutreOperationTiers.Nature_Famille,
          SL_LIBELLEECRAN: "AUTRE OPERATION DE TIERS",
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
          "/FamilleOperationTresorerie/ListeFamilleOperationTresorerie/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeFamilleOperation = reponse.data;
          console.log($scope.listeFamilleOperation);
        });
    };
    //Fin Liste Operation

    //Debut Liste Autre Operation Tiers
    $scope.afficheListAutreOperationTiers = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          NF_CODENATUREFAMILLEOPERATION:
            $scope.FormListAutreOperationTiers.Nature_Famille,
          FO_CODEFAMILLEOPERATION:
            $scope.FormListAutreOperationTiers.FamilleOperation,
          SL_LIBELLEECRAN: "Autre Operation Tiers",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "01",
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
          "/DroitAutreOperationTiers/ListeDroitOperationTresorerie/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeAutreOperationTiers = reponse.data;
          console.log($scope.listeAutreOperationTiers);
          if (
            $scope.listeAutreOperationTiers[0].clsObjetRetour.SL_RESULTAT ===
            "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeAutreOperationTiers[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            for (i = 0; $scope.listeAutreOperationTiers.length > i; i++) {
              if ($scope.listeAutreOperationTiers[i].COCHER == "O") {
                $scope.selectedMore.push($scope.listeAutreOperationTiers[i]);
              }
              // break;
            }
            console.log($scope.selectedMore);
          }
        });
    };
    //Fin Liste Autre Operation Tiers

    //Debut validation famille operation
    $scope.ValiderAutreOperationTiers = function () {
      $scope.$emit("LOAD");
      //if ($scope.FormListAutreOperationTiers.Nature_Famille !== "" && $scope.FormListAutreOperationTiers.FamilleOperation == "") {
      //    $scope.messageErreur = "Veuillez sélectionner la Nature Famille ou la Famille Operation";
      //    $scope.$emit('UNLOAD');
      //    $rootScope.MessageDerreurDesTypes($scope.messageErreur)
      //}
      //else {
      $scope.clsCtcontratgaranties = [];
      for (var i = 0; i < $scope.listeAutreOperationTiers.length; i++) {
        /*for (var j = 0; j < $scope.selectedMore.length; j++) {
          if (
            $scope.selectedMore[j].NO_CODENATUREOPERATION ==
            $scope.listeAutreOperationTiers[i].NO_CODENATUREOPERATION
          ) {
            if ($scope.listeAutreOperationTiers[i].COCHER == "O") {
              $scope.listeAutreOperationTiers[i].COCHER = "N";
              break;
            }
            if ($scope.listeAutreOperationTiers[i].COCHER == "N") {
              $scope.listeAutreOperationTiers[i].COCHER = "O";
              break;
            }
          }
        }*/

        $scope.objetGarentie = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          NO_CODENATUREOPERATION: "",
          FO_CODEFAMILLEOPERATION: "",
          NF_CODENATUREFAMILLEOPERATION:
            $scope.FormListAutreOperationTiers.Nature_Famille,
          COCHER: "",
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "Autre Operation Tiers",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        };
        $scope.objetGarentie.OP_CODEOPERATEUR =
          $scope.collectionOperateur.OP_CODEOPERATEUR;
        $scope.objetGarentie.FO_CODEFAMILLEOPERATION =
          $scope.listeAutreOperationTiers[i].FO_CODEFAMILLEOPERATION;
        $scope.objetGarentie.NO_CODENATUREOPERATION =
          $scope.listeAutreOperationTiers[i].NO_CODENATUREOPERATION;
        $scope.objetGarentie.COCHER = $scope.listeAutreOperationTiers[i].COCHER;
        $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetGarentie.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }
      $scope.objet_envoie = $scope.clsCtcontratgaranties;

      $http
        .post(
          "/DroitAutreOperationTiers/AjoutDroitOperationTresorerie/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeAutreOperationTiers = reponse.data;
          console.log($scope.listeAutreOperationTiers);
          if (
            $scope.listeAutreOperationTiers[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.listeAutreOperationTiers[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.selectedMore = [];
            $scope.listeAutreOperationTiers[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeAutreOperationTiers[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.selectedMore = [];
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeAutreOperationTiers[0].clsObjetRetour.SL_MESSAGE
          );
          $scope.selectedMore = [];
        });
      //}
    };
    //Fin validation famille operation

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
        for (i = 0; $scope.listeAutreOperationTiers.length > i; i++) {
          if (
            item.NO_CODENATUREOPERATION ==
            $scope.listeAutreOperationTiers[i].NO_CODENATUREOPERATION
          ) {
            if ($scope.listeAutreOperationTiers[i].COCHER == "O") {
              $scope.listeAutreOperationTiers[i].COCHER = "N";
              break;
            }
          }
        }

        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
        for (i = 0; $scope.listeAutreOperationTiers.length > i; i++) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].NO_CODENATUREOPERATION) ==
              parseInt(
                $scope.listeAutreOperationTiers[i].NO_CODENATUREOPERATION
              )
            ) {
              if ($scope.listeAutreOperationTiers[i].COCHER == "N") {
                $scope.listeAutreOperationTiers[i].COCHER = "O";
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
  },
]);
