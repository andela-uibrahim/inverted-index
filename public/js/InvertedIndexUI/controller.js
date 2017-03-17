/* eslint-disable */
myApp.controller('homeController',
  ['$scope', '$location','$rootScope', '$timeout', function ($scope, $location, $rootScope, $timeout) {
    let filesArray;
    $scope.files = {};
    if (!$rootScope.titles) {
      $rootScope.titles = {};
    }
    $scope.searchWords = '';
    const invertedIndex = new InvertedIndex();

   /** reads and load file contents;
   *
   * @param  {Array} currentFile - passes the content in current file
   * @param  {Array} contents - an array that stores the contents
   * that has been read
   * @return {Array} array of documents in book
   */
    const updateFiles = (currentFile) =>
       new Promise((resolve) => {
      const reader = new FileReader();
      let result;
      reader.readAsText(currentFile);
      reader.onload = (e) => {
        try{
          result = JSON.parse(e.target.result);
          } catch (error) {
          return null;
        };
        resolve(result);
    }
    });

  /** handles the file uploads on user request
   *
   * @param  {Array} books - an Array of uploaded books and contents.
   * @param  {Array} files - an Array of books without contents.
   * @param  {Array} contents - an array of uploaded books contents.
   * @return {Array} array of boolean to signify uploads success of failure.
   */
    const uploadFiles = (books, files, alerts) => {
      for (const file of files) {
        if (helpers.fileIsValid(file)) {
          const fileNames = Object.keys(books).map(book => books[book].name);
          if (!(fileNames.includes(file.name))) {
            updateFiles(file, alerts)
            .then((content) => {
              file.content = content;
            })
            books[file.name] = file;
          }
        } else {
          return [false, file];
        }
      }
      return [true];
    };

  /** validates file type and invoke the uploadFiles function
   *
   * @param  {element} element  - uploaded files
   * @return {boolean} - true or false
   */
    $scope.fileNameChanged = (element) => {
      $scope.$apply(() => {
        filesArray = element.files;
        let validationResult = true;
        validationResult = uploadFiles($scope.files,
         filesArray, $scope.alerts);
        if (validationResult[0] === false) {
          $scope.alerts(true, `unable to upload. ${validationResult[1].name}
           is not a valid json file`);
          return false;
        }
      });
    };


  /** create an inverted index for uploaded json file
   *
   * @return  {boolean}  - true or false
   */
    $scope.createIndex = () => {
      if ($scope.selected === 'All') {
        if (Object.keys($scope.files).length === 0) {
          $scope.alerts(true, 'No uploaded file record found');
          return null;
        }
        Object.keys($scope.files).forEach((file) => {
          $scope.indexedFiles =
          invertedIndex.createIndex($scope.files,
          file, $scope.alerts);
          $scope.titles = $rootScope.titles;
          if ($scope.indexedFiles === null) {
            $scope.alerts(true, `invalid file content format.
            ${$scope.selected} please upload a valid file`);
            return null;
          }
          $rootScope.titles[file] = Object.values($scope.indexedFiles[file])[0]
           .map((title, index) => {
             return index;
          });
        });
      } else {
        $scope.indexedFiles =
        invertedIndex.createIndex($scope.files,
        $scope.selected);
        if ($scope.indexedFiles === null) {
          $scope.alerts(true, `invalid file content format.
          ${$scope.selected} please upload a valid file`);
          return null;
        }
        $rootScope.titles[$scope.selected] = Object.values($scope.indexedFiles[$scope.selected])[0]
          .map((title, index) => {
            return index;
        });
        $scope.titles = $rootScope.titles;
      }
      $location.path('/show-index');
      return true;
    };

  /** validates the type of user input when searching
   *
   * @return  {boolean}  - true or false
   */
    const validateSearchInput = () => {
      if (!$scope.searchWords) {
        $scope.alerts(true, 'no search word entered');
        return false;
      } else if (!$scope.selected) {
        $scope.alerts(true, 'select file to search words from');
        return false;
      }
      if (!$scope.indexedFiles) {
        $scope.alerts(true, 'there are no index file recorded');
        return false;
      }
      return true;
    };

  /** get search results for search words
   *
   * @return  {boolean}  - true or false
   */
    $scope.getSearchResults = () => {
      const isValid = validateSearchInput();
      if (isValid) {
        const filteredWords = helpers.filterContent($scope.searchWords);
        const queries = helpers.removeDuplicates(filteredWords);
        if ($scope.selected === 'All') {
          Object.keys($scope.indexedFiles).forEach((file) => {
            $scope.searches = invertedIndex.searchIndex(file, queries);
          });
        } else if (!($scope.selected in $scope.indexedFiles)) {
          $scope.alerts(true, `no index record found for ${$scope.selected}`);
          return null;
        } else {
          const file = $scope.selected;
          $scope.searches = invertedIndex.searchIndex(file, queries);
        }
        $location.path('/search-index');
      }
    };

  /** function to alert user incase of any error
   * @return {boolean} - true
   */
    $scope.homePage = () => {
      $scope.indexedFiles = null;
      $location.path('/');
      return true;
    };

  /** function to alert user incase of any error
   *
   * @param  {boolean} show - true or false decides
   * the status of the arert display
   * @param  {String} message - message string to display
   * @return {nothing} - nothing
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
