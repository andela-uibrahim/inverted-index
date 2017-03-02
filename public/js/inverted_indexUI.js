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
    let filesArray; const contents = [];
    $scope.books = {};
    $scope.searchWords = '';
    const invertedIndex = new InvertedIndex();

/** validates file type and handles the file uploads on user request
 *
 * @param  {element} element  - uploaded files
 * @return {crap} - None
 */
    $scope.fileNameChanged = (element) => {
      $scope.$apply(() => {
        filesArray = element.files;
        let validationResult = true;
        validationResult = uploadFiles($scope.books,
         filesArray, contents);
        if (validationResult[0] === false) {
          $scope.alerts(true, `unable to upload. ${validationResult[1].name}
           is not a valid json file`);
        }
      });
    };

    $scope.createFileIndex = (books, file) => {
      const selectedBook = books[file].content;
      const validateContent = validFileContent(selectedBook);
      if (validateContent) {
        const filteredContents = filterBookContents(selectedBook);
        const tokens = getToken(filteredContents);
        if (!($scope.indexedFiles.hasOwnProperty(file))) {
          $scope.indexedFiles[file] = invertedIndex.createIndex(tokens,
        filteredContents, invertedIndex.checkForIndex);
        }
        return null;
      }
      $scope.alerts(true, `invalid file content format.
      ${books[file].name} please upload a valid file`);
      return null;
    };

/** create an inverted index for uploaded json file
 *
 * @return  {boolean}  - true or false
 */
    $scope.createIndex = () => {
      $scope.indexedFiles = {};
      if ($scope.selected === 'All') {
        for (const file in $scope.books) {
          $scope.createFileIndex($scope.books, file);
        }
      } else {
        $scope.createFileIndex($scope.books,
        $scope.selected);
      }
      $location.path('/showIndex');
    };


/** get search results for search words
 *
 * @return  {boolean}  - true or false
 */
    $scope.getSearchResults = () => {
      if (!$scope.searchWords) {
        $scope.alerts(true, 'no search word entered');
        return null;
      } else if (!$scope.selected) {
        $scope.alerts(true, 'select file to search words from');
        return null;
      }
      const filteredWords = filterContent($scope.searchWords);
      const tokens = removeDuplicates(filteredWords);
      $scope.searches = {};
      if ($scope.selected === 'All') {
        for (const file in $scope.indexedFiles) {
          const search = invertedIndex.searchIndex(tokens,
           $scope.indexedFiles[file]);
          $scope.searches[file] = search;
        }
      } else if (!($scope.selected in $scope.indexedFiles)) {
        $scope.alerts(true, `no index record found for ${$scope.selected}`);
        return null;
      } else {
        const file = $scope.selected;
        const search = invertedIndex.searchIndex(tokens,
         $scope.indexedFiles[file]);
        $scope.searches[file] = search;
      }
      $location.path('/searchIndex');
    };

    $scope.homePage = () => {
      $location.path('/');
    };

/** handles the file uploads on user request
 *
 * @param  {boolean} show - true or false decides
 * the status of the arert display
 * @param  {String} message - message string to display
 * @param  {String} type - the boostrap alert class type to display
 * @return {crap} - nothing
 */
    $scope.alerts = (show, message) => {
      $scope.alert = {
        message,
        show
      };
      $timeout(() => {
        $scope.alert.show = false;
      }, 4000);
    };
  }]);

myApp.directive('indexTab', () => ({
  templateUrl: 'templates/tabContent.html',
  replace: 'true',
  scope: {
    indexedFiles: '='
  },
}));

myApp.directive('searchResult', () => ({
  templateUrl: 'templates/searchContent.html',
  replace: 'true',
  scope: {
    searches: '='
  },
}));

