module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            options: {
                configFile: 'karma.conf.js',
                port: 9876,
                logLevel: 'OFF'
            },
            unit: {
                reporters: ['progress', 'coverage'],
                coverageReporter: {
                    type: 'html',
                    dir: 'coverage',
                    includeAllSources: true
                }
            }
        },

        watch: {
            browserify: {
                files: ['mockthis/**/*.js'],
                tasks: ['browserify']
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: ['browserify-shim', ['babelify', { presets: ['env', 'stage-3'] }]],
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