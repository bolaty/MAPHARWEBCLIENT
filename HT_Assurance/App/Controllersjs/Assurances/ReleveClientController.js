MapharApp.controller("ReleveClientController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    //DEBUT MODULE JS
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.DATE_PREMIER_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );
    $rootScope.infocontrat = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );
    //FIN MODULE JS

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

    $scope.tabReleve = [];
    $scope.testSuppression = [];
    $scope.testEnregistrement = [];

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

    // bouton de retour
    $scope.retour = function () {
      if ($rootScope.retourSitTiersAssureur == "2") {
        window.location.href = "#/Tiers/SituationDesAssureurs";
      } else if ($rootScope.retourSitTiersAssureur == "1") {
        window.location.href = "#/assurances-gestion/Tiers/SituationTiers";
      } else if ($rootScope.retourSitTiersAssureur == "4") {
        window.location.href = "#/Tiers/SituationDesCommerciaux";
      } else {
        window.location.href =
          "#/assurances/operation/liste/multirisque-professionnel";
      }
    };

    //FIN DEVELOPPEMENT YAYA//
  },
]);
