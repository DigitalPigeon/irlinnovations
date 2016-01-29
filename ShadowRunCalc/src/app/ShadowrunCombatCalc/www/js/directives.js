angular.module('starter.directives', [])

.directive('modifierBlock', function () {
    return {
        restrict: 'E',
        controller: 'ModifierBlockCtrl',        
        scope: {
            itemServiceName: '@',
            name: '@',
            blockPopout: '=',
            alwaysApplicable: '='
        },
        templateUrl: 'templates/common/modifierBlock.html'
    };
})

.directive('irlIonHr', function () {
    return {
        restrict: 'E',                
        templateUrl: 'templates/common/irlIonHr.html',
    };
})

.directive('irlSignedNumber', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/common/irlSignedNumber.html',        
        scope: {
            zeroIsSigned: '=',
            value: '='
        },
        compile: function (element, attributes) {
            if (!attributes.zeroIsSigned) { attributes.zeroIsSigned = 'true';  }            
        }        
    };
})

;
