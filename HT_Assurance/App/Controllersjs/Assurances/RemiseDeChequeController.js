MapharApp.controller("RemiseDeChequeController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    //debut session generale pour le contrat operation
    $scope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    //fin session generale pour le contrat operation

    //debut session generale pour le sinistre
    $scope.collectionContartOp1 = angular.fromJson(
      localStorage.getItem("idOuvreDossier")
    );
    console.log($scope.collectionContartOp1);
    //fin session generale pour le sinistre

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddRemiseDeCheque = {
      Code: $scope.collectionContartOp.TI_NUMTIERS,
      Denomination: $scope.collectionContartOp.TI_DENOMINATION,
      Reference: "",
      Montant: "",
      DateEmission: "",
      BanqueTire: "",
      AgBanqueTire: "",
      NomTireur: "",
      NomTire: "",
      DateReception: "",
      NomDeposant: "",
      TelephoneDeposant: "",
      Effet: "",
    };
    $scope.FormListRemiseDeCheque = {
      PeriodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      PeriodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      NumCheque: "",
      BanqueTire: "",
      AgBanqueTire: "",
      Montant1: "",
      Montant2: "",
    };
    $scope.listeBanqurTire = [];
    $scope.listeAgBanqueTire = [];
    $scope.testEnregistrement = [];
    $scope.testEnregistrementmodif = [];
    $scope.listeRemiseChequePhoto = [];
    $scope.recupererInfo = [];
    $scope.recuperer = [];
    $scope.listeRemiseDeCheque = [];
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";
    $scope.testRemiseDeChequePhoto = [];
    $scope.listeDocument = [];
    $scope.deleteRemiseDeChequePhoto = [];
    $scope.testSuppression = [];
    $scope.Idcheque = "";
    $scope.ajoutImage = function () {
      //                let cheminImage = "/Content/assets/media/illustration/undraw_profile_pic_ic5t.svg"
      $scope.image.img.push({ upload: $scope.avatar });
    };
    $scope.isdisabled = true;
    $scope.cheqId3 = "";
    $scope.etatForm = "";
    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/

    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

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
    //FIN ANNEE BISSEXTILE

    //debut voir plus RemiseDeCheque
    $scope.voirPlusRemiseDeCheque = function (info) {
      sessionStorage.setItem("vpCheque", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpCheque"));
    };
    //fin voir plus RemiseDeCheque

    //debut acceder a la page de modification
    $scope.voirModifRemiseDeCheque = function (info) {
      sessionStorage.setItem("modifRemiseDeCheque", JSON.stringify(info));
      window.location.href =
        "#/assurances/operation/modification/ModificationRemiseDeCheque";
    };
    //fin acceder a la page de modification Cheque

    //voir doc
    $scope.optionDocument = function (info) {
      sessionStorage.setItem("vpPhCheque", JSON.stringify(info));
    };
    //voir doc

    //debut voir PhotoRemiseCheque
    $scope.voirPhotoCheque = function () {
      $scope.recupererPhoto = JSON.parse(
        sessionStorage.getItem("vpPhotoCheque")
      );
      console.log($scope.recupererPhoto);
    };
    //fin voir PhotoRemiseCheque

    /*FIN FONCTION GENERALE*/

    //debut contrainte sur les champs list RemiseDeCheque
    $scope.contrainteFormlistRemiseDeCheque = function () {
      FormValidation.formValidation(
        document.getElementById("formListRemiseDeCheque"),
        {
          fields: {
            listRemiseDeCheque_PeriodeDu: {
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
            listRemiseDeCheque_PeriodeAu: {
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
            listRemiseDeCheque_NumCheque: {
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
            listRemiseDeCheque_BanqueTire: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir la banque du tire.",
                },
              },
            },
            listRemiseDeCheque_AgBanqueTire: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir l/ agence bancaire.",
                },
              },
            },
            listRemiseDeCheque_Montant1: {
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
            listRemiseDeCheque_Montant2: {
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
        }
      );
    };
    //fin contrainte sur les champs list RemiseDeCheque

    //debut initialisation add RemiseDeCheque
    $scope.initFormAddRemiseDeCheque = function () {
      $scope.FormAddRemiseDeCheque.BanqueTire = "23"
      $scope.afficheListeAgBanqueTire1($scope.FormAddRemiseDeCheque.BanqueTire)
      $scope.FormAddRemiseDeCheque.NomTire = "AXA"
      $scope.verouAgBq = true;
      $scope.afficheListeBanqueTire();
    };
    //fin initialisation add RemiseDeCheque

    //debut initialisation modif RemiseDeCheque
    $scope.initFormAddModifRemiseDeCheque = function () {
      $scope.etatForm = "2";
      $scope.verouAgBq = true;
      $scope.afficheListeBanqueTire();
    };
    //fin initialisation add RemiseDeCheque

    //debut initialisation list RemiseDeCheque
    $scope.initFormListRemiseDeCheque = function () {
      $scope.$emit("LOAD");
      $scope.FormListRemiseDeCheque.BanqueTire = "23"
      $scope.afficheListeAgBanqueTire1($scope.FormListRemiseDeCheque.BanqueTire)
      $scope.afficheListeBanqueTire();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation list RemiseDeCheque

    //DEBUT DEVELOPPEMENT

    //debut liste des agences
    $scope.afficheListeAgBanqueTire = function (id) {
      $scope.listeAgBanqueTire = [];
      $scope.FormAddRemiseDeCheque.AgBanqueTire = "";
      $scope.verouAgBq = true;
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: id,
          SL_LIBELLEECRAN: "AGENCE",
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
          $scope.listeAgBanqueTire = reponse.data;
          if (
            $scope.listeAgBanqueTire[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouAgBq = true;
          } else {
            $scope.verouAgBq = false;
          }
          console.log($scope.listeAgBanqueTire);
        });
    };
    $scope.afficheListeAgBanqueTire1 = function (id) {
      $scope.listeAgBanqueTire = [];
    //  $scope.FormAddRemiseDeCheque.AgBanqueTire = "";
      $scope.verouAgBq = true;
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: id,
          SL_LIBELLEECRAN: "AGENCE",
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
          $scope.listeAgBanqueTire = reponse.data;
          if (
            $scope.listeAgBanqueTire[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouAgBq = true;
          } else {
            $scope.verouAgBq = false;
          }
          console.log($scope.listeAgBanqueTire);
        });
    };
    //fin liste des agences

    //debut fonction reinitialisation et rafraichir les champs de la fenetre d'enregistrement
    $scope.reinitialise = function () {
      $(document).ready(function () {
        $("#addRemiseDeCheque_Code").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_Denomination").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_Reference").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_Montant").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_DateEmission").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_BanqueTire").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_AgBanqueTire").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_NomTireur").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_NomTire").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_DateReception").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRemiseDeCheque_NomDeposant").css("background-color", "#FFFFFF");
        $("#addRemiseDeCheque_TelephoneDeposant").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addRemiseDeCheque_Effet").css("background-color", "#FFFFFF");
      });
      $scope.FormAddRemiseDeCheque = {};
      $scope.initFormAddRemiseDeCheque();
    };
    //fin fonction reinitialisation et rafraichir les champs de la fenetre d'enregistrement

    //debut recuperer id pour suppression Remise de cheque
    $scope.supprRecupererIdElement = function (
      recupId,
      dateSaisieCheque1,
      Denomination,
      numSeqPhoto
    ) {
      $scope.idElement = recupId;
      $scope.idElement1 = dateSaisieCheque1;
      $scope.idElement2 = Denomination;
      $scope.idElement3 = numSeqPhoto;
    };
    //fin recuperer id pour suppression Remise de cheque

    //debut focus sur le champ
    $scope.desactiverChampRequisEnregistrement = function () {
      $(document).ready(function () {
        $("#addRemiseDeCheque_Code").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_Denomination").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_Reference").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_Montant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_DateEmission").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_BanqueTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_AgBanqueTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_NomTireur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_NomTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_DateReception").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_NomDeposant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_TelephoneDeposant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addRemiseDeCheque_Effet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //Debut ajout voyage  /a terminer
    $scope.ajoutFormAddRemiseDeCheque = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisEnregistrement();
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("modifRemiseDeCheque")
      );
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeReference = /^(0|[0-9]\d*)$/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typemontant = /^[0-9]{1,15}$/;
      $scope.lAnneeEffet = $scope.FormAddRemiseDeCheque.Effet.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddRemiseDeCheque.Effet.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddRemiseDeCheque.Effet.substr(0, 2);

      $scope.lAnneeDateEmission =
        $scope.FormAddRemiseDeCheque.DateEmission.substr(6, 4);
      $scope.leMoisDateEmission =
        $scope.FormAddRemiseDeCheque.DateEmission.substr(3, 2);
      $scope.leJourDateEmission =
        $scope.FormAddRemiseDeCheque.DateEmission.substr(0, 2);

      $scope.lAnneeDateReception =
        $scope.FormAddRemiseDeCheque.DateReception.substr(6, 4);
      $scope.leMoisDateReception =
        $scope.FormAddRemiseDeCheque.DateReception.substr(3, 2);
      $scope.leJourDateReception =
        $scope.FormAddRemiseDeCheque.DateReception.substr(0, 2);

      if (
        $scope.FormAddRemiseDeCheque.Code == "" ||
        $scope.FormAddRemiseDeCheque.Code === undefined ||
        $scope.FormAddRemiseDeCheque.Denomination == "" ||
        $scope.FormAddRemiseDeCheque.Denomination === undefined ||
        $scope.FormAddRemiseDeCheque.Reference == "" ||
        $scope.FormAddRemiseDeCheque.Reference === undefined ||
        $scope.FormAddRemiseDeCheque.Montant == "" ||
        $scope.FormAddRemiseDeCheque.Montant === undefined ||
        $scope.FormAddRemiseDeCheque.DateEmission == "" ||
        $scope.FormAddRemiseDeCheque.DateEmission === undefined ||
        $scope.FormAddRemiseDeCheque.BanqueTire == "" ||
        $scope.FormAddRemiseDeCheque.BanqueTire === undefined ||
        $scope.FormAddRemiseDeCheque.AgBanqueTire === "" ||
        $scope.FormAddRemiseDeCheque.AgBanqueTire === undefined ||
        $scope.FormAddRemiseDeCheque.NomTireur === "" ||
        $scope.FormAddRemiseDeCheque.NomTireur === undefined ||
        $scope.FormAddRemiseDeCheque.NomTire === "" ||
        $scope.FormAddRemiseDeCheque.NomTire === undefined ||
        $scope.FormAddRemiseDeCheque.DateReception === "" ||
        $scope.FormAddRemiseDeCheque.DateReception === undefined ||
        $scope.FormAddRemiseDeCheque.NomDeposant === "" ||
        $scope.FormAddRemiseDeCheque.NomDeposant === undefined ||
        $scope.FormAddRemiseDeCheque.TelephoneDeposant === "" ||
        $scope.FormAddRemiseDeCheque.TelephoneDeposant === undefined ||
        $scope.FormAddRemiseDeCheque.Effet === "" ||
        $scope.FormAddRemiseDeCheque.Effet === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddRemiseDeCheque.Code == "" ||
            $scope.FormAddRemiseDeCheque.Code === undefined
          ) {
            $("#addRemiseDeCheque_Code").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddRemiseDeCheque.Denomination == "" ||
            $scope.FormAddRemiseDeCheque.Denomination === undefined
          ) {
            $("#addRemiseDeCheque_Denomination").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.Reference === "" ||
            $scope.FormAddRemiseDeCheque.Reference === undefined
          ) {
            $("#addRemiseDeCheque_Reference").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.Montant === "" ||
            $scope.FormAddRemiseDeCheque.Montant === undefined
          ) {
            $("#addRemiseDeCheque_Montant").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddRemiseDeCheque.DateEmission == "" ||
            $scope.FormAddRemiseDeCheque.DateEmission === undefined
          ) {
            $("#addRemiseDeCheque_DateEmission").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.BanqueTire == "" ||
            $scope.FormAddRemiseDeCheque.BanqueTire === undefined
          ) {
            $("#addRemiseDeCheque_BanqueTire").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.AgBanqueTire === "" ||
            $scope.FormAddRemiseDeCheque.AgBanqueTire === undefined
          ) {
            $("#addRemiseDeCheque_AgBanqueTire").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.NomTireur === "" ||
            $scope.FormAddRemiseDeCheque.NomTireur === undefined
          ) {
            $("#addRemiseDeCheque_NomTireur").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.NomTire === "" ||
            $scope.FormAddRemiseDeCheque.NomTire === undefined
          ) {
            $("#addRemiseDeCheque_NomTire").css("background-color", "#FFE9E0");
          }

          if (
            $scope.FormAddRemiseDeCheque.DateReception === "" ||
            $scope.FormAddRemiseDeCheque.DateReception === undefined
          ) {
            $("#addRemiseDeCheque_DateReception").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.NomDeposant === "" ||
            $scope.FormAddRemiseDeCheque.NomDeposant === undefined
          ) {
            $("#addRemiseDeCheque_NomDeposant").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.TelephoneDeposant === "" ||
            $scope.FormAddRemiseDeCheque.TelephoneDeposant === undefined
          ) {
            $("#addRemiseDeCheque_TelephoneDeposant").css(
              "background-color",
              "#FFE9E0"
            );
          }

          if (
            $scope.FormAddRemiseDeCheque.Effet === "" ||
            $scope.FormAddRemiseDeCheque.Effet === undefined
          ) {
            $("#addRemiseDeCheque_Effet").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeNumerique.test($scope.FormAddRemiseDeCheque.Code) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un code correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddRemiseDeCheque.Denomination) ==
        false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une dénomination correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeReference.test($scope.FormAddRemiseDeCheque.Reference) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une réference correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typemontant.test($scope.FormAddRemiseDeCheque.Montant) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormAddRemiseDeCheque.BanqueTire == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une banque du tiré";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.FormAddRemiseDeCheque.AgBanqueTire == "") {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une agenge banque du tiré";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddRemiseDeCheque.NomTireur) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un nom correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddRemiseDeCheque.NomTire) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un nom tiré correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddRemiseDeCheque.NomDeposant) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner un Nom déposant correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test(
          $scope.FormAddRemiseDeCheque.TelephoneDeposant
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddRemiseDeCheque.DateEmission) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner une date d'émission correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateEmission) == true &&
        $scope.leMoisDateEmission == "02" &&
        $scope.leJourDateEmission > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'émission n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateEmission) == false &&
        $scope.leMoisDateEmission == "02" &&
        $scope.leJourDateEmission > "28"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'émission n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisDateEmission == "04" ||
          $scope.leMoisDateEmission == "06" ||
          $scope.leMoisDateEmission == "09" ||
          $scope.leMoisDateEmission == "11") &&
        $scope.leJourDateEmission > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddRemiseDeCheque.DateReception) == false
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner une date de reception correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateReception) == true &&
        $scope.leMoisDateReception == "02" &&
        $scope.leJourDateReception > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de reception n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDateReception) == false &&
        $scope.leMoisDateReception == "02" &&
        $scope.leJourDateReception > "28"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date de reception n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisDateReception == "04" ||
          $scope.leMoisDateReception == "06" ||
          $scope.leMoisDateReception == "09" ||
          $scope.leMoisDateReception == "11") &&
        $scope.leJourDateReception > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddRemiseDeCheque.Effet) == false) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "Veuillez renseigner une date d'effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == true &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddRemiseDeCheque.DateEmission) >
        $scope.dateSuperioriteFin($scope.FormAddRemiseDeCheque.DateReception)
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La date d'émission ne doit pas être supérieure à la date de reception";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.testEnregistrement = "";
      } else if (
        $scope.dateSuperioriteFin($scope.FormAddRemiseDeCheque.DateReception) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "La date de reception ne doit pas être supérieure à la date de la journée de travail";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        $scope.testEnregistrement = "";
      } else {
        if ($scope.etatForm == "2") {
          $scope.TYPEOPERATION = "1";
          $scope.Idcheque = $scope.recuperer.CH_IDEXCHEQUE;
        } else {
          $scope.TYPEOPERATION = "0";
          $scope.Idcheque = "";
        }

        $scope.objet_envoie = [
          {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            CH_IDEXCHEQUE: $scope.Idcheque,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            AB_CODEAGENCEBANCAIRE: $scope.FormAddRemiseDeCheque.AgBanqueTire,
            SI_CODESINISTRE: $scope.collectionContartOp1.SI_CODESINISTRE,
            TI_DENOMINATION: $scope.idElement2,
            CH_REFCHEQUE: $scope.FormAddRemiseDeCheque.Reference,
            CH_VALEURCHEQUE: $scope.FormAddRemiseDeCheque.Montant,
            CH_PRIMEAENCAISSER: "5000000",
            CH_DATEANNULATIONCHEQUE: "01-01-1900",
            CH_DATEEMISSIONCHEQUE: $scope.FormAddRemiseDeCheque.DateEmission,
            CH_DATERECEPTIONCHEQUE: $scope.FormAddRemiseDeCheque.DateReception,
            CH_DATEVALIDATIONCHEQUE: "01-01-1900",
            CH_NOMTIREUR: $scope.FormAddRemiseDeCheque.NomTireur,
            CH_NOMTIRE: $scope.FormAddRemiseDeCheque.NomTire,
            CH_NOMDUDEPOSANT: $scope.FormAddRemiseDeCheque.NomDeposant,
            CH_TELEPHONEDEPOSANT:
              $scope.FormAddRemiseDeCheque.TelephoneDeposant,
            CH_DATEEFFET: $scope.FormAddRemiseDeCheque.Effet,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "REMISE DE CHEQUE",
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

        if ($scope.etatForm !== "2") {
          $http
            .post(
              "/RemiseDeCheque/AjoutRemiseDeCheque/",
              $scope.objet_envoie,
              {}
            )
            .then(function (reponse) {
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.reinitialise();
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi();
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur();
            });
        } else {
          $http
            .post(
              "/RemiseDeCheque/ModificationRemiseDeCheque/",
              $scope.objet_envoie,
              {}
            )
            .then(function (reponse) {
              $scope.testEnregistrementmodif = reponse.data;
              if (
                $scope.testEnregistrementmodif[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrementmodif[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href =
                      "#/assurances/operation/liste/ListeRemiseDeCheque";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                }
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
      }
    };
    //Fin ajout voyage (contrat)

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#listRemiseDeCheque_PeriodeDu").css("background-color", "#FFFFFF");
        $("#listRemiseDeCheque_PeriodeAu").css("background-color", "#FFFFFF");
        $("#listRemiseDeCheque_NumCheque").css("background-color", "#FFFFFF");
        $("#listRemiseDeCheque_BanqueTire").css("background-color", "#FFFFFF");
        $("#listRemiseDeCheque_AgBanqueTire").css(
          "background-color",
          "#FFFFFF"
        );
        $("#listRemiseDeCheque_Montant1").css("background-color", "#FFFFFF");
        $("#listRemiseDeCheque_Montant2").css("background-color", "#FFFFFF");
      });
      $scope.FormListRemiseDeCheque.PeriodeDu =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListRemiseDeCheque.PeriodeAu =
        $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormListRemiseDeCheque.NumCheque = "";
      $scope.FormListRemiseDeCheque.BanqueTire = "";
      $scope.FormListRemiseDeCheque.AgBanqueTire = "";
      $scope.FormListRemiseDeCheque.Montant1 = "";
      $scope.FormListRemiseDeCheque.Montant2 = "";
    };
    //fin pour annuler la recherche

    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#listRemiseDeCheque_PeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listRemiseDeCheque_PeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listRemiseDeCheque_NumCheque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listRemiseDeCheque_BanqueTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listRemiseDeCheque_AgBanqueTire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listRemiseDeCheque_Montant1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listRemiseDeCheque_Montant2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

    //debut afficher liste CHEQUE
    $scope.afficheListeRemiseDeCheque = function (
      PeriodeDu,
      PeriodeAu,
      NumCheque,
      BanqueTire,
      AgBanqueTire,
      Montant1,
      Montant2
    ) {
      $scope.$emit("LOAD");
      let typeNumerique = /^[0-9]$/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typemontant = /^[0-9]{1,15}$/;
      let typeDate =
        /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

      $scope.desactiverChampRequisListe();

      if (PeriodeDu !== undefined) {
        $scope.lAnneePeriodeDu = PeriodeDu.substr(6, 4);
        $scope.leMoisPeriodeDu = PeriodeDu.substr(3, 2);
        $scope.leJourPeriodeDu = PeriodeDu.substr(0, 2);
      }
      if (PeriodeAu !== undefined) {
        $scope.lAnneePeriodeAu = PeriodeAu.substr(6, 4);
        $scope.leMoisPeriodeAu = PeriodeAu.substr(3, 2);
        $scope.leJourPeriodeAu = PeriodeAu.substr(0, 2);
      }

      if (
        PeriodeDu === "" ||
        PeriodeDu === undefined ||
        PeriodeAu === "" ||
        PeriodeAu === undefined ||
        NumCheque === undefined ||
        BanqueTire === undefined ||
        AgBanqueTire === undefined ||
        Montant1 === undefined ||
        Montant2 === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (PeriodeDu === "" || PeriodeDu === undefined) {
            $("#listRemiseDeCheque_PeriodeDu").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (PeriodeAu === "" || PeriodeAu === undefined) {
            $("#listRemiseDeCheque_PeriodeAu").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (NumCheque === undefined) {
            $("#listRemiseDeCheque_NumCheque").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (BanqueTire === undefined) {
            $("#listRemiseDeCheque_BanqueTire").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (AgBanqueTire === undefined) {
            $("#listRemiseDeCheque_AgBanqueTire").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (Montant1 === undefined) {
            $("#listRemiseDeCheque_Montant1").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (Montant2 === undefined) {
            $("#listRemiseDeCheque_Montant2").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $rootScope.ChampsListeInvalide();
        $scope.listeRemiseDeCheque = "";
      } else if (typeDate.test(PeriodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
        $scope.leMoisPeriodeDu == "02" &&
        $scope.leJourPeriodeDu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test(PeriodeAu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeAu) == true &&
        $scope.leMoisPeriodeAu == "02" &&
        $scope.leJourPeriodeAu > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneePeriodeAu) == false &&
        $scope.leMoisPeriodeAu == "02" &&
        $scope.leJourPeriodeAu > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin n'est pas valide";
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
          $("#listRemiseDeCheque_PeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisPeriodeAu == "04" ||
          $scope.leMoisPeriodeAu == "06" ||
          $scope.leMoisPeriodeAu == "09" ||
          $scope.leMoisPeriodeAu == "11") &&
        $scope.leJourPeriodeAu > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteFin(PeriodeAu) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeAu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateFinIncorrecte();
        $scope.listeRemiseDeCheque = "";
      } else if (
        $scope.dateSuperioriteDebut(PeriodeDu) >
        $scope.dateSuperioriteFin(PeriodeAu)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listRemiseDeCheque_PeriodeDu").css("background-color", "#FFE9E0");
        });
        $rootScope.dateDebutIncorrecte();
        $scope.listeRemiseDeCheque = "";
      }

      $scope.objet_envoie = [
        {
          DATEDEBUT: PeriodeDu,
          DATEFIN: PeriodeAu,
          CH_REFCHEQUE: NumCheque,
          SI_CODESINISTRE: $scope.collectionContartOp1.SI_CODESINISTRE,
          BQ_CODEBANQUE: BanqueTire,
          AB_CODEAGENCEBANCAIRE: AgBanqueTire,
          MONTANT1: Montant1,
          MONTANT2: Montant2,
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "REMISE DE CHEQUE",
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
        .post("/RemiseDeCheque/ListeRemiseDeCheque/", $scope.objet_envoie, {})
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeRemiseDeCheque = reponse.data;
          $scope.nombreInfoBulle = $scope.listeRemiseDeCheque.length;
          console.log($scope.listeRemiseDeCheque);
          $scope.tableauInfoBulle =
            $scope.listeRemiseDeCheque[0].clsObjetRetour.SL_CODEMESSAGE;
          console.log($scope.tableauInfoBulle);
          if (
            $scope.listeRemiseDeCheque[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeRemiseDeCheque[0].clsObjetRetour.SL_MESSAGE
            );
          }
        });
    };
    //fin afficher liste CHEQUE

    //debut  enregistrement Photo
    $scope.EnrgPhotoRemiseDeCheque = function () {
      if ($scope.pretACharger == false) {
        $rootScope.EnregistrementNonReussi("Veuillez charger le fichier");
      } else {
        $scope.$emit("LOAD");
        $scope.recupPhoto = JSON.parse(sessionStorage.getItem("vpPhCheque"));
        $scope.clsCtcontratchequephotoreglementcaisses = [];
        for (var i = 0; i < $scope.tableauimage.length; i++) {
          $scope.objetchequephoto = {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            CH_IDEXCHEQUE: $scope.recupPhoto.CH_IDEXCHEQUE,
            CH_NUMSEQUENCEPHOTO: "",
            CH_CHEMINPHOTOCHEQUE: $scope.base64,
            CH_LIBELLEPHOTOCHEQUE: "test",
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

          $scope.objetchequephoto.CH_CHEMINPHOTOCHEQUE = $scope.tableauimage[i];
          $scope.clsCtcontratchequephotoreglementcaisses.push(
            $scope.objetchequephoto
          );
          console.log($scope.clsCtcontratchequephotoreglementcaisses);
        }

        $scope.objet_envoie = $scope.clsCtcontratchequephotoreglementcaisses;
        console.log($scope.objet_envoie);
        $http
          .post(
            "/RemiseDeChequePhoto/AjoutRemiseDeChequePhoto/",
            $scope.objet_envoie,
            {}
          )
          .then(function (reponse) {
            $scope.testRemiseDeChequePhoto = reponse.data;
            if (
              $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_RESULTAT ==
              "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $scope.pretACharger = false;
              $rootScope.EnregistrementReussi(
                $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
              );
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    //Fin  enregistrement Photo

    //debut recuperer id pour la suppression de photo
    $scope.supprRecupererIdChequePhoto = function (
      dateSaisieCheque1,
      recupId,
      numSeqPhoto
    ) {
      $scope.idElement1 = dateSaisieCheque1;
      $scope.idElement = recupId;
      $scope.cheqId3 = numSeqPhoto;
    };
    //debut recuperer id pour la suppression de photo

    //debut  suppression de photo RemiseDeCheque
    $scope.suppRemiseDeChequePhoto = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $scope.idElement1,
          CH_IDEXCHEQUE: $scope.idElement,
          CH_NUMSEQUENCEPHOTO: $scope.cheqId3,
          SL_LIBELLEMOUCHARD: "SUPPRESSION",
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
          "/RemiseDeChequePhoto/SuppressionRemiseDeChequePhoto/",
          $scope.objet_envoie,
          {}
        )
        .then(function (reponse) {
          $scope.deleteRemiseDeChequePhoto = reponse.data;
          if (
            $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_RESULTAT ==
            "TRUE"
          ) {
            $rootScope.SuppressionReussie(
              $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.$emit("UNLOAD");
            setTimeout($scope.rechargePage, 3600);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
            );
          }
        })
        .catch(function () {
          $rootScope.ProblemeServeur(
            $scope.deleteRemiseDeChequePhoto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //Fin  suppression de photo RemiseDeCheque

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
      if ($scope.formatImage == "image/png") {
        $scope.base64 = elt.replace("data:image/png;base64,", "");
      } else {
        $scope.base64 = elt.replace("data:image/jpeg;base64,", "");
      }
    };
    $scope.imgSignBase64 = function (elt) {
      $scope.signbase64 = elt.replace("data:image/jpeg;base64,", "");
    };
    // fonction pour telecharger une photo

    $scope.tableauimage = [];
    $scope.tableauimage2 = [];
    $scope.tabEngReglement = [];
    $scope.newtab = [];
    var reader = {};

    var image = {};
    $scope.idimagcheque = "";
    $scope.collecionimage = {};

    //gestion d'image
    $scope.pretACharger = false;
    $scope.process = function () {
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

    //recupsuprimg
    $scope.recupsuprimg = function (lien) {
      $scope.idimagcheque = lien;
    };
    //recupsuprimg

    // Supprime image
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
    // Supprime image

    //Document chèque
    $scope.docRemiseDeCheque = function () {
      window.location.href =
        "#/assurances/operation/liste/DocumentRemiseDeCheque";
    };
    //Document chèque

    //debut suppression RemiseDeCheque
    $scope.SupprimerRemiseDeCheque = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_IDEXCHEQUE: $scope.idElement,
          CH_DATESAISIECHEQUE: $scope.idElement1,
          CH_NUMSEQUENCEPHOTO: $scope.idElement3,
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
          "/RemiseDeCheque/SuppressionRemiseDeCheque/",
          $scope.objet_envoie,
          {}
        )
        .then(function (reponse) {
          $scope.testSuppression = reponse.data;
          console.log($scope.testSuppression);
          if ($scope.testSuppression[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeRemiseDeCheque[0].clsObjetRetour.SL_RESULTAT = "FALSE";
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie();
          }
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur();
        });
    };
    //fin suppression RemiseDeCheque

    //debut  enregistrement Photo
    $scope.afficheListePhotoCheque = function () {
      $scope.listeDoc = JSON.parse(sessionStorage.getItem("vpPhCheque"));
      console.log($scope.listeDoc);
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: $scope.listeDoc.CH_IDEXCHEQUE,
          SI_CODESINISTRE: $scope.collectionContartOp1.SI_CODESINISTRE,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
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
          "/RemiseDeChequePhoto/ListeRemiseDeChequePhoto/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.$emit("UNLOAD");
          $scope.listeRemiseChequePhoto = reponse.data;
          $scope.nombreInfoBulle = $scope.listeRemiseChequePhoto.length;
          $scope.tableauInfoBulle =
            $scope.listeRemiseChequePhoto[0].clsObjetRetour.SL_CODEMESSAGE;
          console.log($scope.tableauInfoBulle);
          console.log($scope.listeRemiseChequePhoto);
        });
    };
    //Fin  enregistrement Photo

    //fin dev

    // debut agrandir photo
    $scope.indexPhotoSelect = "";
    $scope.agrandirPhoto = function (index) {
      $scope.indexPhotoSelect = index;
    };
    // fin agrandir photo

    // DEBUT COMBOS

    //debut liste des banques
    $scope.afficheListeBanqueTire = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "BANQUE",
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
              setTimeout($scope.retourModifRemiseDeCheque, 3600);
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
    //fin liste des banques
    $scope.clicRetourListeOp = function () {
     
      switch ($rootScope.collectionContartOp.RQ_CODERISQUE) {
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
    //ACCEDER A LA PAGE DE MODIFICATION
    $scope.retourModifRemiseDeCheque = function () {
      $scope.etatForm = "2";

      $scope.recupererInfo = JSON.parse(
        sessionStorage.getItem("modifRemiseDeCheque")
      );
      console.log($scope.recupererInfo);

      $scope.FormAddRemiseDeCheque.Code =
        $scope.collectionContartOp.TI_NUMTIERS;
      $scope.FormAddRemiseDeCheque.Denomination =
        $scope.collectionContartOp.TI_DENOMINATION;
      $scope.FormAddRemiseDeCheque.Reference =
        $scope.recupererInfo.CH_REFCHEQUE;
      $scope.FormAddRemiseDeCheque.Montant =
        $scope.recupererInfo.CH_VALEURCHEQUE;
      $scope.FormAddRemiseDeCheque.DateEmission =
        $scope.recupererInfo.CH_DATEEMISSIONCHEQUE;
      $scope.FormAddRemiseDeCheque.BanqueTire =
        $scope.recupererInfo.BQ_CODEBANQUE;
      $scope.FormAddRemiseDeCheque.AgBanqueTire =
        $scope.recupererInfo.AB_CODEAGENCEBANCAIRE;
      $scope.FormAddRemiseDeCheque.NomTireur =
        $scope.recupererInfo.CH_NOMTIREUR;
      $scope.FormAddRemiseDeCheque.NomTire = $scope.recupererInfo.CH_NOMTIRE;
      $scope.FormAddRemiseDeCheque.DateReception =
        $scope.recupererInfo.CH_DATERECEPTIONCHEQUE;
      $scope.FormAddRemiseDeCheque.NomDeposant =
        $scope.recupererInfo.CH_NOMDUDEPOSANT;
      $scope.FormAddRemiseDeCheque.TelephoneDeposant =
        $scope.recupererInfo.CH_TELEPHONEDEPOSANT;
      $scope.FormAddRemiseDeCheque.Effet = $scope.recupererInfo.CH_DATEEFFET;
    };
    //ACCEDER A LA PAGE DE MODIFICATION

    // FIN COMBOS
  },
]);
