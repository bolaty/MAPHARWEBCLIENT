MapharApp.controller("ReglementChequeReglerController", [
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
      DateEmission: "",
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
      Exercice: $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE
    };
    $scope.listeDesExercice = [];
    $scope.objet_envoie = [];
    $scope.listeCheques = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT MULTIRISQUE PROFESSIONNEL";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";

    $scope.RetourInsertedition = [];

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/
    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      sessionStorage.getItem("vpOpcontratRegler")
    );
    //fin session generale pour le contrat operation
    $rootScope.collectionDeLaConnexion = JSON.parse(
      localStorage.getItem("userCurrent")
    );
    console.log($rootScope.collectionDeLaConnexion);

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
      $scope.afficheListeContratRgler();
    };
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

  
    //debut afficher liste individuel accident
    $scope.afficheListeContratRgler = function (
    ) {
      $scope.$emit("LOAD");
      $scope.listeCheques = [];
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,//'1000000000000000000003416',//$scope.collectionContartOp.CA_CODECONTRAT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "01",
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
          .post("/ContratCheque/ListeContratChequeRegler/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeCheques = reponse.data;
            $scope.nombreInfoBulle = $scope.listeCheques.length;
            console.log($scope.listeCheques);
            if (
              $scope.listeCheques[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeCheques[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      //}
    };
    //fin afficher liste individuel accident

    //debut voir plus
    $scope.voirModif = function (info) {
      $scope.FormListReglAssur.DateEmission = info.CH_DATEEMISSIONCHEQUE
      $scope.recuperer = info
    };
    //fin voir plus

//debut focus sur le champ
$scope.desactiverChampRquis = function () {
  $(document).ready(function () {
    $("#addform_dtEmission").focusin(function () {
      $(this).css("background-color", "#FFFFFF");
    });
   
  });
};
//fin focus sur le champ
    //Debut ajout chèque (contrat)
    $scope.ajoutFormAddCheque = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();

    
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    
      $scope.lAnneeEmission = $scope.FormListReglAssur.DateEmission.substr(6, 4);
      $scope.leMoisEmission = $scope.FormListReglAssur.DateEmission.substr(3, 2);
      $scope.leJourEmission = $scope.FormListReglAssur.DateEmission.substr(0, 2);


      if (
       
        $scope.FormListReglAssur.DateEmission === "" ||
        $scope.FormListReglAssur.DateEmission === undefined 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          
          if (
            $scope.FormListReglAssur.DateEmission === "" ||
            $scope.FormListReglAssur.DateEmission === undefined
          ) {
            $("#addform_dtEmission").css("background-color", "#FFE9E0");
          }
          
        });
        $rootScope.ChampsNonRenseignes();
      } else if (typeDate.test($scope.FormListReglAssur.DateEmission) == false) {
        $scope.messageErreur = "Veuillez renseigner une date emission correcte";
        $scope.$emit("UNLOAD");
        $("#addform_dtEmission").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEmission == "02" && $scope.leJourEmission > "29") {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDate2").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEmission == "04" ||
          $scope.leMoisEmission == "06" ||
          $scope.leMoisEmission == "09" ||
          $scope.leMoisEmission == "11") &&
        $scope.leJourEmission > "30"
      ) {
        $scope.messageErreur = "La date d'emission n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDate2").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.etatForm = "2"
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $scope.recuperer.AG_CODEAGENCE,
            CH_DATESAISIECHEQUE: $scope.recuperer.CH_DATESAISIECHEQUE,
            CH_IDEXCHEQUE: $scope.recuperer.CH_IDEXCHEQUE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            AB_CODEAGENCEBANCAIRE: "01",
            AB_CODEAGENCEBANCAIREASSUREUR: "01",
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,//'1000000000000000000003416',//$scope.collectionContartOp.CA_CODECONTRAT,
            CH_REFCHEQUE: "0",
            CH_VALEURCHEQUE: "0",
            CH_PRIMEAENCAISSER: "0",
            CH_DATEANNULATIONCHEQUE: "01-01-1900",
            CH_DATEEMISSIONCHEQUE: $scope.FormListReglAssur.DateEmission,
            CH_DATERECEPTIONCHEQUE: "01-01-1900",
            CH_DATEVALIDATIONCHEQUE: "01-01-1900",
            CH_DATEDEBUTCOUVERTURE: "01-01-1900",
            CH_DATEFINCOUVERTURE: "01-01-1900",
            CH_NOMTIREUR: "lm",
            CH_NOMTIRE:  "lm",
            CH_NOMDUDEPOSANT:  "lm",
            CH_TELEPHONEDEPOSANT:  "0",
            CH_DATEEFFET: "01-01-1900",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "CHEQUE",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: '4',
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
        if ($scope.etatForm == "2") {
          $http
            .post(
              "/ContratCheque/ModificationContratCheque/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.testModificationCheque = reponse.data;
              if (
                $scope.testModificationCheque[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $rootScope.EnregistrementReussi(
                  $scope.testModificationCheque[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.$emit("UNLOAD");
                $scope.afficheListeContratRgler();
                $('#modalDatemission').modal("hide");
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testModificationCheque[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testModificationCheque[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout chèque (contrat)

    //debut annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.FormListReglAssur.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListReglAssur.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListReglAssur.numPolice = "";
      $scope.FormListReglAssur.numSouscripteur = "";
      $scope.FormListReglAssur.nomSouscripteur = "";
      $scope.FormListReglAssur.numCommercial = "";
      $scope.FormListReglAssur.nomCommercial = "";
    };
    //debut annuler la recherche

    //debut aller a relévé Client
    $scope.redirectReleveClient = function () {
      $rootScope.retourSitTiersAssureur = "3";
      window.location.href =
        "#/gestion/ReglementAssurance/multirisque-pro/liste/releve-client";
    };
    //fin aller a relévé Client

    //debut aller a relévé Commission Assurance
    $scope.redirectReleveCommissionAssurance = function () {
      $rootScope.retourSitTiersAssureur = "3";
      window.location.href = "#/gestion/ReglementAssurance/releve-commission";
    };
    //fin aller a relévé Commission Assurance

    //debut aller a Règlement facture client
    $scope.redirectReglementFactureClient = function () {
      $rootScope.retourSitTiersAssureur = "3";
      $rootScope.retourListe = "mp";
      window.location.href =
        "#/gestion/ReglementAssurance/multirisque-pro/liste/reglement-facture-client";
    };
    //fin aller a Règlement facture client

    //debut aller a Règlement Commission Assurance
    $scope.redirectReglementCommissionAssurance = function () {
      $rootScope.retourSitTiersAssureur = "3";
      window.location.href =
        "#/gestion/ReglementAssurance/multirisque-pro/liste/reglement-commission-assurance";
    };
    //fin aller a Règlement Commission Assurance

    //debut aller a Règlement Commission COMMERCIAUX
    $scope.redirectReglementCommissionCommerciaux = function () {
      $rootScope.retourSitTiersAssureur = "3";
      window.location.href =
        "#/gestion/ReglementAssurance/multirisque-pro/liste/reglement-commission-commerciaux";
    };
    //fin aller a Règlement Commission COMMERCIAUX

    //debut aller a remise chèque sinitre
    $scope.redirectRemiseChequeSinistre = function () {
      $rootScope.retourSitTiersAssureur = "3";
      window.location.href =
        "#/gestion/ReglementAssurance/multirisque-pro/liste/remise-cheque-sinitre";
    };
    //fin aller a remise chèque sinitre

    $scope.varRecup = "";
    //debut aller afficher règlement chèque
    $scope.redirectAfficherReglementCheque = function () {
      $rootScope.retourSitTiersAssureur = "3";
      $scope.varRecup = JSON.parse(
        localStorage.getItem("CollReglementMultirisquePro")
      );
      console.log($scope.varRecup);
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.collectionDeLaConnexion[0].AG_CODEAGENCE,
          CA_CODECONTRAT: $scope.varRecup.CA_CODECONTRAT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "ETAT",
          SL_LIBELLEMOUCHARD: "AFFICHER REGLEMENT CHEQUE",
          TYPEOPERATION: "2",
          LG_CODELANGUE: "fr",

          /* AG_CODEAGENCE: $rootScope.collectionDeLaConnexion[0].AG_CODEAGENCE,
          CA_CODECONTRAT: $scope.varRecup.CA_CODECONTRAT,
          CH_REFCHEQUE: "",
          AB_CODEAGENCEBANCAIRE: "",
          MONTANT1: "0",
          MONTANT2: "1000000",
          DATEDEBUT: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          DATEFIN: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          ET_LIBELLEETAT: "LISTE DES CHEQUES",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "ETAT",
          SL_LIBELLEMOUCHARD: "AFFICHER REGLEMENT CHEQUE",
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr", */
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
          "/AfficherReglementCheque/InserteditiontresorerieCheque/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.RetourInsertedition = reponse.data;
          if (
            $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $http
              .post(
                "/AfficherReglementCheque/pvgAfficherEtat/",
                $scope.RetourInsertedition
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
              $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin aller afficher règlement chèque

    $scope.initFormListOpMultirisquePro = function (item) {
      $rootScope.maPosition = item;
    };

    //debut autre option
    $scope.autreOption = function (collReglement) {
      console.log(collReglement);
      localStorage.setItem(
        "CollReglementMultirisquePro",
        JSON.stringify(collReglement)
      );
    };
    //fin autre option

    /*FIN DEV JJ*/
  },
]);
