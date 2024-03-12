MapharApp.controller("SaisieEcritureComptableController", [
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
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    console.log($rootScope.collectionContartOp);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddSaisieEcritureComptable = {
      DatePiece: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      ContGenerale: "",
      conttier: "",
      refpiece: "",
      liboperation: "",
      debit: 0,
      credit: 0,
      numBordereau: "",
      journal: "",
      soldcompt: "",
      soldoperateur: "",
      code01: "",
      Numcompt: "",
      codeNumCompt: "",
      codesouscr01: "",
      denomination01: "",
      id01: "",
      Adresse: "",
    };
    $scope.listeDesNumComptes = [];
    $scope.listeDesSouscripteurs = [];
    $scope.tabListeSaisieEcriture = [];
    $scope.listeDesListeJournaux = [];
    $scope.listeDesSoldeCompte = [];
    $scope.difdebitcredit = 0;
    $scope.isDisabled2 = false;
    $scope.isDisabledinserer = false;
    $scope.isDisabled11 = true;
    $scope.comptgene = "";
    $scope.testEnregistrement = [];
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

    $scope.initFormAddlisteSaisieEcheancier = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeJournal();
      $scope.afficheListeSoldeCompte();
      $scope.calculsomtotal();

      $scope.$emit("UNLOAD");
      //$scope.contrainteFormListsaisie();
    };

    $scope.ListAnnuler = function () {
      $scope.FormAddSaisieEcritureComptable = {
        DatePiece: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
        ContGenerale: "",
        conttier: "",
        refpiece: "",
        liboperation: "",
        debit: 0,
        credit: 0,
        numBordereau: "",
        journal: "",
        soldcompt: "",
        soldoperateur: "",
        code01: "",
        Numcompt: "",
        codeNumCompt: "",
        codesouscr01: "",
        denomination01: "",
        id01: "",
        Adresse: "",
      };
      $scope.tabListeSaisieEcriture = [];
    };
    //debut focus sur le champ

    $scope.desactiverChampRequisListeAjout = function () {
      $(document).ready(function () {
        $("#journal").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#DatePiece").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#ContGenerale").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#conttier").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#refpiece").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#liboperation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#debit").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#credit").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ
    $scope.afficheListeJournal = function () {
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
        .post("/Journal/ListeJournal/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesListeJournaux = reponse.data;
          console.log($scope.listeDesListeJournaux);
        });
    };

    $scope.choixNumCompte = function (collection) {
      if (
        (collection.NC_CODENATURECOMPTE == "03" ||
          collection.NC_CODENATURECOMPTE == "04" ||
          collection.NC_CODENATURECOMPTE == "15") &&
        collection.PL_FOCUSTIERS == "O"
      ) {
        $scope.isDisabled11 = false;
      } else {
        $scope.FormAddSaisieEcritureComptable.conttier = 0;
        $scope.isDisabled11 = true;
      }
      $scope.FormAddSaisieEcritureComptable.ContGenerale =
        collection.PL_NUMCOMPTE;
      $scope.FormAddSaisieEcritureComptable.codeNumCompt =
        collection.PL_CODENUMCOMPTE;
      $scope.afficheListeSoldeCompte(
        collection.PL_NUMCOMPTE,
        $scope.FormAddSaisieEcritureComptable.conttier
      );
      //$scope.comptgene = collection.PL_NUMCOMPTEGENERAL;
      // $scope.isDisabled1 = true;
    };
    $scope.choixSouscripteur = function (code, denomination, id, ad) {
      $scope.FormAddSaisieEcritureComptable.conttier = code;
      $scope.FormAddSaisieEcritureComptable.denomination01 = denomination;
      $scope.FormAddSaisieEcritureComptable.id01 = id;
      $scope.FormAddSaisieEcritureComptable.Adresse = ad;

      $scope.afficheListeSoldeCompte(
        $scope.FormAddSaisieEcritureComptable.ContGenerale,
        $scope.FormAddSaisieEcritureComptable.conttier
      );
    };

    $scope.afficheListeSoldeCompte = function (numcompt, numtier) {
      if (numcompt == "") {
        numcompt = 0;
      }

      if (numtier == "") {
        numtier = 0;
      }

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          PL_NUMCOMPTEGENERAL: numcompt,
          TI_NUMTIERS: numtier,
          NC_CODENATURECOMPTE: "02",
          MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          TYPEOPERATION: "2",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
        .post("/SoldeCompte/ListeSoldeCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSoldeCompte = reponse.data;
          $scope.FormAddSaisieEcritureComptable.soldcompt =
            $scope.listeDesSoldeCompte[0].MC_SOLDE;
          console.log($scope.listeDesSoldeCompte);
        });
    };

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function (num) {
      if($scope.FormAddSaisieEcritureComptable.conttier == undefined){
        $scope.FormAddSaisieEcritureComptable.conttier = ""
      }
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          TI_NUMTIERS: $scope.FormAddSaisieEcritureComptable.conttier,
          TI_DENOMINATION: "",
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "ECRAN AUTO",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "TIERS",
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
          $scope.listeDesSouscripteurs = reponse.data;
        });
    };
    //fin liste des souscripteur
    $scope.afficheListeNumCompte = function (plnumcompte) {
      $scope.leChargement = true;
      if($scope.FormAddSaisieEcritureComptable.ContGenerale == undefined){
        $scope.FormAddSaisieEcritureComptable.ContGenerale = ""
      }
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: $scope.FormAddSaisieEcritureComptable.ContGenerale,
          NC_CODENATURECOMPTE:  "",
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

    $scope.voirPageModification2 = function (
      dapiece,
      contgene,
      conttiers,
      refp,
      libop,
      deb,
      cred
    ) {
      $scope.tst = 1;
      console.log($scope.tst);
      $scope.FormAddSaisieEcritureComptable.DatePiece = dapiece;
      $scope.FormAddSaisieEcritureComptable.ContGenerale = contgene;
      $scope.FormAddSaisieEcritureComptable.conttier = conttiers;
      $scope.FormAddSaisieEcritureComptable.refpiece = refp;
      $scope.FormAddSaisieEcritureComptable.liboperation = libop;
      $scope.FormAddSaisieEcritureComptable.debit = deb;
      $scope.FormAddSaisieEcritureComptable.credit = cred;
      $scope.idElement2 = contgene;
    };
    $scope.inserertabecheance2 = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe();
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./]([0][1-9]|[1][0-2])[./]([0-9]{4}|[0-9]{2})$/;
      let typemontant = /^[0-9]+$/;

      if (
        $scope.FormAddSaisieEcritureComptable.DatePiece === "" ||
        $scope.FormAddSaisieEcritureComptable.DatePiece === undefined ||
        $scope.FormAddSaisieEcritureComptable.debit === "" ||
        $scope.FormAddSaisieEcritureComptable.debit === undefined ||
        $scope.FormAddSaisieEcritureComptable.ContGenerale === "" ||
        $scope.FormAddSaisieEcritureComptable.ContGenerale === undefined ||
        $scope.FormAddSaisieEcritureComptable.conttier === "" ||
        $scope.FormAddSaisieEcritureComptable.conttier === undefined ||
        $scope.FormAddSaisieEcritureComptable.refpiece === "" ||
        $scope.FormAddSaisieEcritureComptable.refpiece === undefined ||
        $scope.FormAddSaisieEcritureComptable.liboperation === "" ||
        $scope.FormAddSaisieEcritureComptable.liboperation === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddSaisieEcritureComptable.DatePiece === "" ||
            $scope.FormAddSaisieEcritureComptable.DatePiece === undefined
          ) {
            $("#DatePiece").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSaisieEcritureComptable.ContGenerale === "" ||
            $scope.FormAddSaisieEcritureComptable.ContGenerale === undefined
          ) {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSaisieEcritureComptable.conttier === "" ||
            $scope.FormAddSaisieEcritureComptable.conttier === undefined
          ) {
            $("#conttier").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSaisieEcritureComptable.liboperation === "" ||
            $scope.FormAddSaisieEcritureComptable.liboperation === undefined
          ) {
            $("#liboperation").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSaisieEcritureComptable.refpiece === "" ||
            $scope.FormAddSaisieEcritureComptable.refpiece === undefined
          ) {
            $("#refpiece").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSaisieEcritureComptable.debit === "" ||
            $scope.FormAddSaisieEcritureComptable.debit === undefined
          ) {
            $("#debit").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typemontant.test($scope.FormAddSaisieEcritureComptable.debit) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#debit").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un montant debit correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormAddSaisieEcritureComptable.credit) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#credit").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un montant credit correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.FormAddSaisieEcritureComptable.credit) == 0 &&
        parseInt($scope.FormAddSaisieEcritureComptable.debit) == 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#credit").css("background-color", "#FFE9E0");
        });
        $(document).ready(function () {
          $("#debit").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "le montant debit et le montant credit ne doivent pas etre null";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.FormAddSaisieEcritureComptable.credit) !== 0 &&
        parseInt($scope.FormAddSaisieEcritureComptable.debit) !== 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#credit").css("background-color", "#FFE9E0");
        });
        $(document).ready(function () {
          $("#debit").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner soit un montant au credit ou un montant au debit";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.tst == 1) {
        for (i = 0; i < $scope.tabListeSaisieEcriture.length; i++) {
          if (
            $scope.tabListeSaisieEcriture[i].CPT_GENERALE == $scope.idElement2
          ) {
            const index = $scope.tabListeSaisieEcriture.indexOf(
              $scope.idElement2,
              0
            );
            if (index < 1) {
              $scope.tabListeSaisieEcriture.splice(i, 1);
              // console.log($scope.tabListeSaisieEch)
              if ($scope.FormAddSaisieEcritureComptable.debit !== "") {
                numbrdebit = $scope.FormAddSaisieEcritureComptable.debit;
                resultadebit = parseInt(numbrdebit).toLocaleString();
              } else {
                resultadebit = 0;
              }
              if ($scope.FormAddSaisieEcritureComptable.credit !== "") {
                numbrcredit = $scope.FormAddSaisieEcritureComptable.credit;
                resultacredit = parseInt(numbrcredit).toLocaleString();
              } else {
                resultacredit = 0;
              }

              $scope.objettab2 = {
                DATE_PIECE: $scope.FormAddSaisieEcritureComptable.DatePiece,
                CPT_GENERALE:
                  $scope.FormAddSaisieEcritureComptable.ContGenerale,
                CPT_TIER: $scope.FormAddSaisieEcritureComptable.conttier,
                REF_PIECE: $scope.FormAddSaisieEcritureComptable.refpiece,
                LIB_OPERATION:
                  $scope.FormAddSaisieEcritureComptable.liboperation,
                DEBIT: resultadebit,
                CREDIT: resultacredit,
                DEBITNF: $scope.FormAddSaisieEcritureComptable.debit,
                CREDITNF: $scope.FormAddSaisieEcritureComptable.credit,
              };
              $scope.tabListeSaisieEcriture.push($scope.objettab2);
              $scope.calculsomtotal();
              console.log($scope.tabListeSaisieEcriture);
            }
          }
        }
        $scope.FormAddSaisieEcritureComptable.DatePiece =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.FormAddSaisieEcritureComptable.ContGenerale = "";
        $scope.FormAddSaisieEcritureComptable.conttier = "";
        $scope.FormAddSaisieEcritureComptable.refpiece = "";
        $scope.FormAddSaisieEcritureComptable.liboperation = "";
        $scope.FormAddSaisieEcritureComptable.debit = 0;
        $scope.FormAddSaisieEcritureComptable.credit = 0;
        // $scope.isDisabled2 = true;
        $scope.tst = 2;
        $scope.isDisabled11 = true
      } else {
        // $scope.tabListeSaisieEch[0].clsObjetRetour.SL_RESULTAT = "TRUE";

        $scope.testsurdate();
        if (
          $scope.FormAddSaisieEcritureComptable.DatePiece === "" ||
          $scope.FormAddSaisieEcritureComptable.DatePiece === undefined ||
          $scope.FormAddSaisieEcritureComptable.debit === "" ||
          $scope.FormAddSaisieEcritureComptable.debit === undefined ||
          $scope.FormAddSaisieEcritureComptable.ContGenerale === "" ||
          $scope.FormAddSaisieEcritureComptable.ContGenerale === undefined ||
          $scope.FormAddSaisieEcritureComptable.conttier === "" ||
          $scope.FormAddSaisieEcritureComptable.conttier === undefined ||
          $scope.FormAddSaisieEcritureComptable.refpiece === "" ||
          $scope.FormAddSaisieEcritureComptable.refpiece === undefined ||
          $scope.FormAddSaisieEcritureComptable.liboperation === "" ||
          $scope.FormAddSaisieEcritureComptable.liboperation === undefined
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            if (
              $scope.FormAddSaisieEcritureComptable.DatePiece === "" ||
              $scope.FormAddSaisieEcritureComptable.DatePiece === undefined
            ) {
              $("#DatePiece").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddSaisieEcritureComptable.ContGenerale === "" ||
              $scope.FormAddSaisieEcritureComptable.ContGenerale === undefined
            ) {
              $("#listSaisie_montant").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddSaisieEcritureComptable.conttier === "" ||
              dateecha$scope.FormAddSaisieEcritureComptable.conttier ===
                undefined
            ) {
              $("#conttier").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddSaisieEcritureComptable.liboperation === "" ||
              $scope.FormAddSaisieEcritureComptable.liboperation === undefined
            ) {
              $("#liboperation").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddSaisieEcritureComptable.refpiece === "" ||
              $scope.FormAddSaisieEcritureComptable.refpiece === undefined
            ) {
              $("#refpiece").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddSaisieEcritureComptable.debit === "" ||
              $scope.FormAddSaisieEcritureComptable.debit === undefined
            ) {
              $("#debit").css("background-color", "#FFE9E0");
            }
          });
          $rootScope.ChampsNonRenseignes();
        } else if (
          typemontant.test($scope.FormAddSaisieEcritureComptable.debit) == false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#debit").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur = "Veuillez renseigner un montant debit correct";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          typemontant.test($scope.FormAddSaisieEcritureComptable.credit) ==
          false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#credit").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "Veuillez renseigner un montant credit correct";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.FormAddSaisieEcritureComptable.credit) == 0 &&
          parseInt($scope.FormAddSaisieEcritureComptable.debit) == 0
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#credit").css("background-color", "#FFE9E0");
          });
          $(document).ready(function () {
            $("#debit").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "le montant debit et le montant credit ne doivent pas etre null";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.FormAddSaisieEcritureComptable.credit) !== 0 &&
          parseInt($scope.FormAddSaisieEcritureComptable.debit) !== 0
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#credit").css("background-color", "#FFE9E0");
          });
          $(document).ready(function () {
            $("#debit").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "Veuillez renseigner soit un montant au credit ou un montant au debit";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.dte == "TRUE") {
          //$scope.calculsomtotal();
          //number = $scope.FormListSaisieEch.montantEcheancier;
          //result = parseInt(number).toLocaleString();
          //console.log(result)
          if ($scope.FormAddSaisieEcritureComptable.debit !== "") {
            numbrdebit = $scope.FormAddSaisieEcritureComptable.debit;
            resultadebit = parseInt(numbrdebit).toLocaleString();
          } else {
            resultadebit = 0;
          }
          if ($scope.FormAddSaisieEcritureComptable.credit !== "") {
            numbrcredit = $scope.FormAddSaisieEcritureComptable.credit;
            resultacredit = parseInt(numbrcredit).toLocaleString();
          } else {
            resultacredit = 0;
          }
          $scope.objettab = {
            DATE_PIECE: $scope.FormAddSaisieEcritureComptable.DatePiece,
            CPT_GENERALE: $scope.FormAddSaisieEcritureComptable.ContGenerale,
            CPT_TIER: $scope.FormAddSaisieEcritureComptable.conttier,
            REF_PIECE: $scope.FormAddSaisieEcritureComptable.refpiece,
            LIB_OPERATION: $scope.FormAddSaisieEcritureComptable.liboperation,
            DEBIT: resultadebit,
            CREDIT: resultacredit,
            DEBITNF: $scope.FormAddSaisieEcritureComptable.debit,
            CREDITNF: $scope.FormAddSaisieEcritureComptable.credit,
          };

          $scope.tabListeSaisieEcriture.push($scope.objettab);
          $scope.calculsomtotal();
          //  $scope.tabListeSaisieEch.EC_MONTANTTOTAL = $scope.somtotal;
          console.log($scope.tabListeSaisieEcriture);
          $scope.FormAddSaisieEcritureComptable.DatePiece =
            $rootScope.DATE_JOURNEE_DE_TRAVAIL;
          $scope.FormAddSaisieEcritureComptable.ContGenerale = "";
          $scope.FormAddSaisieEcritureComptable.conttier = "";
          $scope.FormAddSaisieEcritureComptable.refpiece = "";
          $scope.FormAddSaisieEcritureComptable.liboperation = "";
          $scope.FormAddSaisieEcritureComptable.debit = 0;
          $scope.FormAddSaisieEcritureComptable.credit = 0;
          $scope.dte = "FALSE";
        } else {
          $scope.$emit("UNLOAD");
          $scope.messageErreur = "impossible d'inserer un compte existant";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          //$rootScope.messagedateEcheance();
        }
      }
      $scope.isDisabled11 = true
      $scope.$emit("UNLOAD");
    };

    //debut recuperer id pour la suppression

    $scope.supprRecupererIdElement = function (recupIdrefp) {
      $scope.tstsup = 1;
      $scope.idrefp = recupIdrefp;
    };

    $scope.supprimeContrat = function () {
      $scope.$emit("LOAD");
      if ($scope.tstsup == 1) {
        for (i = 0; i < $scope.tabListeSaisieEcriture.length; i++) {
          $scope.vartest = $scope.tabListeSaisieEcriture[i].CPT_GENERALE;
          if ($scope.vartest == $scope.idrefp) {
            $scope.index = $scope.tabListeSaisieEcriture.indexOf(
              $scope.tabListeSaisieEcriture[i].CPT_GENERALE
            );
            console.log($scope.index);
            if ($scope.index < 1) {
              // $scope.index = $scope.index * (-1);
              $scope.tabListeSaisieEcriture.splice(i, 1);
              // delete  $scope.tabListeSaisieEch[i];
              console.log($scope.tabListeSaisieEcriture);
              $scope.tstsup == "";
              break;
            }
          }
        }
        $scope.calculsomtotal();
      }
      $scope.$emit("UNLOAD");
    };
    //debut recuperer id pour la suppression

    $scope.testsurdate = function () {
      $scope.dte = "FALSE";
      if ($scope.tabListeSaisieEcriture.length == 0) {
        $scope.dte = "TRUE";
      }
      for (i = 0; i < $scope.tabListeSaisieEcriture.length; i++) {
        $scope.axdate = $scope.tabListeSaisieEcriture[i].CPT_GENERALE;

        console.log($scope.axdate);
        if (
          ($scope.axdate != $scope.FormAddSaisieEcritureComptable.ContGenerale) || (($scope.axdate == $scope.FormAddSaisieEcritureComptable.ContGenerale) && ($scope.tabListeSaisieEcriture[i].CPT_TIER != $scope.FormAddSaisieEcritureComptable.conttier))
        ) {
          $scope.dte = "TRUE";
        } else {
          $scope.dte = "FALSE";
          break;
        }
      }
    };

    $scope.calculsomtotal = function () {
      $scope.somdebit = 0;
      $scope.somcredit = 0;

      if ($scope.tabListeSaisieEcriture.length == 0) {
        $scope.somdebit = 0;
        $scope.somcredit = 0;
      } else {
        for (i = 0; i < $scope.tabListeSaisieEcriture.length; i++) {
          $scope.somdebit =
            parseInt($scope.somdebit) +
            parseInt($scope.tabListeSaisieEcriture[i].DEBITNF);
          $scope.somcredit =
            parseInt($scope.somcredit) +
            parseInt($scope.tabListeSaisieEcriture[i].CREDITNF);
          //$scope.somtotal = $scope.somtotal;
        }
        //console.log($scope.somtotal)
        //$scope.montfact = parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF);
        //$scope.montfact = parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF) - parseInt($scope.somtotal);
        //$scope.montfactnf = $scope.somtotal;
        $scope.difdebitcredit =
          parseInt($scope.somcredit) - parseInt($scope.somdebit);
        $scope.somdebit = parseInt($scope.somdebit).toLocaleString();
        $scope.somcredit = parseInt($scope.somcredit).toLocaleString();
      }
    };

    $scope.AjoutSaisieEcriture = function () {
      $scope.desactiverChampRequisListeAjout();
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./]([0][1-9]|[1][0-2])[./]([0-9]{4}|[0-9]{2})$/;
      let typemontant = /^[0-9]+$/;
      if (
        $scope.FormAddSaisieEcritureComptable.journal === "" ||
        $scope.FormAddSaisieEcritureComptable.journal === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddSaisieEcritureComptable.journal === "" ||
            $scope.FormAddSaisieEcritureComptable.journal === undefined
          ) {
            $("#journal").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typemontant.test($scope.FormAddSaisieEcritureComptable.debit) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#debit").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un montant debit correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormAddSaisieEcritureComptable.credit) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#credit").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un montant credit correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }
      //else if (parseInt($scope.FormAddSaisieEcritureComptable.credit) == 0 && parseInt($scope.FormAddSaisieEcritureComptable.debit) == 0) {
      //    $scope.$emit('UNLOAD');
      //    $(document).ready(function () {
      //        $('#credit').css('background-color', '#FFE9E0')
      //    })
      //    $(document).ready(function () {
      //        $('#debit').css('background-color', '#FFE9E0')
      //    })
      //    $scope.messageErreur = "le montant debit et le montant credit ne doivent pas etre null";
      //    $rootScope.MessageDerreurDesTypes($scope.messageErreur)
      //}
      //else if (parseInt($scope.FormAddSaisieEcritureComptable.credit) !== 0 && parseInt($scope.FormAddSaisieEcritureComptable.debit) !== 0) {
      //    $scope.$emit('UNLOAD');
      //    $(document).ready(function () {
      //        $('#credit').css('background-color', '#FFE9E0')
      //    })
      //    $(document).ready(function () {
      //        $('#debit').css('background-color', '#FFE9E0')
      //    })
      //    $scope.messageErreur = "Veuillez renseigner soit un montant au credit ou un montant au debit";
      //    $rootScope.MessageDerreurDesTypes($scope.messageErreur)

      //}
      else if (parseInt($scope.difdebitcredit) !== 0) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#credit").css("background-color", "#FFE9E0");
        });
        $(document).ready(function () {
          $("#debit").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "le total debit doit etre egale au total credit";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.objetenvoicontratsaisieecriturecontrat = [];
        for (var i = 0; i < $scope.tabListeSaisieEcriture.length; i++) {
          $scope.objetsaisieecriturecontrat = {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            MS_NUMPIECE: "0",
            MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            MV_MONTANTCREDIT: "",
            MV_MONTANTDEBIT: "",
            MV_LIBELLEOPERATION: "",
            MV_NOMTIERS: "",
            MV_REFERENCEPIECE: "",
            MR_CODEMODEREGLEMENT: "01",
            NC_CODENATURECOMPTE: "",
            PL_NUMCOMPTE2: "",
            PL_NUMCOMPTE: "",
            PL_NUMCOMPTEBANQUE: "0",
            PL_NUMCOMPTE1: "",
            TI_NUMTIERS: "0",
            TI_IDTIERS: "0",
            JO_CODEJOURNAL: "",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TYPEOPERATION: "1",
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: "",
              OE_Y: "",
              OE_J: "",
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          };
          $scope.objetsaisieecriturecontrat.MV_MONTANTCREDIT =
            $scope.tabListeSaisieEcriture[i].CREDITNF;
          $scope.objetsaisieecriturecontrat.MV_MONTANTDEBIT =
            $scope.tabListeSaisieEcriture[i].DEBITNF;
          $scope.objetsaisieecriturecontrat.MV_LIBELLEOPERATION =
            $scope.tabListeSaisieEcriture[i].LIB_OPERATION;
          $scope.objetsaisieecriturecontrat.MV_NOMTIERS =
            $rootScope.infoDeLoperateur[0].OP_NOMPRENOM;
          $scope.objetsaisieecriturecontrat.MV_REFERENCEPIECE =
            $scope.tabListeSaisieEcriture[i].REF_PIECE;
          $scope.objetsaisieecriturecontrat.PL_NUMCOMPTE2 =
            $scope.tabListeSaisieEcriture[i].CPT_TIER;
          $scope.objetsaisieecriturecontrat.PL_NUMCOMPTE =
            $scope.tabListeSaisieEcriture[i].CPT_GENERALE;
          $scope.objetsaisieecriturecontrat.JO_CODEJOURNAL =
            $scope.FormAddSaisieEcritureComptable.journal;
          $scope.objetsaisieecriturecontrat.clsObjetEnvoi.OE_A =
            $rootScope.CODE_AGENCE;
          $scope.objetsaisieecriturecontrat.clsObjetEnvoi.OE_Y =
            $rootScope.CODE_OPERATEUR;
          $scope.objetsaisieecriturecontrat.clsObjetEnvoi.OE_J =
            $rootScope.DATE_JOURNEE_DE_TRAVAIL;
          $scope.objetenvoicontratsaisieecriturecontrat.push(
            $scope.objetsaisieecriturecontrat
          );
          console.log($scope.objetenvoicontratsaisieecriturecontrat);
        }

        $scope.objet_envoie = $scope.objetenvoicontratsaisieecriturecontrat;

        $http
          .post(
            "/SaisieEcritureComptable/AjoutSaisieEcritureComptable/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.testEnregistrement = reponse.data;
            $scope.FormAddSaisieEcritureComptable.numBordereau =
              $scope.testEnregistrement[0].NUMEROBORDEREAUREGLEMENT;
            if (
              $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
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
            $rootScope.ProblemeServeur(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
  },
]);
