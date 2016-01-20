angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope, $scope, $state, $ionicHistory, $ionicPopup, attackTypeService, modifiersService, tablessStateService) {

    //all attack type services for binding
    $scope.rangedAttackType = attackTypeService.rangedAttackType;
    $scope.meleeAttackType = attackTypeService.meleeAttackType;
    $scope.attackType = attackTypeService.attackType;
    $scope.isRangedAttack = function () { return attackTypeService.isRangedAttack() };

    $scope.changeAttackType = function (newAttackType) {
        attackTypeService.changeAttackType(newAttackType);
    };

    $scope.showTablessView = tablessStateService.showTablessView;
    $scope.enableTablessView = tablessStateService.enable;

    $scope.goHome = function () { $state.go('app.tab.attack'); }

    $scope.reset = function () {

        $ionicPopup.confirm({
            title: 'Reset Everything?',
            template: 'Are you sure you want to reset all options?'
        })
        .then(function (result) {
            if (result) {
                modifiersService.reset();
            } 
        });
    };
})

.controller('AttackCtrl', function ($scope, $ionicScrollDelegate) {
        
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

.controller('TargetCtrl', function () {    
})

.controller('ResultCtrl', function ($scope, $stateParams, modifiersService, attackTypeService) {

    var rebind = function() {
        //$scope.selectedModifiers = modifiersService.selected();

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
    $scope.$watch('attackType.name', rebind);

    //$scope.attackType = attackTypeService.attackType;

    
})



.controller('MyCharacterCtrl', function ($scope) {
    $scope.enableTablessView($scope);    
})


.controller('EnvironmentCtrl', function () {
})


.controller('PopoutCtrl', function ($scope, $stateParams) {

    $scope.enableTablessView($scope);
    $scope.name = $stateParams.name;
    $scope.itemServiceName = $stateParams.itemServiceName;

})

.controller('ModifierBlockCtrl', function ($scope, $injector, modifiersService, tablessStateService, attackTypeService) {

    var itemService = $injector.get($scope.itemServiceName);

    //all services have an all() method.
    $scope.items = itemService.all();
        
    //only single selectable services have the selected() method, so check for it safely
    //the call to itemService.selected() needs to be wrapped in a local function for scope adherance
    if (itemService.selected) {
        $scope.$watch(function () { return itemService.selected(); }, function (newItem, oldItem) {                       
            $scope.item = newItem || { name: 'None Selected', checked: false };
        });
    }    
    
    //if a section name is supplied, assume this is shown inline. if there is no name, then assume we are modal
    $scope.goBackIfRequired = function () {                
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
