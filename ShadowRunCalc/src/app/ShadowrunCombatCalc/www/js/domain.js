var domain = function (db, table, keyValueSelector)
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

    var keyValueSelector = function (item) {
        return item.name;
    };

    return domain(db, table, keyValueSelector);

    }])


.factory('domainAction', ['db', function (db) {

    var table = 'action';
    
    var keyValueSelector = function (item) {
        return item.name;
    };

    return domain(db, table, keyValueSelector);

} ])


;
