// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.db', 'starter.domain', 'starter.controllers', 'starter.services', 'starter.data', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

    
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    //configure tab position
    $ionicConfigProvider.tabs.position('bottom'); // other values: top

    //routes  
    $stateProvider

    //slide out menu
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
        
    //stand alone pages

    //character
      .state('app.myCharacter', {
          url: '/myCharacter',
          views: {
              'menuContent': {
                  templateUrl: 'templates/standalone/myCharacter.html',
                  controller: 'MyCharacterCtrl'
              }
          }
      })

        //welcome screen
        .state('app.welcome', {
            url: '/welcome',
            views: {
                'menuContent': {
                    templateUrl: 'templates/standalone/welcome.html'                    
                }
            }
        })

    //info pages

    //range page
        .state('app.infoRange', {
            url: '/infoRange',            
            views: {
                'menuContent': {
                    templateUrl: 'templates/info/range.html',
                    controller: 'InfoRangeCtrl'
                }
            }
        })
    
    //reusable template pages

    //popout editor
    .state('app.popout', {
        url: '/popout/:name/:itemServiceName/:alwaysApplicable/:limitToCategory',
        views: {
            'menuContent': {
                templateUrl: 'templates/common/popout.html',
                controller: 'PopoutCtrl'
            }
        }
    }) 

    //workflows
    .state('app.characterSelection', {
        url: '/characterSelection',
        views: {
            'menuContent': {
                templateUrl: 'templates/workflow/characterSelection.html',
                controller: 'CharacterSelectionCtrl'
                }
            }
        })

    .state('app.action', {
        url: '/action',
        views: {
            'menuContent': {
                templateUrl: 'templates/workflow/action.html',
                controller: 'ActionCtrl'
            }
        }
    })

    
    .state('app.attack', {
        url: '/app/attack',
        views: {
            'menuContent': {
                templateUrl: 'templates/workflow/attack.html',
                controller: 'AttackCtrl'
            }
        }
    })

    .state('app.target', {
        url: '/app/target',
        views: {
            'menuContent': {
                templateUrl: 'templates/workflow/target.html',
                controller: 'TargetCtrl'
            }
        }
    })

    .state('app.environment', {
        url: '/app/environment',
        views: {
            'menuContent': {
                templateUrl: 'templates/workflow/environment.html',
                controller: 'EnvironmentCtrl'
            }
        }
    })

    .state('app.result', {
        url: '/app/result',
        views: {
            'menuContent': {
                templateUrl: 'templates/workflow/result.html',
                controller: 'ResultCtrl'
            }
        }
    })

    ;
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');

})


;
