(function() {
	'use strict';
  var motivations = [{
    header: 'Motivation 1',
    text: 'Testing motivation 1'
  },{
    header: 'Motivation 2',
    text: 'Testing motivation 2'
  },{
    header: 'Motivation 3',
    text: 'Testing motivation 3'
  },
  ];

  var projects = [{
    header: 'project 1',
    description: 'project 1 desc'
  }, {
    header: 'project 2',
    description: 'project 2 desc'
  }, {
    header: 'project 3',
    description: 'project 3 desc'
  }];

  var placement = [];

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
        $scope.placement = [];
        $scope.placementParams = {};

        var randomizePlacement = function() {
          poissonData.project_placeholders().then(function(dat) {
            var placeholders = dat.data;
            var itemsToFit = placeholders.length;
            var numCols = 2;
            var numRows = Math.ceil(itemsToFit / numCols);
            var itemsLeft = shuffle(placeholders);

            for(var i = 0; i < numRows; i++) {
              var innerRow = [];
              for(var j = 0; j < numCols; j++) {
                innerRow.push(itemsLeft[i * numCols + j]);
              }
              $scope.placement.push(innerRow);
            }

            $scope.placementParams = {
              numItems: placeholders.length,
              numCols: numCols,
              numRows: numRows
            };
          });
        };

        $scope.init = function() {
          randomizePlacement();
        };

        $scope.init();
      }]
    })
    .directive('projectPlaceholder', function () {
      return {
        scope: {
          row: '=',
          col: '='
        },
        templateUrl: './views/directives/project_placeholder.html',
        controller: function ($scope) {
          $scope.init = function() {
            $scope.currentPlaceholder = $scope.$parent.placement[$scope.row][$scope.col];
          };

          $scope.init();
        }
      };   	
    });
})();