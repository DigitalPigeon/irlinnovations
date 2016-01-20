angular.module('starter.directives', [])

.directive('modifierBlock', function () {
    return {
        restrict: 'E',
        controller: 'ModifierBlockCtrl',
        scope: {
            itemServiceName: '@',
            name: '@'
        },
        templateUrl: 'templates/common/modifierBlock.html'
    };
})

.directive('modifierPopoutBlock', function () {
    return {
        restrict: 'E',
        controller: 'ModifierBlockCtrl',
        scope: {
            item: '=',
            itemServiceName: '@',
            name: '@'
        },
        templateUrl: 'templates/common/modifierPopoutBlock.html',
    };
})

;
