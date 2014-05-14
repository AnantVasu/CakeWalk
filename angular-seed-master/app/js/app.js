'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.when('/tracker', {templateUrl: 'partials/tracker.html', controller: 'trackerCtrl'});
  $routeProvider.when('/contestant', {templateUrl: 'partials/contestant.html', controller: 'contestantCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
