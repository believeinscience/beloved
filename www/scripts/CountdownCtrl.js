app.controller('CountdownCtrl',["$scope","$interval","$timeout",function($scope, $interval, $timeout){
//Ingame Events. Times in UTC
$scope.igevents = [{Name:"Flag Race",Hour:"12",Minute:"0"},{Name:"Short Flag Race",Hour:"19",Minute:"0"},{Name:"Flag Race",Hour:"21",Minute:"0"},{Name:"Flag Race",Hour:"22",Minute:"0"},{Name:"Flag Race",Hour:"23",Minute:"0"},{Name:"Daily Server Reset",Hour:"0",Minute:"0"}];


var cdinter;
$scope.countdowns = function(){
	//checks if interval has started
	if (angular.isDefined(cdinter))
		return;
	
	//add date property to igevents
	for (var i=0;i<$scope.igevents.length;i++){
		$scope.igevents[i].time = moment(CDtimers.localTime($scope.igevents[i].Hour,$scope.igevents[i].Minute));
	}
	
	cdinter = $interval(function(){
		for (var i=0;i<$scope.igevents.length;i++){
			$scope.igevents[i].countdown = CDtimers.remainingTime($scope.igevents[i].Hour,$scope.igevents[i].Minute);
		}
	},1000);
};

//stops interval
$scope.stopinter = function(){
	if(angular.isDefined(cdinter)){
		$interval.cancel(cdinter);
		cdinter = undefined;
	}
};

//When switching pages, stops the interval.
$scope.$on("$destroy", function(){
	$scope.stopinter();
});

$timeout($scope.countdowns);

}]);