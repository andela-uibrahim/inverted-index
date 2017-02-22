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
    let content;
    let book;
    let selectedFile;
    $scope.books = [];
    const contents = [];
    $scope.selected = 0;
    const invertedIndex = new InvertedIndex();
    const updateFiles = (currentFile) => {
      book.size = currentFile.size;
      $scope.books.push(book);
      const reader = new FileReader();
      reader.readAsText(currentFile);
      reader.onload = (e) => {
        content = JSON.parse(e.target.result);
        contents.push(content);
      };
    };

    $scope.toSelectFile = () => {
      for (let i = 0; i < filesArray.length; i++) {
        const valid = fileIsValid(filesArray[i]);
        if (valid) {
          book = {};
          book.name = filesArray[i].name;
          let currentFile = filesArray[i];
          if ($scope.books === []) {
            updateFiles(currentFile);
          } else if ($scope.books !== []) {
            let counter = 0;
            $scope.books.forEach((j) => {
              if (j.name === book.name) {
                counter += 1;
              }
            });
            if (counter === 0) {
              updateFiles(currentFile);
            }
          }
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
      const selectedBook = selectedFile.content;
      const filteredContents = filterBookContents(selectedBook);
      const tokens = getToken(filteredContents);
      $scope.tabs = invertedIndex.createIndex(tokens, filteredContents);
      $location.path('/showIndex');
    };
  }]);

myApp.directive('indexTab', () => ({
  templateUrl: 'templates/tabContent.html',
  replace: 'true',
  scope: {
    tabObject: '='
  },
}));

