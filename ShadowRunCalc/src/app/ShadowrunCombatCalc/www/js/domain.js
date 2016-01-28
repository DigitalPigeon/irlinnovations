var domain =
{
    create: function(db, itemTemplate) {
        var item = angular.copy(itemTemplate);
        console.log('created');
        return item;
    },

    retrieve: function (db, table, key) {
        var item = db.select(table, key);
        console.log('retrieved');
        return item;
    },

    retrieveAll: function (db, table) {
        var items = db.select(table);
        console.log('retrieved all');
        return items;
    },

    del: function (db, table, key) {
        db.del(table, key);
        console.log('deleted');
        return;
    },

    persist: function (db, table, item, keyValueSelector) {
        if (item.key == '') {
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
};

angular.module('starter.domain', [])



.factory('domainCharacter', ['db', function (db) {

    var tableName = 'character';

    var itemTemplate = {
        key:'',
        name:''
    };
    
    var getValueForKey = function(item) {
        return item.name;
    };

        return {
            create: function () { return domain.create(db, itemTemplate); },
            retrieve: function (key) { return domain.retrieve(db, tableName, key); },
            retrieveAll: function () { return domain.retrieveAll(db, tableName); },
            del: function (key) { return domain.del(db, tableName, key); },
            persist: function (item) { return domain.persist(db, tableName, item, getValueForKey); }
        }
}])

;
