app.controller("memberPageController",['$scope','$timeout',function($scope,$timeout){
//ign is case sensitive, and the filename of their picture should also be the same case
$scope.players=[
{ign:"Kankati",
medal:{type:"648",text:"Supreme Leader"},
namelabel:{type:"43",text:"Kankati"},
coord:{x:400,y:350},
tooltip:"Hiiii~",
animationinfo:{frames:16,fps:16,states:7,width:61,height:86}
},
{ign:"whanderlust",
medal:{type:"6",text:"Co-Founder"},
namelabel:{type:"59",text:"whanderlust"},
coord:{x:450,y:425},
tooltip:"",
animationinfo:{frames:16,fps:8,states:5,width:61,height:84}
},
{ign:"Archer",
medal:{type:"603",text:"Junior"},
namelabel:{type:"58",text:"Archer"},
coord:{x:500,y:425},
tooltip:"",
animationinfo:{frames:16,fps:8,states:6,width:57,height:70}
},
//dirty hack since the $last item never seems to have its animation work.
//always last
{ign:"null",
medal:{type:"0",text:""},
namelabel:{type:"0",text:""},
coord:{x:0,y:0},
tooltip:"",
animationinfo:{width:1,height:1}
}];

$scope.executed=false;

$scope.$on("$destroy", function(){
	for(var i=0;i<$scope.players.length;i++)
		if('animation' in $scope.players[i])
			$scope.players[i].animation.destroy();
});

}]).directive('guildmember', function(){
	return{
		link:function(scope,element,attrs){
			//console.log(scope.player.ign);
		},
		restrict:'E',
		scope:{
		player: '=member'
		},
		templateUrl: 'templates/playerdirective.html'
	};
}).directive('postrepeatdirective', function() {
	//http://stackoverflow.com/questions/12304291/angularjs-how-to-run-additional-code-after-angularjs-has-rendered-a-template/24228604#24228604
    return {
        link: function($scope, element, attrs) {
            // Trigger when number of children changes,
            // including by directives like ng-repeat
            var watch = $scope.$watch(function() {
                return element.children().length;
            }, function() {
                // Wait for templates to render
                $scope.$evalAsync(function() {
                    // Finally, directives are evaluated
                    // and templates are renderer here
					if($scope.$last){
					//console.log("starting animations");
					//configure and start animations
					
					//iniate animation object
					for (var i=0;i<$scope.players.length-1;i++)
						$scope.players[i].animation = new spriteAnima('#avatar_'+$scope.players[i].ign,$scope.players[i].animationinfo.fps,$scope.players[i].animationinfo.frames,$scope.players[i].animationinfo.states);
					
					//set the expressions to do
					$scope.players[0].animation.setrandexpr([{state:2,weight:1,length:1000},{state:3,weight:1,length:1000}]);
					$scope.players[0].onclick = function(){$scope.players[0].animation.doRandomExpression([{state:5,weight:1,length:3000},{state:6,weight:1,length:3000},{state:7,weight:1,length:3000}],true);};

					$scope.players[1].animation.setrandexpr([{state:2,weight:1,length:2000},{state:3,weight:1,length:2000}]);
					$scope.players[1].onclick = function(){$scope.players[1].animation.doRandomExpression([{state:4,weight:1,length:3000},{state:5,weight:1,length:3000}],true);};
					
					$scope.players[2].animation.setrandexpr([{state:2,weight:1,length:2000},{state:3,weight:1,length:2000}]);
					$scope.players[2].onclick = function(){$scope.players[2].animation.doRandomExpression([{state:4,weight:1,length:3000},{state:5,weight:1,length:3000},{state:6,weight:1,length:3000}],true);};
					
					//initialize intervals for random expressions and make them draggable.
					for(i=0;i<$scope.players.length-1;i++){
						$scope.players[2].animation.startinter();
						$('#player_'+$scope.players[i].ign).draggable();
					}
					
					}
                });
            });
        },
    };
});