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
    let selectedFile;
    $scope.books = [];
    const contents = [];
    $scope.cont = [];
    $scope.selected = 0;
    const invertedIndex = new InvertedIndex();

    $scope.toSelectFile = () => {
      uploadFiles($scope.books, filesArray, $scope.cont);
    };

    $scope.submit = () => {
      $scope.books.map((book, index) => {
        book.content = $scope.cont[index];
        if (book.name === $scope.selected) {
          selectedFile = book;
        }
      });
      const selectedBook = selectedFile.content;
      const validateContent = validFileContent(selectedBook);
      if (validateContent) {
        const filteredContents = filterBookContents(selectedBook);
        const tokens = getToken(filteredContents);
        $scope.tabs = invertedIndex.createIndex(tokens, filteredContents);
        $location.path('/showIndex');
      } else {
        console.log('invalid file content formart');
      }
    };
  }]);

myApp.directive('indexTab', () => ({
  templateUrl: 'templates/tabContent.html',
  replace: 'true',
  scope: {
    tabObject: '='
  },
}));

