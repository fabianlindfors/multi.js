module.exports = function(grunt) {

    grunt.initConfig({

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! multi.js <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/multi.min.js': ['src/multi.js']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'cssmin']);

};
