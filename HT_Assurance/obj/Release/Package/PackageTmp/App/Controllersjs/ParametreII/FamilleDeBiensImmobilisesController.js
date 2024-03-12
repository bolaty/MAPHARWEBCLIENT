MapharApp.controller("FamilleDeBiensImmobilisesController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];

    //------------- plan / journal -----------------------------//
    $scope.ListeFBI = [];
    $scope.FormEnrgFBI = {
      Code: "",
      Nom: "",
      CodeNCompte: "",
      NCompte: "",
      DureeMin: "",
      DureeMax: "",
      AmortissementBien: "N",
      AmortissementDirect: "N",
      AmortissementResiduelle: "",
      NOrdre: "0",
    };
    $scope.etatFormFBI = "";
    $scope.tabEngFBI = [];
    $scope.listeDesNumComptes = [];
    $scope.recupererFBI = [];
    $scope.tabSupprFBI = [];
    $scope.cpt = 0;
    $scope.cpt1 = 0;
    //------------- plan / journal -----------------------------//

    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    $scope.collectionOperateur = angular.fromJson(
      localStorage.getItem("CollContratOperateur")
    );
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

    // DEBUT ANNEE BISSEXTILE
    $scope.anneeBissextile = function (annee) {
      if ((annee % 4 == 0 && annee % 100 !== 0) || annee % 400 == 0) {
        $scope.bissextile = true;
        return $scope.bissextile;
      } else {
        $scope.bissextile = false;
        return $scope.bissextile;
      }
    };

    //---------------- debut journal --------------------------------------------//

    // debut afficher la liste famille bien immobilisé
    $scope.afficheListeFBI = function () {
      $scope.$emit("LOAD");
      $scope.etatFormFBI = "";
      $scope.objet_envoie = [
        {
          NT_CODENATUREBIEN: "01",
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
          $scope.ListeFBI = reponse.data;
          $rootScope.infoBulleNombre = $scope.ListeFBI.length;
          $rootScope.listeOn = $scope.ListeFBI[0].clsObjetRetour.SL_CODEMESSAGE;
          if ($scope.ListeFBI[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.ListeFBI[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.ListeFBI);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.ListeFBI[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    // fin afficher la liste famille bien immobilisé

    // DEBUT COMBOS

    $scope.retourModifFBI = function () {
      $scope.$emit("LOAD");
      $scope.etatFormFBI = "2";
      $scope.recupererFBI = JSON.parse(
        sessionStorage.getItem("recupInfoModif")
      );

      $scope.FormEnrgFBI.Code = $scope.recupererFBI.PS_CODESOUSPRODUIT;
      $scope.FormEnrgFBI.Nom = $scope.recupererFBI.PS_LIBELLE;
      $scope.FormEnrgFBI.NCompte = $scope.recupererFBI.PL_NUMCOMPTE;
      $scope.FormEnrgFBI.CodeNCompte = $scope.recupererFBI.PL_CODENUMCOMPTE;
      $scope.FormEnrgFBI.DureeMin = $scope.recupererFBI.PS_DUREEMINIMUM;
      $scope.FormEnrgFBI.DureeMax = $scope.recupererFBI.PS_DUREEMAXIMUM;
      $scope.FormEnrgFBI.AmortissementBien =
        $scope.recupererFBI.PS_AMORTISSEMENTBIEN;
      $scope.FormEnrgFBI.AmortissementDirect =
        $scope.recupererFBI.PS_AMORTISSEMENTDIRECT;
      $scope.FormEnrgFBI.AmortissementResiduelle =
        $scope.recupererFBI.PS_AMORTISSEMENTVALEURRESIDUELLEZERO;
      $scope.FormEnrgFBI.NOrdre = $scope.recupererFBI.PS_NUMEROORDRE;

      if ($scope.FormEnrgFBI.AmortissementBien == "O") {
        $scope.cpt = 1;
      } else {
        $scope.cpt = 0;
      }
      if ($scope.FormEnrgFBI.AmortissementDirect == "O") {
        $scope.cpt1 = 1;
      } else {
        $scope.cpt1 = 0;
      }

      $scope.$emit("UNLOAD");
    };

    // FIN COMBOS

    // debut desactiver les champs du journal
    $scope.desactiverChampRequisFBI = function () {
      $(document).ready(function () {
        $("#Nom").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#NCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#DureeMin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#DureeMax").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#AmortissementResiduelle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#NOrdre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    // fin desactiver les champs du journal

    // debut enregistrement journal
    $scope.validerFBI = function () {
      $scope.$emit("LOAD");

      let typemontant = /^[0-9]{1,15}$/;
      $scope.desactiverChampRequisFBI();

      if (
        $scope.FormEnrgFBI.Nom === "" ||
        $scope.FormEnrgFBI.Nom === undefined ||
        $scope.FormEnrgFBI.NCompte === "" ||
        $scope.FormEnrgFBI.NCompte === undefined ||
        $scope.FormEnrgFBI.DureeMin === "" ||
        $scope.FormEnrgFBI.DureeMin === undefined ||
        $scope.FormEnrgFBI.DureeMax === "" ||
        $scope.FormEnrgFBI.DureeMax === undefined ||
        $scope.FormEnrgFBI.NOrdre === "" ||
        $scope.FormEnrgFBI.NOrdre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormEnrgFBI.Nom === "" ||
            $scope.FormEnrgFBI.Nom === undefined
          ) {
            $("#Nom").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgFBI.NCompte === "" ||
            $scope.FormEnrgFBI.NCompte === undefined
          ) {
            $("#NCompte").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgFBI.DureeMin === "" ||
            $scope.FormEnrgFBI.DureeMin === undefined
          ) {
            $("#DureeMin").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgFBI.DureeMax === "" ||
            $scope.FormEnrgFBI.DureeMax === undefined
          ) {
            $("#DureeMax").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormEnrgFBI.NOrdre === "" ||
            $scope.FormEnrgFBI.NOrdre === undefined
          ) {
            $("#NOrdre").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        parseInt($scope.FormEnrgFBI.DureeMin) >
        parseInt($scope.FormEnrgFBI.DureeMax)
      ) {
        $scope.messageErreur =
          "La durée min ne peut pas être superieure à la durée max";
        $scope.$emit("UNLOAD");
        $("#DureeMin").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormEnrgFBI.AmortissementResiduelle != "" &&
        $scope.FormEnrgFBI.AmortissementResiduelle != undefined &&
        typemontant.test($scope.FormEnrgFBI.AmortissementResiduelle) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $scope.$emit("UNLOAD");
        $("#AmortissementResiduelle").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormEnrgFBI.NCompte != "") {
        $scope.trouve = "";
        for (var i = 0; i < $scope.listeDesNumComptes.length; i++) {
          if (
            $scope.FormEnrgFBI.NCompte ==
            $scope.listeDesNumComptes[i].PL_NUMCOMPTE
          ) {
            $scope.trouve = "trouve";
          }
        }
        if ($scope.trouve == "") {
          $scope.messageErreur = "Veuillez entrer un n° de compte correct.";
          $("#NCompte").css("background-color", "#FFE9E0");
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          $scope.$emit("UNLOAD");
        } else {
          if ($scope.etatFormFBI == "2") {
            $scope.PS_CODESOUSPRODUIT = $scope.FormEnrgFBI.Code;
            $scope.appelServiceWeb = "ModifFBI";
          } else {
            $scope.PS_CODESOUSPRODUIT = "";
            $scope.appelServiceWeb = "AjoutFBI";
          }

          $scope.objet_envoie = [
            {
              PS_CODESOUSPRODUIT: $scope.PS_CODESOUSPRODUIT,
              NT_CODENATUREBIEN: "01",
              PS_LIBELLE: $scope.FormEnrgFBI.Nom,
              PS_NUMEROORDRE: $scope.FormEnrgFBI.NOrdre,
              PS_DUREEMINIMUM: $scope.FormEnrgFBI.DureeMin,
              PS_DUREEMAXIMUM: $scope.FormEnrgFBI.DureeMax,
              PS_AMORTISSEMENTBIEN: $scope.FormEnrgFBI.AmortissementBien,
              PS_AMORTISSEMENTDIRECT: $scope.FormEnrgFBI.AmortissementDirect,
              PS_ACTIF: "N",
              PS_AMORTISSEMENTVALEURRESIDUELLEZERO:
                $scope.FormEnrgFBI.AmortissementResiduelle,
              PS_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              PL_CODENUMCOMPTE: $scope.FormEnrgFBI.CodeNCompte,
              PS_CODESOUSPRODUITCOMPTEAMORTISSEMENT: "",
              SL_LIBELLEECRAN: "Famille bien immobilisés",
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
              "/FamilleBienImmobilise/" + $scope.appelServiceWeb,
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.tabEngFBI = reponse.data;
              if ($scope.tabEngFBI[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
                $rootScope.EnregistrementReussi(
                  $scope.tabEngFBI[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatFormFBI == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/parametre2/FamilleDeBiensImmobilises/liste";
                  };
                  $scope.$emit("UNLOAD");
                  setTimeout($scope.RetourSurListe, 3600);
                } else {
                  $scope.$emit("UNLOAD");
                  $scope.reinitialiser();
                }
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.tabEngFBI[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.tabEngFBI[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    // fin enregistrement journal

    // debut reinitialisation de la page
    $scope.reinitialiser = function () {
      // desactiver les champs marqués en rouge
      $("#Nom").css("background-color", "#FFFFFF");
      $("#NCompte").css("background-color", "#FFFFFF");
      $("#DureeMin").css("background-color", "#FFFFFF");
      $("#DureeMax").css("background-color", "#FFFFFF");
      $("#AmortissementResiduelle").css("css-color", "#FFFFFF");
      $("#NOrdre").css("background-color", "#FFFFFF");

      // vider les champs
      $scope.FormEnrgFBI = {};

      // les valeurs par defaut du numero ordre
      $scope.FormEnrgFBI.NOrdre = "0";
    };
    // fin reinitialisation de la page

    $scope.leChargement = true;
    //debut liste des comptes
    $scope.afficheListeNumCompte = function () {
      $scope.leChargement = true;

      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: $scope.FormEnrgFBI.NCompte,
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
          $scope.leChargement = false;
          $scope.listeDesNumComptes = reponse.data;
        });
    };
    //fin liste des comptes

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      $("#NCompte").css("background-color", "#FFFFFF");
      $scope.FormEnrgFBI.NCompte = collection.PL_NUMCOMPTE;
      $scope.FormEnrgFBI.CodeNCompte = collection.PL_CODENUMCOMPTE;
    };
    //Fin choix d'un compte

    $scope.cocheFBI = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.testValFBI = function (item) {
      if ($scope.cpt == 0) {
        $scope.FormEnrgFBI.AmortissementBien = "O";
        $scope.cpt++;
      } else {
        $scope.FormEnrgFBI.AmortissementBien = "N";
        $scope.cpt = 0;
      }
      console.log($scope.FormEnrgFBI.AmortissementBien);
    };

    $scope.cocheFBI1 = function (item) {
      if (item == "O") {
        return true;
      }
    };
    $scope.testValFBI1 = function (item) {
      if ($scope.cpt1 == 0) {
        $scope.FormEnrgFBI.AmortissementDirect = "O";
        $scope.cpt1++;
      } else {
        $scope.FormEnrgFBI.AmortissementDirect = "N";
        $scope.cpt1 = 0;
      }
      console.log($scope.FormEnrgFBI.AmortissementDirect);
    };

    // debut reinitialiser la page de journal
    $scope.reloadPageJournal = function () {
      $scope.FormEnrgFBI = {};
    };
    // fin reinitialiser la page de journal

    // les actions sur la liste
    $scope.voirPlus = function (infoliste) {
      sessionStorage.setItem("vpinfoliste", JSON.stringify(infoliste));
      $scope.recupererFBI = JSON.parse(sessionStorage.getItem("vpinfoliste"));
    };

    $scope.voirModification = function (recupinfoliste) {
      sessionStorage.setItem("recupInfoModif", JSON.stringify(recupinfoliste));
      window.location.href =
        "#/parametre2/familleDeBiensImmobilises/modification";
    };

    $scope.supprRecupererIdElement = function (id) {
      $scope.RecupererIdElement = id;
    };

    $scope.supprimerLigneFBI = function (id) {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          PS_CODESOUSPRODUIT: id,
          SL_LIBELLEECRAN: "Suppression famille bien immobilisés",
          SL_LIBELLEMOUCHARD: "DELETE",
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
          $scope.tabSupprFBI = reponse.data;
          if ($scope.tabSupprFBI[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.tabSupprFBI[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.afficheListeFBI();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.tabSupprFBI[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabSupprFBI[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    // les actions sur la liste

    //---------------- fin journal --------------------------------------------//
  },
]);
