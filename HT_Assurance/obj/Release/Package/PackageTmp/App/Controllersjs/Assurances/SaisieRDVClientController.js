MapharApp.controller("SaisieRDVClientController", [
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
    //  $rootScope.collectionContartOp = angular.fromJson(localStorage.getItem("vpOpMultirisqueProinfocontrat"));
    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation
    //FIN MODULE JS

    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];
    $scope.FormAddSaisieRDVClient = {
      objetDuRdv: "",
      dateDuRdv: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    };

    console.log($scope.FormAddSaisieRDVClient);

    $scope.listeSaisieRDVClient = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.testSuppression = [];
    $scope.testEnregistrement = [];
    $scope.recuperer = [];
    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    //debut localStorage pour cacher enrg
    $scope.recupInfoBouton = angular.fromJson(
      localStorage.getItem("infoBouton")
    );
    //fin localStorage pour cacher enrg

    //debut initialisation Modification SaisieRDVClient
    $scope.initFormAddModifSaisieRDVClient = function () {
      $scope.retourModifSaisieRDVClient();
      $scope.contrainteFormAddSaisieRDVClient();
    };
    //fin initialisation Modification SaisieRDVClient

    $scope.FormListSaisieRDVClient = {
      datedebut: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      datefin: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      objetDuRdv: "",
    };

    /*FIN ZONE DE DECLARATION*/
    //debut fonction reinitialisation
    $scope.reinitialise = function () {
      $(document).ready(function () {
        $("#addSaisieRDVClient_dateDuRdv").css("background-color", "#FFFFFF");
        $("#addSaisieRDVClient_objetDuRdv").css("background-color", "#FFFFFF");
      });
      $scope.FormAddSaisieRDVClient = {
        objetDuRdv: "",
        dateDuRdv: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      };
      return;
    };
    //fin fonction reinitialisation
    //debut voir plus SaisieRDVClient
    $scope.voirPlusSaisieRDVClient = function (info) {
      sessionStorage.setItem("vpSaisieRDVClient", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpSaisieRDVClient")
      );
    };
    //fin voir plus SaisieRDVClient

    //debut contrainte sur les champs add SaisieRDVClient
    $scope.contrainteFormAddSaisieRDVClient = function () {
      FormValidation.formValidation(
        document.getElementById("addSaisieRDVClient"),
        {
          fields: {
            addSaisieRDVClient_dateDuRdv: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date du RDV.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            addSaisieRDVClient_objetDuRdv: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir 'objet du rendez-vous.",
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
    //fin contrainte sur les champs add SaisieRDVClient

    //debut contrainte sur les champs List SaisieRDVClient
    $scope.contrainteFormListSaisieRDVClient = function () {
      FormValidation.formValidation(
        document.getElementById("formListSaisieRDVClient"),
        {
          fields: {
            listSaisieRDVClient_datedebut: {
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
            listSaisieRDVClient_datefin: {
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
            listSaisieRDVClient_objetDuRdv: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir 'objet du rendez-vous.",
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
    //fin contrainte sur les champs add SaisieRDVClient

    //DEBUT FONCTION GENERALE

    //debut initialisation add SaisieRDVClient
    //$scope.initFormAddSaisieRDVClient = function () {
    //    $scope.$emit('LOAD');
    //    //$scope.contrainteFormAddSaisieRDVClient();
    //    $scope.$emit('UNLOAD');

    //}
    //fin initialisation add SaisieRDVClient

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

    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };

    //debut recharge page
    //$scope.rechargePage = function () {
    //    $window.location.reload();
    //}
    //debut recharge page

    // FIN FONCTION GENERALE

    //debut acceder a la page de modification SaisieRDVClient
    $scope.voirModifSaisieRDVClient = function (info) {
      sessionStorage.setItem("modifSaisieRDVClient", JSON.stringify(info));
      window.location.href =
        "#/assurances/operation/multirisque-pro/modification/saisie-rdv";
    };
    //fin acceder a la page de modification SaisieRDVClient

    //debut acceder a la page de SaisieRDVClient
    $scope.retourModifSaisieRDVClient = function (info) {
      $scope.etatForm = "2";
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("modifSaisieRDVClient")
      );
      console.log($scope.recuperer);
      $scope.FormAddSaisieRDVClient.dateDuRdv =
        $scope.recuperer.RD_DATERENDEZVOUS;
      $scope.FormAddSaisieRDVClient.objetDuRdv =
        $scope.recuperer.RD_OBJETRENDEZVOUS;
    };
    //fin acceder a la page de modification

    //debut pour annuler la recherche
    $scope.listeSaisieRDVClientAnnuler = function () {
      $(document).ready(function () {
        $("#listSaisieRDVClient_datedebut").css("background-color", "#FFFFFF");
        $("#listSaisieRDVClient_datefin").css("background-color", "#FFFFFF");
        $("#listSaisieRDVClient_objetDuRdv").css("background-color", "#FFFFFF");
      });
      $scope.FormListSaisieRDVClient.datedebut =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListSaisieRDVClient.datefin =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListSaisieRDVClient.objetDuRdv = "";
    };
    //fin pour annuler la recherche

    //debut recuperer id pour la suppression du SaisieRDVClient
    $scope.supprRecupererIdElement = function (recup1, recup2, recup3) {
      $scope.idElement1 = recup1;
      $scope.idElement2 = recup2;
      $scope.idElement3 = recup3;
    };
    //fin recuperer id pour la suppression du SaisieRDVClient

    //debut recuperer id pour la suppression
    $scope.supprimeSaisieRDVClient = function (id1, id2, id3) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: id1,
          RD_INDEXRENDEZVOUS: id2,
          RD_DATESAISIERENDEZVOUS: id3,
          SL_LIBELLEECRAN: "SAISIE RENDEZ-VOUS CLIENT",
          SL_LIBELLEMOUCHARD: "SUPPRESSION",
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
        .post(
          "/SaisieRDVClient/SuppressionSaisieRDVClient/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          console.log($scope.testSuppression);
          if ($scope.testSuppression[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeSaisieRDVClient[0].clsObjetRetour.SL_RESULTAT = "FALSE";
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

    //debut focus sur le champ
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#addSaisieRDVClient_dateDuRdv").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSaisieRDVClient_objetDuRdv").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout SaisieRDVClient
    $scope.ajoutFormAddSaisieRDVClient = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      $scope.lAnneeEffet = $scope.FormAddSaisieRDVClient.dateDuRdv.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddSaisieRDVClient.dateDuRdv.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddSaisieRDVClient.dateDuRdv.substr(0, 2);

      if (
        $scope.FormAddSaisieRDVClient.dateDuRdv === "" ||
        $scope.FormAddSaisieRDVClient.dateDuRdv === undefined ||
        $scope.FormAddSaisieRDVClient.objetDuRdv === "" ||
        $scope.FormAddSaisieRDVClient.objetDuRdv === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddSaisieRDVClient.dateDuRdv == "" ||
            $scope.FormAddSaisieRDVClient.dateDuRdv === undefined
          ) {
            $("#addSaisieRDVClient_dateDuRdv").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddSaisieRDVClient.objetDuRdv == "" ||
            $scope.FormAddSaisieRDVClient.objetDuRdv === undefined
          ) {
            $("#addSaisieRDVClient_objetDuRdv").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.FormAddSaisieRDVClient.dateDuRdv == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner la date";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddSaisieRDVClient.dateDuRdv) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormAddSaisieRDVClient.objetDuRdv == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner l'objet du rendez-vous";
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
        $scope.dateSuperioriteDebut($scope.FormAddSaisieRDVClient.dateDuRdv) <
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La date du rendez-vous ne doit pas être inferieure à la date de la journée de travail.";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormAddSaisieRDVClient.objetDuRdv === "" ||
        $scope.FormAddSaisieRDVClient.dateDuRdv === ""
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.ChampsNonRenseignes();
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
            RD_INDEXRENDEZVOUS: $scope.recuperer.RD_INDEXRENDEZVOUS,
            RD_DATESAISIERENDEZVOUS: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            RD_DATERENDEZVOUS: $scope.FormAddSaisieRDVClient.dateDuRdv,
            RD_OBJETRENDEZVOUS: $scope.FormAddSaisieRDVClient.objetDuRdv,
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
            .post(
              "/SaisieRDVClient/AjoutSaisieRDVClient/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
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
              "/SaisieRDVClient/ModificationSaisieRDVClient/",
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
                    window.location.href =
                      "#/assurances/operation/multirisque-pro/liste/saisie-rdv";
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
      $(document).ready(function () {
        $("#listSaisieRDVClient_datedebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listSaisieRDVClient_datefin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listSaisieRDVClient_objetDuRdv").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut Liste SaisieRDVClient
    $scope.afficheListeSaisieRDVClient = function (
      datedebut,
      datefin,
      objetDuRdv
    ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
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
        objetDuRdv === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (datedebut === "" || datedebut === undefined) {
            $("#listSaisieRDVClient_datedebut").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (datefin === "" || datefin === undefined) {
            $("#listSaisieRDVClient_datefin").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (description === undefined) {
            $("#listSaisieRDVClient_objetDuRdv").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $scope.messageErreur = "Veuillez renseigner correctement les dates";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.listeSaisieRDVClient = "";
      } else if (typeDate.test(datedebut) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisieRDVClient_datedebut").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "Veuillez renseigner une date de début correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(datefin) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisieRDVClient_datefin").css("background-color", "#FFE9E0");
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
          $("#listSaisieRDVClient_datedebut").css(
            "background-color",
            "#FFE9E0"
          );
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
          $("#listSaisieRDVClient_datedebut").css(
            "background-color",
            "#FFE9E0"
          );
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
          $("#listSaisieRDVClient_datefin").css("background-color", "#FFE9E0");
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
          $("#listSaisieRDVClient_datefin").css("background-color", "#FFE9E0");
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
          $("#listSaisieRDVClient_datedebut").css(
            "background-color",
            "#FFE9E0"
          );
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
          $("#listSaisieRDVClient_datefin").css("background-color", "#FFE9E0");
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
          $("#listSaisieRDVClient_datefin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La date de fin ne doit pas être supérieure à la date de la journée de travail";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.listeSaisieRDVClient = "";
      } else if (
        $scope.dateSuperioriteDebut(datedebut) >
        $scope.dateSuperioriteFin(datefin)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisieRDVClient_datedebut").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeSaisieRDVClient = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            DATEDEBUT: datedebut,
            DATEFIN: datefin,
            RD_OBJETRENDEZVOUS: objetDuRdv,
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: "01",
            LG_CODELANGUE: "fr",
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          },
        ];

        $http
          .post("/SaisieRDVClient/ListeSaisieRDVClient/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listeSaisieRDVClient = reponse.data;
            $scope.nombreInfoBulle = $scope.listeSaisieRDVClient.length;
            if (
              $scope.listeSaisieRDVClient[0].clsObjetRetour.SL_RESULTAT ==
              "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeSaisieRDVClient[0].clsObjetRetour.SL_MESSAGE
              );
            }
            $scope.$emit("UNLOAD");
          })
          .catch(function () {
            $rootScope.ProblemeServeur();
          });
      }
    };
    //Fin Liste SaisieRDVClient

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
