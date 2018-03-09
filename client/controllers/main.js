var app = angular.module('ChurchApp', []);

app.controller('MainCtrl', function($scope, $http) {
  $scope.workers = [];
  $scope.worker = {
    personal: {
      fname: "",
      lname: "",
      address: "",
      phone: "",
      gender: "",
    },
    church: {
      branch: "",
      dept: "",
      titheno: "",
      bibleSchool: "",
      bschDate: "",
      bschcert: ""
    },
    school: {
      level: ""
    },
    employment: {
      job: ""
    }
  }

  var worker = $scope.worker;
  $scope.createWorker = function(worker){
    var workers = $scope.workers;
    workers.push($scope.worker);
    console.log(workers,"workers");
    // $http.post("api/worker", worker);
  }
});

app.controller('authCtrl', function($scope){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    //placeholder until authentication is implemented
    $scope.error_message = 'login request for ' + $scope.user.username;
  };

  $scope.register = function(){
    //placeholder until authentication is implemented
    $scope.error_message = 'registeration request for ' + $scope.user.username;
  };
});
