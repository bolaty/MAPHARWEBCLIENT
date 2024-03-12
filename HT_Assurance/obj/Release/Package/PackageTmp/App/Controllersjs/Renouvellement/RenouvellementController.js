MapharApp.controller("RenouvellementController", [
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
    $scope.objet_envoi = [];
    $scope.listeRenouvellement = [];
    $scope.listeDemandeRenouvellement = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.tabDemandeDeRenouvellementContrat = [];
    $scope.recupererLaColl = "";
    $scope.SL_LIBELLEECRAN = "RENOUVELLEMENT CONTRAT";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";

    $scope.retourListe = false;
    $scope.recoisLaCollDuContrat = [];
    $scope.recoisLeCodeDuRisque = "";
    $scope.listeDocument = [];

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

    /*FIN DEV JJ*/

    // ----------------------------------------

    // debut demande de renouvellement
    $scope.demandeDeRenouvellement = function () {
      $scope.$emit("LOAD");
      $scope.recupererLaColl.TYPEOPERATION = "0";
      console.log($scope.recupererLaColl.TYPEOPERATION);
      $scope.recupererLaColl.CA_CODECONTRATORIGINE =
        $scope.recupererLaColl.CA_CODECONTRAT;
      console.log($scope.recupererLaColl.CA_CODECONTRATORIGINE);
      $scope.recupererLaColl.CA_CODECONTRAT = "";
      console.log($scope.recupererLaColl.CA_CODECONTRAT);
      $scope.objet_envoi.push($scope.recupererLaColl);
      console.log($scope.objet_envoi);

      // garantie
    /*  $scope.clsCtcontratgaranties = [];
      for (
        var i = 0;
        i < $scope.recupererLaColl.clsCtcontratgaranties.length;
        i++
      ) {
        $scope.objetGarentie = {
          AG_CODEAGENCE: "",
          EN_CODEENTREPOT: "",
          CA_CODECONTRAT: "",
          GA_CODEGARANTIE: "",
          CG_CAPITAUXASSURES: "",
          CG_PRIMES: "",
          CG_APRESREDUCTION: "",
          CG_PRORATA: "",
          CG_FRANCHISES: "",
          CG_TAUX: "",
          CG_MONTANT: "",
          CG_LIBELLE: "",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
          },
        };
        $scope.objetGarentie.AG_CODEAGENCE =
          $scope.recupererLaColl.clsCtcontratgaranties[i].AG_CODEAGENCE;
        $scope.objetGarentie.EN_CODEENTREPOT =
          $scope.recupererLaColl.clsCtcontratgaranties[i].EN_CODEENTREPOT;*/
        /*  $scope.objetGarentie.CA_CODECONTRAT =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CA_CODECONTRAT; */
    /*    $scope.objetGarentie.GA_CODEGARANTIE =
          $scope.recupererLaColl.clsCtcontratgaranties[i].GA_CODEGARANTIE;
        $scope.objetGarentie.CG_CAPITAUXASSURES =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_CAPITAUXASSURES;
        $scope.objetGarentie.CG_PRIMES =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_PRIMES;
        $scope.objetGarentie.CG_APRESREDUCTION =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_APRESREDUCTION;
        $scope.objetGarentie.CG_PRORATA =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_PRORATA;
        $scope.objetGarentie.CG_FRANCHISES =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_FRANCHISES;
        $scope.objetGarentie.CG_TAUX =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_TAUX;
        $scope.objetGarentie.CG_MONTANT =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_MONTANT;
        $scope.objetGarentie.CG_LIBELLE =
          $scope.recupererLaColl.clsCtcontratgaranties[i].CG_LIBELLE;
        $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetGarentie.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }*/

      // prime
     /* $scope.clsCtcontratprimes = [];
      for (
        var j = 0;
        j < $scope.recupererLaColl.clsCtcontratprimes.length;
        j++
      ) {
        $scope.objetPrime = {
          AG_CODEAGENCE: "",
          EN_CODEENTREPOT: "",
          CA_CODECONTRAT: "",
          RE_CODERESUME: "",
          CP_VALEUR: "",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
          },
        };
        $scope.objetPrime.AG_CODEAGENCE =
          $scope.recupererLaColl.clsCtcontratprimes[j].AG_CODEAGENCE;
        $scope.objetPrime.EN_CODEENTREPOT =
          $scope.recupererLaColl.clsCtcontratprimes[j].EN_CODEENTREPOT;*/
        /*  $scope.objetPrime.CA_CODECONTRAT =
          $scope.recupererLaColl.clsCtcontratprimes[j].CA_CODECONTRAT; */
   /*     $scope.objetPrime.RE_CODERESUME =
          $scope.recupererLaColl.clsCtcontratprimes[j].RE_CODERESUME;
        $scope.objetPrime.CP_VALEUR =
          $scope.recupererLaColl.clsCtcontratprimes[j].CP_VALEUR;
        $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetPrime.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.clsCtcontratprimes.push($scope.objetPrime);
      }*/

      // reduction
     /* $scope.clsCtcontratreduction = [];
      for (
        var k = 0;
        k < $scope.recupererLaColl.clsCtcontratreductions.length;
        k++
      ) {
        $scope.objetReduction = {
          AG_CODEAGENCE: "",
          EN_CODEENTREPOT: "",
          CA_CODECONTRAT: "",
          RD_CODEREDUCTION: "",
          RD_TAUX: "",
          RD_MONTANT: "",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
          },
        };
        $scope.objetReduction.AG_CODEAGENCE =
          $scope.recupererLaColl.clsCtcontratreductions[k].AG_CODEAGENCE;
        $scope.objetReduction.EN_CODEENTREPOT =
          $scope.recupererLaColl.clsCtcontratreductions[k].EN_CODEENTREPOT;*/
        /* $scope.objetReduction.CA_CODECONTRAT =
          $scope.recupererLaColl.clsCtcontratreductions[k].CA_CODECONTRAT; */
    /*    $scope.objetReduction.RD_CODEREDUCTION =
          $scope.recupererLaColl.clsCtcontratreductions[k].RD_CODEREDUCTION;
        $scope.objetReduction.RD_TAUX =
          $scope.recupererLaColl.clsCtcontratreductions[k].RD_TAUX;
        $scope.objetReduction.RD_MONTANT =
          $scope.recupererLaColl.clsCtcontratreductions[k].RD_MONTANT;
        $scope.objetReduction.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetReduction.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetReduction.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.clsCtcontratreduction.push($scope.objetReduction);
      }*/

      // ayant droit
    /*  $scope.clsCtcontratayantdroit = [];
      for (
        var l = 0;
        l < $scope.recupererLaColl.clsCtcontratayantdroits.length;
        l++
      ) {
        $scope.objetAyantDroit = {
          AG_CODEAGENCE: "",
          EN_CODEENTREPOT: "",
          CA_CODECONTRAT: "",
          AY_DENOMMINATIONAYANTDROIT: "",
          AY_DATESAISIE: "",
          AY_INDEX: "",
          AY_DATECLOTURE: "",
          TA_CODETITREAYANTDROIT: "",
          AY_TAUX: "",
          OP_CODEOPERATEUR: "",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
          },
        };
        $scope.objetAyantDroit.AG_CODEAGENCE =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].AG_CODEAGENCE;
        $scope.objetAyantDroit.EN_CODEENTREPOT =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].EN_CODEENTREPOT;*/
        /*  $scope.objetAyantDroit.CA_CODECONTRAT =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].CA_CODECONTRAT; */
       /* $scope.objetAyantDroit.AY_DENOMMINATIONAYANTDROIT =
          $scope.recupererLaColl.clsCtcontratayantdroits[
            l
          ].AY_DENOMMINATIONAYANTDROIT;
        $scope.objetAyantDroit.AY_DATESAISIE =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].AY_DATESAISIE;
        $scope.objetAyantDroit.AY_INDEX =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].AY_INDEX;
        $scope.objetAyantDroit.AY_DATECLOTURE =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].AY_DATECLOTURE;
        $scope.objetAyantDroit.TA_CODETITREAYANTDROIT =
          $scope.recupererLaColl.clsCtcontratayantdroits[
            l
          ].TA_CODETITREAYANTDROIT;
        $scope.objetAyantDroit.AY_TAUX =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].AY_TAUX;
        $scope.objetAyantDroit.OP_CODEOPERATEUR =
          $scope.recupererLaColl.clsCtcontratayantdroits[l].OP_CODEOPERATEUR;
        $scope.objetAyantDroit.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetAyantDroit.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetAyantDroit.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.clsCtcontratayantdroit.push($scope.objetAyantDroit);
      }*/

      // capitaux
      /*$scope.clsCtcontratcapitaux = [];
      for (
        var m = 0;
        m < $scope.recupererLaColl.clsCtcontratcapitauxs.length;
        m++
      ) {
        $scope.objetCapitaux = {
          AG_CODEAGENCE: "",
          EN_CODEENTREPOT: "",
          CA_CODECONTRAT: "",
          CP_CODECAPITAUX: "",
          CC_CAPITAUX: "",
          CC_PRIMES: "",
          CC_TAUX: "",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
          },
        };
        $scope.objetCapitaux.AG_CODEAGENCE =
          $scope.recupererLaColl.clsCtcontratcapitauxs[m].AG_CODEAGENCE;
        $scope.objetCapitaux.EN_CODEENTREPOT =
          $scope.recupererLaColl.clsCtcontratcapitauxs[m].EN_CODEENTREPOT;*/
        /*   $scope.objetCapitaux.CA_CODECONTRAT =
          $scope.recupererLaColl.clsCtcontratcapitauxs[m].CA_CODECONTRAT; */
     /*   $scope.objetCapitaux.CP_CODECAPITAUX =
          $scope.recupererLaColl.clsCtcontratcapitauxs[m].CP_CODECAPITAUX;
        $scope.objetCapitaux.CC_CAPITAUX =
          $scope.recupererLaColl.clsCtcontratcapitauxs[m].CC_CAPITAUX;
        $scope.objetCapitaux.CC_PRIMES =
          $scope.recupererLaColl.clsCtcontratcapitauxs[m].CC_PRIMES;
        $scope.objetCapitaux.CC_TAUX =
          $scope.recupererLaColl.clsCtcontratcapitauxs[m].CC_TAUX;
        $scope.objetCapitaux.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetCapitaux.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetCapitaux.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.clsCtcontratcapitaux.push($scope.objetCapitaux);
      }*/

      $scope.objet_envoie = [
        {
          CA_CODECONTRATORIGINE: $scope.recupererLaColl.CA_CODECONTRATORIGINE,
          AG_CODEAGENCE: $scope.recupererLaColl.AG_CODEAGENCE,
          EN_CODEENTREPOT: $scope.recupererLaColl.EN_CODEENTREPOT,
          OP_CODEOPERATEUR: $scope.recupererLaColl.OP_CODEOPERATEUR,
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATESAISIE: $scope.recupererLaColl.CA_DATESAISIE,
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "14",
          LG_CODELANGUE: "fr",
          /*CA_CODECONTRAT: "",
          AG_CODEAGENCE: $scope.recupererLaColl.AG_CODEAGENCE,
          EN_CODEENTREPOT: $scope.recupererLaColl.EN_CODEENTREPOT,
          CA_NUMPOLICE: $scope.recupererLaColl.CA_NUMPOLICE,
          CA_DATESAISIE: $scope.recupererLaColl.CA_DATESAISIE,
          TI_IDTIERS: $scope.recupererLaColl.TI_IDTIERS,
          IT_CODEINTERMEDIAIRE: $scope.recupererLaColl.IT_CODEINTERMEDIAIRE,
          AP_CODETYPEAPPARTEMENT: $scope.recupererLaColl.AP_CODETYPEAPPARTEMENT,
          OC_CODETYPEOCCUPANT: $scope.recupererLaColl.OC_CODETYPEOCCUPANT,
          ZM_CODEZONEMALADIE: $scope.recupererLaColl.ZM_CODEZONEMALADIE,
          ZA_CODEZONEAUTO: $scope.recupererLaColl.ZA_CODEZONEAUTO,
          CB_IDBRANCHE: $scope.recupererLaColl.CB_IDBRANCHE,
          CA_DATEEFFET: $scope.recupererLaColl.CA_DATEEFFET,
          CA_DATEECHEANCE: $scope.recupererLaColl.CA_DATEECHEANCE,
          OP_CODEOPERATEUR: $scope.recupererLaColl.OP_CODEOPERATEUR,
          CA_AVENANT: "",
          CA_SITUATIONGEOGRAPHIQUE:
            $scope.recupererLaColl.CA_SITUATIONGEOGRAPHIQUE,
          CA_CONDITIONHABITUEL: "",
          ST_CODESTATUTSOCIOPROF: $scope.recupererLaColl.ST_CODESTATUTSOCIOPROF,
          DU_CODEDUREE: $scope.recupererLaColl.DU_CODEDUREE,
          AU_CODECATEGORIE: $scope.recupererLaColl.AU_CODECATEGORIE,
          TA_CODETARIF: $scope.recupererLaColl.TA_CODETARIF,
          US_CODEUSAGE: $scope.recupererLaColl.US_CODEUSAGE,
          GE_CODEGENRE: $scope.recupererLaColl.GE_CODEGENRE,
          TVH_CODETYPE: $scope.recupererLaColl.TVH_CODETYPE,
          EN_CODEENERGIE: $scope.recupererLaColl.EN_CODEENERGIE,
          CA_TAUX: $scope.recupererLaColl.CA_TAUX,
          CA_TYPE: "",
          CA_NUMSERIE: $scope.recupererLaColl.CA_NUMSERIE,
          CA_IMMATRICULATION: $scope.recupererLaColl.CA_IMMATRICULATION,
          CA_PUISSANCEADMISE: "0",
          CA_CHARGEUTILE: "0",
          CA_NBREPLACE: "0",
          CA_VALNEUVE: "0",
          CA_VALVENALE: "0",
          CA_DATEMISECIRCULATION: $scope.recupererLaColl.CA_DATEMISECIRCULATION,
          CA_CLIENTEXONERETAXE: $scope.recupererLaColl.CA_CLIENTEXONERETAXE,
          TI_IDTIERSCOMMERCIAL: $scope.recupererLaColl.TI_IDTIERSCOMMERCIAL,
          TI_IDTIERSASSUREUR: $scope.recupererLaColl.TI_IDTIERSASSUREUR,
          CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",

          CA_DATEDEMANDERENOUVELEMENT: "01-01-1900",
          CA_DATEVALIDATIONCONTRAASS: "01-01-1900",
          DATEDEBUT: "01-01-1900",
          DATEFIN: "01-01-1900",
          DATEJOURNEE: "01-01-1900",
          DATEPREMIEREEXECUTION: "01-01-1900",

          CA_DATEVALIDATIONASSUREUR: "01-01-1900",
          CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
          CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
          CA_DATESUSPENSION: "01-01-1900",
          CA_DATECLOTURE: "01-01-1900",
          CA_DATERESILIATION: "01-01-1900",
          CA_NOMINTERLOCUTEUR: "",
          CA_CONTACTINTERLOCUTEUR: "",
          DI_CODEDESIGNATION: $scope.recupererLaColl.DI_CODEDESIGNATION,
          TA_CODETYPECONTRATSANTE: "",
          CA_CODECONTRATSECONDAIRE: "",
          CO_CODECOMMUNE: $scope.recupererLaColl.CO_CODECOMMUNE,
          RQ_CODERISQUE: $scope.recupererLaColl.RQ_CODERISQUE,
          TA_CODETYPEAFFAIRES: $scope.recupererLaColl.TA_CODETYPEAFFAIRES,
          MF_CODEMAINFORTE: "",
          ZM_CODEZONEVOYAGE: "",
          CT_NOMBREPIECE: $scope.recupererLaColl.CT_NOMBREPIECE,
          CT_SUPERFICIE: $scope.recupererLaColl.CT_SUPERFICIE,
          CT_LOYERMENSUEL: $scope.recupererLaColl.CT_LOYERMENSUEL,
          CA_DATENAISSANCE: "01-01-1900",
          PF_CODEPROFESSION: $scope.recupererLaColl.PF_CODEPROFESSION,
          CA_LIEUNAISSANCE: $scope.recupererLaColl.CA_LIEUNAISSANCE,
          CD_CODECONDITION: $scope.recupererLaColl.CD_CODECONDITION,
          CA_DUREEENMOIS: $scope.recupererLaColl.CA_DUREEENMOIS,
          AC_SPORT: $scope.recupererLaColl.AC_SPORT,
          CA_ADRESSE: $scope.recupererLaColl.CA_ADRESSE,
          CA_NUMPASSEPORT: $scope.recupererLaColl.CA_NUMPASSEPORT,
          PY_CODEPAYSDESTINATION: "0001",
          CA_DUREESEJOUR: "0",
          CA_OPTION: "TRRR",
          CA_CODECONTRATORIGINE: $scope.recupererLaColl.CA_CODECONTRATORIGINE,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "14",
          LG_CODELANGUE: "fr",*/
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
          clsCtcontratcapitauxs: [],
         /* clsCtcontratgaranties: $scope.clsCtcontratgaranties,
          clsCtcontratprimes: $scope.clsCtcontratprimes,
          clsCtcontratreductions: $scope.clsCtcontratreduction,
          clsCtcontratayantdroits: $scope.clsCtcontratayantdroit,
          clsCtcontratcapitauxs: $scope.clsCtcontratcapitaux,*/
        },
      ];
      console.log($scope.objet_envoie);

      $http
        .post("/Contrat/AjoutContratrenouvellement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabDemandeDeRenouvellementContrat = reponse.data;
          if (
            $scope.tabDemandeDeRenouvellementContrat[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tabDemandeDeRenouvellementContrat[0].clsObjetRetour
                .SL_MESSAGE
            );
            setTimeout(()=>{
              window.location.reload()
            },2000)
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tabDemandeDeRenouvellementContrat[0].clsObjetRetour
                .SL_MESSAGE
            );
            setTimeout(()=>{
              window.location.reload()
            },2000)
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabDemandeDeRenouvellementContrat[0].clsObjetRetour
              .SL_MESSAGE
          );
          setTimeout(()=>{
            window.location.reload()
          },2000)
        });
    };
    // fin demande de renouvellement

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("renouvellementColl", JSON.stringify(info));
      $scope.recupererLaColl = JSON.parse(
        sessionStorage.getItem("renouvellementColl")
      );
      console.log($scope.recupererLaColl);
    };
    //fin voir plus

    //debut voir plus demande
    $scope.voirPlusDemande = function (info) {
      sessionStorage.setItem("renouvellementColl", JSON.stringify(info));
      $scope.recupererLaColl = JSON.parse(
        sessionStorage.getItem("renouvellementColl")
      );
      console.log($scope.recupererLaColl);
    };
    //fin voir plus demande

    //debut afficher liste renouvellement
    $scope.afficheListeRenouvellement = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
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

      switch ($scope.position) {
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
        $scope.listeRenouvellement = "";
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
        $scope.listeRenouvellement = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeRenouvellement = "";
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
            TYPEOPERATION: "04",
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
            $scope.listeRenouvellement = reponse.data;
            if (
              $scope.listeRenouvellement[0].clsObjetRetour.SL_RESULTAT ===
              "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeRenouvellement[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste renouvellement

    //debut afficher liste demande de renouvellement
    $scope.afficheListeDemandeRenouvellement = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
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

      switch ($scope.position) {
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
        $scope.listeDemandeRenouvellement = "";
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
        $scope.listeDemandeRenouvellement = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeDemandeRenouvellement = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            TI_IDTIERS: "",
            LO_CODELOGICIEL: "",
            CA_STATUT: "",
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            TI_NUMTIERSCOMMERCIAL: "",
            TI_DENOMINATIONCOMMERCIAL: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            RQ_CODERISQUE: $scope.RQ_CODERISQUE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "LISTE DEMANDE DE RENOUVELLEMENT",
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "04",
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
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeDemandeRenouvellement = reponse.data;
            $scope.nombreInfoBulle = $scope.listeDemandeRenouvellement.length;
            console.log($scope.listeDemandeRenouvellement);
            if (
              $scope.listeDemandeRenouvellement[0].clsObjetRetour
                .SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeDemandeRenouvellement[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste demande de renouvellement

    //debut les fonctions init
    $scope.initFormListOperation = function (valeur) {
      localStorage.setItem("positionEcran", JSON.stringify(valeur));
      $scope.position = valeur;
    };
    //fin les fonctions init

    // ----------------------------------------
  },
]);
