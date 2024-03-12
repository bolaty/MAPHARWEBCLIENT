MapharApp.controller("SuiviClientController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    //DEBUT MODULE JS
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.DATE_PREMIER_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );

    //FIN MODULE JS

    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];
    $scope.FormAddSuiviClient = {
      date: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      description: "",
    };
    $scope.FormListSuiviClient = {
      datedebut: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      datefin: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      description: "",
    };
    $scope.listeSuiviClient = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.testSuppression = [];
    $scope.testEnregistrement = [];
    $scope.recuperer = [];
    /*FIN ZONE DE DECLARATION*/

    //debut voir plus SuiviClient
    $scope.voirPlusSuiviClient = function (info) {
      sessionStorage.setItem("vpSuiviClient", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpSuiviClient"));
    };
    //fin voir plus suiviclient

    //debut localStorage pour cacher enrg
    $scope.recupInfoBouton = angular.fromJson(
      localStorage.getItem("infoBouton")
    );
    //fin localStorage pour cacher enrg

    //debut contrainte sur les champs add SuiviClient
    $scope.contrainteFormAddSuiviClient = function () {
      FormValidation.formValidation(document.getElementById("addSuiviClient"), {
        fields: {
          addSuiviClient_date: {
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
          addSuiviClient_description: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la description.",
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
    //fin contrainte sur les champs add SuiviClient

    //debut contrainte sur les champs add SuiviClient
    $scope.contrainteFormListSuiviClient = function () {
      FormValidation.formValidation(
        document.getElementById("formListSuiviClient"),
        {
          fields: {
            listSuiviClient_datedebut: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date de debut.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            listSuiviClient_datefin: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date de fin.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            listSuiviClient_description: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la description.",
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
    //fin contrainte sur les champs add SuiviClient

    //DEBUT FONCTION GENERALE

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut initialisation add SuiviClient
    $scope.initFormAddSuiviClient = function () {
      $scope.$emit("LOAD");
      // $scope.contrainteFormAddSuiviClient();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add SuiviClient

    //debut initialisation Modification SuiviClient
    $scope.initFormAddModifSuiviClient = function () {
      $scope.retourModifSuiviClient();
      $scope.contrainteFormAddSuiviClient();
    };
    //fin initialisation Modification SuiviClient

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

    // anneeBissextile
    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };
    // anneeBissextile

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    // FIN FONCTION GENERALE

    //debut acceder a la page de modification SuiviClient
    $scope.voirModifSuiviClient = function (info) {
      sessionStorage.setItem("modifSuiviClient", JSON.stringify(info));
      window.location.href =
        "#/assurances/operation/multirisque-pro/modification/suivi-client";
    };
    //fin acceder a la page de modification SuiviClient

    //debut acceder a la page de modification
    $scope.retourModifSuiviClient = function (info) {
      $scope.etatForm = "2";
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifSuiviClient"));
      console.log($scope.recuperer);
      $scope.FormAddSuiviClient.date = $scope.recuperer.SU_DATESUIVIE;
      $scope.FormAddSuiviClient.description =
        $scope.recuperer.SU_DESCRIPTIONEVENEMENT;
    };
    //fin acceder a la page de modification

    //debut pour annuler la recherche
    $scope.listeSuiviClientAnnuler = function () {
      $(document).ready(function () {
        $("#listSuiviClient_datedebut").css("background-color", "#FFFFFF");
        $("#listSuiviClient_datefin").css("background-color", "#FFFFFF");
        $("#listSuiviClient_description").css("background-color", "#FFFFFF");
      });
      $scope.FormListSuiviClient.datedebut = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListSuiviClient.datefin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListSuiviClient.description = "";
    };
    //fin pour annuler la recherche

    //debut recuperer id pour la suppression du contrat
    $scope.supprRecupererIdElement = function (recup1, recup2, recup3) {
      $scope.idElement1 = recup1;
      $scope.idElement2 = recup2;
      $scope.idElement3 = recup3;
    };
    //fin recuperer id pour la suppression du contrat

    //debut recuperer id pour la suppression
    $scope.supprimeSuiviClient = function (id1, id2, id3) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: id1,
          SU_INDEXSUIVIE: id2,
          SU_DATESAISIE: id3,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          SU_DATESUIVIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CA_CODECONTRAT: "1000000000000000000000001",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "02",
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
        .post("/SuiviClient/SuppressionSuiviClient/", $scope.objet_envoie, {
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
            $scope.listeSuiviClient[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //debut recuperer id pour la suppression

    //debut fonction reinitialisation
    $scope.reinitialise = function () {
      $(document).ready(function () {
        $("#addSuiviClient_date").css("background-color", "#FFFFFF");
        $("#addSuiviClient_description").css("background-color", "#FFFFFF");
      });
      $scope.FormAddSuiviClient = {
        date: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
        description: "",
      };
      return;
    };
    //fin fonction reinitialisation

    //debut focus sur le champ
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#addSuiviClient_date").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSuiviClient_description").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout SuiviClient
    $scope.ajoutFormAddSuiviClient = function (date, description) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      $scope.lAnneeEffet = $scope.FormAddSuiviClient.date.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddSuiviClient.date.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddSuiviClient.date.substr(0, 2);

      if (
        $scope.FormAddSuiviClient.date === "" ||
        $scope.FormAddSuiviClient.date === undefined ||
        $scope.FormAddSuiviClient.description === "" ||
        $scope.FormAddSuiviClient.description === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddSuiviClient.date == "" ||
            $scope.FormAddSuiviClient.date === undefined
          ) {
            $("#addSuiviClient_date").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddSuiviClient.description == "" ||
            $scope.FormAddSuiviClient.description === undefined
          ) {
            $("#addSuiviClient_description").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.FormAddSuiviClient.date == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner la date";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddSuiviClient.date) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormAddSuiviClient.description == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner la description";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == true &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddSuiviClient.date) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La date du suivi ne doit pas être supérieure à la date de la journée de travail.";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
        } else {
          $scope.TYPEOPERATION = "0";
        }

        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            SU_INDEXSUIVIE: $scope.recuperer.SU_INDEXSUIVIE,
            SU_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            SU_DATESUIVIE: $scope.FormAddSuiviClient.date,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            SU_DESCRIPTIONEVENEMENT: $scope.FormAddSuiviClient.description,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "Saisie de Continent",
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
            .post("/SuiviClient/AjoutSuiviClient/", $scope.objet_envoie, {})
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
              "/SuiviClient/ModificationSuiviClient/",
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
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrementmodif[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/assurances/operation/multirisque-pro/liste/suivi-client";
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
    //Fin ajout SuiviClient

    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#listSuiviClient_datedebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listSuiviClient_datefin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listSuiviClient_description").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut Liste SuiviClient
    $scope.afficheListeSuiviClient = function (
      datedebut,
      datefin,
      description
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;

      $scope.desactiverChampRequisListe();

      if (datedebut !== undefined) {
        $scope.lAnneedatedebut = datedebut.substr(6, 4);
        $scope.leMoisdatedebut = datedebut.substr(3, 2);
        $scope.leJourdatedebut = datedebut.substr(0, 2);
      }
      if (datefin !== undefined) {
        $scope.lAnneedatefin = datefin.substr(6, 4);
        $scope.leMoisdatefin = datefin.substr(3, 2);
        $scope.leJourdatefin = datefin.substr(0, 2);
      }

      if (
        datedebut === "" ||
        datedebut === undefined ||
        datefin === "" ||
        datefin === undefined ||
        description === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (datedebut === "" || datedebut === undefined) {
            $("#listSuiviClient_datedebut").css("background-color", "#FFE9E0");
          }
          if (datefin === "" || datefin === undefined) {
            $("#listSuiviClient_datefin").css("background-color", "#FFE9E0");
          }
          if (description === undefined) {
            $("#listSuiviClient_description").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $scope.messageErreur = "Veuillez renseigner correctement les dates";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.listeSuiviClient = "";
      } else if (typeDate.test(datedebut) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datedebut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date de début correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(datefin) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datefin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date fin correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneedatedebut) == true &&
        $scope.leMoisdatedebut == "02" &&
        $scope.leJourdatedebut > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datedebut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneedatedebut) == false &&
        $scope.leMoisdatedebut == "02" &&
        $scope.leJourdatedebut > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datedebut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneedatefin) == true &&
        $scope.leMoisdatefin == "02" &&
        $scope.leJourdatefin > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datefin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneedatefin) == false &&
        $scope.leMoisdatefin == "02" &&
        $scope.leJourdatefin > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datefin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisdatedebut == "04" ||
          $scope.leMoisdatedebut == "06" ||
          $scope.leMoisdatedebut == "09" ||
          $scope.leMoisdatedebut == "11") &&
        $scope.leJourdatedebut > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datedebut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisdatefin == "04" ||
          $scope.leMoisdatefin == "06" ||
          $scope.leMoisdatefin == "09" ||
          $scope.leMoisdatefin == "11") &&
        $scope.leJourdatefin > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datefin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(datefin) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datefin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La date de fin ne doit pas être supérieure à la date de la journée de travail";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.listeSuiviClient = "";
      } else if (
        $scope.dateSuperioriteDebut(datedebut) >
        $scope.dateSuperioriteFin(datefin)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSuiviClient_datedebut").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeSuiviClient = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            DATEDEBUT: datedebut,
            DATEFIN: datefin,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            SU_DESCRIPTIONEVENEMENT: description,
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
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
          .post("/SuiviClient/ListeSuiviClient/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listeSuiviClient = reponse.data;
            $scope.nombreInfoBulle = $scope.listeSuiviClient.length;
            console.log($scope.listeSuiviClient);
            if (
              $scope.listeSuiviClient[0].clsObjetRetour.SL_RESULTAT == "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeSuiviClient[0].clsObjetRetour.SL_MESSAGE
              );
            }
            $scope.$emit("UNLOAD");
          })
          .catch(function () {
            $rootScope.ProblemeServeur();
          });
      }
    };
    //Fin Liste SuiviClient

    //debut retour sur liste operation
    $scope.clicRetourListeOp = function () {
      $scope.positionEcran = angular.fromJson(
        localStorage.getItem("positionEcran")
      );
      switch ($scope.positionEcran) {
        case "01":
          window.location.href =
            "#/assurances/operation/liste/multirisque-professionnel";
          break;
        case "02":
          window.location.href =
            "#/assurances/operation/liste/sante-pharmacien";
          break;
        case "03":
          window.location.href =
            "#/assurances/operation/liste/individuel-accident";
          break;
        case "04":
          window.location.href = "#/assurances/operation/liste/voyage";
          break;
        case "05":
          window.location.href = "#/assurances/operation/liste/habitat";
          break;
        case "06":
          window.location.href = "#/assurances/operation/liste/auto";
          break;
        case "07":
          window.location.href =
            "#/assurances/operation/liste/sante-auxiliaire";
          break;
        case "08":
          window.location.href = "#/assurances/operation/liste/sante-gesa";
          break;
        case "09":
          window.location.href =
            "#/assurances/operation/liste/responnsabilite-civile";
          break;
        case "10":
          window.location.href =
            "#/assurances/operation/liste/trasport-marchadise";
          break;
          case "12":
            window.location.href =
              "#/assurances/operation/liste/MultirisqueImmeuble";
         break;
      }
    };
    //fin retour sur liste operation
  },
]);
