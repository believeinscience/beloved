app.controller("memberPageController",['$scope','$timeout',function($scope,$timeout){
//ign is case sensitive, and the filename of their picture should also be the same case
$scope.players=[
{ign:"Kankati",
medal:{type:"648",text:"Supreme Leader"},
namelabel:{type:"43",text:"Kankati"},
coord:{x:0,y:0},
tooltip:"Hiiii~",
animationinfo:{frames:16,fps:16,states:7,width:61,height:86},
randexpressions:[{state:2,weight:4,length:1000},{state:3,weight:4,length:1000},{state:6,weight:1,length:3000},{state:7,weight:1,length:3000}],
randexpressionsonclick:[{state:5,weight:1,length:3000},{state:6,weight:1,length:3000},{state:7,weight:1,length:3000}],
},
{ign:"whanderlust",
medal:{type:"6",text:"Co-Founder"},
namelabel:{type:"59",text:"whanderlust"},
coord:{x:0,y:0},
tooltip:"twitch.tv/whanderlust",
animationinfo:{frames:16,fps:8,states:5,width:61,height:84},
randexpressions:[{state:2,weight:1,length:2000},{state:3,weight:1,length:2000}],
randexpressionsonclick:[{state:4,weight:1,length:3000},{state:5,weight:1,length:3000}],
},
{ign:"Archer",
medal:{type:"603",text:"Junior"},
namelabel:{type:"58",text:"Archer"},
coord:{x:0,y:0},
tooltip:"Hihi",
animationinfo:{frames:32,fps:16,states:6,width:57,height:70},
randexpressions:[{state:2,weight:1,length:2000},{state:3,weight:1,length:2000}],
randexpressionsonclick:[{state:4,weight:1,length:3000},{state:5,weight:1,length:3000},{state:6,weight:1,length:3000}],
},
{ign:"AlphaStigma",
medal:{type:"603",text:"Junior"},
namelabel:{type:"58",text:"AlphaStigma"},
coord:{x:0,y:0},
tooltip:"Stop Poking Me qq",
animationinfo:{frames:6,fps:16,states:5,width:70,height:82},
randexpressions:[{state:2,weight:2,length:375},{state:3,weight:2,length:375},{state:6,weight:1,length:3000}],
randexpressionsonclick:[{state:4,weight:1,length:3000},{state:5,weight:1,length:3000}],
},
{ign:"lnkedRose",
medal:{type:"485",text:"Junior"},
namelabel:{type:"40",text:"InkedRose"},
coord:{x:0,y:0},
tooltip:"HELLO EVERYONE",
animationinfo:{frames:32,fps:16,states:4,width:85,height:71},
randexpressions:[{state:2,weight:1,length:2000},{state:3,weight:1,length:2000}],
randexpressionsonclick:[{state:4,weight:1,length:3000}],
},
{ign:"Irena",
medal:{type:"554",text:"Irena Imposter"},
namelabel:{type:"59",text:"Irena"},
coord:{x:0,y:0},
tooltip:"Irena <3",
animationinfo:{frames:32,fps:16,states:4,width:110,height:77},
randexpressions:[{state:2,weight:4,length:2000},{state:3,weight:5,length:2000},{state:5,weight:1,length:3000}],
randexpressionsonclick:[{state:4,weight:1,length:4000}],
},
{ign:"Khasara",
medal:{type:"140",text:"Junior"},
namelabel:{type:"59",text:"Khasara"},
coord:{x:0,y:0},
tooltip:"\u25D0.\u0303\u25D0",
animationinfo:{frames:32,fps:16,states:4,width:50,height:76},
randexpressions:[{state:2,weight:4,length:2000},{state:3,weight:5,length:2000},{state:5,weight:1,length:3000}],
randexpressionsonclick:[{state:4,weight:1,length:3000}],
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
					
					//jshint: move function out of loop
					var clickhandler = function (input){
							var instance={};
							instance.x=i;
							instance.temp=$scope.players[instance.x].randexpressionsonclick;
							return function(){$scope.players[instance.x].animation.doRandomExpression(instance.temp,true);};
					};
					//iniate animation object
					//set the expressions to do
					for (var i=0;i<$scope.players.length-1;i++){
						$scope.players[i].animation = new spriteAnima('#avatar_'+$scope.players[i].ign,$scope.players[i].animationinfo.fps,$scope.players[i].animationinfo.frames,$scope.players[i].animationinfo.states);
						$scope.players[i].animation.setrandexpr($scope.players[i].randexpressions);
						$scope.players[i].animation.setstartrandomly(true);
						$scope.players[i].onclick = clickhandler(i);
						//initialize intervals for random expressions and make them draggable.
						$scope.players[i].animation.startinter();
						$('#player_'+$scope.players[i].ign).draggable();
					}
					
					}
                });
            });
        },
    };
});