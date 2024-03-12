MapharApp.controller("OperationsCaisseController", [
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
    console.log($rootScope.infoDeLoperateur);
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    // $rootScope.infocontrat = angular.fromJson(localStorage.getItem("vpOpMultirisqueProinfocontrat"));
    //$rootScope.collectionContartOp = angular.fromJson(localStorage.getItem("CollReglementMultirisquePro"));
    //console.log($rootScope.collectionContartOp)

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddOperationTresorerie = {
      libelle: "",
      Numpiece: "",
      Montant: "",
      NumCompte1: "",
      NumCompte2: "",
      libcompt1: "",
      libcompt2: "",
      sens1: "",
      sens2: "",
      Journal: "",
      Natcompte: "",
      libselect: "",
    };
    $scope.isDisabled1 = true;
    $scope.isDisabled2 = true;
    $scope.isDisabled3 = true;
    $scope.isDisabled4 = true;
    $scope.isDisabled5 = true;
    $scope.isDisabled6 = true;
    $scope.listeDesListeFamilleOpe = [];
    $scope.listeDesListeFamilleOpeliste = [];
    $scope.listeDesListeFamilleOpetresorerie = [];
    $scope.listeDesListeFamilleOpetresorerie1 = [];
    $scope.listeDesSENS = [];
    $scope.listeDesSENS1 = [];
    $scope.listeDesNumComptes = [];
    $scope.listeDesNumComptes1 = [];
    $scope.tabEngReglement = [];
    $scope.tabEnvoi = [];
    $scope.objet1 = {};
    $scope.objet2 = {};
    $scope.leChargement = true;

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
    $scope.initFormAddOperationTresorerie = function () {
      $scope.$emit("LOAD");
      $scope.afficheListefamilleOperation();
      $scope.afficheListeNumCompte();
      $scope.afficheListeNumCompte1();
      $scope.listeDesPlancomptable();
      $scope.listeDesPlancomptable1();
      $scope.Sens();
      $scope.Sens1();
      $scope.$emit("UNLOAD");
      //$scope.contrainteFormListsaisie();
    };
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idlibcompt2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMontant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idlibcompt1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idsens1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idlibcompt2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idsens2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    $scope.afficheListefamilleOperation = function () {
      $scope.FormAddOperationTresorerie = {
        libelle: "",
        Numpiece: "",
        Montant: "",
        NumCompte1: "",
        NumCompte2: "",
        libcompt1: "",
        libcompt2: "",
        sens1: "",
        sens2: "",
      };
      $scope.isDisabled1 = true;
      $scope.isDisabled2 = true;
      $scope.isDisabled3 = true;
      $scope.isDisabled4 = true;
      $scope.isDisabled5 = true;
      $scope.isDisabled6 = true;
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NF_CODENATUREFAMILLEOPERATION: "01",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
        .post(
          "/FamilleOperationTresorerie/ListeFamilleOperationTresorerie/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesListeFamilleOpe = reponse.data;
          console.log($scope.listeDesListeFamilleOpe);
        });
    };
    $scope.afficheListeOperationenfant = function (codnatfamille) {
      $scope.FormAddOperationTresorerie = {
        libelle: "",
        Numpiece: "",
        Montant: "",
        NumCompte1: "",
        NumCompte2: "",
        libcompt1: "",
        libcompt2: "",
        sens1: "",
        sens2: "",
      };
      $scope.isDisabled1 = true;
      $scope.isDisabled2 = true;
      $scope.isDisabled3 = true;
      $scope.isDisabled4 = true;
      $scope.isDisabled5 = true;
      $scope.isDisabled6 = true;
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          FO_CODEFAMILLEOPERATION: codnatfamille,
          NF_CODENATUREFAMILLEOPERATION: "01",
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
        .post(
          "/FamilleOperationTresorerieListe/ListeFamilleOperationTresorerieListe/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesListeFamilleOpeliste = reponse.data;
          console.log($scope.listeDesListeFamilleOpeliste);
        });
    };

    $scope.afficheinfos = function (infos) {
      $scope.FormAddOperationTresorerie.libcompt1 = "";
      $scope.FormAddOperationTresorerie.NumCompte1 = 0;
      console.log(infos);
      if (
        infos.NC_CODENATURECOMPTE1 == "" ||
        infos.NC_CODENATURECOMPTE1 == undefined
      ) {
        $scope.isDisabled3 = true;
        $scope.FormAddOperationTresorerie.NumCompte1 = infos.PL_NUMCOMPTE;
        for (i = 0; i < $scope.listeDesNumComptes.length; i++) {
          if (
            $scope.FormAddOperationTresorerie.NumCompte1 ==
            $scope.listeDesNumComptes[i].PL_NUMCOMPTE
          ) {
            $scope.FormAddOperationTresorerie.libcompt1 =
              $scope.listeDesNumComptes[i].PL_LIBELLE;
            break;
          }
        }
      } else {
        $scope.isDisabled3 = false;
      }
      if (
        infos.NC_CODENATURECOMPTECONTREPARTIE == "" ||
        infos.NC_CODENATURECOMPTECONTREPARTIE == undefined
      ) {
        $scope.FormAddOperationTresorerie.NumCompte2 =
          $rootScope.infoDeLoperateur[0].PL_NUMCOMPTE;
        for (i = 0; i < $scope.listeDesNumComptes1.length; i++) {
          if (
            $scope.FormAddOperationTresorerie.NumCompte2 ==
            $scope.listeDesNumComptes1[i].PL_NUMCOMPTE
          ) {
            $scope.FormAddOperationTresorerie.libcompt2 =
              $scope.listeDesNumComptes1[i].PL_LIBELLE;
            break;
          }
        }
        $scope.isDisabled4 = true;
      } else {
        $scope.isDisabled4 = true;
        $scope.FormAddOperationTresorerie.NumCompte2 =
          infos.PL_NUMCOMPTECONTREPARTIE;
        for (i = 0; i < $scope.listeDesNumComptes1.length; i++) {
          if (
            $scope.FormAddOperationTresorerie.NumCompte2 ==
            $scope.listeDesNumComptes1[i].PL_NUMCOMPTE
          ) {
            $scope.FormAddOperationTresorerie.libcompt2 =
              $scope.listeDesNumComptes1[i].PL_LIBELLE;
            break;
          }
        }
      }

      $scope.FormAddOperationTresorerie.sens1 = infos.NO_SENS;
      if (
        $scope.FormAddOperationTresorerie.sens1 != "D" &&
        $scope.FormAddOperationTresorerie.sens1 != ""
      ) {
        $scope.FormAddOperationTresorerie.sens2 = "D";
      } else if (
        $scope.FormAddOperationTresorerie.sens1 == "D" &&
        $scope.FormAddOperationTresorerie.sens1 != ""
      ) {
        $scope.FormAddOperationTresorerie.sens2 = "C";
      }

      $scope.FormAddOperationTresorerie.Numpiece = infos.NO_REFPIECE;
      $scope.FormAddOperationTresorerie.Montant = infos.NO_MONTANT;
      $scope.FormAddOperationTresorerie.Journal = infos.JO_CODEJOURNAL;
      $scope.FormAddOperationTresorerie.Natcompte =
        infos.NO_CODENATUREOPERATION;
      $scope.FormAddOperationTresorerie.libselect = infos.NO_LIBELLE;
      $scope.isDisabled1 = false;
      $scope.isDisabled2 = false;
      $scope.isDisabled4 = false;
    };
    $scope.listeDesPlancomptable = function (idPL) {
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: idPL,
          NC_CODENATURECOMPTE: "",
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
        .post(
          "/FamilleOperationTresorerie/ListeFamilleOperationtrseorerie/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesListeFamilleOpetresorerie = reponse.data;
          console.log($scope.listeDesListeFamilleOpetresorerie);
        });
    };
    $scope.listeDesPlancomptable1 = function (idPL1) {
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: idPL1,
          NC_CODENATURECOMPTE: "",
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
        .post(
          "/FamilleOperationTresorerie/ListeFamilleOperationtrseorerie/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesListeFamilleOpetresorerie1 = reponse.data;
          console.log($scope.listeDesListeFamilleOpetresorerie1);
        });
    };
    $scope.afficheListeNumCompte = function () {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          NC_CODENATURECOMPTE: "",
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
    $scope.afficheListeNumCompte1 = function () {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          NC_CODENATURECOMPTE: "",
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
          $scope.listeDesNumComptes1 = reponse.data;
          $scope.leChargement = false;
          console.log($scope.listeDesNumComptes1);
        });
    };
    $scope.choixduPlan = function (ColInfo) {
      $scope.FormAddOperationTresorerie.NumCompte1 = ColInfo.PL_NUMCOMPTE;
      $scope.FormAddOperationTresorerie.libcompt1 = ColInfo.PL_LIBELLE;
    };

    $scope.choixduPlan1 = function (ColInfo1) {
      $scope.FormAddOperationTresorerie.NumCompte2 = ColInfo1.PL_NUMCOMPTE;
      $scope.FormAddOperationTresorerie.libcompt2 = ColInfo1.PL_LIBELLE;
    };

    $scope.Sens = function (idSENS) {
      $scope.objet_envoie = [
        {
          NO_SENS: idSENS,
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
        .post("/Sens/ListeSens/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSENS = reponse.data;
          console.log($scope.listeDesSENS);
        });
    };
    $scope.Sens1 = function (idSENS1) {
      $scope.objet_envoie = [
        {
          NO_SENS: idSENS1,
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
        .post("/Sens/ListeSens/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSENS1 = reponse.data;
          console.log($scope.listeDesSENS1);
        });
    };

    $scope.clearform = function () {
      $scope.FormAddOperationTresorerie = {
        libelle: "",
        Numpiece: "",
        Montant: "",
        NumCompte1: "",
        NumCompte2: "",
        libcompt1: "",
        libcompt2: "",
        sens1: "",
        sens2: "",
      };
      $scope.isDisabled1 = true;
      $scope.isDisabled2 = true;
      $scope.isDisabled3 = true;
      $scope.isDisabled4 = true;
      $scope.isDisabled5 = true;
      $scope.isDisabled6 = true;
      $scope.listeDesListeFamilleOpe = [];
      $scope.listeDesListeFamilleOpeliste = [];
      $scope.initFormAddOperationTresorerie();
    };

    $scope.AjoutOperationTresorerie = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe();
      let typeNumCompte = /^[0-9]{1,12}$/;
      if ($scope.FormAddOperationTresorerie.libelle != "") {
        $scope.FormAddOperationTresorerie.libelle =
          $scope.FormAddOperationTresorerie.libelle +
          ":" +
          $scope.FormAddOperationTresorerie.libselect;
      }
      if ($scope.FormAddOperationTresorerie.libelle == "") {
        $scope.FormAddOperationTresorerie.libelle =
          $scope.FormAddOperationTresorerie.libselect;
      }

      if (
        $scope.FormAddOperationTresorerie.Montant === "" ||
        $scope.FormAddOperationTresorerie.Montant === undefined ||
        $scope.FormAddOperationTresorerie.NumCompte1 === "" ||
        $scope.FormAddOperationTresorerie.NumCompte1 === undefined ||
        $scope.FormAddOperationTresorerie.libcompt1 === "" ||
        $scope.FormAddOperationTresorerie.libcompt1 === undefined ||
        $scope.FormAddOperationTresorerie.sens1 === "" ||
        $scope.FormAddOperationTresorerie.sens1 === undefined ||
        $scope.FormAddOperationTresorerie.NumCompte2 === "" ||
        $scope.FormAddOperationTresorerie.NumCompte2 === undefined ||
        $scope.FormAddOperationTresorerie.libcompt2 === "" ||
        $scope.FormAddOperationTresorerie.libcompt2 === undefined ||
        $scope.FormAddOperationTresorerie.sens2 === "" ||
        $scope.FormAddOperationTresorerie.sens2 === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddOperationTresorerie.libelle === "" ||
            $scope.FormAddOperationTresorerie.libelle === undefined
          ) {
            $("#idlibcompt2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperationTresorerie.Montant === "" ||
            $scope.FormAddOperationTresorerie.Montant === undefined
          ) {
            $("#idMontant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperationTresorerie.NumCompte1 === "" ||
            $scope.FormAddOperationTresorerie.NumCompte1 === undefined
          ) {
            $("#idNumCompte1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperationTresorerie.libcompt1 === "" ||
            $scope.FormAddOperationTresorerie.libcompt1 === undefined
          ) {
            $("#idlibcompt1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperationTresorerie.sens1 === "" ||
            $scope.FormAddOperationTresorerie.sens1 === undefined
          ) {
            $("#idsens1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperationTresorerie.NumCompte2 === "" ||
            $scope.FormAddOperationTresorerie.NumCompte2 === undefined
          ) {
            $("#idNumCompte2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperationTresorerie.libcompt2 === "" ||
            $scope.FormAddOperationTresorerie.libcompt2 === undefined
          ) {
            $("#idlibcompt2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOperationTresorerie.sens2 === "" ||
            $scope.FormAddOperationTresorerie.sens2 === undefined
          ) {
            $("#idsens2").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeNumCompte.test($scope.FormAddOperationTresorerie.Montant) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idMontant").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "veuillez saisir un montant valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.objet1 = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          MS_NUMPIECE: "0",
          MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          MV_MONTANTCREDIT: "0",
          MV_MONTANTDEBIT: $scope.FormAddOperationTresorerie.Montant,
          MV_LIBELLEOPERATION: $scope.FormAddOperationTresorerie.libelle,
          MV_NOMTIERS: $rootScope.infoDeLoperateur[0].OP_NOMPRENOM,
          MV_REFERENCEPIECE: $scope.FormAddOperationTresorerie.Numpiece,
          MR_CODEMODEREGLEMENT: "",
          NC_CODENATURECOMPTE: "",
          NO_CODENATUREOPERATION: $scope.FormAddOperationTresorerie.Natcompte,
          PL_NUMCOMPTE2: "",
          PL_NUMCOMPTE: $scope.FormAddOperationTresorerie.NumCompte1,
          PL_NUMCOMPTEBANQUE: "0",
          PL_NUMCOMPTE1: "",
          TI_NUMTIERS: "0",
          TI_IDTIERS: "0",
          JO_CODEJOURNAL: $scope.FormAddOperationTresorerie.Journal,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TYPEOPERATION: "1",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          },
        };
        $scope.tabEnvoi.push($scope.objet1);
        $scope.objet2 = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          MS_NUMPIECE: "0",
          MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          MV_MONTANTCREDIT: $scope.FormAddOperationTresorerie.Montant,
          MV_MONTANTDEBIT: "0",
          MV_LIBELLEOPERATION: $scope.FormAddOperationTresorerie.libelle,
          MV_NOMTIERS: $rootScope.infoDeLoperateur[0].OP_NOMPRENOM,
          MV_REFERENCEPIECE: $scope.FormAddOperationTresorerie.Numpiece,
          MR_CODEMODEREGLEMENT: "",
          NC_CODENATURECOMPTE: "",
          NO_CODENATUREOPERATION: $scope.FormAddOperationTresorerie.Natcompte,
          PL_NUMCOMPTE2: "",
          PL_NUMCOMPTE: $scope.FormAddOperationTresorerie.NumCompte2,
          PL_NUMCOMPTEBANQUE: "0",
          PL_NUMCOMPTE1: "",
          TI_NUMTIERS: "0",
          TI_IDTIERS: "0",
          JO_CODEJOURNAL: $scope.FormAddOperationTresorerie.Journal,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TYPEOPERATION: "1",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          },
        };
        $scope.tabEnvoi.push($scope.objet2);
        $scope.objet_envoie = $scope.tabEnvoi;
        $http
          .post(
            "/ReglementfactureClient/AjoutReglementOperationTresorerie/",
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
              $scope.FormAddOperationTresorerie = {
                libelle: "",
                Numpiece: "",
                Montant: "",
                NumCompte1: "",
                NumCompte2: "",
                libcompt1: "",
                libcompt2: "",
                sens1: "",
                sens2: "",
              };
              $scope.isDisabled1 = true;
              $scope.isDisabled2 = true;
              $scope.isDisabled3 = true;
              $scope.isDisabled4 = true;
              $scope.isDisabled5 = true;
              $scope.isDisabled6 = true;
              $scope.listeDesListeFamilleOpe = [];
              $scope.listeDesListeFamilleOpeliste = [];
              $scope.initFormAddOperationTresorerie();
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
  },
]);
