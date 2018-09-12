module.exports = function (grunt) {

    var debug = grunt.option('debug');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js',
                    singleRun: !debug,
                    autoWatch: debug,
                    port: 9876,
                    logLevel: 'OFF'
                }
            }
        },

        eslint: {
            options: {
                configFile: '.eslintrc',
                format: 'html',
                outputFile: 'eslint-report.html'
            },
            target: ['./mockthis/**/*.js', '!./mockthis/dist/*.js']
        },

        watch: {
            browserify: {
                files: ['mockthis/lib/**/*.js'],
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
                src: ['mockthis/lib/mockthis.js'],
                dest: 'mockthis/dist/mockthis.js',
            }
        }
    });


    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['browserify']);
    grunt.registerTask('lint', ['eslint']);
};