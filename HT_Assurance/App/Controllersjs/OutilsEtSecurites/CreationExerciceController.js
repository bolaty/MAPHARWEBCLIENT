MapharApp.controller("CreationExerciceController", [
  "$scope",
  "$http",
  "$q",
  "$rootScope",
  "$cookies",
  function ($scope, $http, $q, $rootScope, $cookies) {
      /*DEBUT ZONE DE DECLARATION*/
      $scope.FormAddExercice = {
          DateDepremierejournee: "",
          Exercice: "",
          Datededebut: "",
          Datedefin: "",
          libeXERCICE: "",
          ExerciceStatut: "N"
      };
      $scope.cpt = 0;
      $scope.listeCreationExercice = [];
      $scope.nombreInfoBulle = "";
      $scope.tablisteCreationExercice = [];
      $scope.testSuppressionExercice = [];
      $scope.TYPEOPERATION = ""
      $scope.EX_EXERCICE = ""
      $scope.recupererinfo = []
      $scope.recuperer = []
      $scope.verouadd = true
      $scope.recupereradd = []
      $scope.lAnnee = ""
      $scope.verouform = true
      $scope.isDisabled = true;
      /*FIN ZONE DE DECLARATION*/

      /*DEBUT FONCTION GENERALE*/


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


      //debut loader
      $scope.$on("LOAD", function () {
          $scope.loading = true;
      });

      $scope.$on("UNLOAD", function () {
          $scope.loading = false;
      });
      //fin loader

      /*FIN FONCTION GENERALE*/

      //debut recharge page
      $scope.rechargePage = function () {
          window.location.reload();
      };
      //debut recharge page

      /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
      //debut initialisation
      $scope.initFormAddCreationExercice = function () {
          $scope.$emit("LOAD");
          $scope.afficheListExercice();
          // $scope.$emit("UNLOAD");
      };
      // fin initialisation
      $scope.COCHE = function (item) {
        if (item == "O") {
          return true;
        }
      };
      $scope.testval = function (item) {
        if ($scope.cpt == 0) {
          $scope.FormAddExercice.ExerciceStatut = "O";
          $scope.cpt++;
        } else {
          $scope.FormAddExercice.ExerciceStatut = "N";
          $scope.cpt = 0;
        }
       // console.log($scope.FormAddExercice.ExerciceStatut);
      };
  
      $scope.initFormAddExecice = function () {
          $scope.$emit("LOAD");

          $scope.recupereradd = JSON.parse(sessionStorage.getItem("vpaffliste"));
          // var dat = new Date($scope.recupereradd[0].EX_EXERCICE)
          if ($scope.recupereradd == undefined || $scope.recupereradd == null || $scope.recupereradd == "") {
              $rootScope.EnregistrementNonReussi(
                "veuillez reessayez svp !!!"
              );
              window.location.href = '#/OutilsEtSecurites/Liste/ListecreationExercice'
          } else {
              $scope.lAnnee = parseInt($scope.recupereradd[0].EX_EXERCICE) + 1


              // $scope.FormAddExercice.DateDepremierejournee = $scope.recupereradd[0].JT_DATEDEBUTPREMIEREXERCICE;
              $scope.FormAddExercice.Datededebut = "01-01-" + $scope.lAnnee
              //$scope.recupereradd[0].EX_DATEDEBUT;
              $scope.FormAddExercice.Datedefin = "31-12-" + $scope.lAnnee
              //$scope.recupereradd[0].EX_DATEFIN;
              $scope.FormAddExercice.Exercice = $scope.lAnnee
          }

          //$scope.recupereradd[0].EX_EXERCICE;
          $scope.$emit("UNLOAD");
      };

      $scope.initFormAddmodifExecice = function () {
          $scope.$emit("LOAD");
          $scope.retourModif();
          $scope.$emit("UNLOAD");
      };
      /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

      //debut Developpement  Anicette

      //debut recuperer id pour la suppression du contrat
      $scope.supprRecupererIdElement = function (recupId) {
          $scope.idElement = recupId;
      };
      //fin recuperer id pour la suppression du contrat

      //debut  suppression
      $scope.supprimeExercice = function () {
          $scope.$emit("LOAD");
          $scope.objet_envoie = [
            {

                "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
                "EX_EXERCICE": $scope.idElement,
                "SL_LIBELLEECRAN": "Saisie de Continent",
                "SL_LIBELLEMOUCHARD": "INSERTIONS",
                "TYPEOPERATION": "2",
                "LG_CODELANGUE": "fr",
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
              "/Exercice/DELETEExercice/",
              $scope.objet_envoie,
              {
                  //headers: $scope.headers
              }
            )
            .then(function (reponse) {
                $scope.testSuppressionExercice = reponse.data;
                console.log($scope.testSuppressionExercice);
                if (
                  $scope.testSuppressionExercice[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                    $scope.$emit("UNLOAD");
                    $rootScope.SuppressionReussie(
                      $scope.testSuppressionExercice[0].clsObjetRetour.SL_MESSAGE
                    );
                    $scope.listeCreationExercice[0].clsObjetRetour.SL_RESULTAT =
                      "FALSE";
                    $scope.rechargePage();
                } else {
                    $scope.$emit("UNLOAD");
                    $rootScope.SuppressionNonReussie(
                      $scope.testSuppressionExercice[0].clsObjetRetour.SL_MESSAGE
                    );
                }
            })
            .catch(function () {
                $scope.$emit("UNLOAD");
                $rootScope.ProblemeServeur(
                  $scope.testSuppressionExercice[0].clsObjetRetour.SL_MESSAGE
                );
            });
      };
      //Fin  suppression

      $scope.desactiverChampRequisfromExercice = function () {
          $(document).ready(function () {
              $("#addDateDepremierejournee").focusin(function () {
                  $(this).css("background-color", "#FFFFFF");
              });
              $("#addDatedefin").focusin(function () {
                  $(this).css("background-color", "#FFFFFF");
              });
              $("#addDateDeDebut").focusin(function () {
                  $(this).css("background-color", "#FFFFFF");
              });
              $("#addExercice").focusin(function () {
                  $(this).css("background-color", "#FFFFFF");
              });

          });
      };



      //Debut Liste CREATION JOURNEE DE TRAVAIL
      $scope.afficheListExercice = function () {
          $scope.$emit("LOAD");
          // console.log($rootScope.DATE_EXERCICE);
          $scope.objet_envoie = [
            {

                "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
                "SL_LIBELLEECRAN": "Saisie de Continent",
                "SL_LIBELLEMOUCHARD": "INSERTIONS",
                "TYPEOPERATION": "1",
                "LG_CODELANGUE": "fr",
                clsObjetEnvoi: {
                    OE_A: $rootScope.CODE_AGENCE,
                    OE_Y: $rootScope.CODE_OPERATEUR,
                    OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                    OE_E: $rootScope.CODE_ENTREPOT,
                },
            },
          ];

          $http
            .post("/Exercice/SELECTExercice/", $scope.objet_envoie, {
                //headers: $scope.headers
            })
            .then(function (reponse) {
                $scope.$emit("UNLOAD");
                $scope.listeCreationExercice = reponse.data;
                $scope.nombreInfoBulle = $scope.listeCreationExercice.length;
                console.log($scope.listeCreationExercice);
                if (
                  $scope.listeCreationExercice[0].clsObjetRetour.SL_RESULTAT ==
                  "TRUE"
                ) {
                    $scope.$emit("UNLOAD");

                    sessionStorage.setItem("vpaffliste", JSON.stringify($scope.listeCreationExercice));

                    $scope.verouadd = false
                } else {
                    $scope.$emit("UNLOAD");
                    $scope.verouadd = true
                    $rootScope.MessageDesListes(
                      $scope.listeCreationExercice[0].clsObjetRetour.SL_MESSAGE
                    );
                }
            });
      };
      //Fin Liste CREATION JOURNEE DE TRAVAIL

      //Debut Liste CREATION JOURNEE DE TRAVAIL
      $scope.ajoutFormAddExercice = function () {
          $scope.$emit("LOAD");
          let typeDate =
          /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
          $scope.recupererinfo[0] = JSON.parse(
            sessionStorage.getItem("modifExercice")
            );

          if ($scope.FormAddExercice.DateDepremierejournee !== undefined || $scope.FormAddExercice.DateDepremierejournee !== "") {
              var periodeDu = $scope.FormAddExercice.DateDepremierejournee
              $scope.lAnneePeriodeDu = periodeDu.substr(6, 4);
              $scope.leMoisPeriodeDu = periodeDu.substr(3, 2);
              $scope.leJourPeriodeDu = periodeDu.substr(0, 2);
          }

          $scope.desactiverChampRequisfromExercice()
          if (
            $scope.FormAddExercice.Datededebut == "" || $scope.FormAddExercice.Datededebut == undefined ||
            $scope.FormAddExercice.Exercice == "" || $scope.FormAddExercice.Exercice == undefined ||
            $scope.FormAddExercice.Datedefin == "" || $scope.FormAddExercice.Datedefin == undefined ||
            $scope.FormAddExercice.DateDepremierejournee == "" || $scope.FormAddExercice.DateDepremierejournee == undefined
            ) {
              $(document).ready(function () {
                  if (
                    $scope.FormAddExercice.Datededebut === "" ||
                    $scope.FormAddExercice.Datededebut === undefined
                  ) {
                      $("#addExercice").css("background-color", "#FFE9E0");
                  }
                  if (
                    $scope.FormAddExercice.Datedefin === "" ||
                    $scope.FormAddExercice.Datedefin === undefined
                  ) {
                      $("#addDateDeDebut").css("background-color", "#FFE9E0");
                  }
                  if (
                    $scope.FormAddExercice.DateDepremierejournee === "" ||
                    $scope.FormAddExercice.DateDepremierejournee === undefined
                  ) {
                      $("#addDatedefin").css("background-color", "#FFE9E0");
                  }
                  if (
                    $scope.FormAddExercice.Exercice === "" ||
                    $scope.FormAddExercice.Exercice === undefined
                  ) {
                      $("#addDateDepremierejournee").css("background-color", "#FFE9E0");
                  }
                  $scope.$emit("UNLOAD");
                  $rootScope.ChampsNonRenseignes();
              });
          } else if (typeDate.test($scope.FormAddExercice.DateDepremierejournee) == false) {
              $scope.$emit("UNLOAD");
              $scope.messageErreur = "La date de premiere journee n'est pas correcte";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.anneeBissextile($scope.lAnneePeriodeDu) == true &&
            $scope.leMoisPeriodeDu == "02" &&
            $scope.leJourPeriodeDu > "29"
          ) {
              $scope.$emit("UNLOAD");
              $(document).ready(function () {
                  $("#addDateDepremierejournee").css("background-color", "#FFE9E0");
              });
              $scope.messageErreur = "La date de premiere journee n'est pas valide";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          } else if (
            $scope.anneeBissextile($scope.lAnneePeriodeDu) == false &&
            $scope.leMoisPeriodeDu == "02" &&
            $scope.leJourPeriodeDu > "28"
          ) {
              $scope.$emit("UNLOAD");
              $(document).ready(function () {
                  $("#addDateDepremierejournee").css("background-color", "#FFE9E0");
              });
              $scope.messageErreur = "La date de premiere journee n'est pas valide";
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
                  $("#addDateDepremierejournee").css("background-color", "#FFE9E0");
              });
              $scope.messageErreur = "La date de premiere journee n'est pas valide";
              $rootScope.MessageDerreurDesTypes($scope.messageErreur);
          }
          else {
              // $scope.FormAddExercice.libeXERCICE = 'EXERCICE' + $scope.FormAddExercice.Exercice
              if ($scope.etatForm == 2) {
                  $scope.TYPEOPERATION = "1"
                  $scope.EX_EXERCICE = $scope.recupererinfo[0].EX_EXERCICE
              } else {
                  $scope.TYPEOPERATION = ""
                  $scope.EX_EXERCICE = $scope.FormAddExercice.Exercice
              }
               
              if($scope.FormAddExercice.ExerciceStatut == "" || $scope.FormAddExercice.ExerciceStatut == undefined || $scope.FormAddExercice.ExerciceStatut == null){
                $scope.FormAddExercice.ExerciceStatut = "N"
              }


              $scope.objet_envoie = [
                {
                    "AG_CODEAGENCE": $rootScope.CODE_AGENCE,
                    "EX_EXERCICE": $scope.FormAddExercice.Exercice,
                    "JT_DATEJOURNEETRAVAIL": $scope.FormAddExercice.DateDepremierejournee,
                    "EX_DATEDEBUT": $scope.FormAddExercice.Datededebut,
                    "EX_DATEFIN": $scope.FormAddExercice.Datedefin,
                    "EX_DESCEXERCICE": 'EXERCICE' + $scope.FormAddExercice.Exercice,
                    "EX_ETATEXERCICE": "O",
                    "EX_DATESAISIE": $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                    "EX_DATEDEBUTBILAN": "",
                    "EX_DATEFINBILAN": "",
                     EX_EXERCICEENCOURS: $scope.FormAddExercice.ExerciceStatut,
                    "EX_DATEAFFECTATIONRESULTAT": "",
                    "SL_LIBELLEECRAN": "Saisie de Continent",
                    "SL_LIBELLEMOUCHARD": "INSERTIONS",
                    "TYPEOPERATION": $scope.TYPEOPERATION,
                    "LG_CODELANGUE": "fr",
                    clsObjetEnvoi: {
                        OE_A: $rootScope.CODE_AGENCE,
                        OE_Y: $rootScope.CODE_OPERATEUR,
                        OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                        OE_E: $rootScope.CODE_ENTREPOT,
                    },
                },
              ];

              if ($scope.etatForm == 2) {
                  $http
                  .post("/Exercice/UpdateExercice/", $scope.objet_envoie, {
                      //headers: $scope.headers
                  })
                  .then(function (reponse) {
                      $scope.tablisteCreationExercice = reponse.data;
                      console.log($scope.tablisteCreationExercice);
                      if (
                        $scope.tablisteCreationExercice[0].clsObjetRetour.SL_RESULTAT ==
                        "TRUE"
                      ) {
                          $scope.$emit("UNLOAD");
                          $rootScope.EnregistrementReussi(
                            $scope.tablisteCreationExercice[0].clsObjetRetour.SL_MESSAGE
                          );
                          if ($scope.etatForm == "2") {
                              $scope.RetourSurListe = function () {
                                  window.location.href = "#/OutilsEtSecurites/Liste/ListecreationExercice";
                              };
                              setTimeout($scope.RetourSurListe, 3600);
                          }
                      } else {
                          $scope.$emit("UNLOAD");
                          $rootScope.EnregistrementNonReussi(
                            $scope.tablisteCreationExercice[0].clsObjetRetour.SL_MESSAGE
                          );
                      }
                  })
                  .catch(function () {
                      $scope.$emit("UNLOAD");
                      $rootScope.ProblemeServeur();
                  });
              } else {
                  $http
                  .post("/Exercice/AjoutExercice/", $scope.objet_envoie, {
                      //headers: $scope.headers
                  })
                  .then(function (reponse) {
                      $scope.tablisteCreationExercice = reponse.data;
                      console.log($scope.tablisteCreationExercice);
                      if (
                        $scope.tablisteCreationExercice[0].clsObjetRetour.SL_RESULTAT ==
                        "TRUE"
                      ) {
                          $scope.$emit("UNLOAD");
                          $rootScope.EnregistrementReussi(
                            $scope.tablisteCreationExercice[0].clsObjetRetour.SL_MESSAGE
                          );
                          $scope.FormAddExercice.DateDepremierejournee = ""
                          // $scope.resetFormAddCreationJrneeTravail();
                      } else {
                          $scope.$emit("UNLOAD");
                          $rootScope.EnregistrementNonReussi(
                            $scope.tablisteCreationExercice[0].clsObjetRetour.SL_MESSAGE
                          );
                      }
                  })
                  .catch(function () {
                      $scope.$emit("UNLOAD");
                      $rootScope.ProblemeServeur("veuillez reessayez svp !!!");
                  });
              }

          }

      };
      //Fin Liste CREATION JOURNEE DE TRAVAIL
      $scope.voirModification = function (info) {
          sessionStorage.setItem("modifExercice", JSON.stringify(info));
          window.location.href = "#/outils&securites/enregistrement/ModificationExercice";
      }

      $scope.voirPlus = function (info) {
          sessionStorage.setItem("vpinfo", JSON.stringify(info));
          $scope.recuperer = JSON.parse(sessionStorage.getItem("vpinfo"));
      }



      $scope.retourModif = function () {
          $scope.etatForm = "2";
          $scope.isDisabled = true;
          $scope.verouform = false
          $scope.recupererinfo[0] = JSON.parse(
            sessionStorage.getItem("modifExercice")
          );
          console.log($scope.recupererinfo[0]);
          $scope.FormAddExercice.ExerciceStatut = $scope.recupererinfo[0].EX_EXERCICEENCOURS;
          $scope.FormAddExercice.DateDepremierejournee = $scope.recupererinfo[0].JT_DATEJOURNEETRAVAIL;
          $scope.FormAddExercice.Datededebut =
            $scope.recupererinfo[0].EX_DATEDEBUT;
          $scope.FormAddExercice.Datedefin =
            $scope.recupererinfo[0].EX_DATEFIN;
          $scope.FormAddExercice.Exercice =
            $scope.recupererinfo[0].EX_EXERCICE;

      };


      //fin Developpement Anicette
  },
]);
