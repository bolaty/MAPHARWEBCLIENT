MapharApp.controller("ReglementAssuranceMPController", [
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
      Exercice: $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE
    };
    $scope.listeDesExercice = [];
    $scope.objet_envoie = [];
    $scope.listeOperation = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT MULTIRISQUE PROFESSIONNEL";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";

    $scope.RetourInsertedition = [];

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/
    
    $scope.DroitOperateurEnCours = JSON.parse(
      sessionStorage.getItem("DroitOperateurEnCours")
    );

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
     $scope.voirchequeregler = function (info) {
      sessionStorage.setItem("vpOpcontratRegler", JSON.stringify(info));
      window.location.href =
       "#/gestion/ReglementAssurance/liste/cheque-regle";
    };
    //fin voir plus
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
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/
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
          if ($scope.listeDesExercice[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
           // $scope.afficheListePays();
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
    //debut afficher liste individuel accident
    $scope.afficheListeReglAssurance = function (
      statut,
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
      let typeNumerique = /^[0-9]+$/;
      let typeAlphaNumerique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
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

      if (!statut) {
        $scope.$emit("UNLOAD");
        $rootScope.ChampsListeInvalide();
        $scope.listeOperation = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
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
        $scope.listeOperation = []
      } else {
        $scope.leCodeRisque = "";
        if ($rootScope.maPosition === "01") {
          $scope.leCodeRisque = "01";
        } else if ($rootScope.maPosition === "02") {
          $scope.leCodeRisque = "02";
        } else if ($rootScope.maPosition === "03") {
          $scope.leCodeRisque = "03";
        } else if ($rootScope.maPosition === "04") {
          $scope.leCodeRisque = "04";
        } else if ($rootScope.maPosition === "05") {
          $scope.leCodeRisque = "05";
        } else if ($rootScope.maPosition === "06") {
          $scope.leCodeRisque = "06";
        } else if ($rootScope.maPosition === "07") {
          $scope.leCodeRisque = "07";
        } else if ($rootScope.maPosition === "08") {
          $scope.leCodeRisque = "08";
        } else if ($rootScope.maPosition === "09") {
          $scope.leCodeRisque = "09";
        } else if ($rootScope.maPosition === "10") {
          $scope.leCodeRisque = "10";
        }else if ($rootScope.maPosition === "11") {
          $scope.leCodeRisque = "11";
        }else if ($rootScope.maPosition === "12") {
          $scope.leCodeRisque = "12";
        }

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
            RQ_CODERISQUE: $scope.leCodeRisque,
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
            console.log($scope.listeOperation);
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
      sessionStorage.setItem("vpreglAssurMultirisquePro", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpreglAssurMultirisquePro")
      );
      console.log($scope.recuperer);
    };
    //fin voir plus

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
      
      $rootScope.STMODIFICATION_DATE_EMISSION = $scope.DroitOperateurEnCours.find(//@ts-ignore
        (element) => element.OB_LIBELLE == 'MODIFICATION DATE EMISSION'
      )?.OD_AUTORISER

      if($rootScope.STMODIFICATION_DATE_EMISSION == 'O'){
        $rootScope.MODIFICATION_DATE_EMISSION = true;
      }

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
