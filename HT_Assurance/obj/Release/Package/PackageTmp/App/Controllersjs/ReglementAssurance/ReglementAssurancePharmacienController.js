MapharApp.controller("ReglementAssurancePharmacienController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.FormListReglAssur = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
    };
    $scope.objet_envoie = [];
    $scope.listeOperation = [];
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT INDIVIDUEL ACCIDENT";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";

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

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut afficher liste individuel accident
    $scope.afficheListeReglAssurance = function (
      statut,
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
    ) {
      $scope.$emit("LOAD");
      if (!statut) {
        $scope.$emit("UNLOAD");
        $rootScope.DateNonRenseignes();
        $scope.listeOperation = "";
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
            RQ_CODERISQUE: "02",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "03",
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
            if (
              $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeOperation[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste individuel accident

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpOpIndivAccident", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpOpIndivAccident")
      );
    };
    //fin voir plus

    //debut annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
    };
    //debut annuler la recherche

    //debut aller a relévé Client
    $scope.redirectReleveClient = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/sante-pharmacien/liste/releve-client";
    };
    //fin aller a relévé Client

    //debut aller a relévé Commission Assurance
    $scope.redirectReleveCommissionAssurance = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/sante-pharmacien/liste/releve-commission-assurance";
    };
    //fin aller a relévé Commission Assurance

    //debut aller a Règlement facture client
    $scope.redirectReglementFactureClient = function () {
      $rootScope.retourListe = "santephar";
      window.location.href =
        "#/gestion/ReglementAssurance/sante-pharmacien/liste/reglement-facture-client";
    };
    //fin aller a Règlement facture client

    //debut aller a Règlement Commission Assurance
    $scope.redirectReglementCommissionAssurance = function () {
      $rootScope.retourListe = "santephar";
      window.location.href =
        "#/gestion/ReglementAssurance/sante-pharmacien/liste/reglement-commission-assurance";
    };
    //fin aller a Règlement Commission Assurance

    //debut aller a Règlement Commission COMMERCIAUX
    $scope.redirectReglementCommissionCommerciaux = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/sante-pharmacien/liste/reglement-commission-commerciaux";
    };
    //fin aller a Règlement Commission COMMERCIAUX

    //debut aller a remise chèque sinitre
    $scope.redirectRemiseChequeSinistre = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/sante-pharmacien/liste/remise-cheque-sinitre";
    };
    //fin aller a remise chèque sinitre

    //debut aller afficher règlement chèque
    $scope.redirectAfficherReglementCheque = function () {
      window.location.href =
        "#/gestion/ReglementAssurance/sante-pharmacien/liste/afficher-reglement-cheque";
    };
    //debut annuler la recherche

    /*FIN DEV JJ*/
  },
]);
