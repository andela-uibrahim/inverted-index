/* eslint-disable no-undef */
const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(($routeProvider) => {
  $routeProvider
   // home pages
  .when('/', {
    templateUrl: 'templates/home.html',
    controller: 'homeController'
  })

   // index pages
  .when('/show-index', {
    templateUrl: 'templates/table.html',
    controller: 'homeController'
  })

// search pages
  .when('/search-index', {
    templateUrl: 'templates/search.html',
    controller: 'homeController'
  })
  .otherwise('/');
});
