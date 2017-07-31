(function() {
  'use strict';

  var poissonApp = angular.module('poissonApp',
    ['ngRoute', 'hc.marked']);

  // Configure router
  poissonApp.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/about', {
        template: '<poisson-about></poisson-about>'
      })
      .when('/projects', {
        template: '<poisson-project-list></poisson-project-list>'
      })
      .when('/project-detail/:name', {
        template: '<poisson-project-detail></poisson-project-detail>'
      })
      .otherwise('/about');
  }]);
})();
