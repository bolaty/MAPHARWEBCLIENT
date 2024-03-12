MapharApp.controller("MarqueController", [
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

    /*DEBUT ZONE DE DECLARATION OVER*/
    $scope.FormAddMarque = {
      Date: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      Code:"",
      Libelle: "",
    };

    $scope.FormListe = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      Libelle: "",
      
    };

    $scope.listeDesSinistreOuvertureDSP = [];
    $scope.listeSuiviSinistres = [];
    $scope.listeOuvertureDSP = [];
    $scope.modiftestEnregistrement = [];
    $scope.modifListeVille = [];
    $scope.modifListeCommune = [];
    $scope.testEnregistrement = [];
    $scope.idElement2 = "";
    $scope.idElement3 = "";
    $scope.listesinistre = [];
    $scope.recuperation = [];
    $scope.listeMarque= [];
    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken

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
        $("#addcontexpert").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addDenominationexpert").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

   
    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idperiodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idperiodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

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

    //debut initialisation add modif
    $scope.initFormAddModif = function () {
      $scope.$emit("LOAD");
      $scope.retourModifODSP();
      $scope.$emit("UNLOAD");
      // $scope.afficheListeSinistreOuvertureDSP()
      //$scope.contrainteFormAddOuvertureDSP()
    };
    //fin initialisation add modif
    $scope.initFormAddListe = function () {
      $scope.$emit("LOAD");
      $scope.afficheListe();
      $scope.$emit("UNLOAD");
      // $scope.afficheListeSinistreOuvertureDSP()
      //$scope.contrainteFormAddOuvertureDSP()
    };
    
  
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV OVER*/

    //debut contrainte sur les champs add
    $scope.contrainteFormAddExpert = function () {
      FormValidation.formValidation(
        document.getElementById("FormAddExpertf"),
        {
          fields: {
            addSuiviDossier_Date: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            addSuiviDossier_DesSinistre: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la description du sinistre.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir la description du sinistre.",
                },
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
        }
      );
    };
    //fin contrainte sur les champs add

 
    //fin contrainte sur les champs list
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddMarque = function () {
      $scope.$emit("LOAD");
      $scope.FormAddMarque = {
        Date: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
        Code:"",
        Libelle: "",
      };
    
      $scope.$emit("UNLOAD");
     
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

   
  
    //debut acceder a la page de suivi
    $scope.voirmodifexpert = function (infos) {
      localStorage.setItem("modifODs", JSON.stringify(infos));
      window.location.href = "#/Template/ParametreI/ModificationMarque";
    };
    //fin acceder a la page desuivi

    //Debut ajout Suivi Dossier
    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddMarque = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
     // $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));
      $scope.recuperation = angular.fromJson(localStorage.getItem("modifODs"));
      console.log($scope.recuperation);
    
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
      
     
      if (
       
        $scope.FormAddMarque.Libelle === "" ||
        $scope.FormAddMarque.Libelle === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          
          if (
            $scope.FormAddMarque.Libelle === "" ||
            $scope.FormAddMarque.Libelle === undefined
          ) {
            $("#addDenominationexpert").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      }  else {
        if ($scope.etatForm == "2") {
          $scope.indexMarque = $scope.recuperation.TVH_CODETYPE;
          $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "INSERTIONS";
        }
        if( $scope.indexMarque == undefined){
          $scope.indexMarque =""
        }
        $scope.objet_envoie = [
          {
            "TVH_CODETYPE": $scope.indexMarque,
            "TVH_LIBELE": $scope.FormAddMarque.Libelle,
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
        if ($scope.etatForm !== "2") {
          $http
            .post("/TypeVehicule/AjoutTypevehicule/", $scope.objet_envoie, {
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
                $scope.resetFormAddMarque();

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
            .post("/TypeVehicule/updateTypevehicule/", $scope.objet_envoie, {
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
                    window.location.href = "#/Template/ParametreI/ListeMarque";
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
    //Fin ajout Suivi Dossier (contrat)

   
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpS", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpS"));
    };
    //fin voir plus

    //debut acceder a la page de modification 2
    $scope.retourModifODSP = function () {
      $scope.etatForm = "2";
      $scope.recuperer = JSON.parse(localStorage.getItem("modifODs"));
      $scope.FormAddMarque.Code = $scope.recuperer.TVH_CODETYPE;
      $scope.FormAddMarque.Libelle =
        $scope.recuperer.TVH_LIBELE;
     
    };
    //fin acceder a la page de modification 2

   

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimeMarque = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          "TVH_CODETYPE": $scope.idElement,
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
        .post("/TypeVehicule/DeleteTypevehicule/", $scope.objet_envoie, {
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
            $scope.listeMarque[0].clsObjetRetour.SL_RESULTAT = "FALSE";
            $scope.afficheListe()
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
   /* $scope.afficheListe = function (
      periodeDu,
      periodeAu,
      libelle
    ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe1();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
        if(libelle == undefined){
          libelle = ""
        }
      if (periodeDu !== undefined) {
        $scope.lAnneePeriodeDu = periodeDu.substr(6, 4);
        $scope.leMoisPeriodeDu = periodeDu.substr(3, 2);
        $scope.leJourPeriodeDu = periodeDu.substr(0, 2);
      }
      if (periodeAu !== undefined) {
        $scope.lAnneeperiodeAu = periodeAu.substr(6, 4);
        $scope.leMoisperiodeAu = periodeAu.substr(3, 2);
        $scope.leJourperiodeAu = periodeAu.substr(0, 2);
      }

      if (
        periodeDu === "" ||
        periodeDu === undefined ||
        periodeAu === "" ||
        periodeAu === undefined 
        
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idperiodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idperiodeAu").css("background-color", "#FFE9E0");
          }
          
         
        });
        $rootScope.ChampsListeInvalide();
        $scope.listesinistre = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leMoisPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeAu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listeMarque = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeMarque = "";
      } else {
        $scope.objet_envoie = [
          {
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
          .post("/TypeVehicule/LISTETYPEVEHICULE/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeMarque = reponse.data;
            console.log($scope.listeMarque);
            if (
              $scope.listeMarque[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeMarque[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };*/
    //fin
   
//affichage de la liste des sinstres
$scope.afficheListe = function (
 
) {
  $scope.$emit("LOAD");
  
    $scope.objet_envoie = [
      {
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
      .post("/TypeVehicule/selectliste/", $scope.objet_envoie, {
        //headers: $scope.headers
      })
      .then(function (reponse) {
        $scope.$emit("UNLOAD");
        $scope.listeMarque = reponse.data;
        console.log($scope.listeMarque);
        if (
          $scope.listeMarque[0].clsObjetRetour.SL_RESULTAT === "FALSE"
        ) {
          $scope.$emit("UNLOAD");
          $rootScope.MessageDesListes(
            $scope.listeMarque[0].clsObjetRetour.SL_MESSAGE
          );
        }
      });
  
};
//fin
   

    /*FIN DEV OVER*/
  },
]);
