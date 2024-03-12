MapharApp.controller("SituationDesAssureursController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.FormListConsultation = {};
    $scope.OptionClic = true
    $scope.Chargement = 'Chargement en cours...'
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

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idDateNaissance").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTelephone").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idFax").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumCompte").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumCC").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPlafondCred").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idAgrement").maxlength({
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

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

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
        $("#idNumTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut info sur la page de modification
    $scope.retourModifDesTiers = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifTiTiers"));

      $scope.FormAddTiTiers.operateur = $scope.recupererInfo.OP_CODEOPERATEUR;
      $scope.FormAddTiTiers.numDuTiers = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddTiTiers.denomination = $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddTiTiers.siege = $scope.recupererInfo.TI_SIEGE;
      $scope.FormAddTiTiers.description =
        $scope.recupererInfo.TI_DESCRIPTIONTIERS;
      $scope.FormAddTiTiers.sexe = $scope.recupererInfo.SX_CODESEXE;
      $scope.FormAddTiTiers.profession = $scope.recupererInfo.PF_CODEPROFESSION;
      $scope.FormAddTiTiers.typeDuTiers = $scope.recupererInfo.TP_CODETYPETIERS;
      $scope.FormAddTiTiers.dateDeNaissance =
        $scope.recupererInfo.TI_DATENAISSANCE;
      $scope.FormAddTiTiers.natureTiers =
        $scope.recupererInfo.NT_CODENATURETIERS;
      $scope.FormAddTiTiers.tva = $scope.recupererInfo.TI_TVA;
      $scope.FormAddTiTiers.asdi = $scope.recupererInfo.TI_ASDI;
      $scope.FormAddTiTiers.plafondCredit =
        $scope.recupererInfo.TI_PLAFONDCREDIT;
      $scope.FormAddTiTiers.typeCompteAdd =
        $scope.recupererInfo.TC_CODECOMPTETYPETIERS;
      $scope.FormAddTiTiers.numCompte = $scope.recupererInfo.PL_NUMCOMPTE;
      $scope.FormAddTiTiers.numCc = $scope.recupererInfo.TI_NUMCPTECONTIBUABLE;
      $scope.FormAddTiTiers.gerant = $scope.recupererInfo.TI_GERANT;
      $scope.FormAddTiTiers.secteurDactivite =
        $scope.recupererInfo.AC_CODEACTIVITE;
      $scope.FormAddTiTiers.casDutilisation =
        $scope.recupererInfo.CU_CODECASUTILISATION;
      $scope.FormAddTiTiers.numAgremant =
        $scope.recupererInfo.TI_NUMEROAGREMENT;
      $scope.FormAddTiTiers.regimeDimposition =
        $scope.recupererInfo.RE_CODEREGIMEIMPOSITION;
      $scope.FormAddTiTiers.specialite = $scope.recupererInfo.SP_CODESPECIALITE;
      $scope.FormAddTiTiers.pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddTiTiers.ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddTiTiers.groupeDesTiers = $scope.recupererInfo.GP_CODEGROUPE;
      $scope.FormAddTiTiers.autorisationDescompte =
        $scope.recupererInfo.TI_ESCOMPTE;
      $scope.FormAddTiTiers.img_avatar = $scope.recupererInfo.TI_PHOTO;
      $scope.FormAddTiTiers.img_signature = $scope.recupererInfo.TI_SIGNATURE;

      $scope.FormAddTiTiers.telephone = $scope.recupererInfo.TI_TELEPHONE;
      $scope.FormAddTiTiers.siteWeb = $scope.recupererInfo.TI_SITEWEB;
      $scope.FormAddTiTiers.fax = $scope.recupererInfo.TI_FAX;
      $scope.FormAddTiTiers.email = $scope.recupererInfo.TI_EMAIL;
      $scope.FormAddTiTiers.adressePostale =
        $scope.recupererInfo.TI_ADRESSEPOSTALE;
      $scope.FormAddTiTiers.localisation =
        $scope.recupererInfo.TI_ADRESSEGEOGRAPHIQUE;

      $scope.afficheListeVille($scope.recupererInfo.PY_CODEPAYS);
      console.log($scope.recupererInfo);
    };
    //fin info sur la page de modification

    //
    $scope.typeOperation = "";
    $scope.initFormAddSituationTiers = function (item) {
      $scope.FormListConsultation = {};
      if (item == 1) {
        $scope.typeOperation = "client";
        $scope.titreDeLaModal = "Liste des tiers";
      } else if (item == 2) {
        $scope.typeOperation = "fournisseur";
        $scope.titreDeLaModal = "Liste des commerciaux";
      } else {
        $scope.typeOperation = "assureur";
        $scope.titreDeLaModal = "Liste des assureurs";
        if (
          sessionStorage.getItem("souscripteurChoisi") != null &&
          $rootScope.ecransSituation == item
        ) {
          var lesInfos = JSON.parse(
            localStorage.getItem("CollReglementMultirisquePro")
          );
          sessionStorage.removeItem("souscripteurChoisi");
          $scope.choixSouscripteur2(lesInfos);
        } else {
          $scope.FormListConsultation = {};
          sessionStorage.removeItem("souscripteurChoisi");
        }
      }
    };
    //

    //debut liste des souscripteur consultation liste
    $scope.TYPEOPERATION = "";
    $scope.leChargement = true;
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      $scope.OptionClic = true;
     /* if (
        ($scope.FormListConsultation.Code == "" ||
          $scope.FormListConsultation.Code == undefined) &&
        ($scope.FormListConsultation.Denomination == "" ||
          $scope.FormListConsultation.Denomination == undefined)
      ) {
        if ($scope.typeOperation == "client") {
          $scope.TYPEOPERATION = "CLIENT";
        } else if ($scope.typeOperation == "fournisseur") {
          $scope.TYPEOPERATION = "COMMERCIAL";
        } else {
          $scope.TYPEOPERATION = "ASSUREUR";
        }

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
            TYPEOPERATION: $scope.TYPEOPERATION,
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
        if ($scope.typeOperation == "client") {
          $scope.TYPEOPERATION = "CLIENT";
        } else {
          $scope.TYPEOPERATION = "COMMERCIAL";
        }

        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormListConsultation.Code,
            TI_DENOMINATION: $scope.FormListConsultation.Denomination,
            SL_LIBELLEECRAN: "CONSULTATION",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: $scope.TYPEOPERATION,
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      }*/

      if ($scope.typeOperation == "assureur") {
       // $scope.OptionClic = true
         $scope.Chargement = 'Chargement en cours...'
          if ($scope.FormListConsultation.Code == undefined) {
              $scope.FormListConsultation.Code = ""
          }
          if ($scope.FormListConsultation.Denomination == undefined) {
              $scope.FormListConsultation.Denomination = ""
          }
          $scope.TYPEOPERATION = "ASSUREUR";
          $scope.objet_envoie = [
            {
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                TI_STATUT: "N",
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
                TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
                TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                TI_NUMTIERS: $scope.FormListConsultation.Code,
                TI_DENOMINATION: $scope.FormListConsultation.Denomination,
                SL_LIBELLEECRAN: "CONSULTATION",
                SL_LIBELLEMOUCHARD: "LISTE",
                TYPEOPERATION: $scope.TYPEOPERATION,
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
          console.log($scope.listeDesSouscripteurs);
          if($scope.listeDesSouscripteurs[0].clsObjetRetour.SL_RESULTAT == 'TRUE'){
            $scope.leChargement = false;
            
          }else{
            $scope.Chargement = 'Aucun element trouvé !!!'
          }

        });
    };
    //fin liste des souscripteur consultation liste

    $scope.FormSituation = {
      choixRisque: "",
    };

    // debut combo risque
    $scope.listeRisque = [];
    $scope.comboRisque = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "COMBO",
          SL_LIBELLEMOUCHARD: "SITUATION DES TIERS",
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
        .post("/Risque/ListeRisque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeRisque = reponse.data;
        });
    };
    // fin combo risque

    //debut afficher liste operation
    $scope.listeOperation = [];
    $scope.listeOperationObjet = "";
    $scope.afficheListeOperation = function (numTiers) {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_NUMPOLICE: "",
          TI_NUMTIERS: numTiers,
          TI_DENOMINATION: "",
          TI_NUMTIERSCOMMERCIAL: "",
          TI_DENOMINATIONCOMMERCIAL: "",
          DATEDEBUT: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          DATEFIN: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          RQ_CODERISQUE: $scope.FormSituation.choixRisque,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
          TYPEOPERATION: "03",
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
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeOperation = reponse.data;
          console.log($scope.listeOperation);
          $scope.listeOperationObjet = $scope.listeOperation[0];
          localStorage.setItem(
            "CollReglementMultirisquePro",
            JSON.stringify($scope.listeOperationObjet)
          );
        });
    };
    //fin afficher liste operation

    // Debut garder les infos dans les champs
    $scope.infoGardee = function () {
      sessionStorage.setItem("souscripteurChoisi", "true");
      $rootScope.ecransSituation = 3;
    };
    // fin garder les infos dans les champs

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (lesInfos) {
      $scope.OptionClic = false;
      $scope.FormListConsultation.id01 = lesInfos.TI_IDTIERS;
      $scope.FormListConsultation.Code = lesInfos.TI_NUMTIERS;

      localStorage.setItem(
        "leNumeroDuTiers",
        JSON.stringify(lesInfos.TI_NUMTIERS)
      );
      localStorage.setItem("CollReglementMultirisquePro", JSON.stringify(lesInfos)); 

      $scope.FormListConsultation.Denomination = lesInfos.TI_DENOMINATION;
      $scope.FormListConsultation.AdresseGeo = lesInfos.TI_ADRESSEGEOGRAPHIQUE;
      $scope.FormListConsultation.Fax = lesInfos.TI_FAX;
      $scope.FormListConsultation.Telephone = lesInfos.TI_TELEPHONE;
      $scope.FormListConsultation.Tva = lesInfos.TI_TVA;
      $scope.FormListConsultation.Email = lesInfos.TI_EMAIL;
      $scope.FormListConsultation.Sexe = lesInfos.SX_LIBELLE;
      $scope.FormListConsultation.Asdi = lesInfos.TI_ASDI;
      $scope.FormListConsultation.DateNaiss = lesInfos.TI_DATENAISSANCE;
      $scope.FormListConsultation.Gerant = lesInfos.TI_GERANT;
      $scope.FormListConsultation.TypeTiers = lesInfos.TP_LIBELLE;
      $scope.FormListConsultation.Description = lesInfos.TI_DESCRIPTIONTIERS;
      $scope.FormListConsultation.SecteurActivite = lesInfos.AC_LIBELLE;
      $scope.FormListConsultation.Profession = lesInfos.PF_LIBELLE;
      $scope.FormListConsultation.PlafondCredit = lesInfos.TI_PLAFONDCREDIT;
      $scope.FormListConsultation.NumCc = lesInfos.TI_NUMCPTECONTIBUABLE;
      $scope.FormListConsultation.SiteWeb = lesInfos.TI_SITEWEB;

     // $scope.afficheListeOperation($scope.FormListConsultation.Code);

      // $scope.isdisabled = true;
    };

    $scope.choixSouscripteur2 = function (lesInfos) {
      $scope.FormListConsultation.id01 = lesInfos.TI_IDTIERS;
      $scope.FormListConsultation.Code = lesInfos.TI_NUMTIERS;

      localStorage.setItem(
        "leNumeroDuTiers",
        JSON.stringify(lesInfos.TI_NUMTIERS)
      );
      localStorage.setItem("CollReglementMultirisquePro", JSON.stringify(lesInfos));

      $scope.FormListConsultation.Denomination = lesInfos.TI_DENOMINATION;
      $scope.FormListConsultation.AdresseGeo = lesInfos.TI_ADRESSEGEOGRAPHIQUE;
      $scope.FormListConsultation.Fax = lesInfos.TI_FAX;
      $scope.FormListConsultation.Telephone = lesInfos.TI_TELEPHONE;
      $scope.FormListConsultation.Tva = lesInfos.TI_TVA;
      $scope.FormListConsultation.Email = lesInfos.TI_EMAIL;
      $scope.FormListConsultation.Sexe = lesInfos.SX_LIBELLE;
      $scope.FormListConsultation.Asdi = lesInfos.TI_ASDI;
      $scope.FormListConsultation.DateNaiss = lesInfos.TI_DATENAISSANCE;
      $scope.FormListConsultation.Gerant = lesInfos.TI_GERANT;
      $scope.FormListConsultation.TypeTiers = lesInfos.TP_LIBELLE;
      $scope.FormListConsultation.Description = lesInfos.TI_DESCRIPTIONTIERS;
      $scope.FormListConsultation.SecteurActivite = lesInfos.AC_LIBELLE;
      $scope.FormListConsultation.Profession = lesInfos.PF_LIBELLE;
      $scope.FormListConsultation.PlafondCredit = lesInfos.TI_PLAFONDCREDIT;
      $scope.FormListConsultation.NumCc = lesInfos.TI_NUMCPTECONTIBUABLE;
      $scope.FormListConsultation.SiteWeb = lesInfos.TI_SITEWEB;

    //  $scope.afficheListeOperation($scope.FormListConsultation.Code);

      // $scope.isdisabled = true;
    };
    //Fin choix d'un souscripteur

    // DEBUT LES REDIRECTIONS

    //redirectListeConsultation
    $scope.redirectListeConsultation = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/ListeConsultation";
    };
    //redirectListeConsultation

    //redirectListeVentes
    $scope.redirectListeVentes = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href = "#/Assurances-gestion/Tiers/liste/ListeVentes";
    };
    //redirectListeVentes

    //debut aller a relevé commission
    $scope.redirectReleveCommission = function () {
      $rootScope.retourSitTiersAssureur = "2";
      /*  window.location.href =
        "#/assurances/operation/multirisque-pro/liste/releve-commission"; */
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/consultation-reglement";
    };
    //fin aller a relevé commission

    //redirectListeConsultation
    $scope.redirectFacturesCumulees = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/FacturesCumulees";
    };
    //redirectListeConsultation

    //redirectMultiRisquePro
    $scope.redirectMultiRisquePro = function () {
      $rootScope.retourSitTiersAssureur = "2";
      $scope.cacherEnrg = "liste";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Multi-Risque-Professionel";
    };
    //redirectMultiRisquePro

    //redirectIndividuelAccident
    $scope.redirectIndividuelAccident = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Individuel-Accident";
    };
    //redirectIndividuelAccident

    //redirectHabitat
    $scope.redirectHabitat = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href = "#/Assurances-gestion/Tiers/liste/Habitat";
    };
    //redirectHabitat

    //redirectAuto
    $scope.redirectAuto = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href = "#/Assurances-gestion/Tiers/liste/Auto";
    };
    //redirectAuto

    //redirectSantePharmacien
    $scope.redirectSantePharmacien = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href = "#/Assurances-gestion/Tiers/liste/SantePharmacien";
    };
    //redirectSantePharmacien

    //redirecSanteAuxilliaire
    $scope.redirecSanteAuxilliaire = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/SanteAuxilliaire";
    };
    //redirecSanteAuxilliaire

    //redirectSanteGSA
    $scope.redirectSanteGSA = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href = "#/Assurances-gestion/Tiers/liste/SanteGSA";
    };
    //redirectSanteGSA

    //redirectVoyage
    $scope.redirectVoyage = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href = "#/Assurances-gestion/Tiers/liste/Voyage";
    };
    //redirectVoyage

    //redirectResponsabiliteCivile
    $scope.redirectResponsabiliteCivile = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Responsabilite-Civile";
    };
    //redirectResponsabiliteCivile

    //redirectTransportEtMarchandise
    $scope.redirectTransportEtMarchandise = function () {
      $rootScope.retourSitTiersAssureur = "2";
      window.location.href =
        "#/Assurances-gestion/Tiers/liste/Transport-Et-Marchandise";
    };
    //redirectTransportEtMarchandise

    // FIN LES REDIRECTIONS

    /*FIN DEV JJ*/
  },
]);
