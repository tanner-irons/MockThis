'use strict';

require.config({
    baseUrl: "./mockthis",
    paths: {
        
    },
    packages: [{ 
        name: "lodash",
        location: "../node_modules/lodash/",
        main: "lodash.min"
    }, {
        name: "chance",
        location: "../node_modules/chance/dist",
        main: "chance.min"
    }]
});
require(["../index"], function () { 
    
});