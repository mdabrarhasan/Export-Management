/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  //$scope.loading = true;
  $scope.StatusList = function () {
    $http({
      method: "get",
      url: "/SalesQuatationApproval/GetStatusData",
    }).then(function (response) {
      //console.log(response);
      $scope.statuslist = response.data;
    });
  };

  $scope.SQList = function () {
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/GetSalesQuatationApproval",
      params: { id: $scope.statusid },
    }).then(function (response) {
      console.log(response.data);
      $scope.SQlist = response.data;
      //$scope.loading = false;
    });
  };

  $scope.sortBy = function (column) {
    $scope.sortColumn = column;
    $scope.reverse = !$scope.reverse;
  };

  $scope.Approved = function (histryid, id, index) {
    if (confirm("Are You Sure? You Want to Approve this Record.") == true) {
      $http({
        method: "POST",
        url: "/SalesQuatationApproval/Approve",
        params: {
          id: id,
          histryid: histryid,
          remarks: $("#description" + index).val(),
        },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.SQList();
      });
    } else {
    }
  };

  $scope.Rejected = function (id, index) {
    if (confirm("Are You Sure? You Want to Reject this Record.") == true) {
      $http({
        method: "POST",
        url: "/SalesQuatationApproval/Rejected",
        params: { id: id, remarks: $("#description" + index).val() },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.SQList();
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

  $scope.ViewbyMasterID = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/ViewByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      //console.log(data);
      $scope.masterdata = data;
      //GetUploadFileUsingAPI(data[0].sqNumber);
    });
  };

  $scope.EditbyMasterID = function (ID) {
    $("#vSINO").text("");
    $("#vFileName").text("");
    toggleDownloadButton();
    $scope.ViewbyMasterID(ID);

    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/EditByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.masterdata = data;

      console.log("Getting the approval in the master");
      console.log(data);

      let PROCESSCODE = data[0].sqNumber;

      GetUploadFileUsingAPI(PROCESSCODE, "");
    });

    $scope.LoadDocument(ID);
    $scope.EditbyDetailsID(ID);
  };

  $scope.EditbyDetailsID = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/EditByDetaisID",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.detailsbyid = result;
    });
  };

  $scope.LoadDocument = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/LoadDocument",
      params: { id: $scope.ID },
    }).success(function (result) {
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
  $scope.Cancled = function (id, index) {
    if (confirm("Are You Sure? You Want to Cancle this Record.") == true) {
      $http({
        method: "GET",
        url: "/Common/Cancled",
        params: { id: id, remarks: index },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.SQList();
      });
    } else {
    }
  };
  //$scope.Cancled = function (id, index) {
  //    alert(index)
  //    if (confirm('Are You Sure? You Want to Cancle this Record.') == true) {

  //        $http({
  //            method: "GET",
  //            url: "/Common/Cancled",
  //            params: { id: id, remarks: index }
  //        }).then(function (response) {
  //            notify('success', 'Success Message', response.data.trim());
  //            $scope.SQList();
  //        });
  //    }
  //    else {

  //    }
  //};

  $scope.Ropen = function (id, index) {
    if (confirm("Are You Sure? You Want to Reopen this Record.") == true) {
      $http({
        method: "GET",
        url: "/Common/Ropen",
        params: { type: id, id: index },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.SQList();
      });
    } else {
    }
  };
});
