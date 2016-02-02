var domain = function (db, table, keyValueSelector, components)
{
    return {

        retrieve: function (key) {
            var item = db.select(table, key);
            console.log('retrieved');
            return item;
        },

        retrieveInto: function (key, itemToUpdate) {
            var item = db.select(table, key);
            angular.copy(item, itemToUpdate);
            console.log('retrieved into');
            return item;
        },

        retrieveAll: function () {
            var items = db.select(table);
            console.log('retrieved all');
            return items;
        },

        del: function (key) {
            db.del(table, key);
            console.log('deleted');
            return;
        },

        persist: function (item) {

            angular.forEach(components, function (value) {
                if (!item[value])
                    {throw ('Entity ' + table + ' requires a property of ' + value);}
            });

            if (!keyValueSelector(item))
            {
                throw ('Key selector returns null: ' + keyValueSelector);
            }

            if (!item.key) {
                item.key = keyValueSelector(item);
                db.insert(table, item.key, item);
            }
            else if (keyValueSelector(item) == item.key) {
                db.update(table, item.key, item);
            }
            else if (keyValueSelector(item) != item.key) {
                db.del(table, item.key);
                item.key = keyValueSelector(item);
                db.insert(table, item.key, item);
            }

            console.log('persisted');
            return item;
        }
    }
};

angular.module('starter.domain', [])



.factory('domainCharacter', ['db', function (db) {

    var table = 'character';

    var components = ['character', 'modifiers'];

    var keyValueSelector = function (item) {
        return item.character.name;
    };

    return domain(db, table, keyValueSelector, components);

    }])


.factory('domainAction', ['db', function (db) {

    var table = 'action';
    
    var components = ['name', 'modifiers', 'attackType'];

    var keyValueSelector = function (item) {
        return item.name;
    };

    var serialize = function () {

    };
        

    return domain(db, table, keyValueSelector, components);

} ])


;
