MapharApp.controller("CommerciauxController", [
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
    //FIN MODULE JS

    /*DEBUT ZONE DE DECLARATION*/

    $scope.FormAddCommerciaux = {
      Operateur: "",
      //"NumTiers": "",
      Denomination: "", 
      Siege: "",
      Description: "",
      Sexe: "",
      // "Profession": "",
      TypeTiers: "",
      DateNaissance: "",
      NatureTiers: "",
      Tva: "",
      Asdi: "",
      MontantCommission: "",
      //"TypeCompteAdd": "",
      NumCompte: "",
      NumCc: "",
      Gerant: "",
      SecteurActivite: "",
      //"casDutilisation": "",
      NumAgrement: "",
      RegimeImposition: "",
      Specialite: "",
      Pays: "",
      Ville: "",
      GroupeTiers: "",
      ZoneCommerciale: "",
      //"autorisationDescompte": "",
      Telephone: "",
      SiteWeb: "",
      Fax: "",
      Email: "",
      AdressePostale: "",
      Localisation: "",
      PL_CODENUMCOMPTE: "",
      img_avatar: [],
      img_signature: [],
    };
    $scope.FormListCommerciaux = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      NumTiers: "",
      denomination: "",
    };
    $scope.objet_envoie = [];
    $scope.listeCommerciaux = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeSexes = [];
    $scope.listeTypeDesTiers = [];
    $scope.listeTVA = [];
    $scope.listeASDI = [];
    //$scope.listeTypeCompteAdd = [];
    $scope.listeSecteurDActivite = [];
    //$scope.listeCasDUtilisation = [];
    $scope.listeRegimeDImposition = [];
    $scope.listeSpecialite = [];
    $scope.listeGroupeDesTiers = [];
    $scope.listeDesPays = [];
    $scope.listeOperateur = [];
    $scope.listeNatureTiers = [];
    $scope.listeZoneCommerciale = [];
    $scope.elmntSupprimerTiers = [];
    $scope.tabEngTiers = [];
    $scope.listeDesVilles = [];
    $scope.tabModifTiers = [];
    $scope.listeDesNumComptes = [];
    $scope.recupererInfo = {};
    $scope.SL_LIBELLEECRAN = "TIERS TIERS";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";
    $scope.etatForm = "";

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
        $("#idDateNaissance").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTelephone").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idFax").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumCompte").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idNumCC").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPlafondCred").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idAgrement").maxlength({
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

    //debut initialisation add tiers
    $scope.initFormAddCommerciaux = function () {
      $scope.verouVille = true;
      $scope.FormAddCommerciaux.Operateur =
        $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
      $scope.FormAddCommerciaux.Tva = "N";
      $scope.FormAddCommerciaux.Asdi = "N";
      $scope.afficheListeSexe();
      console.log($rootScope.PAYSPARDEFAUT)
      $scope.FormAddCommerciaux.Pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddCommerciaux.Ville = $rootScope.VILLEPARDEFAUT
    };
    //fin initialisation add tiers

    //debut initialisation modif
    $scope.initFormModifCommerciaux = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.afficheListeSexe();
    };
    //fin initialisation modif

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

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

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste Commerciaux
    $scope.afficheListeCommerciaux = function (
      periodeDu,
      periodeAu,
      NumTiers,
      denomination
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
        NumTiers === undefined ||
        denomination === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (NumTiers === "" || NumTiers === undefined) {
            $("#idNumTiers").css("background-color", "#FFE9E0");
          }
          if (denomination === "" || denomination === undefined) {
            $("#idDenomination").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeCommerciaux = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
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
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == false &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
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
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeCommerciaux = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeCommerciaux = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: NumTiers,
            TI_DENOMINATION: denomination,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "COMMERCIAL",
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
          .post("/LesTiers/ListeDesTiers/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeCommerciaux = reponse.data;
            $scope.nombreInfoBulle = $scope.listeCommerciaux.length;
            console.log($scope.listeCommerciaux);
            if (
              $scope.listeCommerciaux[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeCommerciaux[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste Commerciaux

    //debut voir plus
    $scope.voirPlusCommerciaux = function (info) {
      sessionStorage.setItem("vpCommerciaux", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpCommerciaux"));
      console.log($scope.recuperer);
    };
    //fin voir plus

    //debut annuler la recherche
    $scope.listeCommerciauxAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumTiers").css("background-color", "#FFFFFF");
        $("#idDenomination").css("background-color", "#FFFFFF");
      });
      $scope.FormListCommerciaux.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListCommerciaux.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListCommerciaux.NumTiers = "";
      $scope.FormListCommerciaux.denomination = "";
    };
    //debut annuler la recherche

    //debut acceder a la page de modification
    $scope.voirModifCommerciaux = function (info) {
      sessionStorage.setItem("modifCommerciaux", JSON.stringify(info));
      window.location.href = "#/gestion/modification/ModificationCommerciaux";
    };
    //debut acceder a la page de modification

    //debut liste des villes
    $scope.afficheListeVille = function (id) {
     // $scope.FormAddCommerciaux.Ville = "";
      if($scope.FormAddCommerciaux.Ville == undefined || $scope.FormAddCommerciaux.Ville == ""){
        $scope.FormAddCommerciaux.Ville = "";
      }
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
            $scope.afficheListeNatureTiers();
          }
        });
    };

    $scope.afficheListeVilleModif = function (id) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesVilles = reponse.data;
          if ($scope.listeDesVilles[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.verouVille = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVilles[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesVilles);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVilles[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes

    //debut pour recuperer l'id du tiers
    $scope.supprRecupererIdElement = function (id) {
      $scope.idElement = id;
    };
    //fin pour recuperer l'id du tiers

    //debut suppression du contrat
    $scope.supprimeCommerciaux = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          TI_IDTIERS: recupId,
          TYPEOPERATION: "2",
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDSUPPRESSION,
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
        .post("/LesTiers/SuppressionDesTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.elmntSupprimerTiers = reponse.data;
          if (
            $scope.elmntSupprimerTiers[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.elmntSupprimerTiers[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeCommerciaux[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.elmntSupprimerTiers[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.elmntSupprimerTiers[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin suppression du contrat

    //debut transformer l'image en base 64
    $scope.imgBase64 = function (elt) {
      if ($scope.formatImage == "image/png") {
        $scope.base64 = elt.replace("data:image/png;base64,", "");
      } else {
        $scope.base64 = elt.replace("data:image/jpeg;base64,", "");
      }
    };
    $scope.imgSignBase64 = function (elt) {
      $scope.signbase64 = elt.replace("data:image/jpeg;base64,", "");
    };
    //fin transformer l'image en base 64

    //debut focus sur le champ enregistrement
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#idOperateur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#idSexe").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        //$('#idProfession').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        $("#idTypeTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateNaissance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatureTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTva").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAsdi").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMontantCommission").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        //$('#idCompteAdd').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        $("#idNumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#idGerant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSecteurActivite").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        //$('#idCasUtil').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        //$('#idAgrement').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        //$('#idRegimeImpo').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        //$('#idSpecialite').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        $("#idPays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idGroupeTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idZoneCommerciale").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        //$('#idEscompte').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        $("#idTelephone").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        //$('#idSiteWeb').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        //$('#idFax').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        //$('#idEmail').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        //$('#idAdressePost').focusin(function () {
        //    $(this).css('background-color', '#FFFFFF')
        //})
        $("#idLocalisation").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ enregistrement

    //debut ajout du tiers
    $scope.TI_IDTIERS = "";
    $scope.TI_NUMTIERS = "";
    $scope.AjoutCommerciaux = function () {
      $scope.$emit("LOAD");
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifCommerciaux"));

      let typeNumerique = /^[0-9]+$/;
      let typeNbreAssure = /^[0-9]{1,2}$/;
      let typeMontant = /^[0-9]{1,15}$/;
      let typeNumeroTelephone = /^\d+$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typeAlphaNumerique = /^([a-z-A-Z])([a-z-A-Z0-9 ]+)/;
      let typeEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      $scope.desactiverChampRequisEnregistrement();

      if (
        $scope.FormAddCommerciaux.DateNaissance !== undefined &&
        $scope.FormAddCommerciaux.DateNaissance !== undefined
      ) {
        $scope.lAnnee = $scope.FormAddCommerciaux.DateNaissance.substr(6, 4);
        $scope.leMois = $scope.FormAddCommerciaux.DateNaissance.substr(3, 2);
        $scope.leJour = $scope.FormAddCommerciaux.DateNaissance.substr(0, 2);
      }

      if (
        $scope.FormAddCommerciaux.Operateur === "" ||
        $scope.FormAddCommerciaux.Operateur === undefined ||
        $scope.FormAddCommerciaux.Denomination === "" ||
        $scope.FormAddCommerciaux.Denomination === undefined ||
        $scope.FormAddCommerciaux.Sexe === "" ||
        $scope.FormAddCommerciaux.Sexe === undefined ||
        $scope.FormAddCommerciaux.TypeTiers === "" ||
        $scope.FormAddCommerciaux.TypeTiers === undefined ||
        $scope.FormAddCommerciaux.DateNaissance === "" ||
        $scope.FormAddCommerciaux.DateNaissance === undefined ||
        $scope.FormAddCommerciaux.NatureTiers === "" ||
        $scope.FormAddCommerciaux.NatureTiers === undefined ||
        $scope.FormAddCommerciaux.Tva === "" ||
        $scope.FormAddCommerciaux.Tva === undefined ||
        $scope.FormAddCommerciaux.Asdi === "" ||
        $scope.FormAddCommerciaux.Asdi === undefined ||
        $scope.FormAddCommerciaux.MontantCommission === "" ||
        $scope.FormAddCommerciaux.MontantCommission === undefined ||
        $scope.FormAddCommerciaux.NumCompte === "" ||
        $scope.FormAddCommerciaux.NumCompte === undefined ||
        $scope.FormAddCommerciaux.Gerant === "" ||
        $scope.FormAddCommerciaux.Gerant === undefined ||
        $scope.FormAddCommerciaux.SecteurActivite === "" ||
        $scope.FormAddCommerciaux.SecteurActivite === undefined ||
        $scope.FormAddCommerciaux.Pays === "" ||
        $scope.FormAddCommerciaux.Pays === undefined ||
        $scope.FormAddCommerciaux.Ville === "" ||
        $scope.FormAddCommerciaux.Ville === undefined ||
        $scope.FormAddCommerciaux.GroupeTiers === "" ||
        $scope.FormAddCommerciaux.GroupeTiers === undefined ||
        $scope.FormAddCommerciaux.ZoneCommerciale === "" ||
        $scope.FormAddCommerciaux.ZoneCommerciale === undefined ||
        $scope.FormAddCommerciaux.Telephone === "" ||
        $scope.FormAddCommerciaux.Telephone === undefined ||
        $scope.FormAddCommerciaux.Localisation === "" ||
        $scope.FormAddCommerciaux.Localisation === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddCommerciaux.Operateur === "" ||
            $scope.FormAddCommerciaux.Operateur === undefined
          ) {
            $("#idOperateur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.Denomination === "" ||
            $scope.FormAddCommerciaux.Denomination === undefined
          ) {
            $("#idDenomination").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddCommerciaux.Sexe === "" ||
            $scope.FormAddCommerciaux.Sexe === undefined
          ) {
            $("#idSexe").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.TypeTiers === "" ||
            $scope.FormAddCommerciaux.TypeTiers === undefined
          ) {
            $("#idTypeTiers").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.DateNaissance === "" ||
            $scope.FormAddCommerciaux.DateNaissance === undefined
          ) {
            $("#idDateNaissance").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.NatureTiers === "" ||
            $scope.FormAddCommerciaux.NatureTiers === undefined
          ) {
            $("#idNatureTiers").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.Tva === "" ||
            $scope.FormAddCommerciaux.Tva === undefined
          ) {
            $("#idTva").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.Asdi === "" ||
            $scope.FormAddCommerciaux.Asdi === undefined
          ) {
            $("#idAsdi").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.MontantCommission === "" ||
            $scope.FormAddCommerciaux.MontantCommission === undefined
          ) {
            $("#idMontantCommission").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.NumCompte === "" ||
            $scope.FormAddCommerciaux.NumCompte === undefined
          ) {
            $("#idNumCompte").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddCommerciaux.Gerant === "" ||
            $scope.FormAddCommerciaux.Gerant === undefined
          ) {
            $("#idGerant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.SecteurActivite === "" ||
            $scope.FormAddCommerciaux.SecteurActivite === undefined
          ) {
            $("#idSecteurActivite").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.Pays === "" ||
            $scope.FormAddCommerciaux.Pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.Ville === "" ||
            $scope.FormAddCommerciaux.Ville === undefined
          ) {
            $("#idVille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.GroupeTiers === "" ||
            $scope.FormAddCommerciaux.GroupeTiers === undefined
          ) {
            $("#idGroupeTiers").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.ZoneCommerciale === "" ||
            $scope.FormAddCommerciaux.ZoneCommerciale === undefined
          ) {
            $("#idZoneCommerciale").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.Telephone === "" ||
            $scope.FormAddCommerciaux.Telephone === undefined
          ) {
            $("#idTelephone").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCommerciaux.Localisation === "" ||
            $scope.FormAddCommerciaux.Localisation === undefined
          ) {
            $("#idLocalisation").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeDate.test($scope.FormAddCommerciaux.DateNaissance) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaissance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnnee) == true &&
        $scope.leMois == "02" &&
        $scope.leJour > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaissance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de naissance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnnee) == false &&
        $scope.leMois == "02" &&
        $scope.leJour > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaissance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de naissance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMois == "04" ||
          $scope.leMois == "06" ||
          $scope.leMois == "09" ||
          $scope.leMois == "11") &&
        $scope.leJour > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateNaissance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de naissance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeMontant.test($scope.FormAddCommerciaux.MontantCommission) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idMontantCommission").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumerique.test($scope.FormAddCommerciaux.NumCompte) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNumCompte").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un n° compte correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeNumeroTelephone.test($scope.FormAddCommerciaux.Telephone) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTelephone").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
          $scope.TI_IDTIERS = $scope.recuperer.TI_IDTIERS;
          $scope.TI_NUMTIERS = $scope.recuperer.TI_NUMTIERS;
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "MODIFICATION";
        } else {
          $scope.TYPEOPERATION = "0";
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "INSERTION";
        }
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            TI_IDTIERS: $scope.TI_IDTIERS,
            TI_NUMTIERS: $scope.TI_NUMTIERS,
            TI_IDTIERSPRINCIPAL: "",
            NT_CODENATURETYPETIERS: "05",
            NT_CODENATURETIERS: $scope.FormAddCommerciaux.NatureTiers,
            VL_CODEVILLE: $scope.FormAddCommerciaux.Ville,
            TI_SIEGE: "", //$scope.FormAddCommerciaux.Siege,
            SX_CODESEXE: $scope.FormAddCommerciaux.Sexe,
            FM_CODEFORMEJURIDIQUE: "",
            AC_CODEACTIVITE: $scope.FormAddCommerciaux.SecteurActivite,
            TP_CODETYPETIERS: $scope.FormAddCommerciaux.TypeTiers,
            TC_CODECOMPTETYPETIERS: "",
            TI_DATENAISSANCE: $scope.FormAddCommerciaux.DateNaissance,
            TI_DENOMINATION: $scope.FormAddCommerciaux.Denomination,
            TI_DESCRIPTIONTIERS: "", //$scope.FormAddCommerciaux.Description,
            TI_ADRESSEPOSTALE: $scope.FormAddCommerciaux.AdressePostale,
            TI_ADRESSEGEOGRAPHIQUE: $scope.FormAddCommerciaux.Localisation,
            TI_TELEPHONE: $scope.FormAddCommerciaux.Telephone,
            TI_FAX: $scope.FormAddCommerciaux.Fax,
            TI_SITEWEB: $scope.FormAddCommerciaux.SiteWeb,
            TI_EMAIL: $scope.FormAddCommerciaux.Email,
            TI_GERANT: $scope.FormAddCommerciaux.Gerant,
            TI_STATUT: "N",
            TI_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_ASDI: $scope.FormAddCommerciaux.Asdi,
            TI_TVA: $scope.FormAddCommerciaux.Tva,
            TI_STATUTDOUTEUX: "0",
            TI_PLAFONDCREDIT: $scope.FormAddCommerciaux.MontantCommission,
            TI_NUMCPTECONTIBUABLE: "", //$scope.FormAddCommerciaux.NumCc,
            OP_CODEOPERATEUR: $scope.FormAddCommerciaux.Operateur,
            TI_DATEDEPART: "01-01-1900",
            TI_PHOTO:
              $scope.base64 === undefined
                ? $scope.recupererInfo.TI_PHOTO
                : $scope.base64,
            TI_SIGNATURE:
              $scope.signbase64 === undefined
                ? $scope.recupererInfo.TI_SIGNATURE
                : $scope.signbase64,
            PL_NUMCOMPTE: $scope.FormAddCommerciaux.NumCompte,
            PL_CODENUMCOMPTE: $scope.FormAddCommerciaux.PL_CODENUMCOMPTE,
            TI_TAUXREMISE: "0",
            CU_CODECASUTILISATION: "",
            TI_NUMEROAGREMENT: $scope.FormAddCommerciaux.NumAgrement,
            TI_TAUXDECLARATION: "0",
            GP_CODEGROUPE: $scope.FormAddCommerciaux.GroupeTiers,
            TI_MANDATAIRE: "",
            TI_USAGER: "",
            IN_CODEINGREDIENT: "",
            TI_ESCOMPTE: "",
            ZN_CODEZONE: $scope.FormAddCommerciaux.ZoneCommerciale,
            RE_CODEREGIMEIMPOSITION: "", //$scope.FormAddCommerciaux.RegimeImposition,
            SP_CODESPECIALITE: "", //$scope.FormAddCommerciaux.Specialite,
            QU_CODEQUARTIER: "",
            PF_CODEPROFESSION: "",
            TI_LIEUNAISSANCE: "",
            TYPEOPERATION: $scope.TYPEOPERATION,
            PH_PHATIERS1: "",
            PH_PHATIERS2: "",
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
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
          .post("/LesTiers/AjoutDesTiers/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.tabEngTiers = reponse.data;
            console.log($scope.tabEngTiers);
            if ($scope.tabEngTiers[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.tabEngTiers[0].clsObjetRetour.SL_MESSAGE
              );
              if ($scope.etatForm == "2") {
                $scope.RetourSurListe = function () {
                  window.location.href = "#/gestion/liste/ListeCommerciaux";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.resetPage();
                window.location.reload();
              }
            } else if (
              $scope.tabEngTiers[0].clsObjetRetour.SL_MESSAGE ==
              "L'entrée n'est pas une chaîne Base 64 valide, car elle contient un caractère non-Base 64, plus de deux caractères de remplissage ou un caractère non conforme parmi les caractères de remplissage. "
            ) {
              $scope.$emit("UNLOAD");
              $scope.messageDErreur =
                "L'image de la photo ou de la signature est trop lourde";
              $rootScope.EnregistrementNonReussi($scope.messageDErreur);
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.tabEngTiers[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.tabEngTiers[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    //fin ajout du tiers

    //debut photo
    $scope.formatImagePhoto = "";
    $scope.previewPhoto = function (event) {
      var files = event.target.files;
      var file = files[files.length - 1];
      $scope.formatImagePhoto = file.type;
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.avatar = e.target.result;
          $scope.imgBase64($scope.avatar);
        });
      };
      reader.readAsDataURL(file);
    };
    $scope.formatImageSignature = "";
    $scope.previewSignature = function (event) {
      var files = event.target.files;
      var file = files[files.length - 1];
      $scope.formatImageSignature = file.type;
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.signature = e.target.result;
          $scope.imgSignBase64($scope.signature);
        });
      };
      reader.readAsDataURL(file);
    };
    //fin photo

    //debut liste des souscripteurs
    $scope.afficheNumCompte = function () {
      if ($scope.FormAddCommerciaux.numCompte == "") {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "CLIENT",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddIndivAccident.infoBeneficiaire.code3,
            TI_DENOMINATION:
              $scope.FormAddIndivAccident.infoBeneficiaire.nomAssureBenef,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDCOMBO,
            TYPEOPERATION: "CLIENT",
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];
      }
      $http
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSouscripteurs = reponse.data;
        });
    };
    //fin liste des souscripteurs

    $scope.leChargement = true;
    //debut liste des comptes
    $scope.afficheListeNumCompte = function () {
      $scope.leChargement = true;
      $scope.NC_CODENATURECOMPTE = "";
      /* switch ($scope.FormAddCommerciaux.TypeTiers) {
        case "001":
          $scope.NC_CODENATURECOMPTE = "03";
          break;
        case "002":
          $scope.NC_CODENATURECOMPTE = "04";
          break;
        default:
          $scope.NC_CODENATURECOMPTE = "";
      } */

      $scope.objet_envoie = [
        {
          //"PL_NUMCOMPTE": "",
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
      $(document).ready(function () {
        $("#idNumCompte").css("background-color", "#EDEDED");
      });
      $scope.FormAddCommerciaux.NumCompte = collection.PL_NUMCOMPTE;
      $scope.FormAddCommerciaux.PL_CODENUMCOMPTE = collection.PL_CODENUMCOMPTE;
      $scope.isDisabled1 = true;
    };
    //Fin choix d'un compte

    //debut reinitialiser la page
    $scope.resetPage = function () {
      $scope.FormAddCommerciaux = {};
      /* $scope.FormAddCommerciaux.Operateur = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR
      $scope.FormAddCommerciaux.Tva = "N"
      $scope.FormAddCommerciaux.Asdi = "N"*/
      $(document).ready(function () {
        $("#idOperateur").css("background-color", "#FFFFFF");
        $("#idDenomination").css("background-color", "#FFFFFF");

        $("#idSexe").css("background-color", "#FFFFFF");
        $("#idProfession").css("background-color", "#FFFFFF");
        $("#idTypeTiers").css("background-color", "#FFFFFF");
        $("#idDateNaissance").css("background-color", "#FFFFFF");
        $("#idNatTiers").css("background-color", "#FFFFFF");
        $("#idTva").css("background-color", "#FFFFFF");
        $("#idAsdi").css("background-color", "#FFFFFF");
        $("#idPlafondCred").css("background-color", "#FFFFFF");
        $("#idNumCompte").css("background-color", "#FFFFFF");
        $("#idGerant").css("background-color", "#FFFFFF");
        $("#idSecteurActivite").css("background-color", "#FFFFFF");
        $("#idAgrement").css("background-color", "#FFFFFF");
        $("#idRegimeImpo").css("background-color", "#FFFFFF");
        $("#idPays").css("background-color", "#FFFFFF");
        $("#idVille").css("background-color", "#FFFFFF");
        $("#idGroupeTiers").css("background-color", "#FFFFFF");
        $("#idEscompte").css("background-color", "#FFFFFF");
        $("#idTelephone").css("background-color", "#FFFFFF");
        $("#idEmail").css("background-color", "#FFFFFF");
        $("#idLocalisation").css("background-color", "#FFFFFF");
      });
      $("#idPhoto").attr("src", "");
      $("#idSignature").attr("src", "");
    };
    //fin reinitialiser la page

    // DEBUT COMBOS

    //debut liste sexes
    $scope.afficheListeSexe = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
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
        .post("/Sexe/ListeSexe/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeSexes = reponse.data;
          if ($scope.listeSexes[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeTypeTiers();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeSexes[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeSexes);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeSexes[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste sexes

    //debut liste type du tiers
    $scope.afficheListeTypeTiers = function () {
      $scope.objet_envoie = [
        {
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
        .post("/TypeDuTiers/ListeTypeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeDesTiers = reponse.data;
          if (
            $scope.listeTypeDesTiers[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeTva();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeDesTiers[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeDesTiers);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeDesTiers[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type du tiers

    //debut liste tva
    $scope.afficheListeTva = function () {
      $scope.objet_envoie = [
        {
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
        .post("/Tva/ListeTva/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTVA = reponse.data;
          if ($scope.listeTVA[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeAsdi();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTVA[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTVA);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTVA[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste tva

    //debut liste asdi
    $scope.afficheListeAsdi = function () {
      $scope.objet_envoie = [
        {
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
        .post("/Asdi/ListeAsdi/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeASDI = reponse.data;
          if ($scope.listeASDI[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeZoneCommerciale();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeASDI[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeASDI);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeASDI[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste asdi

    //debut liste ZoneCommerciale
    $scope.afficheListeZoneCommerciale = function () {
      $scope.objet_envoie = [
        {
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
        .post("/ZoneEditionCombo/ListeZoneEditionCombo/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeZoneCommerciale = reponse.data;
          if (
            $scope.listeZoneCommerciale[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeSecteurActivite();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeZoneCommerciale[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeZoneCommerciale);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeZoneCommerciale[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste ZoneCommerciale

    //debut liste secteur d'activite
    $scope.afficheListeSecteurActivite = function () {
      $scope.objet_envoie = [
        {
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
        .post("/SecteurActivite/ListeSecteurActivite/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeSecteurDActivite = reponse.data;
          if (
            $scope.listeSecteurDActivite[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeGroupeTiers();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeSecteurDActivite[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeSecteurDActivite);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeSecteurDActivite[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste secteur d'activite

    //debut liste regime d'imposition
    /* $scope.afficheListeRegimeImposition = function () {
      $scope.objet_envoie = [
        {
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
        .post("/RegimeImposition/ListeRegimeImposition/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeRegimeDImposition = reponse.data;
          if (
            $scope.listeRegimeDImposition[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeSpecialite();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeRegimeDImposition[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeRegimeDImposition);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeRegimeDImposition[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };*/
    //fin liste regime d'imposition

    //debut liste specialité
    /*$scope.afficheListeSpecialite = function () {
      $scope.objet_envoie = [
        {
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
        .post("/Specialite/ListeSpecialite/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeSpecialite = reponse.data;
          if ($scope.listeSpecialite[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeGroupeTiers();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeSpecialite[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeSpecialite);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeSpecialite[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };*/
    //fin liste specialité

    //debut liste groupe des tiers
    $scope.afficheListeGroupeTiers = function () {
      $scope.objet_envoie = [
        {
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
        .post("/GroupeTiers/ListeGroupeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeGroupeDesTiers = reponse.data;
          if (
            $scope.listeGroupeDesTiers[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeGroupeDesTiers[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeGroupeDesTiers);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeGroupeDesTiers[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste groupe des tiers

    //debut liste des pays
    $scope.afficheListePays = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
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
        .post("/Pays/ListePays/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesPays = reponse.data;
          if ($scope.listeDesPays[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeOperateur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPays[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPays);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPays[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

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
          if ($scope.listeOperateur[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            
            $scope.afficheListeVille($rootScope.PAYSPARDEFAUT);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeOperateur[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeOperateur);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeOperateur[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste operateur

    //debut liste nature tiers
    $scope.afficheListeNatureTiers = function () {
      $scope.objet_envoie = [
        {
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
        .post("/NatureTiers/ListeNatureDuTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeNatureTiers = reponse.data;
          if (
            $scope.listeNatureTiers[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifCommerciaux, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeNatureTiers[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeNatureTiers);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeNatureTiers[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste nature tiers

    //debut info sur la page de modification
    $scope.retourModifCommerciaux = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifCommerciaux")
      );
      console.log($scope.recupererInfo);
      $scope.FormAddCommerciaux.Operateur =
        $scope.recupererInfo.OP_CODEOPERATEUR;
      $scope.FormAddCommerciaux.Denomination =
        $scope.recupererInfo.TI_DENOMINATION;
      //$scope.FormAddCommerciaux.Siege = $scope.recupererInfo.TI_SIEGE;
      /* $scope.FormAddCommerciaux.Description =
        $scope.recupererInfo.TI_DESCRIPTIONTIERS;*/
      $scope.FormAddCommerciaux.Sexe = $scope.recupererInfo.SX_CODESEXE;
      $scope.FormAddCommerciaux.TypeTiers =
        $scope.recupererInfo.TP_CODETYPETIERS;
      $scope.FormAddCommerciaux.DateNaissance =
        $scope.recupererInfo.TI_DATENAISSANCE;
      $scope.FormAddCommerciaux.NatureTiers =
        $scope.recupererInfo.NT_CODENATURETIERS;
      $scope.FormAddCommerciaux.Tva = $scope.recupererInfo.TI_TVA;
      $scope.FormAddCommerciaux.Asdi = $scope.recupererInfo.TI_ASDI;
      $scope.FormAddCommerciaux.MontantCommission =
        $scope.recupererInfo.TI_PLAFONDCREDIT;
      $scope.FormAddCommerciaux.NumCompte = $scope.recupererInfo.PL_NUMCOMPTE;
      /* $scope.FormAddCommerciaux.NumCc =
        $scope.recupererInfo.TI_NUMCPTECONTIBUABLE;*/
      $scope.FormAddCommerciaux.Gerant = $scope.recupererInfo.TI_GERANT;
      $scope.FormAddCommerciaux.SecteurActivite =
        $scope.recupererInfo.AC_CODEACTIVITE;
      $scope.FormAddCommerciaux.NumAgrement =
        $scope.recupererInfo.TI_NUMEROAGREMENT;
      /* $scope.FormAddCommerciaux.RegimeImposition =
        $scope.recupererInfo.RE_CODEREGIMEIMPOSITION;*/
      /*  $scope.FormAddCommerciaux.Specialite =
        $scope.recupererInfo.SP_CODESPECIALITE;*/
      $scope.FormAddCommerciaux.Pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddCommerciaux.Ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddCommerciaux.GroupeTiers =
        $scope.recupererInfo.GP_CODEGROUPE;
      $scope.FormAddCommerciaux.ZoneCommerciale =
        $scope.recupererInfo.ZN_CODEZONE;
      $scope.FormAddCommerciaux.img_avatar = $scope.recupererInfo.TI_PHOTO;
      $scope.FormAddCommerciaux.img_signature =
        $scope.recupererInfo.TI_SIGNATURE;

      $scope.FormAddCommerciaux.Telephone = $scope.recupererInfo.TI_TELEPHONE;
      $scope.FormAddCommerciaux.SiteWeb = $scope.recupererInfo.TI_SITEWEB;
      $scope.FormAddCommerciaux.Fax = $scope.recupererInfo.TI_FAX;
      $scope.FormAddCommerciaux.Email = $scope.recupererInfo.TI_EMAIL;
      $scope.FormAddCommerciaux.AdressePostale =
        $scope.recupererInfo.TI_ADRESSEPOSTALE;
      $scope.FormAddCommerciaux.Localisation =
        $scope.recupererInfo.TI_ADRESSEGEOGRAPHIQUE;

      $scope.afficheListeVilleModif($scope.recupererInfo.PY_CODEPAYS);
    };
    //fin info sur la page de modification

    // FIN COMBOS

    /*FIN DEV JJ*/
  },
]);
