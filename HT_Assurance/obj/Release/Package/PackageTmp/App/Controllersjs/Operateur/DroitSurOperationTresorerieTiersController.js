MapharApp.controller("DroitSurOperationTresorerieTiersController", [
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
    $scope.FormListDroitSurOperationTresorerieTiers = {
      Nature_Famille: "",
      FamilleOperation: "",
    };
    $scope.listeDroitSurOperationTresorerieTiers = [];
    $scope.listeNatureFamille = [];
    $scope.listeFamilleOperation = [];
    /*FIN ZONE DE DECLARATION*/

    //DEBUT FONCTION GENERALE

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut initialisation Droit Sur Operation Tresorerie Tiers
    $scope.initFormAddDroitSurOperationTresorerieTiers = function () {
      $scope.$emit("LOAD");
      $scope.afficheListNatureFamille();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation Droit Sur Operation Tresorerie Tiers

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
          SL_LIBELLEECRAN: "Droit Sur Operation Tresorerie Tiers",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "02",
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
    $scope.afficheListeFamilleOperation = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          NF_CODENATUREFAMILLEOPERATION:
            $scope.FormListDroitSurOperationTresorerieTiers.Nature_Famille,
          SL_LIBELLEECRAN: "FAMILLE OPERATION",
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

    //Debut Liste Droit Sur Operation Tresorerie Tiers
    $scope.afficheListDroitSurOperationTresorerieTiers = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          NF_CODENATUREFAMILLEOPERATION:
            $scope.FormListDroitSurOperationTresorerieTiers.Nature_Famille,
          FO_CODEFAMILLEOPERATION:
            $scope.FormListDroitSurOperationTresorerieTiers.FamilleOperation,
          SL_LIBELLEECRAN: "Droit Sur Operation Tresorerie Tiers",
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
          $scope.listeDroitSurOperationTresorerieTiers = reponse.data;
          console.log($scope.listeDroitSurOperationTresorerieTiers);
          if (
            $scope.listeDroitSurOperationTresorerieTiers[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDroitSurOperationTresorerieTiers[0].clsObjetRetour
                .SL_MESSAGE
            );
          } else {
            for (
              i = 0;
              $scope.listeDroitSurOperationTresorerieTiers.length > i;
              i++
            ) {
              if (
                $scope.listeDroitSurOperationTresorerieTiers[i].COCHER == "O"
              ) {
                $scope.selectedMore.push(
                  $scope.listeDroitSurOperationTresorerieTiers[i]
                );
              }
            }
            console.log($scope.selectedMore);
          }
        });
    };
    //Fin Liste Droit Sur Operation Tresorerie Tiers

    //Debut validation famille operation
    $scope.ValiderDroitSurOperationTresorerieTiers = function () {
      $scope.$emit("LOAD");
      $scope.clsCtcontratgaranties = [];
      for (
        var i = 0;
        i < $scope.listeDroitSurOperationTresorerieTiers.length;
        i++
      ) {
        /* for (var j = 0; j < $scope.selectedMore.length; j++) {
                        if ($scope.selectedMore[j].NO_CODENATUREOPERATION == $scope.listeDroitSurOperationTresorerieTiers[i].NO_CODENATUREOPERATION) {

                            if ($scope.listeDroitSurOperationTresorerieTiers[i].COCHER == "O") {
                                $scope.listeDroitSurOperationTresorerieTiers[i].COCHER = "N";
                                break;
                            }
                            if ($scope.listeDroitSurOperationTresorerieTiers[i].COCHER == "N") {
                                $scope.listeDroitSurOperationTresorerieTiers[i].COCHER = "O";
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
            $scope.FormListDroitSurOperationTresorerieTiers.Nature_Famille,
          COCHER: "",
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "Droit Sur Operation Tresorerie Tiers",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        };
        //$scope.objetGarentie.OP_CODEOPERATEUR = $scope.collectionOperateur.OP_CODEOPERATEUR;
        $scope.objetGarentie.FO_CODEFAMILLEOPERATION =
          $scope.listeDroitSurOperationTresorerieTiers[
            i
          ].FO_CODEFAMILLEOPERATION;
        $scope.objetGarentie.NO_CODENATUREOPERATION =
          $scope.listeDroitSurOperationTresorerieTiers[
            i
          ].NO_CODENATUREOPERATION;
        $scope.objetGarentie.COCHER =
          $scope.listeDroitSurOperationTresorerieTiers[i].COCHER;
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
          $scope.listeDroitSurOperationTresorerieTiers = reponse.data;
          console.log($scope.listeDroitSurOperationTresorerieTiers);
          if (
            $scope.listeFamilleOperation[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.listeDroitSurOperationTresorerieTiers[0].clsObjetRetour
                .SL_MESSAGE
            );
            $scope.listeDroitSurOperationTresorerieTiers[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
            $scope.selectedMore = [];
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDroitSurOperationTresorerieTiers[0].clsObjetRetour
                .SL_MESSAGE
            );
            $scope.selectedMore = [];
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDroitSurOperationTresorerieTiers[0].clsObjetRetour
              .SL_MESSAGE
          );
          $scope.selectedMore = [];
        });
    };
    //Fin validation famille operation

    //fonction pour les cases à cocher
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
        for (
          i = 0;
          $scope.listeDroitSurOperationTresorerieTiers.length > i;
          i++
        ) {
          if (
            item.NO_CODENATUREOPERATION ==
            $scope.listeDroitSurOperationTresorerieTiers[i]
              .NO_CODENATUREOPERATION
          ) {
            if ($scope.listeDroitSurOperationTresorerieTiers[i].COCHER == "O") {
              $scope.listeDroitSurOperationTresorerieTiers[i].COCHER = "N";
              break;
            }
          }
        }

        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
        for (
          i = 0;
          $scope.listeDroitSurOperationTresorerieTiers.length > i;
          i++
        ) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].NO_CODENATUREOPERATION) ==
              parseInt(
                $scope.listeDroitSurOperationTresorerieTiers[i]
                  .NO_CODENATUREOPERATION
              )
            ) {
              if (
                $scope.listeDroitSurOperationTresorerieTiers[i].COCHER == "N"
              ) {
                $scope.listeDroitSurOperationTresorerieTiers[i].COCHER = "O";
                break;
              }
            }
          }
        }
      }

      console.log($scope.selectedMore);
      /*  let idx = $scope.selectedMore.indexOf(item)
                if (idx > -1) {
                    $scope.selectedMore.splice(idx, 1)
                } else {
                    $scope.selectedMore.push(item)
                }*/
    };

    //debut pour annuler la recherche
    $scope.listAnnuler = function () {
      setTimeout($scope.rechargePage, 3600);
    };
    //fin pour annuler la recherche
    //DEV ANICETTE
  },
]);
