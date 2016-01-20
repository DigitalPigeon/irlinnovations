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

.controller('AttackCtrl', function ($scope, attackTypeService, $ionicScrollDelegate) {
        
    $scope.attackType = attackTypeService.attackType;
    $scope.isRangedAttack = attackTypeService.isRangedAttack;    
    
    //watch for change to attack type, if it occurs scroll to the top
    //this is important because melee is smaller than ranged, and can actually be scrolled
    //off of the viewable area
    $scope.$watch('attackType.name', function (newValue, oldValue) {
        // Set true for animation which isn't needed in my case
        if (newValue != oldValue) {
            $ionicScrollDelegate.scrollTop(false);
        }        
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


.controller('PopoutCtrl', function ($scope, $stateParams, tablessStateService) {

    tablessStateService.enable($scope);

    $scope.name = $stateParams.name;
    $scope.itemServiceName = $stateParams.itemServiceName;

})

.controller('ModifierBlockCtrl', function ($scope, $injector, modifiersService, tablessStateService, attackTypeService) {

    var itemService = $injector.get($scope.itemServiceName);

    //all services have an all() method.
    $scope.items = itemService.all();
    
    var monitor = function() {
        console.log('monitor was called');
        return itemService.selected();
    }

    //only single selectable services have the selected() method, so check for it safely
    if (itemService.selected) {
        $scope.$watch(function () { return itemService.selected(); }, function (newItem, oldItem) {                       
            $scope.item = newItem || { name: 'None Selected', checked: false };
        });
    }    
    
    $scope.goBackIfRequired = function () {        
        //if name was not supplied, assume we are in a "modal" mode
        if (!$scope.name) {
            tablessStateService.goBack();
        }
    };

    $scope.showTablessView = tablessStateService.showTablessView;
    $scope.isModifierApplicable = attackTypeService.isModifierApplicable;
    $scope.formatStats = modifiersService.formatStats;
    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }

})



;
