angular.module('starter.data', [])
    
.factory('attackerSituations', function() {

    var options = [
            { id: 1, name: 'Firing from Cover w/ Imaging', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, ranged: true},
            { id: 2, name: 'Firing from Moving Vehicle', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 3, name: 'In Melee Combat', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, ranged: true },
            { id: 4, name: 'Running', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0, ranged: true },
            { id: 6, name: 'Blind Fire', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, ranged: true },
            
            { id: 8, name: 'Charging Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 9, name: 'Attacking from Prone', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, melee: true },
            { id: 10, name: 'Superior Position', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 13, name: 'Attacker has Net Reach', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee:true, allowMultiple: true, exclusiveGroup: 'netReach'},
            { id: 14, name: 'Defender Prone', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true, mutualGroup: 'defenderProne' },
            { id: 15, name: 'Touch-Only Attack', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, melee: true },
            { id: 16, name: 'Friend in Melee', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, melee: true },            

            { id: 12, name: 'Called Shot (Vitals)', ap: 0, dv: 2, attackerPool: -4, defenderPool: 0 },
            { id: 11, name: 'Off-Hand Weapon', ap: 0, dv: 0, attackerPool: -2, defenderPool: 0 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

.factory('character', function () {

    var newCharacter = function() {
        return {
            initialized: true,
            name: '',
            agility: 0,
            strength: 0
        };
    };

    var character = {initialized: false};
    
    return {        
        character: function () {
            return character;
        },
        createNewCharacter: function () {
            character = newCharacter();
            return character;
        },
        uninitialize: function() {
            character.initialized = false;
        }
    };
})

.factory('equipment', function () {

    var options = [
                        { id: 1, name: 'Wireless Smartgun (Gear)', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, ranged: true, exclusiveGroup: 'smartgun', isCharacterModifier: true },
                        { id: 2, name: 'Wireless Smartgun (Essence)', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, ranged: true, exclusiveGroup: 'smartgun', isCharacterModifier: true }
    ]

    return {
        all: function () {
            return options;
        }
    };
})

.factory('adeptPowers', function () {

        var options = [
                            { id: 1, name: 'Critical Strike', ap: 0, dv: 1, attackerPool: 0, defenderPool: 0, melee: true, isCharacterModifier: true },
                            { id: 2, name: 'Penatrating Strike', ap: -1, dv: 0, attackerPool: 0, defenderPool: 0, melee: true, allowMultiple: true, isCharacterModifier: true }
        ]

        return {
            all: function () {
                return options;
            }
        };
    })

.factory('martialArts', function () {

    var options = [
            { id: 17, name: 'Finishing Move', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, edge: 1, initiative: -10, melee: true, exclusiveGroup: 'action', notes: 'Once per combat turn.' },
            { id: 18, name: 'Flying Kick', ap: 0, dv: 0, attackerPool: 1, defenderPool: 0, reach: 1, melee: true, exclusiveGroup: 'action', notes: 'Requires move from at least 1m. If uncessfull, suffer -1 defence tests until next phase.' },
            { id: 19, name: 'Full Offence', ap: 0, dv: 0, attackerPool: 2, defenderPool: 0, initiative: -5, melee: true, exclusiveGroup: 'action', notes: 'No defensive interupts until next action phase.' },
            { id: 20, name: 'Half Sword', ap: 2, dv: 0, attackerPool: 0, defenderPool: 0, melee: true, exclusiveGroup: 'action', notes: 'Blades only. Requires two hands. -2 on next non-defense action if this attack fails.' },
            { id: 21, name: 'Haymaker', ap: 0, dv: 1, attackerPool: 0, defenderPool: 2, melee: true, exclusiveGroup: 'action', },
            { id: 22, name: 'Pouncing Dragon', ap: 0, dv: 2, attackerPool: 0, defenderPool: 0, melee: true, exclusiveGroup: 'action', notes: 'Requires superior position or the target being prone.' }
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
            { id: 9, name: 'Double Tap', ap: 0, dv: 1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'fireMode', ranged: true },
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
        }
    };
})

.factory('choke', function () {

    var options = [
            { id: 1, name: 'Narrow Spread', ap: 0, dv: 0, attackerPool: 0, defenderPool: -1, exclusiveGroup: 'choke', requires:'flechette', ranged: true },
            { id: 2, name: 'Medium Spread', ap: 0, dv: 0, attackerPool: 0, defenderPool: -3, exclusiveGroup: 'choke', requires:'flechette', ranged: true },
            { id: 3, name: 'Wide Spread', ap: 0, dv: 0, attackerPool: 0, defenderPool: -5, exclusiveGroup: 'choke', requires: 'flechette', ranged: true }
            

        ];

    return {
        all: function () {
            return options;
        }
    };
})


.factory('suppressed', function () {

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
            { id: 4, name: 'Set to Receive Charge', ap: 0, dv: 0, attackerPool: 0, defenderPool: 1, melee:true},
            { id: 5, name: 'In Melee Targeted by Ranged', ap: 0, dv: 0, attackerPool: 0, defenderPool: -3, ranged: true },
            { id: 6, name: 'Defender has Net Reach', ap: 0, dv: 0, attackerPool: 0, defenderPool: 1, melee: true, allowMultiple: true, exclusiveGroup: 'netReach' }
            
        ];

    return {
        all: function () {
            return options;
        }
    };
})



.factory('ammoTypes', function () {

    var options = [
            { id: 3, name: 'Regular Ammo', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 3, name: 'APDS', ap: -4, dv: 0, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 4, name: 'Explosive', ap: -1, dv: 1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 5, name: 'Flechette', ap: 5, dv: 2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', requiredBy: 'flechette', ranged: true },
            { id: 6, name: 'Gel', ap: 1, dv: 0, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 7, name: 'Hollow Point', ap: 2, dv: 1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 8, name: 'Stick-n-Shock', ap: -5, dv: -2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 9, name: 'EX-Explosive', ap: -1, dv: 2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 10, name: 'Frangible', ap: 4, dv: -1, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 11, name: 'Flare @ <60m', ap: 2, dv: -2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 12, name: 'Flare @ 60m-62m', ap: -3, dv: 2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 13, name: 'Tracker', ap: -2, dv: -2, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true },
            { id: 14, name: 'Capsule', ap: 4, dv: -4, attackerPool: 0, defenderPool: 0, exclusiveGroup: 'ammo', ranged: true }
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
            { id: 1, name: 'Short Range', ap: 0, dv: 0, attackerPool: 0, defenderPool: 0, environment: true, exclusiveGroup: 'range', ranged: true },
            { id: 2, name: 'Medium Range', ap: 0, dv: 0, attackerPool: -1, defenderPool: 0, environment:true, exclusiveGroup: 'range', ranged:true },
            { id: 3, name: 'Long Range', ap: 0, dv: 0, attackerPool: -3, defenderPool: 0, environment: true, exclusiveGroup: 'range', ranged: true },
            { id: 4, name: 'Extreme Range', ap: 0, dv: 0, attackerPool: -6, defenderPool: 0, environment: true, exclusiveGroup: 'range', ranged: true }
        ];

    return {
        all: function () {
            return options;
        },

        infoPageState: 'app.infoRange'
    
    };
})
;
