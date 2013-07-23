var aTeatrailerServices=angular.module('Teat',[]);

function listaRouteConfig($routeProvider){
	$routeProvider.
	when('/', {
		controller: MenuPage,
		templateUrl: 'menu.html'
			}).
	when('/view/:citta/:percorso', {
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
	                 {'titolo':'In scena', 'citta':'tutte','percorso':'oggi-in-scena'},
	                 {'titolo':'Roma', 'citta':'rm','percorso':'oggi-in-scena'},
	                 {'titolo':'Milano','citta':'mi', 'percorso':'oggi-in-scena'},
	                 {'titolo':'Altre città','citta':'altre', 'percorso':'oggi-in-scena'}
	                 ];
	$scope.menuitems = menuitems;
}

function ListaSpettacoli($scope,$routeParams,$http){
	//$http.get('json/'+$routeParams.percorso+'.json').success(function(data){
		$http.jsonp('http://www.teatrailer.it/json/'+$routeParams.citta+'/'+$routeParams.percorso+'?callback=JSON_CALLBACK',{ cache: true}).success(function(data){
			$scope.lista = data;
			$scope.lista.nasc = 'prova';
	}).
	error(function(data, status){
		$scope.data = data || 'Request failed!';
		$scope.status = status;
	});
}
function VediSpettacolo($scope,$routeParams,$http){
	//$http.get('json/spett'+$routeParams.nid+'.json').success(function(data){
	$http.jsonp('http://www.teatrailer.it/json/'+$routeParams.nid+'/spett?callback=JSON_CALLBACK',{ cache: true}).success(function(data){
		$scope.nodespe = data;
		$scope.nodespe.basevideo='http://msh0056.static.video.seewebstorage.it/hoo9Peib/';
		$scope.nodespe.nasc = 'prova';
		}).
		error(function(data, status){
			$scope.data = data || 'Request failed!';
			$scope.status = status;
		});
}

