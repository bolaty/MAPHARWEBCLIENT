MapharApp.controller("OuvertureDossierController", [
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
     //debut session generale pour le contrat operation
     $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.DATE_PREMIER_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
    //FIN MODULE JS
    console.log($rootScope.DATE_JOURNEE_DE_TRAVAIL);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddOuvertureDSP = {
      SinistreN: "",
      Date: "",
      heure: "",
      minute: "",
      NatSinistre: "",
      Pays: "",
      Ville: "",
      Commune: "",
      MontantPrej: "",
      AdresseGeo: "",
      DescriptionSinistre: "",
      Conducteur : "",
      Contact : "",
      NometPrenom : "",
      NumeroTelephone : "",
      NumeroWhatsApp : "",
      DateNaissance : "",
      NumeroPermis : "",
      Delivrele : "",
      Validite : "",
      Marque : "",
      Immatriculation : "",
      Reparateur : "",
      Nombredeblessesvehiculeassur : "",
      Nombrededecesvehiculeassur : "",
      Nombredeblessesvehiculetiers : "",
      Nombrededecesvehiculetiers : "",
      Nometcontactdesvictime : "",
      Unite: "",
      NomdelAgent: "",
      NumerodeteldelAgent:  "",
      nomcondcteur: "",
    };

    $scope.FormAddbtnsinistre = {
      Police: "N",
      Gendarmerie: "N",
      Huissier: "N",
      Amiable:"N",
      AilearriereDroit: "N",
      AilearriereGauche: "N",
      Parechocavant: "N",
      Parechocarriere: "N",
      Lateraldroit: "N",
      Lateralgauche: "N",
      Capotmoteur: "N"
      
    };

    $scope.FormListe = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numSinistre: "",
      natureSinistre: "",
    };
    $scope.sinistreDoc = [
      {
        fichier: "",
        libelleFichier: "",
      },
    ];

    $scope.retourPhotoSinistre = [];
    $scope.listeDesPaysOuvertureDSP = [];
    $scope.listeDesSinistreOuvertureDSP = [];
    $scope.listeOperation = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.listeOuvertureDSP = [];
    $scope.modiftestEnregistrement = [];
    $scope.listeDesVilles = [];
    $scope.listeDesCommunes = [];
    $scope.testEnregistrement = [];
    $scope.tabEngOuvertureDoc = [];
    $scope.tabModifOuvertureDoc = [];
    $scope.tabEngDocument = [];
    $scope.listeAffichePhotoSinistre = [];
    $scope.tabSupprDocument = [];
    $scope.heureHeure = "";
    $scope.heureMinute = "";
    $scope.SL_LIBELLEECRAN = "OPERATION CONTRAT OUVERTURE DOSSIER";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "";
    $scope.sinistreId = "";
    $scope.numsequence = "";
    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken
    $scope.etatForm = "";
    $scope.cpt = 0;
    $scope.cpt1 = 0;
    $scope.cpt2 = 0;
    $scope.cpt3 = 0;
    $scope.cpt4 = 0;
    $scope.cpt5 = 0;
    $scope.cpt6 = 0;
    $scope.cpt7 = 0;
    $scope.cpt8 = 0;
    $scope.cpt9 = 0;
    $scope.cpt10 = 0;
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
    //fin test sur les date

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

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
        $("#idDate").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTempsHeure").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idTempsMinute").maxlength({
          warningClass: "label label-info label-rounded label-inline",
          limitReachedClass: "label label-success label-rounded label-inline",
        });
        $("#idMontant").maxlength({
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

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    //debut initialisation add Sante Auxiliaire auxiliaire
    $scope.initFormAddOuvertureDSP = function () {
      $scope.etatFormAutre = $scope.collectionContartOp.RQ_CODERISQUE
      $scope.afficheListeVille($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListeDesPaysOuvertureDSP();
      $scope.FormAddOuvertureDSP.Pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddOuvertureDSP.Ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommune($rootScope.VILLEPARDEFAUT)
    };
    //fin initialisation add Sante Auxiliaire

    //debut initialisation add modif Sante Auxiliaire auxiliaire
    $scope.initFormAddModifOuvertureDSP = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListeDesPaysOuvertureDSP();
    };
    //fin initialisation add Sante Auxiliaire

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut contrainte sur les champs add Sante Auxiliaire
    $scope.contrainteFormAddOuvertureDSP = function () {
      FormValidation.formValidation(
        document.getElementById("formAddOuvertureDSPf"),
        {
          fields: {
            addOuvertureDSP_numSinitre: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le numéro du sinistre.",
                },
              },
            },
            addOuvertureDSP_natureSinitre: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la nature du sinistre.",
                },
              },
            },
            addOuvertureDSP_pays: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le pays.",
                },
              },
            },
            addOuvertureDSP_ville: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la ville.",
                },
              },
            },
            addOuvertureDSP_commune: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la commune.",
                },
              },
            },
            addOuvertureDSP_description: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la description du sinistre.",
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
        }
      );
    };
    //fin contrainte sur les champs add

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddOuvertureDSP = function () {
      $scope.FormAddOuvertureDSP = {};
      $(document).ready(function () {
        $("#idNumSinistre").css("background-color", "#FFFFFF");
        $("#idDate").css("background-color", "#FFFFFF");
        $("#idTempsHeure").css("background-color", "#FFFFFF");
        $("#idTempsMinute").css("background-color", "#FFFFFF");
        $("#idNatureSinistre").css("background-color", "#FFFFFF");
        $("#idMontant").css("background-color", "#FFFFFF");
        $("#idPays").css("background-color", "#FFFFFF");
        $("#idVille").css("background-color", "#FFFFFF");
        $("#idCommune").css("background-color", "#FFFFFF");
        $("#idAdresseGeo").css("background-color", "#FFFFFF");
        $("#idDescription").css("background-color", "#FFFFFF");
      });
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

   

    //debut liste des nouveaux sinistres
    $scope.afficheListeOperation = function (
      periodeDu,
      periodeAu,
      numSinistre,
      natureSinistre
    ) {
      $scope.$emit("LOAD");
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
        numSinistre === undefined ||
        natureSinistre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.ChampsListeInvalide();
        $scope.listeOperation = "";
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeOperation = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeOperation = "";
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: "",
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            NS_CODENATURESINISTRE: natureSinistre,
            SI_NUMSINISTRE: numSinistre,
            TI_NUMTIERS: "",
            TI_DENOMINATION: "",
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
          .post("/Sinistre/ListeSinistre/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeOperation = reponse.data;
            $scope.nombreInfoBulle = $scope.listeOperation.length;
            $scope.tableauInfoBulle =
              $scope.listeOperation[0].clsObjetRetour.SL_CODEMESSAGE;
            console.log($scope.tableauInfoBulle);
            console.log($scope.listeOperation);
            if (
              $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT === "FALSE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeOperation[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin liste des nouveaux sinistres

    //debut focus sur le champ
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idDate").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTempsHeure").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTempsMinute").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatureSinistre").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVille").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idCommune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAdresseGeo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDescription").focusin(function () {
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

    //Debut ajout ouverture dossier
    $scope.validerOuvertureDossier = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      
      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));

      $scope.heureSinistre =
        $scope.FormAddOuvertureDSP.heure +
        ":" +
        $scope.FormAddOuvertureDSP.minute;
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeMontant = /^[0-9]{1,15}$/;
      let typeHeureMinute = /^[0-9]{2}$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      if ($scope.FormAddOuvertureDSP.Date !== undefined) {
        $scope.lAnnee = $scope.FormAddOuvertureDSP.Date.substr(6, 4);
        $scope.leMois = $scope.FormAddOuvertureDSP.Date.substr(3, 2);
        $scope.leJour = $scope.FormAddOuvertureDSP.Date.substr(0, 2);
      }

      if (
        $scope.FormAddOuvertureDSP.Date === "" ||
        $scope.FormAddOuvertureDSP.Date === undefined ||
        $scope.FormAddOuvertureDSP.heure === "" ||
        $scope.FormAddOuvertureDSP.heure === undefined ||
        $scope.FormAddOuvertureDSP.minute === "" ||
        $scope.FormAddOuvertureDSP.minute === undefined ||
        $scope.FormAddOuvertureDSP.NatSinistre === "" ||
        $scope.FormAddOuvertureDSP.NatSinistre === undefined ||
        $scope.FormAddOuvertureDSP.Pays === "" ||
        $scope.FormAddOuvertureDSP.Pays === undefined ||
        $scope.FormAddOuvertureDSP.Ville === "" ||
        $scope.FormAddOuvertureDSP.Ville === undefined ||
        $scope.FormAddOuvertureDSP.Commune === "" ||
        $scope.FormAddOuvertureDSP.Commune === undefined ||
        $scope.FormAddOuvertureDSP.AdresseGeo === "" ||
        $scope.FormAddOuvertureDSP.AdresseGeo === undefined ||
        $scope.FormAddOuvertureDSP.DescriptionSinistre === "" ||
        $scope.FormAddOuvertureDSP.DescriptionSinistre === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddOuvertureDSP.Date === "" ||
            $scope.FormAddOuvertureDSP.Date === undefined
          ) {
            $("#idDate").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.heure === "" ||
            $scope.FormAddOuvertureDSP.heure === undefined
          ) {
            $("#idTempsHeure").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.minute === "" ||
            $scope.FormAddOuvertureDSP.minute === undefined
          ) {
            $("#idTempsMinute").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.NatSinistre === "" ||
            $scope.FormAddOuvertureDSP.NatSinistre === undefined
          ) {
            $("#idNatureSinistre").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.Pays === "" ||
            $scope.FormAddOuvertureDSP.Pays === undefined
          ) {
            $("#idPays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.Ville === "" ||
            $scope.FormAddOuvertureDSP.Ville === undefined
          ) {
            $("#idVille").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.Commune === "" ||
            $scope.FormAddOuvertureDSP.Commune === undefined
          ) {
            $("#idCommune").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.AdresseGeo === "" ||
            $scope.FormAddOuvertureDSP.AdresseGeo === undefined
          ) {
            $("#idAdresseGeo").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddOuvertureDSP.DescriptionSinistre === "" ||
            $scope.FormAddOuvertureDSP.DescriptionSinistre === undefined
          ) {
            $("#idDescription").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (typeDate.test($scope.FormAddOuvertureDSP.Date) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnnee) == true &&
        $scope.leMois == "02" &&
        $scope.leJour > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnnee) == false &&
        $scope.leMois == "02" &&
        $scope.leJour > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
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
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin($scope.FormAddOuvertureDSP.Date) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idDate").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La date de l'ouverture du dossier ne doit pas être supérieure à la date de la journée de travail";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeHeureMinute.test($scope.FormAddOuvertureDSP.heure) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une heure correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormAddOuvertureDSP.heure < 0 ||
        $scope.FormAddOuvertureDSP.heure > 23
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTempsHeure").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une heure correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeHeureMinute.test($scope.FormAddOuvertureDSP.minute) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une minute correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.FormAddOuvertureDSP.minute < 0 ||
        $scope.FormAddOuvertureDSP.minute > 59
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idTempsMinute").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une minute correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeMontant.test($scope.FormAddOuvertureDSP.MontantPrej) == false &&
        $scope.FormAddOuvertureDSP.MontantPrej == undefined
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
          $scope.SI_CODESINISTRE = $scope.recuperer.SI_CODESINISTRE;
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "MODIFICATION";
        } else {
          $scope.TYPEOPERATION = "0";
          $scope.SL_LIBELLEMOUCHARDAJOUTMODIF = "INSERTION";
        }
        if($scope.FormAddOuvertureDSP.Conducteur == undefined || $scope.FormAddOuvertureDSP.Conducteur == ""){
          $scope.FormAddOuvertureDSP.Conducteur = ""
        }
        
        if ($scope.FormAddOuvertureDSP.DateNaissance == undefined || $scope.FormAddOuvertureDSP.DateNaissance == "") {
          $scope.FormAddOuvertureDSP.DateNaissance = "01-01-1900";
        }
        if ($scope.FormAddOuvertureDSP.Delivrele == undefined || $scope.FormAddOuvertureDSP.Delivrele == "") {
          $scope.FormAddOuvertureDSP.Delivrele = "01-01-1900";
        }
        if ($scope.FormAddOuvertureDSP.Validite == undefined || $scope.FormAddOuvertureDSP.Validite == "") {
          $scope.FormAddOuvertureDSP.Validite = "01-01-1900";
        }
        if ($scope.FormAddOuvertureDSP.NumeroTelephone == undefined || $scope.FormAddOuvertureDSP.NumeroTelephone == "") {
          $scope.FormAddOuvertureDSP.NumeroTelephone = "0";
        }
        if ($scope.FormAddOuvertureDSP.NumeroWhatsApp == undefined || $scope.FormAddOuvertureDSP.NumeroWhatsApp == "") {
          $scope.FormAddOuvertureDSP.NumeroWhatsApp = "0";
        }
        if ($scope.FormAddOuvertureDSP.NumeroPermis == undefined || $scope.FormAddOuvertureDSP.NumeroPermis == "") {
          $scope.FormAddOuvertureDSP.NumeroPermis = "0";
        }
        if ($scope.FormAddOuvertureDSP.Immatriculation == undefined || $scope.FormAddOuvertureDSP.Immatriculation == "") {
          $scope.FormAddOuvertureDSP.Immatriculation = "";
        }
        if ($scope.FormAddOuvertureDSP.Marque == undefined || $scope.FormAddOuvertureDSP.Marque == "") {
          $scope.FormAddOuvertureDSP.Marque = "";
        }
        if ($scope.FormAddOuvertureDSP.Nometcontactdesvictime == undefined || $scope.FormAddOuvertureDSP.Nometcontactdesvictime == "") {
          $scope.FormAddOuvertureDSP.Nometcontactdesvictime = "";
        }
        if ($scope.FormAddOuvertureDSP.Nombredeblessesvehiculeassur == undefined || $scope.FormAddOuvertureDSP.Nombredeblessesvehiculeassur == "") {
          $scope.FormAddOuvertureDSP.Nombredeblessesvehiculeassur = "0";
        }
        if ($scope.FormAddOuvertureDSP.Nombrededecesvehiculeassur == undefined || $scope.FormAddOuvertureDSP.Nombrededecesvehiculeassur == "") {
          $scope.FormAddOuvertureDSP.Nombrededecesvehiculeassur = "0";
        }
        if ($scope.FormAddOuvertureDSP.Nombredeblessesvehiculetiers == undefined || $scope.FormAddOuvertureDSP.Nombredeblessesvehiculetiers == "") {
          $scope.FormAddOuvertureDSP.Nombredeblessesvehiculetiers = "0";
        }
        if ($scope.FormAddOuvertureDSP.Nombrededecesvehiculetiers == undefined || $scope.FormAddOuvertureDSP.Nombrededecesvehiculetiers == "") {
          $scope.FormAddOuvertureDSP.Nombrededecesvehiculetiers = "0";
        }
        if ($scope.FormAddbtnsinistre.Gendarmerie == undefined || $scope.FormAddbtnsinistre.Gendarmerie == "") {
          $scope.FormAddbtnsinistre.Gendarmerie = "N";
        }
        if ($scope.FormAddbtnsinistre.Huissier == undefined || $scope.FormAddbtnsinistre.Huissier == "") {
                  $scope.FormAddbtnsinistre.Huissier = "N";
                }
        if ($scope.FormAddbtnsinistre.Amiable == undefined || $scope.FormAddbtnsinistre.Amiable == "") {
                  $scope.FormAddbtnsinistre.Amiable = "N";
                }
        if ($scope.FormAddbtnsinistre.AilearriereDroit == undefined || $scope.FormAddbtnsinistre.AilearriereDroit == "") {
                  $scope.FormAddbtnsinistre.AilearriereDroit = "N";
                }
        if ($scope.FormAddbtnsinistre.AilearriereGauche == undefined || $scope.FormAddbtnsinistre.AilearriereGauche == "") {
                  $scope.FormAddbtnsinistre.AilearriereGauche = "N";
                }
        if ($scope.FormAddbtnsinistre.Parechocavant == undefined || $scope.FormAddbtnsinistre.Parechocavant == "") {
                  $scope.FormAddbtnsinistre.Parechocavant = "N";
                }
        if ($scope.FormAddbtnsinistre.Parechocarriere == undefined || $scope.FormAddbtnsinistre.Parechocarriere == "") {
                  $scope.FormAddbtnsinistre.Parechocarriere = "N";
                }
        if ($scope.FormAddbtnsinistre.Lateraldroit == undefined || $scope.FormAddbtnsinistre.Lateraldroit == "") {
                  $scope.FormAddbtnsinistre.Lateraldroit = "N";
                }
        if ($scope.FormAddbtnsinistre.Lateralgauche == undefined || $scope.FormAddbtnsinistre.Lateralgauche == "") {
                  $scope.FormAddbtnsinistre.Lateralgauche = "N";
                }
        if ($scope.FormAddbtnsinistre.Capotmoteur == undefined || $scope.FormAddbtnsinistre.Capotmoteur == "") {
                  $scope.FormAddbtnsinistre.Capotmoteur = "N";
                }
                if ($scope.FormAddOuvertureDSP.Contact == undefined || $scope.FormAddOuvertureDSP.Contact == "") {
                  $scope.FormAddOuvertureDSP.Contact = "0";
                }
                if ($scope.FormAddOuvertureDSP.NumeroTelephone == undefined || $scope.FormAddOuvertureDSP.NumeroTelephone == "") {
                  $scope.FormAddOuvertureDSP.NumeroTelephone = "0";
                }
                if ($scope.FormAddOuvertureDSP.NumeroWhatsApp == undefined || $scope.FormAddOuvertureDSP.NumeroWhatsApp == "") {
                  $scope.FormAddOuvertureDSP.NumeroWhatsApp = "0";
                } 
        if($scope.collectionContartOp.RQ_CODERISQUE != '06'){
          $scope.FormAddOuvertureDSP.Conducteur = $scope.FormAddOuvertureDSP.nomcondcteur
        }        
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            SI_CODESINISTRE: $scope.SI_CODESINISTRE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            NS_CODENATURESINISTRE: $scope.FormAddOuvertureDSP.NatSinistre,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            SI_NUMSINISTRE: $scope.FormAddOuvertureDSP.SinistreN,
            SI_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            SI_DATESINISTRE: $scope.FormAddOuvertureDSP.Date,
            SI_HEURESINISTRE: $scope.heureSinistre,
            SI_NOMPRENOMSCONDUCTEURSINISTRE: $scope.FormAddOuvertureDSP.Conducteur,
            CO_CODECOMMUNE: $scope.FormAddOuvertureDSP.Commune,
            SI_ADRESSEGEOGRPHIQUESINISTRE:
              $scope.FormAddOuvertureDSP.AdresseGeo,
            SI_DESCRIPTIONSINISTRE:
              $scope.FormAddOuvertureDSP.DescriptionSinistre,
            "SI_TELPHONEAGENT": $scope.FormAddOuvertureDSP.Contact,
            SI_DATETRANSMISSIONSINISTRE: "01-01-1900",
            SI_DATEVALIDATIONSINISTRE: "01-01-1900",
            SI_DATESUSPENSIONSINISTRE: "01-01-1900",
            SI_DATECLOTURESINISTRE: "01-01-1900",
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SI_DOCUMENTTRANSMIS: "",
            SI_MONTANTPREJUDICE: '0',//$scope.FormAddOuvertureDSP.MontantPrej,
            EP_CODEEXPERTNOMME: "",
            SI_DATEEXPERTNOMMESINISTRE: "01-01-1900",
            SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDAJOUTMODIF,
            "SI_HUSSIER": $scope.FormAddbtnsinistre.Huissier,
            "SI_PVCONSTATPOLICE": $scope.FormAddbtnsinistre.Police,
            "SI_PVGENDARMERIE": $scope.FormAddbtnsinistre.Gendarmerie,

            "SI_TELEPHONECONDUCTEURSINISTRE": $scope.FormAddOuvertureDSP.NumeroTelephone,
            "SI_NUMWHATSAPPCONDUCTEURSINISTRE": $scope.FormAddOuvertureDSP.NumeroWhatsApp,
            "SI_DATENAISSANCECONDUCTEURSINISTRE": $scope.FormAddOuvertureDSP.DateNaissance,
            "SI_NUMPERMISCONDUCTEURSINISTRE": $scope.FormAddOuvertureDSP.NumeroPermis,
            "SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE": $scope.FormAddOuvertureDSP.Delivrele,
            "SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE": $scope.FormAddOuvertureDSP.Validite,
            "SI_IMMATRICULATIONVEHICULE": $scope.FormAddOuvertureDSP.Immatriculation,
            "SI_MARQUEVEHICULE": $scope.FormAddOuvertureDSP.Marque,
            "SI_NOMETCONTACTSVICTIMES": $scope.FormAddOuvertureDSP.Nometcontactdesvictime,
            "SI_AILEARRIEREDROIT": $scope.FormAddbtnsinistre.AilearriereDroit,
            "SI_AILEARRIEREGAUCHE": $scope.FormAddbtnsinistre.AilearriereGauche,
            "SI_PARCHOCAVANT": $scope.FormAddbtnsinistre.Parechocavant,
            "SI_PARCHOCARRIERE": $scope.FormAddbtnsinistre.Parechocarriere,
            "SI_LATERALGAUCHE": $scope.FormAddbtnsinistre.Lateralgauche,
            "SI_LATERALDROIT": $scope.FormAddbtnsinistre.Lateraldroit,
            "SI_CAPOTMOTEUR": $scope.FormAddbtnsinistre.Capotmoteur,
            "SI_AUTRES": "",
            "SI_REPARATEUR": $scope.FormAddOuvertureDSP.Reparateur,
            "SI_NOMBREBLESSESVEHICULEASSURE": $scope.FormAddOuvertureDSP.Nombredeblessesvehiculeassur,
            "SI_NOMBREDECESVEHICULEASSURE": $scope.FormAddOuvertureDSP.Nombrededecesvehiculeassur,
            "SI_NOMBREBLESSESVEHICULETIERS": $scope.FormAddOuvertureDSP.Nombredeblessesvehiculetiers,
            "SI_NOMBREDECESVEHICULETIERS": $scope.FormAddOuvertureDSP.Nombrededecesvehiculetiers,
           
           
            "SI_PVAMIABLE": $scope.FormAddbtnsinistre.Amiable,
            "SI_UNITE": $scope.FormAddOuvertureDSP.Unite,
            "SI_NOMAGENT": $scope.FormAddOuvertureDSP.NomdelAgent,
            
           

            TYPEOPERATION: $scope.TYPEOPERATION,
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
          },
        ];

        if ($scope.etatForm == "2") {
          $http
            .post("/Sinistre/ModifSinistre/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.tabEngOuvertureDoc = reponse.data;
              if (
                $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.RetourSurListe = function () {
                  window.location.href =
                    "#/assurances/operation/multirisque-pro/liste/ouverture-dossier";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/Sinistre/AjoutSinistre/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.tabEngOuvertureDoc = reponse.data;
              if (
                $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.FormAddOuvertureDSP = {};
                window.location.reload()
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.tabEngOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout ouverture dossier (contrat)

    //debut voir plus
    $scope.voirPlusODSP = function (info) {
      sessionStorage.setItem("vpS", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpS"));
      console.log($scope.recuperer);
    };
    //fin voir plus

    //debut acceder a la page de modification 1
    $scope.voirModification = function (info) {
      sessionStorage.setItem("modifOD", JSON.stringify(info));
      window.location.href =
        "#/assurances/operation/multirisque-pro/modification/ouverture-dossier";
    };
    //fin acceder a la page de modification 1

    //debut acceder a la page document garder en suspen
    $scope.voirLesPhotos = function (info) {
      $scope.recupPhoto = JSON.parse(
        sessionStorage.getItem("TelechargerImage")
      );
      window.location.href =
        "#/assurances/operation/multirisque-pro/document/ouverture-dossier";
    };
    //fin acceder a la page document

    //debut acceder a la page de telechargement de l'image
    $scope.allerTelechargerImage = function (info) {
      sessionStorage.setItem("TelechargerImage", JSON.stringify(info));
      $scope.listeDesDocuments();
    };
    //fin acceder a la page de telechargement de l'image

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.elmntSupprimerOuvertureDoc = [];
    $scope.supprimeSinistre = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: recupId,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARDSUPPRESSION,
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
        .post("/Sinistre/SuppressionSinistre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.elmntSupprimerOuvertureDoc = reponse.data;
          if (
            $scope.elmntSupprimerOuvertureDoc[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.elmntSupprimerOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeOperation[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $scope.MessageErreur =
              "Il ne vous est pas permis de supprimer ce sinistre car il est en cours d'utilisation.";
            $rootScope.SuppressionNonReussie($scope.MessageErreur);
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.elmntSupprimerOuvertureDoc[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin recuperer id pour la suppression

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.FormListe.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListe.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListe.numSinistre = "";
      $scope.FormListe.natureSinistre = "";
    };
    //fin pour annuler la recherche

    //debut liste des villes pour la modification
    $scope.afficheListeVille = function (id) {
      $scope.listeDesCommunes = [];
      $scope.FormAddOuvertureDSP.Commune = "";
    //  $scope.FormAddOuvertureDSP.Ville = "";
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
            $scope.afficheListeCommuneModif($scope.recupererInfo.VL_CODEVILLE);
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
    //fin liste des villes pour la modification

    //debut liste des communes pour la modification
    $scope.afficheListeCommune = function (id) {
      $scope.FormAddOuvertureDSP.Commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: id,
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunes = reponse.data;
          if (
            $scope.listeDesCommunes[0].clsObjetRetour.SL_RESULTAT === "FALSE"
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
        .post("/Commune/ListeCommune/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesCommunes = reponse.data;
          if (
            $scope.listeDesCommunes[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunes[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunes);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunes[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des communes pour la modification

    //debut liste doc
    $scope.listeDesDocuments = function () {
      $scope.$emit("LOAD");
      $scope.leCodeDuSinistre = JSON.parse(
        sessionStorage.getItem("TelechargerImage")
      );
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: $scope.leCodeDuSinistre.SI_CODESINISTRE,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: "LISTE DOCUMENT",
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
        .post("/Sinistre/ListePhotoSinistre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeAffichePhotoSinistre = reponse.data;
          $scope.nombreInfoBulle = $scope.listeAffichePhotoSinistre.length;
          $scope.tableauInfoBulle =
            $scope.listeAffichePhotoSinistre[0].clsObjetRetour.SL_CODEMESSAGE;
          console.log($scope.tableauInfoBulle);
          sessionStorage.setItem(
            "photosEnregistrees",
            JSON.stringify($scope.listeAffichePhotoSinistre)
          );
          console.log($scope.listeAffichePhotoSinistre);
        });
    };
    //fin liste doc

    //debut recuperer id doc
    $scope.recupererIdDoc = function (doc) {
      sessionStorage.setItem("doc", JSON.stringify(doc));
    };
    //fin recuperer id doc

    //debut supprimer le document
    $scope.supprimerDocument = function (paramId, paramNum) {
      $scope.objet_envoie = [
        {
          SI_CODESINISTRE: paramId,
          SI_NUMSEQUENCEPHOTO: paramNum,
          SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
          SL_LIBELLEMOUCHARD: "SUPPRESSION DOCUMENT",
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
        .post("/Sinistre/SuppressionPhotoSinistre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabSupprDocument = reponse.data;
          if (
            $scope.tabSupprDocument[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $rootScope.SuppressionReussie(
              $scope.tabSupprDocument[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeDesDocuments();
          } else {
            $rootScope.SuppressionNonReussie();
          }
        })
        .catch(function () {
          $rootScope.ProblemeServeur(
            $scope.tabSupprDocument[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin supprimer le document
    //fin liste des banques
    $scope.clicRetourListe = function () {
        
      switch ($scope.collectionContartOp.RQ_CODERISQUE) {
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
        case "12":
            window.location.href =
              "#/assurances/operation/liste/MultirisqueImmeuble";
         break;  
      }
    };

    //debut retour sur liste operation
    $scope.clicRetourListeOp = function () {
      $scope.positionEcran = angular.fromJson(
        localStorage.getItem("positionEcran")
      );
      switch ($scope.positionEcran) {
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
          case "12":
            window.location.href =
              "#/assurances/operation/liste/MultirisqueImmeuble";
         break;
      }
    };
    //fin retour sur liste operation

    //
    $scope.addDocumentProject = function (projet) {
      for (i = 0; i < $scope.formProjectData.documentProject.length; i++) {
        var fileName = $scope.formProjectData.documentProject[i].fileName;
        var formDataDocs = new FormData();
        var files = $("#ipF" + i).get(0).files;
        formDataDocs.append("UploadFile", files[0]);

        $.ajax({
          url: "ControllersLogiciels/Projet/pvgCopyTaskDocs/",
          data: formDataDocs,
          processData: false,
          contentType: false,
          type: "POST",
          success: function (data) {
            if (data != "") {
              var objet_envoie = [
                {
                  PR_IDPROJET: projet.PR_IDPROJET,
                  DO_LIBELLEDOCCUMENTORG: fileName,
                  DO_IDDOCUMENTORGTYPE: "1",
                  DO_URLDOCUMENTORG: data,
                  DO_DATECREATIONDOCUMENTORG: "01-01-1900",
                  OP_CODEOPERATEUR: "",
                  SL_LIBELLEECRAN: $scope.SL_LIBELLEECRAN,
                  SL_LIBELLEMOUCHARD: "INSERTIONS DOCUMENT",
                  TYPEOPERATION: "0",
                  LG_CODELANGUE: "fr",
                  clsObjetEnvoi: {
                    OE_A: "",
                    OE_Y: "",
                    OE_J: "",
                  },
                },
              ];

              $http
                .post(
                  "ControllersLogiciels/Document/pvgMiseAjour/",
                  objet_envoie,
                  {
                    headers: $scope.headers,
                  }
                )
                .then(function (result) {})
                .catch(function () {});
            }
          },
        });
      }
    };
    //

    /*FIN DEV JJ*/

    /*DEV YAYA*/
    $scope.voirRemiseDeCheque = function (recupererColl) {
      localStorage.setItem("idOuvreDossier", JSON.stringify(recupererColl));
      window.location.href = "#/assurances/operation/liste/ListeRemiseDeCheque";
    };
    /*DEV YAYA*/

    $scope.tableauimage = [];
    $scope.tableauimage2 = [];
    $scope.tabEngReglement = [];
    $scope.newtab = [];
    var reader = {};
    $scope.imagememoire = "";
    var image = {};
    $scope.idimagcheque = "";
    $scope.collecionimage = {};

    $scope.pretACharger = false;
    $scope.chargerLeFichier = function () {
      let file = document.querySelector("#upload").files;
      // let fichier = document.querySelector('input[type=file]').files;

      var readAndPreview = function (file) {
        // Veillez à ce que `file.name` corresponde à nos critères d’extension
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          $scope.pretACharger = true;
          reader = new FileReader();
          var tbsl = [];
          reader.addEventListener(
            "load",
            function () {
              image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              $scope.tableauimage2.push(image.src);
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
          $rootScope.MessageDerreurDesTypes(
            "Format de fichier non prit en charge. Veuillez selectionner des images au format PNG ou JPEG ou JPG"
          );
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
    };

    $scope.recupsuprimg = function (lien) {
      $scope.idimagcheque = lien;
    };
    $scope.suprimg = function () {
      var tbsll = [];
      for (i = 0; $scope.tableauimage2.length > i; i++) {
        if ($scope.idimagcheque == i) {
          $scope.tableauimage2.splice(i, 1);
        }
      }

      //tbsll = $scope.idimagcheque.split(',');
      for (i = 0; $scope.tableauimage.length > i; i++) {
        if ($scope.idimagcheque == i) {
          $scope.tableauimage.splice(i, 1);
        }
      }
      $scope.afficherimage();
    };

    //debut enregistrement Photo
    $scope.enregistrerPhotoSinistre = function () {
      if ($scope.pretACharger == false) {
        $rootScope.EnregistrementNonReussi("Veuillez charger le fichier");
      } else {
        $scope.$emit("LOAD");
        $scope.recupPhoto = JSON.parse(
          sessionStorage.getItem("TelechargerImage")
        );

        $scope.objet_envoie = [];
        // enregistrer les anciennes photos
        $scope.recupTabPhotoEnregistrees = JSON.parse(
          sessionStorage.getItem("photosEnregistrees")
        );
        if (
          $scope.recupTabPhotoEnregistrees[0].clsObjetRetour.SL_CODEMESSAGE ==
          "00"
        ) {
          for (
            let index = 0;
            index < $scope.recupTabPhotoEnregistrees.length;
            index++
          ) {
            $scope.objet_envoi_image_old = {
              SI_CODESINISTRE: $scope.recupPhoto.SI_CODESINISTRE,
              SI_NUMSEQUENCEPHOTO: "",
              SI_CHEMINPHOTO:
                $scope.recupTabPhotoEnregistrees[index].SI_CHEMINPHOTO,
              SI_LIBELLEPHOTO: "test",
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
            };

            $scope.objet_envoie.push($scope.objet_envoi_image_old);
          }
        }

        // enregistrer les nouvelles photos
        for (let index = 0; index < $scope.tableauimage.length; index++) {
          $scope.objet_envoi_image = {
            SI_CODESINISTRE: $scope.recupPhoto.SI_CODESINISTRE,
            SI_NUMSEQUENCEPHOTO: "",
            SI_CHEMINPHOTO: $scope.tableauimage[index],
            SI_LIBELLEPHOTO: "test",
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
          };

          $scope.objet_envoie.push($scope.objet_envoi_image);
        }

        $http
          .post("/Sinistre/AjoutPhotoSinistre/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.retourPhotoSinistre = reponse.data;
            if (
              $scope.retourPhotoSinistre[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.retourPhotoSinistre[0].clsObjetRetour.SL_MESSAGE
              );

              $scope.tableauimage = [];
              console.log($scope.tableauimage);
              $scope.tableauimage2 = [];
              console.log($scope.tableauimage2);
              $scope.pretACharger = false;

              $scope.fermerModal = "modal";
              console.log($scope.fermerModal);
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.retourPhotoSinistre[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.retourPhotoSinistre[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    //Fin  enregistrement Photo

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdPhoto = function (idSnistre, numSeqPhoto) {
      $scope.sinistreId = idSnistre;
      $scope.numsequence = numSeqPhoto;
    };
    //fin recuperer id pour la suppression

    // debut agrandir photo
    $scope.indexPhotoSelect = "";
    $scope.agrandirPhoto = function (index) {
      $scope.indexPhotoSelect = index;
    };
    // fin agrandir photo

    // DEBUT COMBOS

    //debut liste des pays
    $scope.afficheListeDesPaysOuvertureDSP = function () {
      $scope.$emit("LOAD");
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
          $scope.listeDesPaysOuvertureDSP = reponse.data;
          if (
            $scope.listeDesPaysOuvertureDSP[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeSinistreOuvertureDSP();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysOuvertureDSP[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPaysOuvertureDSP);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysOuvertureDSP[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des sinitres
    $scope.afficheListeSinistreOuvertureDSP = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          NS_CODENATURESINISTRE: $scope.FormAddOuvertureDSP.NatSinistre,
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
        .post("/Sinistre/ListeNatSinistre/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesSinistreOuvertureDSP = reponse.data;
          if (
            $scope.listeDesSinistreOuvertureDSP[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifODSP, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesSinistreOuvertureDSP[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesSinistreOuvertureDSP);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesSinistreOuvertureDSP[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des sinistres

    //debut acceder a la page de modification 2
    $scope.retourModifODSP = function () {
      $scope.etatForm = "2";
      $scope.etatFormAutre = $scope.collectionContartOp.RQ_CODERISQUE
      $scope.recupererInfo = JSON.parse(sessionStorage.getItem("modifOD"));
      console.log($scope.recupererInfo);

      $scope.FormAddOuvertureDSP.SinistreN =
        $scope.recupererInfo.SI_NUMSINISTRE;
      $scope.FormAddOuvertureDSP.Date = $scope.recupererInfo.SI_DATESINISTRE;
      $scope.FormAddOuvertureDSP.heure =
        $scope.recupererInfo.SI_HEURESINISTRE.substr(0, 2);
      $scope.FormAddOuvertureDSP.minute =
        $scope.recupererInfo.SI_HEURESINISTRE.substr(3, 2);
      $scope.FormAddOuvertureDSP.NatSinistre =
        $scope.recupererInfo.NS_CODENATURESINISTRE;
      $scope.FormAddOuvertureDSP.Pays = $scope.recupererInfo.PY_CODEPAYS;
      $scope.FormAddOuvertureDSP.Ville = $scope.recupererInfo.VL_CODEVILLE;
      $scope.FormAddOuvertureDSP.Commune = $scope.recupererInfo.CO_CODECOMMUNE;
      $scope.FormAddOuvertureDSP.MontantPrej =
        $scope.recupererInfo.SI_MONTANTPREJUDICENF;
      $scope.FormAddOuvertureDSP.AdresseGeo =
        $scope.recupererInfo.SI_ADRESSEGEOGRPHIQUESINISTRE;
      $scope.FormAddOuvertureDSP.DescriptionSinistre =
        $scope.recupererInfo.SI_DESCRIPTIONSINISTRE;

        $scope.FormAddOuvertureDSP.nomcondcteur = $scope.recupererInfo.SI_NOMPRENOMSCONDUCTEURSINISTRE;  
        $scope.FormAddOuvertureDSP.Conducteur =
        $scope.recupererInfo.SI_NOMPRENOMSCONDUCTEURSINISTRE;  
        $scope.FormAddOuvertureDSP.Contact = $scope.recupererInfo.SI_TELPHONEAGENT;  
        $scope.FormAddbtnsinistre.Huissier = $scope.recupererInfo.SI_HUSSIER; 
        $scope.FormAddbtnsinistre.Police = $scope.recupererInfo.SI_PVCONSTATPOLICE; 
        $scope.FormAddbtnsinistre.Gendarmerie= $scope.recupererInfo.SI_PVGENDARMERIE; 

        $scope.FormAddOuvertureDSP.NumeroTelephone = $scope.recupererInfo.SI_TELEPHONECONDUCTEURSINISTRE
        $scope.FormAddOuvertureDSP.NumeroWhatsApp = $scope.recupererInfo.SI_NUMWHATSAPPCONDUCTEURSINISTRE
        $scope.FormAddOuvertureDSP.DateNaissance = $scope.recupererInfo.SI_DATENAISSANCECONDUCTEURSINISTRE
        $scope.FormAddOuvertureDSP.NumeroPermis = $scope.recupererInfo.SI_NUMPERMISCONDUCTEURSINISTRE
        $scope.FormAddOuvertureDSP.Delivrele = $scope.recupererInfo.SI_DATEDELIVRANCEPERMISCONDUCTEURSINISTRE
        $scope.FormAddOuvertureDSP.Validite = $scope.recupererInfo.SI_DATEVALIDITEPERMISCONDUCTEURSINISTRE
        $scope.FormAddOuvertureDSP.Immatriculation = $scope.recupererInfo.SI_IMMATRICULATIONVEHICULE
        $scope.FormAddOuvertureDSP.Marque = $scope.recupererInfo.SI_MARQUEVEHICULE
        $scope.FormAddOuvertureDSP.Nometcontactdesvictime = $scope.recupererInfo.SI_NOMETCONTACTSVICTIMES
        $scope.FormAddbtnsinistre.AilearriereDroit = $scope.recupererInfo.SI_AILEARRIEREDROIT
        $scope.FormAddbtnsinistre.AilearriereGauche = $scope.recupererInfo.SI_AILEARRIEREGAUCHE
        $scope.FormAddbtnsinistre.Parechocavant = $scope.recupererInfo.SI_PARCHOCAVANT
        $scope.FormAddbtnsinistre.Parechocarriere = $scope.recupererInfo.SI_PARCHOCARRIERE
        $scope.FormAddbtnsinistre.Lateralgauche = $scope.recupererInfo.SI_LATERALGAUCHE
        $scope.FormAddbtnsinistre.Lateraldroit = $scope.recupererInfo.SI_LATERALDROIT
        $scope.FormAddbtnsinistre.Capotmoteur = $scope.recupererInfo.SI_CAPOTMOTEUR
        $scope.FormAddOuvertureDSP.Reparateur = $scope.recupererInfo.SI_REPARATEUR
        $scope.FormAddOuvertureDSP.Nombredeblessesvehiculeassur = $scope.recupererInfo.SI_NOMBREBLESSESVEHICULEASSURE
        $scope.FormAddOuvertureDSP.Nombrededecesvehiculeassur = $scope.recupererInfo.SI_NOMBREDECESVEHICULEASSURE
        $scope.FormAddOuvertureDSP.Nombredeblessesvehiculetiers = $scope.recupererInfo.SI_NOMBREBLESSESVEHICULETIERS
        $scope.FormAddOuvertureDSP.Nombrededecesvehiculetiers = $scope.recupererInfo.SI_NOMBREDECESVEHICULETIERS
           
           
        $scope.FormAddbtnsinistre.Amiable = $scope.recupererInfo.SI_PVAMIABLE
        $scope.FormAddOuvertureDSP.Unite = $scope.recupererInfo.SI_UNITE
        $scope.FormAddOuvertureDSP.NomdelAgent = $scope.recupererInfo.SI_NOMAGENT

      $scope.afficheListeVilleModif($scope.recupererInfo.PY_CODEPAYS);
    };
    //fin acceder a la page de modification 2

//gestion des combos
$scope.COCHE = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE1 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE2 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE3 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE4 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE5 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE6 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE7 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE8 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE9 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.COCHE10 = function (item) {
  if (item == "O") {
    return true;
  }
};
$scope.testval = function (item) {
  if ($scope.cpt == 0) {
    $scope.FormAddbtnsinistre.Police = "O";
    $scope.cpt++;
  } else {
    $scope.FormAddbtnsinistre.Police = "N";
    $scope.cpt = 0;
  }
  console.log($scope.FormAddbtnsinistre.Police);
};
$scope.testval1 = function (item) {
  if ($scope.cpt1 == 0) {
    $scope.FormAddbtnsinistre.Gendarmerie = "O";
    $scope.cpt1++;
  } else {
    $scope.FormAddbtnsinistre.Gendarmerie = "N";
    $scope.cpt1 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Gendarmerie);
};
$scope.testval2 = function (item) {
  if ($scope.cpt2 == 0) {
    $scope.FormAddbtnsinistre.Huissier = "O";
    $scope.cpt2++;
  } else {
    $scope.FormAddbtnsinistre.Huissier = "N";
    $scope.cpt2 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Huissier);
};
$scope.testval3 = function (item) {
  if ($scope.cpt3 == 0) {
    $scope.FormAddbtnsinistre.Amiable = "O";
    $scope.cpt3++;
  } else {
    $scope.FormAddbtnsinistre.Amiable = "N";
    $scope.cpt3 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Amiable);
};
$scope.testval4 = function (item) {
  if ($scope.cpt4 == 0) {
    $scope.FormAddbtnsinistre.AilearriereDroit = "O";
    $scope.cpt4++;
  } else {
    $scope.FormAddbtnsinistre.AilearriereDroit = "N";
    $scope.cpt4 = 0;
  }
  console.log($scope.FormAddbtnsinistre.AilearriereDroit);
};
$scope.testval5 = function (item) {
  if ($scope.cpt5 == 0) {
    $scope.FormAddbtnsinistre.AilearriereGauche = "O";
    $scope.cpt5++;
  } else {
    $scope.FormAddbtnsinistre.AilearriereGauche = "N";
    $scope.cpt5 = 0;
  }
  console.log($scope.FormAddbtnsinistre.AilearriereGauche);
};
$scope.testval6 = function (item) {
  if ($scope.cpt6 == 0) {
    $scope.FormAddbtnsinistre.Parechocavant = "O";
    $scope.cpt6++;
  } else {
    $scope.FormAddbtnsinistre.Parechocavant = "N";
    $scope.cpt6 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Parechocavant);
};
$scope.testval7 = function (item) {
  if ($scope.cpt7 == 0) {
    $scope.FormAddbtnsinistre.Parechocarriere = "O";
    $scope.cpt7++;
  } else {
    $scope.FormAddbtnsinistre.Parechocarriere = "N";
    $scope.cpt7 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Parechocarriere);
};
$scope.testval8 = function (item) {
  if ($scope.cpt8 == 0) {
    $scope.FormAddbtnsinistre.Lateraldroit = "O";
    $scope.cpt8++;
  } else {
    $scope.FormAddbtnsinistre.Lateraldroit = "N";
    $scope.cpt8 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Lateraldroit);
};
$scope.testval9 = function (item) {
  if ($scope.cpt9 == 0) {
    $scope.FormAddbtnsinistre.Lateralgauche = "O";
    $scope.cpt9++;
  } else {
    $scope.FormAddbtnsinistre.Lateralgauche = "N";
    $scope.cpt9 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Lateralgauche);
};
$scope.testval10 = function (item) {
  if ($scope.cpt10 == 0) {
    $scope.FormAddbtnsinistre.Capotmoteur = "O";
    $scope.cpt10++;
  } else {
    $scope.FormAddbtnsinistre.Capotmoteur = "N";
    $scope.cpt10 = 0;
  }
  console.log($scope.FormAddbtnsinistre.Capotmoteur);
};



//fin combos



    // DEBUT COMBOS
  },
]);
