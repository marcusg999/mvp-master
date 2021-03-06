'use strict';

angular.module('artscan.controllers')
.controller('MapCtrl', function($scope) {

   $scope.showSearchBox = false;

   $scope.init = function() {

        var myLatlng = new google.maps.LatLng(33.9764002,-118.4667452);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        // //Marker + infowindow + angularjs compiled ng-click
        // var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        // var compiled = $compile(contentString)($scope);

        // var infowindow = new google.maps.InfoWindow({
        //   content: compiled[0]
        // });

        // var marker = new google.maps.Marker({
        //   position: myLatlng,
        //   map: map,
        //   title: 'Uluru (Ayers Rock)'
        // });

        // google.maps.event.addListener(marker, 'click', function() {
        //   infowindow.open(map,marker);
        // });

        $scope.map = map;
    };


    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
    };

    $scope.searchBox = function() {
        console.log("showSearchBox: "+$scope.showSearchBox);
        $scope.showSearchBox = !$scope.showSearchBox;
    }


})