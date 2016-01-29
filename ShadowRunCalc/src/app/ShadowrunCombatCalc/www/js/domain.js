var domain = function (db, table, itemTemplate, keyValueSelector, getDependancies)
{
    return {

        create: function() {
            var item = angular.copy(itemTemplate);
            console.log('created');
            return item;
        },

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

            if (getDependancies) {
                item.domainDependancies = getDependancies();
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



.factory('domainCharacter', ['db', 'modifiersService', function (db, modifiersService) {

    var table = 'character';

    var childDataServices = ['martialArts', 'adeptPowers'];

    var getDependancies = function () {
        var selected = [];
        var all = modifiersService.all();

        angular.forEach(all, function (value) {
            //console.log(value.name + ', value.dataServiceName: ' + value.dataServiceName)
            if (childDataServices.indexOf(value.dataServiceName) >=0 && value.checked) {
                selected.push(value);
            }
        });

        return selected;
    }

    var itemTemplate = {
        key:'',
        name:''
    };

    var keyValueSelector = function (item) {
        return item.name;
    };

    return domain(db, table, itemTemplate, keyValueSelector);
        /*
            {
            create: function () { return domain.create(db, itemTemplate); },
            retrieve: function (key) { return domain.retrieve(db, tableName, key); },
            retrieveInto: function (key, itemToUpdate) { return domain.retrieveInto(db, tableName, key, itemToUpdate); },
            retrieveAll: function () { return domain.retrieveAll(db, tableName); },
            del: function (key) { return domain.del(db, tableName, key); },
            persist: function (item) { return domain.persist(db, tableName, item, getValueForKey); }
            }
            */

    }])

;
