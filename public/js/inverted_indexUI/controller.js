myApp.controller('homeController',
  ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    let filesArray;
    $scope.books = {};
    $scope.searchWords = '';
    const invertedIndex = new InvertedIndex();
    const utility = new Helpers();

/** validates file type and handles the file uploads on user request
 *
 * @param  {element} element  - uploaded files
 * @return {boolean} - true or false
 */
    $scope.fileNameChanged = (element) => {
      $scope.$apply(() => {
        filesArray = element.files;
        let validationResult = true;
        validationResult = utility.uploadFiles($scope.books,
         filesArray);
        if (validationResult[0] === false) {
          $scope.alerts(true, `unable to upload. ${validationResult[1].name}
           is not a valid json file`);
          return false;
        }
      });
    };

  /** creates index and update the indexed files
   * @param {object} books - object containing books
   * @param {Sting} file - file name
   * @return  {null}  - null
   */
    $scope.createFileIndex = (books, file) => {
      const selectedBook = books[file].content;
      const validateContent = utility.validFileContent(selectedBook);
      if (validateContent) {
        const filteredContents = utility.filterBookContents(selectedBook);
        const tokens = utility.getToken(filteredContents);
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
      const redirect = `${$location.absUrl()}showIndex`;
      console.log(redirect)
      return true;
    };

/** updates searches object with search results
 * @param {String} file - name of file to search from
 * @param {Array} tokens - Array of words to search
 * @return  {boolean}  - true or false
 */
    const updateSearchResult = (file, tokens) => {
      const search = invertedIndex.searchIndex(tokens,
         $scope.indexedFiles[file]);
      $scope.searches[file] = search;
      return true;
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
      const filteredWords = utility.filterContent($scope.searchWords);
      const tokens = utility.removeDuplicates(filteredWords);
      $scope.searches = {};
      if ($scope.selected === 'All') {
        for (const file in $scope.indexedFiles) {
          updateSearchResult(file, tokens);
        }
      } else if (!($scope.selected in $scope.indexedFiles)) {
        $scope.alerts(true, `no index record found for ${$scope.selected}`);
        return null;
      } else {
        const file = $scope.selected;
        updateSearchResult(file, tokens);
      }
      $location.path('/searchIndex');
    };

// redirect to homepage on click of home button
    $scope.homePage = () => {
      $location.path('/');
      return true;
    };

/** handles the file uploads on user request
 *
 * @param  {boolean} show - true or false decides
 * the status of the arert display
 * @param  {String} message - message string to display
 * @param  {String} type - the boostrap alert class type to display
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
