MapharApp.controller("ProfilsController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    //DEBUT MODULE JS
    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation
    $rootScope.idcontratvoyage = angular.fromJson(
      localStorage.getItem("idcontratvoyage")
    );
    console.log($rootScope.idcontratvoyage);

    //debut session generale pour le sinistre
    $scope.collectionContartOp1 = angular.fromJson(
      localStorage.getItem("idOuvreDossier")
    );
    console.log($scope.collectionContartOp1);
    //fin session generale pour le sinistre

    //FIN MODULE JS

    /*DEBUT ZONE DE DECLARATION*/

    $scope.appelServiceWeb =  $rootScope.ADRESSESERV;//"http://192.168.1.99:6033/Service/";

    $scope.FormAddProfils = {
      Code: "",
      NomProfil: "",
    };
    $scope.FormListProfils = {
      Libelle: "",
    };
    $scope.FormListQuestionnaires = {
      document: "",
    };
    $scope.objet_envoie = [];
    $scope.listeProfils = [];
    $scope.nombreInfoBulle = "";
    $scope.testSuppression = [];
    $scope.listeRemiseChequePhoto = [];
    $scope.testEnregistrement = [];
    $scope.testEnregistrementmodif = [];
    $scope.testRemiseDeChequePhoto = [];
    $scope.recuperer = [];
    //$scope.recupPhoto = "",
    $scope.recupererInfo = [];
    $scope.listeDocument = [];
    $scope.listeQuestionnaireLiaisonDoc = [];
    $scope.deleteRemiseDeChequePhoto = [];
    $scope.ajoutImage = function () {
      //                let cheminImage = "/Content/assets/media/illustration/undraw_profile_pic_ic5t.svg"
      $scope.image.img.push({ upload: $scope.avatar });
    };

    /*FIN ZONE DE DECLARATION*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    $scope.initFormAddInfoProfils = function () {
      $scope.retourModifProfils();
      $scope.contrainteFormAddProfils();
    };

    //debut initialisation MonExercice
    $scope.initFormListQuestionnaires = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeDocument();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation MonExercice

    //debut acceder a la page de mon exo
    $scope.voirMonExercice = function (info) {
      sessionStorage.setItem("MonExercice", JSON.stringify(info));
      window.location.href = "#/OutilsEtSecurites/liste/MonExercice";
    };
    //fin acceder a la page de mon exo

    //voir doc mon exo
    $scope.optionDocument = function (info) {
      sessionStorage.setItem("vpPhCheque", JSON.stringify(info));
    };
    //voir doc mon exo

    //Document mon exo
    $scope.docMonExercice = function () {
      window.location.href = "#/assurances/operation/liste/DocumentMonExercice";
    };
    //Document mon exo

    //debut voir PhotoMonExo
    $scope.voirPhotoCheque = function () {
      $scope.recupererPhoto = JSON.parse(
        sessionStorage.getItem("vpPhotoCheque")
      );
      console.log($scope.recupererPhoto);
    };
    //fin voir PhotoMonExo

    //debut acceder a la page de modification
    $scope.voirModification = function (info, param) {
      $rootScope.lEcran = param;
      sessionStorage.setItem("modifProfils", JSON.stringify(info));
      window.location.href = "#/OutilsEtSecurites/modification/profils";
    };
    //fin acceder a la page de modification

    //debut acceder a la page de ModifProfils
    $scope.retourModifProfils = function (info) {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifProfils"));
      $scope.isdisabled = true;

      $scope.FormAddProfils.Code = $scope.recupererInfo.PO_CODEPROFILWEB;//$scope.recupererInfo.PO_CODEPROFIL;
      $scope.FormAddProfils.NomProfil = $scope.recupererInfo.PO_LIBELLE;
    };
    //fin acceder a la page de ModifProfils

    //debut recuperer id pour la suppression du SaisieRDVClient
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du SaisieRDVClient

    //debut liste des intermediaire
    $scope.afficheListeDocument = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "04",
          SL_LIBELLEECRAN: "QUESTIONNAIRES",
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
        .post("/Document/ListeDocument/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDocument = reponse.data;
        });
    };
    //fin liste des intermediaire

    //debut liste des intermediaire
    $scope.afficheListeQuestionnaireLiaisonDoc = function (idcode) {
      // $scope.$emit('LOAD');
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_CODECONTRAT: $rootScope.idcontratvoyage.CA_CODECONTRAT,
          DC_CODEDOCUMENT: idcode,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "QUESTIONNAIRES",
          SL_LIBELLEMOUCHARD: "LISTE",
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
        .post("/Questionnaires/LiaisonQuestionnaires/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          // $scope.$emit('UNLOAD');
          $scope.listeQuestionnaireLiaisonDoc = reponse.data;
          console.log($scope.listeQuestionnaireLiaisonDoc);
        });
    };
    //fin liste des intermediaire

    //debut recuperer id pour la suppression
    $scope.supprimeProfils = function () {
      $scope.$emit("LOAD");
     /* $scope.objet_envoie = [
        {
          PO_CODEPROFIL: $scope.idElement,
          SL_LIBELLEECRAN: "SAISIE RENDEZ-VOUS CLIENT",
          SL_LIBELLEMOUCHARD: "SUPPRESSION",
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        },
      ];*/
      $scope.objet_envoie = {
        "Objet": [
            {
            PO_CODEPROFILWEB: $scope.idElement,
            SL_LIBELLEECRAN: "SAISIE RENDEZ-VOUS CLIENT",
            SL_LIBELLEMOUCHARD: "SUPPRESSION",
            "TYPEOPERATION": "0",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
               
              }
              }
          ]
      }
      $http
      .post(
        $scope.appelServiceWeb + "wsProfilweb.svc/pvgSupprimer", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          $scope.testSuppression = JSON.parse($scope.testSuppression);
          $scope.testSuppression = $scope.testSuppression.TABLE;
          if ($scope.testSuppression[0].SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression[0].SL_MESSAGE
            );
            $scope.afficheListeProfils($scope.FormListProfils.Libelle);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie();
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //debut recuperer id pour la suppression

    //debut contrainte sur les champs add Profils
    $scope.contrainteFormAddProfils = function () {
      FormValidation.formValidation(document.getElementById("addProfils"), {
        fields: {
          addProfils_Code: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code.",
              },
            },
          },
          addProfils_NomProfil: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le nom du profil.",
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
          // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
      });
    };
    //fin contrainte sur les champs add Profils

    //debut contrainte sur les champs List Profils
    $scope.contrainteFormListProfils = function () {
      FormValidation.formValidation(
        document.getElementById("formListProfils"),
        {
          fields: {
            listProfils_Libelle: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le libellé.",
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
            // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          },
        }
      );
    };
    //fin contrainte sur les champs add Profils

    /*DEBUT FONCTION GENERALE*/

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    //debut test sur les date
    $scope.dateSuperioriteDebut = function (dateDebut) {
      if (dateDebut !== "") {
        let nouvelleDate = new Date(dateDebut);
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    $scope.dateSuperioriteFin = function (dateFin) {
      if (dateFin !== "") {
        let nouvelleDate = new Date(dateFin);
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
        $("#idPeriodeDu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPeriodeAu").maxlength({
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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut focus sur le champ
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#addProfils_Code").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addProfils_NomProfil").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout SaisieRDVClient
    $scope.ajoutProfils = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;

      if (
        $scope.FormAddProfils.NomProfil === "" ||
        $scope.FormAddProfils.NomProfil === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddProfils.NomProfil == "" ||
            $scope.FormAddProfils.NomProfil === undefined
          ) {
            $("#addProfils_NomProfil").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeAlphabetique.test($scope.FormAddProfils.NomProfil) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner le nom du profil";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
        } else {
          $scope.TYPEOPERATION = "0";
        }
       /* $scope.objet_envoie = [
          {
            PO_CODEPROFIL: $scope.FormAddProfils.Code,
            PO_LIBELLE: $scope.FormAddProfils.NomProfil,
            SL_LIBELLEECRAN: "PROFILS",
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
        ];*/
        $scope.objet_envoie = {
          "Objet": [
              {
              PO_CODEPROFILWEB: $scope.FormAddProfils.Code,
              PO_LIBELLE: $scope.FormAddProfils.NomProfil,
              SL_LIBELLEECRAN: "PROFILS",
              "SL_LIBELLEMOUCHARD": "INSERTIONS",
              "TYPEOPERATION": "0",
              "LG_CODELANGUE": "fr",
              "clsObjetEnvoi": {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                 
              }
              }
          ]
      }
        if ($scope.etatForm != "2") {
          $http
          .post(
            $scope.appelServiceWeb + "wsProfilweb.svc/pvgAjouter", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              $scope.testEnregistrement = JSON.parse($scope.testEnregistrement);
              $scope.testEnregistrement = $scope.testEnregistrement.TABLE;
              if (
                $scope.testEnregistrement[0].SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].SL_MESSAGE
                );
                $scope.reinitialise();
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur();
            });
        } else {
          $http
          .post(
            $scope.appelServiceWeb + "wsProfilweb.svc/pvgModifier", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrementmodif = reponse.data;
              $scope.testEnregistrementmodif = JSON.parse($scope.testEnregistrementmodif);
              $scope.testEnregistrementmodif = $scope.testEnregistrementmodif.TABLE;
              if (
                $scope.testEnregistrementmodif[0].SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrementmodif[0].SL_MESSAGE
                );
                $scope.RetourSurListe = function () {
                  $scope.afficheListeProfils($scope.FormListProfils.Libelle)
                  window.location.href = "#/OutilsEtSecurites/liste/profils";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrementmodif[0].SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrementmodif[0].SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout SaisieRDVClient

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#listProfils_Libelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste individuel accident
    $scope.afficheListeProfils = function (Libelle) {
      $scope.$emit("LOAD");

      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

      if (Libelle === undefined) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (Libelle === undefined) {
            $("#listProfils_Libelle").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeProfils = "";
      } else {
        $scope.objet_envoie = {
          Objet: [
            {
              PO_LIBELLE: Libelle,
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
            $scope.appelServiceWeb + "wsProfilweb.svc/pvgChargerDansDataSet",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeProfils = JSON.parse(reponse.data);
            $scope.listeProfils = $scope.listeProfils.TABLE;
            console.log($scope.listeProfils);
            $scope.nombreInfoBulle = $scope.listeProfils.length;
            if ($scope.listeProfils[0].SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes($scope.listeProfils[0].SL_MESSAGE);
            }
          });
      }
    };
    //fin afficher liste individuel accident

    //debut fonction reinitialisation
    $scope.reinitialise = function () {
      $(document).ready(function () {
        $("#addProfils_Code").css("background-color", "#FFFFFF");
        $("#addProfils_NomProfil").css("background-color", "#FFFFFF");
      });
      $scope.FormAddProfils = {};
      return;
    };
    //fin fonction reinitialisation

    //debut annuler la recheche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#listProfils_Libelle").css("background-color", "#FFFFFF");
      });
      $scope.FormListProfils.Libelle = "";
    };
    //fin annuler la recheche

    //debut focus sur le champ
    $scope.desactiverChampRequisValider = function () {
      $(document).ready(function () {
        $("#listQuestionnaires_document").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut Liste Questionnaires
    $scope.ValiderQuestionnaires = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisValider();
      if (
        $scope.FormListQuestionnaires.document == "" ||
        $scope.FormListQuestionnaires.document === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormListQuestionnaires.document == "" ||
            $scope.FormListQuestionnaires.document === undefined
          ) {
            $("#listQuestionnaires_document").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $scope.messageErreur = "Veuillez renseigner un document";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.clsCtcontratgaranties = [];
        for (var i = 0; i < $scope.listeQuestionnaireLiaisonDoc.length; i++) {
          for (var j = 0; j < $scope.selectedMore.length; j++) {
            if (
              parseInt($scope.selectedMore[j].QE_CODEQUESTIONNAIRE) ==
              parseInt(
                $scope.listeQuestionnaireLiaisonDoc[i].QE_CODEQUESTIONNAIRE
              )
            ) {
              if ($scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 == "O") {
                $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 = "N";
                break;
              }
              if ($scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 == "N") {
                $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 = "O";
                break;
              }
            }
          }

          $scope.objetGarentie = {
            CA_CODECONTRAT: $rootScope.idcontratvoyage.CA_CODECONTRAT,
            QE_CODEQUESTIONNAIRE: "1",
            DC_CODEDOCUMENT: $scope.FormListQuestionnaires.document,
            CQ_VALEUR1: "",
            CQ_VALEUR2: "",
            TYPEOPERATION: "0",
            SL_LIBELLEECRAN: "QUESTIONNAIRES",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: "",
              OE_Y: "",
              OE_J: "",
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          };
          $scope.objetGarentie.CA_CODECONTRAT =
            $rootScope.idcontratvoyage.CA_CODECONTRAT;
          $scope.objetGarentie.QE_CODEQUESTIONNAIRE =
            $scope.listeQuestionnaireLiaisonDoc[i].QE_CODEQUESTIONNAIRE;
          $scope.objetGarentie.CQ_VALEUR1 =
            $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1;
          $scope.objetGarentie.CQ_VALEUR2 =
            $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR2;
          $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
          $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
          $scope.objetGarentie.clsObjetEnvoi.OE_J =
            $rootScope.DATE_JOURNEE_DE_TRAVAIL;

          $scope.clsCtcontratgaranties.push($scope.objetGarentie);
        }
        $scope.objet_envoie = $scope.clsCtcontratgaranties;

        $http
          .post(
            "/Questionnaires/ValidationQuestionnaires/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.listeQuestionnaires = reponse.data;
            console.log($scope.listeQuestionnaires);
            if (
              $scope.listeQuestionnaires[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.listeQuestionnaires[0].clsObjetRetour.SL_MESSAGE
              );
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi();
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur();
          });
      }
    };
    //Fin Liste Questionnaires

    //selection check box
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
        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
      }
    };
    //selection check box

    //debut  enregistrement Photo
    $scope.EnrgPhotoRemiseDeCheque = function () {
      $scope.$emit("LOAD");
      $scope.recupererphotoexo = JSON.parse(
        sessionStorage.getItem("MonExercice")
      );
      $scope.clsCtcontratchequephotoreglementcaisses = [];
      for (var i = 0; i < $scope.tableauimage.length; i++) {
        $scope.objetchequephoto = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: $scope.recupererphotoexo.CH_IDEXCHEQUE,
          CH_NUMSEQUENCEPHOTO: "",
          CH_CHEMINPHOTOCHEQUE: $scope.base64,
          CH_LIBELLEPHOTOCHEQUE: "test",
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

        $scope.objetchequephoto.CH_CHEMINPHOTOCHEQUE = $scope.tableauimage[i];
        $scope.clsCtcontratchequephotoreglementcaisses.push(
          $scope.objetchequephoto
        );
        console.log($scope.clsCtcontratchequephotoreglementcaisses);
      }

      $scope.objet_envoie = $scope.clsCtcontratchequephotoreglementcaisses;
      console.log($scope.objet_envoie);
      $http
        .post(
          "/RemiseDeChequePhoto/AjoutRemiseDeChequePhoto/",
          $scope.objet_envoie,
          {}
        )
        .then(function (reponse) {
          $scope.testRemiseDeChequePhoto = reponse.data;
          if (
            $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin  enregistrement Photo

    //debut recuperer id pour la suppression de photo
    $scope.supprRecupererIdChequePhoto = function (
      dateSaisieCheque1,
      recupId,
      numSeqPhoto
    ) {
      $scope.idElement1 = dateSaisieCheque1;
      $scope.idElement = recupId;
      $scope.cheqId3 = numSeqPhoto;
    };
    //debut recuperer id pour la suppression de photo

    //debut  suppression de photo RemiseDeCheque
    $scope.suppRemiseDeChequePhoto = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $scope.idElement1,
          CH_IDEXCHEQUE: $scope.idElement,
          CH_NUMSEQUENCEPHOTO: $scope.cheqId3,
          SL_LIBELLEMOUCHARD: "SUPPRESSION",
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
          "/RemiseDeChequePhoto/SuppressionRemiseDeChequePhoto/",
          $scope.objet_envoie,
          {}
        )
        .then(function (reponse) {
          $scope.deleteRemiseDeChequePhoto = reponse.data;
          if (
            $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $rootScope.SuppressionReussie(
              $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.$emit("UNLOAD");
            setTimeout($scope.rechargePage, 3600);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $rootScope.ProblemeServeur(
            $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin  suppression de photo RemiseDeCheque

    //GESTION IMAGE OU PHOTO

    // fonction pour telecharger une photo mon exo
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
    $scope.formatImageSignature = "";
    $scope.previewSignature = function (event) {
      var files = event.target.files;
      var file = files[files.length - 1];
      $scope.formatImageSignature = file.type;
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.signature = e.target.result;
          $scope.imgSignBase64($scope.signature);
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.imgBase64 = function (elt) {
      if ($scope.formatImage == "image/png") {
        $scope.base64 = elt.replace("data:image/png;base64,", "");
      } else {
        $scope.base64 = elt.replace("data:image/jpeg;base64,", "");
      }
    };
    $scope.imgSignBase64 = function (elt) {
      $scope.signbase64 = elt.replace("data:image/jpeg;base64,", "");
    };
    // fonction pour telecharger une photo mon exo

    $scope.tableauimage = [];
    $scope.tableauimage2 = [];
    $scope.tabEngReglement = [];
    $scope.newtab = [];
    var reader = {};

    var image = {};
    $scope.idimagcheque = "";
    $scope.collecionimage = {};

    //gestion d'image

    $scope.process = function () {
      let file = document.querySelector("#upload").files;
      // let fichier = document.querySelector('input[type=file]').files;

      var readAndPreview = function (file) {
        // Veillez à ce que `file.name` corresponde à nos critères d’extension
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          reader = new FileReader();
          var tbsl = [];
          reader.addEventListener(
            "load",
            function () {
              image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              $scope.tableauimage2.push(image.src);
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
          '"><button data-toggle="modal" data-target="#modalsurpp">suppr</button></td>';
      }

      elmnt.innerHTML = templathtml;
      elmntsuppr.innerHTML = templathtmlsuppr;
    };

    //GESTION IMAGE OU PHOTO

    //debut  enregistrement Photo
    $scope.afficheListePhotoCheque = function () {
      // $scope.listeDoc = JSON.parse(sessionStorage.getItem("vpPhCheque"));
      console.log($scope.listeDoc);
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: $scope.CH_IDEXCHEQUE,
          SI_CODESINISTRE: $scope.collectionContartOp1.SI_CODESINISTRE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEMOUCHARD: "LISTE",
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
          "/RemiseDeChequePhoto/ListeRemiseDeChequePhoto/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeRemiseChequePhoto = reponse.data.reverse();
          console.log($scope.listeRemiseChequePhoto);
        });
    };
    //Fin  enregistrement Photo

    // --------------------------------------- redirection
    //debut aller a Droit sur menu/écran/état
    $scope.redirectDroitMenuPrincipal = function () {
      window.location.href = "#/OutilsEtSecurites/liste/profils/DroitMenu";
    };
    //debut aller a Droit sur agence
    $scope.redirectDroitAgence = function () {
      window.location.href = "#/OutilsEtSecurites/liste/profils/DroitAgence";
    };
    //debut aller a Droit sur entrepot
    $scope.redirectDroitEntrepot = function () {
      window.location.href = "#/OutilsEtSecurites/liste/profils/DroitEntrepot";
    };
    //debut aller a Droit de transfert de stock
    $scope.redirectDroitTransfertStock = function () {
      window.location.href =
        "#/OutilsEtSecurites/liste/profils/DroitTransfertStock";
    };
    //debut aller a Droit sur famille opérations
    $scope.redirectDroitFamilleOperation = function () {
      window.location.href =
        "#/OutilsEtSecurites/liste/profils/DroitFamOperation";
    };

    //debut autre option
    $scope.autreOption = function (collOpera, index) {
      localStorage.setItem("CollContratOperateur", JSON.stringify(collOpera));
      $rootScope.ecranCible = index;
    };
    //fin autre option

    $scope.afficheChampCode = function (param) {
      $rootScope.lEcran = param;
    };

    /*FIN DEV JJ*/
  },
]);
