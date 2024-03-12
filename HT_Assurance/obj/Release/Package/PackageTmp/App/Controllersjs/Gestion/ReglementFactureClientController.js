MapharApp.controller("ReglementFactureClientController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    // $rootScope.infocontrat = angular.fromJson(localStorage.getItem("vpOpMultirisqueProinfocontrat"));
    $scope.collectionContart = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    console.log($scope.collectionContart);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddReglementfactClient = {
      numfacture: $scope.collectionContart.NUMEROBORDEREAU,
      Nclient: $scope.collectionContart.TI_NUMTIERS,
      nomclient: $scope.collectionContart.TI_DENOMINATION,
      Nbordereau: "",
      nomRemettant: "",
      modeRglment: "",
      NatCompte: "",
      NumCompte: "",
      banque: "",
      agence: "",
      refpiece: "",
      montant: "",
      debutCouverture: "",
      finCouverture: "",
      code01: "",
      denomination01: "",
      id01: "",
      Adresse: "",
      libbanq: "",
      libbagence: "",
      SR_MONTANTCREDIT: "",
    };
    $scope.FormAddCheque = {
      id01: "",
      reference: "",
      montant: "",
      dateEmission: "",
      banqueTire: "",
      agBanqueTire: "",
      nomTireur: "",
      nomTire: "",
      dateReception: "",
      nomDeposant: "",
      telDeposant: "",
      effet: "",
      debutCouverture: "",
      finCouverture: "",
      img_photo: [],
      img_signature: [],
    };
    $scope.FormListCheque = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numeroCheque: "",
      BanqueTire: "",
      montant1: "",
      montant2: "",
      AgBanqueTire: "",
    };
    $scope.chequeDoc = [
      {
        fichier: "",
      },
    ];
    $scope.recupcodeAgence = 0;
    $scope.listeCheque = [];
    $scope.testSuppressionCheque = [];
    $scope.testAjoutCheque = [];
    $scope.listeBanqueTire = [];
    $scope.listeBanqueAgence = [];
    $scope.testPhotoCheque = [];
    $scope.listeDocument = [];
    $scope.listeValider = [];
    $scope.idCheque = "";
    $scope.idCheque1 = "";
    $scope.idCheque2 = "";
    $scope.idCheque3 = "";
    $scope.pouvoirenregcheq = 0;
    $scope.recuperer = [];
    $scope.recupererInfoCheque = {};
    $scope.testModificationCheque = [];
    $scope.listeChequeDocument = [];
    $scope.deleteChequePhoto = [];
    $scope.Etatbouton = 1;
    $scope.listeDesNumComptes = [];
    $scope.listeDesBanques = [];
    $scope.listeDesAgences = [];
    $scope.listeDesAgences = [];
    $scope.listeDesModesReglement = [];
    $scope.listeDesNaturesCompte = [];
    $scope.listeDesVersements = [];
    $scope.recupererinfofactClient = [];
    $scope.tableauimage = [];
    $scope.tableauimage2 = [];
    $scope.tabEngReglement = [];
    $scope.newtab = [];
    var reader = {};
    $scope.imagememoire = "";
    var image = {};
    $scope.idimagcheque = "";
    $scope.collecionimage = {};
    $rootScope.infochequesaisi = [];
    $scope.isDisabled2 = true;
    $scope.isDisabled5 = true;
    $scope.isDisabled4 = true;
    $scope.isDisabledBanq = true;
    $scope.isDisabledAgce = true;
    $scope.isDisabledRef = true;
    $scope.isDisabledMont = true;
    $scope.isDisabledDebutCouv = true;
    $scope.isDisabledFinCouv = true;
    $scope.isDisabledNatCpte = true;
    $scope.isDisabledNumCpte = true;
    $scope.isDisabledBtnNumCpte = true;
    $scope.tabsituationactuelleversement = [
      {
        codebanq: "",
        libbanq: "",
        codeagen: "",
        libbagence: "",
        refcheq: "",
        valeur: "",
      },
    ];
    $scope.image = {
      img: [{ upload: "" }],
    };
    $scope.ajoutImage = function () {
      //                let cheminImage = "/Content/assets/media/illustration/undraw_profile_pic_ic5t.svg"
      $scope.image.img.push({ upload: $scope.avatar });
    };

    $scope.idElement = "";
    $scope.idElement0 = "";
    $scope.idElement1 = "";
    $scope.idElement2 = "";
    $scope.id01 = "";
    $scope.id02 = "";
    $scope.idElementPhoto = "";
    $scope.cheminCheq = "";
    $scope.libPhoto = "";
    $scope.listRecuImpression = [];
    $scope.leChargement = true;

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

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddCheque = function () {
      $scope.initFormAddCheque();
      $scope.FormAddCheque = {};
      $scope.tableauimage2 = [];
      $scope.tableauimage = [];
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    /*FIN FONCTION GENERALE*/
    //debut initialisation add reglement facture client
    $scope.initFormAddreglfactclient = function () {
      $scope.afficheListeVersement();
      $scope.tabsituationactuelleversement.splice(0, 1);
    };
    //fin initialisation add reglement facture client

    //debut initialisation add Cheque
    $scope.initFormAddCheque = function () {
      $scope.$emit("LOAD");
      $scope.verouAgBq = true;
      $scope.afficheListeBanqueTire();
      //$scope.retourModifMultirisquePro();
      // $scope.tableauimage = [];
      $scope.$emit("UNLOAD");
      //$scope.afficheListeDocument();
    };
    //fin initialisation add Cheque

    //debut initialisation add Cheque
    $scope.initFormListCheque = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeBanqueTire();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add Cheque

    //debut initialisation add Cheque
    $scope.initFormModifCheque = function () {
      $scope.$emit("LOAD");
      $scope.retourModifCheque();
      $scope.afficheListeBanqueTire();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add Cheque

    //Debut developpement ANICETTE

    //debut voir plus Cheque
    $scope.voirPlusCheque = function (info) {
      sessionStorage.setItem("vpCheque", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpCheque"));
    };
    //fin voir plus Cheque

    //debut voir plus Cheque
    $scope.voirPhotoCheque = function () {
      $scope.recupererPhoto = JSON.parse(
        sessionStorage.getItem("vpPhotoCheque")
      );
      console.log($scope.recupererPhoto);
    };
    //fin voir plus Cheque

    //debut acceder a la page de modification
    $scope.voirModifCheque = function (info) {
      sessionStorage.setItem("modifCheque", JSON.stringify(info));
      window.location.href = "#/assurances/operation/modification/cheque";
    };
    //fin acceder a la page de modification Cheque

    //debut fonction pour annuler la recherche
    $scope.listeChequeAnnuler = function () {
      //$scope.FormListCheque = {};
      //$scope.FormListCheque.periodeDu = $rootScope.journeeDeTravail;
      //$scope.FormListCheque.periodeAu = $rootScope.journeeDeTravail;
      setTimeout($scope.rechargePage, 3600);
    };

    //debut liste des souscripteur

    //debut liste des agences
    $scope.afficheListeAgence = function (id) {
      $scope.listeDesAgences = [];
      $scope.FormAddReglementfactClient.agence = "";
      $scope.isDisabledAgce = true;
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: id,
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesAgences = reponse.data;
          if (
            $scope.listeDesAgences[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.isDisabledAgce = true;
          } else {
            $scope.isDisabledAgce = false;
          }
          console.log($scope.listeDesAgences);
        });
    };
    //fin liste des agences

    $scope.etatmodregl = function (idmod) {
      $scope.valeurDuModeReglement = false;
      switch (idmod) {
        case "01":
          $scope.isDisabled2 = true;
          $scope.isDisabled5 = true;
          $scope.isDisabled4 = false;
          $scope.isDisabledBanq = true;
          $scope.isDisabledAgce = true;
          $scope.isDisabledRef = true;
          $scope.isDisabledMont = true;
          $scope.isDisabledDebutCouv = true;
          $scope.isDisabledFinCouv = true;
          $scope.isDisabledNumCpte = true;
          $scope.isDisabledBtnNumCpte = true;
          $scope.isDisabledNatCpte = true;

          $scope.FormAddReglementfactClient.banque = "";
          $scope.FormAddReglementfactClient.agence = "";
          $scope.FormAddReglementfactClient.refpiece = "";
          $scope.FormAddReglementfactClient.montant = "";
          break;
        case "02":
          $scope.isDisabled2 = false;
          $scope.isDisabled5 = true;
          $scope.isDisabled4 = true;
          $scope.isDisabledBanq = false;
          $scope.isDisabledAgce = true;
          $scope.isDisabledRef = false;
          $scope.isDisabledMont = false;
          $scope.isDisabledDebutCouv = false;
          $scope.isDisabledFinCouv = false;
          $scope.isDisabledNumCpte = false;
          $scope.isDisabledBtnNumCpte = false;
          $scope.isDisabledNatCpte = false;

          $scope.tabsituationactuelleversement = [];
          $scope.valeurDuModeReglement = true;
          break;
        default:
          $scope.isDisabled2 = true;
          $scope.isDisabled5 = true;
          $scope.isDisabled4 = false;
          $scope.isDisabledBanq = true;
          $scope.isDisabledAgce = true;
          $scope.isDisabledMont = true;
          $scope.isDisabledDebutCouv = true;
          $scope.isDisabledFinCouv = true;
          $scope.isDisabledAjt = true;
          $scope.isDisabledAnul = true;
          $scope.isDisabledNatCpte = false;
          $scope.isDisabledNumCpte = false;
          $scope.isDisabledBtnNumCpte = false;
          $scope.isDisabledRef = false;

          $scope.FormAddReglementfactClient.banque = "";
          $scope.FormAddReglementfactClient.agence = "";
          $scope.FormAddReglementfactClient.refpiece = "";
          $scope.FormAddReglementfactClient.montant = "";
      }
    };

    //debut liste des agences
    $scope.afficheListeNatureCompte = function (id) {
      $scope.objet_envoie = [
        {
          MR_CODEMODEREGLEMENT: id,
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
        .post("/NatureCompte/ListeNatureCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesNaturesCompte = reponse.data;
        });

      // $scope.changerEtatInfoCheque();
    };
    //fin liste des agences

    //debut liste des comptes
    $scope.afficheListeNumCompte = function () {
      $scope.leChargement = true;
      $scope.NC_CODENATURECOMPTE = "";
      switch ($scope.FormAddReglementfactClient.NatCompte) {
        case "001":
          $scope.NC_CODENATURECOMPTE = "03";
          break;
        case "002":
          $scope.NC_CODENATURECOMPTE = "04";
          break;
        default:
          $scope.NC_CODENATURECOMPTE = "";
      }

      $scope.objet_envoie = [
        {
          //"PL_NUMCOMPTE": "",
          NC_CODENATURECOMPTE: $scope.NC_CODENATURECOMPTE,
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesNumComptes = reponse.data;
          $scope.leChargement = false;
        });
    };
    //fin liste des comptes

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      $(document).ready(function () {
        $("#idNumCompte").css("background-color", "#EDEDED");
      });
      $scope.FormAddReglementfactClient.NumCompte = collection.PL_NUMCOMPTE;
      $scope.FormAddReglementfactClient.PL_CODENUMCOMPTE =
        collection.PL_CODENUMCOMPTE;
      // $scope.isDisabled1 = true;
    };
    //Fin choix d'un compte
    //$scope.afficheListeTiersSouscripteur = function (num, denom) {
    //    $scope.objet_envoie = [{
    //        "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //        "TI_STATUT": "N",
    //        "TI_NUMTIERS": num,
    //        "TI_DENOMINATION": denom,
    //        "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
    //        "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
    //        "TI_DATESAISIE1": $rootScope.DATE_PREMIER_EXERCICE,
    //        "TI_DATESAISIE2": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //        "SL_LIBELLEECRAN": "ECRAN AUTO",
    //        "SL_LIBELLEMOUCHARD": "LISTE",
    //        "TYPEOPERATION": "TIERS",
    //        "LG_CODELANGUE": "fr",
    //        "clsObjetEnvoi": {
    //            "OE_A": $rootScope.CODE_AGENCE,
    //            "OE_Y": $rootScope.CODE_OPERATEUR,
    //            "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //        }
    //    }];

    //    $http.post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
    //        //headers: $scope.headers
    //    }).then(function (reponse) {
    //        $scope.listeDesSouscripteurs = reponse.data;
    //    })
    //}
    //fin liste des souscripteur
    $scope.choixSouscripteur = function (code, denomination, id, ad) {
      $scope.FormAddReglementfactClient.code01 = code;
      $scope.FormAddReglementfactClient.denomination01 = denomination;
      $scope.FormAddReglementfactClient.id01 = id;
      $scope.FormAddReglementfactClient.Adresse = ad;
      //$scope.isDisabled = true;
      //const test = document.getElementById("champs1").focus()
      //test.focus();
    };
    //fin fonction pour annuler la recherche

    //debut contrainte sur les champs list CHEQUE
    $scope.contrainteFormlistCheque = function () {
      FormValidation.formValidation(document.getElementById("formListCheque"), {
        fields: {
          listCheque_PeriodeDu: {
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
          listCheque_PeriodeAu: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la période.",
              },
              regexp: {
                regexp:
                  /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une periode correcte.",
              },
            },
          },
          listCheque_NumCheque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le numéro de Cheque",
              },
              regexp: {
                regexp: /^[0-9]+$/,
                message: "Veuillez saisir un code correct.",
              },
            },
          },
          listCheque_Banque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la banque du tire.",
              },
            },
          },
          listCheque_AgBanque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l/ agence bancaire.",
              },
            },
          },
          listCheque_Montant1: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le montant 1.",
              },
              regexp: {
                regexp: /^[0-9]{1,15}$/,
                message: "Veuillez saisir une Valeur neuve correcte.",
              },
            },
          },
          listCheque_Montant2: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le montant 2.",
              },
              regexp: {
                regexp: /^[0-9]{1,15}$/,
                message: "Veuillez saisir une Valeur neuve correcte.",
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
    //fin contrainte sur les champs list CHEQUE

    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation

    //debut afficher liste CHEQUE
    $scope.afficheListeCheque = function (
      statut,
      periodeDu,
      periodeAu,
      numCheque,
      BanqueTire,
      AgBanqueTire,
      montant1,
      montant2
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typemontant = /^[0-9]{1,15}$/;
      let typeDate =
        /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.lAnneePeriodeDu = periodeDu.substr(6, 4);
      $scope.leMoisPeriodeDu = periodeDu.substr(3, 2);
      $scope.leJourPeriodeDu = periodeDu.substr(0, 2);
      $scope.lAnneeperiodeAu = periodeAu.substr(6, 4);
      $scope.leMoisperiodeAu = periodeAu.substr(3, 2);
      $scope.leJourperiodeAu = periodeAu.substr(0, 2);
      if (!statut) {
        $scope.$emit("UNLOAD");
        $rootScope.ChampsListeInvalide();
        $scope.listeCheque = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $scope.$emit("UNLOAD");
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
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeCheque = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeCheque = "";
      } else if (BanqueTire !== "" && AgBanqueTire == "") {
        $scope.messageErreur =
          "Veuillez renseigner la banque du tiré ou l'agence bancaire";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.objet_envoie = [
          {
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            CH_REFCHEQUE: numCheque,
            BQ_CODEBANQUE: BanqueTire,
            AB_CODEAGENCEBANCAIRE: AgBanqueTire,
            MONTANT1: montant1,
            MONTANT2: montant2,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "CHEQUE",
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
          .post("/ContratCheque/ListeContratCheque/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeCheque = reponse.data.reverse();
            console.log($scope.listeCheque);
            if ($scope.listeCheque[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeCheque[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste CHEQUE

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

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdCheque = function (
      codeAgence,
      dateSaisieCheque,
      recupIdCheque,
      codeEntrepot,
      dateValidatecheque
    ) {
      ($scope.idCheque = recupIdCheque),
        ($scope.idCheque1 = codeAgence),
        ($scope.idCheque2 = dateSaisieCheque),
        ($scope.idCheque3 = codeEntrepot),
        ($scope.idElement2 = dateValidatecheque);
    };
    //debut recuperer id pour la suppression

    //debut  suppression
    $scope.testSuppressionCheque = [];
    $scope.supprimerCheque = function () {
      $scope.$emit("LOAD");
      if ($scope.idElement2 !== "") {
        $scope.$emit("UNLOAD");
        $rootScope.SuppressionImpossible();
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            CH_DATESAISIECHEQUE: $scope.idCheque2,
            CH_IDEXCHEQUE: $scope.idCheque,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
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
          .post(
            "/ContratCheque/Suppressioncontratcheque/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.testSuppressionCheque = reponse.data;
            //console.log($scope.testSuppressionCheque)
            if (
              $scope.testSuppressionCheque[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.SuppressionReussie(
                $scope.testSuppressionCheque[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.listeCheque[0].clsObjetRetour.SL_RESULTAT = "FALSE";
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.SuppressionNonReussie(
                $scope.testSuppressionCheque[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $rootScope.ProblemeServeur();
          });
      }
    };
    //Fin  suppression

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpValidCheque", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpValidCheque"));
    };
    //fin voir plus

    $scope.optionDocument = function (info) {
      sessionStorage.setItem("vpPhCheque", JSON.stringify(info));
    };

    //Document chèque
    $scope.docCheque = function () {
      window.location.href = "#/assurances/operation/document/cheque";
    };
    //Document chèque

    //debut liste des banques du tiré
    $scope.afficheListeBanqueTire = function () {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: "",
          SL_LIBELLEECRAN: "CHEQUE",
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
        .post("/Banque/ListeBanque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueTire = reponse.data;
        });
    };
    //fin liste des banques du tiré

    //debut liste des agences  banques
    $scope.afficheListeBanqueAgence = function (idAgBq) {
      $scope.listeBanqueAgence = [];
      $scope.FormAddCheque.agBanqueTire = "";
      $scope.verouAgBq = true;
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: idAgBq,
          SL_LIBELLEECRAN: "CHEQUE",
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueAgence = reponse.data;
          if (
            $scope.listeBanqueAgence[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouAgBq = true;
          } else {
            $scope.verouAgBq = false;
          }
        });
    };
    //fin liste des  agences de banques

    //debut liste des agences  banques
    $scope.afficheListeAgBanque = function () {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: $scope.FormListCheque.BanqueTire,
          SL_LIBELLEECRAN: "CHEQUE",
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueAgence = reponse.data;
        });
    };
    //fin liste des  agences de banques

    //debut focus sur le champ
    $scope.DesactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idRef").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMont").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDate").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDate1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDate2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idBanque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAgBanque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomTireur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomDeposant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTel").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout chèque (contrat)
    $scope.ajoutFormAddCheque = function (dateEffet) {
      $scope.valeurChampPhoto = document.getElementById("upload").value;
      $scope.DesactiverChampRquis();
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifCheque"));
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typeReference = /^(0|[0-9]\d*)$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typemontant = /^[0-9]{1,15}$/;

      // $scope.lAnneeEffet = $scope.FormAddCheque.effet.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddCheque.effet.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddCheque.effet.substr(0, 2);

      $scope.lAnneeEmission = $scope.FormAddCheque.dateEmission.substr(6, 4);
      $scope.leMoisEmission = $scope.FormAddCheque.dateEmission.substr(3, 2);
      $scope.leJourEmission = $scope.FormAddCheque.dateEmission.substr(0, 2);

      $scope.lAnneeReception = $scope.FormAddCheque.dateReception.substr(6, 4);
      $scope.leMoisReception = $scope.FormAddCheque.dateReception.substr(3, 2);
      $scope.leJourReception = $scope.FormAddCheque.dateReception.substr(0, 2);

      if (
        $scope.recupererinfofactClient[0].refcheq === "" ||
        $scope.recupererinfofactClient[0].refcheq === undefined ||
        $scope.FormAddCheque.dateEmission === "" ||
        $scope.FormAddCheque.dateEmission === undefined ||
        $scope.FormAddCheque.dateReception === "" ||
        $scope.FormAddCheque.dateReception === undefined ||
        $scope.FormAddCheque.telDeposant === "" ||
        $scope.FormAddCheque.telDeposant === undefined ||
        $scope.FormAddCheque.effet === "" ||
        $scope.FormAddCheque.effet === undefined ||
        $scope.FormAddCheque.banqueTire === "" ||
        $scope.FormAddCheque.banqueTire === undefined ||
        $scope.FormAddCheque.nomTireur === "" ||
        $scope.FormAddCheque.nomTireur === undefined ||
        $scope.recupererinfofactClient[0].valeur === "" ||
        $scope.recupererinfofactClient[0].valeur === undefined ||
        $scope.FormAddCheque.agBanqueTire === "" ||
        $scope.FormAddCheque.agBanqueTire === undefined ||
        $scope.FormAddCheque.nomTire === "" ||
        $scope.FormAddCheque.nomTire === undefined ||
        $scope.FormAddCheque.nomDeposant === "" ||
        $scope.FormAddCheque.nomDeposant === undefined
      ) {
        $(document).ready(function () {
          if (
            $scope.recupererinfofactClient[0].refcheq === "" ||
            $scope.recupererinfofactClient[0].refcheq === undefined
          ) {
            $("#idRef").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.dateEmission === "" ||
            $scope.FormAddCheque.dateEmission === undefined
          ) {
            $("#idDate").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.dateReception === "" ||
            $scope.FormAddCheque.dateReception === undefined
          ) {
            $("#idDate1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.effet === "" ||
            $scope.FormAddCheque.effet === undefined
          ) {
            $("#idDate2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.banqueTire === "" ||
            $scope.FormAddCheque.banqueTire === undefined
          ) {
            $("#idBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.recupererinfofactClient[0].valeur === "" ||
            $scope.recupererinfofactClient[0].valeur === undefined
          ) {
            $("#idMont").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.agBanqueTire === "" ||
            $scope.FormAddCheque.agBanqueTire === undefined
          ) {
            $("#idAgBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.nomTireur === "" ||
            $scope.FormAddCheque.nomTireur === undefined
          ) {
            $("#idNomTireur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.nomTire === "" ||
            $scope.FormAddCheque.nomTire === undefined
          ) {
            $("#idNomTire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.nomDeposant === "" ||
            $scope.FormAddCheque.nomDeposant === undefined
          ) {
            $("#idNomDeposant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.telDeposant === "" ||
            $scope.FormAddCheque.telDeposant === undefined
          ) {
            $("#idTel").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      }

      //else if (typeReference.test($scope.recupererinfofactClient[0].refcheq) == false) {
      //    $scope.messageErreur = "Veuillez renseigner une référence correcte";
      //    $scope.$emit('UNLOAD');
      //    $rootScope.MessageDerreurDesTypes($scope.messageErreur)
      //}
      //else if (typemontant.test($scope.recupererinfofactClient[0].valeur) == false) {
      //    $scope.messageErreur = "Veuillez renseigner un montant correct";
      //    $scope.$emit('UNLOAD');
      //    $rootScope.MessageDerreurDesTypes($scope.messageErreur)
      //}
      else if (
        typenumerotelephone.test($scope.FormAddCheque.telDeposant) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddCheque.nomTireur) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un  nom Tireur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeAlphabetique.test($scope.FormAddCheque.nomTire) == false) {
        $scope.messageErreur = "Veuillez renseigner un  nom Tire correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddCheque.nomDeposant) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un  nom Deposant correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.effet) == false) {
        $scope.messageErreur = "Veuillez renseigner une date effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.dateEmission) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une date d'emission correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisEmission == "02" &&
        $scope.leJourEmission > "29"
      ) {
        $scope.messageErreur = "La date d'emission n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEmission == "04" ||
          $scope.leMoisEmission == "06" ||
          $scope.leMoisEmission == "09" ||
          $scope.leMoisEmission == "11") &&
        $scope.leJourEmission > "30"
      ) {
        $scope.messageErreur = "La date d'emission n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.dateReception) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une date de reception correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisReception == "02" &&
        $scope.leJourReception > "29"
      ) {
        $scope.messageErreur = "La date de reception n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }
      //else if (($scope.leMoisReception == "04" || $scope.leMoisReception == "06" || $scope.leMoisReception == "09" || $scope.leMoisReception == "11") && ($scope.leJourEffet > "30")) {
      //    $scope.messageErreur = "La date de reception n'est pas valide";
      //    $rootScope.MessageDerreurDesTypes($scope.messageErreur)
      //}
      else if (
        $scope.dateSuperioriteFin($scope.FormAddCheque.dateReception) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $rootScope.dateReceptionIncorrected();
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddCheque.dateEmission) >
        $scope.dateSuperioriteFin($scope.FormAddCheque.dateReception)
      ) {
        $scope.$emit("UNLOAD");
        $("#idDate").css("background-color", "#FFE9E0");
        $rootScope.dateReceptionIncorrect();
      } else if (
        $scope.pretACharger == false &&
        $scope.valeurChampPhoto !== ""
      ) {
        $rootScope.EnregistrementNonReussi("Veuillez charger le fichier");
      } else {
        $scope.$emit("LOAD");
        $scope.clsCtcontratchequephotoreglementcaisses = [];
        for (var i = 0; i < $scope.tableauimage.length; i++) {
          $scope.objetchequephoto = {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            CHC_IDEXCHEQUE: "",
            CHC_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            CHC_CHEMINPHOTOCHEQUE: "",
            CHC_LIBELLEPHOTOCHEQUE: "po",
          };
          $scope.objetchequephoto.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
          $scope.objetchequephoto.CHC_CHEMINPHOTOCHEQUE =
            $scope.tableauimage[i];
          $scope.clsCtcontratchequephotoreglementcaisses.push(
            $scope.objetchequephoto
          );
          console.log($scope.clsCtcontratchequephotoreglementcaisses);
        }
        $scope.collecionimage = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: "",
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
          CH_REFCHEQUE: $scope.recupererinfofactClient[0].refcheq,
          CH_VALEURCHEQUE: $scope.recupererinfofactClient[0].valeur,
          CH_DATEEMISSIONCHEQUE: $scope.FormAddCheque.dateEmission,
          CH_NOMTIREUR: $scope.FormAddCheque.nomTireur,
          BQ_CODEBANQUE: $scope.FormAddCheque.banqueTire,
          AB_CODEAGENCEBANCAIRE: $scope.FormAddCheque.agBanqueTire,
          CH_NOMTIRE: $scope.FormAddCheque.nomTire,
          CH_DATERECEPTIONCHEQUE: $scope.FormAddCheque.dateReception,
          CH_NOMDUDEPOSANT: $scope.FormAddCheque.nomDeposant,
          CH_TELEPHONEDEPOSANT: $scope.FormAddCheque.telDeposant,
          CH_DATEEFFET: $scope.FormAddCheque.effet,
          CH_DATEDEBUTCOUVERTURE: $scope.FormAddCheque.debutCouverture,
          CH_DATEFINCOUVERTURE: $scope.FormAddCheque.finCouverture,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CHC_CHEMINPHOTOCHEQUE: "",
          // "clsCtcontratchequephotoreglementcaisses": "/9j/4QAqRXhpZgAASUkqAAgAAAABAJiCAgAFAAAAGgAAAAAAAAAgICAgAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QOdaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUQ1QTExMkYzRjlDMTFFN0E3OTA5NUY0QzMxM0Y3OTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUQ1QTExMkUzRjlDMTFFN0E3OTA5NUY0QzMxM0Y3OTIiIHhtcDpDcmVhdG9yVG9vbD0iRGlnaXRhbCBDYW1lcmEgWDIwIFZlcjEuMDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iQzEyNzMzQ0U3MUIxREQ5MUM5QjI2NzZGNDc3MzJBREMiIHN0UmVmOmRvY3VtZW50SUQ9IkMxMjczM0NFNzFCMUREOTFDOUIyNjc2RjQ3NzMyQURDIi8+IDxkYzpyaWdodHM+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPiAgICA8L3Jk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",
          clsCtcontratchequephotoreglementcaisses:""
            //$scope.clsCtcontratchequephotoreglementcaisses,
        };

        $scope.$emit("UNLOAD");

        localStorage.setItem(
          "Collinfoimagecheque",
          JSON.stringify($scope.collecionimage)
        );
        $scope.pretACharger = false;
        $rootScope.Enregistrementchequephoto();
        $scope.initFormAddCheque();
        $scope.FormAddCheque = {};
        $scope.tableauimage2 = [];
        $scope.tableauimage = [];
        $scope.isDisabled4 = false;
      }
    };
    //Fin ajout chèque (contrat)

    //debut supprimer case d'un nouvel ajout de document
    $scope.pourSupprimerAjoutDocumentCheque1 = function (elmnt) {
      if ($scope.image.img.length > 1) {
        $scope.image.img.splice(elmnt, 1);
      }
    };
    //fin supprimer case d'un nouvel ajout de document

    // fonction pour telecharger une photo
    $scope.formatImagePhoto = "";
    $scope.previewPhoto = function (event) {
      var files = event.target.files;
      var file = files[files.length - 1];
      $scope.formatImagePhoto = file.type;
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.avatar = e.target.result;
          $scope.imgBase64($scope.avatar);
        });
      };
      reader.readAsDataURL(file);
    };
    $scope.formatImageSignature = "";
    $scope.previewSignature = function (event) {
      var files = event.target.files;
      var file = files[files.length - 1];
      $scope.formatImageSignature = file.type;
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.signature = e.target.result;
          $scope.imgSignBase64($scope.signature);
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.imgBase64 = function (elt) {
      if ($scope.formatImage == "image/png") {
        $scope.base64 = elt.replace("data:image/png;base64,", "");
      } else {
        $scope.base64 = elt.replace("data:image/jpeg;base64,", "");
      }
    };
    $scope.imgSignBase64 = function (elt) {
      $scope.signbase64 = elt.replace("data:image/jpeg;base64,", "");
    };
    // fonction pour telecharger une photo

    //debut  enregistrement Photo
    $scope.PhotoCheque = function () {
      $scope.$emit("LOAD");
      $scope.recupPhoto = JSON.parse(sessionStorage.getItem("vpPhCheque"));
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: $scope.recupPhoto.CH_IDEXCHEQUE,
          CH_NUMSEQUENCEPHOTO: "",
          CH_CHEMINPHOTOCHEQUE: $scope.base64,
          CH_LIBELLEPHOTOCHEQUE: "test",
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
        .post(
          "/ContratChequePhoto/AjoutContratChequePhoto/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.testPhotoCheque = reponse.data;
          //console.log($scope.testPhotoCheque)
          if ($scope.testPhotoCheque[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testPhotoCheque[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeCheque[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.testPhotoCheque[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.testPhotoCheque[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin  enregistrement Photo

    //debut recuper id du cheque a valider
    $scope.validateChq = function (
      recupId,
      codeAgence,
      dateSaisieCheque,
      refCheque,
      exCheque,
      dateValidatecheque
    ) {
      $scope.idElement = recupId;
      $scope.idElement0 = codeAgence;
      $scope.idElement1 = dateSaisieCheque;
      $scope.idElement2 = dateValidatecheque;
      $scope.id01 = refCheque;
      $scope.id02 = exCheque;
    };
    //fin recuper id du cheque a valider

    //debut validation cheque
    $scope.validationCheque = function () {
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.recupId,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $scope.idElement1,
          CH_IDEXCHEQUE: $scope.id02,
          CH_REFCHEQUE: $scope.id01,
          CH_VALEURCHEQUE: "0",
          CH_PRIMEAENCAISSER: "0",
          CH_DATEANNULATIONCHEQUE: "01-01-1900",
          CH_DATEEMISSIONCHEQUE: "01-01-1900",
          CH_DATERECEPTIONCHEQUE: "01-01-1900",
          CH_DATEVALIDATIONCHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_DATEEFFET: "01-01-1900",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "CHEQUE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "3",
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
        .post("/ContratCheque/ValidationContratCheque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeValider = reponse.data;
          if ($scope.listeValider[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $rootScope.ValidationReussie(
              $scope.listeValider[0].clsObjetRetour.SL_MESSAGE
            );
            setTimeout($scope.rechargePage, 3600);
          } else {
            $rootScope.ValidationNonReussie(
              $scope.listeValider[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $rootScope.ProblemeServeur(
            $scope.listeValider[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin validation cheque

    $scope.testPhoto = function () {
      window.addEventListener("load", function () {
        document
          .querySelector('input[type="file"]')
          .addEventListener("change", function () {
            if (this.files && this.files[0]) {
              var img = document.querySelector("img");
              img.src = URL.createObjectURL(this.files[0]);
              img.onload = imageIsLoaded;
            }
          });
      });
      $scope.fonctionPhoto = function (e) {
        alert(e);
      };
    };

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdChequePhoto = function () {
      ($scope.cheqId1 = date),
        ($scope.cheqId2 = exCheqId),
        ($scope.cheqId3 = numSeqPhoto);
    };
    //debut recuperer id pour la suppression

    //debut  suppression
    $scope.deleteChequePhoto = [];
    $scope.suppChequePhoto = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $scope.idCheque2,
          CH_IDEXCHEQUE: $scope.exCheqId,
          CH_NUMSEQUENCEPHOTO: numSeqPhoto,
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
        .post(
          "/ContratChequePhoto/SuppressioncontratchequePhoto/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.deleteChequePhoto = reponse.data;
          //console.log($scope.testSuppressionCheque)
        });
    };
    //Fin  suppression
    //debut focus sur le champ
    $scope.desactiverChampRequisCheque = function () {
      $(document).ready(function () {
        $("#idBanque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAgence").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idRefPiece").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMontant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateDebutCouv").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateFinCouv").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //ajout des infos dans la grille
    $scope.ajoutinfocheque = function () {
      $scope.desactiverChampRequisCheque();
      if (
        $scope.FormAddReglementfactClient.banque !== "" &&
        $scope.FormAddReglementfactClient.banque !== undefined &&
        $scope.FormAddReglementfactClient.agence !== "" &&
        $scope.FormAddReglementfactClient.agence !== undefined &&
        $scope.FormAddReglementfactClient.refpiece !== "" &&
        $scope.FormAddReglementfactClient.refpiece !== undefined &&
        $scope.FormAddReglementfactClient.montant !== "" &&
        $scope.FormAddReglementfactClient.montant !== undefined &&
        $scope.FormAddReglementfactClient.montant !== "" &&
        $scope.FormAddReglementfactClient.montant !== undefined &&
        $scope.FormAddReglementfactClient.montant !== "" &&
        $scope.FormAddReglementfactClient.montant !== undefined
      ) {
        $scope.objettab = {
          codebanq: $scope.FormAddReglementfactClient.banque,
          libbanq: "",
          codeagen: $scope.FormAddReglementfactClient.agence,
          libbagence: "",
          refcheq: $scope.FormAddReglementfactClient.refpiece,
          valeur: $scope.FormAddReglementfactClient.montant,
        };
        for (var i = 0; i < $scope.listeDesBanques.length; i++) {
          if (
            $scope.listeDesBanques[i].BQ_CODEBANQUE ===
            $scope.FormAddReglementfactClient.banque
          ) {
            $scope.objettab.libbanq = $scope.listeDesBanques[i].BQ_SIGLE;
            break;
          }
        }
        for (var j = 0; j < $scope.listeDesAgences.length; j++) {
          if (
            $scope.listeDesAgences[j].AB_CODEAGENCEBANCAIRE ===
            $scope.FormAddReglementfactClient.agence
          ) {
            $scope.objettab.libbagence = $scope.listeDesAgences[j].AB_LIBELLE;
            $scope.recupcodeAgence =
              $scope.listeDesAgences[j].AB_CODEAGENCEBANCAIRE;
            break;
          }
        }
        $scope.tabsituationactuelleversement = [];
        $scope.tabsituationactuelleversement.push($scope.objettab);
        console.log($scope.tabsituationactuelleversement);
        //$scope.recupererinfofactClient[0].refcheq = $scope.FormAddReglementfactClient.refpiece;
        //$scope.recupererinfofactClient[0].valeur = $scope.FormAddReglementfactClient.montant;
        $scope.FormAddReglementfactClient.banque = "";
        $scope.FormAddReglementfactClient.agence = "";
        $scope.FormAddReglementfactClient.refpiece = "";
        $scope.FormAddReglementfactClient.montant = "";
        $scope.isDisabled2 = true;
        $scope.isDisabled5 = false;
      } else {
        $(document).ready(function () {
          if (
            $scope.FormAddReglementfactClient.banque === "" ||
            $scope.FormAddReglementfactClient.banque === undefined
          ) {
            $("#idBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.agence === "" ||
            $scope.FormAddReglementfactClient.agence === undefined
          ) {
            $("#idAgence").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.refpiece === "" ||
            $scope.FormAddReglementfactClient.refpiece === undefined
          ) {
            $("#idRefPiece").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.montant === "" ||
            $scope.FormAddReglementfactClient.montant === undefined
          ) {
            $("#idMontant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.debutCouverture === "" ||
            $scope.FormAddReglementfactClient.debutCouverture === undefined
          ) {
            $("#idDateDebutCouv").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.finCouverture === "" ||
            $scope.FormAddReglementfactClient.finCouverture === undefined
          ) {
            $("#idDateFinCouv").css("background-color", "#FFE9E0");
          }
        });
        let typeNumerique = /^\d+$/;
        if (
          typeNumerique.test($scope.FormAddReglementfactClient.montant) == false
        ) {
          $(document).ready(function () {
            $("#idMontant").css("background-color", "#FFE9E0");
          });
        }
        $rootScope.messageInfoCheque();
      }
    };
    //fin ajout

    //debut modification de l'ayant droit de la base
    $scope.modifInfoCheque = function (info) {
      sessionStorage.setItem("lesInfosDuCheque", JSON.stringify(info));
      $scope.recupererInfoCheque = JSON.parse(
        sessionStorage.getItem("lesInfosDuCheque")
      );

      $scope.FormAddReglementfactClient.banque = "";
      $scope.FormAddReglementfactClient.agence = "";
      $scope.FormAddReglementfactClient.refpiece = "";
      $scope.FormAddReglementfactClient.montant = "";

      $scope.FormAddReglementfactClient.banque =
        $scope.recupererInfoCheque.codebanq;
      $scope.FormAddReglementfactClient.agence =
        $scope.recupererInfoCheque.codeagen;
      $scope.FormAddReglementfactClient.refpiece =
        $scope.recupererInfoCheque.refcheq;
      $scope.FormAddReglementfactClient.montant =
        $scope.recupererInfoCheque.valeur;

      $scope.isDisabled2 = false;
      console.log($scope.recupererInfoCheque);
    };
    //fin modification de l'ayant droit de la base

    $scope.enregistrcheque = function (colinfocheque) {
      console.log(colinfocheque);
      sessionStorage.setItem(
        "chequenregistrment",
        JSON.stringify(colinfocheque)
      );
      $scope.recupererinfofactClient = JSON.parse(
        sessionStorage.getItem("chequenregistrment")
      );
      console.log($scope.recupererinfofactClient[0].refcheq);
      //$scope.FormAddCheque.reference = $scope.recupererinfofactClient.refcheq;
      //$scope.FormAddCheque.montant = $scope.recupererinfofactClient.valeur;
      //window.location.href = "#/EnregistrementDeCheque";
    };

    //debut pour desactiver les champs enregistrement
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idNomRemettant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idModeRegl").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVersementJour").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        //$('#idRefPiece').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
      });
    };
    //fin pour desactiver les champs enregistrement

    //Debut ajout reglement commission assurance
    $scope.validerReglementFactClient = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      $rootScope.infochequesaisi = angular.fromJson(
        localStorage.getItem("Collinfoimagecheque")
      );

      if($rootScope.infochequesaisi == undefined || $rootScope.infochequesaisi == "" || $rootScope.infochequesaisi == null){
       
      }else{
        $rootScope.infochequesaisi.clsCtcontratchequephotoreglementcaisses = $scope.clsCtcontratchequephotoreglementcaisses
      }

      if($scope.FormAddReglementfactClient.modeRglment === "02" && ($scope.clsCtcontratchequephotoreglementcaisses.length == 0 || $scope.clsCtcontratchequephotoreglementcaisses == undefined )){
        $scope.$emit("UNLOAD");
        $rootScope.EnregistrementNonReussi(
          "veuillez selectionnez une photo pour le chèque svp !!!"
         );
         $scope.$emit("UNLOAD");
      }else{
        console.log($rootScope.infochequesaisi);
        let typeNumCompte = /^[0-9]{1,12}$/;
  
        if (
          $scope.FormAddReglementfactClient.nomRemettant === "" ||
          $scope.FormAddReglementfactClient.nomRemettant === undefined ||
          $scope.FormAddReglementfactClient.modeRglment === "" ||
          $scope.FormAddReglementfactClient.modeRglment === undefined ||
          $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === "" ||
          $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === undefined
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            if (
              $scope.FormAddReglementfactClient.nomRemettant === "" ||
              $scope.FormAddReglementfactClient.nomRemettant === undefined
            ) {
              $("#idNomRemettant").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddReglementfactClient.modeRglment === "" ||
              $scope.FormAddReglementfactClient.modeRglment === undefined
            ) {
              $("#idModeRegl").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === "" ||
              $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === undefined
            ) {
              $("#idVersementJour").css("background-color", "#FFE9E0");
            }
          });
          $rootScope.ChampsNonRenseignes();
        } else if (
          typeNumCompte.test(
            $scope.FormAddReglementfactClient.SR_MONTANTCREDIT
          ) == false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idVersementJour").css("background-color", "#FFE9E0");
          });
          $rootScope.ChampsNonRenseignes();
        }
        //else if (($scope.FormAddReglementfactClient.modeRglment === '01') && ($scope.FormAddReglementfactClient.refpiece === "")) {
        //    $scope.$emit('UNLOAD');
        //    $(document).ready(function () {
        //        $('#idRefPiece').css('background-color', '#FFE9E0')
        //    })
        //    $rootScope.ChampsNonRenseignes();
        //}
        else if (
          $scope.FormAddReglementfactClient.modeRglment === "02" &&
          ($scope.FormAddReglementfactClient.NatCompte === "" ||
            $scope.FormAddReglementfactClient.NumCompte === "")
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            if ($scope.FormAddReglementfactClient.NatCompte === "") {
              $("#idNatCompte").css("background-color", "#FFE9E0");
            }
            if ($scope.FormAddReglementfactClient.NumCompte === "") {
              $("#idNumCompte").css("background-color", "#FFE9E0");
            }
          });
          $rootScope.ChampsNonRenseignes();
        } else if (
          $scope.FormAddReglementfactClient.modeRglment === "02" &&
          $scope.tabsituationactuelleversement.length === 0
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            if (
              $scope.FormAddReglementfactClient.banque === "" ||
              $scope.FormAddReglementfactClient.banque === undefined
            ) {
              $("#idBanque").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddReglementfactClient.agence === "" ||
              $scope.FormAddReglementfactClient.agence === undefined
            ) {
              $("#idAgence").css("background-color", "#FFE9E0");
            }
            //if ($scope.FormAddReglementfactClient.refpiece === "" || $scope.FormAddReglementfactClient.refpiece === undefined) {
            //    $('#idRefPiece').css('background-color', '#FFE9E0')
            //}
            if (
              $scope.FormAddReglementfactClient.montant === "" ||
              $scope.FormAddReglementfactClient.montant === undefined
            ) {
              $("#idMontant").css("background-color", "#FFE9E0");
            }
          });
          let typeNumerique = /^\d+$/;
          if (
            typeNumerique.test($scope.FormAddReglementfactClient.montant) == false
          ) {
            $(document).ready(function () {
              $("#idMontant").css("background-color", "#FFE9E0");
            });
          }
          $rootScope.infoAjoutCheque();
        } else if (
          ($scope.FormAddReglementfactClient.modeRglment === "03" ||
            $scope.FormAddReglementfactClient.modeRglment === "04" ||
            $scope.FormAddReglementfactClient.modeRglment === "05" ||
            $scope.FormAddReglementfactClient.modeRglment === "06") &&
          ($scope.FormAddReglementfactClient.NatCompte === "" ||
            $scope.FormAddReglementfactClient.NumCompte === "" ||
            $scope.FormAddReglementfactClient.refpiece === "")
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            if ($scope.FormAddReglementfactClient.NatCompte === "") {
              $("#idNatCompte").css("background-color", "#FFE9E0");
            }
            if ($scope.FormAddReglementfactClient.NumCompte === "") {
              $("#idNumCompte").css("background-color", "#FFE9E0");
            }
            if ($scope.FormAddReglementfactClient.refpiece === "") {
              $("#idRefPiece").css("background-color", "#FFE9E0");
            }
          });
          $rootScope.ChampsNonRenseignes();
        } else {
          if ($scope.tabsituationactuelleversement.length == 0) {
            if ($scope.FormAddReglementfactClient.NumCompte == "") {
              $scope.FormAddReglementfactClient.NumCompte = 0;
            }
            $scope.objet_envoie = [
              {
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                MS_NUMPIECE: $scope.collectionContart.MS_NUMPIECE,
                MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                MV_NOMTIERS: $scope.FormAddReglementfactClient.nomRemettant,
                MR_CODEMODEREGLEMENT:
                  $scope.FormAddReglementfactClient.modeRglment,
                TI_NUMTIERS: $scope.collectionContart.TI_NUMTIERS,
                PL_NUMCOMPTE: $scope.collectionContart.PL_NUMCOMPTETIERS,
                PL_NUMCOMPTEBANQUE: $scope.FormAddReglementfactClient.NumCompte,
                MONTANTVERSEMENT:
                  $scope.FormAddReglementfactClient.SR_MONTANTCREDIT,
                MONTANTFACTURETTC: $scope.listeDesVersements[0].RESTEAREGLER,
                MV_REFERENCEPIECE: $scope.FormAddReglementfactClient.refpiece,
                CH_REFCHEQUE: "",
                CH_VALEURCHEQUE: "",
                CH_DATEEMISSIONCHEQUE: "",
                CH_NOMTIREUR: "",
                BQ_CODEBANQUE: "",
                AB_CODEAGENCEBANCAIRE: "",
                CH_NOMTIRE: "",
                CH_DATERECEPTIONCHEQUE: "",
                CH_NOMDUDEPOSANT: "",
                CH_TELEPHONEDEPOSANT: "",
                CH_DATEEFFET: "",
                FB_IDFOURNISSEUR: "",
                TYPEOPERATION: "1",
                OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
                SL_LIBELLEECRAN: "Saisie de reglement client",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: $rootScope.CODE_AGENCE,
                  OE_Y: $rootScope.CODE_OPERATEUR,
                  OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                  OE_E: $rootScope.CODE_ENTREPOT,
                },
                clsCtcontratchequereglementcaisse: {
                  AG_CODEAGENCE: "",
                  CHC_DATESAISIECHEQUE: "",
                  EN_CODEENTREPOT: "",
                  AB_CODEAGENCEBANCAIRE: "1",
                  CA_CODECONTRAT: "",
                  CHC_IDEXCHEQUE: "",
                  CHC_REFCHEQUE: "",
                  CHC_VALEURCHEQUE: "",
                  CHC_PRIMEAENCAISSER: "",
                  CHC_DATEANNULATIONCHEQUE: "",
                  CHC_DATEEMISSIONCHEQUE: "",
                  CHC_DATEVALIDATIONCHEQUE: "",
                  CHC_NOMTIREUR: "",
                  CHC_NOMTIRE: "",
                  CHC_DATERECEPTIONCHEQUE: "",
                  CHC_NOMDUDEPOSANT: "",
                  CHC_TELEPHONEDEPOSANT: "",
                  CHC_DATEEFFET: "",
                  OP_CODEOPERATEUR: "",
                  TYPEOPERATION: "0",
                },
                clsCtcontratchequephotoreglementcaisses: [],
                clsPhamouvementstockreglementcheques: [],
              },
            ];
          } else {
            for (i = 0; $scope.tabsituationactuelleversement.length > i; i++) {
              $scope.objet_envoie = [
                {
                  AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                  EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                  MS_NUMPIECE: $scope.collectionContart.MS_NUMPIECE,
                  MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                  MV_NOMTIERS: $scope.FormAddReglementfactClient.nomRemettant,
                  MR_CODEMODEREGLEMENT:
                    $scope.FormAddReglementfactClient.modeRglment,
                  TI_NUMTIERS: $scope.collectionContart.TI_NUMTIERS,
                  PL_NUMCOMPTE: $scope.collectionContart.PL_NUMCOMPTETIERS,
                  PL_NUMCOMPTEBANQUE: $scope.FormAddReglementfactClient.NumCompte,
                  MONTANTVERSEMENT:
                    $scope.FormAddReglementfactClient.SR_MONTANTCREDIT,
                  MONTANTFACTURETTC: $scope.listeDesVersements[0].RESTEAREGLER, //MONTANTAREGLERCOMMISSION
                  MV_REFERENCEPIECE:
                    $scope.tabsituationactuelleversement[i].refcheq,
                  CH_REFCHEQUE: $rootScope.infochequesaisi.CH_REFCHEQUE,
                  CH_VALEURCHEQUE: $rootScope.infochequesaisi.CH_VALEURCHEQUE,
                  CH_DATEEMISSIONCHEQUE:
                    $rootScope.infochequesaisi.CH_DATEEMISSIONCHEQUE,
                  CH_NOMTIREUR: $rootScope.infochequesaisi.CH_NOMTIREUR,
                  BQ_CODEBANQUE: $rootScope.infochequesaisi.BQ_CODEBANQUE,
                  AB_CODEAGENCEBANCAIRE:
                    $rootScope.infochequesaisi.AB_CODEAGENCEBANCAIRE,
                  CH_NOMTIRE: $rootScope.infochequesaisi.CH_NOMTIRE,
                  CH_DATERECEPTIONCHEQUE:
                    $rootScope.infochequesaisi.CH_DATERECEPTIONCHEQUE,
                  CH_NOMDUDEPOSANT: $rootScope.infochequesaisi.CH_NOMDUDEPOSANT,
                  CH_TELEPHONEDEPOSANT:
                    $rootScope.infochequesaisi.CH_TELEPHONEDEPOSANT,
                  CH_DATEEFFET: $rootScope.infochequesaisi.CH_DATEEFFET,
                  FB_IDFOURNISSEUR: "",
                  TYPEOPERATION: "1",
                  OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
                  SL_LIBELLEECRAN: "Saisie de reglement client",
                  SL_LIBELLEMOUCHARD: "INSERTIONS",
                  LG_CODELANGUE: "fr",
                  clsObjetEnvoi: {
                    OE_A: $rootScope.CODE_AGENCE,
                    OE_Y: $rootScope.CODE_OPERATEUR,
                    OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                  },
                  clsCtcontratchequereglementcaisse: {
                    AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                    CHC_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                    EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                    AB_CODEAGENCEBANCAIRE: $scope.recupcodeAgence, //$scope.FormAddReglementfactClient.agence,
                    CA_CODECONTRAT: $scope.collectionContart.CA_CODECONTRAT,
                    CHC_IDEXCHEQUE: "",
                    CHC_REFCHEQUE: $rootScope.infochequesaisi.CH_REFCHEQUE,
                    CHC_VALEURCHEQUE: $scope.recupererinfofactClient[0].valeur,
                    CHC_PRIMEAENCAISSER:
                      $scope.FormAddReglementfactClient.SR_MONTANTCREDIT,
                    CHC_DATEANNULATIONCHEQUE: "01-01-1900",
                    CHC_DATEEMISSIONCHEQUE: "01-01-2000",
                    CHC_DATEVALIDATIONCHEQUE: "01-01-1900",
                    CHC_NOMTIREUR: $rootScope.infochequesaisi.CH_NOMTIREUR,
                    CHC_NOMTIRE: $rootScope.infochequesaisi.CH_NOMTIRE,
                    CHC_DATERECEPTIONCHEQUE: "01-01-2000",
                    CHC_NOMDUDEPOSANT:
                      $scope.FormAddReglementfactClient.nomRemettant,
                    CHC_TELEPHONEDEPOSANT: "",
                    // CHC_DATEEFFET: "01-01-2021",
                    CHC_DATEEFFET: $rootScope.infochequesaisi.CH_DATEEFFET,
                    CHC_DATEDEBUTCOUVERTURE:
                      $rootScope.infochequesaisi.CH_DATEDEBUTCOUVERTURE,
                    CHC_DATEFINCOUVERTURE:
                      $rootScope.infochequesaisi.CH_DATEFINCOUVERTURE,
                    OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
                    TYPEOPERATION: "0",
                  },
                  clsCtcontratchequephotoreglementcaisses:
                    $rootScope.infochequesaisi
                      .clsCtcontratchequephotoreglementcaisses,
                  clsPhamouvementstockreglementcheques: [
                    {
                      AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                      AB_CODEAGENCEBANCAIRE: $scope.recupcodeAgence,
                      MS_NUMPIECE: $scope.collectionContart.MS_NUMPIECE,
                      RC_NUMEROCHEQUE: "",
                      RC_VALEURCHEQUE: $scope.recupererinfofactClient[0].valeur,
                    }
                  ]
                }
              ];
            }
          }
          console.log($scope.objet_envoie)
          $http
            .post(
              "/ReglementfactureClient/ListeReglementfactureClient/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.tabEngReglement = reponse.data;
              if (
                $scope.tabEngReglement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.tabEngReglement[0].clsObjetRetour.SL_MESSAGE
                );
  
                $scope.FormAddReglementfactClient = {};
                $scope.tabsituationactuelleversement = [];
                $scope.isDisabled2 = false;
                $scope.afficheListeVersement();
                $scope.FormAddReglementfactClient.Nbordereau =
                  $scope.tabEngReglement[0].NUMEROBORDEREAUREGLEMENT;
                $scope.afficheListeRecuImpression(
                  $scope.FormAddReglementfactClient.Nbordereau
                );
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.tabEngReglement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.tabEngReglement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
     
    };
    //Fin ajout reglement commission assurance

    //debut liste operateur
    $scope.afficheListeRecuImpression = function (numbord) {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          MV_NUMPIECE: "0",
          MV_NUMBORDEREAU: numbord,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post("/RecuImpression/ListeRecuImpression/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listRecuImpression = reponse.data;
          if (
            $scope.listRecuImpression[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $http
              .post(
                "/ZoneEditionCombo/pvgAfficherEtat2/",
                $scope.listRecuImpression
              )
              .then(function (result) {
                if (result.data[0].SL_RESULTAT == "TRUE") {
                  toastr["success"](result.data[0].SL_MESSAGE); // Affichage de la notification de succes
                  $window.open(result.data[0].SL_PATH_FILE, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
                } else {
                  toastr["error"](result.data[0].SL_MESSAGE); // Affichage de la notification de erreur
                }
                $scope.loading = false; // Arrêt du chargement
              });
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listRecuImpression[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listRecuImpression[0].clsObjetRetour.SL_MESSAGE
          );
        });
    }; 
    //gestion d'image
    $scope.pretACharger = false;
    $scope.process = function () {
      let file = document.querySelector("#upload").files;
      // let fichier = document.querySelector('input[type=file]').files;
      var tailleimg = file[0].size;
      if(tailleimg > 947994){
        $rootScope.EnregistrementNonReussi(
         "veuillez charger une image de taille inferieur à 1 Mo svp !!!"
        );
      }else{
        console.log(file[0].size)
        var readAndPreview = function (file) {
          // Veillez à ce que `file.name` corresponde à nos critères d’extension
          if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            $scope.pretACharger = true;
            reader = new FileReader();
            var tbsl = [];
            reader.addEventListener(
              "load",
              function () {
                image = new Image();
                image.height = 50;
                image.width = 50;
                image.title = file.name;
                image.src = this.result;
                $scope.tableauimage2.push(image.src);
                $scope.afficherimage();
                tbsl = this.result.split(",");
                $scope.tableauimage.push(tbsl[1]);
                console.log($scope.tableauimage);
                // preview.appendChild(image);
              },
              false
            );
  
            reader.readAsDataURL(file);
            // localStorage.setItem("infoimg", JSON.stringify(reader.result));
            //console.log($scope.tableauimage)
          }
        };
  
        if (file) {
          [].forEach.call(file, readAndPreview);
        }
  
      }
     
      document.getElementById("upload").value = "";
    };
    $(document).on("click", ".tdsuppr", function () {
      $(this).data("id");
      $scope.recupsuprimg($(this).data("id"));
      console.log($(this).data("id"));
    });
    $scope.afficherimage = function () {
      var templathtmlsuppr = "";
      var templathtml = "";
      var elmnt = document.getElementById("boucleimg");
      elmnt.innerHTML = "";
      var elmntsuppr = document.getElementById("boucleimgsuppr");
      elmntsuppr.innerHTML = "";
      for (i = 0; $scope.tableauimage2.length > i; i++) {
        templathtml +=
          '<td><img src="' +
          $scope.tableauimage2[i] +
          '" height=' +
          100 +
          " /></td>";
        templathtmlsuppr +=
          '<td class="tdsuppr" data-id="' +
          i +
          '"><button class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="#modalsurpp">Supprimer</button></td>';
      }

      elmnt.innerHTML = templathtml;
      elmntsuppr.innerHTML = templathtmlsuppr;
    };

    $scope.recupsuprimg = function (lien) {
      $scope.idimagcheque = lien;
    };
    $scope.suprimg = function () {
      var tbsll = [];
      for (i = 0; $scope.tableauimage2.length > i; i++) {
        if ($scope.idimagcheque == i) {
          $scope.tableauimage2.splice(i, 1);
        }
      }

      //tbsll = $scope.idimagcheque.split(',');
      for (i = 0; $scope.tableauimage.length > i; i++) {
        if ($scope.idimagcheque == i) {
          $scope.tableauimage.splice(i, 1);
        }
      }
      $scope.afficherimage();
    };

    //fin developpement ANICETTE

    //CODE POUR LE BOUTON RETOUR
    $scope.retourListe = function () {
      if ($rootScope.retourListe == "mp") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/multirisque-professionnel";
      } else if ($rootScope.retourListe == "santephar") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/sante-pharmacien";
      } else if ($rootScope.retourListe == "individuelAccident") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/individuel-accident";
      } else if ($rootScope.retourListe == "voyage") {
        window.location.href = "#/gestion/ReglementAssurance/liste/voyage";
      } else if ($rootScope.retourListe == "habitat") {
        window.location.href = "#/gestion/ReglementAssurance/liste/habitat";
      } else if ($rootScope.retourListe == "auto") {
        window.location.href = "#/gestion/ReglementAssurance/liste/auto";
      } else if ($rootScope.retourListe == "santeAuxiliaire") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/sante-auxiliaire";
      } else if ($rootScope.retourListe == "santeGesa") {
        window.location.href = "#/gestion/ReglementAssurance/liste/sante-gesa";
      } else if ($rootScope.retourListe == "respoCivile") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/responsabilite-civile";
      } else if ($rootScope.retourListe == "transportMarch") {
        window.location.href =
          "#/gestion/ReglementAssurance/liste/transport-marchandise";
      }
    };
    //CODE POUR LE BOUTON RETOUR

    // DEBUT COMBOS

    //debut liste des banques
    $scope.afficheListeVersement = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          MS_NUMPIECE: $scope.collectionContart.MS_NUMPIECE,
          TI_NUMTIERS: $scope.collectionContart.TI_NUMTIERS,
          MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          TYPEOPERATION: "2",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "Reglement facture client",
          SL_LIBELLEMOUCHARD: "liste",
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
          "/ReglementCommissionAssurance/ListeReglementCommissionAssurance/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesVersements = reponse.data;
          console.log($scope.listeDesVersements);
          if (
            $scope.listeDesVersements[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.listeDesVersements[0].FORMATMONTANTAREGLER =
              $rootScope.formateur.format(
                $scope.listeDesVersements[0].MONTANTAREGLER
              );
            $scope.listeDesVersements[0].FORMATMONTANTREGLER =
              $rootScope.formateur.format(
                $scope.listeDesVersements[0].MONTANTREGLER
              );
            $scope.listeDesVersements[0].FORMATRESTEAREGLER =
              $rootScope.formateur.format(
                $scope.listeDesVersements[0].RESTEAREGLER
              );
            $scope.afficheListeBanque();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesVersements[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesVersements);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVersements[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des banques

    //debut liste des banques
    $scope.afficheListeBanque = function () {
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
        .post("/Banque/ListeBanque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesBanques = reponse.data;
          if ($scope.listeDesBanques[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeModeReglement();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesBanques[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesBanques);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesBanques[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des banques

    //debut liste du mode de reglement
    $scope.afficheListeModeReglement = function () {
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
        .post("/ModeReglement/ListeModeReglement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesModesReglement = reponse.data;
          if (
            $scope.listeDesModesReglement[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesModesReglement[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesModesReglement);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesModesReglement[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste du mode de reglement

    // FIN COMBOS
  },
]);
