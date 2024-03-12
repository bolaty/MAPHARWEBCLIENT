MapharApp.controller("SaisieEcheancierController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION AUTO BOLATY*/
    //$rootScope.userinfos = angular.fromJson(localStorage.getItem("userCurrent"));
    //console.log($rootScope.userinfos[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL)

    $scope.objet_envoie = [];
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
    $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
    $rootScope.CODE_OPERATEUR = $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
    $rootScope.DATE_JOURNEE_DE_TRAVAIL =
      $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
    $rootScope.infocontrat = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    $scope.FormListSaisieEch = {
      montantFacture: 100000,
      dateEcheancier: "",
      montantEcheancier: "",
    };
    $scope.testSuppression = [];
    $scope.tabListetabSaisieEch = [];
    $scope.tabListeSaisieEch = [];
    $scope.testEnregistremen = [];
    $scope.testEnregistrement = [];
    $scope.recupererinfoSaisie = [];
    $scope.ax = 0; //'0'.replace(/,/g, '');
    $scope.valmont = 0;
    $scope.tst = "";
    $scope.idElement2 = "";
    $scope.idElement3 = "";
    $scope.idElement = "";
    $scope.iddate = "";
    $scope.tstsup = "";
    $scope.index = 0;
    $scope.dte = "";
    $scope.valtb = "";
    $scope.axdate = "";
    $scope.somtotal = 0;
    $scope.valsom = 0;
    $scope.somtotalht = "";
    $scope.montfact = 0;
    $scope.calmontsaisi = 0;
    /*FIN ZONE DE DECLARATION AUTO BOLATY*/

    /*DEBUT FONCTION GENERALE AUTO BOLATY*/

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

    /*FIN FONCTION GENERALE*/
    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#listSaisie_date").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#listSaisie_montant").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ
    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES Bolaty*/
    $scope.initFormAddlisteSaisieEcheancier = function () {
      $scope.$emit("LOAD");
      $scope.afficheListeSaisieEch();
      $scope.afficheMontantfacture();
      $scope.calculsomtotal();

      $scope.$emit("UNLOAD");
      //$scope.contrainteFormListsaisie();
    };

    $scope.initFormAddlistemodiSaisieEcheancier = function () {
      $scope.retourModifMultirisquePro();
      $scope.afficheListeSaisieEch();
      $scope.contrainteFormListsaisie();
    };

    $scope.retourModifMultirisquePro = function () {
      $scope.recupererinfoSaisie[0] = JSON.parse(
        sessionStorage.getItem("modifsaisieEch")
      );
      console.log($scope.recupererinfoSaisie);
    };
    //debut initialisation list

    //fin initialisation list

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV BOLATY AUTO*/
    $scope.contrainteFormListsaisie = function () {
      FormValidation.formValidation(document.getElementById("formListsaisie"), {
        fields: {
          listSaisie_date: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la période.",
              },
              regexp: {
                regexp:
                  /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./]([0]?[1-9]|[1][0-2])[./]([0-9]{4}|[0-9]{2})$/,
                message: "Veuillez saisir une date correcte.",
              },
            },
          },
          listSaisie_montant: {
            validators: {
              notEmpty: {
                message: "Veuillez saisir la période.",
              },
              numeric: {
                message: "Veuillez saisir un montant.",
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

    //debut affichage de liste

    $scope.afficheListeSaisieEch = function () {
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: $rootScope.infocontrat,
          SL_LIBELLEECRAN: "SAISIE ECHEANCIER",
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
        .post("/SaisieEcheancier/ListeSaisieContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabListeSaisieEch = reponse.data;
          if (
            $scope.tabListeSaisieEch[0].clsObjetRetour.SL_RESULTAT == "TRUE"
          ) {
            $scope.valtb = "TRUE";
            $scope.calculsomtotal();
            console.log($scope.tabListeSaisieEch);
          } else {
            $scope.valtb = "FALSE";
            $scope.tabListeSaisieEch.splice(0, 1);
            console.log($scope.tabListeSaisieEch);
          }
          //var numUSD = new Intl.NumberFormat("de-DE", {
          //    style: "currency"

          //})
          //numUSD.format($scope.tabListeSaisieEch[0].EC_MONTANTECHEANCE)
          //console.log($scope.tabListeSaisieEch[0].EC_MONTANTECHEANCE)
        });
    };
    //fin affichage de liste

    //$scope.inserertabecheance = function () {
    //    $scope.a = '1,000,000,000,000,000,000,000,00'.replace(/,/g, ''); // + "$scope.tabListeSaisieEch.length" + "1"
    //    $scope.b = $scope.a + ($scope.tabListeSaisieEch.length + 1);
    //    console.log($scope.a)
    //    console.log($scope.b)
    //    $scope.objettab = {
    //        "AG_CODEAGENCE": "1000",
    //        "EN_CODEENTREPOT": "0001",
    //        "CA_CODECONTRAT": $scope.b,
    //        "EC_DATEECHEANCE": $scope.FormListSaisieEch.dateEcheancier,
    //        "EC_MONTANTECHEANCE": $scope.FormListSaisieEch.montantEcheancier
    //    }
    //    $scope.tabListeSaisieEch.push($scope.objettab);
    //    console.log($scope.tabListeSaisieEch);
    //    $scope.FormListSaisieEch = {
    //        "montantFacture": 100000,
    //        "dateEcheancier": "",
    //        "montantEcheancier": "",
    //    }

    //}
    // test de suppression produit

    // $scope.suppr = function (prod) {
    //     console.log(prod);
    //    const index = $scope.tabListeSaisieEch.indexOf(prod, 0);
    //    console.log(index);
    //    if (index < 1) {
    //       $scope.tabListeSaisieEch.splice(index, 1);
    //  }
    // }
    //

    //la modification

    //$scope.inserertabecheancemodif = function () {
    //    $scope.objettabmodif = {
    //        "AG_CODEAGENCE": "1000",
    //        "EN_CODEENTREPOT": "0001",
    //        "CA_CODECONTRAT": "1000000000000000000000001",
    //        "EC_DATEECHEANCE": $scope.recupererinfoSaisie[0].EC_DATEECHEANCE,
    //        "EC_MONTANTECHEANCE": $scope.recupererinfoSaisie[0].EC_MONTANTECHEANCE
    //    }
    //    $scope.tabListeSaisieEch.push($scope.objettabmodif);
    //    console.log($scope.tabListeSaisieEch);
    //    $scope.FormListSaisieEch = {
    //        "montantFacture": 100000,

    //    }
    //    $scope.recupererinfoSaisie[0].EC_DATEECHEANCE = "";
    //    $scope.recupererinfoSaisie[0].EC_MONTANTECHEANCE = "";
    //}

    //fin
    $scope.listeSaisieEcheanceAnnule = function () {
      $scope.$emit("LOAD");
      $scope.FormListSaisieEch = {
        montantFacture: 100000,
        dateEcheancier: "",
        montantEcheancier: "",
      };
      $scope.tabListeSaisieEch = "";
      $scope.afficheListeSaisieEch();
      $scope.$emit("UNLOAD");
      //$scope.tabListeSaisieEch.pop()
    };

    $scope.listeSaisieEcheancemodifAnnule = function () {
      $scope.$emit("LOAD");
      $scope.FormListSaisieEch = {
        montantFacture: 100000,
      };
      // $scope.recupererinfoSaisie[0].EC_DATEECHEANCE = "";
      //$scope.recupererinfoSaisie[0].EC_MONTANTECHEANCE = "";
      //$scope.tabListeSaisieEch = "";
      $scope.retourModifMultirisquePro();
      $scope.afficheListeSaisieEch();
      $scope.$emit("UNLOAD");
      //$scope.tabListeSaisieEch.pop()
    };

    //new add
    $scope.ajoutFormAddSaisieEcheance2 = function () {
      $scope.$emit("LOAD");
      if ($scope.tabListeSaisieEch.length == 0) {
        $scope.tabListeSaisieEch = [];

        $scope.objetEcheance = {
          AG_CODEAGENCE: "",
          EN_CODEENTREPOT: "",
          CA_CODECONTRAT: "",
          EC_DATEECHEANCE: "",
          EC_MONTANTECHEANCE: "",
          EC_MONTANTECHEANCENF: "",
          SL_LIBELLEECRAN: "SAISIE ECHEANCIER",
          SL_LIBELLEMOUCHARD: "INSERTIONS",
          TYPEOPERATION: "2",
          LG_CODELANGUE: "fr",
          clsObjetEnvoi: {
            OE_A: "",
            OE_Y: "",
            OE_J: "",
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        };

        $scope.objetEcheance.CA_CODECONTRAT = $rootScope.infocontrat;
        $scope.objetEcheance.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
        $scope.objetEcheance.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
        $scope.objetEcheance.EC_DATEECHEANCE = "";
        $scope.objetEcheance.EC_MONTANTECHEANCE = "";
        $scope.objetEcheance.EC_MONTANTECHEANCENF = "";
        $scope.objetEcheance.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
        $scope.objetEcheance.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
        $scope.objetEcheance.clsObjetEnvoi.OE_J =
          $rootScope.DATE_JOURNEE_DE_TRAVAIL;
        $scope.tabListeSaisieEch.push($scope.objetEcheance);

        $scope.objet_envoie = $scope.tabListeSaisieEch;

        $http
          .post("/SaisieEcheancier/AjoutSaisieContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.testEnregistremen = reponse.data;
            if (
              $scope.testEnregistremen[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testEnregistremen[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.ax = 0;
              $scope.FormListSaisieEch = {};
              $scope.initFormAddlisteSaisieEcheancier();
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi(
                $scope.testEnregistremen[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.ax = 0;
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testEnregistremen[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.ax = 0;
          });
      } else {
        $scope.testsom();
        if ($scope.testsesult != "TRUE") {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          });
          $rootScope.messageSomme();
          $scope.ax = 0;
        } else {
          $scope.clsCtcontratEcheance = [];
          for (var i = 0; i < $scope.tabListeSaisieEch.length; i++) {
            $scope.objetEcheance = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              EC_DATEECHEANCE: "",
              EC_MONTANTECHEANCE: "",
              EC_MONTANTECHEANCENF: "",
              SL_LIBELLEECRAN: "SAISIE ECHEANCIER",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "0",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };

            $scope.objetEcheance.CA_CODECONTRAT = $rootScope.infocontrat;
            $scope.objetEcheance.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetEcheance.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetEcheance.EC_DATEECHEANCE =
              $scope.tabListeSaisieEch[i].EC_DATEECHEANCE;
            $scope.objetEcheance.EC_MONTANTECHEANCE =
              $scope.tabListeSaisieEch[i].EC_MONTANTECHEANCENF;
            $scope.objetEcheance.EC_MONTANTECHEANCENF =
              $scope.tabListeSaisieEch[i].EC_MONTANTECHEANCENF;
            $scope.objetEcheance.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetEcheance.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetEcheance.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratEcheance.push($scope.objetEcheance);
          }

          $scope.objet_envoie = $scope.clsCtcontratEcheance;

          $http
            .post(
              "/SaisieEcheancier/AjoutSaisieContrat/",
              $scope.objet_envoie,
              {
                //headers: $scope.headers
              }
            )
            .then(function (reponse) {
              $scope.testEnregistremen = reponse.data;
              if (
                $scope.testEnregistremen[0].clsObjetRetour.SL_RESULTAT == "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistremen[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.ax = 0;
                $scope.FormListSaisieEch = {};
                $scope.initFormAddlisteSaisieEcheancier();
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistremen[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.ax = 0;
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistremen[0].clsObjetRetour.SL_MESSAGE
              );
              $scope.ax = 0;
            });
        }
      }
    };
    //fi  add

    $scope.testsom = function () {
      $scope.testsesult = "TRUE";
      //for (i = 0; i < $scope.tabListeSaisieEch.length; i++) {
      //    $scope.ax = $scope.ax + parseInt($scope.tabListeSaisieEch[i].EC_MONTANTECHEANCE);
      //    console.log($scope.ax);
      //    $scope.valmont = parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF);
      if ($scope.montfact != 0) {
        $scope.testsesult = "FALSE";
      } else {
        $scope.testsesult = "TRUE";
      }
      // }
    };

    //$scope.ajoutFormAddSaisieEcheance = function () {
    //    for (i = 0; i < $scope.tabListeSaisieEch.length; i++) {
    //        $scope.ax = $scope.ax + parseInt($scope.tabListeSaisieEch[i].EC_MONTANTECHEANCE);
    //        console.log($scope.ax);
    //        if ($scope.ax != $scope.FormListSaisieEch.montantFacture) {

    //           // alert('error');

    //        } else {
    //            $scope.objet_envoie = [
    //          {
    //              "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //              "EN_CODEENTREPOT": "0001",
    //              "CA_CODECONTRAT": "1000000000000000000000001",
    //              "EC_DATEECHEANCE": $scope.tabListeSaisieEch[i].EC_DATEECHEANCE,
    //              "EC_MONTANTECHEANCE": $scope.tabListeSaisieEch[i].EC_MONTANTECHEANCE,
    //              "SL_LIBELLEECRAN": "SAISIE ECHEANCIER",
    //              "SL_LIBELLEMOUCHARD": "INSERTIONS",
    //              "TYPEOPERATION": "",
    //              "LG_CODELANGUE": "fr",
    //              "clsObjetEnvoi": {
    //                  "OE_A": $rootScope.CODE_AGENCE,
    //                  "OE_Y": $rootScope.CODE_OPERATEUR,
    //                  "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //              }
    //          }
    //            ];

    //            $http.post("/SaisieEcheancier/AjoutSaisieContrat/", $scope.objet_envoie, {
    //                //headers: $scope.headers
    //            }).then(function (reponse) {
    //                $scope.testEnregistremen = reponse.data
    //                if ($scope.testEnregistremen[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
    //                    $rootScope.EnregistrementReussi($scope.testEnregistremen[0].clsObjetRetour.SL_MESSAGE);
    //                } else {
    //                    $rootScope.EnregistrementNonReussi();
    //                }
    //            }).catch(function () {
    //                $rootScope.ProblemeServeur();
    //            });
    //        }

    //    }

    //};

    //debut acceder a la page de modification
    $scope.voirPageModification = function (info) {
      sessionStorage.setItem("modifsaisieEch", JSON.stringify(info));
      window.location.href = "ModifiactionSaisieEcheancier";
    };
    //debut recuperer id pour la suppression

    $scope.supprRecupererIdElement = function (t, recupId, recdate) {
      $scope.tstsup = 1;
      $scope.tb = t;
      $scope.idElement = recupId;
      $scope.iddate = recdate;
    };

    $scope.supprimeContrat = function () {
      $scope.$emit("LOAD");
      if ($scope.tstsup == 1) {
        for (i = 0; i < $scope.tabListeSaisieEch.length; i++) {
          $scope.vartest = $scope.tabListeSaisieEch[i].EC_DATEECHEANCE;
          if ($scope.vartest == $scope.iddate) {
            $scope.index = $scope.tabListeSaisieEch.indexOf(
              $scope.tabListeSaisieEch[i].EC_DATEECHEANCE
            );
            console.log($scope.index);
            if ($scope.index < 1) {
              // $scope.index = $scope.index * (-1);
              $scope.tabListeSaisieEch.splice(i, 1);
              // delete  $scope.tabListeSaisieEch[i];
              console.log($scope.tabListeSaisieEch);
              $scope.tstsup == "";
              break;
            }
          }
        }
        $scope.calculsomtotal();
      }
      $scope.$emit("UNLOAD");
    };
    //debut recuperer id pour la suppression

    //nouvelle fonction du bouton modifier

    $scope.voirPageModification2 = function (da, mont, idc) {
      $scope.tst = 1;
      console.log($scope.tst);
      $scope.FormListSaisieEch.dateEcheancier = da;
      $scope.FormListSaisieEch.montantEcheancier = mont;
      $scope.idElement2 = da;
      $scope.idElement3 = idc;
    };

    $scope.inserertabecheance2 = function (dateechancier, mtechancier) {
      $scope.$emit("LOAD");
      $scope.desactiverChampRequisListe();
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typemontant = /^[0-9]+$/;
      if (dateechancier !== undefined) {
        $scope.lAnneeEffet = dateechancier.substr(6, 4);
        $scope.leMoisEffet = dateechancier.substr(3, 2);
        $scope.leJourEffet = dateechancier.substr(0, 2);
      }
      if (mtechancier !== undefined) {
        $scope.calmontsaisi =
          parseInt($scope.montfactnf) +
          parseInt($scope.FormListSaisieEch.montantEcheancier);
        console.log($scope.calmontsaisi);
      }

      console.log($scope.tst);
      if (
        $scope.FormListSaisieEch.dateEcheancier === "" ||
        $scope.FormListSaisieEch.dateEcheancier === undefined ||
        $scope.FormListSaisieEch.montantEcheancier === "" ||
        $scope.FormListSaisieEch.montantEcheancier === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (dateechancier === "" || dateechancier === undefined) {
            $("#listSaisie_date").css("background-color", "#FFE9E0");
          }
          if (mtechancier === "" || mtechancier === undefined) {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if (
        typemontant.test($scope.FormListSaisieEch.montantEcheancier) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisie_montant").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un montant echeancier correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormListSaisieEch.dateEcheancier) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisie_date").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une dates echeancier correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisie_date").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'echeancier n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEffet == "04" ||
          $scope.leMoisEffet == "06" ||
          $scope.leMoisEffet == "09" ||
          $scope.leMoisEffet == "11") &&
        $scope.leJourEffet > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisie_date").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF) <
        parseInt($scope.FormListSaisieEch.montantEcheancier)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisie_montant").css("background-color", "#FFE9E0");
        });
        $rootScope.saisiemontantinvalide();
      } else if (
        $scope.dateSuperioriteDebut($scope.FormListSaisieEch.dateEcheancier) <
        $scope.dateSuperioriteFin($rootScope.collectionContartOp.CA_DATEEFFET)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisie_date").css("background-color", "#FFE9E0");
        });
        $rootScope.dateEcheancierincorecteffet();
      } else if (
        $scope.dateSuperioriteDebut($scope.FormListSaisieEch.dateEcheancier) >
        $scope.dateSuperioriteFin(
          $rootScope.collectionContartOp.CA_DATEECHEANCE
        )
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#listSaisie_date").css("background-color", "#FFE9E0");
        });
        $rootScope.dateEcheancierincorectecheance();
      }
      //else if ($scope.dateSuperioriteFin($scope.FormListSaisieEch.dateEcheancier) < $rootScope.calculDateJourneeDeTravail($rootScope.DATE_JOURNEE_DE_TRAVAIL)) {
      //    $rootScope.dateEcheancierincorect();

      //}
      //else if ($scope.montfact == 0) {
      //    $rootScope.soldeatteint();
      //}
      else if ($scope.tst == 1) {
        for (i = 0; i < $scope.tabListeSaisieEch.length; i++) {
          if (
            $scope.tabListeSaisieEch[i].EC_DATEECHEANCE == $scope.idElement2
          ) {
            const index = $scope.tabListeSaisieEch.indexOf(
              $scope.idElement2,
              0
            );
            if (index < 1) {
              $scope.tabListeSaisieEch.splice(i, 1);
              // console.log($scope.tabListeSaisieEch)
              numbr = $scope.FormListSaisieEch.montantEcheancier;
              resulta = parseInt(numbr).toLocaleString();
              $scope.objettab2 = {
                AG_CODEAGENCE: $rootScope.CODE_AGENCE,
                EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
                CA_CODECONTRAT: $rootScope.infocontrat,
                EC_DATEECHEANCE: $scope.FormListSaisieEch.dateEcheancier,
                EC_MONTANTECHEANCE: resulta,
                EC_MONTANTECHEANCENF:
                  $scope.FormListSaisieEch.montantEcheancier,
              };
              $scope.tabListeSaisieEch.push($scope.objettab2);
              $scope.calculsomtotal();
              console.log($scope.tabListeSaisieEch);
            }
          }
        }
        $scope.FormListSaisieEch.dateEcheancier = "";
        $scope.FormListSaisieEch.montantEcheancier = "";
        $scope.tst = 2;
      } else {
        // $scope.tabListeSaisieEch[0].clsObjetRetour.SL_RESULTAT = "TRUE";

        $scope.testsurdate();
        if (
          $scope.FormListSaisieEch.dateEcheancier === "" ||
          $scope.FormListSaisieEch.dateEcheancier === undefined ||
          $scope.FormListSaisieEch.montantEcheancier === "" ||
          $scope.FormListSaisieEch.montantEcheancier === undefined
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            if (dateechancier === "" || dateechancier === undefined) {
              $("#listSaisie_date").css("background-color", "#FFE9E0");
            }
            if (mtechancier === "" || mtechancier === undefined) {
              $("#listSaisie_montant").css("background-color", "#FFE9E0");
            }
          });
          $rootScope.ChampsNonRenseignes();
        } else if (
          typemontant.test($scope.FormListSaisieEch.montantEcheancier) == false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "Veuillez renseigner un montant echeancier correct";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          typeDate.test($scope.FormListSaisieEch.dateEcheancier) == false
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_date").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur =
            "Veuillez renseigner une dates echeancier correcte";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if ($scope.leMoisEffet == "02" && $scope.leJourEffet > "29") {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_date").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur = "La date echeancier n'est pas valide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          ($scope.leMoisEffet == "04" ||
            $scope.leMoisEffet == "06" ||
            $scope.leMoisEffet == "09" ||
            $scope.leMoisEffet == "11") &&
          $scope.leJourEffet > "30"
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_date").css("background-color", "#FFE9E0");
          });
          $scope.messageErreur = "La date echeancier n'est pas valide";
          $rootScope.MessageDerreurDesTypes($scope.messageErreur);
        } else if (
          parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF) <
          parseInt($scope.FormListSaisieEch.montantEcheancier)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          });
          $rootScope.saisiemontantinvalide();
        } else if (
          parseInt($scope.calmontsaisi) >
          parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF)
        ) {
          $scope.calmontsaisi = 0;
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          });
          $rootScope.saisiemontanttotalinvalide();
        } else if (
          $scope.dateSuperioriteDebut($scope.FormListSaisieEch.dateEcheancier) <
          $scope.dateSuperioriteFin($rootScope.collectionContartOp.CA_DATEEFFET)
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          });
          $rootScope.dateEcheancierincorect();
        } else if (
          $scope.dateSuperioriteDebut($scope.FormListSaisieEch.dateEcheancier) >
          $scope.dateSuperioriteFin(
            $rootScope.collectionContartOp.CA_DATEECHEANCE
          )
        ) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          });
          $rootScope.dateEcheancierincorect();
        } else if ($scope.montfact <= 0) {
          $scope.$emit("UNLOAD");
          $(document).ready(function () {
            $("#listSaisie_montant").css("background-color", "#FFE9E0");
          });
          $rootScope.soldeatteint();
        } else if ($scope.dte == "TRUE") {
          //$scope.calculsomtotal();
          number = $scope.FormListSaisieEch.montantEcheancier;
          result = parseInt(number).toLocaleString();
          console.log(result);
          $scope.objettab = {
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_CODECONTRAT: $rootScope.infocontrat,
            EC_DATEECHEANCE: $scope.FormListSaisieEch.dateEcheancier,
            EC_MONTANTECHEANCE: result,
            EC_MONTANTECHEANCENF: $scope.FormListSaisieEch.montantEcheancier,
            EC_MONTANTSOLDE: $scope.montfact,
            EC_MONTANTTOTAL: $scope.somtotal,
          };

          $scope.tabListeSaisieEch.push($scope.objettab);
          $scope.calculsomtotal();
          //  $scope.tabListeSaisieEch.EC_MONTANTTOTAL = $scope.somtotal;
          console.log($scope.tabListeSaisieEch);
          $scope.FormListSaisieEch = {
            montantFacture: 100000,
            dateEcheancier: "",
            montantEcheancier: "",
          };
          $scope.dte = "FALSE";
        } else {
          $scope.$emit("UNLOAD");
          $rootScope.messagedateEcheance();
        }
      }

      $scope.$emit("UNLOAD");
    };

    $scope.testsurdate = function () {
      $scope.dte = "FALSE";
      if ($scope.tabListeSaisieEch.length == 0) {
        $scope.dte = "TRUE";
      }
      for (i = 0; i < $scope.tabListeSaisieEch.length; i++) {
        $scope.axdate = $scope.tabListeSaisieEch[i].EC_DATEECHEANCE;
        console.log($scope.axdate);
        if ($scope.axdate != $scope.FormListSaisieEch.dateEcheancier) {
          $scope.dte = "TRUE";
        } else {
          $scope.dte = "FALSE";
          break;
        }
      }
    };
    $scope.calculsomtotal = function () {
      $scope.montfact = 0;
      $scope.somtotal = 0;
      $scope.montfactnf = 0;
      if ($scope.tabListeSaisieEch.length == 0) {
        $scope.somtotal = 0;
        $scope.montfact =
          parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF) -
          parseInt($scope.somtotal);
        $scope.montfact = $rootScope.formateur.format($scope.montfact);
      } else {
        for (i = 0; i < $scope.tabListeSaisieEch.length; i++) {
          $scope.somtotal =
            parseInt($scope.somtotal) +
            parseInt($scope.tabListeSaisieEch[i].EC_MONTANTECHEANCENF);
          //$scope.somtotal = $scope.somtotal;
          $scope.montfact = $rootScope.formateur.format($scope.montfact);
        }
        console.log($scope.somtotal);
        $scope.montfact = parseInt(
          $scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF
        );
        $scope.montfact = $rootScope.formateur.format($scope.montfact);
        $scope.montfact =
          parseInt($scope.listemontantfacture[0].MONTANTTTCPLUSAIRSINF) -
          parseInt($scope.somtotal);
        $scope.montfactnf = $scope.somtotal;
        $scope.montfact = $rootScope.formateur.format($scope.montfact);
        $scope.somtotal = parseInt($scope.somtotal).toLocaleString();
        $scope.montfact = parseInt($scope.montfact).toLocaleString();
      }
    };

    //nouvelle fonction du bouton modifier
    console.log($rootScope.infocontrat);

    $scope.afficheMontantfacture = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          CA_CODECONTRAT: $rootScope.infocontrat,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "SAISIE ECHEANCIER",
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
        .post("/Montantfacture/ListeMontanfacture/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listemontantfacture = reponse.data;
          $scope.calculsomtotal();
          // $scope.somtotal = parseInt($scope.somtotal).toLocaleString();
          //$scope.montfact = parseInt($scope.montfact).toLocaleString();
          console.log($scope.listemontantfacture);
          $scope.$emit("UNLOAD");
        });
    };

    // bouton de retour
    $scope.retour = function () {
      if ($rootScope.libelleMenu == "assurance") {
        if ($rootScope.ecranCible == "operationOn") {
          switch ($rootScope.maPosition) {
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
          }
        } else {
          switch ($rootScope.maPosition) {
            case "01":
              window.location.href =
                "#/assurances/relance/liste/multirisque_professionnel";
              break;
            case "02":
              window.location.href =
                "#/assurances/relance/liste/sante_pharmacien";
              break;
            case "03":
              window.location.href =
                "#/assurances/relance/liste/individuel_accident";
              break;
            case "04":
              window.location.href = "#/assurances/relance/liste/voyage";
              break;
            case "05":
              window.location.href = "#/assurances/relance/liste/habitat";
              break;
            case "06":
              window.location.href = "#/assurances/relance/liste/auto";
              break;
            case "07":
              window.location.href =
                "#/assurances/relance/liste/sante_auxiliaire";
              break;
            case "08":
              window.location.href = "#/assurances/relance/liste/sante_gesa";
              break;
            case "09":
              window.location.href =
                "#/assurances/relance/liste/responsabilite_civile";
              break;
            case "10":
              window.location.href =
                "#/assurances/relance/liste/transport_marchandise";
              break;
          }
        }
      } else {
        if ($rootScope.retourSitTiersAssureur == "2") {
          window.location.href = "#/Tiers/SituationDesAssureurs";
        } else if ($rootScope.retourSitTiersAssureur == "1") {
          window.location.href = "#/assurances-gestion/Tiers/SituationTiers";
        } else if ($rootScope.retourSitTiersAssureur == "4") {
          window.location.href = "#/Tiers/SituationDesCommerciaux";
        } /* else {
          window.location.href =
            "#/assurances/operation/liste/multirisque-professionnel";
        } */
      }
    };
    /* FIN DEV BOLATY AUTO*/
  },
]);
