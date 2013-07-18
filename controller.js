var aTeatrailerServices=angular.module('Teat',[]);

function listaRouteConfig($routeProvider){
	$routeProvider.
	when('/', {
		controller: MenuPage,
		templateUrl: 'menu.html'
			}).
	when('/view/:percorso', {
		controller: ListaSpettacoli,
		templateUrl: 'listaspettacoli.html'
			}).
		when('/spettacolo/:nid', {
			controller: VediSpettacolo,
			templateUrl: 'spettacolo.html'
			}).
	otherwise({
		redirectTo: '/'
	});
}
aTeatrailerServices.config(listaRouteConfig);

function MenuPage($scope,$http){
	var menuitems = [
	                 {'titolo':'In scena', 'percorso':'oggi-in-scena'},
	                 {'titolo':'Roma', 'percorso':'oggi-in-scena'},
	                 {'titolo':'Milano', 'percorso':'oggi-in-scena'},
	                 {'titolo':'Altre città', 'percorso':'oggi-in-scena'}
	                 ];
	$scope.menuitems = menuitems;
}

function ListaSpettacoli($scope,$routeParams,$http){
	//$http.get('json/'+$routeParams.percorso+'.json').success(function(data){
		$http.jsonp('http://www.teatrailer.it/json/roma/'+$routeParams.percorso+'?callback=JSON_CALLBACK').success(function(data){
		$scope.lista = data;
	}).
	error(function(data, status){
		$scope.data = data || 'Request failed!';
		$scope.status = status;
	});
}
function VediSpettacolo($scope,$routeParams,$http){
	//$http.get('json/spett'+$routeParams.nid+'.json').success(function(data){
	$http.jsonp('http://www.teatrailer.it/json/'+$routeParams.nid+'/spett?callback=JSON_CALLBACK').success(function(data){
		$scope.nodespe = data;
		$scope.nodespe.basevideo='http://msh0056.static.video.seewebstorage.it/hoo9Peib/';
		}).
		error(function(data, status){
			$scope.data = data || 'Request failed!';
			$scope.status = status;
		});
}

