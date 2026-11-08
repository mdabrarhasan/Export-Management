var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl1", function ($scope, $sce, $window, $http) {
  var Report = "";

  $.ajax({
    type: "GET",
    url: "/ReportController/ReportBuilder",
    data: { code: "JuteInvoiceReport" },
    success: function (result) {
      console.log(result);
      var Report = result.MotherUrl + result.FolderUrl + result.OtherUrl;

      $scope.$apply(function () {
        $scope.iframeUrl = $sce.trustAsResourceUrl(Report);
      });
    },
    error: function (errormessage) {
      notify("error", "Error Message", errormessage.responseText);
    },
  });
});
