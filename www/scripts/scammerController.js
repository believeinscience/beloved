app.controller("ScamRegController", ['$scope','$timeout',function($scope,$timeout){
$scope.loaded_data = false;
$scope.searchtext = "";
$scope.searchcriteria ="Select Criteria";


$scope.searchcriteria = {
	"type":"select",
	"value":"ScammerIGNs",
	"values":[]
};

$scope.ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "1QtvIGiKXpz98GwjDRBKoN8fFAUVrEybiwYebGcRWPgM",
  worksheet : "1"
});

$scope.retrieveddata = []

$scope.getdata = function() {$scope.ds.fetch({ 
  success : function() {
  
	//put data into easy to read format from miso
	for (var i=0;i<this.length; i++)
		$scope.retrieveddata.push(this.rowByPosition(i)); 

	//add data to drop down
	//$scope.$apply(function(){  $scope.searchcriteria.values = $scope.ds.columnNames();});
	
	//console.log("data loaded");
	$scope.loaded_data = true;
	
	//enable search bar now for searching
	//console.log("enabling search bar");
	$("#searchbar").attr("disabled",false);
	$("#searchbar").attr("placeholder","Enter search here");
	//$("#searchcriteria").attr("disabled",false);
  }
});
};

$scope.search = function(value){
	if(value[$scope.searchcriteria.value]==null)
		return false;
	if($scope.searchcriteria.value == "Search All"){
		
	}
	return value[$scope.searchcriteria.value].toLowerCase().indexOf($scope.searchtext.toLowerCase()) > -1;
};

//get that data
$timeout($scope.getdata);

}]);
