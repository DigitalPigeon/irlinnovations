angular.module('starter.services', [])

.factory('RangedAttackerSituations', function() {

    var options = [
            {id: 1, name: 'Firing from Cover w/ Imaging', ap:0, dv: 0, pool: -3},
            {id: 2, name: 'Firing from Moving Vehicle', ap: 0, dv: 0, pool: -2},
            {id: 3, name: 'In Melee Combat', ap: 0, dv: 0, pool: -3 },
            {id: 4, name: 'Running', ap: 0, dv: 0, pool: -2 },
            {id: 5, name: 'Using Off-Hand Weapon', ap: 0, dv: 0, pool: -2 },
            {id: 6, name: 'Blind Fire', ap: 0, dv: 0, pool: -6 },
            {id: 7, name: 'Called Shot (Vitals)', ap: 0, dv: 2, pool: -4 },
            {id: 8, name: 'Wireless Smartgun (Gear)', ap: 0, dv: 0, pool: 1 },
            { id: 9, name: 'Wireless Smartgun (Essence)', ap: 0, dv: 0, pool: 2 }
        ];

    return {
        all: function () {
            return options;
        }
    };
})

    



.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
