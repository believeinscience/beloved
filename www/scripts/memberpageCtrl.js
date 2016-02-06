app.controller("memberPageController",['$scope',function($scope){
var memkan = new spriteAnima('#memkankati',16,16,7);
/*console.log('random list test');
var list = [{weight:1},{weight:1},{weight:1},{weight:1},{weight:1}];
results = {}
for(var i=0;i<list.length;i++)
	results[i]=0;

for(var i=0;i<10000000;i++)
	results[memkan.chooserandomweightedindex(list)]+=1;
console.log(results);*/
	
memkan.settimebetween(5000);
memkan.setrandexpr([{state:2,weight:1,length:1000},{state:3,weight:1,length:1000}]);
memkan.startinter();
$scope.memkankaticlick = function(){memkan.doRandomExpression([{state:6,weight:1,length:3000},{state:7,weight:1,length:3000}],true)};

$scope.$on("$destroy", function(){
	memkan.destroy();
});
}]);