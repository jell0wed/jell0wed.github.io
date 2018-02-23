angular
	.module('poissonApp')
  .factory('poissonData', ['$http', function($http) {
    return {
      project_placeholders: function() {
        return $http.get('data/project_placeholders.json');        
      },
      project_details: function() {
      	return $http.get('data/project_details.json');
      }
    };
  }]);