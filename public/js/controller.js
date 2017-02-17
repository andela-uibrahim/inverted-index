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
    controller: 'homeController'
  })

// // search pages
  .when('/searchIndex', {
    templateUrl: 'templates/search.html',
    controller: 'searchController'
  });
});

myApp.controller('homeController',
  ['$scope', '$location', '$window', function ($scope, $location, $window) {
    let filesArray;
    $scope.books = [];
    document.getElementById('upload')
        .addEventListener('change', () => {
          filesArray = document.getElementById('upload').files;
        });

    $scope.toSelectFile = () => {
      for (let i = 0; i < filesArray.length; i++) {
        const book = {};
        book.name = filesArray[i].name;
        book.size = filesArray[i].size;
        book.type = filesArray[i].type;
        $scope.books.push(book);
        const reader = new FileReader();
        reader.readAsText(filesArray[i]);
        reader.onload = function (e) {
          book.content = JSON.parse(e.target.result);
        };
      }
    };

    $scope.submit = () => {
      console.log($scope.books[0].name);
      // $location.path('/showIndex')
    };

    $scope.tabs = [{
      word: 'usman',
      exist: true,
      existB: false
    },

    {
      word: 'kazeem',
      exist: true,
      existB: true
    },
    {
      word: 'hassan',
      exist: false,
      existB: true
    }
    ];

   // $scope.selectFile =function


//      {
//        $window.alert('please Upload a valid file');
//      }
//    };
  }]);


myApp.directive('indexTab', () => ({
  templateUrl: 'templates/tabContent.html',
  replace: 'true',
  scope: {
    tabObject: '='
  },
}));

