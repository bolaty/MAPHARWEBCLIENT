MapharApp.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl: "Template/default/login.html",
      controller: "OperateurController",
    });
    $routeProvider.when("/assistance-mode", {
      templateUrl: "/Template/default/mode.html",
      controller: "ModeController",
    });

    /*** -------- PAGES OPERATEUR -------- ***/
    //Operateur
    $routeProvider.when("/operateur/liste/utilisateur", {
      templateUrl: "Template/Operateur/Liste/ListeUtilisateur.html",
      controller: "OperateurController",
    });
    $routeProvider.when("/operateur/enregistrement/utilisateur", {
      templateUrl:
        "Template/Operateur/Enregistrement/EnregistrementUtilisateur.html",
      controller: "OperateurController",
    });
    $routeProvider.when("/operateur/modification/utilisateur", {
      templateUrl:
        "Template/Operateur/Enregistrement/ModificationUtilisateur.html",
      controller: "OperateurController",
    });

    //SOUS MENU OPERATEUR

    //droit sur MENU
    $routeProvider.when("/operateur/liste/droit-menu", {
      templateUrl: "Template/Operateur/Liste/ListeDroitMenu.html",
      controller: "DroitSurMenuController",
    });

    // droit sur autre opération de tiers
    $routeProvider.when("/operateur/liste/droit-sur-autre-opération-tiers", {
      templateUrl: "Template/Operateur/Liste/DroitSurAutreOperationTiers.html",
      controller: "DroitAutreOperationTiersController",
    });
    //Droit sur entrepot
    $routeProvider.when("/operateur/liste/droit-sur-entrepot", {
      templateUrl: "Template/Operateur/Liste/DroitSurEntrepot.html",
      controller: "DroitEntrepotController",
    });
    //Droit de transfert de stock
    $routeProvider.when("/operateur/liste/droit-transfert-stock", {
      templateUrl: "Template/Operateur/Liste/DroitTransfertDeStock.html",
      controller: "DroitTransfertStockController",
    });
    //Droit sur famille opérations
    $routeProvider.when("/operateur/liste/droit-sur-famille-operation", {
      templateUrl: "Template/Operateur/Liste/DroitSurFamilleOperation.html",
      controller: "DroitFamilleOperationController",
    });
    //Droit sur agence
    $routeProvider.when("/operateur/liste/droit-sur-agence", {
      templateUrl: "Template/Operateur/Liste/ListeDroitSurAgence.html",
      controller: "DroitAgenceController",
    });
    //Droit sur opérations de trésorerie et autres écritures
    $routeProvider.when(
      "/operateur/liste/droit-sur-opération-tresorerie-autre-tiers",
      {
        templateUrl:
          "Template/Operateur/Liste/DroitSurOperationTresorerieEtAutreEcriture.html",
        controller: "DroitOperationTresorerieEtAutreEcritureController",
      }
    );
    //Droit sur opérations de trésorerie des tiers
    $routeProvider.when(
      "/operateur/liste/droit-sur-opération-tresorerie-tiers",
      {
        templateUrl:
          "Template/Operateur/Liste/DroitSurOperationTresorerieTiers.html",
        controller: "DroitSurOperationTresorerieTiersController",
      }
    );
    //Modification de l'entrepot
    $routeProvider.when("/operateur/liste/modification-entrepot", {
      templateUrl: "Template/Operateur/Liste/ModificationEntrepot.html",
      controller: "ModificationEntrepotController",
    });
    //Droit sur Compte
    $routeProvider.when("/operateur/liste/droit-sur-compte", {
      templateUrl: "Template/Operateur/Liste/DroitSurCompte.html",
      controller: "DroitSurCompteController",
    });

    /*** -------- PAGES ASSURANCES (tableau de bord) -------- ***/

    //TABLEAU DE BORD
    $routeProvider.when("/assurances/tableau-de-bord", {
      templateUrl: "Template/Assurances/Tableau_de_bord.html",
    });

    /*** -------- PAGES ASSURANCES (contrat) -------- ***/

    //MULTIRISQUE PROFESSIONNEL
    $routeProvider.when("/assurances/multirisque-professionnel", {
      templateUrl:
        "Template/Assurances/Listes/Contrat/ListeMultirisqueProfessionnel.html",
      controller: "MultirisqueProfessionnelController",
    });
    $routeProvider.when(
      "/assurances/enregistrement/multirisque-professionnel",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Contrat/EnregistrementMultirisqueProfessionnel.html",
        controller: "MultirisqueProfessionnelController",
      }
    );
    $routeProvider.when("/assurances/modification/multirisque-professionnel", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationMultirisqueProfessionnel.html",
      controller: "MultirisqueProfessionnelController",
    });

    //HABITAT
    $routeProvider.when("/assurances/habitat", {
      templateUrl: "Template/Assurances/Listes/Contrat/ListeHabitat.html",
      controller: "HabitatController",
    });
    $routeProvider.when("/assurances/enregistrement/habitat", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementHabitat.html",
      controller: "HabitatController",
    });
    $routeProvider.when("/assurances/modification/habitat", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationHabitat.html",
      controller: "HabitatController",
    });

    //INDIVIDUEL ACCIDENT
    $routeProvider.when("/assurances/individuel-accident", {
      templateUrl:
        "Template/Assurances/Listes/Contrat/ListeIndividuelAccident.html",
      controller: "IndividuelAccidentController",
    });
    $routeProvider.when("/assurances/enregistrement/individuel-accident", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementIndividuelAccident.html",
      controller: "IndividuelAccidentController",
    });
    $routeProvider.when("/assurances/modification/individuel-accident", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationIndividuelAccident.html",
      controller: "IndividuelAccidentController",
    });

    //AUTO
    $routeProvider.when("/assurances/auto", {
      templateUrl: "Template/Assurances/Listes/Contrat/ListeAuto.html",
      controller: "AutoController",
    });
    $routeProvider.when("/assurances/enregistrement/auto", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementAuto.html",
      controller: "AutoController",
    });
    $routeProvider.when("/assurances/modification/auto", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationAuto.html",
      controller: "AutoController",
    });

    //VOYAGE
    $routeProvider.when("/assurances/voyage", {
      templateUrl: "Template/Assurances/Listes/Contrat/ListeVoyage.html",
      controller: "VoyageController",
    });
    $routeProvider.when("/assurances/enregistrement/voyage", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementVoyage.html",
      controller: "VoyageController",
    });
    $routeProvider.when("/assurances/modification/voyage", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationVoyage.html",
      controller: "VoyageController",
    });
    //QUESTIONNAIRE
    $routeProvider.when(
      "/assurances/contrat/voyage/consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ConsultationsQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    //RESPONSABILITE CIVILE
    $routeProvider.when("/assurances/responsabilite-civile", {
      templateUrl:
        "Template/Assurances/Listes/Contrat/ListeResponsabiliteCivile.html",
      controller: "ResponsabiliteCivileController",
    });
    $routeProvider.when("/assurances/enregistrement/responsabilite-civile", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementResponsabiliteCivile.html",
      controller: "ResponsabiliteCivileController",
    });
    $routeProvider.when("/assurances/modification/responsabilite-civile", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationResponsabiliteCivile.html",
      controller: "ResponsabiliteCivileController",
    });

    //TRANSPORT ET MARCHANDISE
    $routeProvider.when("/assurances/transport-et-marchandise", {
      templateUrl:
        "Template/Assurances/Listes/Contrat/ListeTransportetMarchandise.html",
      controller: "TransportetMarchandiseController",
    });
    $routeProvider.when("/assurances/enregistrement/transport-et-marchandise", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementTransportetMarchandise.html",
      controller: "TransportetMarchandiseController",
    });
    $routeProvider.when("/assurances/modification/transport-et-marchandise", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationTransportetMarchandise.html",
      controller: "TransportetMarchandiseController",
    });

    //SANTE GESA
    $routeProvider.when("/assurances/sante/gesa", {
      templateUrl: "Template/Assurances/Listes/Contrat/ListeSanteGesa.html",
      controller: "AssuranceGESAController",
    });
    $routeProvider.when("/assurances/enregistrement/sante/gesa", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementSanteGesa.html",
      controller: "AssuranceGESAController",
    });
    $routeProvider.when("/assurances/modification/sante/gesa", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationSanteGesa.html",
      controller: "AssuranceGESAController",
    });

    //SANTE PHARMACIEN
    $routeProvider.when("/assurances/sante/pharmacien", {
      templateUrl:
        "Template/Assurances/Listes/Contrat/ListeSantePharmacien.html",
      controller: "SantePharmacienController",
    });
    $routeProvider.when("/assurances/enregistrement/sante/pharmacien", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementSantePharmacien.html",
      controller: "SantePharmacienController",
    });
    $routeProvider.when("/assurances/modification/sante/pharmacien", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationSantePharmacien.html",
      controller: "SantePharmacienController",
    });

    //SANTE AUXILIAIRE
    $routeProvider.when("/assurances/sante/auxiliaire", {
      templateUrl:
        "Template/Assurances/Listes/Contrat/ListeSanteAuxiliaire.html",
      controller: "SanteAuxiliaireController",
    });
    $routeProvider.when("/assurances/enregistrement/SanteAuxiliaire", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementSanteAuxiliaire.html",
      controller: "SanteAuxiliaireController",
    });
    $routeProvider.when("/assurances/modification/SanteAuxiliaire", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationSanteAuxiliaire.html",
      controller: "SanteAuxiliaireController",
    });

    /*** -------- PAGES ASSURANCES (transmission) -------- ***/

    //MULTIRISQUE PROFESSIONNEL
    $routeProvider.when("/assurances/transmission/multirisque-professionnel", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionMultirisqueProfessionnel.html",
      controller: "TransMultirisqueProController",
    });

    //HABITAT
    $routeProvider.when("/assurances/transmission/habitat", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionHabitat.html",
      controller: "TransHabitatController",
    });

    //INDIVIDUEL ACCIDENT
    $routeProvider.when("/assurances/transmission/individuel-accident", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionIndividuelAccident.html",
      controller: "TransIndividuelAccidentController",
    });

    //AUTO
    $routeProvider.when("/assurances/transmission/auto", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionAuto.html",
      controller: "TransAutoController",
    });

    //VOYAGE
    $routeProvider.when("/assurances/transmission/voyage", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionVoyage.html",
      controller: "TransVoyageController",
    });

    //RESPONSABILITE CIVILE
    $routeProvider.when("/assurances/transmission/responsabilite-civile", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionResponsabiliteCivile.html",
      controller: "TransRespoCivileController",
    });

    //TRANSPORT ET MARCHANDISE
    $routeProvider.when("/assurances/transmission/transport-et-marchandise", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionTransportEtMarchandise.html",
      controller: "TransTransportMarchandiseController",
    });

    //SANTE GESA
    $routeProvider.when("/assurances/transmission/sante/gesa", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionGESA.html",
      controller: "TransGesaController",
    });

    //SANTE PHARMACIEN
    $routeProvider.when("/assurances/transmission/sante/pharmacien", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionSantePharmacien.html",
      controller: "TransPharmacienController",
    });

    //SANTE AUXILIAIRE
    $routeProvider.when("/assurances/transmission/sante/auxiliaire", {
      templateUrl:
        "Template/Assurances/Listes/Transmission/TransmissionSanteAuxiliaire.html",
      controller: "TransAuxiliaireController",
    });

    /*** -------- PAGES ASSURANCES (validation) -------- ***/

    //MULTIRISQUE PROFESSIONNEL
    $routeProvider.when("/assurances/validation/multirisque-professionnel", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationMultirisqueProfessionnel.html",
      controller: "ValidMultirisqueProController",
    });

    //HABITAT
    $routeProvider.when("/assurances/validation/habitat", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationHabitat.html",
      controller: "ValidHabitatController",
    });

    //INDIVIDUEL ACCIDENT
    $routeProvider.when("/assurances/validation/individuel-accident", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationIndividuelAccident.html",
      controller: "ValidIndividuelAccidentController",
    });

    //AUTO
    $routeProvider.when("/assurances/validation/auto", {
      templateUrl: "Template/Assurances/Listes/Validation/ValidationAuto.html",
      controller: "ValidAutoController",
    });

    //VOYAGE
    $routeProvider.when("/assurances/validation/voyage", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationVoyage.html",
      controller: "ValidVoyageController",
    });

    //RESPONSABILITE CIVILE
    $routeProvider.when("/assurances/validation/responsabilite-civile", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationResponsabiliteCivile.html",
      controller: "ValidRespoCivileController",
    });

    //TRANSPORT ET MARCHANDISE
    $routeProvider.when("/assurances/validation/transport-et-marchandise", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationTransportEtMarchandise.html",
      controller: "ValidTransportMarchandiseController",
    });

    //SANTE GESA
    $routeProvider.when("/assurances/validation/sante/gesa", {
      templateUrl: "Template/Assurances/Listes/Validation/ValidationGESA.html",
      controller: "ValidGesaController",
    });

    //SANTE PHARMACIEN
    $routeProvider.when("/assurances/validation/sante/pharmacien", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationSantePharmacien.html",
      controller: "ValidPharmacienController",
    });

    //SANTE AUXILIAIRE
    $routeProvider.when("/assurances/validation/sante/auxiliaire", {
      templateUrl:
        "Template/Assurances/Listes/Validation/ValidationSanteAuxiliaire.html",
      controller: "ValidAuxiliaireController",
    });

    /***-------- PAGES ASSURANCES (opération) --------***/

    //LISTES PRINCIPALES (opération)

    //MULTIRISQUE PROFESSIONNEL
    $routeProvider.when(" ", {
      templateUrl:
        "Template/Assurances/Listes/Operation/OperationMultirisqueProfessionnel.html",
      controller: "OperationController",
    });

    //QUESTIONNAIRE

    $routeProvider.when(
      "/assurances/operation/multirisque_professionnel/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    /***-------- PAGES ASSURANCES (edtion) --------***/

    //EDITION
    $routeProvider.when("/assurances/edition", {
      templateUrl: "Template/Assurances/Listes/Edition/EditionAssurance.html",
      controller: "EditionAssuranceController",
    });

    //SOUS ECRANS (opération - multirisque pro)

    //CONSULTATION DES REGELEMENTS
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ConsultationQuestionnaires.html",
        controller: "",
      }
    );

    //SUIVI CLIENT (SAV)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/suivi-client",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeSuiviClient.html",
        controller: "SuiviClientController",
      }
    );
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/enregistrement/suivi-client",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/EnregistrementSuiviClient.html",
        controller: "SuiviClientController",
      }
    );
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/modification/suivi-client",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/ModificationSuiviClient.html",
        controller: "SuiviClientController",
      }
    );
    //SAISIE RDV (SAV)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/saisie-rdv",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeSaisieRDVClient.html",
        controller: "SaisieRDVClientController",
      }
    );
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/enregistrement/saisie-rdv",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/EnregistrementSaisieRDVClient.html",
        controller: "SaisieRDVClientController",
      }
    );
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/modification/saisie-rdv",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/ModificationSaisieRDVClient.html",
        controller: "SaisieRDVClientController",
      }
    );

    //RELEVE CLIENT
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/releve-client",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );

    //RELEVE COMMISSION
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/releve-commission",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeReleveCommission.html",
        controller: "ReleveCommissionController",
      }
    );

    //RELEVE COMPAGNIE ASSURANCE
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/releve-compagnie",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeReleveCompagnieAssurance.html",
        controller: "ReleveCompagnieAssuranceController",
      }
    );

    //SAISIE ECHEANCIER
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/enregistrement/saisie-echeancier",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/EnregistrementSaisieEcheancier.html",
        controller: "SaisieEcheancierController",
      }
    );

    //CONSULATTION DE REGLEMENT
    $routeProvider.when(
      "/gestion/tiers/situation_tiers/consultation_reglement",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeConsultationReglementsST.html",
        controller: "ConsultationReglementController",
      }
    );
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/consultation-reglement",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeConsultationReglementsSP.html",
        controller: "ReleveClientController",
      }
    );

    //SUIVI DOSSIER
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/suivi-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeSuiviDossierSP.html",
        controller: "SuiviDossierController",
      }
    );
    $routeProvider.when("/ListeSuiviDossier", {
      templateUrl:
        "Template/Assurances/Listes/Operation/ListeSuiviDossier.html",
      controller: "SuiviDossierController",
    });
    $routeProvider.when("/EnregistrementSuiviDossierSP", {
      templateUrl:
        "Template/Assurances/Enregistrements/Operation/Enregistrement/EnregistrementSuiviDossierSP.html",
      controller: "SuiviDossierController",
    });
    $routeProvider.when("/ModificationsuiviDossierSP", {
      templateUrl:
        "Template/Assurances/Enregistrements/Operation/Enregistrement/ModificationsuiviDossierSP.html",
      controller: "SuiviDossierController",
    });

    //OUVERTURE DOSSIER (liste)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/ouverture-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeOuvertureDossier.html",
        controller: "OuvertureDossierController",
      }
    );
    //REMISE DE CHEQUE
    $routeProvider.when("/assurances/operation/liste/ListeRemiseDeCheque", {
      templateUrl:
        "Template/Assurances/Listes/Operation/ListeRemiseDeCheque.html",
      controller: "RemiseDeChequeController",
    });

    $routeProvider.when("/assurances/operation/enregistrement/RemiseDeCheque", {
      templateUrl:
        "Template/Assurances/Enregistrements/Operation/Enregistrement/RemiseDeCheque.html",
      controller: "RemiseDeChequeController",
    });

    $routeProvider.when(
      "/assurances/operation/modification/ModificationRemiseDeCheque",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/ModificationRemiseDeCheque.html",
        controller: "RemiseDeChequeController",
      }
    );

    $routeProvider.when("/assurances/operation/liste/DocumentRemiseDeCheque", {
      templateUrl:
        "Template/Assurances/Listes/Operation/DocumentRemiseDeCheque.html",
      controller: "RemiseDeChequeController",
    });

    //OUVERTURE DOSSIER (enregistrement)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/enregistrement/ouverture-dossier",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/EnregistrementOuvertureDossier.html",
        controller: "OuvertureDossierController",
      }
    );
    //OUVERTURE DOSSIER (modification)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/modification/ouverture-dossier",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Operation/Enregistrement/ModificationOuvertureDossier.html",
        controller: "OuvertureDossierController",
      }
    );
    //OUVERTURE DOSSIER (document)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/document/ouverture-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/DocumentOuvertureDossier.html",
        controller: "OuvertureDossierController",
      }
    );

    //TRANSMISSION DU DOSSIER
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/transmission-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeTransmissionDossier.html",
        controller: "TransmissionDossierController",
      }
    );
    //TRANSMISSION DOSSIER (document)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/document/transmission-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/DocumentTransmissionDossier.html",
        controller: "TransmissionDossierController",
      }
    );

    //VALIDATION DU DOSSIER
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/validation-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeValidationDossier.html",
        controller: "ValidationDossierController",
      }
    );
    //VALIDATION DOSSIER (document)
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/document/validation-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/DocumentValidationDossier.html",
        controller: "ValidationDossierController",
      }
    );

    //CLOTURE DU DOSSIER
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/cloture-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeClotureDossier.html",
        controller: "ClotureDossierController",
      }
    );

    //CHEQUE
    $routeProvider.when("/assurances/operation/multirisque-pro/liste/cheque", {
      templateUrl: "Template/Assurances/Listes/Operation/ListeCheque.html",
      controller: "ChequeController",
    });
    $routeProvider.when("/assurances/operation/enregistrement/cheque", {
      templateUrl:
        "Template/Assurances/Enregistrements/Operation/Enregistrement/EnregistrementCheque.html",
      controller: "ChequeController",
    });
    $routeProvider.when("/assurances/operation/modification/cheque", {
      templateUrl:
        "Template/Assurances/Enregistrements/Operation/Enregistrement/ModificationCheque.html",
      controller: "ChequeController",
    });
    $routeProvider.when("/assurances/operation/document/cheque", {
      templateUrl: "Template/Assurances/Listes/Operation/DocumentCheque.html",
      controller: "ChequeController",
    });

    //SAISIE RDV CLIENT
    $routeProvider.when("/assurances/operation/SaisieRDVClient", {
      templateUrl:
        "Template/Assurances/Listes/Contrat/ListeSaisieRDVClient.html",
      controller: "SaisieRDVClientController",
    });
    $routeProvider.when(
      "/assurances/operation/enregistrement/SaisieRDVClient",
      {
        templateUrl:
          "Template/Assurances/Enregistrements/Contrat/EnregistrementSaisieRDVClient.html",
        controller: "SaisieRDVClientController",
      }
    );
    $routeProvider.when("/assurances/operation/modification/SaisieRDVClient", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationSaisieRDVClient.html",
      controller: "SaisieRDVClientController",
    });

    //SAISIE SUIVI CLIENT
    $routeProvider.when("/assurances/operation/SuiviClient", {
      templateUrl: "Template/Assurances/Listes/Contrat/ListeSuiviClient.html",
      controller: "SuiviClientController",
    });
    $routeProvider.when("/assurances/operation/enregistrement/SuiviClient", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/EnregistrementSuiviClient.html",
      controller: "SuiviClientController",
    });
    $routeProvider.when("/assurances/operation/modification/SuiviClient", {
      templateUrl:
        "Template/Assurances/Enregistrements/Contrat/ModificationSuiviClient.html",
      controller: "SuiviClientController",
    });

    //MULTIRISQUE PRO
    $routeProvider.when(
      "/assurances/operation/liste/multirisque-professionnel",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationMultirisqueProfessionnel.html",
        controller: "OperationController",
      }
    );

    //HABITAT
    $routeProvider.when("/assurances/operation/liste/habitat", {
      templateUrl: "Template/Assurances/Listes/Operation/OperationHabitat.html",
      controller: "OperationController",
    });

    $routeProvider.when(
      "/assurances/operation/habitat/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    //INDIVIDUEL ACCIDENT
    $routeProvider.when("/assurances/operation/liste/individuel-accident", {
      templateUrl:
        "Template/Assurances/Listes/Operation/OperationIndividuelAccident.html",
      controller: "OperationController",
    });

    $routeProvider.when(
      "/assurances/operation/IndividuelAccident/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );
    //AUTO
    $routeProvider.when("/assurances/operation/liste/auto", {
      templateUrl: "Template/Assurances/Listes/Operation/OperationAuto.html",
      controller: "OperationController",
    });
    $routeProvider.when(
      "/assurances/operation/auto/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    //VOYAGE
    $routeProvider.when("/assurances/operation/liste/voyage", {
      templateUrl: "Template/Assurances/Listes/Operation/OperationVoyage.html",
      controller: "OperationController",
    });
    $routeProvider.when(
      "/assurances/operation/voyage/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    //RESPONSABILITE CIVILE
    $routeProvider.when("/assurances/operation/liste/responsabilite-civile", {
      templateUrl:
        "Template/Assurances/Listes/Operation/OperationRespoCivile.html",
      controller: "OperationController",
    });
    $routeProvider.when(
      "/assurances/operation/responsabilite-civile/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    //TRANSPORT ET MARCHANDISE
    $routeProvider.when("/assurances/operation/liste/transport-marchandise", {
      templateUrl:
        "Template/Assurances/Listes/Operation/OperationTransportMarchandise.html",
      controller: "OperationController",
    });
    $routeProvider.when(
      "/assurances/operation/transport-marchandise/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    //SANTE GESA
    $routeProvider.when("/assurances/operation/liste/sante-gesa", {
      templateUrl: "Template/Assurances/Listes/Operation/OperationGesa.html",
      controller: "OperationController",
    });
    $routeProvider.when(
      "/assurances/operation/sante-gesa/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    //SANTE PHARMACIEN
    $routeProvider.when("/assurances/operation/liste/sante-pharmacien", {
      templateUrl:
        "Template/Assurances/Listes/Operation/OperationPharmacien.html",
      controller: "OperationController",
    });
    $routeProvider.when(
      "/assurances/operation/sante-pharmacien/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );
    //SANTE AUXILIAIRE
    $routeProvider.when("/assurances/operation/liste/sante-auxiliaire", {
      templateUrl:
        "Template/Assurances/Listes/Operation/OperationAuxiliaire.html",
      controller: "OperationController",
    });
    $routeProvider.when(
      "/assurances/operation/sante-auxiliaire/Operation-consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/OperationConsultationQuestionnaires.html",
        controller: "ConsultationsQuestionnairesController",
      }
    );

    /*** -------- PAGES GESTION (tableau de bord)--------***/

    $routeProvider.when("/gestion/tableau-de-bord", {
      templateUrl: "Template/Gestion/Tableau_de_bord.html",
    });

    //LISTES PRINCIPALES (Reglement assurance)

    //MULTIRISQUE PROFESSIONNEL
    $routeProvider.when(
      "/gestion/ReglementAssurance/liste/multirisque-professionnel",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceMP.html",
        controller: "ReglementAssuranceMPController",
      }
    );
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/multirisque-pro/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when("/gestion/ReglementAssurance/releve-commission", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommission.html",
      controller: "ReleveCommissionController",
    });
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/multirisque-pro/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    $routeProvider.when("/EnregistrementDeCheque", {
      templateUrl:
        "/Template/Gestion/CaisseTresorerie/Listes/EnregistrementDeCheque.html",
      controller: "ReglementFactureClientController",
    });
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/multirisque-pro/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/multirisque-pro/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );
    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/multirisque-pro/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Enregistrements/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/multirisque-pro/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );

    //HABITAT
    $routeProvider.when("/gestion/ReglementAssurance/liste/habitat", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceHabitat.html",
      controller: "ReglementAssuranceMPController",
      // controller: "ReglementAssuranceHabitatController",
    });
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/habitat/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/habitat/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/habitat/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/habitat/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/habitat/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );

    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/habitat/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/habitat/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //INDIVIDUEL ACCIDENT
    $routeProvider.when(
      "/gestion/ReglementAssurance/liste/individuel-accident",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceIndividuelAccident.html",
        controller: "ReglementAssuranceMPController",
        // controller: "ReglementAssuranceIndividuelAccidentController",
      }
    );
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/individuel-accident/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/individuel-accident/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/individuel-accident/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/individuel-accident/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/individuel-accident/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );
    $routeProvider.when(
      "/gestion/ReglementAssurance/auto/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );
    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/individuel-accident/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/individuel-accident/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //AUTO
    $routeProvider.when("/gestion/ReglementAssurance/liste/auto", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceAuto.html",
      controller: "ReglementAssuranceMPController",
      // controller: "ReglementAssuranceAutoController",
    });
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/auto/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/auto/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/auto/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/auto/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestionReglementAssurance/auto/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );

    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/auto/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/auto/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //VOYAGE
    $routeProvider.when("/gestion/ReglementAssurance/liste/voyage", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceVoyage.html",
      controller: "ReglementAssuranceMPController",
      // controller: "ReglementAssuranceVoyageController",
    });
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/voyage/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/voyage/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/voyage/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/voyage/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/voyage/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );
    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/voyage/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/voyage/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //RESPONSABILITE CIVILE
    $routeProvider.when(
      "/gestion/ReglementAssurance/liste/responsabilite-civile",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceRespoCivile.html",
        controller: "ReglementAssuranceMPController",
        // controller: "ReglementAssuranceRespoCivileController",
      }
    );
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/responsabilite-civile/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/responsabilite-civile/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/responsabilite-civile/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/responsabilite-civile/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/responsabilite-civile/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );

    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/responsabilite-civile/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/responsabilite-civile/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //TRANSPORT ET MARCHANDISE
    $routeProvider.when(
      "/gestion/ReglementAssurance/liste/transport-marchandise",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceTransportMarchandise.html",
        controller: "ReglementAssuranceMPController",
        // controller: "ReglementAssuranceTransportMarchandiseController",
      }
    );
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/transport-marchandise/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/transport-marchandise/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/transport-marchandise/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/transport-marchandise/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/transport-marchandise/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );

    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/transport-marchandise/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/transport-marchandise/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //SANTE AUXILIAIRE
    $routeProvider.when("/gestion/ReglementAssurance/liste/sante-auxiliaire", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceSanteAuxiliaire.html",
      controller: "ReglementAssuranceMPController",
      // controller: "ReglementAssuranceAuxiliaireController",
    });
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-auxiliaire/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-auxiliaire/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-auxiliaire/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-auxiliaire/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-auxiliaire/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );

    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-auxiliaire/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-auxiliaire/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //SANTE GESA
    $routeProvider.when("/gestion/ReglementAssurance/liste/sante-gesa", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceSanteGesa.html",
      controller: "ReglementAssuranceMPController",
      // controller: "ReglementAssuranceGesaController",
    });
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-gesa/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-gesa/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-gesa/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-gesa/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-gesa/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );

    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-gesa/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-gesa/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //SANTE PHARMACIEN
    $routeProvider.when("/gestion/ReglementAssurance/liste/sante-pharmacien", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Listes/ReglementAssuranceSantePharmacien.html",
      controller: "ReglementAssuranceMPController",
      // controller: "ReglementAssurancePharmacienController",
    });
    //Relevé client
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-pharmacien/liste/releve-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveClient.html",
        controller: "ReleveClientController",
      }
    );
    //relévé Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-pharmacien/liste/releve-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReleveCommissionAssurance.html",
        controller: "ReleveCommissionController",
      }
    );
    //Règlement facture client
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-pharmacien/liste/reglement-facture-client",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/reglement-facture-client.html",
        controller: "ReglementFactureClientController",
      }
    );
    //Règlement Commission Assurance
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-pharmacien/liste/reglement-commission-assurance",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeReglementCommissionAssurance.html",
        controller: "ReglementCommissionAssuranceController",
      }
    );
    //REGLEMENT COMMISSION DES COMMERCIAUX
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-pharmacien/liste/reglement-commission-commerciaux",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ReglementCommissionsCommerciaux.html",
        controller: "CommissionCommerciauxController",
      }
    );

    //remise chèque sinitre
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-pharmacien/liste/remise-cheque-sinitre",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/RemiseChequeSinistre.html",
        controller: "RemiseChequeController",
      }
    );
    // afficher règlement chèque
    $routeProvider.when(
      "/gestion/ReglementAssurance/sante-pharmacien/liste/afficher-reglement-cheque",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/AfficherReglementCheque.html",
        controller: "ReglementChequeController",
      }
    );
    //SOUS ECRANS (Reglement assurance)

    /*** -------- PAGES GESTION (écrans)--------***/
    // Consultation
    $routeProvider.when(
      "/assurances-gestion/CaisseTresorerie/liste/Consultation",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Listes/ListeConsultation.html",
        controller: "ConsultationController",
      }
    );
    $routeProvider.when(
      "/assurances-gestion/CaisseTresorerie/Enregistrements/Consultation",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Enregistrements/AjoutConsultation.html",
        controller: "ConsultationController",
      }
    );
    $routeProvider.when(
      "/assurances-gestion/CaisseTresorerie/Enregistrements/ModificationConsultation",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Enregistrements/ModificationConsultation.html",
        controller: "ConsultationController",
      }
    );

    // REEDITION
    $routeProvider.when("/gestion/tresorerie/enregistrement/reedition", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Enregistrements/Reedition.html",
      controller: "ReeditionController", // le controller n'existe pas
    });

    // CLOTURE D'EXERCICE
    $routeProvider.when("/gestion/comptabilite/cloture-exercice", {
      templateUrl: "Template/Gestion/Comptabilite/ClotureDexercice.html",
      controller: "ClotureDexerciceController", // le controller n'existe pas
    });

    //EDITION TIERS
    $routeProvider.when("/gestion/Tiers/EditionTiers", {
      templateUrl: "Template/Gestion/Tiers/EditionTiers.html",
      controller: "EditionTiersController",
    });

    //TIERS
    $routeProvider.when("/gestion/liste/saisieAssureurs", {
      templateUrl:
        "Template/Gestion/Tiers/SaisieAssureur/ListeSaisieAssureur.html",
      controller: "SaisieAssureurController",
    });
    $routeProvider.when("/gestion/enregistrement/saisieAssurances", {
      templateUrl:
        "Template/Gestion/Tiers/SaisieAssureur/EnregistrementSaisieAssureur.html",
      controller: "SaisieAssureurController",
    });
    $routeProvider.when("/gestion/modification/saisieAssurances", {
      templateUrl:
        "Template/Gestion/Tiers/SaisieAssureur/ModificationSaisieAssureur.html",
      controller: "SaisieAssureurController",
    });

    $routeProvider.when("/gestion/liste/tiers", {
      templateUrl: "Template/Gestion/Tiers/ListeTiers.html",
      controller: "TiTiersController",
    });
    $routeProvider.when("/gestion/enregistrement/tiers", {
      templateUrl: "Template/Gestion/Tiers/EnregistrementTiers.html",
      controller: "TiTiersController",
    });
    $routeProvider.when("/gestion/modification/tiers", {
      templateUrl: "Template/Gestion/Tiers/ModificationTiers.html",
      controller: "TiTiersController",
    });

    //Situation Tiers
    $routeProvider.when("/assurances-gestion/Tiers/SituationTiers", {
      templateUrl: "Template/Gestion/Tiers/SituationTiers.html",
      controller: "SituationTiersController",
    });

    //LISTE COMMANDES
    $routeProvider.when("/assurances-gestion/Tiers/ListeCommandes", {
      templateUrl: "Template/Gestion/Tiers/ListeCommandes.html",
      controller: "ListeCommandesController",
    });

    $routeProvider.when("/Tiers/GroupeTiers", {
      templateUrl: "Template/Gestion/Tiers/GroupeTiers.html",
      controller: "GroupeTiersController",
    });

    $routeProvider.when("/Tiers/SituationDesAssureurs", {
      templateUrl: "Template/Gestion/Tiers/SituationDesAssureurs.html",
      controller: "SituationDesAssureursController",
    });

    $routeProvider.when("/Tiers/SituationDesCommerciaux", {
      templateUrl: "Template/Gestion/Tiers/SituationDesCommerciaux.html",
      controller: "SituationDesCommerciauxController",
    });

    $routeProvider.when("/Tiers/Enregistrement/EnregistrementGroupeTiers", {
      templateUrl: "Template/Gestion/Tiers/EnregistrementGroupeTiers.html",
      controller: "GroupeTiersController",
    });
    $routeProvider.when("/Tiers/Modification/ModificationGroupeTiers", {
      templateUrl: "Template/Gestion/Tiers/ModificationGroupeTiers.html",
      controller: "GroupeTiersController",
    });

    //PROFILS
    $routeProvider.when("/OutilsEtSecurites/liste/profils", {
      templateUrl: "Template/OutilsEtSecurites/Liste/ListeProfils.html",
      controller: "ProfilsController",
    });

    // les droits sur les profils
    $routeProvider.when("/OutilsEtSecurites/liste/profils/DroitAgence", {
      templateUrl:
        "Template/OutilsEtSecurites/Liste/ListeDroitAgenceProfil.html",
      controller: "DroitAgenceProfilsController",
    });
    $routeProvider.when("/OutilsEtSecurites/liste/profils/DroitEntrepot", {
      templateUrl:
        "Template/OutilsEtSecurites/Liste/ListeDroitEntrepotProfil.html",
      controller: "DroitEntrepotProfilsController",
    });
    $routeProvider.when("/OutilsEtSecurites/liste/profils/DroitFamOperation", {
      templateUrl:
        "Template/OutilsEtSecurites/Liste/ListeDroitFamilleOperationProfil.html",
      controller: "DroitFamOperationProfilsController",
    });
    $routeProvider.when("/OutilsEtSecurites/liste/profils/DroitMenu", {
      templateUrl: "Template/OutilsEtSecurites/Liste/ListeDroitMenuProfil.html",
      controller: "DroitMenuProfilsController",
    });
    $routeProvider.when(
      "/OutilsEtSecurites/liste/profils/DroitTransfertStock",
      {
        templateUrl:
          "Template/OutilsEtSecurites/Liste/ListeDroitTransfertStockProfil.html",
        controller: "DroitTransfertStockProfilsController",
      }
    );

    $routeProvider.when("/OutilsEtSecurites/liste/MonExercice", {
      templateUrl: "Template/OutilsEtSecurites/Liste/MonExercice.html",
      controller: "ProfilsController",
    });
    $routeProvider.when("/assurances/operation/liste/DocumentMonExercice", {
      templateUrl:
        "Template/Assurances/Listes/Operation/DocumentMonExercice.html",
      controller: "ProfilsController",
    });
    $routeProvider.when("/OutilsEtSecurites/enregistrement/profils", {
      templateUrl:
        "Template/OutilsEtSecurites/Enregistrement/EnregistrementProfils.html",
      controller: "ProfilsController",
    });
    $routeProvider.when("/OutilsEtSecurites/modification/profils", {
      templateUrl:
        "Template/OutilsEtSecurites/Enregistrement/ModificationProfils.html",
      controller: "ProfilsController",
    });

    /*** -------- PAGES GRH --------***/

    $routeProvider.when("/grh/tableau-de-bord", {
      templateUrl: "Template/Grh/Tableau_de_bord.html",
    });

    /*** -------- PAGES ASSURANCE - GESTION --------***/

    $routeProvider.when("/assurances-gestion/tableau-de-bord", {
      templateUrl: "Template/Grh/Tableau_de_bord.html",
    });

    /* -------- STOCK --------*/

    //approvisionnement
    $routeProvider.when("/assurances-gestion/stocks/liste/approvisionnement", {
      templateUrl: "Template/Gestion/Stocks/ListeApprovisionnements.html",
      controller: "ApprovisionnementStockController",
    });

    //approvisionnement
    $routeProvider.when("/assurances-gestion/tresorerie/liste/vente", {
      templateUrl: "Template/Gestion/CaisseTresorerie/Listes/ListeVentes.html",
      controller: "VentesController",
    });

    //operation de tresorerie tiers
    $routeProvider.when(
      "/assurances-gestion/tresorerie/enregistrement/operation-tresorerie-tiers",
      {
        templateUrl:
          "Template/Gestion/CaisseTresorerie/Enregistrements/OperationsTresorerieTiers.html",
        controller: "OpTresorerieTiersController",
      }
    );

    // COMPTABILITE
    $routeProvider.when("/Comptabilite/SaisieEcritureComptable", {
      templateUrl: "Template/Gestion/Comptabilite/SaisieEcritureComptable.html",
      controller: "SaisieEcritureComptableController",
    });
    $routeProvider.when("/Comptabilite/EcrituresAutomatiquesDesTiers", {
      templateUrl:
        "Template/Gestion/Comptabilite/EcrituresAutomatiquesDesTiers.html",
      controller: "EcritureAutoTiersController",
    });
    //Extourne
    $routeProvider.when("/Comptabilite/Extourne", {
      templateUrl: "Template/Gestion/Comptabilite/Extourne.html",
      controller: "ExtourneController",
    });
    //Edtion
    $routeProvider.when("/Comptabilite/Edition", {
      templateUrl: "Template/Gestion/Comptabilite/EditionComptablite.html",
      controller: "EditionComptabiliteController",
    });

    //approvisionnement
    $routeProvider.when("/Stocks/enregistrement/EditionStock", {
      templateUrl: "Template/Gestion/Stocks/EditionStock.html",
      controller: "EditionStockController",
    });

    /*** -------- PAGES OUTILS ET SECURITES (écrans)--------***/
    //Creation exercice
   
    $routeProvider.when(
      "/outils&securites/enregistrement/EnregistrementExercice",
      {
        templateUrl:
          "Template/OutilsEtSecurites/Enregistrement/EnregistrementExercice.html",
        controller: "CreationExerciceController",
      }
    );
    $routeProvider.when(
      "/OutilsEtSecurites/Liste/ListecreationExercice",
      {
        templateUrl:
          "Template/OutilsEtSecurites/Liste/ListecreationExercice.html",
        controller: "CreationExerciceController",
      }
    );
    $routeProvider.when(
      "/outils&securites/enregistrement/ModificationExercice",
      {
        templateUrl:
          "Template/OutilsEtSecurites/Enregistrement/ModificationExercice.html",
        controller: "CreationExerciceController",
      }
    );
    //creation-jrneeTravail
    $routeProvider.when("/outils&securites/liste/creation-jrneeTravail", {
      templateUrl:
        "Template/OutilsEtSecurites/Liste/ListeCreationJrneeTravail.html",
      controller: "CreationJrneeTravailController",
    });
    $routeProvider.when(
      "/outils&securites/enregistrement/creation-jrneeTravail",
      {
        templateUrl:
          "Template/OutilsEtSecurites/Enregistrement/EnregistrementCreationJrneeTravail.html",
        controller: "CreationJrneeTravailController",
      }
    );

    // edition outils et securité
    $routeProvider.when("/outils&securites/edition/edition", {
      templateUrl:
        "Template/OutilsEtSecurites/Edition/EditionOutilsEtSecurite.html",
      controller: "EditionOutilsSecuriteController",
    });

    //Operateur  fermeture-jrneeTravail
    $routeProvider.when(
      "/outils&securites/enregistrement/fermeture-jrneeTravail",
      {
        templateUrl:
          "Template/OutilsEtSecurites/Enregistrement/EnregistrementFermetureJrneeTravail.html",
        controller: "FermetureJrneeTravailController",
      }
    );
    //Operateur  Mot de passe
    $routeProvider.when("/outils&securites/liste/Mot-De-Passe", {
      templateUrl: "Template/OutilsEtSecurites/Liste/ListeMotDePasse.html",
      controller: "MotDePasseController",
    });

    // EDITION TRESORERIE
    $routeProvider.when("/Caisse/EditionTresorerie", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Enregistrements/EditionTresorerie.html",
      controller: "EditionTresorerieController",
    });

    /*** -------- PAGES PARAMETRE II (tableau de bord)--------***/
    // EDITION PARAMETRE II
    $routeProvider.when("/parametreII/liste/edition-parametreII", {
      templateUrl: "Template/ParametreII/EditionParametreII.html",
      controller: "EditionParametreIIController",
    });

    // plan comptable
    $routeProvider.when("/parametre2/planComptable", {
      templateUrl: "Template/ParametreII/PlanComptable.html",
      controller: "Parametre2Controller",
    });

    $routeProvider.when("/parametre2/planComptableModif", {
      templateUrl: "Template/ParametreII/PlanComptableModif.html",
      controller: "Parametre2Controller",
    });

    $routeProvider.when("/parametre2/planComptable/liste", {
      templateUrl: "Template/ParametreII/PlanComptableListe.html",
      controller: "Parametre2Controller",
    });

    // parametrage des operations
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageComptesProduits",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageDesComptesDesproduits.html",
        controller: "parametrageComptesProduitsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageFamillesOperations/liste",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageFamillesOperationsListe.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageFamillesOperations/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageFamillesOperationsEnregistrement.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageFamillesOperations/modification",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageFamillesOperationsModification.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsTresorerie/liste",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsTresorerieListe.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsTresorerie/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsTresoreriesEnregistrement.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsTresorerie/modification",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsTresoreriesModification.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsTresorerieTiers/liste",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsTresorerieTiersListe.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsTresorerieTiers/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsTresorerieTiersEnregistrement.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsTresorerieTiers/modification",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsTresorerieTiersModification.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageAutresEcritures/liste",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageAutresEcrituresListe.html",
        controller: "parametrageComptesProduitsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageAutresEcritures",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageAutresEcritures.html",
        controller: "parametrageComptesProduitsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageAutresEcrituresmodif",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageAutresEcrituresmodif.html",
        controller: "parametrageComptesProduitsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageAutresOperationsTiers/liste",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageAutresOperationsTiersListe.html",
        controller: "parametrageAutreOperationDesTiersController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageAutresOperationsTiers",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageAutresOperationsTiers.html",
        controller: "parametrageAutreOperationDesTiersController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageAutresOperationsTiersmodif",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageAutresOperationsTiersmodif.html",
        controller: "parametrageAutreOperationDesTiersController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsSysteme/liste",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsSystemesListe.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsSysteme/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsSystemesEnregistrement.html",
        controller: "ParametrageOperationsController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametrageOperations/parametrageOperationsSysteme/modification",
      {
        templateUrl:
          "Template/ParametreII/ParametrageOperations/ParametrageOperationsSystemesModification.html",
        controller: "ParametrageOperationsController",
      }
    );

    //PARAMETRE BUDGET
    $routeProvider.when("/parametre2/parametresBudget/typeDeBudget/liste", {
      templateUrl:
        "Template/ParametreII/ParametresBudget/TypeDeBudgetListe.html",
      controller: "ParametresBudgetController",
    });
    $routeProvider.when(
      "/parametre2/parametresBudget/typeDeBudget/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/TypeDeBudgetEnregistrement.html",
        controller: "ParametresBudgetController",
      }
    );
    $routeProvider.when("/parametre2/parametresBudget/posteBudgetaire/liste", {
      templateUrl:
        "Template/ParametreII/ParametresBudget/PosteBudgetaireListe.html",
      controller: "ParametresBudgetController",
    });
    $routeProvider.when(
      "/parametre2/parametresBudget/posteBudgetaire/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/PosteBudgetaireEnregistrement.html",
        controller: "ParametresBudgetController",
      }
    );
    $routeProvider.when("/ParametreII/DetailsDuTypeDeBudget/liste", {
      templateUrl:
        "Template/ParametreII/ParametresBudget/DetailsDuTypeDeBudgetListe.html",
      controller: "ParametresDetailsDuTypeDeBudgetController",
    });
    $routeProvider.when(
      "/ParametreII/EnregistrementDetailsDuTypeDeBudget/Enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/DetailsDuTypeDeBudgetEnregistrement.html",
        controller: "ParametresDetailsDuTypeDeBudgetController",
      }
    );

    // famille de biens immobilisées
    $routeProvider.when("/parametre2/FamilleDeBiensImmobilises/liste", {
      templateUrl: "Template/ParametreII/FamilleDeBiensImmobilisesListe.html",
      controller: "FamilleDeBiensImmobilisesController",
    });
    /*  $routeProvider.when(
      "/Template/ParametreII/FamilleDeBiensImmobilisesListe",
      {
        templateUrl: "Template/ParametreII/FamilleDeBiensImmobilisesListe.html",
        controller: "FamilleDeBiensImmobilisesController",
      }
    ); */
    $routeProvider.when(
      "/parametre2/familleDeBiensImmobilises/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/FamilleDeBiensImmobilisesEnregistrement.html",
        controller: "FamilleDeBiensImmobilisesController",
      }
    );
    $routeProvider.when("/parametre2/familleDeBiensImmobilises/modification", {
      templateUrl:
        "Template/ParametreII/FamilleDeBiensImmobilisesModification.html",
      controller: "FamilleDeBiensImmobilisesController",
    });

    // journal
    $routeProvider.when("/parametre2/journal/liste", {
      templateUrl: "Template/ParametreII/Plan/Journal.html",
      controller: "Parametre2Controller",
    });
    $routeProvider.when("/parametre2/journal/enregistrement", {
      templateUrl: "Template/ParametreII/Plan/JournalEnregistrement.html",
      controller: "Parametre2Controller",
    });
    $routeProvider.when("/parametre2/journal/modification", {
      templateUrl: "Template/ParametreII/Plan/JournalModification.html",
      controller: "Parametre2Controller",
    });

    // famille amortissement
    $routeProvider.when("/ParametreII/FamilleAmortissement/liste", {
      templateUrl: "Template/ParametreII/FamilleAmortissementListe.html",
      controller: "ParametresFamilleAmortissementController",
    });
    $routeProvider.when(
      "/ParametreII/EnregistrementFamilleAmortissement/Enregistrement",
      {
        templateUrl:
          "Template/ParametreII/FamilleAmortissementEnregistrement.html",
        controller: "ParametresFamilleAmortissementController",
      }
    );
    $routeProvider.when(
      "/ParametreII/ModificationFamilleAmortissement/Modification",
      {
        templateUrl:
          "Template/ParametreII/FamilleAmortissementModification.html",
        controller: "ParametresFamilleAmortissementController",
      }
    );

    /*** -------- PARAMETRE I--------***/
    $routeProvider.when("/ParametreI/EditionParametre", {
      templateUrl: "Template/ParametreI/EditionParametre.html",
      controller: "ParametreIController",
    });

    // configuration des parametres | parametre
    $routeProvider.when("/ParametreI/ConfigurationParametre/Parametre", {
      templateUrl: "Template/ParametreI/ConfigurationParametre/Parametre.html",
      controller: "ParametreIController",
    });
    // configuration des parametres | configuration de garantie par risque
    $routeProvider.when(
      "/Parametre1/ConfigurationParametre/ConfigGarantieParRisque",
      {
        templateUrl:
          "Template/ParametreI/ConfigurationParametre/ConfigurationGarantieParRisque.html",
        controller: "ParametreIController",
      }
    );

    /*** -------- ARTICLES ET PRESTATIONS--------***/
    $routeProvider.when("/ArticlesEtPrestations/Edition", {
      templateUrl:
        "Template/Grh/ArticlesEtPrestations/EditionArticlesEtPrestations.html",
      controller: "EditionArticlesEtPrestationsController",
    });

    // OPERATION TRESORIE
    $routeProvider.when("/Caisse/OperationsCaisse", {
      templateUrl:
        "Template/Gestion/CaisseTresorerie/Enregistrements/OperationsCaisse.html",
      controller: "OperationsCaisseController",
    });
    $routeProvider;

    //ASSURANCE-GESTION-CONTRAT----------------------
    $routeProvider.when(
      "/Assurances-gestion/Tiers/liste/Multi-Risque-Professionel",
      {
        templateUrl: "Template/Gestion/Tiers/Multirisqueprofessionel.html",
        controller: "SituationTiersController",
      }
    );
    $routeProvider.when("/Assurances-gestion/Tiers/liste/Habitat", {
      templateUrl: "Template/Gestion/Tiers/Habitat.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when("/Assurances-gestion/Tiers/liste/Individuel-Accident", {
      templateUrl: "Template/Gestion/Tiers/IndividuelAccident.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when("/Assurances-gestion/Tiers/liste/Auto", {
      templateUrl: "Template/Gestion/Tiers/Auto.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when("/Assurances-gestion/Tiers/liste/Voyage", {
      templateUrl: "Template/Gestion/Tiers/Voyage.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when(
      "/Assurances-gestion/Tiers/liste/Responsabilite-Civile",
      {
        templateUrl: "Template/Gestion/Tiers/ResponsabiliteCivile.html",
        controller: "SituationTiersController",
      }
    );
    $routeProvider.when(
      "/Assurances-gestion/Tiers/liste/Transport-Et-Marchandise",
      {
        templateUrl: "Template/Gestion/Tiers/TransportEtMarchandise.html",
        controller: "SituationTiersController",
      }
    );
    $routeProvider.when("/Assurances-gestion/Tiers/liste/Sante", {
      templateUrl: "Template/Gestion/Tiers/Sante.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when("/Assurances-gestion/Tiers/liste/SanteGSA", {
      templateUrl: "Template/Gestion/Tiers/SanteGSA.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when("/Assurances-gestion/Tiers/liste/SanteAuxilliaire", {
      templateUrl: "Template/Gestion/Tiers/SanteAuxilliaire.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when("/Assurances-gestion/Tiers/liste/SantePharmacien", {
      templateUrl: "Template/Gestion/Tiers/SantePharmacien.html",
      controller: "SituationTiersController",
    });
    $routeProvider.when("/Assurances-gestion/Tiers/liste/ListeVentes", {
      templateUrl: "Template/Gestion/Tiers/ListeVentes.html",
      controller: "SituationTiersController",
    });

    $routeProvider.when("/Assurances-gestion/Tiers/liste/ListeConsultation", {
      templateUrl: "Template/Gestion/Tiers/ListeConsultation.html",
      controller: "SituationTiersController",
    });

    $routeProvider.when(
      "/assurance/Listes/Operation/consultation-questionnaires",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ConsultationsQuestionnaires.html",
        controller: "SituationTiersController",
      }
    );

    /*** -------- COMMERCIAUX--------***/
    $routeProvider.when("/gestion/liste/ListeCommerciaux", {
      templateUrl: "Template/Gestion/Tiers/ListeCommerciaux.html",
      controller: "CommerciauxController",
    });
    $routeProvider.when("/gestion/enregistrement/EnregistrementCommerciaux", {
      templateUrl: "Template/Gestion/Tiers/EnregistrementCommerciaux.html",
      controller: "CommerciauxController",
    });
    $routeProvider.when("/gestion/modification/ModificationCommerciaux", {
      templateUrl: "Template/Gestion/Tiers/ModificationCommerciaux.html",
      controller: "CommerciauxController",
    });

    /*** -------- RENOUVELLEMENT --------***/
    $routeProvider.when("/Assurances/Listes/Renouvellement/Auto", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/RenouvellementAuto.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when("/Assurances/Listes/Renouvellement/Sante/Auxiliaire", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/RenouvellementAuxiliaire.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when("/Assurances/Listes/Renouvellement/Sante/Gesa", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/RenouvellementGesa.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when("/Assurances/Listes/Renouvellement/Habitat", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/RenouvellementHabitat.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when(
      "/Assurances/Listes/Renouvellement/Individuel-Accident",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/RenouvellementIndividuelAccident.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when(
      "/Assurances/Listes/Renouvellement/Multirisque-Professionnel",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/RenouvellementMultirisqueProfessionnel.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when("/Assurances/Listes/Renouvellement/Sante/Pharmacien", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/RenouvellementPharmacien.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when(
      "/Assurances/Listes/Renouvellement/Responsabilite-Civile",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/RenouvellementRespoCivile.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when(
      "/Assurances/Listes/Renouvellement/Transport-Marchandise",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/RenouvellementTransportMarchandise.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when("/Assurances/Listes/Renouvellement/Voyage", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/RenouvellementVoyage.html",
      controller: "RenouvellementController",
    });

    /*** -------- DEMANDE DE RENOUVELLEMENT --------***/
    $routeProvider.when("/Assurances/Listes/DemandeRenouvellement/Auto", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementAuto.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when(
      "/Assurances/Listes/DemandeRenouvellement/Sante/Auxiliaire",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementAuxiliaire.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when("/Assurances/Listes/DemandeRenouvellement/Sante/Gesa", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementGesa.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when("/Assurances/Listes/DemandeRenouvellement/Habitat", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementHabitat.html",
      controller: "RenouvellementController",
    });
    $routeProvider.when(
      "/Assurances/Listes/DemandeRenouvellement/Individuel-Accident",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementIndividuelAccident.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when(
      "/Assurances/Listes/DemandeRenouvellement/Multirisque-Professionnel",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementMultirisqueProfessionnel.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when(
      "/Assurances/Listes/DemandeRenouvellement/Sante/Pharmacien",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementPharmacien.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when(
      "/Assurances/Listes/DemandeRenouvellement/Responsabilite-Civile",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementRespoCivile.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when(
      "/Assurances/Listes/DemandeRenouvellement/Transport-Marchandise",
      {
        templateUrl:
          "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementTransportMarchandise.html",
        controller: "RenouvellementController",
      }
    );
    $routeProvider.when("/Assurances/Listes/DemandeRenouvellement/Voyage", {
      templateUrl:
        "Template/Assurances/Listes/Renouvellement/DemandeRenouvellementVoyage.html",
      controller: "RenouvellementController",
    });

    //PROSPECT
    $routeProvider.when("/gestion/liste/prospect", {
      templateUrl: "Template/Gestion/Tiers/Listeprospect.html",
      controller: "prospectController",
    });
    $routeProvider.when("/gestion/enregistrement/prospect", {
      templateUrl: "Template/Gestion/Tiers/Enregistrementprospect.html",
      controller: "prospectController",
    });
    $routeProvider.when("/gestion/modification/prospect", {
      templateUrl: "Template/Gestion/Tiers/Modificationprospect.html",
      controller: "prospectController",
    });

    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/suivi-dossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeSuiviDossierSP.html",
        controller: "SuiviDossierController",
      }
    );
    $routeProvider.when("/ListeSuiviDossier", {
      templateUrl:
        "Template/Assurances/Listes/Operation/ListeSuiviDossier.html",
      controller: "SuiviDossierController",
    });
    $routeProvider.when("/EnregistrementSuiviDossierSP", {
      templateUrl:
        "Template/Assurances/Enregistrements/Operation/Enregistrement/EnregistrementSuiviDossierSP.html",
      controller: "SuiviDossierController",
    });
    $routeProvider.when("/ModificationsuiviDossierSP", {
      templateUrl:
        "Template/Assurances/Enregistrements/Operation/Enregistrement/ModificationsuiviDossierSP.html",
      controller: "SuiviDossierController",
    });

    //situation DU DOSSIER
    $routeProvider.when(
      "/assurances/operation/multirisque-pro/liste/ListeSituationDossier",
      {
        templateUrl:
          "Template/Assurances/Listes/Operation/ListeSituationDossier.html",
        controller: "ValidationDossierController",
      }
    );

    $routeProvider.when("/Template/ParametreI/ListeExpert", {
      templateUrl: "Template/ParametreI/ListeExpert.html",
      controller: "ExpertNommeController",
    });
    $routeProvider.when("/Template/ParametreI/EnregistrementExpert", {
      templateUrl: "Template/ParametreI/EnregistrementExpert.html",
      controller: "ExpertNommeController",
    });
    $routeProvider.when("/Template/ParametreI/ModificationExpert", {
      templateUrl: "Template/ParametreI/ModificationExpert.html",
      controller: "ExpertNommeController",
    });

    //PARAMETRE BUDGET
    $routeProvider.when("/parametre2/parametresBudget/typeDeBudget/liste", {
      templateUrl:
        "Template/ParametreII/ParametresBudget/TypeDeBudgetListe.html",
      controller: "ParametresBudgetController",
    });
    $routeProvider.when(
      "/parametre2/parametresBudget/typeDeBudget/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/TypeDeBudgetEnregistrement.html",
        controller: "ParametresBudgetController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametresBudget/typeDeBudget/Modification",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/TypeDeBudgetModification.html",
        controller: "ParametresBudgetController",
      }
    );
    $routeProvider.when("/parametre2/parametresBudget/posteBudgetaire/liste", {
      templateUrl:
        "Template/ParametreII/ParametresBudget/PosteBudgetaireListe.html",
      controller: "ParametresposteBudgetaireController",
    });
    $routeProvider.when(
      "/parametre2/parametresBudget/posteBudgetaire/enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/PosteBudgetaireEnregistrement.html",
        controller: "ParametresposteBudgetaireController",
      }
    );
    $routeProvider.when(
      "/parametre2/parametresBudget/posteBudgetaire/PosteBudgetaireModification",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/PosteBudgetaireModification.html",
        controller: "ParametresposteBudgetaireController",
      }
    );
    $routeProvider.when("/ParametreII/DetailsDuTypeDeBudget/liste", {
      templateUrl:
        "Template/ParametreII/ParametresBudget/DetailsDuTypeDeBudgetListe.html",
      controller: "ParametresDetailsDuTypeDeBudgetController",
    });
    $routeProvider.when(
      "/ParametreII/EnregistrementDetailsDuTypeDeBudget/Enregistrement",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/DetailsDuTypeDeBudgetEnregistrement.html",
        controller: "ParametresDetailsDuTypeDeBudgetController",
      }
    );
    $routeProvider.when(
      "/ParametreII/EnregistrementDetailsDuTypeDeBudget/DetailsDuTypeDeBudgetModification",
      {
        templateUrl:
          "Template/ParametreII/ParametresBudget/DetailsDuTypeDeBudgetModification.html",
        controller: "ParametresDetailsDuTypeDeBudgetController",
      }
    );

    // MENU RELANCE
    $routeProvider.when("/assurances/relance/liste/multirisque_professionnel", {
      templateUrl:
        "Template/Assurances/Listes/Relance/RelanceMultirisqueProfessionnel.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/habitat", {
      templateUrl: "Template/Assurances/Listes/Relance/RelanceHabitat.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/individuel_accident", {
      templateUrl:
        "Template/Assurances/Listes/Relance/RelanceIndividuelAccident.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/auto", {
      templateUrl: "Template/Assurances/Listes/Relance/RelanceAuto.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/voyage", {
      templateUrl: "Template/Assurances/Listes/Relance/RelanceVoyage.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/responsabilite_civile", {
      templateUrl: "Template/Assurances/Listes/Relance/RelanceRespoCivile.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/transport_marchandise", {
      templateUrl:
        "Template/Assurances/Listes/Relance/RelanceTransportMarchandise.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/sante_gesa", {
      templateUrl: "Template/Assurances/Listes/Relance/RelanceGesa.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/sante_pharmacien", {
      templateUrl: "Template/Assurances/Listes/Relance/RelancePharmacien.html",
      controller: "RelanceController",
    });
    $routeProvider.when("/assurances/relance/liste/sante_auxiliaire", {
      templateUrl: "Template/Assurances/Listes/Relance/RelanceAuxiliaire.html",
      controller: "RelanceController",
    });

    // liste de demande de contrat
    $routeProvider.when("/assurances/liste/demandeContrat", {
      templateUrl:
        "Template/Assurances/Listes/Demande/ListeDemandeContrat.html",
      controller: "DemandeContratController",
    });
  },
]);
