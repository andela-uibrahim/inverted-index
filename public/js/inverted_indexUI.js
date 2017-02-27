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
    controller: 'homeController'
  });
});

myApp.controller('homeController',
  ['$scope', '$location', function ($scope, $location, $route) {
    let selectedFile; let filesArray; const contents = [];
    $scope.books = [];
    $scope.cont = [];
    $scope.selected = 0;
    $scope.searchWords = '';
    const invertedIndex = new InvertedIndex();
    $scope.fileNameChanged = (ele) => {
      $scope.$apply(() => {
        filesArray = ele.files;
        uploadFiles($scope.books, filesArray, $scope.cont);
      });
    };

    $scope.createIndex = () => {
      $scope.tabs = [];
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
        $scope.tabs = invertedIndex.createIndex(tokens,
        filteredContents, invertedIndex.checkForIndex);
        $location.path('/showIndex');
        return $scope.tabs;
      } else {
        console.log('invalid file content formart');
      }
    };

    


    $scope.getSearchResults= () => {
      
      $scope.tabs4all= [];
      const filteredWords = filterContent($scope.searchWords);
      const tokens = removeDuplicates(filteredWords);
      if ($scope.selected === 'All') {
        $scope.books.forEach((file) => {
          $scope.selected = file.name;
          $scope.tabs4all.push($scope.createIndex());
        });
      } else {
          $scope.tabs4all.push($scope.createIndex());
      };
      $scope.searches = [];
      $scope.tabs4all.forEach((tabs) => {
      $scope.search = invertedIndex.searchIndex(tokens, tabs);
      $scope.searches.push($scope.search);
      });
      console.log($scope.books)
      $location.path('/searchIndex');
    };
  }]);

myApp.directive('indexTab', () => ({
  templateUrl: 'templates/tabContent.html',
  replace: 'true',
  scope: {
    tabObject: '='
  },
}));

myApp.directive('searchResult', () => ({
  templateUrl: 'templates/searchContent.html',
  replace: 'true',
  scope: {
    searches: '=',
    books: '='
  },
}));

