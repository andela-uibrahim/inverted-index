myApp.controller('homeController',
  ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    let filesArray;
    $scope.books = {};
    $scope.searchWords = '';
    const invertedIndex = new InvertedIndex();

   /** reads and load file contents;
   *
   * @param  {Array} currentFile - passes the content in current file
   * @param  {Array} contents - an array that stores the contents
   * that has been read
   * @return {Array} array of documents in book
   */
    const updateFiles = currentFile => new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsText(currentFile);
      reader.onload = (e) => {
        resolve(JSON.parse(e.target.result));
      };
    });

  /** handles the file uploads on user request
   *
   * @param  {Array} books - an Array of uploaded books and contents.
   * @param  {Array} filesArr - an Array of bookes without contents.
   * @param  {Array} contents - an array of uploaded books contents.
   * @return {Array} array of boolean to signify uploads success of failure.
   */
    const uploadFiles = (books, filesArr) => {
      for (const file of filesArr) {
        if (helpers.fileIsValid(file)) {
          const fileNames = Object.keys(books).map(book => books[book].name);
          if (!(fileNames.includes(file.name))) {
            updateFiles(file).then((content) => {
              file.content = content;
            });
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
        validationResult = uploadFiles($scope.books,
         filesArray);
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
        if (Object.keys($scope.books).length === 0) {
          $scope.alerts(true, 'No uploaded file record found');
          return null;
        }
        Object.keys($scope.books).forEach((file) => {
          $scope.indexedFiles =
          invertedIndex.updateIndexedFilesRecords($scope.books,
          file, $scope.alerts);
          if ($scope.indexedFiles === null) {
            $scope.alerts(true, `invalid file content format.
            ${$scope.selected} please upload a valid file`);
            return null;
          }
        });
      } else {
        $scope.indexedFiles =
        invertedIndex.updateIndexedFilesRecords($scope.books,
        $scope.selected);
        if ($scope.indexedFiles === null) {
          $scope.alerts(true, `invalid file content format.
          ${$scope.selected} please upload a valid file`);
          return null;
        }
      }
      $location.path('/showIndex');
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
      if ($scope.indexedFiles === undefined) {
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
        const tokens = helpers.removeDuplicates(filteredWords);
        if ($scope.selected === 'All') {
          Object.keys($scope.indexedFiles).forEach((file) => {
            $scope.searches = invertedIndex.updateSearchResult(file, tokens);
          });
        } else if (!($scope.selected in $scope.indexedFiles)) {
          $scope.alerts(true, `no index record found for ${$scope.selected}`);
          return null;
        } else {
          const file = $scope.selected;
          $scope.searches = invertedIndex.updateSearchResult(file, tokens);
        }
        $location.path('/searchIndex');
      }
    };

  /** function to alert user incase of any error
   * @return {boolean} - true
   */
    $scope.homePage = () => {
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
