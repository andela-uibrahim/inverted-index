
myApp.directive('searchResult', () => ({
  templateUrl: 'templates/searchContent.html',
  replace: 'true',
  scope: {
    searches: '='
  },
}));

