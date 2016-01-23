angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope, $scope, $state, $ionicHistory, $ionicPopup, attackTypeService, modifiersService, tablessStateService, tabAnimationService) {

    //all attack type services for binding
    $scope.rangedAttackType = attackTypeService.rangedAttackType;
    $scope.meleeAttackType = attackTypeService.meleeAttackType;
    $scope.attackType = attackTypeService.attackType;
    $scope.isRangedAttack = function () { return attackTypeService.isRangedAttack(); };

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

    //manage tab direction
    $scope.getTransition = tabAnimationService.getTransition;


        })

.controller('AttackCtrl', function ($scope, $ionicScrollDelegate) {

    $scope.$on('$ionicNavView.beforeLeave', function () { $scope.tabAnimation = $scope.getTransition(1); });

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

.controller('TargetCtrl', function ($scope) {
    $scope.$on('$ionicNavView.beforeLeave', function () { $scope.tabAnimation = $scope.getTransition(2); });
})

.controller('EnvironmentCtrl', function ($scope) {
    $scope.$on('$ionicNavView.beforeLeave', function () { $scope.tabAnimation = $scope.getTransition(3); });
})

.controller('ResultCtrl', function ($scope, $stateParams, modifiersService) {

    $scope.$on('$ionicNavView.beforeLeave', function () { $scope.tabAnimation = $scope.getTransition(4); });

    var rebind = function() {
        //$scope.selectedModifiers = modifiersService.selected;

        $scope.selectedAttackerPoolModifiers = modifiersService.affectsAttackerPool();
        $scope.selectedDvModifiers = modifiersService.affectsDv();
        $scope.selectedApModifiers = modifiersService.affectsAp();
        $scope.selectedDefenderPoolModifiers = modifiersService.affectsDefenderPool();

        $scope.attackerPoolTotal = modifiersService.attackerPoolTotal();
        $scope.dvTotal = modifiersService.dvTotal();
        $scope.apTotal = modifiersService.apTotal();
        $scope.defenderPoolTotal = modifiersService.defenderPoolTotal();
    };

    $scope.$on('$ionicView.enter', function() {rebind();});

    //rebind totals when switching attack type from slide out menu
    $scope.$watch(function () { return $scope.attackType.name; }, function (newValue, oldValue) {  rebind(); });

    //rebind totals when the psuedo checksum of selected items changes (specifically for when a reset-all is issued from slide out menu)
    $scope.$watch(function () { return modifiersService.selectedChecksum(); }, function (newValue, oldValue) {  rebind(); });

    $scope.formatStats = modifiersService.formatStats;
    
})



.controller('MyCharacterCtrl', function ($scope) {
    $scope.enableTablessView($scope);    
})



.controller('PopoutCtrl', function ($scope, $stateParams) {

    $scope.enableTablessView($scope);
    $scope.name = $stateParams.name;
    $scope.itemServiceName = $stateParams.itemServiceName;

})

.controller('ModifierBlockCtrl', function ($scope, $injector, $ionicPopup, modifiersService, tablessStateService, attackTypeService) {

    var itemService = $injector.get($scope.itemServiceName);

    //all services have an all() method.
    $scope.items = itemService.all();
    $scope.popout = false;

    //scan all of the items. if they are all in the same exclusive group, then use the popout control instead
    if ($scope.items.length > 0 && $scope.items[0].exclusiveGroup && itemService.selected && $scope.name) {
        
        //exclusive group found. Default to using popout unless not all options are exclusive
        $scope.popout = true;
        var exclsuiveGroup = $scope.items[0].exclusiveGroup;
        angular.forEach($scope.items, function (value, key) {
            //if the exclusive group is not consistent, do not allow popout;
            if (value.exclusiveGroup != exclsuiveGroup) {
                $scope.popout = false;
            }
        });
    }
    
    /*
    $scope.checkForSubPopout = function(item) {
        if (item.allowMultiple) {
            //$scope.showTablessView('app.popout', { name: $scope.name, itemServiceName: 'selectMultipleCountService', parentItemId: item.id, parentItemServiceName: $scope.itemServiceName });
            $ionicPopup.prompt({title: $scope.name})
                .then(function(result) {
                if (result) {
                    
                }
            });
        }
    }
     */
        
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
