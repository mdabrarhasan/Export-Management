var app = angular.module("PriceListReportApp", []);

app.controller("PriceListReportCtl", function ($scope, $sce) {
  $scope.fromDate = null;
  $scope.toDate = null;
  $scope.iframeUrl = null;

  $scope.Submit = function () {
    var fromDate = $scope.fromDate ? formatDate($scope.fromDate) : "";

    var toDate = $scope.toDate ? formatDate($scope.toDate) : "";

    var rooturl = "";

    var reportPath = "/Export/COMMON/Get-Price-Approval-Report";

    var url = rooturl + encodeURIComponent(reportPath);

    if (fromDate) {
      url += "&FromDate=" + encodeURIComponent(fromDate);
    } else {
      url += "&FromDate=:isnull=true";
    }

    if (toDate) {
      url += "&ToDate=" + encodeURIComponent(toDate);
    } else {
      url += "&ToDate:isnull=true";
    }

    url += "&rs:Embed=true";
    url += "&rc:LinkTarget=_self";

    console.log("Report URL:", url);

    $scope.iframeUrl = $sce.trustAsResourceUrl(url);
  };

  function formatDate(date) {
    if (!date) {
      return "";
    }

    var d = new Date(date);

    var year = d.getFullYear();

    var month = ("0" + (d.getMonth() + 1)).slice(-2);

    var day = ("0" + d.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }
});
