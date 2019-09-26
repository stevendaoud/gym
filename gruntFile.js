/**
 * Created by sdaoud on 10/10/16.
 */
 
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['src/scss/*', 'src/js/src/*'],
      tasks: ['sass', 'uglify'],
      options: {
        livereload: true,
      }
    },
    uglify: {
      build: {
        files: {
          'public/js/main.js': ['src/js/src/*']
        },
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/main.css' : 'src/scss/main.scss'
        }

      }
    }


  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['sass', 'uglify']);

};