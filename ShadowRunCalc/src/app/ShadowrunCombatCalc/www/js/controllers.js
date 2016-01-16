angular.module('starter.controllers', [])

.controller('AttackCtrl', function ($scope, rangedAttackerSituations, meleeAttackerSituations, firingModes, choke, defenderSituations, selectedModifiers) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.pol = "This is attacks";
    $scope.rangedAttackerSituations = rangedAttackerSituations.all();
    $scope.meleeAttackerSituations = meleeAttackerSituations.all();
    $scope.firingModes = firingModes.all();
    $scope.choke = choke.all();
    $scope.defenderSituations = defenderSituations.all();
    $scope.validateSelection = function (currentSelection) { selectedModifiers.validateSelection(currentSelection); }

    })

.controller('Welcome', function () {
})

.controller('GearCtrl', function ($scope, equipment, ammoTypes, selectedModifiers) {
    $scope.equipment = equipment.all();
    $scope.ammoTypes = ammoTypes.all();
    $scope.validateSelection = function (currentSelection) { selectedModifiers.validateSelection(currentSelection); }
})

.controller('EnvironmentCtrl', function ($scope, visibilityModifiers, lightModifiers, windModifiers, rangeModifiers, selectedModifiers) {
    $scope.visibilityModifiers = visibilityModifiers.all();
    $scope.lightModifiers = lightModifiers.all();
    $scope.windModifiers = windModifiers.all();
    $scope.rangeModifiers = rangeModifiers.all();
    $scope.validateSelection = function (currentSelection) { selectedModifiers.validateSelection(currentSelection); }
})

.controller('ResultCtrl', function ($scope, $stateParams, selectedModifiers) {
    $scope.$on('$ionicView.enter', function() {
    $scope.selectedModifiers = selectedModifiers.all();
    $scope.selectedAttackerPoolModifiers = selectedModifiers.affectsAttackerPool();
    $scope.selectedDvModifiers = selectedModifiers.affectsDv();
    $scope.selectedApModifiers = selectedModifiers.affectsAp();
    $scope.selectedDefenderPoolModifiers = selectedModifiers.affectsDefenderPool();
    $scope.attackerPoolTotal = selectedModifiers.attackerPoolTotal();
    $scope.dvTotal = selectedModifiers.dvTotal();
    $scope.apTotal = selectedModifiers.apTotal();
    $scope.defenderPoolTotal = selectedModifiers.defenderPoolTotal();
    });
});
