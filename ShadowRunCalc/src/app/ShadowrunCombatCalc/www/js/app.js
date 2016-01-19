// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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
    $ionicConfigProvider.tabs.position('top'); // other values: top


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    // setup an abstract state for the tabs directive
      .state('app.tab', {
          url: '/tab',
          views:
              {
                  'menuContent': { templateUrl: 'templates/tabs.html' }
              }

      })

    // Each tab has its own nav history stack:

    .state('app.tab.attack', {
        url: '/attack',
        views: {
            'tab-attack': {
                templateUrl: 'templates/tab-attack.html',
                controller: 'AttackCtrl'
            }
        }
    })


    .state('app.tab.target', {
        url: '/target',
        views: {
            'tab-target': {
                templateUrl: 'templates/tab-target.html',
                controller: 'TargetCtrl'
            }
        }
    })

  .state('app.tab.result', {
      url: '/result',
      views: {
          'tab-result': {
              templateUrl: 'templates/tab-result.html',
              controller: 'ResultCtrl'
          }
      }
  })

      .state('app.gear', {
          url: '/gear',
          views: {
              'menuContent': {
                  templateUrl: 'templates/gear.html',
                  controller: 'GearCtrl'
              }
          }
      })

    .state('app.environment', {
        url: '/environment',
        views: {
            'menuContent': {
                templateUrl: 'templates/environment.html',
                controller: 'EnvironmentCtrl'
            }
        }
    })

    .state('app.firingMode', {
        url: '/firingMode',
        views: {
            'menuContent': {
                templateUrl: 'templates/firingMode.html',
                controller: 'FiringModeCtrl'
            }
        }
    })

    ;
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tab/attack');

});
