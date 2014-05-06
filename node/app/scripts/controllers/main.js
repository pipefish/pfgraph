'use strict';

angular.module('pfgraphApp.controllers')
  .controller('MainCtrl', function ($q, $scope, $http) {
//    if(typeof ($scope.graph) == "undefined") {
//      $scope.graph = require('ngraph.graph');
//    }
    $scope.getUser = function (id,threshold) {
      $http.get('/v1/user/' + id).success(function(user) {
        $scope.node = user;
      }).error(function (err) {
        return alert(err.message || "an error occured");
      });
      $http.get('/v1/user/' + id + '/neighbors?threshold=' + threshold).success(function(neighbors) {
        $scope.neighbors = neighbors;
      }).error(function(err) {
        return alert(err.message || "an error occured");
      });
    };
  });
