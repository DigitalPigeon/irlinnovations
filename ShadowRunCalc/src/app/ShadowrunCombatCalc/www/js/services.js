angular.module('starter.services', [])


.factory('selectedModifiers', ['rangedAttackerSituations', 'meleeAttackerSituations', 'firingModes', 'choke', 'defenderSituations',
                                'equipment', 'ammoTypes', 
                                'visibilityModifiers','lightModifiers','windModifiers','rangeModifiers',
                                '$filter', '$ionicPopup',
                                function (rangedAttackerSituations, meleeAttackerSituations, firingModes, choke, defenderSituations, 
                                            equipment, ammoTypes,
                                            visibilityModifiers, lightModifiers, windModifiers, rangeModifiers,
                                            $filter, $ionicPopup) {
        return {
            all: function() {

                var selectedModifiers = [];
                
                angular.forEach(rangedAttackerSituations.all(), function(value, key) {
                
                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(meleeAttackerSituations.all(), function(value, key) {
                
                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(firingModes.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(choke.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(equipment.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(ammoTypes.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(defenderSituations.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(visibilityModifiers.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(lightModifiers.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(windModifiers.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                angular.forEach(rangeModifiers.all(), function (value, key) {

                    if (value.checked) {
                        selectedModifiers.push(value);
                    }
                });

                return selectedModifiers;
            },

            affectsAttackerPool: function() {

                var selectedModifiers = [];

                angular.forEach(this.all(), function (value, key) {

                    if (value.attackerPool != 0) {
                        selectedModifiers.push(value);
                    }
                });

                return selectedModifiers;

            },

            attackerPoolTotal: function () {

                var total = 0;

                angular.forEach(this.affectsAttackerPool(), function (value, key) {

                    total = total + value.attackerPool;
                });

                return total;

            },

            affectsDv: function() {

                var selectedModifiers = [];

                angular.forEach(this.all(), function (value, key) {

                    if (value.dv != 0) {
                        selectedModifiers.push(value);
                    }
                });

                return selectedModifiers;

            },

            dvTotal: function () {

                var total = 0;

                angular.forEach(this.affectsDv(), function (value, key) {

                    total = total + value.dv;
                });

                return total;

            },

            affectsAp: function() {

                var selectedModifiers = [];

                angular.forEach(this.all(), function (value, key) {

                    if (value.ap != 0) {
                        selectedModifiers.push(value);
                    }
                });

                return selectedModifiers;

            },

            apTotal: function () {

                var total = 0;

                angular.forEach(this.affectsAp(), function (value, key) {

                    total = total + value.ap;
                });

                return total;

            },

            affectsDefenderPool: function() {

                var selectedModifiers = [];

                angular.forEach(this.all(), function (value, key) {
                    
                    if (value.defenderPool != 0) {
                        selectedModifiers.push(value);
                    }
                });

                return selectedModifiers;

            },

            defenderPoolTotal: function () {

                var total = 0;

                angular.forEach(this.affectsDefenderPool(), function (value, key) {

                    total = total + value.defenderPool;
                });

                return total;

            },


            validateSelection: function (currentSelection) {
                console.log('filtering');
                var validateSuccess = true;
                var validationFailureReason = '';
                var allSelected = this.all();
                
                //can not combine ranged and melee. This should be confirmed
                var rangedSelections = $filter('filter')(allSelected, { ranged: true });
                var meleeSelections = $filter('filter')(allSelected, { melee: true });
                
                if (rangedSelections.length > 0 && meleeSelections.length > 0) {

                    var switchingTo = currentSelection.ranged ? 'Ranged' : 'Melee';
                    var switchingFrom = currentSelection.ranged ? 'Melee' : 'Ranged';

                    $ionicPopup.confirm({
                        title: 'Switch to ' + switchingTo,
                        template: 'Deselect all ' + switchingFrom + ' options?'
                    })
                    .then(function(response) {
                        if (response) {
                            //user chose to switch, so if we were ranged, clear all melee... 
                            if (currentSelection.ranged) {
                                angular.forEach(meleeSelections, function(value, key) { value.checked = false; });
                            } 
                            //... and if we were melee, clear all ranged
                            else {
                                angular.forEach(rangedSelections, function(value, key) { value.checked = false; });
                            }
                        } 
                        //user chose to keep original attack type, so clear the one he just chose
                        else {
                            currentSelection.checked = false;
                        }
                    });
                }

                var filteredResults;

                //can not use multiple smartgun options
                filteredResults = $filter('filter')(allSelected, { smartgun: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }
                
                //can not use multiple smartgun options
                filteredResults = $filter('filter')(allSelected, { choke: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //max one fire mode
                filteredResults = $filter('filter')(allSelected, { fireMode: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //max one cover
                filteredResults = $filter('filter')(allSelected, { cover: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //max one ammo
                filteredResults = $filter('filter')(allSelected, { ammo: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //visibility one ammo
                filteredResults = $filter('filter')(allSelected, { visibility: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //light one ammo
                filteredResults = $filter('filter')(allSelected, { light: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //wind one ammo
                filteredResults = $filter('filter')(allSelected, { wind: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                //range one ammo
                filteredResults = $filter('filter')(allSelected, { range: true });
                if (filteredResults.length > 1) {
                    angular.forEach(filteredResults, function(value, key) { value.checked = false; });
                    currentSelection.checked = true;
                }

                

                if (!validateSuccess) {
                    console.log(validationFailureReason);
                    currentSelection.checked = !currentSelection.checked;

                    $ionicPopup.alert({
                         title: 'Invalid Selection!',
                         template: validationFailureReason
                       });
                }

                return validateSuccess;

            },
    };



}])



.factory('rangedAttackerSituations', function() {

    var options = [
            { id: 1, name: 'Firing from Cover w/ Imaging', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, ranged: true },
            { id: 2, name: 'Firing from Moving Vehicle', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 3, name: 'In Melee Combat', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, ranged: true },
            { id: 4, name: 'Running', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 5, name: 'Using Off-Hand Weapon', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 6, name: 'Blind Fire', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, ranged: true },
            { id: 7, name: 'Called Shot (Vitals)', ap: 0, dv: 2, attackerPool: -4, defenderPool: 0, ranged: true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('meleeAttackerSituations', function() {

    var options = [
            { id: 1, name: 'Charging Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 2, name: 'Attacking from Prone', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, melee: true },
            { id: 3, name: 'Superior Position', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 4, name: 'Off-Hand Weapon', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, melee: true },
            { id: 5, name: 'Called Shot (Vitals)', ap: 0, dv: 0, attackerPool: -4, defenderPool: 0, melee: true },
            { id: 6, name: 'Defender Receiving Charge', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true },
            { id: 7, name: 'Defender Prone', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true },
            { id: 8, name: 'Touch-Only Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 9, name: 'Friend in Melee', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('firingModes', function () {

    var options = [
            { id: 1, name: 'Single Shot', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0, fireMode: true, ranged: true },
            { id: 2, name: 'Semi Automatic', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0, fireMode: true, ranged: true },
            { id: 3, name: 'Semi Automatic Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2, fireMode: true, ranged: true },
            { id: 4, name: 'Short Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2, fireMode: true, ranged: true },
            { id: 5, name: 'Long Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -5, fireMode: true, ranged: true },
            { id: 4, name: 'Aimed Burst', ap: 0, dv: 1, attackerPool: 0, defenderPool: 0, fireMode: true, ranged: true },
            { id: 6, name: 'Full Auto Long Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -5, fireMode: true, ranged: true },
            { id: 7, name: 'Full Auto Full Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -9, fireMode: true, ranged: true },
            { id: 8, name: 'Full Auto Brain Buster', ap: 0, dv: 2, attackerPool: 0, defenderPool: 0, fireMode: true, ranged: true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('choke', function () {

    var options = [
            { id: 1, name: 'Shotgun Narrow Spread', ap: 0, dv: 0, attackerPool: 0, defenderPool: -1, choke: true, ranged: true },
            { id: 2, name: 'Shotgun Medium Spread @ Short', ap: 0, dv: -1, attackerPool: 0, defenderPool: -3, choke: true, ranged: true },
            { id: 3, name: 'Shotgun Medium Spread @ Medium', ap: 0, dv: -3, attackerPool: 0, defenderPool: -3, choke: true, ranged: true },
            { id: 4, name: 'Shotgun Medium Spread @ Long', ap: 0, dv: -5, attackerPool: 0, defenderPool: -3, choke: true, ranged: true },
            { id: 5, name: 'Shotgun Medium Spread @ Extreme', ap: 0, dv: -7, attackerPool: 0, defenderPool: -3, choke: true, ranged: true },
            { id: 6, name: 'Shotgun Wide Spread @ Short', ap: 0, dv: -3, attackerPool: 0, defenderPool: -5, choke: true, ranged: true },
            { id: 7, name: 'Shotgun Wide Spread @ Medium', ap: 0, dv: -5, attackerPool: 0, defenderPool: -5, choke: true, ranged: true },
            { id: 8, name: 'Shotgun Wide Spread @ Long', ap: 0, dv: -7, attackerPool: 0, defenderPool: -5, choke: true, ranged: true },
            { id: 9, name: 'Shotgun Wide Spread @ Extreme', ap: 0, dv: -9, attackerPool: 0, defenderPool: -5, choke: true, ranged: true }

        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('defenderSituations', function () {

    var options = [
            { id: 1, name: 'Inside Moving Vehicle', ap: 0, dv: 0, attackerPool: 0, defenderPool: 3 },
            { id: 2, name: 'Prone', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2 },
            { id: 3, name: 'Set to Receive Charge', ap: 0, dv: 0, attackerPool: 0, defenderPool: 1 },
            { id: 4, name: 'In Melee Targeted by Ranged', ap: 0, dv: 0, attackerPool: 0, defenderPool: -3 },
            { id: 5, name: 'Running', ap: 0, dv: 0, attackerPool: 0, defenderPool: 2 },
            { id: 6, name: 'Good Cover', ap: 0, dv: 0, attackerPool: 0, defenderPool: 4, cover:true },
            { id: 7, name: 'Partial Cover', ap: 0, dv: 0, attackerPool: 0, defenderPool: 2, cover:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})



.factory('ammoTypes', function () {

    var options = [
            { id: 1, name: 'APDS', ap: -4, dv: 0, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 2, name: 'Explosive', ap: -1, dv: 1, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 3, name: 'Flechette', ap: 5, dv: 2, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 4, name: 'Gel', ap: 1, dv: 0, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 5, name: 'Hollow Point', ap: 2, dv: 1, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 6, name: 'Stick-n-Shock', ap: -5, dv: -2, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 7, name: 'EX-Explosive', ap: -1, dv: 2, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 8, name: 'Frangible', ap: 4, dv: -1, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 9, name: 'Flare (@ <60m)', ap: 2, dv: -2, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 10, name: 'Flare (@ 60m-62m)', ap: -3, dv: 2, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 11, name: 'Tracker', ap: -2, dv: -2, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true },
            { id: 12, name: 'Capsule', ap: 4, dv: -4, attackerPool: 0, defenderPool: 0, ammo: true, ranged: true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('equipment', function () {

    var options = [
            { id: 1, name: 'Wireless Smartgun (Gear)', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, ranged: true, smartgun:true },
            { id: 2, name: 'Wireless Smartgun (Essence)', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, ranged: true, smartgun:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('visibilityModifiers', function () {

    var options = [
            { id: 1, name: 'Light Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, visibility:true },
            { id: 2, name: 'Moderate Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, visibility:true },
            { id: 3, name: 'Heavy Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, visibility:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('lightModifiers', function () {

    var options = [
            { id: 1, name: 'Partial Light / Weak Glare', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, light:true },
            { id: 2, name: 'Dim Light / Moderate Glare', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, light:true },
            { id: 3, name: 'Total Darkness / Blinding Glare', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, light:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('windModifiers', function () {

    var options = [
            { id: 1, name: 'Light Winds', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, wind:true },
            { id: 2, name: 'Moderate Winds', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, wind:true },
            { id: 3, name: 'Heavy Winds', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, wind:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('rangeModifiers', function () {

    var options = [
            { id: 1, name: 'Medium', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, range:true },
            { id: 2, name: 'Long', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment:true, range:true },
            { id: 3, name: 'Extreme', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment:true, range:true }
        ];

    return {
        all: function () {
            return options;
        }
    };
})
;
