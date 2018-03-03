'use strict';

require.config({
    baseUrl: "./mockthis",
    paths: {
        
    },
    packages : [{ 
        name : "lodash",
        location : "node_modules/lodash/",
        main : "lodash.min"
    }]
});
require(["../index"], function () { 
    
});