app.controller('CountdownCtrl',["$scope","$interval","$timeout",function($scope, $interval, $timeout){
//Ingame Events. Times in UTC
$scope.igevents = [{Name:"Flag Race",Hour:"20",Minute:"0"},{Name:"Short Flag Race",Hour:"3",Minute:"0"},{Name:"Flag Race",Hour:"5",Minute:"0"},{Name:"Flag Race",Hour:"6",Minute:"0"},{Name:"Flag Race",Hour:"7",Minute:"0"},{Name:"Daily Server Reset",Hour:"8",Minute:"0"}];


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