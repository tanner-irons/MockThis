var TEST_REGEXP = /(spec|test)\.js$/i;
var SRC_REGEXP = /mockthis\//;
var JS_REGEXP = /\.js$/;
var allTestFiles = [];
var modules = [];

var jsToModule = function (path) {
    return path.replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    } else if (SRC_REGEXP.test(file) && JS_REGEXP.test(file)) {
        modules.push(jsToModule(file));
    }
});

var startTest = function () {
    require(modules, function() {
        window.__karma__.start();
    });
};

require.config({
    baseUrl: '/base/mockthis',

    paths: {
        'tests': '../tests',
        'chance': '../node_modules/chance/dist/chance.min'
    },

    deps: allTestFiles,

    callback: startTest,

    waitSeconds: 20
});