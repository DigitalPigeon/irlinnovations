var dbversion = 2;

angular.module('starter.db', [])

.factory('db', function ($window) {

        var keyPrefix = function (table) {
            return dbversion + '-' + table + '-';
        };

        var createKey = function(table, key) {
            return keyPrefix(table) + key;
        };
        

        var retrieveJson = function(tableOrFullKey, key) {

            var jsonString = '';
            if (tableOrFullKey && key) {
                jsonString = $window.localStorage[createKey(tableOrFullKey, key)];
            } else {
                jsonString = $window.localStorage[tableOrFullKey];
            }

            if (jsonString) {
                var object = JSON.parse(jsonString);
                return object;
            } else {
                return null;
            }    
        };


        return {
        reset: function() {
            $window.localStorage.clear();
        },

        select: function (table, key) {
            console.log('select ' + key + ' @ ' + table);

            if (key) {
                return retrieveJson(table, key);
            } else {
                var items = [];

                angular.forEach(Object.keys(localStorage), function (value) {
                    if (value.startsWith(keyPrefix(table))) {
                        items.push(retrieveJson(value));
                    }
                });

                return items;

            }

        },
        insert: function (table, key, object) {
            console.log('insert ' + key + ' @ ' + table + ' with ' + JSON.stringify(object));
            $window.localStorage[createKey(table, key)] = JSON.stringify(object);
            return object;
        },

        update: function (table, key, object) {
            console.log('update ' + key + ' @ ' + table + ' to ' + JSON.stringify(object));
            $window.localStorage[createKey(table, key)] = JSON.stringify(object);
            return;
        },

        del: function (table, key) {
            console.log('delete ' + key + ' @ ' + table);
            $window.localStorage.removeItem(createKey(table, key));
            return;
        }
    }
})

;
