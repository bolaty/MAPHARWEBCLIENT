MapharApp.controller("IndividuelAccidentController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.recupInfoDemande = angular.fromJson(
      localStorage.getItem("collectionDemande")
    );

    $scope.FormAddIndivAccident = {
      infoSouscripteur: {
        id1: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
        idModif1: "",
        code1: $scope.recupInfoDemande
          ? $scope.recupInfoDemande.TI_NUMTIERS
          : "",
        nomAssureSouscript: $scope.recupInfoDemande
          ? $scope.recupInfoDemande.TI_DENOMINATION
          : "",
        date: "",
        lieuNaissance: "",
        mainForte: "",
        profession: "",
        sport: "",
        valgarantie: "",
      },
      infoCommercial: {
        id2: "",
        idModif2: "",
        code2: "",
        denomination: "",
      },
      infoGenerale: {
        numPolice: "",
        intermediaire: "",
        effet: "",
        echeance: "",
        pays: "",
        ville: "",
        commune: "",
        situationGeo: "",
        nombreAssure: "",
        assureur: $scope.recupInfoDemande
          ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
          : "",
        interlocuteur: "",
        telInterlocuteur: "",
        typeAffaire: "",
      },
      infoBeneficiaire: {
        id3: "",
        idModif3: "",
        code3: "",
        nomAssureBenef: "",
        codeTitreBeneficiaire: "",
        titreBeneficiaire: "",
        taux: "",
      },
    };
    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
    };
    $scope.objetajoutDansTabBeneficiaireModif = {
      id3: "",
      idModif3: "",
      code3: "",
      nomAssureBenef: "",
      codeTitreBeneficiaire: "",
      titreBeneficiaire: "",
    };
    $scope.listeDesPays = [];
    $scope.listeDesVilles = [];
    $scope.listeDesCommunes = [];
    $scope.objet_envoie = [];
    $scope.listeDesAssureurs = [];
    $scope.listeDuree = [];
    $scope.listeDesIntermediaires = [];
    $scope.tabBeneficiaire = [];
    $scope.tabBeneficiaire2 = [];
    $scope.tabGarenties = [];
    $scope.tabPrimes = [];
    $scope.listeDesSouscripteurs = [];
    $scope.listeDesCommerciaux = [];
    $scope.listeContrat = [];
    $scope.tabEngIndivAccident = [];
    $scope.tabModifIndivAccident = [];
    $scope.elmntSupprimerIndivAccident = [];
    $scope.listeMainForte = [];
    $scope.listeTitreBeneficiaire = [];
    $scope.listeProfession = [];
    $scope.recupererInfo = {};
    $scope.valPrimeTtc = 0;
    $scope.valPrimeNette = 0;
    $scope.valPrimeTtcEnregistrement = 0;
    $scope.valPrimeNetteEnregistrement = 0;
    $scope.SL_LIBELLEECRAN = "CONTRAT INDIVIDUEL ACCIDENT";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";
    $scope.listeDesGarantie = [];
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";

    $scope.listeContratAvecAccessoir = []
    $scope.recupererInfoAvecAccessoir = {};

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

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

    //debut contrainte sur les champs add de individuel accident
    $scope.contrainteFormAddIndivAccident = function () {
      FormValidation.formValidation(
        document.getElementById("formAddIndivAccident"),
        {
          fields: {
            addIA_Code1: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
                regexp: {
                  regexp: /^[0-9]+$/,
                  message: "Veuillez saisir un n° correct.",
                },
              },
            },
            addIA_NomAssure1: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom de l'assuré.",
                },
                regexp: {
                  regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                  message: "Veuillez saisir un nom correct.",
                },
              },
            },
            addIA_DateDeNaissance: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date de naissance.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            addIA_LieuDeNaissance: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le lieu de naissance.",
                },
                regexp: {
                  regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                  message: "Veuillez saisir une adresse correcte.",
                },
              },
            },
            addIA_MainForte: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la main forte.",
                },
              },
            },
            addIA_Profession: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la profession.",
                },
              },
            },
            addIA_Sport: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le sport.",
                },
                regexp: {
                  regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                  message: "Veuillez saisir un sport correcte.",
                },
              },
            },
            addIA_Code2: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
                regexp: {
                  regexp: /^[0-9]+$/,
                  message: "Veuillez saisir un n° correct.",
                },
              },
            },
            addIA_Denomination: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Dénomination.",
                },
                regexp: {
                  regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                  message: "Veuillez saisir un nom correcte.",
                },
              },
            },
            addIA_Commission: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la commission.",
                },
                numeric: {
                  message: "Veuillez saisir un montant correct.",
                },
              },
            },
            addIA_NumPolice: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° de la police.",
                },
              },
            },
            addIA_Intermediaire: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom de l'intermédiaire.",
                },
              },
            },
            addIA_Effet: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date d'effet.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            addIA_Echeance: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date d'écheance.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            addIA_Pays: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le pays.",
                },
              },
            },
            addIA_Ville: {
              validators: {
                notEmpty: {
                  message: "Veuillez séléctionner la ville.",
                },
              },
            },
            addIA_Commune: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la commune.",
                },
              },
            },
            addIA_SituationGeo: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la situation géographique.",
                },
                regexp: {
                  regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                  message:
                    "Veuillez saisir une situation géographique correcte.",
                },
              },
            },
            addIA_DureeMois: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la situation géographique.",
                },
                numeric: {
                  message: "Veuillez saisir une durée correcte.",
                },
              },
            },
            addIA_NombreAssure: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nombre assure.",
                },
                regexp: {
                  regexp: /^[0-9]{1,2}$/,
                  message: "Veuillez saisir un nombre correct.",
                },
              },
            },
            addIA_Assureur: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner l'assureur.",
                },
              },
            },
            addIA_Interlocuteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l'interlocuteur.",
                },
                regexp: {
                  regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                  message: "Veuillez saisir un nom correcte.",
                },
              },
            },
            addIA_TelInterlocuteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le téléphone interlocuteur.",
                },
                regexp: {
                  regexp: /^\d+$/,
                  message: "Veuillez saisir un numéro correct.",
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
    //fin contrainte sur les champs add de individuel accident

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idCode1").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idDateNaiss").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPeriodeDu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPeriodeAu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idCode2").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idCode3").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idDateEffet").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idDateEcheance").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTelInter").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNbreAssure").maxlength({
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

    //debut initialisation add individuel accident
    $scope.initFormAddIndivAccident = function () {
      $scope.afficheListeVille($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
      $scope.FormAddIndivAccident.infoGenerale.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddIndivAccident.infoGenerale.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommune($rootScope.VILLEPARDEFAUT)
    };
    //fin initialisation add individuel accident

    //debut initialisation modif individuel accident
    $scope.initModifFormAddIndivAccident = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };
    //fin initialisation modif individuel accident

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut verifier le taux (tableau des beneficiares)
    $scope.verifierChampTauxBenef = function (champTauxBenef) {
      var posi = champTauxBenef.indexOf(",");
      if (posi !== -1) {
        var valeur = champTauxBenef.substr(0, posi);
        for (var i = 0; i < valeur.length; i++) {
          var compteur = i + 1;
        }
        if (compteur > 3) {
          var testeur = true;
          return testeur;
        } else {
          if (valeur > 100) {
            testeur = true;
            return testeur;
          } else if (valeur == 100 && champTauxBenef.indexOf(",") !== -1) {
            testeur = true;
            return testeur;
          } else {
            testeur = false;
            return testeur;
          }
        }
      } else {
        var indique = 0;
        if (champTauxBenef > 100) {
          indique = 1;
        }
        if (indique !== 0) {
          testeur = true;
          return testeur;
        } else {
          testeur = false;
          return testeur;
        }
      }
    };
    //fin verifier le taux (tableau des beneficiares)

    //debut focus sur le champ
    $scope.desactiverChampRequisBenef = function () {
      $(document).ready(function () {
        $("#idCode3").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomAssure3").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTaux").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTitreBenef").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut ajouter dans le tableau du beneficiaire
    $scope.ajoutDansTabBeneficiaire = function () {
      $scope.desactiverChampRequisBenef();
      if (
        $scope.FormAddIndivAccident.infoBeneficiaire.code3 !== "" &&
        $scope.FormAddIndivAccident.infoBeneficiaire.code3 !== undefined &&
        $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef !== "" &&
        $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef !==
          undefined &&
        $scope.FormAddIndivAccident.infoBeneficiaire.taux !== "" &&
        $scope.FormAddIndivAccident.infoBeneficiaire.taux !== undefined &&
        $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire !==
          "" &&
        $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire !==
          undefined
      ) {
        switch (
          $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire
        ) {
          case "01":
            $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
              "FEMME";
            break;
          case "02":
            $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
              "ENFANT";
            break;
          case "03":
            $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
              "NEVEU";
            break;
        }
        let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
        if (
          typeNumerique.test(
            $scope.FormAddIndivAccident.infoBeneficiaire.taux
          ) == false
        ) {
          $scope.messageErreur = "Veuillez renseigner un taux correct.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          $("#idTaux").css("background-color", "#FFE9E0");
        } else if (
          $scope.verifierChampTauxBenef(
            $scope.FormAddIndivAccident.infoBeneficiaire.taux
          ) == true
        ) {
          $scope.messageErreur = "Veuillez renseigner un taux correct.";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          $("#idTaux").css("background-color", "#FFE9E0");
        } else {
          $scope.tabBeneficiaire.push(
            $scope.FormAddIndivAccident.infoBeneficiaire
          );
          $(document).ready(function () {
            $("#idCode3").css("background-color", "#FFFFFF");
            $("#idNomAssure3").css("background-color", "#FFFFFF");
          });
          console.log($scope.tabBeneficiaire);
          $scope.FormAddIndivAccident.infoBeneficiaire = "";
          console.log($scope.FormAddIndivAccident.infoBeneficiaire);
          $scope.isDisabled3 = false;
        }
      } else {
        $(document).ready(function () {
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire.code3 === "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire.code3 === undefined
          ) {
            $("#idCode3").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef ===
              "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef ===
              undefined
          ) {
            $("#idNomAssure3").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire.taux === "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire.taux === undefined
          ) {
            $("#idTaux").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire
              .codeTitreBeneficiaire === "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire
              .codeTitreBeneficiaire === undefined
          ) {
            $("#idTitreBenef").css("background-color", "#FFE9E0");
          }
        });
        let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
        if (
          typeNumerique.test(
            $scope.FormAddIndivAccident.infoBeneficiaire.taux
          ) == false
        ) {
          $(document).ready(function () {
            $("#idTaux").css("background-color", "#FFE9E0");
          });
        } else if (
          $scope.verifierChampTauxBenef(
            $scope.FormAddIndivAccident.infoBeneficiaire.taux
          ) == true
        ) {
          $(document).ready(function () {
            $("#idTaux").css("background-color", "#FFE9E0");
          });
        }
        $rootScope.messageInfoBeneficiaire();
      }
    };
    //fin ajouter dans le tableau du beneficiaire

    //debut ajouter dans le tableau du beneficiaire modif
    $scope.ajoutDansTabBeneficiaireModif = function () {
      if (
        $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef !== "" &&
        $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef !==
          undefined &&
        $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire !==
          "" &&
        $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire !==
          undefined
      ) {
        if ($scope.testPosition == "2") {
          $scope.recupererAyantDroit = JSON.parse(
            sessionStorage.getItem("modifAyantDroitIndivAccident")
          );
          $scope.FormAddIndivAccident.infoBeneficiaire.idModif3 =
            $scope.recupererAyantDroit.idModif3;
          switch (
            $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire
          ) {
            case "01":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "FEMME";
              break;
            case "02":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "ENFANT";
              break;
            case "03":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "NEVEU";
              break;
          }
          let i = 0;
          let trouve = false;
          while (i < $scope.tabBeneficiaire2.length && trouve == false) {
            if (
              $scope.tabBeneficiaire2[i].nomAssureBenef ===
              $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef
            ) {
              trouve = true;
              let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
              if (
                typeNumerique.test(
                  $scope.FormAddIndivAccident.infoBeneficiaire.taux
                ) == false
              ) {
                $scope.messageErreur = "Veuillez renseigner un taux correct.";
                $rootScope.MessageDerreurDesTypes($scope.messageErreur);
              } else if (
                $scope.verifierChampTauxBenef(
                  $scope.FormAddIndivAccident.infoBeneficiaire.taux
                ) == true
              ) {
                $scope.messageErreur = "Veuillez renseigner un taux correct.";
                $rootScope.MessageDerreurDesTypes($scope.messageErreur);
              } else {
                $scope.tabBeneficiaire2.splice(i, 1);
                $scope.tabBeneficiaire2.push(
                  $scope.FormAddIndivAccident.infoBeneficiaire
                );
                $(document).ready(function () {
                  $("#idCode3").css("background-color", "#FFFFFF");
                  $("#idNomAssure3").css("background-color", "#FFFFFF");
                });
                $scope.isDisabled3 = false;
              }
            } else {
              i = i + 1;
            }
          }
          if (trouve == false) {
            let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
            if (
              typeNumerique.test(
                $scope.FormAddIndivAccident.infoBeneficiaire.taux
              ) == false
            ) {
              $scope.messageErreur = "Veuillez renseigner un taux correct.";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
            } else if (
              $scope.verifierChampTauxBenef(
                $scope.FormAddIndivAccident.infoBeneficiaire.taux
              ) == true
            ) {
              $scope.messageErreur = "Veuillez renseigner un taux correct.";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
            } else {
              $scope.tabBeneficiaire2.push(
                $scope.FormAddIndivAccident.infoBeneficiaire
              );
              $(document).ready(function () {
                $("#idCode3").css("background-color", "#FFFFFF");
                $("#idNomAssure3").css("background-color", "#FFFFFF");
              });
              $scope.isDisabled3 = false;
            }
          }
          console.log($scope.tabBeneficiaire2);
          $scope.FormAddIndivAccident.infoBeneficiaire = "";
        } else if ($scope.testPosition == "1") {
          $scope.recupererAyantDroit = JSON.parse(
            sessionStorage.getItem("modifAyantDroitIndivAccidentBase")
          );
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire.idModif3 ==
            $scope.recupererAyantDroit.idModif3
          ) {
            $scope.FormAddIndivAccident.infoBeneficiaire.idModif3 =
              $scope.recupererAyantDroit.idModif3;
          } else {
            $scope.FormAddIndivAccident.infoBeneficiaire.idModif3 ==
              $scope.FormAddIndivAccident.infoBeneficiaire.idModif3;
          }
          switch (
            $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire
          ) {
            case "01":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "FEMME";
              break;
            case "02":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "ENFANT";
              break;
            case "03":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "NEVEU";
              break;
          }
          let j = 0;
          let trouveBase = false;
          while (j < $scope.tabBeneficiaire.length && trouveBase == false) {
            if (
              $scope.tabBeneficiaire[j].nomAssureBenef ===
              $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef
            ) {
              trouveBase = true;
              let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
              if (
                typeNumerique.test(
                  $scope.FormAddIndivAccident.infoBeneficiaire.taux
                ) == false
              ) {
                $scope.messageErreur = "Veuillez renseigner un taux correct.";
                $rootScope.MessageDerreurDesTypes($scope.messageErreur);
              } else if (
                $scope.verifierChampTauxBenef(
                  $scope.FormAddIndivAccident.infoBeneficiaire.taux
                ) == true
              ) {
                $scope.messageErreur = "Veuillez renseigner un taux correct.";
                $rootScope.MessageDerreurDesTypes($scope.messageErreur);
              } else {
                $scope.tabBeneficiaire.splice(j, 1);
                $scope.tabBeneficiaire.push(
                  $scope.FormAddIndivAccident.infoBeneficiaire
                );
                $(document).ready(function () {
                  $("#idCode3").css("background-color", "#FFFFFF");
                  $("#idNomAssure3").css("background-color", "#FFFFFF");
                });
                $scope.isDisabled3 = false;
              }
            } else {
              j = j + 1;
            }
          }
          if (trouveBase == false) {
            let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
            if (
              typeNumerique.test(
                $scope.FormAddIndivAccident.infoBeneficiaire.taux
              ) == false
            ) {
              $scope.messageErreur = "Veuillez renseigner un taux correct.";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
            } else if (
              $scope.verifierChampTauxBenef(
                $scope.FormAddIndivAccident.infoBeneficiaire.taux
              ) == true
            ) {
              $scope.messageErreur = "Veuillez renseigner un taux correct.";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
            } else {
              $scope.tabBeneficiaire.push(
                $scope.FormAddIndivAccident.infoBeneficiaire
              );
              $(document).ready(function () {
                $("#idCode3").css("background-color", "#FFFFFF");
                $("#idNomAssure3").css("background-color", "#FFFFFF");
              });
              $scope.isDisabled3 = false;
            }
          }
          console.log($scope.tabBeneficiaire);
          $scope.FormAddIndivAccident.infoBeneficiaire = "";
        } else {
          switch (
            $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire
          ) {
            case "01":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "FEMME";
              break;
            case "02":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "ENFANT";
              break;
            case "03":
              $scope.FormAddIndivAccident.infoBeneficiaire.titreBeneficiaire =
                "NEVEU";
              break;
          }

          let i = 0;
          let trouve = false;
          while (i < $scope.tabBeneficiaire.length && trouve == false) {
            if (
              $scope.tabBeneficiaire[i].nomAssureBenef ===
              $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef
            ) {
              trouve = true;
              let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
              if (
                typeNumerique.test(
                  $scope.FormAddIndivAccident.infoBeneficiaire.taux
                ) == false
              ) {
                $scope.messageErreur = "Veuillez renseigner un taux correct.";
                $rootScope.MessageDerreurDesTypes($scope.messageErreur);
              } else if (
                $scope.verifierChampTauxBenef(
                  $scope.FormAddIndivAccident.infoBeneficiaire.taux
                ) == true
              ) {
                $scope.messageErreur = "Veuillez renseigner un taux correct.";
                $rootScope.MessageDerreurDesTypes($scope.messageErreur);
              } else {
                $scope.tabBeneficiaire.splice(i, 1);
                $scope.tabBeneficiaire.push(
                  $scope.FormAddIndivAccident.infoBeneficiaire
                );
                $(document).ready(function () {
                  $("#idCode3").css("background-color", "#FFFFFF");
                  $("#idNomAssure3").css("background-color", "#FFFFFF");
                });
                $scope.isDisabled3 = false;
              }
            } else {
              i = i + 1;
            }
          }
          if (trouve == false) {
            let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
            if (
              typeNumerique.test(
                $scope.FormAddIndivAccident.infoBeneficiaire.taux
              ) == false
            ) {
              $scope.messageErreur = "Veuillez renseigner un taux correct.";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
            } else if (
              $scope.verifierChampTauxBenef(
                $scope.FormAddIndivAccident.infoBeneficiaire.taux
              ) == true
            ) {
              $scope.messageErreur = "Veuillez renseigner un taux correct.";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
            } else {
              $scope.tabBeneficiaire.push(
                $scope.FormAddIndivAccident.infoBeneficiaire
              );
              $(document).ready(function () {
                $("#idCode3").css("background-color", "#FFFFFF");
                $("#idNomAssure3").css("background-color", "#FFFFFF");
              });
              $scope.isDisabled3 = false;
            }
          }
          console.log($scope.tabBeneficiaire);
          $scope.FormAddIndivAccident.infoBeneficiaire = "";
          console.log($scope.FormAddIndivAccident.infoBeneficiaire);
          $scope.isDisabled3 = false;
        }
      } else {
        $(document).ready(function () {
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire.code3 === "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire.code3 === undefined
          ) {
            $("#idCode3").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef ===
              "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef ===
              undefined
          ) {
            $("#idNomAssure3").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire.taux === "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire.taux === undefined
          ) {
            $("#idTaux").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoBeneficiaire
              .codeTitreBeneficiaire === "" ||
            $scope.FormAddIndivAccident.infoBeneficiaire
              .codeTitreBeneficiaire === undefined
          ) {
            $("#idTitreBenef").css("background-color", "#FFE9E0");
          }
        });
        let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;
        if (
          typeNumerique.test(
            $scope.FormAddIndivAccident.infoBeneficiaire.taux
          ) == false
        ) {
          $(document).ready(function () {
            $("#idTaux").css("background-color", "#FFE9E0");
          });
        } else if (
          $scope.verifierChampTauxBenef(
            $scope.FormAddIndivAccident.infoBeneficiaire.taux
          ) == true
        ) {
          $(document).ready(function () {
            $("#idTaux").css("background-color", "#FFE9E0");
          });
        }
        $rootScope.messageInfoBeneficiaire();
      }
    };
    //fin ajouter dans le tableau du beneficiaire modif

    //debut modification de l'ayant droit de la base
    $scope.modifAyantDroitBase = function (info) {
      sessionStorage.setItem(
        "modifAyantDroitIndivAccidentBase",
        JSON.stringify(info)
      );
      $scope.recupererAyantDroit = JSON.parse(
        sessionStorage.getItem("modifAyantDroitIndivAccidentBase")
      );
      $scope.FormAddIndivAccident.infoBeneficiaire = {};
      $scope.FormAddIndivAccident.infoBeneficiaire.code3 =
        $scope.recupererAyantDroit.code3;
      $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef =
        $scope.recupererAyantDroit.nomAssureBenef;
      $scope.FormAddIndivAccident.infoBeneficiaire.taux =
        $scope.recupererAyantDroit.taux;
      $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire =
        $scope.recupererAyantDroit.codeTitreBeneficiaire;
      $scope.testPosition = "1";
      $scope.isDisabled3 = true;
      console.log($scope.recupererAyantDroit);
    };
    //fin modification de l'ayant droit de la base

    //debut modification de l'ayant droit de la grille
    $scope.modifAyantDroit = function (info) {
      sessionStorage.setItem(
        "modifAyantDroitIndivAccident",
        JSON.stringify(info)
      );
      $scope.recupererAyantDroit = JSON.parse(
        sessionStorage.getItem("modifAyantDroitIndivAccident")
      );
      $scope.FormAddIndivAccident.infoBeneficiaire = {};
      $scope.FormAddIndivAccident.infoBeneficiaire.code3 =
        $scope.recupererAyantDroit.code3;
      $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef =
        $scope.recupererAyantDroit.nomAssureBenef;
      $scope.FormAddIndivAccident.infoBeneficiaire.taux =
        $scope.recupererAyantDroit.taux;
      $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire =
        $scope.recupererAyantDroit.codeTitreBeneficiaire;
      $scope.testPosition = "2";
      console.log($scope.recupererAyantDroit);
    };
    //fin modification de l'ayant droit de la grille

    //debut retirer le beneficiaire de la grille client
    $scope.retirerLeBenef = function (info) {
      let i = 0;
      let trouve = false;
      sessionStorage.setItem(
        "retirerAyantDroitIndivAccident",
        JSON.stringify(info)
      );
      $scope.recupererBeneficiaire = JSON.parse(
        sessionStorage.getItem("retirerAyantDroitIndivAccident")
      );
      //console.log($scope.recupererBeneficiaire);
      while (i < $scope.tabBeneficiaire2.length && trouve == false) {
        if (
          $scope.tabBeneficiaire2[i].nomAssureBenef ===
          $scope.recupererBeneficiaire.nomAssureBenef
        ) {
          trouve = true;
          $scope.tabBeneficiaire2.splice(i, 1);
        } else {
          i = i + 1;
        }
      }
    };
    //fin retirer le beneficiaire de la grille client

    //debut retirer le beneficiaire de la grille base
    $scope.retirerLeBenefBase = function (info) {
      let i = 0;
      let trouve = false;
      sessionStorage.setItem(
        "retirerAyantDroitIndivAccident",
        JSON.stringify(info)
      );
      $scope.recupererBeneficiaire = JSON.parse(
        sessionStorage.getItem("retirerAyantDroitIndivAccident")
      );
      console.log($scope.recupererBeneficiaire);
      while (i < $scope.tabBeneficiaire.length && trouve == false) {
        if (
          $scope.tabBeneficiaire[i].nomAssureBenef ===
          $scope.recupererBeneficiaire.nomAssureBenef
        ) {
          trouve = true;
          $scope.tabBeneficiaire.splice(i, 1);
        } else {
          i = i + 1;
        }
      }
    };
    //fin retirer le beneficiaire de la grille base

    //debut annuler la modif de l'ayant droit
    $scope.annulerModifAyantDroit = function () {
      $(document).ready(function () {
        $("#idCode3").css("background-color", "#FFFFFF");
        $("#idNomAssure3").css("background-color", "#FFFFFF");
        $("#idTaux").css("background-color", "#FFFFFF");
        $("#idTitreBenef").css("background-color", "#FFFFFF");
      });
      $scope.FormAddIndivAccident.infoBeneficiaire.code3 = "";
      $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef = "";
      $scope.FormAddIndivAccident.infoBeneficiaire.taux = "";
      $scope.FormAddIndivAccident.infoBeneficiaire.codeTitreBeneficiaire = "";
      $scope.isDisabled3 = false;
    };
    //fin annuler la modif de l'ayant droit

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddIndivAccident = function () {
      $scope.FormAddIndivAccident = {};
      $scope.initFormAddIndivAccident();
      $scope.tabBeneficiaire = [];
      $scope.isDisabled1 = false;
      $scope.isDisabled2 = false;
      $scope.isDisabled3 = false;
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

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

    //debut test des types sur les grilles
    $scope.confirmerChampsGrilleGarantie = function (grille) {
      $scope.verifie = false;
      let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;

      if (grille == undefined) {
        $scope.verifie = false;
        return $scope.verifie;
      } else {
        for (var j = 0; j < grille.length; j++) {
          if (
            typeNumerique.test(grille[j].CG_CAPITAUXASSURES) == false ||
            typeNumerique.test(grille[j].CG_TAUX) == false ||
            typeNumerique.test(grille[j].CG_PRIMES) == false
          ) {
            $scope.verifie = true;
            break;
          }
        }

        return $scope.verifie;
      }
    };
    $scope.confirmerChampsGrillePrime = function (grille) {
      $scope.verifie = false;
      let typeNumerique = /^[0-9]{1,}([,][0-9]{1,2})?$/;

      if (grille == undefined) {
        $scope.verifie = false;
        return $scope.verifie;
      } else {
        for (var j = 0; j < grille.length; j++) {
          if (typeNumerique.test(grille[j].CG_PRIMES) == false) {
            $scope.verifie = true;
            break;
          }
        }

        return $scope.verifie;
      }
    };
    //fin test des types sur les grilles

    //debut verifier le taux (tableau des garanties)
    $scope.verifierColTauxGarantie = function (colTabGarantie) {
      if (colTabGarantie !== "" && colTabGarantie !== undefined) {
        for (var b = 0; b < colTabGarantie.length; b++) {
          var posi = colTabGarantie[b].CG_TAUX.indexOf(",");
          if (posi !== -1) {
            var indexTab = b;
            break;
          }
        }
        if (posi !== -1) {
          var valeur = colTabGarantie[indexTab].CG_TAUX.substr(0, posi);
          for (var i = 0; i < valeur.length; i++) {
            var compteur = i + 1;
          }
          if (compteur > 3) {
            var testeur = true;
            return testeur;
          } else {
            if (valeur > 100) {
              testeur = true;
              return testeur;
            } else if (
              valeur == 100 &&
              colTabGarantie[indexTab].CG_TAUX.indexOf(",") !== -1
            ) {
              testeur = true;
              return testeur;
            } else {
              testeur = false;
              return testeur;
            }
          }
        } else {
          var indique = 0;
          for (var d = 0; d < colTabGarantie.length; d++) {
            if (colTabGarantie[d].CG_TAUX > 100) {
              indique = d + 1;
              break;
            }
          }
          if (indique !== 0) {
            testeur = true;
            return testeur;
          } else {
            testeur = false;
            return testeur;
          }
        }
      }
    };
    //fin verifier le taux (tableau des garanties)

    //debut focus sur le champ enregistrement
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCode1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomAssure").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateNaiss").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idLieuNaiss").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMainForte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idProfession").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSport").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCode2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idIntermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEffet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEcheance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCommmune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSituationGeo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNbreAssure").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAssureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idInterlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTelInter").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 0).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 1).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 2).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 3).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 4).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPrime" + 5).focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ enregistrement

    //Debut ajout individuel accident (contrat)
    $scope.validerFormIndivAccident = function (
      dateEffet,
      dateEcheance,
      dateNaissance
    ) {
      $scope.$emit("LOAD");
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("modifIndivAccident")
      );

      $scope.testPrime();
      //$scope.calculPrimeTtc();
      $scope.desactiverChampRequisEnregistrement();

      let typeNumerique = /^[0-9]+$/;
      let typeNbreAssure = /^[0-9]{1,2}$/;
      let typeNumeroTelephone = /^\d+$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typeAlphaNumerique = /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/;

      if (
        $scope.FormAddIndivAccident.infoGenerale.effet !== undefined &&
        $scope.FormAddIndivAccident.infoGenerale.echeance !== undefined &&
        $scope.FormAddIndivAccident.infoSouscripteur.date !== undefined
      ) {
        $scope.lAnneeEffet =
          $scope.FormAddIndivAccident.infoGenerale.effet.substr(6, 4);
        $scope.leMoisEffet =
          $scope.FormAddIndivAccident.infoGenerale.effet.substr(3, 2);
        $scope.leJourEffet =
          $scope.FormAddIndivAccident.infoGenerale.effet.substr(0, 2);
        $scope.lAnneeEcheance =
          $scope.FormAddIndivAccident.infoGenerale.echeance.substr(6, 4);
        $scope.leMoisEcheance =
          $scope.FormAddIndivAccident.infoGenerale.echeance.substr(3, 2);
        $scope.leJourEcheance =
          $scope.FormAddIndivAccident.infoGenerale.echeance.substr(0, 2);
        $scope.lAnneeDateNaiss =
          $scope.FormAddIndivAccident.infoSouscripteur.date.substr(6, 4);
        $scope.leMoisDateNaiss =
          $scope.FormAddIndivAccident.infoSouscripteur.date.substr(3, 2);
        $scope.leJourDateNaiss =
          $scope.FormAddIndivAccident.infoSouscripteur.date.substr(0, 2);
      }

      // mettre 0 dans les champs de prime si le champ est vide
      if ($scope.etatForm == "2") {
        for (
          var i = 0;
          i < $scope.recupererInfo.clsCtcontratprimes.length;
          i++
        ) {
          if ($scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES == "") {
            $scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES = 0;
          }
        }
      } else {
        for (var i = 0; i < $scope.tabPrimes.length; i++) {
          if ($scope.tabPrimes[i].CG_PRIMES == "") {
            $scope.tabPrimes[i].CG_PRIMES = 0;
          }
        }
      }

      if (
        $scope.FormAddIndivAccident.infoSouscripteur.code1 === "" ||
        $scope.FormAddIndivAccident.infoSouscripteur.code1 === undefined ||
        $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript ===
          "" ||
        $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript ===
          undefined ||
        $scope.FormAddIndivAccident.infoSouscripteur.date === "" ||
        $scope.FormAddIndivAccident.infoSouscripteur.date === undefined ||
        $scope.FormAddIndivAccident.infoSouscripteur.lieuNaissance === "" ||
        $scope.FormAddIndivAccident.infoSouscripteur.lieuNaissance ===
          undefined ||
        $scope.FormAddIndivAccident.infoSouscripteur.mainForte === "" ||
        $scope.FormAddIndivAccident.infoSouscripteur.mainForte === undefined ||
        $scope.FormAddIndivAccident.infoSouscripteur.profession === "" ||
        $scope.FormAddIndivAccident.infoSouscripteur.profession === undefined ||
        $scope.FormAddIndivAccident.infoSouscripteur.sport === "" ||
        $scope.FormAddIndivAccident.infoSouscripteur.sport === undefined ||
        $scope.FormAddIndivAccident.infoCommercial.code2 === "" ||
        $scope.FormAddIndivAccident.infoCommercial.code2 === undefined ||
        $scope.FormAddIndivAccident.infoCommercial.denomination === "" ||
        $scope.FormAddIndivAccident.infoCommercial.denomination === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.numPolice === "" ||
        $scope.FormAddIndivAccident.infoGenerale.numPolice === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.intermediaire === "" ||
        $scope.FormAddIndivAccident.infoGenerale.intermediaire === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.effet === "" ||
        $scope.FormAddIndivAccident.infoGenerale.effet === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.echeance === "" ||
        $scope.FormAddIndivAccident.infoGenerale.echeance === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.pays === "" ||
        $scope.FormAddIndivAccident.infoGenerale.pays === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.ville === "" ||
        $scope.FormAddIndivAccident.infoGenerale.ville === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.commune === "" ||
        $scope.FormAddIndivAccident.infoGenerale.commune === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.situationGeo === "" ||
        $scope.FormAddIndivAccident.infoGenerale.situationGeo === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.nombreAssure === "" ||
        $scope.FormAddIndivAccident.infoGenerale.nombreAssure === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.assureur === "" ||
        $scope.FormAddIndivAccident.infoGenerale.assureur === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.interlocuteur === "" ||
        $scope.FormAddIndivAccident.infoGenerale.interlocuteur === undefined ||
        $scope.FormAddIndivAccident.infoGenerale.telInterlocuteur === "" ||
        $scope.FormAddIndivAccident.infoGenerale.telInterlocuteur ===
          undefined ||
        $scope.FormAddIndivAccident.infoGenerale.typeAffaire === "" ||
        $scope.FormAddIndivAccident.infoGenerale.typeAffaire === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddIndivAccident.infoSouscripteur.code1 === "" ||
            $scope.FormAddIndivAccident.infoSouscripteur.code1 === undefined
          ) {
            $("#idCode1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript ===
              "" ||
            $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript ===
              undefined
          ) {
            $("#idNomAssure").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoSouscripteur.date === "" ||
            $scope.FormAddIndivAccident.infoSouscripteur.date === undefined
          ) {
            $("#idDateNaiss").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoSouscripteur.lieuNaissance === "" ||
            $scope.FormAddIndivAccident.infoSouscripteur.lieuNaissance ===
              undefined
          ) {
            $("#idLieuNaiss").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoSouscripteur.mainForte === "" ||
            $scope.FormAddIndivAccident.infoSouscripteur.mainForte === undefined
          ) {
            $("#idMainForte").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoSouscripteur.profession === "" ||
            $scope.FormAddIndivAccident.infoSouscripteur.profession ===
              undefined
          ) {
            $("#idProfession").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoSouscripteur.sport === "" ||
            $scope.FormAddIndivAccident.infoSouscripteur.sport === undefined
          ) {
            $("#idSport").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoCommercial.code2 === "" ||
            $scope.FormAddIndivAccident.infoCommercial.code2 === undefined
          ) {
            $("#idCode2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoCommercial.denomination === "" ||
            $scope.FormAddIndivAccident.infoCommercial.denomination ===
              undefined
          ) {
            $("#idDenomination2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.numPolice === "" ||
            $scope.FormAddIndivAccident.infoGenerale.numPolice === undefined
          ) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.intermediaire === "" ||
            $scope.FormAddIndivAccident.infoGenerale.intermediaire === undefined
          ) {
            $("#idIntermediaire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.effet === "" ||
            $scope.FormAddIndivAccident.infoGenerale.effet === undefined
          ) {
            $("#idDateEffet").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.echeance === "" ||
            $scope.FormAddIndivAccident.infoGenerale.echeance === undefined
          ) {
            $("#idDateEcheance").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.pays === "" ||
            $scope.FormAddIndivAccident.infoGenerale.pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.ville === "" ||
            $scope.FormAddIndivAccident.infoGenerale.ville === undefined
          ) {
            $("#idVille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.commune === "" ||
            $scope.FormAddIndivAccident.infoGenerale.commune === undefined
          ) {
            $("#idCommmune").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.situationGeo === "" ||
            $scope.FormAddIndivAccident.infoGenerale.situationGeo === undefined
          ) {
            $("#idSituationGeo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.nombreAssure === "" ||
            $scope.FormAddIndivAccident.infoGenerale.nombreAssure === undefined
          ) {
            $("#idNbreAssure").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.assureur === "" ||
            $scope.FormAddIndivAccident.infoGenerale.assureur === undefined
          ) {
            $("#idAssureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.interlocuteur === "" ||
            $scope.FormAddIndivAccident.infoGenerale.interlocuteur === undefined
          ) {
            $("#idInterlocuteur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.telInterlocuteur === "" ||
            $scope.FormAddIndivAccident.infoGenerale.telInterlocuteur ===
              undefined
          ) {
            $("#idTelInter").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddIndivAccident.infoGenerale.typeAffaire === "" ||
            $scope.FormAddIndivAccident.infoGenerale.typeAffaire === undefined
          ) {
            $("#idTypeAffaire").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeNumerique.test(
          $scope.FormAddIndivAccident.infoSouscripteur.code1
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idCode1").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphaNumerique.test(
          $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNomAssure").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un nom correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddIndivAccident.infoSouscripteur.date) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaiss").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une date de naissance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateNaiss) == true &&
        $scope.leMoisDateNaiss == "02" &&
        $scope.leJourDateNaiss > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaiss").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de naissance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateNaiss) == false &&
        $scope.leMoisDateNaiss == "02" &&
        $scope.leJourDateNaiss > "28"
      ) {
        $(document).ready(function () {
          $("#idDateNaiss").css("background-color", "#FFE9E0");
        });
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de naissance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisDateNaiss == "04" ||
          $scope.leMoisDateNaiss == "06" ||
          $scope.leMoisDateNaiss == "09" ||
          $scope.leMoisDateNaiss == "11") &&
        $scope.leJourDateNaiss > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaiss").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de naissance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.FormAddIndivAccident.infoCommercial.code2) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idCode2").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphaNumerique.test(
          $scope.FormAddIndivAccident.infoCommercial.denomination
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDenomination2").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une dénomination correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphaNumerique.test(
          $scope.FormAddIndivAccident.infoGenerale.situationGeo
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idSituationGeo").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une situation géo. correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddIndivAccident.infoGenerale.effet) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == true &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddIndivAccident.infoGenerale.echeance) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date écheance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == true &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEcheance == "04" ||
          $scope.leMoisEcheance == "06" ||
          $scope.leMoisEcheance == "09" ||
          $scope.leMoisEcheance == "11") &&
        $scope.leJourEcheance > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNbreAssure.test(
          $scope.FormAddIndivAccident.infoGenerale.nombreAssure
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNbreAssure").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un nombre assurés correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumeroTelephone.test(
          $scope.FormAddIndivAccident.infoGenerale.telInterlocuteur
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTelInter").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphaNumerique.test(
          $scope.FormAddIndivAccident.infoGenerale.interlocuteur
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idInterlocuteur").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un nom interlocuteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(dateEffet) >=
        $scope.dateSuperioriteFin(dateEcheance)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        $rootScope.dateEffetIncorrecte();
      } else if (
        $scope.dateSuperioriteDebut(dateNaissance) >=
        $scope.dateSuperioriteFin(dateEffet)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaiss").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La date de naissance doit être strictement inférieure à la date d'effet";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutPrimeEnregistrement == true) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFFFFF");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
          $("#idPrime" + 5).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La prime ttc ne doit pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutPrime == true) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFFFFF");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
          $("#idPrime" + 5).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La prime ttc ne doit pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeNette) == 0 ||
        parseInt($scope.valPrimeTtc) == 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
          $("#idPrime" + 5).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La prime nette ou la prime ttc ne doivent pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeTtcEnregistrement) == 0 ||
        parseInt($scope.valPrimeNetteEnregistrement) == 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
          $("#idPrime" + 5).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La prime nette ou la prime ttc ne doivent pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeNette) > parseInt($scope.valPrimeTtc)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
          $("#idPrime" + 5).css("background-color", "#FFFFFF");
        });
        $scope.messageErreur =
          "La prime nette ne doit être superieure à la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valPrimeNetteEnregistrement) >
        parseInt($scope.valPrimeTtcEnregistrement)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFE9E0");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFFFFF");
          $("#idPrime" + 4).css("background-color", "#FFFFFF");
          $("#idPrime" + 5).css("background-color", "#FFFFFF");
        });
        $scope.messageErreur =
          "La prime nette ne doit être superieure à la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.confirmerChampsGrilleGarantie($scope.tabGarenties) == true ||
        $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.confirmerChampsGrilleGarantie(
          $scope.recupererInfo.clsCtcontratgaranties
        ) == true ||
        $scope.confirmerChampsGrillePrime(
          $scope.recupererInfo.clsCtcontratprimes
        ) == true
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          if ($scope.FormAddIndivAccident.infoSouscripteur.idModif1 === "") {
            $scope.FormAddIndivAccident.infoSouscripteur.id1 =
              $scope.recuperer.TI_IDTIERS;
          }
          if ($scope.FormAddIndivAccident.infoCommercial.idModif2 === "") {
            $scope.FormAddIndivAccident.infoCommercial.id2 =
              $scope.recuperer.TI_IDTIERSCOMMERCIAL;
          }

          //objet des garanties
          $scope.clsCtcontratgaranties = [];
          for (
            var i = 0;
            i < $scope.recupererInfo.clsCtcontratgaranties.length;
            i++
          ) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              GA_CODEGARANTIE: "",
              CG_CAPITAUXASSURES: "",
              CG_PRIMES: "",
              CG_APRESREDUCTION: "",
              CG_PRORATA: "",
              CG_FRANCHISES: "",
              CG_TAUX: "",
              CG_MONTANT: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetGarentie.CA_CODECONTRAT =
              $scope.recupererInfo.clsCtcontratgaranties[i].CA_CODECONTRAT;
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.recupererInfo.clsCtcontratgaranties[i].GA_CODEGARANTIE;
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_PRORATA;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_FRANCHISES;
            $scope.objetGarentie.CG_TAUX =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_TAUX;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          //objet des primes
          $scope.clsCtcontratprimes = [];
          for (
            var j = 0;
            j < $scope.recupererInfo.clsCtcontratprimes.length;
            j++
          ) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              CG_PRIMES: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.CA_CODECONTRAT =
              $scope.recupererInfo.clsCtcontratprimes[j].CA_CODECONTRAT;
            $scope.objetPrime.RE_CODERESUME =
              $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
            $scope.objetPrime.CG_PRIMES =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }

          //objet des ayants droits
          $scope.clsCtcontratayantdroit = [];
          for (var d = 0; d < $scope.tabBeneficiaire.length; d++) {
            $scope.objetAyantDroit = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              AY_DENOMMINATIONAYANTDROIT: "",
              AY_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAI,
              AY_INDEX: "0",
              AY_DATECLOTURE: "01-01-1900",
              TA_CODETITREAYANTDROIT: "",
              AY_TAUX: "",
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "0",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objetAyantDroit.CA_CODECONTRAT =
              $scope.recuperer.CA_CODECONTRAT;
            if ($scope.tabBeneficiaire[d].idModif3 == undefined) {
              let z = 0;
              let position = -1;
              while (
                z < $scope.recuperer.clsCtcontratayantdroits.length &&
                position == -1
              ) {
                if (
                  $scope.recuperer.clsCtcontratayantdroits[z]
                    .AY_DENOMMINATIONAYANTDROIT ==
                  $scope.tabBeneficiaire[d].nomAssureBenef
                ) {
                  position = z;
                } else {
                  z++;
                }
              }
            } else {
              $scope.objetAyantDroit.TI_IDTIERSAYANTDROIT =
                $scope.tabBeneficiaire[d].idModif3;
            }
            $scope.objetAyantDroit.AY_DENOMMINATIONAYANTDROIT =
              $scope.tabBeneficiaire[d].nomAssureBenef;
            $scope.objetAyantDroit.AY_TAUX = $scope.tabBeneficiaire[d].taux;
            $scope.objetAyantDroit.TA_CODETITREAYANTDROIT =
              $scope.tabBeneficiaire[d].codeTitreBeneficiaire;
            $scope.clsCtcontratayantdroit.push($scope.objetAyantDroit);
          }
          for (var b = 0; b < $scope.tabBeneficiaire2.length; b++) {
            $scope.objetAyantDroit = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              AY_DENOMMINATIONAYANTDROIT: "",
              AY_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAI,
              AY_INDEX: "0",
              AY_DATECLOTURE: "01-01-1900",
              TA_CODETITREAYANTDROIT: "",
              AY_TAUX: "",
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "0",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objetAyantDroit.CA_CODECONTRAT =
              $scope.recuperer.CA_CODECONTRAT;
            /*  if ($scope.tabBeneficiaire2[b].idModif3 == undefined) {
              $scope.objetAyantDroit.TI_IDTIERSAYANTDROIT =
                $scope.recuperer.clsCtcontratayantdroits[
                  b
                ].TI_IDTIERSAYANTDROIT;
            } else {
              $scope.objetAyantDroit.TI_IDTIERSAYANTDROIT =
                $scope.tabBeneficiaire2[b].idModif3;
            } */
            $scope.objetAyantDroit.AY_TAUX = $scope.tabBeneficiaire2[b].taux;
            $scope.objetAyantDroit.TA_CODETITREAYANTDROIT =
              $scope.tabBeneficiaire2[b].codeTitreBeneficiaire;
            $scope.clsCtcontratayantdroit.push($scope.objetAyantDroit);
          }

          $scope.TYPEOPERATION = "1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "MODIFICATION";
        } else {
          //objet des garanties
          $scope.clsCtcontratgaranties = [];
          for (var i = 0; i < $scope.tabGarenties.length; i++) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              GA_CODEGARANTIE: "",
              CG_CAPITAUXASSURES: "",
              CG_PRIMES: "",
              CG_APRESREDUCTION: "",
              CG_PRORATA: "",
              CG_FRANCHISES: "",
              CG_TAUX: "",
              CG_MONTANT: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.tabGarenties[i].GA_CODEGARANTIE;
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.tabGarenties[i].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES = $scope.tabGarenties[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.tabGarenties[i].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA = $scope.tabGarenties[i].CG_PRORATA;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.tabGarenties[i].CG_FRANCHISES;
            $scope.objetGarentie.CG_TAUX = $scope.tabGarenties[i].CG_TAUX;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          //objet des primes
          $scope.clsCtcontratprimes = [];
          for (var j = 0; j < $scope.tabPrimes.length; j++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.RE_CODERESUME = $scope.tabPrimes[j].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR = $scope.tabPrimes[j].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          //objet des ayants droits
          $scope.clsCtcontratayantdroit = [];
          for (var d = 0; d < $scope.tabBeneficiaire.length; d++) {
            $scope.objetAyantDroit = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              AY_DENOMMINATIONAYANTDROIT: "",
              AY_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAI,
              AY_INDEX: "0",
              AY_DATECLOTURE: "01-01-1900",
              TA_CODETITREAYANTDROIT: "",
              AY_TAUX: "",
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
              TYPEOPERATION: "0",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objetAyantDroit.AY_DENOMMINATIONAYANTDROIT =
              $scope.tabBeneficiaire[d].nomAssureBenef;
            $scope.objetAyantDroit.AY_TAUX = $scope.tabBeneficiaire[d].taux;
            $scope.objetAyantDroit.TA_CODETITREAYANTDROIT =
              $scope.tabBeneficiaire[d].codeTitreBeneficiaire;
            $scope.clsCtcontratayantdroit.push($scope.objetAyantDroit);
          }

          $scope.TYPEOPERATION = "0";
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "INSERTION";
        }

        if (
          $scope.verifierColTauxGarantie($scope.tabGarenties) == true ||
          $scope.verifierColTauxGarantie(
            $scope.recupererInfo.clsCtcontratgaranties
          ) == true
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Le taux du tableau des garanties n'est pas correct";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "03",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE: $scope.FormAddIndivAccident.infoGenerale.numPolice,
              IT_CODEINTERMEDIAIRE:
                $scope.FormAddIndivAccident.infoGenerale.intermediaire,
              TI_IDTIERSASSUREUR:
                $scope.FormAddIndivAccident.infoGenerale.assureur,
              CO_CODECOMMUNE: $scope.FormAddIndivAccident.infoGenerale.commune,
              CA_SITUATIONGEOGRAPHIQUE:
                $scope.FormAddIndivAccident.infoGenerale.situationGeo,
              CA_DATEEFFET: $scope.FormAddIndivAccident.infoGenerale.effet,
              CA_DATEECHEANCE:
                $scope.FormAddIndivAccident.infoGenerale.echeance,
              CA_DATENAISSANCE:
                $scope.FormAddIndivAccident.infoSouscripteur.date,
              CA_NOMINTERLOCUTEUR:
                $scope.FormAddIndivAccident.infoGenerale.interlocuteur,
              CA_CONTACTINTERLOCUTEUR:
                $scope.FormAddIndivAccident.infoGenerale.telInterlocuteur,
              TI_IDTIERSCOMMERCIAL:
                $scope.FormAddIndivAccident.infoCommercial.id2,
              TI_IDTIERS: $scope.FormAddIndivAccident.infoSouscripteur.id1,
              TA_CODETYPEAFFAIRES:
                $scope.FormAddIndivAccident.infoGenerale.typeAffaire,
              CA_LIEUNAISSANCE:
                $scope.FormAddIndivAccident.infoSouscripteur.lieuNaissance,
              MF_CODEMAINFORTE:
                $scope.FormAddIndivAccident.infoSouscripteur.mainForte,
              PF_CODEPROFESSION:
                $scope.FormAddIndivAccident.infoSouscripteur.profession,
              CA_NBREPLACE:
                $scope.FormAddIndivAccident.infoGenerale.nombreAssure,
              AC_SPORT: $scope.FormAddIndivAccident.infoSouscripteur.sport,
              CA_DUREEENMOIS: "",
              CA_ADRESSE: "",
              CA_AVENANT: "0",
              CA_NUMSERIE: "1000",
              CA_TAUX: "0",
              CA_IMMATRICULATION: "",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              CA_DATEVALIDATIONCONTRAASS: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.FormAddIndivAccident.valgarantie,
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.recupInfoDemande
                ? $scope.recupInfoDemande.DE_CODEDEMANADE
                : "",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: $scope.clsCtcontratgaranties,
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratayantdroits: $scope.clsCtcontratayantdroit,
            },
          ];

          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.tabEngIndivAccident = reponse.data;
              if (
                $scope.tabEngIndivAccident[0].clsObjetRetour.SL_RESULTAT ===
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.tabEngIndivAccident[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href = "#/assurances/individuel-accident";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                } else {
                  if (!!localStorage.getItem("collectionDemande")) {
                    localStorage.removeItem("collectionDemande");
                  }
                  $scope.resetFormAddIndivAccident();
                }
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.tabEngIndivAccident[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.tabEngIndivAccident[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout individuel accident (contrat)

    //debut liste des souscripteurs
    $scope.afficheListeTiersBeneficiaire = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddIndivAccident.infoBeneficiaire.code3 == "" &&
        $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "CLIENT",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddIndivAccident.infoBeneficiaire.code3,
            TI_DENOMINATION:
              $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "CLIENT",
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
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSouscripteurs = reponse.data;
          $scope.leChargement = false;
          console.log($scope.listeDesSouscripteurs);
        });
    };
    //fin liste des souscripteurs

    //debut liste des souscripteurs
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddIndivAccident.infoSouscripteur.code1 == "" &&
        $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "CLIENT",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddIndivAccident.infoSouscripteur.code1,
            TI_DENOMINATION:
              $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "CLIENT",
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
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.leChargement = false;
          $scope.listeDesSouscripteurs = reponse.data;
        });
    };
    //fin liste des souscripteurs

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddIndivAccident.infoCommercial.code2 == "" &&
        $scope.FormAddIndivAccident.infoCommercial.denomination == ""
      ) {
        $scope.objet_envoie = [
          {
            TI_IDTIERS: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "COMMERCIAL",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      } else {
        $scope.objet_envoie = [
          {
            TI_IDTIERS: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddIndivAccident.infoCommercial.code2,
            TI_DENOMINATION:
              $scope.FormAddIndivAccident.infoCommercial.denomination,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "COMMERCIAL",
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
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommerciaux = reponse.data;
          $scope.leChargement = false;
        });
    };
    //fin liste des comerciaux

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id, adresse) {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#EDEDED");
        $("#idNomAssure").css("background-color", "#EDEDED");
      });
      $scope.FormAddIndivAccident.infoSouscripteur.code1 = code;
      $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript =
        denomination;
      $scope.FormAddIndivAccident.infoSouscripteur.id1 = id;
      $scope.FormAddIndivAccident.infoSouscripteur.adresse = adresse;
      $scope.isDisabled1 = true;
    };
    //Fin choix d'un souscripteur
    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $(document).ready(function () {
        $("#idCode2").css("background-color", "#EDEDED");
        $("#idDenomination2").css("background-color", "#EDEDED");
      });
      $scope.FormAddIndivAccident.infoCommercial.code2 = code;
      $scope.FormAddIndivAccident.infoCommercial.denomination = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddIndivAccident.infoCommercial.idModif2 = id;
        $scope.FormAddIndivAccident.infoCommercial.id2 =
          $scope.FormAddIndivAccident.infoCommercial.idModif2;
      } else {
        $scope.FormAddIndivAccident.infoCommercial.id2 = id;
      }
      $scope.isDisabled2 = true;
    };
    //Fin choix d'un commercial
    //Debut choix d'un beneficiaire
    $scope.choixSouscripteurBenef = function (code, denomination, id) {
      $(document).ready(function () {
        $("#idCode3").css("background-color", "#EDEDED");
        $("#idNomAssure3").css("background-color", "#EDEDED");
      });
      $scope.FormAddIndivAccident.infoBeneficiaire.code3 = code;
      $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef =
        denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddIndivAccident.infoBeneficiaire.idModif3 = id;
        $scope.FormAddIndivAccident.infoBeneficiaire.id3 =
          $scope.FormAddIndivAccident.infoBeneficiaire.idModif3;
      } else {
        $scope.FormAddIndivAccident.infoBeneficiaire.id3 = id;
      }
      $scope.isDisabled3 = true;
    };
    //Fin choix d'un beneficiaire

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste individuel accident
    $scope.afficheListeContrat = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]+$/;
      let typeAlphaNumerique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

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
        numDePolice === undefined ||
        numSouscrp === undefined ||
        nomSouscrp === undefined ||
        numCom === undefined ||
        nomCom === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numDePolice === undefined) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (numSouscrp === undefined) {
            $("#idNumSouscripteur").css("background-color", "#FFE9E0");
          }
          if (nomSouscrp === undefined) {
            $("#idNomSouscripteur").css("background-color", "#FFE9E0");
          }
          if (numCom === undefined) {
            $("#idNumCommercial").css("background-color", "#FFE9E0");
          }
          if (nomCom === undefined) {
            $("#idNomCommercial").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeContrat = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
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
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
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
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
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
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listeContrat = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeContrat = "";
      } else {
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: "03",
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          .post("/Contrat/ListeContratSansAccessoir/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContrat = reponse.data;
            $scope.nombreInfoBulle = $scope.listeContrat.length;
            if ($scope.listeContrat[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeContrat[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste individuel accident

  //debut afficher liste AvecAccessoir
  $scope.afficheListeContratAvecAccessoir = function (
    idContrat,
    date
  ) {
    $scope.$emit("LOAD");
   
   
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "03",
          CA_CODECONTRAT: idContrat,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_NUMPOLICE: "",
          TI_NUMTIERS: "",
          TI_DENOMINATION: "",
          TI_NUMTIERSCOMMERCIAL: "",
          TI_DENOMINATIONCOMMERCIAL: "",
          DATEDEBUT: date,//"01-01-1900",
          DATEFIN: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
        .post("/Contrat/ListeContrat/", $scope.objet_envoie, {
          //.post("/Contrat/ListeContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeContratAvecAccessoir = reponse.data.reverse();
          $scope.nombreInfoBulle = $scope.listeContratAvecAccessoir.length;
          if ($scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              "veuillez reessayez svp !!!"
              //$scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_MESSAGE
            );
          }else{
            $scope.recupererInfoAvecAccessoir = $scope.listeContratAvecAccessoir[0]
            sessionStorage.setItem("modifIndivAccident", JSON.stringify($scope.recupererInfoAvecAccessoir));
            window.location.href = "#/assurances/modification/individuel-accident";
          }
        });
   
  };
  //fin afficher liste AvecAccessoir

    //debut voir individuel accident
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpIndivAccident", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpIndivAccident"));
      console.log($scope.recuperer);
    };
    //fin voir plus individuel accident

    //debut recuperer id pour la suppression du contrat
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du contrat

    //debut suppression du contrat
    $scope.supprimeContrat = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: recupId,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDSUPPRESSION,
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
        .post("/Contrat/SuppressionContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.elmntSupprimerIndivAccident = reponse.data;
          if (
            $scope.elmntSupprimerIndivAccident[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.elmntSupprimerIndivAccident[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeContrat[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.elmntSupprimerIndivAccident[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.elmntSupprimerIndivAccident[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin suppression du contrat

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
    };
    //fin pour annuler la recherche

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE)
     
    };
    //debut acceder a la page de modification

    //debut liste des villes pour la modification
    $scope.afficheListeVille = function (id) {
      $scope.listeDesCommunes = [];
      $scope.FormAddIndivAccident.infoGenerale.commune = "";
      //$scope.FormAddIndivAccident.infoGenerale.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    $scope.afficheListeVilleModif = function (id) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.verouVille = false;
            $scope.afficheListeCommuneModif($scope.recupererInfo.VL_CODEVILLE);
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVilles[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesVilles);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVilles[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes pour la modification

    //debut liste des communes pour la modification
    $scope.afficheListeCommune = function (id) {
      $scope.FormAddIndivAccident.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunes = reponse.data;
          if (
            $scope.listeDesCommunes[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };

    $scope.afficheListeCommuneModif = function (id) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunes = reponse.data;
          if (
            $scope.listeDesCommunes[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunes[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunes);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunes[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des communes pour la modification

    //debut verification de la prime nette et ttc
    $scope.testPrime = function () {
      $scope.statutPrime = false;
      $scope.statutPrimeEnregistrement = false;
      if ($scope.etatForm == "2") {
        $scope.valPrimeTtcEnregistrement = 1;
        $scope.valPrimeNetteEnregistrement = 1;
        $scope.verifieprime = false;
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeNette =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeTtc =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
          }
        }
      } else {
        $scope.valPrimeTtc = 1;
        $scope.valPrimeNette = 1;
        $scope.statutPrimeEnregistrement = false;
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 01 &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrimeEnregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 01 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeNetteEnregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutPrimeEnregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valPrimeTtcEnregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }
        }
      }
    };
    //fin verification de la prime nette et ttc

    //debut calcul de la prime automatiquement
    $scope.calculprimettc = function () {
      $scope.premierclick = "FALSE";
      $scope.valprimettcaffiche = 0;
      if ($scope.etatForm == "2") {
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES = 0;
          }
        }
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME !== 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES != "" &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES);
          }
        }
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES =
              $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      } else {
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = 0;
          }
        }

        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME !== 05 &&
            $scope.tabPrimes[j].CG_PRIMES != "" &&
            $scope.tabPrimes[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.tabPrimes[j].CG_PRIMES);
          }
        }
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      }
    };
    //fin calcul de la prime automatiquement

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "IndividuelAccident";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBOS
    $scope.afficheListegarantie = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "03",
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
        .post("/Garantie/ListeGarantie/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesGarantie = reponse.data;
          if (
            $scope.listeDesGarantie[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesGarantie[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesGarantie);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesGarantie[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    //debut liste des pays
    $scope.afficheListePays = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Pays/ListePays/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPays = reponse.data;
          if ($scope.listeDesPays[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeAssureur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPays[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPays);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPays[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des assureur
    $scope.afficheListeAssureur = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Assureur/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesAssureurs = reponse.data;
          if (
            $scope.listeDesAssureurs[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureurs);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des assureur

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Intermediaire/ListeIntermediaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesIntermediaires = reponse.data;
          if (
            $scope.listeDesIntermediaires[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.tableauGarenties();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesIntermediaires[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesIntermediaires);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesIntermediaires[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des intermediaire

    //debut tableau garenties
    $scope.tableauGarenties = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "03",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Garenties/ListeGarenties/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabGarenties = reponse.data;
          if ($scope.tabGarenties[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabGarenties[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabGarenties);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabGarenties[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau garenties

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "03",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Primes/ListePrimes/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabPrimes = reponse.data;
          if ($scope.tabPrimes[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeTitreBeneficiaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabPrimes[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabPrimes);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabPrimes[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau primes

    //debut liste des titres beneficiaire
    $scope.afficheListeTitreBeneficiaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
          "/TitreBeneficiaire/ListeTitreBeneficiaire/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeTitreBeneficiaire = reponse.data;
          if (
            $scope.listeTitreBeneficiaire[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeMainForte();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTitreBeneficiaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTitreBeneficiaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTitreBeneficiaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des titres beneficiaire

    //debut liste main forte
    $scope.afficheListeMainForte = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/MainForte/ListeMainForte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeMainForte = reponse.data;
          if ($scope.listeMainForte[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeTypeAffaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeMainForte[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeMainForte);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeMainForte[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste main forte

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/TypeAffaire/ListeTypeAffaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeAffaire = reponse.data;
          if (
            $scope.listeTypeAffaire[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeProfession();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut liste profession
    $scope.afficheListeProfession = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
        .post("/Profession/ListeProfession/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeProfession = reponse.data;
          if ($scope.listeProfession[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifIndivAccident, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
              //setTimeout(function(){ $scope.$emit("UNLOAD");},3000)
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeProfession[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeProfession);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeProfession[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste profession

    //debut acceder a la page de modification
    $scope.retourModifIndivAccident = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifIndivAccident")
      );
      console.log($scope.recupererInfo);
      $scope.isDisabled1 = true;
      $scope.isDisabled2 = false;
      $scope.isDisabled3 = false;

      $scope.FormAddIndivAccident.infoSouscripteur.code1 =
        $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddIndivAccident.infoSouscripteur.nomAssureSouscript =
        $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddIndivAccident.infoSouscripteur.date =
        $scope.recupererInfo.CA_DATENAISSANCE;
      $scope.FormAddIndivAccident.infoSouscripteur.lieuNaissance =
        $scope.recupererInfo.CA_LIEUNAISSANCE;
      $scope.FormAddIndivAccident.infoSouscripteur.mainForte =
        $scope.recupererInfo.MF_CODEMAINFORTE;
      $scope.FormAddIndivAccident.infoSouscripteur.profession =
        $scope.recupererInfo.PF_CODEPROFESSION;
      $scope.FormAddIndivAccident.infoSouscripteur.sport =
        $scope.recupererInfo.AC_SPORT;

      $scope.FormAddIndivAccident.infoCommercial.code2 =
        $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddIndivAccident.infoCommercial.denomination =
        $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL;

      $scope.FormAddIndivAccident.infoGenerale.numPolice =
        $scope.recupererInfo.CA_NUMPOLICE;
      $scope.FormAddIndivAccident.infoGenerale.intermediaire =
        $scope.recupererInfo.IT_CODEINTERMEDIAIRE;
      $scope.FormAddIndivAccident.infoGenerale.effet =
        $scope.recupererInfo.CA_DATEEFFET;
      $scope.FormAddIndivAccident.infoGenerale.echeance =
        $scope.recupererInfo.CA_DATEECHEANCE;
      $scope.FormAddIndivAccident.infoGenerale.pays =
        $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddIndivAccident.infoGenerale.ville =
        $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddIndivAccident.infoGenerale.commune =
        $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddIndivAccident.infoGenerale.situationGeo =
        $scope.recupererInfo.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddIndivAccident.infoGenerale.nombreAssure =
        $scope.recupererInfo.CA_NBREPLACE;
      $scope.FormAddIndivAccident.infoGenerale.assureur =
        $scope.recupererInfo.TI_IDTIERSASSUREUR;
      $scope.FormAddIndivAccident.infoGenerale.interlocuteur =
        $scope.recupererInfo.CA_NOMINTERLOCUTEUR;
      $scope.FormAddIndivAccident.infoGenerale.telInterlocuteur =
        $scope.recupererInfo.CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddIndivAccident.infoGenerale.typeAffaire =
        $scope.recupererInfo.TA_CODETYPEAFFAIRES;
      $scope.FormAddIndivAccident.valgarantie =
        $scope.recupererInfo.GR_CODEGARENTIEPRIME;
      console.log($scope.tabBeneficiaire);
      console.log(
        $scope.recupererInfo.clsCtcontratayantdroits[0].clsObjetRetour
          .SL_CODEMESSAGE
      );
      if (
        $scope.recupererInfo.clsCtcontratayantdroits[0].clsObjetRetour
          .SL_CODEMESSAGE !== "99"
      ) {
        for (
          var i = 0;
          i < $scope.recupererInfo.clsCtcontratayantdroits.length;
          i++
        ) {
          $scope.objetRetourModif = {
            nomAssureBenef:
              $scope.recupererInfo.clsCtcontratayantdroits[i]
                .AY_DENOMMINATIONAYANTDROIT,
            titreBeneficiaire:
              $scope.recupererInfo.clsCtcontratayantdroits[i]
                .TA_LIBELLETITREAYANTDROIT,
            codeTitreBeneficiaire:
              $scope.recupererInfo.clsCtcontratayantdroits[i]
                .TA_CODETITREAYANTDROIT,
            idModif3:
              $scope.recupererInfo.clsCtcontratayantdroits[i]
                .TI_IDTIERSAYANTDROIT,
            code3:
              $scope.recupererInfo.clsCtcontratayantdroits[i]
                .TI_NUMTIERSAYANTDROIT,
            taux: $scope.recupererInfo.clsCtcontratayantdroits[i].AY_TAUX,
          };
          $scope.tabBeneficiaire.push($scope.objetRetourModif);
        }
        console.log($scope.tabBeneficiaire);
      }
      $scope.afficheListeVilleModif($scope.recupererInfo.PY_CODEPAYS);
    };
    //debut acceder a la page de modification
    // FIN COMBOS

    /*FIN DEV JJ*/
  },
]);
