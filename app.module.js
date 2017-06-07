(function() {
  'use strict';

  var poissonApp = angular.module('poissonApp',
    ['ngRoute']);

  // Configure router
  poissonApp.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/about', {
        template: '<poisson-about></poisson-about>'
      })
      .otherwise('/about');
  }]);
})();
