MapharApp.controller("OpTresorerieTiersController", [
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
    $scope.listeTypeClient = [];
    $scope.listeSens = [];
    $scope.listeFamilleOperation = [];
    $scope.listeOperation = [];
    $scope.listeDuTiers = [];
    $scope.listeDesNumComptes = [];
    $scope.listeOpTresorTiers = [];
    $scope.SL_LIBELLEECRAN = "LISTE OPERATION DE TRESORERIE TIERS";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "INSERTION";
    $scope.formEnrgOpTresorTiers = {
      typeTiers: "",
      idTiers: "",
      codeTiers: "",
      denominationTiers: "",
      libelleOperation: "",
      numPiece: "",
      montant: "",
      numCompte1: "",
      PL_CODENUMCOMPTE1: "",
      libelle1: "",
      sens1: "",
      numCompte2: "",
      PL_CODENUMCOMPTE1: "",
      libelle2: "",
      sens2: "",
    };
    $scope.leChargement = true;
    $scope.isDisabledNumCpte1 = true;
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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    $scope.initFormListeOpTresorerieTiers = function () {
      $scope.afficheListeNumCompte();
      $scope.afficheListeTypeClient();
      $scope.isDisabledLibCpte = true;
    };

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut cocher dans le tableau famille operation
    $scope.valeurTemoin = 2;
    $scope.boolTemoin = false;
    $scope.cocher = "text-white";
    $scope.testTemoinFamOp = function () {
      if ($scope.valeurTemoin % 2 == 0) {
        ($scope.boolTemoin = true),
          ($scope.valeurTemoin = $scope.valeurTemoin + 1);
        $scope.cocher = "text-dark";
      } else {
        $scope.boolTemoin = false;
        $scope.valeurTemoin = $scope.valeurTemoin + 1;
        $scope.cocher = "text-white";
        $scope.formEnrgOpTresorTiers.sens1 = "";
        $scope.formEnrgOpTresorTiers.sens2 = "";
        $scope.formEnrgOpTresorTiers.libelleOperation = "";
        $scope.afficheListeSens();
        $scope.isDisabledNumCpte1 = false;
        $scope.isDisabledNumCpte2 = false;
      }
    };
    //fin cocher dans le tableau famille operation

    //debut liste des operations
    $scope.afficheListeOperation = function () {
      $scope.testTemoinFamOp();
      if ($scope.boolTemoin == true) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            FO_CODEFAMILLEOPERATION: "05",
            NF_CODENATUREFAMILLEOPERATION: "02",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          .post("/ListeOperation/ListeTableauOperation/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listeOperation = reponse.data;
            console.log($scope.listeOperation);
          });
      } else {
        $scope.listeOperation = [];
      }
    };
    //fin liste des operations

    //debut cocher dans le tableau operation
    $scope.cocherDansTabOperation = function (ind, info) {
      for (let index = 0; index < $scope.listeOperation.length; index++) {
        if (index == ind) {
          $scope.formEnrgOpTresorTiers.libelleOperation =
            $scope.listeOperation[index].NO_LIBELLE;
          $("#idLibelleOp").css("background-color", "#FFFFFF");

          if ($scope.listeOperation[index].NO_SENS == "D") {
            $scope.formEnrgOpTresorTiers.sens1 = "D";
            $scope.formEnrgOpTresorTiers.sens2 = "C";
            $("#idSens1").css("background-color", "#FFFFFF");
            $("#idSens2").css("background-color", "#FFFFFF");
          } else {
            $scope.formEnrgOpTresorTiers.sens1 = "C";
            $scope.formEnrgOpTresorTiers.sens2 = "D";
            $("#idSens1").css("background-color", "#FFFFFF");
            $("#idSens2").css("background-color", "#FFFFFF");
          }

          if ($scope.listeOperation[index].NC_CODENATURECOMPTE1 == "") {
            $scope.isDisabledNumCpte1 = true;
            $("#idNumCpte1").css("background-color", "#FFFFFF");
          } else {
            $scope.isDisabledNumCpte1 = false;
            $scope.formEnrgOpTresorTiers.numCompte1 =
              $scope.listeOperation[index].PL_NUMCOMPTE;
            $("#idNumCpte1").css("background-color", "#FFFFFF");
          }

          if (
            $scope.listeOperation[index].NC_CODENATURECOMPTECONTREPARTIE == ""
          ) {
            $scope.isDisabledNumCpte2 = true;
            $("#idNumCpte2").css("background-color", "#FFFFFF");
          } else {
            $scope.isDisabledNumCpte2 = false;
            $scope.formEnrgOpTresorTiers.numCompte2 =
              $scope.listeOperation[index].PL_NUMCOMPTECONTREPARTIE;
            $("#idNumCpte2").css("background-color", "#FFFFFF");
          }
        }
      }
      $scope.afficheinfos(info);
    };
    //fin cocher dans le tableau operation
    $scope.afficheinfos = function (infos) {
      /* $scope.formEnrgOpTresorTiers.libelle1 = ""
      $scope.formEnrgOpTresorTiers.numCompte1  = 0
      console.log(infos);
      if (infos.NC_CODENATURECOMPTE1 == "" || infos.NC_CODENATURECOMPTE1 == undefined) {
        $scope.isDisabledNumCpte1 = true;
        $scope.formEnrgOpTresorTiers.numCompte1  = infos.PL_NUMCOMPTE;
        for (i = 0; i < $scope.listeDesNumComptes.length; i++) {
          if (
            $scope.formEnrgOpTresorTiers.numCompte1  ==
            $scope.listeDesNumComptes[i].PL_NUMCOMPTE
          ) {
            $scope.formEnrgOpTresorTiers.libelle1 =
              $scope.listeDesNumComptes[i].PL_LIBELLE;
            break;
          }
        }
      } else {
       $scope.isDisabledNumCpte1 = false;
      }*/
      if (
        infos.NC_CODENATURECOMPTECONTREPARTIE == "" ||
        infos.NC_CODENATURECOMPTECONTREPARTIE == undefined
      ) {
        $scope.isDisabledNumCpte2 = true;
        $scope.formEnrgOpTresorTiers.numCompte2 =
          $rootScope.infoDeLoperateur[0].PL_NUMCOMPTE;
        for (i = 0; i < $scope.listeDesNumComptes.length; i++) {
          if (
            $scope.formEnrgOpTresorTiers.numCompte2 ==
            $scope.listeDesNumComptes[i].PL_NUMCOMPTE
          ) {
            $scope.formEnrgOpTresorTiers.libelle2 =
              $scope.listeDesNumComptes[i].PL_LIBELLE;
            break;
          }
        }
        // $scope.isDisabled4 = true;
      } else {
        $scope.isDisabledNumCpte2 = true;
        formEnrgOpTresorTiers.numCompte2 = infos.PL_NUMCOMPTECONTREPARTIE;
        for (i = 0; i < $scope.listeDesNumComptes.length; i++) {
          if (
            formEnrgOpTresorTiers.numCompte2 ==
            $scope.listeDesNumComptes[i].PL_NUMCOMPTE
          ) {
            formEnrgOpTresorTiers.libelle2 =
              $scope.listeDesNumComptes[i].PL_LIBELLE;
            break;
          }
        }
      }

      $scope.formEnrgOpTresorTiers.sens1 = infos.NO_SENS;
      if (
        $scope.formEnrgOpTresorTiers.sens1 != "D" &&
        $scope.formEnrgOpTresorTiers.sens1 != ""
      ) {
        $scope.formEnrgOpTresorTiers.sens2 = "D";
      } else if (
        $scope.formEnrgOpTresorTiers.sens1 == "D" &&
        $scope.formEnrgOpTresorTiers.sens1 != ""
      ) {
        $scope.formEnrgOpTresorTiers.sens2 = "C";
      }

      $scope.formEnrgOpTresorTiers.numPiece = infos.NO_REFPIECE;
      $scope.formEnrgOpTresorTiers.montant = infos.NO_MONTANT;
      // $scope.FormAddOperationTresorerie.Journal = infos.JO_CODEJOURNAL;
      $scope.formEnrgOpTresorTiers.Natcompte = infos.NO_CODENATUREOPERATION;
      // $scope.FormAddOperationTresorerie.libselect = infos.NO_LIBELLE;
      /* $scope.isDisabled1 = false;
      $scope.isDisabled2 = false;
      $scope.isDisabled4 = false;*/
    };
    //debut focus sur le champ
    $scope.desactiverChampRequis = function () {
      $(document).ready(function () {
        $("#idTypeTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut liste pour rechercher un tiers
    $scope.rechercherUnTiers = function () {
      $scope.leChargement = true;
      $scope.desactiverChampRequis();

      if ($scope.formEnrgOpTresorTiers.typeTiers == "") {
        $scope.afficheModal = "";
        $scope.atteindreModal = "";
        $("#idTypeTiers").css("background-color", "#FFE9E0");
        $scope.messageErreur = "Renseignez le type du tiers";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.afficheModal = "modal";
        $scope.atteindreModal = "#modalChercherTiers";
        $scope.objet_envoie = [
          {
            TI_NUMTIERS: $scope.formEnrgOpTresorTiers.codeTiers,
            TI_DENOMINATION: $scope.formEnrgOpTresorTiers.denominationTiers,
            TP_CODETYPETIERS: $scope.formEnrgOpTresorTiers.typeTiers,
            SC_CODESECTION: "",
            TI_CLTVENTCAISSE: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          .post("/LesTiers/RechercherLeTiers/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listeDuTiers = reponse.data;
            $scope.leChargement = false;
            console.log($scope.listeDuTiers);
            if ($scope.listeDuTiers[0].clsObjetRetour.SL_RESULTAT == "FALSE") {
              $scope.messageErreur =
                "Aucun enregistrement pour ce type de tiers";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
            }
          });
      }
    };
    //fin liste pour rechercher un tiers

    //debut pour faire le choix du tiers
    $scope.choixDuTiers = function (code, denomination, id, plnumcompt) {
      $scope.formEnrgOpTresorTiers.libelle1 = "";
      $scope.formEnrgOpTresorTiers.numCompte1 = 0;

      $scope.formEnrgOpTresorTiers.codeTiers = code;
      $scope.formEnrgOpTresorTiers.denominationTiers = denomination;
      $scope.formEnrgOpTresorTiers.idTiers = id;
      $scope.formEnrgOpTresorTiers.numCompte1 = plnumcompt;
      if ($scope.formEnrgOpTresorTiers.numCompte1 != undefined) {
        for (i = 0; i < $scope.listeDesNumComptes.length; i++) {
          if (
            $scope.formEnrgOpTresorTiers.numCompte1 ==
            $scope.listeDesNumComptes[i].PL_NUMCOMPTE
          ) {
            $scope.formEnrgOpTresorTiers.libelle1 =
              $scope.listeDesNumComptes[i].PL_LIBELLE;
            break;
          }
        }
      }
      $scope.isDisabled1 = true;
    };
    //fin pour faire le choix du tiers

    //debut pour faire le choix du tiers
    $scope.degriserChampTiers = function () {
      $scope.formEnrgOpTresorTiers.codeTiers = "";
      $scope.formEnrgOpTresorTiers.denominationTiers = "";
      $scope.formEnrgOpTresorTiers.idTiers = "";
      $scope.isDisabled1 = false;
    };
    //fin pour faire le choix du tiers

    //debut liste des comptes
    $scope.num = 0;
    $scope.afficheListeNumCompte = function (num) {
      $scope.leChargement = true;
      $scope.NC_CODENATURECOMPTE = "";
      $scope.num = num;
      /* switch (formEnrgOpTresorTiers.numCompte1) {
                case '001':
                $scope.NC_CODENATURECOMPTE = "03"
                break;
                case '002':
                $scope.NC_CODENATURECOMPTE = "04"
                break;
                default:
                $scope.NC_CODENATURECOMPTE = ""
            } */

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
          console.log($scope.listeDesNumComptes);
        });
    };

    //fin liste des comptes

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      /* 
            $(document).ready(function () {
                $('#idNumCompte').css('background-color', '#EDEDED')
            }) */
      if ($scope.num == 1)
        ($scope.formEnrgOpTresorTiers.numCompte1 = collection.PL_NUMCOMPTE),
          ($scope.formEnrgOpTresorTiers.libelle1 = collection.PL_LIBELLE),
          ($scope.formEnrgOpTresorTiers.PL_CODENUMCOMPTE1 =
            collection.PL_CODENUMCOMPTE),
          $("#idNumPiece1").css("background-color", "#FFFFFF");
      else
        ($scope.formEnrgOpTresorTiers.numCompte2 = collection.PL_NUMCOMPTE),
          ($scope.formEnrgOpTresorTiers.libelle2 = collection.PL_LIBELLE),
          ($scope.formEnrgOpTresorTiers.PL_CODENUMCOMPTE2 =
            collection.PL_CODENUMCOMPTE),
          $("#idNumPiece2").css("background-color", "#FFFFFF");
    };
    //Fin choix d'un compte

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $("#idTypeTiers").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idCodeTiers").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idNomTiers").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idMontant").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idSens1").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idSens2").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idLibelleOp").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idNumeroPiece").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idNumCpte1").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
      $("#idNumCpte2").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
    };
    //fin focus sur le champ

    //debut afficher liste vente
    $scope.validerOpTresorTiers = function (
      type,
      codTiers,
      nomTiers,
      libOp,
      numPiece,
      montant,
      cpt1,
      cpt2,
      libCpte1,
      libCpte2,
      sens1,
      sens2
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      // let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

      if (
        type === "" ||
        type === undefined ||
        codTiers === "" ||
        codTiers === undefined ||
        nomTiers === "" ||
        nomTiers === undefined ||
        montant === "" ||
        montant === undefined ||
        sens1 === "" ||
        sens1 === undefined ||
        sens2 === "" ||
        sens2 === undefined ||
        libOp === "" ||
        libOp === undefined ||
        numPiece === "" ||
        numPiece === undefined ||
        cpt1 === "" ||
        cpt1 === undefined ||
        cpt2 === "" ||
        cpt2 === undefined
      ) {
        $scope.$emit("UNLOAD");
        if (type === "" || type === undefined) {
          $("#idTypeTiers").css("background-color", "#FFE9E0");
        }
        if (codTiers === "" || codTiers === undefined) {
          $("#idCodeTiers").css("background-color", "#FFE9E0");
        }
        if (nomTiers === "" || nomTiers === undefined) {
          $("#idNomTiers").css("background-color", "#FFE9E0");
        }
        if (montant === "" || montant === undefined) {
          $("#idMontant").css("background-color", "#FFE9E0");
        }
        if (sens1 === "" || sens1 === undefined) {
          $("#idSens1").css("background-color", "#FFE9E0");
        }
        if (sens2 === "" || sens2 === undefined) {
          $("#idSens2").css("background-color", "#FFE9E0");
        }
        if (libOp === "" || libOp === undefined) {
          $("#idLibelleOp").css("background-color", "#FFE9E0");
        }
        if (numPiece === "" || numPiece === undefined) {
          $("#idNumeroPiece").css("background-color", "#FFE9E0");
        }
        if (cpt1 === "" || cpt1 === undefined) {
          $("#idNumCpte1").css("background-color", "#FFE9E0");
        }
        if (cpt2 === "" || cpt2 === undefined) {
          $("#idNumCpte2").css("background-color", "#FFE9E0");
        }
        $rootScope.ChampsListeInvalide();
        $scope.listeOpTresorTiers = "";
      } else {
        // partie a terminer demain
        if ($scope.formEnrgOpTresorTiers.Natcompte == undefined) {
          $scope.formEnrgOpTresorTiers.Natcompte = "";
        }

        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            FR_MATRICULE: $scope.formEnrgOpTresorTiers.codeTiers,
            JO_CODEJOURNAL: "6",
            TI_NUMTIERS: $scope.formEnrgOpTresorTiers.codeTiers,
            MV_LIBELLEOPERATION: $scope.formEnrgOpTresorTiers.libelleOperation,
            MS_NUMPIECE: "0",
            MR_CODEMODEREGLEMENT: "",
            MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            MV_MONTANTCREDIT: "0",
            MV_MONTANTDEBIT: $scope.formEnrgOpTresorTiers.montant,
            MV_NOMTIERS: $scope.formEnrgOpTresorTiers.denominationTiers,
            MV_REFERENCEPIECE: $scope.formEnrgOpTresorTiers.numPiece,
            NO_CODENATUREOPERATION: $scope.formEnrgOpTresorTiers.Natcompte,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            PL_NUMCOMPTE: $scope.formEnrgOpTresorTiers.numCompte1,
            PL_NUMCOMPTEBANQUE: "0",
            TYPEOPERATION: "0",
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            FR_MATRICULE: "",
            JO_CODEJOURNAL: "6",
            TI_NUMTIERS: "0",
            MV_LIBELLEOPERATION: $scope.formEnrgOpTresorTiers.libelleOperation,
            MS_NUMPIECE: "0",
            MR_CODEMODEREGLEMENT: "",
            MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            MV_MONTANTCREDIT: $scope.formEnrgOpTresorTiers.montant,
            MV_MONTANTDEBIT: "0",
            MV_NOMTIERS: $scope.formEnrgOpTresorTiers.denominationTiers,
            MV_REFERENCEPIECE: $scope.formEnrgOpTresorTiers.numPiece,
            NO_CODENATUREOPERATION: $scope.formEnrgOpTresorTiers.Natcompte,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            PL_NUMCOMPTE: $scope.formEnrgOpTresorTiers.numCompte2,
            PL_NUMCOMPTEBANQUE: "0",
            TYPEOPERATION: "0",
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
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
            "/ReglementfactureClient/AjoutReglementOperationTresorerietiers/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeOpTresorTiers = reponse.data;
            console.log($scope.listeOpTresorTiers);
            if (
              $scope.listeOpTresorTiers[0].clsObjetRetour.SL_RESULTAT ===
              "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeOpTresorTiers[0].clsObjetRetour.SL_MESSAGE
              );
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.listeOpTresorTiers[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.listeAnnuler();
            }
          });
      }
    };
    //fin afficher liste vente

    //debut annuler
    $scope.listeAnnuler = function () {
      $("#idTypeTiers").css("background-color", "#FFFFFF");
      $("#idCodeTiers").css("background-color", "#FFFFFF");
      $("#idNomTiers").css("background-color", "#FFFFFF");
      $("#idMontant").css("background-color", "#FFFFFF");
      $("#idSens1").css("background-color", "#FFFFFF");
      $("#idSens2").css("background-color", "#FFFFFF");
      $("#idLibelleOp").css("background-color", "#FFFFFF");
      $("#idNumeroPiece").css("background-color", "#FFFFFF");
      $("#idNumCpte1").css("background-color", "#FFFFFF");
      $("#idNumCpte2").css("background-color", "#FFFFFF");
      $scope.formEnrgOpTresorTiers = {};
      $scope.formEnrgOpTresorTiers.typeTiers = "";
      $scope.formEnrgOpTresorTiers.numPiece = "";
      $scope.isDisabled1 = false;
      $scope.listeOperation = [];
      $scope.valeurTemoin = 2;
      $scope.cocher = "text-white";
    };
    //fin annuler

    // DEBUT COMBOS

    //debut liste type client
    $scope.afficheListeTypeClient = function () {
      $scope.$emit("LOAD");
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
        .post("/TypeDuTiers/ListeTypeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeClient = reponse.data;
          if ($scope.listeTypeClient[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeSens();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeClient[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeClient);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeClient[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type client

    //debut liste sens
    $scope.afficheListeSens = function () {
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
        .post("/Sens/ListeSens/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeSens = reponse.data;
          if ($scope.listeSens[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeFamilleOp();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeSens[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeSens);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeSens[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste sens

    //debut liste famille des operations
    $scope.afficheListeFamilleOp = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NF_CODENATUREFAMILLEOPERATION: "02",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
        .post(
          "/ListeFamilleOperation/ListeFamilleOperation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeFamilleOperation = reponse.data;
          if (
            $scope.listeFamilleOperation[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeFamilleOperation[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeFamilleOperation);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeFamilleOperation[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste famille des operations

    // FIN COMBOS

    /*FIN DEV JJ*/
  },
]);
