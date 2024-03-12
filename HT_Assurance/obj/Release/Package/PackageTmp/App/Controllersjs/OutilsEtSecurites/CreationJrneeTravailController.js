MapharApp.controller("CreationJrneeTravailController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddCreationJrneeTravail = {
      Date: "",
    };
    $scope.listeCreationJrneeTravail = [];
    $scope.nombreInfoBulle = "";
    $scope.tablisteCreationJrneeTravail = [];
    $scope.testSuppressionJrneeTravail = [];
    $scope.listeCreationExercice = []
    $scope.lAnneeExercie = ""
    $scope.lAnneeEffet = ""
    $scope.leMoisEffet = ""
    $scope.leJourEffet = ""
   // $scope.listeCreationExercice = []
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

    //debut recharge page
    $scope.rechargePage = function () {
      window.location.reload();
    };
    //debut recharge page
    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };
    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    //debut initialisation
    $scope.initFormAddCreationJrneeTravail = function () {
      $scope.$emit("LOAD");
      $scope.afficheListCreationJrneeTravail();
      $scope.afficheListExercice()
      $scope.$emit("UNLOAD");
    };
   /* $scope.initAjoutCreationJrneeTravail = function () {
      $scope.$emit("LOAD");
      $scope.afficheListExercice()
      $scope.$emit("UNLOAD");
    };*/
    // fin initialisation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut Developpement  Anicette

    //debut recuperer id pour la suppression du contrat
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du contrat

    //debut  suppression
    $scope.supprimeJrneeTravail = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          JT_DATEJOURNEETRAVAIL: $scope.idElement,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEMOUCHARD: "SUPPRESSION",
          TYPEOPERATION: "2",
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
          "/LaJourneeDeTravail/SuppressionJourneeTravail/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.testSuppressionJrneeTravail = reponse.data;
          console.log($scope.testSuppressionJrneeTravail);
          if (
            $scope.testSuppressionJrneeTravail[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppressionJrneeTravail[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeCreationJrneeTravail[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
            $scope.rechargePage();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.testSuppressionJrneeTravail[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.testSuppressionJrneeTravail[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin  suppression

    $scope.afficheListExercice = function () {
      $scope.$emit("LOAD");
      // console.log($rootScope.DATE_EXERCICE);
      $scope.objet_envoie = [
        {

            "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "1",
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
        .post("/Exercice/SELECTExercice/", $scope.objet_envoie, {
            //headers: $scope.headers
        })
        .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeCreationExercice = reponse.data;
          //  $scope.nombreInfoBulle = $scope.listeCreationExercice.length;
            console.log($scope.listeCreationExercice);
            if (
              $scope.listeCreationExercice[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
                $scope.$emit("UNLOAD");

              //  sessionStorage.setItem("vpaffliste", JSON.stringify($scope.listeCreationExercice));

               // $scope.verouadd = false
            } else {
                $scope.$emit("UNLOAD");
               /* $scope.verouadd = true
                $rootScope.MessageDesListes(
                  $scope.listeCreationExercice[0].clsObjetRetour.SL_MESSAGE
                );*/
            }
        });
  };




    //Debut Liste CREATION JOURNEE DE TRAVAIL
    $scope.afficheListCreationJrneeTravail = function () {
      $scope.$emit("LOAD");
      console.log($rootScope.DATE_EXERCICE);
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EX_EXERCICE: $rootScope.DATE_EXERCICE,
          JT_STATUT: "",
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
        .post("/LaJourneeDeTravail/ListeJourneeTravail/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeCreationJrneeTravail = reponse.data;
          $scope.nombreInfoBulle = $scope.listeCreationJrneeTravail.length;
          console.log($scope.listeCreationJrneeTravail);
        });
    };
    //Fin Liste CREATION JOURNEE DE TRAVAIL

    $scope.desactiverChampRequisfromExercice = function () {
      $(document).ready(function () {
          $("#idDate").focusin(function () {
              $(this).css("background-color", "#FFFFFF");
          });
         

      });
  };
    //Debut Liste CREATION JOURNEE DE TRAVAIL
    $scope.ValiderCreationJrneeTravail = function (jrneeTravail) {
      $scope.$emit("LOAD");
      let typeDate =
      /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      $scope.lAnneeExercie = parseInt($scope.listeCreationExercice[0].EX_EXERCICE)
      if (jrneeTravail !== undefined || jrneeTravail !== "") {

        $scope.lAnneeEffet = jrneeTravail.substr(6, 4);
        $scope.leMoisEffet = jrneeTravail.substr(3, 2);
        $scope.leJourEffet = jrneeTravail.substr(0, 2);
       
      }
      
      if(jrneeTravail == undefined || jrneeTravail == "" || jrneeTravail == null){
        $scope.$emit("UNLOAD");
        $rootScope.EnregistrementNonReussi(
          "veuillez renseignez une journée de travail svp !!!"
        );
      } else if (typeDate.test(jrneeTravail) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une dates effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.jrneeTravail) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de la journée n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.jrneeTravail) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de la journée n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if(parseInt($scope.lAnneeEffet)  > $scope.lAnneeExercie){
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "L' exercice pour cette journée n'a pas encore été crée !!!";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else{
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            JT_DATEJOURNEETRAVAIL: jrneeTravail,
            JT_STATUT: "O",
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
          .post("/LaJourneeDeTravail/AjoutJourneeTravail/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.tablisteCreationJrneeTravail = reponse.data;
            console.log($scope.tablisteCreationJrneeTravail);
            if (
              $scope.tablisteCreationJrneeTravail[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.tablisteCreationJrneeTravail[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.resetFormAddCreationJrneeTravail();
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.tablisteCreationJrneeTravail[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur();
          });
      }


     
    };
    //Fin Liste CREATION JOURNEE DE TRAVAIL

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddCreationJrneeTravail = function () {
      $(document).ready(function () {
        $("#idDate").css("background-color", "#FFFFFF");
      });
      $scope.FormAddCreationJrneeTravail = {};
      $scope.initFormAddCreationJrneeTravail();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //fin Developpement Anicette
  },
]);
