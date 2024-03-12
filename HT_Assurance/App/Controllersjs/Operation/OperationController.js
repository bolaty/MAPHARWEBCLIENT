MapharApp.controller("OperationController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.appelServiceWeb = $rootScope.ADRESSESERV;//"http://192.168.1.100:6033/Service/";
    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
      Exercice: $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE
    };
    $scope.objet_envoie = [];
    $scope.listeDesMarqueAuto = [];
    $scope.listeOperation = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeAnnuleValidation = [];
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT MULTIRISQUE PROFESSIONNEL";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.retourListe = false;
    $scope.recoisLaCollDuContrat = [];
    $scope.recoisLeCodeDuRisque = "";
    $scope.listeDocument = [];
    $scope.recupcont = "";
    listeOperationobservation = [];
    $scope.listeContratAvecAccessoir = [];
    $scope.FormAddModif = {
      N_Police: "",
      Immatriculation: "",
      Effet: "",
      Echeance: "",
      Exercice: "",
      Marque: ""
    };
    $scope.Chargementinfo = "Chargement des informations en cour...";
    $scope.statutform = "1";
    $scope.testEnregistrement = [];
    recupererinfoauto = [];
    $scope.listeDesExercice = [];
    $scope.listeDesExerciceModif = [];
    $scope.MS_NUMPIECE = ""
   // $scope.idExtourne = "";
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

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    $scope.initFormListe = function () {
      $scope.afficheModelListeExercice();
    };
    //debut initialisation add Voyage
    $scope.initFormListQuestionnaires = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeDocument();
      $rootScope.collectionContartOp = localStorage.getItem(
        "CollReglementMultirisquePro"
      );
      console.log($rootScope.collectionContartOp);
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add voyage

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

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

//debut combo Marque
$scope.afficheListeMarque = function () {
  $scope.objet_envoie = [
    {
      SL_LIBELLEECRAN: "ECRAN AUTO",
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
    .post("/TypeVehicule/ListeTypeVehicule/", $scope.objet_envoie, {
      //headers: $scope.headers
    })
    .then(function (reponse) {
      $scope.listeDesMarqueAuto = reponse.data;
      if (
        $scope.listeDesMarqueAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
      ) {
      
      } else {
        $scope.$emit("UNLOAD");
        $rootScope.MessageDesListes(
          $scope.listeDesMarqueAuto[0].clsObjetRetour.SL_MESSAGE
        );
      }
      
    })
    .catch(function () {
      $scope.$emit("UNLOAD");
      $rootScope.ProblemeServeur(
        $scope.listeDesMarqueAuto[0].clsObjetRetour.SL_MESSAGE
      );
    });
};
//fin combo Marque


    //debut afficher liste individuel accident
    $scope.afficheListeOperation = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom,
      Exercice
    ) {
      $scope.$emit("LOAD");

      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

      if (periodeDu !== undefined) {
        $scope.lAnneePeriodeDu = periodeDu.substr(6, 4);
        $scope.leMoisPeriodeDu = periodeDu.substr(3, 2);
        $scope.leJourPeriodeDu = periodeDu.substr(0, 2);
      }
      if (periodeAu !== undefined) {
        $scope.lAnneeperiodeAu = periodeAu.substr(6, 4);
        $scope.leMoisperiodeAu = periodeAu.substr(3, 2);
        $scope.leJourperiodeAu = periodeAu.substr(0, 2);
      }

      switch ($rootScope.maPosition) {
        case "01":
          $scope.RQ_CODERISQUE = "01";
          break;
        case "02":
          $scope.RQ_CODERISQUE = "02";
          break;
        case "03":
          $scope.RQ_CODERISQUE = "03";
          break;
        case "04":
          $scope.RQ_CODERISQUE = "04";
          break;
        case "05":
          $scope.RQ_CODERISQUE = "05";
          break;
        case "06":
          $scope.RQ_CODERISQUE = "06";
          break;
        case "07":
          $scope.RQ_CODERISQUE = "07";
          break;
        case "08":
          $scope.RQ_CODERISQUE = "08";
          break;
        case "09":
          $scope.RQ_CODERISQUE = "09";
          break;
        case "10":
          $scope.RQ_CODERISQUE = "10";
          break;
        case "11":
            $scope.RQ_CODERISQUE = "11";
            break;
        case "12":
           $scope.RQ_CODERISQUE = "12";
         break;
      }

      if (
        periodeDu === "" ||
        periodeDu === undefined ||
        periodeAu === "" ||
        periodeAu === undefined ||
        numDePolice === undefined ||
        numSouscrp === undefined ||
        nomSouscrp === undefined ||
        numCom === undefined ||
        nomCom === undefined  ||
        Exercice === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (Exercice === "" || Exercice === undefined) {
            $("#idExercice").css("background-color", "#FFE9E0");
          }

          if (numDePolice === undefined) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (numSouscrp === undefined) {
            $("#idNumSouscripteur").css("background-color", "#FFE9E0");
          }
          if (nomSouscrp === undefined) {
            $("#idNomSouscripteur").css("background-color", "#FFE9E0");
          }
          if (numCom === undefined) {
            $("#idNumCommercial").css("background-color", "#FFE9E0");
          }
          if (nomCom === undefined) {
            $("#idNomCommercial").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeOperation = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeOperation = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeOperation = "";
      }else if (
        Exercice == "" 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idExercice").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "l'exercice est obligatoire svp !!!";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      $scope.listeContrat = []
      }  else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            RQ_CODERISQUE: $scope.RQ_CODERISQUE,
            EX_EXERCICE: Exercice,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "07",//"03",
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
          .post("/Contrat/ListeContratSansAccessoir/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeOperation = reponse.data;
            $scope.nombreInfoBulle = $scope.listeOperation.length;
            if (
              $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeOperation[0].clsObjetRetour.SL_MESSAGE
              );
            }else{
              setTimeout(function(){
                for (var j = 0; j < $scope.listeOperation.length; j++) {
                  if (
                    $scope.listeOperation[j].CA_CODECONTRATORIGINE == "" || $scope.listeOperation[j].CA_CODECONTRATORIGINE == undefined || 
                    $scope.listeOperation[j].CA_CODECONTRATORIGINE == null
                  ) {
                    $('#idligne' + j).css('background-color', 'white');
                  }else{
                    $('#idligne' + j).css('background-color', 'beige');
                  }
                }
                }, 2000);
            }
          });
      }
    };
    //fin afficher liste individuel accident

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpOpMultirisquePro", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpOpMultirisquePro")
      );
    };

    $scope.redirectionobservation = function (Infos) {
      $scope.recupcont = Infos.CA_CODECONTRAT;
    };

    //debut focus sur le champ
    $scope.desactiverChampRequisListeObservation = function () {
      $(document).ready(function () {
        $("#idObservation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    $scope.saveObservation = function (Observation) {
      $scope.$emit("LOAD");

      $scope.desactiverChampRequisListeObservation();
      if (Observation === "" || Observation === undefined) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (Observation === "" || Observation === undefined) {
            $("#idObservation").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
      } else {
        $scope.objet_envoie = [
          {
            CA_CODECONTRAT: $scope.recupcont,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            DATEJOURNEE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            CA_OBSERVATION: Observation,
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: "13",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
            clsCtcontratgaranties: [],
            clsCtcontratprimes: [],
            clsCtcontratreductions: [],
            clsCtcontratayantdroits: [],
          },
        ];

        $http
          .post("/Contrat/AjoutObservation/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.recupcont = "";
            $scope.listeOperationobservation = reponse.data;
            if (
              $scope.listeOperationobservation[0].clsObjetRetour.SL_RESULTAT ===
              "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeOperationobservation[0].clsObjetRetour.SL_MESSAGE
              );
            } else {
              $rootScope.EnregistrementReussi(
                $scope.listeOperationobservation[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.FormList.Observation = "";
              $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT = "FALSE";
            }
          });
      }
    };
    //fin voir plus

    //debut autre option
    $scope.autreOption = function (collContrat, infoContrat, operationOn) {
      console.log(collContrat);
      console.log(infoContrat);
      localStorage.setItem(
        "CollReglementMultirisquePro",
        JSON.stringify(collContrat)
      );
      localStorage.setItem(
        "vpOpMultirisqueProinfocontrat",
        JSON.stringify(infoContrat)
      );

      $rootScope.ecranCible = operationOn;
    };
    //fin autre option

    //debut annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idNumSouscripteur").css("background-color", "#FFFFFF");
        $("#idNomSouscripteur").css("background-color", "#FFFFFF");
        $("#idNumCommercial").css("background-color", "#FFFFFF");
        $("#idNomCommercial").css("background-color", "#FFFFFF");
        $("#idExercice").css("background-color", "#FFFFFF");
      });
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
    };
    //debut annuler la recherche

    //debut aller a saisie cheque
    $scope.redirectSaisieCheque = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/cheque";
    };
    //fin aller a saisie cheque

    //debut aller a consultation des questionnaires
    $scope.redirectConsultationQuestionnaire = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/consultation-questionnaires";
    };
    //fin aller a consultation des questionnaires

    //debut aller a suivi client
    $scope.redirectSuiviClient = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/suivi-client";
    };
    //fin aller a suivi client

    //debut aller a saisie rdv
    $scope.redirectSaisieRdv = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/saisie-rdv";
    };
    //fin aller a saisie rdv

    //debut aller a relevé client
    $scope.redirectReleveClient = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/releve-client";
    };
    //fin aller a relevé client

    //debut aller a relevé commission
    $scope.redirectReleveCommission = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/releve-commission";
    };
    //fin aller a relevé commission

    //debut aller a relevé compagnie
    $scope.redirectReleveCompagnie = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/releve-compagnie";
    };
    //fin aller a relevé compagnie

    //debut aller a saisie echeancier
    $scope.redirectSaisieEcheancier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/enregistrement/saisie-echeancier";
    };
    //fin aller a saisie echeancier

    //debut aller a consultation de reglement
    $scope.redirectConsultReglement = function () {
      // $rootScope.releveClient = "operation";
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/consultation-reglement";
    };
    //fin aller a consultation de reglement

    //debut aller a suivi dossier
    $scope.redirectSuiviDossier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/suivi-dossier";
    };
    //fin aller a suivi dossier

    //debut aller a ouverture de dossier
    $scope.redirectOuvertureDossier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/ouverture-dossier";
    };
    //fin aller a ouverture de dossier

    //debut aller a transmission de dossier
    $scope.redirectTransmissionDossier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/transmission-dossier";
    };
    //fin aller a transmission de dossier

    //debut aller a validation de dossier
    $scope.redirectValidationDossier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/validation-dossier";
    };
    //fin aller a validation de dossier

    //debut aller a cloture de dossier
    $scope.redirectClotureDossier = function () {
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/cloture-dossier";
    };
    //fin aller a cloture de dossier

    //debut recuper id du contrat a transmettre
    $scope.autreChoix = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuper id du contrat a transmettre

    //debut transmettre le contrat
    $scope.AnnulationValide = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: recupId,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDVALIDATION,
          TYPEOPERATION: "10",
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
          "/AnnulationValidation/ListeAnnulationValidation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeAnnuleValidation = reponse.data;
          if (
            $scope.listeAnnuleValidation[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationReussie(
              $scope.listeAnnuleValidation[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationNonReussie(
              $scope.listeAnnuleValidation[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeAnnuleValidation[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin transmettre le contrat

    //debut les fonctions init
    $scope.initFormListOperation = function (valeur) {
      $rootScope.maPosition = valeur;
    };
    //fin les fonctions init
    //$scope.retour = "",
    //redirectQuestionnaire

    $scope.redirectConsultQuestionnaire = function (idcont) {
      console.log(idcont);
      localStorage.setItem(
        "CollReglementMultirisquePro",
        JSON.stringify(idcont)
      );

      if (idcont.RQ_CODERISQUE == "01") {
        $rootScope.retourQuestionnaire = "mp";
        sessionStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
        $scope.recoisLaCollDuContrat = idcont;
        $scope.recoisLeCodeDuRisque = idcont.RQ_CODERISQUE;
        console.log($scope.recoisLeCodeDuRisque);
        window.location.href =
          "#/assurances/operation/multirisque_professionnel/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "02") {
        $rootScope.retourQuestionnaire = "santephar";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/sante-pharmacien/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "03") {
        $rootScope.retourQuestionnaire = "IndividuelAccident";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/IndividuelAccident/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "04") {
        $rootScope.retourQuestionnaire = "voyage";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/voyage/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "05") {
        $rootScope.retourQuestionnaire = "hab";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/habitat/Operation-consultation-questionnaires";
      }else if (idcont.RQ_CODERISQUE == "12") {
        $rootScope.retourQuestionnaire = "MultirisqueImmeub";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/OperationMultirisqueImmeuble/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "06") {
        $rootScope.retourQuestionnaire = "auto";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/auto/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "07") {
        $rootScope.retourQuestionnaire = "santeAuxiliaire";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/sante-auxiliaire/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "08") {
        $rootScope.retourQuestionnaire = "santeGesa";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/sante-gesa/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "09") {
        $rootScope.retourQuestionnaire = "respoCivile";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/responsabilite-civile/Operation-consultation-questionnaires";
      } else if (idcont.RQ_CODERISQUE == "10") {
        $rootScope.retourQuestionnaire = "transportMarch";
        localStorage.getItem("idcontratvoyage", JSON.stringify(idcont));
        window.location.href =
          "#/assurances/operation/transport-marchandise/Operation-consultation-questionnaires";
      }
    };

    //redirectQuestionnaire

    //CODE POUR LE BOUTON RETOUR
    $scope.retourQuestionnaire = function () {
      if ($rootScope.retourQuestionnaire == "mp") {
        window.location.href =
          "#/assurances/operation/liste/multirisque-professionnel";
      } else if ($rootScope.retourQuestionnaire == "santephar") {
        window.location.href = "#/assurances/operation/liste/sante-pharmacien";
      } else if ($rootScope.retourQuestionnaire == "IndividuelAccident") {
        window.location.href =
          "#/assurances/operation/liste/IndividuelAccident";
      } else if ($rootScope.retourQuestionnaire == "voyage") {
        window.location.href = "#/assurances/operation/liste/voyage";
      } else if ($rootScope.retourQuestionnaire == "hab") {
        window.location.href = "#/assurances/operation/liste/habitat";
      }else if ($rootScope.retourQuestionnaire == "MultirisqueImmeub") {
        window.location.href = "#/assurances/operation/liste/MultirisqueImmeuble";
      } else if ($rootScope.retourQuestionnaire == "auto") {
        window.location.href = "#/assurances/operation/liste/auto";
      } else if ($rootScope.retourQuestionnaire == "santeAuxiliaire") {
        window.location.href = "#/assurances/operation/liste/sante-auxiliaire";
      } else if ($rootScope.retourQuestionnaire == "santeGesa") {
        window.location.href = "#/assurances/operation/liste/sante-gesa";
      } else if ($rootScope.retourQuestionnaire == "respoCivile") {
        window.location.href =
          "#/assurances/operation/liste/responsabilite-civile";
      } else if ($rootScope.retourQuestionnaire == "transportMarch") {
        window.location.href =
          "#/assurances/operation/liste/transport-marchandise";
      }
    };
    //CODE POUR LE BOUTON RETOUR

    //debut liste des intermediaire
    $scope.afficheListeQuestionnaireLiaisonDoc = function (idcode) {
      // $scope.$emit('LOAD');
      $scope.CODECONTRAT = JSON.parse(
        sessionStorage.getItem("idcontratvoyage")
      );
      console.log(idcode);

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_CODECONTRAT: $scope.CODECONTRAT.CA_CODECONTRAT,
          DC_CODEDOCUMENT: idcode,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "QUESTIONNAIRES",
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
        .post("/Questionnaires/LiaisonQuestionnaires/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          // $scope.$emit('UNLOAD');
          $scope.listeQuestionnaireLiaisonDoc = reponse.data;
          console.log($scope.listeQuestionnaireLiaisonDoc);
        });
    };
    //fin liste des intermediaire

    //debut liste des intermediaire
    $scope.afficheListeDocument = function () {
      $scope.CODERISQUE = JSON.parse(sessionStorage.getItem("idcontratvoyage"));
      console.log($scope.CODERISQUE);

      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: $scope.CODERISQUE.RQ_CODERISQUE,
          SL_LIBELLEECRAN: "QUESTIONNAIRES",
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
        .post("/Document/ListeDocument/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDocument = reponse.data;
          console.log($scope.listeDocument);
        });
    };
    //fin liste des intermediaire

    //debut focus sur le champ
    $scope.desactiverChampRequisValider = function () {
      $(document).ready(function () {
        $("#listQuestionnaires_document").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut Liste Questionnaires
    $scope.ValiderQuestionnaires = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisValider();
      if (
        $scope.FormListQuestionnaires.document == "" ||
        $scope.FormListQuestionnaires.document === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormListQuestionnaires.document == "" ||
            $scope.FormListQuestionnaires.document === undefined
          ) {
            $("#listQuestionnaires_document").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $scope.messageErreur = "Veuillez renseigner un document";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.clsCtcontratgaranties = [];
        for (var i = 0; i < $scope.listeQuestionnaireLiaisonDoc.length; i++) {
          for (var j = 0; j < $scope.selectedMore.length; j++) {
            if (
              parseInt($scope.selectedMore[j].QE_CODEQUESTIONNAIRE) ==
              parseInt(
                $scope.listeQuestionnaireLiaisonDoc[i].QE_CODEQUESTIONNAIRE
              )
            ) {
              if ($scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 == "O") {
                $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 = "N";
                break;
              }
              if ($scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 == "N") {
                $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 = "O";
                break;
              }
            }
          }

          $scope.objetGarentie = {
            CA_CODECONTRAT: $rootScope.idcontratvoyage.CA_CODECONTRAT,
            QE_CODEQUESTIONNAIRE: "1",
            DC_CODEDOCUMENT: $scope.FormListQuestionnaires.document,
            CQ_VALEUR1: "",
            CQ_VALEUR2: "",
            TYPEOPERATION: "0",
            SL_LIBELLEECRAN: "QUESTIONNAIRES",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: "",
              OE_Y: "",
              OE_J: "",
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          };
          $scope.objetGarentie.CA_CODECONTRAT =
            $rootScope.idcontratvoyage.CA_CODECONTRAT;
          $scope.objetGarentie.QE_CODEQUESTIONNAIRE =
            $scope.listeQuestionnaireLiaisonDoc[i].QE_CODEQUESTIONNAIRE;
          $scope.objetGarentie.CQ_VALEUR1 =
            $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1;
          $scope.objetGarentie.CQ_VALEUR2 =
            $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR2;
          $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
          $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
          $scope.objetGarentie.clsObjetEnvoi.OE_J =
            $rootScope.DATE_JOURNEE_DE_TRAVAIL;

          $scope.clsCtcontratgaranties.push($scope.objetGarentie);
        }
        $scope.objet_envoie = $scope.clsCtcontratgaranties;

        $http
          .post(
            "/Questionnaires/ValidationQuestionnaires/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.listeQuestionnaires = reponse.data;
            console.log($scope.listeQuestionnaires);
            if (
              $scope.listeQuestionnaires[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.listeQuestionnaires[0].clsObjetRetour.SL_MESSAGE
              );
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi();
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur();
          });
      }
    };
    //Fin Liste Questionnaires

    /*FIN DEV bolaty*/

    $scope.afficheModelListeExercice = function () {
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
        .post("/EditionAssurance/ListeExercice/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesExercice = reponse.data;
          $scope.listeDesExerciceModif = reponse.data;
          if ($scope.listeDesExercice[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.afficheListeMarque();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
            );
            
          }
          console.log($scope.listeDesExercice);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
          );
        
        });
    };

    //calcul de la prime automatiquement
    $scope.calculprimettc = function () {
      $scope.premierclick = "FALSE";
      $scope.valprimettcaffiche = 0;
    
        for (
          var j = 0;
          j < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].RE_CODERESUME ==
              05 &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES = 0;
          }
        }

        for (
          var j = 0;
          j < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].RE_CODERESUME !==
              05 &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES != "" &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES !=
              undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt(
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES
              );
          }
        }
        for (
          var j = 0;
          j < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].RE_CODERESUME ==
              05 &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES =
              $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
    
    };
    // verification de la prime nette et ttc
    $scope.testprime = function () {
      $scope.statutprime = false;
      $scope.statutprimeenregistrement = false;
        $scope.valprimettcenregistrement = 1;
        $scope.valprimenettenregistrement = 1;
        $scope.verifieprime = false;
        for (
          var j = 0;
          j < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].RE_CODERESUME ==
              01 &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].RE_CODERESUME ==
              01 &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenette =
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES;
          }
          if (
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].RE_CODERESUME ==
              05 &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].RE_CODERESUME ==
              05 &&
            $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettc =
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES;
          }
        }
      
    };
    $scope.testgrille = function () {
     
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
        let typenumerique = /^[0-9]+$/;

      
       
        $scope.verifieprime = false;
        for (
          var j = 0;
          j < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
          j++
        ) {
          if (
            typenumerique.test(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[j].CG_PRIMES
            ) == false
          ) {
            $scope.verifieprime = true;
            break;
          }
        }
     
    };
   
    $scope.recupval= function (info) {
      $scope.FormAddModif.Marque = ""
       var valInfo = info
       $scope.FormAddModif.Marque = info
    }
    $scope.initFormAddInfoAuto = function () {
      if($scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length <= 1){
        $scope.tableauPrimes()
      }
      if ($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "06") {
        $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        $scope.FormAddModif.Immatriculation =
        $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
        $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        $scope.FormAddModif.Codeassureur = $scope.listeContratAvecAccessoir[0].AS_NUMEROASSUREUR;
        $scope.FormAddModif.Marque = $scope.listeContratAvecAccessoir[0].TVH_CODETYPE;
         $scope.statutform = '2'
      }else{
        $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        $scope.FormAddModif.Codeassureur = $scope.listeContratAvecAccessoir[0].AS_NUMEROASSUREUR;
        $scope.statutform = '2'
      }
    }
    $scope.tableauPrimes = function () {
      $scope.$emit("UNLOAD");
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: $scope.listeContratAvecAccessoir[0].RQ_CODERISQUE,
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
        .post("/Primes/ListePrimes/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeContratAvecAccessoir[0].clsCtcontratprimes = reponse.data;
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          
        });
    };

    //debut afficher liste multirisque pro
    $scope.afficheListeContratAvecAccessoir = function (
      idContrat,
      date,
      risque,
      Exercice
    
    ) {
      $scope.$emit("LOAD");
    
        $scope.Chargementinfo = "Chargement des informations en cour...";
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: risque,
            CA_CODECONTRAT: idContrat,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            TI_NUMTIERSCOMMERCIAL: "",
            TI_DENOMINATIONCOMMERCIAL: "",
            DATEDEBUT: date,//"01-01-1900",
            EX_EXERCICE: Exercice,
            DATEFIN: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "07",//"03",
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
            //.post("/Contrat/ListeContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContratAvecAccessoir = reponse.data.reverse();
          // $scope.nombreInfoBulle = $scope.listeContratAvecAccessoir.length;
            if ($scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $scope.Chargementinfo =   "veuillez reessayez svp !!!"
              $rootScope.MessageDesListes(
                "veuillez reessayez svp !!!"
                //$scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_MESSAGE
              );
            }else{
            //  $scope.recupererinfoauto = $scope.listeContratAvecAccessoir
             // $scope.listeContratAvecAccessoir = $scope.listeContratAvecAccessoir[0]
              $scope.initFormAddInfoAuto()
            }
          });
    
    };
    //fin afficher liste multirisque pro
    $scope.confirmerChampsGrillePrime = function (grille) {
      $scope.verifie = false;
      let typeNumerique = /^\d+$/;

      if (grille == undefined) {
        $scope.verifie = false;
        return $scope.verifie;
      } else {
        for (var j = 0; j < grille.length; j++) {
          if (typeNumerique.test(grille[j].CG_PRIMES) == false) {
            $scope.verifie = true;
            break;
          }
        }

        return $scope.verifie;
      }
    };

    $scope.ajoutFormAddAuto = function () {
      $scope.$emit("LOAD");

      if($scope.FormAddModif.Codeassureur == undefined || $scope.FormAddModif.Codeassureur == null || $scope.FormAddModif.Codeassureur == ""){
        $scope.FormAddModif.Codeassureur = $scope.listeContratAvecAccessoir[0].AS_NUMEROASSUREUR;
      }

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "06"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
          $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
        if($scope.FormAddModif.Marque == undefined || $scope.FormAddModif.Marque == null || $scope.FormAddModif.Marque == ""){
          $scope.FormAddModif.Marque = $scope.listeContratAvecAccessoir[0].TVH_CODETYPE;
        }
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
          IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          AP_CODETYPEAPPARTEMENT: "",
          OC_CODETYPEOCCUPANT: "",
          ZM_CODEZONEMALADIE: "",
          ZA_CODEZONEAUTO: $scope.listeContratAvecAccessoir[0].ZA_CODEZONEAUTO,
          CB_IDBRANCHE: $scope.listeContratAvecAccessoir[0].CB_IDBRANCHE,
          CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
          CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_AVENANT: "",
          CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
          CA_CONDITIONHABITUEL: $scope.listeContratAvecAccessoir[0].CA_CONDITIONHABITUEL,
          ST_CODESTATUTSOCIOPROF: $scope.listeContratAvecAccessoir[0].ST_CODESTATUTSOCIOPROF,
          DU_CODEDUREE: "1",
          AU_CODECATEGORIE: $scope.listeContratAvecAccessoir[0].AU_CODECATEGORIE,
          TA_CODETARIF: $scope.listeContratAvecAccessoir[0].TA_CODETARIF,
          US_CODEUSAGE: $scope.listeContratAvecAccessoir[0].US_CODEUSAGE,
          GE_CODEGENRE: $scope.listeContratAvecAccessoir[0].GE_CODEGENRE,
          TVH_CODETYPE:  $scope.FormAddModif.Marque,//$scope.listeContratAvecAccessoir[0].TVH_CODETYPE,
          EN_CODEENERGIE: $scope.listeContratAvecAccessoir[0].EN_CODEENERGIE,
          CA_TAUX: $scope.listeContratAvecAccessoir[0].CA_TAUX,
          CA_TYPE: $scope.listeContratAvecAccessoir[0].CA_TYPE,
          CA_NUMSERIE: $scope.listeContratAvecAccessoir[0].CA_NUMSERIE,
          CA_IMMATRICULATION: $scope.FormAddModif.Immatriculation,
          CA_PUISSANCEADMISE: $scope.listeContratAvecAccessoir[0].CA_PUISSANCEADMISE,
          CA_CHARGEUTILE: $scope.listeContratAvecAccessoir[0].CA_CHARGEUTILE,
          CA_NBREPLACE: $scope.listeContratAvecAccessoir[0].CA_NBREPLACE,
          CA_VALNEUVE: $scope.listeContratAvecAccessoir[0].CA_VALNEUVE,
          CA_VALVENALE: $scope.listeContratAvecAccessoir[0].CA_VALVENALE,
          CA_DATEMISECIRCULATION: $scope.listeContratAvecAccessoir[0].CA_DATEMISECIRCULATION,
          CA_CLIENTEXONERETAXE: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
          CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          DI_CODEDESIGNATION: "01",
          TA_CODETYPECONTRATSANTE: "",
          CA_CODECONTRATSECONDAIRE: "",
          CD_CODECONDITION: $scope.listeContratAvecAccessoir[0].CD_CODECONDITION,
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
          RQ_CODERISQUE: "06",
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
          AU_CODETYPECONTRATAUTO: $scope.listeContratAvecAccessoir[0].AU_CODETYPECONTRATAUTO,
          MF_CODEMAINFORTE: "",
          ZM_CODEZONEVOYAGE: "",
          CT_NOMBREPIECE: "12",
          CT_SUPERFICIE: "22",
          CT_LOYERMENSUEL: "450000",
          CA_DATENAISSANCE: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          PF_CODEPROFESSION: "0001",
          CA_LIEUNAISSANCE: "BFLE",
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "ECRAN AUTO",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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
        
       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "08"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
            CA_CODECONTRAT: $scope.CA_CODECONTRAT,
            AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            RQ_CODERISQUE: "08",
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CA_NUMPOLICE: $scope.FormAddModif.N_Police,
            TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
            CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
            CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
            CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
            CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
            CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
            IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
            CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
            TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
            TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
            TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
            CA_DATENAISSANCE: "01-01-1900",
            CA_TAUX: "0",
            CA_NUMSERIE: "1000",
            CA_IMMATRICULATION: "IMMAT",
            CA_PUISSANCEADMISE: "0",
            CA_CHARGEUTILE: "0",
            CA_NBREPLACE: "0",
            CA_VALNEUVE: "0",
            CA_VALVENALE: "0",
            CA_DATEMISECIRCULATION: "01-01-1900",
            CA_CLIENTEXONERETAXE: "N",
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
            //"ZM_CODEZONEMALADIE": $scope.listeContratAvecAccessoir[0].zone,
            EX_EXERCICE: $scope.FormAddModif.Exercice,
            SL_LIBELLEECRAN: "SANTE GESA",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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
        
       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "05"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
            

          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "05",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
          CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
          CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
          CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
          CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          AP_CODETYPEAPPARTEMENT: $scope.listeContratAvecAccessoir[0].AP_CODETYPEAPPARTEMENT,
          OC_CODETYPEOCCUPANT: $scope.listeContratAvecAccessoir[0].OC_CODETYPEOCCUPANT,
          CA_NOMBREPIECE: $scope.listeContratAvecAccessoir[0].CA_NOMBREPIECE,
          CA_SUPERFICIE: $scope.listeContratAvecAccessoir[0].CA_SUPERFICIE,
          CA_LOYERMENSUEL: $scope.listeContratAvecAccessoir[0].CA_LOYERMENSUEL,
          CA_DATENAISSANCE: "01-01-1900",
          CA_TAUX: "0",
          CA_NUMSERIE: "1000",
          CA_IMMATRICULATION: "IMMAT",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "HABITAT",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "12"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
            

          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "12",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
          CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
          CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
          CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
          CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          AP_CODETYPEAPPARTEMENT: $scope.listeContratAvecAccessoir[0].AP_CODETYPEAPPARTEMENT,
          OC_CODETYPEOCCUPANT: $scope.listeContratAvecAccessoir[0].OC_CODETYPEOCCUPANT,
          CA_NOMBREPIECE: $scope.listeContratAvecAccessoir[0].CA_NOMBREPIECE,
          CA_SUPERFICIE: $scope.listeContratAvecAccessoir[0].CA_SUPERFICIE,
          CA_LOYERMENSUEL: $scope.listeContratAvecAccessoir[0].CA_LOYERMENSUEL,
          CA_DATENAISSANCE: "01-01-1900",
          CA_TAUX: "0",
          CA_NUMSERIE: "1000",
          CA_IMMATRICULATION: "IMMAT",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "MULTIRISQUE IMMEUBLE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "03"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
            
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "03",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          IT_CODEINTERMEDIAIRE:
            $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          TI_IDTIERSASSUREUR:
            $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
          CA_SITUATIONGEOGRAPHIQUE:
            $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
            CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
            CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_DATENAISSANCE:
            $scope.listeContratAvecAccessoir[0].CA_DATENAISSANCE,
          CA_NOMINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
          CA_CONTACTINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          TI_IDTIERSCOMMERCIAL:
            $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
          TA_CODETYPEAFFAIRES:
            $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
          CA_LIEUNAISSANCE:
            $scope.listeContratAvecAccessoir[0].CA_LIEUNAISSANCE,
          MF_CODEMAINFORTE:
            $scope.listeContratAvecAccessoir[0].MF_CODEMAINFORTE,
          PF_CODEPROFESSION:
            $scope.listeContratAvecAccessoir[0].PF_CODEPROFESSION,
          CA_NBREPLACE:
            $scope.listeContratAvecAccessoir[0].CA_NBREPLACE,
          AC_SPORT: $scope.listeContratAvecAccessoir[0].AC_SPORT,
          CA_DUREEENMOIS: "",
          CA_ADRESSE: "",
          CA_AVENANT: "0",
          CA_NUMSERIE: "1000",
          CA_TAUX: "0",
          CA_IMMATRICULATION: "",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          CA_DATEVALIDATIONCONTRAASS: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE:  $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
            ,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "01"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
            
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "01",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
          CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
          CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
          CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_DATENAISSANCE: "01-01-1900",
          CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
          CA_CONTACTINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          DI_CODEDESIGNATION: $scope.listeContratAvecAccessoir[0].DI_CODEDESIGNATION,
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          CA_TAUX: "0",
          CA_NUMSERIE: "1000",
          CA_IMMATRICULATION: "",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE:  $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
            ,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
         
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "09"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
            
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "09",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          IT_CODEINTERMEDIAIRE:
            $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          EN_CODEENERGIE: "",
          CB_IDBRANCHE: "",
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          ZM_CODEZONEVOYAGE: "",
          TA_CODETARIF: "",
          US_CODEUSAGE: "",
          GE_CODEGENRE: "",
          AU_CODECATEGORIE: "",
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR, //"100000000005",
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE, //"0000000013",
          CA_SITUATIONGEOGRAPHIQUE:
            $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
            CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
            CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_NOMINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR, //"blisse",
          CA_CONTACTINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES, //"01",
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL, //"100000000002",
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS, //"100000000007",
          TI_ADRESSEGEOGRAPHIQUE: "",
          CA_TAUX: "0",
          TVH_CODETYPE: "",
          CA_NUMSERIE: "1000",
          CA_IMMATRICULATION: "IMMAT",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_TYPE: "",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          DU_CODEDUREE: "",
          CA_CONDITIONHABITUEL: "",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATENAISSANCE: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          CD_CODECONDITION: "",
          CA_DUREEENMOIS: "0",
          AC_SPORT: "",
          CA_ADRESSE: "",
          ST_CODESTATUTSOCIOPROF: "",
          ZA_CODEZONEAUTO: "",
          GR_CODEGARENTIEPRIME:
            $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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
      
       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "07"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_DATENAISSANCE: "01-01-1900",
          RQ_CODERISQUE: "07",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_NUMPOLICE:  $scope.FormAddModif.N_Police, //"4412012Q1",
          IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE, //"00001",
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR, //"100000000005",
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE, //"0000000013",
          CA_SITUATIONGEOGRAPHIQUE:
            $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE, //"RAS",
            CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
            CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR, //"blisse",
          CA_CONTACTINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR, //"",
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES, //"01",
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL, //"100000000002",
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS, //"100000000007",
          CA_DUREEENMOIS: "0",
          CB_IDBRANCHE: $scope.listeContratAvecAccessoir[0].CB_IDBRANCHE,
          CA_TAUX: "0",
          CA_NUMSERIE: "1000",
          CA_IMMATRICULATION: "IMMAT",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
         
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "02"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "02",
          CA_DATENAISSANCE: "01-01-1900",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
          CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
          CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
          CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
          CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
          CB_IDBRANCHE: $scope.listeContratAvecAccessoir[0].CB_IDBRANCHE,
          CA_ADRESSE: $scope.listeContratAvecAccessoir[0].CA_ADRESSE,
          CA_DUREEENMOIS: $scope.listeContratAvecAccessoir[0].CA_DUREEENMOIS,
          CA_TAUX: "0",
          CA_NUMSERIE: "",
          CA_IMMATRICULATION: "",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
         
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "11"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "11",
          CA_DATENAISSANCE: "01-01-1900",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
          CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
          CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
          CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
          CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
          CB_IDBRANCHE: $scope.listeContratAvecAccessoir[0].CB_IDBRANCHE,
          CA_ADRESSE: $scope.listeContratAvecAccessoir[0].CA_ADRESSE,
          CA_DUREEENMOIS: $scope.listeContratAvecAccessoir[0].CA_DUREEENMOIS,
          CA_TAUX: "0",
          CA_NUMSERIE: "",
          CA_IMMATRICULATION: "",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: "N",
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
         
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "10"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          RQ_CODERISQUE: "10",
          CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          IT_CODEINTERMEDIAIRE:
            $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
          EN_CODEENERGIE: "",
          CB_IDBRANCHE: "",
          CA_NUMPOLICE: $scope.FormAddModif.N_Police,
          TA_CODETARIF: "",
          US_CODEUSAGE: "",
          GE_CODEGENRE: "",
          AU_CODECATEGORIE: "",
          TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR, //"100000000005",
          CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE, //"0000000013",
          CA_SITUATIONGEOGRAPHIQUE:
            $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE, //"RAS",
            CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
            CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
          CA_NOMINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR, //"blisse",
          CA_CONTACTINTERLOCUTEUR:
            $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
          TA_CODETYPEAFFAIRES:
            $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES, //"01",
          TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL, //"100000000002",
          TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS, //"100000000007",
          CA_TAUX: "0",
          TVH_CODETYPE: "",
          CA_NUMSERIE: "1000",
          CA_IMMATRICULATION: "IMMAT",
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_TYPE: "",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          DU_CODEDUREE: "",
          CA_CONDITIONHABITUEL: "",
          CA_DATEMISECIRCULATION: "01-01-1900",
          CA_CLIENTEXONERETAXE: $scope.listeContratAvecAccessoir[0].CA_CLIENTEXONERETAXE, //$scope.listeContratAvecAccessoir[0].btntaxe,
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          CD_CODECONDITION: "",
          ST_CODESTATUTSOCIOPROF: "",
          CA_DATENAISSANCE: "01-01-1900",
          GR_CODEGARENTIEPRIME:
            $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
          EX_EXERCICE: $scope.FormAddModif.Exercice,
          ZA_CODEZONEAUTO: $scope.listeContratAvecAccessoir[0].ZA_CODEZONEAUTO,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
           ,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
         
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();;
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

       if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "04"){
        $scope.TYPEOPERATION = "15";
        $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
        $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
          $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
        }
        if($scope.FormAddModif.Effet == undefined || $scope.FormAddModif.Effet == null || $scope.FormAddModif.Effet == ""){
          $scope.FormAddModif.Effet = $scope.listeContratAvecAccessoir[0].CA_DATEEFFET;
        }
        if($scope.FormAddModif.Echeance == undefined || $scope.FormAddModif.Echeance == null || $scope.FormAddModif.Echeance == ""){
          $scope.FormAddModif.Echeance = $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE;
        }
        if($scope.FormAddModif.Exercice == undefined || $scope.FormAddModif.Exercice == null || $scope.FormAddModif.Exercice == ""){
          $scope.FormAddModif.Exercice = $scope.listeContratAvecAccessoir[0].EX_EXERCICE;
        }
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.CA_CODECONTRAT,
          AS_NUMEROASSUREUR:  $scope.FormAddModif.Codeassureur,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_OPERATEUR,
            CA_NUMPOLICE: $scope.FormAddModif.N_Police,
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
            IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
            AP_CODETYPEAPPARTEMENT: "",
            OC_CODETYPEOCCUPANT: "",
            ZM_CODEZONEMALADIE: "",
            ZA_CODEZONEAUTO: "",
            ZM_CODEZONEVOYAGE: $scope.listeContratAvecAccessoir[0].ZM_CODEZONEVOYAGE,
            CB_IDBRANCHE: "",
            CA_DATEEFFET: $scope.FormAddModif.Effet,//$scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
            CA_DATEECHEANCE: $scope.FormAddModif.Echeance,//$scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CA_AVENANT: "",
            CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
            CA_CONDITIONHABITUEL: "",
            ST_CODESTATUTSOCIOPROF: "",
            //"DU_CODEDUREE": $scope.listeContratAvecAccessoir[0].duree,
            AU_CODECATEGORIE: "",
            //"TA_CODETARIF": $scope.listeContratAvecAccessoir[0].typeDeTarification,
            US_CODEUSAGE: "",
            GE_CODEGENRE: "",
            TVH_CODETYPE: "",
            EN_CODEENERGIE: "",
            CA_TAUX: "0",
            CA_TYPE: "",
            CA_NUMSERIE: "1000",
            CA_IMMATRICULATION: "IMMAT",
            CA_PUISSANCEADMISE: "0",
            CA_CHARGEUTILE: "0",
            CA_NBREPLACE: "0",
            CA_VALNEUVE: "0",
            CA_VALVENALE: "0",
            CA_DATEMISECIRCULATION: "01-01-1900",
            CA_DATENAISSANCE: "01-01-1900",
            CA_CLIENTEXONERETAXE: "N",
            TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
            TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
            CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
            DI_CODEDESIGNATION: "01",
            TA_CODETYPECONTRATSANTE: "",
            CA_CODECONTRATSECONDAIRE: "",
            CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
            RQ_CODERISQUE: "04",
            TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
            CA_NUMPASSEPORT: $scope.listeContratAvecAccessoir[0].CA_NUMPASSEPORT,
            PY_CODEPAYSDESTINATION: $scope.listeContratAvecAccessoir[0].PY_CODEPAYSDESTINATION,
            CA_DUREESEJOUR: $scope.listeContratAvecAccessoir[0].CA_DUREESEJOUR,
            CA_OPTION: $scope.listeContratAvecAccessoir[0].CA_OPTION,
            GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
            EX_EXERCICE: $scope.FormAddModif.Exercice,
          SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
          TYPEOPERATION: $scope.TYPEOPERATION,
          LG_CODELANGUE: "fr",
          DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
           ,
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
          clsCtcontratgaranties: [],
          clsCtcontratprimes: [],
          clsCtcontratreductions: [],
        },
      ];

      $http
        .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("LOAD");
          $scope.testEnregistrement = reponse.data.reverse();
          if (
            $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            $('#modalModification').modal('hide');
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

   
    $scope.ajoutFormAddAutoPrime = function () {
      $scope.$emit("LOAD");
     
     // if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "06"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "ECRAN AUTO",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "0";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           
          $scope.objet_envoie = [
            {
              
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              "MS_NUMPIECE": $scope.listeContratAvecAccessoir[0].MS_NUMPIECE,
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              SL_LIBELLEECRAN: "MODIFICATION DE PRIME",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratprimes: $scope.clsCtcontratprimes
            },
          ];
  
          $http
            .post("/Contrat/MODIFICATIONPRIME/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
                $('#modalModificationprime').modal('hide');
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
     // }

     

     
    };

    $scope.ajoutFormAddAutoPrimeold = function () {
      $scope.$emit("LOAD");
     
      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "06"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "ECRAN AUTO",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              "MS_NUMPIECE": $scope.listeContratAvecAccessoir[0].MS_NUMPIECE,
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_NUMPOLICE:$scope.listeContratAvecAccessoir[0].CA_NUMPOLICE,
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
              IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              AP_CODETYPEAPPARTEMENT: "",
              OC_CODETYPEOCCUPANT: "",
              ZM_CODEZONEMALADIE: "",
              ZA_CODEZONEAUTO: $scope.listeContratAvecAccessoir[0].ZA_CODEZONEAUTO,
              CB_IDBRANCHE: $scope.listeContratAvecAccessoir[0].CB_IDBRANCHE,
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_AVENANT: "",
              CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
              CA_CONDITIONHABITUEL: $scope.listeContratAvecAccessoir[0].CA_CONDITIONHABITUEL,
              ST_CODESTATUTSOCIOPROF: $scope.listeContratAvecAccessoir[0].ST_CODESTATUTSOCIOPROF,
              DU_CODEDUREE: "1",
              AU_CODECATEGORIE: $scope.listeContratAvecAccessoir[0].AU_CODECATEGORIE,
              TA_CODETARIF: $scope.listeContratAvecAccessoir[0].TA_CODETARIF,
              US_CODEUSAGE: $scope.listeContratAvecAccessoir[0].US_CODEUSAGE,
              GE_CODEGENRE: $scope.listeContratAvecAccessoir[0].GE_CODEGENRE,
              TVH_CODETYPE: $scope.listeContratAvecAccessoir[0].TVH_CODETYPE,
              EN_CODEENERGIE: $scope.listeContratAvecAccessoir[0].EN_CODEENERGIE,
              CA_TAUX: $scope.listeContratAvecAccessoir[0].CA_TAUX,
              CA_TYPE: $scope.listeContratAvecAccessoir[0].CA_TYPE,
              CA_NUMSERIE: $scope.listeContratAvecAccessoir[0].CA_NUMSERIE,
              CA_IMMATRICULATION: $scope.FormAddModif.Immatriculation,
              CA_PUISSANCEADMISE: $scope.listeContratAvecAccessoir[0].CA_PUISSANCEADMISE,
              CA_CHARGEUTILE: $scope.listeContratAvecAccessoir[0].CA_CHARGEUTILE,
              CA_NBREPLACE: $scope.listeContratAvecAccessoir[0].CA_NBREPLACE,
              CA_VALNEUVE: $scope.listeContratAvecAccessoir[0].CA_VALNEUVE,
              CA_VALVENALE: $scope.listeContratAvecAccessoir[0].CA_VALVENALE,
              CA_DATEMISECIRCULATION: $scope.listeContratAvecAccessoir[0].CA_DATEMISECIRCULATION,
              CA_CLIENTEXONERETAXE: $scope.listeContratAvecAccessoir[0].CA_CLIENTEXONERETAXE,
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
              CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              DI_CODEDESIGNATION: "01",
              TA_CODETYPECONTRATSANTE: "",
              CA_CODECONTRATSECONDAIRE: "",
              CD_CODECONDITION: $scope.listeContratAvecAccessoir[0].CD_CODECONDITION,
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
              RQ_CODERISQUE: "06",
              TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
              AU_CODETYPECONTRATAUTO: $scope.listeContratAvecAccessoir[0].AU_CODETYPECONTRATAUTO,
              MF_CODEMAINFORTE: "",
              ZM_CODEZONEVOYAGE: "",
              CT_NOMBREPIECE: "12",
              CT_SUPERFICIE: "22",
              CT_LOYERMENSUEL: "450000",
              CA_DATENAISSANCE: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              PF_CODEPROFESSION: "0001",
              CA_LIEUNAISSANCE: "BFLE",
              SL_LIBELLEECRAN: "ECRAN AUTO",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              //clsCtcontratgaranties: $scope.listeContratAvecAccessoir[0].clsCtcontratgaranties,
              clsCtcontratprimes: $scope.clsCtcontratprimes,
             //clsCtcontratreductions: $scope.listeContratAvecAccessoir[0].clsCtcontratreductions,
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "08"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "SANTE GESA",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "08",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE: $scope.FormAddModif.N_Police,
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
              CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
              CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
              IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
              CA_DATENAISSANCE: "01-01-1900",
              CA_TAUX: "0",
              CA_NUMSERIE: "1000",
              CA_IMMATRICULATION: "IMMAT",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              //"ZM_CODEZONEMALADIE": $scope.listeContratAvecAccessoir[0].zone,
              SL_LIBELLEECRAN: "SANTE GESA",
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
            TYPEOPERATION: $scope.TYPEOPERATION,
            LG_CODELANGUE: "fr",
            DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
             // clsCtcontratgaranties: $scope.listeContratAvecAccessoir[0].clsCtcontratgaranties,
             // clsCtcontratprimes: $scope.clsCtcontratprimes,
             // clsCtcontratreductions: $scope.listeContratAvecAccessoir[0].clsCtcontratreductions,
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "05"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "HABITAT",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "05",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE: $scope.FormAddModif.N_Police,
              IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
              CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
              CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
              CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
              AP_CODETYPEAPPARTEMENT: $scope.listeContratAvecAccessoir[0].AP_CODETYPEAPPARTEMENT,
              OC_CODETYPEOCCUPANT: $scope.listeContratAvecAccessoir[0].OC_CODETYPEOCCUPANT,
              CA_NOMBREPIECE: $scope.listeContratAvecAccessoir[0].CA_NOMBREPIECE,
              CA_SUPERFICIE: $scope.listeContratAvecAccessoir[0].CA_SUPERFICIE,
              CA_LOYERMENSUEL: $scope.listeContratAvecAccessoir[0].CA_LOYERMENSUEL,
              CA_DATENAISSANCE: "01-01-1900",
              CA_TAUX: "0",
              CA_NUMSERIE: "1000",
              CA_IMMATRICULATION: "IMMAT",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              SL_LIBELLEECRAN: "HABITAT",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "03"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "INDIVIDUEL ACCIDENT",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "03",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE: $scope.FormAddModif.N_Police,
              IT_CODEINTERMEDIAIRE:
                $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              TI_IDTIERSASSUREUR:
                $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
              CA_SITUATIONGEOGRAPHIQUE:
                $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
              CA_DATEECHEANCE:
                $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
              CA_DATENAISSANCE:
                $scope.listeContratAvecAccessoir[0].CA_DATENAISSANCE,
              CA_NOMINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
              CA_CONTACTINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              TI_IDTIERSCOMMERCIAL:
                $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
              TA_CODETYPEAFFAIRES:
                $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
              CA_LIEUNAISSANCE:
                $scope.listeContratAvecAccessoir[0].CA_LIEUNAISSANCE,
              MF_CODEMAINFORTE:
                $scope.listeContratAvecAccessoir[0].MF_CODEMAINFORTE,
              PF_CODEPROFESSION:
                $scope.listeContratAvecAccessoir[0].PF_CODEPROFESSION,
              CA_NBREPLACE:
                $scope.listeContratAvecAccessoir[0].CA_NBREPLACE,
              AC_SPORT: $scope.listeContratAvecAccessoir[0].AC_SPORT,
              CA_DUREEENMOIS: "",
              CA_ADRESSE: "",
              CA_AVENANT: "0",
              CA_NUMSERIE: "1000",
              CA_TAUX: "0",
              CA_IMMATRICULATION: "",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              CA_DATEVALIDATIONCONTRAASS: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              SL_LIBELLEECRAN: "INDIVIDUEL ACCIDENT",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE:  $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
                ,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "01"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "MULTIRISQUE PROFESSIONNEL",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "01",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE: $scope.FormAddModif.N_Police,
              IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
              CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
              CA_DATENAISSANCE: "01-01-1900",
              CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
              CA_CONTACTINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              DI_CODEDESIGNATION: $scope.listeContratAvecAccessoir[0].DI_CODEDESIGNATION,
              TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
              CA_TAUX: "0",
              CA_NUMSERIE: "1000",
              CA_IMMATRICULATION: "",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              SL_LIBELLEECRAN: "MULTIRISQUE PROFESSIONNEL",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE:  $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
                ,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "09"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "09",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              IT_CODEINTERMEDIAIRE:
                $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              EN_CODEENERGIE: "",
              CB_IDBRANCHE: "",
              CA_NUMPOLICE: $scope.FormAddModif.N_Police,
              ZM_CODEZONEVOYAGE: "",
              TA_CODETARIF: "",
              US_CODEUSAGE: "",
              GE_CODEGENRE: "",
              AU_CODECATEGORIE: "",
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR, //"100000000005",
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE, //"0000000013",
              CA_SITUATIONGEOGRAPHIQUE:
                $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET, //"01-01-2020",
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE, //"31-12-2020",
              CA_NOMINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR, //"blisse",
              CA_CONTACTINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES, //"01",
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL, //"100000000002",
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS, //"100000000007",
              TI_ADRESSEGEOGRAPHIQUE: "",
              CA_TAUX: "0",
              TVH_CODETYPE: "",
              CA_NUMSERIE: "1000",
              CA_IMMATRICULATION: "IMMAT",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
              CA_TYPE: "",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              DU_CODEDUREE: "",
              CA_CONDITIONHABITUEL: "",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATENAISSANCE: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              CD_CODECONDITION: "",
              CA_DUREEENMOIS: "0",
              AC_SPORT: "",
              CA_ADRESSE: "",
              ST_CODESTATUTSOCIOPROF: "",
              ZA_CODEZONEAUTO: "",
              GR_CODEGARENTIEPRIME:
                $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              SL_LIBELLEECRAN: "RESPONSABILITE CIVILE",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "07"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "ASSURANCE SANTE AUXILLIAIRE",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_DATENAISSANCE: "01-01-1900",
              RQ_CODERISQUE: "07",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE:  $scope.FormAddModif.N_Police, //"4412012Q1",
              IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE, //"00001",
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR, //"100000000005",
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE, //"0000000013",
              CA_SITUATIONGEOGRAPHIQUE:
                $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE, //"RAS",
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET, //"01-01-2020",
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE, //"31-12-2020",
              CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR, //"blisse",
              CA_CONTACTINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR, //"",
              TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES, //"01",
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL, //"100000000002",
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS, //"100000000007",
              CA_DUREEENMOIS: "0",
              CB_IDBRANCHE: $scope.listeContratAvecAccessoir[0].CB_IDBRANCHE,
              CA_TAUX: "0",
              CA_NUMSERIE: "1000",
              CA_IMMATRICULATION: "IMMAT",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              SL_LIBELLEECRAN: "ASSURANCE SANTE AUXILLIAIRE",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "02"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "ASSURANCE SANTE PHARMACIEN",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "02",
              CA_DATENAISSANCE: "01-01-1900",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              CA_NUMPOLICE: $scope.FormAddModif.N_Police,
              IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
              CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
              CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
              CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
              CB_IDBRANCHE: $scope.listeContratAvecAccessoir[0].CB_IDBRANCHE,
              CA_ADRESSE: $scope.listeContratAvecAccessoir[0].CA_ADRESSE,
              CA_DUREEENMOIS: $scope.listeContratAvecAccessoir[0].CA_DUREEENMOIS,
              CA_TAUX: "0",
              CA_NUMSERIE: "",
              CA_IMMATRICULATION: "",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: "N",
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "10"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
              CA_CODECONTRAT: $scope.CA_CODECONTRAT,
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              RQ_CODERISQUE: "10",
              CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              IT_CODEINTERMEDIAIRE:
                $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
              EN_CODEENERGIE: "",
              CB_IDBRANCHE: "",
              CA_NUMPOLICE: $scope.FormAddModif.N_Police,
              TA_CODETARIF: "",
              US_CODEUSAGE: "",
              GE_CODEGENRE: "",
              AU_CODECATEGORIE: "",
              TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR, //"100000000005",
              CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE, //"0000000013",
              CA_SITUATIONGEOGRAPHIQUE:
                $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE, //"RAS",
              CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET, //"01-01-2020",
              CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE, // //"31-12-2020",
              CA_NOMINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR, //"blisse",
              CA_CONTACTINTERLOCUTEUR:
                $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
              TA_CODETYPEAFFAIRES:
                $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES, //"01",
              TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL, //"100000000002",
              TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS, //"100000000007",
              CA_TAUX: "0",
              TVH_CODETYPE: "",
              CA_NUMSERIE: "1000",
              CA_IMMATRICULATION: "IMMAT",
              CA_PUISSANCEADMISE: "0",
              CA_CHARGEUTILE: "0",
              CA_NBREPLACE: "0",
              CA_TYPE: "",
              CA_VALNEUVE: "0",
              CA_VALVENALE: "0",
              DU_CODEDUREE: "",
              CA_CONDITIONHABITUEL: "",
              CA_DATEMISECIRCULATION: "01-01-1900",
              CA_CLIENTEXONERETAXE: $scope.listeContratAvecAccessoir[0].CA_CLIENTEXONERETAXE, //$scope.listeContratAvecAccessoir[0].btntaxe,
              CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
              CA_DATEVALIDATIONASSUREUR: "01-01-1900",
              CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
              CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
              CA_DATESUSPENSION: "01-01-1900",
              CA_DATECLOTURE: "01-01-1900",
              CA_DATERESILIATION: "01-01-1900",
              CD_CODECONDITION: "",
              ST_CODESTATUTSOCIOPROF: "",
              CA_DATENAISSANCE: "01-01-1900",
              GR_CODEGARENTIEPRIME:
                $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              ZA_CODEZONEAUTO: $scope.listeContratAvecAccessoir[0].ZA_CODEZONEAUTO,
              SL_LIBELLEECRAN: "TRANSPORT MARCHANDISE",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
              ,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
             
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

      if($scope.listeContratAvecAccessoir[0].RQ_CODERISQUE == "04"){
        $scope.testprime();
        $scope.calculprimettc();
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
        
  
   
          for (
            var i = 0;
            i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
            i++
          ) {
            if (
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES == ""
            ) {
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES = 0;
            }
          }
       
       if ($scope.verifieprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
  
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
         else if ($scope.verifieprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs de la grille prime";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprimeenregistrement == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.statutprime == true) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime ttc ou la prime nette  ne doit etre vide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) == 0 ||
          parseInt($scope.valprimettc) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimettcenregistrement) == 0 ||
          parseInt($scope.valprimenettenregistrement) == 0
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ou la prime ttc ne doivent pas etre nulle";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.valprimenettenregistrement) >
          parseInt($scope.valprimettcenregistrement)
        ) {
          $scope.$emit("UNLOAD");
          $scope.messageErreur =
            "la prime nette ne doit etre superieur a la prime ttc";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          $scope.confirmerChampsGrillePrime($scope.tabPrimes) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
            $scope.confirmerChampsGrillePrime(
              $scope.listeContratAvecAccessoir[0].clsCtcontratprimes
            ) == true
        ) {
          $scope.messageErreur =
            "Veuillez renseigner correctement les champs des grilles";
          $scope.$emit("UNLOAD");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else {
         
            $scope.clsCtcontratprimes = [];
            for (
              var i = 0;
              i < $scope.listeContratAvecAccessoir[0].clsCtcontratprimes.length;
              i++
            ) {
              $scope.objetPrime = {
                AG_CODEAGENCE: "",
                EN_CODEENTREPOT: "",
                CA_CODECONTRAT: "",
                RE_CODERESUME: "",
                CP_VALEUR: "",
                SL_LIBELLEECRAN: "ASSURANCE VOYAGE",
                SL_LIBELLEMOUCHARD: "INSERTIONS",
                TYPEOPERATION: "",
                LG_CODELANGUE: "fr",
                clsObjetEnvoi: {
                  OE_A: "",
                  OE_Y: "",
                  OE_J: "",
                },
              };
              $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
              $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
              $scope.objetPrime.RE_CODERESUME =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].RE_CODERESUME;
              $scope.objetPrime.CA_CODECONTRAT =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CA_CODECONTRAT;
              $scope.objetPrime.CP_VALEUR =
                $scope.listeContratAvecAccessoir[0].clsCtcontratprimes[i].CG_PRIMES;
              $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
              $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
              $scope.objetPrime.clsObjetEnvoi.OE_J =
                $rootScope.DATE_JOURNEE_DE_TRAVAIL;
              $scope.clsCtcontratprimes.push($scope.objetPrime);
            }
            $scope.TYPEOPERATION = "1";
            $scope.CA_CODECONTRAT = $scope.listeContratAvecAccessoir[0].CA_CODECONTRAT;
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
           /* if($scope.FormAddModif.N_Police == undefined || $scope.FormAddModif.N_Police == null || $scope.FormAddModif.N_Police == ""){
              $scope.FormAddModif.N_Police = $scope.listeContratAvecAccessoir[0].CA_NUMPOLICE;
            }
            if($scope.FormAddModif.Immatriculation == undefined || $scope.FormAddModif.Immatriculation == null || $scope.FormAddModif.Immatriculation == ""){
              $scope.FormAddModif.Immatriculation = $scope.listeContratAvecAccessoir[0].CA_IMMATRICULATION;
            }*/
          $scope.objet_envoie = [
            {
                  CA_CODECONTRAT: $scope.CA_CODECONTRAT,
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                EN_CODEENTREPOT: $rootScope.CODE_OPERATEUR,
                CA_NUMPOLICE: $scope.FormAddModif.N_Police,
                CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                TI_IDTIERS: $scope.listeContratAvecAccessoir[0].TI_IDTIERS,
                IT_CODEINTERMEDIAIRE: $scope.listeContratAvecAccessoir[0].IT_CODEINTERMEDIAIRE,
                AP_CODETYPEAPPARTEMENT: "",
                OC_CODETYPEOCCUPANT: "",
                ZM_CODEZONEMALADIE: "",
                ZA_CODEZONEAUTO: "",
                ZM_CODEZONEVOYAGE: $scope.listeContratAvecAccessoir[0].ZM_CODEZONEVOYAGE,
                CB_IDBRANCHE: "",
                CA_DATEEFFET: $scope.listeContratAvecAccessoir[0].CA_DATEEFFET,
                CA_DATEECHEANCE: $scope.listeContratAvecAccessoir[0].CA_DATEECHEANCE,
                OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
                CA_AVENANT: "",
                CA_SITUATIONGEOGRAPHIQUE: $scope.listeContratAvecAccessoir[0].CA_SITUATIONGEOGRAPHIQUE,
                CA_CONDITIONHABITUEL: "",
                ST_CODESTATUTSOCIOPROF: "",
                //"DU_CODEDUREE": $scope.listeContratAvecAccessoir[0].duree,
                AU_CODECATEGORIE: "",
                //"TA_CODETARIF": $scope.listeContratAvecAccessoir[0].typeDeTarification,
                US_CODEUSAGE: "",
                GE_CODEGENRE: "",
                TVH_CODETYPE: "",
                EN_CODEENERGIE: "",
                CA_TAUX: "0",
                CA_TYPE: "",
                CA_NUMSERIE: "1000",
                CA_IMMATRICULATION: "IMMAT",
                CA_PUISSANCEADMISE: "0",
                CA_CHARGEUTILE: "0",
                CA_NBREPLACE: "0",
                CA_VALNEUVE: "0",
                CA_VALVENALE: "0",
                CA_DATEMISECIRCULATION: "01-01-1900",
                CA_DATENAISSANCE: "01-01-1900",
                CA_CLIENTEXONERETAXE: "N",
                TI_IDTIERSCOMMERCIAL: $scope.listeContratAvecAccessoir[0].TI_IDTIERSCOMMERCIAL,
                TI_IDTIERSASSUREUR: $scope.listeContratAvecAccessoir[0].TI_IDTIERSASSUREUR,
                CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
                CA_DATEVALIDATIONASSUREUR: "01-01-1900",
                CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
                CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
                CA_DATESUSPENSION: "01-01-1900",
                CA_DATECLOTURE: "01-01-1900",
                CA_DATERESILIATION: "01-01-1900",
                CA_NOMINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_NOMINTERLOCUTEUR,
                CA_CONTACTINTERLOCUTEUR: $scope.listeContratAvecAccessoir[0].CA_CONTACTINTERLOCUTEUR,
                DI_CODEDESIGNATION: "01",
                TA_CODETYPECONTRATSANTE: "",
                CA_CODECONTRATSECONDAIRE: "",
                CO_CODECOMMUNE: $scope.listeContratAvecAccessoir[0].CO_CODECOMMUNE,
                RQ_CODERISQUE: "04",
                TA_CODETYPEAFFAIRES: $scope.listeContratAvecAccessoir[0].TA_CODETYPEAFFAIRES,
                CA_NUMPASSEPORT: $scope.listeContratAvecAccessoir[0].CA_NUMPASSEPORT,
                PY_CODEPAYSDESTINATION: $scope.listeContratAvecAccessoir[0].PY_CODEPAYSDESTINATION,
                CA_DUREESEJOUR: $scope.listeContratAvecAccessoir[0].CA_DUREESEJOUR,
                CA_OPTION: $scope.listeContratAvecAccessoir[0].CA_OPTION,
                GR_CODEGARENTIEPRIME: $scope.listeContratAvecAccessoir[0].GR_CODEGARENTIEPRIME,
              SL_LIBELLEECRAN: "ASSURANCE VOYAGE",
              SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
              TYPEOPERATION: $scope.TYPEOPERATION,
              LG_CODELANGUE: "fr",
              DE_CODEDEMANADE: $scope.listeContratAvecAccessoir[0].DE_CODEDEMANADE
              ,
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
              clsCtcontratgaranties: [],
              clsCtcontratprimes: $scope.clsCtcontratprimes,
              clsCtcontratreductions: [],
            },
          ];
  
          $http
            .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $('#modalModificationprime').modal('hide');
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
      }

     
    };

    $scope.ExtourneOperation = function () {
      $scope.$emit("LOAD");
          $scope.objet_envoie =  [
                {
                    AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                    "MS_NUMPIECE": $scope.MS_NUMPIECE,
                    "CA_DATESAISIE": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                    "TYPEOPERATION": "0",
                    "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
                    "SL_LIBELLEECRAN": "Saisie de Continent",
                    "SL_LIBELLEMOUCHARD": "INSERTIONS",
                    "LG_CODELANGUE": "fr",
                    "clsObjetEnvoi": {
                      OE_A: $rootScope.CODE_AGENCE,
                      OE_Y: $rootScope.CODE_OPERATEUR,
                      OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL
                    }
                }
            ]
        
       
       /* $http
          .post( $scope.appelServiceWeb +
            "wsPhamouvementStock.svc/pvgAnnulationFactureMaphar", $scope.objet_envoie, {
           
          })*/
          $http
          .post(
            "/Contrat/EXTOURNEOPERATION/", $scope.objet_envoie, {
           
          })
          .then(function (reponse) {
            $scope.RetourExtourne = reponse.data;
            if (
              $scope.RetourExtourne[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.RetourExtourne[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.afficheListeOperation($scope.FormList.periodeDu, $scope.FormList.periodeAu, $scope.FormList.numPolice, $scope.FormList.numSouscripteur, $scope.FormList.nomSouscripteur, $scope.FormList.numCommercial, $scope.FormList.nomCommercial,$scope.FormList.Exercice)
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.RetourExtourne[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.RetourExtourne[0].clsObjetRetour.SL_MESSAGE
            );
          });
     
    };
    $scope.recupNumPiece = function (info) {
      $scope.MS_NUMPIECE = info
    }
  },
]);
