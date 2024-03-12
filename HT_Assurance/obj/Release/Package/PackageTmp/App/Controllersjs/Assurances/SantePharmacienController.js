MapharApp.controller("SantePharmacienController", [
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

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddSante = {
      id1: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
      id2: "",
      idModif1: "",
      idModif2: "",
      pays: "",
      ville: "",
      commune: "",
      assureur: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
        : "",
      typeAffaire: "",
      typeContrat: "",
      Code01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_NUMTIERS
        : "",
      Denomination01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_DENOMINATION
        : "",
      Code02: "",
      Denomination02: "",
      Commission: "",
      Avenant: "0",
      CodeBranche: "",
      AdressePostale: "",
      PoliceN: "",
      Effet: "",
      Echeance: "",
      Duree: "",
      SituationGeo: "",
      Interlocuteur: "",
      TelInterlocuteur: "",
      intermediaire: "",
      garanties: [],
      primes: [],
      valgarantie: "",
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

    $scope.listeDesPaysSante = [];
    $scope.listeDesVilles = [];
    $scope.listeDesCommunes = [];
    $scope.listeDesAssureursSante = [];
    $scope.listeTypeAffaireSante = [];
    $scope.listeContrat = [];
    $scope.listeTypeContratSante = [];
    $scope.tabGarenties = [];
    $scope.tabPrimes = [];
    $scope.tabEngPharmacien = [];
    $scope.tabModifPharmacien = [];
    $scope.elmntSupprimerPharmacien = [];
    $scope.recupererInfo = {};
    $scope.listeDesBranche = [];
    $scope.valPrimeTtc = 0;
    $scope.valPrimeNette = 0;
    $scope.valPrimeTtcEnregistrement = 0;
    $scope.valPrimeNetteEnregistrement = 0;
    $scope.SL_LIBELLEECRAN = "CONTRAT SANTE PHARMACIEN";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";
    $scope.listeDesGarantie = [];
    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken
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

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    //debut initialisation add sante
    $scope.initFormAddSante = function () {
      $scope.afficheListeVille($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListePaysSante();
      $scope.FormAddSante.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddSante.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommune($rootScope.VILLEPARDEFAUT)
    };
    //fin initialisation add sante

    //debut initialisation modif pharmacien
    $scope.initFormModifPharmacien = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListePaysSante();
    };
    //fin initialisation modif pharmacien

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut contrainte sur les champs add sante
    $scope.contrainteFormAddSante = function () {
      FormValidation.formValidation(document.getElementById("formAddSantef"), {
        fields: {
          addSante_Code1: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le n°.",
              },
              regexp: {
                regexp: /^[0-9]+$/,
                message: "Veuillez saisir un n° correct.",
              },
            },
          },
          addSante_Denomination1: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
              regexp: {
                regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                message: "Veuillez saisir une dénomination correcte.",
              },
            },
          },
          addSante_Code2: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le n°.",
              },
              regexp: {
                regexp: /^[0-9]+$/,
                message: "Veuillez saisir un n° correct.",
              },
            },
          },
          addSante_Denomination2: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
              regexp: {
                regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                message: "Veuillez saisir une dénomination correcte.",
              },
            },
          },
          addSante_Avenant: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l'avenant.",
              },
            },
          },
          addSante_CodeBranche: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code branche.",
              },
            },
          },
          addSante_NumPolice: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le n° de la police.",
              },
            },
          },
          addSante_Adresse: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l'adresse.",
              },
              regexp: {
                regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                message: "Veuillez saisir une adresse correcte.",
              },
            },
          },
          addSante_Durée: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la durée.",
              },
              regexp: {
                regexp: /^\d+$/,
                message: "Veuillez saisir une durée correcte.",
              },
            },
          },
          addSante_TypeContrat: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le type de contrat.",
              },
            },
          },
          addSante_Pays: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le pays.",
              },
            },
          },
          addSante_Ville: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la ville.",
              },
            },
          },
          addSante_Commune: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la commune.",
              },
            },
          },
          addSante_SituationGeo: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la situation géograpgique.",
              },
              regexp: {
                regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                message: "Veuillez saisir une situation géographique correcte.",
              },
            },
          },
          addSante_Intermediaire: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le nom intermediaire.",
              },
            },
          },
          addSante_Effet: {
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
          addSante_Echeance: {
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
          addSante_Assureur: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner l'assureur.",
              },
            },
          },
          addSante_Interlocuteur: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l'interlocuteur.",
              },
              regexp: {
                regexp: /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/,
                message: "Veuillez saisir un nom interlocuteur correct.",
              },
            },
          },
          addSante_TelInterlocuteur: {
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
          addSante_TypeAffaire: {
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
    //fin contrainte sur les champs add sante

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddSanteP = function () {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#FFFFFF");
        $("#idDenomination1").css("background-color", "#FFFFFF");
        $("#idCode2").css("background-color", "#FFFFFF");
        $("#idDenomination2").css("background-color", "#FFFFFF");
        $("#idCodeBranche").css("background-color", "#FFFFFF");
        $("#idAdressePostale").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idEffet").css("background-color", "#FFFFFF");
        $("#idEcheance").css("background-color", "#FFFFFF");
        $("#idAssureur").css("background-color", "#FFFFFF");
        $("#idPays").css("background-color", "#FFFFFF");
        $("#idVille").css("background-color", "#FFFFFF");
        $("#idCommune").css("background-color", "#FFFFFF");
        $("#idSitGeo").css("background-color", "#FFFFFF");
        $("#idInterlocuteur").css("background-color", "#FFFFFF");
        $("#idTelInter").css("background-color", "#FFFFFF");
        $("#idIntermediaire").css("background-color", "#FFFFFF");
        $("#idTypeAffaire").css("background-color", "#FFFFFF");
      });
      $scope.FormAddSante = {};
      $scope.initFormAddSante();
      $scope.isDisabled1 = false;
      $scope.isDisabled2 = false;
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddSante.Code01 == "" &&
        $scope.FormAddSante.Denomination01 == ""
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
            TI_NUMTIERS: $scope.FormAddSante.Code01,
            TI_DENOMINATION: $scope.FormAddSante.Denomination01,
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
        });
    };
    //fin liste des souscripteur

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddSante.Code02 == "" &&
        $scope.FormAddSante.Denomination02 == ""
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
            TI_NUMTIERS: $scope.FormAddSante.Code02,
            TI_DENOMINATION: $scope.FormAddSante.Denomination02,
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
    $scope.choixSouscripteur = function (code, denomination, id) {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#EDEDED");
        $("#idDenomination1").css("background-color", "#EDEDED");
      });
      $scope.FormAddSante.Code01 = code;
      $scope.FormAddSante.Denomination01 = denomination;
      $scope.FormAddSante.id1 = id;
      $scope.isDisabled1 = true;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $(document).ready(function () {
        $("#idCode2").css("background-color", "#EDEDED");
        $("#idDenomination2").css("background-color", "#EDEDED");
      });
      $scope.FormAddSante.Code02 = code;
      $scope.FormAddSante.Denomination02 = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddSante.idModif2 = id;
        $scope.FormAddSante.id2 = $scope.FormAddSante.idModif2;
      } else {
        $scope.FormAddSante.id2 = id;
      }
      $scope.isDisabled2 = true;
    };
    //Fin choix d'un commercial

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
            typeNumerique.test(grille[j].CG_PRIMES) == false ||
            typeNumerique.test(grille[j].CG_APRESREDUCTION) == false ||
            typeNumerique.test(grille[j].CG_PRORATA) == false ||
            typeNumerique.test(grille[j].CG_TAUX) == false
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
    $("#idgarantie").focusin(function () {
      $(this).css("background-color", "#FFFFFF");
    });
    //debut focus sur le champ enregistrement
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#idCode1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCode2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCodeBranche").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAdressePostale").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEffet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEcheance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAssureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCommune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSitGeo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idInterlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTelInter").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idIntermediaire").focusin(function () {
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
      });
    };
    //fin focus sur le champ enregistrement

    //Debut ajout sante (contrat) /a terminer
    $scope.validerFormPharmacien = function () {
      $scope.$emit("LOAD");
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifSante"));

      $scope.testPrime();
      $scope.calculprimettc();
      $scope.desactiverChampRequisEnregistrement();

      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeNumeroTelephone = /^\d+$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      if (
        $scope.FormAddSante.Effet !== undefined &&
        $scope.FormAddSante.Echeance !== undefined
      ) {
        $scope.lAnneeEffet = $scope.FormAddSante.Effet.substr(6, 4);
        $scope.leMoisEffet = $scope.FormAddSante.Effet.substr(3, 2);
        $scope.leJourEffet = $scope.FormAddSante.Effet.substr(0, 2);
        $scope.lAnneeEcheance = $scope.FormAddSante.Echeance.substr(6, 4);
        $scope.leMoisEcheance = $scope.FormAddSante.Echeance.substr(3, 2);
        $scope.leJourEcheance = $scope.FormAddSante.Echeance.substr(0, 2);
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
        $scope.FormAddSante.Code01 === "" ||
        $scope.FormAddSante.Code01 === undefined ||
        $scope.FormAddSante.Denomination01 === "" ||
        $scope.FormAddSante.Denomination01 === undefined ||
        $scope.FormAddSante.Code02 === "" ||
        $scope.FormAddSante.Code02 === undefined ||
        $scope.FormAddSante.Denomination02 === "" ||
        $scope.FormAddSante.Denomination02 === undefined ||
        $scope.FormAddSante.CodeBranche === "" ||
        $scope.FormAddSante.CodeBranche === undefined ||
        $scope.FormAddSante.AdressePostale === "" ||
        $scope.FormAddSante.AdressePostale === undefined ||
        $scope.FormAddSante.PoliceN === "" ||
        $scope.FormAddSante.PoliceN === undefined ||
        $scope.FormAddSante.Effet === "" ||
        $scope.FormAddSante.Effet === undefined ||
        $scope.FormAddSante.Echeance === "" ||
        $scope.FormAddSante.Echeance === undefined ||
        $scope.FormAddSante.assureur === "" ||
        $scope.FormAddSante.assureur === undefined ||
        $scope.FormAddSante.pays === "" ||
        $scope.FormAddSante.pays === undefined ||
        $scope.FormAddSante.ville === "" ||
        $scope.FormAddSante.ville === undefined ||
        $scope.FormAddSante.commune === "" ||
        $scope.FormAddSante.commune === undefined ||
        $scope.FormAddSante.SituationGeo === "" ||
        $scope.FormAddSante.SituationGeo === undefined ||
        $scope.FormAddSante.Interlocuteur === "" ||
        $scope.FormAddSante.Interlocuteur === undefined ||
        $scope.FormAddSante.TelInterlocuteur === "" ||
        $scope.FormAddSante.TelInterlocuteur === undefined ||
        $scope.FormAddSante.intermediaire === "" ||
        $scope.FormAddSante.intermediaire === undefined ||
        $scope.FormAddSante.valgarantie === "" ||
        $scope.FormAddSante.valgarantie === undefined ||
        $scope.FormAddSante.typeAffaire === "" ||
        $scope.FormAddSante.typeAffaire === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          //a faire demain
          if (
            $scope.FormAddSante.valgarantie === "" ||
            $scope.FormAddSante.valgarantie === undefined
          ) {
            $("#idgarantie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.Code01 === "" ||
            $scope.FormAddSante.Code01 === undefined
          ) {
            $("#idCode1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.Denomination01 === "" ||
            $scope.FormAddSante.Denomination01 === undefined
          ) {
            $("#idDenomination1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.Code02 === "" ||
            $scope.FormAddSante.Code02 === undefined
          ) {
            $("#idCode2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.Denomination02 === "" ||
            $scope.FormAddSante.Denomination02 === undefined
          ) {
            $("#idDenomination2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.CodeBranche === "" ||
            $scope.FormAddSante.CodeBranche === undefined
          ) {
            $("#idCodeBranche").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.AdressePostale === "" ||
            $scope.FormAddSante.AdressePostale === undefined
          ) {
            $("#idAdressePostale").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.PoliceN === "" ||
            $scope.FormAddSante.PoliceN === undefined
          ) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.Effet === "" ||
            $scope.FormAddSante.Effet === undefined
          ) {
            $("#idEffet").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.Echeance === "" ||
            $scope.FormAddSante.Echeance === undefined
          ) {
            $("#idEcheance").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.assureur === "" ||
            $scope.FormAddSante.assureur === undefined
          ) {
            $("#idAssureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.intermediaire === "" ||
            $scope.FormAddSante.intermediaire === undefined
          ) {
            $("#idIntermediaire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.pays === "" ||
            $scope.FormAddSante.pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.ville === "" ||
            $scope.FormAddSante.ville === undefined
          ) {
            $("#idVille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.commune === "" ||
            $scope.FormAddSante.commune === undefined
          ) {
            $("#idCommune").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.SituationGeo === "" ||
            $scope.FormAddSante.SituationGeo === undefined
          ) {
            $("#idSitGeo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.Interlocuteur === "" ||
            $scope.FormAddSante.Interlocuteur === undefined
          ) {
            $("#idInterlocuteur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.TelInterlocuteur === "" ||
            $scope.FormAddSante.TelInterlocuteur === undefined
          ) {
            $("#idTelInter").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSante.typeAffaire === "" ||
            $scope.FormAddSante.typeAffaire === undefined
          ) {
            $("#idTypeAffaire").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (typeDate.test($scope.FormAddSante.Effet) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == true &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
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
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddSante.Echeance) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date écheance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == true &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "28"
      ) {
        $scope.$emit("UNLOAD");
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
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumeroTelephone.test($scope.FormAddSante.TelInterlocuteur) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddSante.Effet) >=
        $scope.dateSuperioriteFin($scope.FormAddSante.Echeance)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateEffetIncorrecte();
      } else if ($scope.statutPrimeEnregistrement == true) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFFFFF");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La prime ttc ne doit etre vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutPrime == true) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPrime" + 0).css("background-color", "#FFFFFF");
          $("#idPrime" + 1).css("background-color", "#FFFFFF");
          $("#idPrime" + 2).css("background-color", "#FFFFFF");
          $("#idPrime" + 3).css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La prime ttc ne doit etre vide";
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
          $("#idPrime" + 3).css("background-color", "#FFE9E0");
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
          $("#idPrime" + 3).css("background-color", "#FFE9E0");
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
          if ($scope.FormAddSante.idModif1 === "") {
            $scope.FormAddSante.id1 = $scope.recuperer.TI_IDTIERS;
          }
          if ($scope.FormAddSante.idModif2 === "") {
            $scope.FormAddSante.id2 = $scope.recuperer.TI_IDTIERSCOMMERCIAL;
          }

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
          $scope.clsCtcontratprimes = [];
          for (
            var i = 0;
            i < $scope.recupererInfo.clsCtcontratprimes.length;
            i++
          ) {
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
            $scope.objetPrime.RE_CODERESUME =
              $scope.recupererInfo.clsCtcontratprimes[i].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }

          $scope.TYPEOPERATION = "1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "MODIFICATION";
        } else {
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
          $scope.clsCtcontratprimes = [];
          for (var i = 0; i < $scope.tabPrimes.length; i++) {
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
            $scope.objetPrime.RE_CODERESUME = $scope.tabPrimes[i].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR = $scope.tabPrimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
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
              RQ_CODERISQUE: "02",
              CA_DATENAISSANCE: "01-01-1900",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE: $scope.FormAddSante.PoliceN,
              IT_CODEINTERMEDIAIRE: $scope.FormAddSante.intermediaire,
              TI_IDTIERSASSUREUR: $scope.FormAddSante.assureur,
              CO_CODECOMMUNE: $scope.FormAddSante.commune,
              CA_SITUATIONGEOGRAPHIQUE: $scope.FormAddSante.SituationGeo,
              CA_DATEEFFET: $scope.FormAddSante.Effet,
              CA_DATEECHEANCE: $scope.FormAddSante.Echeance,
              CA_NOMINTERLOCUTEUR: $scope.FormAddSante.Interlocuteur,
              CA_CONTACTINTERLOCUTEUR: $scope.FormAddSante.TelInterlocuteur,
              TA_CODETYPEAFFAIRES: $scope.FormAddSante.typeAffaire,
              TI_IDTIERSCOMMERCIAL: $scope.FormAddSante.id2,
              TI_IDTIERS: $scope.FormAddSante.id1,
              CB_IDBRANCHE: $scope.FormAddSante.CodeBranche,
              CA_ADRESSE: $scope.FormAddSante.AdressePostale,
              CA_DUREEENMOIS: $scope.FormAddSante.Duree,
              CA_TAUX: "0",
              CA_NUMSERIE: "",
              CA_IMMATRICULATION: "",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
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
              GR_CODEGARENTIEPRIME: $scope.FormAddSante.valgarantie,
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
            },
          ];

          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.tabEngPharmacien = reponse.data;
              if (
                $scope.tabEngPharmacien[0].clsObjetRetour["SL_RESULTAT"] ===
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.tabEngPharmacien[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href = "#/assurances/sante/pharmacien";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                } else {
                  if (!!localStorage.getItem("collectionDemande")) {
                    localStorage.removeItem("collectionDemande");
                  }
                  $scope.resetFormAddSanteP();
                }
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.tabEngPharmacien[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur();
            });
        }
      }
    };
    //Fin ajout sante (contrat)

    //debut voir plus sante
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpSante", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpSante"));
    };
    //fin voir plus sante

    //debut acceder a la page de modification sante
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE)
    
    };
    //fin acceder a la page de modification sante

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
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
          $scope.elmntSupprimerPharmacien = reponse.data;
          if (
            $scope.elmntSupprimerPharmacien[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.elmntSupprimerPharmacien[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeContrat[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.elmntSupprimerPharmacien[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //fin recuperer id pour la suppression

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

    //debut affiche liste contrat
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
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
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
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
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
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeContrat = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeContrat = "";
      } else {
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: "02",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
    //fin affiche liste contrat

 //debut afficher liste AvecAccessoir
 $scope.afficheListeContratAvecAccessoir = function (
  idContrat,
  date
 
) {
  $scope.$emit("LOAD");
 
 
    $scope.objet_envoie = [
      {
        RQ_CODERISQUE: "02",
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
          sessionStorage.setItem("modifSante", JSON.stringify($scope.recupererInfoAvecAccessoir));
          window.location.href = "#/assurances/modification/sante/pharmacien";
        }
      });
 
};
//fin afficher liste AvecAccessoir


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

    //debut liste des villes pour la modification
    $scope.afficheListeVille = function (id) {
      $scope.listeDesCommunes = [];
      $scope.FormAddSante.commune = "";
     // $scope.FormAddSante.ville = "";
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
      $scope.FormAddSante.commune = "";
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
      $rootScope.retourSurListeContrat = "SantePharmacien";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBOS

    //debut liste des pays
    $scope.afficheListePaysSante = function () {
      $scope.$emit("LOAD");
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
          $scope.listeDesPaysSante = reponse.data;
          if (
            $scope.listeDesPaysSante[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListegarantie();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysSante[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPaysSante);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysSante[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    $scope.afficheListegarantie = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "02",
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
            $scope.afficheListeAssureurSante();
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

    //debut liste des assureur
    $scope.afficheListeAssureurSante = function () {
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
          $scope.listeDesAssureursSante = reponse.data;
          if (
            $scope.listeDesAssureursSante[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeTypeAffaireSante();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureursSante[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureursSante);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureursSante[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des assureur

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaireSante = function () {
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
          $scope.listeTypeAffaireSante = reponse.data;
          if (
            $scope.listeTypeAffaireSante[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.tableauGarenties();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaireSante[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaireSante);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaireSante[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut tableau garenties
    $scope.tableauGarenties = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "02",
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
          RQ_CODERISQUE: "02",
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
            $scope.afficheListeTypeContratSante();
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

    //debut liste type contrat
    $scope.afficheListeTypeContratSante = function () {
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
        .post("/TypeContrat/ListeTypeContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeContratSante = reponse.data;
          if (
            $scope.listeTypeContratSante[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeContratSante[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeContratSante);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeContratSante[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type contrat

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
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
        .post("/Intermediaire/ListeIntermediaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeIntermediaire = reponse.data;
          if (
            $scope.listeIntermediaire[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeBranche();
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

    //debut combo Branche
    $scope.afficheListeBranche = function () {
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
        .post("/Branche/ListeBranche/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesBranche = reponse.data;
          if ($scope.listeDesBranche[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifPharmacien, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesBranche[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesBranche);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesBranche[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin combo Branche

    //debut acceder a la page de modification sante 2
    $scope.retourModifPharmacien = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifSante"));
      $scope.isDisabled1 = true;
      $scope.isDisabled2 = false;
      console.log($scope.recupererInfo);

      $scope.FormAddSante.Code01 = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddSante.Denomination01 = $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddSante.Code02 = $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddSante.Denomination02 =
        $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddSante.CodeBranche = $scope.recupererInfo.CB_IDBRANCHE;
      $scope.FormAddSante.AdressePostale = $scope.recupererInfo.CA_ADRESSE;
      $scope.FormAddSante.PoliceN = $scope.recupererInfo.CA_NUMPOLICE;
      $scope.FormAddSante.Effet = $scope.recupererInfo.CA_DATEEFFET;
      $scope.FormAddSante.Echeance = $scope.recupererInfo.CA_DATEECHEANCE;
      $scope.FormAddSante.Duree = $scope.recupererInfo.CA_DUREEENMOIS;
      $scope.FormAddSante.assureur = $scope.recupererInfo.TI_IDTIERSASSUREUR;
      $scope.FormAddSante.pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddSante.ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddSante.commune = $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddSante.SituationGeo =
        $scope.recupererInfo.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddSante.Interlocuteur =
        $scope.recupererInfo.CA_NOMINTERLOCUTEUR;
      $scope.FormAddSante.TelInterlocuteur =
        $scope.recupererInfo.CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddSante.intermediaire =
        $scope.recupererInfo.IT_CODEINTERMEDIAIRE;
      $scope.FormAddSante.typeAffaire =
        $scope.recupererInfo.TA_CODETYPEAFFAIRES;
      $scope.FormAddSante.valgarantie =
        $scope.recupererInfo.GR_CODEGARENTIEPRIME;

      $scope.afficheListeVilleModif($scope.recupererInfo.PY_CODEPAYS);
    };
    //fin acceder a la page de modification sante2

    // FIN COMBOS

    /*FIN DEV JJ*/
  },
]);
