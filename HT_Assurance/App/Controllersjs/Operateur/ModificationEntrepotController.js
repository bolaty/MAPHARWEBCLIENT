MapharApp.controller("ModificationEntrepotController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddOperateur = {
      Nom_Prenom: "",
      Login: "",
      MotDePasse: "",
      Confirmation: "",
      Profil: "",
      Email: "",
      Telephone: "",
      id1: "",
      idModif1: "",
      N_CompteTresorerie: "",
      N_CompteCoffre: "",
      MontCaisse: "",
      NumClient: "",
      ClientDeVente: "",
      TypeOperateur: "",
      Service: "",
      operateur: "",
      PL_CODENUMCOMPTE: "",
      PL_CODENUMCOMPTECOFFREFORT: "",
      img_avatar: [],
    };
    $scope.listeModificationEntrepot = [];
    $scope.tablisteModificationEntrepot = [];
    $scope.recupereridEntr = "";
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
    $scope.initFormAddModificationEntrepot = function () {
      $scope.$emit("LOAD");
      $scope.collectionOperateur = angular.fromJson(
        localStorage.getItem("CollContratOperateur")
      );
      $scope.afficheListModificationEntrepot();
      $scope.$emit("UNLOAD");
    };
    // fin initialisation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut Developpement  Anicette

    //fin pour annuler la recherche

    //debut session generale pour le contrat operation
   
    //fin session generale pour le contrat operation

    //Debut Liste Modification ENTREPOT
    $scope.afficheListModificationEntrepot = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          SL_LIBELLEECRAN: "MODIFICATION ENTREPOT",
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
        .post("/Operateur/ListeModificationEntrepot/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeModificationEntrepot = reponse.data;
          console.log($scope.listeModificationEntrepot);
          sessionStorage.setItem(
            "codeEntrepot",
            JSON.stringify($scope.listeModificationEntrepot)
          );
          if ($scope.listeModificationEntrepot[0].EN_CODEENTREPOT != undefined) {
            for (i = 0; $scope.listeModificationEntrepot.length > i; i++) {
              if ($scope.listeModificationEntrepot[i].COCHER == "O") {
                $scope.selectedMore.push($scope.listeModificationEntrepot[i]);
              }
              // break;
            }
            console.log($scope.selectedMore);
          }
        });
    };
    //Fin Liste Modification agence

    //Debut Liste Questionnaires
    $scope.ValiderModificationEntrepot = function () {
      $scope.$emit("LOAD");
      //$scope.recuperer = JSON.parse(sessionStorage.getItem("codeEntrepot"));
      if($scope.collectionOperateur.TI_IDTIERS == undefined){
        $scope.collectionOperateur.TI_IDTIERS = ""
      }

      $scope.objet_envoie = [
        {

          "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          "PO_CODEPROFIL": $scope.collectionOperateur.PO_CODEPROFIL,
          "TO_CODETYPEOERATEUR":$scope.collectionOperateur.TO_CODETYPEOERATEUR,//$scope.collectionOperateur.TO_CODETYPEOERATEUR
          "PL_CODENUMCOMPTE":$scope.collectionOperateur.PL_CODENUMCOMPTE,//$scope.collectionOperateur.PL_CODENUMCOMPTE
          "PL_CODENUMCOMPTECOFFREFORT":$scope.collectionOperateur.PL_CODENUMCOMPTECOFFREFORT,//$scope.collectionOperateur.PL_CODENUMCOMPTECOFFREFORT
          "OP_NOMPRENOM":$scope.collectionOperateur.OP_NOMPRENOM,//$scope.collectionOperateur.OP_NOMPRENOM
          "OP_LOGIN": $scope.collectionOperateur.OP_LOGIN,//$scope.collectionOperateur.OP_LOGIN
          "OP_MOTPASSE": $scope.collectionOperateur.OP_MOTPASSE,
          "OP_ACTIF":$scope.collectionOperateur.OP_ACTIF,
          "OP_TELEPHONE":$scope.collectionOperateur.OP_TELEPHONE,
          "OP_EMAIL":$scope.collectionOperateur.OP_EMAIL,
          "OP_JOURNEEOUVERTE":$scope.collectionOperateur.OP_JOURNEEOUVERTE,
          "OP_DATESAISIE": $scope.collectionOperateur.OP_DATESAISIE,
          "OP_GESTIONNAIRE": $scope.collectionOperateur.OP_GESTIONNAIRE,
          "OP_CAISSIER": $scope.collectionOperateur.OP_CAISSIER,
          "OP_IMPRESSIONAUTOMATIQUE": $scope.collectionOperateur.OP_IMPRESSIONAUTOMATIQUE,
          "OP_MONTANTTOTALENCAISSEAUTORISE": $scope.collectionOperateur.OP_MONTANTTOTALENCAISSEAUTORISE,
          "EN_CODEENTREPOT": $scope.selectedMore[0].EN_CODEENTREPOT,
          "TI_IDTIERS": $scope.collectionOperateur.TI_IDTIERS,
          "OP_EXTOURNE": $scope.collectionOperateur.OP_EXTOURNE,
          "OP_CREATIONJOURNE": $scope.collectionOperateur.OP_CREATIONJOURNE,
          "OP_FERMETUREJOURNE":$scope.collectionOperateur.OP_FERMETUREJOURNE,
          "SR_CODESERVICE": $scope.collectionOperateur.SR_CODESERVICE,
          "OP_CREATIONPROFILE": $scope.collectionOperateur.OP_CREATIONPROFILE,
          "OP_CREATIONOPERATEUR": $scope.collectionOperateur.OP_CREATIONOPERATEUR,
          "OP_SELECTIONOPERATEURAPPRO": $scope.collectionOperateur.OP_SELECTIONOPERATEURAPPRO,
          "OP_SELECTIONOPERATEURVENTE": $scope.collectionOperateur.OP_SELECTIONOPERATEURVENTE,
          "OP_CONTREPARTIEAUTOMATIQUEOD": $scope.collectionOperateur.OP_CONTREPARTIEAUTOMATIQUEOD,
          "OP_CODEOPERATEUR": $scope.collectionOperateur.OP_CODEOPERATEUR,
          "OH_PHOTO":"",
          "OH_SIGNATURE":"",
          "SL_LIBELLEECRAN": "Saisie de Continent",
          "SL_LIBELLEMOUCHARD":"INSERTIONS",
          "TYPEOPERATION": "",
          "LG_CODELANGUE":"fr",
          "clsObjetEnvoi":
          {
            "OE_A": $rootScope.CODE_AGENCE,
            "OE_Y":$scope.collectionOperateur.OP_CODEOPERATEUR,
            "OE_J":$rootScope.DATE_JOURNEE_DE_TRAVAIL,
          }


          /*AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          PO_CODEPROFIL: $scope.collectionOperateur.PO_CODEPROFIL,
          TO_CODETYPEOERATEUR: $scope.collectionOperateur.TO_CODETYPEOERATEUR,
          PL_CODENUMCOMPTE: $scope.collectionOperateur.PL_CODENUMCOMPTE,
          PL_CODENUMCOMPTECOFFREFORT: $scope.collectionOperateur.PL_CODENUMCOMPTECOFFREFORT,
          OP_NOMPRENOM: $scope.collectionOperateur.OP_NOMPRENOM,
          OP_LOGIN: $scope.collectionOperateur.OP_LOGIN,
          OP_MOTPASSE: $scope.collectionOperateur.OP_MOTPASSE,
          OP_ACTIF: "O",
          OP_TELEPHONE: $scope.collectionOperateur.OP_TELEPHONE,
          OP_EMAIL: $scope.collectionOperateur.OP_EMAIL,
          OP_JOURNEEOUVERTE: "N",
          OP_DATESAISIE: $scope.OP_DATESAISIE,
          OP_GESTIONNAIRE: "N",
          OP_CAISSIER: "N",
          OP_IMPRESSIONAUTOMATIQUE: "N",
          OP_MONTANTTOTALENCAISSEAUTORISE: "0",
          EN_CODEENTREPOT: $scope.recupereridEntr,
          EN_DENOMINATION: $scope.EN_DENOMINATION,
          TI_IDTIERS: $scope.TI_IDTIERS,
          OP_EXTOURNE: "N",
          OP_CREATIONJOURNE: "N",
          OP_FERMETUREJOURNE: "N",
          SR_CODESERVICE: $scope.collectionOperateur.SR_CODESERVICE,
          OP_CREATIONPROFILE: "N",
          OP_CREATIONOPERATEUR: "N",
          OP_SELECTIONOPERATEURAPPRO: "N",
          OP_SELECTIONOPERATEURVENTE: "N",
          OP_CONTREPARTIEAUTOMATIQUEOD: "N",
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          COCHER: $scope.selectedMore[0].EN_CODEENTREPOT,
          TYPEOPERATION: "",
          SL_LIBELLEECRAN: "MODIFICATION ENTREPOT",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          }*/
        },
      ];

      $http
        .post("/Operateur/ModificationOperateur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tablisteModificationEntrepot = reponse.data;
          console.log($scope.tablisteModificationEntrepot);
          if (
            $scope.tablisteModificationEntrepot[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $scope.selectedMore =[]
            $rootScope.EnregistrementReussi(
              $scope.tablisteModificationEntrepot[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeModificationEntrepot[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $scope.selectedMore =[]
            $rootScope.EnregistrementNonReussi(
              tablisteModificationEntrepot[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $scope.selectedMore =[]
          $rootScope.ProblemeServeur(
            tablisteModificationEntrepot[0].clsObjetRetour.SL_MESSAGE
          );
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
      for (i = 0; $scope.listeModificationEntrepot.length > i; i++) {
        if (
          item.EN_CODEENTREPOT != $scope.listeModificationEntrepot[i].EN_CODEENTREPOT
        ) {
         
            $scope.listeModificationEntrepot[i].COCHER = "N";
            $scope.selectedMore.splice(i, 1);
        }
      }
      let idx = $scope.selectedMore.indexOf(item);
      if (idx > -1) {
        for (i = 0; $scope.listeModificationEntrepot.length > i; i++) {
          if (
            item.EN_CODEENTREPOT == $scope.listeModificationEntrepot[i].EN_CODEENTREPOT
          ) {
            if ($scope.listeModificationEntrepot[i].COCHER == "O") {
              $scope.listeModificationEntrepot[i].COCHER = "N";
              break;
            }
          }
        }

        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
        for (i = 0; $scope.listeModificationEntrepot.length > i; i++) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].EN_CODEENTREPOT) ==
              parseInt($scope.listeModificationEntrepot[i].EN_CODEENTREPOT)
            ) {
              if ($scope.listeModificationEntrepot[i].COCHER == "N") {
                $scope.listeModificationEntrepot[i].COCHER = "O";
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
    $scope.listAnnuler = function () {
      setTimeout($scope.rechargePage, 3600);
    };
    //fin pour annuler la recherche

    //fin Developpement Anicette
  },
]);
