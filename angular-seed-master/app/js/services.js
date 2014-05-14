'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    factory('sharedProperties', function () {
        var leftMainTab = "Login";
        var leftMainTabHref = "#/login";
        var allReviews = [];
        var lastIndex=0;
        var locationIndex= 0;
        return {

            getLeftMainTab: function() {
                return leftMainTab;
            },
            setLeftMainTab: function(arg) {
                leftMainTab = arg;
            },
            getLeftMainTabHref: function() {
                return leftMainTabHref;
            },
            getLocationIndex: function(){
                return locationIndex;
            },
            incrementLocationIndex: function(){
                locationIndex++;
            },
            getAllReviews: function(){
                return allReviews;
            },
            getLastIndex: function(){
                return lastIndex;
            }
        };

    });
