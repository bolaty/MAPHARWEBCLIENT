MapharApp.controller("ResponsabiliteCivileController", [
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
    //FIN MODULE JS

    /*DEBUT ZONE DE DECLARATION ResponsabiliteCivile */
    $scope.objet_envoie = [];
    $scope.FormAddResponsabiliteCivile = {
      id01: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
      code01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_NUMTIERS
        : "",
      denomination01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_DENOMINATION
        : "",
      id02: "",
      code02: "",
      Codeassureur: "",
      denomination02: "",
      N_Police: "",
      pays: "",
      ville: "",
      commune: "",
      situationGeo: "",
      intermediaire: "",
      Effet: "",
      Echeance: "",
      assureur: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
        : "",
      Interlocuteur: "",
      Telephone_interlocuteur: "",
      typeAffaire: "",
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
    $scope.FormListprime = {
      LIBELLERESUME: "",
      PRIMES: [],
    };
    $scope.listeDesExercice = [];
    $scope.listeDesPaysResponsabiliteCivile = [];
    $scope.listeDesVillesResponsabiliteCivile = [];
    $scope.listeDesCommunesResponsabiliteCivile = [];
    $scope.listeDesAssureursResponsabiliteCivile = [];
    $scope.listeTypeAffaireResponsabiliteCivile = [];
    $scope.listeContrat = [];
    $scope.listeDesCommerciaux = [];
    $scope.listeDesSouscripteurs = [];
    $scope.tabReduction = [];
    $scope.tabGarenties = [];
    $scope.tabPrimes = [];
    $scope.idElement = "";
    $scope.recupererinfoResponsabiliteCivile = [];
    $scope.test = [];
    $scope.listeIntermediaire = [];
    $scope.listeZone = [];
    $scope.listeListeCommissionResponsabiliteCivile = [];
    $scope.testEnregistrementmodif = [];
    $scope.recupererInfo = [];
    $scope.fondgri = true;
    //$scope.verou = true;
    $scope.valprimettc = 0;
    $scope.valprimenette = 0;
    $scope.valprimettcenregistrement = 0;
    $scope.valprimenettenregistrement = 0;
    $scope.listeDesGarantie = [];
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeContrat = [];
    $scope.listeContratAvecAccessoir = []
    $scope.recupererInfoAvecAccessoir = {};
    $scope.btnEnregistrer = "Enregistrer"
    /*FIN ZONE DE DECLARATION RESPO CIVILE */

    $scope.test = function () {
      alert("bojour");
    };
    /*DEBUT FONCTION GENERALE RESPO CIVILE */

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

    /*FIN FONCTION GENERALE*/

    //debut contrainte sur les champs add de ResponsabiliteCivile
    $scope.contrainteFormAddResponsabiliteCivile = function () {
      FormValidation.formValidation(
        document.getElementById("addResponsabiliteCivile"),
        {
          fields: {
            addResponsabiliteCivile_Code01: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
              },
            },
            addResponsabiliteCivile_denomination01: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la dénomination.",
                },
              },
            },
            addResponsabiliteCivile_Code02: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le code.",
                },
              },
            },
            addResponsabiliteCivile_denomination02: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la dénomination.",
                },
              },
            },
            addResponsabiliteCivile_N_Police: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° de la police.",
                },
              },
            },
            addResponsabiliteCivile_Pays: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le pays.",
                },
              },
            },
            addResponsabiliteCivile_Ville: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la ville.",
                },
              },
            },
            addResponsabiliteCivile_Commune: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner la commune.",
                },
              },
            },
            addResponsabiliteCivile_SituationGeo: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la situation géograpgique.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message:
                    "Veuillez saisir une situation géographique correcte.",
                },
              },
            },
            addResponsabiliteCivile_Intermediaire: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir lintermediaire.",
                },
              },
            },
            addResponsabiliteCivile_Effet: {
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
            addResponsabiliteCivile_Echeance: {
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
            addResponsabiliteCivile_Telephone_interlocuteur: {
              validators: {
                notEmpty: {
                  message:
                    "Veuillez saisir le numero de telephone interlocuteur.",
                },
                regexp: {
                  regexp: /^(0|[0-9]\d*)$/,
                  message: "Veuillez entrer un numéro correcte.",
                },
              },
            },
            addResponsabiliteCivile_Assureur: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner l'assureur.",
                },
              },
            },
            addResponsabiliteCivile_Interlocuteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l'interlocuteur.",
                },
              },
            },
            addResponsabiliteCivile_typeAffaire: {
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
    };
    //fin contrainte sur les champs add ResponsabiliteCivile

    //debut contrainte sur les champs liste de ResponsabiliteCivile
    $scope.contrainteFormListResponsabiliteCivile = function () {
      FormValidation.formValidation(
        document.getElementById("formListResponsabiliteCivile"),
        {
          fields: {
            listResponsabiliteCivile_PeriodeDu: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la période.",
                },
                regexp: {
                  regexp:
                    /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            listResponsabiliteCivile_PeriodeAu: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la période.",
                },
                regexp: {
                  regexp:
                    /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            listResponsabiliteCivile_NumPolice: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° de la police",
                },
              },
            },
            listResponsabiliteCivile_NumSouscripteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° du souscripteur.",
                },
              },
            },
            listResponsabiliteCivile_NomSouscripteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom du souscripteur.",
                },
              },
            },
            listResponsabiliteCivile_NumCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° du commercial.",
                },
              },
            },
            listResponsabiliteCivile_NomCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom du commercial.",
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
    //fin contrainte sur les champs liste ResponsabiliteCivile

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES ResponsabiliteCivile */

    $scope.initFormListe = function () {
      $scope.afficheModelListeExercice();
    };

    //debut initialisation add ResponsabiliteCivile
    $scope.initFormAddResponsabiliteCivile = function () {
      $scope.btnEnregistrer = "Enregistrer"
      $scope.afficheListeVilleResponsabiliteCivile($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.FormAddResponsabiliteCivile.Codeassureur = "000000"
      $scope.FormAddResponsabiliteCivile.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      $scope.afficheListegarantie();
      $scope.FormAddResponsabiliteCivile.pays = $rootScope.PAYSPARDEFAUT
       $scope.FormAddResponsabiliteCivile.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommuneResponsabiliteCivile($rootScope.VILLEPARDEFAUT)
    };

    $scope.initFormAddInfoResponsabiliteCivile = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };

    $scope.listeAnnuler = function () {
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
    };
    //fin initialisation add ResponsabiliteCivile

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/
    //debut liste Zone
    $scope.afficheListeZone = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
        .post("/Zone/ListeZone/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeZone = reponse.data;
        });
    };
    //fin liste Zone

    /*DEBUT DEV D YAYA ResponsabiliteCivile*/
    $scope.initList = function () {};

    //debut liste des villes
    $scope.afficheListeVilleResponsabiliteCivile = function (id) {
      $scope.listeDesCommunesResponsabiliteCivile = [];
      $scope.FormAddResponsabiliteCivile.commune = "";
     // $scope.FormAddResponsabiliteCivile.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
          $scope.listeDesVillesResponsabiliteCivile = reponse.data;
          if (
            $scope.listeDesVillesResponsabiliteCivile[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    $scope.afficheListeVilleResponsabiliteCivileModif = function (id) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
          $scope.listeDesVillesResponsabiliteCivile = reponse.data;
          if (
            $scope.listeDesVillesResponsabiliteCivile[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.verouVille = false;
            $scope.afficheListeCommuneResponsabiliteCivileModif(
              $scope.recupererInfo.VL_CODEVILLE
            );
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVillesResponsabiliteCivile[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesVillesResponsabiliteCivile);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVillesResponsabiliteCivile[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste des villes

    //debut liste des communes
    $scope.afficheListeCommuneResponsabiliteCivile = function (id) {
      $scope.FormAddResponsabiliteCivile.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
          $scope.listeDesCommunesResponsabiliteCivile = reponse.data;
          if (
            $scope.listeDesCommunesResponsabiliteCivile[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };

    $scope.afficheListeCommuneResponsabiliteCivileModif = function (id) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
          $scope.listeDesCommunesResponsabiliteCivile = reponse.data;
          if (
            $scope.listeDesCommunesResponsabiliteCivile[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunesResponsabiliteCivile[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunesResponsabiliteCivile);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunesResponsabiliteCivile[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste des communes

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddResponsabiliteCivile.code01 == "" &&
        $scope.FormAddResponsabiliteCivile.denomination01 == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
            SL_LIBELLEMOUCHARD: "LISTE",
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
            TI_NUMTIERS: $scope.FormAddResponsabiliteCivile.code01,
            TI_DENOMINATION: $scope.FormAddResponsabiliteCivile.denomination01,
            SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
            SL_LIBELLEMOUCHARD: "LISTE",
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
        $scope.FormAddResponsabiliteCivile.code02 == "" &&
        $scope.FormAddResponsabiliteCivile.denomination02 == ""
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
            SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
            TI_NUMTIERS: $scope.FormAddResponsabiliteCivile.code02,
            TI_DENOMINATION: $scope.FormAddResponsabiliteCivile.denomination02,
            SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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

    //debut tableau garenties
    $scope.tableauGarenties = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "09",
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
        //debut tableau primes
      $scope.tableauPrimesModif = function () {
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: "09",
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
            $scope.recupererInfo.clsCtcontratprimes = reponse.data;
            $scope.$emit("UNLOAD");
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
          
          });
      };
      //fin tableau primes
    //debut tableau de reduction

    $scope.tableauReduction = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "09",
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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

    //debut fonction reinitialisation
    $scope.reinitialise = function () {
      $(document).ready(function () {
        $("#addResponsabiliteCivile_Code01").css("background-color", "#FFFFFF");
        $("#addResponsabiliteCivile_denomination01").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_Code02").css("background-color", "#FFFFFF");
        $("#addResponsabiliteCivile_denomination02").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_N_Police").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_Pays").css("background-color", "#FFFFFF");
        $("#addResponsabiliteCivile_Ville").css("background-color", "#FFFFFF");
        $("#addResponsabiliteCivile_Commune").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_SituationGeo").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_Intermediaire").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_Effet").css("background-color", "#FFFFFF");
        $("#addResponsabiliteCivile_Echeance").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_Assureur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_Interlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_Telephone_interlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addResponsabiliteCivile_typeAffaire").css(
          "background-color",
          "#FFFFFF"
        );
        $("#idExercice").css("background-color", "#FFFFFF");

      });
      $scope.FormAddResponsabiliteCivile = {};
      $scope.initFormAddResponsabiliteCivile();
      $scope.isdisabled = false;
      $scope.anincreded = false;
      //$scope.rechargePage();
    };
    //fin fonction reinitialisation

    //Debut choix d'un souscripteur add
    $scope.choixSouscripteur = function (code, denomination, id,interlocuteur) {
      $(document).ready(function () {
        $("#addResponsabiliteCivile_Code01").css("background-color", "#EDEDED");
        $("#addResponsabiliteCivile_denomination01").css(
          "background-color",
          "#EDEDED"
        );
      });
      $scope.FormAddResponsabiliteCivile.code01 = code;
      $scope.FormAddResponsabiliteCivile.denomination01 = denomination;
      $scope.FormAddResponsabiliteCivile.id01 = id;
      $scope.FormAddResponsabiliteCivile.Interlocuteur = interlocuteur
      $scope.isdisabled = true;
    };
    //Fin choix d'un souscripteur add

    //Debut choix d'un commercial add
    $scope.choixCommercial = function (code, denomination, id) {
      $(document).ready(function () {
        $("#addResponsabiliteCivile_Code02").css("background-color", "#EDEDED");
        $("#addResponsabiliteCivile_denomination02").css(
          "background-color",
          "#EDEDED"
        );
      });
      $scope.FormAddResponsabiliteCivile.code02 = code;
      $scope.FormAddResponsabiliteCivile.denomination02 = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddResponsabiliteCivile.id02 = id;
      } else {
        $scope.FormAddResponsabiliteCivile.id02 = id;
      }
      $scope.anincreded = true;
    };
    //Fin choix d'un commercial add

    $scope.commissionfonct = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_NUMTIERS: $scope.FormAddResponsabiliteCivile.id02,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          DATEDEBUT: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
        .post(
          "/CommissionCommercial/ListeCommissionCommercial/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeListeCommissionResponsabiliteCivile = reponse.data;
          console.log($scope.listeListeCommissionResponsabiliteCivile[0].SOLDE);
        });
    };

    //Debut choix d'un souscripteur modification
    $scope.choixSouscripteurmodif = function (code, denomination, id, ad) {
      $scope.recuperer.code01 = code;
      $scope.recuperer.denomination01 = denomination;
      $scope.recuperer.id01 = id;
    };
    //Fin choix d'un souscripteur modification

    //Debut choix d'un commercial modification
    $scope.choixCommercialmodif = function (code, denomination, id) {
      $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL = code;
      $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL = denomination;
      $scope.recuperer.id02 = id;
    };
    //Fin choix d'un commercial modification

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
        $("#idCode1").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idCode2").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idEffet").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idEcheance").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idtTel").maxlength({
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
        let nouvelleDate = new Date(dateDebut);
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    $scope.dateSuperioriteFin = function (dateFin) {
      if (dateFin != "") {
        let nouvelleDate = new Date(dateFin);
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

    //debut test des types sur les grilles
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

    //debut focus sur le champ
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Codeassureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Code01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_denomination01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Code02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_denomination02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_N_Police").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Pays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Ville").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Commune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_SituationGeo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Intermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Effet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Echeance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Assureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Interlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addResponsabiliteCivile_Telephone_interlocuteur").focusin(
          function () {
            $(this).css("background-color", "#FFFFFF");
          }
        );
        $("#addResponsabiliteCivile_typeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout ResponsabiliteCivile (contrat) /a terminer (et les contraintes de date)
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddResponsabiliteCivile = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      $scope.testprime();
      $scope.calculprimettc();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      $scope.lAnneeEffet = $scope.FormAddResponsabiliteCivile.Effet.substr(
        6,
        4
      );
      $scope.leMoisEffet = $scope.FormAddResponsabiliteCivile.Effet.substr(
        3,
        2
      );
      $scope.leJourEffet = $scope.FormAddResponsabiliteCivile.Effet.substr(
        0,
        2
      );
      $scope.lAnneeEcheance =
        $scope.FormAddResponsabiliteCivile.Echeance.substr(6, 4);
      $scope.leMoisEcheance =
        $scope.FormAddResponsabiliteCivile.Echeance.substr(3, 2);
      $scope.leJourEcheance =
        $scope.FormAddResponsabiliteCivile.Echeance.substr(0, 2);

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
        $scope.FormAddResponsabiliteCivile.Effet === "" ||
        $scope.FormAddResponsabiliteCivile.Effet === undefined ||
        $scope.FormAddResponsabiliteCivile.Codeassureur === "" ||
        $scope.FormAddResponsabiliteCivile.Codeassureur === undefined ||
        $scope.FormAddResponsabiliteCivile.Echeance === "" ||
        $scope.FormAddResponsabiliteCivile.Echeance === undefined ||
        $scope.FormAddResponsabiliteCivile.situationGeo === "" ||
        $scope.FormAddResponsabiliteCivile.situationGeo === undefined ||
        $scope.FormAddResponsabiliteCivile.intermediaire === "" ||
        $scope.FormAddResponsabiliteCivile.intermediaire === undefined ||
        $scope.FormAddResponsabiliteCivile.assureur === "" ||
        $scope.FormAddResponsabiliteCivile.assureur === undefined ||
        $scope.FormAddResponsabiliteCivile.Interlocuteur === "" ||
        $scope.FormAddResponsabiliteCivile.Interlocuteur === undefined ||
        $scope.FormAddResponsabiliteCivile.code01 === "" ||
        $scope.FormAddResponsabiliteCivile.code01 === undefined ||
        $scope.FormAddResponsabiliteCivile.denomination01 === "" ||
        $scope.FormAddResponsabiliteCivile.denomination01 === undefined ||
        $scope.FormAddResponsabiliteCivile.code02 === "" ||
        $scope.FormAddResponsabiliteCivile.code02 === undefined ||
        $scope.FormAddResponsabiliteCivile.denomination02 === "" ||
        $scope.FormAddResponsabiliteCivile.denomination02 === undefined ||
        $scope.FormAddResponsabiliteCivile.N_Police === "" ||
        $scope.FormAddResponsabiliteCivile.N_Police === undefined ||
        $scope.FormAddResponsabiliteCivile.pays === "" ||
        $scope.FormAddResponsabiliteCivile.pays === undefined ||
        $scope.FormAddResponsabiliteCivile.ville === "" ||
        $scope.FormAddResponsabiliteCivile.ville === undefined ||
        $scope.FormAddResponsabiliteCivile.commune === "" ||
        $scope.FormAddResponsabiliteCivile.commune === undefined ||
        $scope.FormAddResponsabiliteCivile.Telephone_interlocuteur === "" ||
        $scope.FormAddResponsabiliteCivile.Telephone_interlocuteur ===
          undefined ||
        $scope.FormAddResponsabiliteCivile.valgarantie === "" ||
        $scope.FormAddResponsabiliteCivile.valgarantie === undefined ||
        $scope.FormAddResponsabiliteCivile.typeAffaire === "" ||
        $scope.FormAddResponsabiliteCivile.typeAffaire === undefined ||
        $scope.FormAddResponsabiliteCivile.Exercice === "" ||
        $scope.FormAddResponsabiliteCivile.Exercice === undefined 

      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddResponsabiliteCivile.valgarantie === "" ||
            $scope.FormAddResponsabiliteCivile.valgarantie === undefined
          ) {
            $("#idgarantie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddResponsabiliteCivile.Codeassureur === "" ||
            $scope.FormAddResponsabiliteCivile.Codeassureur === undefined
          ) {
            $("#Codeassureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddResponsabiliteCivile.Exercice === "" ||
            $scope.FormAddResponsabiliteCivile.Exercice === undefined
          ) {
            $("#idExercice").css("background-color", "#FFE9E0");
          }


          if (
            $scope.FormAddResponsabiliteCivile.code01 == "" ||
            $scope.FormAddResponsabiliteCivile.code01 === undefined
          ) {
            $("#addResponsabiliteCivile_Code01").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.denomination01 == "" ||
            $scope.FormAddResponsabiliteCivile.denomination01 === undefined
          ) {
            $("#addResponsabiliteCivile_denomination01").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.code02 === "" ||
            $scope.FormAddResponsabiliteCivile.code02 === undefined
          ) {
            $("#addResponsabiliteCivile_Code02").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.denomination02 === "" ||
            $scope.FormAddResponsabiliteCivile.denomination02 === undefined
          ) {
            $("#addResponsabiliteCivile_denomination02").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.Effet == "" ||
            $scope.FormAddResponsabiliteCivile.Effet === undefined
          ) {
            $("#addResponsabiliteCivile_Effet").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.Echeance == "" ||
            $scope.FormAddResponsabiliteCivile.Echeance === undefined
          ) {
            $("#addResponsabiliteCivile_Echeance").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.numPolice === "" ||
            $scope.FormAddResponsabiliteCivile.numPolice === undefined
          ) {
            $("#addResponsabiliteCivile_N_Police").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.intermediaire === "" ||
            $scope.FormAddResponsabiliteCivile.intermediaire === undefined
          ) {
            $("#addResponsabiliteCivile_Intermediaire").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.assureur === "" ||
            $scope.FormAddResponsabiliteCivile.assureur === undefined
          ) {
            $("#addResponsabiliteCivile_Assureur").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.pays === "" ||
            $scope.FormAddResponsabiliteCivile.pays === undefined
          ) {
            $("#addResponsabiliteCivile_Pays").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.ville === "" ||
            $scope.FormAddResponsabiliteCivile.ville === undefined
          ) {
            $("#addResponsabiliteCivile_Ville").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.commune === "" ||
            $scope.FormAddResponsabiliteCivile.commune === undefined
          ) {
            $("#addResponsabiliteCivile_Commune").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddResponsabiliteCivile.situationGeo === "" ||
            $scope.FormAddResponsabiliteCivile.situationGeo === undefined
          ) {
            $("#addResponsabiliteCivile_SituationGeo").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddResponsabiliteCivile.interlocuteur === "" ||
            $scope.FormAddResponsabiliteCivile.interlocuteur === undefined
          ) {
            $("#addResponsabiliteCivile_Interlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddResponsabiliteCivile.Telephone_interlocuteur === "" ||
            $scope.FormAddResponsabiliteCivile.Telephone_interlocuteur ===
              undefined
          ) {
            $("#addResponsabiliteCivile_Telephone_interlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddResponsabiliteCivile.typeAffaire === "" ||
            $scope.FormAddResponsabiliteCivile.typeAffaire === undefined
          ) {
            $("#addResponsabiliteCivile_typeAffaire").css(
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
      } else if ($scope.statutprimeenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "la prime ttc  ne doit pas être vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprime == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La prime TTC  ne doit pas être vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) == 0 ||
        parseInt($scope.valprimettc) == 0
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La prime nette ou la prime TTC ne doivent pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimettcenregistrement) == 0 ||
        parseInt($scope.valprimenettenregistrement) == 0
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La prime nette ou la prime TTC ne doit pas être nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La prime nette ne doit pas être superieure à la prime TTC";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenettenregistrement) >
        parseInt($scope.valprimettcenregistrement)
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La prime nette ne doit pas être superieure à la prime TTC";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.FormAddResponsabiliteCivile.code01) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.FormAddResponsabiliteCivile.code02) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test(
          $scope.FormAddResponsabiliteCivile.Telephone_interlocuteur
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test(
          $scope.FormAddResponsabiliteCivile.denomination01
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner une dénomination souscripteur correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test(
          $scope.FormAddResponsabiliteCivile.denomination02
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner une dénomination commercial correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test(
          $scope.FormAddResponsabiliteCivile.Interlocuteur
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un nom interlocuteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddResponsabiliteCivile.Effet) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une dates effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
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
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEcheance == "04" ||
          $scope.leMoisEcheance == "06" ||
          $scope.leMoisEcheance == "09" ||
          $scope.leMoisEcheance == "11") &&
        $scope.leJourEcheance > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddResponsabiliteCivile.Echeance) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner une dates écheance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.confirmerChampsGrillePrime($scope.tabPrimes) == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.confirmerChampsGrillePrime(
          $scope.recupererInfo.clsCtcontratprimes
        ) == true
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddResponsabiliteCivile.Effet) >=
        $scope.dateSuperioriteFin($scope.FormAddResponsabiliteCivile.Echeance)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateEffetIncorrecte();
      }else if ($scope.etatForm == "2" && ( $scope.dateSuperioriteDebut($scope.recupererInfo.CA_DATEECHEANCE) > $scope.dateSuperioriteDebut($scope.FormAddResponsabiliteCivile.Effet)
     )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addResponsabiliteCivile_Effet").css("background-color", "#FFE9E0");
        });
        
        $scope.messageErreur ="la nouvelle date d'éffet doit etre supérieur ou égale à l'ancienne date d'écheance qui est le :" + $scope.recupererInfo.CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.FormAddResponsabiliteCivile.Echeance) <=
            $scope.dateSuperioriteDebut($scope.recupererInfo.CA_DATEECHEANCE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addResponsabiliteCivile_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
        "la nouvelle date d'echeance ne doit pas identique à l'ancienne date d'echeance qui est le :" + $scope.recupererInfo.CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && (parseInt($scope.FormAddResponsabiliteCivile.Exercice) <
      parseInt($scope.recupererInfo.EX_EXERCICE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idExercice").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "le nouvel exercice doit etre supérieur ou égale à l'ancien exercice qui est :" + $scope.recupererInfo.EX_EXERCICE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.clsCtcontratprimes = [];
          for (
            var i = 0;
            i < $scope.recupererInfo.clsCtcontratprimes.length;
            i++
          ) {
            $scope.objetPrime = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
              SL_LIBELLEMOUCHARD: "MODIFICATION",
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
              $scope.recupererInfo.clsCtcontratprimes[i].RE_CODERESUME;
            $scope.objetPrime.CA_CODECONTRAT =
              $scope.recupererInfo.clsCtcontratprimes[i].CA_CODECONTRAT;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "16";//"1";
          $scope.CA_CODECONTRAT = $scope.recupererInfo.CA_CODECONTRAT;
        } else {
          $scope.clsCtcontratprimes = [];
          for (var i = 0; i < $scope.tabPrimes.length; i++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
            // $scope.objetPrime.CA_CODECONTRAT = $scope.tabPrimes[i].CA_CODECONTRAT;
            ($scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE),
              ($scope.objetPrime.clsObjetEnvoi.OE_Y =
                $rootScope.CODE_OPERATEUR);
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "0";
        }
        $scope.objet_envoie = [
          {
            CA_CODECONTRAT: $scope.CA_CODECONTRAT,
            CA_CODECONTRATORIGINE: $scope.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            RQ_CODERISQUE: "09",
            AS_NUMEROASSUREUR: $scope.FormAddResponsabiliteCivile.Codeassureur,
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            IT_CODEINTERMEDIAIRE:
              $scope.FormAddResponsabiliteCivile.intermediaire,
            EN_CODEENERGIE: "",
            CB_IDBRANCHE: "",
            CA_NUMPOLICE: $scope.FormAddResponsabiliteCivile.N_Police,
            ZM_CODEZONEVOYAGE: "",
            TA_CODETARIF: "",
            US_CODEUSAGE: "",
            GE_CODEGENRE: "",
            AU_CODECATEGORIE: "",
            TI_IDTIERSASSUREUR: $scope.FormAddResponsabiliteCivile.assureur, //"100000000005",
            CO_CODECOMMUNE: $scope.FormAddResponsabiliteCivile.commune, //"0000000013",
            CA_SITUATIONGEOGRAPHIQUE:
              $scope.FormAddResponsabiliteCivile.situationGeo,
            CA_DATEEFFET: $scope.FormAddResponsabiliteCivile.Effet, //"01-01-2020",
            CA_DATEECHEANCE: $scope.FormAddResponsabiliteCivile.Echeance, //"31-12-2020",
            CA_NOMINTERLOCUTEUR:
              $scope.FormAddResponsabiliteCivile.Interlocuteur, //"blisse",
            CA_CONTACTINTERLOCUTEUR:
              $scope.FormAddResponsabiliteCivile.Telephone_interlocuteur,
            TA_CODETYPEAFFAIRES: $scope.FormAddResponsabiliteCivile.typeAffaire, //"01",
            TI_IDTIERSCOMMERCIAL: $scope.FormAddResponsabiliteCivile.id02, //"100000000002",
            TI_IDTIERS: $scope.FormAddResponsabiliteCivile.id01, //"100000000007",
            TI_ADRESSEGEOGRAPHIQUE: "",
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
            CA_CLIENTEXONERETAXE: "N",
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATENAISSANCE: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            CD_CODECONDITION: "",
            CA_DUREEENMOIS: "0",
            AC_SPORT: "",
            CA_ADRESSE: "",
            ST_CODESTATUTSOCIOPROF: "",
            ZA_CODEZONEAUTO: "",
            GR_CODEGARENTIEPRIME:
              $scope.FormAddResponsabiliteCivile.valgarantie,
            EX_EXERCICE: $scope.FormAddResponsabiliteCivile.Exercice,
            SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
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
            clsCtcontratprimes: $scope.clsCtcontratprimes,
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
                  window.location.href = "#/assurances/responsabilite-civile";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                if (!!localStorage.getItem("collectionDemande")) {
                  localStorage.removeItem("collectionDemande");
                }
                $scope.reinitialise();
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
    };
    //Fin ajout ResponsabiliteCivile (contrat)

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
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == '01' &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == '01' &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenette =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == '05' &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == '05' &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettc =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
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
    //verification de la prime nette et ttc

    //calcul de la prime automatiquement
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
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == '05' &&
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
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME !== '05' &&
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
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == '05' &&
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
    //calcul de la prime automatiquement

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

    //debut afficher liste ResponsabiliteCivile
   
    $scope.afficheListeContrat = function (
      periodeDu,
      periodeAu,
      numPolice,
      numSouscripteur,
      nomSouscripteur,
      numCommercial,
      nomCommercial,
      Exercice
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;

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
        numPolice === undefined ||
        numSouscripteur === undefined ||
        nomSouscripteur === undefined ||
        numCommercial === undefined ||
        nomCommercial === undefined  ||
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
          if (numPolice === undefined) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (numSouscripteur === undefined) {
            $("#idNumSouscripteur").css("background-color", "#FFE9E0");
          }
          if (nomSouscripteur === undefined) {
            $("#idNomSouscripteur").css("background-color", "#FFE9E0");
          }
          if (numCommercial === undefined) {
            $("#idNumCommercial").css("background-color", "#FFE9E0");
          }
          if (nomCommercial === undefined) {
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
        $scope.messageErreur = "Veuillez renseigner une date correcte";
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
        $scope.messageErreur = "La date de début n'est pas valide";
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
        $scope.messageErreur = "La date de début n'est pas valide";
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
        $scope.messageErreur = "La date de fin n'est pas valide";
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
        $scope.messageErreur = "La date de fin n'est pas valide";
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
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeAu == "04" ||
          $scope.leMoisPeriodeAu == "06" ||
          $scope.leMoisPeriodeAu == "09" ||
          $scope.leMoisPeriodeAu == "11") &&
        $scope.leJourPeriodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
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
            RQ_CODERISQUE: "09",
            CA_NUMPOLICE: numPolice,
            TI_NUMTIERS: numSouscripteur,
            TI_DENOMINATION: nomSouscripteur,
            TI_NUMTIERSCOMMERCIAL: numCommercial,
            TI_DENOMINATIONCOMMERCIAL: nomCommercial,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            EX_EXERCICE: Exercice,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
            $scope.$emit("UNLOAD");
          });
      }
    };
    //fin afficher liste ResponsabiliteCivile
  //debut afficher liste AvecAccessoir
  $scope.afficheListeContratAvecAccessoir = function (
    idContrat,
    date,
    Exercice
   
  ) {
    $scope.$emit("LOAD");
   
   
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "09",
          CA_CODECONTRAT: idContrat,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_NUMPOLICE: "",
          TI_NUMTIERS: "",
          TI_DENOMERSCOMMERCIAL: "",
          TI_DENOMINATION: "",
          TI_NUMTIINATIONCOMMERCIAL: "",
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
            sessionStorage.setItem("modifResponsabiliteCivile", JSON.stringify($scope.recupererInfoAvecAccessoir));
            window.location.href = "#/assurances/modification/responsabilite-civile";
          }
        });
   
  };
  //fin afficher liste AvecAccessoir



    //debut voir plus ResponsabiliteCivile
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpResponsabiliteCivile", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpResponsabiliteCivile")
      );
    };
    //fin voir plus ResponsabiliteCivile

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE,info.EX_EXERCICE)
      
      console.log(info);
    };

    //debut recuperer id pour la suppression

    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimeContrat = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.idElement,
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
        .post("/Contrat/SuppressionContrat/", $scope.objet_envoie, {})
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          console.log($scope.testSuppression);
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
          $rootScope.ProblemeServeur();
        });
    };
    //fin recuperer id pour la suppression

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "ResponsabiliteCivile";
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
            $scope.afficheListeAssureurResponsabiliteCivile();
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
          RQ_CODERISQUE: "09",
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
    $scope.afficheListePaysResponsabiliteCivile = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
          $scope.listeDesPaysResponsabiliteCivile = reponse.data;
          if (
            $scope.listeDesPaysResponsabiliteCivile[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysResponsabiliteCivile[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesPaysResponsabiliteCivile);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysResponsabiliteCivile[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des assureur
    $scope.afficheListeAssureurResponsabiliteCivile = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
          $scope.listeDesAssureursResponsabiliteCivile = reponse.data;
          if (
            $scope.listeDesAssureursResponsabiliteCivile[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListePaysResponsabiliteCivile();
            
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureursResponsabiliteCivile[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureursResponsabiliteCivile);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureursResponsabiliteCivile[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste des assureur

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
            $scope.affichelisteTypeAffaireResponsabiliteCivile();
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
    $scope.affichelisteTypeAffaireResponsabiliteCivile = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
          $scope.listeTypeAffaireResponsabiliteCivile = reponse.data;
          if (
            $scope.listeTypeAffaireResponsabiliteCivile[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaireResponsabiliteCivile[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaireResponsabiliteCivile);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaireResponsabiliteCivile[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "09",
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
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
              setTimeout($scope.retourModifRespoCivile, 3600);
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
   
    //fin tableau primes
    // acceder a la page de modification
    $scope.retourModifRespoCivile = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifResponsabiliteCivile")
      );
      console.log($scope.recupererInfo);
      $scope.isdisabled = true;
      $scope.anincreded = false;

      if($scope.recupererInfo.EX_EXERCICE == undefined || $scope.recupererInfo.EX_EXERCICE == "" || $scope.recupererInfo.EX_EXERCICE == null){
        $scope.FormAddResponsabiliteCivile.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      }else{
        $scope.FormAddResponsabiliteCivile.Exercice = $scope.recupererInfo.EX_EXERCICE;
      }
      $scope.FormAddResponsabiliteCivile.Codeassureur = $scope.recupererInfo.AS_NUMEROASSUREUR;
      $scope.FormAddResponsabiliteCivile.code01 =
        $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddResponsabiliteCivile.denomination01 =
        $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddResponsabiliteCivile.code02 =
        $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddResponsabiliteCivile.denomination02 =
        $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddResponsabiliteCivile.N_Police =
        $scope.recupererInfo.CA_NUMPOLICE;
      $scope.FormAddResponsabiliteCivile.intermediaire =
        $scope.recupererInfo.IT_CODEINTERMEDIAIRE;
      $scope.FormAddResponsabiliteCivile.id01 = $scope.recupererInfo.TI_IDTIERS;
      $scope.FormAddResponsabiliteCivile.id02 =
        $scope.recupererInfo.TI_IDTIERSCOMMERCIAL;
      $scope.FormAddResponsabiliteCivile.pays =
        $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddResponsabiliteCivile.ville =
        $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddResponsabiliteCivile.commune =
        $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddResponsabiliteCivile.situationGeo =
        $scope.recupererInfo.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddResponsabiliteCivile.Effet =
        $scope.recupererInfo.CA_DATEEFFET;
      $scope.FormAddResponsabiliteCivile.Echeance =
        $scope.recupererInfo.CA_DATEECHEANCE;
      $scope.FormAddResponsabiliteCivile.assureur =
        $scope.recupererInfo.TI_IDTIERSASSUREUR;
      $scope.FormAddResponsabiliteCivile.Interlocuteur =
        $scope.recupererInfo.CA_NOMINTERLOCUTEUR;
      $scope.FormAddResponsabiliteCivile.Telephone_interlocuteur =
        $scope.recupererInfo.CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddResponsabiliteCivile.typeAffaire =
        $scope.recupererInfo.TA_CODETYPEAFFAIRES;
      $scope.FormAddResponsabiliteCivile.valgarantie =
        $scope.recupererInfo.GR_CODEGARENTIEPRIME;

      $scope.afficheListeVilleResponsabiliteCivileModif(
        $scope.recupererInfo.PY_CODEPAYS
      );

      if($scope.recupererInfo.clsCtcontratprimes.length <= 1){
        $scope.tableauPrimesModif()
      }
    };
    // acceder a la page de modification

    // DEBUT COMBOS

    /* FIN DEV D.YAYA AUTO*/
  },
]);
