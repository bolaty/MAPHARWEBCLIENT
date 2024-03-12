MapharApp.controller("BanqueAgenceController", [
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
    $rootScope.infocontrat = angular.fromJson(
      localStorage.getItem("vpOpMultirisqueProinfocontrat")
    );
    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    /*DEBUT ZONE DE DECLARATION OVER*/
    $scope.FormAddBanqueAgence = {
      Code: "",
      Abrege:"",
      CodeBIC: "",
      IntitulE: "",
      pays:"",
      ville: "",
      commune: "",
      Telephone:"",
      Fax: "",
      Email: "",
      Boitepostale:"",
      Siteweb: "",
      AutreInfos: "",
      Sigle: "",
      RaisonSociale: ""
    };

    $scope.FormListe = {
      periodeDu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      periodeAu: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
      Libelle: "",
      
    };

    $scope.listeDesSinistreOuvertureDSP = [];
    $scope.listeSuiviSinistres = [];
    $scope.listeOuvertureDSP = [];
    $scope.modiftestEnregistrement = [];
    $scope.modifListeVille = [];
    $scope.modifListeCommune = [];
    $scope.testEnregistrement = [];
    $scope.idElement2 = "";
    $scope.idElement3 = "";
    $scope.listesinistre = [];
    $scope.recuperation = [];
    $scope.listeBanque= [];
    $scope.statutAgenceBanque = true
    $scope.LibForm = "";


    $scope.listeDesPaysAuto = [];
    $scope.listeDesVillesAuto = [];
    $scope.listeDesCommunesAuto = [];


    $scope.listeBanqueAG = [];
    $scope.recuperer2 = [];
    $scope.idElement2 = ""
    $scope.idElement3 = ""
    $scope.libellebanq = ""
    //$scope.headers = tokenService.getToken(); // Attribution d'un tokken

    /*FIN ZONE DE DECLARATION*/
    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

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

    $scope.desactiverChampRquis = function () {
      $(document).ready(function () {
        $("#addRaisonSociale").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSigle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

    $scope.desactiverChampRquis2 = function () {
      $(document).ready(function () {
        $("#addAbrege").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSigle").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addIntitulE").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addBoitepostale").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addTelephone").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addFax").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addBIC").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addSiteweb").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAutreInfos").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Pays").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Ville").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#addAuto_Commune").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };

   
    //debut focus sur le champ
    $scope.desactiverChampRequisListe = function () {
      $(document).ready(function () {
        $("#idperiodeDu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
        $("#idperiodeAu").focusin(function () {
          $(this).css("background-color", "#FFFFFF");
        });
      });
    };
    //fin focus sur le champ

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

    //debut notification champs non renseigné

    //fin notification champs non renseigné
    $scope.SelectBanque = function (infoBanque) {
      $scope.libellebanq = infoBanque.BQ_RAISONSOCIAL
      localStorage.setItem("saveInfolibelleBanque", JSON.stringify(infoBanque));
      localStorage.setItem("saveInfoBanque", JSON.stringify('0'));
      $scope.statutAgenceBanque = false
      $scope.afficheListeAgence(infoBanque.BQ_CODEBANQUE)
    };

    $scope.RetourBanque = function () {
      $scope.statutAgenceBanque = true
    };
  

    
    $scope.initFormBanque = function (info) {
      $scope.afficheListePaysAuto($rootScope.PAYSPARDEFAUT);
     
      $scope.verouVille = true;
      $scope.verouCommune = true;
      if(info == '1'){
        $scope.statutAgenceBanque = true
        window.location.href = "#/Template/ParametreI/EnregistrementBanqueAgence";
        localStorage.setItem("saveInfoBanque", JSON.stringify(info));
      }else{
        $scope.statutAgenceBanque = false
        window.location.href = "#/Template/ParametreI/EnregistrementBanqueAgence";
        localStorage.setItem("saveInfoBanque", JSON.stringify(info));
      }
      $scope.FormAddBanqueAgence.pays = $rootScope.PAYSPARDEFAUT
       $scope.FormAddBanqueAgence.ville = $rootScope.VILLEPARDEFAUT
     
    };

    $scope.initBanqueForm = function () {
      var res = JSON.parse(localStorage.getItem("saveInfoBanque"));
      if(res == '1'){
        $scope.statutAgenceBanque = true
        $scope.LibForm = "Banque";
      }else{
        var retourlib = JSON.parse(localStorage.getItem("saveInfolibelleBanque"));
        $scope.libellebanq =  retourlib.BQ_RAISONSOCIAL
        $scope.statutAgenceBanque = false
        $scope.LibForm = "Agence";
        $scope.afficheListePaysAuto($rootScope.PAYSPARDEFAUT);
     
        $scope.verouVille = true;
        $scope.verouCommune = true;
        $scope.FormAddBanqueAgence.pays = $rootScope.PAYSPARDEFAUT
        $scope.FormAddBanqueAgence.ville = $rootScope.VILLEPARDEFAUT
        $scope.afficheListeCommuneAuto($rootScope.VILLEPARDEFAUT);
        
      }
     
    };
    //debut recharge page
    $scope.rechargePage = function () {
      $window.location.reload();
    };
    //debut recharge page

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    //debut initialisation add modif
    $scope.initFormAddModif = function () {

      $scope.$emit("LOAD");
      $scope.verouVille = true;
      $scope.verouCommune = true;
      $scope.retourModifODSP();
      $scope.$emit("UNLOAD");
     
    };
    //fin initialisation add modif
    $scope.initFormAddListe = function () {
      $scope.$emit("LOAD");
      $scope.afficheListe();
      $scope.$emit("UNLOAD");
    };
    
  
    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV OVER*/

   
    //debut liste des pays
    $scope.afficheListePaysAuto = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesPaysAuto = reponse.data;
          if (
            $scope.listeDesPaysAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeVilleAuto($rootScope.PAYSPARDEFAUT);
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesPaysAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays

    //debut liste des pays
    $scope.afficheListePaysModif = function () {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: "",
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesPaysAuto = reponse.data;
          if (
            $scope.listeDesPaysAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.afficheListeVilleAutoModif(
              $scope.recuperer.PY_CODEPAYS
            );
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.MessageDesListes(
              $scope.listeDesPaysAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesPaysAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des pays
    
    //debut liste des villes
    $scope.afficheListeVilleAuto = function (idpays) {
      $scope.listeDesCommunesAuto = [];
      $scope.FormAddBanqueAgence.commune = "";
      //$scope.FormAddBanqueAgence.ville = "";
      $scope.verouVille = true;
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesVillesAuto = reponse.data;
          if (
            $scope.listeDesVillesAuto[0].clsObjetRetour.SL_RESULTAT === "FALSE"
          ) {
            $scope.verouVille = true;
          } else {
            $scope.verouVille = false;
          }
        });
    };

    //debut liste des communes
    $scope.afficheListeCommuneAuto = function (idville) {
      $scope.FormAddBanqueAgence.commune = "";
      $scope.verouCommune = true;
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesCommunesAuto = reponse.data;
          if (
            $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_RESULTAT ===
            "FALSE"
          ) {
            $scope.verouCommune = true;
          } else {
            $scope.verouCommune = false;
          }
        });
    };


    $scope.afficheListeVilleAutoModif = function (idpays) {
      $scope.objet_envoie = [
        {
          PY_CODEPAYS: idpays,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesVillesAuto = reponse.data;
          if (
            $scope.listeDesVillesAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.verouVille = false;
            $scope.afficheListeCommuneAutoModif(
              $scope.recuperer.VL_CODEVILLE
            );
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouVille = true;
            $rootScope.MessageDesListes(
              $scope.listeDesVillesAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesVillesAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesVillesAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des villes

   

    $scope.afficheListeCommuneAutoModif = function (idville) {
      $scope.objet_envoie = [
        {
          VL_CODEVILLE: idville,
          SL_LIBELLEECRAN: "ECRAN AUTO",
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
          $scope.listeDesCommunesAuto = reponse.data;
          if (
            $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_RESULTAT === "TRUE"
          ) {
            $scope.leChargement = false;
            $scope.verouCommune = false;
            $scope.$emit("UNLOAD");
          } else {
            $scope.$emit("UNLOAD");
            $scope.verouCommune = true;
            $rootScope.MessageDesListes(
              $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_MESSAGE
            );
          }
          console.log($scope.listeDesCommunesAuto);
        })
        .catch(function () {
          $scope.$emit("UNLOAD");
          $rootScope.ProblemeServeur(
            $scope.listeDesCommunesAuto[0].clsObjetRetour.SL_MESSAGE
          );
        });
    };
    //fin liste des communes


    //fin contrainte sur les champs list
    //debut rafraichir les champs de la fenetre d'enregistrement
    $scope.resetFormAddBanqueAgence = function () {
      $scope.$emit("LOAD");
      $scope.FormAddBanqueAgence = {
        Code: "",
        Abrege:"",
        CodeBIC: "",
        IntitulE: "",
        pays:"",
        ville: "",
        commune: "",
        Telephone:"",
        Fax: "",
        Email: "",
        Boitepostale:"",
        Siteweb: "",
        AutreInfos: "",
        Sigle: "",
        RaisonSociale: ""
      };
      $scope.$emit("UNLOAD");
     
    };
    //fin rafraichir les champs de la fenetre d'enregistrement

   
  
    //debut acceder a la page de suivi
    $scope.voirmodifexpert = function (infos, info) {
      $scope.statutAgenceBanque = true
      localStorage.setItem("saveInfoBanque", JSON.stringify(info));
      localStorage.setItem("modifODs", JSON.stringify(infos));
      window.location.href = "#/Template/ParametreI/ModificationBanqueAgence";
    };
    //fin acceder a la page desuivi

    //debut acceder a la page de suivi
     $scope.voirmodifexpert2 = function (infos, info) {
          $scope.statutAgenceBanque = false // juste
          localStorage.setItem("saveInfoBanque", JSON.stringify(info));
          localStorage.setItem("modifODs", JSON.stringify(infos));
          window.location.href = "#/Template/ParametreI/ModificationBanqueAgence";
      };
        //fin acceder a la page desuivi

    //Debut ajout Suivi Dossier
    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddBanqueAgence = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis();
     // $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));
      $scope.recuperation = angular.fromJson(localStorage.getItem("modifODs"));
      console.log($scope.recuperation);
    
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
      
     
      if (
       
        $scope.FormAddBanqueAgence.RaisonSociale === "" ||
        $scope.FormAddBanqueAgence.RaisonSociale === undefined || 
        $scope.FormAddBanqueAgence.Sigle === "" ||
        $scope.FormAddBanqueAgence.Sigle === undefined 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          
          if (
            $scope.FormAddBanqueAgence.RaisonSociale === "" ||
            $scope.FormAddBanqueAgence.RaisonSociale === undefined
          ) {
            $("#addRaisonSociale").css("background-color", "#FFE9E0");
          }else if(
            $scope.FormAddBanqueAgence.Sigle === "" ||
            $scope.FormAddBanqueAgence.Sigle === undefined){
              $("#addSigle").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      }  else {
        if ($scope.etatForm == "2") {
          $scope.indexBanque = $scope.recuperation.BQ_CODEBANQUE;
          $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "INSERTIONS";
        }
        if( $scope.indexBanque == undefined){
          $scope.indexBanque =""
        }
        $scope.objet_envoie = [
          {
            "BQ_CODEBANQUE":$scope.indexBanque,
            "BQ_RAISONSOCIAL": $scope.FormAddBanqueAgence.RaisonSociale,
            "BQ_SIGLE": $scope.FormAddBanqueAgence.Sigle,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD":"INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE":"fr",
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
            .post("/Banque/AjoutSaisieBanque/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation=[]
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.resetFormAddBanqueAgence();

                //  $scope.initFormAddExpert()
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/Banque/ModifSaisieBanque/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation=[]
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href = "#/Template/ParametreI/ListeBanqueAgence";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                }
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout Suivi Dossier (contrat)

    $scope.test = [];
    $scope.testEnregistrement = [];
    $scope.ajoutFormAddBanqueAgence2 = function () {
      $scope.$emit("LOAD");
      $scope.desactiverChampRquis2();
     // $scope.recuperer = JSON.parse(sessionStorage.getItem("modifOD"));
      $scope.recuperation = angular.fromJson(localStorage.getItem("modifODs"));
      if($scope.recuperation == null || $scope.recuperation == "" || $scope.recuperation == undefined){
        $scope.recuperation = angular.fromJson(localStorage.getItem("saveInfolibelleBanque"));
      }
      console.log($scope.recuperation);
    
        let typenumerotelephone = /^(0|[0-9]\d*)$/;
      
     
      if (
        $scope.FormAddBanqueAgence.Abrege === "" ||
        $scope.FormAddBanqueAgence.Abrege === undefined || 
        $scope.FormAddBanqueAgence.IntitulE === "" ||
        $scope.FormAddBanqueAgence.IntitulE === undefined || 
        $scope.FormAddBanqueAgence.Boitepostale === "" ||
        $scope.FormAddBanqueAgence.Boitepostale === undefined || 
        $scope.FormAddBanqueAgence.Telephone === "" ||
        $scope.FormAddBanqueAgence.Telephone === undefined || 
        $scope.FormAddBanqueAgence.Fax === "" ||
        $scope.FormAddBanqueAgence.Fax === undefined || 
        $scope.FormAddBanqueAgence.CodeBIC === "" ||
        $scope.FormAddBanqueAgence.CodeBIC === undefined || 
        $scope.FormAddBanqueAgence.Siteweb === "" ||
        $scope.FormAddBanqueAgence.Siteweb === undefined || 
        $scope.FormAddBanqueAgence.AutreInfos === "" ||
        $scope.FormAddBanqueAgence.AutreInfos === undefined || 
        $scope.FormAddBanqueAgence.commune === "" ||
        $scope.FormAddBanqueAgence.commune === undefined 
      ) {
        $scope.$emit("UNLOAD");
        $(document).ready(function () {
          if (
            $scope.FormAddBanqueAgence.Abrege === "" ||
            $scope.FormAddBanqueAgence.Abrege === undefined
          ) {
            $("#addAbrege").css("background-color", "#FFE9E0");
          }
          
          if (
            $scope.FormAddBanqueAgence.IntitulE === "" ||
            $scope.FormAddBanqueAgence.IntitulE === undefined
          ) {
            $("#addIntitulE").css("background-color", "#FFE9E0");
          }
          if(
            $scope.FormAddBanqueAgence.Boitepostale === "" ||
            $scope.FormAddBanqueAgence.Boitepostale === undefined){
              $("#addBoitepostale").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddBanqueAgence.Telephone === "" ||
            $scope.FormAddBanqueAgence.Telephone === undefined
          ) {
            $("#addTelephone").css("background-color", "#FFE9E0");
          }
          if(
            $scope.FormAddBanqueAgence.Fax === "" ||
            $scope.FormAddBanqueAgence.Fax === undefined){
              $("#addFax").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddBanqueAgence.CodeBIC === "" ||
            $scope.FormAddBanqueAgence.CodeBIC === undefined
          ) {
            $("#addBIC").css("background-color", "#FFE9E0");
          }
          if(
            $scope.FormAddBanqueAgence.Siteweb === "" ||
            $scope.FormAddBanqueAgence.Siteweb === undefined){
              $("#addSiteweb").css("background-color", "#FFE9E0");
          }
          if (
            $scope.FormAddBanqueAgence.AutreInfos === "" ||
            $scope.FormAddBanqueAgence.AutreInfos === undefined
          ) {
            $("#addAutreInfos").css("background-color", "#FFE9E0");
          }
          if(
            $scope.FormAddBanqueAgence.pays === "" ||
            $scope.FormAddBanqueAgence.pays === undefined){
              $("#addAuto_Pays").css("background-color", "#FFE9E0");
          }
          if(
            $scope.FormAddBanqueAgence.ville === "" ||
            $scope.FormAddBanqueAgence.ville === undefined){
              $("#addAuto_Ville").css("background-color", "#FFE9E0");
          }
          if(
            $scope.FormAddBanqueAgence.commune === "" ||
            $scope.FormAddBanqueAgence.commune === undefined){
              $("#addAuto_Commune").css("background-color", "#FFE9E0");
          }
        });
        $rootScope.ChampsNonRenseignes();
      }  else {
        if ($scope.etatForm == "2") {
          $scope.indexBanque = $scope.recuperation.BQ_CODEBANQUE;
          $scope.indexBanque2 = $scope.recuperation.AB_CODEAGENCEBANCAIRE;
          $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "MODIFICATION";
        } else {
          $scope.indexBanque = $scope.recuperation.BQ_CODEBANQUE;
          $scope.TYPEOPERATION = "";
          $scope.SL_LIBELLEMOUCHARD = "INSERTIONS";
        }
        if( $scope.indexBanque == undefined){
          $scope.indexBanque =""
        }
        if( $scope.indexBanque2 == undefined){
          $scope.indexBanque2 =""
        }
        if( $scope.FormAddBanqueAgence.Email == undefined || $scope.FormAddBanqueAgence.Email == ""){
          $scope.FormAddBanqueAgence.Email = ""
        }
        $scope.objet_envoie = [
          {
            "AB_CODEAGENCEBANCAIRE":$scope.indexBanque2,
            "BQ_CODEBANQUE": $scope.indexBanque,
            "AB_LIBELLE": $scope.FormAddBanqueAgence.IntitulE,
            "AB_ADRESSEGEOGRAPHIQUE": ".",
            "AB_BOITEPOSTALE": $scope.FormAddBanqueAgence.Boitepostale,
            "AB_EMAIL": $scope.FormAddBanqueAgence.Email,
            "AB_TELEPHONE": $scope.FormAddBanqueAgence.Telephone,
            "AB_FAX": $scope.FormAddBanqueAgence.Fax,
            "BQ_ABREGE": $scope.FormAddBanqueAgence.Abrege,//
            "BQ_CODEBIC": $scope.FormAddBanqueAgence.CodeBIC,
            "BQ_SITEWEB": $scope.FormAddBanqueAgence.Siteweb,
            "BQ_AUTREINFOS": $scope.FormAddBanqueAgence.AutreInfos,
            "CO_CODECOMMUNE": $scope.FormAddBanqueAgence.commune,
            "SL_LIBELLEECRAN": "Saisie de Continent",
            "SL_LIBELLEMOUCHARD":"INSERTIONS",
            "TYPEOPERATION": "",
            "LG_CODELANGUE":"fr",
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
            .post("/BanqueAgence/AjoutSaisieBanqueAG/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation=[]
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                $scope.resetFormAddBanqueAgence();

                //  $scope.initFormAddExpert()
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        } else {
          $http
            .post("/BanqueAgence/ModifSaisieBanqueAG/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.recuperation=[]
              $scope.testEnregistrement = reponse.data;
              if (
                $scope.testEnregistrement[0].clsObjetRetour.SL_RESULTAT ==
                "TRUE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
                if ($scope.etatForm == "2") {
                  $scope.RetourSurListe = function () {
                    window.location.href = "#/Template/ParametreI/ListeBanqueAgence";
                  };
                  setTimeout($scope.RetourSurListe, 3600);
                }
              } else {
                $scope.$emit("UNLOAD");
                $rootScope.EnregistrementNonReussi(
                  $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
                );
              }
            })
            .catch(function () {
              $scope.$emit("UNLOAD");
              $rootScope.ProblemeServeur(
                $scope.testEnregistrement[0].clsObjetRetour.SL_MESSAGE
              );
            });
        }
      }
    };
    //Fin ajout Suivi Dossier (contrat)

   
    $scope.voirPlus = function (info) {
      sessionStorage.setItem("vpS", JSON.stringify(info));
      $scope.recuperer = JSON.parse(sessionStorage.getItem("vpS"));
    };
    //fin voir plus

    $scope.voirPlus2 = function (info) {
      sessionStorage.setItem("vpSBanq", JSON.stringify(info));
      $scope.recuperer2 = JSON.parse(sessionStorage.getItem("vpSBanq"));
    };

    //debut acceder a la page de modification 2
    $scope.retourModifODSP = function () {
      $scope.etatForm = "2";
      var res = JSON.parse(localStorage.getItem("saveInfoBanque"));
      $scope.recuperer = JSON.parse(localStorage.getItem("modifODs"));
      if(res == '1'){
        $scope.statutAgenceBanque = true
        $scope.LibForm = "Banque";
        $scope.FormAddBanqueAgence.Code = $scope.recuperer.BQ_CODEBANQUE;
        $scope.FormAddBanqueAgence.RaisonSociale =
          $scope.recuperer.BQ_RAISONSOCIAL;
          $scope.FormAddBanqueAgence.Sigle =
          $scope.recuperer.BQ_SIGLE;
      }else{
        $scope.statutAgenceBanque = false
        $scope.LibForm = "Agence";
        $scope.FormAddBanqueAgence.Code = $scope.recuperer.AB_CODEAGENCEBANCAIRE;
        $scope.FormAddBanqueAgence.RaisonSociale = $scope.recuperer.AG_RAISONSOCIALE;
        $scope.FormAddBanqueAgence.Abrege = $scope.recuperer.BQ_ABREGE;
        $scope.FormAddBanqueAgence.pays = $scope.recuperer.PY_CODEPAYS;
        $scope.FormAddBanqueAgence.ville = $scope.recuperer.VL_CODEVILLE;
        $scope.FormAddBanqueAgence.commune = $scope.recuperer.CO_CODECOMMUNE;
        $scope.afficheListePaysModif();
        $scope.FormAddBanqueAgence.IntitulE = $scope.recuperer.AB_LIBELLE;
        $scope.FormAddBanqueAgence.Boitepostale = $scope.recuperer.AB_BOITEPOSTALE;
        $scope.FormAddBanqueAgence.Email = $scope.recuperer.AB_EMAIL;    
        $scope.FormAddBanqueAgence.Telephone = $scope.recuperer.AB_TELEPHONE;       
        $scope.FormAddBanqueAgence.Fax = $scope.recuperer.AB_FAX; 
        $scope.FormAddBanqueAgence.Sigle = $scope.recuperer.BQ_ABREGE;     
        $scope.FormAddBanqueAgence.CodeBIC = $scope.recuperer.BQ_CODEBIC;   
        $scope.FormAddBanqueAgence.Siteweb = $scope.recuperer.BQ_SITEWEB;      
        $scope.FormAddBanqueAgence.AutreInfos = $scope.recuperer.BQ_AUTREINFOS; 
      }
      
    };
    //fin acceder a la page de modification 2

    //debut recuperer id pour la suppression
    $scope.supprRecupererIdElement = function (recupId) {
      $scope.idElement = recupId;
    };
    //fin recuperer id pour la suppression

     //debut recuperer id pour la suppression
     $scope.supprRecupererIdElement2 = function (recupId,recupId2) {
      $scope.idElement2 = recupId;
      $scope.idElement3 = recupId2;
    };
    //fin recuperer id pour la suppression

    //debut recuperer id pour la suppression
    $scope.testSuppression = [];
    $scope.supprimeMarque = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          "BQ_CODEBANQUE": $scope.idElement,
          "SL_LIBELLEECRAN": "Saisie de Continent",
          "SL_LIBELLEMOUCHARD":"INSERTIONS",
          "TYPEOPERATION": "",
          "LG_CODELANGUE":"fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        },
      ];

      $http
        .post("/Banque/SuppressionBanque/", $scope.objet_envoie, {
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
            $scope.listeBanque[0].clsObjetRetour.SL_RESULTAT = "FALSE";
            $scope.afficheListe()
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
    //fin recuperer id pour la suppression
    $scope.testSuppression2 = [];
    $scope.supprimeMarque2 = function () {
      $scope.$emit("LOAD");
      $scope.objet_envoie = [
        {
          
          "AB_CODEAGENCEBANCAIRE": $scope.idElement2,
          "BQ_CODEBANQUE": $scope.idElement3,
          "SL_LIBELLEECRAN": "Saisie de Continent",
          "SL_LIBELLEMOUCHARD":"INSERTIONS",
          "TYPEOPERATION": "",
          "LG_CODELANGUE":"fr",
          clsObjetEnvoi: {
            OE_A: $rootScope.CODE_AGENCE,
            OE_Y: $rootScope.CODE_OPERATEUR,
            OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
            OE_E: $rootScope.CODE_ENTREPOT,
          },
        },
      ];

      $http
        .post("/BanqueAgence/SuppressionBanqueAG/", $scope.objet_envoie, {
          //headers: $scope.headers
        })
        .then(function (reponse) {
          $scope.testSuppression2 = reponse.data;
          console.log($scope.testSuppression2);
          if ($scope.testSuppression2[0].clsObjetRetour.SL_RESULTAT == "TRUE") {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionReussie(
              $scope.testSuppression2[0].clsObjetRetour.SL_MESSAGE
            );
            $scope.testSuppression2[0].clsObjetRetour.SL_RESULTAT = "FALSE";
            $scope.afficheListeAgence()
          } else {
            $scope.$emit("UNLOAD");
            $rootScope.SuppressionNonReussie(
              $scope.testSuppression2[0].clsObjetRetour.SL_MESSAGE
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
   
   
      //affichage de la liste des sinstres
      $scope.afficheListe = function (
      
      ) {
        $scope.$emit("LOAD");
        
          $scope.objet_envoie = [
            {
              "SL_LIBELLEECRAN": "Saisie de Continent",
              "SL_LIBELLEMOUCHARD":"INSERTIONS",
              "TYPEOPERATION": "",
              "LG_CODELANGUE":"fr",
              clsObjetEnvoi: {
                OE_A: $rootScope.CODE_AGENCE,
                OE_Y: $rootScope.CODE_OPERATEUR,
                OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                OE_E: $rootScope.CODE_ENTREPOT,
              },
            },
          ];

          $http
            .post("/Banque/ListeBanques/", $scope.objet_envoie, {
              //headers: $scope.headers
            })
            .then(function (reponse) {
              $scope.$emit("UNLOAD");
              $scope.listeBanque = reponse.data;
              console.log($scope.listeBanque);
              if (
                $scope.listeBanque[0].clsObjetRetour.SL_RESULTAT === "FALSE"
              ) {
                $scope.$emit("UNLOAD");
                $rootScope.MessageDesListes(
                  $scope.listeBanque[0].clsObjetRetour.SL_MESSAGE
                );
              }
            });
        
      };
      //fin
   

      //affichage de la liste des sinstres
      $scope.afficheListeAgence = function (id ) {
          $scope.$emit("LOAD");
          
            $scope.objet_envoie = [
              {
                "BQ_CODEBANQUE": id,
                "SL_LIBELLEECRAN": "Saisie de Continent",
                "SL_LIBELLEMOUCHARD":"INSERTIONS",
                "TYPEOPERATION": "",
                "LG_CODELANGUE":"fr",
                clsObjetEnvoi: {
                  OE_A: $rootScope.CODE_AGENCE,
                  OE_Y: $rootScope.CODE_OPERATEUR,
                  OE_J: $rootScope.DATE_JOURNEE_DE_TRAVAIL,
                  OE_E: $rootScope.CODE_ENTREPOT,
                },
              },
            ];
        
            $http
              .post("/BanqueAgence/ListeeBanqueAG/", $scope.objet_envoie, {
                //headers: $scope.headers
              })
              .then(function (reponse) {
                $scope.$emit("UNLOAD");
                $scope.listeBanqueAG = reponse.data;
                console.log($scope.listeBanqueAG);
                if (
                  $scope.listeBanqueAG[0].clsObjetRetour.SL_RESULTAT === "FALSE"
                ) {
                  $scope.$emit("UNLOAD");
                  $rootScope.MessageDesListes(
                    $scope.listeBanqueAG[0].clsObjetRetour.SL_MESSAGE
                  );
                }
              });
          
        };
        //fin




    /*FIN DEV OVER*/
  },
]);
