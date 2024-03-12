MapharApp.controller("VentesController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",

  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken
    $scope.listeOperateur = [];
    $scope.listeVentes = [];
    $scope.listeNatureArticle = [];
    $scope.listeTypeArticle = [];
    $scope.listeArticle = [];
    $scope.listeTypeClient = [];
    $scope.FormListVentes = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numBordereau: "",
      typeClient: "",
      groupe: "",
      numClient: "",
      nomClient: "",
      numComm: "",
      nomComm: "",
      natArticle: "",
      typeArticle: "",
      article: "",
      operateur: "",
    };
    $scope.SL_LIBELLEECRAN = "LISTE VENTES";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "INSERTION";

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

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

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idNumBordereau2").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumAssureur").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumCompte").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idRefPiece").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idMontant").maxlength({
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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    $scope.initFormListeVentes = function () {
      $scope.afficheListeOperateur();
      $scope.afficheListeNatureArticle();
      $scope.afficheListeTypeClient();
    };

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut liste operateur
    $scope.afficheListeOperateur = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
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
        .post("/Operateur/ComboOperateur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeOperateur = reponse.data;
        });
    };
    //fin liste operateur

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumBord").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumClient").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumComm").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatArticle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeArticle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idArticle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut liste nature article
    $scope.afficheListeNatureArticle = function () {
      $scope.objet_envoie = [
        {
          //"AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          PP_CODEMODEGESTION: "11",
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
        .post("/NatureArticle/ListeNatureArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureArticle = reponse.data;
        });
    };
    //fin liste nature article

    //debut liste type article
    $scope.afficheListeTypeArticle = function (codeNatArt) {
      $scope.objet_envoie = [
        {
          //"AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          NT_CODENATURETYPEARTICLE: codeNatArt,
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
        .post("/TypeArticle/ListeTypeArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeArticle = reponse.data;
          console.log($scope.listeTypeArticle);
        });
    };
    //fin liste type article

    //debut liste type article
    $scope.afficheListeTypeClient = function () {
      $scope.objet_envoie = [
        {
          TP_CODETYPETIERS: "001",
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
        .post("/TypeClient/ListeTypeDuClient/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeClient = reponse.data;
        });
    };
    //fin liste type article

    //debut liste article
    $scope.afficheListeArticle = function (codeTypeArt) {
      $scope.objet_envoie = [
        {
          //"AG_CODEAGENCE": $rootScope.CODE_AGENCE,
          TA_CODETYPEARTICLE: codeTypeArt,
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
        .post("/Article/ListeArticles/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeArticle = reponse.data;
        });
    };
    //fin liste article

    //debut afficher liste vente
    $scope.afficheListeVente = function (
      periodeDu,
      periodeAu,
      numBordereau,
      typeClient,
      groupe,
      numClient,
      nomClient,
      numComm,
      nomComm,
      natArticle,
      typeArticle,
      article,
      operateur
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      // let typeAlphabetique = /^[a-z-A-Z]/;
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

      if (
        periodeDu === "" ||
        periodeDu === undefined ||
        periodeAu === "" ||
        periodeAu === undefined ||
        $scope.FormListVentes.numBordereau === undefined ||
        typeClient === undefined ||
        groupe === undefined ||
        numClient === undefined ||
        nomClient === undefined ||
        numComm === undefined ||
        nomComm === undefined ||
        natArticle === undefined ||
        typeArticle === undefined ||
        article === undefined ||
        operateur === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numBordereau === undefined) {
            $("#idNumBord").css("background-color", "#FFE9E0");
          }
          if (numClient === undefined) {
            $("#idNumClient").css("background-color", "#FFE9E0");
          }
          if (numComm === undefined) {
            $("#idNumComm").css("background-color", "#FFE9E0");
          }
          if (natArticle === undefined) {
            $("#idNatArticle").css("background-color", "#FFE9E0");
          }
          if (typeArticle === undefined) {
            $("#idTypeArticle").css("background-color", "#FFE9E0");
          }
          if (article === undefined) {
            $("#idArticle").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeVentes = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (natArticle !== "" && (typeArticle == "" || article == "")) {
        $scope.$emit("UNLOAD");
        if (typeArticle == "")
          $("#idTypeArticle").css("background-color", "#FFE9E0");
        if (article == "") $("#idArticle").css("background-color", "#FFE9E0");
        $scope.messageErreur =
          "Sélectionnez le type article et l'article ou déselectionnez la nature article";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeAu").css("background-color", "#FFE9E0");
        $rootScope.dateFinIncorrecte();
        $scope.listeVentes = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $("#idPeriodeDu").css("background-color", "#FFE9E0");
        $rootScope.dateDebutIncorrecte();
        $scope.listeVentes = "";
      } else {
        // partie a terminer demain
        $scope.objet_envoie = [
          {
            MS_NUMPIECE: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            MS_ANNULATIONPIECE: "N",
            TYPEOPERATION: "01",
            TP_CODETYPETIERS: "001", //
            NT_CODENATURETYPEARTICLE: "",
            CO_NUMCOMMERCIAL: "",
            CO_NOMPRENOM: "",
            NT_CODENATURETIERS: "",
            NO_CODENATUREOPERATION: "''SORT'',''FACT''", //
            AR_CODEARTICLE1: "",
            GP_CODEGROUPE: "",
            TYPELISTE: "",
            CO_CODECONSULTATION: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_NUMTIERS: "",
            TI_DENOMINATION: nomClient,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          .post("/ApproVente/ListeApproVente/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeVentes = reponse.data;
            console.log($scope.listeVentes);
            if ($scope.listeVentes[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeVentes[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste vente

    //debut annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumBord").css("background-color", "#FFFFFF");
        $("#idNumClient").css("background-color", "#FFFFFF");
        $("#idNumComm").css("background-color", "#FFFFFF");
        $("#idNatArticle").css("background-color", "#FFFFFF");
        $("#idTypeArticle").css("background-color", "#FFFFFF");
        $("#idArticle").css("background-color", "#FFFFFF");
      });
      $scope.FormListVentes = {};
      $scope.FormListVentes.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListVentes.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListVentes.numBordereau = "";
      $scope.FormListVentes.numClient = "";
      $scope.FormListVentes.numComm = "";
    };
    //fin annuler la recherche

    //debut vider les combos relatif a l'article
    $scope.viderComboArticle = function (val) {
      if (val == 1)
        ($scope.listeTypeArticle = []),
          ($scope.listeArticle = []),
          ($scope.FormListVentes.typeArticle = ""),
          ($scope.FormListVentes.article = ""),
          $("#idArticle").css("background-color", "#FFFFFF"),
          $("#idTypeArticle").css("background-color", "#FFFFFF");
      else ($scope.listeArticle = []), ($scope.FormListVentes.article = "");
    };
    //fin vider les combos relatif a l'article

    //debut voir plus Consultation
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpVente", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpVente"));
    };
    //fin voir plus Consultation

    //debut recuperer id pour la suppression
    /*  $scope.idElement = "";
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
      console.log($scope.idElement);
    }; */
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    /*  $scope.elmntSupprimerVentes = [];
    $scope.supprimeVentes = function (recupId) {
        $scope.$emit('LOAD');
        $scope.objet_envoie = [{
            "SI_CODESINISTRE": recupId,
            "SL_LIBELLEECRAN": $scope.SL_LIBELLEECRAN,
            "SL_LIBELLEMOUCHARD": $scope.SL_LIBELLEMOUCHARDSUPPRESSION,
            "TYPEOPERATION": "2",
            "LG_CODELANGUE": "fr",
            "clsObjetEnvoi": {
                "OE_A": $rootScope.CODE_AGENCE,
                "OE_Y": $rootScope.CODE_OPERATEUR,
                "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
            }
        }];

        $http.post("/ApproVente/SuppressionSinistre/", $scope.objet_envoie, {
            //headers: $scope.headers
        }).then(function (reponse) {
            $scope.elmntSupprimerVentes = reponse.data
            if ($scope.elmntSupprimerVentes[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
                $scope.$emit('UNLOAD');
                $rootScope.SuppressionReussie($scope.elmntSupprimerVentes[0].clsObjetRetour.SL_MESSAGE)
                $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT = "FALSE";
            } else {
                $scope.$emit('UNLOAD');
                $scope.MessageErreur = "Il ne vous est pas permis de supprimer ce sinistre car il est en cours d'utilisation."
                $rootScope.SuppressionNonReussie($scope.MessageErreur)
            }
        }).catch(function () {
            $scope.$emit('UNLOAD');
            $rootScope.ProblemeServeur($scope.elmntSupprimerVentes[0].clsObjetRetour.SL_MESSAGE)
        });
    } */
    //fin recuperer id pour la suppression

    /*FIN DEV JJ*/
  },
]);
