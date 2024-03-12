var MapharApp = angular.module("appGestion", ["ngRoute", "ngCookies"]);

MapharApp.run([
  "$rootScope",
  "$templateCache",
  "$location",
  "$cookies",
  function ($rootScope, $templateCache, $location, $cookies) {
    $rootScope.menu = "";
    $rootScope.OperateurEnCoursEcran = []
    /****************************/

    $rootScope.$on("$locationChangeStart", function () {
      $cookies.remove("user1");
      var gestion = "/gestion/tableau-de-bord";
      var assurances = "/assurances/tableau-de-bord";
      var grh = "/grh/tableau-de-bord";
      var assurances_gestion = "/assurances-gestion/tableau-de-bord";

      if ($location.path() == "/") {
        var b = $cookies.get("user");
        if (b !== undefined) {
          $cookies.remove("user1");
          $cookies.remove("user");
          var i = 0;
          i++;
          if ((i = 1)) {
            $rootScope.$on("$viewContentLoaded", function () {
              $templateCache.removeAll();
            });
            parent.location.reload();
            return;
          }
        }
      } else if ($location.path() !== "/assistance-mode") {
        $cookies.put("user1", $cookies.get("user"));
      }
      var b = $cookies.get("user");
      if ($location.path() !== "/" && b === undefined) {
        $rootScope.user = {};
        $location.path("/");
      }
    });

    // temps d'inactivite
    var idleTime = 0;
    $(document).ready(function () {
      //Increment the idle time counter every minute.
      var idleInterval = setInterval(timerIncrement, 1000); // 1 minute
      // console.log(idleInterval);

      //Zero the idle timer on mouse movement.
      $(this).mousemove(function (e) {
        idleTime = 0;
      });
      $(this).keypress(function (e) {
        idleTime = 0;
      });
    });

    function timerIncrement() {
      idleTime = idleTime + 1;
      // deconnexion apres 5mins
      if (idleTime > 14400) {
        // console.log(idleTime);
        $cookies.remove("user1");
        $cookies.remove("user");

        // vider les espaces de rangement
        localStorage.clear();
        sessionStorage.clear();

        // redirection sur la page de connexion
        window.location.href = "#/";

        // rechargement de la page
        parent.location.reload();
      }
    }
    //fin temps d'inactivite

    /**   DECLARATION DES VARIABLES DE GESTION DES DROITS DES ECRAN        ***/
    $rootScope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );
    $rootScope.StatutSinistre = ""

    $rootScope.TIERS_GENERALE_ETIERS = true;
    $rootScope.TRESORERIE_GENERALE_ETRSO = true;
    $rootScope.PARAMETRE_I_GENERALE_EPARAMI = true;
    $rootScope.PARAMETRE_II_GENERALE_EPARAMII = true;
    $rootScope.ASSURANCE_GENERALE_EASSUR = true;
    $rootScope.COMPTABILITE_GENERALE_COMPTA = true;
    $rootScope.OUTILS_ET_SECURITE_GENERALE_OUTILSECUR = true;


    // ECRAN TIERS
 /*   $rootScope.chargementDesEcrans2 = function () {  
      if($rootScope.OperateurEnCoursEcran == [] || $rootScope.OperateurEnCoursEcran == undefined || $rootScope.OperateurEnCoursEcran == "" || $rootScope.OperateurEnCoursEcran == undefined || $rootScope.OperateurEnCoursEcran == null){

      }else{
      //TRAITEMENT MENU PRINCIPAUX
      $rootScope.TIERS_GENERALE_ETIERS = false;
      $rootScope.TRESORERIE_GENERALE_ETRSO = false;
      $rootScope.PARAMETRE_I_GENERALE_EPARAMI = false;
      $rootScope.PARAMETRE_II_GENERALE_EPARAMII = false;
      $rootScope.ASSURANCE_GENERALE_EASSUR = false;
      $rootScope.COMPTABILITE_GENERALE_COMPTA = false;
      $rootScope.OUTILS_ET_SECURITE_GENERALE_OUTILSECUR = false;
      for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){

        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '1' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.TIERS_GENERALE_ETIERS = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '2' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.TRESORERIE_GENERALE_ETRSO = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '3' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.PARAMETRE_I_GENERALE_EPARAMI = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '4' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.PARAMETRE_II_GENERALE_EPARAMII = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '5' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.ASSURANCE_GENERALE_EASSUR = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '6' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.COMPTABILITE_GENERALE_COMPTA = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '7' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.OUTILS_ET_SECURITE_GENERALE_OUTILSECUR = true;
        }
      }
        
          
        // ECRAN TIERS
        
        $rootScope.GROUPES_DES_TIERS_ETIERS = false;//
        $rootScope.TIERS_ETIERS = false;//
        $rootScope.PROSPECT_ETIERS = false;//
        $rootScope.SITUATION_DES_TIERS_ETIERS = false;//
        $rootScope.SITUATIONDESASSUREURS_ETIERS = false;
        $rootScope.COMMERCIAUX_ETIERS = false;//
        $rootScope.SITUATION_DES_COMMERCIAUX_ETIERS = false;//
        $rootScope.EDITION_ETIERS = false;//
        $rootScope.SAIASSUR_ETIERS = true;
          
        for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){

          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '8' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GROUPES_DES_TIERS_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '9' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TIERS_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '10' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PROSPECT_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '11' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SITUATION_DES_TIERS_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '12' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.COMMERCIAUX_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '13' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SITUATION_DES_COMMERCIAUX_ETIERS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '14' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.EDITION_ETIERS = true;
          }
        }  
          

          // ECRAN TRESORERIE
          
          $rootScope.OPERATION_DE_TRESORERIE_ETRSO = false;//P
          $rootScope.OPERATION_DE_TRESORERIEI_ETRSO = false;//S
          $rootScope.OPERATION_DE_TRESORERIE_TIERS_ETRSO = false;//S
          $rootScope.REGLEMENT_ASSURANCE_ETRSO = false;//P
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_ETRSO = false;//S
          $rootScope.HABITAT_ETRSO = false;//S
          $rootScope.INDIVIDUEL_ACCIDENT_ETRSO = false;//S
          $rootScope.AUTO_ETRSO = false;//S
          $rootScope.VOYAGE_ETRSO = false;//S
          $rootScope.RESPONSABILITE_CIVIL_ETRSO = false;//S
          $rootScope.TRANSPORT_ETRSO = false;//S
          $rootScope.SANTER_ETRSO = true;//S
          $rootScope.GESA_ETRSO = false;//S
          $rootScope.PHARMACIEN_ETRSO = false;//S
          $rootScope.AUXILIAIRE_ETRSO = false;//S
          $rootScope.REEDITION_ETRSO = false;//P
          $rootScope.EDITION_ETRSO = false;//P
          //NOUVEAU
          $rootScope.YAFOLO_ETRSO = false;//P
          

          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '30' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.REEDITION_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '31' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_ETRSO = true;
            }
            //MENU DEROULANT

            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '212' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_DE_TRESORERIE_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '213' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.REGLEMENT_ASSURANCE_ETRSO = true;
            }


            //sous menu tresorerie
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '214' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_DE_TRESORERIEI_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '215' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_DE_TRESORERIE_TIERS_ETRSO = true;
            }

            //sous menu reglement
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '216' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.MULTIRISQUE_PROFFESSIONELLE_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '217' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.HABITAT_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '218' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.INDIVIDUEL_ACCIDENT_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '420' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUTO_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '421' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.VOYAGE_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '221' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RESPONSABILITE_CIVIL_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '222' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TRANSPORT_ETRSO = true;
            }
            //sous menu reglement Santer
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '224' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.GESA_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '225' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PHARMACIEN_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '226' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUXILIAIRE_ETRSO = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '419' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.YAFOLO_ETRSO = true;
            }
          }  

          //ECRAN PARAMETTRE I
          
          $rootScope.EXPERT_NOMME_EPARAMI = false;
          $rootScope.CONFIGURATION_DES_PARAMETTRES_EPARAMI = false;
          $rootScope.PARAMETTRE_EPARAMI = false;
          $rootScope.CONFIGURATION_DE_GARANTIE_PAR_RISQUE_EPARAMI = false;
          $rootScope.ETAT_EPARAMI = false;
          $rootScope.EDITION_EPARAMI = false;
          $rootScope.CREATION_MARQUE = false;
          $rootScope.CREATION_BANQUE_AGENCE = false;

          $rootScope.CREATION_EXERCICE = false;//nouveau
        

          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){

            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '405' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_MARQUE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '406' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_BANQUE_AGENCE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '32' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EXPERT_NOMME_EPARAMI = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '407' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_EXERCICE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '33' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CONFIGURATION_DES_PARAMETTRES_EPARAMI = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '36' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ETAT_EPARAMI = true;
            }

            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '34' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRE_EPARAMI = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '35' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CONFIGURATION_DE_GARANTIE_PAR_RISQUE_EPARAMI = true;
            }
            
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '37' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_EPARAMI = true;
            }
          
          }  


          //ECRAN PARAMETTRE II
          
          $rootScope.PLAN_EPARAMII = false;
          $rootScope.PLAN_COMPTABLE_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_COMPTES_DES_PRODUITS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_FAMILLES_D_OPERATION_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_DES_TIERS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_AUTRES_ECRITURES_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATION_DE_TIERS_EPARAMII = false;
          $rootScope.PARAMETTRAGE_DES_OPERATIONS_SYSTEME_EPARAMII = false;
          $rootScope.ETATS_EPARAMII = false;
          $rootScope.EDITION_EPARAMII = false;

          //NOUVEAU
          $rootScope.FAMILLE_DE_BIENS_IMMOBILISEES = false;
          $rootScope.FAMILLE_AMORTISSEMENT = false;
          $rootScope.PARAMETRES_BUDGET = false;
          $rootScope.PARAMETRES_JOURNAL = false;
          $rootScope.TYPE_DE_BUDGET = false;
          $rootScope.DETAILS_DU_TYPE_DE_BUDGET = false;
          $rootScope.POSTE_BUDGETAIRE = false;

          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '210' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.FAMILLE_DE_BIENS_IMMOBILISEES = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '211' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.FAMILLE_AMORTISSEMENT = true;
            }

            //MENU DEROULANT
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '38' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PLAN_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '40' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '47' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ETATS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '206' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETRES_BUDGET = true;
            }
          

            //POPO MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '237' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PLAN_COMPTABLE_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '238' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETRES_JOURNAL = true;
            }

            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '237' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_COMPTES_DES_PRODUITS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '238' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_FAMILLES_D_OPERATION_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '239' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '240' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_DES_TIERS_EPARAMII = true;
            }//
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '241' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_AUTRES_ECRITURES_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '242' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATION_DE_TIERS_EPARAMII = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '243' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PARAMETTRAGE_DES_OPERATIONS_SYSTEME_EPARAMII = true;
            }


            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '244' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TYPE_DE_BUDGET = true;
            }//
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '245' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.DETAILS_DU_TYPE_DE_BUDGET = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '246' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.POSTE_BUDGETAIRE = true;
            }
          
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '247' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_EPARAMII = true;
            }
          }  

          //ECRAN ASSURANCE
          
          $rootScope.ENREGISTREMENT_EASSUR = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSUR = false;
          $rootScope.HABITAT_EASSUR = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EASSUR = false;
          $rootScope.AUTO_EASSUR = false;
          $rootScope.VOYAGE_EASSUR = false;
          $rootScope.RESPONSABILITE_CIVIL_EASSUR = true;
          $rootScope.TRANSPORT_EASSUR = false;
          $rootScope.SANTER_EASSUR = false;
          $rootScope.GESA_EASSUR = false;
          $rootScope.PHARMACIEN_EASSUR = false;
          $rootScope.AUXILIAIRE_EASSUR = false;
          $rootScope.LISTEDEMANDECONTRAT_EASSUR = false;
          //NOUVEAU
          $rootScope.YAFOLO_EASSUR = true;

          $rootScope.TRANSMISSION_EASSURTRANS = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURTRANS = false;
          $rootScope.HABITAT_EASSURTRANS = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EASSURTRANS = false;
          $rootScope.AUTO_EASSURTRANS = false;
          $rootScope.VOYAGE_EASSURTRANS = false;
          $rootScope.RESPONSABILITE_CIVIL_EASSURTRANS = false;
          $rootScope.TRANSPORT_EASSURTRANS = false;
          $rootScope.SANTER_EASSURTRANS = false;
          $rootScope.GESA_EASSURTRANS = false;
          $rootScope.PHARMACIEN_EASSURTRANS = false;
          $rootScope.AUXILIAIRE_EASSURTRANS = false;
          //NOUVEAU
          $rootScope.YAFOLO_EASSURTRANS = true;

          $rootScope.VALIDATION_EASSURVALID = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURVALID = false;
          $rootScope.HABITAT_EASSURVALID = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EASSURVALID = false;
          $rootScope.AUTO_EASSURVALID = false;
          $rootScope.VOYAGE_EASSURVALID = false;
          $rootScope.RESPONSABILITE_CIVIL_EASSURVALID = false;
          $rootScope.TRANSPORT_EASSURVALID = false;
          $rootScope.SANTER_EASSURVALID = false;
          $rootScope.GESA_EASSURVALID = false;
          $rootScope.PHARMACIEN_EASSURVALID = false;
          $rootScope.AUXILIAIRE_EASSURVALID = false;
          //NOUVEAU
          $rootScope.YAFOLO_EASSURVALID = false;

          $rootScope.OPERATION_EOPERATION = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EOPERATION = false;
          $rootScope.HABITAT_EOPERATION = false;
          $rootScope.INDIVIDUEL_ACCIDENT_EOPERATION = false;
          $rootScope.AUTO_EOPERATION = false;
          $rootScope.VOYAGE_EOPERATION = false;
          $rootScope.RESPONSABILITE_CIVIL_EOPERATION = false;
          $rootScope.TRANSPORT_EOPERATION = false;
          $rootScope.SANTER_EOPERATION = false;
          $rootScope.GESA_EOPERATION = false;
          $rootScope.PHARMACIEN_EOPERATION = false;
          $rootScope.AUXILIAIRE_EOPERATION = false;
          //NOUVEAU
          $rootScope.YAFOLO_EOPERATION = false;

          $rootScope.RELANCE_ERELANCE = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERELANCE = false;
          $rootScope.HABITAT_ERELANCE = false;
          $rootScope.INDIVIDUEL_ACCIDENT_ERELANCE = false;
          $rootScope.AUTO_ERELANCE = false;
          $rootScope.VOYAGE_ERELANCE = false;
          $rootScope.RESPONSABILITE_CIVIL_ERELANCE = false;
          $rootScope.TRANSPORT_ERELANCE = false;
          $rootScope.SANTER_ERELANCE = false;
          $rootScope.GESA_ERELANCE = false;
          $rootScope.PHARMACIEN_ERELANCE = false;
          $rootScope.AUXILIAIRE_ERELANCE = false;
          //NOUVEAU
          $rootScope.YAFOLO_ERELANCE = false;

          $rootScope.RENOUVELLEMENT_ERENOUVEL = true;
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERENOUVEL = false;
          $rootScope.HABITAT_ERENOUVEL = false;
          $rootScope.INDIVIDUEL_ACCIDENT_ERENOUVEL = false;
          $rootScope.AUTO_ERENOUVEL = false;
          $rootScope.VOYAGE_ERENOUVEL = false;
          $rootScope.RESPONSABILITE_CIVIL_ERENOUVEL = false;
          $rootScope.TRANSPORT_ERENOUVEL = false;
          $rootScope.SANTER_ERENOUVEL = false;
          $rootScope.GESA_ERENOUVEL = false;
          $rootScope.PHARMACIEN_ERENOUVEL = false;
          $rootScope.AUXILIAIRE_ERENOUVEL = false;
          $rootScope.EDITION_ASSURANCE_ERENOUVEL = false;
          //NOUVEAU
          $rootScope.YAFOLO_ERENOUVEL = false;

          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '210' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.LISTEDEMANDECONTRAT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '109' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_ASSURANCE_ERENOUVEL = true;
            }

            //MENU DEROULANT 
            
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '49' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ENREGISTREMENT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '61' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TRANSMISSION_EASSURTRANS = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '73' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.VALIDATION_EASSURVALID = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '85' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.OPERATION_EOPERATION = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '249' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RELANCE_ERELANCE = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '97' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RENOUVELLEMENT_ERENOUVEL = true;
            }

            //POPO MENU ASSURANCE
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '256' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '257' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.HABITAT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '258' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.INDIVIDUEL_ACCIDENT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '259' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUTO_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '260' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.VOYAGE_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '261' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.RESPONSABILITE_CIVIL_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '262' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.TRANSPORT_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '263' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.SANTER_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '264' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.GESA_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '265' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PHARMACIEN_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '266' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.AUXILIAIRE_EASSUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '409' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.YAFOLO_EASSUR = true;
            }


            //POPO MENU TRANSMISSION
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '267' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '268' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '269' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '270' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '271' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '272' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '273' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '274' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '275' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '276' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '277' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_EASSURTRANS = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '410' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_EASSURTRANS = true;
          }
          
          //POPO MENU VALIDATION
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '278' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '279' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '280' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '281' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '282' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '283' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '284' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '285' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '286' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '287' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '288' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_EASSURVALID = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '411' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_EASSURVALID = true;
          }

        //POPO MENU OPERATION
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '289' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.MULTIRISQUE_PROFFESSIONELLE_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '290' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.HABITAT_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '291' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.INDIVIDUEL_ACCIDENT_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '292' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.AUTO_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '293' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.VOYAGE_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '294' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.RESPONSABILITE_CIVIL_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '295' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.TRANSPORT_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '296' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.SANTER_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '297' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.GESA_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '298' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.PHARMACIEN_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '299' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.AUXILIAIRE_EOPERATION = true;
        }
        if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '412' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
          $rootScope.YAFOLO_EOPERATION = true;
        }

        
          //POPO MENU RELANCE
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '311' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '312' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '313' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '314' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '315' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '316' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '317' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '318' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '319' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '320' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '321' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_ERELANCE = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '413' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_ERELANCE = true;
          }

          //POPO MENU RENOUVELLEMENT
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '300' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '301' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.HABITAT_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '302' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.INDIVIDUEL_ACCIDENT_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '303' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUTO_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '304' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.VOYAGE_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '305' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.RESPONSABILITE_CIVIL_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '306' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.TRANSPORT_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '307' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.SANTER_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '308' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.GESA_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '309' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.PHARMACIEN_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '310' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.AUXILIAIRE_ERENOUVEL = true;
          }
          if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '311' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
            $rootScope.YAFOLO_ERENOUVEL = true;
          }
          } 

          

          //ECRAN COMPTABILITE
          
          $rootScope.ECRITURE_COMPTABLE_COMPTA = false;
          $rootScope.ECRITURE_COMPTABLEI_COMPTA = false;
          $rootScope.EXTOURNE_COMPTA = false;
          $rootScope.CLOTURE_EXERCICE_COMPTA = false;
          $rootScope.EDITION_COMPTA = false;

          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){                                                                       
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '113' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EXTOURNE_COMPTA = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '114' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CLOTURE_EXERCICE_COMPTA = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '115' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_COMPTA = true;
            }

            //MENU DEROULANT
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '110' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ECRITURE_COMPTABLE_COMPTA = true;
            }
          

            //POPO MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '323' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.ECRITURE_COMPTABLEI_COMPTA = true;
            }
            
          }  

          //ECRAN OUTIL ET SECURITE
          
          $rootScope.JOURNEE_DE_TRAVAIL_OUTILSECUR = false;
          $rootScope.CREATION_JOURNEE_OUTILSECUR = false;
          $rootScope.FERMETURE_JOURNEE_OUTILSECUR = false;
          $rootScope.SELECTION_OUTILSECUR = false;
          $rootScope.GESTION_UTILISATEUR_OUTILSECUR = false;
          $rootScope.MOT_DE_PASS_OUTILSECUR = false;
          $rootScope.PROFIL_UTILISATEUR_OUTILSECUR = false;
          $rootScope.UTILISATEUR_OUTILSECUR = false;
          $rootScope.EDITION_OUTILSECUR = false;
          $rootScope.EDITION_OUTILSECUR = false;
          //NOUVEAU
          $rootScope.DROIT_OUTILSECUR = false; 


          for(let i =0;i<$rootScope.OperateurEnCoursEcran.length;i++){                                                                       
            //MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '116' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.JOURNEE_DE_TRAVAIL_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '117' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.CREATION_JOURNEE_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '118' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.FERMETURE_JOURNEE_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '119' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.SELECTION_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '200' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.GESTION_UTILISATEUR_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '326' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.EDITION_OUTILSECUR = true;
            }
          


          
          

            //POPO MENU
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '415' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.MOT_DE_PASS_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '416' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.PROFIL_UTILISATEUR_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '417' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.UTILISATEUR_OUTILSECUR = true;
            }
            if($rootScope.OperateurEnCoursEcran[i].OB_CODEOBJET == '418' && $rootScope.OperateurEnCoursEcran[i].OD_AUTORISER == 'O'){
              $rootScope.DROIT_OUTILSECUR = true;
            }
            
          }  
        
          sessionStorage.setItem("infoOperateurConnecte", JSON.stringify($rootScope.OperateurEnCoursEcran));
          $cookies.put("user", $scope.OperateurEnCours);
          $rootScope.user = $cookies.get("user");
          window.location.href = "#/assistance-mode";
          $scope.$emit("UNLOAD");
          parent.location.reload();
      }
      
    }*/
    $rootScope.GROUPES_DES_TIERS_ETIERS = true;
    $rootScope.TIERS_ETIERS = true;
    $rootScope.PROSPECT_ETIERS = true;
    $rootScope.SITUATION_DES_TIERS_ETIERS = true;
    $rootScope.SITUATIONDESASSUREURS_ETIERS = true;
    $rootScope.COMMERCIAUX_ETIERS = true;
    $rootScope.SITUATION_DES_COMMERCIAUX_ETIERS = true;
    $rootScope.EDITION_ETIERS = true;
    $rootScope.SAIASSUR_ETIERS = true;

    // ECRAN TRESORERIE
    
    $rootScope.OPERATION_DE_TRESORERIE_ETRSO = true;
    $rootScope.OPERATION_DE_TRESORERIEI_ETRSO = true;
    $rootScope.OPERATION_DE_TRESORERIE_TIERS_ETRSO = true;
    $rootScope.REGLEMENT_ASSURANCE_ETRSO = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_ETRSO = true;
    $rootScope.HABITAT_ETRSO = true;
    $rootScope.INDIVIDUEL_ACCIDENT_ETRSO = true;
    $rootScope.AUTO_ETRSO = true;
    $rootScope.VOYAGE_ETRSO = true;
    $rootScope.RESPONSABILITE_CIVIL_ETRSO = true;
    $rootScope.TRANSPORT_ETRSO = true;
    $rootScope.SANTER_ETRSO = true;
    $rootScope.GESA_ETRSO = true;
    $rootScope.PHARMACIEN_ETRSO = true;
    $rootScope.AUXILIAIRE_ETRSO = true;
    $rootScope.REEDITION_ETRSO = true;
    $rootScope.EDITION_ETRSO = true;
    //NOUVEAU
    $rootScope.YAFOLO_ETRSO = true;
    //ECRAN PARAMETTRE I
    
    $rootScope.EXPERT_NOMME_EPARAMI = true;
    $rootScope.CONFIGURATION_DES_PARAMETTRES_EPARAMI = true;
    $rootScope.PARAMETTRE_EPARAMI = true;
    $rootScope.CONFIGURATION_DE_GARANTIE_PAR_RISQUE_EPARAMI = true;
    $rootScope.ETAT_EPARAMI = true;
    $rootScope.EDITION_EPARAMI = true;
    $rootScope.CREATION_MARQUE = true;
    $rootScope.CREATION_BANQUE_AGENCE = true;
    $rootScope.CREATION_EXERCICE = true;//nouveau
    
    //ECRAN PARAMETTRE II
    
    $rootScope.PLAN_EPARAMII = true;
    $rootScope.PLAN_COMPTABLE_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_COMPTES_DES_PRODUITS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_FAMILLES_D_OPERATION_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_DE_TRESORERIE_DES_TIERS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_AUTRES_ECRITURES_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATION_DE_TIERS_EPARAMII = true;
    $rootScope.PARAMETTRAGE_DES_OPERATIONS_SYSTEME_EPARAMII = true;
    $rootScope.ETATS_EPARAMII = true;
    $rootScope.EDITION_EPARAMII = true;

    $rootScope.FAMILLE_DE_BIENS_IMMOBILISEES = true;
    $rootScope.FAMILLE_AMORTISSEMENT = true;
    $rootScope.PARAMETRES_BUDGET = true;
    $rootScope.PARAMETRES_JOURNAL = true;
    $rootScope.TYPE_DE_BUDGET = true;
    $rootScope.DETAILS_DU_TYPE_DE_BUDGET = true;
    $rootScope.POSTE_BUDGETAIRE = true;
    //ECRAN ASSURANCE
    
    $rootScope.ENREGISTREMENT_EASSUR = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSUR = true;
    $rootScope.HABITAT_EASSUR = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EASSUR = true;
    $rootScope.AUTO_EASSUR = true;
    $rootScope.VOYAGE_EASSUR = true;
    $rootScope.RESPONSABILITE_CIVIL_EASSUR = true;
    $rootScope.TRANSPORT_EASSUR = true;
    $rootScope.SANTER_EASSUR = true;
    $rootScope.GESA_EASSUR = true;
    $rootScope.PHARMACIEN_EASSUR = true;
    $rootScope.AUXILIAIRE_EASSUR = true;
    $rootScope.LISTEDEMANDECONTRAT_EASSUR = true;
    //NOUVEAU
    $rootScope.YAFOLO_EASSUR = true;

    $rootScope.TRANSMISSION_EASSURTRANS = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURTRANS = true;
    $rootScope.HABITAT_EASSURTRANS = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EASSURTRANS = true;
    $rootScope.AUTO_EASSURTRANS = true;
    $rootScope.VOYAGE_EASSURTRANS = true;
    $rootScope.RESPONSABILITE_CIVIL_EASSURTRANS = true;
    $rootScope.TRANSPORT_EASSURTRANS = true;
    $rootScope.SANTER_EASSURTRANS = true;
    $rootScope.GESA_EASSURTRANS = true;
    $rootScope.PHARMACIEN_EASSURTRANS = true;
    $rootScope.AUXILIAIRE_EASSURTRANS = true;
    //NOUVEAU
    $rootScope.YAFOLO_EASSURTRANS = true;


    $rootScope.VALIDATION_EASSURVALID = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EASSURVALID = true;
    $rootScope.HABITAT_EASSURVALID = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EASSURVALID = true;
    $rootScope.AUTO_EASSURVALID = true;
    $rootScope.VOYAGE_EASSURVALID = true;
    $rootScope.RESPONSABILITE_CIVIL_EASSURVALID = true;
    $rootScope.TRANSPORT_EASSURVALID = true;
    $rootScope.SANTER_EASSURVALID = true;
    $rootScope.GESA_EASSURVALID = true;
    $rootScope.PHARMACIEN_EASSURVALID = true;
    $rootScope.AUXILIAIRE_EASSURVALID = true;
    //NOUVEAU
    $rootScope.YAFOLO_EASSURVALID = true;

    $rootScope.OPERATION_EOPERATION = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_EOPERATION = true;
    $rootScope.HABITAT_EOPERATION = true;
    $rootScope.INDIVIDUEL_ACCIDENT_EOPERATION = true;
    $rootScope.AUTO_EOPERATION = true;
    $rootScope.VOYAGE_EOPERATION = true;
    $rootScope.RESPONSABILITE_CIVIL_EOPERATION = true;
    $rootScope.TRANSPORT_EOPERATION = true;
    $rootScope.SANTER_EOPERATION = true;
    $rootScope.GESA_EOPERATION = true;
    $rootScope.PHARMACIEN_EOPERATION = true;
    $rootScope.AUXILIAIRE_EOPERATION = true;
    //NOUVEAU
    $rootScope.YAFOLO_EOPERATION = true;

    $rootScope.RELANCE_ERELANCE = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERELANCE = true;
    $rootScope.HABITAT_ERELANCE = true;
    $rootScope.INDIVIDUEL_ACCIDENT_ERELANCE = true;
    $rootScope.AUTO_ERELANCE = true;
    $rootScope.VOYAGE_ERELANCE = true;
    $rootScope.RESPONSABILITE_CIVIL_ERELANCE = true;
    $rootScope.TRANSPORT_ERELANCE = true;
    $rootScope.SANTER_ERELANCE = true;
    $rootScope.GESA_ERELANCE = true;
    $rootScope.PHARMACIEN_ERELANCE = true;
    $rootScope.AUXILIAIRE_ERELANCE = true;
     //NOUVEAU
     $rootScope.YAFOLO_ERELANCE = true;

    $rootScope.RENOUVELLEMENT_ERENOUVEL = true;
    $rootScope.MULTIRISQUE_PROFFESSIONELLE_ERENOUVEL = true;
    $rootScope.HABITAT_ERENOUVEL = true;
    $rootScope.INDIVIDUEL_ACCIDENT_ERENOUVEL = true;
    $rootScope.AUTO_ERENOUVEL = true;
    $rootScope.VOYAGE_ERENOUVEL = true;
    $rootScope.RESPONSABILITE_CIVIL_ERENOUVEL = true;
    $rootScope.TRANSPORT_ERENOUVEL = true;
    $rootScope.SANTER_ERENOUVEL = true;
    $rootScope.GESA_ERENOUVEL = true;
    $rootScope.PHARMACIEN_ERENOUVEL = true;
    $rootScope.AUXILIAIRE_ERENOUVEL = true;
    $rootScope.EDITION_ASSURANCE_ERENOUVEL = true;
    //NOUVEAU
    $rootScope.YAFOLO_ERENOUVEL = true;
    //ECRAN COMPTABILITE
    
    $rootScope.ECRITURE_COMPTABLE_COMPTA = true;
    $rootScope.ECRITURE_COMPTABLEI_COMPTA = true;
    $rootScope.EXTOURNE_COMPTA = true;
    $rootScope.CLOTURE_EXERCICE_COMPTA = true;
    $rootScope.EDITION_COMPTA = true;

    //ECRAN OUTIL ET SECURITE
    
    $rootScope.JOURNEE_DE_TRAVAIL_OUTILSECUR = true;
    $rootScope.CREATION_JOURNEE_OUTILSECUR = true;
    $rootScope.FERMETURE_JOURNEE_OUTILSECUR = true;
    $rootScope.SELECTION_OUTILSECUR = true;
    $rootScope.GESTION_UTILISATEUR_OUTILSECUR = true;
    $rootScope.MOT_DE_PASS_OUTILSECUR = true;
    $rootScope.PROFIL_UTILISATEUR_OUTILSECUR = true;
    $rootScope.UTILISATEUR_OUTILSECUR = true;
    $rootScope.EDITION_OUTILSECUR = true;
    $rootScope.EDITION_OUTILSECUR = true;
    //NOUVEAU
    $rootScope.DROIT_OUTILSECUR = true; 
    /**  FIN DECLARATION DES VARIABLES DE GESTION DES DROITS DES ECRAN        ***/

    /****************************/

    $rootScope.retourListe = "";
    $rootScope.retourQuestionnaire = "";
    $rootScope.retourSurListeContrat = "";
    $rootScope.retourSitTiersAssureur = "";
    $rootScope.maPosition = "";
    $rootScope.valeurTest = false;
    $rootScope.releveClient = "";
    $rootScope.lEcran = "";
    $rootScope.ecransSituation = "";
    $rootScope.ecranCible = "";
    $rootScope.libelleMenu = "";
    $rootScope.infoBulleNombre = "";
    $rootScope.listeOn = "";
    $rootScope.imageNoticeParametre =
      '<span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24" /> <path d="M12.7442084,3.27882877 L19.2473374,6.9949025 C19.7146999,7.26196679 20.003129,7.75898194 20.003129,8.29726722 L20.003129,15.7027328 C20.003129,16.2410181 19.7146999,16.7380332 19.2473374,17.0050975 L12.7442084,20.7211712 C12.2830594,20.9846849 11.7169406,20.9846849 11.2557916,20.7211712 L4.75266256,17.0050975 C4.28530007,16.7380332 3.99687097,16.2410181 3.99687097,15.7027328 L3.99687097,8.29726722 C3.99687097,7.75898194 4.28530007,7.26196679 4.75266256,6.9949025 L11.2557916,3.27882877 C11.7169406,3.01531506 12.2830594,3.01531506 12.7442084,3.27882877 Z M12,14.5 C13.3807119,14.5 14.5,13.3807119 14.5,12 C14.5,10.6192881 13.3807119,9.5 12,9.5 C10.6192881,9.5 9.5,10.6192881 9.5,12 C9.5,13.3807119 10.6192881,14.5 12,14.5 Z" fill="#000000" /></g></svg></span>';

    /****************************/

    // formater un montant
    $rootScope.formateur = new Intl.NumberFormat("fr", {
      style: "currency",
      currency: "XOF",
    });
    $rootScope.formateur2 = new Intl.NumberFormat("fr");

    $rootScope.collectionContartOp = angular.fromJson(
      localStorage.getItem("CollReglementMultirisquePro")
    );

    if ($rootScope.infoDeLoperateur !== null) {
      
      $rootScope.infoDdatejournee = $cookies.get("saveDate");
      if ($rootScope.infoDdatejournee !== undefined) {
        $rootScope.DATE_JOURNEE_DE_TRAVAIL = $rootScope.infoDdatejournee;
      } else {
        $rootScope.DATE_JOURNEE_DE_TRAVAIL =
          $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
      }
    }

    if ($rootScope.infoDeLoperateur != null) {
      $rootScope.PAYSPARDEFAUT = $rootScope.infoDeLoperateur[0].PY_CODEPAYS_REF;
      $rootScope.VILLEPARDEFAUT = $rootScope.infoDeLoperateur[0].VL_CODEVILLE_REF;
      $rootScope.ADRESSESERV = $rootScope.infoDeLoperateur[0].COCHER;
      $rootScope.CODE_AGENCE = $rootScope.infoDeLoperateur[0].AG_CODEAGENCE;
      $rootScope.CODE_ENTREPOT = $rootScope.infoDeLoperateur[0].EN_CODEENTREPOT;
      $rootScope.CODE_OPERATEUR =
        $rootScope.infoDeLoperateur[0].OP_CODEOPERATEUR;
      // $rootScope.DATE_JOURNEE_DE_TRAVAIL = $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
      $rootScope.DATE_PREMIER_EXERCICE =
        $rootScope.infoDeLoperateur[0].clsExercices[0].JT_DATEDEBUTPREMIEREXERCICE;
      $rootScope.DATE_EXERCICE =
        $rootScope.infoDeLoperateur[0].clsExercices[0].EX_EXERCICE;
    }

    $rootScope.calculDateJourneeDeTravail = function (dateDebut) {
      if (dateDebut !== "") {
        let nouvelleDate = new Date();
        nouvelleDate.setFullYear(dateDebut.substr(6, 4));
        nouvelleDate.setMonth(dateDebut.substr(3, 2));
        nouvelleDate.setDate(dateDebut.substr(0, 2));
        return nouvelleDate.getTime();
      }
      return null;
    };

    // changer la date de la journee de travail
    $rootScope.nouvelleDateJourneeTravail = function (newDate) {
      $rootScope.DATE_JOURNEE_DE_TRAVAIL = newDate;
      console.log($rootScope.DATE_JOURNEE_DE_TRAVAIL);
    };

    // LES MESSAGES DES TOASTRS
    $rootScope.ChampsNonRenseignes = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Renseignez correctement les champs obligatoires ou non correctes."
      );
    };
    $rootScope.ChampsEffetEcheance = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Les champs effet et échéance sont obligatoires.");
    };
    $rootScope.MessageDesListes = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.info(message);
    };
    $rootScope.MessageDerreurDesTypes = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.dateMiseAJour = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.EnregistrementReussi = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.EnregistrementNonReussi = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.ProblemeServeur = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.warning(message);
    };
    $rootScope.SuppressionReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.SuppressionNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.dateDebutIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de début ne doit pas être supérieure à la date de fin."
      );
    };
    $rootScope.dateFinIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de fin ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.DateNonRenseignes = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("La période est obligatoire.");
    };
    $rootScope.ChampsListeInvalide = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Veuillez renseigner correctement les champs.");
    };
    $rootScope.dateEffetIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'effet ne doit pas être supérieure ni égale à la date d'échéance."
      );
    };
    $rootScope.dateEcheanceDebutIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'échéance ne doit pas être inferieure ou égale à la date d'effet."
      );
    };
    $rootScope.dateFinIncorrecteeffet = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'effet ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.ClotureReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.ClotureNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.TransmissionValidationReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.TransmissionValidationNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.messageSomme = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La somme des montants des échéances doit êtres égale au montant de la facture."
      );
    };
    $rootScope.messagedateEcheance = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("La date d'échéance ne doit pas exister dans la grille.");
    };
    $rootScope.messageInfoBeneficiaire = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Veuillez renseigner toutes les informations sur le bénéficiaire."
      );
    };
    $rootScope.messageInfoCheque = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Veuillez renseigner toutes les informations sur le chèque."
      );
    };
    $rootScope.infoAjoutCheque = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Veuillez ajouter les informations du chèque ou changer le mode de règlement."
      );
    };
    $rootScope.ChampsNonRenseignescorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Assurez-vous d'utiliser des separateurs (/) pour les dates ou veuillez saisir un montant correct."
      );
    };
    $rootScope.MontantCommiIncorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Le montant du versement du jour doit être égal au montant du chèque."
      );
    };
    $rootScope.dateDuRdvDebutIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date du rendez-vous ne doit pas être inférieure à la date de la journée de travail."
      );
    };
    $rootScope.montantincorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Le montant de la valeur neuve ne doit pas être inférieur a la valeur venale."
      );
    };
    $rootScope.valeurtauxincorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("La valeur du taux ne doit pas être supérieure à 100.");
    };
    $rootScope.datemisecirincorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de mise en circulation ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.dateEffetMiscirIncorrecte = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'effet ne doit pas être inférieure ou égale à la date de mise en circulation."
      );
    };
    $rootScope.dateReceptionIncorrect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date d'emission ne doit pas être supérieure à la date de reception."
      );
    };
    $rootScope.SuppressionImpossible = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Impossible de supprimer. Le chèque a déjà été validé.");
    };
    $rootScope.ValidationReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success(message);
    };
    $rootScope.ValidationNonReussie = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
    $rootScope.dateReceptionIncorrected = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de reception ne doit pas être supérieure à la date de la journée de travail."
      );
    };
    $rootScope.soldeatteint = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error("Votre solde est déjà atteint.");
    };
    $rootScope.saisiemontantinvalide = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Impossible de saisir un montant supérieur au montant de la facture."
      );
    };
    $rootScope.dateEcheancierincorect = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de l'échéancier ne doit pas être inférieure à la date de la journée de travail."
      );
    };
    $rootScope.dateEcheancierincorecteffet = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de l'échéancier ne doit pas être inférieure à la date d'effet du contrat."
      );
    };
    $rootScope.dateEcheancierincorectecheance = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "La date de l'échéancier ne doit pas être supérieure à la date d'échéance du contrat."
      );
    };
    $rootScope.saisiemontanttotalinvalide = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(
        "Le montant total de l'échéancier ne doit pas être supérieur au montant de la facture."
      );
    };
    $rootScope.Enregistrementchequephoto = function () {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.success("Opération réalisée avec succès.");
    };
    $rootScope.Message = function (message) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "500",
        hideDuration: "550",
        timeOut: "3000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      toastr.error(message);
    };
  },
]);

MapharApp.directive("imgProfile", function ($parse) {
  return {
    restrict: "A",
    link: function (scope, element, attributes) {
      var set = $parse(attributes.imgProfile);
      element.bind("change", function () {
        set.assign(scope, element[0].files);
        scope.$apply();
      });
    },
  };
});

MapharApp.directive("imgSignature", function ($parse) {
  return {
    restrict: "A",
    link: function (scope, element, attributes) {
      var set = $parse(attributes.imgSignature);
      element.bind("change", function () {
        set.assign(scope, element[0].files);
        scope.$apply();
      });
    },
  };
});
