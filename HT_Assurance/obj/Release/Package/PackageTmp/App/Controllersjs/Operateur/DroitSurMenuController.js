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
