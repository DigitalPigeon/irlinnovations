angular.module('starter.services', [])

.factory('tabAnimationService', function() {
        var tabTracker = { tabIndex: 1 };

        return {
            getTransition: function(newTabIndex) {
                var oldTabIndex = tabTracker.tabIndex;
                tabTracker.tabIndex = newTabIndex;
                                
                if (oldTabIndex > newTabIndex) {
                    
                    return 'slideInLeft';
                } else if (oldTabIndex < newTabIndex) {
                    return 'slideInRight';
                } else {
                    return 'fadeIn';
                }
            }
        }
    })

.factory('modifiersService', ['attackerSituations', 'firingModes', 'choke', 'defenderSituations', 'coverService',
                                'equipmentService', 'ammoTypes', 
                                'visibilityModifiers','lightModifiers','windModifiers','rangeModifiers',
                                'attackTypeService', 
                                '$filter', '$ionicPopup', '$state',
                                function (attackerSituations, firingModes, choke, defenderSituations, coverService,
                                            equipmentService, ammoTypes,
                                            visibilityModifiers, lightModifiers, windModifiers, rangeModifiers,
                                            attackTypeService,
                                            $filter, $ionicPopup, $state) {
        return {

            all: function () {

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

            reset: function () {
                angular.forEach(this.all(), function (value, key) {
                    value.checked = false;
                });
                attackTypeService.changeAttackType(attackTypeService.rangedAttackType);
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

            selectedChecksum: function () {
                var checksum = 0;
                angular.forEach(this.all(), function (value, key) {
                    if (value.checked) {
                        checksum += value.id;
                    }
                });
                return checksum;
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

                    total = total + (value.attackerPoolCap != null ? value.attackerPoolCap : (value.multiplier ? value.multiplier * value.attackerPool : value.attackerPool));
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

                    total = total + (value.multiplier ? value.multiplier * value.dv : value.dv);
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

                    total = total + (value.multiplier ? value.multiplier * value.ap : value.ap);
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

                    total = total + (value.multiplier ? value.multiplier * value.defenderPool : value.defenderPool);
                });

                return total;

            },


            validateSelection: function (currentSelection, toggleCurrentSelection, recursiveCallers) {
                
                service = this;
                recursiveCallers = recursiveCallers || [];

                var recurse = function (itemToRecurse) {
                    if (!$filter('filter')(this.recursiveCallers, function(recursiveCaller) {itemToRecurse == recursiveCaller}))
                    {
                        console.log('recurse ' + itemToRecurse.name)
                        recursiveCallers.push(currentSelection);
                        service.validateSelection(itemToRecurse, null, recursiveCallers);
                    }
                    {
                        console.log('do not recurse ' + itemToRecurse.name)
                    }
                };

                var allSelected = service.selected();
                var all = service.all();

                var filteredResults;                            

                var recusive = function (c, t) { return validateSelection(c, t); }

                //if toggle current selection, then we need to change this items checked state
                if (toggleCurrentSelection)
                {
                    currentSelection.checked = !currentSelection.checked;
                }

                //check if this requires anything else and we are enabling it
                if (currentSelection.requires && currentSelection.checked) {
                    filteredResults = $filter('filter')(all, { requiredBy: currentSelection.requires });
                    angular.forEach(filteredResults, function (value, key) {
                        if (!value.checked) {
                            value.checked = true;
                            recurse(value);
                        }                        
                    });
                    }
                
                //check if this is required by anything else and we are disabling it
                if (currentSelection.requiredBy && !currentSelection.checked) {
                    filteredResults = $filter('filter')(all, { requires: currentSelection.requiredBy });
                    angular.forEach(filteredResults, function (value, key) {
                        if (value.checked)
                        {
                            value.checked = false;
                            recurse(value);
                        }
                        
                    });
                }

               
                //only one option in an exclusive group is allowed
                if (currentSelection.checked && currentSelection.exclusiveGroup != null) {
                    //get all selected modifiers where the exclusiveGroup is the same as the current selections exclusive group, and deselct them
                    filteredResults = $filter('filter')(all, { exclusiveGroup: currentSelection.exclusiveGroup});
                    angular.forEach(filteredResults, function(value, key) {
                         //do not modifer outselves
                         if (value != currentSelection && (value.checked || value.multiplier)) {
                             value.checked = false;
                             value.multiplier = null;
                             recurse(value);
                         }
                    });
                }

                //mutual groups must be chosen together
                if (currentSelection.mutualGroup != null) {
                    
                    //get all modifiers where the mutualGroup is the same as the current selections mutual group
                    filteredResults = $filter('filter')(all, { mutualGroup: currentSelection.mutualGroup });
                    angular.forEach(filteredResults, function(value, key) {
                        if (value.checked != currentSelection.checked)
                        {
                            value.checked = currentSelection.checked;
                            recurse(value);
                        }
                        
                    });
                }

                //picking a multi selecter requires the user to provide a multiplier
                 if (currentSelection.allowMultiple) {
                     if (currentSelection.checked) {
                         $ionicPopup.prompt({ title: currentSelection.name, inputType:'number' })
                             .then(function(result) {
                                 if (result && currentSelection.multiplier != result) {
                                     currentSelection.multiplier = result;
                                 } 
                                 //if the user doesn't supply a number, deleselt the option and clear the multiplier
                                 else if (!result && (currentSelection.checked || currentSelection.multiplier)) {
                                     currentSelection.checked = false;
                                     currentSelection.multiplier = null;
                                     recurse(value);
                                 }
                             });
                         } else {
                         {
                             currentSelection.multiplier = null;
                         }
                     }
                 }

                //there is a max limit penalty of -10 for environmental modifiers
                //do not allow these to exceed 10. if they do, we need to apply caps on each over the limit
                if (currentSelection.environment != null) {
                    var minEnvironment = -10;
                    var environment = 0;

                    filteredResults = $filter('filter')(all, { environment: true });
                    angular.forEach(filteredResults, function (value, key) {
                        if (value.checked)
                        {
                            if (environment + value.attackerPool < minEnvironment)
                            {
                                var cap = minEnvironment - environment;
                                value.attackerPoolCap = cap;
                            }
                            else
                            {
                                value.attackerPoolCap = null;
                            }

                            environment += value.attackerPoolCap!=null?value.attackerPoolCap: value.attackerPool;
                        }
                    });

                }
                
                return true;

            },
            

            formatStats: function (item, prefix, suffix, seperator, simpleFormatFor) {

                if (item == null)
                {
                    return;
                }

                var stats = [];

                var addStat = function(name, value, multiplier) {
                    if (value && value != 0) {
                        if (multiplier) { value = value * multiplier; }

                        var formatString = '';

                        //only add stamps when not looking for the simple format, or when looking for the simple format
                        //and the stat matches the stat looked for in the simple format
                        if (!simpleFormatFor || simpleFormatFor == name) {

                            //add a name if not doing simple format
                            if (!simpleFormatFor) {
                                formatString = name + ': ';
                            }

                            stats.push(formatString + (value >= 0 ? '+' : '') + value);
                        }
                    }   
                };

                addStat('Att', item.attackerPool, item.multiplier);
                addStat('Def', item.defenderPool, item.multiplier);
                addStat('DV', item.dv, item.multiplier);
                addStat('AP', item.ap, item.multiplier);

                if (stats.length > 0) {
                    return prefix + (item.multiplier?'x' + item.multiplier + ' = ':'') + stats.join(seperator) + suffix;
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

        isModifierApplicable: function (modifiers) {

            var isArray = angular.isArray(modifiers);
            var validCount = 0;

            if (!isArray) {
                modifiers = [modifiers];
            }

            angular.forEach(modifiers, function(value, key) {

                //if we are looking for ranged but we find a specific melee modifier, it is not applicable
                if (attackType.name == 'Ranged' && value.melee) {
                    return false;
                }

                //if we are looking for melee but we find a specific ranged modifier, it is not applicable
                if (attackType.name == 'Melee' && value.ranged) {
                    return false;
                }

                //this item is valid for this attack type
                validCount += 1;
                return true;
            });

            //if at least one specified item is value, then return true
            return validCount >= 1;
            
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
} ])


;
