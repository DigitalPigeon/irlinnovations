angular.module('starter.controllers', [])

.controller('EnvironmentCtrl', function ($scope) {
    $scope.pol = "This is Environment";
})

.controller('AttackCtrl', function ($scope, RangedAttackerSituations) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.pol = "This is attacks";
    $scope.rangedAttackerSituations = RangedAttackerSituations.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ResultCtrl', function ($scope, $stateParams, Chats) {
    $scope.pol = "This is Results";
    $scope.chat = Chats.get($stateParams.chatId);
});
