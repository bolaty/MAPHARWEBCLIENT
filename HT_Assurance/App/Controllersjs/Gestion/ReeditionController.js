MapharApp.controller("ReeditionController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",

  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken
    $scope.numBordereau = ""
    $scope.listRecuImpression = []
    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut test sur les date
    $scope.dateSuperioriteDebut = function (dateDebut) {
      if (dateDebut != "") {
        let nouvelleDate = new Date();
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    $scope.dateSuperioriteFin = function (dateFin) {
      if (dateFin != "") {
        let nouvelleDate = new Date();
        nouvelleDate.setFullYear(dateFin.substr(6, 4));
        nouvelleDate.setMonth(dateFin.substr(3, 2));
        nouvelleDate.setDate(dateFin.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    //fin test sur les date

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idNumBordereau2").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumAssureur").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumCompte").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idRefPiece").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idMontant").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
      };

      return {
        // public functions
        init: function () {
          demos();
        },
      };
    })();

    jQuery(document).ready(function () {
      KTBootstrapMaxlength.init();
    });
    //debut limite des champs

    //debut determine une annee bissetile
    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };
    //fin determine une annee bissetile

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#numBordereau").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        
      });
    };
    //debut liste operateur
    $scope.afficheListeRecuImpression = function () {
      $scope.desactiverChampRequisListe()
      if (
        $scope.numBordereau == "" ||
        $scope.numBordereau == undefined
      ) {
        $("#numBordereau").css("background-color", "#FFE9E0");
        $rootScope.ChampsNonRenseignes();
      } else{
        $scope.objet_envoie = [
          {
            "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
            "MV_NUMPIECE": "0",
            "MV_NUMBORDEREAU": $scope.numBordereau,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "LG_CODELANGUE": "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
  
        $http
          .post("/RecuImpression/ListeRecuImpression/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listRecuImpression = reponse.data;
            if (
              $scope.listRecuImpression[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $http
                .post(
                  "/ZoneEditionCombo/pvgAfficherEtat2/",
                  $scope.listRecuImpression
                )
                .then(function (result) {
                  if (result.data[0].SL_RESULTAT == "TRUE") {
                    toastr["success"](result.data[0].SL_MESSAGE); // Affichage de la notification de succes
                    $window.open(result.data[0].SL_PATH_FILE, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
                  } else {
                    toastr["error"](result.data[0].SL_MESSAGE); // Affichage de la notification de erreur
                  }
                  $scope.loading = false; // Arrêt du chargement
                });
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi($scope.listRecuImpression[0].clsObjetRetour.SL_MESSAGE);
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.listRecuImpression[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
     
    };
    //fin liste 

   

    /*FIN DEV bolaty*/
  },
]);
