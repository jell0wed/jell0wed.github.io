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

            angular.element(document).ready(initializeCaroussel);
          }

          function initializeCaroussel() {
            $('.owl-carousel').owlCarousel({
              items: 2,
              center: true,
              loop: true,
              margin: 0,
              responsiveClass: true,
              nav: true,
              dots: true,
              smartSpeed: 500,
              navText: [
                "<i class='ti-arrow-left owl-direction'></i>",
                "<i class='ti-arrow-right owl-direction'></i>"
              ]
            });
          }

          $scope.init();
      }]
    });
})();