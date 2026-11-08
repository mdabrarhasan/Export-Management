var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  //$scope.loading = true;
  $scope.StatusList = function () {
    $http({
      method: "get",
      url: "/PickingPackingRequestApproval/GetStatusData",
    }).then(function (response) {
      //console.log(response);
      $scope.statuslist = response.data;
    });
  };

  $scope.GetAllData = function () {
    $scope.loading = true;
    $http({
      method: "get",
      url: "/PickingPackingRequestApproval/GetPending",
      params: { statusid: $scope.statusid },
    }).then(function (response) {
      console.log(response.data);
      $scope.getalldata = response.data;
      $scope.loading = false;
    });
  };

  $scope.Rejected = function (id, index) {
    if (confirm("Are You Sure? You Want to Reject this Record.") == true) {
      $http({
        method: "POST",
        url: "/PickingPackingRequestApproval/Rejected",
        params: { id: id, remarks: $("#description" + index).val() },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.GetAllData();
      });
    } else {
    }
  };

  $scope.Approved = function (id, index) {
    if (confirm("Are You Sure? You Want to Approve this Record.") == true) {
      $http({
        method: "POST",
        url: "/PickingPackingRequestApproval/Approve",
        params: { id: id, remarks: $("#description" + index).val() },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.GetAllData();
      });
    } else {
    }
  };

  function toggleDownloadButton() {
    var slNo = $("#vSINO").text().trim();
    if (slNo != "") {
      $("#downloadButton").show();
    } else {
      $("#downloadButton").hide();
    }
  }

  $scope.ViewData = function (ID) {
    $("#vSINO").text("");
    $("#vFileName").text("");
    toggleDownloadButton();

    $scope.ID = ID;

    $http({
      method: "GET",
      url: "/PickingPackingRequestApproval/GetPickPackingId",
      params: { id: $scope.ID },
    }).success(function (data) {
      console.log("Now i need this");
      //      console.log(ID);
      console.log(data);
      console.log(data[0].id);
      //   $scope.masterdata = data;

      $http({
        method: "GET",
        url: "/PickingPackingRequest/ViewByMasterID",
        params: { id: data[0].id },
      }).success(function (result) {
        console.log("Now i need this");
        console.log(result);

        console.log(result[0].pickpacknumber);

        let PROCESSCODE = result[0].pickpacknumber;

        $http({
          method: "GET",
          url: "/SalesQuatationLanding/GetFileDetails",
          params: { prefix: PROCESSCODE },
        }).success(function (data) {
          console.log("OK");
          console.log(data);

          GetUploadFileUsingAPI(PROCESSCODE, data[0].filetype);
        });

        $scope.masterdata = result;
      });

      //$scope.LoadDocument(ID);
      $scope.ViewByDetailsData(data[0].id);
      //$scope.ViewLoadDocumentStatus(ID);
    });
  };

  $scope.ViewByDetailsData = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PickingPackingRequest/ViewByDetailsID",
      params: { id: $scope.ID },
    }).success(function (data) {
      console.log(data);
      $scope.listdetails = data;
    });
  };

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PickingPackingRequestApproval/GetDocStatus",
      params: { id: $scope.ID },
    }).success(function (result) {
      console.log(result);
      $scope.docstatusview = result;
    });
  };

  $scope.sortBy = function (column) {
    $scope.sortColumn = column;
    $scope.reverse = !$scope.reverse;
  };

  $scope.LoadDocument = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/LoadDocument",
      params: { id: $scope.ID },
    }).success(function (result) {
      console.log();
      $scope.imageitem = result;
    });
  };

  $scope.Download = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/Download",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.imageitem = result;
    });
  };
});
