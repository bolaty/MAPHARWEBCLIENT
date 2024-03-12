MapharApp.controller("parametrageAutreOperationDesTiersController", [
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

    $scope.formParametrageoperation = {
      Libelle: "",
      Operation: "",
      numCompte: "",
      MontantMax: "",
      Taux: "",
      Montant: "",
      valeur: "",
      numCompte: "",
    };

    $scope.indexlibetat = "";
    $scope.indexnometat = "";

    $scope.listeParametreI = [];
    $scope.listeDesNumComptes = [];
    $scope.etatForm = 2;
    $scope.updateparms = [];
    $scope.tabretoursave = [];
    $scope.listeOperation = [];
    $scope.listeretour = [];
    $scope.indexligne = 0;
    $scope.veroucompte = true;
    $scope.clsCtcontratgaranties = [];

    //------------- declaration de variable parametrage des autres ecritures -----------------------------//
    $scope.formParamAutreEcriture = {
      Code: "",
      Libelle: "",
      Abreviation: "",
      Journal: "",
      Naturecompte1: "",
      Naturecompte2: "",
      Numerocompte1: 0,
      Numerocompte2: 0,
      Sens: "",
      Montantpardefaut: 0,
      Autorisermodificationmontant: "O",
      Numeroordre: 0,
    };

    $scope.formnaturefamille = "";
    $scope.RecupererIdElement = "";
    $scope.listeretoursupr = [];
    $scope.listeDesfamilles = [];
    $scope.listeDeslisteEcriture = [];
    $scope.recuperer = [];
    $scope.retourJournal = [];
    $scope.listeDesNumComptesautreEcriture1 = [];
    $scope.listeDesNumComptesautreEcriture2 = [];
    $scope.retourlistenatureCompte1 = [];
    $scope.retourlistenatureCompte2 = [];
    $scope.selectedMore = [];
    $scope.cpt = 0;
    listeDessens = [];
    $scope.id1 = "";
    $scope.id2 = "";
    $scope.etatFormAutreEcriture = "";
    $scope.recupererinfosAutreEcriture = [];
    $scope.NO_CODENATUREOPERATION = "";
    $scope.recupererinfocleFOCODEFAMILLE = "";
    $scope.testEnregistrementAutreEcriture = [];
    //------------- parametrage des autres ecritures -----------------------------//
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

    $scope.initLISTEenregistrement = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeOperation();

      $scope.$emit("UNLOAD");
    };

    //debut affiche liste ParameteI
    $scope.afficheListeOperation = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
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
        .post(
          "/ParametrageComptesProduit/LISTEOPERATION/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeOperation = reponse.data.reverse();
          console.log($scope.listeOperation);

          $scope.$emit("UNLOAD");
        });
    };
    //debut affiche liste ParameteI
    $scope.afficheListe = function (infooperation) {
      if (infooperation == undefined) {
        infooperation = "";
      }
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          TO_CODEOPERATION: infooperation,
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
        .post("/ParametrageComptesProduit/LISTE/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeretour = reponse.data.reverse();
          console.log($scope.listeOperation);

          $scope.$emit("UNLOAD");
        });
    };

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idZoneOuCoordination").css("background-color", "#FFFFFF");
        $("#idSuccursales").css("background-color", "#FFFFFF");
        $("#idTypeFournisseur").css("background-color", "#FFFFFF");
        $("#idDateDebut").css("background-color", "#FFFFFF");
        $("#idDateFin").css("background-color", "#FFFFFF");
      });
      $scope.FormListEditionParametre.ZoneOuCoordination = "";
      $scope.FormListEditionParametre.Succursales = "";
      $scope.FormListEditionParametre.TypeFournisseur = "";
      $scope.FormListEditionParametre.DateDebut = "";
      $scope.FormListEditionParametre.Datefin = "";
    };
    //fin pour annuler la recherche

    //debut choix de l'etat
    $scope.lIndex = "";
    $scope.choixEtat = function (idEtat, libEtat, nometat) {
      $scope.indexlibetat = libEtat;
      $scope.indexnometat = nometat;
      console.log($scope.indexlibetat);
      for (var i = 0; i < $scope.listeEditionParametre.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEditionParametre.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $("#idEtat" + idEtat).css("background-color", "beige");
          if (
            $scope.listeEditionParametre[j].ET_INDEX == "PAR_ENTREPOT" ||
            $scope.listeEditionParametre[j].ET_INDEX == "PAR_PARAMETRE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            ($scope.FormListEditionParametre.Succursales =
              $scope.listeDesSuccursales[0].ZN_CODEZONE),
              ($scope.GriseTypeFournisseur = true);
            $scope.GriseDateDebut = true;
            $scope.GriseDatefin = true;
          }
        }
      }
    };
    //fin choix de l'etat

    //---------------- Paramétrage des autres operatons des tiers --------------------------------------------//

    $scope.initenregistrement = function () {
      $scope.$emit("LOAD");
      $scope.afficheFamilleOperation();

      $scope.$emit("UNLOAD");
    };

    $scope.initenregistrementAutreEcritures = function () {
      $scope.cpt = 1;
      $scope.affichelisteJournal();
    };
    $scope.initenregistrementAutreEcrituresmodif = function () {
      $scope.etatFormAutreEcriture = "2";
      $scope.affichelisteJournal();
    };

    $scope.afficheFamilleOperation = function () {
      $scope.objet_envoie = [
        {
          NF_CODENATUREFAMILLEOPERATION: "04",
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
          "/ParametredesAutresEcritures/Listecombofamilleoperation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesfamilles = reponse.data;
        });
    };

    $scope.affichelisteEcriture = function () {
      $scope.$emit("LOAD");
      if ($scope.formnaturefamille == undefined) {
        $scope.formnaturefamille = "";
      }
      $scope.objet_envoie = [
        {
          NF_CODENATUREFAMILLEOPERATION: "04",
          FO_CODEFAMILLEOPERATION: $scope.formnaturefamille,
          ET_TYPEETAT1: "02",
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
        .post("/ParametredesAutresEcritures/Liste/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeDeslisteEcriture = reponse.data;
          console.log($scope.listeDeslisteEcriture);
        });
    };

    $scope.supprRecupererIdElement = function (idecriture) {
      $scope.RecupererIdElement = idecriture;
    };

    $scope.supprEcriture = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          NO_CODENATUREOPERATION: $scope.RecupererIdElement,
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
        .post("/ParametredesAutresEcritures/DELETE/", $scope.objet_envoie, {
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
            $scope.listeDeslisteEcriture[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
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

    $scope.choixNumCompte1 = function (infchoixnumcompte) {
      $scope.formParamAutreEcriture.Numerocompte1 =
        infchoixnumcompte.PL_NUMCOMPTE;
      $scope.id1 = infchoixnumcompte.PL_CODENUMCOMPTE;
    };
    $scope.choixNumCompte2 = function (infchoixnumcompte2) {
      $scope.formParamAutreEcriture.Numerocompte2 =
        infchoixnumcompte2.PL_NUMCOMPTE;
      $scope.id2 = infchoixnumcompte2.PL_CODENUMCOMPTE;
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
      window.location.href =
        "#/parametre2/parametrageOperations/parametrageAutresOperationsTiersmodif";
      //$scope.recuperer = JSON.parse(sessionStorage.getItem("vprecupinfoliste"));
    };
    //CASE A COCHER SUR LA LISTE

    $scope.COCHE = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.testval = function (item) {
      if ($scope.cpt == 0) {
        $scope.formParamAutreEcriture.Autorisermodificationmontant = "O";
        $scope.cpt++;
      } else {
        $scope.formParamAutreEcriture.Autorisermodificationmontant = "N";
        $scope.cpt = 0;
      }
      console.log($scope.formParamAutreEcriture.Autorisermodificationmontant);
    };
    $scope.reloadpage = function () {
      window.location.reload();
    };

    $scope.desactiverChampRquisAutresEcriture = function () {
      $(document).ready(function () {
        $("#Libelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#Abreviation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Journal").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Montantpardefaut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idIsense").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Numeroordre").focusin(function () {
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
      $scope.desactiverChampRquisAutresEcriture();
      $scope.recupererinfosAutreEcriture = JSON.parse(
        sessionStorage.getItem("vprecupinfoliste")
      );
      $scope.recupererinfocleFOCODEFAMILLE = JSON.parse(
        sessionStorage.getItem("cleFOCODEFAMILLE")
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

      // $scope.Montantpardefaut = parseInt($scope.formParamAutreEcriture.Montantpardefaut);
      // $scope.Numeroordre = parseInt($scope.formParamAutreEcriture.Numeroordre);
      // $scope.valtaux = parseInt($scope.formParamAutreEcriture.Taux);

      if (
        $scope.formParamAutreEcriture.Libelle === "" ||
        $scope.formParamAutreEcriture.Libelle === undefined ||
        $scope.formParamAutreEcriture.Abreviation === "" ||
        $scope.formParamAutreEcriture.Abreviation === undefined ||
        $scope.formParamAutreEcriture.Journal === "" ||
        $scope.formParamAutreEcriture.Journal === undefined ||
        $scope.formParamAutreEcriture.Sens === "" ||
        $scope.formParamAutreEcriture.Sens === undefined ||
        $scope.formParamAutreEcriture.Montantpardefaut === "" ||
        $scope.formParamAutreEcriture.Montantpardefaut === undefined ||
        $scope.formParamAutreEcriture.Montantpardefaut === "" ||
        $scope.formParamAutreEcriture.Montantpardefaut === undefined ||
        $scope.formParamAutreEcriture.Numeroordre === "" ||
        $scope.formParamAutreEcriture.Numeroordre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.formParamAutreEcriture.Libelle === "" ||
            $scope.formParamAutreEcriture.Libelle === undefined
          ) {
            $("#Libelle").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamAutreEcriture.Abreviation === "" ||
            $scope.formParamAutreEcriture.Abreviation === undefined
          ) {
            $("#Abreviation").css("background-color", "#FFE9E0");
          }

          if (
            $scope.formParamAutreEcriture.Journal === "" ||
            $scope.formParamAutreEcriture.Journal === undefined
          ) {
            $("#Journal").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamAutreEcriture.Montantpardefaut === "" ||
            $scope.formParamAutreEcriture.Montantpardefaut === undefined
          ) {
            $("#Montantpardefaut").css("background-color", "#FFE9E0");
          }
          if (
            $scope.formParamAutreEcriture.Sens === "" ||
            $scope.formParamAutreEcriture.Sens === undefined
          ) {
            $("#idIsense").css("background-color", "#FFE9E0");
          }

          if (
            $scope.formParamAutreEcriture.Numeroordre === "" ||
            $scope.formParamAutreEcriture.Numeroordre === undefined
          ) {
            $("#Numeroordre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.formParamAutreEcriture.Abreviation.length != 5) {
        $scope.messageErreur =
          "La taille de l'abréviation doit être cinq (5)  !!!";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#Abreviation").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.formParamAutreEcriture.Numeroordre) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un numero correcte";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#Numeroordre").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.formParamAutreEcriture.Montantpardefaut) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#Montantpardefaut").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un montant par defaut correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        //alert('On est bon')
        if ($scope.etatFormAutreEcriture == "2") {
          $scope.NO_CODENATUREOPERATION =
            $scope.recupererinfosAutreEcriture.NO_CODENATUREOPERATION;
          $scope.recupererinfocleFOCODEFAMILLE =
            $scope.recupererinfosAutreEcriture.FO_CODEFAMILLEOPERATION;
          //$scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.NO_CODENATUREOPERATION = "";
          // $scope.TYPEOPERATION = "0";
          // $scope.SL_LIBELLEMOUCHARD = "INSERTION";
        }
        if ($scope.id1 == "" || $scope.id1 == undefined) {
          $scope.id1 = "";
        }
        if (
          $scope.formParamAutreEcriture.Numerocompte1 == "" ||
          $scope.formParamAutreEcriture.Numerocompte1 == undefined
        ) {
          $scope.formParamAutreEcriture.Numerocompte1 = 0;
        }
        if ($scope.id2 == "" || $scope.id2 == undefined) {
          $scope.id2 = "";
        }

        if (
          $scope.formParamAutreEcriture.Numerocompte2 == "" ||
          $scope.formParamAutreEcriture.Numerocompte2 == undefined
        ) {
          $scope.formParamAutreEcriture.Numerocompte2 = 0;
        }
        if ($scope.id1 == "" || $scope.id1 == undefined) {
          $scope.id1 = "";
        }

        if (
          $scope.formParamAutreEcriture.Naturecompte1 == "" ||
          $scope.formParamAutreEcriture.Naturecompte1 == undefined
        ) {
          $scope.formParamAutreEcriture.Naturecompte1 = "";
        }

        if (
          $scope.formParamAutreEcriture.Naturecompte2 == "" ||
          $scope.formParamAutreEcriture.Naturecompte2 == undefined
        ) {
          $scope.formParamAutreEcriture.Naturecompte2 = "";
        }

        $scope.objet_envoie = [
          {
            NO_CODENATUREOPERATION: $scope.NO_CODENATUREOPERATION,
            NO_LIBELLE: $scope.formParamAutreEcriture.Libelle,
            NO_ABREVIATION: $scope.formParamAutreEcriture.Abreviation,
            FO_CODEFAMILLEOPERATION: $scope.recupererinfocleFOCODEFAMILLE,
            NF_CODENATUREFAMILLEOPERATION: "04",
            PL_CODENUMCOMPTE: $scope.id1,
            PL_NUMCOMPTE: $scope.formParamAutreEcriture.Numerocompte1,
            PL_CODENUMCOMPTECONTREPARTIE: $scope.id2,
            PL_NUMCOMPTECONTREPARTIE:
              $scope.formParamAutreEcriture.Numerocompte2,
            NO_MONTANT: $scope.formParamAutreEcriture.Montantpardefaut,
            NO_NUMEROORDRE: $scope.formParamAutreEcriture.Numeroordre,
            NO_MODIFIERMONTANT:
              $scope.formParamAutreEcriture.Autorisermodificationmontant,
            NO_AFFICHER: "O",
            NO_OPERATIONSYSTEME: "N",
            NO_ECRAN: "AU",
            TYPEOPERATION: "1",
            NO_SENS: $scope.formParamAutreEcriture.Sens,
            NC_CODENATURECOMPTE: $scope.formParamAutreEcriture.Naturecompte1,
            NC_CODENATURECOMPTECONTREPARTIE:
              $scope.formParamAutreEcriture.Naturecompte2,
            JO_CODEJOURNAL: $scope.formParamAutreEcriture.Journal,
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
        if ($scope.etatFormAutreEcriture == "2") {
          $http
            .post("/ParametredesAutresEcritures/UPDATE/", $scope.objet_envoie, {
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
                $scope.RetourSurListe = function () {
                  window.location.href =
                    "#/parametre2/parametrageOperations/parametrageAutresOperationsTiers/liste";
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
            .post("/ParametredesAutresEcritures/INSERT/", $scope.objet_envoie, {
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
                $scope.formParamAutreEcriture = {
                  Code: "",
                  Libelle: "",
                  Abreviation: "",
                  Journal: "",
                  Naturecompte1: "",
                  Naturecompte2: "",
                  Numerocompte1: 0,
                  Numerocompte2: 0,
                  Sens: "",
                  Montantpardefaut: 0,
                  Autorisermodificationmontant: "O",
                  Numeroordre: 0,
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
      $scope.formParamAutreEcriture.Numerocompte1 = "";
      $scope.id1 = "";
    };

    $scope.resetNumeroCompte2 = function () {
      $scope.formParamAutreEcriture.Numerocompte2 = "";
      $scope.id2 = "";
    };

    //CASE A COCHER SUR LA LISTE

    // DEBUT COMBOS

    $scope.affichelisteJournal = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          TJ_CODETYPEJOURNAL: "''06''",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "02",
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
          "/ParametredesAutresEcritures/ListeJournal/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.retourJournal = reponse.data;
          if ($scope.retourJournal[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.affichelistenatureCompte1();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourJournal[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourJournal);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourJournal[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.affichelistenatureCompte1 = function () {
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
          "/ParametredesAutresEcritures/ListeNatureCompte/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.retourretourlistenatureCompte1 = reponse.data;
          if (
            $scope.retourretourlistenatureCompte1[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.affichelistenatureCompte2();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourretourlistenatureCompte1[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourretourlistenatureCompte1);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourretourlistenatureCompte1[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.affichelistenatureCompte2 = function () {
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
          "/ParametredesAutresEcritures/ListeNatureCompte/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.retourlistenatureCompte2 = reponse.data;
          if (
            $scope.retourlistenatureCompte2[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListesens();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.retourlistenatureCompte2[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.retourlistenatureCompte2);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.retourlistenatureCompte2[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListeNumeroCompte1 = function (
      numCompteautreEcriture,
      natureCompteautreEcriture1
    ) {
      $scope.leChargement = true;

      if (numCompteautreEcriture == undefined || numCompteautreEcriture == 0) {
        numCompteautreEcriture = "";
      }

      if (natureCompteautreEcriture1 == undefined) {
        natureCompteautreEcriture1 = "";
      }
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: numCompteautreEcriture,
          NC_CODENATURECOMPTE: natureCompteautreEcriture1,
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.leChargement = false;
          $scope.listeDesNumComptesautreEcriture1 = reponse.data;
          console.log($scope.listeDesNumComptesautreEcriture1);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesNumComptesautreEcriture1[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListeNumeroCompte2 = function (
      numCompteautreEcriture2,
      natureCompteautreEcriture2
    ) {
      $scope.leChargement = true;

      if (
        numCompteautreEcriture2 == undefined ||
        numCompteautreEcriture2 == 0
      ) {
        numCompteautreEcriture2 = "";
      }

      if (natureCompteautreEcriture2 == undefined) {
        natureCompteautreEcriture2 = "";
      }
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: numCompteautreEcriture2,
          NC_CODENATURECOMPTE: natureCompteautreEcriture2,
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.leChargement = false;
          $scope.listeDesNumComptesautreEcriture2 = reponse.data;
          console.log($scope.listeDesNumComptesautreEcriture2);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesNumComptesautreEcriture2[0].clsObjetRetour.SL_MESSAGE
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
        .post("/ParametredesAutresEcritures/ListeSens/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDessens = reponse.data;
          if ($scope.listeDessens[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatFormAutreEcriture == "2") {
              $scope.retourModif();
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDessens[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDessens);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDessens[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.retourModif = function () {
      $scope.etatFormAutreEcriture = "2";
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vprecupinfoliste"));
      $scope.formParamAutreEcriture.Code =
        $scope.recuperer.NO_CODENATUREOPERATION;
      $scope.formParamAutreEcriture.Libelle = $scope.recuperer.NO_LIBELLE;
      $scope.formParamAutreEcriture.Abreviation =
        $scope.recuperer.NO_ABREVIATION;
      $scope.formParamAutreEcriture.Journal = $scope.recuperer.JO_CODEJOURNAL;
      $scope.formParamAutreEcriture.Naturecompte1 =
        $scope.recuperer.NC_CODENATURECOMPTE;
      $scope.formParamAutreEcriture.Naturecompte2 =
        $scope.recuperer.NC_CODENATURECOMPTECONTREPARTIE;
      $scope.formParamAutreEcriture.Numerocompte1 =
        $scope.recuperer.PL_NUMCOMPTE;
      $scope.formParamAutreEcriture.Numerocompte2 =
        $scope.recuperer.PL_NUMCOMPTECONTREPARTIE;
      $scope.formParamAutreEcriture.Sens = $scope.recuperer.NO_SENS;
      $scope.formParamAutreEcriture.Montantpardefaut =
        $scope.recuperer.NO_MONTANT;
      $scope.formParamAutreEcriture.Autorisermodificationmontant =
        $scope.recuperer.NO_MODIFIERMONTANT;
      $scope.formParamAutreEcriture.Numeroordre =
        $scope.recuperer.NO_NUMEROORDRE;

      if ($scope.formParamAutreEcriture.Autorisermodificationmontant == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }

      $scope.$emit("UNLOAD");
    };

    // FIN COMBOS

    //---------------- fin  des Paramétrage des autres operatons des tiers --------------------------------------------//
  },
]);
