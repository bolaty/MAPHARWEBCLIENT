MapharApp.controller("DroitSurCompteController", [
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
    $scope.FormListDroitSurCompte = {
      Ecran: "",
      Nature_Famille: "",
      FamilleOperation: "",
    };
    $scope.listeDroitSurCompte = [];
    $scope.listeNatureFamille = [];
    $scope.listeFamilleOperation = [];
    $scope.listeEcran = [];
    $scope.testValidation = [];
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

    //debut initialisation Droit  Sur  Compte
    $scope.initFormAddDroitSurCompte = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeEcran();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation Droit  Sur  Compte

    // FIN FONCTION GENERALE

    //DEV ANICETTE

    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

    //Debut Liste Ecran
    $scope.afficheListeEcran = function () {
      $scope.listeDroitSurCompte = [];
      $scope.listeFamilleOperation = []
      $scope.objet_envoie = [
        {
          OB_CODEOBJET: "",
          SL_LIBELLEECRAN: "Droit  Sur  Compte",
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
        .post("/Ecran/ListeDroitEcran/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEcran = reponse.data;
          $scope.listeFamilleOperation =[]
          console.log($scope.listeEcran);
        });
    };
    //Fin Liste Ecran

    //Debut Liste Nature Famille
    $scope.afficheListNatureFamille = function () {
      $scope.listeFamilleOperation =[]
      if($scope.FormListDroitSurCompte.Ecran == 638){
        $scope.objet_envoie = [
          {

            "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
            "NF_CODENATUREFAMILLEOPERATION":"01",
            "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            }

           
          },
        ];
      }

      if($scope.FormListDroitSurCompte.Ecran == 639){
        $scope.objet_envoie = [
          {

            "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
            "NF_CODENATUREFAMILLEOPERATION":"02",
            "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            }

           
          },
        ];
      }
      if($scope.FormListDroitSurCompte.Ecran == 640){
        $scope.objet_envoie = [
          {

            "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
            "NF_CODENATUREFAMILLEOPERATION":"03",
            "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            }

           
          },
        ];
      }
      if($scope.FormListDroitSurCompte.Ecran == 641){
        $scope.objet_envoie = [
          {

            "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
            "NF_CODENATUREFAMILLEOPERATION":"03",
            "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            }

           
          },
        ];
      }
     
      if($scope.FormListDroitSurCompte.Ecran == 642){
        $scope.objet_envoie = [
          {

            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD":"INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            }

           
          },
        ];
        $http
        .post("/ListeFamilleOperation/ListeFamilleOperationversement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureFamille = reponse.data;
          $scope.listeDroitSurCompte = [];
          console.log($scope.listeNatureFamille);
        });
      }else{
        $http
        .post("/ListeFamilleOperation/ListeFamilleOperation/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureFamille = reponse.data;
          $scope.listeDroitSurCompte = [];
          console.log($scope.listeNatureFamille);
        });
      }
     
    };
    //Fin Liste Nature Famille

    //Debut Liste Famille Operation
    $scope.afficheListeFamilleOperation = function () {
      if($scope.FormListDroitSurCompte.Ecran == 638){
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
            FO_CODEFAMILLEOPERATION: $scope.FormListDroitSurCompte.Nature_Famille,
            NF_CODENATUREFAMILLEOPERATION:
              "01",
            SL_LIBELLEECRAN: "Droit  Sur  Compte",
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
      }
      if($scope.FormListDroitSurCompte.Ecran == 639){
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
            FO_CODEFAMILLEOPERATION: $scope.FormListDroitSurCompte.Nature_Famille,
            NF_CODENATUREFAMILLEOPERATION:
              "02",
            SL_LIBELLEECRAN: "Droit  Sur  Compte",
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
      }
      if($scope.FormListDroitSurCompte.Ecran == 640){
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
            FO_CODEFAMILLEOPERATION: $scope.FormListDroitSurCompte.Nature_Famille,
            NF_CODENATUREFAMILLEOPERATION:
              "03",
            SL_LIBELLEECRAN: "Droit  Sur  Compte",
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
      }
      if($scope.FormListDroitSurCompte.Ecran == 641){
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
            FO_CODEFAMILLEOPERATION: $scope.FormListDroitSurCompte.Nature_Famille,
            NF_CODENATUREFAMILLEOPERATION:
              "04",
            SL_LIBELLEECRAN: "Droit  Sur  Compte",
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
      }
     if($scope.FormListDroitSurCompte.Ecran == 642){
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          FO_CODEFAMILLEOPERATION: $scope.FormListDroitSurCompte.Nature_Famille,
          NF_CODENATUREFAMILLEOPERATION:
            "04",
          SL_LIBELLEECRAN: "Droit  Sur  Compte",
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
        "/FamilleOperationTresorerie/ListeplancompableVersement/",
        $scope.objet_envoie,
        {
          //headers: $scope.headers
        }
      )
      .then(function (reponse) {
        $scope.listeFamilleOperation = reponse.data;
        $scope.listeDroitSurCompte = [];
        console.log($scope.listeFamilleOperation);
      });
     }else{
      $http
      .post(
        "/FamilleOperationTresorerie/Listeplancompable/",
        $scope.objet_envoie,
        {
          //headers: $scope.headers
        }
      )
      .then(function (reponse) {
        $scope.listeFamilleOperation = reponse.data;
        $scope.listeDroitSurCompte = [];
        console.log($scope.listeFamilleOperation);
      });
     }
     
    };
    //Fin Liste Famille Operation

    //Debut Liste Droit  Sur  Compte
    $scope.afficheListDroitSurCompte = function () {
      $scope.selectedMore = [];
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          NO_CODENATUREOPERATION:
            $scope.FormListDroitSurCompte.FamilleOperation,
          FO_CODEFAMILLEOPERATION:
            $scope.FormListDroitSurCompte.FamilleOperation,
          OB_CODEOBJET: $scope.FormListDroitSurCompte.Ecran,
          SL_LIBELLEECRAN: "Droit  Sur  Compte",
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
        .post("/DroitSurCompte/ListeDroitSurCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeDroitSurCompte = reponse.data;
          console.log($scope.listeDroitSurCompte);
          if (
            $scope.listeDroitSurCompte[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDroitSurCompte[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            for (i = 0; $scope.listeDroitSurCompte.length > i; i++) {
              if ($scope.listeDroitSurCompte[i].COCHER == "O") {
                $scope.selectedMore.push($scope.listeDroitSurCompte[i]);
              }
              // break;
            }
            console.log($scope.selectedMore);
          }
        });
    };
    //Fin Liste Droit  Sur  Compte

    //Debut validation Droit  Sur  Compte
    $scope.ValiderDroitSurCompte = function () {
      $scope.$emit("LOAD");
      $scope.clsCtcontratgaranties = [];
      for (var i = 0; i < $scope.listeDroitSurCompte.length; i++) {
        /* for (var j = 0; j < $scope.selectedMore.length; j++) {
          if (
            $scope.selectedMore[j].PL_CODENUMCOMPTE ==
            $scope.listeDroitSurCompte[i].PL_CODENUMCOMPTE
          ) {
            if ($scope.listeDroitSurCompte[i].COCHER == "O") {
              $scope.listeDroitSurCompte[i].COCHER = "N";
              break;
            }
            if ($scope.listeDroitSurCompte[i].COCHER == "N") {
              $scope.listeDroitSurCompte[i].COCHER = "O";
              break;
            }
          }
        }*/

        $scope.objetGarentie = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          NO_CODENATUREOPERATION:
            $scope.FormListDroitSurCompte.FamilleOperation,
          OB_CODEOBJET: $scope.FormListDroitSurCompte.Ecran,
          PL_CODENUMCOMPTE: "",
          COCHER: "",
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "DROIT SUR COMPTE",
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
        $scope.objetGarentie.PL_CODENUMCOMPTE =
          $scope.listeDroitSurCompte[i].PL_CODENUMCOMPTE;
        $scope.objetGarentie.COCHER = $scope.listeDroitSurCompte[i].COCHER;
        //$scope.objetGarentie.NO_CODENATUREOPERATION = $scope.listeDroitSurCompte[i].NO_CODENATUREOPERATION;
        $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetGarentie.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }
      $scope.objet_envoie = $scope.clsCtcontratgaranties;

      $http
        .post("/DroitSurCompte/AjoutDroitSurCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDroitSurCompte = reponse.data;
          console.log($scope.listeDroitSurCompte);
          if (
            $scope.listeDroitSurCompte[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $scope.selectedMore = [];
            $rootScope.EnregistrementReussi(
              $scope.listeDroitSurCompte[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeDroitSurCompte[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $scope.selectedMore = [];
            $rootScope.EnregistrementNonReussi(
              $scope.listeDroitSurCompte[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $scope.selectedMore = [];
          $rootScope.ProblemeServeur(
            $scope.listeDroitSurCompte[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin validation Droit  Sur  Compte

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
        for (i = 0; $scope.listeDroitSurCompte.length > i; i++) {
          if (item.PL_NUMCOMPTE == $scope.listeDroitSurCompte[i].PL_NUMCOMPTE) {
            if ($scope.listeDroitSurCompte[i].COCHER == "O") {
              $scope.listeDroitSurCompte[i].COCHER = "N";
              break;
            }
          }
        }

        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
        for (i = 0; $scope.listeDroitSurCompte.length > i; i++) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].PL_NUMCOMPTE) ==
              parseInt($scope.listeDroitSurCompte[i].PL_NUMCOMPTE)
            ) {
              if ($scope.listeDroitSurCompte[i].COCHER == "N") {
                $scope.listeDroitSurCompte[i].COCHER = "O";
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
    //fonction pour les cases à cocher

    //debut pour annuler la recherche
    $scope.listAnnuler = function () {
      setTimeout($scope.rechargePage, 3600);
    };
    //fin pour annuler la recherche
    //DEV ANICETTE
  },
]);
