var aTeatrailerServices=angular.module('Teat',['ng-iscroll']);

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
	when('/viewg/:cult/:percorso', {
	    controller: SpettacoliCult,
	    templateUrl: 'spettacolicult.html'
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
	var firstitem = {'titolo':'In scena','cult':'tutte','percorso':'oggi-in-scena'};
	var menuitems = [
	                 {'titolo':'Roma', 'citta':'rm','percorso':'oggi-in-scena'},
	                 {'titolo':'Milano','citta':'mi', 'percorso':'oggi-in-scena'},
	                 {'titolo':'Altre città','citta':'altre', 'percorso':'oggi-in-scena'}
	                 ];
	$scope.menuitems = menuitems;
	$scope.firstitem = firstitem;
}

function ListaSpettacoli($scope,$routeParams,$http){
	//$http.get('json/'+$routeParams.percorso+'.json').success(function(data){
		$http.jsonp('http://www.teatrailer.it/json/'+$routeParams.citta+'/'+$routeParams.percorso+'?callback=JSON_CALLBACK').success(function(data){
			$scope.lista = data;
			$scope.lista.nasc = 'prova';
	}).
	error(function(data, status){
		$scope.data = data || 'Request failed!';
		$scope.status = status;
	});
}
function SpettacoliCult($scope,$routeParams,$http){
	//$http.get('json/'+$routeParams.percorso+'.json').success(function(data){
		$http.jsonp('http://www.teatrailer.it/json/'+$routeParams.cult+'/'+$routeParams.percorso+'?callback=JSON_CALLBACK').success(function(data){
			$scope.grid = data;
			$scope.grid.nasc = 'prova';
			$scope.$parent.myScrollOptions = {
					snap: true,
					momentum: false,
					hScrollbar: false,
			       };
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
		$scope.nodespe.nasc = 'prova';
		}).
		error(function(data, status){
			$scope.data = data || 'Request failed!';
			$scope.status = status;
		});
}

