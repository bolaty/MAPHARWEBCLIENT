var MapharApp = angular.module("appGestion", ["ngRoute", "ngCookies"]);

MapharApp.run([
  "$rootScope",
  "$templateCache",
  "$location",
  "$cookies",
  function ($rootScope, $templateCache, $location, $cookies) {
    $rootScope.menu = "";

    /****************************/

    $rootScope.$on("$locationChangeStart", function () {
      $cookies.remove("user1");
      var gestion = "/gestion/tableau-de-bord";
      var assurances = "/assurances/tableau-de-bord";
      var grh = "/grh/tableau-de-bord";
      var assurances_gestion = "/assurances-gestion/tableau-de-bord";

      if ($location.path() == "/") {
        var b = $cookies.get("user");
        if (b !== undefined) {
          $cookies.remove("user1");
          $cookies.remove("user");
          var i = 0;
          i++;
          if ((i = 1)) {
            $rootScope.$on("$viewContentLoaded", function () {
              $templateCache.removeAll();
            });
            parent.location.reload();
            return;
          }
        }
      } else if ($location.path() !== "/assistance-mode") {
        $cookies.put("user1", $cookies.get("user"));
      }
      var b = $cookies.get("user");
      if ($location.path() !== "/" && b === undefined) {
        $rootScope.user = {};
        $location.path("/");
      }
    });

    // temps d'inactivite
    var idleTime = 0;
    $(document).ready(function () {
      //Increment the idle time counter every minute.
      var idleInterval = setInterval(timerIncrement, 1000); // 1 minute
      // console.log(idleInterval);

      //Zero the idle timer on mouse movement.
      $(this).mousemove(function (e) {
        idleTime = 0;
      });
      $(this).keypress(function (e) {
        idleTime = 0;
      });
    });

    function timerIncrement() {
      idleTime = idleTime + 1;
      // deconnexion apres 5mins
      if (idleTime > 14400) {
        // console.log(idleTime);
        $cookies.remove("user1");
        $cookies.remove("user");

        // vider les espaces de rangement
        localStorage.clear();
        sessionStorage.clear();

        // redirection sur la page de connexion
        window.location.href = "#/";

        // rechargement de la page
        parent.location.reload();
      }
    }
    //fin temps d'inactivite

    /**   DECLARATION DES VARIABLES DE GESTION DES DROITS DES ECRAN        ***/
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
   
    // ECRAN TIERS
    $rootScope.TIERS_GENERALE_ETIERS = true;
    $rootScope.GROUPES_DES_TIERS_ETIERS = true;
    $rootScope.TIERS_ETIERS = true;
    $rootScope.PROSPECT_ETIERS = true;
    $rootScope.SITUATION_DES_TIERS_ETIERS = true;
    $rootScope.SITUATIONDESASSUREURS_ETIERS = true;
    $rootScope.COMMERCIAUX_ETIERS = true;
    $rootScope.SITUATION_DES_COMMERCIAUX_ETIERS = true;
    $rootScope.EDITION_ETIERS = true;
    $rootScope.SAIASSUR_ETIERS = true;

    // ECRAN TRESORERIE
    $rootScope.TRESORERIE_GENERALE_ETRSO = true;
    $rootScope.OPERATION_DE_TRESORERIE_ETRSO = true;
    $rootScope.OPERATION_DE_TRESORERIEI_ETRSO = true;
    $rootScope.OPERATION_DE_TRESORERIE_TIERS_ETRSO = true;
    $rootScope.REGLEMENT_ASSURANCE_ETRSO = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_ETRSO = true;
    $rootScope.HABITAT_ETRSO = true;
    $rootScope.INDIVIDUEL_ACCIDENT_ETRSO = true;
    $rootScope.AUTO_ETRSO = true;
    $rootScope.VOYAGE_ETRSO = true;
    $rootScope.RESPONSABILITE_CIVIL_ETRSO = true;
    $rootScope.TRANSPORT_ETRSO = true;
    $rootScope.SANTER_ETRSO = true;
    $rootScope.GESA_ETRSO = true;
    $rootScope.PHARMACIEN_ETRSO = true;
    $rootScope.AUXILIAIRE_ETRSO = true;
    $rootScope.REEDITION_ETRSO = true;
    $rootScope.EDITION_ETRSO = true;
    $rootScope.MODIFICATION_DATE_EMISSION = false;//P
    $rootScope.STMODIFICATION_DATE_EMISSION = '';//P

    //ECRAN PARAMETTRE I
    $rootScope.PARAMETRE_I_GENERALE_EPARAMI = true;
    $rootScope.EXPERT_NOMME_EPARAMI = true;
    $rootScope.CONFIGURATION_DES_PARAMETTRES_EPARAMI = true;
    $rootScope.PARAMETTRE_EPARAMI = true;
    $rootScope.CONFIGURATION_DE_GARANTIE_PAR_RISQUE_EPARAMI = true;
    $rootScope.ETAT_EPARAMI = true;
    $rootScope.EDITION_EPARAMI = true;

    //ECRAN PARAMETTRE II
    $rootScope.PARAMETRE_II_GENERALE_EPARAMII = true;
    $rootScope.PLAN_EPARAMII = true;
    $rootScope.PLAN_COMPTABLE_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_COMPTES_DES_PRODUITS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_FAMILLES_D_OPERATION_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_DES_TIERS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_AUTRES_ECRITURES_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATION_DE_TIERS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_SYSTEME_EPARAMII = true;
    $rootScope.ETATS_EPARAMII = true;
    $rootScope.EDITION_EPARAMII = true;

    //ECRAN ASSURANCE
    $rootScope.ASSURANCE_GENERALE_EASSUR = true;
    $rootScope.ENREGISTREMENT_EASSUR = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSUR = true;
    $rootScope.HABITAT_EASSUR = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EASSUR = true;
    $rootScope.AUTO_EASSUR = true;
    $rootScope.VOYAGE_EASSUR = true;
    $rootScope.RESPONSABILITE_CIVIL_EASSUR = true;
    $rootScope.TRANSPORT_EASSUR = true;
    $rootScope.SANTER_EASSUR = true;
    $rootScope.GESA_EASSUR = true;
    $rootScope.PHARMACIEN_EASSUR = true;
    $rootScope.AUXILIAIRE_EASSUR = true;
    $rootScope.LISTEDEMANDECONTRAT_EASSUR = true;

    $rootScope.TRANSMISSION_EASSURTRANS = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURTRANS = true;
    $rootScope.HABITAT_EASSURTRANS = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EASSURTRANS = true;
    $rootScope.AUTO_EASSURTRANS = true;
    $rootScope.VOYAGE_EASSURTRANS = true;
    $rootScope.RESPONSABILITE_CIVIL_EASSURTRANS = true;
    $rootScope.TRANSPORT_EASSURTRANS = true;
    $rootScope.SANTER_EASSURTRANS = true;
    $rootScope.GESA_EASSURTRANS = true;
    $rootScope.PHARMACIEN_EASSURTRANS = true;
    $rootScope.AUXILIAIRE_EASSURTRANS = true;

    $rootScope.VALIDATION_EASSURVALID = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURVALID = true;
    $rootScope.HABITAT_EASSURVALID = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EASSURVALID = true;
    $rootScope.AUTO_EASSURVALID = true;
    $rootScope.VOYAGE_EASSURVALID = true;
    $rootScope.RESPONSABILITE_CIVIL_EASSURVALID = true;
    $rootScope.TRANSPORT_EASSURVALID = true;
    $rootScope.SANTER_EASSURVALID = true;
    $rootScope.GESA_EASSURVALID = true;
    $rootScope.PHARMACIEN_EASSURVALID = true;
    $rootScope.AUXILIAIRE_EASSURVALID = true;

    $rootScope.OPERATION_EOPERATION = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EOPERATION = true;
    $rootScope.HABITAT_EOPERATION = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EOPERATION = true;
    $rootScope.AUTO_EOPERATION = true;
    $rootScope.VOYAGE_EOPERATION = true;
    $rootScope.RESPONSABILITE_CIVIL_EOPERATION = true;
    $rootScope.TRANSPORT_EOPERATION = true;
    $rootScope.SANTER_EOPERATION = true;
    $rootScope.GESA_EOPERATION = true;
    $rootScope.PHARMACIEN_EOPERATION = true;
    $rootScope.AUXILIAIRE_EOPERATION = true;

    $rootScope.RELANCE_ERELANCE = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERELANCE = true;
    $rootScope.HABITAT_ERELANCE = true;
    $rootScope.INDIVIDUEL_ACCIDENT_ERELANCE = true;
    $rootScope.AUTO_ERELANCE = true;
    $rootScope.VOYAGE_ERELANCE = true;
    $rootScope.RESPONSABILITE_CIVIL_ERELANCE = true;
    $rootScope.TRANSPORT_ERELANCE = true;
    $rootScope.SANTER_ERELANCE = true;
    $rootScope.GESA_ERELANCE = true;
    $rootScope.PHARMACIEN_ERELANCE = true;
    $rootScope.AUXILIAIRE_ERELANCE = true;

    $rootScope.RENOUVELLEMENT_ERENOUVEL = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERENOUVEL = true;
    $rootScope.HABITAT_ERENOUVEL = true;
    $rootScope.INDIVIDUEL_ACCIDENT_ERENOUVEL = true;
    $rootScope.AUTO_ERENOUVEL = true;
    $rootScope.VOYAGE_ERENOUVEL = true;
    $rootScope.RESPONSABILITE_CIVIL_ERENOUVEL = true;
    $rootScope.TRANSPORT_ERENOUVEL = true;
    $rootScope.SANTER_ERENOUVEL = true;
    $rootScope.GESA_ERENOUVEL = true;
    $rootScope.PHARMACIEN_ERENOUVEL = true;
    $rootScope.AUXILIAIRE_ERENOUVEL = true;
    $rootScope.EDITION_ASSURANCE_ERENOUVEL = true;

    //ECRAN COMPTABILITE
    $rootScope.COMPTABILITE_GENERALE_COMPTA = true;
    $rootScope.ECRITURE_COMPTABLE_COMPTA = true;
    $rootScope.ECRITURE_COMPTABLEI_COMPTA = true;
    $rootScope.EXTOURNE_COMPTA = true;
    $rootScope.CLOTURE_EXERCICE_COMPTA = true;
    $rootScope.EDITION_COMPTA = true;

    //ECRAN OUTIL ET SECURITE
    $rootScope.OUTILS_ET_SECURITE_GENERALE_OUTILSECUR = true;
    $rootScope.JOURNEE_DE_TRAVAIL_OUTILSECUR = true;
    $rootScope.CREATION_JOURNEE_OUTILSECUR = true;
    $rootScope.FERMETURE_JOURNEE_OUTILSECUR = true;
    $rootScope.SELECTION_OUTILSECUR = true;
    $rootScope.GESTION_UTILISATEUR_OUTILSECUR = true;
    $rootScope.MOT_DE_PASS_OUTILSECUR = true;
    $rootScope.PROFIL_UTILISATEUR_OUTILSECUR = true;
    $rootScope.UTILISATEUR_OUTILSECUR = true;
    $rootScope.EDITION_OUTILSECUR = true;
    $rootScope.EDITION_OUTILSECUR = true;

    /**  FIN DECLARATION DES VARIABLES DE GESTION DES DROITS DES ECRAN        ***/

    /****************************/

    $rootScope.retourListe = "";
    $rootScope.retourQuestionnaire = "";
    $rootScope.retourSurListeContrat = "";
    $rootScope.retourSitTiersAssureur = "";
    $rootScope.maPosition = "";
    $rootScope.valeurTest = false;
    $rootScope.releveClient = "";
    $rootScope.lEcran = "";
    $rootScope.ecransSituation = "";
    $rootScope.ecranCible = "";
    $rootScope.libelleMenu = "";
    $rootScope.infoBulleNombre = "";
    $rootScope.listeOn = "";
    $rootScope.imageNoticeParametre =
      '<span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24" /> <path d="M12.7442084,3.27882877 L19.2473374,6.9949025 C19.7146999,7.26196679 20.003129,7.75898194 20.003129,8.29726722 L20.003129,15.7027328 C20.003129,16.2410181 19.7146999,16.7380332 19.2473374,17.0050975 L12.7442084,20.7211712 C12.2830594,20.9846849 11.7169406,20.9846849 11.2557916,20.7211712 L4.75266256,17.0050975 C4.28530007,16.7380332 3.99687097,16.2410181 3.99687097,15.7027328 L3.99687097,8.29726722 C3.99687097,7.75898194 4.28530007,7.26196679 4.75266256,6.9949025 L11.2557916,3.27882877 C11.7169406,3.01531506 12.2830594,3.01531506 12.7442084,3.27882877 Z M12,14.5 C13.3807119,14.5 14.5,13.3807119 14.5,12 C14.5,10.6192881 13.3807119,9.5 12,9.5 C10.6192881,9.5 9.5,10.6192881 9.5,12 C9.5,13.3807119 10.6192881,14.5 12,14.5 Z" fill="#000000" /></g></svg></span>';

    /****************************/

    // formater un montant
    $rootScope.formateur = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: "XOF",
    });
    $rootScope.formateur2 = new Intl.NumberFormat("fr");

    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    if ($rootScope.infoDeLoperateur !== null) {
      
      $rootScope.infoDdatejournee = $cookies.get("saveDate");
      if ($rootScope.infoDdatejournee !== undefined) {
        $rootScope.DATE_JOURNEE_DE_TRAVAIL = $rootScope.infoDdatejournee;
      } else {
        $rootScope.DATE_JOURNEE_DE_TRAVAIL =
          $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
      }
    }

    if ($rootScope.infoDeLoperateur != null) {
      $rootScope.PAYSPARDEFAUT = $rootScope.infoDeLoperateur[0].PY_CODEPAYS_REF;
      $rootScope.VILLEPARDEFAUT = $rootScope.infoDeLoperateur[0].VL_CODEVILLE_REF;
      $rootScope.ADRESSESERV = $rootScope.infoDeLoperateur[0].COCHER;
      $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
      $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
      $rootScope.CODE_OPERATEUR =
        $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
      // $rootScope.DATE_JOURNEE_DE_TRAVAIL = $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
      $rootScope.DATE_PREMIER_EXERCICE =
        $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
      $rootScope.DATE_EXERCICE =
        $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    }

    $rootScope.calculDateJourneeDeTravail = function (dateDebut) {
      if (dateDebut !== "") {
        let nouvelleDate = new Date();
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };

    // changer la date de la journee de travail
    $rootScope.nouvelleDateJourneeTravail = function (newDate) {
      $rootScope.DATE_JOURNEE_DE_TRAVAIL = newDate;
      console.log($rootScope.DATE_JOURNEE_DE_TRAVAIL);
    };

    // LES MESSAGES DES TOASTRS
    $rootScope.ChampsNonRenseignes = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Renseignez correctement les champs obligatoires ou non correctes."
      );
    };
    $rootScope.ChampsEffetEcheance = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Les champs effet et échéance sont obligatoires.");
    };
    $rootScope.MessageDesListes = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.info(message);
    };
    $rootScope.MessageDerreurDesTypes = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.dateMiseAJour = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.EnregistrementReussi = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.EnregistrementNonReussi = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.ProblemeServeur = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.warning(message);
    };
    $rootScope.SuppressionReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.SuppressionNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.dateDebutIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de début ne doit pas être supérieure à la date de fin."
      );
    };
    $rootScope.dateFinIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de fin ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.DateNonRenseignes = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("La période est obligatoire.");
    };
    $rootScope.ChampsListeInvalide = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Veuillez renseigner correctement les champs.");
    };
    $rootScope.dateEffetIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'effet ne doit pas être supérieure ni égale à la date d'échéance."
      );
    };
    $rootScope.dateEcheanceDebutIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'échéance ne doit pas être inferieure ou égale à la date d'effet."
      );
    };
    $rootScope.dateFinIncorrecteeffet = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'effet ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.ClotureReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.ClotureNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.TransmissionValidationReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.TransmissionValidationNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.messageSomme = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La somme des montants des échéances doit êtres égale au montant de la facture."
      );
    };
    $rootScope.messagedateEcheance = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("La date d'échéance ne doit pas exister dans la grille.");
    };
    $rootScope.messageInfoBeneficiaire = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Veuillez renseigner toutes les informations sur le bénéficiaire."
      );
    };
    $rootScope.messageInfoCheque = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Veuillez renseigner toutes les informations sur le chèque."
      );
    };
    $rootScope.infoAjoutCheque = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Veuillez ajouter les informations du chèque ou changer le mode de règlement."
      );
    };
    $rootScope.ChampsNonRenseignescorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Assurez-vous d'utiliser des separateurs (/) pour les dates ou veuillez saisir un montant correct."
      );
    };
    $rootScope.MontantCommiIncorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Le montant du versement du jour doit être égal au montant du chèque."
      );
    };
    $rootScope.dateDuRdvDebutIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date du rendez-vous ne doit pas être inférieure à la date de la journée de travail."
      );
    };
    $rootScope.montantincorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Le montant de la valeur neuve ne doit pas être inférieur a la valeur venale."
      );
    };
    $rootScope.valeurtauxincorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("La valeur du taux ne doit pas être supérieure à 100.");
    };
    $rootScope.datemisecirincorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de mise en circulation ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.dateEffetMiscirIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'effet ne doit pas être inférieure ou égale à la date de mise en circulation."
      );
    };
    $rootScope.dateReceptionIncorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'emission ne doit pas être supérieure à la date de reception."
      );
    };
    $rootScope.SuppressionImpossible = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Impossible de supprimer. Le chèque a déjà été validé.");
    };
    $rootScope.ValidationReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.ValidationNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.dateReceptionIncorrected = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de reception ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.soldeatteint = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Votre solde est déjà atteint.");
    };
    $rootScope.saisiemontantinvalide = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Impossible de saisir un montant supérieur au montant de la facture."
      );
    };
    $rootScope.dateEcheancierincorect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de l'échéancier ne doit pas être inférieure à la date de la journée de travail."
      );
    };
    $rootScope.dateEcheancierincorecteffet = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de l'échéancier ne doit pas être inférieure à la date d'effet du contrat."
      );
    };
    $rootScope.dateEcheancierincorectecheance = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de l'échéancier ne doit pas être supérieure à la date d'échéance du contrat."
      );
    };
    $rootScope.saisiemontanttotalinvalide = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Le montant total de l'échéancier ne doit pas être supérieur au montant de la facture."
      );
    };
    $rootScope.Enregistrementchequephoto = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success("Opération réalisée avec succès.");
    };
    $rootScope.Message = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
  },
]);

MapharApp.directive("imgProfile", function ($parse) {
  return {
    restrict: "A",
    link: function (scope, element, attributes) {
      var set = $parse(attributes.imgProfile);
      element.bind("change", function () {
        set.assign(scope, element[0].files);
        scope.$apply();
      });
    },
  };
});

MapharApp.directive("imgSignature", function ($parse) {
  return {
    restrict: "A",
    link: function (scope, element, attributes) {
      var set = $parse(attributes.imgSignature);
      element.bind("change", function () {
        set.assign(scope, element[0].files);
        scope.$apply();
      });
    },
  };
});
