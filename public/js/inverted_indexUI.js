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
  ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    let selectedFile; let filesArray; const contents = [];
    $scope.books = [];
    $scope.cont = [];
    $scope.selected = 0;
    $scope.searchWords = '';
    const invertedIndex = new InvertedIndex();

    // alert message function
    $scope.alerts = (show, message, type) => {
      $scope.alert = {
        message,
        type,
        show
      };
      $timeout(() => {
        $scope.alert.show = false;
      }, 4000);
    };

    $scope.fileNameChanged = (element) => {
      $scope.$apply(() => {
        filesArray = element.files;
        let validationResult = true;
        validationResult = uploadFiles($scope.books,
         filesArray, $scope.cont);
        if (validationResult[0] === false) {
          validationResult[1].name;
          $scope.alerts(true, 'unable to upload '+validationResult[1].name+' is not a valid json file');
        }
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
      }
      $scope.alerts(true, 'invalid file content format. please upload a valid file');
      return null;
    };


    $scope.getSearchResults= () => {
      $scope.tabs4all= [];
      let status;
      const filteredWords = filterContent($scope.searchWords);
      const tokens = removeDuplicates(filteredWords);
      if ($scope.selected === 'All') {
          status = $scope.books.forEach((file) => {
          $scope.selected = file.name;
          if ($scope.createIndex() === null) {
            return false;
          } else {
            $scope.tabs4all.push($scope.createIndex());
          }
         });
         if (status !== undefined){
            return false
         };
      } else {
        const ind = $scope.createIndex();
        if (ind === null){
          return false;
        };
        $scope.tabs4all.push(ind);
      }

      $scope.searches = [];
      $scope.tabs4all.forEach((tabs) => {
        $scope.search = invertedIndex.searchIndex(tokens, tabs);
        $scope.searches.push($scope.search);
      });
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

