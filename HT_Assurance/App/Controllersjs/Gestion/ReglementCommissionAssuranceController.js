MapharApp.controller("ReglementCommissionAssuranceController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",

  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken

    $scope.FormReglComAssurance = {
      numBordereau1: "",
      numBordereau2: "",
      numAssureur: "",
      nomAssureur: "",
      nomRemettant: "",
      modeReglement: "",
      natureCompte: "",
      numCompte: "",
      banque: "",
      agence: "",
      referencePiece: "",
      montant: "",
      PL_CODENUMCOMPTE: "",
      SR_MONTANTCREDIT: "",
    };
    $scope.listeDesBanques = [];
    $scope.listeDesAgences = [];
    $scope.listeDesModesReglement = [];
    $scope.listeDesNaturesCompte = [];
    $scope.listeDesVersements = [];
    $scope.tabCheque = [];
    $scope.tabEngReglement = [];
    $scope.valReferencePiece = [];
    $scope.numDuBordereau = false;
    $scope.SL_LIBELLEECRAN =
      "REGLEMENT COMMISSION ASSURANCE MULTIRISQUE PROFESSIONNEL";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "INSERTION";
    $scope.isDisabledBanq = true;
    $scope.isDisabledAgce = true;
    $scope.isDisabledRef = true;
    $scope.isDisabledMont = true;
    $scope.isDisabledNatCpte = true;
    $scope.isDisabledNumCpte = true;
    $scope.isDisabledBtnNumCpte = true;
    $scope.listRecuImpression = [];
    $scope.leChargement = true;

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

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idNumBordereau2").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumAssureur").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumCompte").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idRefPiece").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idMontant").maxlength({
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

    //debut initialisation reglement commission assurance
    $scope.initFormAddReglementMultirisquePro = function () {
      $scope.FormReglComAssurance.numBordereau2 =
        $scope.collectionReglement.NUMEROBORDEREAU;

      $scope.isDisabledBanq = true;
      $scope.isDisabledAgce = true;
      $scope.isDisabledRef = true;
      $scope.isDisabledMont = true;
      $scope.isDisabledAjt = true;
      $scope.isDisabledAnul = true;
      $scope.isDisabledNumCpte = true;
      $scope.isDisabledBtnNumCpte = true;
      $scope.isDisabledNatCpte = true;

      $(document).ready(function () {
        $("#idNatCompte").css("background-color", "#EDEDED");
        $("#idNumCompte").css("background-color", "#EDEDED");
        $("#idBanque").css("background-color", "#EDEDED");
        // $("#idAgence").css("background-color", "#EDEDED");
        $("#idRefPiece").css("background-color", "#EDEDED");
        $("#idMontant").css("background-color", "#EDEDED");
      });

      $scope.afficheListeVersement();
    };
    //fin initialisation reglement commission assurance

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
        });
    };
    //fin liste des banques

    //debut liste des agences
    $scope.afficheListeAgence = function (id) {
      $scope.listeDesAgences = [];
      $scope.FormReglComAssurance.agence = "";
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
        });
    };

    $scope.afficheListeAgence1 = function (id) {
      $scope.listeDesAgences = [];
      //$scope.FormReglComAssurance.agence = "";
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
        });
    };
    //fin liste des agences

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

      $scope.changerEtatInfoCheque();
    };
    //fin liste des agences

    //debut liste des comptes
    $scope.afficheListeNumCompte = function () {
      $scope.leChargement = true;
      $scope.NC_CODENATURECOMPTE = "";
      switch ($scope.FormReglComAssurance.natureCompte) {
        case "01":
          $scope.NC_CODENATURECOMPTE = "";
          break;
        case "02":
          $scope.NC_CODENATURECOMPTE = "02";
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
      $scope.FormReglComAssurance.numCompte = collection.PL_NUMCOMPTE;
      $scope.FormReglComAssurance.PL_CODENUMCOMPTE =
        collection.PL_CODENUMCOMPTE;
      $scope.isDisabledNumCpte = true;
    };
    //Fin choix d'un compte

    //debut changer etat num compte
    $scope.changerEtat = function () {
      $(document).ready(function () {
        $("#idNumCompte").css("background-color", "#FFFFFF");
      });
      $scope.FormReglComAssurance.numCompte = "";
      $scope.isDisabled1 = false;
    };
    //fin changer etat num compte

    //debut changer etat info sur le cheque
    $scope.changerEtatInfoCheque = function () {
      switch ($scope.FormReglComAssurance.modeReglement) {
        case "01":
          $scope.FormReglComAssurance.natureCompte = "";
          $scope.FormReglComAssurance.numCompte = "";
          $scope.FormReglComAssurance.banque = "";
          $scope.FormReglComAssurance.agence = "";
          $scope.FormReglComAssurance.referencePiece = "";
          $scope.FormReglComAssurance.montant = "";

          $(document).ready(function () {
            $("#idNatCompte").css("background-color", "#EDEDED");
            $("#idNumCompte").css("background-color", "#EDEDED");
            $("#idBanque").css("background-color", "#EDEDED");
            // $("#idAgence").css("background-color", "#EDEDED");
            $("#idRefPiece").css("background-color", "#EDEDED");
            $("#idMontant").css("background-color", "#EDEDED");
          });

          $scope.isDisabledBanq = true;
          $scope.isDisabledAgce = true;
          $scope.isDisabledRef = true;
          $scope.isDisabledMont = true;
          $scope.isDisabledAjt = true;
          $scope.isDisabledAnul = true;
          $scope.isDisabledNumCpte = true;
          $scope.isDisabledBtnNumCpte = true;
          $scope.isDisabledNatCpte = true;
          break;
        case "02":
          $scope.afficheListeBanque();
          $scope.FormReglComAssurance.natureCompte = "";
          $scope.FormReglComAssurance.numCompte = "";
          $scope.FormReglComAssurance.banque = "23";
          $scope.FormReglComAssurance.agence = "";
          $scope.FormReglComAssurance.referencePiece = "";
          $scope.FormReglComAssurance.montant = "";

          $(document).ready(function () {
            $("#idNatCompte").css("background-color", "#FFFFFF");
            $("#idNumCompte").css("background-color", "#FFFFFF");
            $("#idBanque").css("background-color", "#FFFFFF");
            // $("#idAgence").css("background-color", "#FFFFFF");
            $("#idRefPiece").css("background-color", "#FFFFFF");
            $("#idMontant").css("background-color", "#FFFFFF");
          });

          $scope.isDisabledBanq = false;
          $scope.isDisabledAgce = true;
          $scope.isDisabledRef = false;
          $scope.isDisabledMont = false;
          $scope.isDisabledAjt = false;
          $scope.isDisabledAnul = false;
          $scope.isDisabledNumCpte = false;
          $scope.isDisabledBtnNumCpte = false;
          $scope.isDisabledNatCpte = false;
          // $scope.afficheListeBanque();
          $scope.afficheListeAgence1($scope.FormReglComAssurance.banque);
          break;
        default:
          $scope.FormReglComAssurance.natureCompte = "";
          $scope.FormReglComAssurance.numCompte = "";
          $scope.FormReglComAssurance.banque = "";
          $scope.FormReglComAssurance.agence = "";
          $scope.FormReglComAssurance.referencePiece = "";
          $scope.FormReglComAssurance.montant = "";

          $(document).ready(function () {
            $("#idNatCompte").css("background-color", "#FFFFFF");
            $("#idNumCompte").css("background-color", "#FFFFFF");
            $("#idBanque").css("background-color", "#EDEDED");
            // $("#idAgence").css("background-color", "#EDEDED");
            $("#idRefPiece").css("background-color", "#FFFFFF");
            $("#idMontant").css("background-color", "#EDEDED");
          });

          $scope.isDisabledBanq = true;
          $scope.isDisabledAgce = true;
          $scope.isDisabledMont = true;
          $scope.isDisabledAjt = true;
          $scope.isDisabledAnul = true;
          $scope.isDisabledNatCpte = false;
          $scope.isDisabledNumCpte = false;
          $scope.isDisabledBtnNumCpte = false;
          $scope.isDisabledRef = false;
      }
    };
    //fin changer etat info sur le cheque

    //debut session generale pour le reglement
    $scope.collectionReglement = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    console.log($scope.collectionReglement);
    //fin session generale pour le reglement

    //debut ajouter dans le tableau du beneficiaire
    $scope.ajoutDansTabCheque = function () {
      $scope.desactiverChampRequisCheque();
      if (
        $scope.FormReglComAssurance.banque !== "" &&
        $scope.FormReglComAssurance.banque !== undefined &&
        $scope.FormReglComAssurance.agence !== "" &&
        $scope.FormReglComAssurance.agence !== undefined &&
        $scope.FormReglComAssurance.referencePiece !== "" &&
        $scope.FormReglComAssurance.referencePiece !== undefined &&
        $scope.FormReglComAssurance.montant !== "" &&
        $scope.FormReglComAssurance.montant !== undefined
      ) {
        //$scope.valReferencePiece.push($scope.FormReglComAssurance.referencePiece)
        if (
          $scope.FormReglComAssurance.montant !==
            $scope.FormReglComAssurance.SR_MONTANTCREDIT &&
          $scope.isDisabledMont === false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idVersementJour").css("background-color", "#FFE9E0");
            $("#idMontant").css("background-color", "#FFE9E0");
          });
          $rootScope.MontantCommiIncorrect();
        } else {
          $scope.objetPourCheque = {
            objBanque: "",
            objAgence: "",
            objRefPiece: "",
            objMontant: "",
          };
          for (var i = 0; i < $scope.listeDesBanques.length; i++) {
            if (
              $scope.listeDesBanques[i].BQ_CODEBANQUE ===
              $scope.FormReglComAssurance.banque
            ) {
              $scope.objetPourCheque.objBanque =
                $scope.listeDesBanques[i].BQ_SIGLE;
              break;
            }
          }
          for (var j = 0; j < $scope.listeDesAgences.length; j++) {
            if (
              $scope.listeDesAgences[j].AB_CODEAGENCEBANCAIRE ===
              $scope.FormReglComAssurance.agence
            ) {
              $scope.objetPourCheque.objAgence =
                $scope.listeDesAgences[j].AB_LIBELLE;
              break;
            }
          }
          $scope.objetPourCheque.objRefPiece =
            $scope.FormReglComAssurance.referencePiece;
          $scope.objetPourCheque.objMontant =
            $scope.FormReglComAssurance.montant;
          $scope.tabCheque.push($scope.objetPourCheque);
          $("#idMontant").css("background-color", "#FFFFFF");
          $("#idVersementJour").css("background-color", "#FFFFFF");
          $scope.FormReglComAssurance.banque = "";
          $scope.FormReglComAssurance.agence = "";
          $scope.FormReglComAssurance.referencePiece = "";
          $scope.FormReglComAssurance.montant = "";
        }
      } else {
        $(document).ready(function () {
          if (
            $scope.FormReglComAssurance.banque === "" ||
            $scope.FormReglComAssurance.banque === undefined
          ) {
            $("#idBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.agence === "" ||
            $scope.FormReglComAssurance.agence === undefined
          ) {
            $("#idAgence").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.referencePiece === "" ||
            $scope.FormReglComAssurance.referencePiece === undefined
          ) {
            $("#idRefPiece").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.montant === "" ||
            $scope.FormReglComAssurance.montant === undefined
          ) {
            $("#idMontant").css("background-color", "#FFE9E0");
          }
        });
        let typeNumerique = /^\d+$/;
        if (typeNumerique.test($scope.FormReglComAssurance.montant) == false) {
          $(document).ready(function () {
            $("#idMontant").css("background-color", "#FFE9E0");
          });
        }
        $rootScope.messageInfoCheque();
      }
    };
    //fin ajouter dans le tableau du beneficiaire

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
        $("#idVersementJour").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut vider les champs de info cheque
    $scope.annulerModifCheque = function () {
      $(document).ready(function () {
        $("#idBanque").css("background-color", "#FFFFFF");
        // $("#idAgence").css("background-color", "#FFFFFF");
        $("#idRefPiece").css("background-color", "#FFFFFF");
        $("#idMontant").css("background-color", "#FFFFFF");
      });
      $scope.FormReglComAssurance.banque = "";
      $scope.FormReglComAssurance.agence = "";
      $scope.FormReglComAssurance.referencePiece = "";
      $scope.FormReglComAssurance.montant = "";
    };
    //fin vider les champs de info cheque

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
        $("#idNatCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
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
      });
    };
    //fin pour desactiver les champs enregistrement

    //Debut ajout reglement commission assurance
    $scope.validerRegleCommiAssurance = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();

      let typeNumCompte = /^[0-9]{1,12}$/;

      if (
        $scope.FormReglComAssurance.nomRemettant === "" ||
        $scope.FormReglComAssurance.nomRemettant === undefined ||
        $scope.FormReglComAssurance.modeReglement === "" ||
        $scope.FormReglComAssurance.modeReglement === undefined ||
        $scope.FormReglComAssurance.SR_MONTANTCREDIT === "" ||
        $scope.FormReglComAssurance.SR_MONTANTCREDIT === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormReglComAssurance.nomRemettant === "" ||
            $scope.FormReglComAssurance.nomRemettant === undefined
          ) {
            $("#idNomRemettant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.modeReglement === "" ||
            $scope.FormReglComAssurance.modeReglement === undefined
          ) {
            $("#idModeRegl").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.SR_MONTANTCREDIT === "" ||
            $scope.FormReglComAssurance.SR_MONTANTCREDIT === undefined
          ) {
            $("#idVersementJour").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeNumCompte.test($scope.FormReglComAssurance.SR_MONTANTCREDIT) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idVersementJour").css("background-color", "#FFE9E0");
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        $scope.FormReglComAssurance.modeReglement === "02" &&
        ($scope.FormReglComAssurance.natureCompte === "" ||
          $scope.FormReglComAssurance.numCompte === "")
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if ($scope.FormReglComAssurance.natureCompte === "") {
            $("#idNatCompte").css("background-color", "#FFE9E0");
          }
          if ($scope.FormReglComAssurance.numCompte === "") {
            $("#idNumCompte").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        $scope.FormReglComAssurance.modeReglement === "02" &&
        $scope.tabCheque.length === 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormReglComAssurance.banque === "" ||
            $scope.FormReglComAssurance.banque === undefined
          ) {
            $("#idBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.agence === "" ||
            $scope.FormReglComAssurance.agence === undefined
          ) {
            $("#idAgence").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.referencePiece === "" ||
            $scope.FormReglComAssurance.referencePiece === undefined
          ) {
            $("#idRefPiece").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormReglComAssurance.montant === "" ||
            $scope.FormReglComAssurance.montant === undefined
          ) {
            $("#idMontant").css("background-color", "#FFE9E0");
          }
        });
        let typeNumerique = /^\d+$/;
        if (typeNumerique.test($scope.FormReglComAssurance.montant) == false) {
          $(document).ready(function () {
            $("#idMontant").css("background-color", "#FFE9E0");
          });
        }
        $rootScope.infoAjoutCheque();
      } else if (
        ($scope.FormReglComAssurance.modeReglement === "03" ||
          $scope.FormReglComAssurance.modeReglement === "04" ||
          $scope.FormReglComAssurance.modeReglement === "05" ||
          $scope.FormReglComAssurance.modeReglement === "06") &&
        ($scope.FormReglComAssurance.natureCompte === "" ||
          $scope.FormReglComAssurance.numCompte === "" ||
          $scope.FormReglComAssurance.referencePiece === "")
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if ($scope.FormReglComAssurance.natureCompte === "") {
            $("#idNatCompte").css("background-color", "#FFE9E0");
          }
          if ($scope.FormReglComAssurance.numCompte === "") {
            $("#idNumCompte").css("background-color", "#FFE9E0");
          }
          if ($scope.FormReglComAssurance.referencePiece === "") {
            $("#idRefPiece").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else {
        //a revoir
        if ($scope.tabCheque.length == 0) {
          if ($scope.FormReglComAssurance.numCompte == "") {
            $scope.FormReglComAssurance.numCompte = 0;
          }
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              SI_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              MS_NUMPIECE: $scope.collectionReglement.MS_NUMPIECE,
              MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              MV_NOMTIERS: $scope.FormReglComAssurance.nomRemettant,
              MR_CODEMODEREGLEMENT: $scope.FormReglComAssurance.modeReglement,
              TI_NUMTIERS: $scope.collectionReglement.TI_NUMTIERS,
              PL_NUMCOMPTE: $scope.collectionReglement.PL_NUMCOMPTETIERS,
              PL_NUMCOMPTEBANQUE: $scope.FormReglComAssurance.numCompte,
              MONTANTVERSEMENT: $scope.FormReglComAssurance.SR_MONTANTCREDIT,
              MV_REFERENCEPIECE: $scope.FormReglComAssurance.referencePiece,
              MONTANTFACTURETTC:
                $scope.listeDesVersements[0].MONTANTAREGLERCOMMISSION,
              FB_IDFOURNISSEUR: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
              LG_CODELANGUE: "fr",
              TYPEOPERATION: "2",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];
        } else {
          $scope.objet_envoie = [];
          for (var i = 0; i < $scope.tabCheque.length; i++) {
            $scope.objetAEnvoyer = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              SI_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              MS_NUMPIECE: $scope.collectionReglement.MS_NUMPIECE,
              MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              MV_NOMTIERS: $scope.FormReglComAssurance.nomRemettant,
              MR_CODEMODEREGLEMENT: $scope.FormReglComAssurance.modeReglement,
              TI_NUMTIERS: $scope.collectionReglement.TI_NUMTIERS,
              PL_NUMCOMPTE: $scope.collectionReglement.PL_NUMCOMPTETIERS,
              PL_NUMCOMPTEBANQUE: $scope.FormReglComAssurance.numCompte,
              MONTANTVERSEMENT: $scope.FormReglComAssurance.SR_MONTANTCREDIT,
              MV_REFERENCEPIECE: $scope.tabCheque[i].objRefPiece,
              MONTANTFACTURETTC:
                $scope.listeDesVersements[0].MONTANTAREGLERCOMMISSION,
              FB_IDFOURNISSEUR: "",
              SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
              LG_CODELANGUE: "fr",
              TYPEOPERATION: "2",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            };
            $scope.objet_envoie.push($scope.objetAEnvoyer);
          }
        }

        $http
          .post(
            "/ReglementCommiAssurance/AjoutReglement/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.tabEngReglement = reponse.data;
            console.log($scope.tabEngReglement);
            if (
              $scope.tabEngReglement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $scope.numDuBordereau = true;
              $rootScope.EnregistrementReussi(
                $scope.tabEngReglement[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.resetFormReglementCommiAssurance();
              $scope.FormReglComAssurance.numBordereau1 =
                $scope.tabEngReglement[0].NUMEROBORDEREAUREGLEMENT;
              $scope.afficheListeRecuImpression(
                $scope.FormReglComAssurance.numBordereau1
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
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormReglementCommiAssurance = function () {
      $(document).ready(function () {
        $("#idVersementJour").css("background-color", "#FFFFFF");
        $("#idNomRemettant").css("background-color", "#FFFFFF");
        $("#idModeRegl").css("background-color", "#FFFFFF");
        $("#idNatCompte").css("background-color", "#FFFFFF");
        $("#idNumCompte").css("background-color", "#FFFFFF");
        $("#idBanque").css("background-color", "#FFFFFF");
        // $("#idAgence").css("background-color", "#FFFFFF");
        $("#idRefPiece").css("background-color", "#FFFFFF");
        $("#idMontant").css("background-color", "#FFFFFF");
      });
      //$scope.FormReglComAssurance = {};
      $scope.initFormAddReglementMultirisquePro();
      $scope.tabCheque = [];
      $scope.FormReglComAssurance.SR_MONTANTCREDIT = "";
      if ($scope.numDuBordereau === true) {
        $scope.FormReglComAssurance.nomRemettant = "";
        $scope.FormReglComAssurance.modeReglement = "";
        $scope.FormReglComAssurance.natureCompte = "";
        $scope.FormReglComAssurance.numCompte = "";
        $scope.FormReglComAssurance.banque = "";
        $scope.FormReglComAssurance.agence = "";
        $scope.FormReglComAssurance.referencePiece = "";
        $scope.FormReglComAssurance.montant = "";
        $scope.FormReglComAssurance.numBordereau1 =
          $scope.tabEngReglement[0].NUMEROBORDEREAUREGLEMENT;
      } else {
        $scope.FormReglComAssurance.nomRemettant = "";
        $scope.FormReglComAssurance.modeReglement = "";
        $scope.FormReglComAssurance.natureCompte = "";
        $scope.FormReglComAssurance.numCompte = "";
        $scope.FormReglComAssurance.banque = "";
        $scope.FormReglComAssurance.agence = "";
        $scope.FormReglComAssurance.referencePiece = "";
        $scope.FormReglComAssurance.montant = "";
        $scope.FormReglComAssurance.numBordereau1 = "";
        $scope.FormReglComAssurance.numBordereau2 =
          $scope.collectionReglement.NUMEROBORDEREAU;
      }
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    // DEBUT COMBO

    //debut tableau versement a ce jour
    $scope.afficheListeVersement = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          MS_NUMPIECE: $scope.collectionReglement.MS_NUMPIECE, //pas encore disponible
          TI_NUMTIERS: $scope.collectionReglement.TI_NUMTIERS,
          MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
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
          "/SituationReglementJour/ListeSituationReglementJour/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesVersements = reponse.data;
          if (
            $scope.listeDesVersements[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.listeDesVersements[0].FORMATMONTANTAREGLERCOMMISSION =
              $rootScope.formateur.format(
                $scope.listeDesVersements[0].MONTANTAREGLERCOMMISSION
              );
            $scope.listeDesVersements[0].FORMATMONTANTREGLERCOMMISSION =
              $rootScope.formateur.format(
                $scope.listeDesVersements[0].MONTANTREGLERCOMMISSION
              );
            $scope.listeDesVersements[0].FORMATRESTEAREGLERCOMMISSION =
              $rootScope.formateur.format(
                $scope.listeDesVersements[0].RESTEAREGLERCOMMISSION
              );
            setTimeout($scope.afficheListeModeReglement, 3600);
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
    //fin tableau versement a ce jour

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

    // FIN COMBO

    /*FIN DEV JJ*/
  },
]);
