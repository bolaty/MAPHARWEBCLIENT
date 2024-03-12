MapharApp.controller("GererMenuController", [
  "$scope",
  "$http",
  "$q",
  "$location",
  "$sce",
  "$window",
  "$rootScope",
  function ($scope, $http, $q, $location, $sce, $window, $rootScope) {
    /*DEBUT ZONE DE DECLARATION*/

    /*FIN ZONE DE DECLARATION*/

    /*DEBUT FONCTION GENERALE*/
   
    //début loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    /*FIN FONCTION GENERALE*/

    /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/

    /*FIN FONCTIONS D'INITIALISATION DES PAGES*/

    /*DEBUT DEV JJ*/

    //debut focus sur le champ enregistrement
    //        $scope.libelleMenu = function () {
    //
    //            //ENREGISTREMENT
    //            $(document).ready(function () {
    //                $('#idEngMP').focusin(function () {
    //                    $(this).css('background-color', '#0C4543')
    //                })
    //                $('#idEngMP').focusout(function () {
    //                    $(this).css('background-color', '#6A5ACD')
    //                })
    //
    //                $('#idEngHabitat').focusin(function () {
    //                    $(this).css('background-color', '#0C4543')
    //                })
    //                $('#idEngHabitat').focusout(function () {
    //                    $(this).css('background-color', '#6A5ACD')
    //                })
    //
    //                $('#idEngIndivAccident').focusin(function () {
    //                    $(this).css('background-color', '#0C4543')
    //                })
    //                $('#idEngIndivAccident').focusout(function () {
    //                    $(this).css('background-color', '#6A5ACD')
    //                })
    //            })
    //
    //            //OPERATION
    //            $(document).ready(function () {
    //                $('#idMP').focusin(function () {
    //                    $(this).css('background-color', '#0C4543')
    //                })
    //            })
    //        }
    //fin focus sur le champ enregistrement

    $scope.clicSurMenu = function (libelleMenu) {
      $rootScope.libelleMenu = libelleMenu;
    };
    $scope.SinistreStatut = function (info) {
      $rootScope.StatutSinistre = info;
      console.log($rootScope.StatutSinistre)
    };
    /*FIN DEV JJ*/
  },
]);
