module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js'
                }
            }
        },

        watch: {
            browserify: {
                files: ['mockthis/build/**/*.js'],
                tasks: ['browserify']
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [['babelify', { presets: ['env', 'stage-3'] }]],
                    browserifyOptions: {
                        standalone: 'MockThis'
                    }
                },
                src: ['mockthis/build/mockthis.js'],
                dest: 'mockthis/dist/mockthis.js',
            }
        }
    });


    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['browserify']);
};