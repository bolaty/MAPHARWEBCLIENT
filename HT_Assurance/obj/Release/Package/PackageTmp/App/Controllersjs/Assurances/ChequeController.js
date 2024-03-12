MapharApp.controller("ChequeController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddCheque = {
      id01: "",
      reference: "",
      montant: "",
      dateEmission: "",
      banqueTire: "",
      agBanqueTire: "",
      nomTireur: "",
      nomTire: "",
      dateReception: "",
      nomDeposant: "",
      telDeposant: "",
      effet: "",
      img_photo: [],
      img_signature: [],
    };
    $scope.FormListCheque = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      numeroCheque: "",
      BanqueTire: "",
      montant1: "",
      montant2: "",
      AgBanqueTire: "",
    };
    $scope.chequeDoc = [
      {
        fichier: "",
      },
    ];
    $scope.listPhotoChequeImpressionmpression = [];
    $scope.listeCheque = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.testSuppressionCheque = [];
    $scope.testAjoutCheque = [];
    $scope.listeBanqueTire = [];
    $scope.listeBanqueAgence = [];
    $scope.testPhotoCheque = [];
    $scope.listeDocument = [];
    $scope.listeValider = [];
    $scope.idCheque = "";
    $scope.idCheque1 = "";
    $scope.idCheque2 = "";
    $scope.idCheque3 = "";
    $scope.recuperer = [];
    $scope.recupererInfoCheque = {};
    $scope.testModificationCheque = [];
    $scope.listeChequeDocument = [];
    $scope.deleteChequePhoto = [];
    $scope.image = {
      img: [{ upload: "" }],
    };
    $scope.ajoutImage = function () {
      //                let cheminImage = "/Content/assets/media/illustration/undraw_profile_pic_ic5t.svg"
      $scope.image.img.push({ upload: $scope.avatar });
    };

    $scope.fermerModal = "";

    $scope.idElement = "";
    $scope.idElement0 = "";
    $scope.idElement1 = "";
    $scope.idElement2 = "";
    $scope.id01 = "";
    $scope.id02 = "";
    $scope.idElementPhoto = "";
    $scope.cheminCheq = "";
    $scope.libPhoto = "";
    ($scope.cheqId1 = ""),
      ($scope.cheqId2 = ""),
      ($scope.cheqId3 = ""),
      ($scope.etatForm = "");
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
        let nouvelleDate = new Date(dateDebut);
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };
    $scope.dateSuperioriteFin = function (dateFin) {
      if (dateFin != "") {
        let nouvelleDate = new Date(dateFin);
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

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddCheque = function () {
      $scope.initFormAddCheque();
      $scope.FormAddCheque = {};
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    /*FIN FONCTION GENERALE*/

    //debut initialisation add Cheque
    $scope.initFormListCheque = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeBanqueTire();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add Cheque

    //debut initialisation add Cheque
    $scope.initFormAddCheque = function () {
      $scope.afficheListeBanqueTire();
    };
    //fin initialisation add Cheque

    //debut initialisation add Cheque
    $scope.initFormModifCheque = function () {
      $scope.etatForm = "2";
      $scope.afficheListeBanqueTire();
    };
    //fin initialisation add Cheque

    //Debut developpement ANICETTE

    //debut voir plus Cheque
    $scope.voirPlusCheque = function (info) {
      sessionStorage.setItem("vpCheque", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpCheque"));
    };
    //fin voir plus Cheque

    //debut voir plus Cheque
    $scope.voirPhotoCheque = function () {
      $scope.recupererPhoto = JSON.parse(
        sessionStorage.getItem("vpPhotoCheque")
      );
      console.log($scope.recupererPhoto);
    };
    //fin voir plus Cheque

    //debut acceder a la page de modification
    $scope.voirModifCheque = function (info) {
      sessionStorage.setItem("modifCheque", JSON.stringify(info));
      window.location.href = "#/assurances/operation/modification/cheque";
    };
    //fin acceder a la page de modification Cheque

    //debut fonction pour annuler la recherche
    $scope.listeChequeAnnuler = function () {
      //$scope.FormListCheque = {};
      //$scope.FormListCheque.periodeDu = $rootScope.journeeDeTravail;
      //$scope.FormListCheque.periodeAu = $rootScope.journeeDeTravail;
      setTimeout($scope.rechargePage, 3600);
    };
    //fin fonction pour annuler la recherche

    //debut contrainte sur les champs list CHEQUE
    $scope.contrainteFormlistCheque = function () {
      FormValidation.formValidation(document.getElementById("formListCheque"), {
        fields: {
          listCheque_PeriodeDu: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la période.",
              },
              regexp: {
                regexp:
                  /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une date correcte.",
              },
            },
          },
          listCheque_PeriodeAu: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la période.",
              },
              regexp: {
                regexp:
                  /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une periode correcte.",
              },
            },
          },
          listCheque_NumCheque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le numéro de Cheque",
              },
              regexp: {
                regexp: /^[0-9]+$/,
                message: "Veuillez saisir un code correct.",
              },
            },
          },
          listCheque_Banque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la banque du tire.",
              },
            },
          },
          listCheque_AgBanque: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir l/ agence bancaire.",
              },
            },
          },
          listCheque_Montant1: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le montant 1.",
              },
              regexp: {
                regexp: /^[0-9]{1,15}$/,
                message: "Veuillez saisir une Valeur neuve correcte.",
              },
            },
          },
          listCheque_Montant2: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir le montant 2.",
              },
              regexp: {
                regexp: /^[0-9]{1,15}$/,
                message: "Veuillez saisir une Valeur neuve correcte.",
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
    //fin contrainte sur les champs list CHEQUE

    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation

    //debut afficher liste CHEQUE
    $scope.afficheListeCheque = function (
      statut,
      periodeDu,
      periodeAu,
      numCheque,
      BanqueTire,
      AgBanqueTire,
      montant1,
      montant2
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typemontant = /^[0-9]{1,15}$/;
      let typeDate =
        /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.lAnneePeriodeDu = periodeDu.substr(6, 4);
      $scope.leMoisPeriodeDu = periodeDu.substr(3, 2);
      $scope.leJourPeriodeDu = periodeDu.substr(0, 2);
      $scope.lAnneeperiodeAu = periodeAu.substr(6, 4);
      $scope.leMoisperiodeAu = periodeAu.substr(3, 2);
      $scope.leJourperiodeAu = periodeAu.substr(0, 2);
      if (!statut) {
        $scope.$emit("UNLOAD");
        $rootScope.ChampsListeInvalide();
        $scope.listeCheque = "";
      } else if (typeDate.test(periodeDu) == false) {
        $scope.messageErreur = "La date de début de période n'est pas correcte";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeDu == "04" ||
          $scope.leMoisPeriodeDu == "06" ||
          $scope.leMoisPeriodeDu == "09" ||
          $scope.leMoisPeriodeDu == "11") &&
        $scope.leJourPeriodeDu > "30"
      ) {
        $scope.messageErreur = "La date de début de période n'est pas valide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(periodeAu) == false) {
        $scope.messageErreur = "La date de fin de période n'est pas correcte";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisperiodeAu == "02" &&
        $scope.leJourperiodeAu > "29"
      ) {
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisperiodeAu == "04" ||
          $scope.leMoisperiodeAu == "06" ||
          $scope.leMoisperiodeAu == "09" ||
          $scope.leMoisperiodeAu == "11") &&
        $scope.leJourperiodeAu > "30"
      ) {
        $scope.messageErreur = "La date de fin de période n'est pas valide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(periodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateFinIncorrecte();
        $scope.listeCheque = "";
      } else if (
        $scope.dateSuperioriteDebut(periodeDu) >
        $scope.dateSuperioriteFin(periodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateDebutIncorrecte();
        $scope.listeCheque = "";
      } else if (BanqueTire !== "" && AgBanqueTire == "") {
        $scope.messageErreur =
          "Veuillez renseigner la banque du tiré ou l'agence bancaire";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else {
        $scope.objet_envoie = [
          {
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            CH_REFCHEQUE: numCheque,
            BQ_CODEBANQUE: BanqueTire,
            AB_CODEAGENCEBANCAIRE: AgBanqueTire,
            MONTANT1: montant1,
            MONTANT2: montant2,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "CHEQUE",
            SL_LIBELLEMOUCHARD: "LISTE",
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
          .post("/ContratCheque/ListeContratCheque/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeCheque = reponse.data;
            $scope.nombreInfoBulle = $scope.listeCheque.length;
            console.log($scope.listeCheque);
            $scope.tableauInfoBulle =
              $scope.listeCheque[0].clsObjetRetour.SL_CODEMESSAGE;
            if ($scope.listeCheque[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeCheque[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };
    //fin afficher liste CHEQUE

    $scope.dateValide = function (paramDate) {
      $scope.lAnnee = paramDate.substr(6, 4);
      $scope.leMois = paramDate.substr(3, 2);
      $scope.leJour = paramDate.substr(0, 2);
      if ($scope.leMois == "2" || $scope.leMois == "02") {
        if ($scope.leJour > "29") {
          $scope.messageErreur = "La date d'effet n'est pas valide";
          return $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        }
      }
    };

    //debut  suppression

    // recuperer id pour la suppression
    $scope.supprRecupererIdCheque = function (
      codeAgence,
      dateSaisieCheque,
      recupIdCheque,
      codeEntrepot,
      dateValidatecheque
    ) {
      ($scope.idCheque = recupIdCheque),
        ($scope.idCheque1 = codeAgence),
        ($scope.idCheque2 = dateSaisieCheque),
        ($scope.idCheque3 = codeEntrepot),
        ($scope.idElement2 = dateValidatecheque);
    };
    //alert(recupIdCheque)
    //alert(codeAgence)
    //alert(dateSaisieCheque)
    //alert(codeEntrepot)
    //alert(dateValidatecheque)

    $scope.supprimerCheque = function () {
      $scope.$emit("LOAD");
      if ($scope.idElement2 !== "") {
        $scope.$emit("UNLOAD");
        $rootScope.SuppressionImpossible();
      } else {
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            CH_DATESAISIECHEQUE: $scope.idCheque2,
            CH_IDEXCHEQUE: $scope.idCheque,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
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
          .post(
            "/ContratCheque/Suppressioncontratcheque/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.testSuppressionCheque = reponse.data;
            console.log($scope.testSuppressionCheque);
            if (
              $scope.testSuppressionCheque[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.SuppressionReussie(
                $scope.testSuppressionCheque[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.listeCheque[0].clsObjetRetour.SL_RESULTAT = "FALSE";
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.SuppressionNonReussie(
                $scope.testSuppressionCheque[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $rootScope.ProblemeServeur();
          });
      }
    };
    //Fin  suppression

    //debut voir plus
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpValidCheque", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpValidCheque"));
    };
    //fin voir plus

    $scope.optionDocument = function (info) {
      $scope.tableauimage = [];
      $scope.tableauimage2 = [];
      sessionStorage.setItem("vpPhCheque", JSON.stringify(info));
    };

    //Document chèque
    $scope.docCheque = function () {
      window.location.href = "#/assurances/operation/document/cheque";
    };
    //Document chèque

    //debut liste des agences  banques
    $scope.afficheListeBanqueAgence = function (idAgBq) {
      $scope.FormAddCheque.agBanqueTire = "";
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: idAgBq,
          SL_LIBELLEECRAN: "CHEQUE",
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueAgence = reponse.data;
        });
    };

    $scope.afficheListeBanqueAgenceModif = function (idAgBq) {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: idAgBq,
          SL_LIBELLEECRAN: "CHEQUE",
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueAgence = reponse.data;
          if (
            $scope.listeBanqueAgence[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeBanqueAgence[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeBanqueAgence);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeBanqueAgence[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des  agences de banques

    //debut liste des agences  banques
    $scope.afficheListeAgBanque = function () {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: $scope.FormListCheque.BanqueTire,
          SL_LIBELLEECRAN: "CHEQUE",
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueAgence = reponse.data;
        });
    };
    //fin liste des  agences de banques

    //debut focus sur le champ
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idRef").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMont").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDate").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDate1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idDate2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idBanque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAgBanque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomTireur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNomDeposant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idTel").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout chèque (contrat)
    $scope.ajoutFormAddCheque = function (dateEffet) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();

      if (
        $scope.FormAddCheque.Datefincouverture == undefined ||
        $scope.FormAddCheque.Datefincouverture == "" ||
        $scope.FormAddCheque.Datefincouverture == null
      ) {
        $scope.$scope.FormAddCheque.Datefincouverture =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      }

      if (
        $scope.FormAddCheque.Datedebutcouverture == undefined ||
        $scope.FormAddCheque.Datedebutcouverture == "" ||
        $scope.FormAddCheque.Datedebutcouverture == null
      ) {
        $scope.$scope.FormAddCheque.Datedebutcouverture =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      }

      $scope.recuperer = JSON.parse(sessionStorage.getItem("modifCheque"));
      let typeNumerique = /[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typeReference = /^(0|[0-9]\d*)$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typemontant = /^[0-9]{1,15}$/;
      $scope.lAnneeEffet = $scope.FormAddCheque.effet.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddCheque.effet.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddCheque.effet.substr(0, 2);

      $scope.lAnneeEmission = $scope.FormAddCheque.dateEmission.substr(6, 4);
      $scope.leMoisEmission = $scope.FormAddCheque.dateEmission.substr(3, 2);
      $scope.leJourEmission = $scope.FormAddCheque.dateEmission.substr(0, 2);

      $scope.lAnneeReception = $scope.FormAddCheque.dateReception.substr(6, 4);
      $scope.leMoisReception = $scope.FormAddCheque.dateReception.substr(3, 2);
      $scope.leJourReception = $scope.FormAddCheque.dateReception.substr(0, 2);

      if (
        $scope.FormAddCheque.reference === "" ||
        $scope.FormAddCheque.reference === undefined ||
        $scope.FormAddCheque.dateEmission === "" ||
        $scope.FormAddCheque.dateEmission === undefined ||
        $scope.FormAddCheque.dateReception === "" ||
        $scope.FormAddCheque.dateReception === undefined ||
        $scope.FormAddCheque.telDeposant === "" ||
        $scope.FormAddCheque.telDeposant === undefined ||
        $scope.FormAddCheque.effet === "" ||
        $scope.FormAddCheque.effet === undefined ||
        $scope.FormAddCheque.banqueTire === "" ||
        $scope.FormAddCheque.banqueTire === undefined ||
        $scope.FormAddCheque.nomTireur === "" ||
        $scope.FormAddCheque.nomTireur === undefined ||
        $scope.FormAddCheque.montant === "" ||
        $scope.FormAddCheque.montant === undefined ||
        $scope.FormAddCheque.agBanqueTire === "" ||
        $scope.FormAddCheque.agBanqueTire === undefined ||
        $scope.FormAddCheque.nomTire === "" ||
        $scope.FormAddCheque.nomTire === undefined ||
        $scope.FormAddCheque.nomDeposant === "" ||
        $scope.FormAddCheque.nomDeposant === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddCheque.reference === "" ||
            $scope.FormAddCheque.reference === undefined
          ) {
            $("#idRef").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.dateEmission === "" ||
            $scope.FormAddCheque.dateEmission === undefined
          ) {
            $("#idDate").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.dateReception === "" ||
            $scope.FormAddCheque.dateReception === undefined
          ) {
            $("#idDate1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.effet === "" ||
            $scope.FormAddCheque.effet === undefined
          ) {
            $("#idDate2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.banqueTire === "" ||
            $scope.FormAddCheque.banqueTire === undefined
          ) {
            $("#idBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.montant === "" ||
            $scope.FormAddCheque.montant === undefined
          ) {
            $("#idMont").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.agBanqueTire === "" ||
            $scope.FormAddCheque.agBanqueTire === undefined
          ) {
            $("#idAgBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.nomTireur === "" ||
            $scope.FormAddCheque.nomTireur === undefined
          ) {
            $("#idNomTireur").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.nomTire === "" ||
            $scope.FormAddCheque.nomTire === undefined
          ) {
            $("#idNomTire").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.nomDeposant === "" ||
            $scope.FormAddCheque.nomDeposant === undefined
          ) {
            $("#idNomDeposant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddCheque.telDeposant === "" ||
            $scope.FormAddCheque.telDeposant === undefined
          ) {
            $("#idTel").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (typeReference.test($scope.FormAddCheque.reference) == false) {
        $scope.messageErreur = "Veuillez renseigner une référence correcte";
        $scope.$emit("UNLOAD");
        $("#idRef").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typemontant.test($scope.FormAddCheque.montant) == false) {
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $scope.$emit("UNLOAD");
        $("#idMont").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddCheque.telDeposant) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $scope.$emit("UNLOAD");
        $("#idTel").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddCheque.nomTireur) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un  nom Tireur correct";
        $scope.$emit("UNLOAD");
        $("#idNomTireur").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeAlphabetique.test($scope.FormAddCheque.nomTire) == false) {
        $scope.messageErreur = "Veuillez renseigner un  nom Tire correct";
        $scope.$emit("UNLOAD");
        $("#idNomTire").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddCheque.nomDeposant) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un  nom deposant correct";
        $scope.$emit("UNLOAD");
        $("#idNomDeposant").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.effet) == false) {
        $scope.messageErreur = "Veuillez renseigner une date effet correcte";
        $scope.$emit("UNLOAD");
        $("#idDate2").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDate2").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDate2").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.dateEmission) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une date d'emission correcte";
        $scope.$emit("UNLOAD");
        $("#idDate").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisEmission == "02" &&
        $scope.leJourEmission > "29"
      ) {
        $scope.messageErreur = "La date d'emission n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDate").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEmission == "04" ||
          $scope.leMoisEmission == "06" ||
          $scope.leMoisEmission == "09" ||
          $scope.leMoisEmission == "11") &&
        $scope.leJourEmission > "30"
      ) {
        $scope.messageErreur = "La date d'emission n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDate").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.dateReception) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une date de reception correcte";
        $scope.$emit("UNLOAD");
        $("#idDate1").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisReception == "02" &&
        $scope.leJourReception > "29"
      ) {
        $scope.messageErreur = "La date de reception n'est pas valide";
        $scope.$emit("UNLOAD");
        $("#idDate1").css("background-color", "#FFE9E0");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin($scope.FormAddCheque.dateReception) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateReceptionIncorrected();
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddCheque.dateEmission) >
        $scope.dateSuperioriteFin($scope.FormAddCheque.dateReception)
      ) {
        $scope.$emit("UNLOAD");
        $("#idDate").css("background-color", "#FFE9E0");
        $rootScope.dateReceptionIncorrect();
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
        } else {
          $scope.TYPEOPERATION = "0";
        }
        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            CH_IDEXCHEQUE: $scope.recupererInfoCheque.CH_IDEXCHEQUE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            AB_CODEAGENCEBANCAIRE: $scope.FormAddCheque.agBanqueTire,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            CH_REFCHEQUE: $scope.FormAddCheque.reference,
            CH_VALEURCHEQUE: $scope.FormAddCheque.montant,
            CH_PRIMEAENCAISSER: $scope.FormAddCheque.montant,
            CH_DATEANNULATIONCHEQUE: "01-01-1900",
            CH_DATEEMISSIONCHEQUE: $scope.FormAddCheque.dateEmission,
            CH_DATERECEPTIONCHEQUE: $scope.FormAddCheque.dateReception,
            CH_DATEVALIDATIONCHEQUE: "01-01-1900",
            CH_DATEDEBUTCOUVERTURE: $scope.FormAddCheque.Datedebutcouverture,
            CH_DATEFINCOUVERTURE: $scope.FormAddCheque.Datefincouverture,
            CH_NOMTIREUR: $scope.FormAddCheque.nomTireur,
            CH_NOMTIRE: $scope.FormAddCheque.nomTire,
            CH_NOMDUDEPOSANT: $scope.FormAddCheque.nomDeposant,
            CH_TELEPHONEDEPOSANT: $scope.FormAddCheque.telDeposant,
            CH_DATEEFFET: $scope.FormAddCheque.effet,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "CHEQUE",
            SL_LIBELLEMOUCHARD: "INSERTIONS",
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
            .post(
              "/ContratCheque/ModificationContratCheque/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.testModificationCheque = reponse.data;
              if (
                $scope.testModificationCheque[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $rootScope.EnregistrementReussi(
                  $scope.testModificationCheque[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.RetourSurListe = function () {
                  window.location.href =
                    "#/assurances/operation/multirisque-pro/liste/cheque";
                };
                $scope.$emit("UNLOAD");
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testModificationCheque[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testModificationCheque[0].clsObjetRetour.SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/ContratCheque/AjoutContratCheque/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.testAjoutCheque = reponse.data;
              if (
                $scope.testAjoutCheque[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testAjoutCheque[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.resetFormAddCheque();
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testAjoutCheque[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testAjoutCheque[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout chèque (contrat)

    // fonction pour telecharger une photo
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

    $scope.imgBase64 = function (elt) {
      if ($scope.formatImagePhoto == "image/png") {
        $scope.base64 = elt.replace("data:image/png;base64,", "");
      } else {
        $scope.base64 = elt.replace("data:image/jpeg;base64,", "");
      }
      // $scope.base64 = elt.replace("data:image/jpeg;base64,", "");
    };
    $scope.imgSignBase64 = function (elt) {
      if ($scope.formatImageSignature == "image/png") {
        $scope.signbase64 = elt.replace("data:image/png;base64,", "");
      } else {
        $scope.signbase64 = elt.replace("data:image/jpeg;base64,", "");
      }
      // $scope.signbase64 = elt.replace("data:image/jpeg;base64,", "");
    };
    // fonction pour telecharger une photo

    //debut  enregistrement Photo
    $scope.afficheListePhotoCheque = function () {
      $scope.$emit("LOAD");
      $scope.listeDoc = JSON.parse(sessionStorage.getItem("vpPhCheque"));
      console.log($scope.listeDoc);
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: $scope.listeDoc.CH_IDEXCHEQUE,
          CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
          SL_LIBELLEMOUCHARD: "LISTE",
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
        .post(
          "/ContratChequePhoto/ListeContratChequePhoto/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeChequeDocument = reponse.data;
          $scope.nombreInfoBulle = $scope.listeChequeDocument.length;
          $scope.tableauInfoBulle =
            $scope.listeChequeDocument[0].clsObjetRetour.SL_CODEMESSAGE;
          console.log($scope.listeChequeDocument);
        });
    };
    //Fin  enregistrement Photo

    //debut  enregistrement Photo
    $scope.enregistrerPhotoCheque = function () {
      if ($scope.pretACharger == false) {
        $rootScope.EnregistrementNonReussi("Veuillez charger le fichier");
      } else {
        $scope.$emit("LOAD");
        $scope.recupPhoto = JSON.parse(sessionStorage.getItem("vpPhCheque"));

        $scope.objet_envoie = [];
        for (let index = 0; index < $scope.tableauimage.length; index++) {
          $scope.objet_envoi_image = {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            CH_IDEXCHEQUE: $scope.recupPhoto.CH_IDEXCHEQUE,
            CH_NUMSEQUENCEPHOTO: "",
            CH_CHEMINPHOTOCHEQUE: $scope.tableauimage[index],
            CH_LIBELLEPHOTOCHEQUE: "test",
            SL_LIBELLEMOUCHARD: "LISTE",
            TYPEOPERATION: "0",
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
          .post(
            "/ContratChequePhoto/AjoutContratChequePhoto/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.testPhotoCheque = reponse.data;
            if (
              $scope.testPhotoCheque[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testPhotoCheque[0].clsObjetRetour.SL_MESSAGE
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
                $scope.testPhotoCheque[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testPhotoCheque[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    //Fin  enregistrement Photo

    //fonction pour agrandir la photo
    $scope.pourAgrandir = function () {
      $scope.chqPhoto = [];
    };
    //fonction pour agrandir la photo

    //debut recuper id du cheque a valider
    $scope.validateChq = function (
      recupId1,
      codeAgence1,
      dateSaisieCheque1,
      refCheque1,
      exCheque1,
      dateValidatecheque1
    ) {
      $scope.idElement = recupId1;
      $scope.idElement0 = codeAgence1;
      $scope.idElement1 = dateSaisieCheque1;
      $scope.idElement2 = dateValidatecheque1;
      $scope.id01 = refCheque1;
      $scope.id02 = exCheque1;
    };
    //fin recuper id du cheque a valider

    //debut validation cheque
    $scope.validationCheque = function () {
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.idElement, // NEST PAS RENSEIGNE
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $scope.idElement1,
          CH_IDEXCHEQUE: $scope.id02,
          CH_REFCHEQUE: $scope.id01,
          CH_VALEURCHEQUE: "0",
          CH_PRIMEAENCAISSER: "0",
          CH_DATEANNULATIONCHEQUE: "01-01-1900",
          CH_DATEEMISSIONCHEQUE: "01-01-1900",
          CH_DATERECEPTIONCHEQUE: "01-01-1900",
          CH_DATEVALIDATIONCHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_DATEDEBUTCOUVERTURE: "01-01-1900",
          CH_DATEFINCOUVERTURE: "01-01-1900",
          CH_DATEEFFET: "01-01-1900",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "CHEQUE",
          SL_LIBELLEMOUCHARD: "LISTE",
          TYPEOPERATION: "3",
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
        .post("/ContratCheque/ValidationContratCheque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeValider = reponse.data;
          if ($scope.listeValider[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $rootScope.ValidationReussie(
              $scope.listeValider[0].clsObjetRetour.SL_MESSAGE
            );
            setTimeout($scope.rechargePage, 3600);
          } else {
            $rootScope.ValidationNonReussie(
              $scope.listeValider[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $rootScope.ProblemeServeur(
            $scope.listeValider[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin validation cheque

    $scope.testPhoto = function () {
      window.addEventListener("load", function () {
        document
          .querySelector('input[type="file"]')
          .addEventListener("change", function () {
            if (this.files && this.files[0]) {
              var img = document.querySelector("img");
              img.src = URL.createObjectURL(this.files[0]);
              img.onload = imageIsLoaded;
            }
          });
      });
      $scope.fonctionPhoto = function (e) {
        alert(e);
      };
    };

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdChequePhoto = function (
      date,
      exCheqId,
      numSeqPhoto
    ) {
      ($scope.cheqId1 = date),
        ($scope.cheqId2 = exCheqId),
        ($scope.cheqId3 = numSeqPhoto);
      //alert(date)
      //alert(exCheqId)
      //alert(numSeqPhoto)
    };
    //debut recuperer id pour la suppression

    //debut  suppression
    $scope.suppChequePhoto = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: $scope.cheqId2,
          CH_NUMSEQUENCEPHOTO: $scope.cheqId3,
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
        .post(
          "/ContratChequePhoto/SuppressioncontratchequePhoto/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.deleteChequePhoto = reponse.data;
          if (
            $scope.deleteChequePhoto[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $rootScope.SuppressionReussie(
              $scope.deleteChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.$emit("UNLOAD");
            $scope.voirPhotoCheque();
            $scope.afficheListePhotoCheque();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.deleteChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $rootScope.ProblemeServeur(
            $scope.deleteChequePhoto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin  suppression

    //AJOUTER CE CODE DANS LE CONTROLLER
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

    //fin developpement ANICETTE

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

    // debut agrandir photo
    $scope.indexPhotoSelect = "";
    $scope.agrandirPhoto = function (index) {
      $scope.indexPhotoSelect = index;
    };
    // fin agrandir photo

    // DEBUT COMBOS

    //debut liste des banques du tiré
    $scope.afficheListeBanqueTire = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: "",
          SL_LIBELLEECRAN: "CHEQUE",
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
        .post("/Banque/ListeBanque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeBanqueTire = reponse.data;
          if ($scope.listeBanqueTire[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            if ($scope.etatForm == "2") {
              setTimeout($scope.retourModifCheque, 3600);
            } else {
              $scope.$emit("UNLOAD");
              $scope.leChargement = false;
            }
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeBanqueTire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeBanqueTire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeBanqueTire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des banques du tiré

    //debut acceder a la page de modification
    $scope.retourModifCheque = function () {
      $scope.etatForm = "2";

      $scope.recupererInfoCheque = JSON.parse(
        sessionStorage.getItem("modifCheque")
      );
      console.log($scope.recupererInfoCheque);

      $scope.FormAddCheque.reference = $scope.recupererInfoCheque.CH_REFCHEQUE;
      $scope.FormAddCheque.montant = $scope.recupererInfoCheque.CH_VALEURCHEQUE;
      $scope.FormAddCheque.dateEmission =
        $scope.recupererInfoCheque.CH_DATEEMISSIONCHEQUE;
      $scope.FormAddCheque.banqueTire =
        $scope.recupererInfoCheque.BQ_CODEBANQUE;
      $scope.FormAddCheque.agBanqueTire =
        $scope.recupererInfoCheque.AB_CODEAGENCEBANCAIRE;
      $scope.FormAddCheque.nomTireur = $scope.recupererInfoCheque.CH_NOMTIREUR;
      $scope.FormAddCheque.nomTire = $scope.recupererInfoCheque.CH_NOMTIRE;
      $scope.FormAddCheque.dateReception =
        $scope.recupererInfoCheque.CH_DATERECEPTIONCHEQUE;
      $scope.FormAddCheque.nomDeposant =
        $scope.recupererInfoCheque.CH_NOMDUDEPOSANT;
      $scope.FormAddCheque.telDeposant =
        $scope.recupererInfoCheque.CH_TELEPHONEDEPOSANT;
      $scope.FormAddCheque.effet = $scope.recupererInfoCheque.CH_DATEEFFET;
      $scope.FormAddCheque.Datedebutcouverture =
        $scope.recupererInfoCheque.CH_DATEDEBUTCOUVERTURE;
      $scope.FormAddCheque.Datefincouverture =
        $scope.recupererInfoCheque.CH_DATEFINCOUVERTURE;

      $scope.afficheListeBanqueAgenceModif(
        $scope.recupererInfoCheque.BQ_CODEBANQUE
      );
    };
    //fin acceder a la page de modification

    //APPEL SERVICE WEB POUR IMPRESSION PHOTO CHEQUE

    $scope.affichePhotoChequeImpression = function (infochequeimpression) {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: infochequeimpression.CH_DATESAISIECHEQUE,
          CH_IDEXCHEQUE: infochequeimpression.CH_IDEXCHEQUE,
          CA_CODECONTRAT: infochequeimpression.CA_CODECONTRAT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "Saisie de Continent",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
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
        .post(
          "/ContratChequePhoto/ListeImpressionChequePhoto/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listPhotoChequeImpressionmpression = reponse.data;
          if (
            $scope.listPhotoChequeImpressionmpression[0].clsObjetRetour
              .SL_RESULTAT == "TRUE"
          ) {
            $scope.$emit("UNLOAD");
            $http
              .post(
                "/ZoneEditionCombo/pvgAfficherEtatIMAGE/",
                $scope.listPhotoChequeImpressionmpression
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
            $rootScope.EnregistrementNonReussi(
              $scope.listPhotoChequeImpressionmpression[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listPhotoChequeImpressionmpression[0].clsObjetRetour
              .SL_MESSAGE
          );
        });
    };

    // FIN COMBOS
  },
]);
