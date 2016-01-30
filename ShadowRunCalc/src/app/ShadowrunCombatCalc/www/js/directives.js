angular.module('starter.directives', [])

.directive('modifierBlock', function () {
    return {
        restrict: 'E',
        controller: 'ModifierBlockCtrl',        
        scope: {
            itemServiceName: '@',
            name: '@',
            limitToCategory: '@',
            alwaysApplicable: '=',
            blockPopout: '='
            
        },
        templateUrl: 'templates/common/modifierBlock.html'
    };
})

.directive('irlWorkflowSwipeable', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attribute) {

            element.on('swipeleft', function (event) {
                scope.show(scope.nextWorkflowState());
            });

            element.on('swiperight', function (event) {
                scope.show(scope.previousWorkflowState());
            });

            element.on('doubletap', function (event) {
                scope.show(scope.endState);
            });

            element.on('hold', function (event) {
                scope.show(scope.endState);
            });

            
        }
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
