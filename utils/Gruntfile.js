module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        src  : ['../src/MjpegCanvas.js', '../src/**/*.js'],
        dest : '../build/mjpegcanvas.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        '../build/mjpegcanvas.js'
      ]
    },
    karma: {
      build: {
        configFile: '../test/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    uglify: {
      options: {
        report: 'min'
      },
      build: {
        src: '../build/mjpegcanvas.js',
        dest: '../build/mjpegcanvas.min.js'
      }
    },
    watch: {
      dev: {
        options: {
          interrupt: true
        },
        files: [
          '../src/MjpegCanvas.js',
          '../src/**/*.js'
        ],
        tasks: ['concat']
      },
      build_and_watch: {
        options: {
          interrupt: true
        },
        files: [
          'Gruntfile.js',
          '.jshintrc',
          '../src/MjpegCanvas.js',
          '../src/**/*.js'
        ],
        tasks: ['build']
      }
    },
    clean: {
      options: {
        force: true
      },
      doc: ['../doc']
    },
    jsdoc: {
      doc: {
        src: [
          '../src/MjpegCanvas.js',
          '../src/**/*.js'
        ],
        options: {
          destination: '../doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', ['concat', 'watch']);
  grunt.registerTask('build', ['concat', 'jshint', 'uglify']);
  grunt.registerTask('build_and_watch', ['watch']);
  grunt.registerTask('doc', ['clean', 'jsdoc']);
};