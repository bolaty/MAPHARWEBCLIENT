MapharApp.controller("ReglementFactureClientController", [
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
    // $rootScope.infocontrat = angular.fromJson(localStorage.getItem("vpOpMultirisqueProinfocontrat"));
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );
    console.log($rootScope.collectionContartOp);

    /*DEBUT ZONE DE DECLARATION*/
    $scope.FormAddReglementfactClient = {
      numfacture: $rootScope.collectionContartOp.NUMEROBORDEREAU,
      Nclient: $rootScope.collectionContartOp.TI_NUMTIERS,
      nomclient: $rootScope.collectionContartOp.TI_DENOMINATION,
      Nbordereau: "",
      nomRemettant: "",
      modeRglment: "",
      NatCompte: "",
      NumCompte: "",
      banque: "", 
      agence: "",
      refpiece: "",
      montant: "",
      code01: "",
      denomination01: "",
      id01: "",
      Adresse: "",
      libbanq: "",
      libbagence: "",
      SR_MONTANTCREDIT: "",
    };
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

    $scope.listeCheque = [];
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
    $scope.pouvoirenregcheq = 0;
    $scope.recuperer = [];
    $scope.recupererInfoCheque = {};
    $scope.testModificationCheque = [];
    $scope.listeChequeDocument = [];
    $scope.deleteChequePhoto = [];
    $scope.Etatbouton = 1;
    $scope.listeDesNumComptes = [];
    $scope.listeDesBanques = [];
    $scope.listeDesAgences = [];
    $scope.listeDesAgences = [];
    $scope.listeDesModesReglement = [];
    $scope.listeDesNaturesCompte = [];
    $scope.listeDesVersements = [];
    $scope.recupererinfofactClient = [];
    $scope.tabEngReglement = [];
    $scope.isDisabled2 = false;
    $scope.isDisabled5 = true;
    $scope.tabsituationactuelleversement = [
      {
        codebanq: "",
        libbanq: "",
        codeagen: "",
        libbagence: "",
        refcheq: "",
        valeur: "",
      },
    ];
    $scope.image = {
      img: [{ upload: "" }],
    };
    $scope.ajoutImage = function () {
      //                let cheminImage = "/Content/assets/media/illustration/undraw_profile_pic_ic5t.svg"
      $scope.image.img.push({ upload: $scope.avatar });
    };

    $scope.idElement = "";
    $scope.idElement0 = "";
    $scope.idElement1 = "";
    $scope.idElement2 = "";
    $scope.id01 = "";
    $scope.id02 = "";
    $scope.idElementPhoto = "";
    $scope.cheminCheq = "";
    $scope.libPhoto = "";

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
    //debut initialisation add reglement facture client
    $scope.initFormAddreglfactclient = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeBanque();
      // $scope.afficheListeAgence()
      $scope.afficheListeModeReglement();
      $scope.afficheListeVersement();
      $scope.tabsituationactuelleversement.splice(0, 1);
      // $scope.afficheListeNatureCompte()
      // $scope.afficheListeNumCompte()
      $scope.$emit("UNLOAD");
      //$scope.afficheListeDocument();
    };
    //fin initialisation add reglement facture client

    //debut initialisation add Cheque
    $scope.initFormAddCheque = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeBanqueTire();
      $scope.retourModifMultirisquePro();
      $scope.$emit("UNLOAD");
      //$scope.afficheListeDocument();
    };
    //fin initialisation add Cheque

    //debut initialisation add Cheque
    $scope.initFormListCheque = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeBanqueTire();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add Cheque

    //debut initialisation add Cheque
    $scope.initFormModifCheque = function () {
      $scope.$emit("LOAD");
      $scope.retourModifCheque();
      $scope.afficheListeBanqueTire();
      $scope.$emit("UNLOAD");
    };
    //fin initialisation add Cheque

    //Debut developpement ANICETTE

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

      $scope.afficheListeBanqueAgence($scope.recupererInfoCheque.BQ_CODEBANQUE);
    };
    //fin acceder a la page de modification

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

    //debut liste des souscripteur

    //debut liste des banques
    $scope.afficheListeVersement = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          MS_NUMPIECE: $rootScope.collectionContartOp.MS_NUMPIECE,
          TI_NUMTIERS: $rootScope.collectionContartOp.TI_NUMTIERS,
          MV_DATESAISIE: $rootScope.collectionContartOp.MV_DATESAISIE,
          TYPEOPERATION: "2",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "Reglement facture client",
          SL_LIBELLEMOUCHARD: "liste",
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
          "/ReglementCommissionAssurance/ListeReglementCommissionAssurance/",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeDesVersements = reponse.data;
          console.log($scope.listeDesVersements);
        });
    };
    //fin liste des banques
    //$scope.calculvalresumer = function () {

    //    $scope.valmontaregler = $scope.listeDesVersements.MONTANTAREGLERASSUREUR;
    //    $scope.valmontregler = $scope.listeDesVersements.MONTANTREGLERASSUREUR;
    //    $scope.valmontrestaregler = $scope.listeDesVersements.RESTEAREGLERASSUREUR;
    //    $scope.valversdujour = $scope.listeDesVersements.SR_MONTANTCREDIT;
    //    for (var j = 0; j < $scope.listeDesVersements.length; j++) {
    //        $scope.valmontaregler = parseInt($scope.valmontaregler) + parseInt($scope.listeDesVersements[j].MONTANTAREGLERASSUREUR);
    //        $scope.valmontregler = parseInt($scope.valmontregler) + parseInt($scope.listeDesVersements[j].MONTANTREGLERASSUREUR);
    //        $scope.valmontrestaregler = parseInt($scope.valmontrestaregler) + parseInt($scope.listeDesVersements[j].RESTEAREGLERASSUREUR);
    //        $scope.valversdujour = parseInt($scope.valversdujour) + parseInt($scope.listeDesVersements[j].SR_MONTANTCREDIT);

    //        }
    //}
    //debut liste des banques
    $scope.afficheListeBanque = function () {
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
        .post("/Banque/ListeBanque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesBanques = reponse.data;
        });
    };
    //fin liste des banques

    //debut liste des agences
    $scope.afficheListeAgence = function (id) {
      $scope.objet_envoie = [
        {
          BQ_CODEBANQUE: id,
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
        .post("/BanqueAgence/ListeBanqueAgence/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesAgences = reponse.data;
          console.log($scope.listeDesAgences);
        });
    };
    //fin liste des agences

    //debut liste du mode de reglement
    $scope.afficheListeModeReglement = function () {
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
        .post("/ModeReglement/ListeModeReglement/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesModesReglement = reponse.data;
          console.log($scope.listeDesModesReglement);
        });
    };
    //fin liste du mode de reglement
    //debut liste des agences
    $scope.afficheListeNatureCompte = function (id) {
      $scope.objet_envoie = [
        {
          MR_CODEMODEREGLEMENT: id,
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
        .post("/NatureCompte/ListeNatureCompte/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesNaturesCompte = reponse.data;
        });

      // $scope.changerEtatInfoCheque();
    };
    //fin liste des agences

    //debut liste des comptes
    $scope.afficheListeNumCompte = function () {
      $scope.NC_CODENATURECOMPTE = "";
      switch ($scope.FormAddReglementfactClient.NatCompte) {
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
          $scope.listeDesNumComptes = reponse.data;
        });
    };
    //fin liste des comptes

    //Debut choix d'un compte
    $scope.choixNumCompte = function (collection) {
      $(document).ready(function () {
        $("#idNumCompte").css("background-color", "#EDEDED");
      });
      $scope.FormAddReglementfactClient.NumCompte = collection.PL_NUMCOMPTE;
      $scope.FormAddReglementfactClient.PL_CODENUMCOMPTE =
        collection.PL_CODENUMCOMPTE;
      // $scope.isDisabled1 = true;
    };
    //Fin choix d'un compte
    //$scope.afficheListeTiersSouscripteur = function (num, denom) {
    //    $scope.objet_envoie = [{
    //        "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //        "TI_STATUT": "N",
    //        "TI_NUMTIERS": num,
    //        "TI_DENOMINATION": denom,
    //        "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
    //        "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
    //        "TI_DATESAISIE1": $rootScope.DATE_PREMIER_EXERCICE,
    //        "TI_DATESAISIE2": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //        "SL_LIBELLEECRAN": "ECRAN AUTO",
    //        "SL_LIBELLEMOUCHARD": "LISTE",
    //        "TYPEOPERATION": "TIERS",
    //        "LG_CODELANGUE": "fr",
    //        "clsObjetEnvoi": {
    //            "OE_A": $rootScope.CODE_AGENCE,
    //            "OE_Y": $rootScope.CODE_OPERATEUR,
    //            "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //        }
    //    }];

    //    $http.post("/SouscripteurCommercial/ListeTiers/", $scope.objet_envoie, {
    //        //headers: $scope.headers
    //    }).then(function (reponse) {
    //        $scope.listeDesSouscripteurs = reponse.data;
    //    })
    //}
    //fin liste des souscripteur
    $scope.choixSouscripteur = function (code, denomination, id, ad) {
      $scope.FormAddReglementfactClient.code01 = code;
      $scope.FormAddReglementfactClient.denomination01 = denomination;
      $scope.FormAddReglementfactClient.id01 = id;
      $scope.FormAddReglementfactClient.Adresse = ad;
      //$scope.isDisabled = true;
      //const test = document.getElementById("champs1").focus()
      //test.focus();
    };
    //fin fonction pour annuler la recherche

    ////debut contrainte sur les champs add CHEQUE
    //$scope.contrainteFormAddCheque = function () {
    //    FormValidation.formValidation(
    //        document.getElementById('formAddCheque'), {
    //            fields: {
    //                addCheque_Reference: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la référence.'
    //                        },
    //                        regexp: {
    //                            regexp: /^(0|[0-9]\d*)$/,
    //                            message: 'Veuillez saisir une référence correcte.'
    //                        }
    //                    }
    //                },
    //                addCheque_Montant: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le montant.'
    //                        },
    //                        regexp: {
    //                            regexp: /^[0-9]{1,15}$/,
    //                            message: 'Veuillez saisir un montant correct.'
    //                        }
    //                    }
    //                },
    //                addCheque_dateEmission: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la date d\emission.'
    //                        },
    //                        regexp: {
    //                            regexp: /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
    //                            message: 'Veuillez saisir une date correcte.'
    //                        }
    //                    }
    //                },
    //                addCheque_banqueTiré: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la banque du tiré.'
    //                        },
    //                    }
    //                },
    //                addCheque_Ag_BQ_duTiré: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le nom de l\'agence bancaire.'
    //                        },
    //                    }
    //                },
    //                addCheque_agTiré: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la date d\'effet.'
    //                        },
    //                    }
    //                },
    //                addCheque_nomTireur: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le nom de le nom le tireur.'
    //                        },
    //                        regexp: {
    //                            regexp: /^[a-z-A-Z]/,
    //                            message: 'Veuillez saisir un nom correcte.'
    //                        }
    //                    }
    //                },
    //                addCheque_nomTiré: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le nom du tiré.'
    //                        },
    //                        regexp: {
    //                            regexp: /^[a-z-A-Z]/,
    //                            message: 'Veuillez saisir un nom correcte.'
    //                        }
    //                    }
    //                },
    //                addCheque_dateReception: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la date de reception.'
    //                        },
    //                        regexp: {
    //                            regexp: /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
    //                            message: 'Veuillez saisir une date correcte.'
    //                        }
    //                    }
    //                },
    //                addCheque_nomDeposant: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le nom du deposant.'
    //                        },
    //                        regexp: {
    //                            regexp: /^[a-z-A-Z]/,
    //                            message: 'Veuillez saisir un nom correct.'
    //                        }
    //                    }
    //                },
    //                addCheque_telDeposant: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez sélectionner le téléphone du deposant.'
    //                        },
    //                        regexp: {
    //                            regexp: /^(0|[0-9]\d*)$/,
    //                            message: 'Veuillez saisir un telephone deposant correct.'
    //                        }
    //                    }
    //                },
    //                addCheque_Effet: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez sélectionner l/effet.'
    //                        },
    //                        regexp: {
    //                            regexp: /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
    //                            message: 'Veuillez saisir une date correcte.'
    //                        }
    //                    }
    //                },
    //            },
    //            plugins: {
    //                trigger: new FormValidation.plugins.Trigger(),
    //                // Bootstrap Framework Integration
    //                bootstrap: new FormValidation.plugins.Bootstrap(),
    //                // Validate fields when clicking the Submit button
    //                submitButton: new FormValidation.plugins.SubmitButton(),
    //                // Submit the form when all fields are valid
    //                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
    //            }
    //        }
    //    );
    //}
    ////fin contrainte sur les champs add CHEQUE

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
            $scope.listeCheque = reponse.data.reverse();
            console.log($scope.listeCheque);
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

    //debut recuperer id pour la suppression
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
    //debut recuperer id pour la suppression

    //debut  suppression
    $scope.testSuppressionCheque = [];
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
            //console.log($scope.testSuppressionCheque)
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
      sessionStorage.setItem("vpPhCheque", JSON.stringify(info));
    };

    //Document chèque
    $scope.docCheque = function () {
      window.location.href = "#/assurances/operation/document/cheque";
    };
    //Document chèque

    //debut liste des banques du tiré
    $scope.afficheListeBanqueTire = function () {
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
        });
    };
    //fin liste des banques du tiré

    //debut liste des agences  banques
    $scope.afficheListeBanqueAgence = function (idAgBq) {
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
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typemontant.test($scope.FormAddCheque.montant) == false) {
        $scope.messageErreur = "Veuillez renseigner un montant correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test($scope.FormAddCheque.telDeposant) == false
      ) {
        $scope.messageErreur =
          "Veuillez renseigner un numéro de téléphone correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddCheque.nomTireur) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un  nom Tireur correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeAlphabetique.test($scope.FormAddCheque.nomTire) == false) {
        $scope.messageErreur = "Veuillez renseigner un  nom Tire correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeAlphabetique.test($scope.FormAddCheque.nomDeposant) == false
      ) {
        $scope.messageErreur = "Veuillez renseigner un  nom Deposant correct";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.effet) == false) {
        $scope.messageErreur = "Veuillez renseigner une date effet correcte";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $scope.$emit("UNLOAD");
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
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.dateEmission) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une date d'emission correcte";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisEmission == "02" &&
        $scope.leJourEmission > "29"
      ) {
        $scope.messageErreur = "La date d'emission n'est pas valide";
        $scope.$emit("UNLOAD");
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
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddCheque.dateReception) == false) {
        $scope.messageErreur =
          "Veuillez renseigner une date de reception correcte";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.leMoisReception == "02" &&
        $scope.leJourReception > "29"
      ) {
        $scope.messageErreur = "La date de reception n'est pas valide";
        $scope.$emit("UNLOAD");
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }
      //else if (($scope.leMoisReception == "04" || $scope.leMoisReception == "06" || $scope.leMoisReception == "09" || $scope.leMoisReception == "11") && ($scope.leJourEffet > "30")) {
      //    $scope.messageErreur = "La date de reception n'est pas valide";
      //    $rootScope.MessageDerreurDesTypes($scope.messageErreur)
      //}
      else if (
        $scope.dateSuperioriteFin($scope.FormAddCheque.dateReception) >
        $rootScope.calculDateJourneeDeTravail(
          $rootScope.DATE_JOURNEE_DE_TRAVAIL
        )
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateReceptionIncorrected();
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddCheque.dateEmission) >=
        $scope.dateSuperioriteFin($scope.FormAddCheque.dateReception)
      ) {
        $scope.$emit("UNLOAD");
        $rootScope.dateReceptionIncorrecte();
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
            CH_IDEXCHEQUE: $scope.recupererInfoCheque.CH_IDEXCHEQUE, //$scope.CH_IDEXCHEQUE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_CODECONTRAT: $scope.collectionContartOp.CA_CODECONTRAT,
            CH_REFCHEQUE: $scope.FormAddCheque.reference,
            CH_VALEURCHEQUE: $scope.FormAddCheque.montant,
            CH_PRIMEAENCAISSER: "5000000",
            CH_DATEANNULATIONCHEQUE: "01-01-1900",
            CH_DATEEMISSIONCHEQUE: $scope.FormAddCheque.dateEmission,
            CH_DATERECEPTIONCHEQUE: "01-01-1900",
            CH_DATEVALIDATIONCHEQUE: "01-01-1900",
            CH_NOMTIREUR: $scope.FormAddCheque.nomTireur,
            BQ_CODEBANQUE: $scope.FormAddCheque.banqueTire,
            AB_CODEAGENCEBANCAIRE: $scope.FormAddCheque.agBanqueTire,
            CH_NOMTIRE: $scope.FormAddCheque.nomTire,
            CH_DATERECEPTIONCHEQUE: $scope.FormAddCheque.dateReception,
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

    //debut supprimer case d'un nouvel ajout de document
    $scope.pourSupprimerAjoutDocumentCheque1 = function (elmnt) {
      if ($scope.image.img.length > 1) {
        $scope.image.img.splice(elmnt, 1);
      }
    };
    //fin supprimer case d'un nouvel ajout de document

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

    //debut  enregistrement Photo
    //$scope.afficheListePhotoCheque = function () {
    //    $scope.listeDoc = JSON.parse(sessionStorage.getItem("vpPhCheque"));
    //    console.log($scope.listeDoc)
    //    $scope.objet_envoie = [{
    //        "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //        "CH_DATESAISIECHEQUE": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //        "CH_IDEXCHEQUE": $scope.listeDoc.CH_IDEXCHEQUE,
    //        "CA_CODECONTRAT": $scope.collectionContartOp.CA_CODECONTRAT,
    //        "SL_LIBELLEMOUCHARD": "LISTE",
    //        "TYPEOPERATION": "2",
    //        "LG_CODELANGUE": "fr",
    //        "clsObjetEnvoi": {
    //            "OE_A": $rootScope.CODE_AGENCE,
    //            "OE_Y": $rootScope.CODE_OPERATEUR,
    //            "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //        }
    //    }]; $http.post("/ContratChequePhoto/ListeContratChequePhoto/", $scope.objet_envoie, {
    //        //headers: $scope.headers
    //    }).then(function (reponse) {
    //        $scope.$emit('UNLOAD');
    //        $scope.listeChequeDocument = reponse.data.reverse();
    //        console.log($scope.listeChequeDocument)
    //    });
    //}
    //Fin  enregistrement Photo

    //debut  enregistrement Photo
    $scope.PhotoCheque = function () {
      $scope.$emit("LOAD");
      $scope.recupPhoto = JSON.parse(sessionStorage.getItem("vpPhCheque"));
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          CH_IDEXCHEQUE: $scope.recupPhoto.CH_IDEXCHEQUE,
          CH_NUMSEQUENCEPHOTO: "",
          CH_CHEMINPHOTOCHEQUE: $scope.base64,
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
        },
      ];
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
          //console.log($scope.testPhotoCheque)
          if ($scope.testPhotoCheque[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementReussi(
              $scope.testPhotoCheque[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.listeCheque[0].clsObjetRetour.SL_RESULTAT = "FALSE";
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
    };
    //Fin  enregistrement Photo

    //debut recuper id du cheque a valider
    $scope.validateChq = function (
      recupId,
      codeAgence,
      dateSaisieCheque,
      refCheque,
      exCheque,
      dateValidatecheque
    ) {
      $scope.idElement = recupId;
      $scope.idElement0 = codeAgence;
      $scope.idElement1 = dateSaisieCheque;
      $scope.idElement2 = dateValidatecheque;
      $scope.id01 = refCheque;
      $scope.id02 = exCheque;
    };
    //fin recuper id du cheque a valider

    //debut validation cheque
    $scope.validationCheque = function () {
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $scope.recupId,
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
    $scope.supprRecupererIdChequePhoto = function () {
      ($scope.cheqId1 = date),
        ($scope.cheqId2 = exCheqId),
        ($scope.cheqId3 = numSeqPhoto);
    };
    //debut recuperer id pour la suppression

    //debut  suppression
    $scope.deleteChequePhoto = [];
    $scope.suppChequePhoto = function () {
      $scope.$emit("LOAD");

      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CH_DATESAISIECHEQUE: $scope.idCheque2,
          CH_IDEXCHEQUE: $scope.exCheqId,
          CH_NUMSEQUENCEPHOTO: numSeqPhoto,
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
          //console.log($scope.testSuppressionCheque)
        });
    };
    //Fin  suppression
    //debut focus sur le champ
    $scope.desactiverChampRequisCheque = function () {
      $(document).ready(function () {
        $("#idBanque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idAgence").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idRefPiece").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idMontant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ
    //ajout des infos dans la grille

    $scope.ajoutinfocheque = function () {
      $scope.desactiverChampRequisCheque();
      if (
        $scope.FormAddReglementfactClient.banque !== "" &&
        $scope.FormAddReglementfactClient.banque !== undefined &&
        $scope.FormAddReglementfactClient.agence !== "" &&
        $scope.FormAddReglementfactClient.agence !== undefined &&
        $scope.FormAddReglementfactClient.refpiece !== "" &&
        $scope.FormAddReglementfactClient.refpiece !== undefined &&
        $scope.FormAddReglementfactClient.montant !== "" &&
        $scope.FormAddReglementfactClient.montant !== undefined
      ) {
        $scope.objettab = {
          codebanq: $scope.FormAddReglementfactClient.banque,
          libbanq: "",
          codeagen: $scope.FormAddReglementfactClient.agence,
          libbagence: "",
          refcheq: $scope.FormAddReglementfactClient.refpiece,
          valeur: $scope.FormAddReglementfactClient.montant,
        };
        for (var i = 0; i < $scope.listeDesBanques.length; i++) {
          if (
            $scope.listeDesBanques[i].BQ_CODEBANQUE ===
            $scope.FormAddReglementfactClient.banque
          ) {
            $scope.objettab.libbanq = $scope.listeDesBanques[i].BQ_SIGLE;
            break;
          }
        }
        for (var j = 0; j < $scope.listeDesAgences.length; j++) {
          if (
            $scope.listeDesAgences[j].AB_CODEAGENCEBANCAIRE ===
            $scope.FormAddReglementfactClient.agence
          ) {
            $scope.objettab.libbagence = $scope.listeDesAgences[j].AB_LIBELLE;
            break;
          }
        }
        $scope.tabsituationactuelleversement.push($scope.objettab);
        console.log($scope.tabsituationactuelleversement);
        $scope.FormAddReglementfactClient.banque = "";
        $scope.FormAddReglementfactClient.agence = "";
        $scope.FormAddReglementfactClient.refpiece = "";
        $scope.FormAddReglementfactClient.montant = "";
        $scope.isDisabled2 = true;
        $scope.isDisabled5 = false;
      } else {
        $(document).ready(function () {
          if (
            $scope.FormAddReglementfactClient.banque === "" ||
            $scope.FormAddReglementfactClient.banque === undefined
          ) {
            $("#idBanque").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.agence === "" ||
            $scope.FormAddReglementfactClient.agence === undefined
          ) {
            $("#idAgence").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.refpiece === "" ||
            $scope.FormAddReglementfactClient.refpiece === undefined
          ) {
            $("#idRefPiece").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.montant === "" ||
            $scope.FormAddReglementfactClient.montant === undefined
          ) {
            $("#idMontant").css("background-color", "#FFE9E0");
          }
        });
        let typeNumerique = /^\d+$/;
        if (
          typeNumerique.test($scope.FormAddReglementfactClient.montant) == false
        ) {
          $(document).ready(function () {
            $("#idMontant").css("background-color", "#FFE9E0");
          });
        }
        $rootScope.messageInfoCheque();
      }
    };
    //fin ajout
    $scope.enregistrcheque = function (colinfocheque) {
      console.log(colinfocheque);
      sessionStorage.setItem(
        "chequenregistrment",
        JSON.stringify(colinfocheque)
      );
      window.location.href = "#/EnregistrementDeCheque";
    };

    $scope.retourModifMultirisquePro = function () {
      $scope.recupererinfofactClient = JSON.parse(
        sessionStorage.getItem("chequenregistrment")
      );
      console.log($scope.recupererinfofactClient[0].refcheq);
      $scope.FormAddCheque.reference = $scope.recupererinfofactClient.refcheq;
      $scope.FormAddCheque.montant = $scope.recupererinfofactClient.valeur;
    };

    //debut pour desactiver les champs enregistrement
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idNomRemettant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idModeRegl").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNatCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idNumCompte").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idVersementJour").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin pour desactiver les champs enregistrement

    //Debut ajout reglement commission assurance
    $scope.validerReglementFactClient = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();

      let typeNumCompte = /^[0-9]{1,12}$/;

      if (
        $scope.FormAddReglementfactClient.nomRemettant === "" ||
        $scope.FormAddReglementfactClient.nomRemettant === undefined ||
        $scope.FormAddReglementfactClient.modeRglment === "" ||
        $scope.FormAddReglementfactClient.modeRglment === undefined ||
        $scope.FormAddReglementfactClient.NatCompte === "" ||
        $scope.FormAddReglementfactClient.NatCompte === undefined ||
        $scope.FormAddReglementfactClient.NumCompte === "" ||
        $scope.FormAddReglementfactClient.NumCompte === undefined ||
        $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === "" ||
        $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddReglementfactClient.nomRemettant === "" ||
            $scope.FormAddReglementfactClient.nomRemettant === undefined
          ) {
            $("#idNomRemettant").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.modeRglment === "" ||
            $scope.FormAddReglementfactClient.modeRglment === undefined
          ) {
            $("#idModeRegl").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.NatCompte === "" ||
            $scope.FormAddReglementfactClient.NatCompte === undefined
          ) {
            $("#idNatCompte").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.NumCompte === "" ||
            $scope.FormAddReglementfactClient.NumCompte === undefined
          ) {
            $("#idNumCompte").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === "" ||
            $scope.FormAddReglementfactClient.SR_MONTANTCREDIT === undefined
          ) {
            $("#idVersementJour").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typeNumCompte.test(
          $scope.FormAddReglementfactClient.SR_MONTANTCREDIT
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idVersementJour").css("background-color", "#FFE9E0");
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        $scope.FormAddReglementfactClient.modeRglmentt === "02" &&
        $scope.tabsituationactuelleversement.length === 0
      ) {
        //a revoir demain
        $scope.$emit("UNLOAD");
        $rootScope.infoAjoutCheque();
      } else {
        for (i = 0; $scope.tabsituationactuelleversement.length > i; i++) {
          $scope.objet_envoie = [
            {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
              MS_NUMPIECE: $rootScope.collectionContartOp.MS_NUMPIECE,
              MV_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              MV_NOMTIERS: $scope.FormAddReglementfactClient.nomRemettant,
              MR_CODEMODEREGLEMENT:
                $scope.FormAddReglementfactClient.modeRglment,
              TI_NUMTIERS: $rootScope.collectionContartOp.TI_NUMTIERS,
              PL_NUMCOMPTE: $rootScope.collectionContartOp.PL_NUMCOMPTETIERS, //pas encore disponible
              PL_NUMCOMPTEBANQUE: $scope.FormAddReglementfactClient.NumCompte,
              MONTANTVERSEMENT:
                $scope.FormAddReglementfactClient.SR_MONTANTCREDIT,
              MONTANTFACTURETTC:
                $scope.listeDesVersements[0].MONTANTAREGLERASSUREUR,
              MV_REFERENCEPIECE:
                $scope.tabsituationactuelleversement[i].refcheq,
              FB_IDFOURNISSEUR: "",
              TYPEOPERATION: "1",
              OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
              SL_LIBELLEECRAN: "ENREGISTREMENT FACTURE CLIENT",
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
        }

        $http
          .post(
            "/ReglementfactureClient/ListeReglementfactureClient/",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.tabEngReglement = reponse.data;
            if (
              $scope.tabEngReglement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.tabEngReglement[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.FormAddReglementfactClient = {};
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.tabEngReglement[0].clsObjetRetour.SL_MESSAGE
              );
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.tabEngReglement[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };
    //Fin ajout reglement commission assurance
    //fin developpement ANICETTE
  },
]);
