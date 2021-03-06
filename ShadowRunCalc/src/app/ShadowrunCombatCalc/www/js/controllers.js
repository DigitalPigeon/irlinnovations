angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope, $scope, $state, $ionicHistory, $ionicPopup, attackTypeService, modifiersService, actionService, db, character) {

    $scope.workflowStates = ['app.characterSelection', 'app.action','app.attack','app.target','app.environment','app.result'];
    $scope.startState = $scope.workflowStates[0];
    $scope.endState = $scope.workflowStates[$scope.workflowStates.length-1];
    
    $scope.$on('$ionicView.enter', function() {
        $scope.activeCharacter = character.character();
    });
    
    $scope.previousWorkflowState = function() {

        var currentState = $ionicHistory.currentStateName();

        //provide the last as our target if we match the first state
        var previousState = $scope.endState;

        for (var index=0; index < $scope.workflowStates.length; index++)
        {
            if ($scope.workflowStates[index] == currentState) {
                return previousState;
            }
            previousState = $scope.workflowStates[index];
        }

        return previousState;
    }

    $scope.nextWorkflowState = function() {

        var currentState = $ionicHistory.currentStateName();
        
        var matched = false;

        for (var index=0; index < $scope.workflowStates.length; index++)
        {
            //the last loop found the match, so this is the next state
            if (matched) {
                return $scope.workflowStates[index];
            }

            if ($scope.workflowStates[index] == currentState) {
                matched = true;
            }
        }
        
        //nothing matched, so go back to begining
        return $scope.startState;
    }


            //all attack type services for binding
    $scope.rangedAttackType = attackTypeService.rangedAttackType;
    $scope.meleeAttackType = attackTypeService.meleeAttackType;
    $scope.attackType = attackTypeService.attackType;
    $scope.isRangedAttack = function () { return attackTypeService.isRangedAttack(); };

    $scope.changeAttackType = function (newAttackType) {
        attackTypeService.changeAttackType(newAttackType);
    };

    $scope.show = function (state, config, options) { $state.go(state, config, options); };

    $scope.startOver=function() {
        $ionicHistory.clearHistory();

        $ionicHistory.nextViewOptions({
            disableAnimate: false,
            disableBack: true
        });

        $state.go($scope.startState,null, {reload:true});
    };
    
    $scope.reset = function (clearStorage) {
        $ionicPopup.confirm({
            title: 'Reset Everything?',
            template: 'Are you sure you want to reset all items' + (clearStorage?' AND saved data?':'?')
        })
        .then(function (result) {
            if (result) {
                modifiersService.reset();
                character.uninitialize();
                actionService.setLoadedActionName(null);

                if (clearStorage) {
                    db.reset();
                }
                $scope.startOver();
            } 
        });
    };

    $scope.goBack = function() {
        $rootScope.$ionicGoBack();
    };

    $scope.goNextWorkflowState = function() { $scope.show($scope.nextWorkflowState()); };
    $scope.goPreviousWorkflowState = function() { $scope.show($scope.previousWorkflowState()); };


})

.controller('CharacterSelectionCtrl', function ($scope, $ionicPopup, character, domainCharacter, modifiersService) {

    var rebind = function() {
        $scope.characters = domainCharacter.retrieveAll();        
    };
    
    $scope.$on('$ionicView.enter', function() {
        rebind();
    });

    $scope.newCharacter = function() {
        character.createNewCharacter();
        $scope.goNextWorkflowState();
    };

    $scope.loadCharacter = function(name) {
        var persistanceObject = domainCharacter.retrieve(name, character.character());
        angular.copy(persistanceObject.character, character.character());

        modifiersService.applyModifiersState(persistanceObject.modifiers, function (unreferencedModifier) {
            if (unreferencedModifier.isCharacterModifier) {
                unreferencedModifier.checked = false;
            }
        });

        $scope.goNextWorkflowState();
    };

    $scope.isActiveCharacter = function(characterToCheck) {
        if (characterToCheck && $scope.activeCharacter && $scope.activeCharacter.initialized)
        {
            if (characterToCheck.name == $scope.activeCharacter.name) {
                return 'item-stable';
            }
        }
        //if the suplied character is null and the active character is namelesss and keyless
        else if (!characterToCheck && $scope.activeCharacter && 
                    !$scope.activeCharacter.name && !$scope.activeCharacter.key && $scope.activeCharacter.initialized) {
            return 'item-stable';
        }

        return null;
    };
    

    $scope.deleteCharacter = function(name) {
        
    $ionicPopup.confirm({ title: 'Delete Character', template: 'Permanently delete "' + name + '"?' })
        .then(function(result) {
            if (result) {
                domainCharacter.del(name);
                rebind();
            }
        });
    }
            
})

.controller('ActionCtrl', function($scope, $ionicPopup, modifiersService, actionService, domainAction) {

var rebind = function() {
        $scope.savedActions = domainAction.retrieveAll();        
    };
    
    $scope.$on('$ionicView.enter', function() {
        rebind();
    });

    $scope.deleteSavedAction = function(name) {
        
        $ionicPopup.confirm({ title: 'Delete Action', template: 'Permanently delete "' + name + '"?' })
            .then(function(result) {
                if (result) {
                    domainAction.del(name);
                    rebind();
                }
        });
    }

    $scope.useDefaultAction = function(attackTypeName) {
        $scope.changeAttackType(attackTypeName);
        actionService.setLoadedActionName(null);
        $scope.goNextWorkflowState();   
    };

    $scope.loadSavedAction = function(name) {
        
        var persistanceObject = domainAction.retrieve(name);
        
        $scope.changeAttackType(persistanceObject.attackType);
        modifiersService.applyModifiersState(persistanceObject.modifiers, function(unreferencedModifier) {
            if (!unreferencedModifier.isCharacterModifier) {
                unreferencedModifier.checked = false;
            }
        });
        actionService.setLoadedActionName(persistanceObject.name);
        
        $scope.goNextWorkflowState();   
    };

    $scope.isActiveAction = function(actionName, defaultAttackTypeName) {
        if ((actionService.getLoadedActionName() && actionName == actionService.getLoadedActionName()) ||
        (!actionService.getLoadedActionName() && defaultAttackTypeName == $scope.attackType.name)) {
            return 'item-stable';
        }
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

.controller('TargetCtrl', function ($scope) {
})

.controller('EnvironmentCtrl', function ($scope) {
})

.controller('ResultCtrl', function ($scope, $stateParams, $ionicPopup, modifiersService, actionService, domainAction) {

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
    $scope.saveAction = function() {
            $ionicPopup.prompt({ title: 'Name this action', defaultText:actionService.getLoadedActionName() })
            .then(function(result) {
                if (result) {

                    var constraint = function(value) {return value.checked && !value.isCharacterModifier};
                        
                    domainAction.persist({name: result, modifiers: modifiersService.all(constraint), attackType: $scope.attackType.name});
                    actionService.setLoadedActionName(result);
                }
            });
        }
})



.controller('MyCharacterCtrl', function ($scope, character, modifiersService, domainCharacter) {
            
    $scope.saveCharacter = function () {

        var constraint = function (value) { return value.checked && value.isCharacterModifier; };

        if ($scope.character.name) {
            domainCharacter.persist({ character: $scope.character, modifiers: modifiersService.all(constraint) });                
        } 
        $scope.goBack();
    };

    $scope.character = character.character();

    
    $scope.$watch(function() { return character.character(); }, function(newVal, oldVal) {
        $scope.character = character.character();
    });

})

.controller('PopoutCtrl', function ($scope, $stateParams) {
    $scope.name = $stateParams.name;
    $scope.itemServiceName = $stateParams.itemServiceName;
    $scope.alwaysApplicable = $stateParams.alwaysApplicable;
    $scope.limitToCategory = $stateParams.limitToCategory;
})

.controller('ModifierBlockCtrl', function ($rootScope, $scope, $state, $injector, $ionicPopup, modifiersService, attackTypeService) {

    //$scope.$on('$ionicView.enter', function() {
    //});

    var itemService = $injector.get($scope.itemServiceName);

    var rebind = function() {
        
        var allItems = itemService.all();

        var lastCategory = 'unknown';
        var categoryCount = -1;

        $scope.categories = [];

        angular.forEach(allItems, function(value)    {
        
            //if we have requested a specific category, only inculde items of that category
            if (!$scope.limitToCategory || $scope.limitToCategory == value.category)
            {
                if (lastCategory != value.category)
                {
                    lastCategory = value.category;
                    categoryCount++;
                    $scope.categories[categoryCount] = { items: [], name: value.category || $scope.name, categoryName: value.category};
                }

                $scope.categories[categoryCount].items.push(value);
            }
        });

            
    
        angular.forEach($scope.categories, function (category) {
    
            category.infoPageState = itemService.infoPageState;


            category.popout = false;

            //scan all of the items. if they are all in the same exclusive group, then use the popout control instead
            if (category.items.length > 0 && category.items[0].exclusiveGroup && $scope.name && !$scope.blockPopout) {
                //exclusive group found. Default to using popout unless not all options are exclusive
                category.popout = true;
                var exclsuiveGroup = category.items[0].exclusiveGroup;
                angular.forEach(category.items, function (value, key) {
                    //if the exclusive group is not consistent, do not allow popout;
                    if (value.exclusiveGroup != exclsuiveGroup) {
                        category.popout = false;
                    }
                });
            }

            if (category.popout) {
                $scope.$watch(function () {
                    var items = [];
                    angular.forEach(category.items, function (value, key) {
                        if (value.checked) {
                            items.push(value);
                        }
                    });
                    if (items.length > 0) {
                        return items[0];
                    };
                    return null;
                }, function (newItem, oldItem) {
                    category.item = newItem || { name: 'None Selected', checked: false }
                });
            }

        });

    }; //end rebind function

    //when the values returned from the item service would be different, its time to rebind
    $scope.$watch(function () { return itemService.all(); }, function() {
        rebind();
    }); 
    

    $scope.showNotes = function (notes) {        
        $ionicPopup.show({
            title: 'Notes',
            template: notes,
            buttons: [{ text: 'Got it!', type: 'button-positive' }],
        });
    }

    $scope.showInfoPage = function (infoPageState) {
        $state.go(infoPageState);
    }

    

    $scope.goBackIfPopout = function() {
        if (!$scope.name) {
            $rootScope.$ionicGoBack();
        }
    };
    
    $scope.show = function (state, config) { $state.go(state, config); };
    $scope.isModifierApplicable = function(modifiers) { return $scope.alwaysApplicable || attackTypeService.isModifierApplicable(modifiers) ; }
    $scope.formatStats = modifiersService.formatStats;
    $scope.validateSelection = function (currentSelection, toggle) { modifiersService.validateSelection(currentSelection, toggle); }

})

.controller('InfoRangeCtrl', function ($scope) {

    

    $scope.datas = 
        [
            
            ['Pistols'],
            ['Taser', '0-5', '6-10', '11-15', '16-20'],
            ['Hold-Out', '0-5', '6-15', '16-30', '31-50'],
            ['Light', '0-5', '6-15', '16-30', '31-50'],
            ['Heavy', '0-5', '6-20', '21-40', '41-60'],

            ['Automatics'],
            ['Machine Pistol', '0-5', '6-15', '16-30', '31-50'],
            ['SMG', '0-10', '11-40', '41-80', '81-150'],
            ['Assault Rifle', '0-25', '26-150', '151-350', '351-550'],
            
            ['Longarms'],
            ['Shotgun (flechette)', '0-15', '16-30', '31-45', '45-60'],
            ['Shotgun (slug)', '0-10', '11-40', '41-80', '81-150'],
            ['Sniper Rifle', '0-50', '51-350', '351-800', '801-1500'],

            ['Heavy Weapons'],
            ['LMG', '0-25', '26-200', '201-400', '401-800'],
            ['MMG / HMG', '0-40', '41-250', '251-750', '751-1200'],
            ['Assault Cannon', '0-50', '51-300', '301-750', '751-1500'],
            ['Grenade Launcher', '5-50*', '51-100', '101-150', '151-500'],
            ['Missle Launcher', '20-70*', '71-150', '151-450', '451-1500'],
            
            ['Ballistic Projectiles'],
            ['Bow', '0-S', 'To S x 10', 'To S x 30', 'To S x 60'],
            ['Light Crossbow', '0-6', '7-24', '25-60', '61-120'],
            ['Medium Crossbow', '0-9', '10-36', '37-90', '91-150'],
            ['Heavy Crossbow', '0-15', '16-45', '46-120', '121-180'],
            
            ['Impact Projectiles'],
            ['Thrown Knife', '0-S', 'To S x 2', 'To S x 3', 'To S x 5'],
            ['Shuriken', '0-S', 'To S x 2', 'To S x 5', 'To S x 7'],
            
            ['Thrown Grenades'],
            ['Standard', '0-S x 2', 'To S x 4', 'To S x 6', 'To S x 10'],
            ['Aerodynamic', '0-S x 2', 'To S x 4', 'To S x 8', 'To S x 15']

        ];      

})


;
