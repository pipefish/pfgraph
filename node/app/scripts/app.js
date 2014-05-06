'use strict';

angular.module('pfgraphApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pfgraphApp.controllers',
  'pfgraphApp.directives'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });



    $locationProvider.html5Mode(true);
  });

  // setup dependency injection
  angular.module('pfgraphApp.controllers', []);
  angular.module('pfgraphApp.directives', []);
