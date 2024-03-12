MapharApp.controller("GroupeTiersController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddGroupeTiers = {
      Code: "",
      Libelle: "",
    };
    $scope.FormListGroupeTiers = {
      Code: "",
      Libelle: "",
    };
    $scope.objet_envoie = [];
    $scope.listeGroupeTiers = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.testSuppression = [];
    $scope.testEnregistrement = [];
    $scope.testEnregistrementmodif = [];
    $scope.recuperer = [];
    $scope.recupererInfo = [];

    /*FIN ZONE DE DECLARATION*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    $scope.initFormAddInfoGroupeTiers = function () {
      $scope.retourModifGroupeTiers();
      $scope.contrainteFormAddGroupeTiers();
    };

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      sessionStorage.setItem("modifGroupeTiers", JSON.stringify(info));
      window.location.href = "#/Tiers/Modification/ModificationGroupeTiers";
    };
    //fin acceder a la page de modification

    //debut acceder a la page de SaisieRDVClient
    $scope.retourModifGroupeTiers = function (info) {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifGroupeTiers")
      );
      $scope.isdisabled = true;

      $scope.FormAddGroupeTiers.Code = $scope.recupererInfo.GP_CODEGROUPE;
      $scope.FormAddGroupeTiers.Libelle = $scope.recupererInfo.GP_LIBELLE;
    };
    //fin acceder a la page de modification

    //debut recuperer id pour la suppression du SaisieRDVClient
    $scope.supprRecupererIdElement = function (recupId, recupId1) {
      $scope.idElement = recupId;
      $scope.idElement1 = recupId1;
    };
    //fin recuperer id pour la suppression du SaisieRDVClient

    //debut recuperer id pour la suppression
    $scope.supprimeGroupeTiers = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          GP_CODEGROUPE: $scope.idElement,
          GP_LIBELLE: $scope.idElement1,
          SL_LIBELLEECRAN: "GroupeTiers",
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
        .post("/GroupeTiers/SuppressionGroupeTiers/", $scope.objet_envoie, {
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
            $scope.listeGroupeTiers[0].clsObjetRetour.SL_RESULTAT = "FALSE";
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

    //debut contrainte sur les champs add GroupeTiers
    $scope.contrainteFormAddGroupeTiers = function () {
      FormValidation.formValidation(document.getElementById("addGroupeTiers"), {
        fields: {
          addGroupeTiers_Code: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code.",
              },
            },
          },
          addGroupeTiers_Libelle: {
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
      });
    };
    //fin contrainte sur les champs add GroupeTiers

    //debut contrainte sur les champs List GroupeTiers
    $scope.contrainteFormListGroupeTiers = function () {
      FormValidation.formValidation(
        document.getElementById("formListGroupeTiers"),
        {
          fields: {
            listGroupeTiers_Code: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
              },
            },
            listGroupeTiers_Libelle: {
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
    //fin contrainte sur les champs add GroupeTiers

    /*DEBUT FONCTION GENERALE*/

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

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
        $("#addGroupeTiers_Code").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addGroupeTiers_Libelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout SaisieRDVClient
    $scope.ajoutGroupeTiers = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;

      if (
        $scope.FormAddGroupeTiers.Code === "" ||
        $scope.FormAddGroupeTiers.Code === undefined ||
        $scope.FormAddGroupeTiers.Libelle === "" ||
        $scope.FormAddGroupeTiers.Libelle === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddGroupeTiers.Code == "" ||
            $scope.FormAddGroupeTiers.Code === undefined
          ) {
            $("#addGroupeTiers_Code").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddGroupeTiers.Libelle == "" ||
            $scope.FormAddGroupeTiers.Libelle === undefined
          ) {
            $("#addGroupeTiers_Libelle").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.FormAddGroupeTiers.Code == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner le code";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeNumerique.test($scope.FormAddGroupeTiers.Code) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un code correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddGroupeTiers.Libelle) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner le libellé";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
        } else {
          $scope.TYPEOPERATION = "0";
        }
        $scope.objet_envoie = [
          {
            GP_CODEGROUPE: $scope.FormAddGroupeTiers.Code,
            GP_LIBELLE: $scope.FormAddGroupeTiers.Libelle,
            SL_LIBELLEECRAN: "GroupeTiers",
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
        if ($scope.etatForm !== "2") {
          $http
            .post("/GroupeTiers/AjoutGroupeTiers/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.reinitialise();
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi();
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur();
            });
        } else {
          $http
            .post(
              "/GroupeTiers/ModificationGroupeTiers/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.testEnregistrementmodif = reponse.data;
              if (
                $scope.testEnregistrementmodif[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrementmodif[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href = "#/Tiers/GroupeTiers";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                }
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
      }
    };
    //Fin ajout SaisieRDVClient

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      //$(document).ready(function () {
      //    $('#idCode').focusin(function () {
      //        $(this).css('background-color', '#FFFFFF')
      //    })
      //})
      $(document).ready(function () {
        $("#idLibelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste individuel accident
    $scope.afficheListeGroupeTiers = function (Libelle) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe();
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      if (Libelle === undefined) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          //if (Code === undefined) {
          //    $('#idCode').css('background-color', '#FFE9E0')
          //}
          if (Libelle === undefined) {
            $("#idLibelle").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeGroupeTiers = "";
      } else {
        $scope.objet_envoie = [
          {
            GP_CODEGROUPE: "",
            GP_LIBELLE: Libelle,
            SL_LIBELLEECRAN: "GroupeTiers",
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
          .post("/GroupeTiers/ListeGroupeTiers2/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeGroupeTiers = reponse.data;
            $scope.nombreInfoBulle = $scope.listeGroupeTiers.length;
            if (
              $scope.listeGroupeTiers[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeGroupeTiers[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste individuel accident

    //debut fonction reinitialisation
    $scope.reinitialise = function () {
      $(document).ready(function () {
        $("#addGroupeTiers_Code").css("background-color", "#FFFFFF");
        $("#addGroupeTiers_Libelle").css("background-color", "#FFFFFF");
      });
      $scope.FormAddGroupeTiers = {};
      return;
    };
    //fin fonction reinitialisation

    //debut annuler la recheche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idCode").css("background-color", "#FFFFFF");
        $("#idLibelle").css("background-color", "#FFFFFF");
      });
      $scope.FormListGroupeTiers.Code = "";
      $scope.FormListGroupeTiers.Libelle = "";
    };
    //fin annuler la recheche

    /*FIN DEV JJ*/
  },
]);
