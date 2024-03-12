MapharApp.controller("ValidationDossierController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.FormListe = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numSinistre: "",
      natureSinistre: "",
    };
    $scope.listeValidationDossierSP = [];
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT VALIDATION DOSSIER";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDLISTEDOCUMENT = "LISTE DOCUMENT";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDVALIDATION = "VALIDATION";
    $scope.tabsituation = [];
    $scope.recupsinistre = "";
    $scope.tabinfosiniste = [];
    $scope.RecupannulationTrans = [];
    //$scope.selectedMore =[]
    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GLOBALE*/

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

    /*FIN FONCTION GLOBALE*/

    /*DEBUT DEV JJ*/
    $scope.AnnulationTransm = function () {
      $scope.tabinfosiniste = JSON.parse(sessionStorage.getItem("infsinistre"));
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: $scope.tabinfosiniste.SI_CODESINISTRE,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_OPERATEUR,
          SI_DATETRANSMISSIONSINISTRE:
            $scope.tabinfosiniste.SI_DATETRANSMISSIONSINISTRE,
          SI_DATEVALIDATIONSINISTRE:
            $scope.tabinfosiniste.SI_DATEVALIDATIONSINISTRE, //"01-01-1900",
          SI_DATESUSPENSIONSINISTRE:
            $scope.tabinfosiniste.SI_DATESUSPENSIONSINISTRE, //"01-01-1900",
          SI_DATECLOTURESINISTRE: $scope.tabinfosiniste.SI_DATECLOTURESINISTRE, //"01-01-1900",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "7",
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
        .post("/Sinistre/ANNULATIONTRANSMISSION/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.RecupannulationTrans = reponse.data;
          if (
            $scope.RecupannulationTrans[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationReussie(
              $scope.RecupannulationTrans[0].clsObjetRetour.SL_MESSAGE
            );
            sessionStorage.removeItem("infsinistre");
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationNonReussie(
              $scope.RecupannulationTrans[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.RecupannulationTrans[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

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

    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#natureSinistre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ
    $scope.desactiverChampRequisListesituation = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    $scope.initlistesituation = function () {
      $scope.$emit("LOAD");
      $scope.listesituation(
        $rootScope.DATE_JOURNEE_DE_TRAVAIL,
        $rootScope.DATE_JOURNEE_DE_TRAVAIL
      );
      $scope.$emit("UNLOAD");
    };
    //debut liste des nouveaux sinistres
    $scope.afficheListeOperation = function (
      periodeDu,
      periodeAu,
      numSinistre,
      natureSinistre
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

      if (
        periodeDu === "" ||
        periodeDu === undefined ||
        periodeAu === "" ||
        periodeAu === undefined ||
        numSinistre === undefined ||
        natureSinistre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numSinistre === undefined) {
            $("#idNumSin").css("background-color", "#FFE9E0");
          }
          if (natureSinistre === undefined) {
            $("#idNatSinistre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeOperation = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
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
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
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
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listeOperation = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeOperation = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            NS_CODENATURESINISTRE: natureSinistre,
            SI_NUMSINISTRE: numSinistre,
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
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
          .post("/Sinistre/ListeSinistre/", $scope.objet_envoie, {
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
    //fin liste validation dossier
    $scope.listesituation = function (periodeDu, periodeAu) {
      $scope.$emit("LOAD");
      $scope.recupsinistre = "";
      $scope.recupsinistre = JSON.parse(
        sessionStorage.getItem("infosinistresituation")
      );
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      // $scope.desactiverChampRequisListesituation();

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
        periodeAu === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listesituations = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
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
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
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
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listesituations = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listesituations = "";
      } else {
        $scope.objet_envoie = [
          {
            SI_CODESINISTRE: $scope.recupsinistre,
            TYPEOPERATION: "0",
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
            "/SinistreSituation/ListeSinistreSituation/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listesituations = reponse.data;
            if (
              $scope.listesituations[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listesituations[0].clsObjetRetour.SL_MESSAGE
              );
            } else {
              for (i = 0; $scope.listesituations.length > i; i++) {
                if ($scope.listesituations[i].COCHER == "O") {
                  $scope.selectedMore.push($scope.listesituations[i]);
                }
                // break;
              }
              console.log($scope.selectedMore);
            }
          });
      }
    };
    //debut pour annuler la recherche
    $scope.listValidationDossierSPAnnuler = function () {
      $scope.FormListeValidationDossierSP = {};
      $scope.FormListeValidationDossierSP.periodeDu =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListeValidationDossierSP.periodeAu =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
    };
    //fin pour annuler la recherche

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpVDSP", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpVDSP"));
    };
    //fin voir plus

    //debut acceder a la page de modification 1
    $scope.voirValidationVDSP = function (info) {
      sessionStorage.setItem("ValidDSP", JSON.stringify(info));
      window.location.href = "ValidationDossier";
    };
    //fin acceder a la page de modification 1

    //voir situation
    $scope.situation = function (infosinistre) {
      sessionStorage.setItem(
        "infosinistresituation",
        JSON.stringify(infosinistre)
      );
      window.location.href =
        "#/assurances/operation/multirisque-pro/liste/ListeSituationDossier";
    };
    //debut recuper id du contrat a transmettre
    $scope.validation = function (recupId, information) {
      $scope.idElement = recupId;
      sessionStorage.setItem("infsinistre", JSON.stringify(information));
    };
    //fin recuper id du contrat a transmettre

    //debut transmettre le contrat
    $scope.validationSinistreMP = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: recupId,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          SI_DATETRANSMISSIONSINISTRE: "01-01-1900",
          SI_DATEVALIDATIONSINISTRE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SI_DATESUSPENSIONSINISTRE: "01-01-1900",
          SI_DATECLOTURESINISTRE: "01-01-1900",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDVALIDATION,
          TYPEOPERATION: "4",
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
        .post("/Sinistre/ActionsSurSinistres/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.elmntValideSinistreMultirisquePro = reponse.data;
          if (
            $scope.elmntValideSinistreMultirisquePro[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationReussie(
              $scope.elmntValideSinistreMultirisquePro[0].clsObjetRetour
                .SL_MESSAGE
            );
            $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.TransmissionValidationNonReussie(
              $scope.elmntValideSinistreMultirisquePro[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.elmntValideSinistreMultirisquePro[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };
    //fin transmettre le contrat

    //debut annuler liste
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumSin").css("background-color", "#FFFFFF");
        $("#idNatSinistre").css("background-color", "#FFFFFF");
      });
      $scope.FormListe.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListe.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListe.numSinistre = "";
      $scope.FormListe.natureSinistre = "";
    };
    //fin annuler liste

    //debut liste des sinitres
    $scope.afficheListeSinistreOuvertureDSP = function () {
      $scope.objet_envoie = [
        {
          NS_CODENATURESINISTRE: "",
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
        .post("/Sinistre/ListeNatSinistre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSinistreOuvertureDSP = reponse.data;
        });
    };
    //fin liste des sinistres

    //debut init liste
    $scope.initFormListeValidationDossierSP = function () {
      $scope.afficheListeSinistreOuvertureDSP();
    };
    //fin init liste

    //debut liste doc
    $scope.listeDesDocuments = function () {
      $scope.SI_CODESINISTRE = JSON.parse(
        sessionStorage.getItem("DocumentVDSP")
      );
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: $scope.SI_CODESINISTRE.SI_CODESINISTRE,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTEDOCUMENT,
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
        .post("api/DocumentsOuvertureDossier/ListeDoc/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeAfficheDocument = reponse.data;
          console.log($scope.listeAfficheDocument);
        });
    };
    //fin liste doc
    $scope.ValiderSituation = function () {
      $scope.$emit("LOAD");

      $scope.clsCtcontratgaranties = [];
      for (var i = 0; i < $scope.listesituations.length; i++) {
        /* for (var j = 0; j < $scope.selectedMore.length; j++) {
          if (
            $scope.selectedMore[j].EN_DENOMINATION ==
            $scope.listeDroitEntrepot[i].EN_DENOMINATION
          ) {
            if ($scope.listeDroitEntrepot[i].COCHER == "O") {
              $scope.listeDroitEntrepot[i].COCHER = "N";
              break;
            }
            if ($scope.listeDroitEntrepot[i].COCHER == "N") {
              $scope.listeDroitEntrepot[i].COCHER = "O";
              break;
            }
          }
        }*/

        $scope.objetGarentie = {
          SI_CODESINISTRE: "",
          SD_CODESITUATIONDOSSIER: "",
          COCHER: "",
          SI_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TYPEOPERATION: "0",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },

          /* EN_CODEENTREPOT: "",
          OP_CODEOPERATEUR: "",
          COCHER: "",
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
            OE_E: $rootScope.CODE_ENTREPOT,
          },*/
        };

        $scope.objetGarentie.COCHER = $scope.listesituations[i].COCHER;
        $scope.objetGarentie.SD_CODESITUATIONDOSSIER =
          $scope.listesituations[i].SD_CODESITUATIONDOSSIER;
        $scope.objetGarentie.SI_CODESINISTRE =
          $scope.listesituations[i].SI_CODESINISTRE;

        $scope.clsCtcontratgaranties.push($scope.objetGarentie);
      }
      $scope.objet_envoie = $scope.clsCtcontratgaranties;

      $http
        .post(
          "/SinistreSituation/AjoutSinistreSituation/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.tabsituation = reponse.data;
          console.log($scope.tabsituation);
          if ($scope.tabsituation[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tabsituation[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.selectedMore = [];
            $scope.listesituation(
              $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              $rootScope.DATE_JOURNEE_DE_TRAVAIL
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tabsituation[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.selectedMore = [];
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
          $scope.selectedMore = [];
        });
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
        /*  for (i = 0; $scope.listesituations.length > i; i++) {
       if (
         item.SD_CODESITUATIONDOSSIER == $scope.listesituations[i].SD_CODESITUATIONDOSSIER
       ) {
         if ($scope.listesituations[i].COCHER == "O") {
           $scope.listesituations[i].COCHER = "N";
           break;
         }
       }
     }

     $scope.selectedMore.splice(idx, 1); */
      } else {
        $scope.selectedMore = [];
        $scope.selectedMore.push(item);
        for (i = 0; $scope.listesituations.length > i; i++) {
          for (j = 0; $scope.selectedMore.length > j; j++) {
            if (
              parseInt($scope.selectedMore[j].SD_CODESITUATIONDOSSIER) ==
              parseInt($scope.listesituations[i].SD_CODESITUATIONDOSSIER)
            ) {
              if ($scope.listesituations[i].COCHER == "N") {
                $scope.listesituations[i].COCHER = "O";
                break;
              }
            } else {
              $scope.listesituations[i].COCHER = "N";
            }
          }
        }
      }

      console.log($scope.selectedMore);
      /*let idx = $scope.selectedMore.indexOf(item);
   if (idx > -1) {
     $scope.selectedMore.splice(idx, 1);
   } else {
     $scope.selectedMore.push(item);
   }*/
    };

    //debut acceder a la page document
    $scope.voirDocumentODSP = function (info) {
      sessionStorage.setItem("DocumentVDSP", JSON.stringify(info));
      window.location.href =
        "#/assurances/operation/multirisque-pro/document/validation-dossier";
    };
    //fin acceder a la page document

    /* FIN DEV JJ*/
  },
]);
