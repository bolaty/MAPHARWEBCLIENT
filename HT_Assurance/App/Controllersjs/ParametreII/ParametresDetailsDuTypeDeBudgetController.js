MapharApp.controller("ParametresDetailsDuTypeDeBudgetController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.infocontrat = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    /*DEBUT ZONE DE DECLARATION */
  
   
      // type budget variable a supprime
      $scope.libellesearch = "";
      $scope.listetypebudget =[];
      $scope.testEnregistrement = [];
      $scope.recuperation = [];
      $scope.verou = true;
      $scope.FormAdddetailTypeBudget = {
        Code: "",
        Libelle:""
      }
      //fin type

      $scope.typebudjetsearch = "";
      $scope.listeDestypedetaille = []
      $scope.idElement = ""
      $scope.idElement1 = ""
      $scope.iddetailtypebudget = ""
      $scope.idtypebudget = ""
      $scope.varEnregistrement = false
      $scope.recuperertypebudget = []
     // $scope.testSuppression = []
    /*FIN ZONE DE DECLARATION*/
    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader
   
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

    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#Libelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
       
      });
    };
    $scope.desactiverChampRquis1 = function () {
      $(document).ready(function () {
        $("#typebudjetsearch").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
       
      });
    };

 
    /*DEBUT FONCTION GENERALE*/
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

    //debut notification champs non renseigné

    //fin notification champs non renseigné

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    $scope.initFormAdddetailenregistrement = function () {
      $scope.$emit("LOAD");
      $scope.FormAdddetailTypeBudget.Code = JSON.parse(localStorage.getItem("enrgODdetailtypebudget"));
      $scope.$emit("UNLOAD");
    };
    $scope.initFormAdddetail = function () {
      $scope.$emit("LOAD");
      $scope.afficheListetypebudget()
      $scope.$emit("UNLOAD");
    };
    //debut initialisation add modif
    $scope.initFormAddModif = function () {
      $scope.$emit("LOAD");
      $scope.retourModifODSP();
      $scope.$emit("UNLOAD");
     
    };
    //fin initialisation add modif


    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV OVER*/

   

 
    //fin contrainte sur les champs list
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAdddetailtypebudjet = function () {
      $scope.$emit("LOAD");
      $scope.FormAdddetailTypeBudget.Libelle = ""
     
      $scope.$emit("UNLOAD");
      // $scope.rechargePage();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement
    $scope.testsave = function (inf) {
     
      if($scope.varEnregistrement == true){
        localStorage.setItem("enrgODdetailtypebudget", JSON.stringify(inf));
        
        window.location.href = "#/ParametreII/EnregistrementDetailsDuTypeDeBudget/Enregistrement";
      }else{
        $("#typebudjetsearch").css("background-color", "#FFE9E0");
        $scope.messageErreur =
        "Veuillez selectionner un type de budget svp ";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }
    };
   
    //debut liste des ZONE
    $scope.afficheListetypebudget = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
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
      ];

      $http
        .post("/TypeBudgetParamII/COMBOParamII/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDestypebudget = reponse.data;
         
        });
    };
    //fin liste des ZONE
  

    //Debut ajout 
    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAdddetailtypebudjet = function () {
      $scope.$emit("LOAD");
      $scope.varEnregistrement = false
      $scope.desactiverChampRquis();
      
      $scope.recuperertypebudget = JSON.parse(sessionStorage.getItem("vpSavetypebudget"));
      $scope.recuperation = angular.fromJson(localStorage.getItem("modifODdetailtypebudget"));
      console.log($scope.recuperation);
    
       // let typenumerotelephone = /^(0|[0-9]\d*)$/;
      
     
      if (
       
        $scope.FormAdddetailTypeBudget.Libelle === "" ||
        $scope.FormAdddetailTypeBudget.Libelle === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          
          if (
            $scope.FormAdddetailTypeBudget.Libelle === "" ||
            $scope.FormAdddetailTypeBudget.Libelle === undefined
          ) {
            $("#Libelle").css("background-color", "#FFE9E0");
           
          }
        });
        $rootScope.ChampsNonRenseignes();
      }  else {
        if ($scope.etatForm == "2") {
          $scope.iddetailtypebudget = $scope.recuperation.BD_CODETYPEBUDGETDETAIL;
          $scope.idtypebudget = $scope.recuperation.BT_CODETYPEBUDGET;
        //  $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.recuperertypebudget = JSON.parse(localStorage.getItem("enrgODdetailtypebudget"));
          $scope.idtypebudget = $scope.recuperertypebudget
          $scope.SL_LIBELLEMOUCHARD = "INSERTIONS";
        }
        if($scope.iddetailtypebudget == undefined){
          $scope.iddetailtypebudget =""
        }
        if($scope.idtypebudget == undefined){
          $scope.idtypebudget =""
        }
        $scope.objet_envoie = [
          {
            "BT_CODETYPEBUDGET": $scope.idtypebudget,
            "BD_CODETYPEBUDGETDETAIL": $scope.iddetailtypebudget,
            "BD_LIBELLE": $scope.FormAdddetailTypeBudget.Libelle,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE": "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
        if ($scope.etatForm !== "2") {
          $http
            .post("/TypeBudgetdetailleParamII/INSERTParamII/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation=[]
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
               
                $scope.resetFormAdddetailtypebudjet();

                //  $scope.initFormAddExpert()
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/TypeBudgetdetailleParamII/UPDATEParamII/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation=[]
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href = "#/ParametreII/DetailsDuTypeDeBudget/liste";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                }
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout 

   
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpSdetailtypebudget", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpSdetailtypebudget"));
    };
    //fin voir plus

    //debut acceder a la page de modification 1
    $scope.voirModification = function (info) {
      localStorage.setItem("modifODdetailtypebudget", JSON.stringify(info));
    //  window.location.href = "#/ModificationsuiviDossierSP";
    window.location.href = "#/ParametreII/EnregistrementDetailsDuTypeDeBudget/DetailsDuTypeDeBudgetModification";
    };
    //fin acceder a la page de modification 1

    //debut acceder a la page de modification 2
    $scope.retourModifODSP = function () {
      $scope.etatForm = "2";
      $scope.recuperer = JSON.parse(localStorage.getItem("modifODdetailtypebudget"));
      $scope.FormAdddetailTypeBudget.Code = $scope.recuperer.BD_CODETYPEBUDGETDETAIL;
      $scope.FormAdddetailTypeBudget.Libelle = $scope.recuperer.BD_LIBELLE;
   
    };
    //fin acceder a la page de modification 2

   

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId1, recupId2) {
      $scope.idElement = recupId1;
      $scope.idElement1 = recupId2;
     
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimedetailtypebudget = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
            "BD_CODETYPEBUDGETDETAIL":  $scope.idElement,
            "BT_CODETYPEBUDGET": $scope.idElement1,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "",
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
        .post("/TypeBudgetdetailleParamII/DELETEParamII/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          console.log($scope.testSuppression);
          if ($scope.testSuppression[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listedetailtypebudget[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin recuperer id pour la suppression

    //affichage de la liste des sinstres
    $scope.chargegrille = function (
      codetypebudget
    ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis1()
     
      sessionStorage.setItem("vpSavetypebudget", JSON.stringify(codetypebudget));
        if(codetypebudget == undefined){
          codetypebudget = ""
        }
      
        $scope.objet_envoie = [
          {
            "BT_CODETYPEBUDGET": codetypebudget,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD":"INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE":"fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];

        $http
          .post("/TypeBudgetdetailleParamII/ListeTypeBudgetdetailleParamII/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listedetailtypebudget = reponse.data;
            console.log($scope.listedetailtypebudget);
            $scope.varEnregistrement = true
            if (
              $scope.listedetailtypebudget[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listedetailtypebudget[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
     
    };
    //fin
   
    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.$emit("LOAD");
      $scope.libellesearch = ""
      
      $scope.$emit("UNLOAD");
    };
    //fin pour annuler la recherche

    /*FIN DEV OVER*/
  },
]);
