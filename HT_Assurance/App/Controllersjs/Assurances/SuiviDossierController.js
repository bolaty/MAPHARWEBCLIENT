MapharApp.controller("SuiviDossierController", [
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
    $scope.FormAddSuiviDossier = {
      Date: $rootScope.DATE_JOURNEE_DE_TRAVAIL,

      DescriptionSinistre: "",
    };

    $scope.FormListSuiviDossier = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSinistre: "",
      DescriptionSuivi: "",
    };
    $scope.FormMontant = "0"
    $scope.informationSinistre = {}
    $scope.RetourEnregistrement = [];
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
    $scope.tabinfosiniste = [];
    $scope.Recupannulationvalid = [];
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
        $("#addSuiviDossier_Date").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSuiviDossier_sinistre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    //debut focus sur le champ
    $scope.desactiverChampRequisListe1 = function () {
      $(document).ready(function () {
        $("#idperiodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idperiodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnumSinistre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    $scope.desactiverChampRequisEnrg = function () {
      $(document).ready(function () {
        $("#addForm_Montant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      
      });
    };
    //fin focus sur le champ
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
    $scope.initFormAddModifSuiviDossier = function () {
      $scope.$emit("LOAD");
      $scope.retourModifODSP();
      $scope.$emit("UNLOAD");
      // $scope.afficheListeSinistreOuvertureDSP()
      //$scope.contrainteFormAddOuvertureDSP()
    };
    //fin initialisation add modif

    //debut initialisation add
    $scope.initFormAddSuiviDossier = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeSinistreOuvertureDSP();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add

    //debut initialisation list
    //$scope.initFormListeSuiviDossier = function () {
    //    $scope.contrainteFormListSuiviDossier()
    //}
    //fin initialisation list

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/
    $scope.situation = function (infosinistre) {
      sessionStorage.setItem(
        "infosinistresituation",
        JSON.stringify(infosinistre)
      );
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/ListeSituationDossier";
    };
    /*DEBUT DEV OVER*/
    $scope.validation = function (information) {
      // $scope.idElement = recupId;
      sessionStorage.setItem("infsinistres", JSON.stringify(information));
    };

    $scope.validationSinistreMP = function () {
      $scope.tabinfosiniste = JSON.parse(
        sessionStorage.getItem("infsinistres")
      );
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: $scope.tabinfosiniste.SI_CODESINISTRE,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_OPERATEUR,
          SI_DATETRANSMISSIONSINISTRE:
            $scope.tabinfosiniste.SI_DATETRANSMISSIONSINISTRE,
          SI_DATEVALIDATIONSINISTRE:
            $scope.tabinfosiniste.SI_DATEVALIDATIONSINISTRE, //"01-01-1900",
          SI_DATESUSPENSIONSINISTRE:
            $scope.tabinfosiniste.SI_DATESUSPENSIONSINISTRE, //"01-01-1900",
          SI_DATECLOTURESINISTRE: $scope.tabinfosiniste.SI_DATECLOTURESINISTRE, //"01-01-1900",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "8",
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
        .post("/Sinistre/ANNULATIONVALIDATION/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.Recupannulationvalid = reponse.data;
          if (
            $scope.Recupannulationvalid[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationReussie(
              $scope.Recupannulationvalid[0].clsObjetRetour.SL_MESSAGE
            );
            sessionStorage.removeItem("infsinistres");
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationNonReussie(
              $scope.Recupannulationvalid[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.Recupannulationvalid[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    //debut contrainte sur les champs add
    $scope.contrainteFormAddSuiviDossier = function () {
      FormValidation.formValidation(
        document.getElementById("formAddSuiviDossierf"),
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

    //debut contrainte sur les champs list
    //$scope.contrainteFormListSuiviDossier = function () {
    //    FormValidation.formValidation(
    //        document.getElementById('FormListSuiviDossier'), {
    //            fields: {
    //                listSuiviDossier_PeriodeDu: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la période.'
    //                        },
    //                        regexp: {
    //                            regexp: /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
    //                            message: 'Veuillez saisir une date correcte.'
    //                        }
    //                    }
    //                },
    //                listSuiviDossier_PeriodeAu: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la période.'
    //                        },
    //                        regexp: {
    //                            regexp: /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
    //                            message: 'Veuillez saisir une date correcte.'
    //                        }
    //                    }
    //                },
    //                listSuiviDossier_NumPolice: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le n° de la police'
    //                        },
    //                    }
    //                },
    //                listSuiviDossier_NumSouscripteur: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le n° du souscripteur.'
    //                        },
    //                    }
    //                },
    //                listSuiviDossier_NomSouscripteur: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le nom du souscripteur.'
    //                        },
    //                    }
    //                },

    //            },

    //            plugins: {
    //                trigger: new FormValidation.plugins.Trigger(),
    //                // Bootstrap Framework Integration
    //                bootstrap: new FormValidation.plugins.Bootstrap(),
    //                // Validate fields when clicking the Submit button
    //                submitButton: new FormValidation.plugins.SubmitButton(),
    //                // Submit the form when all fields are valid
    //                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
    //            }
    //        }
    //    );
    //}

    //fin contrainte sur les champs list
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddSuiviDossier = function () {
      $scope.$emit("LOAD");
      $scope.FormAddSuiviDossier = {
        Date: $rootScope.DATE_JOURNEE_DE_TRAVAIL,

        DescriptionSinistre: "",
      };
      $(document).ready(function () {
        $("#addSanteAuxiliaire_Code1").css("background-color", "#FFFFFF");
      });
      $scope.$emit("UNLOAD");
      // $scope.rechargePage();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //debut liste des nouveaux sinistres
    $scope.afficheListeSuiviSinistres = function (
      periodeDu,
      periodeAu,
      descriptionsuivi
    ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe();
      $scope.recuperation = angular.fromJson(localStorage.getItem("modifODs"));
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
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
        $scope.listeSuiviSinistres = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
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
          $("#idperiodeAu").css("background-color", "#FFE9E0");
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
        $scope.listeSuiviSinistres = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeSuiviSinistres = "";
      } else {
        $scope.objet_envoie = [
          {
            SI_CODESINISTRE: $scope.recuperation,
            SD_DESCRIPTIONEVENEMENT: descriptionsuivi,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            SL_LIBELLEECRAN: "SUIVI DOSSIER",
            SL_LIBELLEMOUCHARD: "LISTE",
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
          .post("/Sinistre/ListeSuivi/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeSuiviSinistres = reponse.data;
            console.log($scope.listeSuiviSinistres);
            if (
              $scope.listeSuiviSinistres[0].clsObjetRetour.SL_RESULTAT ===
              "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeSuiviSinistres[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin liste des nouveaux sinistres
    console.log($rootScope.infocontrat);
    //debut acceder a la page de suivi
    $scope.voirSuiviSinistre = function (infos) {
      localStorage.setItem("modifODs", JSON.stringify(infos));
      window.location.href = "#/ModificationsuiviDossierSP";
    };
    //fin acceder a la page desuivi

    //Debut ajout Suivi Dossier
    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddSuiviDossier = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));
      $scope.recuperation = angular.fromJson(localStorage.getItem("modifODs"));
      console.log($scope.recuperation);
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      $scope.lAnneeEffet = $scope.FormAddSuiviDossier.Date.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddSuiviDossier.Date.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddSuiviDossier.Date.substr(0, 2);

      if (
        $scope.FormAddSuiviDossier.Date === "" ||
        $scope.FormAddSuiviDossier.Date === undefined ||
        $scope.FormAddSuiviDossier.DesSinistre === "" ||
        $scope.FormAddSuiviDossier.DesSinistre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddSuiviDossier.Date === "" ||
            $scope.FormAddSuiviDossier.Date === undefined
          ) {
            $("#addSuiviDossier_Date").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSuiviDossier.DesSinistre === "" ||
            $scope.FormAddSuiviDossier.DesSinistre === undefined
          ) {
            $("#addSuiviDossier_sinistre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (typeDate.test($scope.FormAddSuiviDossier.Date) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSuiviDossier_Date").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de suivi n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSuiviDossier_Date").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de suivi n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSuiviDossier_Date").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSuiviDossier_Date").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.indexsuivi = $scope.recuperation.SD_INDEXSUIVIE;
          $scope.TYPEOPERATION = "1";
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.TYPEOPERATION = "0";
          $scope.SL_LIBELLEMOUCHARD = "INSERTIONS";
        }
        if ($scope.indexsuivi == undefined) {
          $scope.indexsuivi = "";
        }
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            SD_INDEXSUIVIE: $scope.indexsuivi,
            SD_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SD_DATESUIVIE: $scope.FormAddSuiviDossier.Date,
            SI_CODESINISTRE: $scope.recuperer.SI_CODESINISTRE,
            SD_DESCRIPTIONEVENEMENT: $scope.FormAddSuiviDossier.DesSinistre,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "SUIVI DOSSIER",
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
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
            .post("/Sinistre/AjoutSuivi/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperer = [];
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.resetFormAddSuiviDossier();

                //  $scope.initFormAddSuiviDossier()
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
            .post("/Sinistre/ModifSsuivi/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperer = [];
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
                    window.location.href = "#/ListeSuiviDossier";
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

    //Debut modification (contrat) /a terminer

    // $scope.test = [];
    // $scope.testEnregistrement = [];
    //$scope.ModifFormAddOuvertureDSP = function () {
    //    let typeDate = /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    //    $scope.lAnneeEffet = $scope.recuperer.SD_DATESUIVIE.substr(6, 4);
    //    $scope.leMoisEffet = $scope.recuperer.SD_DATESUIVIE.substr(3, 2);
    //    $scope.leJourEffet = $scope.recuperer.SD_DATESUIVIE.substr(0, 2);

    //    if (($scope.recuperer.SD_DATESUIVIE === "") || ($scope.recuperer.SD_DESCRIPTIONEVENEMENT === "")) {
    //        $rootScope.ChampsNonRenseignes()
    //    } else if (typeDate.test($scope.recuperer.SD_DATESUIVIE) == false) {
    //        $scope.messageErreur = "La date de suivi n'est pas correcte";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (($scope.leMoisEffet == "02") && ($scope.leJourEffet > "29")) {
    //        $scope.messageErreur = "La date de suivi n'est pas valide";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (($scope.leMoisEffet == "04" || $scope.leMoisEffet == "06" || $scope.leMoisEffet == "09" || $scope.leMoisEffet == "11") && ($scope.leJourEffet > "30")) {
    //        $scope.messageErreur = "La date saisie n'est pas valide";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    }
    //    else {

    //        $scope.objet_envoie = [
    //            {
    //                "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //                "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
    //                "SD_INDEXSUIVIE": $scope.recuperer.SD_INDEXSUIVIE,
    //                "SD_DATESAISIE": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //                "SD_DATESUIVIE": $scope.recuperer.SD_DATESUIVIE,
    //                "SI_CODESINISTRE": $scope.recuperer.SI_CODESINISTRE,
    //                "SD_DESCRIPTIONEVENEMENT": $scope.recuperer.SD_DESCRIPTIONEVENEMENT,
    //                "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
    //                "SL_LIBELLEECRAN": "SUIVI DOSSIER",
    //                "SL_LIBELLEMOUCHARD": "INSERTIONS",
    //                "TYPEOPERATION": "1",
    //                "LG_CODELANGUE": "fr",
    //                "clsObjetEnvoi": {
    //                    "OE_A": $rootScope.CODE_AGENCE,
    //                    "OE_Y": $rootScope.CODE_OPERATEUR,
    //                    "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //                },

    //            }
    //        ];

    //        $http.post("/Sinistre/ModifSsuivi/", $scope.objet_envoie, {
    //            //headers: $scope.headers
    //        }).then(function (reponse) {
    //            $scope.modiftestEnregistrement = reponse.data
    //            if ($scope.modiftestEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
    //                $rootScope.EnregistrementReussi($scope.modiftestEnregistrement[0].clsObjetRetour.SL_MESSAGE);
    //                setTimeout($scope.rechargePage, 3600);
    //            } else {
    //                $rootScope.EnregistrementNonReussi();
    //            }
    //        }).catch(function () {
    //            $rootScope.ProblemeServeur($scope.testEnregistrementmod[0].clsObjetRetour.SL_MESSAGE);
    //        });
    //    }
    //};

    //Fin modification (contrat)

    //debut voir plus

    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpS", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpS"));
    };
    //fin voir plus

    //debut acceder a la page de modification 1
    $scope.voirModification = function (info) {
      sessionStorage.setItem("modifOD", JSON.stringify(info));
      //  window.location.href = "#/ModificationsuiviDossierSP";
      window.location.href = "#/ListeSuiviDossier";
    };
    //fin acceder a la page de modification 1

    //debut acceder a la page de modification 2
    $scope.retourModifODSP = function () {
      $scope.etatForm = "2";
      $scope.recuperer = JSON.parse(localStorage.getItem("modifODs"));
      $scope.FormAddSuiviDossier.Date = $scope.recuperer.SD_DATESUIVIE;
      $scope.FormAddSuiviDossier.DesSinistre =
        $scope.recuperer.SD_DESCRIPTIONEVENEMENT;
      //$scope.modifAfficheListeVille($scope.recuperer.PY_CODEPAYS)
      //$scope.modifAfficheListeCommune($scope.recuperer.VL_CODEVILLE)
    };
    //fin acceder a la page de modification 2

    //debut acceder a la page document
    $scope.voirDocumentODSP = function (info) {
      sessionStorage.setItem("DocumentODSP", JSON.stringify(info));
      window.location.href = "DocumentOuvertureDossier";
    };
    //fin acceder a la page document

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId, recupid2, recupid3) {
      $scope.idElement = recupId;
      $scope.idElement2 = recupid2;
      $scope.idElement3 = recupid3;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimeContrat = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SD_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          SD_DATESUIVIE: $scope.idElement3,
          SD_INDEXSUIVIE: $scope.idElement,
          SI_CODESINISTRE: $scope.idElement2,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "SUIVI DOSSIER",
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
        .post("/Sinistre/SuppressionSuivi/", $scope.objet_envoie, {
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
            $scope.listeOuvertureDSP[0].clsObjetRetour.SL_RESULTAT = "FALSE";
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
    $scope.afficheListeSinistres = function (
      periodeDu,
      periodeAu,
      numPolice,
      numSinistre
    ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe1();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
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
        periodeAu === undefined ||
        numPolice === undefined ||
        numSinistre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idperiodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idperiodeAu").css("background-color", "#FFE9E0");
          }
          if (numPolice === undefined) {
            $("#idnumPolice").css("background-color", "#FFE9E0");
          }
          if (numSinistre === undefined) {
            $("#idnumSinistre").css("background-color", "#FFE9E0");
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
        $scope.listesinistre = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idperiodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listesinistre = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numPolice,
            CA_CODECONTRAT: $rootScope.infocontrat,
            NS_CODENATURESINISTRE: "",
            SI_NUMSINISTRE: numSinistre,
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "SUIVI SINISTRE",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "03", 
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
          .post("/Sinistre/ListeSinistre/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listesinistre = reponse.data;
            console.log($scope.listesinistre);
            if (
              $scope.listesinistre[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listesinistre[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin
    $scope.afficheListeOuvertureDSP = function (periodeDu, periodeAu) {
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));
      $scope.$emit("LOAD");
      if (periodeDu == "" || periodeAu == "") {
        $scope.$emit("UNLOAD");
        $rootScope.DateNonRenseignes();
        $scope.listeOuvertureDSP = "";
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeOuvertureDSP = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeOuvertureDSP = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            SI_CODESINISTRE: $scope.recuperer.SI_CODESINISTRE,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
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

            /* AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            CA_CODECONTRAT: $rootScope.infocontrat,
            NS_CODENATURESINISTRE: "0001",
            SI_NUMSINISTRE: "",
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "SUIVI DOSSIER",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "01",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },*/
          },
        ];

        $http
          .post("/Sinistre/ListeSuivi/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeOuvertureDSP = reponse.data;
            if (
              $scope.listeOuvertureDSP[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeOuvertureDSP[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };

    $scope.voirMontant = function (info) {
      $scope.informationSinistre = info
      $scope.FormMontant = info.SI_MONTANTPREJUDICEVALIDERNF;//info
    }
    $scope.voirRemiseDeCheque = function (recupererColl) {
      localStorage.setItem("idOuvreDossier", JSON.stringify(recupererColl));
      window.location.href = "#/assurances/operation/liste/ListeRemiseDeCheque";
    };
    $scope.EnregistreMontant = function ( ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnrg();
      let typemontant = /^[0-9]{1,15}$/;

      if (
        $scope.FormMontant === "" ||
        $scope.FormMontant === undefined ||
        $scope.FormMontant === "0" 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if ($scope.FormMontant  === "" || $scope.FormMontant  === undefined || $scope.FormMontant === "0") {
            $("#addForm_Montant").css("background-color", "#FFE9E0");
          }
          
        });
        $scope.messageErreur = "veuillez saisir un montant correcte ou non nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typemontant.test($scope.FormMontant) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addForm_Montant").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "veuillez saisir un montant correcte ";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if (
        parseInt($scope.FormMontant) == 0 
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "le montant saisi ne doit pas etre nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.objet_envoie = [
          {
            
            "SI_CODESINISTRE": $scope.informationSinistre.SI_CODESINISTRE,
            "AG_CODEAGENCE":$rootScope.CODE_AGENCE,
            "EN_CODEENTREPOT":$rootScope.CODE_ENTREPOT,
            "SI_DATETRANSMISSIONSINISTRE":"01-01-1900",
            "SI_DATEVALIDATIONSINISTRE":"01-01-1900",
            "SI_DATESUSPENSIONSINISTRE":"01-01-1900",
            "SI_DATECLOTURESINISTRE":"01-01-1900",
            "OP_CODEOPERATEUR":$rootScope.CODE_OPERATEUR,
            "SI_MONTANTPREJUDICEVALIDER":$scope.FormMontant,
            "OP_CODEOPERATEURSAISIEMONTANTVALIDER":$rootScope.CODE_OPERATEUR,
            "SI_DATESAISIEMONTANTVALIDER":$rootScope.DATE_JOURNEE_DE_TRAVAIL,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD":"INSERTIONS",
            "TYPEOPERATION": "9",
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
          .post("/Sinistre/MONTANTVALIDER/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.RetourEnregistrement = reponse.data;
           
            if (
              $scope.RetourEnregistrement[0].clsObjetRetour.SL_RESULTAT === "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.RetourEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
              $("#modalModification").modal("hide");
              $scope.afficheListeSinistres($scope.FormListSuiviDossier.periodeDu, $scope.FormListSuiviDossier.periodeAu, $scope.FormListSuiviDossier.numPolice, $scope.FormListSuiviDossier.numSinistre)
            }else{
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.RetourEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };

    $scope.clicRetourListeOp = function () {
     
      switch ($rootScope.collectionContartOp.RQ_CODERISQUE) {
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
    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.$emit("LOAD");
      $scope.FormListSuiviDossier.periodeDu =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      ($scope.FormListSuiviDossier.periodeAu =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL),
        ($scope.FormListSuiviDossier.numPolice = "");
      ($scope.FormListSuiviDossier.numSinistre = ""),
        ($scope.FormListSuiviDossier.DescriptionSuivi = "");
      $scope.$emit("UNLOAD");
    };
    //fin pour annuler la recherche

    /*FIN DEV OVER*/
  },
]);
