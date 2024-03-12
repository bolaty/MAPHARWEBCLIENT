MapharApp.controller("AssuranceGESAController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    $scope.recupInfoDemande = angular.fromJson(
      localStorage.getItem("collectionDemande")
    );

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddGESA = {
      pays: "",
      ville: "",
      situationGeo: "",
      typeAffaire: "",
      id01: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_IDTIERS : "",
      code1: $scope.recupInfoDemande ? $scope.recupInfoDemande.TI_NUMTIERS : "",
      denomination1: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_DENOMINATION
        : "",
      id02: "",
      code2: "",
      denomination2: "",
      N_Police: "",
      assureur: $scope.recupInfoDemande
        ? $scope.recupInfoDemande.TI_IDTIERSASSUREUR
        : "",
      pharmacien: "",
      Telephone_pharmacien: "",
      //"zone": "",
      section: "",
      effet: "",
      echeance: "",
      idModif1: "",
      idModif2: "",
      intermediaire: "",
      valgarantie: "",
    };
    $scope.FormList = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numPolice: "",
      numSouscripteur: "",
      nomSouscripteur: "",
      numCommercial: "",
      nomCommercial: "",
    };
    $scope.FormListPrime = {
      libelle: "",
      primes: [],
      risque: "",
      valeur: "",
      taux: "",
      primes: "",
      libelle: "",
    };
    $scope.listePays = [];
    $scope.listeVillesGESA = [];
    $scope.listeCommunesGESA = [];
    $scope.objet_envoie = [];
    $scope.listeDesCommerciaux = [];
    $scope.listeContrat = [];
    $scope.idGESA = [];
    $scope.testSuppression = [];
    $scope.modifListeVille = [];
    $scope.modifListeCommune = [];
    //$scope.listeDesZoneMaladie = [];
    $scope.listeTypeAffaireGESA = [];
    $scope.listeDesAssureurs = [];
    $scope.tabPrimes = [];
    $scope.testAjoutGESA = [];
    $scope.testModifGesa = [];
    $scope.recuperer = [];
    $scope.recupererInfo = {};
    $scope.listeDesSouscripteurs = [];
    $scope.listeIntermediaireGesa = [];
    $scope.verrouillerModif = true;
    $scope.valprimettc = 0;
    $scope.valprimenette = 0;
    $scope.valprimettcenregistrement = 0;
    $scope.valprimenettenregistrement = 0;
    $scope.listeDesGarantie = [];
    $scope.leChargement = true;
    $scope.etatForm = "";
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";

    $scope.listeContratAvecAccessoir = []
    $scope.recupererInfoAvecAccessoir = {};

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

    //debut loader
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

    //debut limite des champs
    var KTBootstrapMaxlength = (function () {
      // Private functions
      var demos = function () {
        // minimum setup
        $("#idPeriodeDu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idPeriodeAu").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idCode1").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idCode2").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idEffet").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idEcheance").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idtTel").maxlength({
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

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddGESA = function () {
     
      $scope.verrouiller1 = false;
      $scope.verrouiller2 = false;
      $scope.FormAddGESA = {};
      $scope.initFormAddGESA();
    };
    //fin rafraichir les champs de la fenetre d'enregistrement
    /*FIN FONCTION GENERALE*/

    //debut initialisation add gesa
    $scope.initFormAddGESA = function () {
      $scope.afficheListeVille($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
      $scope.FormAddGESA.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddGESA.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommune($rootScope.VILLEPARDEFAUT)
    };
    //// fin initialisation add gesa

    //debut initialisation add gesa
    $scope.initFormModifGESA = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };
    // fin initialisation add gesa

    //Debut developpement ANICETTE

    //debut contrainte sur les champs add GESA
    $scope.contrainteFormAddGESA = function () {
      FormValidation.formValidation(document.getElementById("formAddGESA"), {
        fields: {
          addGESA_Code01: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code.",
              },
            },
          },
          addGESA_Dénomination01: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
            },
          },
          addGESA_Code02: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le code.",
              },
            },
          },
          addGESA_Dénomination02: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la dénomination.",
              },
            },
          },
          addGESA_Intermediaire: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l'intermediaire.",
              },
            },
          },
          addGESA_Pays: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le pays.",
              },
            },
          },
          addGESA_Ville: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la ville.",
              },
            },
          },
          addGESA_Commune: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner la section.",
              },
            },
          },
          addGESA_Effet: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la date d'effet.",
              },
              regexp: {
                regexp:
                  /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une date correcte.",
              },
            },
          },
          addGESA_Echeance: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la date d'écheance.",
              },
              regexp: {
                regexp:
                  /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une date correcte.",
              },
            },
          },
          addGESA_Zone: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la zone.",
              },
            },
          },

          addGESA_pharmacien: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le pharmacien.",
              },
              regexp: {
                regexp: /^[a-z-A-Z]/,
                message: "Veuillez entrer un nom correcte.",
              },
            },
          },
          addGESA_Telephone_pharmacien: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le numero de telephone pharmacien.",
              },
              regexp: {
                regexp: /^(0|[0-9]\d*)$/,
                message: "Veuillez saisir un telephone pharmacien correct.",
              },
            },
          },
          addGESA_Assureur: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner l'assureur.",
              },
            },
          },
          addGESA_N_Police: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le n° de la police.",
              },
            },
          },
          addGESA_typeAffaire: {
            validators: {
              notEmpty: {
                message: "Veuillez sélectionner le type d'affaire.",
              },
            },
          },
          addGESA_Situation_géographique: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la situation géograpgique.",
              },
              regexp: {
                regexp: /^[a-z-A-Z]/,
                message: "Veuillez saisir une situation géographique correcte.",
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

          //fin contrainte sur les champs add GESA
        },
      });
    };
    //debut contrainte sur les champs list Assurance GESA

    //fin initialisation add GESA

    //debut fonction pour annuler la recherche
    $scope.listeAnnuler = function () {
      //$scope.FormListGESA = {};
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
      setTimeout($scope.rechargePage, 3600);
    };
    //fin fonction pour annuler la recherche

    ////debut combo Zone maladie
    //$scope.afficheListeZoneMaladie = function () {
    //    $scope.objet_envoie = [{

    //        "SL_LIBELLEECRAN": "SANTE GESA",
    //        "SL_LIBELLEMOUCHARD": "INSERTIONS",
    //        "TYPEOPERATION": "0",
    //        "LG_CODELANGUE": "fr",
    //        "clsObjetEnvoi": {
    //            "OE_A": $rootScope.CODE_AGENCE,
    //            "OE_Y": $rootScope.CODE_OPERATEUR,
    //            "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //        }

    //    }];
    //    $http.post("/Zone/ListeZone/", $scope.objet_envoie, {
    //        //headers: $scope.headers
    //    }).then(function (reponse) {
    //        $scope.listeDesZoneMaladie = reponse.data;

    //    })
    //}
    ////fin combo Zone maladie

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
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste GESA
    $scope.afficheListeContrat = function (
      periodeDu,
      periodeAu,
      numDePolice,
      numSouscrp,
      nomSouscrp,
      numCom,
      nomCom
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
        numDePolice === undefined ||
        numSouscrp === undefined ||
        nomSouscrp === undefined ||
        numCom === undefined ||
        nomCom === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (periodeDu === "" || periodeDu === undefined) {
            $("#idPeriodeDu").css("background-color", "#FFE9E0");
          }
          if (periodeAu === "" || periodeAu === undefined) {
            $("#idPeriodeAu").css("background-color", "#FFE9E0");
          }
          if (numDePolice === undefined) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (numSouscrp === undefined) {
            $("#idNumSouscripteur").css("background-color", "#FFE9E0");
          }
          if (nomSouscrp === undefined) {
            $("#idNomSouscripteur").css("background-color", "#FFE9E0");
          }
          if (numCom === undefined) {
            $("#idNumCommercial").css("background-color", "#FFE9E0");
          }
          if (nomCom === undefined) {
            $("#idNomCommercial").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeContrat = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début n'est pas correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
        $scope.anneeBissextile($scope.lAnneeperiodeAu) == true &&
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
        $scope.listeContrat = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeContrat = "";
      } else {
        $scope.objet_envoie = [
          {
            RQ_CODERISQUE: "08",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
            TYPEOPERATION: "01",
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
          .post("/Contrat/ListeContratSansAccessoir/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContrat = reponse.data;
            $scope.nombreInfoBulle = $scope.listeContrat.length;
            if ($scope.listeContrat[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeContrat[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };

    //fin afficher liste GESA

//debut afficher liste AvecAccessoir
$scope.afficheListeContratAvecAccessoir = function (
  idContrat,
  date
 
) {
  $scope.$emit("LOAD");
 
 
    $scope.objet_envoie = [
      {
        RQ_CODERISQUE: "08",
        CA_CODECONTRAT: idContrat,
        AG_CODEAGENCE: $rootScope.CODE_AGENCE,
        EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
        CA_NUMPOLICE: "",
        TI_NUMTIERS: "",
        TI_DENOMINATION: "",
        TI_NUMTIERSCOMMERCIAL: "",
        TI_DENOMINATIONCOMMERCIAL: "",
        DATEDEBUT: date,//"01-01-1900",
        DATEFIN: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
        SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
        SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDLISTE,
        TYPEOPERATION: "01",
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
      .post("/Contrat/ListeContrat/", $scope.objet_envoie, {
        //.post("/Contrat/ListeContrat/", $scope.objet_envoie, {
        //headers: $scope.headers
      })
      .then(function (reponse) {
        $scope.$emit("UNLOAD");
        $scope.listeContratAvecAccessoir = reponse.data.reverse();
        $scope.nombreInfoBulle = $scope.listeContratAvecAccessoir.length;
        if ($scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
          $scope.$emit("UNLOAD");
          $rootScope.MessageDesListes(
            "veuillez reessayez svp !!!"
            //$scope.listeContratAvecAccessoir[0].clsObjetRetour.SL_MESSAGE
          );
        }else{
          $scope.recupererInfoAvecAccessoir = $scope.listeContratAvecAccessoir[0]
          sessionStorage.setItem("modifGESA", JSON.stringify($scope.recupererInfoAvecAccessoir));
          window.location.href = "#/assurances/modification/sante/gesa";
        }
      });
};
//fin afficher liste AvecAccessoir


    //debut voir plus GESA
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpGESA", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpGESA"));
    };
    //fin voir plus GESA

    //debut acceder a la page de modification
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE)
    
    };
    //debut acceder a la page de modification

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id) {
      $scope.FormAddGESA.code1 = code;
      $scope.FormAddGESA.denomination1 = denomination;
      $scope.FormAddGESA.id01 = id;
      $scope.verrouiller1 = true;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $scope.FormAddGESA.code2 = code;
      $scope.FormAddGESA.denomination2 = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddGESA.idModif2 = id;
        $scope.FormAddGESA.id02 = $scope.FormAddGESA.idModif2;
      } else {
        $scope.FormAddGESA.id02 = id;
      }
      $scope.verrouiller2 = true;
    };
    //Fin choix d'un commercial

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddGESA.code2 == "" &&
        $scope.FormAddGESA.denomination2 == ""
      ) {
        $scope.objet_envoie = [
          {
            TI_IDTIERS: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "SANTE GESA",
            SL_LIBELLEMOUCHARD: "LISTE",
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
      } else {
        $scope.objet_envoie = [
          {
            TI_IDTIERS: "",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            TI_NUMTIERS: $scope.FormAddGESA.code2,
            TI_DENOMINATION: $scope.FormAddGESA.denomination2,
            SL_LIBELLEECRAN: "SANTE GESA",
            SL_LIBELLEMOUCHARD: "LISTE",
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
      }
      $http
        .post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommerciaux = reponse.data;
          $scope.leChargement = false;
        });
    };
    //fin liste des comerciaux

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function () {
      $scope.leChargement = true;
      if (
        $scope.FormAddGESA.code1 == "" &&
        $scope.FormAddGESA.denomination1 == ""
      ) {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            TI_STATUT: "N",
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            OP_CODEOPERATEUR: $rootScope.CODE_AGENCE,
            TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
            TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SL_LIBELLEECRAN: "SANTE GESA",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "TIERS",
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
            TI_NUMTIERS: $scope.FormAddGESA.code1,
            TI_DENOMINATION: $scope.FormAddGESA.denomination1,
            SL_LIBELLEECRAN: "SANTE GESA",
            SL_LIBELLEMOUCHARD: "LISTE",
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
          $scope.leChargement = false;
        });
    };
    //fin liste des souscripteur

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId; //reste a mettre en place la fenetre pour la confirmation de la suppression
    };
    //debut recuperer id pour la suppression

    //debut  suppression
    $scope.supprimeContrat = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: recupId,
          SL_LIBELLEECRAN: "SANTE GESA",
          SL_LIBELLEMOUCHARD: "SUPPRESSION",
          TYPEOPERATION: "2",
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
        .post("/Contrat/SuppressionContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          //console.log($scope.testSuppression)
          if ($scope.testSuppression[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeContrat[0].clsObjetRetour.SL_RESULTAT = "FALSE";
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
    //Fin  suppression

    //debut liste des villes
    $scope.afficheListeVille = function (id) {
      $scope.listeCommunesGESA = [];
      $scope.FormAddGESA.section = "";
     // $scope.FormAddGESA.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: id,
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeVillesGESA = reponse.data;
          if (
            $scope.listeVillesGESA[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
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
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Ville/ListeVille/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeVillesGESA = reponse.data;
          if ($scope.listeVillesGESA[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.verouVille = false;
            $scope.afficheListeCommuneModif($scope.recupererInfo.VL_CODEVILLE);
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeVillesGESA[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeVillesGESA);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeVillesGESA[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes

    //debut liste des sections
    $scope.afficheListeCommune = function (id) {
      $scope.FormAddGESA.section = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeCommunesGESA = reponse.data;
          if (
            $scope.listeCommunesGESA[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };

    $scope.afficheListeCommuneModif = function (id) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeCommunesGESA = reponse.data;
          if (
            $scope.listeCommunesGESA[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeCommunesGESA[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeCommunesGESA);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeCommunesGESA[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des sections

    //debut test des types sur les grilles
    $scope.confirmerChampsGrillePrime = function (grille) {
      $scope.verifie = false;
      let typeNumerique = /^\d+$/;

      if (grille == undefined) {
        $scope.verifie = false;
        return $scope.verifie;
      } else {
        for (var j = 0; j < grille.length; j++) {
          if (typeNumerique.test(grille[j].CG_PRIMES) == false) {
            $scope.verifie = true;
            break;
          }
        }

        return $scope.verifie;
      }
    };
    //fin test des types sur les grilles

    // verification de la prime nette et ttc
    $scope.testprime = function () {
      $scope.statutprime = false;
      $scope.statutprimeenregistrement = false;
      if ($scope.etatForm == "2") {
        $scope.valprimettcenregistrement = 1;
        $scope.valprimenettenregistrement = 1;
        $scope.verifieprime = false;
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenette =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettc =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
          }
        }
      } else {
        $scope.valprimettc = 1;
        $scope.valprimenette = 1;
        $scope.statutprimeenregistrement = false;
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 01 &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprimeenregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 01 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenettenregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }

          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprimeenregistrement = true;
            break;
          }
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettcenregistrement = $scope.tabPrimes[j].CG_PRIMES;
          }
        }
      }
    };
    //verification de la prime nette et ttc

    //calcul de la prime automatiquement
    $scope.calculprimettc = function () {
      $scope.premierclick = "FALSE";
      $scope.valprimettcaffiche = 0;
      if ($scope.etatForm == "2") {
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES = 0;
          }
        }
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME !== 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES != "" &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES);
          }
        }
        for (
          var j = 0;
          j < $scope.recupererInfo.clsCtcontratprimes.length;
          j++
        ) {
          if (
            $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES =
              $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      } else {
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = 0;
          }
        }

        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME !== 05 &&
            $scope.tabPrimes[j].CG_PRIMES != "" &&
            $scope.tabPrimes[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.tabPrimes[j].CG_PRIMES);
          }
        }
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            $scope.tabPrimes[j].RE_CODERESUME == 05 &&
            $scope.tabPrimes[j].CG_PRIMES !== ""
          ) {
            $scope.tabPrimes[j].CG_PRIMES = $scope.valprimettcaffiche;
          }
        }
        $scope.valprimettcaffiche = 0;
      }
    };
    //calcul de la prime automatiquement

    //debut focus sur le champ
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumSouscripteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCommercial").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDenomination2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSitGeo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idSection").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEffet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDateEcheance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAssureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idIntermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPharmacien").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTelPharmacien").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTypeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout GESA (contrat) /a terminer
    $scope.ajoutFormAddGESA = function (dateEffet, dateEcheance) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifGESA"));
      //$scope.testgrille();
      $scope.testprime();
      $scope.calculprimettc();
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      $scope.lAnneeEffet = $scope.FormAddGESA.effet.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddGESA.effet.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddGESA.effet.substr(0, 2);
      $scope.lAnneeEcheance = $scope.FormAddGESA.echeance.substr(6, 4);
      $scope.leMoisEcheance = $scope.FormAddGESA.echeance.substr(3, 2);
      $scope.leJourEcheance = $scope.FormAddGESA.echeance.substr(0, 2);

      // mettre 0 dans les champs de prime si le champ est vide
      if ($scope.etatForm == "2") {
        for (
          var i = 0;
          i < $scope.recupererInfo.clsCtcontratprimes.length;
          i++
        ) {
          if ($scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES == "") {
            $scope.recupererInfo.clsCtcontratprimes[i].CG_PRIMES = 0;
          }
        }
      } else {
        for (var i = 0; i < $scope.tabPrimes.length; i++) {
          if ($scope.tabPrimes[i].CG_PRIMES == "") {
            $scope.tabPrimes[i].CG_PRIMES = 0;
          }
        }
      }

      if (
        $scope.FormAddGESA.code1 === "" ||
        $scope.FormAddGESA.code1 === undefined ||
        $scope.FormAddGESA.denomination1 === "" ||
        $scope.FormAddGESA.denomination1 === undefined ||
        $scope.FormAddGESA.code2 === "" ||
        $scope.FormAddGESA.code2 === undefined ||
        $scope.FormAddGESA.denomination2 === "" ||
        $scope.FormAddGESA.denomination2 === undefined ||
        $scope.FormAddGESA.N_Police === "" ||
        $scope.FormAddGESA.N_Police === undefined ||
        $scope.FormAddGESA.section === "" ||
        $scope.FormAddGESA.section === undefined ||
        $scope.FormAddGESA.situationGeo === "" ||
        $scope.FormAddGESA.situationGeo === undefined ||
        $scope.FormAddGESA.effet === "" ||
        $scope.FormAddGESA.effet === undefined ||
        $scope.FormAddGESA.echeance === "" ||
        $scope.FormAddGESA.echeance === undefined ||
        $scope.FormAddGESA.assureur === "" ||
        $scope.FormAddGESA.assureur === undefined ||
        $scope.FormAddGESA.pharmacien === "" ||
        $scope.FormAddGESA.pharmacien === undefined ||
        $scope.FormAddGESA.Telephone_pharmacien === "" ||
        $scope.FormAddGESA.Telephone_pharmacien === undefined ||
        $scope.FormAddGESA.valgarantie === "" ||
        $scope.FormAddGESA.valgarantie === undefined ||
        $scope.FormAddGESA.typeAffaire === "" ||
        $scope.FormAddGESA.typeAffaire === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddGESA.valgarantie === "" ||
            $scope.FormAddGESA.valgarantie === undefined
          ) {
            $("#idgarantie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.code1 === "" ||
            $scope.FormAddGESA.code1 === undefined
          ) {
            $("#idNumSouscripteur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.denomination1 === "" ||
            $scope.FormAddGESA.denomination1 === undefined
          ) {
            $("#idDenomination1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.code2 === "" ||
            $scope.FormAddGESA.code2 === undefined
          ) {
            $("#idNumCommercial").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.denomination2 === "" ||
            $scope.FormAddGESA.denomination2 === undefined
          ) {
            $("#idDenomination2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.N_Police === "" ||
            $scope.FormAddGESA.N_Police === undefined
          ) {
            $("#idNumPolice").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.pays === "" ||
            $scope.FormAddGESA.pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.ville === "" ||
            $scope.FormAddGESA.ville === undefined
          ) {
            $("#idVille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.section === "" ||
            $scope.FormAddGESA.section === undefined
          ) {
            $("#idSection").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.situationGeo === "" ||
            $scope.FormAddGESA.situationGeo === undefined
          ) {
            $("#idSitGeo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.effet === "" ||
            $scope.FormAddGESA.effet === undefined
          ) {
            $("#idDateEffet").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.echeance === "" ||
            $scope.FormAddGESA.echeance === undefined
          ) {
            $("#idDateEcheance").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.assureur === "" ||
            $scope.FormAddGESA.assureur === undefined
          ) {
            $("#idAssureur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.intermediaire === "" ||
            $scope.FormAddGESA.intermediaire === undefined
          ) {
            $("#idIntermediaire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.pharmacien === "" ||
            $scope.FormAddGESA.pharmacien === undefined
          ) {
            $("#idPharmacien").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.Telephone_pharmacien === "" ||
            $scope.FormAddGESA.Telephone_pharmacien === undefined
          ) {
            $("#idTelPharmacien").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddGESA.typeAffaire === "" ||
            $scope.FormAddGESA.typeAffaire === undefined
          ) {
            $("#idTypeAffaire").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.verifieprimeenregistrement == true) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille prime";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprimeenregistrement == true) {
        $scope.messageErreur = "la prime ttc  ne doit etre vide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprime == true) {
        $scope.messageErreur = "la prime ttc  ne doit etre vide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) == 0 ||
        parseInt($scope.valprimettc) == 0
      ) {
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doit pas etre nulle";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimettcenregistrement) == 0 ||
        parseInt($scope.valprimenettenregistrement) == 0
      ) {
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doit pas etre nulle";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
      ) {
        $scope.messageErreur =
          "la prime nette ne doit etre superieure a la prime ttc";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenettenregistrement) >
        parseInt($scope.valprimettcenregistrement)
      ) {
        $scope.messageErreur =
          "la prime nette ne doit etre superieur a la prime ttc";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeNumerique.test($scope.FormAddGESA.code1) == false) {
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNumSouscripteur").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddGESA.denomination1) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une dénomination souscripteur correcte";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDenomination1").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeNumerique.test($scope.FormAddGESA.code2) == false) {
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idNumCommercial").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddGESA.denomination2) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une dénomination commercial correcte";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDenomination2").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddGESA.situationGeo) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner une situation geographique correcte";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idSitGeo").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddGESA.pharmacien) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un nom interlocuteur correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPharmacien").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddGESA.Telephone_pharmacien) ==
        false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTelPharmacien").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddGESA.effet) == false) {
        $scope.messageErreur = "Veuillez renseigner une dates effet correcte";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEffet").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddGESA.echeance) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une date d' écheance correcte";
        $(document).ready(function () {
          $("#idDateEcheance").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDateEcheance").css("background-color", "#FFE9E0");
        });
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(dateEffet) >=
        $scope.dateSuperioriteFin(dateEcheance)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateEffetIncorrecte();
      } else if ($scope.confirmerChampsGrillePrime($scope.tabPrimes) == true) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.confirmerChampsGrillePrime(
          $scope.recupererInfo.clsCtcontratprimes
        ) == true
      ) {
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs des grilles";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          if ($scope.FormAddGESA.idModif1 === "") {
            $scope.FormAddGESA.id01 = $scope.recuperer.TI_IDTIERS;
          }
          if ($scope.FormAddGESA.idModif2 === "") {
            $scope.FormAddGESA.id02 = $scope.recuperer.TI_IDTIERSCOMMERCIAL;
          }
          $scope.clsCtcontratprimes = [];

          for (
            var j = 0;
            j < $scope.recupererInfo.clsCtcontratprimes.length;
            j++
          ) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "SANTE GESA",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.RE_CODERESUME =
              $scope.recupererInfo.clsCtcontratprimes[j].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR =
              $scope.recupererInfo.clsCtcontratprimes[j].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
          console.log($scope.clsCtcontratprimes);
        } else {
          $scope.clsCtcontratprimes = [];
          for (var i = 0; i < $scope.tabPrimes.length; i++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CG_PRIMES: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "SANTE GESA",
              SL_LIBELLEMOUCHARD: "LISTE",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.RE_CODERESUME = $scope.tabPrimes[i].RE_CODERESUME;
            //$scope.objetPrime.CG_PRIMES = $scope.tabPrimes[i].CG_PRIMES;
            $scope.objetPrime.CP_VALEUR = $scope.tabPrimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "0";
        }
        $scope.objet_envoie = [
          {
            CA_CODECONTRAT: $scope.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            RQ_CODERISQUE: "08",
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CA_NUMPOLICE: $scope.FormAddGESA.N_Police,
            TI_IDTIERSASSUREUR: $scope.FormAddGESA.assureur,
            CO_CODECOMMUNE: $scope.FormAddGESA.section,
            CA_SITUATIONGEOGRAPHIQUE: $scope.FormAddGESA.situationGeo,
            CA_DATEEFFET: $scope.FormAddGESA.effet,
            CA_DATEECHEANCE: $scope.FormAddGESA.echeance,
            CA_NOMINTERLOCUTEUR: $scope.FormAddGESA.pharmacien,
            IT_CODEINTERMEDIAIRE: $scope.FormAddGESA.intermediaire,
            CA_CONTACTINTERLOCUTEUR: $scope.FormAddGESA.Telephone_pharmacien,
            TA_CODETYPEAFFAIRES: $scope.FormAddGESA.typeAffaire,
            TI_IDTIERSCOMMERCIAL: $scope.FormAddGESA.id02,
            TI_IDTIERS: $scope.FormAddGESA.id01,
            CA_DATENAISSANCE: "01-01-1900",
            CA_TAUX: "0",
            CA_NUMSERIE: "1000",
            CA_IMMATRICULATION: "IMMAT",
            CA_PUISSANCEADMISE: "0",
            CA_CHARGEUTILE: "0",
            CA_NBREPLACE: "0",
            CA_VALNEUVE: "0",
            CA_VALVENALE: "0",
            CA_DATEMISECIRCULATION: "01-01-1900",
            CA_CLIENTEXONERETAXE: "N",
            CA_DATETRANSMISSIONAASSUREUR: "01-01-1900",
            CA_DATEVALIDATIONASSUREUR: "01-01-1900",
            CA_DATERECEPTIONCOTATIONDEASSUREUR: "01-01-1900",
            CA_DATETRANSMISSIONCOTATIONCLIENT: "01-01-1900",
            CA_DATESUSPENSION: "01-01-1900",
            CA_DATECLOTURE: "01-01-1900",
            CA_DATERESILIATION: "01-01-1900",
            GR_CODEGARENTIEPRIME: $scope.FormAddGESA.valgarantie,
            //"ZM_CODEZONEMALADIE": $scope.FormAddGESA.zone,
            SL_LIBELLEECRAN: "SANTE GESA",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
            TYPEOPERATION: $scope.TYPEOPERATION,
            LG_CODELANGUE: "fr",
            DE_CODEDEMANADE: $scope.recupInfoDemande
              ? $scope.recupInfoDemande.DE_CODEDEMANADE
              : "",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
            clsCtcontratprimes: $scope.clsCtcontratprimes,
          },
        ];
        $http
          .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.testAjoutGESA = reponse.data;

            if ($scope.testAjoutGESA[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testAjoutGESA[0].clsObjetRetour.SL_MESSAGE
              );
              if ($scope.etatForm == "2") {
                $scope.RetourSurListe = function () {
                  window.location.href = "#/assurances/sante/gesa";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                if (!!localStorage.getItem("collectionDemande")) {
                  localStorage.removeItem("collectionDemande");
                }
                $scope.resetFormAddGESA();
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.testAjoutGESA[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testAjoutGESA[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    //Fin ajout GESA (contrat)

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "SanteGesa";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBO

    $scope.afficheListegarantie = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "08",
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
        .post("/Garantie/ListeGarantie/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesGarantie = reponse.data;
          if (
            $scope.listeDesGarantie[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            
            $scope.afficheListeTypeAffaireGESA()
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesGarantie[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesGarantie);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesGarantie[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    //debut liste des pays
    $scope.afficheListePays = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Pays/ListePays/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listePays = reponse.data;
          if ($scope.listePays[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeAssureur();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listePays[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listePays);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listePays[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaireGESA = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/TypeAffaire/ListeTypeAffaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeTypeAffaireGESA = reponse.data;
          if (
            $scope.listeTypeAffaireGESA[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListePays();
           
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaireGESA[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaireGESA);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaireGESA[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    //debut liste des assureurs
    $scope.afficheListeAssureur = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Assureur/ListeTiers/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesAssureurs = reponse.data;
          if (
            $scope.listeDesAssureurs[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeIntermediaireGesa();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureurs);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureurs[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des assureurs

    //debut liste des intermediaire
    $scope.afficheListeIntermediaireGesa = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Intermediaire/ListeIntermediaire/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeIntermediaireGesa = reponse.data;
          if (
            $scope.listeIntermediaireGesa[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeIntermediaireGesa[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeIntermediaireGesa);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeIntermediaireGesa[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des intermediaire

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "08",
          SL_LIBELLEECRAN: "SANTE GESA",
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
        .post("/Primes/ListePrimes/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabPrimes = reponse.data;
          if ($scope.tabPrimes[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifGESA, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabPrimes[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabPrimes);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabPrimes[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau primes

    $scope.retourModifGESA = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifGESA"));
      //console.log($scope.recupererInfo)
      $scope.verrouiller1 = true;
      $scope.verrouiller2 = false;

      $scope.FormAddGESA.code1 = $scope.recupererInfo.TI_NUMTIERS;
      $scope.FormAddGESA.denomination1 = $scope.recupererInfo.TI_DENOMINATION;
      $scope.FormAddGESA.code2 = $scope.recupererInfo.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddGESA.denomination2 =
        $scope.recupererInfo.TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddGESA.N_Police = $scope.recupererInfo.CA_NUMPOLICE;
      $scope.FormAddGESA.intermediaire =
        $scope.recupererInfo.IT_CODEINTERMEDIAIRE;
      $scope.FormAddGESA.pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddGESA.ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddGESA.section = $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddGESA.situationGeo =
        $scope.recupererInfo.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddGESA.effet = $scope.recupererInfo.CA_DATEEFFET;
      $scope.FormAddGESA.echeance = $scope.recupererInfo.CA_DATEECHEANCE;
      $scope.FormAddGESA.assureur = $scope.recupererInfo.TI_IDTIERSASSUREUR;
      $scope.FormAddGESA.pharmacien = $scope.recupererInfo.CA_NOMINTERLOCUTEUR;
      $scope.FormAddGESA.Telephone_pharmacien =
        $scope.recupererInfo.CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddGESA.typeAffaire = $scope.recupererInfo.TA_CODETYPEAFFAIRES;
      //$scope.FormAddGESA.zone = $scope.recupererInfo.ZM_CODEZONEMALADIE;
      $scope.FormAddGESA.valgarantie =
        $scope.recupererInfo.GR_CODEGARENTIEPRIME;

      $scope.afficheListeVilleModif($scope.recupererInfo.PY_CODEPAYS);
    };

    // DEBUT COMBO

    //fin developpement ANICETTE
  },
]);
