MapharApp.controller("ConsultationsQuestionnairesController", [
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
    //$rootScope.collectionContartOp = angular.fromJson(localStorage.getItem("vpOpMultirisqueProinfocontrat"));
    $rootScope.idcontratvoyage = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    console.log($rootScope.idcontratvoyage);

    //FIN MODULE JS

    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];
    $scope.FormListQuestionnaires = {
      document: "",
    };
    $scope.listeQuestionnaires = [];
    $scope.listeDocument = [];
    $scope.listeQuestionnaireLiaisonDoc = [];
    $scope.testValidation = [];
    $scope.recuperer = [];
    /*FIN ZONE DE DECLARATION*/

    //debut voir plus Questionnaires
    $scope.voirPlusQuestionnaires = function (info) {
      sessionStorage.setItem("vpQuestionnaires", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpQuestionnaires"));
    };
    //fin voir plus Questionnaires

    //DEBUT FONCTION GENERALE

    //début loader
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

    //debut initialisation add Voyage
    $scope.initFormListQuestionnaires = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeDocument();
      //$scope.afficheListeQuestionnaireLiaisonDoc();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add voyage

    // FIN FONCTION GENERALE

    //debut liste des intermediaire
    $scope.afficheListeDocument = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: $rootScope.idcontratvoyage.RQ_CODERISQUE,
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

    //debut liste des intermediaire
    $scope.afficheListeQuestionnaireLiaisonDoc = function (idcode) {
      // $scope.$emit('LOAD');
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_CODECONTRAT: $rootScope.idcontratvoyage.CA_CODECONTRAT,
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
          for (i = 0; i < $scope.listeQuestionnaireLiaisonDoc.length; i++) {
            if ($scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 == "") {
              $scope.listeQuestionnaireLiaisonDoc[i].CQ_VALEUR1 = "N";
            }
          }
          console.log($scope.listeQuestionnaireLiaisonDoc);
        });
    };
    //fin liste des intermediaire

    //debut pour annuler la recherche
    $scope.listeQuestionnairesAnnuler = function () {
      $(document).ready(function () {
        $("#listQuestionnaires_document").css("background-color", "#FFFFFF");
      });
      $scope.FormListQuestionnaires.document = "";
    };
    //fin pour annuler la recherche

    //debut pour retourner sur les listes
    $scope.retourSurLesListes = function () {
      if ($rootScope.retourSurListeContrat == "MultirisqueProfessionnel") {
        window.location.href = "#/assurances/multirisque-professionnel";
      } else if ($rootScope.retourSurListeContrat == "IndividuelAccident") {
        window.location.href = "#/assurances/individuel-accident";
      } else if ($rootScope.retourSurListeContrat == "Habitat") {
        window.location.href = "#/assurances/habitat";
      } else if ($rootScope.retourSurListeContrat == "Auto") {
        window.location.href = "#/assurances/auto";
      } else if ($rootScope.retourSurListeContrat == "Voyage") {
        window.location.href = "#/assurances/voyage";
      } else if ($rootScope.retourSurListeContrat == "ResponsabiliteCivile") {
        window.location.href = "#/assurances/responsabilite-civile";
      } else if ($rootScope.retourSurListeContrat == "TransportEtMarchandise") {
        window.location.href = "#/assurances/transport-et-marchandise";
      } else if ($rootScope.retourSurListeContrat == "SanteGesa") {
        window.location.href = "#/assurances/sante/gesa";
      } else if ($rootScope.retourSurListeContrat == "SantePharmacien") {
        window.location.href = "#/assurances/sante/pharmacien";
      } else if ($rootScope.retourSurListeContrat == "SanteAuxiliaire") {
        window.location.href = "#/assurances/sante/auxiliaire";
      }
    };
    //fin pour retourner sur les listes

    //debut session generale pour le contrat operation
    /* $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    ); */
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation

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
        $scope.selectedMore.splice(idx, 1);
      } else {
        $scope.selectedMore.push(item);
      }
    };
  },
]);
