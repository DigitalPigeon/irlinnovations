angular.module('starter.services', [])

.factory('selectedModifiers', ['rangedAttackerSituations', 'meleeAttackerSituations', 'firingModes', 'defenderSituations',
                                'ammoTypes', 
                                'visibilityModifiers','lightModifiers','windModifiers','rangeModifiers',
                                function (rangedAttackerSituations, meleeAttackerSituations, firingModes, defenderSituations, 
                                            ammoTypes,
                                            visibilityModifiers, lightModifiers, windModifiers, rangeModifiers) {
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
    };



}])



.factory('rangedAttackerSituations', function() {

    var options = [
            { id: 1, name: 'Firing from Cover w/ Imaging', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0 },
            { id: 2, name: 'Firing from Moving Vehicle', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0 },
            { id: 3, name: 'In Melee Combat', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0 },
            { id: 4, name: 'Running', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0 },
            { id: 5, name: 'Using Off-Hand Weapon', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0 },
            { id: 6, name: 'Blind Fire', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0 },
            { id: 7, name: 'Called Shot (Vitals)', ap: 0, dv: 2, attackerPool: -4, defenderPool: 0 },
            { id: 8, name: 'Wireless Smartgun (Gear)', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0 },
            { id: 9, name: 'Wireless Smartgun (Essence)', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('meleeAttackerSituations', function() {

    var options = [
            { id: 1, name: 'Charging Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0 },
            { id: 2, name: 'Attacking from Prone', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0 },
            { id: 3, name: 'Superior Position', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0 },
            { id: 4, name: 'Off-Hand Weapon', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0 },
            { id: 5, name: 'Called Shot (Vitals)', ap: 0, dv: 0, attackerPool: -4, defenderPool: 0 },
            { id: 6, name: 'Defender Receiving Charge', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0 },
            { id: 7, name: 'Defender Prone', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0 },
            { id: 8, name: 'Touch-Only Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0 },
            { id: 9, name: 'Friend in Melee', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('firingModes', function () {

    var options = [
            { id: 1, name: 'Single Shot', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0 },
            { id: 2, name: 'Semi Automatic', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0 },
            { id: 3, name: 'Semi Automatic Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2 },
            { id: 4, name: 'Short Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -2 },
            { id: 5, name: 'Long Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -5 },
            { id: 4, name: 'Aimed Burst', ap: 0, dv: 1, attackerPool: 0, defenderPool: 0 },
            { id: 6, name: 'Full Auto Long Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -5 },
            { id: 7, name: 'Full Auto Full Burst', ap: 0, dv: 0, attackerPool: 0, defenderPool: -9 },
            { id: 8, name: 'Full Auto Brain Buster', ap: 0, dv: 2, attackerPool: 0, defenderPool: 0 },

            { id: 9, name: 'Shotgun Narrow Spread', ap: 0, dv: 0, attackerPool: 0, defenderPool: -1 },

            { id: 10, name: 'Shotgun Medium Spread @ Short', ap: 0, dv: -1, attackerPool: 0, defenderPool: -3 },
            { id: 11, name: 'Shotgun Medium Spread @ Medium', ap: 0, dv: -3, attackerPool: 0, defenderPool: -3 },
            { id: 12, name: 'Shotgun Medium Spread @ Long', ap: 0, dv: -5, attackerPool: 0, defenderPool: -3 },
            { id: 13, name: 'Shotgun Medium Spread @ Extreme', ap: 0, dv: -7, attackerPool: 0, defenderPool: -3 },

            { id: 14, name: 'Shotgun Wide Spread @ Short', ap: 0, dv: -3, attackerPool: 0, defenderPool: -5 },
            { id: 15, name: 'Shotgun Wide Spread @ Medium', ap: 0, dv: -5, attackerPool: 0, defenderPool: -5 },
            { id: 16, name: 'Shotgun Wide Spread @ Long', ap: 0, dv: -7, attackerPool: 0, defenderPool: -5 },
            { id: 17, name: 'Shotgun Wide Spread @ Extreme', ap: 0, dv: -9, attackerPool: 0, defenderPool: -5 }

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
            { id: 6, name: 'Good Cover', ap: 0, dv: 0, attackerPool: 0, defenderPool: 4 },
            { id: 7, name: 'Partial Cover', ap: 0, dv: 0, attackerPool: 0, defenderPool: 2 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})



.factory('ammoTypes', function () {

    var options = [
            { id: 1, name: 'APDS', ap: -4, dv: 0, attackerPool: 0, defenderPool: 0 },
            { id: 2, name: 'Explosive', ap: -1, dv: 1, attackerPool: 0, defenderPool: 0 },
            { id: 3, name: 'Flechette', ap: 5, dv: 2, attackerPool: 0, defenderPool: 0 },
            { id: 4, name: 'Gel', ap: 1, dv: 0, attackerPool: 0, defenderPool: 0 },
            { id: 5, name: 'Hollow Point', ap: 2, dv: 1, attackerPool: 0, defenderPool: 0 },
            { id: 6, name: 'Stick-n-Shock', ap: -5, dv: -2, attackerPool: 0, defenderPool: 0 },
            { id: 7, name: 'EX-Explosive', ap: -1, dv: 2, attackerPool: 0, defenderPool: 0 },
            { id: 8, name: 'Frangible', ap: 4, dv: -1, attackerPool: 0, defenderPool: 0 },
            { id: 9, name: 'Flare (@ <60m)', ap: 2, dv: -2, attackerPool: 0, defenderPool: 0 },
            { id: 10, name: 'Flare (@ 60m-62m)', ap: -3, dv: 2, attackerPool: 0, defenderPool: 0 },
            { id: 11, name: 'Tracker', ap: -2, dv: -2, attackerPool: 0, defenderPool: 0 },
            { id: 12, name: 'Capsule', ap: 4, dv: -4, attackerPool: 0, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('visibilityModifiers', function () {

    var options = [
            { id: 1, name: 'Light Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0 },
            { id: 2, name: 'Moderate Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0 },
            { id: 3, name: 'Heavy Rain / Fog / Smoke', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('lightModifiers', function () {

    var options = [
            { id: 1, name: 'Partial Light / Weak Glare', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0 },
            { id: 2, name: 'Dim Light / Moderate Glare', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0 },
            { id: 3, name: 'Total Darkness / Blinding Glare', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('windModifiers', function () {

    var options = [
            { id: 1, name: 'Light Winds', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0 },
            { id: 2, name: 'Moderate Winds', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0 },
            { id: 3, name: 'Heavy Winds', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('rangeModifiers', function () {

    var options = [
            { id: 1, name: 'Medium', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0 },
            { id: 2, name: 'Long', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0 },
            { id: 3, name: 'Extreme', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})
;
