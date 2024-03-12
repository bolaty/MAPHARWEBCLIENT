MapharApp.controller("SaisieAssureurController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.FormAddTiTiers = {
      operateur: "",
      numDuTiers: "",
      denomination: "",
      siege: "",
      description: "",
      sexe: "",
      profession: "",
      typeDuTiers: "",
      dateDeNaissance: "",
      natureTiers: "",
      tva: "",
      asdi: "",
      plafondCredit: "",
      typeCompteAdd: "",
      numCompte: "",
      numCc: "",
      gerant: "",
      secteurDactivite: "",
      casDutilisation: "",
      numAgremant: "",
      regimeDimposition: "",
      specialite: "",
      pays: "",
      ville: "",
      groupeDesTiers: "",
      autorisationDescompte: "",
      telephone: "",
      siteWeb: "",
      fax: "",
      email: "",
      adressePostale: "",
      localisation: "",
      PL_CODENUMCOMPTE: "",
      img_avatar: [],
      img_signature: [],
    };
    $scope.FormListTiTiers = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numDuTiers: "",
      denomination: "",
    };
    $scope.objet_envoie = [];
    $scope.listeTiTiers = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeSexes = [];
    $scope.listeTypeDesTiers = [];
    $scope.listeTVA = [];
    $scope.listeASDI = [];
    $scope.listeTypeCompteAdd = [];
    $scope.listeSecteurDActivite = [];
    $scope.listeCasDUtilisation = [];
    $scope.listeRegimeDImposition = [];
    $scope.listeSpecialite = [];
    $scope.listeGroupeDesTiers = [];
    $scope.listeDesPays = [];
    $scope.listeOperateur = [];
    $scope.listeNatureTiers = [];
    $scope.listeProfession = [];
    $scope.elmntSupprimerTiers = [];
    $scope.tabEngTiers = [];
    $scope.listeDesVilles = [];
    $scope.tabModifTiers = [];
    $scope.listeDesNumComptes = [];
    $scope.tabDepartTiers = [];
    $scope.recupererInfo = {};
    $scope.SL_LIBELLEECRAN = "TIERS TIERS";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";

    /*FIN ZONE DE DECLARATION*/
    //declaration

    $scope.idElement = "";
    $scope.tableauimage = [];
    $scope.tableauimage2 = [];
    $scope.tabEngReglement = [];
    $scope.newtab = [];
    var reader = {};
    $scope.imagememoire = "";
    var image = {};
    $scope.idimagcheque = "";
    $scope.pretACharger1 = false;

    $scope.idElements = "";
    $scope.tableauimages = [];
    $scope.tableauimages2 = [];
    $scope.tabEngReglements = [];
    $scope.newtabs = [];
    var readers = {};
    $scope.imagememoires = "";
    var images = {};
    $scope.idimagcheques = "";
    $scope.pretACharger2 = false;

    $scope.listephotoprospect = [];
    $scope.etatForm = "";
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
    $scope.initFormAddTiTiers = function () {
      $scope.FormAddTiTiers.tva = "N";
      $scope.FormAddTiTiers.asdi = "N";
      $scope.FormAddTiTiers.autorisationDescompte = "N";
      $scope.verouVille = true;
      $scope.verouNumTiers = true;
      $scope.afficheListeTypeTiers();
    };
    //fin initialisation add tiers

    //debut initialisation modif tiers
    $scope.initFormModifTiTiers = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.verouNumTiers = true;
      $scope.afficheListeTypeTiers();
    };
    //fin initialisation modif tiers

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut contrainte sur les champs add de tiers
    $scope.contrainteFormListTiTiers = function () {
      FormValidation.formValidation(document.getElementById("idListTiTiers"), {
        fields: {
          listTiTiers_PeriodeDu: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code.",
              },
              regexp: {
                regexp:
                  /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une date correcte.",
              },
            },
          },
          listTiTiers_PeriodeAu: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le nom de l'assuré.",
              },
              regexp: {
                regexp:
                  /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une date correcte.",
              },
            },
          },
          listTiTiers_NumDuTiers: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l'adresse.",
              },
              numeric: {
                message: "Veuillez saisir un numéro correct.",
              },
            },
          },
          listTiTiers_denomination: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l'adresse.",
              },
              numeric: {
                message: "Veuillez saisir un numéro correct.",
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
          //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
      });
    };
    //fin contrainte sur les champs add de tiers

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

    //debut afficher liste tiers
    $scope.afficheListeAssureur = function (
      periodeDu,
      periodeAu,
      numDuTiers,
      nomDuTiers
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
        numDuTiers === undefined ||
        nomDuTiers === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numDuTiers === "" || numDuTiers === undefined) {
            $("#idNumTiers").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeTiTiers = "";
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
        $scope.listeTiTiers = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeTiTiers = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            // TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE1: $scope.FormListTiTiers.periodeDu,
            // TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_DATESAISIE2: $scope.FormListTiTiers.periodeAu,
            TI_NUMTIERS: numDuTiers,
            TI_DENOMINATION: nomDuTiers,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "ASSUREUR",
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
            $scope.listeTiTiers = reponse.data;
            $scope.nombreInfoBulle = $scope.listeTiTiers.length;
            console.log($scope.listeTiTiers);
            if ($scope.listeTiTiers[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeTiTiers[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste tiers

    //debut voir plus
    $scope.voirPlusTiTiers = function (info) {
      sessionStorage.setItem("vpTiTiers", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpTiTiers"));
      console.log($scope.recuperer);
      $scope.afficheListeProspectPhotoliste($scope.recuperer.TI_IDTIERS);
    };
    //fin voir plus

    //debut annuler la recherche
    $scope.listeTiTiersAnnuler = function () {
      $scope.FormListTiTiers.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListTiTiers.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListTiTiers.numDuTiers = "";
      $scope.FormListTiTiers.denomination = "";
    };
    //debut annuler la recherche

    //debut acceder a la page de modification
    $scope.voirModifDesTiers = function (info) {
      sessionStorage.setItem("modifTiTiers", JSON.stringify(info));
      window.location.href = "#/gestion/modification/saisieAssurances";
    };
    //debut acceder a la page de modification
    $scope.afficheListeProspectPhoto = function (idprospect) {
      $scope.tableauimage = [];
      $scope.tableauimage2 = [];
      $scope.tableauimages = [];
      $scope.tableauimages2 = [];
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_IDTIERS: idprospect,
          SL_LIBELLEECRAN: "Saisie de Continent",
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
        .post("/ProspectPhoto/ListePhototiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listephotoprospect = reponse.data;
          $scope.tableauimage.push($scope.listephotoprospect[0].TI_PHOTO);
          $scope.tableauimage2.push(
            "data:image/jpeg;base64," + $scope.listephotoprospect[0].TI_PHOTO
          );
          $scope.tableauimages.push($scope.listephotoprospect[0].TI_SIGNATURE);
          $scope.tableauimages2.push(
            "data:image/jpeg;base64," +
              $scope.listephotoprospect[0].TI_SIGNATURE
          );
          setTimeout(function () {
            $scope.afficherimage();
            $scope.afficherimages();
          }, 3000);
        });
    };
    $scope.afficheListeProspectPhotoliste = function (idprospect) {
      $scope.tableauimage = [];
      $scope.tableauimage2 = [];
      $scope.tableauimages = [];
      $scope.tableauimages2 = [];
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_IDTIERS: idprospect,
          SL_LIBELLEECRAN: "Saisie de Continent",
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
        .post("/ProspectPhoto/ListePhototiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listephotoprospect = reponse.data;
          $scope.tableauimage.push($scope.listephotoprospect[0].TI_PHOTO);
          $scope.tableauimage2.push(
            "data:image/jpeg;base64," + $scope.listephotoprospect[0].TI_PHOTO
          );
          $scope.tableauimages.push($scope.listephotoprospect[0].TI_SIGNATURE);
          $scope.tableauimages2.push(
            "data:image/jpeg;base64," +
              $scope.listephotoprospect[0].TI_SIGNATURE
          );
          setTimeout(function () {
            $scope.afficherimagelist1();
            $scope.afficherimagelist2();
          }, 3000);
        });
    };
    $scope.afficherimagelist1 = function () {
      var templathtml = "";
      var elmnt = document.getElementById("boucleimg");
      elmnt.innerHTML = "";
      for (i = 0; $scope.tableauimage2.length > i; i++) {
        templathtml +=
          '<td><img src="' +
          $scope.tableauimage2[i] +
          '" height=' +
          100 +
          " /></td>";
      }

      elmnt.innerHTML = templathtml;
    };

    $scope.afficherimagelist2 = function () {
      var templathtmls = "";
      var elmnts = document.getElementById("boucleimg2");
      elmnts.innerHTML = "";
      for (i = 0; $scope.tableauimages2.length > i; i++) {
        templathtmls +=
          '<td><img src="' +
          $scope.tableauimages2[i] +
          '" height=' +
          100 +
          " /></td>";
      }

      elmnts.innerHTML = templathtmls;
    };

    //debut liste des villes
    $scope.afficheListeVille = function (id) {
      $scope.FormAddTiTiers.ville = "";
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

    //debut pour recuperer l'id du tiers
    $scope.departIdElement = function (id) {
      $scope.idElement = id;
    };
    //fin pour recuperer l'id du tiers

    //debut suppression du contrat
    $scope.supprimeTiers = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          TI_IDTIERS: recupId,
          TYPEOPERATION: "",
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
            $scope.listeTiTiers[0].clsObjetRetour.SL_RESULTAT = "FALSE";
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

    //debut suppression du contrat
    $scope.departTiers = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_IDTIERS: recupId,
          TI_DATEDEPART: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
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
        .post("/LesTiers/DepartDesTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabDepartTiers = reponse.data;
          if ($scope.tabDepartTiers[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.tabDepartTiers[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeTiTiers[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.tabDepartTiers[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabDepartTiers[0].clsObjetRetour.SL_MESSAGE
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
        $("#idNumTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idGroupeTiers").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTelephone").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAdressePost").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idEmail").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ enregistrement

    //debut ajout du tiers
    $scope.validerFormTiers = function () {
      let statutphoto = document.querySelector("#upload").files;
      let statutsignature = document.querySelector("#upload2").files;

      if (statutphoto.length != 0 && $scope.pretACharger1 == false) {
        $scope.messageErreur = "Veuillez renseigner une photo correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (statutsignature.length != 0 && $scope.pretACharger2 == false) {
        $scope.messageErreur = "Veuillez renseigner une signature correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.$emit("LOAD");
        $scope.recuperer = JSON.parse(sessionStorage.getItem("modifTiTiers"));

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
          $scope.FormAddTiTiers.dateDeNaissance !== undefined &&
          $scope.FormAddTiTiers.dateDeNaissance !== undefined
        ) {
          $scope.lAnnee = $scope.FormAddTiTiers.dateDeNaissance.substr(6, 4);
          $scope.leMois = $scope.FormAddTiTiers.dateDeNaissance.substr(3, 2);
          $scope.leJour = $scope.FormAddTiTiers.dateDeNaissance.substr(0, 2);
        }

        if (
          $scope.FormAddTiTiers.operateur === "" ||
          $scope.FormAddTiTiers.operateur === undefined ||
          $scope.FormAddTiTiers.denomination === "" ||
          $scope.FormAddTiTiers.denomination === undefined ||
          $scope.FormAddTiTiers.typeDuTiers === "" ||
          $scope.FormAddTiTiers.typeDuTiers === undefined ||
          $scope.FormAddTiTiers.groupeDesTiers === "" ||
          $scope.FormAddTiTiers.groupeDesTiers === undefined ||
          $scope.FormAddTiTiers.numCompte === "" ||
          $scope.FormAddTiTiers.numCompte === undefined ||
          $scope.FormAddTiTiers.email === "" ||
          $scope.FormAddTiTiers.email === undefined ||
          $scope.FormAddTiTiers.telephone === "" ||
          $scope.FormAddTiTiers.telephone === undefined
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            if (
              $scope.FormAddTiTiers.operateur === "" ||
              $scope.FormAddTiTiers.operateur === undefined
            ) {
              $("#idOperateur").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddTiTiers.denomination === "" ||
              $scope.FormAddTiTiers.denomination === undefined
            ) {
              $("#idDenomination").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddTiTiers.typeDuTiers === "" ||
              $scope.FormAddTiTiers.typeDuTiers === undefined
            ) {
              $("#idTypeTiers").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddTiTiers.groupeDesTiers === "" ||
              $scope.FormAddTiTiers.groupeDesTiers === undefined
            ) {
              $("#idGroupeTiers").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddTiTiers.numCompte === "" ||
              $scope.FormAddTiTiers.numCompte === undefined
            ) {
              $("#idNumCompte").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddTiTiers.telephone === "" ||
              $scope.FormAddTiTiers.telephone === undefined
            ) {
              $("#idTelephone").css("background-color", "#FFE9E0");
            }
            if (
              $scope.FormAddTiTiers.email === "" ||
              $scope.FormAddTiTiers.email === undefined
            ) {
              $("#idEmail").css("background-color", "#FFE9E0");
            }
          });
          $rootScope.ChampsNonRenseignes();
        } else if (
          typeNumerique.test($scope.FormAddTiTiers.numCompte) == false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idNumCompte").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur = "Veuillez renseigner un n° compte correct";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          typeNumeroTelephone.test($scope.FormAddTiTiers.telephone) == false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idTelephone").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "Veuillez renseigner un numéro téléphone correct";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (typeEmail.test($scope.FormAddTiTiers.email) == false) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#idEmail").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur = "Veuillez renseigner une adresse email correcte";
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
              NT_CODENATURETYPETIERS: "10",
              NT_CODENATURETIERS: "002",
              VL_CODEVILLE: "",
              TI_SIEGE: "", //$scope.FormAddTiTiers.siege,
              SX_CODESEXE: "",
              FM_CODEFORMEJURIDIQUE: "",
              AC_CODEACTIVITE: "",
              TP_CODETYPETIERS: $scope.FormAddTiTiers.typeDuTiers,
              TC_CODECOMPTETYPETIERS: "", //$scope.FormAddTiTiers.typeCompteAdd,
              TI_DATENAISSANCE: "01-01-1900",
              TI_DENOMINATION: $scope.FormAddTiTiers.denomination,
              TI_DESCRIPTIONTIERS: "", //$scope.FormAddTiTiers.description,
              TI_ADRESSEPOSTALE: $scope.FormAddTiTiers.adressePostale,
              TI_ADRESSEGEOGRAPHIQUE: "",
              TI_TELEPHONE: $scope.FormAddTiTiers.telephone,
              TI_FAX: "",
              TI_SITEWEB: "",
              TI_EMAIL: $scope.FormAddTiTiers.email,
              TI_GERANT: "",
              TI_STATUT: "N",
              TI_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              TI_ASDI: "N",
              TI_TVA: "N",
              TI_STATUTDOUTEUX: "0",
              TI_PLAFONDCREDIT: "0",
              TI_NUMCPTECONTIBUABLE: "", //$scope.FormAddTiTiers.numCc,
              OP_CODEOPERATEUR: $scope.FormAddTiTiers.operateur,
              TI_DATEDEPART: "01-01-1900",
              TI_NUMEROAXA: "",
              TI_PHOTO: $scope.tableauimage[0],
              /* $scope.base64 === undefined
                  ? $scope.recupererInfo.TI_PHOTO
                  : $scope.base64*/ TI_SIGNATURE: $scope.tableauimages[0],
              /* $scope.signbase64 === undefined
                  ? $scope.recupererInfo.TI_SIGNATURE
                  : $scope.signbase64*/ PL_NUMCOMPTE:
                $scope.FormAddTiTiers.numCompte,
              PL_CODENUMCOMPTE: $scope.FormAddTiTiers.PL_CODENUMCOMPTE,
              TI_TAUXREMISE: "0",
              CU_CODECASUTILISATION: "", //$scope.FormAddTiTiers.casDutilisation,
              TI_NUMEROAGREMENT: "",
              TI_TAUXDECLARATION: "0",
              GP_CODEGROUPE: $scope.FormAddTiTiers.groupeDesTiers,
              TI_MANDATAIRE: "",
              TI_USAGER: "",
              IN_CODEINGREDIENT: "",
              TI_ESCOMPTE: "",
              ZN_CODEZONE: "",
              RE_CODEREGIMEIMPOSITION: "", //$scope.FormAddTiTiers.regimeDimposition,
              SP_CODESPECIALITE: "", //$scope.FormAddTiTiers.specialite,
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
                    window.location.href = "#/gestion/liste/saisieAssureurs";
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
      if ($scope.FormAddTiTiers.numCompte == "") {
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
      switch ($scope.FormAddTiTiers.typeDuTiers) {
        case "001":
          $scope.NC_CODENATURECOMPTE = "03";
          break;
        case "002":
          $scope.NC_CODENATURECOMPTE = "04";
          break;
        default:
          $scope.NC_CODENATURECOMPTE = "";
      }

      $scope.objet_envoie = [
        {
          //"PL_NUMCOMPTE": "",
          NC_CODENATURECOMPTE: $scope.NC_CODENATURECOMPTE,
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
      $scope.FormAddTiTiers.numCompte = collection.PL_NUMCOMPTE;
      $scope.FormAddTiTiers.PL_CODENUMCOMPTE = collection.PL_CODENUMCOMPTE;
      $scope.isDisabled1 = true;
    };
    //Fin choix d'un compte

    $scope.process = function () {
      let file = document.querySelector("#upload").files;
      // let fichier = document.querySelector('input[type=file]').files;

      var readAndPreview = function (file) {
        // Veillez à ce que `file.name` corresponde à nos critères d’extension
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          $scope.pretACharger1 = true;
          $scope.tableauimage = [];
          $scope.tableauimage2 = [];
          // $scope.imga = ""
          reader = new FileReader();
          var tbsl = [];
          reader.addEventListener(
            "load",
            function () {
              image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              if ($scope.etatForm == 2) {
                $scope.tableauimage2.push(image.src);
              } else {
                $scope.tableauimage2.push(image.src);
              }

              // $scope.imga = image.src;
              $scope.afficherimage();
              tbsl = this.result.split(",");
              $scope.tableauimage.push(tbsl[1]);
              console.log($scope.tableauimage);
              // preview.appendChild(image);
            },
            false
          );

          reader.readAsDataURL(file);
          // localStorage.setItem("infoimg", JSON.stringify(reader.result));
          //console.log($scope.tableauimage)
        } else {
          $scope.messageErreur = "format du fichier invalid !!!";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
      };

      if (file) {
        [].forEach.call(file, readAndPreview);
      }

      document.getElementById("upload").value = "";
    };
    $(document).on("click", ".tdsuppr", function () {
      $(this).data("id");
      $scope.recupsuprimg($(this).data("id"));
      console.log($(this).data("id"));
    });

    $scope.afficherimage = function () {
      if ($scope.etatForm == 2) {
        // $scope.tableauimage2 =[]

        var templathtmlsuppr = "";
        var templathtml = "";
        var elmnt = document.getElementById("boucleimg");
        elmnt.innerHTML = "";
        var elmntsuppr = document.getElementById("boucleimgsuppr");
        elmntsuppr.innerHTML = "";
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          templathtml +=
            '<td><img src="' +
            $scope.tableauimage2[i] +
            '" height=' +
            100 +
            " /></td>";
          templathtmlsuppr +=
            '<td class="tdsuppr" data-id="' +
            i +
            '"><button class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="#modalsurpp">Supprimer</button></td>';
        }

        elmnt.innerHTML = templathtml;
        elmntsuppr.innerHTML = templathtmlsuppr;
      } else {
        var templathtmlsuppr = "";
        var templathtml = "";
        var elmnt = document.getElementById("boucleimg");
        elmnt.innerHTML = "";
        var elmntsuppr = document.getElementById("boucleimgsuppr");
        elmntsuppr.innerHTML = "";
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          templathtml +=
            '<td><img src="' +
            $scope.tableauimage2[i] +
            '" height=' +
            100 +
            " /></td>";
          templathtmlsuppr +=
            '<td class="tdsuppr" data-id="' +
            i +
            '"><button class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="#modalsurpp">Supprimer</button></td>';
        }

        elmnt.innerHTML = templathtml;
        elmntsuppr.innerHTML = templathtmlsuppr;
      }
    };

    $scope.recupsuprimg = function (lien) {
      $scope.idimagcheque = lien;
    };
    $scope.suprimg = function () {
      if ($scope.etatForm == 2) {
        var tbsll = [];
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage2.splice(i, 1);
          }
        }

        for (i = 0; $scope.tableauimage.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage.splice(i, 1);
          }
        }

        $scope.afficherimage();
      } else {
        var tbsll = [];
        for (i = 0; $scope.tableauimage2.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage2.splice(i, 1);
          }
        }

        for (i = 0; $scope.tableauimage.length > i; i++) {
          if ($scope.idimagcheque == i) {
            $scope.tableauimage.splice(i, 1);
          }
        }
        $scope.afficherimage();
      }
    };

    $scope.process2 = function () {
      let filess = document.querySelector("#upload2").files;

      var readAndPreviews = function (filess) {
        // Veillez à ce que `file.name` corresponde à nos critères d’extension
        if (/\.(jpe?g|png|gif)$/i.test(filess.name)) {
          $scope.pretACharger2 = true;
          $scope.tableauimages = [];
          $scope.tableauimages2 = [];
          // $scope.imgas = ""
          readers = new FileReader();
          var tbsls = [];
          readers.addEventListener(
            "load",
            function () {
              images = new Image();
              images.height = 100;
              images.title = filess.name;
              images.src = this.result;
              if ($scope.etatForm == 2) {
                $scope.tableauimages2.push(images.src);
              } else {
                $scope.tableauimages2.push(images.src);
              }

              $scope.afficherimages();
              tbsls = this.result.split(",");
              $scope.tableauimages.push(tbsls[1]);
              console.log($scope.tableauimages);
            },
            false
          );

          readers.readAsDataURL(filess);
        } else {
          $scope.messageErreur =
            "Format de fichier non prit en charge. Veuillez selectionner des images au format PNG ou JPEG ou JPG";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
      };

      if (filess) {
        [].forEach.call(filess, readAndPreviews);
      }

      document.getElementById("upload2").value = "";
    };

    $(document).on("click", ".tdsuppr2", function () {
      $(this).data("id");
      $scope.recupsuprimg2($(this).data("id"));
      console.log($(this).data("id"));
    });

    $scope.afficherimages = function () {
      if ($scope.etatForm == 2) {
        var templathtmlsupprs = "";
        var templathtmls = "";
        var elmnts = document.getElementById("boucleimg2");
        elmnts.innerHTML = "";
        var elmntsupprs = document.getElementById("boucleimgsuppr2");
        elmntsupprs.innerHTML = "";
        for (i = 0; $scope.tableauimages2.length > i; i++) {
          templathtmls +=
            '<td><img src="' +
            $scope.tableauimages2[i] +
            '" height=' +
            100 +
            " /></td>";
          templathtmlsupprs +=
            '<td class="tdsupprs" data-id="' +
            i +
            '"><button class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="#modalsurpp2">Supprimer</button></td>';
        }

        elmnts.innerHTML = templathtmls;
        elmntsupprs.innerHTML = templathtmlsupprs;
      } else {
        var templathtmlsupprs = "";
        var templathtmls = "";
        var elmnts = document.getElementById("boucleimg2");
        elmnts.innerHTML = "";
        var elmntsupprs = document.getElementById("boucleimgsuppr2");
        elmntsupprs.innerHTML = "";
        for (i = 0; $scope.tableauimages2.length > i; i++) {
          templathtmls +=
            '<td><img src="' +
            $scope.tableauimages2[i] +
            '" height=' +
            100 +
            " /></td>";
          templathtmlsupprs +=
            '<td class="tdsupprs" data-id="' +
            i +
            '"><button class="btn btn-danger font-weight-bold" data-toggle="modal" data-target="#modalsurpp2">Supprimer</button></td>';
        }

        elmnts.innerHTML = templathtmls;
        elmntsupprs.innerHTML = templathtmlsupprs;
      }
    };
    $scope.recupsuprimg2 = function (lien) {
      $scope.idimagcheques = lien;
    };

    $scope.suprimg2 = function () {
      if ($scope.etatForm == 2) {
        var tbslls = [];
        for (i = 0; $scope.tableauimages2.length > i; i++) {
          if ($scope.idimagcheques == i) {
            $scope.tableauimages2.splice(i, 1);
          }
        }

        for (i = 0; $scope.tableauimages.length > i; i++) {
          if ($scope.idimagcheques == i) {
            $scope.tableauimages.splice(i, 1);
          }
        }

        $scope.afficherimages();
      } else {
        var tbslls = [];
        for (i = 0; $scope.tableauimages2.length > i; i++) {
          if ($scope.idimagcheques == i) {
            $scope.tableauimages2.splice(i, 1);
          }
        }

        for (i = 0; $scope.tableauimages.length > i; i++) {
          if ($scope.idimagcheques == i) {
            $scope.tableauimages.splice(i, 1);
          }
        }
        $scope.afficherimages();
      }
    };

    //debut reinitialiser la page
    $scope.resetPage = function () {
      $scope.FormAddTiTiers = {};
      $(document).ready(function () {
        $("#idOperateur").css("background-color", "#FFFFFF");
        $("#idDenomination").css("background-color", "#FFFFFF");
        $("#idEmail").css("background-color", "#FFFFFF");
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

    //debut liste type du tiers
    $scope.afficheListeTypeTiers = function () {
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
        .post("/TypeDuTiers/ListeTypeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeDesTiers = reponse.data;
          if (
            $scope.listeTypeDesTiers[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeSexe();
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

    //debut liste sexes
    $scope.afficheListeSexe = function () {
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
            $scope.afficheListeTva();
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
            $scope.afficheListeSecteurActivite();
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

    //debut liste type compte additionnel
    /* $scope.afficheListeTypeCompte = function () {
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
        .post("/TypeCompteAdd/ListeTypeCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeCompteAdd = reponse.data;
          if (
            $scope.listeTypeCompteAdd[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeSecteurActivite();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeCompteAdd[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeCompteAdd);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeCompteAdd[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };*/
    //fin liste type compte additionnel

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

    //debut liste cas d'utilisation
    $scope.afficheListeCasUtilisation = function () {
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
        .post("/CasUtilisation/ListeCasUtilisation/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeCasDUtilisation = reponse.data;
          if (
            $scope.listeCasDUtilisation[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeRegimeImposition();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeCasDUtilisation[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeCasDUtilisation);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeCasDUtilisation[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste cas d'utilisation

    //debut liste regime d'imposition
    $scope.afficheListeRegimeImposition = function () {
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
            // $scope.afficheListeSpecialite();
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
    };
    //fin liste regime d'imposition

    //debut liste specialité
    $scope.afficheListeSpecialite = function () {
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
    };
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
            $scope.afficheListeEscompte();
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

    //debut liste escompte
    $scope.afficheListeEscompte = function () {
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
        .post("/Escompte/ListeEscompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeEscompte = reponse.data;
          if ($scope.listeEscompte[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeEscompte[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeEscompte);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeEscompte[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste escompte

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
            $scope.afficheListeNatureTiers();
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
            $scope.afficheListeProfession();
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

    //debut liste profession
    $scope.afficheListeProfession = function () {
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
        .post("/Profession/ListeProfession/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeProfession = reponse.data;
          if ($scope.listeProfession[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifDesTiers, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeProfession[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeProfession);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeProfession[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste profession

    //debut info sur la page de modification
    $scope.retourModifDesTiers = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifTiTiers"));
      $scope.afficheListeProspectPhoto($scope.recupererInfo.TI_IDTIERS);
      $scope.FormAddTiTiers.operateur = $scope.recupererInfo.OP_CODEOPERATEUR;
      $scope.FormAddTiTiers.numDuTiers = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddTiTiers.denomination = $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddTiTiers.sexe = $scope.recupererInfo.SX_CODESEXE;
      $scope.FormAddTiTiers.profession = $scope.recupererInfo.PF_CODEPROFESSION;
      $scope.FormAddTiTiers.typeDuTiers = $scope.recupererInfo.TP_CODETYPETIERS;
      $scope.FormAddTiTiers.dateDeNaissance =
        $scope.recupererInfo.TI_DATENAISSANCE;
      $scope.FormAddTiTiers.natureTiers =
        $scope.recupererInfo.NT_CODENATURETIERS;
      $scope.FormAddTiTiers.tva = $scope.recupererInfo.TI_TVA;
      $scope.FormAddTiTiers.asdi = $scope.recupererInfo.TI_ASDI;
      $scope.FormAddTiTiers.plafondCredit =
        $scope.recupererInfo.TI_PLAFONDCREDIT;
      $scope.FormAddTiTiers.numCompte = $scope.recupererInfo.PL_NUMCOMPTE;
      $scope.FormAddTiTiers.gerant = $scope.recupererInfo.TI_GERANT;
      $scope.FormAddTiTiers.secteurDactivite =
        $scope.recupererInfo.AC_CODEACTIVITE;
      $scope.FormAddTiTiers.numAgremant =
        $scope.recupererInfo.TI_NUMEROAGREMENT;
      $scope.FormAddTiTiers.pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddTiTiers.ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddTiTiers.groupeDesTiers = $scope.recupererInfo.GP_CODEGROUPE;
      $scope.FormAddTiTiers.autorisationDescompte =
        $scope.recupererInfo.TI_ESCOMPTE;
      $scope.FormAddTiTiers.numclientaxa = $scope.recupererInfo.TI_NUMEROAXA;
      $scope.FormAddTiTiers.telephone = $scope.recupererInfo.TI_TELEPHONE;
      $scope.FormAddTiTiers.siteWeb = $scope.recupererInfo.TI_SITEWEB;
      $scope.FormAddTiTiers.fax = $scope.recupererInfo.TI_FAX;
      $scope.FormAddTiTiers.email = $scope.recupererInfo.TI_EMAIL;
      $scope.FormAddTiTiers.adressePostale =
        $scope.recupererInfo.TI_ADRESSEPOSTALE;
      $scope.FormAddTiTiers.localisation =
        $scope.recupererInfo.TI_ADRESSEGEOGRAPHIQUE;

      console.log($scope.recupererInfo);
      $scope.$emit("UNLOAD");
    };
    //fin info sur la page de modification

    // DEBUT COMBOS

    /*FIN DEV JJ*/
  },
]);
