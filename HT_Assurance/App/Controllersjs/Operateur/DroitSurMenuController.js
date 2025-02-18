MapharApp.controller("DroitSurMenuController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddDroitSurMenu = {
      Logiciel: "",
      Menu_principal: "",
      Ecran: "",
    };
    $scope.infoBtn = {
      OD_AUTORISER: "OD_AUTORISER",
      OD_AJOUTER: "OD_AJOUTER",
      OD_MODIFIER: "OD_MODIFIER",
      OD_SUPPRIMER: "OD_SUPPRIMER",
      OD_APERCU: "OD_APERCU",
      OD_IMPRIMER: "OD_IMPRIMER",
      OD_IMPRIMERTOUT: "OD_IMPRIMERTOUT",
    };
    $scope.listeLogiciel = [];
    $scope.listeMenuPrincipal = [];
    $scope.listeEcran = [];
    $scope.tablisteDroitSurMenu = [];
    $scope.listeDroitSurMenu = [];
    $scope.verou1 = true;
    $scope.verou2 = true;
    $scope.verou3 = true;
    $scope.verou4 = true;
    $scope.etatBoutonDroit = 1;
    $scope.idCodeTypeObjet = "";
    $scope.valtypemenu = ""
    $scope.veroutoutautoriser = true;
    $scope.selectedMore1 =[]
    $scope.veroutoutautoriserbtn = false;
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
    $scope.initFormAddDroitSurMenu = function () {
      $scope.$emit("LOAD");
      $scope.afficheListLogiciel();
      $scope.$emit("UNLOAD");
    };
    // fin initialisation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    //debut Developpement  Anicette

    //fin pour annuler la recherche

    //debut session generale pour le contrat operation
    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
    //fin session generale pour le contrat operation

    //Debut Liste Logiciel
    $scope.afficheListLogiciel = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "DROIT SUR MENU",
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
        .post("/Logiciel/ListeLogiciel/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeLogiciel = reponse.data;
          console.log($scope.listeLogiciel);
        });
    };
    //Fin Liste Logiciel

    //Debut Liste menu principal
    $scope.afficheListeMenuPrincipal = function () {
      $scope.objet_envoie = [
        {
          OT_CODETYPEOBJET: $scope.idCodeTypeObjet,
          LO_CODELOGICIEL: $scope.FormAddDroitSurMenu.Logiciel,
          SL_LIBELLEECRAN: "DROIT SUR MENU",
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
        .post("/MenuPrincipal/ListeMenuPrincipal/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeMenuPrincipal = reponse.data;
          console.log($scope.listeMenuPrincipal);
        });
    };
    //Fin Liste menu principal

    //Debut Liste Ecran
    $scope.afficheListeEcran = function () {
      $scope.objet_envoie = [
        {
          "OT_CODETYPEOBJET":"2",
          "LO_CODELOGICIEL": $scope.FormAddDroitSurMenu.Logiciel,
          OB_CODEOBJET: $scope.FormAddDroitSurMenu.Menu_principal,
          SL_LIBELLEECRAN: "DROIT SUR MENU",
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
        .post("/Ecran/ListeEcran/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEcran = reponse.data;
          console.log($scope.listeEcran);
        });
    };
    //Fin Liste Ecran
    $scope.recupvalmenu = function (info) {
      $scope.tabrecupvalmenu = [];
      $scope.tabrecupvalmenu = info;
    };
    //Debut Liste Droit  Sur  menu
    $scope.desactiverChampRequisliste = function () {
      $(document).ready(function () {
        $("#LO_CODELOGICIEL").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#leMenuPrincipal").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listeEcran").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
       
      });
    };

    $scope.afficheListDroitSurMenu = function () {
      $scope.desactiverChampRequisliste()
      $scope.$emit("LOAD");
      if ($scope.tabrecupvalmenu.OB_CODEOBJET == undefined) {
        $scope.tabrecupvalmenu.OB_CODEOBJET = "";
      }
      if ($scope.tabrecupvalmenu.OB_RATTACHEA == undefined) {
        $scope.tabrecupvalmenu.OB_RATTACHEA = "";
      }
      if($scope.valtypemenu == "MenuPrincipaux" && ($scope.FormAddDroitSurMenu.Logiciel === "" ||
      $scope.FormAddDroitSurMenu.Logiciel === undefined)){
        
          $(document).ready(function () {
            if (
              $scope.FormAddDroitSurMenu.Logiciel === "" ||
              $scope.FormAddDroitSurMenu.Logiciel === undefined
            ) {
              $("#LO_CODELOGICIEL").css("background-color", "#FFE9E0");
            }
            
           
          });
          $scope.$emit("UNLOAD");
          $rootScope.ChampsNonRenseignes();
        
       
      }else if($scope.valtypemenu == "Menu" && ( $scope.FormAddDroitSurMenu.Logiciel === "" ||
      $scope.FormAddDroitSurMenu.Logiciel === undefined || 
      $scope.FormAddDroitSurMenu.Menu_principal === "" || $scope.FormAddDroitSurMenu.Menu_principal === undefined)){
        
          $(document).ready(function () {
            if (
              $scope.FormAddDroitSurMenu.Logiciel === "" ||
              $scope.FormAddDroitSurMenu.Logiciel === undefined
            ) {
              $("#LO_CODELOGICIEL").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddDroitSurMenu.Menu_principal === "" ||
              $scope.FormAddDroitSurMenu.Menu_principal === undefined
            ) {
              $("#leMenuPrincipal").css("background-color", "#FFE9E0");
            }
           
          });
          $scope.$emit("UNLOAD");
          $rootScope.ChampsNonRenseignes();
       
      }
      else if($scope.valtypemenu == "MenuDeroulant" && ( $scope.FormAddDroitSurMenu.Logiciel === "" ||
      $scope.FormAddDroitSurMenu.Logiciel === undefined || 
      $scope.FormAddDroitSurMenu.Menu_principal === "" || $scope.FormAddDroitSurMenu.Menu_principal === undefined)){
        
          $(document).ready(function () {
            if (
              $scope.FormAddDroitSurMenu.Logiciel === "" ||
              $scope.FormAddDroitSurMenu.Logiciel === undefined
            ) {
              $("#LO_CODELOGICIEL").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddDroitSurMenu.Menu_principal === "" ||
              $scope.FormAddDroitSurMenu.Menu_principal === undefined
            ) {
              $("#leMenuPrincipal").css("background-color", "#FFE9E0");
            }
           
          });
          $scope.$emit("UNLOAD");
          $rootScope.ChampsNonRenseignes();
        
      }
      else if($scope.valtypemenu == "PopupMenu" && ( $scope.FormAddDroitSurMenu.Logiciel === "" ||
      $scope.FormAddDroitSurMenu.Logiciel === undefined || 
      $scope.FormAddDroitSurMenu.Ecran === "" || $scope.FormAddDroitSurMenu.Ecran === undefined)){
        
          $(document).ready(function () {
            if (
              $scope.FormAddDroitSurMenu.Logiciel === "" ||
              $scope.FormAddDroitSurMenu.Logiciel === undefined
            ) {
              $("#LO_CODELOGICIEL").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddDroitSurMenu.Ecran === "" ||
              $scope.FormAddDroitSurMenu.Ecran === undefined
            ) {
              $("#listeEcran").css("background-color", "#FFE9E0");
            }
           
          });
          $scope.$emit("UNLOAD");
          $rootScope.ChampsNonRenseignes();
       
      }
      else if($scope.valtypemenu == "MenuEcran" && ( $scope.FormAddDroitSurMenu.Logiciel === "" ||
      $scope.FormAddDroitSurMenu.Logiciel === undefined || 
      $scope.FormAddDroitSurMenu.Menu_principal === "" || $scope.FormAddDroitSurMenu.Menu_principal === undefined)){
       
          $(document).ready(function () {
            if (
              $scope.FormAddDroitSurMenu.Logiciel === "" ||
              $scope.FormAddDroitSurMenu.Logiciel === undefined
            ) {
              $("#LO_CODELOGICIEL").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddDroitSurMenu.Menu_principal === "" ||
              $scope.FormAddDroitSurMenu.Menu_principal === undefined
            ) {
              $("#leMenuPrincipal").css("background-color", "#FFE9E0");
            }
           
          });
          $scope.$emit("UNLOAD");
          $rootScope.ChampsNonRenseignes();
        
      }else if($scope.valtypemenu == "MenuEtat" && ( $scope.FormAddDroitSurMenu.Logiciel === "" ||
      $scope.FormAddDroitSurMenu.Logiciel === undefined || 
      $scope.FormAddDroitSurMenu.Menu_principal === "" || $scope.FormAddDroitSurMenu.Menu_principal === undefined)){
       
          $(document).ready(function () {
            if (
              $scope.FormAddDroitSurMenu.Logiciel === "" ||
              $scope.FormAddDroitSurMenu.Logiciel === undefined
            ) {
              $("#LO_CODELOGICIEL").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddDroitSurMenu.Menu_principal === "" ||
              $scope.FormAddDroitSurMenu.Menu_principal === undefined
            ) {
              $("#leMenuPrincipal").css("background-color", "#FFE9E0");
            }
           
          });
          $scope.$emit("UNLOAD");
          $rootScope.ChampsNonRenseignes();
        
      }
      else{
        if($scope.valtypemenu == "MenuPrincipaux"){
          $scope.objet_envoie = [
            {
              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
              "OP_CODEOPERATEUR": $scope.collectionOperateur.OP_CODEOPERATEUR,
              "OB_CODEOBJET":"5",
              "LO_CODELOGICIEL": $scope.FormAddDroitSurMenu.Logiciel,
              "OB_RATTACHEA": "",
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];
        }else if($scope.valtypemenu == "Menu"){
          $scope.objet_envoie = [
            {
              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
              "OP_CODEOPERATEUR": $scope.collectionOperateur.OP_CODEOPERATEUR,
              "OB_CODEOBJET":"1",
              "LO_CODELOGICIEL": $scope.FormAddDroitSurMenu.Logiciel,
              "OB_RATTACHEA": $scope.FormAddDroitSurMenu.Menu_principal,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];
        }else if($scope.valtypemenu == "MenuDeroulant"){
          $scope.objet_envoie = [
            {
              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
              "OP_CODEOPERATEUR": $scope.collectionOperateur.OP_CODEOPERATEUR,
              "OB_CODEOBJET":"6",
              "LO_CODELOGICIEL": $scope.FormAddDroitSurMenu.Logiciel,
              "OB_RATTACHEA": $scope.FormAddDroitSurMenu.Menu_principal,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];
        }else if($scope.valtypemenu == "PopupMenu"){
          $scope.objet_envoie = [
            {
              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
              "OP_CODEOPERATEUR": $scope.collectionOperateur.OP_CODEOPERATEUR,
              "OB_CODEOBJET":"4",
              "LO_CODELOGICIEL":$scope.FormAddDroitSurMenu.Logiciel,
              "OB_RATTACHEA": $scope.FormAddDroitSurMenu.Ecran,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];
        }else if($scope.valtypemenu == "MenuEcran"){
          $scope.objet_envoie = [
            {
              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
              "OP_CODEOPERATEUR": $scope.collectionOperateur.OP_CODEOPERATEUR,
              "OB_CODEOBJET":"2",
              "LO_CODELOGICIEL": $scope.FormAddDroitSurMenu.Logiciel,
              "OB_RATTACHEA": $scope.FormAddDroitSurMenu.Menu_principal,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y:  $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];
        }else if($scope.valtypemenu == "MenuEtat"){
          $scope.objet_envoie = [
            {
              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
              "OP_CODEOPERATEUR": $scope.collectionOperateur.OP_CODEOPERATEUR,
              "OB_CODEOBJET":"3",
              "LO_CODELOGICIEL": $scope.FormAddDroitSurMenu.Logiciel,
              "OB_RATTACHEA": $scope.FormAddDroitSurMenu.Menu_principal,
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
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
       
  
        $http
          .post("/DroitSurMenu/ListeDroitSurMenu/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.FormAddDroitSurMenu ={}
            $scope.FormAddDroitSurMenu.Ecran = "";
            $scope.$emit("UNLOAD");
            $scope.listeDroitSurMenu = reponse.data;
            
            if (
              $scope.listeDroitSurMenu[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeDroitSurMenu[0].clsObjetRetour.SL_MESSAGE
              );
            }else{
              for (i = 0; i < $scope.listeDroitSurMenu.length; i++) {
                if (
                  $scope.listeDroitSurMenu[i].OD_AUTORISER == "O" ||
                  $scope.listeDroitSurMenu[i].OD_AJOUTER == "O" ||
                  $scope.listeDroitSurMenu[i].OD_MODIFIER == "O" ||
                  $scope.listeDroitSurMenu[i].OD_SUPPRIMER == "O" ||
                  $scope.listeDroitSurMenu[i].OD_APERCU == "O" ||
                  $scope.listeDroitSurMenu[i].OD_IMPRIMER == "O" ||
                  $scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT == "O"
                ) {
                  $scope.selectedMore.push($scope.listeDroitSurMenu[i]);
                  $scope.selectedMore1.push($scope.listeDroitSurMenu[i]);
                }
              }
              console.log($scope.listeDroitSurMenu);
              console.log($scope.selectedMore);
              $scope.veroutoutautoriser = false;
            }
          });
      }
      
    };
    //Fin Liste Droit  Sur  menu

    //Debut Liste menu principal
    $scope.ValiderDroitSurMenu = function () {
      $scope.$emit("LOAD");

      $scope.clsCtcontratgaranties = [];
      for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
        //for (var j = 0; j < $scope.selectedMore.length; j++) {
        //    if ($scope.selectedMore[j].OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
        //        if ($scope.listeDroitSurMenu[i].OD_AUTORISER == "O") {
        //            $scope.listeDroitSurMenu[i].OD_AUTORISER = "N";
        //            break;
        //        }
        //        if ($scope.listeDroitSurMenu[i].OD_AUTORISER == "N") {
        //            $scope.listeDroitSurMenu[i].OD_AUTORISER = "O";
        //            break;
        //        }

        //    }

        //}

        $scope.objetGarentie = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $scope.collectionOperateur.OP_CODEOPERATEUR,
          OB_CODEOBJET: $scope.FormAddDroitSurMenu.Menu_principal,
          OD_AJOUTER: "",
          OD_MODIFIER: "",
          OD_SUPPRIMER: "",
          OD_APERCU: "",
          OD_AUTORISER: "",
          OD_IMPRIMER: "",
          OD_IMPRIMERTOUT: "",
          LO_CODELOGICIEL: $scope.FormAddDroitSurMenu.Logiciel,
          OB_RATTACHEA: "",
          OD_NUMEROORDRE: "1",
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "DROIT SUR MENU",
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
        $scope.objetGarentie.OB_CODEOBJET =
          $scope.listeDroitSurMenu[i].OB_CODEOBJET;
        $scope.objetGarentie.OD_AUTORISER =
          $scope.listeDroitSurMenu[i].OD_AUTORISER;
        $scope.objetGarentie.OD_AJOUTER =
          $scope.listeDroitSurMenu[i].OD_AJOUTER;
        $scope.objetGarentie.OD_MODIFIER =
          $scope.listeDroitSurMenu[i].OD_MODIFIER;
        $scope.objetGarentie.OD_SUPPRIMER =
          $scope.listeDroitSurMenu[i].OD_SUPPRIMER;
        $scope.objetGarentie.OD_APERCU = $scope.listeDroitSurMenu[i].OD_APERCU;
        $scope.objetGarentie.OD_IMPRIMER =
          $scope.listeDroitSurMenu[i].OD_IMPRIMER;
        $scope.objetGarentie.OD_IMPRIMERTOUT =
          $scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT;
        $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetGarentie.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }
      $scope.objet_envoie = $scope.clsCtcontratgaranties;

      $http
        .post("/DroitSurMenu/AjoutDroitSurMenu/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.selectedMore = [];
          $scope.veroutoutautoriser = true
         // $scope.verou4 = true
          $scope.tablisteDroitSurMenu = reponse.data;
          console.log($scope.tablisteDroitSurMenu);
          if (
            $scope.tablisteDroitSurMenu[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tablisteDroitSurMenu[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.OperateurDroitEcrans();
            $scope.listeDroitSurMenu[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tablisteDroitSurMenu[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $scope.selectedMore = [];
          $rootScope.ProblemeServeur(
            $scope.tablisteDroitSurMenu[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin Liste menu principal


    $scope.chargementDesEcrans = function () {  
      //TRAITEMENT MENU PRINCIPAUX
      $rootScope.TIERS_GENERALE_ETIERS = false;
      $rootScope.TRESORERIE_GENERALE_ETRSO = false;
      $rootScope.PARAMETRE_I_GENERALE_EPARAMI = false;
      $rootScope.PARAMETRE_II_GENERALE_EPARAMII = false;
      $rootScope.ASSURANCE_GENERALE_EASSUR = false;
      $rootScope.COMPTABILITE_GENERALE_COMPTA = false;
      $rootScope.OUTILS_ET_SECURITE_GENERALE_OUTILSECUR = false;
      for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
    
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '1' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.TIERS_GENERALE_ETIERS = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '2' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.TRESORERIE_GENERALE_ETRSO = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '3' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.PARAMETRE_I_GENERALE_EPARAMI = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '4' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.PARAMETRE_II_GENERALE_EPARAMII = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '5' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.ASSURANCE_GENERALE_EASSUR = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '6' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.COMPTABILITE_GENERALE_COMPTA = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '7' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.OUTILS_ET_SECURITE_GENERALE_OUTILSECUR = true;
        }
      }
         
          
         // ECRAN TIERS
         
         $rootScope.GROUPES_DES_TIERS_ETIERS = false;//
         $rootScope.TIERS_ETIERS = false;//
         $rootScope.PROSPECT_ETIERS = false;//
         $rootScope.SITUATION_DES_TIERS_ETIERS = false;//
         $rootScope.SITUATIONDESASSUREURS_ETIERS = false;
         $rootScope.COMMERCIAUX_ETIERS = false;//
         $rootScope.SITUATION_DES_COMMERCIAUX_ETIERS = false;//
         $rootScope.EDITION_ETIERS = false;//
         $rootScope.SAIASSUR_ETIERS = true;
          
         for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
    
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '8' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GROUPES_DES_TIERS_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '9' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TIERS_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '10' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PROSPECT_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '11' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SITUATION_DES_TIERS_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '12' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.COMMERCIAUX_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '13' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SITUATION_DES_COMMERCIAUX_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '14' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.EDITION_ETIERS = true;
          }
        }  
          
      
          // ECRAN TRESORERIE
          
          $rootScope.OPERATION_DE_TRESORERIE_ETRSO = false;//P
          $rootScope.OPERATION_DE_TRESORERIEI_ETRSO = false;//S
          $rootScope.OPERATION_DE_TRESORERIE_TIERS_ETRSO = false;//S
          $rootScope.REGLEMENT_ASSURANCE_ETRSO = false;//P
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_ETRSO = false;//S
          $rootScope.HABITAT_ETRSO = false;//S
          $rootScope.INDIVIDUEL_ACCIDENT_ETRSO = false;//S
          $rootScope.AUTO_ETRSO = false;//S
          $rootScope.VOYAGE_ETRSO = false;//S
          $rootScope.RESPONSABILITE_CIVIL_ETRSO = false;//S
          $rootScope.TRANSPORT_ETRSO = false;//S
          $rootScope.SANTER_ETRSO = true;//S
          $rootScope.GESA_ETRSO = false;//S
          $rootScope.PHARMACIEN_ETRSO = false;//S
          $rootScope.AUXILIAIRE_ETRSO = false;//S
          $rootScope.REEDITION_ETRSO = false;//P
          $rootScope.EDITION_ETRSO = false;//P
          $rootScope.MODIFICATION_DATE_EMISSION = false;//P
          $rootScope.STMODIFICATION_DATE_EMISSION = '';//P
          //NOUVEAU
          $rootScope.YAFOLO_ETRSO = false;//P
          
    
          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
             //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '30' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.REEDITION_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '31' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_ETRSO = true;
            }
            //MENU DEROULANT
    
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '212' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_DE_TRESORERIE_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '213' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.REGLEMENT_ASSURANCE_ETRSO = true;
            }
    
    
            //sous menu tresorerie
             if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '214' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_DE_TRESORERIEI_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '215' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_DE_TRESORERIE_TIERS_ETRSO = true;
            }
    
             //sous menu reglement
             if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '216' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.MULTIRISQUE_PROFFESSIONELLE_ETRSO = true;
            }

            $rootScope.STMODIFICATION_DATE_EMISSION = this.OperateurEnCoursEcran.find(//@ts-ignore
              (element) => element.OB_LIBELLE === 'MODIFICATION DATE EMISSION'
            )?.OB_CODEOBJET
            
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == $rootScope.STMODIFICATION_DATE_EMISSION  && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.MODIFICATION_DATE_EMISSION = true;
            }

            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '217' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.HABITAT_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '218' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.INDIVIDUEL_ACCIDENT_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '420' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUTO_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '421' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.VOYAGE_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '221' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RESPONSABILITE_CIVIL_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '222' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TRANSPORT_ETRSO = true;
            }
            //sous menu reglement Santer
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '224' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.GESA_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '225' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PHARMACIEN_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '226' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUXILIAIRE_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '419' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.YAFOLO_ETRSO = true;
            }
          }  
      
          //ECRAN PARAMETTRE I
          
          $rootScope.EXPERT_NOMME_EPARAMI = false;
          $rootScope.CONFIGURATION_DES_PARAMETTRES_EPARAMI = false;
          $rootScope.PARAMETTRE_EPARAMI = false;
          $rootScope.CONFIGURATION_DE_GARANTIE_PAR_RISQUE_EPARAMI = false;
          $rootScope.ETAT_EPARAMI = false;
          $rootScope.EDITION_EPARAMI = false;
          $rootScope.CREATION_MARQUE = false;
          $rootScope.CREATION_BANQUE_AGENCE = false;
    
          $rootScope.CREATION_EXERCICE = false;//nouveau
         
    
          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
    
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '405' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_MARQUE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '406' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_BANQUE_AGENCE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '32' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EXPERT_NOMME_EPARAMI = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '407' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_EXERCICE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '33' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CONFIGURATION_DES_PARAMETTRES_EPARAMI = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '36' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ETAT_EPARAMI = true;
            }
    
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '34' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRE_EPARAMI = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '35' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CONFIGURATION_DE_GARANTIE_PAR_RISQUE_EPARAMI = true;
            }
            
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '37' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_EPARAMI = true;
            }
           
          }  
    
    
          //ECRAN PARAMETTRE II
          
          $rootScope.PLAN_EPARAMII = false;
          $rootScope.PLAN_COMPTABLE_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_COMPTES_DES_PRODUITS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_FAMILLES_D_OPERATION_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_DES_TIERS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_AUTRES_ECRITURES_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATION_DE_TIERS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_SYSTEME_EPARAMII = false;
          $rootScope.ETATS_EPARAMII = false;
          $rootScope.EDITION_EPARAMII = false;
    
          //NOUVEAU
          $rootScope.FAMILLE_DE_BIENS_IMMOBILISEES = false;
          $rootScope.FAMILLE_AMORTISSEMENT = false;
          $rootScope.PARAMETRES_BUDGET = false;
          $rootScope.PARAMETRES_JOURNAL = false;
          $rootScope.TYPE_DE_BUDGET = false;
          $rootScope.DETAILS_DU_TYPE_DE_BUDGET = false;
          $rootScope.POSTE_BUDGETAIRE = false;
    
          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '210' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.FAMILLE_DE_BIENS_IMMOBILISEES = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '211' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.FAMILLE_AMORTISSEMENT = true;
            }
    
            //MENU DEROULANT
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '38' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PLAN_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '40' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '47' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ETATS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '206' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETRES_BUDGET = true;
            }
           
    
            //POPO MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '237' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PLAN_COMPTABLE_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '238' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETRES_JOURNAL = true;
            }
    
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '237' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_COMPTES_DES_PRODUITS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '238' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_FAMILLES_D_OPERATION_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '239' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '240' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_DES_TIERS_EPARAMII = true;
            }//
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '241' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_AUTRES_ECRITURES_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '242' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATION_DE_TIERS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '243' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_SYSTEME_EPARAMII = true;
            }
    
    
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '244' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TYPE_DE_BUDGET = true;
            }//
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '245' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.DETAILS_DU_TYPE_DE_BUDGET = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '246' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.POSTE_BUDGETAIRE = true;
            }
          
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '247' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_EPARAMII = true;
            }
          }  
      
          //ECRAN ASSURANCE
          
          $rootScope.ENREGISTREMENT_EASSUR = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSUR = false;
          $rootScope.HABITAT_EASSUR = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EASSUR = false;
          $rootScope.AUTO_EASSUR = false;
          $rootScope.VOYAGE_EASSUR = false;
          $rootScope.RESPONSABILITE_CIVIL_EASSUR = true;
          $rootScope.TRANSPORT_EASSUR = false;
          $rootScope.SANTER_EASSUR = false;
          $rootScope.GESA_EASSUR = false;
          $rootScope.PHARMACIEN_EASSUR = false;
          $rootScope.AUXILIAIRE_EASSUR = false;
          $rootScope.LISTEDEMANDECONTRAT_EASSUR = false;
          //NOUVEAU
          $rootScope.YAFOLO_EASSUR = true;
      
          $rootScope.TRANSMISSION_EASSURTRANS = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURTRANS = false;
          $rootScope.HABITAT_EASSURTRANS = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EASSURTRANS = false;
          $rootScope.AUTO_EASSURTRANS = false;
          $rootScope.VOYAGE_EASSURTRANS = false;
          $rootScope.RESPONSABILITE_CIVIL_EASSURTRANS = false;
          $rootScope.TRANSPORT_EASSURTRANS = false;
          $rootScope.SANTER_EASSURTRANS = false;
          $rootScope.GESA_EASSURTRANS = false;
          $rootScope.PHARMACIEN_EASSURTRANS = false;
          $rootScope.AUXILIAIRE_EASSURTRANS = false;
          //NOUVEAU
          $rootScope.YAFOLO_EASSURTRANS = true;
      
          $rootScope.VALIDATION_EASSURVALID = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURVALID = false;
          $rootScope.HABITAT_EASSURVALID = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EASSURVALID = false;
          $rootScope.AUTO_EASSURVALID = false;
          $rootScope.VOYAGE_EASSURVALID = false;
          $rootScope.RESPONSABILITE_CIVIL_EASSURVALID = false;
          $rootScope.TRANSPORT_EASSURVALID = false;
          $rootScope.SANTER_EASSURVALID = false;
          $rootScope.GESA_EASSURVALID = false;
          $rootScope.PHARMACIEN_EASSURVALID = false;
          $rootScope.AUXILIAIRE_EASSURVALID = false;
          //NOUVEAU
          $rootScope.YAFOLO_EASSURVALID = false;
      
          $rootScope.OPERATION_EOPERATION = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EOPERATION = false;
          $rootScope.HABITAT_EOPERATION = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EOPERATION = false;
          $rootScope.AUTO_EOPERATION = false;
          $rootScope.VOYAGE_EOPERATION = false;
          $rootScope.RESPONSABILITE_CIVIL_EOPERATION = false;
          $rootScope.TRANSPORT_EOPERATION = false;
          $rootScope.SANTER_EOPERATION = false;
          $rootScope.GESA_EOPERATION = false;
          $rootScope.PHARMACIEN_EOPERATION = false;
          $rootScope.AUXILIAIRE_EOPERATION = false;
          //NOUVEAU
          $rootScope.YAFOLO_EOPERATION = false;
      
          $rootScope.RELANCE_ERELANCE = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERELANCE = false;
          $rootScope.HABITAT_ERELANCE = false;
          $rootScope.INDIVIDUEL_ACCIDENT_ERELANCE = false;
          $rootScope.AUTO_ERELANCE = false;
          $rootScope.VOYAGE_ERELANCE = false;
          $rootScope.RESPONSABILITE_CIVIL_ERELANCE = false;
          $rootScope.TRANSPORT_ERELANCE = false;
          $rootScope.SANTER_ERELANCE = false;
          $rootScope.GESA_ERELANCE = false;
          $rootScope.PHARMACIEN_ERELANCE = false;
          $rootScope.AUXILIAIRE_ERELANCE = false;
          //NOUVEAU
          $rootScope.YAFOLO_ERELANCE = false;
      
          $rootScope.RENOUVELLEMENT_ERENOUVEL = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERENOUVEL = false;
          $rootScope.HABITAT_ERENOUVEL = false;
          $rootScope.INDIVIDUEL_ACCIDENT_ERENOUVEL = false;
          $rootScope.AUTO_ERENOUVEL = false;
          $rootScope.VOYAGE_ERENOUVEL = false;
          $rootScope.RESPONSABILITE_CIVIL_ERENOUVEL = false;
          $rootScope.TRANSPORT_ERENOUVEL = false;
          $rootScope.SANTER_ERENOUVEL = false;
          $rootScope.GESA_ERENOUVEL = false;
          $rootScope.PHARMACIEN_ERENOUVEL = false;
          $rootScope.AUXILIAIRE_ERENOUVEL = false;
          $rootScope.EDITION_ASSURANCE_ERENOUVEL = false;
          //NOUVEAU
          $rootScope.YAFOLO_ERENOUVEL = false;
    
          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '210' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.LISTEDEMANDECONTRAT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '109' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_ASSURANCE_ERENOUVEL = true;
            }
    
            //MENU DEROULANT 
            
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '49' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ENREGISTREMENT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '61' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TRANSMISSION_EASSURTRANS = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '73' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.VALIDATION_EASSURVALID = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '85' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_EOPERATION = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '249' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RELANCE_ERELANCE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '97' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RENOUVELLEMENT_ERENOUVEL = true;
            }
    
            //POPO MENU ASSURANCE
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '256' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '257' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.HABITAT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '258' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.INDIVIDUEL_ACCIDENT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '259' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUTO_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '260' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.VOYAGE_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '261' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RESPONSABILITE_CIVIL_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '262' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TRANSPORT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '263' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.SANTER_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '264' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.GESA_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '265' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PHARMACIEN_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '266' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUXILIAIRE_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '409' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.YAFOLO_EASSUR = true;
            }
    
    
            //POPO MENU TRANSMISSION
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '267' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '268' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '269' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '270' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '271' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '272' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '273' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '274' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '275' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '276' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '277' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '410' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_EASSURTRANS = true;
          }
           
          //POPO MENU VALIDATION
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '278' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '279' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '280' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '281' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '282' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '283' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '284' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '285' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '286' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '287' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '288' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '411' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_EASSURVALID = true;
          }
    
         //POPO MENU OPERATION
         if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '289' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '290' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.HABITAT_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '291' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.INDIVIDUEL_ACCIDENT_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '292' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.AUTO_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '293' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.VOYAGE_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '294' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.RESPONSABILITE_CIVIL_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '295' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.TRANSPORT_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '296' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.SANTER_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '297' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.GESA_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '298' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.PHARMACIEN_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '299' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.AUXILIAIRE_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '412' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.YAFOLO_EOPERATION = true;
        }
    
        
          //POPO MENU RELANCE
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '311' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '312' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '313' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '314' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '315' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '316' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '317' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '318' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '319' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '320' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '321' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '413' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_ERELANCE = true;
          }
    
          //POPO MENU RENOUVELLEMENT
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '300' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '301' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '302' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '303' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '304' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '305' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '306' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '307' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '308' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '309' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '310' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '311' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_ERENOUVEL = true;
          }
          } 
    
          
    
          //ECRAN COMPTABILITE
          
          $rootScope.ECRITURE_COMPTABLE_COMPTA = false;
          $rootScope.ECRITURE_COMPTABLEI_COMPTA = false;
          $rootScope.EXTOURNE_COMPTA = false;
          $rootScope.CLOTURE_EXERCICE_COMPTA = false;
          $rootScope.EDITION_COMPTA = false;
    
          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){                                                                       
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '113' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EXTOURNE_COMPTA = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '114' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CLOTURE_EXERCICE_COMPTA = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '115' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_COMPTA = true;
            }
    
            //MENU DEROULANT
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '110' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ECRITURE_COMPTABLE_COMPTA = true;
            }
           
    
            //POPO MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '323' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ECRITURE_COMPTABLEI_COMPTA = true;
            }
            
          }  
      
          //ECRAN OUTIL ET SECURITE
          
          $rootScope.JOURNEE_DE_TRAVAIL_OUTILSECUR = false;
          $rootScope.CREATION_JOURNEE_OUTILSECUR = false;
          $rootScope.FERMETURE_JOURNEE_OUTILSECUR = false;
          $rootScope.SELECTION_OUTILSECUR = false;
          $rootScope.GESTION_UTILISATEUR_OUTILSECUR = false;
          $rootScope.MOT_DE_PASS_OUTILSECUR = false;
          $rootScope.PROFIL_UTILISATEUR_OUTILSECUR = false;
          $rootScope.UTILISATEUR_OUTILSECUR = false;
          $rootScope.EDITION_OUTILSECUR = false;
          $rootScope.EDITION_OUTILSECUR = false;
          //NOUVEAU
          $rootScope.DROIT_OUTILSECUR = false; 
      
    
          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){                                                                       
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '116' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.JOURNEE_DE_TRAVAIL_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '117' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_JOURNEE_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '118' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.FERMETURE_JOURNEE_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '119' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.SELECTION_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '200' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.GESTION_UTILISATEUR_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '326' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_OUTILSECUR = true;
            }
           
    
    
           
           
    
            //POPO MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '415' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.MOT_DE_PASS_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '416' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PROFIL_UTILISATEUR_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '417' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.UTILISATEUR_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '418' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.DROIT_OUTILSECUR = true;
            }
            
          }  
          /**  FIN DECLARATION DES VARIABLES DE GESTION DES DROITS DES ECRAN        ***/
    
        }
    /*$scope.chargementDesEcrans = function () {  
      $rootScope.CREATION_MARQUE = false;
      $rootScope.CREATION_BANQUE_AGENCE = false;
  
      if($rootScope.OperateurEnCoursEcran[102].OD_AUTORISER == 'O'){
        $rootScope.CREATION_MARQUE = true;
      }
      
      if($rootScope.OperateurEnCoursEcran[103].OD_AUTORISER == 'O'){
        $rootScope.CREATION_BANQUE_AGENCE = true;
      }
      
    }*/
  
   //debut connexion
   $scope.OperateurDroitEcrans = function () {
      $scope.objet_envoie = [
        {
              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
              "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
              "OB_CODEOBJET":"1",
              "LO_CODELOGICIEL": "1",
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "",
              "LG_CODELANGUE": "fr",
              "clsObjetEnvoi": {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          }
        },
      ];
  
      $http
        .post("/DroitSurMenu/ListeDroitSurMenuOperateur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $rootScope.OperateurEnCoursEcran = reponse.data;
          if (
            $rootScope.OperateurEnCoursEcran[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
           // $scope.chargementDesEcrans();
          } else {
         
          }
        });
  
  };
  //fin connexion
  









    //Les tableau avec 2 cololnnes
    $scope.tabMenuOperateur2Colonne = function (valEtat, btn) {
      //$scope.listeDroitSurMenu[0].clsObjetRetour.SL_RESULTAT = 'FALSE'
      $scope.valtypemenu = btn;
      $scope.tabrecupvalmenu = [];
      $scope.listeEcran = [];
      $scope.listeMenuPrincipal = [];
      $scope.idCodeTypeObjet = "";
      $scope.FormAddDroitSurMenu.Logiciel = "";
      $scope.FormAddDroitSurMenu.Menu_principal = "";
      $scope.etatBoutonDroit = valEtat;
      if (valEtat == 1) {
        if (btn == "MenuPrincipaux") {
          $scope.idCodeTypeObjet = 5;
          $(document).ready(function () {
            $("#MenuPrincipaux").css("background-color", "Beige");
            $("#Menu").css("background-color", "white");
            $("#MenuDeroulant").css("background-color", "white");
            $("#PopupMenu").css("background-color", "white");
            $("#MenuEcran").css("background-color", "white");
            $("#MenuEtat").css("background-color", "white");
          });
          $scope.verou2 = true;
          $scope.verou1 = false;
          $scope.verou3 = true;
          $scope.verou4 = false;
        } else if (btn == "Menu") {
          $scope.idCodeTypeObjet = 5;
          $(document).ready(function () {
            $("#MenuPrincipaux").css("background-color", "white");
            $("#Menu").css("background-color", "Beige");
            $("#MenuDeroulant").css("background-color", "white");
            $("#PopupMenu").css("background-color", "white");
            $("#MenuEcran").css("background-color", "white");
            $("#MenuEtat").css("background-color", "white");
          });
          $scope.verou1 = false;
          $scope.verou2 = false;
          $scope.verou3 = true;
          $scope.verou4 = false;
        } else if (btn == "MenuDeroulant") {
          $(document).ready(function () {
            $scope.idCodeTypeObjet = 5;
            $("#MenuPrincipaux").css("background-color", "white");
            $("#Menu").css("background-color", "white");
            $("#MenuDeroulant").css("background-color", "Beige");
            $("#PopupMenu").css("background-color", "white");
            $("#MenuEcran").css("background-color", "white");
            $("#MenuEtat").css("background-color", "white");
          });
          $scope.verou1 = false;
          $scope.verou2 = false;
          $scope.verou3 = true;
          $scope.verou4 = false;
        } else {
          $(document).ready(function () {
            $scope.idCodeTypeObjet = 5;
            $("#MenuPrincipaux").css("background-color", "white");
            $("#Menu").css("background-color", "white");
            $("#MenuDeroulant").css("background-color", "white");
            $("#PopupMenu").css("background-color", "Beige");
            $("#MenuEcran").css("background-color", "white");
            $("#MenuEtat").css("background-color", "white");
          });
          $scope.verou1 = false;
          $scope.verou2 = false;
          $scope.verou3 = false;
          $scope.verou4 = false;
        }
      } else if (valEtat == 2) {
        $(document).ready(function () {
          $scope.idCodeTypeObjet = 5;
          $("#MenuPrincipaux").css("background-color", "white");
          $("#Menu").css("background-color", "white");
          $("#MenuDeroulant").css("background-color", "white");
          $("#PopupMenu").css("background-color", "white");
          $("#MenuEcran").css("background-color", "Beige");
          $("#MenuEtat").css("background-color", "white");
        });
        $scope.verou1 = false;
        $scope.verou2 = false;
        $scope.verou3 = true;
        $scope.verou4 = false;
      } else {
        $(document).ready(function () {
          $scope.idCodeTypeObjet = 2;
          $("#MenuPrincipaux").css("background-color", "white");
          $("#Menu").css("background-color", "white");
          $("#MenuDeroulant").css("background-color", "white");
          $("#PopupMenu").css("background-color", "white");
          $("#MenuEcran").css("background-color", "white");
          $("#MenuEtat").css("background-color", "Beige");
        });
        $scope.verou1 = false;
        $scope.verou2 = false;
        $scope.verou3 = true;
        $scope.verou4 = false;
      }
    };
    //Les tableau avec 2 cololnnes

    //CASE A COCHER SUR LA LISTE
    $scope.selectedMore = [];
    $scope.existedMore = function (item) {
      if (item == "O") {
        return true;
      }
      //return $scope.selectedMore.indexOf(item) > -1;
    };

    $scope.toggleSelectedMore = function (item, itemval) {
      let idx = $scope.selectedMore.indexOf(item);
      if (idx > -1) {
        if (itemval == "OD_AUTORISER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_AUTORISER == "O") {
                $scope.listeDroitSurMenu[i].OD_AUTORISER = "N";
                break;
              } else {
                $scope.listeDroitSurMenu[i].OD_AUTORISER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_AJOUTER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_AJOUTER == "O") {
                $scope.listeDroitSurMenu[i].OD_AJOUTER = "N";
                break;
              } else {
                $scope.listeDroitSurMenu[i].OD_AJOUTER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_MODIFIER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_MODIFIER == "O") {
                $scope.listeDroitSurMenu[i].OD_MODIFIER = "N";
                break;
              } else {
                $scope.listeDroitSurMenu[i].OD_MODIFIER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_SUPPRIMER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_SUPPRIMER == "O") {
                $scope.listeDroitSurMenu[i].OD_SUPPRIMER = "N";
                break;
              } else {
                $scope.listeDroitSurMenu[i].OD_SUPPRIMER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_APERCU") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_APERCU == "O") {
                $scope.listeDroitSurMenu[i].OD_APERCU = "N";
                break;
              } else {
                $scope.listeDroitSurMenu[i].OD_APERCU = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_IMPRIMER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_IMPRIMER == "O") {
                $scope.listeDroitSurMenu[i].OD_IMPRIMER = "N";
                break;
              } else {
                $scope.listeDroitSurMenu[i].OD_IMPRIMER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_IMPRIMERTOUT") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT == "O") {
                $scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT = "N";
                break;
              } else {
                $scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT = "O";
                break;
              }
            }
          }
        }
        $scope.selectedMore.splice(idx, 1);
      } else {
        if (itemval == "OD_AUTORISER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_AUTORISER == "N") {
                $scope.listeDroitSurMenu[i].OD_AUTORISER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_AJOUTER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_AJOUTER == "N") {
                $scope.listeDroitSurMenu[i].OD_AJOUTER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_MODIFIER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_MODIFIER == "N") {
                $scope.listeDroitSurMenu[i].OD_MODIFIER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_SUPPRIMER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_SUPPRIMER == "N") {
                $scope.listeDroitSurMenu[i].OD_SUPPRIMER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_APERCU") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_APERCU == "N") {
                $scope.listeDroitSurMenu[i].OD_APERCU = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_IMPRIMER") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_IMPRIMER == "N") {
                $scope.listeDroitSurMenu[i].OD_IMPRIMER = "O";
                break;
              }
            }
          }
        }
        if (itemval == "OD_IMPRIMERTOUT") {
          for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
            if (item.OB_CODEOBJET == $scope.listeDroitSurMenu[i].OB_CODEOBJET) {
              if ($scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT == "N") {
                $scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT = "O";
                break;
              }
            }
          }
        }
        $scope.selectedMore.push(item);
        console.log($scope.selectedMore);
      }
    };


    $scope.toggleSelectedMore1 = function () {
      if($scope.selectedMore1.length != $scope.listeDroitSurMenu.length)  {
        for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {
         
            $scope.listeDroitSurMenu[i].OD_AUTORISER = "O"
             $scope.listeDroitSurMenu[i].OD_AJOUTER = "O";
             $scope.listeDroitSurMenu[i].OD_MODIFIER = "O"
             $scope.listeDroitSurMenu[i].OD_SUPPRIMER = "O";
             $scope.listeDroitSurMenu[i].OD_APERCU = "O"
             $scope.listeDroitSurMenu[i].OD_IMPRIMER = "O";
             $scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT = "O"
             
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_AUTORISER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_AJOUTER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_MODIFIER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_SUPPRIMER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_APERCU)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_IMPRIMER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT)
        }
        $scope.selectedMore1 =[]
        $scope.selectedMore1 = $scope.listeDroitSurMenu;
        $scope.veroutoutautoriserbtn = true
        $scope.existedMore($scope.veroutoutautoriserbtn)
      }else{
        for (var i = 0; i < $scope.listeDroitSurMenu.length; i++) {

          $scope.listeDroitSurMenu[i].OD_AUTORISER = "N"
          $scope.listeDroitSurMenu[i].OD_AJOUTER = "N";
          $scope.listeDroitSurMenu[i].OD_MODIFIER = "N"
          $scope.listeDroitSurMenu[i].OD_SUPPRIMER = "N";
          $scope.listeDroitSurMenu[i].OD_APERCU = "N"
          $scope.listeDroitSurMenu[i].OD_IMPRIMER = "N";
          $scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT = "N"
          //$scope.selectedMore.splice(i, 1);
          $scope.existedMore($scope.listeDroitSurMenu[i].OD_AUTORISER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_AJOUTER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_MODIFIER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_SUPPRIMER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_APERCU)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_IMPRIMER)
             $scope.existedMore($scope.listeDroitSurMenu[i].OD_IMPRIMERTOUT)
        }
       
        $scope.selectedMore1 =[]
        $scope.veroutoutautoriserbtn = true
        $scope.existedMore($scope.veroutoutautoriserbtn)
      }
     
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
