MapharApp.controller("RelanceController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
    };
    $scope.objet_envoie = [];
    $scope.listeRelance = [];
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
    $scope.FormListRelance = [];
    $scope.listeAddRelance = [];
    $scope.FormListRelanceTC = {};
    $scope.objetRelance = {};
    $scope.cpt = 0;
    $scope.cptTC = 0;
    $scope.testListe = true;
    $scope.verouBtnRelance = true;
    $scope.trueOrFalse = true;

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

    // DEBUT ECRAN RELANCE

    //debut les fonctions init
    $scope.initFormListRelance = function (valeur) {
      $rootScope.maPosition = valeur;
    };
    //fin les fonctions init

    //debut afficher liste relance
    $scope.afficheListeRelance = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
    ) {
      $scope.$emit("LOAD");

      $scope.testListe = true;
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
        nomCom === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
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
        $scope.listeRelance = "";
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
        $scope.listeRelance = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeRelance = "";
      } else {
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
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "06",
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
            $scope.listeRelance = reponse.data;
            console.log($scope.listeRelance);
            $scope.nombreInfoBulle = $scope.listeRelance.length;
            $scope.testListe = false;
            if ($scope.listeRelance[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeRelance[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste relance

    //debut autre option
    $scope.autreOption = function (collContrat, infoContrat, relanceOn) {
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

      $rootScope.ecranCible = relanceOn;
    };
    //fin autre option

    // debut case a cocher
    $scope.cocheRelanceToutCocher = function (item) {
      if (item == "O") {
        return true;
      } else {
        return false;
      }
    };

    $scope.testValRelanceToutCocher = function () {
      if ($scope.testListe == false) {
        if ($scope.cptTC == 0) {
          $scope.FormListRelanceTC.ToutCocher = "O";
          $scope.cptTC++;
        } else {
          $scope.FormListRelanceTC.ToutCocher = "N";
          $scope.cptTC = 0;
        }

        if ($scope.FormListRelanceTC.ToutCocher == "O") {
          for (var i = 0; i < $scope.listeRelance.length; i++) {
            $scope.FormListRelance[i] = "O";
            $scope.listeRelance[i].CA_OPTION = "O";
            $scope.cocheRelance($scope.FormListRelance[i]);
          }
          $scope.verouBtnRelance = false;
        } else {
          for (var i = 0; i < $scope.listeRelance.length; i++) {
            $scope.FormListRelance[i] = "N";
            $scope.listeRelance[i].CA_OPTION = "";
            $scope.cocheRelance($scope.FormListRelance[i]);
          }
          $scope.verouBtnRelance = true;
        }
        console.log($scope.FormListRelance);
      } else {
        $rootScope.MessageDesListes("Veuillez effectuer une recherche");
      }
    };

    $scope.cocheRelance = function (item) {
      if (item == "O") {
        return true;
      } else {
        return false;
      }
    };

    $scope.testValRelance = function (index) {
      $scope.trueOrFalse = true;
      for (var i = 0; i < $scope.listeRelance.length; i++) {
        if (i == index) {
          if ($scope.listeRelance[i].CA_OPTION == "") {
            $scope.FormListRelance[i] = "O";
            $scope.listeRelance[i].CA_OPTION = "O";
          } else {
            $scope.FormListRelance[i] = "N";
            $scope.listeRelance[i].CA_OPTION = "";
          }
          console.log($scope.FormListRelance);
        }
      }

      for (var i = 0; i < $scope.FormListRelance.length; i++) {
        if ($scope.FormListRelance[i] == "O") {
          $scope.trueOrFalse = false;
        }
      }
      if ($scope.trueOrFalse == false) {
        $scope.verouBtnRelance = false;
      } else {
        $scope.verouBtnRelance = true;
      }
    };
    // fin case a cocher

    // debut relance
    $scope.AjoutRelance = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [];
      for (var index = 0; index < $scope.FormListRelance.length; index++) {
        $scope.objetRelance = {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          SM_DATEPIECE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SM_NUMPIECE: "",
          SM_NUMSEQUENCE: "",
          CO_CODECOMPTE: "",
          SM_MESSAGE: $scope.listeRelance[index].MESSAGERELANCE,
          SM_TELEPHONE: $scope.listeRelance[index].TI_TELEPHONE,
          SM_STATUT: "N",
          SM_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        };
        $scope.objet_envoie.push($scope.objetRelance);
      }

      $http
        .post("/Relance/AjoutRelance/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeAddRelance = reponse.data;
          console.log($scope.listeAddRelance);
          if (
            $scope.listeAddRelance[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeAddRelance[0].clsObjetRetour.SL_MESSAGE
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.listeAddRelance[0].clsObjetRetour.SL_MESSAGE
            );
          }
        });
    };
    // fin relance

    // FIN ECRAN RELANCE

    /*FIN DEV JJ*/
  },
]);
