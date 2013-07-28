var LIVERLOAD_PORT = 35729;

var lrSnippet = require('connect-livereload')({ port: LIVERLOAD_PORT });

var livereloadMiddleware = function(connect, options){
  return [
    lrSnippet,
    connect.static(options.base),
    connect.directory(options.base)
  ];
};

module.exports = function(grunt) {
  grunt.initConfig({
    distFolder: 'dist',
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src:['app/js/*.js'],
        dest: '<%= distFolder %>/main.js'
      }
    },

    connect: {
      client: {
        options: {
          port: 9000,
          base: 'app',
          middleware: livereloadMiddleware
        }
      }
    },

    watch: {
      client: {
        files: ['app/js/**/*'],
        tasks: [],
        options: {
          livereload:LIVERLOAD_PORT
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build', ['concat']);
  grunt.registerTask('default', ['connect:client', 'watch:client']);

};