/* eslint-disable no-undef */
myApp.directive('searchResult', () => ({
  templateUrl: 'templates/searchContent.html',
  replace: 'true',
  scope: {
    searches: '=',
    titles: '='
  },
}));

