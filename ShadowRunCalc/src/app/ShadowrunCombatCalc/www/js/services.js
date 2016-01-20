angular.module('starter.services', [])


.factory('modifiersService', ['attackerSituations', 'firingModes', 'choke', 'defenderSituations', 'coverService',
                                'equipmentService', 'ammoTypes', 
                                'visibilityModifiers','lightModifiers','windModifiers','rangeModifiers',
                                'attackTypeService', 
                                '$filter', '$ionicPopup',
                                function (attackerSituations, firingModes, choke, defenderSituations, coverService,
                                            equipmentService, ammoTypes,
                                            visibilityModifiers, lightModifiers, windModifiers, rangeModifiers,
                                            attackTypeService,
                                            $filter, $ionicPopup) {
        return {
            all: function() {

                var modifiers = [];
                
                angular.forEach(attackerSituations.all(), function(value, key) {modifiers.push(value);});

                angular.forEach(firingModes.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(choke.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(equipmentService.all(), function (value, key) { modifiers.push(value); });

                angular.forEach(ammoTypes.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(defenderSituations.all(), function (value, key) {modifiers.push(value);});
                
                angular.forEach(coverService.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(visibilityModifiers.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(lightModifiers.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(windModifiers.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(rangeModifiers.all(), function (value, key) {modifiers.push(value);});

                return modifiers;
            },

            selected: function() {
                var modifiers = [];
                angular.forEach(this.all(), function(value, key) {
                    if (value.checked) {
                        modifiers.push(value);
                    }
                });
                return modifiers;
            },

            affectsAttackerPool: function() {

                var modifiers = [];

                angular.forEach(this.selected(), function (value, key) {

                    if (value.attackerPool != 0 && attackTypeService.isModifierApplicable(value)) {
                        modifiers.push(value);
                    }
                });

                return modifiers;

            },

            attackerPoolTotal: function () {

                var total = 0;

                angular.forEach(this.affectsAttackerPool(), function (value, key) {

                    total = total + value.attackerPool;
                });

                return total;

            },

            affectsDv: function() {

                var modifiers = [];

                angular.forEach(this.selected(), function (value, key) {

                    if (value.dv != 0 && attackTypeService.isModifierApplicable(value)) {
                        modifiers.push(value);
                    }
                });

                return modifiers;

            },

            dvTotal: function () {

                var total = 0;

                angular.forEach(this.affectsDv(), function (value, key) {

                    total = total + value.dv;
                });

                return total;

            },

            affectsAp: function() {

                var modifiers = [];

                angular.forEach(this.selected(), function (value, key) {

                    if (value.ap != 0 && attackTypeService.isModifierApplicable(value)) {
                        modifiers.push(value);
                    }
                });

                return modifiers;

            },

            apTotal: function () {

                var total = 0;

                angular.forEach(this.affectsAp(), function (value, key) {

                    total = total + value.ap;
                });

                return total;

            },

            affectsDefenderPool: function() {

                var modifiers = [];

                angular.forEach(this.selected(), function (value, key) {
                    
                    if (value.defenderPool != 0 && attackTypeService.isModifierApplicable(value)) {
                        modifiers.push(value);
                    }
                });

                return modifiers;

            },

            defenderPoolTotal: function () {

                var total = 0;

                angular.forEach(this.affectsDefenderPool(), function (value, key) {

                    total = total + value.defenderPool;
                });

                return total;

            },


            validateSelection: function (currentSelection, toggleCurrentSelection) {
                
                var allSelected = this.selected();
                var all = this.all();
                
                var filteredResults;

                //if toggle current selection, then we need to change this items checked state
                if (toggleCurrentSelection)
                {
                    currentSelection.checked = !currentSelection.checked;
                }

               
                //max one cover
                filteredResults = $filter('filter')(allSelected, { cover: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //only one option in an exclusive group is allowed
                if (currentSelection.checked && currentSelection.exclusiveGroup != null) {
                    //get all selected modifiers where the exclusiveGroup is the same as the current selections exclusive group, and deselct them
                    filteredResults = $filter('filter')(all, { exclusiveGroup: currentSelection.exclusiveGroup});
                    angular.forEach(filteredResults, function(value, key) {
                         //do not modifer outselves
                         if (value != currentSelection) {
                            value.checked = false;    
                         }
                    });
                }

                //mutual groups must be chosen together
                if (currentSelection.mutualGroup != null) {
                    
                    //get all modifiers where the mutualGroup is the same as the current selections mutual group
                    filteredResults = $filter('filter')(all, { mutualGroup: currentSelection.mutualGroup });
                    angular.forEach(filteredResults, function(value, key) {
                         value.checked = currentSelection.checked;
                    });
                }
                
                return true;

            },

            formatStats: function (item, prefix, suffix, seperator) {

                if (item == null)
                {
                    return;
                }

                var stats = [];

                if (item.attackerPool && item.attackerPool != 0) {
                    stats.push('Att: ' + (item.attackerPool>=0?'+':'') + item.attackerPool);
                }

                if (item.defenderPool && item.defenderPool != 0) {
                    stats.push('Def: ' + (item.defenderPool >= 0 ? '+' : '') + item.defenderPool);
                }

                if (item.dv && item.dv != 0) {
                    stats.push('DV: ' + (item.dv >= 0 ? '+' : '') + item.dv);
                }

                if (item.ap && item.ap != 0) {
                    stats.push('AP: ' + (item.ap >= 0 ? '+' : '') + item.ap);
                }

                if (stats.length > 0) {
                    return prefix + stats.join(seperator) + suffix;
                } else {
                    return '';
                }

                
            }
    };



}])

.factory('attackTypeService', function () {

    var attackType = { name: 'Ranged' };

    return { 
        rangedAttackType: 'Ranged',

        meleeAttackType: 'Melee',
        
        attackType: attackType,
        
        isRangedAttack: function () { return attackType.name == this.rangedAttackType; },

        isMeleeAttack: function () { return attackType.name == this.meleeAttackType; },

        changeAttackType: function (newAttackType) {
            attackType.name = newAttackType;
            return attackType;
        },

        isModifierApplicable: function(modifier) {
            //if we are looking for ranged but we find a specific melee modifier, it is not applicable
            if (attackType.name == 'Ranged' && modifier.melee) {
                return false;
            }

            //if we are looking for melee but we find a specific ranged modifier, it is not applicable
            if (attackType.name == 'Melee' && modifier.ranged) {
                return false;
            }

            //in all other cases (including where no specific modifer is supplied) then we treat as applicable
            return true;
        }
    };
})

.factory('tablessStateService',['$rootScope', '$state', '$ionicHistory', '$ionicPlatform',  function ($rootScope, $state, $ionicHistory, $ionicPlatform) {

    return { 
        
        goBack: function () {            
                $state.go($rootScope.lastTabsState);
            },
        
        enable: function ($scope) {            
            $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                viewData.enableBack = true;
            });
            
            //nav back
            var oldSoftBack = $rootScope.$ionicGoBack;
            var deregisterSoftBack = function() { $rootScope.$ionicGoBack = oldSoftBack; };
            $rootScope.$ionicGoBack = function () {$state.go($rootScope.lastTabsState);};
    
            //andorid back button
            var deregisterHardBack = $ionicPlatform.registerBackButtonAction(function () { $state.go($rootScope.lastTabsState); }, 101);

            //restore default behaviour for other controllers
            $scope.$on('destroy', function() {
                deregisterHardBack();
                deregisterSoftBack();                
            });

        },

        showTablessView: function (newState, routingParameters) {
            
            $rootScope.lastTabsState = $ionicHistory.currentView().stateId;
            
            if (newState) {
                $state.go(newState, routingParameters);
            } else {
                console.log('New state was not specified!');
                $state.go('');
            }
            
        }
    };
}])


;
