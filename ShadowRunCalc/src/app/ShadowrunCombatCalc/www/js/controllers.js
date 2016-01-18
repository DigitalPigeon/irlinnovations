angular.module('starter.controllers', [])

.controller('AttackCtrl', function ($scope, rangedAttackerSituations, meleeAttackerSituations, firingModes, choke, defenderSituations, modifiersService, attackTypeService ) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

        

    $scope.attackType = attackTypeService.attackType;

    $scope.rangedAttackType = attackTypeService.rangedAttackType;
    $scope.meleeAttackType = attackTypeService.meleeAttackType;

    $scope.rangedAttackerSituations = rangedAttackerSituations.all();
    $scope.meleeAttackerSituations = meleeAttackerSituations.all();
    $scope.firingModes = firingModes.all();
    $scope.choke = choke.all();
    $scope.defenderSituations = defenderSituations.all();
    $scope.validateSelection = function (currentSelection) { modifiersService.validateSelection(currentSelection); }

    })

.controller('AppCtrl', function ($scope, attackTypeService) {
        $scope.rangedAttackType = attackTypeService.rangedAttackType;
        $scope.meleeAttackType = attackTypeService.meleeAttackType;

        $scope.attackType = attackTypeService.attackType;

        $scope.changeAttackType = function(newAttackType) {
            attackTypeService.changeAttackType(newAttackType);
        };
    })

.controller('GearCtrl', function ($scope, equipment, ammoTypes, modifiersService) {
    $scope.equipment = equipment.all();
    $scope.ammoTypes = ammoTypes.all();
    $scope.validateSelection = function (currentSelection) { modifiersService.validateSelection(currentSelection); }
})

.controller('EnvironmentCtrl', function ($scope, visibilityModifiers, lightModifiers, windModifiers, rangeModifiers, modifiersService) {
    $scope.visibilityModifiers = visibilityModifiers.all();
    $scope.lightModifiers = lightModifiers.all();
    $scope.windModifiers = windModifiers.all();
    $scope.rangeModifiers = rangeModifiers.all();
    $scope.validateSelection = function (currentSelection) { modifiersService.validateSelection(currentSelection); }
})

.controller('ResultCtrl', function ($scope, $stateParams, modifiersService) {
    $scope.$on('$ionicView.enter', function() {
    $scope.selectedModifiers = modifiersService.selected();
    $scope.selectedAttackerPoolModifiers = modifiersService.affectsAttackerPool();
    $scope.selectedDvModifiers = modifiersService.affectsDv();
    $scope.selectedApModifiers = modifiersService.affectsAp();
    $scope.selectedDefenderPoolModifiers = modifiersService.affectsDefenderPool();
    $scope.attackerPoolTotal = modifiersService.attackerPoolTotal();
    $scope.dvTotal = modifiersService.dvTotal();
    $scope.apTotal = modifiersService.apTotal();
    $scope.defenderPoolTotal = modifiersService.defenderPoolTotal();
    });
});
