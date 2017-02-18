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
  ['$scope', '$location', function ($scope, $location) {
    let filesArray;
    let content;
    let book;
    $scope.books = [];
    const contents = [];
    $scope.selected = 0;
    document.getElementById('upload')
        .addEventListener('change', () => {
          filesArray = document.getElementById('upload').files;
        });
    $scope.toSelectFile = () => {
      for (let i = 0; i < filesArray.length; i++) {
        let fileType;
        const valid = fileIsValid(filesArray[i]);
        if (valid) {
          book = {};
          book.name = filesArray[i].name;
          book.size = filesArray[i].size;
          $scope.books.push(book);
          const reader = new FileReader();
          reader.readAsText(filesArray[i]);
          reader.onload = (e) => {
            content = JSON.parse(e.target.result);
            contents.push(content);
          };
        } else {
          console.log('invalid file type');
        }
      }
    };

    $scope.submit = () => {
      let con = 0;
      $scope.books.forEach((book) => {
        book.content = contents[con];
        con += 1;
        if (book.name === $scope.selected) {
          selectedFile = book;
        }
      });
    };

    $scope.tabs = [{
      word: 'usman',
      exist: true,
      existB: false,
      existC: true
    },

    {
      word: 'kazeem',
      exist: true,
      existB: true,
      existC: false
    },
    {
      word: 'hassan',
      exist: false,
      existB: true,
      existC: true
    }
    ];
  }]);


myApp.directive('indexTab', () => ({
  templateUrl: 'templates/tabContent.html',
  replace: 'true',
  scope: {
    tabObject: '='
  },
}));

