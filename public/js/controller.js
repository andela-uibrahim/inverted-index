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
  ['$scope', '$location', '$window', function ($scope, $location, $window) {
  	const theBooks = [];



    $scope.submit = () => {

    	//$scope.validate = validate();
      if(2 > 1) {
        files = document.getElementById('upload').files;
        

       	for (let i=0; i<files.length; i++) {
       	var aPro = new Promise((resolve) => {
	       		let reader = new FileReader();
	       		reader.readAsText(files[i]);
	       		reader.onload = function(e) {
	       			theBooks.push(JSON.parse(e.target.result));
	       			resolve(theBooks)
	       		} 
       		})
       	}

       	aPro.then((res) => {
       		$scope.aqq = 'dsfsdf';
       		console.log(res)
       		$scope.books = res;
       	});
       	 //$location.path('/showIndex');
	    }
      else
      { 
        $window.alert('please Upload a valid file');
      }
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
    });
});

