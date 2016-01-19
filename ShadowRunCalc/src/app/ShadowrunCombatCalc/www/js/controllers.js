angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope, $scope, $ionicHistory, attackTypeService, tablessStateService) {
    $scope.rangedAttackType = attackTypeService.rangedAttackType;
    $scope.meleeAttackType = attackTypeService.meleeAttackType;

    $scope.attackType = attackTypeService.attackType;

    $scope.changeAttackType = function (newAttackType) {
        attackTypeService.changeAttackType(newAttackType);
    };

    $scope.showTablessView = tablessStateService.showTablessView;
})

.controller('AttackCtrl', function ($scope, attackerSituations, firingModes, choke, ammoTypes, defenderSituations,
                                    modifiersService, attackTypeService, $ionicScrollDelegate) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    
    $scope.$on('$ionicView.enter', function (e) {
        $scope.firingMode = firingModes.selected() || {name: 'No Firing Mode Selected', checked:false};
        $scope.ammo = ammoTypes.selected() || { name: 'No Ammo Selected', checked: false };
        $scope.choke = choke.selected() || { name: 'No Choke Selected', checked: false };
    });
    
    $scope.attackType = attackTypeService.attackType;

    $scope.rangedAttackType = attackTypeService.rangedAttackType;
    $scope.meleeAttackType = attackTypeService.meleeAttackType;

    $scope.attackerSituations = attackerSituations.all();        

    $scope.isModifierApplicable = attackTypeService.isModifierApplicable;
    $scope.formatStats = modifiersService.formatStats;

    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }

    //watch for change to attack type, if it occurs scroll to the top
    //this is important because melee is smaller than ranged, and can actually be scrolled
    //off of the viewable area
    $scope.$watch('attackType.name', function () {
        // Set true for animation which isn't needed in my case
        $ionicScrollDelegate.scrollTop(false);
    });

    })

.controller('TargetCtrl', function ($scope, defenderSituations, modifiersService, attackTypeService, coverService) {
    $scope.defenderSituations = defenderSituations.all();
    $scope.cover = coverService.all();

    $scope.isModifierApplicable = attackTypeService.isModifierApplicable;
    $scope.formatStats = modifiersService.formatStats;

    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }
})

.controller('ResultCtrl', function ($scope, $stateParams, modifiersService, attackTypeService) {

    var rebind = function() {
        $scope.selectedModifiers = modifiersService.selected();
        $scope.selectedAttackerPoolModifiers = modifiersService.affectsAttackerPool();
        $scope.selectedDvModifiers = modifiersService.affectsDv();
        $scope.selectedApModifiers = modifiersService.affectsAp();
        $scope.selectedDefenderPoolModifiers = modifiersService.affectsDefenderPool();
        $scope.attackerPoolTotal = modifiersService.attackerPoolTotal();
        $scope.dvTotal = modifiersService.dvTotal();
        $scope.apTotal = modifiersService.apTotal();
        $scope.defenderPoolTotal = modifiersService.defenderPoolTotal();
    };
    
    $scope.$on('$ionicView.enter', rebind);

    $scope.attackType = attackTypeService.attackType;

    $scope.$watch('attackType.name', rebind);
})



.controller('MyCharacterCtrl', function ($scope, equipmentService, modifiersService, tablessStateService) {

    tablessStateService.enable($scope);

    $scope.equipment = equipmentService.all();

    $scope.formatStats = modifiersService.formatStats;

    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }
})

.controller('EnvironmentCtrl', function ($scope, visibilityModifiers, lightModifiers, windModifiers, rangeModifiers, modifiersService) {

    $scope.visibilityModifiers = visibilityModifiers.all();
    $scope.lightModifiers = lightModifiers.all();
    $scope.windModifiers = windModifiers.all();
    $scope.rangeModifiers = rangeModifiers.all();

    $scope.formatStats = modifiersService.formatStats;

    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }


})


.controller('FiringModeCtrl', function ($scope, firingModes, modifiersService, tablessStateService) {

    tablessStateService.enable($scope);
    $scope.goBack = tablessStateService.goBack;

    $scope.firingModes = firingModes.all();

    $scope.formatStats = modifiersService.formatStats;

    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }

    

})

.controller('AmmoCtrl', function ($scope, ammoTypes, modifiersService, tablessStateService) {

    tablessStateService.enable($scope);
    $scope.goBack = tablessStateService.goBack;

    $scope.ammoTypes = ammoTypes.all();

    $scope.formatStats = modifiersService.formatStats;

    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }


})


.controller('ShotgunChokeCtrl', function ($scope, choke, modifiersService, tablessStateService) {

    tablessStateService.enable($scope);
    $scope.goBack = tablessStateService.goBack;

    $scope.choke = choke.all();

    $scope.formatStats = modifiersService.formatStats;

    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }


})

;
