MapharApp.controller('NewDateJourTravailController', [
    '$scope',
    '$http',
    '$q',
    '$location',
    '$sce',
    '$window',
    '$rootScope',
    '$cookies',
    function ($scope, $http, $q, $location, $sce, $window, $rootScope, $cookies) {
        
        /*DEBUT ZONE DE DECLARATION*/
        
        $scope.FormAddOperationTresorerie = {
            'journeeTravail': $rootScope.DATE_JOURNEE_DE_TRAVAIL
        }
        
        /*FIN ZONE DE DECLARATION*/
        
        
        
        /*DEBUT FONCTION GENERALE*/
        
        //debut recharge page
        $scope.rechargePage = function () {
            $window.location.reload();
        };
        //debut recharge page
        
        //debut loader
        $scope.$on('LOAD', function () {
            $scope.loading = true
        });
        
        $scope.$on('UNLOAD', function () {
            $scope.loading = false
        });
        //fin loader
        
        //debut test sur les date
        $scope.dateSuperioriteDebut = function (dateDebut) {
            if (dateDebut !== "") {
                let nouvelleDate = new Date(dateDebut);
                nouvelleDate.setFullYear(dateDebut.substr(6, 4));
                nouvelleDate.setMonth(dateDebut.substr(3, 2));
                nouvelleDate.setDate(dateDebut.substr(0, 2));
                return nouvelleDate.getTime();
            }
            return null;
        };
        $scope.dateSuperioriteFin = function (dateFin) {
            if (dateFin !== "") {
                let nouvelleDate = new Date(dateFin);
                nouvelleDate.setFullYear(dateFin.substr(6, 4));
                nouvelleDate.setMonth(dateFin.substr(3, 2));
                nouvelleDate.setDate(dateFin.substr(0, 2));
                return nouvelleDate.getTime();
            }
            return null;
        };
        //fin test sur les date
        
        //debut limite des champs
        var KTBootstrapMaxlength = function () {
            // Private functions
            var demos = function () {
                // minimum setup
                $('#idPeriodeDu').maxlength({
                    warningClass: "label label-info label-rounded label-inline",
                    limitReachedClass: "label label-success label-rounded label-inline"
                });
                $('#idPeriodeAu').maxlength({
                    warningClass: "label label-info label-rounded label-inline",
                    limitReachedClass: "label label-success label-rounded label-inline"
                });
            }
            
            return {
                // public functions
                init: function () {
                    demos();
                }
            };
        }();
        
        jQuery(document).ready(function () {
            KTBootstrapMaxlength.init();
        });
        //debut limite des champs
        
        //debut determine une annee bissetile
        $scope.anneeBissextile = function (annee) {
            if (((annee % 4 == 0) && (annee % 100 !== 0)) || (annee % 400 == 0)) {
                $scope.bissextile = true
                return $scope.bissextile
            } else {
                $scope.bissextile = false
                return $scope.bissextile
            }
        }
        //fin determine une annee bissetile
        
        /*FIN FONCTION GENERALE*/
        
        
        
        /*DEBUT FONCTIONS D'INITIALISATION DES PAGES*/
        
        /*FIN FONCTIONS D'INITIALISATION DES PAGES*/
        
        
        
        /*DEBUT DEV JJ*/
        
        //debut focus sur le champ
        $scope.desactiverChampRequis = function () {
            $('#idChampNewDate').focusin(function () {
                $(this).css('background-color', '#FFFFFF')
            })
        }
        //fin focus sur le champ
        
        //debut changer la date
        $scope.changedate = function(datejr){
            $rootScope.infoDeLoperateur = angular.fromJson(
                localStorage.getItem("userCurrent")
              );
            if (datejr !== ''){
                $rootScope.journeeTravail = datejr;
                $rootScope.infoDeLoperateur[0].clsJourneetravails[0].JT_DATEJOURNEETRAVAIL = datejr;
                localStorage.setItem("dtjournee", angular.toJson(datejr))
                localStorage.setItem("userCurrent", angular.toJson($rootScope.infoDeLoperateur))
                $cookies.put("saveDate", datejr);
                $scope.messageErreur = "Date mise à jour";
                $rootScope.dateMiseAJour($scope.messageErreur)
                setTimeout($scope.rechargePage, 3600);
            }
        }
        
        $scope.changerDate = function () {
            $scope.$emit('LOAD');
            let typeDate = /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
            
            $scope.desactiverChampRequis();
            
            if ($scope.FormChangerDate.nouvelleDate !== undefined) {
                $scope.jour = $scope.FormChangerDate.nouvelleDate.substr(0, 2);
                $scope.mois = $scope.FormChangerDate.nouvelleDate.substr(3, 2);
                $scope.annee = $scope.FormChangerDate.nouvelleDate.substr(6, 4);
            }
            
            if ($scope.FormChangerDate.nouvelleDate === "" || $scope.FormChangerDate.nouvelleDate === undefined) {
                $scope.$emit('UNLOAD');
                if ($scope.FormChangerDate.nouvelleDate === "" || $scope.FormChangerDate.nouvelleDate === undefined) {
                    $('#idChampNewDate').css('background-color', '#FFE9E0')
                }
                let message = "Veuillez saisir une date";
                $rootScope.MessageDerreurDesTypes(message)
            } else if (typeDate.test($scope.FormChangerDate.nouvelleDate) == false) {
                $scope.$emit('UNLOAD');
                let message = "La date n'est pas valide";
                $rootScope.MessageDerreurDesTypes(message)
            } else if (($scope.anneeBissextile($scope.annee) == true) && ($scope.mois == "02") && ($scope.jour > "29")) {
                $scope.$emit('UNLOAD');
                $('#idChampNewDate').css('background-color', '#FFE9E0')
                let message = "La date n'est pas valide";
                $rootScope.MessageDerreurDesTypes(message)
            } else if (($scope.anneeBissextile($scope.annee) == false) && ($scope.mois == "02") && ($scope.jour > "28")) {
                $scope.$emit('UNLOAD');
                $('#idChampNewDate').css('background-color', '#FFE9E0')
                let message = "La date n'est pas valide";
                $rootScope.MessageDerreurDesTypes(message)
            } else if (($scope.mois == "04" || $scope.mois == "06" || $scope.mois == "09" || $scope.mois == "11") && ($scope.jour > "30")) {
                $scope.$emit('UNLOAD');
                $('#idChampNewDate').css('background-color', '#FFE9E0')
                let message = "La date n'est pas valide";
                $rootScope.MessageDerreurDesTypes(message)
            } else {
                $rootScope.nouvelleDateJourneeTravail($scope.FormChangerDate.nouvelleDate)
                // console.log($rootScope.nouvelleDateJourneeTravail)
                setTimeout($scope.rechargePage, 3600);
            }
        }
        //fin changer la date
        
        //debut recharge page
        $scope.rechargePage = function () {
            $window.location.reload();
        };
        //debut recharge page
        
        /*FIN DEV JJ*/
        
    }
]);
