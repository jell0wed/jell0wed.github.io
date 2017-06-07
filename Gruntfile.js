(function() {
  'use strict';

  module.exports = function(grunt) {
    grunt.initConfig({
      wiredep: {
        directory: 'bower_components',
        task: {

          // Point to the files that should be updated when
          // you run `grunt wiredep`
          src: [
            'index.html',
            'views/*.html'
          ],

          options: {
            // See wiredep's configuration documentation for the options
            // you may pass:

            // https://github.com/taptapship/wiredep#configuration
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
  };
})();
