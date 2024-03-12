MapharApp.controller("ModeController", [
  "$scope",
  "$window",

  function ($scope, $window) {
    /*DEBUT FONCTION GENERALE*/

    //debut loader
    $scope.$on("LOAD", function () {
      $scope.loading = true;
    });

    $scope.$on("UNLOAD", function () {
      $scope.loading = false;
    });
    //fin loader

    /*FIN FONCTION GENERALE*/

    $scope.title = "mode";

    $scope.redirected = function (val) {
      $scope.$emit("LOAD");
      if (val == "assurances") {
        localStorage.setItem("menuCurrent", "2");
        $window.location.href = "#/assurances/tableau-de-bord";
        $scope.$emit("UNLOAD");
        parent.location.reload();
      } else if (val == "gestion") {
        localStorage.setItem("menuCurrent", "1");
        $window.location.href = "#/gestion/tableau-de-bord";
        parent.location.reload();
        $scope.$emit("UNLOAD");
      } else if (val == "grh") {
        localStorage.setItem("menuCurrent", "4");
        $window.location.href = "#/grh/tableau-de-bord";
        parent.location.reload();
        $scope.$emit("UNLOAD");
      } else if (val == "assurances_gestion") {
        localStorage.setItem("menuCurrent", "3");
        $window.location.href = "#/assurances-gestion/tableau-de-bord";
        parent.location.reload();
        $scope.$emit("UNLOAD");
      } else {
        $window.location.href = "#/assistance-mode";
        $scope.$emit("UNLOAD");
      }
    };
  },
]);
