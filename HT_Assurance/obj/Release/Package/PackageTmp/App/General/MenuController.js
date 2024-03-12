MapharApp.controller("MenuController", [
  "$scope",
  "$http",
  "$rootScope",

  function ($scope, $http, $rootScope) {
    $scope.menu = localStorage.getItem("menuCurrent");

    $scope.gestionMenu = "1";
    $scope.assuranceMenu = "2";
    $scope.assur_gestMenu = "3";
    $scope.grhMenu = "4";

    // other part
    $scope.laDirection = function (valeur) {
      if (valeur === "mp") {
        $rootScope.maPosition = "01";
      } else if (valeur === "Habitat") {
        $rootScope.maPosition = "05";
      } else if (valeur === "ia") {
        $rootScope.maPosition = "03";
      } else if (valeur === "Auto") {
        $rootScope.maPosition = "06";
      } else if (valeur === "Voyage") {
        $rootScope.maPosition = "04";
      } else if (valeur === "rc") {
        $rootScope.maPosition = "09";
      } else if (valeur === "tm") {
        $rootScope.maPosition = "10";
      } else if (valeur === "GESA") {
        $rootScope.maPosition = "08";
      } else if (valeur === "Pharmacien") {
        $rootScope.maPosition = "02";
      } else if (valeur === "Auxiliaire") {
        $rootScope.maPosition = "07";
      }else if (valeur === "MultirisqueImmeuble") {
        $rootScope.maPosition = "12";
      }
    };

    // test pour masquer le relevé (dans situation des commerciaux)
    $scope.test = function (item1, item2) {
      if (item1 == 2) {
        $rootScope.valeurTest = true;
      } else {
        $rootScope.valeurTest = false;
      }

      if (item2 == "sda" || item2 == "sdc") {
        $rootScope.juge = true;
      } else {
        $rootScope.juge = false;
      }
    };
  },
]);
