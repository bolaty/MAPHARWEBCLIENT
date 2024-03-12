MapharApp.controller("DemandeContratController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    $scope.appelServiceWeb = $rootScope.ADRESSESERV;//"http://192.168.1.100:6033/Service/";

    $scope.SL_LIBELLEECRAN = "DEMANDE DE CONTRAT";
    $scope.SL_LIBELLEMOUCHARDCOMBO = "CHARGEMENT COMBO";
    $scope.SL_LIBELLEMOUCHARDLISTE = "LISTE";
    $scope.SL_LIBELLEMOUCHARDSUPPRESSION = "SUPPRESSION";
    $scope.listeStatut = [];
    $scope.listeRisque = [];
    $scope.listeDemande = [];
    $scope.listeDesExercice = [];
    $scope.formDemande = {
      Statut: "",
      Risque: "",
      periodeDu: "",
      periodeAu: "",
      Exercice: $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE
    };
    $scope.lAnneeDebut = "";
    $scope.leMoisDebut = "";
    $scope.leJourDebut = "";
    $scope.lAnneeFin = "";
    $scope.leMoisFin = "";
    $scope.leJourFin = "";

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/
    //debut localStorage pour cacher enrg
    $scope.recupInfoBouton = angular.fromJson(
      localStorage.getItem("recupInfoBouton")
    );
    console.log($scope.recupInfoBouton);
    //fin localStorage pour cacher enrg

    //debut loader
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

    /*FIN FONCTION GENERALE*/
    $scope.initFormListe = function () {
      $scope.afficheModelListeExercice();
    };
    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddMultirisquePro = function () {
      $(document).ready(function () {
        $("#idCode1").css("background-color", "#FFFFFF");
        $("#idDenomination1").css("background-color", "#FFFFFF");
        $("#idCode2").css("background-color", "#FFFFFF");
        $("#idDenomination2").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idIntermediaire").css("background-color", "#FFFFFF");
        $("#idPays").css("background-color", "#FFFFFF");
        $("#idVille").css("background-color", "#FFFFFF");
        $("#idCommune").css("background-color", "#FFFFFF");
        $("#idSituationGeo").css("background-color", "#FFFFFF");
        $("#idEffet").css("background-color", "#FFFFFF");
        $("#idEcheance").css("background-color", "#FFFFFF");
        $("#idAssureur").css("background-color", "#FFFFFF");
        $("#idInterlocuteur").css("background-color", "#FFFFFF");
        $("#idTel").css("background-color", "#FFFFFF");
        $("#idDesignation").css("background-color", "#FFFFFF");
        $("#idTypeAff").css("background-color", "#FFFFFF");
      });
      $scope.FormAddMultirisquePro = {};
      $scope.initFormAddMultirisquePro();
      $scope.isDisabled1 = false;
      $scope.isDisabled2 = false;
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $(document).ready(function () {
        $("#idPeriodeDu").css("background-color", "#FFFFFF");
        $("#idPeriodeAu").css("background-color", "#FFFFFF");
        $("#idNumPolice").css("background-color", "#FFFFFF");
        $("#idNumSouscripteur").css("background-color", "#FFFFFF");
        $("#idNomSouscripteur").css("background-color", "#FFFFFF");
        $("#idNumCommercial").css("background-color", "#FFFFFF");
        $("#idNomCommercial").css("background-color", "#FFFFFF");
        $("#idExercice").css("background-color", "#FFFFFF");
      });
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
    };
    //fin pour annuler la recherche

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
        $("#idExercice").focusin(function () {
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

    // -----------------------------------------------------------------------------

    //debut focus sur le champ enregistrement
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idStatut").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idRisque").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idPeriodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idExercice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ enregistrement

    // debut initialistaion de la liste de demande
    $scope.initDemande = function () {
      $scope.formDemande.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.formDemande.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.afficheListeStatut();
      $scope.afficheListeRisque();
    };
    // fin initialistaion de la liste de demande
    $scope.afficheModelListeExercice = function () {
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
        .post("/EditionAssurance/ListeExercice/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesExercice = reponse.data;
          if ($scope.listeDesExercice[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
           // $scope.afficheListePays();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.EnregistrementNonReussi(
              $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
            );
            
          }
          console.log($scope.listeDesExercice);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesExercice[0].clsObjetRetour.SL_MESSAGE
          );
        
        });
    };
    //debut liste des statuts
    $scope.afficheListeDemande = function (
      leStatut,
      leRisque,
      laDateDebut,
      laDateFin,
      Exercice
    ) {
      $scope.$emit("LOAD");

      $scope.desactiverChampRequisListe();
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      if (
        $scope.formDemande.periodeDu !== undefined &&
        $scope.formDemande.periodeAu !== undefined
      ) {
        $scope.lAnneeDebut = $scope.formDemande.periodeDu.substr(6, 4);
        $scope.leMoisDebut = $scope.formDemande.periodeDu.substr(3, 2);
        $scope.leJourDebut = $scope.formDemande.periodeDu.substr(0, 2);
        $scope.lAnneeFin = $scope.formDemande.periodeAu.substr(6, 4);
        $scope.leMoisFin = $scope.formDemande.periodeAu.substr(3, 2);
        $scope.leJourFin = $scope.formDemande.periodeAu.substr(0, 2);
      }

      if (
        $scope.formDemande.periodeDu === "" ||
        $scope.formDemande.periodeDu === undefined ||
        $scope.formDemande.periodeAu === "" ||
        $scope.formDemande.periodeAu === undefined ||
        $scope.formDemande.Statut === "" ||
        $scope.formDemande.Statut === undefined ||
        $scope.formDemande.Risque === "" ||
        $scope.formDemande.Risque === undefined ||
        Exercice === undefined
      ) {
        if (
          $scope.formDemande.periodeDu === "" ||
          $scope.formDemande.periodeDu === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        }
        if (Exercice === "" || Exercice === undefined) {
          $("#idExercice").css("background-color", "#FFE9E0");
        }
        if (
          $scope.formDemande.periodeAu === "" ||
          $scope.formDemande.periodeAu === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        }
        if (
          $scope.formDemande.Risque === "" ||
          $scope.formDemande.Risque === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idRisque").css("background-color", "#FFE9E0");
        }
        if (
          $scope.formDemande.Statut === "" ||
          $scope.formDemande.Statut === undefined
        ) {
          $scope.$emit("UNLOAD");
          $("#idStatut").css("background-color", "#FFE9E0");
        }
        $rootScope.ChampsNonRenseignes();
      } else if (typeDate.test($scope.formDemande.periodeDu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date de début correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDebut) == true &&
        $scope.leMoisDebut == "02" &&
        $scope.leJourDebut > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeDebut) == false &&
        $scope.leMoisDebut == "02" &&
        $scope.leJourDebut > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisDebut == "04" ||
          $scope.leMoisDebut == "06" ||
          $scope.leMoisDebut == "09" ||
          $scope.leMoisDebut == "11") &&
        $scope.leJourDebut > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de début n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.formDemande.periodeAu) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une date de fin correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeFin) == true &&
        $scope.leMoisFin == "02" &&
        $scope.leJourFin > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeFin) == false &&
        $scope.leMoisFin == "02" &&
        $scope.leJourFin > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisFin == "04" ||
          $scope.leMoisFin == "06" ||
          $scope.leMoisFin == "09" ||
          $scope.leMoisFin == "11") &&
        $scope.leJourFin > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeAu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date de fin n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut(laDateDebut) >
        $scope.dateSuperioriteFin(laDateFin)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idPeriodeDu").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "La date de début ne peut pas être supérieure à la date de fin";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      }else if (
        Exercice == "" 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#idExercice").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "l'exercice est obligatoire svp !!!";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      //$scope.listeContrat = []
      } else {
        $scope.objet_envoie = {
          Objet: [
            {
              AG_CODEAGENCE: $rootScope.CODE_AGENCE,
              DATEDEBUT: laDateDebut,
              DATEFIN: laDateFin,
              RQ_CODERISQUE: leRisque,
              EX_EXERCICE: Exercice,
              SL_LIBELLEECRAN: "Saisie de Continent",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: leStatut,
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ],
        };

        $http
          .post(
            $scope.appelServiceWeb +
              "wsCtcontratdemandecreation.svc/pvgChargerDansDataSet",
            $scope.objet_envoie,
            {
              //headers: $scope.headers
            }
          )
          .then(function (reponse) {
            $scope.listeDemande = JSON.parse(reponse.data);
            $scope.listeDemande = $scope.listeDemande.TABLE;
            $scope.nombreInfoBulle = $scope.listeDemande.length;
            console.log($scope.listeDemande);
            if ($scope.listeDemande[0].SL_RESULTAT === "TRUE") {
              $scope.$emit("UNLOAD");
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes($scope.listeDemande[0].SL_MESSAGE);
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur($scope.listeDemande[0].SL_MESSAGE);
          });
      }
    };
    //fin liste des statuts

    // debut redirection vers les ecrans de contrat
    $scope.allerALEnregistrement = function (laCollection) {
      localStorage.setItem("collectionDemande", JSON.stringify(laCollection));

      switch (laCollection.RQ_CODERISQUE) {
        case "01":
          window.location.href =
            "#/assurances/enregistrement/multirisque-professionnel";
          break;
        case "02":
          window.location.href = "#/assurances/enregistrement/sante/pharmacien";
          break;
        case "03":
          window.location.href =
            "#/assurances/enregistrement/individuel-accident";
          break;
        case "04":
          window.location.href = "#/assurances/enregistrement/voyage";
          break;
        case "05":
          window.location.href = "#/assurances/enregistrement/habitat";
          break;
        case "06":
          window.location.href = "#/assurances/enregistrement/auto";
          break;
        case "07":
          window.location.href = "#/assurances/enregistrement/SanteAuxiliaire";
          break;
        case "08":
          window.location.href = "#/assurances/enregistrement/sante/gesa";
          break;
        case "09":
          window.location.href =
            "#/assurances/enregistrement/responsabilite-civile";
          break;
        case "10":
          window.location.href =
            "#/assurances/enregistrement/transport-et-marchandise";
          break;
      }
    };
    // fin redirection vers les ecrans de contrat

    // DEBUT COMBOS

    //debut liste des statuts
    $scope.afficheListeStatut = function () {
      $scope.objet_envoie = {
        Objet: [
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
        ],
      };

      $http
        .post(
          $scope.appelServiceWeb +
            "wsCtparcontratstatutdemande.svc/pvgChargerDansDataSet",
          $scope.objet_envoie,
          {
            //headers: $scope.headers
          }
        )
        .then(function (reponse) {
          $scope.listeStatut = JSON.parse(reponse.data);
          $scope.listeStatut = $scope.listeStatut.TABLE;
          console.log($scope.listeStatut);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur($scope.listeStatut[0].SL_MESSAGE);
        });
    };
    //fin liste des statuts

    //debut liste des risques
    $scope.afficheListeRisque = function () {
      $scope.objet_envoie = {
        Objet: [
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
        ],
      };

      $http
        .post("/Risque/ListeRisque/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeRisque = reponse.data;
          console.log($scope.listeRisque);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeRisque[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des risques

    // FIN COMBOS

    /*FIN DEV JJ*/
  },
]);