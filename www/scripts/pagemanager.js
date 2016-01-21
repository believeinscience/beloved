var app=angular.module('single-page-app',['ngRoute']);


app.config(function($routeProvider){


      $routeProvider
          .when('/',{
                templateUrl: 'pages/home.html'
          })
          .when('/about',{
                templateUrl: 'pages/about.html'
          })
		  .when('/ScammerReg',{
                templateUrl: 'pages/ScammerReg.html'
          });


});


app.controller('cfgController',function($scope){


});
