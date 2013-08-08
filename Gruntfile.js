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

    uglify: {
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

    stylus: {
      client: {
        src: 'app/styl/style.styl',
        dest: 'app/css/style.css',
        compress: false
      }
    },

    watch: {
      client: {
        files: ['app/**/*'],
        tasks: [],
        options: {
          livereload:LIVERLOAD_PORT
        }
      },

      css: {
        files: 'app/styl/*.styl',
        tasks: ['build'],
        options: { livereload: true }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('build', ['stylus:client']);
  grunt.registerTask('default', ['connect:client', 'watch']);
};