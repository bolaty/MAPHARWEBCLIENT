MapharApp.controller("ParametresFamilleAmortissementController", [
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
    $scope.listefamilleAmortissement = [];
    $scope.testEnregistrement = [];
    $scope.recuperation = [];
    $scope.listeDesNumComptes = [];
    $scope.verou = true;

    $scope.FormAddFamilleAmort = {
      Code: "",
      Libelle: "",
      NumCompte: "",
      Numordre: "",
      id: "",
    };
    $scope.idElement = "";
    $scope.Listedetailtypebudget = [];
    $scope.Listetypebudget = [];
    $scope.ListeNaturePosteBudgetaire = [];
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
        $("#nom").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#NumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#Numordre").focusin(function () {
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
      $scope.retourModifODSP();
    };
    //fin initialisation add modif

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV OVER*/

    //fin contrainte sur les champs list
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddFamilleAmort = function () {
      $scope.$emit("LOAD");
      $scope.FormAddFamilleAmort = {
        Code: "",
        Libelle: "",
        NumCompte: "",
        Numordre: "",
      };
      /* $(document).ready(function () {
        $("#addSanteAuxiliaire_Code1").css("background-color", "#FFFFFF");
      });*/
      $scope.$emit("UNLOAD");
      // $scope.rechargePage();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    $scope.afficheListedetailtypebudget = function () {
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
        .post("/TypeBudgetdetailleParamII/COMBOParamII/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.Listedetailtypebudget = reponse.data;
          console.log($scope.Listedetailtypebudget);
        });
    };

    $scope.afficheListetypebudget = function () {
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
        .post("/TypeBudgetParamII/COMBOParamII/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.Listetypebudget = reponse.data;
          console.log($scope.Listetypebudget);
        });
    };

    $scope.afficheListenaturepostebudgetaire = function () {
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
        .post("/NumCompte/ListeNaturePosteBudgetaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.ListeNaturePosteBudgetaire = reponse.data;
          console.log($scope.ListeNaturePosteBudgetaire);
        });
    };

    $scope.afficheListeNumCompte = function (plnumcompte) {
      $scope.leChargement = true;
      if ($scope.FormAddFamilleAmort.NumCompte == undefined) {
        $scope.FormAddFamilleAmort.NumCompte = "";
      }
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: $scope.FormAddFamilleAmort.NumCompte,
          NC_CODENATURECOMPTE: "",
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesNumComptes = reponse.data;
          if (
            $scope.listeDesNumComptes[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.leChargement = false;
            if ($scope.etatForm == "2") {
              $scope.$emit("UNLOAD");
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesNumComptes[0].clsObjetRetour.SL_MESSAGE
            );
          }
        });
    };

    $scope.choixNumCompte = function (collection) {
      $scope.FormAddFamilleAmort.NumCompte = collection.PL_NUMCOMPTE;
      $scope.FormAddFamilleAmort.id = collection.PL_CODENUMCOMPTE;
      $("#NumCompte").css("background-color", "white");
    };

    //Debut ajout
    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddFamAmortissement = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      // $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));
      $scope.recuperation = angular.fromJson(
        sessionStorage.getItem("modifFamilleAmort")
      );
      console.log($scope.recuperation);

      // let typenumerotelephone = /^(0|[0-9]\d*)$/;

      if (
        $scope.FormAddFamilleAmort.Libelle === "" ||
        $scope.FormAddFamilleAmort.Libelle === undefined ||
        $scope.FormAddFamilleAmort.NumCompte === "" ||
        $scope.FormAddFamilleAmort.NumCompte === undefined ||
        $scope.FormAddFamilleAmort.Numordre === "" ||
        $scope.FormAddFamilleAmort.Numordre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddFamilleAmort.Libelle === "" ||
            $scope.FormAddFamilleAmort.Libelle === undefined
          ) {
            $("#nom").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddFamilleAmort.NumCompte === "" ||
            $scope.FormAddFamilleAmort.NumCompte === undefined
          ) {
            $("#NumCompte").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddFamilleAmort.Numordre === "" ||
            $scope.FormAddFamilleAmort.Numordre === undefined
          ) {
            $("#Numordre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.FormAddFamilleAmort.NumCompte != "") {
        $scope.trouve = "";
        for (var i = 0; i < $scope.listeDesNumComptes.length; i++) {
          if (
            $scope.FormAddFamilleAmort.NumCompte ==
            $scope.listeDesNumComptes[i].PL_NUMCOMPTE
          ) {
            $scope.trouve = "trouve";
            $scope.FormAddFamilleAmort.id =
              $scope.listeDesNumComptes[i].PL_CODENUMCOMPTE;
          }
        }
        if ($scope.trouve == "") {
          $scope.messageErreur = "Veuillez entrer un n° de compte correct.";
          $("#NumCompte").css("background-color", "#FFE9E0");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          $scope.$emit("UNLOAD");
        } else {
          if ($scope.etatForm == "2") {
            $scope.idtypepostebudget = $scope.recuperation.PS_CODESOUSPRODUIT;
            //  $scope.TYPEOPERATION = "";
            $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
          } else {
            // $scope.TYPEOPERATION = "";
            $scope.SL_LIBELLEMOUCHARD = "INSERTIONS";
          }

          if ($scope.idtypepostebudget == undefined) {
            $scope.idtypepostebudget = "";
          }

          $scope.objet_envoie = [
            {
              PS_CODESOUSPRODUIT: $scope.idtypepostebudget,
              NT_CODENATUREBIEN: "02",
              PS_LIBELLE: $scope.FormAddFamilleAmort.Libelle,
              PS_NUMEROORDRE: $scope.FormAddFamilleAmort.Numordre,
              PS_DUREEMINIMUM: "0",
              PS_DUREEMAXIMUM: "0",
              PS_AMORTISSEMENTDIRECT: "N",
              PS_AMORTISSEMENTBIEN: "N",
              PS_ACTIF: "O",
              PS_AMORTISSEMENTVALEURRESIDUELLEZERO: "0",
              PS_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              PL_CODENUMCOMPTE: $scope.FormAddFamilleAmort.id,
              PS_CODESOUSPRODUITCOMPTEAMORTISSEMENT: "",
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
              .post("/FamilleBienImmobilise/AjoutFBI/", $scope.objet_envoie, {
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
                  $scope.resetFormAddFamilleAmort();

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
              .post("/FamilleBienImmobilise/ModifFBI/", $scope.objet_envoie, {
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
                        "#/ParametreII/FamilleAmortissement/liste";
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
      }
    };
    //Fin ajout

    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpStypeFamilleAmort", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpStypeFamilleAmort")
      );
    };
    //fin voir plus

    //debut acceder a la page de modification 1
    $scope.voirModification = function (info) {
      sessionStorage.setItem("modifFamilleAmort", JSON.stringify(info));
      //  window.location.href = "#/ModificationsuiviDossierSP";
      window.location.href =
        "#/ParametreII/ModificationFamilleAmortissement/Modification";
    };
    //fin acceder a la page de modification 1

    //debut acceder a la page de modification 2
    $scope.retourModifODSP = function () {
      $scope.$emit("LOAD");
      $scope.etatForm = "2";
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("modifFamilleAmort")
      );
      $scope.FormAddFamilleAmort.Code = $scope.recuperer.PS_CODESOUSPRODUIT;
      $scope.FormAddFamilleAmort.Libelle = $scope.recuperer.PS_LIBELLE;
      $scope.FormAddFamilleAmort.NumCompte = $scope.recuperer.PL_NUMCOMPTE;
      $scope.FormAddFamilleAmort.Numordre = $scope.recuperer.PS_NUMEROORDRE;
      $scope.afficheListeNumCompte();
    };
    //fin acceder a la page de modification 2

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimeFamiiledAmortissement = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          PS_CODESOUSPRODUIT: $scope.idElement,
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
        .post("/FamilleBienImmobilise/SupprimerFBI/", $scope.objet_envoie, {
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
            $scope.listefamilleAmortissement[0].clsObjetRetour.SL_RESULTAT =
              "FALSE";
            setTimeout(function () {
              $scope.afficheListe();
            }, 3000);
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

    //affichage de la liste des sinstres
    $scope.afficheListe = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          NT_CODENATUREBIEN: "02",
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
        .post("/FamilleBienImmobilise/ListeFBI/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listefamilleAmortissement = reponse.data;
          $rootScope.infoBulleNombre = $scope.listefamilleAmortissement.length;
          $rootScope.listeOn =
            $scope.listefamilleAmortissement[0].clsObjetRetour.SL_MESSAGE;
          console.log($scope.listefamilleAmortissement);
          if (
            $scope.listefamilleAmortissement[0].clsObjetRetour.SL_RESULTAT ===
            "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listefamilleAmortissement[0].clsObjetRetour.SL_MESSAGE
            );
          }
        });
    };
    //fin

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.$emit("LOAD");
      $scope.libellesearch = "";

      $scope.$emit("UNLOAD");
    };
    //fin pour annuler la recherche

    /*FIN DEV OVER*/
  },
]);
