myApp.directive('indexTab', () => ({
  templateUrl: '/templates/tabContent.html',
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

