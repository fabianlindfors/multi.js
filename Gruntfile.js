module.exports = function(grunt) {

    grunt.initConfig({

        concat: {
            dist: {
                src: ['src/multi.js', 'src/es6-export.js'],
                dest: 'dist/multi-es6.min.js'
            },
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! multi.js <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/multi.min.js': ['src/multi.js'],
                    'dist/multi-es6.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        cssmin: {
            option: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/multi.min.css': ['src/multi.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};