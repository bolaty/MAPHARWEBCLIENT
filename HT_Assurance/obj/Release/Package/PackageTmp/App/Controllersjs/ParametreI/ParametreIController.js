MapharApp.controller("ParametreIController", [
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
    console.log($rootScope.infoDeLoperateur);
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.DATE_EX_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    console.log($rootScope.DATE_EX_EXERCICE);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.objet_envoie = [];
    $scope.FormListEditionParametre = {
      ZoneOuCoordination: "",
      Succursales: "",
      TypeFournisseur: "",
      DateDebut: "",
      Datefin: "",
    };

    $scope.FormModifParametre = {
      code: "",
      libelle: "",
      MontantMin: "",
      MontantMax: "",
      Taux: "",
      Montant: "",
      valeur: "",
      numCompte: "",
    };

    $scope.listeTypeFournisseur = [];
    $scope.listeEditionParametre = [];
    $scope.listeDesZoneCombo = [];
    $scope.listeDesSuccursales = [];
    $scope.listeDestypefournisseur = [];
    $scope.RetourInsertedition = [];
    $scope.GriseZoneOuCoordination = false;
    $scope.GriseSuccursales = false;
    $scope.GriseTypeFournisseur = false;
    $scope.GriseDateDebut = false;
    $scope.GriseDatefin = false;
    $scope.indexlibetat = "";
    $scope.indexnometat = "";

    $scope.listeParametreI = [];
    $scope.listeDesNumComptes = [];
    $scope.listeDesNumComptes2 = [];
    $scope.etatForm = 2;
    $scope.updateparms = [];
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

    //debut initialisation FormListEditionParametre
    $scope.initFormListEditionParametre = function () {
      $scope.afficheListeZoneEditionCombo();
    };
    //fin initialisation FormListEditionParametre

    $scope.initLISTEParametreI = function () {
      $scope.etatForm = 2;
      $scope.afficheListeParametreI();
    };

    //debut affiche liste contrat
    $scope.afficheListeEditionParametre = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          ET_NOMGROUPE: "PARAMETRE",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          ET_AFFICHER: "O",
          OD_APERCU: "O",
          SL_LIBELLEECRAN: "EDITION",
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
        .post("/EditionListe/ListeEdition/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEditionParametre = reponse.data.reverse();
          console.log($scope.listeEditionParametre);
          if (
            $scope.listeEditionParametre[0].clsObjetRetour.SL_RESULTAT ===
            "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEditionParametre[0].clsObjetRetour.SL_MESSAGE
            );
          }
          $scope.$emit("UNLOAD");
        });
    };
    //fin affiche liste contrat

    //debut affiche liste ParameteI

    /*$scope.choixDeLigne = function (infoligne) {
  $scope.FormModifParametre = {
    code: infoligne.PP_CODEPARAMETRE,
    libelle: infoligne.PP_LIBELLE,
    MontantMin: infoligne.PP_MONTANTMINI,
    MontantMax: infoligne.PP_MONTANTMAXI,
    Taux: infoligne.PP_TAUX,
    Montant: infoligne.PP_MONTANT,
    valeur: infoligne.PP_VALEUR,
    numCompte: infoligne.PL_NUMCOMPTE
   
  };
}*/

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idZoneOuCoordination").css("background-color", "#FFFFFF");
        $("#idSuccursales").css("background-color", "#FFFFFF");
        $("#idTypeFournisseur").css("background-color", "#FFFFFF");
        $("#idDateDebut").css("background-color", "#FFFFFF");
        $("#idDateFin").css("background-color", "#FFFFFF");
      });
      $scope.FormListEditionParametre.ZoneOuCoordination = "";
      $scope.FormListEditionParametre.Succursales = "";
      $scope.FormListEditionParametre.TypeFournisseur = "";
      $scope.FormListEditionParametre.DateDebut = "";
      $scope.FormListEditionParametre.Datefin = "";
    };
    //fin pour annuler la recherche

    //debut choix de l'etat
    $scope.lIndex = "";
    $scope.choixEtat = function (idEtat, libEtat, nometat) {
      $scope.indexlibetat = libEtat;
      $scope.indexnometat = nometat;
      console.log($scope.indexlibetat);

      for (var i = 0; i < $scope.listeEditionParametre.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeEditionParametre.length; j++) {
        if (j == idEtat) {
          $scope.lIndex = idEtat;
          $("#idEtat" + idEtat).css("background-color", "beige");
          if (
            $scope.listeEditionParametre[j].ET_INDEX == "PAR_ENTREPOT" ||
            $scope.listeEditionParametre[j].ET_INDEX == "PAR_PARAMETRE"
          ) {
            $scope.GriseZoneOuCoordination = false;
            $scope.GriseSuccursales = false;
            $scope.FormListEditionParametre.ZoneOuCoordination =
              $scope.listeDesZoneCombo[2].ZN_CODEZONE;
            $scope.afficheListeSuccursales();
            $scope.GriseTypeFournisseur = true;
            $scope.GriseDateDebut = true;
            $scope.GriseDatefin = true;
          }
        }
      }
    };
    //fin choix de l'etat

    //debut liste des ZONE
    $scope.afficheListeZoneEditionCombo = function () {
      $scope.$emit("LOAD");
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
        .post("/ZoneEditionCombo/ListeZoneEditionCombo/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesZoneCombo = reponse.data;
          if (
            $scope.listeDesZoneCombo[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.afficheListeTypeFournisseur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesZoneCombo[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesZoneCombo);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesZoneCombo[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des ZONE

    //debut liste des Succursales
    $scope.afficheListeSuccursales = function () {
      $scope.objet_envoie = [
        {
          EX_EXERCICE: $rootScope.DATE_EX_EXERCICE,
          SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
          ZN_CODEZONE: $scope.FormListEditionParametre.ZoneOuCoordination,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
        .post("/ZoneEditionCombo/ListeSuccursales/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSuccursales = reponse.data;
          if (
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.FormListEditionParametre.Succursales =
              $scope.listeDesSuccursales[0].AG_CODEAGENCE;
          } else {
            $scope.FormListEditionParametre.Succursales = "";
          }
          console.log($scope.listeDesSuccursales);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesSuccursales[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des Succursales

    //debut liste des typefournisseur
    $scope.afficheListeTypeFournisseur = function () {
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
        .post("/ZoneEditionCombo/ListeTypeFournisseur/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDestypefournisseur = reponse.data;
          if (
            $scope.listeDestypefournisseur[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            setTimeout(() => {
              $scope.afficheListeEditionParametre();
            }, 10000);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDestypefournisseur[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDestypefournisseur);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDestypefournisseur[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des Succursales

    $scope.desactiverChampRquisEtat = function () {
      $("#idSuccursales").focusin(function () {
        $(this).css("background-color", "#FFFFFF");
      });
    };

    //debut liste des typefournisseur
    $scope.apercuEtat = function () {
      $scope.desactiverChampRquisEtat();
      $scope.$emit("LOAD");

      // choix entrepot
      if ($scope.indexlibetat == "PAR_ENTREPOT") {
        if (
          $scope.FormListEditionParametre.Succursales === "" ||
          $scope.FormListEditionParametre.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.ChampsNonRenseignes();
        } else {
          $scope.objet_envoie = [
            {
              ET_TYPEETAT: "01",
              SL_VALEURRETOURS: $scope.indexnometat,
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
            .post("/ZoneEditionCombo/Insertedition/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.RetourInsertedition = reponse.data;
              if (
                $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $http
                  .post(
                    "/ZoneEditionCombo/pvgAfficherEtat/",
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
                $rootScope.EnregistrementNonReussi();
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.RetourInsertedition[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }

      // choix parametre I
      if ($scope.indexlibetat == "PAR_PARAMETRE") {
        if (
          $scope.FormListEditionParametre.Succursales === "" ||
          $scope.FormListEditionParametre.Succursales === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idSuccursales").css("background-color", "#FFE9E0");
          $rootScope.ChampsNonRenseignes();
        } else {
          $scope.objet_envoie = [
            {
              ET_TYPEETAT: "PAR",
              SL_VALEURRETOURS: $scope.indexnometat,
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
              "/ZoneEditionCombo/InserteditionPARAMETRE1/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.RetourInsertedition = reponse.data;
              if (
                $scope.RetourInsertedition[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                console.log($scope.RetourInsertedition);
                $scope.$emit("UNLOAD");
                $http
                  .post(
                    "/ZoneEditionCombo/pvgAfficherEtat/",
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
                $rootScope.EnregistrementNonReussi();
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes("Veuillez sélectionner un état");
            });
        }
      }
    };

    //fin liste des Succursales

    // --------------- debut DEV bolaty------------------------

    //debut choix ligne
    $scope.lIndex = "";
    $scope.choixDeLigne = function (indexLigne, infoligne) {
      for (var i = 0; i < $scope.listeParametreI.length; i++) {
        $("#idEtat" + i).css("background-color", "white");
      }

      for (var j = 0; j < $scope.listeParametreI.length; j++) {
        if (j == indexLigne) {
          $scope.lIndex = indexLigne;
          $("#idEtat" + indexLigne).css("background-color", "beige");
        }
      }
      if (infoligne.PL_NUMCOMPTE == "" || infoligne.PL_NUMCOMPTE == undefined) {
        infoligne.PL_NUMCOMPTE = "0";
      }
      $scope.FormModifParametre = {
        code: infoligne.PP_CODEPARAMETRE,
        libelle: infoligne.PP_LIBELLE,
        MontantMin: infoligne.PP_MONTANTMINI,
        MontantMax: infoligne.PP_MONTANTMAXI,
        Taux: infoligne.PP_TAUX,
        Montant: infoligne.PP_MONTANT,
        valeur: infoligne.PP_VALEUR,
        numCompte: infoligne.PL_NUMCOMPTE,
      };
    };
    //fin choix ligne
    $scope.afficheListeNumCompte = function (numCompte) {
      $scope.leChargement = true;

      if (numCompte == undefined || numCompte == 0) {
        numCompte = "";
      }
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: numCompte,
          NC_CODENATURECOMPTE: "",
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.leChargement = false;
          $scope.listeDesNumComptes = reponse.data;
          $scope.etatForm = 0;
        });
    };

    $scope.choixNumCompte = function (infosouscr) {
      $scope.FormModifParametre.numCompte = infosouscr;
      $scope.etatForm = 2;
    };
    $scope.reset = function () {
      $scope.etatForm = 2;
    };

    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#modifParam_MontantMin").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#modifParam_MontantMax").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#modifParam_Montant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#modifParam_Taux").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    $scope.saveparm = function () {
      let typetaux = /^[0-9]\d*(,\d+)?$/;
      let typemontant = /^[0-9]{1,15}$/;
      $scope.MontantMin = parseInt($scope.FormModifParametre.MontantMax);
      $scope.MontantMax = parseInt($scope.FormModifParametre.Montant);
      $scope.Montant = parseInt($scope.FormModifParametre.MontantMax);
      $scope.valtaux = parseInt($scope.FormModifParametre.Taux);
      $scope.desactiverChampRquis();

      $scope.autoEnregist = 0;
      for (var jo = 0; jo < $scope.listeDesNumComptes2.length; jo++) {
        if (
          $scope.listeDesNumComptes2[jo].PL_NUMCOMPTE ==
          $scope.FormModifParametre.numCompte
        ) {
          $scope.autoEnregist = 1;
        }
      }

      if (
        $scope.FormModifParametre.MontantMin == undefined ||
        $scope.FormModifParametre.MontantMin == ""
      ) {
        $scope.FormModifParametre.MontantMin = 0;
      }
      if (
        $scope.FormModifParametre.MontantMax == undefined ||
        $scope.FormModifParametre.MontantMax == ""
      ) {
        $scope.FormModifParametre.MontantMax = 0;
      }
      if (
        $scope.FormModifParametre.Montant == undefined ||
        $scope.FormModifParametre.Montant == ""
      ) {
        $scope.FormModifParametre.Montant = 0;
      }
      if (
        $scope.FormModifParametre.valeur == undefined ||
        $scope.FormModifParametre.valeur == ""
      ) {
        $scope.FormModifParametre.valeur = "";
      }
      if (
        $scope.FormModifParametre.Taux == undefined ||
        $scope.FormModifParametre.Taux == ""
      ) {
        $scope.FormModifParametre.Taux = 0;
      }
      if (
        $scope.FormModifParametre.numCompte == undefined ||
        $scope.FormModifParametre.numCompte == ""
      ) {
        $scope.FormModifParametre.numCompte = 0;
      }
      if (
        $scope.FormModifParametre.code == undefined ||
        $scope.FormModifParametre.code == ""
      ) {
        $scope.FormModifParametre.code = "";
      }
      if (
        $scope.FormModifParametre.libelle == undefined ||
        $scope.FormModifParametre.libelle == ""
      ) {
        $scope.FormModifParametre.libelle = "";
      }

      if (typemontant.test($scope.FormModifParametre.MontantMin) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#modifParam_MontantMin").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un montant minimun correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormModifParametre.MontantMax) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#modifParam_MontantMax").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un montant maximum correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typemontant.test($scope.FormModifParametre.Montant) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#modifParam_Montant").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un montant correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typetaux.test($scope.FormModifParametre.Taux) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#modifParam_Taux").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un taux correcte ";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormModifParametre.numCompte != 0 &&
        $scope.autoEnregist == 0
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNumCompte").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Ce numero de compte n'existe pas";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormModifParametre.numCompte) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNumCompte").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un numero de compte correcte ";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.valtaux > 100) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#modifParam_Taux").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "le taux ne doit pas etre superieur a 100";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.objet_envoie = [
          {
            SO_CODESOCIETE: $rootScope.infoDeLoperateur[0].SO_CODESOCIETE,
            PP_CODEPARAMETRE: $scope.FormModifParametre.code,
            PP_LIBELLE: $scope.FormModifParametre.libelle,
            PP_MONTANTMINI: $scope.FormModifParametre.MontantMin,
            PP_MONTANTMAXI: $scope.FormModifParametre.MontantMax,
            PP_MONTANT: $scope.FormModifParametre.Montant,
            PP_TAUX: $scope.FormModifParametre.Taux,
            PP_VALEUR: $scope.FormModifParametre.valeur,
            PL_NUMCOMPTE: $scope.FormModifParametre.numCompte,
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
          .post("/ParametreI/UpdateParametreI/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.updateparms = reponse.data;
            if ($scope.updateparms[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.updateparms[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.FormModifParametre = {
                code: "",
                libelle: "",
                MontantMin: "",
                MontantMax: "",
                Taux: "",
                Montant: "",
                valeur: "",
                numCompte: "",
              };
              $scope.afficheListeParametreI();
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.updateparms[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testModificationOperateur[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };

    // DEBUT COMBOS

    $scope.afficheListeParametreI = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
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
        .post("/ParametreI/ListeParametreI/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeParametreI = reponse.data.reverse();
          if ($scope.listeParametreI[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeNumCompte2();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeParametreI[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeParametreI);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeParametreI[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    $scope.afficheListeNumCompte2 = function () {
      $scope.objet_envoie = [
        {
          PL_NUMCOMPTE: "",
          NC_CODENATURECOMPTE: "",
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
        .post("/NumCompte/ListeNumCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesNumComptes2 = reponse.data;
          if (
            $scope.listeDesNumComptes2[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesNumComptes2[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesNumComptes2);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesNumComptes2[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    // FIN COMBOS

    // --------------- fin DEV bolaty ------------------------
  },
]);
