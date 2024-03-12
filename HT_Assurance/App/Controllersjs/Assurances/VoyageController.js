MapharApp.controller("VoyageController", [
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

    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];
    $scope.FormAddVoyage = {
      code01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_NUMTIERS
        : "",
      denomination01: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_DENOMINATION
        : "",
      code02: "",
      denomination02: "",
      numPolice: "",
      pays: "",
      ville: "",
      commune: "",
      situationGeo: "",
      intermediaire: "",
      Effet: "",
      Echeance: "",
      zone: "",
      //"duree": "",
      // "typeDeTarification": "",
      assureur: "",
      interlocuteur: "",
      telInterlocuteur: "",
      typeAffaire: "",
      id01: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
      id02: "",
      numPasseport: "",
      paysDeDestination: "",
      dureeDuSejour: "",
      option: "",
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
    //$scope.listeDuree = [];
    $scope.listeDesExercice = [];
    $scope.listeTypeAffaire = [];
    $scope.listeAssureur = [];
    $scope.listeDesPays = [];
    $scope.listeDesVilles = [];
    $scope.listeDesCommunes = [];
    $scope.listeContrat = [];
    $scope.tabReduction = [];
    $scope.tabPrimes = [];
    //$scope.listeTypeDeTarification = [];
    $scope.listePaysDeDestination = [];
    $scope.testSuppression = [];
    $scope.recupererInfo = [];

    $scope.fondgri = true;
    //$scope.verou = true;
    $scope.testEnregistrement = [];
    $scope.valprimettc = 0;
    $scope.valprimenette = 0;
    $scope.valprimettcenregistrement = 0;
    $scope.valprimenettenregistrement = 0;
    $scope.listeDesGarantie = [];
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.btnEnregistrer = "Enregistrer"
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

    $scope.ecranVoyage = "voyage";

    /*FIN FONCTION GENERALE*/

    //debut contrainte sur les champs add voyage
    $scope.contrainteFormAddVoyage = function () {
      FormValidation.formValidation(document.getElementById("addVoyage"), {
        fields: {
          addVoyage_Code01: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code.",
              },
            },
          },
          addVoyage_denomination01: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
            },
          },
          addVoyage_Code02: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code.",
              },
            },
          },
          addVoyage_denomination02: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
            },
          },
          addVoyage_N_Police: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le n° de la police.",
              },
            },
          },
          addVoyage_Pays: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le pays.",
              },
            },
          },
          addVoyage_Ville: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la ville.",
              },
            },
          },
          addVoyage_Commune: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la commune.",
              },
            },
          },
          addVoyage_Situation_géographique: {
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
          addVoyage_Intermediaire: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le nom de l'intermédiaire.",
              },
            },
          },
          addVoyage_Effet: {
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
          addVoyage_Echeance: {
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
          addVoyage_Zone: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la zone.",
              },
            },
          },
          //addVoyage_Duree: {
          //    validators: {
          //        notEmpty: {
          //            message: 'Veuillez saisir la durée.'
          //        },
          //    }
          //},
          //addVoyage_typeDeTarification: {
          //    validators: {
          //        notEmpty: {
          //            message: 'Veuillez sélectionner le type de tarification.'
          //        },
          //    }
          //},
          addVoyage_Assureur: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner l'assureur.",
              },
            },
          },
          addVoyage_typeAffaire: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le type d'affaire.",
              },
            },
          },
          addVoyage_interlocuteur: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner l'interlocuteur.",
              },
            },
          },
          addVoyage_telephoneInterlocuteur: {
            validators: {
              notEmpty: {
                message:
                  "Veuillez sélectionner le telephone de l'interlocuteur.",
              },
              regexp: {
                regexp: /^(0|[0-9]\d*)$/,
                message: "Veuillez entrer un numéro correcte.",
              },
            },
          },
          addVoyage_numPasseport: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le n° du passeport.",
              },
            },
          },
          addVoyage_paysDeDestination: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le pays de destination.",
              },
            },
          },
          addVoyage_dureeDuSejour: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la durée du séjour.",
              },
            },
          },
          addVoyage_option: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner l'option.",
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
    //fin contrainte sur les champs add voyage

    //debut contrainte sur les champs list de Voyage
    $scope.contrainteFormListVoyage = function () {
      let IDlisteContrat = document.getElementById("formListVoyage");
      alert(IDlisteContrat);
      FormValidation.formValidation(IDlisteContrat, {
        fields: {
          listVoyage_PeriodeAu: {
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
        },
      });
    };
    //fin contrainte sur les champs list de Voyage
    $scope.initFormListe = function () {
      $scope.afficheModelListeExercice();
    };
    //debut initialisation add Voyage
    $scope.initFormAddVoyage = function () {
      $scope.btnEnregistrer = "Enregistrer"
      $scope.afficheListeVilles($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.FormAddVoyage.Codeassureur = "000000"
      $scope.FormAddVoyage.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      $scope.afficheListegarantie();
      $scope.FormAddVoyage.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddVoyage.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommunes($rootScope.VILLEPARDEFAUT)
    };
    //fin initialisation add voyage

    //Debut initialisation modif voyage
    $scope.initFormAddModifVoyage = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };
    //fin initialisation modif voyage

    //DEBUT DEVELOPPEMENT YAYA//

    //debut liste des villes
    $scope.afficheListeVilles = function (id) {
      $scope.listeDesCommunes = [];
      $scope.FormAddVoyage.commune = "";
     // $scope.FormAddVoyage.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: "VOYAGE",
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
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    $scope.afficheListeVillesModif = function (id) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: "VOYAGE",
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
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.verouVille = false;
            $scope.afficheListeCommunesModif($scope.recupererInfo.VL_CODEVILLE);
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
    //fin liste des villes

    //debut liste des communes
    $scope.afficheListeCommunes = function (id) {
      $scope.FormAddVoyage.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "VOYAGE",
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

    $scope.afficheListeCommunesModif = function (id) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "VOYAGE",
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
    //fin liste des communes

    //debut tableau de reduction
    $scope.tableauReduction = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "04",
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
        .post("/Reduction/ListeReduction/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabReduction = reponse.data;
        });
    };
    //fin tableau de reduction

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id,interlocuteur) {
      $(document).ready(function () {
        $("#addVoyage_Code01").css("background-color", "#EDEDED");
        $("#addVoyage_denomination01").css("background-color", "#EDEDED");
      });
      $scope.FormAddVoyage.code01 = code;
      $scope.FormAddVoyage.denomination01 = denomination;
      $scope.FormAddVoyage.id01 = id;
      $scope.FormAddVoyage.interlocuteur = interlocuteur;
      $scope.isdisabled = true;
    };
    //Fin choix d'un souscripteur

    //debut fonction reinitialisation et rafraichir les champs de la fenetre d'enregistrement
    $scope.reinitialise = function () {
      $(document).ready(function () {
        $("#addVoyage_Code01").css("background-color", "#FFFFFF");
        $("#addVoyage_denomination01").css("background-color", "#FFFFFF");
        $("#addVoyage_Code02").css("background-color", "#FFFFFF");
        $("#addVoyage_denomination02").css("background-color", "#FFFFFF");
        $("#addVoyage_N_Police").css("background-color", "#FFFFFF");
        $("#addVoyage_Pays").css("background-color", "#FFFFFF");
        $("#addVoyage_Ville").css("background-color", "#FFFFFF");
        $("#addVoyage_Commune").css("background-color", "#FFFFFF");
        $("#addVoyage_Situation_géographique").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addVoyage_Intermediaire").css("background-color", "#FFFFFF");
        $("#addVoyage_Effet").css("background-color", "#FFFFFF");
        $("#addVoyage_Echeance").css("background-color", "#FFFFFF");
        $("#addVoyage_Zone").css("background-color", "#FFFFFF");
        $("#addVoyage_Assureur").css("background-color", "#FFFFFF");
        $("#addVoyage_interlocuteur").css("background-color", "#FFFFFF");
        $("#addVoyage_telephoneInterlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addVoyage_typeAffaire").css("background-color", "#FFFFFF");
        $("#addVoyage_numPasseport").css("background-color", "#FFFFFF");
        $("#addVoyage_paysDeDestination").css("background-color", "#FFFFFF");
        $("#addVoyage_dureeDuSejour").css("background-color", "#FFFFFF");
        $("#addVoyage_option").css("background-color", "#FFFFFF");
        $("#idExercice").css("background-color", "#FFFFFF");
      });
      $scope.FormAddVoyage = {};
      $scope.initFormAddVoyage();
      $scope.isdisabled = false;
      $scope.anincreded = false;
      // $scope.rechargePage();
    };
    //fin fonction reinitialisation et rafraichir les champs de la fenetre d'enregistrement

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $(document).ready(function () {
        $("#addVoyage_Code02").css("background-color", "#EDEDED");
        $("#addVoyage_denomination02").css("background-color", "#EDEDED");
      });
      $scope.FormAddVoyage.code02 = code;
      $scope.FormAddVoyage.denomination02 = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddVoyage.id02 = id;
      } else {
        $scope.FormAddVoyage.id02 = id;
      }
      $scope.anincreded = true;
    };
    //Fin choix d'un commercial

    //Debut choix d'un souscripteur
    $scope.choixSouscripteurmodif = function (code, denomination, id) {
      $scope.recuperer.code01 = code;
      $scope.recuperer.denomination01 = denomination;
      $scope.recuperer.id01 = id;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercialmodif = function (code, denomination, id) {
      $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL = code;
      $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL = denomination;
      $scope.recuperer.id02 = id;
    };
    //Fin choix d'un commercial

    //debut voir plus voyage
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpVoyage", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpVoyage"));
      console.log($scope.recuperer);
    };
    //fin voir plus voyage

    //debut recuperer id pour la suppression du contrat
    $scope.idElement = "";
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du contrat

    //debut recuperer id pour la suppression

    $scope.supprimeContrat = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.idElement,
          SL_LIBELLEECRAN: "VOYAGE",
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
    //debut recuperer id pour la suppression

    //debut acceder a la page de modification Voyage
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE, info.EX_EXERCICE)
    
    };
    //fin acceder a la page de modification Voyage

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idNumSouscripteur").css("background-color", "#FFFFFF");
        $("#idNomSouscripteur").css("background-color", "#FFFFFF");
        $("#idNumCommercial").css("background-color", "#FFFFFF");
        $("#idNomCommercial").css("background-color", "#FFFFFF");
        $("#idExercice").css("background-color", "#FFFFFF");
      });
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
    };
    //fin pour annuler la recherche

    //debut liste des souscripteurs
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddVoyage.code01 == "" &&
        $scope.FormAddVoyage.denomination01 == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "VOYAGE",
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
            TI_NUMTIERS: $scope.FormAddVoyage.code01,
            TI_DENOMINATION: $scope.FormAddVoyage.denomination01,
            SL_LIBELLEECRAN: "VOYAGE",
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
    //fin liste des souscripteurs

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddVoyage.code2 == "" &&
        $scope.FormAddVoyage.denomination2 == ""
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
            SL_LIBELLEECRAN: "VOYAGE",
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
            TI_NUMTIERS: $scope.FormAddVoyage.code02,
            TI_DENOMINATION: $scope.FormAddVoyage.denomination02,
            SL_LIBELLEECRAN: "VOYAGE",
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
    //fin liste des comerciaux

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

    // DEBUT ANNEE BISSEXTILE
    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };
    //FIN ANNEE BISSEXTILE

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
        $("#addVoyage_Code01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_denomination01").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Code02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_denomination02").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_N_Police").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Pays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Ville").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Commune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Situation_géographique").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Intermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Effet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Echeance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Zone").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_Assureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_interlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_telephoneInterlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_typeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_numPasseport").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_paysDeDestination").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_dureeDuSejour").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addVoyage_option").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    /* $scope.nombreDeJour = function (date1, date2) {
      let effet = new Date(date1);
      let echeance = new Date(date2);
      let diffDate = echeance.getTime() - effet.getTime();
      let msInDate = 1000 * 3600 * 24;
      $scope.leNombreDeJour = diffDate / msInDate;
      return $scope.leNombreDeJour;
    }; */

    //Debut ajout voyage  /a terminer
    $scope.ajoutFormAddVoyage = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      $scope.testprime();
      $scope.calculprimettc();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      $scope.lAnneeEffet = $scope.FormAddVoyage.Effet.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddVoyage.Effet.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddVoyage.Effet.substr(0, 2);
      $scope.lAnneeEcheance = $scope.FormAddVoyage.Echeance.substr(6, 4);
      $scope.leMoisEcheance = $scope.FormAddVoyage.Echeance.substr(3, 2);
      $scope.leJourEcheance = $scope.FormAddVoyage.Echeance.substr(0, 2);

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
        $scope.FormAddVoyage.code01 == "" ||
        $scope.FormAddVoyage.code01 === undefined ||
        $scope.FormAddVoyage.Codeassureur === "" ||
        $scope.FormAddVoyage.Codeassureur === undefined ||
        $scope.FormAddVoyage.denomination01 == "" ||
        $scope.FormAddVoyage.denomination01 === undefined ||
        $scope.FormAddVoyage.code02 == "" ||
        $scope.FormAddVoyage.code02 === undefined ||
        $scope.FormAddVoyage.denomination02 == "" ||
        $scope.FormAddVoyage.denomination02 === undefined ||
        $scope.FormAddVoyage.Effet == "" ||
        $scope.FormAddVoyage.Effet === undefined ||
        $scope.FormAddVoyage.Echeance == "" ||
        $scope.FormAddVoyage.Echeance === undefined ||
        $scope.FormAddVoyage.numPolice === "" ||
        $scope.FormAddVoyage.numPolice === undefined ||
        $scope.FormAddVoyage.intermediaire === "" ||
        $scope.FormAddVoyage.intermediaire === undefined ||
        $scope.FormAddVoyage.zone === "" ||
        $scope.FormAddVoyage.zone === undefined ||
        $scope.FormAddVoyage.pays === "" ||
        $scope.FormAddVoyage.pays === undefined ||
        $scope.FormAddVoyage.ville === "" ||
        $scope.FormAddVoyage.ville === undefined ||
        $scope.FormAddVoyage.commune === "" ||
        $scope.FormAddVoyage.commune === undefined ||
        $scope.FormAddVoyage.situationGeo === "" ||
        $scope.FormAddVoyage.situationGeo === undefined ||
        $scope.FormAddVoyage.assureur === "" ||
        $scope.FormAddVoyage.assureur === undefined ||
        $scope.FormAddVoyage.interlocuteur === "" ||
        $scope.FormAddVoyage.interlocuteur === undefined ||
        $scope.FormAddVoyage.telInterlocuteur === "" ||
        $scope.FormAddVoyage.telInterlocuteur === undefined ||
        $scope.FormAddVoyage.typeAffaire === "" ||
        $scope.FormAddVoyage.typeAffaire === undefined ||
        $scope.FormAddVoyage.numPasseport === "" ||
        $scope.FormAddVoyage.numPasseport === undefined ||
        $scope.FormAddVoyage.paysDeDestination === "" ||
        $scope.FormAddVoyage.paysDeDestination === undefined ||
        $scope.FormAddVoyage.dureeDuSejour === "" ||
        $scope.FormAddVoyage.dureeDuSejour === undefined ||
        $scope.FormAddVoyage.Exercice === "" ||
        $scope.FormAddVoyage.Exercice === undefined 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddVoyage.code01 == "" ||
            $scope.FormAddVoyage.code01 === undefined
          ) {
            $("#addVoyage_Code01").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddVoyage.Codeassureur === "" ||
            $scope.FormAddVoyage.Codeassureur === undefined
          ) {
            $("#Codeassureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddVoyage.Exercice === "" ||
            $scope.FormAddVoyage.Exercice === undefined
          ) {
            $("#idExercice").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.denomination01 == "" ||
            $scope.FormAddVoyage.denomination01 === undefined
          ) {
            $("#addVoyage_denomination01").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.code02 === "" ||
            $scope.FormAddVoyage.code02 === undefined
          ) {
            $("#addVoyage_Code02").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.denomination02 === "" ||
            $scope.FormAddVoyage.denomination02 === undefined
          ) {
            $("#addVoyage_denomination02").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.Effet == "" ||
            $scope.FormAddVoyage.Effet === undefined
          ) {
            $("#addVoyage_Effet").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.Echeance == "" ||
            $scope.FormAddVoyage.Echeance === undefined
          ) {
            $("#addVoyage_Echeance").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.numPolice === "" ||
            $scope.FormAddVoyage.numPolice === undefined
          ) {
            $("#addVoyage_N_Police").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.intermediaire === "" ||
            $scope.FormAddVoyage.intermediaire === undefined
          ) {
            $("#addVoyage_Intermediaire").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.zone === "" ||
            $scope.FormAddVoyage.zone === undefined
          ) {
            $("#addVoyage_Zone").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.pays === "" ||
            $scope.FormAddVoyage.pays === undefined
          ) {
            $("#addVoyage_Pays").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.ville === "" ||
            $scope.FormAddVoyage.ville === undefined
          ) {
            $("#addVoyage_Ville").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.commune === "" ||
            $scope.FormAddVoyage.commune === undefined
          ) {
            $("#addVoyage_Commune").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddVoyage.situationGeo === "" ||
            $scope.FormAddVoyage.situationGeo === undefined
          ) {
            $("#addVoyage_Situation_géographique").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddVoyage.assureur === "" ||
            $scope.FormAddVoyage.assureur === undefined
          ) {
            $("#addVoyage_Assureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddVoyage.interlocuteur === "" ||
            $scope.FormAddVoyage.interlocuteur === undefined
          ) {
            $("#addVoyage_interlocuteur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddVoyage.telInterlocuteur === "" ||
            $scope.FormAddVoyage.assureur === undefined
          ) {
            $("#addVoyage_telephoneInterlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddVoyage.typeAffaire === "" ||
            $scope.FormAddVoyage.typeAffaire === undefined
          ) {
            $("#addVoyage_typeAffaire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddVoyage.numPasseport === "" ||
            $scope.FormAddVoyage.numPasseport === undefined
          ) {
            $("#addVoyage_numPasseport").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddVoyage.paysDeDestination === "" ||
            $scope.FormAddVoyage.paysDeDestination === undefined
          ) {
            $("#addVoyage_paysDeDestination").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddVoyage.dureeDuSejour === "" ||
            $scope.FormAddVoyage.dureeDuSejour === undefined
          ) {
            $("#addVoyage_dureeDuSejour").css("background-color", "#FFE9E0");
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
        $scope.messageErreur = "La prime TTC ne doit pas être vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprime == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La prime TTC ne doit pas être vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) == 0 ||
        parseInt($scope.valprimettc) == 0
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La prime nette ou la prime TTC ne doit pas être nulle";
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
      } else if (typeNumerique.test($scope.FormAddVoyage.code01) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $("#addVoyage_Code01").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeNumerique.test($scope.FormAddVoyage.code02) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $("#addVoyage_Code02").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormAddVoyage.numPolice == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un numéro police correct";
        $("#addVoyage_N_Police").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddVoyage.telInterlocuteur) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $("#addVoyage_telephoneInterlocuteur").css(
          "background-color",
          "#FFE9E0"
        );
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddVoyage.denomination01) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner une dénomination souscripteur correcte";
        $("#addVoyage_denomination01").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddVoyage.denomination02) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner une dénomination commercial correcte";
        $("#addVoyage_denomination02").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddVoyage.interlocuteur) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un nom interlocuteur correct";
        $("#addVoyage_interlocuteur").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddVoyage.Effet) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date effet correcte";
        $("#addVoyage_Effet").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == true &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $("#addVoyage_Effet").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $("#addVoyage_Effet").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddVoyage.Echeance) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date échéance correcte";
        $("#addVoyage_Echeance").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == true &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $("#addVoyage_Echeance").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $("#addVoyage_Echeance").css("background-color", "#FFE9E0");
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
        $("#addVoyage_Effet").css("background-color", "#FFE9E0");
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
        $("#addVoyage_Echeance").css("background-color", "#FFE9E0");
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
        $scope.dateSuperioriteDebut($scope.FormAddVoyage.Effet) >=
        $scope.dateSuperioriteFin($scope.FormAddVoyage.Echeance)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateEffetIncorrecte();
        $scope.testEnregistrement = "";
      } /* else if (
        $scope.nombreDeJour(
          $scope.FormAddVoyage.Effet,
          $scope.FormAddVoyage.Echeance
        ) != $scope.FormAddVoyage.dureeDuSejour
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La durée du voyage doit être comprise dans la période de validité du contrat";
        $("#addVoyage_dureeDuSejour").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } */else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.recupererInfo.CA_DATEECHEANCE) > $scope.dateSuperioriteDebut($scope.FormAddVoyage.Effet)
      )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addVoyage_Effet").css("background-color", "#FFE9E0");
        });
        
        $scope.messageErreur ="la nouvelle date d'éffet doit etre supérieur ou égale à l'ancienne date d'écheance qui est le :" + $scope.recupererInfo.CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.FormAddVoyage.Echeance) <=
            $scope.dateSuperioriteDebut($scope.recupererInfo.CA_DATEECHEANCE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addVoyage_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
        "la nouvelle date d'echeance ne doit pas identique à l'ancienne date d'echeance qui est le :" + $scope.recupererInfo.CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && (parseInt($scope.FormAddVoyage.Exercice) <
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
              SL_LIBELLEECRAN: "VOYAGE",
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
              SL_LIBELLEECRAN: "VOYAGE",
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
            EN_CODEENTREPOT: $rootScope.CODE_OPERATEUR,
            CA_NUMPOLICE: $scope.FormAddVoyage.numPolice,
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_IDTIERS: $scope.FormAddVoyage.id01,
            IT_CODEINTERMEDIAIRE: $scope.FormAddVoyage.intermediaire,
            AP_CODETYPEAPPARTEMENT: "",
            OC_CODETYPEOCCUPANT: "",
            ZM_CODEZONEMALADIE: "",
            ZA_CODEZONEAUTO: "",
            ZM_CODEZONEVOYAGE: $scope.FormAddVoyage.zone,
            CB_IDBRANCHE: "",
            CA_DATEEFFET: $scope.FormAddVoyage.Effet,
            CA_DATEECHEANCE: $scope.FormAddVoyage.Echeance,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CA_AVENANT: "",
            CA_SITUATIONGEOGRAPHIQUE: $scope.FormAddVoyage.situationGeo,
            CA_CONDITIONHABITUEL: "",
            ST_CODESTATUTSOCIOPROF: "",
            //"DU_CODEDUREE": $scope.FormAddVoyage.duree,
            AU_CODECATEGORIE: "",
            //"TA_CODETARIF": $scope.FormAddVoyage.typeDeTarification,
            US_CODEUSAGE: "",
            GE_CODEGENRE: "",
            TVH_CODETYPE: "",
            EN_CODEENERGIE: "",
            CA_TAUX: "0",
            CA_TYPE: "",
            CA_NUMSERIE: "1000",
            CA_IMMATRICULATION: "IMMAT",
            CA_PUISSANCEADMISE: "0",
            CA_CHARGEUTILE: "0",
            CA_NBREPLACE: "0",
            CA_VALNEUVE: "0",
            CA_VALVENALE: "0",
            CA_DATEMISECIRCULATION: "01-01-1900",
            CA_DATENAISSANCE: "01-01-1900",
            CA_CLIENTEXONERETAXE: "N",
            TI_IDTIERSCOMMERCIAL: $scope.FormAddVoyage.id02,
            TI_IDTIERSASSUREUR: $scope.FormAddVoyage.assureur,
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            CA_NOMINTERLOCUTEUR: $scope.FormAddVoyage.interlocuteur,
            CA_CONTACTINTERLOCUTEUR: $scope.FormAddVoyage.telInterlocuteur,
            DI_CODEDESIGNATION: "01",
            TA_CODETYPECONTRATSANTE: "",
            CA_CODECONTRATSECONDAIRE: "",
            AS_NUMEROASSUREUR: $scope.FormAddVoyage.Codeassureur,
            CO_CODECOMMUNE: $scope.FormAddVoyage.commune,
            RQ_CODERISQUE: "04",
            TA_CODETYPEAFFAIRES: $scope.FormAddVoyage.typeAffaire,
            CA_NUMPASSEPORT: $scope.FormAddVoyage.numPasseport,
            PY_CODEPAYSDESTINATION: $scope.FormAddVoyage.paysDeDestination,
            CA_DUREESEJOUR: $scope.FormAddVoyage.dureeDuSejour,
            CA_OPTION: $scope.FormAddVoyage.option,
            GR_CODEGARENTIEPRIME: $scope.FormAddVoyage.valgarantie,
            EX_EXERCICE: $scope.FormAddVoyage.Exercice,
            SL_LIBELLEECRAN: "VOYAGE",
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
                  window.location.href = "#/assurances/voyage";
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
              $rootScope.EnregistrementNonReussi(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur();
          });
      }
    };
    //Fin ajout voyage (contrat)

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

    //debut affiche liste contrat
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
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            RQ_CODERISQUE: "04",
            EX_EXERCICE: Exercice,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "VOYAGE",
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
            console.log($scope.listeContrat);
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
    //fin affiche liste contrat


  //debut afficher liste AvecAccessoir
  $scope.afficheListeContratAvecAccessoir = function (
    idContrat,
    date,
    Exercice
  ) {
    $scope.$emit("LOAD");
   
   
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "04",
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
            sessionStorage.setItem("modifVoyage", JSON.stringify($scope.recupererInfoAvecAccessoir));
            window.location.href = "#/assurances/modification/voyage";
          }
        });
   
  };
  //fin afficher liste AvecAccessoir


    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "Voyage";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBOS


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
            $scope.afficheListePays();
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
          RQ_CODERISQUE: "04",
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
    $scope.afficheListePays = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "VOYAGE",
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

    //debut liste assureur
    $scope.afficheListeAssureur = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: "VOYAGE",
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
          $scope.listeAssureur = reponse.data;
          if ($scope.listeAssureur[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeZone();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeAssureur[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeAssureur);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeAssureur[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste assureur

    //debut liste Zone
    $scope.afficheListeZone = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "VOYAGE",
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
        .post("/ZoneVoyage/ListeZoneVoyage/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeZone = reponse.data;
          if ($scope.listeZone[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeZone[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeZone);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeZone[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste Zone

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "04",
          SL_LIBELLEECRAN: "VOYAGE",
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
            $scope.afficheListeIntermediaire();
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
          $scope.recupererInfo.clsCtcontratprimes = reponse.data;
          $scope.$emit("UNLOAD");
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
        
        });
    };
    //fin tableau primes
    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "VOYAGE",
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
            $scope.afficheListeTypeAffaire();
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
    $scope.afficheListeTypeAffaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "VOYAGE",
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
          $scope.listeTypeAffaire = reponse.data;
          if (
            $scope.listeTypeAffaire[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListePaysDeDestination();
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

    //debut liste des Pays de destination
    $scope.afficheListePaysDeDestination = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "VOYAGE",
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
          $scope.listePaysDeDestination = reponse.data;
          if (
            $scope.listePaysDeDestination[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifVoyage, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listePaysDeDestination[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listePaysDeDestination);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listePaysDeDestination[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des Pays de destination

    //debut acceder a la page de modification
    $scope.retourModifVoyage = function (info) {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifVoyage"));
      console.log($scope.recupererInfo);
      $scope.isdisabled = true;
      $scope.anincreded = false;

      if($scope.recupererInfo.EX_EXERCICE == undefined || $scope.recupererInfo.EX_EXERCICE == "" || $scope.recupererInfo.EX_EXERCICE == null){
        $scope.FormAddVoyage.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      }else{
        $scope.FormAddVoyage.Exercice = $scope.recupererInfo.EX_EXERCICE;
      }

      $scope.FormAddVoyage.Codeassureur = $scope.recupererInfo.AS_NUMEROASSUREUR;
      $scope.FormAddVoyage.code01 = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddVoyage.denomination01 =
        $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddVoyage.code02 = $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddVoyage.denomination02 =
        $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddVoyage.numPolice = $scope.recupererInfo.CA_NUMPOLICE;
      $scope.FormAddVoyage.intermediaire =
        $scope.recupererInfo.IT_CODEINTERMEDIAIRE;
      $scope.FormAddVoyage.pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddVoyage.id01 = $scope.recupererInfo.TI_IDTIERS;
      $scope.FormAddVoyage.id02 = $scope.recupererInfo.TI_IDTIERSCOMMERCIAL;
      $scope.FormAddVoyage.ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddVoyage.commune = $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddVoyage.situationGeo =
        $scope.recupererInfo.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddVoyage.Effet = $scope.recupererInfo.CA_DATEEFFET;
      $scope.FormAddVoyage.Echeance = $scope.recupererInfo.CA_DATEECHEANCE;
      $scope.FormAddVoyage.zone = $scope.recupererInfo.ZM_CODEZONEVOYAGE;
      //$scope.FormAddVoyage.duree = $scope.recupererInfo.DU_CODEDUREE;
      $scope.FormAddVoyage.assureur = $scope.recupererInfo.TI_IDTIERSASSUREUR;
      $scope.FormAddVoyage.interlocuteur =
        $scope.recupererInfo.CA_NOMINTERLOCUTEUR;
      $scope.FormAddVoyage.telInterlocuteur =
        $scope.recupererInfo.CA_CONTACTINTERLOCUTEUR;
      //$scope.FormAddVoyage.typeDeTarification = $scope.recupererInfo.TA_CODETARIF;
      $scope.FormAddVoyage.typeAffaire =
        $scope.recupererInfo.TA_CODETYPEAFFAIRES;
      $scope.FormAddVoyage.numPasseport = $scope.recupererInfo.CA_NUMPASSEPORT;
      $scope.FormAddVoyage.paysDeDestination =
        $scope.recupererInfo.PY_CODEPAYSDESTINATION;
      $scope.FormAddVoyage.dureeDuSejour = $scope.recupererInfo.CA_DUREESEJOUR;
      $scope.FormAddVoyage.option = $scope.recupererInfo.CA_OPTION;
      $scope.FormAddVoyage.valgarantie =
        $scope.recupererInfo.GR_CODEGARENTIEPRIME;

      $scope.afficheListeVillesModif($scope.recupererInfo.PY_CODEPAYS);
      if($scope.recupererInfo.clsCtcontratprimes.length <= 1){
        $scope.tableauPrimesModif()
      }
    };
    //fin acceder a la page de modification
    // FIN COMBOS

    //FIN DEVELOPPEMENT YAYA//
  },
]);
