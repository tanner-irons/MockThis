module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine', 'requirejs'],
        browsers: ['Chrome'],
        port: 9876,
        watch: {
            background: false,
            singleRun: false
        },
        files: [
            { pattern: './node_modules/lodash/lodash.min.js', included: false },
            { pattern: './node_modules/chance/dist/*.js', included: false },
            { pattern: './mockthis/**/*.js', included: false },
            { pattern: './tests/**/*.spec.js', included: false },
            'tests/test-main.js'
        ],
        exclude: [
            '../index.js'
        ],
        preprocessors: {
            './mockthis/**/*.js': 'coverage'
        }
    });
};