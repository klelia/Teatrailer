var aTeatrailerServices=angular.module('Teat',['ng-iscroll','ui']);

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
	when('/viewm/:mappa/:percorso', {
		controller: VediMappa,
		templateUrl: 'mappa.html'
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
	                 {'titolo':'Milano','citta':'mi', 'percorso':'oggi-in-scena'}
	                  ];
	var lastitem =  {'titolo':'Altre città','mappa':'allmap', 'percorso':'oggi-in-scena'};
	$scope.menuitems = menuitems;
	$scope.firstitem = firstitem;
	$scope.lastitem  = lastitem;
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
function VediMappa($scope,$routeParams,$http) {
		    //geolocation stuff!
		    var geoError = function(error){
		        var errors = {
		            1: 'Permission denied',
		            2: 'Position unavailable',
		            3: 'Request timeout'
		        };
		        $scope.positionError = ("Error: " + errors[error.code]);
		    };
		    //search images after position acquired
		    var positionAcquired = function(position){
		        console.log('position acquired', position);
		        searchImages(position);
		    };
		    var geolocate = function(){
		        if (navigator.geolocation) {
		            var timeoutVal = 10 * 1000 * 1000;
		            navigator.geolocation.getCurrentPosition(
		                positionAcquired,
		                geoError,
		                { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
		            );
		        }
		        else {
		 
		        }
		    };
		    geolocate();
		    var successCallback = function(resp, status, headers, config){
		        console.log(resp);
		        $scope.images = resp.data;
		    };
		    var searchImages = function(position){
		         var mialat = position.coords.latitude;
		          var mialng = position.coords.longitude;
		             
		         
		       
		    }
		    $scope.myMarkers = [];
		     
		    $scope.mapOptions = {
		   		      center: new google.maps.LatLng(45, -71),
		   		      zoom: 15,
		   		      mapTypeId: google.maps.MapTypeId.ROADMAP
		   		    };		     
		    $scope.addMarker = function($event) {
		      $scope.myMarkers.push(new google.maps.Marker({
		        map: $scope.myMap,
		        position: $event.latLng
		      }));
		    };
		     
		    $scope.setZoomMessage = function(zoom) {
		      $scope.zoomMessage = 'You just zoomed to '+zoom+'!';
		      console.log(zoom,'zoomed')
		    };
		     
		    $scope.openMarkerInfo = function(marker) {
		      $scope.currentMarker = marker;
		      $scope.currentMarkerLat = marker.getPosition().lat();
		      $scope.currentMarkerLng = marker.getPosition().lng();
		      $scope.myInfoWindow.open($scope.myMap, marker);
		    };
		     
		    $scope.setMarkerPosition = function(marker, lat, lng) {
		      marker.setPosition(new google.maps.LatLng(lat, lng));
		    };
		}
	  