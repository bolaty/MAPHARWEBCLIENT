MapharApp.controller("SanteAuxiliaireController", [
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
    $rootScope.DATE_PREMIER_EXERCICE =
      $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;

    /*DEBUT ZONE DE DECLARATION Sante Auxiliaire OVER*/
    $scope.FormAddSanteAuxiliaire = {
      id1: "",
      idModif1: "",
      id2: "",
      idModif2: "",
      pays: "",
      ville: "",
      commune: "",
      assureur: "",
      typeAffaire: "",
      typeContrat: "",
      Code01: "",
      Denomination01: "",
      Code02: "",
      Denomination02: "",
      Commission: "",
      Avenant: 0,
      CodeBranche: "",
      Adresse: "",
      PoliceN: "",
      Effet: "",
      Echeance: "",
      Duree: "",
      SituationGeo: "",
      Intermediaire: "",
      Interlocuteur: "",
      TelInterlocuteur: "",
      garanties: [],
      primes: [],
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

    $scope.listeDesPaysSanteAuxiliaire = [];
    $scope.listeDesVillesSanteAuxiliaire = [];
    $scope.listeDesCommunesSanteAuxiliaire = [];
    $scope.listeDesAssureursSanteAuxiliaire = [];
    $scope.listeTypeAffaireSanteAuxiliaire = [];
    $scope.listeContrat = [];
    $scope.listeTypeContratSanteAuxiliaire = [];
    $scope.listeIntermediaire = [];
    $scope.tabGarenties = [];
    $scope.tabPrimes = [];
    $scope.listeContrat1 = [];
    $scope.modiftestEnregistrement = [];
    $scope.testEnregistrement = [];
    $scope.listeDesBranche = [];
    $scope.valprimettc = 0;
    $scope.valprimenette = 0;
    $scope.valprimettcenregistrement = 0;
    $scope.valprimenettenregistrement = 0;
    $scope.listeDesGarantie = [];
    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken
    $scope.leChargement = true;
    $scope.nombreInfoBulle = "";
    $scope.tableauInfoBulle = "";

    $scope.listeContratAvecAccessoir = []
$scope.recupererInfoAvecAccessoir = {};

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/
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

    /*FIN FONCTION GENERALE*/
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

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
    //debut initialisation add Sante Auxiliaire auxiliaire
    $scope.initFormAddSanteAuxiliaire = function () {
      $scope.afficheListeVilleSanteAuxiliaire($rootScope.PAYSPARDEFAUT)
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
      $scope.FormAddSanteAuxiliaire.pays = $rootScope.PAYSPARDEFAUT
      $scope.FormAddSanteAuxiliaire.ville = $rootScope.VILLEPARDEFAUT
      $scope.afficheListeCommuneSanteAuxiliaire($rootScope.VILLEPARDEFAUT)
    };
    //fin initialisation add Sante Auxiliaire
    //debut initialisation add modif Sante Auxiliaire auxiliaire
    $scope.initFormAddModifSanteAuxiliaire = function () {
      $scope.etatForm = "2";
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.afficheListegarantie();
    };
    //fin initialisation add Sante Auxiliaire

    //debut initialisation list Sante Auxiliaire auxiliaire
    $scope.initFormListSanteAuxiliaire = function () {
      $scope.contrainteFormListSanteAuxiliaire();
    };
    //fin initialisation list Sante Auxiliaire auxiliaire
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
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/
    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#idgarantie").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });

        $("#addSanteAuxiliaire_Code1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Denomination1").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Code2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Denomination2").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Intermediaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_CodeBranche").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_NumPolice").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Effet").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Echeance").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Pays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Ville").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Commune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_SituationGeo").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Assureur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_Interlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_TelInterlocuteur").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSanteAuxiliaire_TypeAffaire").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    /*DEBUT DEV OVER*/

    //debut contrainte sur les champs add Sante Auxiliaire
    //$scope.contrainteFormAddSanteAuxiliaire = function () {
    //    FormValidation.formValidation(
    //        document.getElementById('formAddSanteAuxiliairef'), {
    //            fields: {
    //                addSanteAuxiliaire_Code1: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le code.'
    //                        },
    //                        regexp: {
    //                            regexp: /^(0|[0-9]\d*)$/,
    //                            message: 'Veuillez saisir un code correct.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_Denomination1: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la dénomination.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_Code2: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le code.'
    //                        },
    //                        regexp: {
    //                            regexp: /^(0|[0-9]\d*)$/,
    //                            message: 'Veuillez saisir un code correct.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_Denomination2: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la dénomination.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_Commission: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la commission.'
    //                        },
    //                        numeric: {
    //                            message: 'Veuillez saisir  la commission.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_Avenant: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir l\'avenant.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_CodeBranche: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le code branche.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_NumPolice: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le n° de la police.'
    //                        },

    //                    }
    //                },
    //                addSanteAuxiliaire_Adresse: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir l\'adresse.'
    //                        },
    //                        regexp: {
    //                            regexp: /^[a-z-A-Z]/,
    //                            message: 'Veuillez saisir l\'adresse.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_Duree: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la durée.'
    //                        },
    //                        regexp: {
    //                            regexp: /^(0|[0-9]\d*)$/,
    //                            message: 'Veuillez saisir un code correct.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_TypeContrat: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le type de contrat.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_Intermediaire: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le nom de l\'intermédiaire.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_Pays: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez sélectionner le pays.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_Ville: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez sélectionner la ville.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_Commune: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez sélectionner la commune.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_SituationGeo: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la situation géograpgique.'
    //                        },
    //                        regexp: {
    //                            regexp: /^[a-z-A-Z]/,
    //                            message: 'Veuillez saisir la situation géograpgique.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_Effet: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la date d\'effet.'
    //                        },
    //                        regexp: {
    //                            regexp: /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
    //                            message: 'Veuillez saisir une date correcte.'
    //                        }

    //                    }
    //                },
    //                addSanteAuxiliaire_Echeance: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la date d\'écheance.'
    //                        },
    //                        regexp: {
    //                            regexp: /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/,
    //                            message: 'Veuillez saisir une date correcte.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_Assureur: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez sélectionner l\'assureur.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_Interlocuteur: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir l\'interlocuteur.'
    //                        },
    //                        regexp: {
    //                            regexp: /^[a-z-A-Z]/,
    //                            message: 'Veuillez saisir l\'interlocuteur.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_TelInterlocuteur: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir le téléphone interlocuteur.'
    //                        },
    //                        regexp: {
    //                            regexp: /^(0|[0-9]\d*)$/,
    //                            message: 'Veuillez saisir le numero de telephone interlocuteur correct.'
    //                        }
    //                    }
    //                },
    //                addSanteAuxiliaire_Designation: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez saisir la désignation.'
    //                        },
    //                    }
    //                },
    //                addSanteAuxiliaire_TypeAffaire: {
    //                    validators: {
    //                        notEmpty: {
    //                            message: 'Veuillez sélectionner le type d\'affaire.'
    //                        },
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
    //fin contrainte sur les champs add Sante Auxiliaire

    //debut contrainte sur les champs list Sante Auxiliaire
    $scope.contrainteFormListSanteAuxiliaire = function () {
      FormValidation.formValidation(
        document.getElementById("formAddSanteAuxiliaire"),
        {
          fields: {
            listSanteAuxiliaire_PeriodeDu: {
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
            listSanteAuxiliaire_PeriodeAu: {
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
            listSanteAuxiliaire_NumPolice: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° de la police",
                },
              },
            },
            listSanteAuxiliaire_NumSouscripteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° du souscripteur.",
                },
              },
            },
            listSanteAuxiliaire_NomSouscripteur: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom du souscripteur.",
                },
              },
            },
            listSanteAuxiliaire_NumCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le n° du commercial.",
                },
              },
            },
            listSanteAuxiliaire_NomCommercial: {
              validators: {
                notEmpty: {
                  message: "Veuillez saisir le nom du commercial.",
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
            // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          },
        }
      );
    };

    //fin contrainte sur les champs list Sante Auxiliaire
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddSante = function () {
      $scope.$emit("LOAD");
      $scope.isDisabled = false;
      $scope.isDisabled1 = false;

      $scope.FormAddSanteAuxiliaire = {};
      $(document).ready(function () {
        $("#addSanteAuxiliaire_Code1").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Denomination1").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addSanteAuxiliaire_Code2").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Denomination2").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addSanteAuxiliaire_Intermediaire").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addSanteAuxiliaire_CodeBranche").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_NumPolice").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Effet").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Echeance").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Pays").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Ville").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Commune").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_SituationGeo").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addSanteAuxiliaire_Assureur").css("background-color", "#FFFFFF");
        $("#addSanteAuxiliaire_Interlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addSanteAuxiliaire_TelInterlocuteur").css(
          "background-color",
          "#FFFFFF"
        );
        $("#addSanteAuxiliaire_typeAffaire").css("background-color", "#FFFFFF");
      });
      $scope.$emit("UNLOAD");
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

    //debut liste des villes
    $scope.afficheListeVilleSanteAuxiliaire = function (idpays) {
      $scope.listeDesCommunesSanteAuxiliaire = [];
      $scope.FormAddSanteAuxiliaire.commune = "";
      //$scope.FormAddSanteAuxiliaire.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeDesVillesSanteAuxiliaire = reponse.data;
          if (
            $scope.listeDesVillesSanteAuxiliaire[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    $scope.afficheListeVilleSanteAuxiliaireModif = function (idpays) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeDesVillesSanteAuxiliaire = reponse.data;
          if (
            $scope.listeDesVillesSanteAuxiliaire[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.verouVille = false;
            $scope.afficheListeCommuneSanteAuxiliaireModif(
              $scope.recuperer.VL_CODEVILLE
            );
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVillesSanteAuxiliaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesVillesSanteAuxiliaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVillesSanteAuxiliaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes

    //debut liste des communes
    $scope.afficheListeCommuneSanteAuxiliaire = function (idville) {
      $scope.FormAddSanteAuxiliaire.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeDesCommunesSanteAuxiliaire = reponse.data;
          if (
            $scope.listeDesCommunesSanteAuxiliaire[0].clsObjetRetour
              .SL_RESULTAT === "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };

    $scope.afficheListeCommuneSanteAuxiliaireModif = function (idville) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeDesCommunesSanteAuxiliaire = reponse.data;
          if (
            $scope.listeDesCommunesSanteAuxiliaire[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunesSanteAuxiliaire[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunesSanteAuxiliaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunesSanteAuxiliaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des communes

    //debut liste des souscripteur
    $scope.afficheListeTiersSouscripteur = function (num, denom) {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          TI_NUMTIERS: num,
          TI_DENOMINATION: denom,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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

    //debut liste des comerciaux
    $scope.afficheListeTiersCommercial = function (numcom, denomcom) {
      $scope.leChargement = true;
      $scope.objet_envoie = [
        {
          TI_IDTIERS: "",
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          TI_STATUT: "N",
          TI_NUMTIERS: numcom,
          TI_DENOMINATION: denomcom,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          TI_DATESAISIE1: $rootScope.DATE_PREMIER_EXERCICE,
          TI_DATESAISIE2: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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

    //debut liste contrat
    $scope.afficheListeContrat = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
          CA_NUMPOLICE: "",
          TI_NUMTIERS: "",
          TI_DENOMINATION: "",
          TI_NUMTIERSCOMMERCIAL: "",
          TI_DENOMINATIONCOMMERCIAL: "",
          DATEDEBUT: "25-09-2020",
          DATEFIN: "25-09-2020",
          OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
        .post("/Contrat/ListeContrat/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeContrat1 = reponse.data;
        });
    };

    //fin liste contrat

    //Debut choix d'un souscripteur
    $scope.choixSouscripteur = function (code, denomination, id, ad) {
      $scope.FormAddSanteAuxiliaire.Code01 = code;
      $scope.FormAddSanteAuxiliaire.Denomination01 = denomination;
      $scope.FormAddSanteAuxiliaire.id1 = id;
      $scope.FormAddSanteAuxiliaire.Adresse = ad;
      $scope.isDisabled = true;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercial = function (code, denomination, id) {
      $scope.FormAddSanteAuxiliaire.Code02 = code;
      $scope.FormAddSanteAuxiliaire.Denomination02 = denomination;
      if ($scope.etatForm == "2") {
        $scope.FormAddSanteAuxiliaire.id2 = id;
      } else {
        $scope.FormAddSanteAuxiliaire.id2 = id;
      }
      $scope.isDisabled1 = true;
    };
    //Fin choix d'un commercial
    $scope.choixSouscripteurmodif = function (code, denomination, id, ad) {
      $scope.recuperer.TI_NUMTIERS = code;
      $scope.recuperer.TI_DENOMINATION = denomination;
      $scope.recuperer.TI_IDTIERS = id;
      $scope.recuperer.CO_LIBELLE = ad;
    };
    //Fin choix d'un souscripteur

    //Debut choix d'un commercial
    $scope.choixCommercialmodif = function (code, denomination, id) {
      $scope.recuperer.TI_NUMTIERSCOMMERCIAL = code;
      $scope.recuperer.TI_DENOMINATIONCOMMERCIAL = denomination;
      $scope.recuperer.TI_IDTIERSCOMMERCIAL = id;
    };

    //Debut ajout Sante Auxiliaire (contrat) /a terminer
    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddSanteAuxiliaire = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
      // $scope.testgrilleenregistrement();
      // $scope.testgrille();
      $scope.testprime();
      $scope.calculprimettc();
      let typeNumerique = /^[0-9]/;
      let typeAlphabetique = /^[a-z-A-Z]/;
      let typeDate =
        /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
      let typenumerotelephone = /^(0|[0-9]\d*)$/;
      let typenumerosouscripteur = /^(0|[0-9]\d*)$/;
      let typeDuree = /^(0|[0-9]\d*)$/;
      $scope.lAnneeEffet = $scope.FormAddSanteAuxiliaire.Effet.substr(6, 4);
      $scope.leMoisEffet = $scope.FormAddSanteAuxiliaire.Effet.substr(3, 2);
      $scope.leJourEffet = $scope.FormAddSanteAuxiliaire.Effet.substr(0, 2);
      $scope.lAnneeEcheance = $scope.FormAddSanteAuxiliaire.Echeance.substr(
        6,
        4
      );
      $scope.leMoisEcheance = $scope.FormAddSanteAuxiliaire.Echeance.substr(
        3,
        2
      );
      $scope.leJourEcheance = $scope.FormAddSanteAuxiliaire.Echeance.substr(
        0,
        2
      );

      // mettre 0 dans les champs de prime si le champ est vide
      if ($scope.etatForm == "2") {
        for (var i = 0; i < $scope.recuperer.clsCtcontratprimes.length; i++) {
          if ($scope.recuperer.clsCtcontratprimes[i].CG_PRIMES == "") {
            $scope.recuperer.clsCtcontratprimes[i].CG_PRIMES = 0;
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
        $scope.FormAddSanteAuxiliaire.PoliceN === "" ||
        $scope.FormAddSanteAuxiliaire.PoliceN === undefined ||
        $scope.FormAddSanteAuxiliaire.Effet === "" ||
        $scope.FormAddSanteAuxiliaire.Effet === undefined ||
        $scope.FormAddSanteAuxiliaire.Echeance === "" ||
        $scope.FormAddSanteAuxiliaire.Echeance === undefined ||
        $scope.FormAddSanteAuxiliaire.typeAffaire === "" ||
        $scope.FormAddSanteAuxiliaire.typeAffaire === undefined ||
        $scope.FormAddSanteAuxiliaire.Intermediaire === "" ||
        $scope.FormAddSanteAuxiliaire.Intermediaire === undefined ||
        $scope.FormAddSanteAuxiliaire.commune === "" ||
        $scope.FormAddSanteAuxiliaire.commune === undefined ||
        $scope.FormAddSanteAuxiliaire.SituationGeo === "" ||
        $scope.FormAddSanteAuxiliaire.SituationGeo === undefined ||
        $scope.FormAddSanteAuxiliaire.assureur === "" ||
        $scope.FormAddSanteAuxiliaire.assureur === undefined ||
        $scope.FormAddSanteAuxiliaire.Interlocuteur === "" ||
        $scope.FormAddSanteAuxiliaire.Interlocuteur === undefined ||
        $scope.FormAddSanteAuxiliaire.id2 === "" ||
        $scope.FormAddSanteAuxiliaire.id2 === undefined ||
        $scope.FormAddSanteAuxiliaire.id1 === "" ||
        $scope.FormAddSanteAuxiliaire.id1 === undefined ||
        $scope.FormAddSanteAuxiliaire.CodeBranche === "" ||
        $scope.FormAddSanteAuxiliaire.CodeBranche === undefined ||
        $scope.FormAddSanteAuxiliaire.valgarantie === "" ||
        $scope.FormAddSanteAuxiliaire.valgarantie === undefined ||
        $scope.FormAddSanteAuxiliaire.TelInterlocuteur === "" ||
        $scope.FormAddSanteAuxiliaire.TelInterlocuteur === undefined
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddSanteAuxiliaire.valgarantie === "" ||
            $scope.FormAddSanteAuxiliaire.valgarantie === undefined
          ) {
            $("#idgarantie").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSanteAuxiliaire.Code01 === "" ||
            $scope.FormAddSanteAuxiliaire.Code01 === undefined
          ) {
            $("#addSanteAuxiliaire_Code1").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSanteAuxiliaire.Denomination01 === "" ||
            $scope.FormAddSanteAuxiliaire.Denomination01 === undefined
          ) {
            $("#addSanteAuxiliaire_Denomination1").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.Code02 === "" ||
            $scope.FormAddSanteAuxiliaire.Code02 === undefined
          ) {
            $("#addSanteAuxiliaire_Code2").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSanteAuxiliaire.Denomination02 === "" ||
            $scope.FormAddSanteAuxiliaire.Denomination02 === undefined
          ) {
            $("#addSanteAuxiliaire_Denomination2").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.Intermediaire === "" ||
            $scope.FormAddSanteAuxiliaire.Intermediaire === undefined
          ) {
            $("#addSanteAuxiliaire_Intermediaire").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.CodeBranche === "" ||
            $scope.FormAddSanteAuxiliaire.CodeBranche === undefined
          ) {
            $("#addSanteAuxiliaire_CodeBranche").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.PoliceN === "" ||
            $scope.FormAddSanteAuxiliaire.PoliceN === undefined
          ) {
            $("#addSanteAuxiliaire_NumPolice").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.Effet === "" ||
            $scope.FormAddSanteAuxiliaire.Effet === undefined
          ) {
            $("#addSanteAuxiliaire_Effet").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSanteAuxiliaire.Echeance === "" ||
            $scope.FormAddSanteAuxiliaire.Echeance === undefined
          ) {
            $("#addSanteAuxiliaire_Echeance").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.pays === "" ||
            $scope.FormAddSanteAuxiliaire.pays === undefined
          ) {
            $("#addSanteAuxiliaire_Pays").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSanteAuxiliaire.ville === "" ||
            $scope.FormAddSanteAuxiliaire.ville === undefined
          ) {
            $("#addSanteAuxiliaire_Ville").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSanteAuxiliaire.commune === "" ||
            $scope.FormAddSanteAuxiliaire.commune === undefined
          ) {
            $("#addSanteAuxiliaire_Commune").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddSanteAuxiliaire.SituationGeo === "" ||
            $scope.FormAddSanteAuxiliaire.SituationGeo === undefined
          ) {
            $("#addSanteAuxiliaire_SituationGeo").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.assureur === "" ||
            $scope.FormAddSanteAuxiliaire.assureur === undefined
          ) {
            $("#addSanteAuxiliaire_Assureur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.Interlocuteur === "" ||
            $scope.FormAddSanteAuxiliaire.Interlocuteur === undefined
          ) {
            $("#addSanteAuxiliaire_Interlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.TelInterlocuteur === "" ||
            $scope.FormAddSanteAuxiliaire.TelInterlocuteur === undefined
          ) {
            $("#addSanteAuxiliaire_TelInterlocuteur").css(
              "background-color",
              "#FFE9E0"
            );
          }
          if (
            $scope.FormAddSanteAuxiliaire.typeAffaire === "" ||
            $scope.FormAddAuto.typeAffaire === undefined
          ) {
            $("#addSanteAuxiliaire_TypeAffaire").css(
              "background-color",
              "#FFE9E0"
            );
          }
        });
        $rootScope.ChampsNonRenseignes();
      } else if ($scope.verifiegarentieenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille garentie";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifieprimeenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille prime";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifiegarentie == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille garentie";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.verifieprime == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "Veuillez renseigner correctement les champs de la grille prime";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprimeenregistrement == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime ttc ou la prime nette  ne doit etre vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if ($scope.statutprime == true) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime ttc ou la prime nette  ne doit etre vide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) == 0 ||
        parseInt($scope.valprimettc) == 0
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doivent pas etre nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimettcenregistrement) == 0 ||
        parseInt($scope.valprimenettenregistrement) == 0
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ou la prime ttc ne doivent pas etre nulle";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenette) > parseInt($scope.valprimettc)
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ne doit etre superieur a la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        parseInt($scope.valprimenettenregistrement) >
        parseInt($scope.valprimettcenregistrement)
      ) {
        $scope.$emit("UNLOAD");
        $scope.messageErreur =
          "la prime nette ne doit etre superieur a la prime ttc";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerosouscripteur.test($scope.FormAddSanteAuxiliaire.id1) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Code1").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner un code souscripteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerosouscripteur.test($scope.FormAddSanteAuxiliaire.id2) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Code2").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typenumerotelephone.test(
          $scope.FormAddSanteAuxiliaire.TelInterlocuteur
        ) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_TelInterlocuteur").css(
            "background-color",
            "#FFE9E0"
          );
        });
        $scope.messageErreur =
          "Veuillez renseigner un numero Telephone interlocuteur correct";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (typeDate.test($scope.FormAddSanteAuxiliaire.Effet) == false) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Effet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "Veuillez renseigner une dates effet correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Effet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEffet) == false &&
        $scope.leMoisEffet == "02" &&
        $scope.leJourEffet > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Effet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'effet n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        typeDate.test($scope.FormAddSanteAuxiliaire.Echeance) == false
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur =
          "Veuillez renseigner une dates écheance correcte";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "29"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.anneeBissextile($scope.lAnneeEcheance) == false &&
        $scope.leMoisEcheance == "02" &&
        $scope.leJourEcheance > "28"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date d'écheance n'est pas valide";
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
          $("#addSanteAuxiliaire_Effet").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        ($scope.leMoisEcheance == "04" ||
          $scope.leMoisEcheance == "06" ||
          $scope.leMoisEcheance == "09" ||
          $scope.leMoisEcheance == "11") &&
        $scope.leMoisEcheance > "30"
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Echeance").css("background-color", "#FFE9E0");
        });
        $scope.messageErreur = "La date saisie n'est pas valide";
        $rootScope.MessageDerreurDesTypes($scope.messageErreur);
      } else if (
        $scope.dateSuperioriteDebut($scope.FormAddSanteAuxiliaire.Echeance) <=
        $scope.dateSuperioriteFin($scope.FormAddSanteAuxiliaire.Effet)
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          $("#addSanteAuxiliaire_Echeance").css("background-color", "#FFE9E0");
        });
        $rootScope.dateEcheanceDebutIncorrecte();
      } else {
        if ($scope.etatForm == "2") {
          $scope.clsCtcontratgaranties = [];
          for (
            var i = 0;
            i < $scope.recuperer.clsCtcontratgaranties.length;
            i++
          ) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              GA_CODEGARANTIE: "",
              CG_CAPITAUXASSURES: "",
              CG_PRIMES: "",
              CG_APRESREDUCTION: "",
              CG_PRORATA: "",
              CG_FRANCHISES: "",
              CG_TAUX: "",
              CG_MONTANT: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetGarentie.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.recuperer.clsCtcontratgaranties[i].GA_CODEGARANTIE;
            $scope.objetGarentie.CA_CODECONTRAT =
              $scope.recuperer.clsCtcontratgaranties[i].CA_CODECONTRAT;
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.recuperer.clsCtcontratgaranties[i].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES =
              $scope.recuperer.clsCtcontratgaranties[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.recuperer.clsCtcontratgaranties[i].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA =
              $scope.recuperer.clsCtcontratgaranties[i].CG_PRORATA;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.recuperer.clsCtcontratgaranties[i].CG_FRANCHISES;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          $scope.clsCtcontratprimes = [];
          for (var i = 0; i < $scope.recuperer.clsCtcontratprimes.length; i++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetPrime.RE_CODERESUME =
              $scope.recuperer.clsCtcontratprimes[i].RE_CODERESUME;
            $scope.objetPrime.CA_CODECONTRAT =
              $scope.recuperer.clsCtcontratprimes[i].CA_CODECONTRAT;
            $scope.objetPrime.CP_VALEUR =
              $scope.recuperer.clsCtcontratprimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "1";
          $scope.CA_CODECONTRAT = $scope.recuperer.CA_CODECONTRAT;
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.clsCtcontratgaranties = [];
          for (var i = 0; i < $scope.tabGarenties.length; i++) {
            $scope.objetGarentie = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              GA_CODEGARANTIE: "",
              CG_CAPITAUXASSURES: "",
              CG_PRIMES: "",
              CG_APRESREDUCTION: "",
              CG_PRORATA: "",
              CG_FRANCHISES: "",
              CG_TAUX: "",
              CG_MONTANT: "",
              CG_LIBELLE: "",
              SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetGarentie.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetGarentie.GA_CODEGARANTIE =
              $scope.tabGarenties[i].GA_CODEGARANTIE;
            $scope.objetGarentie.CA_CODECONTRAT =
              $scope.tabGarenties[i].CA_CODECONTRAT;
            $scope.objetGarentie.CG_CAPITAUXASSURES =
              $scope.tabGarenties[i].CG_CAPITAUXASSURES;
            $scope.objetGarentie.CG_PRIMES = $scope.tabGarenties[i].CG_PRIMES;
            $scope.objetGarentie.CG_APRESREDUCTION =
              $scope.tabGarenties[i].CG_APRESREDUCTION;
            $scope.objetGarentie.CG_PRORATA = $scope.tabGarenties[i].CG_PRORATA;
            $scope.objetGarentie.CG_FRANCHISES =
              $scope.tabGarenties[i].CG_FRANCHISES;
            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetGarentie.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratgaranties.push($scope.objetGarentie);
          }
          $scope.clsCtcontratprimes = [];
          for (var i = 0; i < $scope.tabPrimes.length; i++) {
            $scope.objetPrime = {
              AG_CODEAGENCE: "",
              EN_CODEENTREPOT: "",
              CA_CODECONTRAT: "",
              RE_CODERESUME: "",
              CP_VALEUR: "",
              SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
              SL_LIBELLEMOUCHARD: "INSERTIONS",
              TYPEOPERATION: "",
              LG_CODELANGUE: "fr",
              clsObjetEnvoi: {
                OE_A: "",
                OE_Y: "",
                OE_J: "",
              },
            };
            $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
            $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
            $scope.objetPrime.CA_CODECONTRAT =
              $scope.tabPrimes[i].CA_CODECONTRAT;
            $scope.objetPrime.RE_CODERESUME = $scope.tabPrimes[i].RE_CODERESUME;
            $scope.objetPrime.CP_VALEUR = $scope.tabPrimes[i].CG_PRIMES;
            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
            $scope.objetPrime.clsObjetEnvoi.OE_J =
              $rootScope.DATE_JOURNEE_DE_TRAVAIL;
            $scope.clsCtcontratprimes.push($scope.objetPrime);
          }
          $scope.TYPEOPERATION = "0";
          $scope.SL_LIBELLEMOUCHARD = "INSERTION";
        }

        $scope.objet_envoie = [
          {
            CA_CODECONTRAT: $scope.CA_CODECONTRAT,
            AG_CODEAGENCE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_DATENAISSANCE: "01-01-1900",
            RQ_CODERISQUE: "07",
            CA_DATESAISIE: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            CA_NUMPOLICE: $scope.FormAddSanteAuxiliaire.PoliceN, //"4412012Q1",
            IT_CODEINTERMEDIAIRE: $scope.FormAddSanteAuxiliaire.Intermediaire, //"00001",
            TI_IDTIERSASSUREUR: $scope.FormAddSanteAuxiliaire.assureur, //"100000000005",
            CO_CODECOMMUNE: $scope.FormAddSanteAuxiliaire.commune, //"0000000013",
            CA_SITUATIONGEOGRAPHIQUE:
              $scope.FormAddSanteAuxiliaire.SituationGeo, //"RAS",
            CA_DATEEFFET: $scope.FormAddSanteAuxiliaire.Effet, //"01-01-2020",
            CA_DATEECHEANCE: $scope.FormAddSanteAuxiliaire.Echeance, //"31-12-2020",
            CA_NOMINTERLOCUTEUR: $scope.FormAddSanteAuxiliaire.Interlocuteur, //"blisse",
            CA_CONTACTINTERLOCUTEUR:
              $scope.FormAddSanteAuxiliaire.TelInterlocuteur, //"",
            TA_CODETYPEAFFAIRES: $scope.FormAddSanteAuxiliaire.typeAffaire, //"01",
            TI_IDTIERSCOMMERCIAL: $scope.FormAddSanteAuxiliaire.id2, //"100000000002",
            TI_IDTIERS: $scope.FormAddSanteAuxiliaire.id1, //"100000000007",
            CA_DUREEENMOIS: "0",
            CB_IDBRANCHE: $scope.FormAddSanteAuxiliaire.CodeBranche,
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
            GR_CODEGARENTIEPRIME: $scope.FormAddSanteAuxiliaire.valgarantie,
            SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
            SL_LIBELLEMOUCHARD: $scope.SL_LIBELLEMOUCHARD,
            TYPEOPERATION: $scope.TYPEOPERATION,
            LG_CODELANGUE: "fr",
            clsObjetEnvoi: {
              OE_A: $rootScope.CODE_AGENCE,
              OE_Y: $rootScope.CODE_OPERATEUR,
              OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
              OE_E: $rootScope.CODE_ENTREPOT,
            },
            clsCtcontratgaranties: $scope.clsCtcontratgaranties,
            clsCtcontratprimes: $scope.clsCtcontratprimes,
          },
        ];

        $http
          .post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.testEnregistrement = reponse.data;
            if (
              $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE"
            ) {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementReussi(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
              if ($scope.etatForm == "2") {
                $scope.RetourSurListe = function () {
                  window.location.href = "#/assurances/sante/auxiliaire";
                };
                setTimeout($scope.RetourSurListe, 3600);
              } else {
                if (!!localStorage.getItem("collectionDemande")) {
                  localStorage.removeItem("collectionDemande");
                }
                $scope.FormAddSanteAuxiliaire = {};
                $scope.initFormAddSanteAuxiliaire();
                $scope.isDisabled = false;
              }
            } else {
              $scope.$emit("UNLOAD");
              $rootScope.EnregistrementNonReussi();
            }
          })
          .catch(function () {
            $scope.$emit("UNLOAD");
            $rootScope.ProblemeServeur(
              $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
            );
          });
      }
    };

    // verification de la prime nette et ttc
    $scope.testprime = function () {
      $scope.statutprime = false;
      $scope.statutprimeenregistrement = false;
      if ($scope.etatForm == "2") {
        $scope.valprimettcenregistrement = 1;
        $scope.valprimenettenregistrement = 1;
        // $scope.verifieprime = false;
        for (var j = 0; j < $scope.recuperer.clsCtcontratprimes.length; j++) {
          if (
            $scope.recuperer.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recuperer.clsCtcontratprimes[j].RE_CODERESUME == 01 &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimenette =
              $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES;
          }
          if (
            $scope.recuperer.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES == ""
          ) {
            $scope.statutprime = true;
            break;
          }
          if (
            $scope.recuperer.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.valprimettc =
              $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES;
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

    //calcul de la prime automatiquement
    $scope.calculprimettc = function () {
      $scope.premierclick = "FALSE";
      $scope.valprimettcaffiche = 0;
      if ($scope.etatForm == "2") {
        for (var j = 0; j < $scope.recuperer.clsCtcontratprimes.length; j++) {
          if (
            $scope.recuperer.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES = 0;
          }
        }
        for (var j = 0; j < $scope.recuperer.clsCtcontratprimes.length; j++) {
          if (
            $scope.recuperer.clsCtcontratprimes[j].RE_CODERESUME !== 05 &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES != "" &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES != undefined
          ) {
            $scope.valprimettcaffiche =
              parseInt($scope.valprimettcaffiche) +
              parseInt($scope.recuperer.clsCtcontratprimes[j].CG_PRIMES);
          }
        }
        for (var j = 0; j < $scope.recuperer.clsCtcontratprimes.length; j++) {
          if (
            $scope.recuperer.clsCtcontratprimes[j].RE_CODERESUME == 05 &&
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES !== ""
          ) {
            $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES =
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
    //Fin ajout Sante Auxiliaire (contrat)
    // $scope.testgrilleenregistrement = function () {
    //    // $scope.resultattestgrille = true
    //    let typenumerotelephone = /^(0|[0-9]\d*)$/;

    //    $scope.verifiegarentieenregistrement = false;
    //    for (var j = 0; j < $scope.tabGarenties.length; j++) {
    //        if (typenumerotelephone.test($scope.tabGarenties[j].CG_PRIMES) == false) {
    //            $scope.verifiegarentieenregistrement = true;
    //            break;
    //        }
    //    }
    //    $scope.verifieprimeenregistrement = false;
    //    for (var j = 0; j < $scope.tabPrimes.length; j++) {
    //        if (typenumerotelephone.test($scope.tabPrimes[j].CG_PRIMES) == false) {
    //            $scope.verifieprimeenregistrement = true;
    //            break;
    //        }
    //    }

    //}

    $scope.testgrille = function () {
      // $scope.resultattestgrille = true
      let typenumerotelephone = /^(0|[0-9]\d*)$/;

      if ($scope.etatForm == "2") {
        $scope.verifiegarentie = false;
        for (
          var j = 0;
          j < $scope.recuperer.clsCtcontratgaranties.length;
          j++
        ) {
          if (
            typenumerotelephone.test(
              $scope.recuperer.clsCtcontratgaranties[j].CG_CAPITAUXASSURES
            ) == false
          ) {
            $scope.verifiegarentie = true;
            break;
          }
          if (
            typenumerotelephone.test(
              $scope.recuperer.clsCtcontratgaranties[j].CG_PRIMES
            ) == false
          ) {
            $scope.verifiegarentie = true;
            break;
          }
          if (
            typenumerotelephone.test(
              $scope.recuperer.clsCtcontratgaranties[j].CG_APRESREDUCTION
            ) == false
          ) {
            $scope.verifiegarentie = true;
            break;
          }
          if (
            typenumerotelephone.test(
              $scope.recuperer.clsCtcontratgaranties[j].CG_PRORATA
            ) == false
          ) {
            $scope.verifiegarentie = true;
            break;
          }
        }
        $scope.verifieprime = false;
        for (var j = 0; j < $scope.recuperer.clsCtcontratprimes.length; j++) {
          if (
            typenumerotelephone.test(
              $scope.recuperer.clsCtcontratprimes[j].CG_PRIMES
            ) == false
          ) {
            $scope.verifieprime = true;
            break;
          }
        }
      } else {
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
        $scope.verifiegarentieenregistrement = false;
        for (var j = 0; j < $scope.tabGarenties.length; j++) {
          if (
            typenumerotelephone.test(
              $scope.tabGarenties[j].CG_CAPITAUXASSURES
            ) == false
          ) {
            $scope.verifiegarentieenregistrement = true;
            break;
          }
          if (
            typenumerotelephone.test($scope.tabGarenties[j].CG_PRIMES) == false
          ) {
            $scope.verifiegarentieenregistrement = true;
            break;
          }
          if (
            typenumerotelephone.test(
              $scope.tabGarenties[j].CG_APRESREDUCTION
            ) == false
          ) {
            $scope.verifiegarentieenregistrement = true;
            break;
          }
          if (
            typenumerotelephone.test($scope.tabGarenties[j].CG_PRORATA) == false
          ) {
            $scope.verifiegarentieenregistrement = true;
            break;
          }
        }
        $scope.verifieprimeenregistrement = false;
        for (var j = 0; j < $scope.tabPrimes.length; j++) {
          if (
            typenumerotelephone.test($scope.tabPrimes[j].CG_PRIMES) == false
          ) {
            $scope.verifieprimeenregistrement = true;
            break;
          }
        }
      }
    };
    //Debut modification santé auxiliaire (contrat) /a terminer

    //$scope.test = [];
    // $scope.testEnregistrement = [];
    //$scope.modifSanteAuxiliaire = function () {
    //    let typeNumerique = /^[0-9]/;
    //    let typeAlphabetique = /^[a-z-A-Z]/;
    //    let typeDate = /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    //    let typenumerotelephone = /^(0|[0-9]\d*)$/;
    //    let typenumerosouscripteur = /^(0|[0-9]\d*)$/;
    //    let typeDuree = /^(0|[0-9]\d*)$/;
    //    $scope.lAnneeEffet = $scope.FormAddSanteAuxiliaire.Effet.substr(6, 4);
    //    $scope.leMoisEffet = $scope.FormAddSanteAuxiliaire.Effet.substr(3, 2);
    //    $scope.leJourEffet = $scope.FormAddSanteAuxiliaire.Effet.substr(0, 2);
    //    $scope.lAnneeEcheance = $scope.FormAddSanteAuxiliaire.Echeance.substr(6, 4);
    //    $scope.leMoisEcheance = $scope.FormAddSanteAuxiliaire.Echeance.substr(3, 2);
    //    $scope.leJourEcheance = $scope.FormAddSanteAuxiliaire.Echeance.substr(0, 2);

    //    if (($scope.recuperer.CA_NUMPOLICE === "") || ($scope.recuperer.CA_DATEEFFET === "") || ($scope.recuperer.CA_DATEECHEANCE === "") ||
    //        ($scope.recuperer.CO_CODECOMMUNE === "") || ($scope.recuperer.CA_SITUATIONGEOGRAPHIQUE === "") || ($scope.recuperer.TI_IDTIERSASSUREUR === "") ||
    //        ($scope.recuperer.CA_NOMINTERLOCUTEUR === "") || ($scope.recuperer.CA_CONTACTINTERLOCUTEUR === "") || ($scope.recuperer.TA_CODETYPEAFFAIRES === "") ||
    //        ($scope.recuperer.CB_IDBRANCHE === "") || ($scope.recuperer.CA_DUREEENMOIS === "") || ($scope.recuperer.TI_IDTIERS === "") || ($scope.recuperer.TI_IDTIERSCOMMERCIAL === "")) {
    //        $rootScope.ChampsNonRenseignes()
    //    } else if (typenumerosouscripteur.test($scope.recuperer.TI_IDTIERS) == false) {
    //        $scope.messageErreur = "Veuillez renseigner un code souscripteur correct";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (typenumerosouscripteur.test($scope.recuperer.TI_IDTIERSCOMMERCIAL) == false) {
    //        $scope.messageErreur = "Veuillez renseigner un code commercial correct";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (typenumerotelephone.test($scope.recuperer.CA_CONTACTINTERLOCUTEUR) == false) {
    //        $scope.messageErreur = "Veuillez renseigner un numero Telephone interlocuteur correct";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (typeDuree.test($scope.recuperer.CA_DUREEENMOIS) == false) {
    //        $scope.messageErreur = "Veuillez renseigner une Duree correct";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (typeDate.test($scope.recuperer.CA_DATEEFFET) == false) {
    //        $scope.messageErreur = "Veuillez renseigner une dates effet correcte";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (($scope.leMoisEffet == "02") && ($scope.leJourEffet > "29")) {
    //        $scope.messageErreur = "La date d'effet n'est pas valide";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (typeDate.test($scope.recuperer.CA_DATEECHEANCE) == false) {
    //        $scope.messageErreur = "Veuillez renseigner une dates écheance correcte";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (($scope.leMoisEcheance == "02") && ($scope.leJourEcheance > "29")) {
    //        $scope.messageErreur = "La date d'écheance n'est pas valide";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (($scope.leMoisEffet == "04" || $scope.leMoisEffet == "06" || $scope.leMoisEffet == "09" || $scope.leMoisEffet == "11") && ($scope.leJourEffet > "30")) {
    //        $scope.messageErreur = "La date saisie n'est pas valide";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    } else if (($scope.leMoisEcheance == "04" || $scope.leMoisEcheance == "06" || $scope.leMoisEcheance == "09" || $scope.leMoisEcheance == "11") && ($scope.leMoisEcheance > "30")) {
    //        $scope.messageErreur = "La date saisie n'est pas valide";
    //        $rootScope.MessageDerreurDesTypes($scope.messageErreur)
    //    }
    //    else if ($scope.dateSuperioriteDebut($scope.recuperer.CA_DATEECHEANCE) <= $scope.dateSuperioriteFin($scope.recuperer.CA_DATEEFFET)) {
    //        $rootScope.dateEcheanceDebutIncorrecte();

    //    } else {

    //        $scope.clsCtcontratgaranties = []
    //        for (var i = 0; i < $scope.recuperer.clsCtcontratgaranties.length; i++) {
    //            $scope.objetGarentie = {
    //                "AG_CODEAGENCE": "",
    //                "EN_CODEENTREPOT": "",
    //                "CA_CODECONTRAT": "",
    //                "GA_CODEGARANTIE": "",
    //                "CG_CAPITAUXASSURES": "",
    //                "CG_PRIMES": "",
    //                "CG_APRESREDUCTION": "",
    //                "CG_PRORATA": "",
    //                "CG_FRANCHISES": "",
    //                "CG_TAUX": "",
    //                "CG_MONTANT": "",
    //                "CG_LIBELLE": "",
    //                "SL_LIBELLEECRAN": "SANTE AUXILLIAIRE",
    //                "SL_LIBELLEMOUCHARD": "INSERTIONS",
    //                "TYPEOPERATION": "",
    //                "LG_CODELANGUE": "",
    //                "clsObjetEnvoi": {
    //                    "OE_A": "",
    //                    "OE_Y": "",
    //                    "OE_J": ""
    //                }
    //            }
    //            $scope.objetGarentie.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
    //            $scope.objetGarentie.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
    //            $scope.objetGarentie.GA_CODEGARANTIE = $scope.recuperer.clsCtcontratgaranties[i].GA_CODEGARANTIE;
    //            $scope.objetGarentie.CA_CODECONTRAT = $scope.recuperer.clsCtcontratgaranties[i].CA_CODECONTRAT;
    //            $scope.objetGarentie.CG_CAPITAUXASSURES = $scope.recuperer.clsCtcontratgaranties[i].CG_CAPITAUXASSURES;
    //            $scope.objetGarentie.CG_PRIMES = $scope.recuperer.clsCtcontratgaranties[i].CG_PRIMES;
    //            $scope.objetGarentie.CG_APRESREDUCTION = $scope.recuperer.clsCtcontratgaranties[i].CG_APRESREDUCTION;
    //            $scope.objetGarentie.CG_PRORATA = $scope.recuperer.clsCtcontratgaranties[i].CG_PRORATA;
    //            $scope.objetGarentie.CG_FRANCHISES = $scope.recuperer.clsCtcontratgaranties[i].CG_FRANCHISES;
    //            $scope.objetGarentie.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
    //            $scope.objetGarentie.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
    //            $scope.objetGarentie.clsObjetEnvoi.OE_J = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
    //            $scope.clsCtcontratgaranties.push($scope.objetGarentie)
    //        }
    //        $scope.clsCtcontratprimes = []
    //        for (var i = 0; i < $scope.recuperer.clsCtcontratprimes.length; i++) {
    //            $scope.objetPrime = {
    //                "AG_CODEAGENCE": "",
    //                "EN_CODEENTREPOT": "",
    //                "CA_CODECONTRAT": "",
    //                "RE_CODERESUME": "",
    //                "CP_VALEUR": "",
    //                "SL_LIBELLEECRAN": "SANTE AUXILLIAIRE",
    //                "SL_LIBELLEMOUCHARD": "INSERTIONS",
    //                "TYPEOPERATION": "",
    //                "LG_CODELANGUE": "fr",
    //                "clsObjetEnvoi": {
    //                    "OE_A": "",
    //                    "OE_Y": "",
    //                    "OE_J": ""
    //                }
    //            }
    //            $scope.objetPrime.AG_CODEAGENCE = $rootScope.CODE_AGENCE;
    //            $scope.objetPrime.EN_CODEENTREPOT = $rootScope.CODE_ENTREPOT;
    //            $scope.objetPrime.RE_CODERESUME = $scope.recuperer.clsCtcontratprimes[i].RE_CODERESUME;
    //            $scope.objetPrime.CA_CODECONTRAT = $scope.recuperer.clsCtcontratprimes[i].CA_CODECONTRAT;
    //            $scope.objetPrime.CP_VALEUR = $scope.recuperer.clsCtcontratprimes[i].CG_PRIMES;
    //            $scope.objetPrime.clsObjetEnvoi.OE_A = $rootScope.CODE_AGENCE;
    //            $scope.objetPrime.clsObjetEnvoi.OE_Y = $rootScope.CODE_OPERATEUR;
    //            $scope.objetPrime.clsObjetEnvoi.OE_J = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
    //            $scope.clsCtcontratprimes.push($scope.objetPrime)
    //        }

    //        $scope.objet_envoie = [
    //            {
    //                "CA_CODECONTRAT": $scope.recuperer.CA_CODECONTRAT,
    //                "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
    //                "EN_CODEENTREPOT": $rootScope.CODE_ENTREPOT,
    //                "RQ_CODERISQUE": "07",
    //                "CA_DATENAISSANCE": "01-01-1900",
    //                "CA_DATESAISIE": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
    //                "OP_CODEOPERATEUR": $rootScope.CODE_OPERATEUR,
    //                "CA_NUMPOLICE": $scope.recuperer.CA_NUMPOLICE, //"4412012Q1",
    //                "IT_CODEINTERMEDIAIRE": $scope.recuperer.IT_CODEINTERMEDIAIRE, //"00001",
    //                "TI_IDTIERSASSUREUR": $scope.recuperer.TI_IDTIERSASSUREUR, //"100000000005",
    //                "CO_CODECOMMUNE": $scope.recuperer.CO_CODECOMMUNE, //"0000000013",
    //                "CA_SITUATIONGEOGRAPHIQUE": $scope.recuperer.CA_SITUATIONGEOGRAPHIQUE, //"RAS",
    //                "CA_DATEEFFET": $scope.recuperer.CA_DATEEFFET, //"01-01-2020",
    //                "CA_DATEECHEANCE": $scope.recuperer.CA_DATEECHEANCE, //"31-12-2020",
    //                "CA_NOMINTERLOCUTEUR": $scope.recuperer.CA_NOMINTERLOCUTEUR, //"blisse",
    //                "CA_CONTACTINTERLOCUTEUR": $scope.recuperer.CA_CONTACTINTERLOCUTEUR, //"",
    //                "TA_CODETYPEAFFAIRES": $scope.recuperer.TA_CODETYPEAFFAIRES, //"01",
    //                "TI_IDTIERSCOMMERCIAL": $scope.recuperer.TI_IDTIERSCOMMERCIAL, //"100000000002",
    //                "TI_IDTIERS": $scope.recuperer.TI_IDTIERS, //"100000000007",
    //                "CA_DUREEENMOIS": $scope.recuperer.CA_DUREEENMOIS,
    //                "CB_IDBRANCHE": $scope.recuperer.CB_IDBRANCHE,
    //                "CA_TAUX": "0",
    //                "CA_NUMSERIE": "1000",
    //                "CA_IMMATRICULATION": "IMMAT",
    //                "CA_PUISSANCEADMISE": "0",
    //                "CA_CHARGEUTILE": "0",
    //                "CA_NBREPLACE": "0",
    //                "CA_VALNEUVE": "0",
    //                "CA_VALVENALE": "0",
    //                "CA_DATEMISECIRCULATION": "01-01-1900",
    //                "CA_CLIENTEXONERETAXE": "N",
    //                "CA_DATETRANSMISSIONAASSUREUR": "01-01-1900",
    //                "CA_DATEVALIDATIONASSUREUR": "01-01-1900",
    //                "CA_DATERECEPTIONCOTATIONDEASSUREUR": "01-01-1900",
    //                "CA_DATETRANSMISSIONCOTATIONCLIENT": "01-01-1900",
    //                "CA_DATESUSPENSION": "01-01-1900",
    //                "CA_DATECLOTURE": "01-01-1900",
    //                "CA_DATERESILIATION": "01-01-1900",
    //                "SL_LIBELLEECRAN": "SANTE AUXILLIAIRE",
    //                "SL_LIBELLEMOUCHARD": "INSERTIONS",
    //                "TYPEOPERATION": "1",
    //                "LG_CODELANGUE": "fr",
    //                "clsObjetEnvoi": {
    //                    "OE_A": $rootScope.CODE_AGENCE,
    //                    "OE_Y": $rootScope.CODE_OPERATEUR,
    //                    "OE_J": $rootScope.DATE_JOURNEE_DE_TRAVAIL
    //                },
    //                "clsCtcontratgaranties": $scope.clsCtcontratgaranties,
    //                "clsCtcontratprimes": $scope.clsCtcontratprimes,

    //            }
    //        ];

    //        $http.post("/Contrat/AjoutContrat/", $scope.objet_envoie, {
    //            //headers: $scope.headers
    //        }).then(function (reponse) {
    //            $scope.modiftestEnregistrement = reponse.data
    //            if ($scope.modiftestEnregistrement[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
    //                $rootScope.EnregistrementReussi($scope.modiftestEnregistrement[0].clsObjetRetour.SL_MESSAGE);
    //                $scope.RetourSurListe = function () {
    //                    window.location.href = "#/Assurance/ListeSanteAuxiliaire";
    //                }
    //                setTimeout($scope.RetourSurListe, 3600);
    //            } else {
    //                $rootScope.EnregistrementNonReussi();
    //            }
    //        }).catch(function () {
    //            $rootScope.ProblemeServeur($scope.modiftestEnregistrement[0].clsObjetRetour.SL_MESSAGE);
    //        });
    //    }
    //};

    //Fin modification santé auxiliaire (contrat)

    //debut voir plus Sante Auxiliaire
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpSanteAuxiliaire", JSON.stringify(info));
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("vpSanteAuxiliaire")
      );
    };
    //fin voir plus Sante Auxiliaire

    //debut acceder a la page de modification Sante Auxiliaire
    $scope.voirModification = function (info) {
      $scope.afficheListeContratAvecAccessoir(info.CA_CODECONTRAT, info.CA_DATESAISIE)
      
    };
    //fin acceder a la page de modification Sante Auxiliaire

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimeContrat = function (recupId) {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          CA_CODECONTRAT: recupId,
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          console.log($scope.testSuppression);
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
          $rootScope.ProblemeServeur();
        });
    };
    //fin recuperer id pour la suppression

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
      let typeNumerique = /^[0-9]/;
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
            RQ_CODERISQUE: "07",
            AG_CODEAGENCE: $rootScope.CODE_AGENCE,
            EN_CODEENTREPOT: $rootScope.CODE_ENTREPOT,
            CA_NUMPOLICE: numDePolice,
            TI_NUMTIERS: numSouscrp,
            TI_DENOMINATION: nomSouscrp,
            TI_NUMTIERSCOMMERCIAL: numCom,
            TI_DENOMINATIONCOMMERCIAL: nomCom,
            DATEDEBUT: periodeDu,
            DATEFIN: periodeAu,
            OP_CODEOPERATEUR: $rootScope.CODE_OPERATEUR,
            SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          .post("/Contrat/ListeContratSansAccessoir/", $scope.objet_envoie, {
            //headers: $scope.headers
          })
          .then(function (reponse) {
            $scope.$emit("UNLOAD");
            $scope.listeContrat = reponse.data;
            $scope.nombreInfoBulle = $scope.listeContrat.length;
            console.log($scope.listeContrat);
            if ($scope.listeContrat[0].clsObjetRetour.SL_RESULTAT === "FALSE") {
              $scope.$emit("UNLOAD");
              $rootScope.MessageDesListes(
                $scope.listeContrat[0].clsObjetRetour.SL_MESSAGE
              );
            }
          });
      }
    };

 //debut afficher liste AvecAccessoir
 $scope.afficheListeContratAvecAccessoir = function (
  idContrat,
  date
 
) {
  $scope.$emit("LOAD");
 
 
    $scope.objet_envoie = [
      {
        RQ_CODERISQUE: "07",
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
          sessionStorage.setItem("modifSanteAuxiliaire", JSON.stringify($scope.recupererInfoAvecAccessoir));
          window.location.href = "#/assurances/modification/SanteAuxiliaire";
        }
      });
 
};
//fin afficher liste AvecAccessoir



    //debut pour annuler la recherche
    $scope.listeAnnuler = function () {
      $scope.$emit("LOAD");
      $scope.FormList.periodeDu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.periodeAu = $rootScope.DATE_JOURNEE_DE_TRAVAIL;
      $scope.FormList.numPolice = "";
      $scope.FormList.numSouscripteur = "";
      $scope.FormList.nomSouscripteur = "";
      $scope.FormList.numCommercial = "";
      $scope.FormList.nomCommercial = "";
      $scope.$emit("UNLOAD");
      // $scope.rechargePage();
    };
    //fin pour annuler la recherche

    //redirectQuestionnaire
    $scope.redirectQuestionnaire = function (idcont) {
      localStorage.setItem("idcontratvoyage", JSON.stringify(idcont));
      $rootScope.retourSurListeContrat = "SanteAuxiliaire";
      window.location.href =
        "#/assurance/Listes/Operation/consultation-questionnaires";
    };
    //redirectQuestionnaire

    // DEBUT COMBOS

    $scope.afficheListegarantie = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "07",
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
            $scope.afficheListePaysSanteAuxiliaire();
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
    $scope.afficheListePaysSanteAuxiliaire = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeDesPaysSanteAuxiliaire = reponse.data;
          if (
            $scope.listeDesPaysSanteAuxiliaire[0].clsObjetRetour.SL_RESULTAT ===
            "TRUE"
          ) {
            $scope.afficheListeAssureurSanteAuxiliaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysSanteAuxiliaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPaysSanteAuxiliaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysSanteAuxiliaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des assureur
    $scope.afficheListeAssureurSanteAuxiliaire = function () {
      $scope.objet_envoie = [
        {
          AG_CODEAGENCE: $rootScope.CODE_AGENCE,
          NT_CODENATURETYPETIERS: "10",
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeDesAssureursSanteAuxiliaire = reponse.data;
          if (
            $scope.listeDesAssureursSanteAuxiliaire[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeTypeAffaireSanteAuxiliaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesAssureursSanteAuxiliaire[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeDesAssureursSanteAuxiliaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesAssureursSanteAuxiliaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des assureur

    //debut liste type d'affaire
    $scope.afficheListeTypeAffaireSanteAuxiliaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeTypeAffaireSanteAuxiliaire = reponse.data;
          if (
            $scope.listeTypeAffaireSanteAuxiliaire[0].clsObjetRetour
              .SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeBranche();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeTypeAffaireSanteAuxiliaire[0].clsObjetRetour
                .SL_MESSAGE
            );
          }
          console.log($scope.listeTypeAffaireSanteAuxiliaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeTypeAffaireSanteAuxiliaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste type d'affaire

    $scope.afficheListeBranche = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
        .post("/Branche/ListeBranche/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.listeDesBranche = reponse.data;
          if ($scope.listeDesBranche[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.afficheListeIntermediaire();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesBranche[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesBranche);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesBranche[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };

    //debut liste des intermediaire
    $scope.afficheListeIntermediaire = function () {
      $scope.objet_envoie = [
        {
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
          $scope.listeIntermediaire = reponse.data;
          if (
            $scope.listeIntermediaire[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.tableauGarenties();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeIntermediaire[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeIntermediaire);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeIntermediaire[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des intermediaire

    //debut tableau garenties
    $scope.tableauGarenties = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "07",
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
        .post("/Garenties/ListeGarenties/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.tabGarenties = reponse.data;
          if ($scope.tabGarenties[0].clsObjetRetour.SL_RESULTAT === "TRUE") {
            $scope.tableauPrimes();
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.tabGarenties[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.tabGarenties);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.tabGarenties[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin tableau garenties

    //debut tableau primes
    $scope.tableauPrimes = function () {
      $scope.objet_envoie = [
        {
          RQ_CODERISQUE: "07",
          SL_LIBELLEECRAN: "SANTE AUXILLIAIRE",
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
              setTimeout($scope.retourModifSanteAuxiliaire, 3600);
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

    //debut acceder a la page de modification Sante Auxiliaire 2
    $scope.retourModifSanteAuxiliaire = function () {
      $scope.etatForm = "2";
      $scope.isDisabled = true;
      $scope.recuperer = JSON.parse(
        sessionStorage.getItem("modifSanteAuxiliaire")
      );

      $scope.FormAddSanteAuxiliaire.Code01 = $scope.recuperer.TI_NUMTIERS;
      $scope.FormAddSanteAuxiliaire.Denomination01 =
        $scope.recuperer.TI_DENOMINATION;
      $scope.FormAddSanteAuxiliaire.Code02 =
        $scope.recuperer.TI_NUMTIERSCOMMERCIAL;
      $scope.FormAddSanteAuxiliaire.Denomination02 =
        $scope.recuperer.TI_DENOMINATIONCOMMERCIAL;
      $scope.FormAddSanteAuxiliaire.pays = $scope.recuperer.PY_CODEPAYS;
      $scope.FormAddSanteAuxiliaire.ville = $scope.recuperer.VL_CODEVILLE;
      $scope.FormAddSanteAuxiliaire.PoliceN = $scope.recuperer.CA_NUMPOLICE;
      $scope.FormAddSanteAuxiliaire.Effet = $scope.recuperer.CA_DATEEFFET;
      $scope.FormAddSanteAuxiliaire.Echeance = $scope.recuperer.CA_DATEECHEANCE;
      $scope.FormAddSanteAuxiliaire.Intermediaire =
        $scope.recuperer.IT_CODEINTERMEDIAIRE;
      $scope.FormAddSanteAuxiliaire.commune = $scope.recuperer.CO_CODECOMMUNE;
      $scope.FormAddSanteAuxiliaire.SituationGeo =
        $scope.recuperer.CA_SITUATIONGEOGRAPHIQUE;
      $scope.FormAddSanteAuxiliaire.assureur =
        $scope.recuperer.TI_IDTIERSASSUREUR;
      $scope.FormAddSanteAuxiliaire.Interlocuteur =
        $scope.recuperer.CA_NOMINTERLOCUTEUR;
      $scope.FormAddSanteAuxiliaire.id2 = $scope.recuperer.TI_IDTIERSCOMMERCIAL;
      $scope.FormAddSanteAuxiliaire.id1 = $scope.recuperer.TI_IDTIERS;
      $scope.FormAddSanteAuxiliaire.Duree = $scope.recuperer.CA_DUREEENMOIS;
      $scope.FormAddSanteAuxiliaire.CodeBranche = $scope.recuperer.CB_IDBRANCHE;
      $scope.FormAddSanteAuxiliaire.TelInterlocuteur =
        $scope.recuperer.CA_CONTACTINTERLOCUTEUR;
      $scope.FormAddSanteAuxiliaire.typeAffaire =
        $scope.recuperer.TA_CODETYPEAFFAIRES;
      $scope.FormAddSanteAuxiliaire.valgarantie =
        $scope.recuperer.GR_CODEGARENTIEPRIME;

      $scope.afficheListeVilleSanteAuxiliaireModif(
        $scope.recuperer.PY_CODEPAYS
      );
    };
    //fin acceder a la page de modification Sante Auxiliaire2

    // FIN COMBOS

    /*FIN DEV OVER*/
  },
]);
