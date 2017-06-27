(function() {
	'use strict';
  var motivations = [{
    header: 'Motivation 1',
    text: 'Testing motivation 1'
  }];

  var projects = [{
    header: 'project 1',
    description: 'project 1 desc'
  }];

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
      controller: ['$scope', function($scope) {
        $scope.placement = [];

        var randomizePlacement = function() {
          var itemsToFit = motivations.length + projects.length;
          var numCol = 2;
          var numRows = Math.ceil(itemsToFit / numCol);
          var itemsLeft = shuffle(motivations.concat(projects));

          for(var i = 0; i < numRows; i++) {
            var innerRow = [];
            for(var j = 0; j < numCol; j++) {
              innerRow.push(itemsLeft[i * numCol + j]);
            }
            $scope.placement.push(innerRow);
          }
          console.log('TEST');
          console.log($scope.placement);
        };

        $scope.init = function() {
          randomizePlacement();
        };

        $scope.init();
      }]
    })
    .directive('motivationPlaceholder', function () {
      return {
        scope: {
          placement: '=',
          row: '=',
          col: '='
        },
        template: '<h3>{{placement[row][col].header}}</h3><p></p>'
      };   	
    });
})();