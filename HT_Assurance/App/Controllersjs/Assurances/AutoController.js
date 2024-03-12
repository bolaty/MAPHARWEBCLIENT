MapharApp.controller("AutoController", [
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
 /*DEBUT ZONE DE DECLARATION AUTO BOLATY*/
    /*DEBUT ZONE DE DECLARATION AUTO BOLATY*/
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
    $scope.FormAddAuto = {
      Codeassureur: "",
      pays: "",
      ville: "",
      commune: "",
      situationGeo: "",
      assureur: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
        : "",
      typeAffaire: "",
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
      Adresse: "",
      Commission: "",
      N_Police: "",
      Cond_habituel: "",
      Statut_socio_Prof: "",
      Ag_condpermis: "",
      Effet: "",
      Echeance: "",
      Duree: "",
      Branche_risque: "",
      Taux: "",
      Zone_circ: "",
      Categorie: "",
      Tarif: "",
      Usage: "",
      Genre: "",
      Interlocuteur: "",
      Telephone_interlocuteur: "",
      Marque: "",
      Type: "",
      Nserie: "",
      Immatriculation: "",
      Energie: "",
      Puissance_admin: "",
      Charge_utile: "",
      Nombre_place: "",
      Val_neuve: "",
      Val_venale: "",
      Mise_circ: "",
      btntaxe: "N",
      etatbouton: "",
      Intermediaire: "",
      clientexonere: "",
      typeAuto: "",
      valgarantie: "",
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
    $scope.listeDesPaysAuto = [];
    $scope.listeDesVillesAuto = [];
    $scope.listeDesCommunesAuto = [];
    $scope.listeDesAssureursAuto = [];
    $scope.listeTypeAffaireAuto = [];
    $scope.listeContrat = [];
    $scope.listeDesCommerciaux = [];
    $scope.listeDesSouscripteurs = [];
    $scope.tabReduction = [];
    $scope.tabGarenties = [];
    $scope.tabPrimes = [];
    $scope.listeDesDureeAuto = [];
    $scope.idElement = "";
    $scope.recupererinfoauto = [];
    $scope.listeDesUsageAuto = [];
    $scope.listeDesTarifAuto = [];
    $scope.listeDesBrancheAuto = [];
    $scope.listeDesCategorieAuto = [];
    $scope.listeDesMarqueAuto = [];
    $scope.listeDesEnergieAuto = [];
    $scope.listeDesZoneAuto = [];
    $scope.listeDesStatutSocio = [];
    $scope.listeDesConditionPermis = [];
    $scope.test = [];
    $scope.listeDesGenreAuto = [];
    $scope.modifListeCommune = [];
    $scope.modifListeVille = [];
    $scope.listeListeCommissionCommercialAuto = [];
    $scope.listeListeCommissionCommercialmodifAuto = [];
    $scope.listeIntermediaire = [];
    $scope.listeClientExonere = [];
    $scope.valneuve = "";
    $scope.valvanale = "";
    $scope.valtaux = "";
    $scope.valtauxmodif = "";
    $scope.recupererinfosauto = [];
    $scope.valprimettc = 0;
    $scope.valprimenette = 0;
    $scope.valprimettcenregistrement = 0;
    $scope.valprimenettenregistrement = 0;
    $scope.listetypeAuto = [];
    $scope.ListeTauxselonEffetAuto = [];
    $scope.ListeTarifSelonBranchesAuto = [];
    $scope.listeDesGarantie = [];
    // $scope.valbtn2 = "";
    // $scope.valname = "checked";
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeContratAvecAccessoir = []
    $scope.recupererInfoAvecAccessoir = {};
    $scope.btnEnregistrer = "Enregistrer";

    /*FIN ZONE DE DECLARATION AUTO BOLATY*/

    /*DEBUT FONCTION GENERALE AUTO BOLATY*/

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
      $scope.FormAddAuto.btntaxe = "O";
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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES AUTO Bolaty*/
    $scope.initFormListe = function () {
      $scope.afficheModelListeExercice();
    };
    //debut initialisation add auto
    $scope.initFormAddAuto = function () {
      $scope.btnEnregistrer = "Enregistrer"
      $scope.afficheListeVilleAuto($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.FormAddAuto.Codeassureur = "000000"
      $scope.FormAddAuto.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      $scope.afficheListegarantie();
      $scope.FormAddAuto.pays = $rootScope.PAYSPARDEFAUT
       $scope.FormAddAuto.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommuneAuto($rootScope.VILLEPARDEFAUT)
    };

    $scope.initFormAddInfoAuto = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
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
    };
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
    //code avec monsieur Bamba/
    $scope.clearlistenregistrement = function () {
      $scope.$emit("LOAD");
      $scope.FormAddAuto = {};
      $scope.isDisabled = false;
      $scope.isDisableds = false;
      $(document).ready(function () {
        $("#addAuto_Code01").css("background-color", "#FFFFFF");
        $("#addAuto_Dénomination01").css("background-color", "#FFFFFF");
        $("#addAuto_Code02").css("background-color", "#FFFFFF");
        $("#addAuto_Dénomination02").css("background-color", "#FFFFFF");
        $("#addAuto_N_Police").css("background-color", "#FFFFFF");
        $("#addAuto_Cond_habituel").css("background-color", "#FFFFFF");
        $("#addAuto_Statut_socio_Prof").css("background-color", "#FFFFFF");
        $("#addAuto_Ag_condpermis").css("background-color", "#FFFFFF");
        $("#addAuto_Pays").css("background-color", "#FFFFFF");
        $("#addAuto_Ville").css("background-color", "#FFFFFF");
        $("#addAuto_Commune").css("background-color", "#FFFFFF");
        $("#addAuto_Situation_géographique").css("background-color", "#FFFFFF");
        $("#addAuto_Effet").css("background-color", "#FFFFFF");
        $("#addAuto_Echeance").css("background-color", "#FFFFFF");
        $("#addAuto_Branche_risque").css("background-color", "#FFFFFF");
        $("#addAuto_Taux").css("background-color", "#FFFFFF");
        $("#addAuto_Zone_circ").css("background-color", "#FFFFFF");
        $("#addAuto_Catégorie").css("background-color", "#FFFFFF");
        $("#addAuto_Tarif").css("background-color", "#FFFFFF");
        $("#addAuto_Usage").css("background-color", "#FFFFFF");
        $("#addAuto_Genre").css("background-color", "#FFFFFF");
        $("#addAuto_Assureur").css("background-color", "#FFFFFF");
        $("#addAuto_Interlocuteur").css("background-color", "#FFFFFF");
        $("#addAuto_Telephone_interlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addSanteAuxiliaire_Intermediaire").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addAuto_typeAuto").css("background-color", "#FFFFFF");
        $("#addAuto_Marque").css("background-color", "#FFFFFF");
        $("#addAuto_Type").css("background-color", "#FFFFFF");
        $("#addAuto_Nsérie").css("background-color", "#FFFFFF");
        $("#addAuto_Energie").css("background-color", "#FFFFFF");
        $("#addAuto_Puissance_admin").css("background-color", "#FFFFFF");
        $("#addAuto_Charge_utile").css("background-color", "#FFFFFF");
        $("#addAuto_Nombre_place").css("background-color", "#FFFFFF");
        $("#addAuto_Val_neuve").css("background-color", "#FFFFFF");
        $("#addAuto_Energie").css("background-color", "#FFFFFF");
        $("#addAuto_Val_vénale").css("background-color", "#FFFFFF");
        $("#addAuto_Mise_circ").css("background-color", "#FFFFFF");
        $("#addAuto_Energie").css("background-color", "#FFFFFF");
        $("#addAuto_typeAffaire").css("background-color", "#FFFFFF");
        $("#idExercice").css("background-color", "#FFFFFF");
      });
      $scope.$emit("UNLOAD");
      // $scope.rechargePage();
      // const fv = FormValidation.formValidation(document.getElementById('formAddAuto'));
      //console.log(fv)
      //fv.resetForm("reset":true);
    };

    //fin code avec mr Bamba/
    //fin initialisation add auto
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
    //debut initialisation list auto

    //fin initialisation list auto

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV BOLATY AUTO*/

    //debut contrainte sur les champs add de multirisque pro
    $scope.contrainteFormAddAuto = function () {
      FormValidation.formValidation(document.getElementById("formAddAuto"), {
        fields: {
          addAuto_Code01: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir un code correct.",
              },
              regexp: {
                regexp: /^(0|[0-9]\d*)$/,
                message: "Veuillez saisir un code correct.",
              },
            },
          },
          addAuto_Dénomination01: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
            },
          },
          addAuto_Code02: {
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
          addAuto_Dénomination02: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
            },
          },
          addAuto_Commission: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la commission.",
              },
              numeric: {
                message: "Veuillez saisir un montant.",
              },
            },
          },
          addAuto_N_Police: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le n° de la police.",
              },
            },
          },
          addAuto_Cond_habituel: {
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
          addAuto_Statut_socio_Prof: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le  Statut social.",
              },
            },
          },
          addAuto_Ag_condpermis: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l  Ag cond./permis.",
              },
            },
          },
          addAuto_Pays: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le pays.",
              },
            },
          },
          addAuto_Ville: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la ville.",
              },
            },
          },
          addAuto_Commune: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la commune.",
              },
            },
          },
          addAuto_Situation_géographique: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la situation géograpgique.",
              },
              regexp: {
                regexp: /^[a-z-A-Z]/,
                message: "Veuillez saisir une situation géographique correcte.",
              },
            },
          },
          addAuto_Effet: {
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
          addAuto_Echeance: {
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
          addAuto_Durée: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Durée.",
              },
            },
          },
          addAuto_Branche_risque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la branche risque.",
              },
            },
          },
          addAuto_typeAuto: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir un type auto.",
              },
            },
          },
          addAuto_Taux: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le Taux.",
              },
              regexp: {
                regexp: /^[0-9]\d*(,\d+)?$/,
                message: "Veuillez saisir un taux correct.",
              },
              //numeric: {
              //    message: 'Veuillez saisir un taux.'
              //}
            },
          },
          addAuto_Zone_circ: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Zone circ.",
              },
            },
          },
          addAuto_Telephone_interlocuteur: {
            validators: {
              notEmpty: {
                message:
                  "Veuillez saisir le numero de telephone interlocuteur.",
              },
              regexp: {
                regexp: /^(0|[0-9]\d*)$/,
                message: "Veuillez saisir le numero de telephone interlocuteur",
              },
              //numeric: {
              //    message: 'Veuillez saisir la Charge_utile.'
              //}
            },
          },
          addAuto_Catégorie: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Catégorie.",
              },
            },
          },
          addAuto_Tarif: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le Tarif.",
              },
            },
          },
          addSanteAuxiliaire_Intermediaire: {
            validators: {
              notEmpty: {
                message: "Veuillez choisir un intermediaire.",
              },
            },
          },
          addAuto_Usage: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l Usage.",
              },
            },
          },
          addAuto_Genre: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le Genre.",
              },
            },
          },
          addAuto_Assureur: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner l'assureur.",
              },
            },
          },
          addAuto_Interlocuteur: {
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
          addAuto_Marque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Marque.",
              },
            },
          },
          addAuto_Type: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le Type.",
              },
            },
          },
          addAuto_Nsérie: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le Numero série.",
              },
            },
          },
          addAuto_Immatriculation: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir d Immatriculation.",
              },
            },
          },
          addAuto_Energie: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l Energie.",
              },
            },
          },
          addAuto_Puissance_admin: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Puissance admin.",
              },
              regexp: {
                regexp: /^[0-9]{1,5}$/,
                message: "Veuillez saisir une Puissance admin correcte.",
              },
              //numeric: {
              //    message: 'Veuillez saisir une Puissance admin correcte.'
              //}
            },
          },
          addAuto_Charge_utile: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Charge_utile.",
              },
              regexp: {
                regexp: /^[0-9]\d*(,\d+)?$/,
                message: "Veuillez saisir la Charge_utile..",
              },
              //numeric: {
              //    message: 'Veuillez saisir la Charge_utile.'
              //}
            },
          },
          addAuto_Nombre_place: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le Nombre de place.",
              },
              regexp: {
                regexp: /^[0-9]{1,3}$/,
                message: "Veuillez saisir un nombre de place correcte.",
              },
              //numeric: {/^[0-9]/
              //    message: 'Veuillez saisir un nombre de place correcte.'
              //}
            },
          },
          addAuto_Val_neuve: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Valeur neuve correcte.",
              },
              regexp: {
                regexp: /^[0-9]{1,15}$/,
                message: "Veuillez saisir une Valeur neuve correcte.",
              },
              //numeric: {   /^[0-9]{1,}(\.|)[0-9]{0,2}$/g;     /^([0-9]{1,3}\d*(\s[0-9]{3}))|([0-9]{1,3}\d*(\s[0-9]{3}\s[0-9]{3}))|([0-9]{1,3}\d*(\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}))$/
              //    message: 'Veuillez saisirune valeur venale correcte.'
              //} /^[0-9]{1,3}\s[0-9]\s[0-9]\s[0-9]$/
            },
          },
          addAuto_Val_vénale: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Valeur vénale.",
              },
              regexp: {
                regexp: /^[0-9]{1,15}$/,
                message: "Veuillez saisir une Valeur venale correcte.",
              },
            },
          },
          addAuto_Mise_circ: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la Mise circ.",
              },
              regexp: {
                regexp:
                  /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une date correcte.",
              },
            },
          },
          addAuto_typeAffaire: {
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
      });
    };
    //fin contrainte sur les champs add d'auto

    //debut liste des villes
    $scope.afficheListeVilleAuto = function (idpays) {
      $scope.listeDesCommunesAuto = [];
      $scope.FormAddAuto.commune = "";
      //$scope.FormAddAuto.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesVillesAuto = reponse.data;
          if (
            $scope.listeDesVillesAuto[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    $scope.afficheListeVilleAutoModif = function (idpays) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesVillesAuto = reponse.data;
          if (
            $scope.listeDesVillesAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.verouVille = false;
            $scope.afficheListeCommuneAutoModif(
              $scope.recupererinfoauto[0].VL_CODEVILLE
            );
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVillesAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesVillesAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVillesAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes

    //debut liste des communes
    $scope.afficheListeCommuneAuto = function (idville) {
      $scope.FormAddAuto.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesCommunesAuto = reponse.data;
          if (
            $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_RESULTAT ===
            "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };

    $scope.afficheListeCommuneAutoModif = function (idville) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesCommunesAuto = reponse.data;
          if (
            $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunesAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des communes

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
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          SL_LIBELLEECRAN: "ECRAN AUTO",
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

    //Debut choix d'un souscripteur

    $scope.choixSouscripteur = function (code, denomination, id, ad,interlocuteur) {
      $scope.FormAddAuto.code01 = code;
      $scope.FormAddAuto.denomination01 = denomination;
      $scope.FormAddAuto.id01 = id;
      $scope.FormAddAuto.Adresse = ad;
      $scope.FormAddAuto.Interlocuteur = interlocuteur;
      $scope.isDisabled = true;
      //const test = document.getElementById("champs1").focus()
      //test.focus();
    };

    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $scope.FormAddAuto.code02 = code;
      $scope.FormAddAuto.denomination02 = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddAuto.id02 = id;
      } else {
        $scope.FormAddAuto.id02 = id;
      }

      $scope.isDisableds = true;
    };

    //$scope.commissionfonct = function () {
    //    $scope.objet_envoie = [{
    //        "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //        "TI_NUMTIERS": $scope.FormAddAuto.id02,
    //        "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
    //        "DATEDEBUT": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //        "SL_LIBELLEECRAN": "ECRAN AUTO",
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
    //        //console.log($scope.listeListeCommissionCommercialAuto[0].SOLDE)
    //    });
    //};
    //Fin choix d'un commercial
    //Debut choix d'un souscripteur
    $scope.choixSouscripteurmodif = function (code, denomination, id, ad) {
      $scope.recupererinfoauto[0].TI_NUMTIERS = code;
      $scope.recupererinfoauto[0].TI_DENOMINATION = denomination;
      $scope.recupererinfoauto[0].TI_IDTIERS = id;
      $scope.recupererinfoauto[0].CO_LIBELLE = ad;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercialmodif = function (code, denomination, id) {
      $scope.recupererinfoauto[0].TI_NUMTIERSCOMMERCIAL = code;
      $scope.recupererinfoauto[0].TI_DENOMINATIONCOMMERCIAL = denomination;
      $scope.recupererinfoauto[0].TI_IDTIERSCOMMERCIAL = id;
    };
    //$scope.commissionfonctmodif = function () {
    //    $scope.objet_envoie = [{
    //        "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //        "TI_NUMTIERS": $scope.recupererinfoauto[0].id02,
    //        "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
    //        "DATEDEBUT": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //        "SL_LIBELLEECRAN": "ECRAN AUTO",
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
    //        $scope.listeListeCommissionCommercialmodifAuto = reponse.data;
    //    });
    //};
    //Fin choix d'un commercial
    //debut focus sur le champ
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Codeassureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Code01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Dénomination01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Code02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Dénomination02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_N_Police").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Cond_habituel").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Statut_socio_Prof").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Ag_condpermis").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Pays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Ville").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Commune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Situation_géographique").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Effet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Echeance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Branche_risque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Taux").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Zone_circ").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Catégorie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Tarif").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Usage").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Genre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Assureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Interlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Telephone_interlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Intermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_typeAuto").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Marque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Type").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Nsérie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Immatriculation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Energie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Puissance_admin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Charge_utile").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Nombre_place").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Val_neuve").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Val_vénale").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Mise_circ").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Energie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_typeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut liste des taux auto
    $scope.afficheListeTauxseloneffet = function (valeffet, valecheance) {
      $scope.objet_envoie = [
        {
          DATEDEBUT: valeffet,
          DATEFIN: valecheance,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
        .post("/TauxselonEffet/ListeTauxselonEffet/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.ListeTauxselonEffetAuto = reponse.data;
          console.log($scope.ListeTauxselonEffetAuto);
          $scope.FormAddAuto.Taux = $scope.ListeTauxselonEffetAuto[0].TX_TAUX;
        });
    };
    //fin liste des types auto
    $scope.afficheListeCategorieetTaritselonbranche = function (codebranche) {
      $scope.objet_envoie = [
        {
          CB_IDBRANCHE: codebranche,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
        .post(
          "/TarifSelonBranches/ListeTarifSelonBranches/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.ListeTarifSelonBranchesAuto = reponse.data;
          $scope.FormAddAuto.Tarif =
            $scope.ListeTarifSelonBranchesAuto[0].TA_CODETARIF;
          $scope.FormAddAuto.Categorie =
            $scope.ListeTarifSelonBranchesAuto[0].AU_CODECATEGORIE;
        });
    };
    //fin liste des types auto

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

    //Debut ajout multirisque profesionnel (contrat) /a terminer
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddAuto = function (dateEffet, dateEcheance) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      $scope.recupererinfosauto[0] = JSON.parse(
        sessionStorage.getItem("modifAuto")
      );
      // $scope.testgrilleenregistrement();
      // $scope.testgrille();
      $scope.testprime();
      $scope.calculprimettc();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typetaux = /^[0-9]\d*(,\d+)?$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typechargeutil = /^[0-9]\d*(,\d+)?$/;
      let typemontant = /^[0-9]{1,15}$/;
      let typenumerosouscripteur = /^(0|[0-9]\d*)$/;
      let typenombreplace = /^[0-9]{1,3}$/;
      let typepuissanceadmin = /^[0-9]{1,5}$/;
      if (dateEffet !== undefined || dateEcheance !== undefined) {
        // $scope.FormAddAuto.Effet = dateEffet;
        // $scope.FormAddAuto.Echeance = dateEcheance;
        $scope.lAnneeEffet = dateEffet.substr(6, 4);
        $scope.leMoisEffet = dateEffet.substr(3, 2);
        $scope.leJourEffet = dateEffet.substr(0, 2);
        $scope.lAnneeEcheance = dateEcheance.substr(6, 4);
        $scope.leMoisEcheance = dateEcheance.substr(3, 2);
        $scope.leJourEcheance = dateEcheance.substr(0, 2);
      }

      if ($scope.etatForm == "2") {
        for (
          var i = 0;
          i < $scope.recupererinfoauto[0].clsCtcontratprimes.length;
          i++
        ) {
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[i].CG_PRIMES == ""
          ) {
            $scope.recupererinfoauto[0].clsCtcontratprimes[i].CG_PRIMES = 0;
          }
        }
      } else {
        for (var i = 0; i < $scope.tabPrimes.length; i++) {
          if ($scope.tabPrimes[i].CG_PRIMES == "") {
            $scope.tabPrimes[i].CG_PRIMES = 0;
          }
        }
      }

      //$scope.lAnneeEffet = $scope.FormAddAuto.Effet.substr(6, 4);
      //$scope.leMoisEffet = $scope.FormAddAuto.Effet.substr(3, 2);
      //$scope.leJourEffet = $scope.FormAddAuto.Effet.substr(0, 2);
      //$scope.lAnneeEcheance = $scope.FormAddAuto.Echeance.substr(6, 4);
      //$scope.leMoisEcheance = $scope.FormAddAuto.Echeance.substr(3, 2);
      //$scope.leJourEcheance = $scope.FormAddAuto.Echeance.substr(0, 2);

      /* let valNeuve = $scope.FormAddAuto.Val_neuve;
      var montValNeuve = "";
      valNeuve = valNeuve.split("");
      console.log(valNeuve);
      console.log(typeof valNeuve[2]);
      for (var b = 0; b < valNeuve.length; b++) {
        if (valNeuve[b].indexOf(" ") == -1) {
          montValNeuve += valNeuve[b];
        }
      }
      console.log(typeof montValNeuve);
      console.log(montValNeuve);
      console.log(typeof valNeuve);

      let valVenale = $scope.FormAddAuto.Val_venale;
      var montValVenale = "";
      valVenale = valVenale.split("");
      console.log(valVenale);
      for (var d = 0; d < valVenale.length; d++) {
        if (valVenale[d] != " ") {
          montValVenale += valVenale[d];
        }
      }
      console.log(typeof montValVenale);
      console.log(montValVenale);
      console.log(typeof valVenale); */

      $scope.Val_neuve = parseInt($scope.FormAddAuto.Val_neuve);
      $scope.Val_venale = parseInt($scope.FormAddAuto.Val_venale);
      $scope.valtaux = parseInt($scope.FormAddAuto.Taux);

      if (
        $scope.FormAddAuto.N_Police === "" ||
        $scope.FormAddAuto.N_Police === undefined ||
        $scope.FormAddAuto.Codeassureur === "" ||
        $scope.FormAddAuto.Codeassureur === undefined ||
        $scope.FormAddAuto.Intermediaire === "" ||
        $scope.FormAddAuto.Intermediaire === undefined ||
        $scope.FormAddAuto.commune === "" ||
        $scope.FormAddAuto.commune === undefined ||
        $scope.FormAddAuto.situationGeo === "" ||
        $scope.FormAddAuto.situationGeo === undefined ||
        $scope.FormAddAuto.assureur === "" ||
        $scope.FormAddAuto.assureur === undefined ||
        $scope.FormAddAuto.Interlocuteur === "" ||
        $scope.FormAddAuto.Interlocuteur === undefined ||
        $scope.FormAddAuto.Telephone_interlocuteur === "" ||
        $scope.FormAddAuto.Telephone_interlocuteur === undefined ||
        $scope.FormAddAuto.Taux === "" ||
        $scope.FormAddAuto.Taux === undefined ||
        $scope.FormAddAuto.Nserie === "" ||
        $scope.FormAddAuto.Nserie === undefined ||
        $scope.FormAddAuto.Effet === "" ||
        $scope.FormAddAuto.Effet === undefined ||
        $scope.FormAddAuto.Echeance === "" ||
        $scope.FormAddAuto.Echeance === undefined ||
        $scope.FormAddAuto.Puissance_admin === "" ||
        $scope.FormAddAuto.Puissance_admin === undefined ||
        $scope.FormAddAuto.Charge_utile === "" ||
        $scope.FormAddAuto.Charge_utile === undefined ||
        $scope.FormAddAuto.Nombre_place === "" ||
        $scope.FormAddAuto.Nombre_place === undefined ||
        $scope.FormAddAuto.typeAffaire === "" ||
        $scope.FormAddAuto.typeAffaire === undefined ||
        $scope.FormAddAuto.id01 === "" ||
        $scope.FormAddAuto.id01 === undefined ||
        $scope.FormAddAuto.Zone_circ === "" ||
        $scope.FormAddAuto.Zone_circ === undefined ||
        $scope.FormAddAuto.Branche_risque === "" ||
        $scope.FormAddAuto.Branche_risque === undefined ||
        $scope.FormAddAuto.Categorie === "" ||
        $scope.FormAddAuto.Categorie === undefined ||
        $scope.FormAddAuto.Tarif === "" ||
        $scope.FormAddAuto.Tarif === undefined ||
        $scope.FormAddAuto.Usage === "" ||
        $scope.FormAddAuto.Usage === undefined ||
        $scope.FormAddAuto.Genre === "" ||
        $scope.FormAddAuto.Genre === undefined ||
        $scope.FormAddAuto.Genre === undefined ||
        $scope.FormAddAuto.Marque === "" ||
        $scope.FormAddAuto.Marque === undefined ||
        $scope.FormAddAuto.Energie === "" ||
        $scope.FormAddAuto.Energie === undefined ||
        $scope.FormAddAuto.Type === "" ||
        $scope.FormAddAuto.Type === undefined ||
        $scope.FormAddAuto.Immatriculation === "" ||
        $scope.FormAddAuto.Immatriculation === undefined ||
        $scope.FormAddAuto.Val_neuve === "" ||
        $scope.FormAddAuto.Val_neuve === undefined ||
        $scope.FormAddAuto.Val_venale === "" ||
        $scope.FormAddAuto.Val_venale === undefined ||
        $scope.FormAddAuto.Mise_circ === "" ||
        $scope.FormAddAuto.Mise_circ === undefined ||
        $scope.FormAddAuto.id02 === "" ||
        $scope.FormAddAuto.id02 === undefined ||
        $scope.FormAddAuto.assureur === "" ||
        $scope.FormAddAuto.assureur === undefined ||
        $scope.FormAddAuto.typeAuto === "" ||
        $scope.FormAddAuto.typeAuto === undefined ||
        $scope.FormAddAuto.valgarantie === "" ||
        $scope.FormAddAuto.valgarantie === undefined ||
        $scope.FormAddAuto.Exercice === "" ||
        $scope.FormAddAuto.Exercice === undefined 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddAuto.code01 === "" ||
            $scope.FormAddAuto.code01 === undefined
          ) {
            $("#addAuto_Code01").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Codeassureur === "" ||
            $scope.FormAddAuto.Codeassureur === undefined
          ) {
            $("#Codeassureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.valgarantie === "" ||
            $scope.FormAddAuto.valgarantie === undefined
          ) {
            $("#idgarantie").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddAuto.Exercice === "" ||
            $scope.FormAddAuto.Exercice === undefined
          ) {
            $("#idExercice").css("background-color", "#FFE9E0");
          }


          if (
            $scope.FormAddAuto.denomination01 === "" ||
            $scope.FormAddAuto.denomination01 === undefined
          ) {
            $("#addAuto_Dénomination01").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.code02 === "" ||
            $scope.FormAddAuto.code02 === undefined
          ) {
            $("#addAuto_Code02").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.denomination02 === "" ||
            $scope.FormAddAuto.denomination02 === undefined
          ) {
            $("#addAuto_Dénomination02").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.N_Police === "" ||
            $scope.FormAddAuto.N_Police === undefined
          ) {
            $("#addAuto_N_Police").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.pays === "" ||
            $scope.FormAddAuto.pays === undefined
          ) {
            $("#addAuto_Pays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.ville === "" ||
            $scope.FormAddAuto.ville === undefined
          ) {
            $("#idAdresseGeo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.DescriptionSinistre === "" ||
            $scope.FormAddAuto.DescriptionSinistre === undefined
          ) {
            $("#idDescription").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Pays === "" ||
            $scope.FormAddAuto.Pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.ville === "" ||
            $scope.FormAddAuto.ville === undefined
          ) {
            $("#addAuto_Ville").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.commune === "" ||
            $scope.FormAddAuto.commune === undefined
          ) {
            $("#addAuto_Commune").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.situationGeo === "" ||
            $scope.FormAddAuto.situationGeo === undefined
          ) {
            $("#addAuto_Situation_géographique").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddAuto.Effet === "" ||
            $scope.FormAddAuto.Effet === undefined
          ) {
            $("#addAuto_Effet").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Echeance === "" ||
            $scope.FormAddAuto.Echeance === undefined
          ) {
            $("#addAuto_Echeance").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Branche_risque === "" ||
            $scope.FormAddAuto.Branche_risque === undefined
          ) {
            $("#addAuto_Branche_risque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Taux === "" ||
            $scope.FormAddAuto.Taux === undefined
          ) {
            $("#addAuto_Taux").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Zone_circ === "" ||
            $scope.FormAddAuto.Zone_circ === undefined
          ) {
            $("#addAuto_Zone_circ").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Categorie === "" ||
            $scope.FormAddAuto.Categorie === undefined
          ) {
            $("#addAuto_Catégorie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Tarif === "" ||
            $scope.FormAddAuto.Tarif === undefined
          ) {
            $("#addAuto_Tarif").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Usage === "" ||
            $scope.FormAddAuto.Usage === undefined
          ) {
            $("#addAuto_Usage").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Genre === "" ||
            $scope.FormAddAuto.Genre === undefined
          ) {
            $("#addAuto_Genre").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.assureur === "" ||
            $scope.FormAddAuto.assureur === undefined
          ) {
            $("#addAuto_Assureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Interlocuteur === "" ||
            $scope.FormAddAuto.Interlocuteur === undefined
          ) {
            $("#addAuto_Interlocuteur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Telephone_interlocuteur === "" ||
            $scope.FormAddAuto.Telephone_interlocuteur === undefined
          ) {
            $("#addAuto_Telephone_interlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddAuto.Intermediaire === "" ||
            $scope.FormAddAuto.Intermediaire === undefined
          ) {
            $("#addSanteAuxiliaire_Intermediaire").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddAuto.Marque === "" ||
            $scope.FormAddAuto.Marque === undefined
          ) {
            $("#addAuto_Marque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.typeAuto === "" ||
            $scope.FormAddAuto.typeAuto === undefined
          ) {
            $("#addAuto_typeAuto").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Nserie === "" ||
            $scope.FormAddAuto.Nserie === undefined
          ) {
            $("#addAuto_Nsérie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Energie === "" ||
            $scope.FormAddAuto.Energie === undefined
          ) {
            $("#addAuto_Energie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Puissance_admin === "" ||
            $scope.FormAddAuto.Puissance_admin === undefined
          ) {
            $("#addAuto_Puissance_admin").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Charge_utile === "" ||
            $scope.FormAddAuto.Charge_utile === undefined
          ) {
            $("#addAuto_Charge_utile").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Immatriculation === "" ||
            $scope.FormAddAuto.Immatriculation === undefined
          ) {
            $("#addAuto_Immatriculation").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Nombre_place === "" ||
            $scope.FormAddAuto.Nombre_place === undefined
          ) {
            $("#addAuto_Nombre_place").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Val_neuve === "" ||
            $scope.FormAddAuto.Val_neuve === undefined
          ) {
            $("#addAuto_Val_neuve").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Val_venale === "" ||
            $scope.FormAddAuto.Val_venale === undefined
          ) {
            $("#addAuto_Val_vénale").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.Mise_circ === "" ||
            $scope.FormAddAuto.Mise_circ === undefined
          ) {
            $("#addAuto_Mise_circ").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddAuto.typeAffaire === "" ||
            $scope.FormAddAuto.typeAffaire === undefined
          ) {
            $("#addAuto_typeAffaire").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.verifiereductionenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille reduction";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifiegarentieenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille garentie";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifieprimeenregistrement == true) {
        $scope.$emit("UNLOAD");

        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille prime";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifiereduction == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille reduction";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifiegarentie == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille garentie";
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
      } else if ($scope.valtaux > 100) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Taux").css("background-color", "#FFE9E0");
        });
        $rootScope.valeurtauxincorrect();
      } else if ($scope.valneuve < $scope.valvanale) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Val_neuve").css("background-color", "#FFE9E0");
        });
        $rootScope.montantincorrect();
      } else if (
        $scope.dateSuperioriteFin($scope.FormAddAuto.Mise_circ) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Mise_circ").css("background-color", "#FFE9E0");
        });
        $rootScope.datemisecirincorrect();
      } else if (
        $scope.dateSuperioriteDebut(dateEffet) <=
        $scope.dateSuperioriteFin($scope.FormAddAuto.Mise_circ)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Mise_circ").css("background-color", "#FFE9E0");
        });
        $rootScope.dateEffetMiscirIncorrecte();
      } else if (typetaux.test($scope.FormAddAuto.Taux) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Taux").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un taux correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typechargeutil.test($scope.FormAddAuto.Charge_utile) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Charge_utile").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une charge utile correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenombreplace.test($scope.FormAddAuto.Nombre_place) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Nombre_place").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un nombre de place correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typepuissanceadmin.test($scope.FormAddAuto.Puissance_admin) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Puissance_admin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une puissance admin correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerosouscripteur.test($scope.FormAddAuto.id01) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Code01").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerosouscripteur.test($scope.FormAddAuto.id02) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Code02").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typemontant.test($scope.FormAddAuto.Val_venale) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Val_vénale").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une Valeur venale correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typemontant.test($scope.FormAddAuto.Val_neuve) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Val_neuve").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une Valeur neuve correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddAuto.Telephone_interlocuteur) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Telephone_interlocuteur").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "Veuillez renseigner un numero Telephone interlocuteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormAddAuto.Cond_habituel == "" &&
        $scope.FormAddAuto.Cond_habituel == undefined &&
        typeAlphabetique.test($scope.FormAddAuto.Cond_habituel) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Cond_habituel").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une condition habituelle correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddAuto.situationGeo) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Situation_géographique").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "Veuillez renseigner une situation geographique correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddAuto.Interlocuteur) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Interlocuteur").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un nom Interlocuteur correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(dateEffet) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Effet").css("background-color", "#FFE9E0");
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
          $("#addAuto_Effet").css("background-color", "#FFE9E0");
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
          $("#addAuto_Effet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(dateEcheance) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Echeance").css("background-color", "#FFE9E0");
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
          $("#addAuto_Echeance").css("background-color", "#FFE9E0");
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
          $("#addAuto_Echeance").css("background-color", "#FFE9E0");
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
          $("#addAuto_Effet").css("background-color", "#FFE9E0");
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
          $("#addAuto_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(dateEffet) >=
        $scope.dateSuperioriteFin(dateEcheance)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Effet").css("background-color", "#FFE9E0");
        });
        $rootScope.dateEffetIncorrecte();
      } else if (
        $scope.confirmerChampsGrilleGarantie($scope.tabGarenties) == true ||
        $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
      ) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.etatForm == "2" &&
          $scope.confirmerChampsGrilleGarantie(
            $scope.recupererinfoauto[0].clsCtcontratgaranties
          ) == true) ||
        ($scope.etatForm == "2" &&
          $scope.confirmerChampsGrillePrime(
            $scope.recupererinfoauto[0].clsCtcontratprimes
          ) == true)
      ) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && ($scope.dateSuperioriteFin($scope.recupererinfosauto[0].CA_DATEECHEANCE) > $scope.dateSuperioriteDebut($scope.FormAddAuto.Effet) )
         
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Effet").css("background-color", "#FFE9E0");
        });
        
        $scope.messageErreur ="la nouvelle date d'éffet doit etre supérieur ou égale à l'ancienne date d'écheance qui est le :" + $scope.recupererinfosauto[0].CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.FormAddAuto.Echeance) <=
            $scope.dateSuperioriteDebut($scope.recupererinfosauto[0].CA_DATEECHEANCE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addAuto_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "la nouvelle date d'echeance ne doit pas identique à l'ancienne date d'echeance qui est le :" + $scope.recupererinfosauto[0].CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && (parseInt($scope.FormAddAuto.Exercice) <
      parseInt($scope.recupererinfosauto[0].EX_EXERCICE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idExercice").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "le nouvel exercice doit etre supérieur ou égale à l'ancien exercice qui est :" + $scope.recupererinfosauto[0].EX_EXERCICE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        //alert('On est bon')
        if ($scope.etatForm == "2") {
          $scope.clsCtcontratreductions = [];
          for (
            var i = 0;
            i < $scope.recupererinfoauto[0].clsCtcontratreductions.length;
            i++
          ) {
            $scope.objetReduction = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              RD_CODEREDUCTION: "",
              CA_CODECONTRAT: "",
              RD_TAUX: "",
              RD_LIBELLEREDUCTION: "",
              RD_MONTANT: "",
              SL_LIBELLEECRAN: "ECRAN AUTO",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetReduction.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetReduction.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetReduction.RD_CODEREDUCTION =
              $scope.recupererinfoauto[0].clsCtcontratreductions[
                i
              ].RD_CODEREDUCTION;
            // $scope.objetReduction.RD_TAUX = $scope.recupererinfoauto[i].clsCtcontratreductions[i].RD_TAUX;
            $scope.objetReduction.CA_CODECONTRAT =
              $scope.recupererinfoauto[0].clsCtcontratreductions[
                i
              ].CA_CODECONTRAT;
            $scope.objetReduction.RD_LIBELLEREDUCTION =
              $scope.recupererinfoauto[0].clsCtcontratreductions[
                i
              ].RD_LIBELLEREDUCTION;
            $scope.objetReduction.RD_MONTANT =
              $scope.recupererinfoauto[0].clsCtcontratreductions[i].RD_MONTANT;
            $scope.objetReduction.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetReduction.clsObjetEnvoi.OE_Y =
              $rootScope.CODE_OPERATEUR;
            $scope.objetReduction.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratreductions.push($scope.objetReduction);
            console.log($scope.clsCtcontratreductions);
          }

          $scope.clsCtcontratgaranties = [];
          for (
            var i = 0;
            i < $scope.recupererinfoauto[0].clsCtcontratgaranties.length;
            i++
          ) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
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
              SL_LIBELLEECRAN: "ECRAN AUTO",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetGarentie.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.recupererinfoauto[0].clsCtcontratgaranties[
                i
              ].GA_CODEGARANTIE;
            $scope.objetGarentie.CA_CODECONTRAT =
              $scope.recupererinfoauto[0].clsCtcontratgaranties[
                i
              ].CA_CODECONTRAT;
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.recupererinfoauto[0].clsCtcontratgaranties[
                i
              ].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES =
              $scope.recupererinfoauto[0].clsCtcontratgaranties[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.recupererinfoauto[0].clsCtcontratgaranties[
                i
              ].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA =
              $scope.recupererinfoauto[0].clsCtcontratgaranties[i].CG_PRORATA;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.recupererinfoauto[0].clsCtcontratgaranties[
                i
              ].CG_FRANCHISES;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          $scope.clsCtcontratprimes = [];
          for (
            var i = 0;
            i < $scope.recupererinfoauto[0].clsCtcontratprimes.length;
            i++
          ) {
            $scope.objetPrime = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "ECRAN AUTO",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetPrime.RE_CODERESUME =
              $scope.recupererinfoauto[0].clsCtcontratprimes[i].RE_CODERESUME;
            $scope.objetPrime.CA_CODECONTRAT =
              $scope.recupererinfoauto[0].clsCtcontratprimes[i].CA_CODECONTRAT;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererinfoauto[0].clsCtcontratprimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "16";//"1";
          $scope.CA_CODECONTRAT = $scope.recupererinfosauto[0].CA_CODECONTRAT;
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.clsCtcontratreductions = [];
          for (var i = 0; i < $scope.tabReduction.length; i++) {
            $scope.objetReduction = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              RD_CODEREDUCTION: "",
              RD_TAUX: "",
              RD_LIBELLEREDUCTION: "",
              RD_MONTANT: "",
              SL_LIBELLEECRAN: "ECRAN AUTO",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetReduction.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetReduction.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetReduction.RD_CODEREDUCTION =
              $scope.tabReduction[i].RD_CODEREDUCTION;
            $scope.objetReduction.RD_TAUX = $scope.tabReduction[i].RD_TAUX;
            $scope.objetReduction.RD_LIBELLEREDUCTION =
              $scope.tabReduction[i].RD_LIBELLEREDUCTION;
            $scope.objetReduction.RD_MONTANT =
              $scope.tabReduction[i].RD_MONTANT;
            $scope.objetReduction.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetReduction.clsObjetEnvoi.OE_Y =
              $rootScope.CODE_OPERATEUR;
            $scope.objetReduction.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratreductions.push($scope.objetReduction);
          }

          $scope.clsCtcontratgaranties = [];
          for (var i = 0; i < $scope.tabGarenties.length; i++) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
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
              SL_LIBELLEECRAN: "ECRAN AUTO",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetGarentie.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
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
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          $scope.clsCtcontratprimes = [];
          for (var i = 0; i < $scope.tabPrimes.length; i++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "ECRAN AUTO",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
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
            AS_NUMEROASSUREUR: $scope.FormAddAuto.Codeassureur,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: $scope.FormAddAuto.N_Police,
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_IDTIERS: $scope.FormAddAuto.id01,
            IT_CODEINTERMEDIAIRE: $scope.FormAddAuto.Intermediaire,
            AP_CODETYPEAPPARTEMENT: "",
            OC_CODETYPEOCCUPANT: "",
            ZM_CODEZONEMALADIE: "",
            ZA_CODEZONEAUTO: $scope.FormAddAuto.Zone_circ,
            CB_IDBRANCHE: $scope.FormAddAuto.Branche_risque,
            CA_DATEEFFET: $scope.FormAddAuto.Effet,
            CA_DATEECHEANCE: $scope.FormAddAuto.Echeance,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CA_AVENANT: "",
            CA_SITUATIONGEOGRAPHIQUE: $scope.FormAddAuto.situationGeo,
            CA_CONDITIONHABITUEL: $scope.FormAddAuto.Cond_habituel,
            ST_CODESTATUTSOCIOPROF: $scope.FormAddAuto.Statut_socio_Prof,
            DU_CODEDUREE: "1",
            AU_CODECATEGORIE: $scope.FormAddAuto.Categorie,
            TA_CODETARIF: $scope.FormAddAuto.Tarif,
            US_CODEUSAGE: $scope.FormAddAuto.Usage,
            GE_CODEGENRE: $scope.FormAddAuto.Genre,
            TVH_CODETYPE: $scope.FormAddAuto.Marque,
            EN_CODEENERGIE: $scope.FormAddAuto.Energie,
            CA_TAUX: $scope.FormAddAuto.Taux,
            CA_TYPE: $scope.FormAddAuto.Type,
            CA_NUMSERIE: $scope.FormAddAuto.Nserie,
            CA_IMMATRICULATION: $scope.FormAddAuto.Immatriculation,
            CA_PUISSANCEADMISE: $scope.FormAddAuto.Puissance_admin,
            CA_CHARGEUTILE: $scope.FormAddAuto.Charge_utile,
            CA_NBREPLACE: $scope.FormAddAuto.Nombre_place,
            CA_VALNEUVE: $scope.FormAddAuto.Val_neuve,
            CA_VALVENALE: $scope.FormAddAuto.Val_venale,
            CA_DATEMISECIRCULATION: $scope.FormAddAuto.Mise_circ,
            CA_CLIENTEXONERETAXE: $scope.FormAddAuto.clientexonere,
            TI_IDTIERSCOMMERCIAL: $scope.FormAddAuto.id02,
            TI_IDTIERSASSUREUR: $scope.FormAddAuto.assureur,
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            CA_NOMINTERLOCUTEUR: $scope.FormAddAuto.Interlocuteur,
            CA_CONTACTINTERLOCUTEUR: $scope.FormAddAuto.Telephone_interlocuteur,
            DI_CODEDESIGNATION: "01",
            TA_CODETYPECONTRATSANTE: "",
            CA_CODECONTRATSECONDAIRE: "",
            CD_CODECONDITION: $scope.FormAddAuto.Ag_condpermis,
            CO_CODECOMMUNE: $scope.FormAddAuto.commune,
            RQ_CODERISQUE: "06",
            TA_CODETYPEAFFAIRES: $scope.FormAddAuto.typeAffaire,
            AU_CODETYPECONTRATAUTO: $scope.FormAddAuto.typeAuto,
            MF_CODEMAINFORTE: "",
            ZM_CODEZONEVOYAGE: "",
            CT_NOMBREPIECE: "12",
            CT_SUPERFICIE: "22",
            CT_LOYERMENSUEL: "450000",
            CA_DATENAISSANCE: "01-01-1900",
            EX_EXERCICE: $scope.FormAddAuto.Exercice,
            GR_CODEGARENTIEPRIME: $scope.FormAddAuto.valgarantie,
            PF_CODEPROFESSION: "0001",
            CA_LIEUNAISSANCE: "BFLE",
            SL_LIBELLEECRAN: "ECRAN AUTO",
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
            clsCtcontratgaranties: $scope.clsCtcontratgaranties,
            clsCtcontratprimes: $scope.clsCtcontratprimes,
            clsCtcontratreductions: $scope.clsCtcontratreductions,
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
                  window.location.href = "#/assurances/auto";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                if (!!localStorage.getItem("collectionDemande")) {
                  localStorage.removeItem("collectionDemande");
                }
                $scope.FormAddAuto = {};
                $scope.isDisabled = false;
                $scope.isDisableds = false;
                $scope.initFormAddAuto();
              }
              //$rootScope.EnregistrementReussi($scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE);
              //setTimeout($scope.rechargePage, 3600);
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
    };

    // verification de la prime nette et ttc
    $scope.testprime = function () {
      $scope.statutprime = false;
      $scope.statutprimeenregistrement = false;
      if ($scope.etatForm == "2") {
        $scope.valprimettcenregistrement = 1;
        $scope.valprimenettenregistrement = 1;
        $scope.verifieprime = false;
        for (
          var j = 0;
          j < $scope.recupererinfoauto[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].RE_CODERESUME ==
              '01' &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].RE_CODERESUME ==
              '01' &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenette =
              $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES;
          }
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].RE_CODERESUME ==
              '05' &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].RE_CODERESUME ==
              '05' &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettc =
              $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES;
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
          j < $scope.recupererinfoauto[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].RE_CODERESUME ==
              '05' &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES = 0;
          }
        }

        for (
          var j = 0;
          j < $scope.recupererinfoauto[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].RE_CODERESUME !==
              '05' &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES != "" &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES !=
              undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt(
                $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES
              );
          }
        }
        for (
          var j = 0;
          j < $scope.recupererinfoauto[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].RE_CODERESUME ==
              '05' &&
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES =
              $scope.valprimettcaffiche;
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

    $scope.testgrille = function () {
      if ($scope.etatForm == "2") {
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
        let typenumerique = /^[0-9]+$/;

        $scope.verifiereduction = false;
        for (
          var j = 0;
          j < $scope.recupererinfoauto[0].clsCtcontratreductions.length;
          j++
        ) {
          if (
            typenumerotelephone.test(
              $scope.recupererinfoauto[0].clsCtcontratreductions[j].RD_MONTANT
            ) == false
          ) {
            $scope.verifiereduction = true;
            break;
          }
        }
        $scope.verifiegarentie = false;
        for (
          var j = 0;
          j < $scope.recupererinfoauto[0].clsCtcontratgaranties.length;
          j++
        ) {
          if (
            typenumerotelephone.test(
              $scope.recupererinfoauto[0].clsCtcontratgaranties[j].CG_PRIMES
            ) == false
          ) {
            $scope.verifiegarentie = true;
            break;
          }
        }
        $scope.verifieprime = false;
        for (
          var j = 0;
          j < $scope.recupererinfoauto[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            typenumerique.test(
              $scope.recupererinfoauto[0].clsCtcontratprimes[j].CG_PRIMES
            ) == false
          ) {
            $scope.verifieprime = true;
            break;
          }
        }
      } else {
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
        let typenumerique = /^[0-9]+$/;

        $scope.verifiereductionenregistrement = false;
        for (var j = 0; j < $scope.tabReduction.length; j++) {
          if (
            typenumerotelephone.test($scope.tabReduction[j].RD_MONTANT) == false
          ) {
            $scope.verifiereductionenregistrement = true;
            break;
          }
        }
        $scope.verifiegarentieenregistrement = false;
        for (var j = 0; j < $scope.tabGarenties.length; j++) {
          if (
            typenumerotelephone.test($scope.tabGarenties[j].CG_PRIMES) == false
          ) {
            $scope.verifiegarentieenregistrement = true;
            break;
          }
        }
        $scope.verifieprimeenregistrement = false;
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (typenumerique.test($scope.tabPrimes[j].CG_PRIMES) == false) {
            $scope.verifieprimeenregistrement = true;
            break;
          }
        }
      }
    };
    //Fin ajout multirisque profesionnel (contrat)

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
        nomCom === undefined ||
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
            RQ_CODERISQUE: "06",
            EX_EXERCICE: Exercice,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "ECRAN AUTO",
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
        RQ_CODERISQUE: "06",
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
          window.location.href = "#/assurances/modification/auto";
        }
      });
 
};
//fin afficher liste AvecAccessoir

    //debut voir plus multirisque professionnel
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpAuto", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpAuto"));
    };
    //fin voir plus multirisque professionnel

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE,info.EX_EXERCICE)
    
    };
    //debut recuperer id pour la suppression

    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //debut recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimeContrat = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.idElement,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          // console.log($scope.testSuppression)
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
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //debut recuperer id pour la suppression

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "Auto";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBO
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
          $scope.afficheListeConditionPermis();
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
          RQ_CODERISQUE: "06",
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

    //debut combo ConditionPermis
    $scope.afficheListeConditionPermis = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          if (
            $scope.listeDesConditionPermis[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeCategorieAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesConditionPermis[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesConditionPermis);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesConditionPermis[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo ConditionPermis

    //debut combo Categorie
    $scope.afficheListeCategorieAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesCategorieAuto = reponse.data;
          if (
            $scope.listeDesCategorieAuto[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListePaysAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesCategorieAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesCategorieAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCategorieAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Categorie

    //debut liste des pays
    $scope.afficheListePaysAuto = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesPaysAuto = reponse.data;
          if (
            $scope.listeDesPaysAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeAssureurAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPaysAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des assureur
    $scope.afficheListeAssureurAuto = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesAssureursAuto = reponse.data;
          if (
            $scope.listeDesAssureursAuto[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureursAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureursAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureursAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des assureur

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
            $scope.afficheListeTypeAffaireAuto();
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
    $scope.afficheListeTypeAffaireAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeTypeAffaireAuto = reponse.data;
          if (
            $scope.listeTypeAffaireAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeUsageAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaireAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaireAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaireAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut combo usage
    $scope.afficheListeUsageAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesUsageAuto = reponse.data;
          if (
            $scope.listeDesUsageAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeTarifAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesUsageAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesUsageAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesUsageAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo usage

    //debut combo Tarif
    $scope.afficheListeTarifAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesTarifAuto = reponse.data;
          if (
            $scope.listeDesTarifAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeBrancheAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesTarifAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesTarifAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesTarifAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Tarif

    //debut combo Branche
    $scope.afficheListeBrancheAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesBrancheAuto = reponse.data;
          if (
            $scope.listeDesBrancheAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeGenreAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesBrancheAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesBrancheAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesBrancheAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Branche

    //debut combo Genre
    $scope.afficheListeGenreAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesGenreAuto = reponse.data;
          if (
            $scope.listeDesGenreAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeZoneAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesGenreAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesGenreAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesGenreAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Genre

    //debut combo Duree
    $scope.afficheListeDureeAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesDureeAuto = reponse.data;
          if (
            $scope.listeDesDureeAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeZoneAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesDureeAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesDureeAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesDureeAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Durre

    //debut combo Zone cir
    $scope.afficheListeZoneAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesZoneAuto = reponse.data;
          if (
            $scope.listeDesZoneAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeEnergie();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesZoneAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesZoneAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesZoneAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Zone cir

    //debut combo Energie
    $scope.afficheListeEnergie = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesEnergieAuto = reponse.data;
          if (
            $scope.listeDesEnergieAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeMarque();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesEnergieAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesEnergieAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesEnergieAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Energie

    //debut combo Marque
    $scope.afficheListeMarque = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesMarqueAuto = reponse.data;
          if (
            $scope.listeDesMarqueAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeStatutSocio();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesMarqueAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesMarqueAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesMarqueAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Marque

    //debut combo Statutsocio
    $scope.afficheListeStatutSocio = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          if (
            $scope.listeDesStatutSocio[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeClientExonere();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesStatutSocio[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesStatutSocio);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesStatutSocio[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Statutsocio

    //debut liste des clients exonere
    $scope.afficheListeClientExonere = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
        .post("/ClientExonere/ListeClientExonere/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeClientExonere = reponse.data;
          if (
            $scope.listeClientExonere[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeTypeAuto();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeClientExonere[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeClientExonere);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeClientExonere[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des clients exonere

    //debut liste des type auto
    $scope.afficheListeTypeAuto = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
        .post("/TypeAuto/ListeTypeAuto/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listetypeAuto = reponse.data;
          if ($scope.listetypeAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.tableauGarenties();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listetypeAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listetypeAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listetypeAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des types auto

    //debut tableau garenties
    $scope.tableauGarenties = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "06",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          if ($scope.tabGarenties[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.tableauReduction();
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

    //debut tableau de reduction
    $scope.tableauReduction = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "06",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          if ($scope.tabReduction[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabReduction[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabReduction);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabReduction[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau de reduction

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "06",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
              setTimeout($scope.retourModifAuto, 3600);
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
    $scope.tableauGarentiesModif = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "06",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.recupererinfoauto[0].clsCtcontratgaranties = reponse.data;
          $scope.$emit("UNLOAD");
        
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          
        });
    };
    //fin tableau garenties

    //debut tableau de reduction
    $scope.tableauReductionModif = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "06",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.recupererinfoauto[0].clsCtcontratreductions = reponse.data;
          $scope.$emit("UNLOAD");
          
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
         
        });
    };
    //fin tableau de reduction

    //debut tableau primes
    $scope.tableauPrimesModif = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "06",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.recupererinfoauto[0].clsCtcontratprimes = reponse.data;
          $scope.$emit("UNLOAD");
          
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          
        });
    };




    //debut acceder a la page de modification
    $scope.retourModifAuto = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.isDisabled = true;

      $scope.recupererinfoauto[0] = JSON.parse(
        sessionStorage.getItem("modifAuto")
      );
      console.log($scope.recupererinfoauto[0]);

      if($scope.recupererinfoauto[0].EX_EXERCICE == undefined || $scope.recupererinfoauto[0].EX_EXERCICE == "" || $scope.recupererinfoauto[0].EX_EXERCICE == null){
        $scope.FormAddAuto.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      }else{
        $scope.FormAddAuto.Exercice = $scope.recupererinfoauto[0].EX_EXERCICE;
      }

      $scope.FormAddAuto.Codeassureur = $scope.recupererinfoauto[0].AS_NUMEROASSUREUR;
      $scope.FormAddAuto.code01 = $scope.recupererinfoauto[0].TI_NUMTIERS;
      $scope.FormAddAuto.denomination01 =
        $scope.recupererinfoauto[0].TI_DENOMINATION;
      $scope.FormAddAuto.code02 =
        $scope.recupererinfoauto[0].TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddAuto.denomination02 =
        $scope.recupererinfoauto[0].TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddAuto.pays = $scope.recupererinfoauto[0].PY_CODEPAYS;
      $scope.FormAddAuto.ville = $scope.recupererinfoauto[0].VL_CODEVILLE;
      $scope.FormAddAuto.commune = $scope.recupererinfoauto[0].CO_CODECOMMUNE;
      $scope.FormAddAuto.N_Police = $scope.recupererinfoauto[0].CA_NUMPOLICE;
      $scope.FormAddAuto.Intermediaire =
        $scope.recupererinfoauto[0].IT_CODEINTERMEDIAIRE;
      $scope.FormAddAuto.clientexonere =
        $scope.recupererinfoauto[0].CA_CLIENTEXONERETAXE;
      $scope.FormAddAuto.situationGeo =
        $scope.recupererinfoauto[0].CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddAuto.assureur =
        $scope.recupererinfoauto[0].TI_IDTIERSASSUREUR;
      $scope.FormAddAuto.Interlocuteur =
        $scope.recupererinfoauto[0].CA_NOMINTERLOCUTEUR;
      $scope.FormAddAuto.Telephone_interlocuteur =
        $scope.recupererinfoauto[0].CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddAuto.Taux = $scope.recupererinfoauto[0].CA_TAUX;
      $scope.FormAddAuto.Effet = $scope.recupererinfoauto[0].CA_DATEEFFET;
      $scope.FormAddAuto.Echeance = $scope.recupererinfoauto[0].CA_DATEECHEANCE;
      $scope.FormAddAuto.Nserie = $scope.recupererinfoauto[0].CA_NUMSERIE;
      $scope.FormAddAuto.Puissance_admin =
        $scope.recupererinfoauto[0].CA_PUISSANCEADMISE;
      $scope.FormAddAuto.Charge_utile =
        $scope.recupererinfoauto[0].CA_CHARGEUTILE;
      $scope.FormAddAuto.Nombre_place =
        $scope.recupererinfoauto[0].CA_NBREPLACE;
      $scope.FormAddAuto.typeAffaire =
        $scope.recupererinfoauto[0].TA_CODETYPEAFFAIRES;
      $scope.FormAddAuto.id01 = $scope.recupererinfoauto[0].TI_IDTIERS;
      $scope.FormAddAuto.Zone_circ =
        $scope.recupererinfoauto[0].ZA_CODEZONEAUTO;
      $scope.FormAddAuto.Branche_risque =
        $scope.recupererinfoauto[0].CB_IDBRANCHE;
      $scope.FormAddAuto.Cond_habituel =
        $scope.recupererinfoauto[0].CD_CODECONDITION;
      $scope.FormAddAuto.Statut_socio_Prof =
        $scope.recupererinfoauto[0].ST_CODESTATUTSOCIOPROF;
      $scope.FormAddAuto.Duree = $scope.recupererinfoauto[0].DU_CODEDUREE;
      $scope.FormAddAuto.Categorie =
        $scope.recupererinfoauto[0].AU_CODECATEGORIE;
      $scope.FormAddAuto.Tarif = $scope.recupererinfoauto[0].TA_CODETARIF;
      $scope.FormAddAuto.Usage = $scope.recupererinfoauto[0].US_CODEUSAGE;
      $scope.FormAddAuto.Genre = $scope.recupererinfoauto[0].GE_CODEGENRE;
      $scope.FormAddAuto.Marque = $scope.recupererinfoauto[0].TVH_CODETYPE;
      $scope.FormAddAuto.Energie = $scope.recupererinfoauto[0].EN_CODEENERGIE;
      $scope.FormAddAuto.Type = $scope.recupererinfoauto[0].CA_TYPE;
      $scope.FormAddAuto.Immatriculation =
        $scope.recupererinfoauto[0].CA_IMMATRICULATION;

      $scope.FormAddAuto.Val_neuve = $scope.recupererinfoauto[0].CA_VALNEUVE;
      $scope.FormAddAuto.Val_venale = $scope.recupererinfoauto[0].CA_VALVENALE;

      $scope.FormAddAuto.Mise_circ =
        $scope.recupererinfoauto[0].CA_DATEMISECIRCULATION;
      $scope.FormAddAuto.id02 =
        $scope.recupererinfoauto[0].TI_IDTIERSCOMMERCIAL;
      $scope.FormAddAuto.Ag_condpermis =
        $scope.recupererinfoauto[0].CD_CODECONDITION;
      $scope.FormAddAuto.Cond_habituel =
        $scope.recupererinfoauto[0].CA_CONDITIONHABITUEL;
      $scope.FormAddAuto.typeAuto =
        $scope.recupererinfoauto[0].AU_CODETYPECONTRATAUTO;
      $scope.FormAddAuto.valgarantie =
        $scope.recupererinfoauto[0].GR_CODEGARENTIEPRIME;

      $scope.afficheListeVilleAutoModif(
        $scope.recupererinfoauto[0].PY_CODEPAYS
      );

      
      if($scope.recupererinfoauto[0].clsCtcontratprimes.length <= 1){
        $scope.tableauPrimesModif()
      }
      if($scope.recupererinfoauto[0].clsCtcontratreductions.length <= 1){
        $scope.tableauReductionModif()
      }
      if($scope.recupererinfoauto[0].clsCtcontratgaranties.length <= 1){
        $scope.tableauGarentiesModif()
      }
    };
    //debut acceder a la page de modification
    // FIN COMBO

    /* FIN DEV BOLATY AUTO*/
  },
]);
