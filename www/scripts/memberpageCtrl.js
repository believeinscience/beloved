app.controller("memberPageController",['$scope',function($scope){

var memkan = new spriteAnima('#memkankati',16,16,7);
memkan.setexprtime(1000);
memkan.settimebetween(5000);
memkan.setrandexpr([2,3]);
memkan.startinter();
$scope.memkankaticlick = function(){memkan.doRandomExpression([6,7],3000)};

$scope.$on("$destroy", function(){
	memkan.destroy();
});
}]);