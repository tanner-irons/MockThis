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
                    type : 'html',
                    dir : 'coverage',
                    includeAllSources: true
                  }
            }
        }
    });


    grunt.loadNpmTasks('grunt-karma')
    grunt.registerTask('test', ['karma']);
};