var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl1", function ($scope, $sce, $window, $http) {
  var rooturl = "";
  var folder = "";
  var url = rooturl + folder + "&rs:Embed=true&rc:LinkTarget=_self";

  $scope.iframeUrl = $sce.trustAsResourceUrl(url);
});
