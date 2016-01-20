// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.data', 'starter.directives'])

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


    //tab layout
      .state('app.tab', {
          url: '/tab',
          views:
              {
                  'menuContent': { templateUrl: 'templates/tabs/tabs.html' }
              }

      })

    //tab - attack
    .state('app.tab.attack', {
        url: '/attack',
        views: {
            'tab-attack': {
                templateUrl: 'templates/tabs/tab-attack.html',
                controller: 'AttackCtrl'
            }
        }
    })

    //tab - target
    .state('app.tab.target', {
        url: '/target',
        views: {
            'tab-target': {
                templateUrl: 'templates/tabs/tab-target.html',
                controller: 'TargetCtrl'
            }
        }
    })

    //tab environment
    .state('app.tab.environment', {
        url: '/environment',
        views: {
            'tab-environment': {
                templateUrl: 'templates/tabs/tab-environment.html',
                controller: 'EnvironmentCtrl'
            }
        }
    })

   //tab result
  .state('app.tab.result', {
      url: '/result',
      views: {
          'tab-result': {
              templateUrl: 'templates/tabs/tab-result.html',
              controller: 'ResultCtrl'
          }
      }
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
    
    //reusable template pages

    //popout editor
    .state('app.popout', {
        url: '/popout/:name/:itemServiceName',
        views: {
            'menuContent': {
                templateUrl: 'templates/common/popout.html',
                controller: 'PopoutCtrl'
            }
        }
    }) 
      

    ;
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');

})


;
