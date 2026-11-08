var app = angular.module("LCBankInfoReportApp", []);

app.controller("LCBankInfoReportCtl", function ($scope, $http, $sce) {
  $scope.lcNo = "";
  $scope.applicantId = "0";
  $scope.startDate = null;
  $scope.endDate = null;

  $scope.paymentDate = null;
  $scope.bankId = "0";
  $scope.amChallanDate = null;
  $scope.paymentReceiveDate = null;
  $scope.aitCertificateStatusId = "0";
  $scope.docNegoDate = null;
  $scope.rmName = "";
  $scope.rmDate = "";

  $scope.applicantList = [];
  $scope.bankList = [];
  $scope.aitCertificateStatusList = [];
  $scope.rmList = [];
  $scope.rmDateList = [];

  $scope.LoadApplicants = function () {
    $http({
      method: "GET",
      url: "/LCBankInfoReport/GetApplicantList",
    }).then(function (response) {
      $scope.applicantList = response.data;

      setTimeout(function () {
        $("#ddlApplicant").select2({
          placeholder: "-- All Applicants --",
          allowClear: true,
        });
      }, 500);
    });
  };

  function LoadLCNoList() {
    $http.get("/LCBankInfoReport/GetLCNoList").then(function (response) {
      $scope.lcNoList = response.data;
    });
  }

  function LoadBankList() {
    $http.get("/LCBankInfoReport/GetBankList").then(function (response) {
      $scope.bankList = response.data;
    });
  }

  function LoadRmList() {
    $http.get("/LCBankInfoReport/GetRmList").then(function (response) {
      $scope.rmList = response.data;
    });
  }

  function LoadRmDateList() {
    $http.get("/LCBankInfoReport/GetRmDateList").then(function (response) {
      $scope.rmDateList = response.data;

      console.log("rmdate", $scope.rmDateList);
    });
  }

  function LoadAitCertificateStatusList() {
    $http
      .get("/LCBankInfoReport/GetAitCertificateStatusList")
      .then(function (response) {
        $scope.aitCertificateStatusList = response.data;
      });
  }

  LoadLCNoList();
  LoadBankList();
  LoadRmList();
  LoadRmDateList();
  LoadAitCertificateStatusList();

  $scope.SetLcId = function () {
    var matched = ($scope.lcNoList || []).find(function (x) {
      return (
        (x.name || "").toString().trim().toLowerCase() ===
        ($scope.lcNoText || "").toString().trim().toLowerCase()
      );
    });

    $scope.lcNo = matched ? matched.id : "";
  };

  $scope.Submit = function () {
    console.log("Status", $scope.bankId);
    var lcNo = $scope.lcNo || "";
    var partyId = $scope.applicantId || "0";
    var sDate = $scope.startDate ? formatDate($scope.startDate) : "";
    var eDate = $scope.endDate ? formatDate($scope.endDate) : "";
    var paymentDate = $scope.paymentDate ? formatDate($scope.paymentDate) : "";
    var bankId = $scope.bankId || "0";
    var amChallanDate = $scope.amChallanDate
      ? formatDate($scope.amChallanDate)
      : "";
    var paymentReceiveDate = $scope.paymentReceiveDate
      ? formatDate($scope.paymentReceiveDate)
      : "";
    var aitStatusId = $scope.aitCertificateStatusId || "0";
    var docNegoDate = $scope.docNegoDate ? formatDate($scope.docNegoDate) : "";
    var rmName = $scope.rmName || "";
    //var rmDate = $scope.rmDate || "";
    var rmDate = $scope.rmDate ? formatDate($scope.rmDate) : "";

    var rooturl = "";
    var folder = "/Export/COMMON/LCBankInfoReport";

    var url = rooturl + encodeURIComponent(folder);

    url += lcNo == "" ? "&LCNO:isnull=true" : "&LCNO=" + lcNo;
    url += partyId == "0" ? "&PARTYID:isnull=true" : "&PARTYID=" + partyId;
    url += sDate == "" ? "&SDATE:isnull=true" : "&SDATE=" + sDate;
    url += eDate == "" ? "&EDATE:isnull=true" : "&EDATE=" + eDate;

    url +=
      paymentDate == ""
        ? "&PAYMENTDATE:isnull=true"
        : "&PAYMENTDATE=" + paymentDate;
    url += bankId == "0" ? "&BANKID:isnull=true" : "&BANKID=" + bankId;
    url +=
      amChallanDate == ""
        ? "&AMCHALLANDATE:isnull=true"
        : "&AMCHALLANDATE=" + amChallanDate;
    url +=
      paymentReceiveDate == ""
        ? "&PAYMENTRECEIVEDATE:isnull=true"
        : "&PAYMENTRECEIVEDATE=" + paymentReceiveDate;
    url +=
      aitStatusId == "0"
        ? "&AITCERTIFICATESTATUSID:isnull=true"
        : "&AITCERTIFICATESTATUSID=" + aitStatusId;
    url +=
      docNegoDate == ""
        ? "&DOCNEGODATE:isnull=true"
        : "&DOCNEGODATE=" + docNegoDate;
    url += rmName == "" ? "&RMNAME:isnull=true" : "&RMNAME=" + rmName;
    url += rmDate == "" ? "&RMDATE:isnull=true" : "&RMDATE=" + rmDate;

    url += "&rs:Embed=true&rc:LinkTarget=_self";

    $scope.iframeUrl = $sce.trustAsResourceUrl(url);
  };

  function formatDate(date) {
    if (!date) return "";
    var d = new Date(date);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var year = d.getFullYear();
    return month + "/" + day + "/" + year;
  }
});
