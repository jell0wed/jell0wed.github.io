(function() {
	'use strict';

  function shuffle(array) {
      let counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          let index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }

      return array;
  }

  angular
    .module('poissonApp')
    .component('poissonProjectList', {
      templateUrl: './views/project_list.html',
      controller: ['$scope', 'poissonData', function($scope, poissonData) {
        //$scope.categories = 

        var loadData = function() {
          poissonData.project_placeholders().then(function(dat) {
            $scope.displayedItems = [];
            $scope.categories = dat.data.categories;

            var categories = dat.data.categories;
            var motivations = dat.data.motivations;
            var projects = dat.data.projects;
            
            for(var i = 0; i < categories.length; i++) {
              motivations = shuffle(motivations);
              var currentCategory = categories[i];
              var categoryItems = shuffle(projects[currentCategory]);
              var motivationItems = motivations.splice(0, Math.floor(Math.random() * motivations.length));
              var items = shuffle(categoryItems.concat(motivationItems));

              $scope.displayedItems["category_" + currentCategory] = {
                "category": currentCategory,
                "items": items,
                "numCols": 2,
                "numRows": Math.ceil(items.length / 2)
              };
            }
          });
        };

        $scope.init = function() {
          loadData();
        };

        $scope.init();
      }]
    })
    .directive('projectPlaceholder', function () {
      return {
        scope: {
          row: '=',
          col: '=',
          category: '='
        },
        templateUrl: './views/directives/project_placeholder.html',
        controller: function ($scope) {
          $scope.init = function() {
            var index = $scope.row * 2 + $scope.col;
            $scope.currentPlaceholder = $scope.$parent.displayedItems["category_" + $scope.category].items[index];
          };

          $scope.init();
        }
      };   	
    });
})();