/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  //$scope.loading = true;
  $scope.StatusList = function () {
    $http({
      method: "get",
      url: "/AgreementApproval/GetStatusData",
    }).then(function (response) {
      //console.log(response);
      $scope.statuslist = response.data;
    });
  };

  $scope.AgreementType = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetAgreementType",
    }).then(function (response) {
      $scope.Agreementtype = response.data;
    });
  };

  $scope.PIList = function () {
    if ($scope.agreementtypeid === undefined || $scope.statusid === undefined) {
    } else {
      $http({
        method: "get",
        url: "/AgreementApproval/GetAgreementPending",
        params: { aggcode: $scope.agreementtypeid, statusid: $scope.statusid },
      }).then(function (response) {
        $scope.PIlist = response.data;
        //$scope.loading = false;
      });
    }
  };

  $scope.Rejected = function (id, index) {
    if (confirm("Are You Sure? You Want to Reject this Record.") == true) {
      $http({
        method: "POST",
        url: "/AgreementApproval/Rejected",
        params: {
          id: id,
          remarks: $("#description" + index).val(),
          aggtype: $("#agreementtype").val(),
        },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.PIList();
      });
    } else {
    }
  };

  $scope.Approved = function (histryid, id, index) {
    if (confirm("Are You Sure? You Want to Approve this Record.") == true) {
      $http({
        method: "POST",
        url: "/AgreementApproval/Approve",
        params: {
          id: id,
          histryid: histryid,
          remarks: $("#description" + index).val(),
          aggtype: $("#agreementtype").val(),
        },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.PIList();
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

  $scope.ViewByMasterID = function (ID) {
    $("#vSINO").text("");
    $("#vFileName").text("");
    toggleDownloadButton();

    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/AgreementApproval/ViewByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.masterdata = data;

      console.log("In the approval view in master");
      console.log(data);

      // data[0].pinumber

      GetUploadFileUsingAPI(data[0].pinumber, "");
    });

    $scope.LoadDocument(ID);
    $scope.ViewByDetailsID(ID);
  };

  $scope.ViewByDetailsID = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/AgreementApproval/ViewByDetailsID",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.detailsbyid = result;
    });
  };

  $scope.SQList = function () {
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/GetSalesQuatationApproval",
      params: { id: $scope.statusid },
    }).then(function (response) {
      $scope.SQlist = response.data;
      //$scope.loading = false;
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
