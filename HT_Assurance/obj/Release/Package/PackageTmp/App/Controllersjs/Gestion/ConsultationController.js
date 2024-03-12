MapharApp.controller("ConsultationController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddConsultation = {
      id1: "",
      idMedecin: "",
      code1: "",
      code2: "",
      denomination3: "",
      idMedecin1: "",
      denomination2: "",
      codePatient: "",
      NomPrenomPatient: "",
      id2: "",
      codeMedecin: "",
      MontantCommission: "",
      TauxCommission: "",
      TelephoneMedecin: "",
      NomPrenomMedecin: "",
      AutreInfo: "",
      ModeAdmission: "",
      Representant: "",
      typeConsultation: "",
      dateConsultation: "",
      numDossier: "",
      Service: "",
      ProduitAssurance: "",
      TauxAssurance: "",
      TelephonePatient: "",
      idModif1: "",
      idModif2: "",
    };

    $scope.FormListConsultation = {
      dateDebut: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      dateFin: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      codeMedecin: "",
      nomMedecin: "",
      codePatient: "",
      nomPatient: "",
      numDossier: "",
    };

    $scope.objet_envoie = [];
    $scope.listeDesSouscripteurs = [];
    $scope.listeDesSouscripteursMedecins = [];
    $scope.listeConsultation = [];
    $scope.idConsultation = [];
    $scope.testSuppression = [];
    $scope.testAjout = [];
    $scope.testModification = [];
    $scope.recuperer = [];
    $scope.listetypeConsultation = [];
    $scope.listeModeAdmission = [];
    $scope.listeService = [];
    $scope.listeSouscripteursMedecinEnreg = [];
    $scope.recupererInfo = {};
    $scope.verouModif1 = true;
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
    //debut initialisation add Consultation
    $scope.initFormAddConsultation = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeTiersSouscrip();
      $scope.afficheListeTiersMedecin();
      $scope.afficheListeTypeConsultation();
      $scope.afficheListeModeAdmission();
      $scope.afficheListeService();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add Consultation

    //debut initialisation List Consultation
    $scope.initFormListConsultation = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeTiersSouscripteur();
      $scope.afficheListeTiersSouscripteurMedecin();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation List Consultation

    //debut initialisation add Consultation
    $scope.initFormModifConsultation = function () {
      $scope.$emit("LOAD");
      $scope.retourModifConsultation();
      $scope.afficheListeTiersSouscripteur();
      $scope.afficheListeTypeConsultation();
      $scope.afficheListeModeAdmission();
      $scope.afficheListeService();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add Consultation

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /* Début developpement  ANICETTE*/

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddConsultation = function () {
      $(document).ready(function () {
        $("#idcodePatient").css("background-color", "#FFFFFF");
        $("#idNomPrenomPatient").css("background-color", "#FFFFFF");
        $("#idTelephonePatient").css("background-color", "#FFFFFF");
        $("#idnumDossier").css("background-color", "#FFFFFF");
        $("#idtypeConsultation").css("background-color", "#FFFFFF");
        $("#idDateConsultation").css("background-color", "#FFFFFF");
        $("#idRepresentant").css("background-color", "#FFFFFF");
        $("#idMotif").css("background-color", "#FFFFFF");
        $("#idModeAdmission").css("background-color", "#FFFFFF");
        $("#idService").css("background-color", "#FFFFFF");
        $("#idAutreInfo").css("background-color", "#FFFFFF");
        $("#idcodeMedecin").css("background-color", "#FFFFFF");
        $("#idNomPrenomMedecin").css("background-color", "#FFFFFF");
        $("#idTelephoneMedecin").css("background-color", "#FFFFFF");
        $("#idTauxCommission").css("background-color", "#FFFFFF");
        $("#idMontantCommission").css("background-color", "#FFFFFF");
      });
      $scope.FormAddConsultation = {};
      $scope.initFormAddConsultation();
      $scope.verou1 = false;
      $scope.verou2 = false;
      //$scope.tableauGarentiesConsultation()
      //$scope.tableauPrimesConsultation()
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //Debut choix d'un souscripteur liste
    $scope.choixSouscripteur = function (code, denomination, id) {
      $scope.FormListConsultation.codePatient = code;
      $scope.FormListConsultation.nomPatient = denomination;
      $scope.FormListConsultation.id1 = id;
      $scope.verou1 = true;
    };
    //Fin choix d'un souscripteur liste

    //debut liste des souscripteur Consultation liste
    $scope.afficheListeTiersSouscripteur = function () {
      if (
        $scope.FormListConsultation.codePatient == "" &&
        $scope.FormListConsultation.nomPatient == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "CONSULTATION",
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
            TI_NUMTIERS: $scope.FormListConsultation.codePatient,
            TI_DENOMINATION: $scope.FormListConsultation.nomPatient,
            SL_LIBELLEECRAN: "CONSULTATION",
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
        });
    };
    //fin liste des souscripteur Consultation liste

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
        $("#idCode1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnomPatient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCode2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnomMedecin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateDebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateFin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnumDossier").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste Consultation
    $scope.afficheListeConsultation = function (
      dateDebut,
      dateFin,
      codePatient,
      nomPatient,
      codeMedecin,
      nomMedecin,
      numDossier
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

      if (dateDebut !== undefined) {
        $scope.lAnneePeriodeDu = dateDebut.substr(6, 4);
        $scope.leMoisPeriodeDu = dateDebut.substr(3, 2);
        $scope.leJourPeriodeDu = dateDebut.substr(0, 2);
      }
      if (dateFin !== undefined) {
        $scope.lAnneeperiodeAu = dateFin.substr(6, 4);
        $scope.leMoisperiodeAu = dateFin.substr(3, 2);
        $scope.leJourperiodeAu = dateFin.substr(0, 2);
      }

      if (
        dateDebut === "" ||
        dateDebut === undefined ||
        dateFin === "" ||
        dateFin === undefined ||
        codePatient === undefined ||
        nomPatient === undefined ||
        codeMedecin === undefined ||
        nomMedecin === undefined ||
        numDossier === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (dateDebut === "" || dateDebut === undefined) {
            $("#idDateDebut").css("background-color", "#FFE9E0");
          }
          if (dateFin === "" || dateFin === undefined) {
            $("#idDateFin").css("background-color", "#FFE9E0");
          }
          if (codePatient === undefined) {
            $("#Code1").css("background-color", "#FFE9E0");
          }
          if (nomPatient === undefined) {
            $("#idnomPatient").css("background-color", "#FFE9E0");
          }
          if (codeMedecin === undefined) {
            $("#idCode2").css("background-color", "#FFE9E0");
          }
          if (nomMedecin === undefined) {
            $("#idnomMedecin").css("background-color", "#FFE9E0");
          }
          if (numDossier === undefined) {
            $("#idnumDossier").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeConsultation = "";
      } else if (typeDate.test(dateDebut) == false) {
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
          $("#idDateDebut").css("background-color", "#FFE9E0");
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
          $("#idDateDebut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(dateDebut) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
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
          $("#idDateFin").css("background-color", "#FFE9E0");
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
          $("#idDateFin").css("background-color", "#FFE9E0");
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
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(dateDebut) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateFin").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listeConsultation = "";
      } else if (
        $scope.dateSuperioriteDebut(dateDebut) >
        $scope.dateSuperioriteFin(dateFin)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateDebut").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeConsultation = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_NUMTIERSPATIENT: codePatient,
            TI_DENOMINATIONPATIENT: nomPatient,
            TI_NUMTIERSMEDECIN: codeMedecin,
            TI_DENOMINATIONMEDECIN: nomMedecin,
            CO_NUMERODOSSIER: numDossier,
            DATEDEBUT: dateDebut,
            DATEFIN: dateFin,
            CO_CODECONSULTATION: "",
            CO_CODECONSULTATION1: "",
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
          .post("/Consultation/ListeConsultation/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeConsultation = reponse.data.reverse();
            if (
              $scope.listeConsultation[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeConsultation[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste Consultation

    //debut voir plus Consultation
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpConsultation", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpConsultation"));
    };
    //fin voir plus Consultation

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      sessionStorage.setItem("modifConsultation", JSON.stringify(info));
      window.location.href =
        "#/assurances-gestion/CaisseTresorerie/Enregistrements/ModificationConsultation";
    };
    // Fin acceder a la page de modification

    //debut info page de modification
    $scope.retourModifConsultation = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifConsultation")
      );
      console.log($scope.recupererInfo);
      $scope.verou1 = true;
      $scope.verou2 = false;

      $scope.FormAddConsultation.codePatient =
        $scope.recupererInfo.TI_NUMTIERSPATIENT;
      $scope.FormAddConsultation.NomPrenomPatient =
        $scope.recupererInfo.TI_DENOMINATIONPATIENT;
      $scope.FormAddConsultation.TelephonePatient =
        $scope.recupererInfo.TI_TELEPHONEPATIENT;
      $scope.FormAddConsultation.numDossier =
        $scope.recupererInfo.CO_NUMERODOSSIER;
      $scope.FormAddConsultation.typeConsultation =
        $scope.recupererInfo.TY_CODETYPECONSULTATION;
      $scope.FormAddConsultation.dateConsultation =
        $scope.recupererInfo.CO_DATEDECONSULTATION;
      $scope.FormAddConsultation.Representant =
        $scope.recupererInfo.CO_DESCRIPTIONREPRESENTANT;
      $scope.FormAddConsultation.Motif =
        $scope.recupererInfo.CO_MOTIFCONSULTATION;
      $scope.FormAddConsultation.ModeAdmission =
        $scope.recupererInfo.MD_CODEMODEADMISSION;
      $scope.FormAddConsultation.Service = $scope.recupererInfo.SR_CODESERVICE;
      $scope.FormAddConsultation.AutreInfo =
        $scope.recupererInfo.CO_AUTRESINFORMATIONS;
      $scope.FormAddConsultation.codeMedecin =
        $scope.recupererInfo.TI_NUMTIERSMEDECIN;
      $scope.FormAddConsultation.NomPrenomMedecin =
        $scope.recupererInfo.TI_DENOMINATIONMEDECIN;
      $scope.FormAddConsultation.TelephoneMedecin =
        $scope.recupererInfo.TI_TELEPHONEMEDECIN;
      $scope.FormAddConsultation.TauxCommission =
        $scope.recupererInfo.CO_TAUXMEDECIN;
      $scope.FormAddConsultation.MontantCommission =
        $scope.recupererInfo.CO_MONTANTMEDECIN;
    };
    //fin info page de modification

    //Debut choix d'un souscripteur liste
    $scope.choixSouscripteurMedecin = function (
      medecinCode,
      denominationMedecin,
      idMedecin
    ) {
      $scope.FormListConsultation.codeMedecin = medecinCode;
      $scope.FormListConsultation.nomMedecin = denominationMedecin;
      if ($scope.etatForm == "2") {
        $scope.FormListConsultation.idModif2 = id;
        $scope.FormListConsultation.idMedecin1 =
          $scope.FormListConsultation.idModif2;
      } else {
        $scope.FormListConsultation.idMedecin1 = idMedecin;
      }

      $scope.verou1 = true;
    };
    //Fin choix d'un souscripteur liste

    //debut liste des souscripteur Consultation liste
    $scope.afficheListeTiersSouscripteurMedecin = function () {
      if (
        $scope.FormListConsultation.codeMedecin == "" &&
        $scope.FormListConsultation.nomMedecin == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            TP_CODETYPETIERS: "",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "MEDECIN",
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
            TP_CODETYPETIERS: "",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormListConsultation.codeMedecin,
            TI_DENOMINATION: $scope.FormListConsultation.nomMedecin,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "MEDECIN",
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
          $scope.listeDesSouscripteursMedecins = reponse.data;
        });
    };
    //fin liste des souscripteur Consultation liste

    //debut recuperer id pour la suppression du Consultation
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du Consultation

    //debut  suppression
    $scope.supprimeConsultation = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CO_CODECONSULTATION: recupId,
          SL_LIBELLEECRAN: "CONSULTATION",
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
        .post("/Consultation/SuppressionConsultation/", $scope.objet_envoie, {
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
            $scope.listeConsultation[0].clsObjetRetour.SL_RESULTAT = "FALSE";
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
      //$scope.FormListConsultation = {};
      $scope.FormListConsultation.dateDebut =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListConsultation.dateFin = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListConsultation.codeMedecin = "";
      $scope.FormListConsultation.nomMedecin = "";
      $scope.FormListConsultation.codePatient = "";
      $scope.FormListConsultation.nomPatient = "";
      $scope.FormListConsultation.numDossier = "";
      setTimeout($scope.rechargePage, 3600);
    };
    //fin fonction pour annuler la recherche

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

    //debut focus sur le champ
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idcodePatient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomPrenomPatient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTelephonePatient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idnumDossier").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idtypeConsultation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateConsultation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idRepresentant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMotif").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idModeAdmission").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idService").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAutreInfo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idcodeMedecin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomPrenomMedecin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTelephoneMedecin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTauxCommission").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idLoyerMensuel").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMontantCommission").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout Consultation (Consultation) /a terminer
    $scope.validateFormAddConsultation = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("modifConsultation")
      );

      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typetaux = /^[0-9]\d*(,\d+)?$/;
      let typenumerosouscripteur = /^(0|[0-9]\d*)$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typemontant = /^[0-9]{1,15}$/;
      $scope.lAnneeEffet = $scope.FormAddConsultation.dateConsultation.substr(
        6,
        4
      );
      $scope.leMoisEffet = $scope.FormAddConsultation.dateConsultation.substr(
        3,
        2
      );
      $scope.leJourEffet = $scope.FormAddConsultation.dateConsultation.substr(
        0,
        2
      );

      if (
        $scope.FormAddConsultation.codePatient === "" ||
        $scope.FormAddConsultation.codePatient === undefined ||
        $scope.FormAddConsultation.NomPrenomPatient === "" ||
        $scope.FormAddConsultation.NomPrenomPatient === undefined ||
        $scope.FormAddConsultation.TelephonePatient === "" ||
        $scope.FormAddConsultation.TelephonePatient === undefined ||
        $scope.FormAddConsultation.typeConsultation === "" ||
        $scope.FormAddConsultation.typeConsultation === undefined ||
        $scope.FormAddConsultation.dateConsultation === "" ||
        $scope.FormAddConsultation.dateConsultation === undefined ||
        $scope.FormAddConsultation.Representant === "" ||
        $scope.FormAddConsultation.Representant === undefined ||
        $scope.FormAddConsultation.Motif === "" ||
        $scope.FormAddConsultation.Motif === undefined ||
        $scope.FormAddConsultation.ModeAdmission === "" ||
        $scope.FormAddConsultation.ModeAdmission === undefined ||
        $scope.FormAddConsultation.Service === "" ||
        $scope.FormAddConsultation.Service === undefined ||
        $scope.FormAddConsultation.AutreInfo === "" ||
        $scope.FormAddConsultation.AutreInfo === undefined ||
        $scope.FormAddConsultation.codeMedecin === "" ||
        $scope.FormAddConsultation.codeMedecin === undefined ||
        $scope.FormAddConsultation.NomPrenomMedecin === "" ||
        $scope.FormAddConsultation.NomPrenomMedecin === undefined ||
        $scope.FormAddConsultation.TelephoneMedecin === "" ||
        $scope.FormAddConsultation.TelephoneMedecin === undefined ||
        $scope.FormAddConsultation.TauxCommission === "" ||
        $scope.FormAddConsultation.TauxCommission === undefined ||
        $scope.FormAddConsultation.MontantCommission === "" ||
        $scope.FormAddConsultation.MontantCommission === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddConsultation.codePatient === "" ||
            $scope.FormAddConsultation.codePatient === undefined
          ) {
            $("#idcodePatient").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.NomPrenomPatient === "" ||
            $scope.FormAddConsultation.NomPrenomPatient === undefined
          ) {
            $("#idNomPrenomPatient").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.TelephonePatient === "" ||
            $scope.FormAddConsultation.TelephonePatient === undefined
          ) {
            $("#idTelephonePatient").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.typeConsultation === "" ||
            $scope.FormAddConsultation.typeConsultation === undefined
          ) {
            $("#idtypeConsultation").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.dateConsultation === "" ||
            $scope.FormAddConsultation.dateConsultation === undefined
          ) {
            $("#idDateConsultation").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.Representant === "" ||
            $scope.FormAddConsultation.Representant === undefined
          ) {
            $("#idRepresentant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.Motif === "" ||
            $scope.FormAddConsultation.Motif === undefined
          ) {
            $("#idMotif").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.ModeAdmission === "" ||
            $scope.FormAddConsultation.ModeAdmission === undefined
          ) {
            $("#idModeAdmission").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.Service === "" ||
            $scope.FormAddConsultation.Service === undefined
          ) {
            $("#idService").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.AutreInfo === "" ||
            $scope.FormAddConsultation.AutreInfo === undefined
          ) {
            $("#idAutreInfo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.codeMedecin === "" ||
            $scope.FormAddConsultation.codeMedecin === undefined
          ) {
            $("#idcodeMedecin").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.NomPrenomMedecin === "" ||
            $scope.FormAddConsultation.NomPrenomMedecin === undefined
          ) {
            $("#idNomPrenomMedecin").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.TelephoneMedecin === "" ||
            $scope.FormAddConsultation.TelephoneMedecin === undefined
          ) {
            $("#idTelephoneMedecin").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.TauxCommission === "" ||
            $scope.FormAddConsultation.TauxCommission === undefined
          ) {
            $("#idTauxCommission").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddConsultation.MontantCommission === "" ||
            $scope.FormAddConsultation.MontantCommission === undefined
          ) {
            $("#idMontantCommission").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeNumerique.test($scope.FormAddConsultation.codePatient) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un code patient correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idcodePatient").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddConsultation.NomPrenomPatient) ==
        false
      ) {
        $scope.messageErreur = "Veuillez renseigner un nom correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNomPrenomPatient").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddConsultation.TelephonePatient) ==
        false
      ) {
        $scope.messageErreur = "Veuillez renseigner un numéro correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTelephonePatient").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddConsultation.dateConsultation) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une date consultation correcte";
        $scope.$emit("UNLOAD");
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateConsultation").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $scope.$emit("UNLOAD");
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateConsultation").css("background-color", "#FFE9E0");
        });
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
        $(document).ready(function () {
          $("#idDateConsultation").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddConsultation.dateConsultation) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une date consultation correcte";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateConsultation").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.FormAddConsultation.codeMedecin) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un nom interlocuteur correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idcodeMedecin").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddConsultation.NomPrenomMedecin) ==
        false
      ) {
        $scope.messageErreur = "Veuillez renseigner un nom correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNomPrenomMedecin").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddConsultation.TelephoneMedecin) ==
        false
      ) {
        $scope.messageErreur = "Veuillez renseigner un téléphone correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTelephoneMedecin").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormAddConsultation.MontantCommission) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idMontantCommission").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typetaux.test($scope.FormAddConsultation.TauxCommission) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un taux correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTauxCommission").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          if ($scope.FormAddConsultation.idModif1 === "") {
            $scope.FormAddConsultation.patId =
              $scope.recuperer.TI_IDTIERSPATIENT;
          }
          if ($scope.FormAddConsultation.idModif2 === "") {
            $scope.FormAddConsultation.MedId =
              $scope.recuperer.TI_IDTIERSMEDECIN;
          }
          $scope.TYPEOPERATION = "1";
          $scope.CO_CODECONSULTATION = $scope.recuperer.CO_CODECONSULTATION;
        } else {
          $scope.TYPEOPERATION = "0";
        }

        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            SR_CODESERVICE: $scope.FormAddConsultation.Service,
            TY_CODETYPECONSULTATION:
              $scope.FormAddConsultation.typeConsultation,
            MD_CODEMODEADMISSION: $scope.FormAddConsultation.ModeAdmission,
            TI_IDTIERSPATIENT: $scope.FormAddConsultation.patId,
            TI_IDTIERSMEDECIN: $scope.FormAddConsultation.MedId,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CO_DATEDECONSULTATION: $scope.FormAddConsultation.dateConsultation,
            CO_DATEEXPIRATIONCONSULTATION: "01-01-1900",
            CO_MOTIFCONSULTATION: $scope.FormAddConsultation.Motif,
            CO_AUTRESINFORMATIONS: $scope.FormAddConsultation.AutreInfo,
            CO_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            CO_DESCRIPTIONREPRESENTANT: $scope.FormAddConsultation.Representant,
            CO_TAUXMEDECIN: $scope.FormAddConsultation.TauxCommission,
            CO_MONTANTMEDECIN: $scope.FormAddConsultation.MontantCommission,
            CO_CODECONSULTATION: $scope.CO_CODECONSULTATION,
            TI_TELEPHONEMEDECIN: $scope.FormAddConsultation.TelephoneMedecin,
            TI_TELEPHONEPATIENT: $scope.FormAddConsultation.TelephonePatient,
            MS_CODEMODESORTIE: "01",
            CO_CODECONSULTATION1: "",
            TI_IDTIERSASSUREUR: "",
            CO_NUMERODOSSIER: $scope.FormAddConsultation.numDossier,
            CO_TAUXASSURANCE: "0",
            CO_MONTANTASSURANCE: "5000",
            CO_CONTACTREPRESENTANT: "0707839553",
            CO_DATESORTIE: "01-01-1900",
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: $scope.TYPEOPERATION,
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
        if ($scope.etatForm == "2") {
          $http
            .post(
              "/Consultation/ModificationConsultation/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.testModification = reponse.data;
              if (
                $scope.testModification[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $rootScope.EnregistrementReussi(
                  $scope.testModification[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.RetourSurListe = function () {
                  window.location.href =
                    "#/assurances-gestion/CaisseTresorerie/liste/Consultation";
                };
                $scope.$emit("UNLOAD");
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testModification[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testModification[0].clsObjetRetour.SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/Consultation/AjoutConsultation/", $scope.objet_envoie, {
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
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/assurances-gestion/CaisseTresorerie/liste/Consultation";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                } else {
                  $scope.resetFormAddConsultation();
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
      }
    };
    //Fin ajout Consultation (Consultation)

    //debut liste des types Consultation
    $scope.afficheListeTypeConsultation = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SL_LIBELLEECRAN: "CONSULTATION",
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
        .post("/TypeConsultation/ListeTypeConsultation/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listetypeConsultation = reponse.data;
        });
    };
    //fin liste des types Consultation

    //debut liste des  modes admissions
    $scope.afficheListeModeAdmission = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SL_LIBELLEECRAN: "CONSULTATION",
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
        .post("/ModeAdmission/ListeModeAdmission/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeModeAdmission = reponse.data;
        });
    };
    //fin liste des modes admissions

    //debut liste des  services
    $scope.afficheListeService = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SL_LIBELLEECRAN: "CONSULTATION",
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
        .post("/Service/ListeService/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeService = reponse.data;
        });
    };
    //fin liste des services

    //Debut choix d'un souscripteur enregistrement medecin
    $scope.choixSouscrip = function (numPat, nomPat, idPat) {
      $scope.FormAddConsultation.codePatient = numPat;
      $scope.FormAddConsultation.NomPrenomPatient = nomPat;
      $scope.FormAddConsultation.patId = idPat;
      $scope.verou1 = true;
    };
    //Fin choix d'un souscripteur enregistrement medecin

    //debut liste des souscripteur Consultation enregistrement medecin
    $scope.afficheListeTiersSouscrip = function () {
      if (
        $scope.FormAddConsultation.codePatient == "" &&
        $scope.FormAddConsultation.NomPrenomPatient == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            TP_CODETYPETIERS: "001",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "CONSULTATION",
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
            TP_CODETYPETIERS: "001",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddConsultation.codePatient,
            TI_DENOMINATION: $scope.FormAddConsultation.NomPrenomPatient,
            SL_LIBELLEECRAN: "CONSULTATION",
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
        });
    };
    //fin liste des souscripteur Consultation enregistrement medecin

    //Debut choix d'un souscripteur enregistrement medecin
    $scope.choixMedecin = function (numMedecin, nomMedecin, idMedecin) {
      $scope.FormAddConsultation.codeMedecin = numMedecin;
      $scope.FormAddConsultation.NomPrenomMedecin = nomMedecin;
      $scope.FormAddConsultation.MedId = idMedecin;
      $scope.verou1 = true;
    };
    //Fin choix d'un souscripteur enregistrement medecin

    //debut liste des souscripteur Consultation enregistrement medecin
    $scope.afficheListeTiersMedecin = function () {
      if (
        $scope.FormAddConsultation.codeMedecin == "" &&
        $scope.FormAddConsultation.NomPrenomMedecin == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            TP_CODETYPETIERS: "",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "MEDECIN",
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
            TP_CODETYPETIERS: "",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddConsultation.codeMedecin,
            TI_DENOMINATION: $scope.FormAddConsultation.NomPrenomMedecin,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "MEDECIN",
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
          $scope.listeSouscripteursMedecinEnreg = reponse.data;
        });
    };
    //fin liste des souscripteur Consultation enregistrement medecin

    /*Fin developpement ANICETTE*/
  },
]);
