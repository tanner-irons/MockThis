module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['browserify', 'jasmine'],
        browsers: ['Chrome'],
        files: [
            { pattern: './mockthis/build/**/*.js' },
            { pattern: './tests/**/*.js' }
        ],
        preprocessors: {
            './mockthis/build/**/*.js': ['browserify'],
            './tests/**/*.spec.js': ['browserify']
        },
        browserify: {
            watch: true,
            transform: [
                ['coverageify', { ignores: [new RegExp('/tests/')] }],
                ['babelify', { presets: ['env', 'stage-3'] }]
            ]
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage',
            includeAllSources: true
        }
    });
};