﻿MapharApp.controller("OperateurController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.formLogin = true
    $scope.formforgotcontact = false
    $scope.formforgotcodeValid = false
    $scope.formforgotcodenewmdp = false
    $scope.formupdatemdp = false
    $scope.RP_CODEVALIDATION = ""
    $scope.RP_DATE = ""
    $scope.RP_HEURE = ""
    $scope.code = ""
    $scope.dateSys = ""
    $scope.RetoursChangPassword = []
    $scope.RetoursUpdatePassword = []
    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken
    $scope.Auth = {
      userEmail: "",
      userPassword: "",
      errorMsg: "",
    };
    $scope.formForgotPassword = {
      contact: "",
      code: "",
      MotDePasse: "",
      MotDePasseConfirme: "",
    };
    $scope.changePassword = {
      Login: "",
      MotDePasse: "",
      MotDePasseConfirme: "",
    };

    $scope.objet_envoie = [];

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
      MontCaisse: 0,
      NumClient: "",
      ClientDeVente: "",
      TypeOperateur: "",
      Service: "",
      operateur: "",
      PL_CODENUMCOMPTE: "",
      PL_CODENUMCOMPTECOFFREFORT: "",
      img_avatar: [],
    };
    $scope.FormListOperateur = {
      Entrepot: "",
    };
    $scope.formaddboutn = [
      {
        id: 1,
        nom: "actif",
        valeur: "N",
      },
      {
        id: 2,
        nom: "jrneTravail",
        valeur: "N",
      },
      {
        id: 3,
        nom: "agentCaisse",
        valeur: "N",
      },
      {
        id: 4,
        nom: "impressionAutomatique",
        valeur: "N",
      },
      {
        id: 5,
        nom: "extourne",
        valeur: "N",
      },
      {
        id: 6,
        nom: "contrepartieAutomatique",
        valeur: "N",
      },
      {
        id: 7,
        nom: "droitCreationJrnée",
        valeur: "N",
      },
      {
        id: 8,
        nom: "droitFermetureJrnée",
        valeur: "N",
      },
      {
        id: 9,
        nom: "droitCreatioProfil",
        valeur: "N",
      },
      {
        id: 10,
        nom: "droitCreationOperateur",
        valeur: "N",
      },
      {
        id: 11,
        nom: "droitSelectOP",
        valeur: "N",
      },
      {
        id: 12,
        nom: "droitSelectOPVente",
        valeur: "N",
      },
    ];

    console.log($scope.formaddboutn);
    // $scope.verouBtn = true;
    $scope.listeDesSouscripteurs = [];
    $scope.listeDesNumComptes = [];
    $scope.listeEntrepot = [];
    $scope.listeProfil = [];
    $scope.listeTypeOperateur = [];
    $scope.listeService = [];
    $scope.recupererInfo = {};
    $scope.testModificationOperateur = [];
    $scope.testAjoutOperateur = [];
    $scope.testSuppressionOperateurOperateur = [];
    $scope.listeUtilisateur = [];
    $scope.listeOperateur = [];
    $scope.nombreInfoBulle = "";
    $scope.idbtn = "";
    $scope.idElement = "";
    $scope.tableauimage = [];
    $scope.tableauimage2 = [];
    $scope.tabEngReglement = [];
    $scope.newtab = [];
    var reader = {};
    $scope.imagememoire = "";
    var image = {};
    $scope.idimagcheque = "";
    $scope.collecionimage = {};

    /** nouvelle methode de case a cocher */
    $scope.cpt0 = 0;
    $scope.cpt1 = 0;
    $scope.cpt2 = 0;
    $scope.cpt3 = 0;
    $scope.cpt4 = 0;
    $scope.cpt5 = 0;
    $scope.cpt6 = 0;
    $scope.cpt7 = 0;
    $scope.cpt8 = 0;
    $scope.cpt9 = 0;
    $scope.cpt10 = 0;
    $scope.cpt11 = 0;

    /** fin case a cocher */
    $scope.etatForm = "";

    $scope.RetoursForgotPasswords = []




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
    //debut initialisation operteur
    $scope.initFormAddOperateur = function () {
      $scope.afficheListeProfil();
    };
    // fin initialisation operteur

    //debut initialisation operteur
    $scope.initFormAddModificationOperateur = function () {
      $scope.etatForm = "2";
      $scope.afficheListeProfil();
    };
    // fin initialisation operteur

    //debut initialisation operteur
    $scope.initFormListOperateur = function () {
      $scope.afficheListeEntrepot();
    };
    //fin initialisation operteur

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV BAMBA*/

    $scope.UserCurrent = function () {
      localStorage.setItem(
        "userCurrent",
        angular.toJson($scope.OperateurEnCours)
      );
    };

    //debut connexion
    $scope.login = function () {
      $scope.$emit("LOAD");
      if ($scope.Auth.userEmail == "" || $scope.Auth.userPassword == "") {
        $scope.$emit("UNLOAD");
        return null;
      } else {
        // vider les espaces de rangement
        localStorage.clear();
        sessionStorage.clear();

        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: "1000",
            OP_LOGIN: $scope.Auth.userEmail,
            OP_MOTPASSE: $scope.Auth.userPassword,
            SL_LIBELLEECRAN: "Connexion à l'application",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: "04",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: "",
              OE_Y: "",
              OE_J: "",
            },
          },
        ];

        $http
          .post("/Operateur/ListeOperateur/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.OperateurEnCours = reponse.data;
            sessionStorage.setItem("infoCurrentUser", $scope.OperateurEnCours);
            if (
              $scope.OperateurEnCours[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              if ($scope.OperateurEnCours[0].OP_CODEOPERATEUR != null) {
                if($scope.OperateurEnCours[0].SL_NOMBRECONNECTION == 0){
                  $scope.$emit("UNLOAD");
                  $scope.UserCurrent();
                  $cookies.put("user", $scope.OperateurEnCours);
                  $rootScope.user = $cookies.get("user");
                  $scope.formLogin = false
                  $scope.formforgotcontact = false
                  $scope.formforgotcodeValid = false
                  $scope.formforgotcodenewmdp = false
                  $scope.formupdatemdp = true
                }else{
                  $scope.UserCurrent();
                  $cookies.put("user", $scope.OperateurEnCours);
                  $rootScope.user = $cookies.get("user");
                  window.location.href = "#/assistance-mode";
                  $scope.$emit("UNLOAD");
                  parent.location.reload();
                }
                
              }
            } else {
              $scope.isNotLogged = true;
              //                            $scope.Auth.errorMsg = reponse.data[0].clsObjetRetour['SL_MESSAGE']
              $scope.$emit("UNLOAD");
              toastr.options = {
                closeButton: false,
                debug: false,
                newestOnTop: false,
                progressBar: false,
                positionClass: "toast-top-right",
                preventDuplicates: false,
                onclick: null,
                showDuration: "500",
                hideDuration: "550",
                timeOut: "3500",
                extendedTimeOut: "1000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
              };
              toastr.error(reponse.data[0].clsObjetRetour["SL_MESSAGE"]);
            }
          });
      }
    };
    //fin connexion

    /*FIN DEV BAMBA*/

    $scope.selectForm = function () {
      $scope.formLogin = false
      $scope.formforgotcontact = true
      $scope.formforgotcodeValid = false
      $scope.formforgotcodenewmdp = false
      $scope.formupdatemdp = false


    }
    $scope.retourlogin = function () {
      $scope.formLogin = true
      $scope.formforgotcontact = false
      $scope.formforgotcodeValid = false
      $scope.formforgotcodenewmdp = false
      $scope.formupdatemdp = false
    }

    //debut code forgot password

 $scope.forgotpasswordcont = function () {
      $scope.$emit("LOAD");
      var d = new Date()
      var mois = d.getMonth()
      if(mois < 9){
        var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear()
      }else{
        var date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
      }
    // var date = d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
      var jour = d.getDate()
      if(jour < 10){
        date = '0'+ d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
        console.log(date)
      }
    console.log(date)
      if ($scope.formForgotPassword.contact == "" || $scope.formForgotPassword.contact == "") {
        $scope.$emit("UNLOAD");
        $rootScope.EnregistrementNonReussi("veuillez saisir un email ou contact svp !!!")
      } else {
        // vider les espaces de rangement
        localStorage.clear();
        sessionStorage.clear();

        $scope.objet_envoie = [
          {
            "AG_CODEAGENCE": "1000",
            "RP_DATE": date,
            "RP_NUMSEQUENCE": "",
            "TI_IDTIERS": "",
            "MB_IDTIERS": "",
            "OP_CODEOPERATEUR": "",
            "RP_CODEVALIDATION": "",
            "RP_HEURE": "",
            "CL_CONTACT": $scope.formForgotPassword.contact.trim(),
            "RP_DATECLOTURE": "",
            "MI_MICCOMPTEWEBMOTPASSEOUBLIE1": "",
            "MI_MICCOMPTEWEBMOTPASSEOUBLIE2": "",
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "03",
            "SL_VERSIONAPK":"1",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
                "OE_A": "1000",
                "OE_Y": "100000001",
                "OE_J": "18-10-2019"
            }

          },
        ];

        $http
          .post("/MotDePasse/ForGotPassword/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.RetoursForgotPasswords = reponse.data;
            
            if (
              $scope.RetoursForgotPasswords[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.RetoursForgotPasswords[0].clsObjetRetour.SL_MESSAGE
              );
             
              $scope.formLogin = false
              $scope.formforgotcontact = false
              $scope.formforgotcodeValid = true
              $scope.formforgotcodenewmdp = false
              $scope.formupdatemdp = false

              $scope.RP_CODEVALIDATION =
              $scope.RetoursForgotPasswords[0].RP_CODEVALIDATION;
              $scope.RP_DATE =
              $scope.RetoursForgotPasswords[0].RP_DATE;
              $scope.RP_HEURE =
              $scope.RetoursForgotPasswords[0].RP_HEURE;
             
            } else {
              //$scope.isNotLogged = true;
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi($scope.RetoursForgotPasswords[0].clsObjetRetour.SL_MESSAGE)
            }
          });
      }
    };

    
    // mot de passe oublié
    $scope.CodeDeValidation = function() {
      $scope.code = $scope.formForgotPassword.code;
      if ($scope.code == $scope.RP_CODEVALIDATION) {
        $scope.formLogin = false
        $scope.formforgotcontact = false
        $scope.formforgotcodeValid = false
        $scope.formforgotcodenewmdp = true
        $scope.formupdatemdp = false
      } else {
        $rootScope.EnregistrementNonReussi('Code de validation incorrecte.')
       
      }
    }
    //fin
    $scope.DateSysteme = function(laDate) {
      if (laDate.getMonth() + 1 < 10) {
        var leMois = '0' + (laDate.getMonth() + 1);
      }
      $scope.dateSys =
        laDate.getDate() + '-' + leMois + '-' + laDate.getFullYear();
      console.log($scope.dateSys);
    }
    $scope.ReplacePassword = function () {
      var d = new Date()
      var mois = d.getMonth()
      if(mois < 9){
        var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear()
      }else{
        var date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
      }
    // var date = d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
      var jour = d.getDate()
      if(jour < 10){
        date = '0'+ d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
        console.log(date)
      }
    console.log(date)
      $scope.$emit("LOAD");
      if (
        $scope.formForgotPassword.MotDePasse !==
        $scope.formForgotPassword.MotDePasseConfirme
      ) {
        $rootScope.EnregistrementNonReussi('Les mots de passe doivent être conforme.')
       
      }else if($scope.formForgotPassword.MotDePasse == '0000'){
        $rootScope.EnregistrementNonReussi('Le mot de pass ne doit pas etre 0000')
       
      } else if ($scope.code == $scope.RP_CODEVALIDATION) {
      //  $scope.DateSysteme(new Date());
        // vider les espaces de rangement
        localStorage.clear();
        sessionStorage.clear();

        $scope.objet_envoie = [
          {
                "DATEJOURNEE": date,//$scope.dateSys,
                "SL_MOTDEPASSE": $scope.formForgotPassword.MotDePasseConfirme,
                "RP_CODEVALIDATION": $scope.RP_CODEVALIDATION,
                "RP_DATE": $scope.RP_DATE,
                "RP_HEURE": $scope.RP_HEURE,
                "SL_LIBELLEECRAN": "Saisie de Continent",
                "SL_LIBELLEMOUCHARD": "INSERTIONS",
                "TYPEOPERATION": "02",
                "SL_VERSIONAPK":"1",
                "LG_CODELANGUE": "fr",
                "clsObjetEnvoi": {
                    "OE_A": "1000",
                    "OE_Y": "100000001",
                    "OE_J": "18-10-2019"
                }
          },
        ];

        $http
          .post("/MotDePasse/NewPassword/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.RetoursChangPassword = reponse.data;
            
            if (
              $scope.RetoursChangPassword[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.RetoursChangPassword[0].clsObjetRetour.SL_MESSAGE
              );
             
              $scope.formforgotcontact = false
              $scope.formforgotcodeValid = false
              $scope.formforgotcodenewmdp = false
              $scope.formupdatemdp = false
              $scope.formLogin = true
             
            } else {
              //$scope.isNotLogged = true;
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi($scope.RetoursChangPassword[0].clsObjetRetour.SL_MESSAGE)
            }
          });
      } else {
        $scope.$emit("UNLOAD");
        $rootScope.EnregistrementNonReussi("veuillez saisir un code ou mot de passe valide svp !!!")
        
      }
    };

    $scope.UpdatePassword = function () {
      $scope.$emit("LOAD");
      if (
        $scope.changePassword.MotDePasse !==
        $scope.changePassword.MotDePasse
      ) {
        $rootScope.EnregistrementNonReussi('Les mots de passe doivent être conforme.')
       
      }else if($scope.changePassword.MotDePasse == '0000'){
        $rootScope.EnregistrementNonReussi('Le mot de pass ne doit pas etre 0000')
       
      } else {
      

        $scope.objet_envoie = [
          {
            "DATEJOURNEE": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            "SL_MOTPASSEOLD": $rootScope.infoDeLoperateur[0].OP_MOTPASSE,
            "SL_LOGINOLD": $rootScope.infoDeLoperateur[0].OP_LOGIN,
            "SL_MOTPASSENEW": $scope.changePassword.MotDePasse,
            "SL_LOGINNEW": $scope.changePassword.Login,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD": "INSERTIONS",
            "TYPEOPERATION": "04",
            "SL_VERSIONAPK":"1",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              
            }
          },
        ];

        $http
          .post("/MotDePasse/UpdatePassword/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.RetoursUpdatePassword = reponse.data;
            
            if (
              $scope.RetoursUpdatePassword[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.RetoursUpdatePassword[0].clsObjetRetour.SL_MESSAGE
              );
             
              $scope.formforgotcontact = false
              $scope.formforgotcodeValid = false
              $scope.formforgotcodenewmdp = false
              $scope.formupdatemdp = false
              $scope.formLogin = true
             
            } else {
              //$scope.isNotLogged = true;
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi($scope.RetoursUpdatePassword[0].clsObjetRetour.SL_MESSAGE)
            }
          });
      } 
    };



    //debut Developpement Anicette

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idNCompteTresorerie").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTelephone").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNCoffre").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idMontCompte").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumClient").maxlength({
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

    ////    //debut contrainte sur les champs add Operateur
    ////$scope.contrainteFormAddOperateur = function () {
    ////    FormValidation.formValidation(
    ////        document.getElementById('formAddOperateur'), {
    ////            fields: {
    ////                addOperateur_NomPrenom: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir des noms et prenoms.'
    ////                        },
    ////                        regexp: {
    ////                            regexp: /^[a-z-A-Z]/,
    ////                            message: 'Veuillez saisir un nom correcte.'
    ////                        }
    ////                    }
    ////                },
    ////                addOperateur_Login: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le login.'
    ////                        },
    ////                    }
    ////                },
    ////                addOperateur_MotDePasse: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le mot de passe'
    ////                        },
    ////                    }
    ////                },
    ////                addOperateur_Confirmation: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez Confirmer.'
    ////                        },
    ////                    }
    ////                },
    ////                addOperateur_Profil: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le profil.'
    ////                        },
    ////                    }
    ////                },
    ////                addOperateur_Email: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir l email.'
    ////                        },
    ////                         regexp: {
    ////                            regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ////                            message: 'Veuillez saisir une adresse mail correct.'
    ////                        }
    ////                    }
    ////                },
    ////                addOperateur_Telephone: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le telephone.'
    ////                        },
    ////                        regexp: {
    ////                            regexp: /^\d+$/,
    ////                            message: 'Veuillez saisir un numéro de téléphone correct.'
    ////                        }
    ////                    }
    ////                },
    ////                addOperateur_NCompteTresorerie: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le numero du compte.'
    ////                        },
    ////                        //regexp: {
    ////                        //    regexp: /^[0-9]+$/,
    ////                        //    message: 'Veuillez saisir un n° compte correct.'
    ////                        //}
    ////                    }
    ////                },
    ////                addOperateur_NCoffre: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le numero du compte.'
    ////                        },
    ////                        //regexp: {
    ////                        //    regexp: /^[0-9]+$/,
    ////                        //     message: 'Veuillez saisir un n° compte correct.'
    ////                        // }
    ////                    }
    ////                },
    ////                addOperateur_MontCompte: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le montant du compte.'
    ////                        },
    ////                        regexp: {
    ////                            regexp: /^[0-9]{1,15}$/,
    ////                            message: 'Veuillez saisir un plafond crédit correct.'
    ////                        }
    ////                    }
    ////                },
    ////                addOperateur_NumClient: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le client de vente.'
    ////                        },
    ////                        regexp: {
    ////                            regexp: /^[0-9]+$/,
    ////                            message: 'Veuillez saisir un n° compte correct.'
    ////                        }
    ////                    }
    ////                },
    ////                addOperateur_ClientVente: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez saisir le client de vente.'
    ////                        },
    ////                    }
    ////                },
    ////                addOperateur_TypeOperateur: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez sélectionner le type d/operateur.'
    ////                        },
    ////                    }
    ////                },
    ////                addOperateur_Service: {
    ////                    validators: {
    ////                        notEmpty: {
    ////                            message: 'Veuillez sélectionner le service.'
    ////                        },
    ////                    }
    ////                },
    ////            },
    ////            plugins: {
    ////                trigger: new FormValidation.plugins.Trigger(),
    ////                // Bootstrap Framework Integration
    ////                bootstrap: new FormValidation.plugins.Bootstrap(),
    ////                // Validate fields when clicking the Submit button
    ////                submitButton: new FormValidation.plugins.SubmitButton(),
    ////                // Submit the form when all fields are valid
    ////                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
    ////            }
    ////        }
    ////    );
    ////}
    ////    //fin contrainte sur les champs add Operateur

    //debut contrainte sur les champs list CHEQUE
    $scope.contrainteFormlistOperateur = function () {
      FormValidation.formValidation(
        document.getElementById("formListOperateur"),
        {
          fields: {
            listOperateur_Entrepot: {
              validators: {
                notEmpty: {
                  message: "Veuillez selectionner un entrepot.",
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
    //fin contrainte sur les champs list CHEQUE

    //debut liste Entrepot
    $scope.afficheListeEntrepot = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/Entrepot/ListeEntrepot/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEntrepot = reponse.data;
          $scope.$emit("UNLOAD");
          console.log($scope.listeEntrepot);
        });
    };
    //fin liste Entrepot

    //debut voir plus
    $scope.voirPlusOperateur = function (info) {
      sessionStorage.setItem("vpOperateur", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpOperateur"));
    };
    //fin voir plus

    //debut acceder a la page de modification
    $scope.voirModifOperateur = function (info) {
      sessionStorage.setItem("modifOperateur", JSON.stringify(info));
      window.location.href = "#/operateur/modification/utilisateur";
    };
    //debut acceder a la page de modification
    $(document).ready(function () {
      if ($scope.formaddboutn[0].valeur == "O") {
        $("#inpu0").prop("checked", true);
      } else {
        $("#inpu0").prop("checked", false);
      }
      if ($scope.formaddboutn[1].valeur == "O") {
        $("#inpu1").prop("checked", true);
      } else {
        $("#inpu1").prop("checked", false);
      }
      if ($scope.formaddboutn[2].valeur == "O") {
        $("#inpu2").prop("checked", true);
      } else {
        $("#inpu2").prop("checked", false);
      }
      if ($scope.formaddboutn[3].valeur == "O") {
        $("#inpu3").prop("checked", true);
      } else {
        $("#inpu3").prop("checked", false);
      }
      if ($scope.formaddboutn[4].valeur == "O") {
        $("#inpu4").prop("checked", true);
      } else {
        $("#inpu4").prop("checked", false);
      }
      if ($scope.formaddboutn[5].valeur == "O") {
        $("#inpu5").prop("checked", true);
      } else {
        $("#inpu5").prop("checked", false);
      }
      if ($scope.formaddboutn[6].valeur == "O") {
        $("#inpu6").prop("checked", true);
      } else {
        $("#inpu6").prop("checked", false);
      }
      if ($scope.formaddboutn[7].valeur == "O") {
        $("#inpu7").prop("checked", true);
      } else {
        $("#inpu7").prop("checked", false);
      }
      if ($scope.formaddboutn[8].valeur == "O") {
        $("#inpu8").prop("checked", true);
      } else {
        $("#inpu8").prop("checked", false);
      }
      if ($scope.formaddboutn[9].valeur == "O") {
        $("#inpu9").prop("checked", true);
      } else {
        $("#inpu9").prop("checked", false);
      }
      if ($scope.formaddboutn[10].valeur == "O") {
        $("#inpu10").prop("checked", true);
      } else {
        $("#inpu10").prop("checked", false);
      }
      if ($scope.formaddboutn[11].valeur == "O") {
        $("#inpu11").prop("checked", true);
      } else {
        $("#inpu11").prop("checked", false);
      }
    });

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id) {
      $scope.FormAddOperateur.NumClient = code;
      $scope.FormAddOperateur.ClientDeVente = denomination;
      $scope.FormAddOperateur.id1 = id;
    };
    //Fin choix d'un souscripteur

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function (info, info2) {
      if (info == undefined) {
        info = "";
      }
      if (info2 == undefined) {
        info = "";
      }
      //$scope.$emit('LOAD');
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_NUMTIERS: info,
          TI_DENOMINATION: info2,
          TP_CODETYPETIERS: "001",
          SC_CODESECTION: "",
          TI_CLTVENTCAISSE: "001",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          /*AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          TI_NUMTIERS: info,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_AGENCE,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "OPERATEUR",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "TIERS",
          LG_CODELANGUE: "fr",*/
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        },
      ];
      $http
        .post("/LesTiers/RechercherLeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          //$scope.$emit('UNLOAD');
          $scope.listeDesSouscripteurs = reponse.data;
          console.log($scope.listeDesSouscripteurs);
        });
    };
    //fin liste des souscripteur

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      $scope.FormAddOperateur.N_CompteTresorerie = collection.PL_NUMCOMPTE;
      $scope.FormAddOperateur.PL_CODENUMCOMPTE = collection.PL_CODENUMCOMPTE;
      // $scope.FormAddOperateur.N_CompteCoffre = collection.PL_NUMCOMPTE;
      $scope.FormAddOperateur.PL_CODENUMCOMPTECOFFREFORT =
        collection.PL_CODENUMCOMPTECOFFREFORT;
    };
    $scope.choixNumCompte2 = function (collection) {
      // $scope.FormAddOperateur.N_CompteTresorerie = collection.PL_NUMCOMPTE;
      $scope.FormAddOperateur.PL_CODENUMCOMPTE = collection.PL_CODENUMCOMPTE;
      $scope.FormAddOperateur.N_CompteCoffre = collection.PL_NUMCOMPTE;
      $scope.FormAddOperateur.PL_CODENUMCOMPTECOFFREFORT =
        collection.PL_CODENUMCOMPTECOFFREFORT;
    };
    //Fin choix d'un compte

    //Fin choix d'un compte

    //debut liste des comptes
    $scope.afficheListeNumCompte = function (PLNUMCOMPTE) {
      $scope.NC_CODENATURECOMPTE = "";
      switch ($scope.FormAddOperateur.typeDuTiers) {
        case "001":
          $scope.NC_CODENATURECOMPTE = "03";
          break;
        case "002":
          $scope.NC_CODENATURECOMPTE = "04";
          break;
        default:
          $scope.NC_CODENATURECOMPTE = "";
      }
      if (PLNUMCOMPTE == undefined) {
        PLNUMCOMPTE = "";
      }
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: PLNUMCOMPTE,
          NC_CODENATURECOMPTE: "01",
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesNumComptes = reponse.data;
        });
    };
    //fin liste des comptes

    //debut photo
    $scope.imgBase64 = function (elt) {
      if ($scope.formatImage == "image/png") {
        $scope.base64 = elt.replace("data:image/png;base64,", "");
      } else {
        $scope.base64 = elt.replace("data:image/jpeg;base64,", "");
      }
    };

    $scope.formatImagePhoto = "";
    $scope.previewPhoto = function (event) {
      var files = event.target.files;
      var file = files[files.length - 1];
      $scope.formatImagePhoto = file.type;
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.avatar = e.target.result;
          $scope.imgBase64($scope.avatar);
        });
      };
      reader.readAsDataURL(file);
    };
    // fin  photo

    //debut reinitialiser la page
    $scope.resetPageOperateur = function () {
      $scope.FormAddOperateur = {};
      $scope.FormAddOperateur.img_avatar = "";
      $("#photoOp").attr("src", "");
      window.location.reload();
    };
    //fin reinitialiser la page

    //debut focus sur le champ enregistrement
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#idNomPrenom").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idLogin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMotPasse").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idConfirmation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idProfil").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeOperateur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idmontant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCode").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#idPhone").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#idService").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Ncomptedetresorerie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Ncomptecoffre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Email").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ enregistrement

    //Debut ajout Operateur
    $scope.validationOperateur = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOperateur"));
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typeNumero = /^(0|[0-9]\d*)$/;
      let typemontant = /^[0-9]{1,15}$/;
      //let typeEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (
        $scope.FormAddOperateur.MontCaisse == "" ||
        $scope.FormAddOperateur.MontCaisse == undefined
      ) {
        $scope.FormAddOperateur.MontCaisse = 0;
      }
      if (
        $scope.FormAddOperateur.Nom_Prenom === "" ||
        $scope.FormAddOperateur.Nom_Prenom === undefined ||
        $scope.FormAddOperateur.Login === "" ||
        $scope.FormAddOperateur.Login === undefined ||
        $scope.FormAddOperateur.MotDePasse === "" ||
        $scope.FormAddOperateur.MotDePasse === undefined ||
        $scope.FormAddOperateur.Confirmation === "" ||
        $scope.FormAddOperateur.Confirmation === undefined ||
        $scope.FormAddOperateur.Profil === "" ||
        $scope.FormAddOperateur.Profil === undefined ||
        $scope.FormAddOperateur.Email === "" ||
        $scope.FormAddOperateur.Email === undefined ||
        $scope.FormAddOperateur.Telephone === "" ||
        $scope.FormAddOperateur.Telephone === undefined ||
        $scope.FormAddOperateur.TypeOperateur === "" ||
        $scope.FormAddOperateur.TypeOperateur === undefined ||
        $scope.FormAddOperateur.Service === "" ||
        $scope.FormAddOperateur.Service === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddOperateur.Nom_Prenom === "" ||
            $scope.FormAddOperateur.Nom_Prenom === undefined
          ) {
            $("#idNomPrenom").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperateur.Login === "" ||
            $scope.FormAddOperateur.Login === undefined
          ) {
            $("#idLogin").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddOperateur.Telephone === "" ||
            $scope.FormAddOperateur.Telephone === undefined
          ) {
            $("#idPhone").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddOperateur.MotDePasse === "" ||
            $scope.FormAddOperateur.MotDePasse === undefined
          ) {
            $("#idMotPasse").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperateur.Confirmation === "" ||
            $scope.FormAddOperateur.Confirmation === undefined
          ) {
            $("#idConfirmation").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperateur.TypeOperateur === "" ||
            $scope.FormAddOperateur.TypeOperateur === undefined
          ) {
            $("#idTypeOperateur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperateur.Email === "" ||
            $scope.FormAddOperateur.Email === undefined
          ) {
            $("#Email").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperateur.Service === "" ||
            $scope.FormAddOperateur.Service === undefined
          ) {
            $("#idService").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperateur.Profil === "" ||
            $scope.FormAddOperateur.Profil === undefined
          ) {
            $("#idProfil").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeAlphabetique.test($scope.FormAddOperateur.Nom_Prenom) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un  nom  correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddOperateur.Telephone) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormAddOperateur.MontCaisse) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt(
          $scope.FormAddOperateur.Confirmation.localeCompare(
            $scope.FormAddOperateur.MotDePasse
          )
        ) !== 0
      ) {
        $scope.messageErreur = "Veuillez confirmer le mot de passe";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
          $scope.CODE_OPERATEUR = $scope.FormAddOperateur.operateur;

          if (
            $scope.FormAddOperateur.NumClient == "" ||
            $scope.FormAddOperateur.NumClient == undefined
          ) {
            $scope.FormAddOperateur.id1 = "";
            $scope.FormAddOperateur.ClientDeVente = "";
          }
          //for (i = 0; $scope.formaddboutn.length > i; i++) {
          //    for (j = 0; $scope.selectedMorebtn.length > j; j++) {
          //        if (parseInt($scope.selectedMorebtn[j].id) == parseInt($scope.formaddboutn[i].id)) {
          //            if ($scope.formaddboutn[i].valeur == "O") {
          //                $scope.formaddboutn[i].valeur = "N";
          //                break;
          //            }
          //            if ($scope.formaddboutn[i].valeur == "N") {
          //                $scope.formaddboutn[i].valeur = "O";
          //                break;
          //            }

          //        }
          //    }
          //}
          //$scope.OP_CODEOPERATEUR = $scope.recuperer.OP_CODEOPERATEUR;
        } else {
          /* for (i = 0; $scope.formaddboutn.length > i; i++) {
            for (j = 0; $scope.selectedMorebtn.length > j; j++) {
              if (
                parseInt($scope.selectedMorebtn[j].id) ==
                parseInt($scope.formaddboutn[i].id)
              ) {
                if ($scope.formaddboutn[i].valeur == "O") {
                  $scope.formaddboutn[i].valeur = "N";
                  break;
                }
                if ($scope.formaddboutn[i].valeur == "N") {
                  $scope.formaddboutn[i].valeur = "O";
                  break;
                }
              }
            }
          }*/
          $scope.TYPEOPERATION = "0";
          $scope.CODE_OPERATEUR = $rootScope.CODE_OPERATEUR;
        }
        if (
          $scope.formaddboutn[2].valeur == "N" &&
          $scope.FormAddOperateur.N_CompteTresorerie !== "" &&
          $scope.FormAddOperateur.N_CompteCoffre !== ""
        ) {
          $("#Ncomptedetresorerie").css("background-color", "#FFE9E0");
          $("#Ncomptecoffre").css("background-color", "#FFE9E0");
          $scope.messageErreur =
            "L'agent de caisse est décoché !!! Impossible de saisir les numéros des comptes";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.formaddboutn[2].valeur == "O" &&
          ($scope.FormAddOperateur.N_CompteTresorerie == "" ||
            $scope.FormAddOperateur.N_CompteTresorerie == undefined)
        ) {
          $("#Ncomptedetresorerie").css("background-color", "#FFE9E0");

          $scope.messageErreur = "Le numéro de compte est obligatoire";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.formaddboutn[2].valeur == "O" &&
          ($scope.FormAddOperateur.N_CompteCoffre == "" ||
            $scope.FormAddOperateur.N_CompteCoffre == undefined)
        ) {
          $("#Ncomptecoffre").css("background-color", "#FFE9E0");

          $scope.messageErreur = "Le numéro de compte coffre est obligatoire";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.formaddboutn[2].valeur == "N" &&
          $scope.formaddboutn[3].valeur == "O"
        ) {
          $("#idService").css("background-color", "#FFE9E0");
          $scope.messageErreur =
            "Si l'agent de caisse est décoché impossible de cocher impression automatique ";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              PO_CODEPROFIL: $scope.FormAddOperateur.Profil,
              TO_CODETYPEOERATEUR: $scope.FormAddOperateur.TypeOperateur,
              PL_NUMCOMPTE: $scope.FormAddOperateur.N_CompteTresorerie,
              PL_NUMCOMPTECOFFREFORT: $scope.FormAddOperateur.N_CompteCoffre,
              OP_NOMPRENOM: $scope.FormAddOperateur.Nom_Prenom,
              OP_LOGIN: $scope.FormAddOperateur.Login,
              OP_MOTPASSE: $scope.FormAddOperateur.MotDePasse,
              OP_ACTIF: $scope.formaddboutn[0].valeur,
              OP_TELEPHONE: $scope.FormAddOperateur.Telephone,
              OP_EMAIL: $scope.FormAddOperateur.Email,
              OP_JOURNEEOUVERTE: $scope.formaddboutn[1].valeur,
              OP_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_GESTIONNAIRE: "N",
              OP_CAISSIER: $scope.formaddboutn[2].valeur,
              OP_IMPRESSIONAUTOMATIQUE: $scope.formaddboutn[3].valeur,
              OP_MONTANTTOTALENCAISSEAUTORISE:
                $scope.FormAddOperateur.MontCaisse,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              TI_IDTIERS: $scope.FormAddOperateur.id1,
              OP_EXTOURNE: $scope.formaddboutn[5].valeur,
              OP_CREATIONJOURNE: $scope.formaddboutn[6].valeur,
              OP_FERMETUREJOURNE: $scope.formaddboutn[7].valeur,
              SR_CODESERVICE: $scope.FormAddOperateur.Service,
              OH_PHOTO: $scope.tableauimage[0],
              /* $scope.base64 === undefined
                  ? $scope.recupererInfo.OH_PHOTO
                  : $scope.base64,*/
              OP_CREATIONPROFILE: $scope.formaddboutn[8].valeur,
              OP_CREATIONOPERATEUR: $scope.formaddboutn[9].valeur,
              OP_SELECTIONOPERATEURAPPRO: $scope.formaddboutn[10].valeur,
              OP_SELECTIONOPERATEURVENTE: $scope.formaddboutn[11].valeur,
              OP_CONTREPARTIEAUTOMATIQUEOD: $scope.formaddboutn[4].valeur,
              OP_CODEOPERATEUR: $scope.CODE_OPERATEUR,
              SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
              SL_LIBELLEECRAN: "OPERATEUR",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];
          if ($scope.etatForm == "2") {
            $http
              .post("/Operateur/ModificationOperateur/", $scope.objet_envoie, {
                //headers: $scope.headers
              })
              .then(function (reponse) {
                $scope.testModificationOperateur = reponse.data;
                if (
                  $scope.testModificationOperateur[0].clsObjetRetour
                    .SL_RESULTAT == "TRUE"
                ) {
                  $rootScope.EnregistrementReussi(
                    $scope.testModificationOperateur[0].clsObjetRetour
                      .SL_MESSAGE
                  );
                  $scope.RetourSurListe = function () {
                    window.location.href = "#/operateur/liste/utilisateur";
                  };
                  $scope.$emit("UNLOAD");
                  setTimeout($scope.RetourSurListe, 3600);
                } else {
                  $scope.$emit("UNLOAD");
                  $rootScope.EnregistrementNonReussi(
                    $scope.testModificationOperateur[0].clsObjetRetour
                      .SL_MESSAGE
                  );
                }
              })
              .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.testModificationOperateur[0].clsObjetRetour.SL_MESSAGE
                );
              });
          } else {
            $http
              .post("/Operateur/AjoutOperateur/", $scope.objet_envoie, {
                //headers: $scope.headers
              })
              .then(function (reponse) {
                $scope.testAjoutOperateur = reponse.data;
                if (
                  $scope.testAjoutOperateur[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                  $scope.$emit("UNLOAD");
                  $rootScope.EnregistrementReussi(
                    $scope.testAjoutOperateur[0].clsObjetRetour.SL_MESSAGE
                  );
                  $scope.resetPageOperateur();
                } else {
                  $scope.$emit("UNLOAD");
                  $rootScope.EnregistrementNonReussi(
                    $scope.testAjoutOperateur[0].clsObjetRetour.SL_MESSAGE
                  );
                }
              })
              .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.testAjoutOperateur[0].clsObjetRetour.SL_MESSAGE
                );
              });
          }
        }
      }
    };
    //Fin ajout Operateur

    //debut recuperer id pour la suppression du contrat
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du contrat

    //debut  suppression
    $scope.supprimeOperateur = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: recupId,
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/Operateur/SuppressionOperateur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.testSuppressionOperateur = reponse.data;
          //console.log($scope.testSuppressionOperateur)
          if (
            $scope.testSuppressionOperateur[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppressionOperateur[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeOperateur[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.testSuppressionOperateur[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.testSuppressionOperateur[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin  suppression

    //debut liste des OPERATEURS
    $scope.afficheListeOperateur = function (idcode) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: idcode,
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/Operateur/ListeOperateur1/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeOperateur = reponse.data;
          $scope.nombreInfoBulle = $scope.listeOperateur.length;
          console.log($scope.listeOperateur);
        });
    };
    //fin liste des OPERATEURS

    $scope.process = function () {
      let file = document.querySelector("#upload").files;
      // let fichier = document.querySelector('input[type=file]').files;

      var readAndPreview = function (file) {
        // Veillez à ce que `file.name` corresponde à nos critères d’extension
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          $scope.tableauimage = [];
          $scope.tableauimage2 = [];
          // $scope.imga = ""
          reader = new FileReader();
          var tbsl = [];
          reader.addEventListener(
            "load",
            function () {
              image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              if ($scope.etatForm == 2) {
                $scope.tableauimage2.push(image.src);
              } else {
                $scope.tableauimage2.push(image.src);
              }

              // $scope.imga = image.src;
              $scope.afficherimage();
              tbsl = this.result.split(",");
              $scope.tableauimage.push(tbsl[1]);
              console.log($scope.tableauimage);
              // preview.appendChild(image);
            },
            false
          );

          reader.readAsDataURL(file);
          // localStorage.setItem("infoimg", JSON.stringify(reader.result));
          //console.log($scope.tableauimage)
        } else {
          $scope.messageErreur =
            "Format de fichier non prit en charge. Veuillez selectionner des images au format PNG ou JPEG ou JPG";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
      };

      if (file) {
        [].forEach.call(file, readAndPreview);
      }

      document.getElementById("upload").value = "";
    };
    $(document).on("click", ".tdsuppr", function () {
      $(this).data("id");
      $scope.recupsuprimg($(this).data("id"));
      console.log($(this).data("id"));
    });
    $scope.afficherimage = function () {
      if ($scope.etatForm == 2) {
        // $scope.tableauimage2 =[]

        var templathtmlsuppr = "";
        var templathtml = "";
        var elmnt = document.getElementById("boucleimg");
        elmnt.innerHTML = "";
        var elmntsuppr = document.getElementById("boucleimgsuppr");
        elmntsuppr.innerHTML = "";
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          templathtml +=
            '<td><img src="' +
            $scope.tableauimage2[i] +
            '" height=' +
            100 +
            " /></td>";
          templathtmlsuppr +=
            '<td class="tdsuppr" data-id="' +
            i +
            '"><button class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="#modalsurpp">Supprimer</button></td>';
        }

        elmnt.innerHTML = templathtml;
        elmntsuppr.innerHTML = templathtmlsuppr;
      } else {
        var templathtmlsuppr = "";
        var templathtml = "";
        var elmnt = document.getElementById("boucleimg");
        elmnt.innerHTML = "";
        var elmntsuppr = document.getElementById("boucleimgsuppr");
        elmntsuppr.innerHTML = "";
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          templathtml +=
            '<td><img src="' +
            $scope.tableauimage2[i] +
            '" height=' +
            100 +
            " /></td>";
          templathtmlsuppr +=
            '<td class="tdsuppr" data-id="' +
            i +
            '"><button class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="#modalsurpp">Supprimer</button></td>';
        }

        elmnt.innerHTML = templathtml;
        elmntsuppr.innerHTML = templathtmlsuppr;
      }
    };

    $scope.recupsuprimg = function (lien) {
      $scope.idimagcheque = lien;
    };
    $scope.suprimg = function () {
      if ($scope.etatForm == 2) {
        var tbsll = [];
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage2.splice(i, 1);
          }
        }

        //tbsll = $scope.idimagcheque.split(',');
        for (i = 0; $scope.tableauimage.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage.splice(i, 1);
          }
        }
        //$scope.tableauimage2.push(/Content/assets/media/illustration/undraw_profile_pic_ic5t.svg)
        $scope.afficherimage();
      } else {
        var tbsll = [];
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage2.splice(i, 1);
          }
        }

        //tbsll = $scope.idimagcheque.split(',');
        for (i = 0; $scope.tableauimage.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage.splice(i, 1);
          }
        }
        $scope.afficherimage();
      }
    };

    /* $scope.selectedMorebtn = [];
    $scope.existedMorebtn = function (item) {
      if (item == "O") {
        return true;
      }
      //return $scope.selectedMore.indexOf(item) > -1;
    };
    $scope.toggleSelectedMorebtn = function (item) {
      if ($scope.etatForm == "2") {
        let idx = $scope.selectedMorebtn.indexOf(item);
        if (idx > -1) {
          for (i = 0; $scope.formaddboutn.length > i; i++) {
            if (item.nom == $scope.formaddboutn[i].nom) {
              if ($scope.formaddboutn[i].valeur == "O") {
                $scope.formaddboutn[i].valeur = "N";
                break;
              }
            }
          }

          $scope.selectedMorebtn.splice(idx, 1);
        } else {
          $scope.selectedMorebtn.push(item);
          for (i = 0; $scope.formaddboutn.length > i; i++) {
            for (j = 0; $scope.selectedMorebtn.length > j; j++) {
              if (
                parseInt($scope.selectedMorebtn[j].id) ==
                parseInt($scope.formaddboutn[i].id)
              ) {
                if ($scope.formaddboutn[i].valeur == "N") {
                  $scope.formaddboutn[i].valeur = "O";
                  break;
                }
              }
            }
          }
        }

        console.log($scope.selectedMorebtn);
      }
      if ($scope.etatForm !== "2") {
        let idx = $scope.selectedMorebtn.indexOf(item);
        if (idx > -1) {
          for (i = 0; $scope.formaddboutn.length > i; i++) {
            if (item.nom == $scope.formaddboutn[i].nom) {
              if ($scope.formaddboutn[i].valeur == "O") {
                $scope.formaddboutn[i].valeur = "N";
                break;
              }
            }
          }

          $scope.selectedMorebtn.splice(idx, 1);
        } else {
          $scope.selectedMorebtn.push(item);
          for (i = 0; $scope.formaddboutn.length > i; i++) {
            for (j = 0; $scope.selectedMorebtn.length > j; j++) {
              if (
                parseInt($scope.selectedMorebtn[j].id) ==
                parseInt($scope.formaddboutn[i].id)
              ) {
                if ($scope.formaddboutn[i].valeur == "N") {
                  $scope.formaddboutn[i].valeur = "O";
                  break;
                }
              }
            }
          }
        }

        console.log($scope.selectedMorebtn);
      }
    };*/

    // //DROIT SUR MENU
    //$scope.droitMenuOperateur = function () {
    //    window.location.href = "#/operateur/droit/menu"
    //};
    //  //DROIT SUR MENU

    //debut droit
    $scope.initdroitMenuOperateur = function () {
      $(document).ready(function () {
        $("#MenuPrincipaux").css("background-color", "Beige");
      });
    };
    //debut recharge page

    //debut aller a Droit sur menu/écran/état
    $scope.redirectDroitMenuPrincipal = function () {
      window.location.href = "#/operateur/liste/droit-menu";
    };
    //debut aller a Droit sur entrepot
    $scope.redirectDroitEntrepot = function () {
      window.location.href = "#/operateur/liste/droit-sur-entrepot";
    };
    //debut aller a Droit de transfert de stock
    $scope.redirectDroitTransfertStock = function () {
      window.location.href = "#/operateur/liste/droit-transfert-stock";
    };
    //debut aller a Droit sur famille opérations
    $scope.redirectDroitFamilleOperation = function () {
      window.location.href = "#/operateur/liste/droit-sur-famille-operation";
    };
    //debut aller a Droit sur opérations de trésorerie et autres écritures
    $scope.redirectDroitOperationTresorerieEtAutreEcritures = function () {
      window.location.href =
        "#/operateur/liste/droit-sur-opération-tresorerie-autre-tiers";
    };
    //debut aller a Droit sur opérations de trésorerie des tiers
    $scope.redirectOperationTresorerie = function () {
      window.location.href =
        "#/operateur/liste/droit-sur-opération-tresorerie-tiers";
    };
    //debut aller a Droit sur autres opérations de tiers
    $scope.redirectDroitAutreOperation = function () {
      window.location.href =
        "#/operateur/liste/droit-sur-autre-opération-tiers";
    };
    //debut aller a Modification de l'entrepot
    $scope.redirectModificationEntrepot = function () {
      window.location.href = "#/operateur/liste/modification-entrepot";
    };
    //debut aller a Droit sur Compte
    $scope.redirectDroitCompte = function () {
      window.location.href = "#/operateur/liste/droit-sur-compte";
    };
    //debut aller a Droit sur agence
    $scope.redirectDroitAgence = function () {
      window.location.href = "#/operateur/liste/droit-sur-agence";
    };

    //CASE A COCHER SUR LA LISTE
    /* $scope.selectedMore = [];
    $scope.existedMore = function (item) {
      if (item == "O") {
        return true;
      }
      //return $scope.selectedMore.indexOf(item) > -1;
    };*/

    /* $scope.toggleSelectedMore = function (item) {
      let idx = $scope.selectedMore.indexOf(item);
      if (idx > -1) {
        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
      }
    };*/

    $scope.COCHE0 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE1 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE2 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE3 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE4 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE5 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE6 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE7 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE8 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE9 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE10 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE11 = function (item) {
      if (item == "O") {
        return true;
      }
    };

    $scope.testval0 = function (item) {
      if ($scope.cpt0 == 0) {
        $scope.formaddboutn[0].valeur = "O";
        $scope.cpt0++;
      } else {
        $scope.formaddboutn[0].valeur = "N";
        $scope.cpt0 = 0;
      }
      console.log($scope.formaddboutn[0].valeur);
    };
    $scope.testval1 = function (item) {
      if ($scope.cpt1 == 0) {
        $scope.formaddboutn[1].valeur = "O";
        $scope.cpt1++;
      } else {
        $scope.formaddboutn[1].valeur = "N";
        $scope.cpt1 = 0;
      }
      console.log($scope.formaddboutn[1].valeur);
    };
    $scope.testval2 = function (item) {
      if ($scope.cpt2 == 0) {
        $scope.formaddboutn[2].valeur = "O";
        $scope.cpt2++;
      } else {
        $scope.formaddboutn[2].valeur = "N";
        $scope.cpt2 = 0;
      }
      console.log($scope.formaddboutn[2].valeur);
    };
    $scope.testval3 = function (item) {
      if ($scope.cpt3 == 0) {
        $scope.formaddboutn[3].valeur = "O";
        $scope.cpt3++;
      } else {
        $scope.formaddboutn[3].valeur = "N";
        $scope.cpt3 = 0;
      }
      console.log($scope.formaddboutn[3].valeur);
    };
    $scope.testval4 = function (item) {
      if ($scope.cpt4 == 0) {
        $scope.formaddboutn[4].valeur = "O";
        $scope.cpt4++;
      } else {
        $scope.formaddboutn[4].valeur = "N";
        $scope.cpt4 = 0;
      }
      console.log($scope.formaddboutn[4].valeur);
    };
    $scope.testval5 = function (item) {
      if ($scope.cpt5 == 0) {
        $scope.formaddboutn[5].valeur = "O";
        $scope.cpt5++;
      } else {
        $scope.formaddboutn[5].valeur = "N";
        $scope.cpt5 = 0;
      }
      console.log($scope.formaddboutn[5].valeur);
    };
    $scope.testval6 = function (item) {
      if ($scope.cpt6 == 0) {
        $scope.formaddboutn[6].valeur = "O";
        $scope.cpt6++;
      } else {
        $scope.formaddboutn[6].valeur = "N";
        $scope.cpt6 = 0;
      }
      console.log($scope.formaddboutn[6].valeur);
    };
    $scope.testval7 = function (item) {
      if ($scope.cpt7 == 0) {
        $scope.formaddboutn[7].valeur = "O";
        $scope.cpt7++;
      } else {
        $scope.formaddboutn[7].valeur = "N";
        $scope.cpt7 = 0;
      }
      console.log($scope.formaddboutn[7].valeur);
    };
    $scope.testval8 = function (item) {
      if ($scope.cpt8 == 0) {
        $scope.formaddboutn[8].valeur = "O";
        $scope.cpt8++;
      } else {
        $scope.formaddboutn[8].valeur = "N";
        $scope.cpt8 = 0;
      }
      console.log($scope.formaddboutn[8].valeur);
    };
    $scope.testval9 = function (item) {
      if ($scope.cpt9 == 0) {
        $scope.formaddboutn[9].valeur = "O";
        $scope.cpt9++;
      } else {
        $scope.formaddboutn[9].valeur = "N";
        $scope.cpt9 = 0;
      }
      console.log($scope.formaddboutn[9].valeur);
    };
    $scope.testval10 = function (item) {
      if ($scope.cpt10 == 0) {
        $scope.formaddboutn[10].valeur = "O";
        $scope.cpt10++;
      } else {
        $scope.formaddboutn[10].valeur = "N";
        $scope.cpt10 = 0;
      }
      console.log($scope.formaddboutn[10].valeur);
    };
    $scope.testval11 = function (item) {
      if ($scope.cpt11 == 0) {
        $scope.formaddboutn[11].valeur = "O";
        $scope.cpt11++;
      } else {
        $scope.formaddboutn[11].valeur = "N";
        $scope.cpt11 = 0;
      }
      console.log($scope.formaddboutn[11].valeur);
    };

    //CASE A COCHER SUR LA LISTE

    //debut autre option
    $scope.autreOption = function (collOpera, infoOpera, index) {
      localStorage.setItem("CollContratOperateur", JSON.stringify(collOpera));
      localStorage.setItem("vpOperateurinfoOpera", JSON.stringify(infoOpera));
      $rootScope.ecranCible = index;
    };
    //fin autre option

    // DEBUT COMBOS

    //debut liste Profil
    $scope.afficheListeProfil = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/Profil/ListeProfil/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeProfil = reponse.data;
          if ($scope.listeProfil[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeTypeOperateur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeProfil[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeProfil);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeProfil[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste Profil

    //debut liste type operateur
    $scope.afficheListeTypeOperateur = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/TypeOperateur/ListeTypeOperateur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeOperateur = reponse.data;
          if (
            $scope.listeTypeOperateur[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeService();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeOperateur[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeOperateur);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeOperateur[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type operateur

    //debut liste Service
    $scope.afficheListeService = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "OPERATEUR",
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
        .post("/Service/ListeService/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeService = reponse.data;
          if ($scope.listeService[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatForm == "2") {
              $scope.retourModifDesOperateur();
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeService[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeService);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeService[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste Service

    //info de la modification
    $scope.retourModifDesOperateur = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifOperateur")
      );
      $scope.tableauimage = [];
      $scope.tableauimage2 = [];
      $scope.FormAddOperateur.Nom_Prenom = $scope.recupererInfo.OP_NOMPRENOM;
      $scope.FormAddOperateur.Login = $scope.recupererInfo.OP_LOGIN;
      $scope.FormAddOperateur.MotDePasse = $scope.recupererInfo.OP_MOTPASSE;
      $scope.FormAddOperateur.Confirmation = $scope.recupererInfo.OP_MOTPASSE;
      $scope.FormAddOperateur.Profil = $scope.recupererInfo.PO_CODEPROFIL;
      $scope.FormAddOperateur.Email = $scope.recupererInfo.OP_EMAIL;
      $scope.FormAddOperateur.Telephone = $scope.recupererInfo.OP_TELEPHONE;
      $scope.FormAddOperateur.N_CompteTresorerie =
        $scope.recupererInfo.PL_NUMCOMPTE;
      $scope.FormAddOperateur.N_CompteCoffre =
        $scope.recupererInfo.PL_NUMCOMPTECOFFREFORT;
      $scope.FormAddOperateur.MontCaisse =
        $scope.recupererInfo.OP_MONTANTTOTALENCAISSEAUTORISE;
      $scope.FormAddOperateur.NumClient = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddOperateur.ClientDeVente =
        $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddOperateur.id1 = $scope.recupererInfo.TI_IDTIERS;
      $scope.FormAddOperateur.TypeOperateur =
        $scope.recupererInfo.TO_CODETYPEOERATEUR;
      $scope.FormAddOperateur.Service = $scope.recupererInfo.SR_CODESERVICE;
      $scope.FormAddOperateur.operateur = $scope.recupererInfo.OP_CODEOPERATEUR;
      //$scope.FormAddOperateur.img_avatar = $scope.recupererInfo.OH_PHOTO;
      $scope.tableauimage.push($scope.recupererInfo.OH_PHOTO);
      $scope.tableauimage2.push(
        "data:image/jpeg;base64," + $scope.recupererInfo.OH_PHOTO
      );
      $scope.formaddboutn[0].valeur = $scope.recupererInfo.OP_ACTIF;
      $scope.formaddboutn[1].valeur = $scope.recupererInfo.OP_JOURNEEOUVERTE;
      $scope.formaddboutn[2].valeur = $scope.recupererInfo.OP_CAISSIER;
      $scope.formaddboutn[3].valeur =
        $scope.recupererInfo.OP_IMPRESSIONAUTOMATIQUE;
      $scope.formaddboutn[4].valeur =
        $scope.recupererInfo.OP_CONTREPARTIEAUTOMATIQUEOD;
      $scope.formaddboutn[5].valeur = $scope.recupererInfo.OP_EXTOURNE;
      $scope.formaddboutn[6].valeur = $scope.recupererInfo.OP_CREATIONJOURNE;
      $scope.formaddboutn[7].valeur = $scope.recupererInfo.OP_FERMETUREJOURNE;
      $scope.formaddboutn[8].valeur = $scope.recupererInfo.OP_CREATIONPROFILE;
      $scope.formaddboutn[9].valeur = $scope.recupererInfo.OP_CREATIONOPERATEUR;
      $scope.formaddboutn[10].valeur =
        $scope.recupererInfo.OP_SELECTIONOPERATEURAPPRO;
      $scope.formaddboutn[11].valeur =
        $scope.recupererInfo.OP_SELECTIONOPERATEURVENTE;
      setTimeout(function () {
        $scope.afficherimage();
      }, 3000);

      if ($scope.formaddboutn[0].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[1].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[2].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[3].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[4].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[5].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[6].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[7].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[8].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[9].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[10].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.formaddboutn[11].valeur == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }

      $scope.$emit("UNLOAD");
    };
    //info de la modification

    // FIN COMBOS

    //fin Developpement Anicette
  },
]);