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
  ['$scope', '$location', '$window', function ($scope, $location, $window) {
   // const helper = new Utility();

    let filesArray;
    $scope.books = [];
    const contents = [];
    document.getElementById('upload')
        .addEventListener('change', () => {
          filesArray = document.getElementById('upload').files;
        });
    // $scope.getSelectedOption = () => {
    //   const selected = document.getElementById('selectFile');
    //   const selectedValue = selected.options[selected.selectedIndex].value;
    //       if (selectedValue == "selectcard")
    //     {
    //       alert("Please select a card type");
    //     }
    //   }
    $scope.toSelectFile = () => {
      for (let i = 0; i < filesArray.length; i++) {
        const book = {};
        book.name = filesArray[i].name;
        book.size = filesArray[i].size;
        book.type = filesArray[i].type;
        $scope.books.push(book);
        const reader = new FileReader();
        reader.readAsText(filesArray[i]);
        reader.onload = (e) => {
          const content = JSON.parse(e.target.result);
          contents.push(content);
        };
      }
    };

    $scope.submit = () => {
      console.log($scope.books);
      console.log(filesArray[0]);
      $location.path('/showIndex')
    };

    $scope.tabs = [{
      word: 'usman',
      exist: true,
      existB: false,
      existC: true
    },

    {
      word: 'kazeem',
      exist: true,
      existB: true,
      existC: false
    },
    {
      word: 'hassan',
      exist: false,
      existB: true,
      existC: true
    }
    ];

   // $scope.selectFile =function


//      {
//        $window.alert('please Upload a valid file');
//      }
//    };
  }]);


myApp.directive('indexTab', () => ({
  templateUrl: 'templates/tabContent.html',
  replace: 'true',
  scope: {
    tabObject: '='
  },
}));

