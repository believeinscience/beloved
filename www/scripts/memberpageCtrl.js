app.controller("memberPageController",['$scope',function($scope){
var memkan = new spriteAnima('#memkankati',16,16,7);

memkan.settimebetween(5000);
memkan.setrandexpr([{state:2,weight:1,length:1000},{state:3,weight:1,length:1000}]);
memkan.startinter();
$scope.memkankaticlick = function(){memkan.doRandomExpression([{state:6,weight:1,length:3000},{state:7,weight:1,length:3000}],true)};

$scope.$on("$destroy", function(){
	memkan.destroy();
});
}]);