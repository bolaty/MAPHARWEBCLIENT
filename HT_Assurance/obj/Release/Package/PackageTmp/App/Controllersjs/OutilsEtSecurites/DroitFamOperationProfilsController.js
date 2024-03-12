MapharApp.controller("DroitFamOperationProfilsController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    $rootScope.idcontratOP = angular.fromJson(
      localStorage.getItem("idcontratOP")
    );
    console.log($rootScope.idcontratOP);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.appelServiceWeb = $rootScope.ADRESSESERV;//"http://192.168.1.99:6033/Service/";

    $scope.objet_envoie = [];
    $scope.FormListFamilleOperation = {
      Nature_Famille: "",
    };
    $scope.listeNatureFamille = [];
    $scope.listeFamilleOperation = [];
    $scope.ajoutListeFamilleOperation = [];
    $scope.statutlist = false;
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

    //debut contrainte sur les champs list
    $scope.contrainteFormlistFamilleOperation = function () {
      FormValidation.formValidation(
        document.getElementById("formListFamilleOperation"),
        {
          fields: {
            listFamilleOperation_Nat_Famille: {
              validators: {
                notEmpty: {
                  message: "Veuillez selectionner une nature  de famille.",
                },
              },
            },
            plugins: {
              trigger: new FormValidation.plugins.Trigger(),
              // Bootstrap Framework Integration
              bootstrap: new FormValidation.plugins.Bootstrap(),
              // Validate fields when clicking the Submit button
              submitButton: new FormValidation.plugins.SubmitButton(),
              // Submit the form when all fields are valid
              //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
          },
        }
      );
    };
    //fin contrainte sur les champs list

    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

    //Debut Liste droit agence
    $scope.afficheListNatureFamille = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "DROIT_SUR_FAMILLE_OPERATION",
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
        .post("/NatureFamille/ListeNatureFamille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeNatureFamille = reponse.data;
          console.log($scope.listeNatureFamille);
        });
    };
    //Fin Liste droit agence

    //Debut Liste famille operation
    $scope.afficheListFamilleOperation = function (idcode) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = {
        Objet: [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            NF_CODENATUREFAMILLEOPERATION: idcode,
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
            "wsLogicielobjettypeoperationprofilweb.svc/pvgChargerDansDataSet",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeFamilleOperation = JSON.parse(reponse.data);
          $scope.listeFamilleOperation = $scope.listeFamilleOperation.TABLE;
          console.log($scope.listeFamilleOperation);
          $rootScope.infoBulleNombre = $scope.listeFamilleOperation.length;
          $rootScope.listeOn = $scope.listeFamilleOperation[0].SL_MESSAGE;
          if ($scope.listeFamilleOperation[0].SL_RESULTAT === "FALSE") {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeFamilleOperation[0].SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");

            if ($scope.listeFamilleOperation[0].FO_NUMEROORDRE != undefined) {
              for (i = 0; $scope.listeFamilleOperation.length > i; i++) {
                if ($scope.listeFamilleOperation[i].COCHER == "O") {
                  $scope.selectedMore.push($scope.listeFamilleOperation[i]);
                }
                // break;
              }
              console.log($scope.selectedMore);
              $scope.statutlist = true;
            }
          }
        });
    };
    //Fin Liste famille operation

    //Debut validation famille operation
    $scope.ValiderFamilleOperation = function () {
      $scope.$emit("LOAD");
      if (
        $scope.FormListFamilleOperation.Nature_Famille == "" ||
        $scope.FormListFamilleOperation.Nature_Famille === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormListFamilleOperation.Nature_Famille == "" ||
            $scope.FormListFamilleOperation.Nature_Famille === undefined
          ) {
            $("#listFamilleOperation_Nat_Famille").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $scope.messageErreur = "Veuillez renseigner la nature famille";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.clsCtcontratgaranties = [];
        for (var i = 0; i < $scope.listeFamilleOperation.length; i++) {
          /* for (var j = 0; j < $scope.selectedMore.length; j++) {
            if (
              $scope.selectedMore[j].FO_CODEFAMILLEOPERATION ==
              $scope.listeFamilleOperation[i].FO_CODEFAMILLEOPERATION
            ) {
              if ($scope.listeFamilleOperation[i].COCHER == "O") {
                $scope.listeFamilleOperation[i].COCHER = "N";
                break;
              }
              if ($scope.listeFamilleOperation[i].COCHER == "N") {
                $scope.listeFamilleOperation[i].COCHER = "O";
                break;
              }
            }
          } */

          $scope.objetGarentie = {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            PO_CODEPROFILWEB: "",
            FO_CODEFAMILLEOPERATION: "",
            NF_CODENATUREFAMILLEOPERATION: "",
            COCHER: "",
            LO_ACTIF: "O",
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
          ($scope.objetGarentie.PO_CODEPROFILWEB =
            $scope.collectionOperateur.PO_CODEPROFILWEB),
            ($scope.objetGarentie.FO_CODEFAMILLEOPERATION =
              $scope.listeFamilleOperation[i].FO_CODEFAMILLEOPERATION);
          $scope.objetGarentie.NF_CODENATUREFAMILLEOPERATION =
            $scope.FormListFamilleOperation.Nature_Famille;
          $scope.objetGarentie.COCHER = $scope.listeFamilleOperation[i].COCHER;

          $scope.clsCtcontratgaranties.push($scope.objetGarentie);
        }
        $scope.objet_envoie = { Objet: $scope.clsCtcontratgaranties };

        $http
          .post(
            $scope.appelServiceWeb +
              "wsLogicielobjettypeoperationprofilweb.svc/pvgAjouterListe",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.ajoutListeFamilleOperation = JSON.parse(reponse.data);
            $scope.ajoutListeFamilleOperation =
              $scope.ajoutListeFamilleOperation.TABLE;
            console.log($scope.ajoutListeFamilleOperation);
            $scope.nombreInfoBulle = $scope.ajoutListeFamilleOperation.length;
            if ($scope.ajoutListeFamilleOperation[0].SL_RESULTAT == "TRUE") {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.ajoutListeFamilleOperation[0].SL_MESSAGE
              );
              $scope.statutlist = true;
              $scope.selectedMore = [];
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.ajoutListeFamilleOperation[0].SL_MESSAGE
              );
              $scope.statutlist = true;
              $scope.selectedMore = [];
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.ajoutListeFamilleOperation[0].SL_MESSAGE
            );
            $scope.statutlist = true;
            $scope.selectedMore = [];
          });
      }
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
        for (i = 0; $scope.listeFamilleOperation.length > i; i++) {
          if (
            item.FO_CODEFAMILLEOPERATION ==
            $scope.listeFamilleOperation[i].FO_CODEFAMILLEOPERATION
          ) {
            if ($scope.listeFamilleOperation[i].COCHER == "O") {
              $scope.listeFamilleOperation[i].COCHER = "N";
              break;
            }
          }
        }

        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
        for (i = 0; $scope.listeFamilleOperation.length > i; i++) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].FO_CODEFAMILLEOPERATION) ==
              parseInt($scope.listeFamilleOperation[i].FO_CODEFAMILLEOPERATION)
            ) {
              if ($scope.listeFamilleOperation[i].COCHER == "N") {
                $scope.listeFamilleOperation[i].COCHER = "O";
                break;
              }
            }
          }
        }
      }

      console.log($scope.selectedMore);
      /* let idx = $scope.selectedMore.indexOf(item)
                    if (idx > -1) {
                        $scope.selectedMore.splice(idx, 1)
                    } else {
                        $scope.selectedMore.push(item)
                    }*/
    };
    //CASE A COCHER SUR LA LISTE

    //debut pour annuler la recherche
    $scope.listeFamilleOperationAnnuler = function () {
      $scope.FormListFamilleOperation.Nature_Famille = "";
    };
    //fin pour annuler la recherche

    //fin Developpement Anicette
  },
]);
