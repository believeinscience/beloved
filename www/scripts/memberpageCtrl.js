app.controller("memberPageController",['$scope','$timeout',function($scope,$timeout){
/*var memkan = new spriteAnima('#memkankati',16,16,7);
memkan.settimebetween(5000);
memkan.setrandexpr([{state:2,weight:1,length:1000},{state:3,weight:1,length:1000}]);
memkan.startinter();
$scope.memkankaticlick = function(){memkan.doRandomExpression([{state:6,weight:1,length:3000},{state:7,weight:1,length:3000}],true)};*/

$scope.players=[{ign:"Kankati",
medal:{type:"717",text:"Supreme Leader"},
namelabel:{type:"59",text:"Kankati"},
coord:{x:300,y:300},
animation:null,
animationinfo:{frames:16,fps:16,states:7,width:61,height:86}
}];


//after directives, configure animations.
//doesn't work as well as it could. Need new method to do this.
$timeout(function(){
	$scope.players.animation = new spriteAnima('#avatar_'+$scope.players[0].ign,$scope.players[0].animationinfo.frames,$scope.players[0].animationinfo.fps,$scope.players[0].animationinfo.states);
	$scope.players.animation.setrandexpr([{state:2,weight:1,length:1000},{state:3,weight:1,length:1000}]);
	$scope.players.animation.startinter();
},2000);

$scope.$on("$destroy", function(){
	for(var i=0;i<$scope.players.length;i++)
		$scope.players[i].animation.destroy();
});

}]).directive('guildmember', function(){
	return{
		restrict:'E',
		scope:{
		player: '=member'
		},
		templateUrl: 'player/playerDirective.html'
	};
});