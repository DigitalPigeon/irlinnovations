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


.controller('PopoutCtrl', function ($scope, $stateParams, $injector, modifiersService, tablessStateService, attackTypeService) {

    tablessStateService.enable($scope);

    $scope.name = $stateParams.name;
    $scope.itemServiceName = $stateParams.itemServiceName;
    
    $scope.goBackIfRequired = function() {
        if ($scope.name == '') {
            tablessStateService.goBack();
        }
    };
    
})

.controller('ModifierBlockCtrl', function ($scope, $injector, modifiersService, tablessStateService, attackTypeService) {

    var itemService = $injector.get($scope.itemServiceName);

    //all services have an all() method.
    $scope.items = itemService.all();
    
    var monitor = function() {
        return itemService.selected();
    }

    //only single selectable services have the selected() method, so check for it safely
    if (itemService.selected) {
        $scope.item = itemService.selected() || { name: 'None Selected', checked: false };
        $scope.$on('$ionicView.enter', function (e) {
            console.log('enter sub view');
            $scope.item = itemService.selected() || { name: 'None Selected', checked: false };
        });

        $scope.$watch('monitor()', function () {
            // Set true for animation which isn't needed in my case
            console.log('watch triggered');
            console.log(itemService.selected());
            $scope.item = itemService.selected() || { name: 'None Selected', checked: false };
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
