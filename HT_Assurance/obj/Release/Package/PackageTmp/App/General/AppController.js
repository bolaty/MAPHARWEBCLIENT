MapharApp.controller("AppController", [
  "$scope",
  "$http",
  "$rootScope",
  "$cookies",
  "$window",
  function ($scope, $http, $rootScope, $cookies, $window) {
    $scope.infoDeLoperateur = angular.fromJson(
      localStorage.getItem("userCurrent")
    );

    //debut se deconnecter
    $scope.seDeconnecter = function () {
      // vider les cookies
      $cookies.remove("user1");
      $cookies.remove("user");

      // vider les espaces de rangement
      localStorage.clear();
      sessionStorage.clear();

      // redirection sur la page de connexion
      $window.location.href = "#/";

      // rechargement de la page
      parent.location.reload();
      return;
    };
    //fin se deconnecter

    //debut bouton profil utilisateur
    $scope.lettrePU = function () {
      $scope.laLettre = $scope.infoDeLoperateur[0].OP_NOMPRENOM.substr(0, 1);
    };
    //fin bouton profil utilisateur
  },
]);
