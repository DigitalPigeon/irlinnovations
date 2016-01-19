angular.module('starter.services', [])


.factory('modifiersService', ['attackerSituations', 'firingModes', 'choke', 'defenderSituations', 'coverService',
                                'equipment', 'ammoTypes', 
                                'visibilityModifiers','lightModifiers','windModifiers','rangeModifiers',
                                'attackTypeService', 
                                '$filter', '$ionicPopup',
                                function (attackerSituations, firingModes, choke, defenderSituations, coverService,
                                            equipment, ammoTypes,
                                            visibilityModifiers, lightModifiers, windModifiers, rangeModifiers,
                                            attackTypeService,
                                            $filter, $ionicPopup) {
        return {
            all: function() {

                var modifiers = [];
                
                angular.forEach(attackerSituations.all(), function(value, key) {modifiers.push(value);});

                angular.forEach(firingModes.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(choke.all(), function (value, key) {modifiers.push(value);});

                angular.forEach(equipment.all(), function (value, key) {modifiers.push(value);});

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
                
                if (item.attackerPool != 0) {
                    stats.push('Att: ' + (item.attackerPool>=0?'+':'') + item.attackerPool);
                }

                if (item.defenderPool != 0) {
                    stats.push('Def: ' + (item.defenderPool >= 0 ? '+' : '') + item.defenderPool);
                }

                if (item.dv != 0) {
                    stats.push('DV: ' + (item.dv >= 0 ? '+' : '') + item.dv);
                }

                if (item.ap != 0) {
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
        
        enable: function ($scope) {
            
            $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                viewData.enableBack = true;
            });

            //override back button behavior
            var customBack = function() {
                $state.go($rootScope.lastTabsState);
            }

            //nav back
            var oldSoftBack = $rootScope.$ionicGoBack;
            var deregisterSoftBack = function() { $rootScope.$ionicGoBack = oldSoftBack; };
            $rootScope.$ionicGoBack = customBack;
    
            //andorid back button
            var deregisterHardBack = $ionicPlatform.registerBackButtonAction(customBack, 101);

            //restore default behaviour for other controllers
            $scope.$on('destroy', function() {
                deregisterHardBack();
                deregisterSoftBack();
            });

        },

        showTablessView: function (newState) {
            $rootScope.lastTabsState = $ionicHistory.currentView().stateId;
            $state.go(newState);
        }
    };
}])


.factory('attackerSituations', function() {

    var options = [
            { id: 1, name: 'Firing from Cover w/ Imaging', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, ranged: true },
            { id: 2, name: 'Firing from Moving Vehicle', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 3, name: 'In Melee Combat', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, ranged: true },
            { id: 4, name: 'Running', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 5, name: 'Using Off-Hand Weapon', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 6, name: 'Blind Fire', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, ranged: true },
            { id: 7, name: 'Called Shot (Vitals)', ap: 0, dv: 2, attackerPool: -4, defenderPool: 0, ranged: true },
            
            { id: 8, name: 'Charging Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 9, name: 'Attacking from Prone', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, melee: true },
            { id: 10, name: 'Superior Position', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 11, name: 'Off-Hand Weapon', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, melee: true },
            { id: 12, name: 'Called Shot (Vitals)', ap: 0, dv: 0, attackerPool: -4, defenderPool: 0, melee: true },
            { id: 13, name: 'Defender Receiving Charge', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true, mutualGroup: 'setToReceiveCharge' },
            { id: 14, name: 'Defender Prone', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true, mutualGroup: 'defenderProne' },
            { id: 15, name: 'Touch-Only Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 16, name: 'Friend in Melee', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('firingModes', function () {

    var options = [
            { id: 1, name: 'Single Shot', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'fireMode', ranged: true },
            { id: 2, name: 'Semi Automatic', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'fireMode', ranged: true },
            { id: 3, name: 'Semi Automatic Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2, exclusiveGroup: 'fireMode', ranged: true },
            { id: 4, name: 'Short Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2, exclusiveGroup: 'fireMode', ranged: true },
            { id: 5, name: 'Long Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -5, exclusiveGroup: 'fireMode', ranged: true },
            { id: 4, name: 'Aimed Burst', ap: 0, dv: 1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'fireMode', ranged: true },
            { id: 6, name: 'Full Auto Long Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -5, exclusiveGroup: 'fireMode', ranged: true },
            { id: 7, name: 'Full Auto Full Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -9, exclusiveGroup: 'fireMode', ranged: true },
            { id: 8, name: 'Full Auto Brain Buster', ap: 0, dv: 2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'fireMode', ranged: true }
        ];

    return {
        all: function () {
            return options;    
        },

        selected: function () {
            var firingMode = null;                    
            angular.forEach(this.all(), function (value, item) {
                if (value.checked) {                    
                    firingMode =  value;
                }
            });
            return firingMode;
        }
    };
})

.factory('choke', function () {

    var options = [
            { id: 1, name: 'Shotgun Narrow Spread', ap: 0, dv: 0, attackerPool: 0, defenderPool: -1, exclusiveGroup: 'choke', ranged: true },
            { id: 2, name: 'Shotgun Medium Spread @ Short', ap: 0, dv: -1, attackerPool: 0, defenderPool: -3, exclusiveGroup: 'choke', ranged: true },
            { id: 3, name: 'Shotgun Medium Spread @ Medium', ap: 0, dv: -3, attackerPool: 0, defenderPool: -3, exclusiveGroup: 'choke', ranged: true },
            { id: 4, name: 'Shotgun Medium Spread @ Long', ap: 0, dv: -5, attackerPool: 0, defenderPool: -3, exclusiveGroup: 'choke', ranged: true },
            { id: 5, name: 'Shotgun Medium Spread @ Extreme', ap: 0, dv: -7, attackerPool: 0, defenderPool: -3, exclusiveGroup: 'choke', ranged: true },
            { id: 6, name: 'Shotgun Wide Spread @ Short', ap: 0, dv: -3, attackerPool: 0, defenderPool: -5, exclusiveGroup: 'choke', ranged: true },
            { id: 7, name: 'Shotgun Wide Spread @ Medium', ap: 0, dv: -5, attackerPool: 0, defenderPool: -5, exclusiveGroup: 'choke', ranged: true },
            { id: 8, name: 'Shotgun Wide Spread @ Long', ap: 0, dv: -7, attackerPool: 0, defenderPool: -5, exclusiveGroup: 'choke', ranged: true },
            { id: 9, name: 'Shotgun Wide Spread @ Extreme', ap: 0, dv: -9, attackerPool: 0, defenderPool: -5, exclusiveGroup: 'choke', ranged: true }

        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('coverService', function () {

    var options = [
            { id: 1, name: 'Partial Cover', ap: 0, dv: 0, attackerPool: 0, defenderPool: 2, exclusiveGroup: 'cover' },
            { id: 2, name: 'Good Cover', ap: 0, dv: 0, attackerPool: 0, defenderPool: 4, exclusiveGroup: 'cover' }
            
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('defenderSituations', function () {

    var options = [
            { id: 1, name: 'Prone', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2, mutualGroup: 'defenderProne' },
            { id: 2, name: 'Running', ap: 0, dv: 0, attackerPool: 0, defenderPool: 2 },
            { id: 3, name: 'Inside Moving Vehicle', ap: 0, dv: 0, attackerPool: 0, defenderPool: 3 },
            { id: 4, name: 'Set to Receive Charge', ap: 0, dv: 0, attackerPool: 0, defenderPool: 1, melee:true, mutualGroup: 'setToReceiveCharge' },
            { id: 5, name: 'In Melee Targeted by Ranged', ap: 0, dv: 0, attackerPool: 0, defenderPool: -3, ranged:true }
            
        ];

    return {
        all: function () {
            return options;
        }
    };
})



.factory('ammoTypes', function () {

    var options = [
            { id: 1, name: 'APDS', ap: -4, dv: 0, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 2, name: 'Explosive', ap: -1, dv: 1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 3, name: 'Flechette', ap: 5, dv: 2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 4, name: 'Gel', ap: 1, dv: 0, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 5, name: 'Hollow Point', ap: 2, dv: 1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 6, name: 'Stick-n-Shock', ap: -5, dv: -2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 7, name: 'EX-Explosive', ap: -1, dv: 2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 8, name: 'Frangible', ap: 4, dv: -1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 9, name: 'Flare @ <60m', ap: 2, dv: -2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 10, name: 'Flare @ 60m-62m', ap: -3, dv: 2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 11, name: 'Tracker', ap: -2, dv: -2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 12, name: 'Capsule', ap: 4, dv: -4, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('equipment', function () {

    var options = [
            { id: 1, name: 'Wireless Smartgun (Gear)', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, ranged: true, exclusiveGroup: 'smartgun' },
            { id: 2, name: 'Wireless Smartgun (Essence)', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, ranged: true, exclusiveGroup: 'smartgun' }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('visibilityModifiers', function () {

    var options = [
            { id: 1, name: 'Light Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, exclusiveGroup: 'visibility' },
            { id: 2, name: 'Moderate Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, exclusiveGroup: 'visibility' },
            { id: 3, name: 'Heavy Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, exclusiveGroup: 'visibility' }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('lightModifiers', function () {

    var options = [
            { id: 1, name: 'Partial Light / Weak Glare', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, exclusiveGroup: 'light' },
            { id: 2, name: 'Dim Light / Moderate Glare', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, exclusiveGroup: 'light' },
            { id: 3, name: 'Total Darkness / Blinding Glare', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, exclusiveGroup: 'light' }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('windModifiers', function () {

    var options = [
            { id: 1, name: 'Light Winds', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, exclusiveGroup: 'wind', ranged:true },
            { id: 2, name: 'Moderate Winds', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, exclusiveGroup: 'wind', ranged:true },
            { id: 3, name: 'Heavy Winds', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, exclusiveGroup: 'wind', ranged:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('rangeModifiers', function () {

    var options = [
            { id: 1, name: 'Medium', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, exclusiveGroup: 'range', ranged:true },
            { id: 2, name: 'Long', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, exclusiveGroup: 'range', ranged:true },
            { id: 3, name: 'Extreme', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, exclusiveGroup: 'range', ranged:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})
;
