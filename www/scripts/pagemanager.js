var app=angular.module('single-page-app',['ngRoute','ui.bootstrap']);

//When using $ variables from angular, take parameter ex: function($scope){} and format like ["$scope",function($scope){}] 
//Allows for minifying our angular code.
app.config(["$routeProvider",function($routeProvider){
      $routeProvider
          .when('/',{
                templateUrl: 'pages/home.html'
          })
          .when('/about',{
                templateUrl: 'pages/about.html'
          })
		  .when('/resources',{
                templateUrl: 'pages/resources.html'
          })
		  .when('/ScammerReg',{
                templateUrl: 'pages/ScammerReg.html'
          })
		  .when('/Countdown',{
                templateUrl: 'pages/Countdown.html'
          })
		  .when('/members',{
                templateUrl: 'pages/members.html'
          });


}]);

app.controller('cfgController',["$rootScope","$window","$location",function($rootScope,$window,$location){
	$rootScope.$on('$routeChangeSuccess', function(){
		$window.ga('send', 'pageview', { page: $location.url() });
        spriteAnimation.randomHappyface();
      });

}]);
