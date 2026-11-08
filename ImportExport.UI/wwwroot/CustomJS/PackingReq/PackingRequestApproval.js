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

  $scope.formatInvoiceNo = function (val) {
    if (!val) return val;
    var s = String(val).replace(/\s+/g, "");
    if (s.length !== 12) return val;
    return (
      s.substr(0, 3) +
      " " +
      s.substr(3, 3) +
      " " +
      s.substr(6, 4) +
      " " +
      s.substr(10, 2)
    );
  };

  $scope.PCList = function () {
    $scope.loading = true;

    $http({
      method: "get",
      url: "/PackingRequestApproval/GetPending",
      params: { statusid: $scope.statusid },
    }).then(function (response) {
      $scope.getalldata = response.data;
      $scope.loading = false;
    });
  };

  $scope.Rejected = function (id, index) {
    if (confirm("Are You Sure? You Want to Reject this Record.") == true) {
      $http({
        method: "POST",
        url: "/PackingRequestApproval/Rejected",
        params: { id: id, remarks: $("#description" + index).val() },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.PCList();
      });
    } else {
    }
  };

  $scope.Approved = function (id, index) {
    if (confirm("Are You Sure? You Want to Approve this Record.") == true) {
      $http({
        method: "POST",
        url: "/PackingRequestApproval/Approve",
        params: { id: id, remarks: $("#description" + index).val() },
      }).then(function (response) {
        notify("success", "Success Message", response.data.trim());
        $scope.PCList();
      });
    } else {
    }
  };

  function toDateInputFormat(dateString) {
    // Assuming dateString is in a format like '2024-11-01 00:00:00.000'
    var date = new Date(dateString.replace(" ", "T")); // Ensure it's a valid ISO string
    if (!isNaN(date.getTime())) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month to 2 digits
      var day = String(date.getDate()).padStart(2, "0"); // Pad day to 2 digits
      return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
    } else {
      console.error("Invalid date:", dateString);
      return "";
    }
  }

  function toggleDownloadButton() {
    var slNo = $("#vSINO").text().trim();
    if (slNo != "") {
      $("#downloadButton").show();
    } else {
      $("#downloadButton").hide();
    }
  }

  $scope.ViewData = function (ID) {
    $("#vFileName").text("");
    toggleDownloadButton();

    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PackingRequestApproval/ViewByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      //console.log(data);
      //alert(data[0].packreqnumber);
      $("#vSINO").val(data[0].packreqnumber);
      $scope.masterdata = data;

      let needID = data[0].id;

      $http({
        method: "GET",
        url: "/PackingRequest/ViewMasterOn",
        params: { id: needID },
      }).success(function (data) {
        //console.log(data);
        //alert(data[0].packreqnumber);
        $("#vSINO").val(data[0].packreqnumber);
        $scope.masterdata = data;

        $scope.ViewByDetailsData(data[0].id);

        //let invoicenumber = data[0].invoicenumber;
        //let invoiceCode = invoicenumber.slice(-8);
        //let invoiceNumber = invoicenumber.slice(0, -8);

        //$("#vtxtInvoiceNumber").val(invoiceNumber);
        //$("#vtxtInvoiceCode").val(invoiceCode);

        //$("#vtxtPISC").val(data[0].packreqnumber);
        //$("#vtxtInvoiceDate").val(data[0].invoicedate);
        //$("#vtxtInvoiceTo").val(data[0].invoiceto);
        //$("#vtxtShippedfrom").val(data[0].shippedfrom);
        //$("#vtxtShippedto").val(data[0].shippedto);
        //$("#vtxtShipperPer").val(data[0].shippedper);
        //$("#vtxtContract").val(data[0].contractno);
        //$("#vtxtPINumber").val(data[0].packreqnumber);
        //$("#vtxtPurchaseOderNo").val(data[0].purchaseorderno);

        //var purchaseOrderDate = new Date(data[0].purchaseorderdated);
        //var formattedDate = purchaseOrderDate.toISOString().split('T')[0];
        //$("#vtxtPurchaseDate").val(formattedDate);

        //var PackDate = new Date(data[0].packreqdate);
        //var formattedDate = PackDate.toISOString().split('T')[0];
        //$("#vtxtPackDate").val(formattedDate);

        //var ShipDate = new Date(data[0].shipmentperiod);
        //var formattedDate = ShipDate.toISOString().split('T')[0];
        //$("#vtxtShipDate").val(formattedDate);

        //var packReqDate = toDateInputFormat(data[0].packreqdate);
        //$("#vtxtPackDate").val(packReqDate);
        //console.log("Pack Request Date:", packReqDate);

        //var shipmentPeriodDate = toDateInputFormat(data[0].shipmentperiod);
        //$("#vtxtShipDate").val(shipmentPeriodDate);
        //console.log("Shipment Period Date:", shipmentPeriodDate);

        //var purchaseOrderDate = toDateInputFormat(data[0].purchaseorderdated);
        //$("#vtxtPurchaseDate").val(purchaseOrderDate);
        //console.log("Purchase Order Date:", purchaseOrderDate);

        //console.log("Now need this");
        //console.log(data[0].purchaseorderdated);
        //console.log(data[0].packreqnumber);

        var PROCESSCODE = data[0].packreqnumber;

        GetUploadFileUsingAPI(PROCESSCODE);
      });
    });

    //    $scope.LoadDocument(ID);

    //$scope.ViewLoadDocumentStatus(ID);
  };

  $scope.ViewByDetailsData = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PackingRequest/ViewByDetailsID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.listdetails = $scope.normalizePackingRequestRows(data);
    });
  };

  $scope.normalizePackingRequestRows = function (rows) {
    if (!Array.isArray(rows)) {
      return [];
    }

    const canonicalKey = function (value) {
      return String(value || "")
        .replace(/[^a-z0-9]/gi, "")
        .toLowerCase();
    };

    const pick = function (row, keys) {
      const normalizedRow = {};
      Object.keys(row || {}).forEach(function (key) {
        normalizedRow[canonicalKey(key)] = row[key];
      });
      for (let i = 0; i < keys.length; i++) {
        const candidateKey = canonicalKey(keys[i]);
        if (
          normalizedRow[candidateKey] !== undefined &&
          normalizedRow[candidateKey] !== null
        ) {
          return normalizedRow[candidateKey];
        }
      }
      return null;
    };

    return rows.map(function (row) {
      return angular.extend({}, row, {
        id: pick(row, ["id", "Id", "ID"]),
        serialno: pick(row, ["serialno", "serialNo", "SERIALNO"]),
        itemid: pick(row, ["itemid", "itemId", "ITEMID"]),
        itemname: pick(row, ["itemname", "itemName", "ITEMNAME"]),
        uom: pick(row, ["uom", "UOM"]),
        quantity: pick(row, ["quantity", "QUANTITY"]),
        packingreqquantity: pick(row, [
          "packingreqquantity",
          "packingReqQuantity",
          "PACKINGREQQUANTITY",
        ]),
        remainingqty: pick(row, [
          "remainingqty",
          "remainingQty",
          "REMAININGQTY",
        ]),
        expproductiondate: pick(row, [
          "expproductiondate",
          "expproductionDate",
          "EXPPRODUCTIONORDERDATE",
        ]),
        expproductionorderdate: pick(row, [
          "expproductionorderdate",
          "expproductionOrderDate",
          "EXPPRODUCTIONORDERDATE",
        ]),
        trussNo: pick(row, ["trussNo", "trussno", "TRUSSNO"]),
        countNo: pick(row, ["countNo", "countno", "COUNTNO"]),
        totalPallet: pick(row, ["totalPallet", "totalpallet", "TOTALPALLET"]),
        totalCartoon: pick(row, [
          "totalCartoon",
          "totalcartoon",
          "TOTALCARTOON",
        ]),
        totalBale: pick(row, ["totalBale", "totalbale", "TOTALBALE"]),
        totalTare: pick(row, ["totalTare", "totaltare", "TOTALTARE"]),
        addWeight: pick(row, ["addWeight", "addweight", "ADDITIONALWEIGHT"]),
        grossWeight: pick(row, ["grossWeight", "grossweight", "GROSSWEIGHT"]),
        measurement: pick(row, ["measurement", "MEASUREMENT"]),
        siNo: pick(row, ["siNo", "sino", "SINO"]),
        totalSpool: pick(row, ["totalSpool", "totalspool", "TOTALSPOOL"]),
        millname: pick(row, ["millname", "millName", "MILLNAME"]),
        markInk: pick(row, ["markInk", "markink", "MARKINK"]),
        spoolOrPalat: pick(row, [
          "spoolOrPalat",
          "spoolOrPallet",
          "SPOOLORPALAT",
        ]),
        remarks: pick(row, ["remarks", "REMARKS"]),
        descriptions: pick(row, ["descriptions", "DESCRIPTIONS"]),
        packingrequestheaderid: pick(row, [
          "packingrequestheaderid",
          "packingRequestHeaderId",
          "PACKINGREQUESTHEADERID",
        ]),
        millid: pick(row, ["millid", "millId", "MILLID"]),
      });
    });
  };

  //$scope.ViewByDetailsData = function (ID) {
  //    $scope.ID = ID;
  //    $http({
  //        method: "GET",
  //        url: '/PackingRequestApproval/ViewByDetailsID',
  //        params: { id: $scope.ID }
  //    }).success(function (data) {
  //        console.log(data);
  //        $scope.listdetails = data;
  //    });
  //};

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PackingRequestApproval/GetDocStatus",
      params: { id: $scope.ID },
    }).success(function (result) {
      console.log(result);
      $scope.docstatusview = result;
    });
  };

  $scope.LoadDocument = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PackingRequestApproval/LoadDocument",
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
      url: "/PackingRequestApproval/Download",
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
});
