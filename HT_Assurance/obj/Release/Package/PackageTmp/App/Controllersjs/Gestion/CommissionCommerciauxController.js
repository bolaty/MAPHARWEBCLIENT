MapharApp.controller("CommissionCommerciauxController", [
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
    //$rootScope.infocontrat = angular.fromJson(localStorage.getItem("vpOpMultirisqueProinfocontrat"));
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    console.log($rootScope.collectionContartOp);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddRegCommCommerciaux = {
      NumCommercial: "",
      NomCommercial: "",
      DateDebut: "",
      DateFin: "",
      NomRemettant: "",
      ModeReglement: "",
      NatureCompte: "",
      NumCompte: "",
      Banque: "",
      Agence: "",
      NumCheque: "",
      Montant: "",
    };
    $scope.objet_envoie = [];
    $scope.listeTransmission = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeModeReglement = [];
    $scope.listeNatureCompte = [];
    $scope.listeBanque = [];
    $scope.listeAgence = [];
    $scope.listeCommission = [];
    $scope.listeDesVersements = [];
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

    $scope.SL_LIBELLEECRAN = "REGLEMENT COMMISSIONS COMMERCIAUX";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDTRANSMISSION = "TRANSMISSION";

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
        $("#idPeriodeDu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPeriodeAu").maxlength({
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

    //debut contrainte sur les champs add RegCommCommerciaux
    $scope.contrainteFormAddRegCommCommerciaux = function () {
      FormValidation.formValidation(
        document.getElementById("addRegCommCommerciaux"),
        {
          fields: {
            addRegCommCommerciaux_NumCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le numéro commercial.",
                },
              },
            },
            addRegCommCommerciaux_NomCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom commercial.",
                },
              },
            },
            addRegCommCommerciaux_DateDebut: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            addRegCommCommerciaux_DateFin: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            addRegCommCommerciaux_NomRemettant: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom remettant.",
                },
              },
            },
            addRegCommCommerciaux_ModeReglement: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le mode règlement.",
                },
              },
            },
            addRegCommCommerciaux_NatureCompte: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le nature compte.",
                },
              },
            },
            addRegCommCommerciaux_NumCompte: {
              validators: {
                notEmpty: {
                  message: "Veuillez sélectionner le numéro compte.",
                },
              },
            },
            addRegCommCommerciaux_Banque: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la banque.",
                },
                regexp: {
                  regexp: /^[a-z-A-Z]/,
                  message: "Veuillez saisir une banque.",
                },
              },
            },
            addRegCommCommerciaux_Agence: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l'agence.",
                },
              },
            },
            addRegCommCommerciaux_NumCheque: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le numéro de chèque.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir un numéro de chèque correcte.",
                },
              },
            },
            addRegCommCommerciaux_Montant: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le montant correct.",
                },
                regexp: {
                  regexp: /^[0-9]{1,15}$/,
                  message: "Veuillez entrer un montant correct.",
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
    //fin contrainte sur les champs add RegCommCommerciaux

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    //debut initialisation add RegCommCommerciaux
    $scope.initFormAddRegCommCommerciaux = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeBanque();
      $scope.afficheListeModeReglement();
      $scope.afficheListeVersement();
      //   $scope.afficheListeNatureCompte();
      //$scope.tableauPrimes()
      //   $scope.afficheListeAgence();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add RegCommCommerciaux
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut liste des banques
    $scope.afficheListeBanque = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "BANQUE",
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
          $scope.listeBanque = reponse.data;
        });
    };
    //fin liste des banques

    //debut liste des agences
    $scope.afficheListeAgence = function (id) {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: id,
          SL_LIBELLEECRAN: "AGENCE",
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
          $scope.listeAgence = reponse.data;
          console.log($scope.listeAgence);
        });
    };
    //fin liste des agences

    //debut liste du mode de reglement
    $scope.afficheListeModeReglement = function (id) {
      $scope.objet_envoie = [
        {
          MR_CODEMODEREGLEMENT: id,
          SL_LIBELLEECRAN: "MODE REGLEMENT",
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
        .post("/ModeReglement/ListeModeReglement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeModeReglement = reponse.data;
          console.log($scope.listeModeReglement);
        });
    };
    //fin liste du mode de reglement

    //debut liste des agences
    $scope.afficheListeNatureCompte = function (id) {
      $scope.objet_envoie = [
        {
          MR_CODEMODEREGLEMENT: id,
          SL_LIBELLEECRAN: "NATURE COMPTE",
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
        .post("/NatureCompte/ListeNatureCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureCompte = reponse.data;
          console.log($scope.listeNatureCompte);
        });

      // $scope.changerEtatInfoCheque();
    };
    //fin liste des agences

    //debut liste des comptes
    $scope.afficheListeNumCompte = function () {
      $scope.NC_CODENATURECOMPTE = "";
      switch ($scope.FormAddRegCommCommerciaux.NatCompte) {
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
          SL_LIBELLEECRAN: "NUMERO COMPTE",
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesNumComptes = reponse.data;
        });
    };
    //fin liste des comptes

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      $(document).ready(function () {
        $("#addRegCommCommerciaux_NumCompte").css(
          "background-color",
          "#EDEDED"
        );
      });
      $scope.FormAddRegCommCommerciaux.NumCompte = collection.PL_NUMCOMPTE;
      $scope.FormAddRegCommCommerciaux.PL_CODENUMCOMPTE =
        collection.PL_CODENUMCOMPTE;
      // $scope.isDisabled1 = true;
    };
    //Fin choix d'un compte

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $(document).ready(function () {
        $("#addRegCommCommerciaux_NumCommercial").css(
          "background-color",
          "#EDEDED"
        );
        $("#addRegCommCommerciaux_NomCommercial").css(
          "background-color",
          "#EDEDED"
        );
      });
      $scope.FormAddRegCommCommerciaux.NumCommercial = code;
      $scope.FormAddRegCommCommerciaux.NomCommercial = denomination;
      $scope.FormAddRegCommCommerciaux.id02 = id;
      $scope.anincreded = true;
    };
    //Fin choix d'un commercial

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      if (
        $scope.FormAddRegCommCommerciaux.code == "" &&
        $scope.FormAddRegCommCommerciaux.denomination == ""
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
            SL_LIBELLEECRAN: "REGLEMENT COMMISSION COMMERCIAUX",
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
            TI_NUMTIERS: $scope.FormAddRegCommCommerciaux.code,
            TI_DENOMINATION: $scope.FormAddRegCommCommerciaux.denomination,
            SL_LIBELLEECRAN: "REGLEMENT COMMISSION COMMERCIAUX",
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

    //debut liste des banques
    $scope.afficheListeVersement = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          TI_NUMTIERS: $rootScope.collectionContartOp.TI_NUMTIERS,
          DATEDEBUT: $scope.FormAddRegCommCommerciaux.DateDebut,
          DATEFIN: $scope.FormAddRegCommCommerciaux.DateFin,
          MV_DATESAISIE: $rootScope.collectionContartOp.MV_DATESAISIE,

          TYPEOPERATION: "2",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "REGLEMENT COMMISSIONS COMMERCIAUX",
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
          "/ResumeReglementCommissionsCommerciaux/ListeResumeReglementCommissionsCommerciaux/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesVersements = reponse.data;
          console.log($scope.listeDesVersements);
        });
    };
    //fin liste des banques

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

    //debut focus sur le champ
    $scope.desactiverChampRequisChargerCommission = function () {
      $(document).ready(function () {
        $("#addRegCommCommerciaux_NumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_NomCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_DateDebut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_DateFin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajoutChargerCommission
    $scope.ajoutChargerCommission = function (
      NumCommercial,
      NomCommercial,
      DateDebut,
      DateFin
    ) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisChargerCommission();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;

      if (DateDebut !== undefined) {
        $scope.lAnneeDateDebut = DateDebut.substr(6, 4);
        $scope.leMoisDateDebut = DateDebut.substr(3, 2);
        $scope.leJourDateDebut = DateDebut.substr(0, 2);
      }
      if (DateFin !== undefined) {
        $scope.lAnneeDateFin = DateFin.substr(6, 4);
        $scope.leMoisDateFin = DateFin.substr(3, 2);
        $scope.leJourDateFin = DateFin.substr(0, 2);
      }

      if (
        $scope.FormAddRegCommCommerciaux.NumCommercial == "" ||
        $scope.FormAddRegCommCommerciaux.NumCommercial == undefined ||
        $scope.FormAddRegCommCommerciaux.NomCommercial == "" ||
        $scope.FormAddRegCommCommerciaux.NomCommercial == undefined ||
        $scope.FormAddRegCommCommerciaux.DateDebut == "" ||
        $scope.FormAddRegCommCommerciaux.DateDebut == undefined ||
        $scope.FormAddRegCommCommerciaux.DateFin == "" ||
        $scope.FormAddRegCommCommerciaux.DateFin == undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddRegCommCommerciaux.NumCommercial === "" ||
            $scope.FormAddRegCommCommerciaux.NumCommercial === undefined
          ) {
            $("#addRegCommCommerciaux_NumCommercial").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRegCommCommerciaux.NomCommercial == "" ||
            $scope.FormAddRegCommCommerciaux.NomCommercial === undefined
          ) {
            $("#addRegCommCommerciaux_NomCommercial").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRegCommCommerciaux.DateDebut == "" ||
            $scope.FormAddRegCommCommerciaux.DateDebut === undefined
          ) {
            $("#addRegCommCommerciaux_DateDebut").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRegCommCommerciaux.DateFin === "" ||
            $scope.FormAddRegCommCommerciaux.DateFin === undefined
          ) {
            $("#addRegCommCommerciaux_DateFin").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeDate.test($scope.FormAddRegCommCommerciaux.DateDebut) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateDebut").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateDebut) == true &&
        $scope.leMoisDateDebut == "02" &&
        $scope.leJourDateDebut > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateDebut").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateDebut) == false &&
        $scope.leMoisDateDebut == "02" &&
        $scope.leJourDateDebut > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateDebut").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddRegCommCommerciaux.DateFin) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateFin").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateFin) == true &&
        $scope.leMoisDateFin == "02" &&
        $scope.leJourDateFin > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateFin").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateFin) == false &&
        $scope.leMoisDateFin == "02" &&
        $scope.leJourDateFin > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateFin").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisDateDebut == "04" ||
          $scope.leMoisDateDebut == "06" ||
          $scope.leMoisDateDebut == "09" ||
          $scope.leMoisDateDebut == "11") &&
        $scope.leJourDateDebut > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateDebut").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisDateFin == "04" ||
          $scope.leMoisDateFin == "06" ||
          $scope.leMoisDateFin == "09" ||
          $scope.leMoisDateFin == "11") &&
        $scope.leJourDateFin > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateFin").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(
          $scope.FormAddRegCommCommerciaux.DateDebut
        ) > $scope.dateSuperioriteFin($scope.FormAddRegCommCommerciaux.DateFin)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateDebut").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "La date de début ne doit pas être supérieure à la date de fin";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.testEnregistrement = "";
      } else if (
        $scope.dateSuperioriteFin($scope.FormAddRegCommCommerciaux.DateFin) >=
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addRegCommCommerciaux_DateFin").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "La date de fin ne doit pas être supérieure à la date de la journée de travail";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.testEnregistrement = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            TI_NUMTIERS: NumCommercial,
            DATEDEBUT: DateDebut,
            DATEFIN: DateFin,
            MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TYPEOPERATION: "2",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "REGLEMENT COMMISSIONS COMMERCIAUX",
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
          .post(
            "/ChargerCommission/ListeChargerCommission/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.testEnregistrement = reponse.data;
            console.log($scope.testEnregistrement);
            if (
              $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.FormAddRegCommCommerciaux = {};
              $scope.anincreded = false;
              $("#addRegCommCommerciaux_NumCommercial").css(
                "background-color",
                "#FFFFFF"
              );
              $("#addRegCommCommerciaux_NomCommercial").css(
                "background-color",
                "#FFFFFF"
              );
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //Fin ajoutChargerCommission

    //debut focus sur le champ
    $scope.desactiverChampRequisCheque = function () {
      $(document).ready(function () {
        $("#addRegCommCommerciaux_Banque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_Agence").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_NumCheque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_Montant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //ajout des infos dans la grille
    $scope.ajoutinfocheque = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisCheque();
      let typemontant = /^[0-9]{1,15}$/;
      let typeNumerique = /^\d+$/;
      if (
        $scope.FormAddRegCommCommerciaux.Banque == "" ||
        $scope.FormAddRegCommCommerciaux.Banque == undefined ||
        $scope.FormAddRegCommCommerciaux.Agence == "" ||
        $scope.FormAddRegCommCommerciaux.Agence == undefined ||
        $scope.FormAddRegCommCommerciaux.NumCheque == "" ||
        $scope.FormAddRegCommCommerciaux.NumCheque == undefined
      ) {
        $(document).ready(function () {
          if (
            $scope.FormAddRegCommCommerciaux.Banque == "" ||
            $scope.FormAddRegCommCommerciaux.Banque == undefined
          ) {
            $("#addRegCommCommerciaux_Banque").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddRegCommCommerciaux.Agence == "" ||
            $scope.FormAddRegCommCommerciaux.Agence == undefined
          ) {
            $("#addRegCommCommerciaux_Agence").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddRegCommCommerciaux.NumCheque == "" ||
            $scope.FormAddRegCommCommerciaux.NumCheque == undefined
          ) {
            $("#addRegCommCommerciaux_NumCheque").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddRegCommCommerciaux.Montant == "" ||
            $scope.FormAddRegCommCommerciaux.Montant == undefined
          ) {
            $("#addRegCommCommerciaux_Montant").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $scope.$emit("UNLOAD");
        $rootScope.messageInfoCheque();
      } else if ($scope.FormAddRegCommCommerciaux.Banque == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une banque";
        $(document).ready(function () {
          $("#addRegCommCommerciaux_Banque").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormAddRegCommCommerciaux.Agence == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une agence";
        $(document).ready(function () {
          $("#addRegCommCommerciaux_Agence").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormAddRegCommCommerciaux.NumCheque == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un numéro chèque correct";
        $(document).ready(function () {
          $("#addRegCommCommerciaux_NumCheque").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.FormAddRegCommCommerciaux.Montant) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $(document).ready(function () {
          $("#addRegCommCommerciaux_Montant").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.objettab = {
          codebanq: "",
          libbanq: $scope.FormAddRegCommCommerciaux.Banque,
          codeagen: "",
          libbagence: $scope.FormAddRegCommCommerciaux.Agence,
          refcheq: $scope.FormAddRegCommCommerciaux.NumCheque,
          valeur: $scope.FormAddRegCommCommerciaux.Montant,
        };
        for (var i = 0; i < $scope.listeBanque.length; i++) {
          if (
            $scope.listeBanque[i].BQ_CODEBANQUE ===
            $scope.FormAddRegCommCommerciaux.Banque
          ) {
            $scope.objettab.libbanq = $scope.listeBanque[i].BQ_SIGLE;
            break;
          }
        }
        for (var j = 0; j < $scope.listeAgence.length; j++) {
          if (
            $scope.listeAgence[j].AB_CODEAGENCEBANCAIRE ===
            $scope.FormAddRegCommCommerciaux.Agence
          ) {
            $scope.objettab.libbagence = $scope.listeAgence[j].AB_LIBELLE;
            break;
          }
        }
        $scope.tabsituationactuelleversement.push($scope.objettab);
        console.log($scope.tabsituationactuelleversement);
        $scope.FormAddRegCommCommerciaux.Banque = "";
        $scope.FormAddRegCommCommerciaux.Agence = "";
        $scope.FormAddRegCommCommerciaux.NumCheque = "";
        $scope.FormAddRegCommCommerciaux.Montant = "";
        $scope.isDisabled2 = true;
        $scope.isDisabled5 = false;
        $scope.$emit("UNLOAD");
      }
    };
    //fin ajout

    //debut focus sur le champ
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#addRegCommCommerciaux_NumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_NomRemettant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_ModeReglement").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#addRegCommCommerciaux_NumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_Banque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_Agence").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_NumCheque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRegCommCommerciaux_Montant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout FormAddRegCommCommerciaux  /a terminer
    $scope.ajoutFormAddRegCommCommerciaux = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;

      if (
        $scope.FormAddRegCommCommerciaux.NumCommercial == "" ||
        $scope.FormAddRegCommCommerciaux.NumCommercial === undefined ||
        $scope.FormAddRegCommCommerciaux.NomRemettant == "" ||
        $scope.FormAddRegCommCommerciaux.NomRemettant === undefined ||
        $scope.FormAddRegCommCommerciaux.ModeReglement == "" ||
        $scope.FormAddRegCommCommerciaux.ModeReglement === undefined ||
        $scope.FormAddRegCommCommerciaux.NumCompte === "" ||
        $scope.FormAddRegCommCommerciaux.NumCompte === undefined /* ||
        $scope.FormAddRegCommCommerciaux.NumCheque === "" ||
        $scope.FormAddRegCommCommerciaux.NumCheque === undefined */
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddRegCommCommerciaux.NumCommercial == "" ||
            $scope.FormAddRegCommCommerciaux.NumCommercial === undefined
          ) {
            $("#addRegCommCommerciaux_NumCommercial").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRegCommCommerciaux.NomRemettant == "" ||
            $scope.FormAddRegCommCommerciaux.NomRemettant === undefined
          ) {
            $("#addRegCommCommerciaux_NomRemettant").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRegCommCommerciaux.ModeReglement == "" ||
            $scope.FormAddRegCommCommerciaux.ModeReglement === undefined
          ) {
            $("#addRegCommCommerciaux_ModeReglement").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRegCommCommerciaux.NumCompte === "" ||
            $scope.FormAddRegCommCommerciaux.NumCompte === undefined
          ) {
            $("#addRegCommCommerciaux_NumCompte").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddRegCommCommerciaux.NumCheque === "" ||
            $scope.FormAddRegCommCommerciaux.NumCheque === undefined
          ) {
            $("#addRegCommCommerciaux_NumCheque").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else {
        for (i = 0; $scope.tabsituationactuelleversement.length > i; i++) {
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              MV_NOMTIERS: $scope.FormAddRegCommCommerciaux.NomRemettant,
              MR_CODEMODEREGLEMENT:
                $scope.FormAddRegCommCommerciaux.ModeReglement,
              TI_NUMTIERS: $scope.FormAddRegCommCommerciaux.NumCommercial,
              PL_NUMCOMPTE: $rootScope.collectionContartOp.PL_NUMCOMPTETIERS,
              PL_NUMCOMPTEBANQUE: $scope.FormAddRegCommCommerciaux.NumCompte,
              MV_MONTANTCREDIT:
                $scope.FormAddRegCommCommerciaux.MV_MONTANTCREDIT,
              MV_REFERENCEPIECE: $scope.FormAddRegCommCommerciaux.NumCheque,
              MC_LIBELLEOPERATION: "COMMISSION SUR FACTURE :SORT202009290003",
              MS_NUMPIECE: $rootScope.collectionContartOp.MS_NUMPIECE,
              TI_IDTIERS: $rootScope.collectionContartOp.TI_IDTIERS,
              TYPEOPERATION: "0",
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              SL_LIBELLEECRAN: "REGLEMENT COMMISSIONS COMMERCIAUX",
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
        }
        $http
          .post(
            "/ReglementCommissionsCommerciaux/EnregReglementCommissionsCommerciaux/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.testEnregistrement = reponse.data;
            console.log($scope.testEnregistrement);
            if (
              $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.FormAddRegCommCommerciaux = {};
              $scope.anincreded = false;
              $("#addRegCommCommerciaux_NumCommercial").css(
                "background-color",
                "#FFFFFF"
              );
              $("#addRegCommCommerciaux_NomCommercial").css(
                "background-color",
                "#FFFFFF"
              );
              $("#addRegCommCommerciaux_NumCompte").css(
                "background-color",
                "#FFFFFF"
              );
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
    //Fin ajout FormAddRegCommCommerciaux

    //debut pour annuler
    $scope.AnnulerEcran = function () {
      $(document).ready(function () {
        $("#addRegCommCommerciaux_NumCommercial").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_NomCommercial").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_DateDebut").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_DateFin").css("background-color", "#FFFFFF");
        $("#addRegCommCommerciaux_NomRemettant").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_ModeReglement").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_NatureCompte").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_NumCompte").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_Banque").css("background-color", "#FFFFFF");
        $("#addRegCommCommerciaux_Agence").css("background-color", "#FFFFFF");
        $("#addRegCommCommerciaux_NumCheque").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRegCommCommerciaux_Montant").css("background-color", "#FFFFFF");
      });
      $scope.FormAddRegCommCommerciaux = {};
      $scope.anincreded = false;
      $scope.anincreded = false;
    };
    //fin pour annuler

    /*FIN DEV JJ*/
  },
]);
