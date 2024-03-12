MapharApp.controller("ParametresBudgetController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.infocontrat = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    /*DEBUT ZONE DE DECLARATION */

    // type budget variable
    $scope.libellesearch = "";
    $scope.listetypebudget = [];
    $scope.testEnregistrement = [];
    $scope.recuperation = [];
    $scope.verou = true;
    $scope.FormAddTypeBudget = {
      Code: "",
      Libelle: "",
    };
    $scope.idElement = "";
    //fin type

    /*FIN ZONE DE DECLARATION*/
    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

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

    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#Libelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

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

    //debut notification champs non renseigné

    //fin notification champs non renseigné

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    //debut initialisation add modif
    $scope.initFormAddModif = function () {
      $scope.$emit("LOAD");
      $scope.retourModifODSP();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add modif

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV OVER*/

    //fin contrainte sur les champs list
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddtypebudjet = function () {
      $scope.$emit("LOAD");
      $scope.FormAddTypeBudget = {
        Code: "",
        Libelle: "",
      };
      /* $(document).ready(function () {
        $("#addSanteAuxiliaire_Code1").css("background-color", "#FFFFFF");
      });*/
      $scope.$emit("UNLOAD");
      // $scope.rechargePage();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //Debut ajout
    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddtypebudjet = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      // $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));
      $scope.recuperation = angular.fromJson(
        localStorage.getItem("modifODtypebudget")
      );
      console.log($scope.recuperation);

      // let typenumerotelephone = /^(0|[0-9]\d*)$/;

      if (
        $scope.FormAddTypeBudget.Libelle === "" ||
        $scope.FormAddTypeBudget.Libelle === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddTypeBudget.Libelle === "" ||
            $scope.FormAddTypeBudget.Libelle === undefined
          ) {
            $("#Libelle").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else {
        if ($scope.etatForm == "2") {
          $scope.idtypebudget = $scope.recuperation.BT_CODETYPEBUDGET;
          //  $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          // $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "INSERTIONS";
        }
        if ($scope.idtypebudget == undefined) {
          $scope.idtypebudget = "";
        }
        $scope.objet_envoie = [
          {
            BT_CODETYPEBUDGET: $scope.idtypebudget,
            BT_LIBELLE: $scope.FormAddTypeBudget.Libelle,
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
        if ($scope.etatForm !== "2") {
          $http
            .post("/TypeBudgetParamII/INSERTParamII/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation = [];
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.resetFormAddTypeBudget();

                //  $scope.initFormAddExpert()
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/TypeBudgetParamII/UPDATEParamII/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation = [];
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/parametre2/parametresBudget/typeDeBudget/liste";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                }
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout

    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpStypebudget", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpStypebudget"));
    };
    //fin voir plus

    //debut acceder a la page de modification 1
    $scope.voirModification = function (info) {
      localStorage.setItem("modifODtypebudget", JSON.stringify(info));
      //  window.location.href = "#/ModificationsuiviDossierSP";
      window.location.href =
        "#/parametre2/parametresBudget/typeDeBudget/Modification";
    };
    //fin acceder a la page de modification 1

    //debut acceder a la page de modification 2
    $scope.retourModifODSP = function () {
      $scope.etatForm = "2";
      $scope.recuperer = JSON.parse(localStorage.getItem("modifODtypebudget"));
      $scope.FormAddTypeBudget.Code = $scope.recuperer.BT_CODETYPEBUDGET;
      $scope.FormAddTypeBudget.Libelle = $scope.recuperer.BT_LIBELLE;
    };
    //fin acceder a la page de modification 2

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimetypebudget = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          BT_CODETYPEBUDGET: $scope.idElement,
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
        .post("/TypeBudgetParamII/DELETEParamII/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          console.log($scope.testSuppression);
          if ($scope.testSuppression[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listetypebudget[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin recuperer id pour la suppression
    $scope.desactiverChampRequisListe1 = function () {
      $(document).ready(function () {
        $("#libellesearch").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    //affichage de la liste des sinstres
    $scope.afficheListe = function (Denomination) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe1();

      if (Denomination == undefined) {
        Denomination = "";
      }

      $scope.objet_envoie = [
        {
          BT_LIBELLE: Denomination,
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
        .post(
          "/TypeBudgetParamII/ListeTypeBudgetParamII/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listetypebudget = reponse.data;
          $rootScope.infoBulleNombre = $scope.listetypebudget.length;
          $rootScope.listeOn =
            $scope.listetypebudget[0].clsObjetRetour.SL_MESSAGE;
          console.log($scope.listetypebudget);
          if (
            $scope.listetypebudget[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listetypebudget[0].clsObjetRetour.SL_MESSAGE
            );
          }
        });
    };
    //fin
    $scope.resetFormAddTypeBudget = function () {
      $scope.FormAddTypeBudget = {
        Code: "",
        Libelle: "",
      };
    };
    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.$emit("LOAD");
      $scope.libellesearch = "";

      $scope.$emit("UNLOAD");
    };
    //fin pour annuler la recherche

    $scope.initListeTypeBudget = function () {
      $rootScope.infoBulleNombre = "";
      $rootScope.listeOn = "";
    };

    /*FIN DEV OVER*/
  },
]);
