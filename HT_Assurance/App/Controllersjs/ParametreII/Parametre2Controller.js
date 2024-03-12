MapharApp.controller("Parametre2Controller", [
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
    $rootScope.DATE_EX_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    console.log($rootScope.DATE_EX_EXERCICE);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];

    //------------- declaration de variable parametrage des autres ecritures -----------------------------//
    $scope.FormEnrgPlancomptable = {
      Code: "",
      IntituleCompte: "",
      Naturecompte: "",
      NCompte: "0",
      Sens: "",
      Typedecompte: "",
      Statutcompte: "",
      Sautdeligne: "",
      Nombredeligne: "",
      Planreporting: "",
      Saisieanalytique: "N",
      Compteexcedent: "N",
      Comptedeficit: "N",
      Affichersurdroite: "N",
      FocussurTiers: "N",
    };

    $scope.formnaturefamille = "";
    $scope.RecupererIdElement = "";
    $scope.listeretoursupr = [];
    $scope.listeDesfamilles = [];
    $scope.listeDeslisteEcriture = [];
    $scope.recuperer = [];
    $scope.recuperer = [];
    $scope.listeDesNumComptesautreEcriture1 = [];
    $scope.listeDesNumComptesautreEcriture2 = [];
    $scope.retourlistenatureCompte1 = [];
    $scope.retourlistenatureCompte2 = [];
    $scope.selectedMore = [];

    listeDessens = [];
    $scope.id1 = "";
    $scope.id2 = "";

    $scope.NO_CODENATUREOPERATION = "";
    $scope.recupererinfocleFOCODEFAMILLE = "";
    $scope.testEnregistrementAutreEcriture = [];

    $scope.listeParametragePlancomptable = [];
    $scope.Listenaturecompte = [];
    $scope.Listesens = [];
    $scope.Listetypecompte = [];
    $scope.retourListestatutcompte = [];
    $scope.retourListetypesaut = [];
    $scope.retourListePlanRerporting = [];
    $scope.cpt = 0;
    $scope.cpt1 = 0;
    $scope.cpt2 = 0;
    $scope.cpt3 = 0;
    $scope.cpt4 = 0;
    $scope.recupererinfospl = [];
    $scope.PL_CODENUMCOMPTE = "";
    $scope.ListeCompteCollectif = [];
    $scope.PL_COMPTECOLLECTIF = "";
    $scope.tyopera = "";
    $scope.stopEnregistrement = 0;
    $scope.etatFormPlancomptable = "";
    //------------- parametrage des autres ecritures -----------------------------//

    //------------- plan / journal -----------------------------//
    $scope.ListeJournal = [];
    $scope.retourComboEntrepot = [];
    $scope.retourComboTypeJournal = [];
    $scope.FormEnrgJournal = {
      Code: "",
      JournalCode: "",
      Libelle: "",
      Entrepot: "",
      TypeJournal: "",
      NCompte: "",
      CodeNCompte: "",
      NOrdre: "0",
      SaisieAnalytique: "N",
      Contrepartie: "N",
    };
    $scope.etatFormJournal = "";
    $scope.tabEngJournal = [];
    $scope.listeDesNumComptes = [];
    $scope.recupererJournal = [];
    $scope.tabSupprJournal = [];
    //------------- plan / journal -----------------------------//

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
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

    //---------------- Paramétrage des Plancomptables --------------------------------------------//
    $scope.initLISTEenregistrement = function () {
      $scope.afficheListePlancomptable();
    };

    //debut affiche liste ParameteI
    $scope.afficheListePlancomptable = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
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
          "/ParametragePlancomptable/ListePlancomptable/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeParametragePlancomptable = reponse.data;
          console.log($scope.listeParametragePlancomptable);
          if (
            $scope.listeParametragePlancomptable[0].clsObjetRetour
              .SL_RESULTAT == "TRUE"
          ) {
            for (i = 0; $scope.listeParametragePlancomptable.length > i; i++) {
              if (
                $scope.listeParametragePlancomptable[i].PL_FOCUSTIERS == "O"
              ) {
                $scope.selectedMore.push(
                  $scope.listeParametragePlancomptable[i]
                );
              }
              // break;
            }
            $scope.$emit("UNLOAD");
            console.log($scope.selectedMore);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeParametragePlancomptable[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeParametragePlancomptable[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.initenregistrementplancompt = function () {
      $scope.afficheListenaturecompte();
    };

    $scope.initenregistrementplancomptmodif = function () {
      $scope.etatFormPlancomptable = "2";
      $scope.afficheListenaturecompte();
    };

    $scope.afficheListeCompteCollectif = function (ID) {
      $scope.desactiverChampRquisPL();
      if (ID == "" || ID == undefined) {
        $(document).ready(function () {
          if (
            $scope.FormEnrgPlancomptable.Typedecompte === "" ||
            $scope.FormEnrgPlancomptable.Typedecompte === undefined
          ) {
            $("#Typedecompte").css("background-color", "#FFE9E0");
          }
          $rootScope.ChampsNonRenseignes();
        });
      } else {
        if (ID == "I") {
          if (
            $scope.FormEnrgPlancomptable.NCompte == undefined ||
            $scope.FormEnrgPlancomptable.NCompte == ""
          ) {
            $scope.FormEnrgPlancomptable.NCompte = 0;
          }
          $scope.objet_envoie = [
            {
              PL_NUMCOMPTE: $scope.FormEnrgPlancomptable.NCompte,
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
              "/ParametragePlancomptable/LISTCOMPTECOLLECTIFPLANREPORTING/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.ListeCompteCollectif = reponse.data;
              if (
                $scope.ListeCompteCollectif[0].clsObjetRetour.SL_RESULTAT ==
                "FALSE"
              ) {
                /* $rootScope.EnregistrementNonReussi(
                  $scope.ListeCompteCollectif[0].clsObjetRetour.SL_MESSAGE
                );*/
                $scope.PL_COMPTECOLLECTIF = "";
                $scope.stopEnregistrement = 1;
                $scope.ajoutFormAddAutreEcriture();
              } else {
                $scope.PL_COMPTECOLLECTIF =
                  $scope.ListeCompteCollectif[0].PL_NUMCOMPTE;
                $scope.stopEnregistrement = 0;
                $scope.ajoutFormAddAutreEcriture();
              }
            });
        } else {
          $scope.PL_COMPTECOLLECTIF = "";
          $scope.stopEnregistrement = 0;
          $scope.ajoutFormAddAutreEcriture();
        }
      }
    };

    $scope.supprRecupererIdElement = function (id) {
      $scope.RecupererIdElement = id;
    };

    $scope.supprEcriture = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
          PL_CODENUMCOMPTE: $scope.RecupererIdElement,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post("/ParametragePlancomptable/DELETE/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeretoursupr = reponse.data;
          if ($scope.listeretoursupr[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.listeretoursupr[0].clsObjetRetour.SL_MESSAGE
            );
            //$scope.listeParametragePlancomptable[0].clsObjetRetour.SL_RESULTAT = 'FALSE'
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeretoursupr[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeretoursupr[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.voirPlus = function (infoliste) {
      sessionStorage.setItem("vpinfolise", JSON.stringify(infoliste));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpinfolise"));
    };
    $scope.voirModification = function (recupinfoliste) {
      sessionStorage.setItem(
        "vprecupinfoliste",
        JSON.stringify(recupinfoliste)
      );
      window.location.href = "#/parametre2/planComptableModif";
      //$scope.recuperer = JSON.parse(sessionStorage.getItem("vprecupinfoliste"));
    };
    //CASE A COCHER SUR LA LISTE

    $scope.COCHE = function (item) {
      if (item == "O") {
        return true;
      }
    };

    $scope.COCHE1 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE2 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE3 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.COCHE4 = function (item) {
      if (item == "O") {
        return true;
      }
    };

    $scope.testval = function (item) {
      if ($scope.cpt == 0) {
        $scope.FormEnrgPlancomptable.Saisieanalytique = "O";
        $scope.cpt++;
      } else {
        $scope.FormEnrgPlancomptable.Saisieanalytique = "N";
        $scope.cpt = 0;
      }
      console.log($scope.FormEnrgPlancomptable.Saisieanalytique);
    };
    $scope.testval1 = function (item) {
      if ($scope.cpt1 == 0) {
        $scope.FormEnrgPlancomptable.Compteexcedent = "O";
        $scope.cpt1++;
      } else {
        $scope.FormEnrgPlancomptable.Compteexcedent = "N";
        $scope.cpt1 = 0;
      }
      console.log($scope.FormEnrgPlancomptable.Compteexcedent);
    };
    $scope.testval2 = function (item) {
      if ($scope.cpt2 == 0) {
        $scope.FormEnrgPlancomptable.Comptedeficit = "O";
        $scope.cpt2++;
      } else {
        $scope.FormEnrgPlancomptable.Comptedeficit = "N";
        $scope.cpt2 = 0;
      }
      console.log($scope.FormEnrgPlancomptable.Comptedeficit);
    };
    $scope.testval3 = function (item) {
      if ($scope.cpt3 == 0) {
        $scope.FormEnrgPlancomptable.Affichersurdroite = "O";
        $scope.cpt3++;
      } else {
        $scope.FormEnrgPlancomptable.Affichersurdroite = "N";
        $scope.cpt3 = 0;
      }
      console.log($scope.FormEnrgPlancomptable.Affichersurdroite);
    };
    $scope.testval4 = function (item) {
      if ($scope.cpt4 == 0) {
        $scope.FormEnrgPlancomptable.FocussurTiers = "O";
        $scope.cpt4++;
      } else {
        $scope.FormEnrgPlancomptable.FocussurTiers = "N";
        $scope.cpt4 = 0;
      }
      console.log($scope.FormEnrgPlancomptable.FocussurTiers);
    };
    $scope.reloadpage = function () {
      window.location.reload();
    };

    $scope.desactiverChampRquisPL = function () {
      $(document).ready(function () {
        $("#IntituleCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#Naturecompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#NCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Sens").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Typedecompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Statutcompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Sautdeligne").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Nombredeligne").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    $scope.desactiverChampAutresEcriture = function () {
      $(document).ready(function () {
        $("#idNatureFamOp").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    $scope.ajoutFormAddAutreEcriture = function () {
      $scope.$emit("LOAD");

      $scope.desactiverChampRquisPL();
      $scope.recupererinfospl = JSON.parse(
        sessionStorage.getItem("vprecupinfoliste")
      );

      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typetaux = /^[0-9]\d*(,\d+)?$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typechargeutil = /^[0-9]\d*(,\d+)?$/;
      let typemontant = /^[0-9]{1,15}$/;
      let typenumerosouscripteur = /^(0|[0-9]\d*)$/;
      let typenombreplace = /^[0-9]{1,3}$/;
      let typepuissanceadmin = /^[0-9]{1,5}$/;

      // $scope.Montantpardefaut = parseInt($scope.FormEnrgPlancomptable.Montantpardefaut);
      // $scope.Numeroordre = parseInt($scope.FormEnrgPlancomptable.Numeroordre);
      // $scope.valtaux = parseInt($scope.FormEnrgPlancomptable.Taux);

      if (
        $scope.FormEnrgPlancomptable.IntituleCompte === "" ||
        $scope.FormEnrgPlancomptable.IntituleCompte === undefined ||
        $scope.FormEnrgPlancomptable.Naturecompte === "" ||
        $scope.FormEnrgPlancomptable.Naturecompte === undefined ||
        $scope.FormEnrgPlancomptable.NCompte === "" ||
        $scope.FormEnrgPlancomptable.NCompte === undefined ||
        $scope.FormEnrgPlancomptable.Sens === "" ||
        $scope.FormEnrgPlancomptable.Sens === undefined ||
        $scope.FormEnrgPlancomptable.Typedecompte === "" ||
        $scope.FormEnrgPlancomptable.Typedecompte === undefined ||
        $scope.FormEnrgPlancomptable.Statutcompte === "" ||
        $scope.FormEnrgPlancomptable.Statutcompte === undefined ||
        $scope.FormEnrgPlancomptable.Sautdeligne === "" ||
        $scope.FormEnrgPlancomptable.Sautdeligne === undefined ||
        $scope.FormEnrgPlancomptable.Nombredeligne === "" ||
        $scope.FormEnrgPlancomptable.Nombredeligne === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormEnrgPlancomptable.IntituleCompte === "" ||
            $scope.FormEnrgPlancomptable.IntituleCompte === undefined
          ) {
            $("#IntituleCompte").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgPlancomptable.Naturecompte === "" ||
            $scope.FormEnrgPlancomptable.Naturecompte === undefined
          ) {
            $("#Naturecompte").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormEnrgPlancomptable.NCompte === "" ||
            $scope.FormEnrgPlancomptable.NCompte === undefined
          ) {
            $("#NCompte").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgPlancomptable.Sens === "" ||
            $scope.FormEnrgPlancomptable.Sens === undefined
          ) {
            $("#Sens").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgPlancomptable.Typedecompte === "" ||
            $scope.FormEnrgPlancomptable.Typedecompte === undefined
          ) {
            $("#Typedecompte").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormEnrgPlancomptable.Statutcompte === "" ||
            $scope.FormEnrgPlancomptable.Statutcompte === undefined
          ) {
            $("#Statutcompte").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormEnrgPlancomptable.Sautdeligne === "" ||
            $scope.FormEnrgPlancomptable.Sautdeligne === undefined
          ) {
            $("#Sautdeligne").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgPlancomptable.Nombredeligne === "" ||
            $scope.FormEnrgPlancomptable.Nombredeligne === undefined
          ) {
            $("#Nombredeligne").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typemontant.test($scope.FormEnrgPlancomptable.Nombredeligne) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#Nombredeligne").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un nombre de ligne correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormEnrgPlancomptable.NCompte) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#NCompte").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un numero de compte correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.stopEnregistrement == 1) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#NCompte").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Il n'existe pas de compte collectif pour ce numéro de compte.";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormEnrgPlancomptable.NCompte.length ==
        parseInt(
          $rootScope.infoDeLoperateur[0].PP_LONGUEUR_DES_COMPTES_IMPUTABLES
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#NCompte").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La longueur du numéro de compte ne doit pas être supérieur à la longueur des comptes imputables";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        //alert('On est bon')
        if ($scope.etatFormPlancomptable == "2") {
          $scope.PL_CODENUMCOMPTE = $scope.recupererinfospl.PL_CODENUMCOMPTE;
          $scope.tyopera = 1;
        } else {
          $scope.PL_CODENUMCOMPTE = "";
          $scope.tyopera = "";
        }
        if (
          $scope.FormEnrgPlancomptable.NCompte == "" ||
          $scope.FormEnrgPlancomptable.NCompte == undefined
        ) {
          $scope.FormEnrgPlancomptable.NCompte = 0;
        }
        if (
          $scope.PL_COMPTECOLLECTIF == "" ||
          $scope.PL_COMPTECOLLECTIF == undefined
        ) {
          $scope.PL_COMPTECOLLECTIF = "";
        }
        if ($scope.FormEnrgPlancomptable.Planreporting == undefined) {
          $scope.FormEnrgPlancomptable.Planreporting = "";
        }
        $scope.objet_envoie = [
          {
            PL_CODENUMCOMPTE: $scope.PL_CODENUMCOMPTE,
            PL_LIBELLE: $scope.FormEnrgPlancomptable.IntituleCompte,
            SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
            NC_CODENATURECOMPTE: $scope.FormEnrgPlancomptable.Naturecompte,
            PL_NUMCOMPTE: $scope.FormEnrgPlancomptable.NCompte,
            COMPTAPAR_SENS_CODE: $scope.FormEnrgPlancomptable.Sens,
            PL_TYPECOMPTE: $scope.FormEnrgPlancomptable.Typedecompte,
            PL_COMPTECOLLECTIF: $scope.PL_COMPTECOLLECTIF,
            PL_ACTIF: $scope.FormEnrgPlancomptable.Statutcompte,
            PL_FOCUSTIERS: $scope.FormEnrgPlancomptable.FocussurTiers,
            PL_SAISIE_ANALYTIQUE: $scope.FormEnrgPlancomptable.Saisieanalytique,
            TS_CODE: $scope.FormEnrgPlancomptable.Sautdeligne,
            PL_NOMBRELIGNE: $scope.FormEnrgPlancomptable.Nombredeligne,
            PLAN_REPORTING_CODE: $scope.FormEnrgPlancomptable.Planreporting,
            PL_COMPTEEXCEDANT: $scope.FormEnrgPlancomptable.Compteexcedent,
            PL_COMPTEDEFICIT: $scope.FormEnrgPlancomptable.Comptedeficit,
            PL_AFFICHERSURECRANDROIT:
              $scope.FormEnrgPlancomptable.Affichersurdroite,
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: $scope.tyopera,
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
        if ($scope.etatFormPlancomptable == "2") {
          $http
            .post("/ParametragePlancomptable/UPDATE/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrementAutreEcriture = reponse.data;
              if (
                $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                  .SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                    .SL_MESSAGE
                );
                $scope.stopEnregistrement = 0;
                $scope.RetourSurListe = function () {
                  window.location.href = "#/parametre2/planComptable/liste";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                    .SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                  .SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/ParametragePlancomptable/INSERT/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrementAutreEcriture = reponse.data;
              if (
                $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                  .SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                    .SL_MESSAGE
                );
                $scope.stopEnregistrement = 0;
                $scope.FormEnrgPlancomptable = {
                  Code: "",
                  IntituleCompte: "",
                  Naturecompte: "",
                  NCompte: "0",
                  Sens: "",
                  Typedecompte: "",
                  Statutcompte: "",
                  Sautdeligne: "",
                  Nombredeligne: "",
                  Planreporting: "",
                  Saisieanalytique: "N",
                  Compteexcedent: "N",
                  Comptedeficit: "N",
                  Affichersurdroite: "N",
                  FocussurTiers: "N",
                };
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                    .SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrementAutreEcriture[0].clsObjetRetour
                  .SL_MESSAGE
              );
            });
        }
      }
    };

    $scope.redirectenregistrement = function (verifval) {
      $scope.desactiverChampAutresEcriture();
      if (verifval == undefined || verifval == "") {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.formnaturefamille == "" ||
            $scope.formnaturefamille == undefined
          ) {
            $("#idNatureFamOp").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else {
        sessionStorage.setItem(
          "cleFOCODEFAMILLE",
          JSON.stringify($scope.formnaturefamille)
        );
        window.location.href =
          "#/parametre2/parametrageOperations/parametrageAutresOperationsTiers";
      }
    };
    $scope.resetNumeroCompte1 = function () {
      $scope.FormEnrgPlancomptable.Numerocompte1 = "";
      $scope.id1 = "";
    };

    $scope.resetNumeroCompte2 = function () {
      $scope.FormEnrgPlancomptable.Numerocompte2 = "";
      $scope.id2 = "";
    };

    //CASE A COCHER SUR LA LISTE
    $scope.selectedMore = [];
    $scope.existedMore = function (item) {
      if (item == "O") {
        return true;
      }
      //return $scope.selectedMore.indexOf(item) > -1;
    };

    $scope.toggleSelectedMore = function (item) {
      let idx = $scope.selectedMore.indexOf(item);
      if (idx > -1) {
        for (i = 0; $scope.listeParametragePlancomptable.length > i; i++) {
          if (
            item.PL_CODENUMCOMPTE ==
            $scope.listeParametragePlancomptable[i].PL_CODENUMCOMPTE
          ) {
            if ($scope.listeParametragePlancomptable[i].PL_FOCUSTIERS == "O") {
              $scope.listeParametragePlancomptable[i].PL_FOCUSTIERS = "N";
              break;
            }
          }
        }

        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
        for (i = 0; $scope.listeParametragePlancomptable.length > i; i++) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].PL_CODENUMCOMPTE) ==
              parseInt($scope.listeParametragePlancomptable[i].PL_CODENUMCOMPTE)
            ) {
              if (
                $scope.listeParametragePlancomptable[i].PL_FOCUSTIERS == "N"
              ) {
                $scope.listeParametragePlancomptable[i].PL_FOCUSTIERS = "O";
                break;
              }
            }
          }
        }
      }

      console.log($scope.selectedMore);
    };

    // DEBUT COMBOS

    $scope.afficheListenaturecompte = function () {
      $scope.$emit("LOAD");
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
        .post(
          "/ParametragePlancomptable/Listenaturecompte/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.Listenaturecompte = reponse.data;
          if (
            $scope.Listenaturecompte[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListesens();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.Listenaturecompte[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.Listenaturecompte);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.Listenaturecompte[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListesens = function () {
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
        .post("/ParametragePlancomptable/Listesens/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.Listesens = reponse.data;
          if ($scope.Listesens[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListetypecompte();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.Listesens[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.Listesens);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.Listesens[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListetypecompte = function () {
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
        .post(
          "/ParametragePlancomptable/Listetypecompte/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.Listetypecompte = reponse.data;
          if ($scope.Listetypecompte[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListestatutcompte();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.Listetypecompte[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.Listetypecompte);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.Listetypecompte[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListestatutcompte = function () {
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
        .post(
          "/ParametragePlancomptable/Listestatutcompte/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.retourListestatutcompte = reponse.data;
          if (
            $scope.retourListestatutcompte[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListetypesaut();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourListestatutcompte[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourListestatutcompte);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourListestatutcompte[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListetypesaut = function () {
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
        .post("/ParametragePlancomptable/Listetypesaut/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.retourListetypesaut = reponse.data;
          if (
            $scope.retourListetypesaut[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListePlanRerporting();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourListetypesaut[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourListetypesaut);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourListetypesaut[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListePlanRerporting = function () {
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
        .post(
          "/ParametragePlancomptable/ListePlanRerporting/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.retourListePlanRerporting = reponse.data;
          if (
            $scope.retourListePlanRerporting[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            if ($scope.etatFormPlancomptable == "2") {
              $scope.retourModif();
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourListePlanRerporting[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourListePlanRerporting);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourListePlanRerporting[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.retourModif = function () {
      $scope.etatFormPlancomptable = "2";
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vprecupinfoliste"));
      $scope.FormEnrgPlancomptable.Code = $scope.recuperer.PL_CODENUMCOMPTE;
      $scope.FormEnrgPlancomptable.IntituleCompte = $scope.recuperer.PL_LIBELLE;
      $scope.FormEnrgPlancomptable.Naturecompte =
        $scope.recuperer.NC_CODENATURECOMPTE;
      $scope.FormEnrgPlancomptable.NCompte = $scope.recuperer.PL_NUMCOMPTE;
      $scope.FormEnrgPlancomptable.Sens = $scope.recuperer.COMPTAPAR_SENS_CODE;
      $scope.FormEnrgPlancomptable.Typedecompte =
        $scope.recuperer.PL_TYPECOMPTE;
      $scope.FormEnrgPlancomptable.Statutcompte = $scope.recuperer.PL_ACTIF;
      $scope.FormEnrgPlancomptable.Sautdeligne = $scope.recuperer.TS_CODE;
      $scope.FormEnrgPlancomptable.Nombredeligne =
        $scope.recuperer.PL_NOMBRELIGNE;
      $scope.FormEnrgPlancomptable.Planreporting =
        $scope.recuperer.PLAN_REPORTING_CODE;
      $scope.FormEnrgPlancomptable.Saisieanalytique =
        $scope.recuperer.PL_SAISIE_ANALYTIQUE;
      $scope.FormEnrgPlancomptable.Compteexcedent =
        $scope.recuperer.PL_COMPTEEXCEDANT;
      $scope.FormEnrgPlancomptable.Comptedeficit =
        $scope.recuperer.PL_COMPTEDEFICIT;
      $scope.FormEnrgPlancomptable.Affichersurdroite =
        $scope.recuperer.PL_AFFICHERSURECRANDROIT;
      $scope.FormEnrgPlancomptable.FocussurTiers =
        $scope.recuperer.PL_FOCUSTIERS;

      if ($scope.FormEnrgPlancomptable.Saisieanalytique == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.FormEnrgPlancomptable.Compteexcedent == "O") {
        $scope.cpt1 = 1;
      } else {
        $scope.cpt1 = 0;
      }
      if ($scope.FormEnrgPlancomptable.Comptedeficit == "O") {
        $scope.cpt2 = 1;
      } else {
        $scope.cpt2 = 0;
      }
      if ($scope.FormEnrgPlancomptable.Affichersurdroite == "O") {
        $scope.cpt3 = 1;
      } else {
        $scope.cpt3 = 0;
      }
      if ($scope.FormEnrgPlancomptable.FocussurTiers == "O") {
        $scope.cpt4 = 1;
      } else {
        $scope.cpt4 = 0;
      }

      $scope.$emit("UNLOAD");
    };

    // FIN COMBOS

    //---------------- fin  des Paramétrage des autres operatons des tiers --------------------------------------------//

    //---------------- debut journal --------------------------------------------//

    // debut fonction init
    $scope.initFormAddJournal = function () {
      $scope.chargerComboEntrepot();
    };

    $scope.initFormModifJournal = function () {
      $scope.etatFormJournal = "2";
      $scope.chargerComboEntrepot();
    };
    // fin fonction init

    // debut afficher la liste journal
    $scope.afficheListeJournal = function () {
      $scope.$emit("LOAD");
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
        .post("/Journal/ListeJournalParametre2/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.ListeJournal = reponse.data;
          if ($scope.ListeJournal[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.ListeJournal[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.ListeJournal);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.ListeJournal[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    // fin afficher la liste journal

    // DEBUT COMBOS

    // debut entrepot
    $scope.chargerComboEntrepot = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
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
        .post("/Entrepot/ListeEntrepot/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.retourComboEntrepot = reponse.data;
          console.log($scope.retourComboEntrepot);
          if (
            $scope.retourComboEntrepot[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.chargerComboTypeJournal();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourComboEntrepot[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourComboEntrepot);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourComboEntrepot[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    // fin entrepot

    // debut type journal
    $scope.chargerComboTypeJournal = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
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
        .post("/Journal/ListeTypeJournal/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.retourComboTypeJournal = reponse.data;
          if (
            $scope.retourComboTypeJournal[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            if ($scope.etatFormJournal == "2") {
              $scope.retourModifJournal();
            } else {
              $scope.$emit("UNLOAD");
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourComboTypeJournal[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourComboTypeJournal);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourComboTypeJournal[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    // fin type journal

    $scope.retourModifJournal = function () {
      $scope.etatFormJournal = "2";
      $scope.recupererJournal = JSON.parse(
        sessionStorage.getItem("modifJournal")
      );
      $scope.FormEnrgJournal.Code = $scope.recupererJournal.JO_CODEJOURNAL;
      $scope.FormEnrgJournal.JournalCode =
        $scope.recupererJournal.JO_JOURNALCODE;
      $scope.FormEnrgJournal.Libelle = $scope.recupererJournal.JO_LIBELLE;
      $scope.FormEnrgJournal.Entrepot = $scope.recupererJournal.EN_CODEENTREPOT;
      $scope.FormEnrgJournal.TypeJournal =
        $scope.recupererJournal.TJ_CODETYPEJOURNAL;
      $scope.FormEnrgJournal.NCompte = $scope.recupererJournal.PL_NUMCOMPTE;
      $scope.FormEnrgJournal.NOrdre = $scope.recupererJournal.JO_NUMEROORDRE;
      $scope.FormEnrgJournal.SaisieAnalytique =
        $scope.recupererJournal.JO_SAISIEANALYTIQUE;
      $scope.FormEnrgJournal.Contrepartie =
        $scope.recupererJournal.JO_CONTREPARTIE;

      if ($scope.FormEnrgJournal.SaisieAnalytique == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.FormEnrgJournal.Contrepartie == "O") {
        $scope.cpt1 = 1;
      } else {
        $scope.cpt1 = 0;
      }

      $scope.$emit("UNLOAD");
    };

    // FIN COMBOS

    // debut desactiver les champs du journal
    $scope.desactiverChampRequisJournal = function () {
      $(document).ready(function () {
        $("#JournalCode").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Libelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Entrepot").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#TypeJournal").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#NCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#NOrdre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    // fin desactiver les champs du journal

    // debut enregistrement journal
    $scope.validerJournal = function () {
      $scope.$emit("LOAD");

      $scope.desactiverChampRequisJournal();

      if (
        $scope.FormEnrgJournal.JournalCode === "" ||
        $scope.FormEnrgJournal.JournalCode === undefined ||
        $scope.FormEnrgJournal.Libelle === "" ||
        $scope.FormEnrgJournal.Libelle === undefined ||
        $scope.FormEnrgJournal.Entrepot === "" ||
        $scope.FormEnrgJournal.Entrepot === undefined ||
        $scope.FormEnrgJournal.TypeJournal === "" ||
        $scope.FormEnrgJournal.TypeJournal === undefined ||
        $scope.FormEnrgJournal.NOrdre === "" ||
        $scope.FormEnrgJournal.NOrdre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormEnrgJournal.JournalCode === "" ||
            $scope.FormEnrgJournal.JournalCode === undefined
          ) {
            $("#JournalCode").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgJournal.Libelle === "" ||
            $scope.FormEnrgJournal.Libelle === undefined
          ) {
            $("#Libelle").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgJournal.Entrepot === "" ||
            $scope.FormEnrgJournal.Entrepot === undefined
          ) {
            $("#Entrepot").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgJournal.TypeJournal === "" ||
            $scope.FormEnrgJournal.TypeJournal === undefined
          ) {
            $("#TypeJournal").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgJournal.NOrdre === "" ||
            $scope.FormEnrgJournal.NOrdre === undefined
          ) {
            $("#NOrdre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else {
        if ($scope.etatFormJournal == "2") {
          $scope.JO_CODEJOURNAL = $scope.FormEnrgJournal.Code;
          $scope.appelServiceWeb = "ModifJournal";
        } else {
          $scope.JO_CODEJOURNAL = "";
          $scope.appelServiceWeb = "AjoutJournal";
        }

        $scope.objet_envoie = [
          {
            EN_CODEENTREPOT: $scope.FormEnrgJournal.Entrepot,
            JO_CODEJOURNAL: $scope.JO_CODEJOURNAL,
            JO_JOURNALCODE: $scope.FormEnrgJournal.JournalCode,
            JO_LIBELLE: $scope.FormEnrgJournal.Libelle,
            JO_C: "O",
            PL_CODENUMCOMPTE: $scope.FormEnrgJournal.CodeNCompte,
            JO_NUMEROORDRE: $scope.FormEnrgJournal.NOrdre,
            TJ_CODETYPEJOURNAL: $scope.FormEnrgJournal.TypeJournal,
            JO_SAISIEANALYTIQUE: $scope.FormEnrgJournal.SaisieAnalytique,
            JO_CONTREPARTIE: $scope.FormEnrgJournal.Contrepartie,
            SL_LIBELLEECRAN: "Ecran journal / parametre 2",
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
          .post("/Journal/" + $scope.appelServiceWeb, $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.tabEngJournal = reponse.data;
            if ($scope.tabEngJournal[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.tabEngJournal[0].clsObjetRetour.SL_MESSAGE
              );
              if ($scope.etatFormJournal == "2") {
                $scope.etatFormJournal = "";
                $scope.RetourSurListe = function () {
                  window.location.href = "#/parametre2/journal/liste";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.reinitialiser();
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.tabEngJournal[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.tabEngJournal[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    // fin enregistrement journal

    // debut reinitialisation de la page
    $scope.reinitialiser = function () {
      // desactiver les champs marqués en rouge
      $("#Code").css("background-color", "#EDEDED");
      $("#JournalCode").css("background-color", "#FFFFFF");
      $("#Libelle").css("background-color", "#FFFFFF");
      $("#Entrepot").css("background-color", "#FFFFFF");
      $("#TypeJournal").css("css-color", "#FFFFFF");
      $("#NCompte").css("background-color", "#FFFFFF");
      $("#NOrdre").css("background-color", "#FFFFFF");

      // vider les champs
      $scope.FormEnrgJournal = {};

      // les valeurs par defaut du numero ordre
      $scope.FormEnrgJournal.NOrdre = "0";
    };
    // fin reinitialisation de la page

    $scope.leChargement = true;
    //debut liste des comptes
    $scope.afficheListeNumCompte = function () {
      $scope.leChargement = true;

      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: $scope.FormEnrgJournal.NCompte,
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
          $scope.leChargement = false;
          $scope.listeDesNumComptes = reponse.data;
        });
    };
    //fin liste des comptes

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      $("#NCompte").css("background-color", "#FFFFFF");
      $scope.FormEnrgJournal.NCompte = collection.PL_NUMCOMPTE;
      $scope.FormEnrgJournal.CodeNCompte = collection.PL_CODENUMCOMPTE;
    };
    //Fin choix d'un compte

    $scope.cocheJournal = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.testValJournal = function (item) {
      if ($scope.cpt == 0) {
        $scope.FormEnrgJournal.SaisieAnalytique = "O";
        $scope.cpt++;
      } else {
        $scope.FormEnrgJournal.SaisieAnalytique = "N";
        $scope.cpt = 0;
      }
      console.log($scope.FormEnrgJournal.SaisieAnalytique);
    };

    $scope.cocheJournal1 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.testValJournal1 = function (item) {
      if ($scope.cpt1 == 0) {
        $scope.FormEnrgJournal.Contrepartie = "O";
        $scope.cpt1++;
      } else {
        $scope.FormEnrgJournal.Contrepartie = "N";
        $scope.cpt1 = 0;
      }
      console.log($scope.FormEnrgJournal.Contrepartie);
    };

    //debut voir plus journal
    $scope.voirPlusJournal = function (info) {
      sessionStorage.setItem("vpJournal", JSON.stringify(info));
      $scope.recupererJournal = JSON.parse(sessionStorage.getItem("vpJournal"));
      console.log($scope.recupererJournal);
    };
    //fin voir plus journal

    //debut acceder a la page de modification journal
    $scope.voirModificationJournal = function (info) {
      sessionStorage.setItem("modifJournal", JSON.stringify(info));
      window.location.href = "#/parametre2/journal/modification";
    };
    //fin acceder a la page de modification journal

    //debut recuperer id pour la suppression de la ligne journal
    $scope.supprRecupererIdElementJournal = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression de la ligne journal

    //debut suppression de la ligne du journal
    $scope.supprimerLigneJournal = function (idElement) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          JO_CODEJOURNAL: idElement,
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
        .post("/Journal/SupprimerJournal/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabSupprJournal = reponse.data;
          // console.log($scope.tabSupprJournal)
          if ($scope.tabSupprJournal[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.tabSupprJournal[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeJournal();
            // setTimeout($scope.afficheListeJournal, 3600);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.tabSupprJournal[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabSupprJournal[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin suppression de la ligne du journal

    // debut reinitialiser la page de journal
    $scope.reloadPageJournal = function () {
      $scope.FormEnrgJournal = {};
    };
    // fin reinitialiser la page de journal

    //---------------- fin journal --------------------------------------------//
  },
]);
