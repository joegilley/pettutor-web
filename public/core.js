var pettutor = angular.module('pettutor', []);

function mainController($scope, $http, $timeout) {

      $http.get('/control/devices')
          .success(function(data) {
              $scope.devices = data.devices;
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });


    $scope.connect = function(address) {
      $http.get('/control/' + address + '/connect')
            .success(function(data) {
                $scope.devices[address].connected = true;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.feed = function(address) {
      $http.get('/control/' + address + '/feed')
            .success(function(data) {
                $scope.result = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.scan = function(address) {
      $http.get('/control/scan')
            .success(function(data) {
                console.log(data);
              })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
