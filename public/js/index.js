const myApp = angular.module('myApp', ['ngRoute']);

myApp.config(($routeProvider) => {
  $routeProvider
   // home pages
  .when('/', {
    templateUrl: 'templates/home.html',
    controller: 'homeController'
  })

   // index pages
  .when('/showIndex', {
    templateUrl: 'templates/table.html',
    controller: 'tableController'
  })

// // search pages
  .when('/searchIndex', {
    templateUrl: 'templates/search.html',
    controller: 'searchController'
  });
});

myApp.controller('homeController',
  ['$scope', '$location', function ($scope, $location) {
    $scope.submit = () => {
      $location.path('/showIndex');
    };
  }]);

myApp.controller('tableController',
  ['$scope', function($scope){
	    $scope.tabs = [{
	  	word : "usman",
	  	exist: true,
	  	existB :false
    },

    {
	  	word : "kazeem",
	  	exist: true,
	  	existB :true
	    },
     
  	{
    	word : "hassan",
    	exist: false,
    	existB :true
      }
     ];
  }]);

myApp.directive('indexTab', () => {
    return({
    	templateUrl: "templates/tabContent.html",
    	replace: 'true',
    	scope: {
    		tabObject: "="
    	},
    	// link: function(scope, element , attr) {
    	// 	console.log(scope.tabObject);
    	// }
    });
    });

