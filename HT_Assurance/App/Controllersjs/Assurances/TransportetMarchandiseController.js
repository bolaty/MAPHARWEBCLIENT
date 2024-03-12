MapharApp.controller("TransportetMarchandiseController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $scope.recupInfoDemande = angular.fromJson(
      localStorage.getItem("collectionDemande")
    );

    /*DEBUT ZONE DE DECLARATION TRANSPORT ET MARCHANDISE BOLATY*/
    $scope.objet_envoie = [];
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
    console.log($rootScope.DATE_PREMIER_EXERCICE);
    $scope.FormAddTransportetMarchandise = {
      pays: "",
      ville: "",
      Section: "",
      Adresse: "",
      Commission: "",
      situationGeo: "",
      id01: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
      code01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_NUMTIERS
        : "",
      denomination01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_DENOMINATION
        : "",
      id02: "",
      code02: "",
      denomination02: "",
      N_Police: "",
      Effet: "",
      Echeance: "",
      Zone: "",
      Pharmacien: "",
      Telephone_Pharmacien: "",
      btntaxe: "N",
      typeAffaire: "",
      ascr: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
        : "",
      Intermediaire: "",
      valgarantie: "",
      Codeassureur: "",
      Exercice: ""
    };
    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
      Exercice: $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE
    };
    $scope.FormListReduction = {
      LIBELLEREDUCTION: "",
      MONTANT: [],
    };
    $scope.FormListgarentie = {
      libelle: "",
      evenement_ass: "",
      capitaux: "",
      PRIMES: "",
      APRESREDUCTION: "",
      PRORATA: "",
      FRANCHISES: "",
      INFO: [
        {
          capitaux: [],
          PRIMES: [],
          APRESREDUCTION: [],
          PRORATA: [],
          FRANCHISES: [],
        },
      ],
    };
    $scope.FormListprime = {
      LIBELLERESUME: "",
      PRIMES: [],
    };
    $scope.listeDesExercice = [];
    $scope.listeDesPaysTransportetMarchandise = [];
    $scope.listeDesVillesTransportetMarchandise = [];
    $scope.listeDesCommunesTransportetMarchandise = [];
    $scope.listeDesAssureursTransportetMarchandise = [];
    $scope.listeTypeAffaireTransportetMarchandise = [];
    $scope.listeContrat = [];
    $scope.listeDesCommerciaux = [];
    $scope.listeDesSouscripteurs = [];
    $scope.tabReduction = [];
    $scope.tabGarenties = [];
    $scope.tabPrimes = [];
    $scope.listeDesDureeTransportetMarchandise = [];
    $scope.idElement = "";
    $scope.recupererinfoTransportetMarchandise = [];
    $scope.listeDesUsageTransportetMarchandise = [];
    $scope.listeDesTarifTransportetMarchandise = [];
    $scope.listeDesBrancheTransportetMarchandise = [];
    $scope.listeDesCategorieTransportetMarchandise = [];
    $scope.listeDesMarqueTransportetMarchandise = [];
    $scope.listeDesEnergieTransportetMarchandise = [];
    $scope.listeDesZoneTransportetMarchandise = [];
    $scope.listeDesStatutSocio = [];
    $scope.listeDesConditionPermis = [];
    $scope.test = [];
    $scope.testSuppression = [];
    $scope.listeDesGenreTransportetMarchandise = [];
    $scope.modifListeCommune = [];
    $scope.modifListeVille = [];
    $scope.testEnregistrementmodif = [];
    $scope.listeListeCommissionCommercialAuto = [];
    $scope.listeListeCommissionCommercialmodifAuto = [];
    $scope.listeIntermediaire = [];
    $scope.recupererinfosTransportetMarchandise = [];
    $scope.valprimettc = 0;
    $scope.valprimenette = 0;
    $scope.valprimettcenregistrement = 0;
    $scope.valprimenettenregistrement = 0;
    $scope.listeDesGarantie = [];
    //$scope.valbtn2 = "";
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.btnEnregistrer = "Enregistrer"
    $scope.listeContratAvecAccessoir = []
    $scope.recupererInfoAvecAccessoir = {};

    /*FIN ZONE DE DECLARATION TRANSPORT ET MARCHANDISE BOLATY*/

    /*DEBUT FONCTION GENERALE TRANSPORT ET MARCHANDISE BOLATY*/

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

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    $scope.choixclienttaxe = function () {
      $scope.FormAddTransportetMarchandise.btntaxe = "O";
    };

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };

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
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ
    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES AUTO Bolaty*/
    $scope.initFormListe = function () {
      $scope.afficheModelListeExercice();
    };
    //debut initialisation add auto
    $scope.initFormAddTransportetMarchandise = function () {
      $scope.btnEnregistrer = "Enregistrer"
      $scope.afficheListeVilleTransportetMarchandise($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.FormAddTransportetMarchandise.Codeassureur = "000000"
      $scope.FormAddTransportetMarchandise.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      $scope.afficheListegarantie();
      $scope.FormAddTransportetMarchandise.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddTransportetMarchandise.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommuneTransportetMarchandise($rootScope.VILLEPARDEFAUT)
    };

    $scope.initFormAddInfoTransportetMarchandise = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };

    $scope.initFormAddlisteAuto = function () {
      $scope.voirPlus();
      // $scope.contrainteFormListTransportetMarchandise();
    };

    $scope.listeAnnuler = function () {
      $scope.$emit("LOAD");
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
      $scope.$emit("UNLOAD");
      // $scope.rechargePage();
    };
    //fin initialisation add auto
    $scope.clearlistenregistrement = function () {
      $scope.$emit("LOAD");
      $scope.FormAddTransportetMarchandise = {};
      $scope.isDisabled = false;
      $scope.isDisableds = false;
      $(document).ready(function () {
        $("#addTransportetMarchandise_Code01").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Dénomination01").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Code02").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Dénomination02").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Intermediaire").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Pays").css("background-color", "#FFFFFF");
        $("#addTransportetMarchandise_Ville").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Commune").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Situation_géographique").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Effet").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Echeance").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Zone_circ").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_asc").css("background-color", "#FFFFFF");
        $("#addTransportetMarchandise_Interlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_Telephone_interlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addTransportetMarchandise_typeAffaire").css(
          "background-color",
          "#FFFFFF"
        );
        $("#idExercice").css("background-color", "#FFFFFF");
      });
      $scope.$emit("UNLOAD");
      //$scope.rechargePage();
      // const fv = FormValidation.formValidation(document.getElementById('formAddAuto'));
      //console.log(fv)
      //fv.resetForm("reset":true);
    };
    //debut initialisation list auto

    //fin initialisation list auto

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Codeassureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Code01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Dénomination01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Code02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Dénomination02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_N_Police").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Intermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Pays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Ville").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Commune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Situation_géographique").focusin(
          function () {
            $(this).css("background-color", "#FFFFFF");
          }
        );
        $("#addTransportetMarchandise_Effet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Echeance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Zone_circ").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_asc").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Interlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTransportetMarchandise_Telephone_interlocuteur").focusin(
          function () {
            $(this).css("background-color", "#FFFFFF");
          }
        );
        $("#addTransportetMarchandise_typeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    /*DEBUT DEV BOLATY AUTO*/

    //debut contrainte sur les champs add de multirisque pro
    $scope.contrainteFormAddmodifTransportetMarchandise = function () {
      /*const fv =*/
      FormValidation.formValidation(
        document.getElementById("formaddMODIFTransportetMarchandise"),
        {
          fields: {
            addTransportetMarchandise_Code01: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
                regexp: {
                  regexp: /^(0|[0-9]\d*)$/,
                  message: "Veuillez saisir un code correct.",
                },
              },
            },
            addTransportetMarchandise_Dénomination01: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la dénomination.",
                },
              },
            },
            addTransportetMarchandise_Code02: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
                regexp: {
                  regexp: /^(0|[0-9]\d*)$/,
                  message: "Veuillez saisir un code correct.",
                },
              },
            },
            addTransportetMarchandise_Dénomination02: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la dénomination.",
                },
              },
            },
            addTransportetMarchandise_Commission: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la commission.",
                },
                numeric: {
                  message: "Veuillez saisir un montant.",
                },
              },
            },
            addTransportetMarchandise_N_Police: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° de la police.",
                },
              },
            },
            addTransportetMarchandise_Cond_habituel: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le Cond_habituel.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir une condition correcte.",
                },
              },
            },
            addTransportetMarchandise_Statut_socio_Prof: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le  Statut social.",
                },
              },
            },
            addTransportetMarchandise_Ag_condpermis: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l  Ag cond./permis.",
                },
              },
            },
            addTransportetMarchandise_Pays: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le pays.",
                },
              },
            },
            addTransportetMarchandise_Ville: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la ville.",
                },
              },
            },
            addTransportetMarchandise_Commune: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la commune.",
                },
              },
            },
            addTransportetMarchandise_Situation_géographique: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la situation géograpgique.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir une condition correcte.",
                },
              },
            },
            addTransportetMarchandise_Effet: {
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
            addTransportetMarchandise_Echeance: {
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
            addTransportetMarchandise_Durée: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Durée.",
                },
              },
            },
            addTransportetMarchandise_Branche_risque: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date d'écheance.",
                },
              },
            },
            addTransportetMarchandise_Taux: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le Taux.",
                },
              },
            },
            addTransportetMarchandise_Zone_circ: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Zone circ.",
                },
              },
            },
            addTransportetMarchandise_Telephone_interlocuteur: {
              validators: {
                notEmpty: {
                  message:
                    "Veuillez saisir le numero de telephone interlocuteur.",
                },
                regexp: {
                  regexp: /^(0|[0-9]\d*)$/,
                  message: "Veuillez saisir le numero de telephone ",
                },
                //numeric: {
                //    message: 'Veuillez saisir un numéro de téléphone correct.'
                //}
              },
            },
            addTransportetMarchandise_Catégorie: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Catégorie.",
                },
              },
            },
            addTransportetMarchandise_Tarif: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le Tarif.",
                },
              },
            },
            addTransportetMarchandise_Usage: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l Usage.",
                },
              },
            },
            addTransportetMarchandise_Genre: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le Genre.",
                },
              },
            },
            addmd_Assur: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner l'assureur.",
                },
              },
            },
            addTransportetMarchandise_Interlocuteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l'interlocuteur.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez entrer un nom correcte.",
                },
              },
            },
            addTransportetMarchandise_Marque: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Marque.",
                },
              },
            },

            addTransportetMarchandise_Puissance_admin: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Puissance admin.",
                },
                numeric: {
                  message: "Veuillez saisir un numéro de téléphone correct.",
                },
              },
            },
            addTransportetMarchandise_typeAffaire: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le type d'affaire.",
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

      // fv.validate().then(function(status) {
      // status can be one of the following value
      // 'NotValidated': The form is not yet validated
      // 'Valid': The form is valid
      // 'Invalid': The form is invalid

      // });
    };
    //fin contrainte sur les champs add d'auto

    //debut contrainte sur les champs add de multirisque pro
    $scope.contrainteFormAddTransportetMarchandise = function () {
      /*const fv =*/
      FormValidation.formValidation(
        document.getElementById("enregTransportetMarchandise"),
        {
          fields: {
            addTransportetMarchandise_Code01: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
                regexp: {
                  regexp: /^(0|[0-9]\d*)$/,
                  message: "Veuillez saisir un code correct.",
                },
              },
            },
            addTransportetMarchandise_Dénomination01: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la dénomination.",
                },
              },
            },
            addTransportetMarchandise_Code02: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
                regexp: {
                  regexp: /^(0|[0-9]\d*)$/,
                  message: "Veuillez saisir un code correct.",
                },
              },
            },
            addTransportetMarchandise_Dénomination02: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la dénomination.",
                },
              },
            },
            addTransportetMarchandise_Commission: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la commission.",
                },
                numeric: {
                  message: "Veuillez saisir un montant.",
                },
              },
            },
            addTransportetMarchandise_N_Police: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° de la police.",
                },
              },
            },
            addTransportetMarchandise_Cond_habituel: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le Cond_habituel.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir une condition correcte.",
                },
              },
            },
            addTransportetMarchandise_Statut_socio_Prof: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le  Statut social.",
                },
              },
            },
            addTransportetMarchandise_Ag_condpermis: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l  Ag cond./permis.",
                },
              },
            },
            addTransportetMarchandise_Pays: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le pays.",
                },
              },
            },
            addTransportetMarchandise_Intermediaire: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner l'intermediaire",
                },
              },
            },
            addTransportetMarchandise_Ville: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la ville.",
                },
              },
            },
            addTransportetMarchandise_Commune: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la commune.",
                },
              },
            },
            addTransportetMarchandise_Effet: {
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
            addTransportetMarchandise_Echeance: {
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
            addTransportetMarchandise_Durée: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Durée.",
                },
              },
            },
            addTransportetMarchandise_Branche_risque: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date d'écheance.",
                },
              },
            },
            addTransportetMarchandise_Taux: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le Taux.",
                },
              },
            },
            addTransportetMarchandise_Zone_circ: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Zone circ.",
                },
              },
            },
            addTransportetMarchandise_Telephone_interlocuteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir un numero de telephone correct.",
                },
                regexp: {
                  regexp: /^(0|[0-9]\d*)$/,
                  message: "Veuillez saisir un numero de telephone correct.",
                },
                //numeric: {
                //    message: 'Veuillez saisir un numéro de téléphone correct.'
                //}
              },
            },
            addTransportetMarchandise_Situation_géographique: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la situation géograpgique.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir une condition correcte.",
                },
              },
            },
            addTransportetMarchandise_Catégorie: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la Catégorie.",
                },
              },
            },

            addTransportetMarchandise_Interlocuteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l'interlocuteur.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez entrer un nom correcte.",
                },
              },
            },
            addTransportetMarchandise_asc: {
              validators: {
                notEmpty: {
                  message: "Veuillez selectionner un as.",
                },
              },
            },

            addTransportetMarchandise_typeAffaire: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le type d'affaire.",
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

      // fv.validate().then(function(status) {
      // status can be one of the following value
      // 'NotValidated': The form is not yet validated
      // 'Valid': The form is valid
      // 'Invalid': The form is invalid

      // });
    };
    //fin contrainte sur les champs add d'auto

    //debut contrainte sur les champs list d'auto
    $scope.contrainteFormListTransportetMarchandise = function () {
      FormValidation.formValidation(
        document.getElementById("FormListTransportetMarchandises"),
        {
          fields: {
            listTransportetMarchandise_PeriodeDu: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la période.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            listTransportetMarchandise_PeriodeAu: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la période.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            listTransportetMarchandise_NumPolice: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° de la police",
                },
              },
            },
            listTransportetMarchandise_NumSouscripteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° du souscripteur.",
                },
              },
            },
            listTransportetMarchandise_NomSouscripteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom du souscripteur.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir un nom souscripteur correcte.",
                },
              },
            },
            listTransportetMarchandise_NumCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° du commercial.",
                },
              },
            },
            listTransportetMarchandise_NomCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom du commercial.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir un nom commercial correcte.",
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
    //fin contrainte sur les champs list d'auto

    //debut liste des villes
    $scope.afficheListeVilleTransportetMarchandise = function (idpays) {
      $scope.listeDesCommunesTransportetMarchandise = [];
      $scope.FormAddTransportetMarchandise.Section = "";
     // $scope.FormAddTransportetMarchandise.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVillesTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesVillesTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    $scope.afficheListeVilleTransportetMarchandiseModif = function (idpays) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVillesTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesVillesTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.verouVille = false;
            $scope.afficheListeCommuneTransportetMarchandiseModif(
              $scope.recupererinfoTransportetMarchandise[0].VL_CODEVILLE
            );
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVillesTransportetMarchandise[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesVillesTransportetMarchandise);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVillesTransportetMarchandise[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste des villes

    //debut liste des communes
    $scope.afficheListeCommuneTransportetMarchandise = function (idville) {
      $scope.FormAddTransportetMarchandise.Section = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunesTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesCommunesTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };

    $scope.afficheListeCommuneTransportetMarchandiseModif = function (idville) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunesTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesCommunesTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunesTransportetMarchandise[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunesTransportetMarchandise);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunesTransportetMarchandise[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste des communes

    //debut combo usage

    $scope.afficheListeUsageTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Usage/ListeUsage/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesUsageTransportetMarchandise = reponse.data;
        });
    };
    //fin combo usage
    //debut combo Tarif

    $scope.afficheListeTarifTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Tarif/ListeTarif/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesTarifTransportetMarchandise = reponse.data;
        });
    };
    //fin combo Tarif
    //debut combo Branche

    $scope.afficheListeBrancheTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Branche/ListeBranche/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesBrancheTransportetMarchandise = reponse.data;
        });
    };
    //fin combo Branche

    //debut combo Genre
    $scope.afficheListeGenreTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Genre/ListeGenre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesGenreTransportetMarchandise = reponse.data;
        });
    };
    //fin combo Genre
    //debut combo Duree

    $scope.afficheListeDureeTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Duree/ListeDuree/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesDureeTransportetMarchandise = reponse.data;
        });
    };
    //fin combo Durre
    //debut combo Marque

    $scope.afficheListeMarque = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/TypeVehicule/ListeTypeVehicule/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesMarqueTransportetMarchandise = reponse.data;
        });
    };
    //fin combo Marque
    //debut combo Energie

    $scope.afficheListeEnergie = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Energie/ListeEnergie/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesEnergieTransportetMarchandise = reponse.data;
        });
    };
    //fin combo Energie

    //debut combo Statutsocio

    $scope.afficheListeStatutSocio = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "0",
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
        .post("/StatutSocio/ListeStatutSocio/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesStatutSocio = reponse.data;
        });
    };
    //fin combo Statutsocio
    //debut combo ConditionPermis

    $scope.afficheListeConditionPermis = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "0",
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
        .post("/ConditionPermis/ListeConditionPermis/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesConditionPermis = reponse.data;
        });
    };
    //fin combo ConditionPermis

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function (num, denom) {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          TI_NUMTIERS: num,
          TI_DENOMINATION: denom,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "TIERS",
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
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSouscripteurs = reponse.data;
          $scope.leChargement = false;
        });
    };
    //fin liste des souscripteur

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function (numcom, denomcom) {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          TI_IDTIERS: "",
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          TI_NUMTIERS: numcom,
          TI_DENOMINATION: denomcom,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: "LISTE",
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

      $http
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommerciaux = reponse.data;
          $scope.leChargement = false;
        });
    };

    //debut tableau garenties
    $scope.tableauGarenties = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "10",
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Garenties/ListeGarenties/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabGarenties = reponse.data;
        });
    };
    //fin tableau garenties
    //debut tableau de reduction

    $scope.tableauReduction = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "10",
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Reduction/ListeReduction/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabReduction = reponse.data;
        });
    };
    //fin tableau de reduction

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id, ad,interlocuteur) {
      $(document).ready(function () {
        $("#addTransportetMarchandise_Code01").css(
          "background-color",
          "#EDEDED"
        );
        $("#addTransportetMarchandise_Dénomination01").css(
          "background-color",
          "#EDEDED"
        );
      });

      $scope.FormAddTransportetMarchandise.code01 = code;
      $scope.FormAddTransportetMarchandise.denomination01 = denomination;
      $scope.FormAddTransportetMarchandise.id01 = id;
      $scope.FormAddTransportetMarchandise.Adresse = ad;
      $scope.FormAddTransportetMarchandise.Pharmacien = interlocuteur
      $scope.isDisabled = true;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $(document).ready(function () {
        $("#addTransportetMarchandise_Code02").css(
          "background-color",
          "#EDEDED"
        );
        $("#addTransportetMarchandise_Dénomination02").css(
          "background-color",
          "#EDEDED"
        );
      });

      $scope.FormAddTransportetMarchandise.code02 = code;
      $scope.FormAddTransportetMarchandise.denomination02 = denomination;

      if ($scope.etatForm == "2") {
        $scope.FormAddTransportetMarchandise.id02 = id;
      } else {
        $scope.FormAddTransportetMarchandise.id02 = id;
      }
    };

    //$scope.commissionfonct = function () {
    //    $scope.objet_envoie = [{
    //        "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //        "TI_NUMTIERS": $scope.FormAddTransportetMarchandise.id02,
    //        "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
    //        "DATEDEBUT": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //        "SL_LIBELLEECRAN": "TRANSPORT MARCHANDISE",
    //        "SL_LIBELLEMOUCHARD": "LISTE",
    //        "LG_CODELANGUE": "fr",
    //        "clsObjetEnvoi": {
    //            "OE_A": $rootScope.CODE_AGENCE,
    //            "OE_Y": $rootScope.CODE_OPERATEUR,
    //            "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //        }
    //    }];

    //    $http.post("/CommissionCommercial/ListeCommissionCommercial/", $scope.objet_envoie, {
    //        //headers: $scope.headers
    //    }).then(function (reponse) {
    //        $scope.listeListeCommissionCommercialAuto = reponse.data;
    //        console.log($scope.listeListeCommissionCommercialAuto[0].SOLDE)
    //    });
    //};
    //Fin choix d'un commercial
    //Debut choix d'un souscripteur
    $scope.choixSouscripteurmodif = function (code, denomination, id, ad) {
      $scope.recupererinfoTransportetMarchandise[0].TI_NUMTIERS = code;
      $scope.recupererinfoTransportetMarchandise[0].TI_DENOMINATION =
        denomination;
      $scope.recupererinfoTransportetMarchandise[0].TI_IDTIERS = id;
      $scope.recupererinfoTransportetMarchandise[0].CO_LIBELLE = ad;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercialmodif = function (code, denomination, id) {
      $scope.recupererinfoTransportetMarchandise[0].TI_NUMTIERSCOMMERCIAL =
        code;
      $scope.recupererinfoTransportetMarchandise[0].TI_DENOMINATIONCOMMERCIAL =
        denomination;
      $scope.recupererinfoTransportetMarchandise[0].TI_IDTIERSCOMMERCIAL = id;
    };
    //Fin choix d'un commercial

    //debut test des types sur les grilles
    $scope.confirmerChampsGrilleGarantie = function (grille) {
      $scope.verifie = false;
      let typeNumerique = /^\d+$/;

      if (grille == undefined) {
        $scope.verifie = false;
        return $scope.verifie;
      } else {
        for (var j = 0; j < grille.length; j++) {
          if (
            typeNumerique.test(grille[j].CG_CAPITAUXASSURES) == false ||
            typeNumerique.test(grille[j].CG_PRIMES) == false ||
            typeNumerique.test(grille[j].CG_APRESREDUCTION) == false ||
            typeNumerique.test(grille[j].CG_PRORATA) == false
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
      let typeNumerique = /^\d+$/;

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

    //Debut ajout multirisque profesionnel (contrat) /a terminer
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddTransportetMarchandise = function (
      dateEffet,
      dateEcheance
    ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      $scope.recupererinfosTransportetMarchandise[0] = JSON.parse(
        sessionStorage.getItem("modifAuto")
      );
      //  $scope.testgrilleenregistrement();
      // $scope.testgrille();
      $scope.testprime();
      $scope.calculprimettc();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typenumerosouscripteur = /^(0|[0-9]\d*)$/;
      $scope.lAnneeEffet = $scope.FormAddTransportetMarchandise.Effet.substr(
        6,
        4
      );
      $scope.leMoisEffet = $scope.FormAddTransportetMarchandise.Effet.substr(
        3,
        2
      );
      $scope.leJourEffet = $scope.FormAddTransportetMarchandise.Effet.substr(
        0,
        2
      );
      $scope.lAnneeEcheance =
        $scope.FormAddTransportetMarchandise.Echeance.substr(6, 4);
      $scope.leMoisEcheance =
        $scope.FormAddTransportetMarchandise.Echeance.substr(3, 2);
      $scope.leJourEcheance =
        $scope.FormAddTransportetMarchandise.Echeance.substr(0, 2);

      // mettre 0 dans les champs de prime si le champ est vide
      if ($scope.etatForm == "2") {
        for (
          var i = 0;
          i <
          $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
            .length;
          i++
        ) {
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[i]
              .CG_PRIMES == ""
          ) {
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
              i
            ].CG_PRIMES = 0;
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
        $scope.FormAddTransportetMarchandise.Codeassureur === "" ||
        $scope.FormAddTransportetMarchandise.Codeassureur === undefined ||
        $scope.FormAddTransportetMarchandise.N_Police === "" ||
        $scope.FormAddTransportetMarchandise.N_Police === undefined ||
        $scope.FormAddTransportetMarchandise.Intermediaire === "" ||
        $scope.FormAddTransportetMarchandise.Intermediaire === undefined ||
        $scope.FormAddTransportetMarchandise.Section === "" ||
        $scope.FormAddTransportetMarchandise.Section === undefined ||
        $scope.FormAddTransportetMarchandise.Zone === "" ||
        $scope.FormAddTransportetMarchandise.Zone === undefined ||
        $scope.FormAddTransportetMarchandise.situationGeo === "" ||
        $scope.FormAddTransportetMarchandise.situationGeo === undefined ||
        $scope.FormAddTransportetMarchandise.Effet === "" ||
        $scope.FormAddTransportetMarchandise.Effet === undefined ||
        $scope.FormAddTransportetMarchandise.Echeance === "" ||
        $scope.FormAddTransportetMarchandise.Echeance === undefined ||
        $scope.FormAddTransportetMarchandise.ascr === "" ||
        $scope.FormAddTransportetMarchandise.ascr === undefined ||
        $scope.FormAddTransportetMarchandise.Pharmacien === "" ||
        $scope.FormAddTransportetMarchandise.Pharmacien === undefined ||
        $scope.FormAddTransportetMarchandise.Telephone_Pharmacien === "" ||
        $scope.FormAddTransportetMarchandise.Telephone_Pharmacien ===
          undefined ||
        $scope.FormAddTransportetMarchandise.valgarantie === "" ||
        $scope.FormAddTransportetMarchandise.valgarantie === undefined ||
        $scope.FormAddTransportetMarchandise.typeAffaire === "" ||
        $scope.FormAddTransportetMarchandise.typeAffaire === undefined ||
        $scope.FormAddTransportetMarchandise.Exercice === "" ||
        $scope.FormAddTransportetMarchandise.Exercice === undefined 

      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddTransportetMarchandise.valgarantie === "" ||
            $scope.FormAddTransportetMarchandise.valgarantie === undefined
          ) {
            $("#idgarantie").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddTransportetMarchandise.Exercice === "" ||
            $scope.FormAddTransportetMarchandise.Exercice === undefined
          ) {
            $("#idExercice").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddTransportetMarchandise.Codeassureur === "" ||
            $scope.FormAddTransportetMarchandise.Codeassureur === undefined
          ) {
            $("#Codeassureur").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddTransportetMarchandise.code01 === "" ||
            $scope.FormAddTransportetMarchandise.code01 === undefined
          ) {
            $("#addTransportetMarchandise_Code01").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.denomination01 === "" ||
            $scope.FormAddTransportetMarchandise.denomination01 === undefined
          ) {
            $("#addTransportetMarchandise_Dénomination01").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.code02 === "" ||
            $scope.FormAddTransportetMarchandise.code02 === undefined
          ) {
            $("#addTransportetMarchandise_Code02").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.denomination02 === "" ||
            $scope.FormAddTransportetMarchandise.denomination02 === undefined
          ) {
            $("#addTransportetMarchandise_Dénomination02").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.N_Police === "" ||
            $scope.FormAddTransportetMarchandise.N_Police === undefined
          ) {
            $("#addTransportetMarchandise_N_Police").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.Intermediaire === "" ||
            $scope.FormAddTransportetMarchandise.Intermediaire === undefined
          ) {
            $("#addTransportetMarchandise_Intermediaire").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.pays === "" ||
            $scope.FormAddTransportetMarchandise.pays === undefined
          ) {
            $("#addTransportetMarchandise_Pays").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.ville === "" ||
            $scope.FormAddTransportetMarchandise.ville === undefined
          ) {
            $("#addTransportetMarchandise_Ville").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.Effet === "" ||
            $scope.FormAddTransportetMarchandise.Effet === undefined
          ) {
            $("#addTransportetMarchandise_Effet").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.Echeance === "" ||
            $scope.FormAddTransportetMarchandise.Echeance === undefined
          ) {
            $("#addTransportetMarchandise_Echeance").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.Section === "" ||
            $scope.FormAddTransportetMarchandise.Section === undefined
          ) {
            $("#addTransportetMarchandise_Commune").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.situationGeo === "" ||
            $scope.FormAddTransportetMarchandise.situationGeo === undefined
          ) {
            $("#addTransportetMarchandise_Situation_géographique").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.Zone === "" ||
            $scope.FormAddTransportetMarchandise.Zone === undefined
          ) {
            $("#addTransportetMarchandise_Zone_circ").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.ascr === "" ||
            $scope.FormAddTransportetMarchandise.ascr === undefined
          ) {
            $("#addTransportetMarchandise_asc").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.Pharmacien === "" ||
            $scope.FormAddTransportetMarchandise.Pharmacien === undefined
          ) {
            $("#addTransportetMarchandise_Interlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.Telephone_Pharmacien === "" ||
            $scope.FormAddTransportetMarchandise.Telephone_Pharmacien ===
              undefined
          ) {
            $("#addTransportetMarchandise_Telephone_interlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddTransportetMarchandise.typeAffaire === "" ||
            $scope.FormAddAuto.typeAffaire === undefined
          ) {
            $("#addTransportetMarchandise_typeAffaire").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.verifieprimeenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille prime";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifieprime == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille prime";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprimeenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime ttc ou la prime nette  ne doit etre vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprime == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime ttc ou la prime nette  ne doit etre vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) == 0 ||
        parseInt($scope.valprimettc) == 0
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doivent pas etre nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimettcenregistrement) == 0 ||
        parseInt($scope.valprimenettenregistrement) == 0
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doivent pas etre nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ne doit etre superieur a la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenettenregistrement) >
        parseInt($scope.valprimettcenregistrement)
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ne doit etre superieur a la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerosouscripteur.test(
          $scope.FormAddTransportetMarchandise.id01
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Code01").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerosouscripteur.test(
          $scope.FormAddTransportetMarchandise.id02
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Code02").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test(
          $scope.FormAddTransportetMarchandise.Telephone_Pharmacien
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Telephone_interlocuteur").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "Veuillez renseigner un telephone pharmacien correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test(
          $scope.FormAddTransportetMarchandise.situationGeo
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Situation_géographique").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "Veuillez renseigner une situation geographique correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test(
          $scope.FormAddTransportetMarchandise.Pharmacien
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Interlocuteur").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "Veuillez renseigner un nom Pharmacien correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddTransportetMarchandise.Effet) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Effet").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "Veuillez renseigner une dates effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Effet").css(
            "background-color",
            "#FFE9E0"
          );
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
          $("#addTransportetMarchandise_Effet").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddTransportetMarchandise.Echeance) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Echeance").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "Veuillez renseigner une dates écheance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Echeance").css(
            "background-color",
            "#FFE9E0"
          );
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
          $("#addTransportetMarchandise_Echeance").css(
            "background-color",
            "#FFE9E0"
          );
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
          $("#addTransportetMarchandise_Effet").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEcheance == "04" ||
          $scope.leMoisEcheance == "06" ||
          $scope.leMoisEcheance == "09" ||
          $scope.leMoisEcheance == "11") &&
        $scope.leMoisEcheance > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Echeance").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(
          $scope.FormAddTransportetMarchandise.Echeance
        ) <=
        $scope.dateSuperioriteFin($scope.FormAddTransportetMarchandise.Effet)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Echeance").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $rootScope.dateEcheanceDebutIncorrecte();
      } else if ($scope.confirmerChampsGrillePrime($scope.tabPrimes) == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.etatForm == "2" &&
        $scope.confirmerChampsGrillePrime(
          $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
        ) == true
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.recupererinfoTransportetMarchandise[0].CA_DATEECHEANCE) > $scope.dateSuperioriteDebut($scope.FormAddTransportetMarchandise.Effet)
    )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Effet").css("background-color", "#FFE9E0");
        });
        
        $scope.messageErreur ="la nouvelle date d'éffet doit etre supérieur ou égale à l'ancienne date d'écheance qui est le :" + $scope.recupererinfoTransportetMarchandise[0].CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.FormAddTransportetMarchandise.Echeance)  <=
            $scope.dateSuperioriteDebut($scope.recupererinfoTransportetMarchandise[0].CA_DATEECHEANCE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addTransportetMarchandise_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
        "la nouvelle date d'echeance ne doit pas identique à l'ancienne date d'echeance qui est le :" + $scope.recupererinfoTransportetMarchandise[0].CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && (parseInt($scope.FormAddTransportetMarchandise.Exercice) <
      parseInt($scope.recupererinfoTransportetMarchandise[0].EX_EXERCICE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idExercice").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "le nouvel exercice doit etre supérieur ou égale à l'ancien exercice qui est :" + $scope.recupererinfoTransportetMarchandise[0].EX_EXERCICE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        console.log($scope.recupererinfoTransportetMarchandise);
        //alert('On est bon')
        if ($scope.etatForm == "2") {
          $scope.clsCtcontratprimes = [];
          for (
            var i = 0;
            i <
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
              .length;
            i++
          ) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.CA_CODECONTRAT =
              $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
                i
              ].CA_CODECONTRAT;
            $scope.objetPrime.RE_CODERESUME =
              $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
                i
              ].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
                i
              ].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "16";//"1";
          $scope.CA_CODECONTRAT =
            $scope.recupererinfosTransportetMarchandise[0].CA_CODECONTRAT;
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.clsCtcontratprimes = [];
          for (var i = 0; i < $scope.tabPrimes.length; i++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.RE_CODERESUME = $scope.tabPrimes[i].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR = $scope.tabPrimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "0";
          $scope.SL_LIBELLEMOUCHARD = "INSERTION";
        }

        $scope.objet_envoie = [
          {
            CA_CODECONTRAT: $scope.CA_CODECONTRAT,
            CA_CODECONTRATORIGINE: $scope.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            RQ_CODERISQUE: "10",
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            IT_CODEINTERMEDIAIRE:
              $scope.FormAddTransportetMarchandise.Intermediaire,
            EN_CODEENERGIE: "",
            CB_IDBRANCHE: "",
            CA_NUMPOLICE: $scope.FormAddTransportetMarchandise.N_Police,
            TA_CODETARIF: "",
            US_CODEUSAGE: "",
            GE_CODEGENRE: "",
            AU_CODECATEGORIE: "",
            AS_NUMEROASSUREUR: $scope.FormAddTransportetMarchandise.Codeassureur,
            TI_IDTIERSASSUREUR: $scope.FormAddTransportetMarchandise.ascr, //"100000000005",
            CO_CODECOMMUNE: $scope.FormAddTransportetMarchandise.Section, //"0000000013",
            CA_SITUATIONGEOGRAPHIQUE:
              $scope.FormAddTransportetMarchandise.situationGeo, //"RAS",
            CA_DATEEFFET: $scope.FormAddTransportetMarchandise.Effet, //"01-01-2020",
            CA_DATEECHEANCE: $scope.FormAddTransportetMarchandise.Echeance, // //"31-12-2020",
            CA_NOMINTERLOCUTEUR:
              $scope.FormAddTransportetMarchandise.Pharmacien, //"blisse",
            CA_CONTACTINTERLOCUTEUR:
              $scope.FormAddTransportetMarchandise.Telephone_Pharmacien,
            TA_CODETYPEAFFAIRES:
              $scope.FormAddTransportetMarchandise.typeAffaire, //"01",
            TI_IDTIERSCOMMERCIAL: $scope.FormAddTransportetMarchandise.id02, //"100000000002",
            TI_IDTIERS: $scope.FormAddTransportetMarchandise.id01, //"100000000007",
            CA_TAUX: "0",
            TVH_CODETYPE: "",
            CA_NUMSERIE: "1000",
            CA_IMMATRICULATION: "IMMAT",
            CA_PUISSANCEADMISE: "0",
            CA_CHARGEUTILE: "0",
            CA_NBREPLACE: "0",
            CA_TYPE: "",
            CA_VALNEUVE: "0",
            CA_VALVENALE: "0",
            DU_CODEDUREE: "",
            CA_CONDITIONHABITUEL: "",
            CA_DATEMISECIRCULATION: "01-01-1900",
            CA_CLIENTEXONERETAXE: $scope.FormAddTransportetMarchandise.btntaxe, //$scope.FormAddTransportetMarchandise.btntaxe,
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            CD_CODECONDITION: "",
            ST_CODESTATUTSOCIOPROF: "",
            CA_DATENAISSANCE: "01-01-1900",
            GR_CODEGARENTIEPRIME:
              $scope.FormAddTransportetMarchandise.valgarantie,
            ZA_CODEZONEAUTO: $scope.FormAddTransportetMarchandise.Zone,
            EX_EXERCICE: $scope.FormAddTransportetMarchandise.Exercice,
            SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
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
            clsCtcontratgaranties: [
              {
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                CA_CODECONTRAT: "",
                GA_CODEGARANTIE: "00001",
                CG_CAPITAUXASSURES: "10",
                CG_PRIMES: "0",
                CG_APRESREDUCTION: "0",
                CG_PRORATA: "0",
                CG_FRANCHISES: "0",
                CG_TAUX: "0",
                CG_MONTANT: "0",
                CG_LIBELLE: "",
                SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "0",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: $rootScope.CODE_AGENCE,
                  OE_Y: $rootScope.CODE_OPERATEUR,
                  OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                },
              },
            ],
            clsCtcontratprimes: $scope.clsCtcontratprimes,
            clsCtcontratreductions: [
              {
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                CA_CODECONTRAT: "",
                RD_CODEREDUCTION: "01",
                RD_TAUX: "5",
                RD_MONTANT: "0",
                SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "0",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: $rootScope.CODE_AGENCE,
                  OE_Y: $rootScope.CODE_OPERATEUR,
                  OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                },
              },
            ],
          },
        ];

        $http
          .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.testEnregistrement = reponse.data;
            if (
              $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
              if ($scope.etatForm == "2") {
                $scope.RetourSurListe = function () {
                  window.location.href =
                    "#/assurances/transport-et-marchandise";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                if (!!localStorage.getItem("collectionDemande")) {
                  localStorage.removeItem("collectionDemande");
                }
                $scope.FormAddTransportetMarchandise = {};
                $scope.initFormAddTransportetMarchandise();
                $scope.isDisabled = false;
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi();
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };

    // verification de la prime nette et ttc
    $scope.testprime = function () {
      $scope.statutprime = false;
      $scope.statutprimeenregistrement = false;
      if ($scope.etatForm == "2") {
        $scope.valprimettcenregistrement = 1;
        $scope.valprimenettenregistrement = 1;
        //$scope.verifieprime = false;
        for (
          var j = 0;
          j <
          $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
            .length;
          j++
        ) {
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .RE_CODERESUME == '01' &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .RE_CODERESUME == '01' &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES !== ""
          ) {
            $scope.valprimenette =
              $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
                j
              ].CG_PRIMES;
          }
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .RE_CODERESUME == '05' &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .RE_CODERESUME == '05' &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES !== ""
          ) {
            $scope.valprimettc =
              $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
                j
              ].CG_PRIMES;
          }
        }
      } else {
        $scope.valprimettc = 1;
        $scope.valprimenette = 1;
        $scope.statutprimeenregistrement = false;
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == '01' &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprimeenregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == '01' &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenettenregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }

          if (
            $scope.tabPrimes[j].RE_CODERESUME == '05' &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprimeenregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == '05' &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettcenregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }
        }
      }
    };

    //calcul de la prime automatiquement
    $scope.calculprimettc = function () {
      $scope.premierclick = "FALSE";
      $scope.valprimettcaffiche = 0;
      if ($scope.etatForm == "2") {
        for (
          var j = 0;
          j <
          $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
            .length;
          j++
        ) {
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .RE_CODERESUME == '05' &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES !== ""
          ) {
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
              j
            ].CG_PRIMES = 0;
          }
        }

        for (
          var j = 0;
          j <
          $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
            .length;
          j++
        ) {
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .RE_CODERESUME !== '05' &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES != "" &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt(
                $scope.recupererinfoTransportetMarchandise[0]
                  .clsCtcontratprimes[j].CG_PRIMES
              );
          }
        }
        for (
          var j = 0;
          j <
          $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
            .length;
          j++
        ) {
          if (
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .RE_CODERESUME == '05' &&
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[j]
              .CG_PRIMES !== ""
          ) {
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
              j
            ].CG_PRIMES = $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      } else {
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == '05' &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = 0;
          }
        }

        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME !== '05' &&
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
            $scope.tabPrimes[j].RE_CODERESUME == '05' &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      }
    };

    //Fin ajout multirisque profesionnel (contrat)
    //debut modification

    //fonction de contrainte de grille
    //$scope.testgrilleenregistrement = function () {
    //    // $scope.resultattestgrille = true
    //    let typenumerotelephone = /^(0|[0-9]\d*)$/;

    //    $scope.verifieprimeenregistrement = false;
    //    for (var j = 0; j < $scope.tabPrimes.length; j++) {
    //        if (typenumerotelephone.test($scope.tabPrimes[j].CG_PRIMES) == false) {
    //            $scope.verifieprimeenregistrement = true;
    //            break;
    //        }
    //    }

    //}

    $scope.testgrille = function () {
      // $scope.resultattestgrille = true
      if ($scope.etatForm == "2") {
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
        $scope.verifieprime = false;
        for (
          var j = 0;
          j <
          $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes
            .length;
          j++
        ) {
          if (
            typenumerotelephone.test(
              $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes[
                j
              ].CG_PRIMES
            ) == false
          ) {
            $scope.verifieprime = true;
            break;
          }
        }
      } else {
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
        $scope.verifieprimeenregistrement = false;
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            typenumerotelephone.test($scope.tabPrimes[j].CG_PRIMES) == false
          ) {
            $scope.verifieprimeenregistrement = true;
            break;
          }
        }
      }
    };

    //debut afficher liste Auto
    $scope.afficheListeContrat = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom,
      Exercice
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
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
        nomCom === undefined  ||
        Exercice === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (Exercice === "" || Exercice === undefined) {
            $("#idExercice").css("background-color", "#FFE9E0");
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
        $scope.messageErreur = "La date de début n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
      }else if (
        Exercice == "" 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idExercice").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "l'exercice est obligatoire svp !!!";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.listeContrat = []
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            RQ_CODERISQUE: "10",
            EX_EXERCICE: Exercice,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "07",//"03",//"01",
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
            }else{
              setTimeout(function(){
                for (var j = 0; j < $scope.listeContrat.length; j++) {
                  if (
                    $scope.listeContrat[j].CA_CODECONTRATORIGINE == "" || $scope.listeContrat[j].CA_CODECONTRATORIGINE == undefined || 
                    $scope.listeContrat[j].CA_CODECONTRATORIGINE == null
                  ) {
                    $('#idligne' + j).css('background-color', 'white');
                  }else{
                    $('#idligne' + j).css('background-color', 'beige');
                  }
                }
                }, 2000);
            }
          });
      }
    };
    //fin afficher liste Auto

  //debut afficher liste AvecAccessoir
  $scope.afficheListeContratAvecAccessoir = function (
    idContrat,
    date,
    Exercice
   
  ) {
    $scope.$emit("LOAD");
   
   
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "10",
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
          EX_EXERCICE: Exercice,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
          TYPEOPERATION: "07",//"03",//"01",
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
            sessionStorage.setItem("modifAuto", JSON.stringify($scope.recupererInfoAvecAccessoir));
            window.location.href =
              "#/assurances/modification/transport-et-marchandise";
          }
        });
   
  };
  //fin afficher liste AvecAccessoir


    //debut modif en fonction du pays et de la ville
    $("#idPaysModif").change(function () {
      $scope.modifAfficheListeVille($(this).val());
    });
    $("#idVilleModif").change(function () {
      $scope.modifAfficheListeCommune($(this).val());
    });
    //debut modif en fonction du pays et de la ville

    //debut voir plus multirisque professionnel
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpAuto", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpAuto"));
    };
    //fin voir plus multirisque professionnel

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE ,info.EX_EXERCICE)
    
    };

    //debut recuperer id pour la suppression

    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //debut recuperer id pour la suppression

    //debut recuperer id pour la suppression

    $scope.supprimeContrat = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.idElement,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Contrat/SuppressionContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          if ($scope.testSuppression[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeContrat[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $rootScope.ProblemeServeur(
            $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    //debut recuperer id pour la suppression

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "TransportEtMarchandise";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBOS
    $scope.afficheModelListeExercice = function () {
      $scope.objet_envoie = [
        {
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
        .post("/EditionAssurance/ListeExercice/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesExercice = reponse.data;
          if ($scope.listeDesExercice[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
           // $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
            );
            
          }
          console.log($scope.listeDesExercice);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
          );
        
        });
    };


    //debut liste exercice
    $scope.afficheListeExercice = function () {
      $scope.objet_envoie = [
        {
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
        .post("/EditionAssurance/ListeExercice/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesExercice = reponse.data;
          if ($scope.listeDesExercice[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListePaysTransportetMarchandise();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
            );
            
          }
          console.log($scope.listeDesExercice);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
          );
        
        });
    };
    //fin liste exercice


    $scope.afficheListegarantie = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "10",
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
            $scope.afficheListeExercice();
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
    $scope.afficheListePaysTransportetMarchandise = function (idpays) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Pays/ListePays/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPaysTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesPaysTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeAssureurTransportetMarchandise();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysTransportetMarchandise[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesPaysTransportetMarchandise);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysTransportetMarchandise[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des assureur
    $scope.afficheListeAssureurTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Assureur/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesAssureursTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesAssureursTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureursTransportetMarchandise[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureursTransportetMarchandise);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureursTransportetMarchandise[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste des assureur

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Intermediaire/ListeIntermediaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeIntermediaire = reponse.data;
          if (
            $scope.listeIntermediaire[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeTypeAffaireTransportetMarchandise();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeIntermediaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeIntermediaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeIntermediaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des intermediaire

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaireTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/TypeAffaire/ListeTypeAffaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeAffaireTransportetMarchandise = reponse.data;
          if (
            $scope.listeTypeAffaireTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeCategorieTransportetMarchandise();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaireTransportetMarchandise[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaireTransportetMarchandise);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaireTransportetMarchandise[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut combo Categorie
    $scope.afficheListeCategorieTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "0",
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
        .post("/Categorie/ListeCategorie/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCategorieTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesCategorieTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeZoneTransportetMarchandise();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesCategorieTransportetMarchandise[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesCategorieTransportetMarchandise);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCategorieTransportetMarchandise[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin combo Categorie

    //debut combo Zone cir
    $scope.afficheListeZoneTransportetMarchandise = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "0",
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
        .post("/ZoneAuto/ListeZoneAuto/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesZoneTransportetMarchandise = reponse.data;
          if (
            $scope.listeDesZoneTransportetMarchandise[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesZoneTransportetMarchandise[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesZoneTransportetMarchandise);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesZoneTransportetMarchandise[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin combo Zone cir

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "10",
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
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
        .post("/Primes/ListePrimes/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabPrimes = reponse.data;
          if ($scope.tabPrimes[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifTranspMarch, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
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
      //debut tableau primes
      $scope.tableauPrimesModif = function () {
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: "10",
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
            $scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes = reponse.data;
            $scope.$emit("UNLOAD");
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
          
          });
      };
      //fin tableau primes
    //debut acceder a la page de modification
    $scope.retourModifTranspMarch = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.isDisabled = true;
      $scope.recupererinfoTransportetMarchandise[0] = JSON.parse(
        sessionStorage.getItem("modifAuto")
      );

      if($scope.recupererinfoTransportetMarchandise[0].EX_EXERCICE == undefined || $scope.recupererinfoTransportetMarchandise[0].EX_EXERCICE == "" || $scope.recupererinfoTransportetMarchandise[0].EX_EXERCICE == null){
        $scope.FormAddTransportetMarchandise.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      }else{
        $scope.FormAddTransportetMarchandise.Exercice = $scope.recupererinfoTransportetMarchandise[0].EX_EXERCICE;
      }

      $scope.FormAddTransportetMarchandise.Codeassureur = $scope.recupererinfoTransportetMarchandise[0].AS_NUMEROASSUREUR;
      $scope.FormAddTransportetMarchandise.code01 =
        $scope.recupererinfoTransportetMarchandise[0].TI_NUMTIERS;
      $scope.FormAddTransportetMarchandise.denomination01 =
        $scope.recupererinfoTransportetMarchandise[0].TI_DENOMINATION;
      $scope.FormAddTransportetMarchandise.code02 =
        $scope.recupererinfoTransportetMarchandise[0].TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddTransportetMarchandise.denomination02 =
        $scope.recupererinfoTransportetMarchandise[0].TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddTransportetMarchandise.pays =
        $scope.recupererinfoTransportetMarchandise[0].PY_CODEPAYS;
      $scope.FormAddTransportetMarchandise.ville =
        $scope.recupererinfoTransportetMarchandise[0].VL_CODEVILLE;
      $scope.FormAddTransportetMarchandise.N_Police =
        $scope.recupererinfoTransportetMarchandise[0].CA_NUMPOLICE;
      $scope.FormAddTransportetMarchandise.Intermediaire =
        $scope.recupererinfoTransportetMarchandise[0].IT_CODEINTERMEDIAIRE;
      $scope.FormAddTransportetMarchandise.Section =
        $scope.recupererinfoTransportetMarchandise[0].CO_CODECOMMUNE;
      $scope.FormAddTransportetMarchandise.Zone =
        $scope.recupererinfoTransportetMarchandise[0].ZA_CODEZONEAUTO;
      $scope.FormAddTransportetMarchandise.situationGeo =
        $scope.recupererinfoTransportetMarchandise[0].CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddTransportetMarchandise.Effet =
        $scope.recupererinfoTransportetMarchandise[0].CA_DATEEFFET;
      $scope.FormAddTransportetMarchandise.Echeance =
        $scope.recupererinfoTransportetMarchandise[0].CA_DATEECHEANCE;
      $scope.FormAddTransportetMarchandise.ascr =
        $scope.recupererinfoTransportetMarchandise[0].TI_IDTIERSASSUREUR;
      $scope.FormAddTransportetMarchandise.Pharmacien =
        $scope.recupererinfoTransportetMarchandise[0].CA_NOMINTERLOCUTEUR;
      $scope.FormAddTransportetMarchandise.Telephone_Pharmacien =
        $scope.recupererinfoTransportetMarchandise[0].CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddTransportetMarchandise.typeAffaire =
        $scope.recupererinfoTransportetMarchandise[0].TA_CODETYPEAFFAIRES;
      $scope.FormAddTransportetMarchandise.id01 =
        $scope.recupererinfoTransportetMarchandise[0].TI_IDTIERS;
      $scope.FormAddTransportetMarchandise.id02 =
        $scope.recupererinfoTransportetMarchandise[0].TI_IDTIERSCOMMERCIAL;
      $scope.FormAddTransportetMarchandise.valgarantie =
        $scope.recupererinfoTransportetMarchandise[0].GR_CODEGARENTIEPRIME;

      $scope.afficheListeVilleTransportetMarchandiseModif(
        $scope.recupererinfoTransportetMarchandise[0].PY_CODEPAYS
      );

      if($scope.recupererinfoTransportetMarchandise[0].clsCtcontratprimes.length <= 1){
        $scope.tableauPrimesModif()
      }
    };
    //debut acceder a la page de modification

    // DEBUT COMBOS

    /* FIN DEV BOLATY AUTO*/
  },
]);
