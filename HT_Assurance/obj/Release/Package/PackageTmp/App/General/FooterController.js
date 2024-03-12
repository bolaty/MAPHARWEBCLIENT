MapharApp.controller('FooterController',
[
    '$scope',
    '$http',
    '$rootScope',
    '$cookies',
    function ($scope, $http, $rootScope, $cookies) {
        $scope.info = 'Home Technology';
        $scope.userinfo = angular.fromJson(localStorage.getItem("userCurrent"));
        $rootScope.infoDdatejournee = $cookies.get('saveDate');
        $scope.operateur = $scope.userinfo[0].OP_NOMPRENOM;
        $scope.agence = $scope.userinfo[0].clsAgences[0].AG_RAISONSOCIAL;
        // $scope.journeeTravail = $scope.userinfo[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
        
        if( $rootScope.infoDdatejournee !== undefined){
            $rootScope.journeeTravail =  $rootScope.infoDdatejournee;
        }else{
            $rootScope.journeeTravail = $scope.userinfo[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL;
        }
    }
]
);
