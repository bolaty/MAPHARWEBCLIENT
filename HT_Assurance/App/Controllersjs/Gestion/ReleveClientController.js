MapharApp.controller("ReleveClientController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation

    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];
    $scope.FormListReleveClient = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    };
    $scope.FormListReleve = {
      LIBELLEREDUCTION: "",
      MONTANT: [],
    };
    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
    };

    $scope.tabReleve = [];
    $scope.testSuppression = [];
    $scope.testEnregistrement = [];
    $scope.listReleveClient = [];
    $scope.listeContrat = [];

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

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
  


    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    //debut contrainte sur les champs liste ReleveClient
    $scope.contrainteFormListReleveClient = function () {
      FormValidation.formValidation(
        document.getElementById("formListReleveClient"),
        {
          fields: {
            listReleveClient_periodeDu: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date de debut.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
            listReleveClient_periodeAu: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la date de fin.",
                },
                regexp: {
                  regexp:
                    /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                  message: "Veuillez saisir une date correcte.",
                },
              },
            },
          },

          plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            // Bootstrap Framework Integration
            bootstrap: new FormValidation.plugins.Bootstrap(),
            // Validate fields when clicking the Submit button
            submitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          },
        }
      );
    };
    //fin contrainte sur les champs liste ReleveClient

    //DEBUT DEVELOPPEMENT YAYA//

    //debut pour annuler la recherche
    $scope.listeReleveClientAnnuler = function () {
      $scope.rechargePage();
    };
    //fin pour annuler la recherche

    //debut chargement de grille liste
    $scope.affichelistReleveClient = function (statut, periodeDu, periodeAu) {
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      $scope.lAnneePeriodeDu = $scope.FormListReleveClient.periodeDu.substr(
        6,
        4
      );
      $scope.leMoisPeriodeDu = $scope.FormListReleveClient.periodeDu.substr(
        3,
        2
      );
      $scope.leJourPeriodeDu = $scope.FormListReleveClient.periodeDu.substr(
        0,
        2
      );
      $scope.lAnneePeriodeAu = $scope.FormListReleveClient.periodeAu.substr(
        6,
        4
      );
      $scope.leMoisPeriodeAu = $scope.FormListReleveClient.periodeAu.substr(
        3,
        2
      );
      $scope.leJourPeriodeAu = $scope.FormListReleveClient.periodeAu.substr(
        0,
        2
      );

      if (!statut) {
        $rootScope.DateNonRenseignes();
        $scope.listReleveClient = "";
      } else if (
        typeDate.test($scope.FormListReleveClient.periodeDu) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormListReleveClient.periodeAu) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une dates écheance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeAu == "02" &&
        $scope.leJourPeriodeAu > "29"
      ) {
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeAu == "04" ||
          $scope.leMoisPeriodeAu == "06" ||
          $scope.leMoisPeriodeAu == "09" ||
          $scope.leMoisPeriodeAu == "11") &&
        $scope.leJourPeriodeAu > "30"
      ) {
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $rootScope.dateFinIncorrecte();
        $scope.listReleveClient = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $rootScope.dateDebutIncorrecte();
        $scope.listReleveClient = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            TI_NUMTIERS: $scope.collectionContartOp.TI_NUMTIERS,
            CA_CODECONTRAT: $rootScope.infocontrat,
            MS_NUMPIECE: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            DATEJOURNEE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            NO_CODENATUREOPERATION: "",
            SL_LIBELLEECRAN: "Saisie de Continent",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: "RELEVECLTGENERAL",
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
          .post("/ReleveClient/ListeReleveClient/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listReleveClient = reponse.data;
            if (
              $scope.listeReleveClient[0].clsObjetRetour.SL_RESULTAT == "FALSE"
            ) {
              $rootScope.MessageDesListes(
                $scope.listeReleveClient[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin chargement de grille liste

    //debut recuperer id pour la suppression du contrat
    $scope.idElement = "";
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression du contrat

    //debut acceder a la page de modification Voyage
    $scope.voirModification = function (info) {
      sessionStorage.setItem("modifVoyage", JSON.stringify(info));
      window.location.href = "ModificationVoyage";
    };
    //fin acceder a la page de modification Voyage

    //debut acceder a la page de modification
    $scope.retourModifVoyage = function (info) {
      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifVoyage"));
      console.log($scope.recupererInfo);
    };

    //FIN DEVELOPPEMENT YAYA//

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
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

    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.afficheListeContrat = function (periodeDu, periodeAu) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
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
        $scope.listeContrat = [];
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
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
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leMoisPeriodeDu > "30"
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
        $scope.listeContrat = [];
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeContrat = [];
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            TI_NUMTIERS: $scope.collectionContartOp.TI_NUMTIERS,
            TI_DENOMINATION: "",
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            MS_NUMPIECE: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            DATEJOURNEE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            NO_CODENATUREOPERATION: "",
            SL_LIBELLEECRAN: "CONSULTATION REGLEMENT",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "RELEVECLTGENERAL",
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
          .post("/Sinistre/ListeConsultationReglement/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.listeContrat = reponse.data;
            $scope.nombreInfoBulle = $scope.listeContrat.length;
            console.log($scope.listeContrat);
            if ($scope.listeContrat[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeContrat[0].clsObjetRetour.SL_MESSAGE
              );
            } else {
              $scope.$emit("UNLOAD");
            }
          });
      }
    };

    // debut afficher etat relevé
    $scope.apercuEtat = function () {
      $scope.$emit("LOAD");
      if ($scope.listeContrat.length != "0") {
        $http
          .post(
            "/EditionEtatAssurance/pvgAfficherEtatReleveClient/",
            $scope.listeContrat,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            if (reponse.data[0].SL_RESULTAT == "TRUE") {
              $scope.$emit("UNLOAD");
              toastr["success"](reponse.data[0].SL_MESSAGE); // Affichage de la notification de succes
              $window.open(reponse.data[0].SL_PATH_FILE, "_blank"); // Redirection sur l'etat dans une nouvelle fenetre
            } else {
              $scope.$emit("UNLOAD");
              toastr["error"](reponse.data[0].SL_MESSAGE); // Affichage de la notification de erreur
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              reponse.data[0].clsObjetRetour.SL_MESSAGE
            );
          });
      } else {
        $scope.$emit("UNLOAD");
        $rootScope.MessageDesListes("Veuillez effectuer une recherche");
      }
    };
    // fin afficher etat relevé

    // bouton de retour
    $scope.retour = function () {
      if ($rootScope.libelleMenu == "assurance") {
        if ($rootScope.ecranCible == "operationOn") {
          switch ($rootScope.maPosition) {
            case "01":
              window.location.href =
                "#/assurances/operation/liste/multirisque-professionnel";
              break;
            case "02":
              window.location.href =
                "#/assurances/operation/liste/sante-pharmacien";
              break;
            case "03":
              window.location.href =
                "#/assurances/operation/liste/individuel-accident";
              break;
            case "04":
              window.location.href = "#/assurances/operation/liste/voyage";
              break;
            case "05":
              window.location.href = "#/assurances/operation/liste/habitat";
              break;
            case "06":
              window.location.href = "#/assurances/operation/liste/auto";
              break;
            case "07":
              window.location.href =
                "#/assurances/operation/liste/sante-auxiliaire";
              break;
            case "08":
              window.location.href = "#/assurances/operation/liste/sante-gesa";
              break;
            case "09":
              window.location.href =
                "#/assurances/operation/liste/responnsabilite-civile";
              break;
            case "10":
              window.location.href =
                "#/assurances/operation/liste/trasport-marchadise";
              break;
          }
        } else {
          switch ($rootScope.maPosition) {
            case "01":
              window.location.href =
                "#/assurances/relance/liste/multirisque_professionnel";
              break;
            case "02":
              window.location.href =
                "#/assurances/relance/liste/sante_pharmacien";
              break;
            case "03":
              window.location.href =
                "#/assurances/relance/liste/individuel_accident";
              break;
            case "04":
              window.location.href = "#/assurances/relance/liste/voyage";
              break;
            case "05":
              window.location.href = "#/assurances/relance/liste/habitat";
              break;
            case "06":
              window.location.href = "#/assurances/relance/liste/auto";
              break;
            case "07":
              window.location.href =
                "#/assurances/relance/liste/sante_auxiliaire";
              break;
            case "08":
              window.location.href = "#/assurances/relance/liste/sante_gesa";
              break;
            case "09":
              window.location.href =
                "#/assurances/relance/liste/responsabilite_civile";
              break;
            case "10":
              window.location.href =
                "#/assurances/relance/liste/transport_marchandise";
              break;
          }
        }
      } else {
        if ($rootScope.retourSitTiersAssureur == "2") {
          window.location.href = "#/Tiers/SituationDesAssureurs";
        } else if ($rootScope.retourSitTiersAssureur == "1") {
          window.location.href = "#/assurances-gestion/Tiers/SituationTiers";
        } else if ($rootScope.retourSitTiersAssureur == "4") {
          window.location.href = "#/Tiers/SituationDesCommerciaux";
        } /* else {
          window.location.href =
            "#/assurances/operation/liste/multirisque-professionnel";
        } */
      }
    };
  },
]);
