(function() {
  'use strict';

  angular
    .module('poissonApp')
    .component('poissonProjectDetail', {
      templateUrl: './views/project_detail.html',
      controller: ['$scope', '$location', '$routeParams', 'poissonData', 
        function($scope, $location, $routeParams, poissonData) {
          $scope.init = function() {
            $scope.projectName = $routeParams.name;

            poissonData.project_details().then(function(dat) {
              var projectDetails = dat.data;
              if(!($scope.projectName in projectDetails)) {
                $location.path("/about");
                return;
              }
              
              $scope.projectDetails = projectDetails[$scope.projectName];
            });
          }

          $scope.init();
      }]
    });
})();