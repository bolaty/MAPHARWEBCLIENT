MapharApp.controller("MultirisqueImmeubleController", [
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
    $scope.FormAddHabitat = {
      id1: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
      code1: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_NUMTIERS : "",
      denomination1: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_DENOMINATION
        : "",
      id2: "",
      code2: "",
      denomination2: "",
      intermediaire: "",
      pays: "",
      ville: "",
      commune: "",
      situationGeo: "",
      typeAppartement: "",
      nombrePiece: "",
      Superficie: "",
      loyerMensuel: "",
      assureur: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
        : "",
      effet: "",
      echeance: "",
      interlocuteur: "",
      telInterlocuteur: "",
      typeAffaire: "",
      typeOccupant: "",
      idModif1: "",
      idModif2: "",
      valgarantie: "",
      garanties: [],
      primes: [],
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

    $scope.FormListPrime = {
      libelle: "",
      primes: [],
      risque: "",
      valeur: "",
      taux: "",
      primes: "",
      libelle: "",
    };

    $scope.FormListGarentie = [
      {
        garantie: "",
        "non garantie": "",
        primes: "",
        //"apresReduction": "",
        //"prorata": "",
        //"capitauxAssures": "",
        //"franchises": ""
      },
    ];

    $scope.FormListCapitaux = [
      {
        risque: "",
        capitaux: "",
        primes: "",
        taux: "",
      },
    ];

    $scope.listePaysHabitat = [];
    $scope.listeVillesHabitat = [];
    $scope.listeCommunesHabitat = [];
    $scope.objet_envoie = [];
    $scope.listeAssureursHabitat = [];
    $scope.listeDesSouscripteurs = [];
    $scope.listeDesCommerciaux = [];
    $scope.tabGarentiesHabitat = [];
    $scope.tabPrimesHabitat = [];
    $scope.tabCapitauxHabitat = [];
    $scope.modifListeVille = [];
    $scope.modifListeCommune = [];
    $scope.listeTypeOccupant = [];
    $scope.listeIntermediaire = [];
    $scope.listeTypeAffaireHabitat = [];
    $scope.listeTypeAppartement = [];
    $scope.listeContrat = [];
    $scope.idHabitat = [];
    $scope.testSuppression = [];
    $scope.testAjout = [];
    $scope.testModification = [];
    $scope.recuperer = [];
    $scope.recupererInfo = {};
    $scope.valprimettc = 0;
    $scope.valprimenette = 0;
    $scope.valprimettcenregistrement = 0;
    $scope.valprimenettenregistrement = 0;
    //$scope.listeDesDureeHabitat = [];
    $scope.verouModif1 = true;
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.btnEnregistrer = "Enregistrer"
    $scope.listeContratAvecAccessoir = []
    $scope.recupererInfoAvecAccessoir = {};
    $scope.listeDesExercice = [];
    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/
    //debut loader
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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    $scope.initFormListe = function () {
      $scope.afficheModelListeExercice();
    };

    //debut initialisation add habitat
    $scope.initFormAddHabitat = function () {
      $scope.btnEnregistrer = "Enregistrer"
      $scope.afficheListeVille($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.FormAddHabitat.Codeassureur = "000000"
      $scope.FormAddHabitat.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      $scope.afficheListegarantie(); 
      $scope.FormAddHabitat.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddHabitat.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommune($rootScope.VILLEPARDEFAUT)
    };
    //fin initialisation add habitat

    //debut initialisation add habitat
    $scope.initFormMODIFHabitat = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };
    //fin initialisation add habitat

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /* Début developpement  ANICETTE*/

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddHabitat = function () {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#FFFFFF");
        $("#idDenomination1").css("background-color", "#FFFFFF");
        $("#idCode2").css("background-color", "#FFFFFF");
        $("#idDenomination2").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idIntermediaire").css("background-color", "#FFFFFF");
        $("#idPays").css("background-color", "#FFFFFF");
        $("#idVille").css("background-color", "#FFFFFF");
        $("#idCommune").css("background-color", "#FFFFFF");
        $("#idSituationGeo").css("background-color", "#FFFFFF");
        $("#idEffet").css("background-color", "#FFFFFF");
        $("#idEcheance").css("background-color", "#FFFFFF");
        $("#idAssureur").css("background-color", "#FFFFFF");
        $("#idInterlocuteur").css("background-color", "#FFFFFF");
        $("#idTel").css("background-color", "#FFFFFF");
        $("#idDesignation").css("background-color", "#FFFFFF");
        $("#idTypeAff").css("background-color", "#FFFFFF");
      });
      $scope.FormAddHabitat = {};
      $scope.initFormAddHabitat();
      $scope.verou1 = false;
      $scope.verou2 = false;
      //$scope.tableauGarentiesHabitat()
      //$scope.tableauPrimesHabitat()
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      if (
        $scope.FormAddHabitat.code2 == "" &&
        $scope.FormAddHabitat.denomination2 == ""
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
            SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
            TI_NUMTIERS: $scope.FormAddHabitat.code2,
            TI_DENOMINATION: $scope.FormAddHabitat.denomination2,
            SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
        });
    };
    //fin liste des comerciaux

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id, interlocuteur) {
      $scope.FormAddHabitat.code1 = code;
      $scope.FormAddHabitat.denomination1 = denomination;
      $scope.FormAddHabitat.id1 = id;
      $scope.FormAddHabitat.interlocuteur = interlocuteur;
      $scope.verou1 = true;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $scope.FormAddHabitat.code2 = code;
      $scope.FormAddHabitat.denomination2 = denomination;

      if ($scope.etatForm == "2") {
        $scope.FormAddHabitat.idModif2 = id;
        $scope.FormAddHabitat.id2 = $scope.FormAddHabitat.idModif2;
      } else {
        $scope.FormAddHabitat.id2 = id;
      }
      $scope.verou2 = true;
    };
    //Fin choix d'un commercial

    //debut acceder a la page de modification

    //debut liste des villes
    $scope.afficheListeVille = function (id) {
      $scope.listeCommunesHabitat = [];
      $scope.FormAddHabitat.commune = "";
     // $scope.FormAddHabitat.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.listeVillesHabitat = reponse.data;
          if (
            $scope.listeVillesHabitat[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };
    //fin liste des villesHabitat

    //debut liste des communes Habitat
    $scope.afficheListeCommune = function (id) {
      $scope.FormAddHabitat.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.listeCommunesHabitat = reponse.data;
          if (
            $scope.listeCommunesHabitat[0].clsObjetRetour.SL_RESULTAT ===
            "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };
    //fin liste des communes Habitat

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

    //debut afficher liste Habitat
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
      let typeNumerique = /^[0-9]$/;
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
       $scope.listeContrat = []
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
       $scope.listeContrat = []
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
       $scope.listeContrat = []
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
            RQ_CODERISQUE:"12",// "05",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
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

 //debut afficher liste Habitat
 $scope.afficheListeContratAvecAccessoir = function (
  idContrat,
  date,
  Exercice
) {
  $scope.$emit("LOAD");
 
 
    $scope.objet_envoie = [
      {
        RQ_CODERISQUE:"12",// "05",
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
          sessionStorage.setItem("modifHabitat", JSON.stringify($scope.recupererInfoAvecAccessoir));
          window.location.href = "#/assurances/modification/MultirisqueImmeuble";
        }
      });
 
};
//fin afficher liste

    //fin afficher liste Habitat

    //debut voir plus Habitat
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpHabitat", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpHabitat"));
    };
    //fin voir plus Habitat

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE,info.EX_EXERCICE)
     
    };
    // Fin acceder a la page de modification

    //debut liste des villes pour la modification
    $scope.modifAfficheListeVille = function (id) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.listeVillesHabitat = reponse.data;
          if (
            $scope.listeVillesHabitat[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.verouVille = false;
            $scope.modifAfficheListeCommune($scope.recupererInfo.VL_CODEVILLE);
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeVillesHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeVillesHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeVillesHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes pour la modification

    //debut liste des communes pour la modification
    $scope.modifAfficheListeCommune = function (id) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.listeCommunesHabitat = reponse.data;
          if (
            $scope.listeCommunesHabitat[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeCommunesHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeCommunesHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeCommunesHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des communes pour la modification

    //debut modif en fonction du pays et de la ville
    $("#idPaysModif").change(function () {
      $scope.modifAfficheListeVille($(this).val());
    });
    $("#idVilleModif").change(function () {
      $scope.modifAfficheListeCommune($(this).val());
    });
    //debut modif en fonction du pays et de la ville

    //debut recuperer id pour la suppression du contrat
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du contrat

    //debut  suppression
    $scope.supprimeContrat = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: recupId,
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          //console.log($scope.testSuppression)
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
    //Fin  suppression

    //debut fonction pour annuler la recherche
    $scope.listeAnnuler = function () {
      //$scope.FormListHabitat = {};
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
      setTimeout($scope.rechargePage, 3600);
    };
    //fin fonction pour annuler la recherche

    //debut liste des comerciaux
    $scope.afficheListeCommercial = function () {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          TI_IDTIERS: "",
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
    /*Fin liste des commerciaux habitat*/

    $scope.dateValide = function (paramDate) {
      $scope.lAnnee = paramDate.substr(6, 4);
      $scope.leMois = paramDate.substr(3, 2);
      $scope.leJour = paramDate.substr(0, 2);
      if ($scope.leMois == "2" || $scope.leMois == "02") {
        if ($scope.leJour > "29") {
          $scope.messageErreur = "La date d'effet n'est pas valide";
          return $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
      }
    };

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
    //CREE UNE NOUVELLE GRILLE GARANTIE
    $scope.selectedMore = [];
    $scope.existedMore = function (item) {
      if (item == "O") {
        return true;
      }
      //return $scope.selectedMore.indexOf(item) > -1;
    };

    $scope.toggleSelectedMore = function (item) {
      if ($scope.etatForm == "2") {
        let idx = $scope.selectedMore.indexOf(item);
        if (idx > -1) {
          $scope.selectedMore.splice(idx, 1);
        } else {
          $scope.selectedMore.push(item);
        }
      } else {
        let idx = $scope.selectedMore.indexOf(item);
        if (idx > -1) {
          $scope.selectedMore.splice(idx, 1);
        } else {
          $scope.selectedMore.push(item);
        }
      }
    };
    console.log($scope.selectedMore);
    //$scope.etabtn = "";
    //$scope.selectedMoremodif = [];
    //$scope.existedMoremodif = function (collection) {
    //    $scope.etabtn = collection;
    //    if ($scope.etabtn.CG_GARANTIE == 'O') {
    //        return true;
    //    }
    //   // return $scope.selectedMoremodif.indexOf(collection) > -1;
    //}

    //$scope.toggleSelectedMoremodif = function (item) {
    //    for (var i = 0; i < $scope.recupererInfo.clsCtcontratgaranties.length; i++) {
    //        for (var j = 0; j < $scope.selectedMoremodif.length; j++) {
    //            if (parseInt($scope.selectedMoremodif[j].GA_CODEGARANTIE) == parseInt($scope.recupererInfo.clsCtcontratgaranties[i].GA_CODEGARANTIE)) {
    //                if ($scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE == "O") {
    //                    $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE = "N";
    //                    break;
    //                }
    //                if ($scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE == "N") {
    //                    $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE = "O";
    //                    break;
    //                }

    //            }

    //        }
    //    }

    //    let idx = $scope.selectedMoremodif.indexOf(item)
    //    if (idx > -1) {
    //        $scope.selectedMoremodif.splice(idx, 1)
    //    } else {
    //        $scope.selectedMoremodif.push(item)
    //    }
    //}
    //console.log($scope.selectedMoremodif)
    //FIN

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
        for (var j = 0; j < $scope.tabPrimesHabitat.length; j++) {
          if (
            $scope.tabPrimesHabitat[j].RE_CODERESUME == '05' &&
            $scope.tabPrimesHabitat[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimesHabitat[j].CG_PRIMES = 0;
          }
        }

        for (var j = 0; j < $scope.tabPrimesHabitat.length; j++) {
          if (
            $scope.tabPrimesHabitat[j].RE_CODERESUME !== '05' &&
            $scope.tabPrimesHabitat[j].CG_PRIMES != "" &&
            $scope.tabPrimesHabitat[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.tabPrimesHabitat[j].CG_PRIMES);
          }
        }
        for (var j = 0; j < $scope.tabPrimesHabitat.length; j++) {
          if (
            $scope.tabPrimesHabitat[j].RE_CODERESUME == '05' &&
            $scope.tabPrimesHabitat[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimesHabitat[j].CG_PRIMES = $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      }
    };
    //calcul de la prime automatiquement

    //debut focus sur le champ
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Codeassureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSitGeo").focusin(function () {
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
        $("#idDateEffet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEcheance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAssureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeAppart").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNombrePiece").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSuperficie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idLoyerMensuel").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idOccup").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idIntermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idInterlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idtelInter").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
       
      });
    };
    //fin focus sur le champ

    //Debut ajout habitat (contrat) /a terminer
    $scope.validateFormAddHabitat = function (dateEffet, dateEcheance) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifHabitat"));
      //$scope.testgrille();
      $scope.testprime();
      $scope.calculprimettc();
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typenombreDePiece = /^[0-9]{1,3}$/;
      let typeSuperficie = /^[0-9]{1,5}$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typemontant = /^[0-9]{1,15}$/;
      $scope.lAnneeEffet = $scope.FormAddHabitat.effet.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddHabitat.effet.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddHabitat.effet.substr(0, 2);
      $scope.lAnneeEcheance = $scope.FormAddHabitat.echeance.substr(6, 4);
      $scope.leMoisEcheance = $scope.FormAddHabitat.echeance.substr(3, 2);
      $scope.leJourEcheance = $scope.FormAddHabitat.echeance.substr(0, 2);

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
        for (var i = 0; i < $scope.tabPrimesHabitat.length; i++) {
          if ($scope.tabPrimesHabitat[i].CG_PRIMES == "") {
            $scope.tabPrimesHabitat[i].CG_PRIMES = 0;
          }
        }
      }

      if (
        $scope.FormAddHabitat.code1 === "" ||
        $scope.FormAddHabitat.code1 === undefined ||
        $scope.FormAddHabitat.Codeassureur === "" ||
        $scope.FormAddHabitat.Codeassureur === undefined ||
        $scope.FormAddHabitat.denomination1 === "" ||
        $scope.FormAddHabitat.denomination1 === undefined ||
        $scope.FormAddHabitat.denomination2 === "" ||
        $scope.FormAddHabitat.denomination2 === undefined ||
        $scope.FormAddHabitat.numPolice === "" ||
        $scope.FormAddHabitat.numPolice === undefined ||
        $scope.FormAddHabitat.commune === "" ||
        $scope.FormAddHabitat.commune === undefined ||
        $scope.FormAddHabitat.situationGeo === "" ||
        $scope.FormAddHabitat.effet === "" ||
        $scope.FormAddHabitat.effet === undefined ||
        $scope.FormAddHabitat.echeance === "" ||
        $scope.FormAddHabitat.echeance === undefined ||
        $scope.FormAddHabitat.assureur === "" ||
        $scope.FormAddHabitat.assureur === undefined ||
        $scope.FormAddHabitat.interlocuteur === "" ||
        $scope.FormAddHabitat.interlocuteur === undefined ||
        $scope.FormAddHabitat.nombrePiece === "" ||
        $scope.FormAddHabitat.nombrePiece === undefined ||
        $scope.FormAddHabitat.telInterlocuteur === "" ||
        $scope.FormAddHabitat.telInterlocuteur === undefined ||
        $scope.FormAddHabitat.typeAffaire === "" ||
        $scope.FormAddHabitat.typeAffaire === undefined ||
        $scope.FormAddHabitat.Exercice === "" ||
        $scope.FormAddHabitat.Exercice === undefined 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddHabitat.code1 === "" ||
            $scope.FormAddHabitat.code1 === undefined
          ) {
            $("#idNumSouscripteur").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddHabitat.Codeassureur === "" ||
            $scope.FormAddHabitat.Codeassureur === undefined
          ) {
            $("#Codeassureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.Exercice === "" ||
            $scope.FormAddHabitat.Exercice === undefined
          ) {
            $("#idExercice").css("background-color", "#FFE9E0");
          }


          if (
            $scope.FormAddHabitat.denomination1 === "" ||
            $scope.FormAddHabitat.denomination1 === undefined
          ) {
            $("#idDenomination1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.code2 === "" ||
            $scope.FormAddHabitat.code2 === undefined
          ) {
            $("#idNumCommercial").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.denomination2 === "" ||
            $scope.FormAddHabitat.denomination2 === undefined
          ) {
            $("#idDenomination2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.numPolice === "" ||
            $scope.FormAddHabitat.numPolice === undefined
          ) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.pays === "" ||
            $scope.FormAddHabitat.pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.ville === "" ||
            $scope.FormAddHabitat.ville === undefined
          ) {
            $("#idVille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.commune === "" ||
            $scope.FormAddHabitat.commune === undefined
          ) {
            $("#idCommune").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.situationGeo === "" ||
            $scope.FormAddHabitat.situationGeo === undefined
          ) {
            $("#idSitGeo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.effet === "" ||
            $scope.FormAddHabitat.effet === undefined
          ) {
            $("#idDateEffet").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.echeance === "" ||
            $scope.FormAddHabitat.echeance === undefined
          ) {
            $("#idDateEcheance").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.assureur === "" ||
            $scope.FormAddHabitat.assureur === undefined
          ) {
            $("#idAssureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.intermediaire === "" ||
            $scope.FormAddHabitat.intermediaire === undefined
          ) {
            $("#idIntermediaire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.interlocuteur === "" ||
            $scope.FormAddHabitat.interlocuteur === undefined
          ) {
            $("#idInterlocuteur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.telInterlocuteur === "" ||
            $scope.FormAddHabitat.telInterlocuteur === undefined
          ) {
            $("#idtelInter").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.typeAffaire === "" ||
            $scope.FormAddHabitat.typeAffaire === undefined
          ) {
            $("#idTypeAffaire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.typeAppartement === "" ||
            $scope.FormAddHabitat.typeAppartement === undefined
          ) {
            $("#idTypeAppart").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.nombrePiece === "" ||
            $scope.FormAddHabitat.nombrePiece === undefined
          ) {
            $("#idNombrePiece").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.Superficie === "" ||
            $scope.FormAddHabitat.Superficie === undefined
          ) {
            $("#idSuperficie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddHabitat.typeOccupant === "" ||
            $scope.FormAddHabitat.typeOccupant === undefined
          ) {
            $("#idOccup").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.verifiegarentieenregistrement == true) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille garentie";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifieprimeenregistrement == true) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille prime";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprimeenregistrement == true) {
        $scope.messageErreur = "la prime ttc ne doit etre vide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprime == true) {
        $scope.messageErreur = "la prime ttc ne doit etre vide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) == 0 ||
        parseInt($scope.valprimettc) == 0
      ) {
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doivent pas etre nulle";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimettcenregistrement) == 0 ||
        parseInt($scope.valprimenettenregistrement) == 0
      ) {
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doivent pas etre nulle";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
      ) {
        $scope.messageErreur =
          "la prime nette ne doit etre superieure a la prime ttc";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenettenregistrement) >
        parseInt($scope.valprimettcenregistrement)
      ) {
        $scope.messageErreur =
          "la prime nette ne doit etre superieure a la prime ttc";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeNumerique.test($scope.FormAddHabitat.code1) == false) {
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $scope.$emit("UNLOAD");
        $("#idNumSouscripteur").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddHabitat.denomination1) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une dénomination souscripteur correcte";
        $scope.$emit("UNLOAD");
        $("#idDenomination1").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeNumerique.test($scope.FormAddHabitat.code2) == false) {
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $scope.$emit("UNLOAD");
        $("#idNumCommercial").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddHabitat.denomination2) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une dénomination commercial correcte";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddHabitat.situationGeo) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une situation geographique correcte";
        $scope.$emit("UNLOAD");
        $("#idSitGeo").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddHabitat.effet) == false) {
        $scope.messageErreur = "Veuillez renseigner une dates effet correcte";
        $scope.$emit("UNLOAD");
        $("#idDateEffet").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDateEffet").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.messageErreur = "La date n'est pas valide";
        $scope.$emit("UNLOAD");
        $scope.$emit("UNLOAD");
        $("#idDateEffet").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddHabitat.echeance) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une dates écheance correcte";
        $scope.$emit("UNLOAD");
        $("#idDateEcheance").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDateEcheance").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEcheance == "04" ||
          $scope.leMoisEcheance == "06" ||
          $scope.leMoisEcheance == "09" ||
          $scope.leMoisEcheance == "11") &&
        $scope.leJourEcheance > "30"
      ) {
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDateEcheance").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddHabitat.interlocuteur) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un nom interlocuteur correct";
        $scope.$emit("UNLOAD");
        $("#idInterlocuteur").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddHabitat.telInterlocuteur) ==
        false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $scope.$emit("UNLOAD");
        $("#idtelInter").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenombreDePiece.test($scope.FormAddHabitat.nombrePiece) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un nombre de piece correct";
        $scope.$emit("UNLOAD");
        $("#idNombrePiece").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeSuperficie.test($scope.FormAddHabitat.Superficie) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner une Superficie correcte";
        $scope.$emit("UNLOAD");
        $("#idSuperficie").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormAddHabitat.loyerMensuel != "" &&
        $scope.FormAddHabitat.loyerMensuel != undefined &&
        typemontant.test($scope.FormAddHabitat.loyerMensuel) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un loyer mensuel correct";
        $scope.$emit("UNLOAD");
        $("#idLoyerMensuel").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(dateEffet) >=
        $scope.dateSuperioriteFin(dateEcheance)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateEffetIncorrecte();
      } else if (
        $scope.confirmerChampsGrilleGarantie($scope.tabGarentiesHabitat) ==
          true ||
        $scope.confirmerChampsGrillePrime($scope.tabPrimesHabitat) == true
      ) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.confirmerChampsGrilleGarantie(
          $scope.recupererInfo.clsCtcontratgaranties
        ) == true ||
        $scope.confirmerChampsGrillePrime(
          $scope.recupererInfo.clsCtcontratprimes
        ) == true
      ) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.recuperer.CA_DATEECHEANCE) > $scope.dateSuperioriteDebut($scope.FormAddHabitat.effet)
      )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        
        $scope.messageErreur ="la nouvelle date d'éffet doit etre supérieur ou égale à l'ancienne date d'écheance qui est le :" + $scope.recuperer.CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.etatForm == "2" && ($scope.dateSuperioriteDebut($scope.FormAddHabitat.echeance) <=
            $scope.dateSuperioriteDebut($scope.recuperer.CA_DATEECHEANCE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEcheance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
        "la nouvelle date d'echeance ne doit pas identique à l'ancienne date d'echeance qui est le :" + $scope.recuperer.CA_DATEECHEANCE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if ($scope.etatForm == "2" && (parseInt($scope.FormAddHabitat.Exercice) <
      parseInt($scope.recuperer.EX_EXERCICE))
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idExercice").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "le nouvel exercice doit etre supérieur ou égale à l'ancien exercice qui est :" + $scope.recuperer.EX_EXERCICE;
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }  else {
        if ($scope.etatForm == "2") {
          if ($scope.FormAddHabitat.idModif1 === "") {
            $scope.FormAddHabitat.id1 = $scope.recuperer.TI_IDTIERS;
          }
          if ($scope.FormAddHabitat.idModif2 === "") {
            $scope.FormAddHabitat.id2 = $scope.recuperer.TI_IDTIERSCOMMERCIAL;
          }

          $scope.clsCtcontratgaranties = [];
          for (
            var i = 0;
            i < $scope.recupererInfo.clsCtcontratgaranties.length;
            i++
          ) {
            for (var j = 0; j < $scope.selectedMore.length; j++) {
              if (
                parseInt($scope.selectedMore[j].GA_CODEGARANTIE) ==
                parseInt(
                  $scope.recupererInfo.clsCtcontratgaranties[i].GA_CODEGARANTIE
                )
              ) {
                if (
                  $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE ==
                  "O"
                ) {
                  $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE =
                    "N";
                  break;
                }
                if (
                  $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE ==
                  "N"
                ) {
                  $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE =
                    "O";
                  break;
                }
              }
            }
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
              CG_GARANTIE: "",
              CG_MONTANT: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
              SL_LIBELLEMOUCHARD: "LISTE",
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
            $scope.objetGarentie.CG_GARANTIE =
              $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }

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
              CG_PRIMES: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.RE_CODERESUME =
              $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.clsCtcontratcapitauxs = [];
          for (
            var k = 0;
            k < $scope.recupererInfo.clsCtcontratcapitauxs.length;
            k++
          ) {
            $scope.objetCapitaux = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              CP_CODECAPITAUX: "",
              CC_CAPITAUX: "",
              CC_PRIMES: "",
              CC_TAUX: "",
              SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetCapitaux.CP_CODECAPITAUX =
              $scope.recupererInfo.clsCtcontratcapitauxs[k].CP_CODECAPITAUX;
            $scope.objetCapitaux.CC_CAPITAUX =
              $scope.recupererInfo.clsCtcontratcapitauxs[k].CC_CAPITAUX;
            $scope.objetCapitaux.CC_TAUX =
              $scope.recupererInfo.clsCtcontratcapitauxs[k].CC_TAUX;
            $scope.objetCapitaux.CC_PRIMES =
              $scope.recupererInfo.clsCtcontratcapitauxs[k].CC_PRIMES;
            $scope.objetCapitaux.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetCapitaux.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetCapitaux.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratcapitauxs.push($scope.objetCapitaux);
          }
          $scope.TYPEOPERATION = "16";//"1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
        } else {
          $scope.clsCtcontratgaranties = [];
          for (var i = 0; i < $scope.tabGarentiesHabitat.length; i++) {
            for (var j = 0; j < $scope.selectedMore.length; j++) {
              if (
                parseInt($scope.selectedMore[j].GA_CODEGARANTIE) ==
                parseInt($scope.tabGarentiesHabitat[i].GA_CODEGARANTIE)
              ) {
                $scope.tabGarentiesHabitat[i].CG_GARANTIE = "O";
                break;
              }
            }
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
              CG_GARANTIE: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.tabGarentiesHabitat[i].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES =
              $scope.tabGarentiesHabitat[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.tabGarentiesHabitat[i].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA =
              $scope.tabGarentiesHabitat[i].CG_PRORATA;
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.tabGarentiesHabitat[i].GA_CODEGARANTIE;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.tabGarentiesHabitat[i].CG_FRANCHISES;
            $scope.objetGarentie.CG_GARANTIE =
              $scope.tabGarentiesHabitat[i].CG_GARANTIE;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          $scope.clsCtcontratprimes = [];
          for (var j = 0; j < $scope.tabPrimesHabitat.length; j++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CG_PRIMES: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.RE_CODERESUME =
              $scope.tabPrimesHabitat[j].RE_CODERESUME;
            //$scope.objetPrime.CG_PRIMES = $scope.tabPrimesHabitat[j].CG_PRIMES;
            $scope.objetPrime.CP_VALEUR = $scope.tabPrimesHabitat[j].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.clsCtcontratcapitauxs = [];
          for (var k = 0; k < $scope.tabCapitauxHabitat.length; k++) {
            $scope.objetCapitaux = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              CP_CODECAPITAUX: "",
              CC_CAPITAUX: "",
              CC_PRIMES: "",
              CC_TAUX: "",
              SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetCapitaux.CP_CODECAPITAUX =
              $scope.tabCapitauxHabitat[k].CP_CODECAPITAUX;
            $scope.objetCapitaux.CC_CAPITAUX =
              $scope.tabCapitauxHabitat[k].CC_CAPITAUX;
            $scope.objetCapitaux.CC_TAUX = $scope.tabCapitauxHabitat[k].CC_TAUX;
            $scope.objetCapitaux.CC_PRIMES =
              $scope.tabCapitauxHabitat[k].CC_PRIMES;
            $scope.objetCapitaux.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetCapitaux.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetCapitaux.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratcapitauxs.push($scope.objetCapitaux);
          }
          $scope.TYPEOPERATION = "0";
        }

        $scope.objet_envoie = [
          {
            CA_CODECONTRAT: $scope.CA_CODECONTRAT,
            CA_CODECONTRATORIGINE: $scope.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            RQ_CODERISQUE:"12",// "05",
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            AS_NUMEROASSUREUR: $scope.FormAddHabitat.Codeassureur,
            CA_NUMPOLICE: $scope.FormAddHabitat.numPolice,
            IT_CODEINTERMEDIAIRE: $scope.FormAddHabitat.intermediaire,
            TI_IDTIERSASSUREUR: $scope.FormAddHabitat.assureur,
            CO_CODECOMMUNE: $scope.FormAddHabitat.commune,
            CA_SITUATIONGEOGRAPHIQUE: $scope.FormAddHabitat.situationGeo,
            CA_DATEEFFET: $scope.FormAddHabitat.effet,
            CA_DATEECHEANCE: $scope.FormAddHabitat.echeance,
            CA_NOMINTERLOCUTEUR: $scope.FormAddHabitat.interlocuteur,
            CA_CONTACTINTERLOCUTEUR: $scope.FormAddHabitat.telInterlocuteur,
            TA_CODETYPEAFFAIRES: $scope.FormAddHabitat.typeAffaire,
            TI_IDTIERS: $scope.FormAddHabitat.id1,
            TI_IDTIERSCOMMERCIAL: $scope.FormAddHabitat.id2,
            AP_CODETYPEAPPARTEMENT: $scope.FormAddHabitat.typeAppartement,
            OC_CODETYPEOCCUPANT: $scope.FormAddHabitat.typeOccupant,
            CA_NOMBREPIECE: $scope.FormAddHabitat.nombrePiece,
            CA_SUPERFICIE: $scope.FormAddHabitat.Superficie,
            CA_LOYERMENSUEL: $scope.FormAddHabitat.loyerMensuel,
            CA_DATENAISSANCE: "01-01-1900",
            CA_TAUX: "0",
            CA_NUMSERIE: "1000",
            CA_IMMATRICULATION: "IMMAT",
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
            GR_CODEGARENTIEPRIME: $scope.FormAddHabitat.valgarantie,
            SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
            SL_LIBELLEMOUCHARD: "LISTE",
            EX_EXERCICE: $scope.FormAddHabitat.Exercice,
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
            clsCtcontratcapitauxs: $scope.clsCtcontratcapitauxs,
          },
        ];

        $http
          .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.testAjout = reponse.data;
            //console.log($scope.testAjout)
            if ($scope.testAjout[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testAjout[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.valgarentie = 0;
              $scope.valgarentiemodulo = 0;
              if ($scope.etatForm == "2") {
                $scope.RetourSurListe = function () {
                  window.location.href = "#/assurances/MultirisqueImmeuble";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                if (!!localStorage.getItem("collectionDemande")) {
                  localStorage.removeItem("collectionDemande");
                }
                $scope.resetFormAddHabitat();
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.testAjout[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testAjout[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };

    //Fin ajout habitat (contrat)

    //fin test des types sur les grilles
    //$scope.valgarentie = 0;
    //$scope.valgarentiemodulo = 0;
    //$scope.choixclienttaxe = function (codgarantie) {
    //    $scope.valgarentie = parseInt($scope.valgarentie) + 1;
    //    $scope.valgarentiemodulo = parseInt($scope.valgarentie) % 2;
    //    if ($scope.etatForm !== "2") {
    //        for (var i = 0; i < $scope.tabGarentiesHabitat.length; i++) {
    //            if (parseInt(codgarantie.GA_CODEGARANTIE) == parseInt($scope.tabGarentiesHabitat[i].GA_CODEGARANTIE)) {
    //                if (parseInt($scope.valgarentiemodulo) !== 0) {
    //                    $scope.tabGarentiesHabitat[i].CG_GARANTIE = "O";
    //                } else {
    //                    $scope.tabGarentiesHabitat[i].CG_GARANTIE = "N";
    //                }
    //            }
    //        }
    //    } else {
    //        for (var i = 0; i < $scope.recupererInfo.clsCtcontratgaranties.length; i++) {
    //            if (parseInt(codgarantie.GA_CODEGARANTIE) == parseInt($scope.tabGarentiesHabitat[i].GA_CODEGARANTIE)) {
    //                if ($scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE !== "O") {
    //                    if (parseInt($scope.valgarentiemodulo) !== 0) {
    //                        $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE = "O";
    //                    } else {
    //                        $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE = "N";
    //                    }
    //                } else {
    //                    $scope.valgarentie = 1;
    //                    $scope.valgarentiemodulo = 0;
    //                    $scope.valgarentie = parseInt($scope.valgarentie) + 1;
    //                    $scope.valgarentiemodulo = parseInt($scope.valgarentie) % 2;
    //                    if (parseInt($scope.valgarentiemodulo) == 0) {
    //                        $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE = "O";
    //                    } else {
    //                        $scope.recupererInfo.clsCtcontratgaranties[i].CG_GARANTIE = "N";
    //                    }
    //                }
    //            }
    //        }
    //    }

    //}
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
        for (var j = 0; j < $scope.tabPrimesHabitat.length; j++) {
          if (
            $scope.tabPrimesHabitat[j].RE_CODERESUME == '01' &&
            $scope.tabPrimesHabitat[j].CG_PRIMES == ""
          ) {
            $scope.statutprimeenregistrement = true;
            break;
          }
          if (
            $scope.tabPrimesHabitat[j].RE_CODERESUME == '01' &&
            $scope.tabPrimesHabitat[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenettenregistrement =
              $scope.tabPrimesHabitat[j].CG_PRIMES;
          }

          if (
            $scope.tabPrimesHabitat[j].RE_CODERESUME == '05' &&
            $scope.tabPrimesHabitat[j].CG_PRIMES == ""
          ) {
            $scope.statutprimeenregistrement = true;
            break;
          }
          if (
            $scope.tabPrimesHabitat[j].RE_CODERESUME == '05' &&
            $scope.tabPrimesHabitat[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettcenregistrement =
              $scope.tabPrimesHabitat[j].CG_PRIMES;
          }
        }
      }
    };
    //verification de la prime nette et ttc

    /*Fin developpement ANICETTE*/

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "Habitat";
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
    //fin liste exercice


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
          RQ_CODERISQUE:"12",// "05",
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
            $scope.afficheListeExercice()
           // $scope.afficheListePays();
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
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.listePaysHabitat = reponse.data;
          if (
            $scope.listePaysHabitat[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeAssureurHabitat();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listePaysHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listePaysHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listePaysHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des assureur Habitat
    $scope.afficheListeAssureurHabitat = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.listeAssureursHabitat = reponse.data;
          if (
            $scope.listeAssureursHabitat[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeTiersSouscripteur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeAssureursHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeAssureursHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeAssureursHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des assureur Habitat

    //debut liste des souscripteur Habitat
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddHabitat.code1 == "" &&
        $scope.FormAddHabitat.denomination1 == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
            TI_NUMTIERS: $scope.FormAddHabitat.code1,
            TI_DENOMINATION: $scope.FormAddHabitat.denomination1,
            SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          if (
            $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeTypeAffaireHabitat();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesSouscripteurs);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesSouscripteurs[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des souscripteur Habitat

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaireHabitat = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.listeTypeAffaireHabitat = reponse.data;
          if (
            $scope.listeTypeAffaireHabitat[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeTypeOccupant();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaireHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaireHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaireHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut liste type occupant
    $scope.afficheListeTypeOccupant = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
        .post("/TypeOccupant/ListeTypeOccupant/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeOccupant = reponse.data;
          if (
            $scope.listeTypeOccupant[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.tableauPrimesHabitat();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeOccupant[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeOccupant);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeOccupant[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type occupant

    //debut tableau primes
    $scope.tableauPrimesHabitat = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE:"12",// "05",
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.tabPrimesHabitat = reponse.data;
          if (
            $scope.tabPrimesHabitat[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.tableauGarentiesHabitat();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabPrimesHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabPrimesHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabPrimesHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau primes

    //debut tableau garenties
    $scope.tableauGarentiesHabitat = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE:"12",// "05",
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.tabGarentiesHabitat = reponse.data;
          if (
            $scope.tabGarentiesHabitat[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabGarentiesHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabGarentiesHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabGarentiesHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau garenties

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
            $scope.afficheListeTypeAppartement();
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

    //debut liste type d'appartement
    $scope.afficheListeTypeAppartement = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
        .post("/TypeAppartement/ListeTypeAppartement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeAppartement = reponse.data;
          if (
            $scope.listeTypeAppartement[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.tableauCapitauxHabitat();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAppartement[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAppartement);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAppartement[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'appartement

    //debut tableau capitaux
    $scope.tableauCapitauxHabitat = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE:"12",// "05",
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
        .post("/Capitaux/ListeCapitaux/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabCapitauxHabitat = reponse.data;
          if (
            $scope.tabCapitauxHabitat[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifHabitat, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabCapitauxHabitat[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabCapitauxHabitat);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabCapitauxHabitat[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    $scope.tableauCapitauxHabitatModif = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE:"12",// "05",
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
        .post("/Capitaux/ListeCapitaux/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.recupererInfo.clsCtcontratcapitauxs = reponse.data;
          $scope.$emit("UNLOAD");
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
         
        });
    };
    //fin tableau capitaux
    $scope.tableauGarentiesModif = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE:"12",// "05",
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",//"HABITAT",
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
          $scope.recupererInfo.clsCtcontratgaranties = reponse.data;
          $scope.$emit("UNLOAD");
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
         
        });
    };
    //debut info page de modification
    $scope.retourModifHabitat = function () {
      $scope.etatForm = "2";
      $scope.btnEnregistrer = "Renouveler"
      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifHabitat"));
      console.log($scope.recupererInfo);
      $scope.verou1 = true;
      $scope.verou2 = false;

      if($scope.recupererInfo.EX_EXERCICE == undefined || $scope.recupererInfo.EX_EXERCICE == "" || $scope.recupererInfo.EX_EXERCICE == null){
        $scope.FormAddHabitat.Exercice = $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
      }else{
        $scope.FormAddHabitat.Exercice = $scope.recupererInfo.EX_EXERCICE;
      }
      $scope.FormAddHabitat.Codeassureur = $scope.recupererInfo.AS_NUMEROASSUREUR;
      $scope.FormAddHabitat.code1 = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddHabitat.denomination1 =
        $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddHabitat.code2 = $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddHabitat.denomination2 =
        $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddHabitat.numPolice = $scope.recupererInfo.CA_NUMPOLICE;
      $scope.FormAddHabitat.intermediaire =
        $scope.recupererInfo.IT_CODEINTERMEDIAIRE;
      $scope.FormAddHabitat.pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddHabitat.ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddHabitat.commune = $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddHabitat.situationGeo =
        $scope.recupererInfo.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddHabitat.effet = $scope.recupererInfo.CA_DATEEFFET;
      $scope.FormAddHabitat.echeance = $scope.recupererInfo.CA_DATEECHEANCE;
      $scope.FormAddHabitat.assureur = $scope.recupererInfo.TI_IDTIERSASSUREUR;
      $scope.FormAddHabitat.interlocuteur =
        $scope.recupererInfo.CA_NOMINTERLOCUTEUR;
      $scope.FormAddHabitat.telInterlocuteur =
        $scope.recupererInfo.CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddHabitat.typeAffaire =
        $scope.recupererInfo.TA_CODETYPEAFFAIRES;
      $scope.FormAddHabitat.nombrePiece = $scope.recupererInfo.CA_NOMBREPIECE;
      $scope.FormAddHabitat.loyerMensuel = $scope.recupererInfo.CA_LOYERMENSUEL;
      $scope.FormAddHabitat.Superficie = $scope.recupererInfo.CA_SUPERFICIE;
      $scope.FormAddHabitat.typeOccupant =
        $scope.recupererInfo.OC_CODETYPEOCCUPANT;
      $scope.FormAddHabitat.typeAppartement =
        $scope.recupererInfo.AP_CODETYPEAPPARTEMENT;
      $scope.FormAddHabitat.valgarantie =
        $scope.recupererInfo.GR_CODEGARENTIEPRIME;

      $scope.modifAfficheListeVille($scope.recupererInfo.PY_CODEPAYS);
      if($scope.recupererInfo.clsCtcontratcapitauxs.length <= 1){
        $scope.tableauCapitauxHabitatModif()
      }
     
      if($scope.recupererInfo.clsCtcontratgaranties.length <= 1){
        $scope.tableauGarentiesModif()
      }
    };
    //fin info page de modification
    // FIN COMBOS
  },
]);
