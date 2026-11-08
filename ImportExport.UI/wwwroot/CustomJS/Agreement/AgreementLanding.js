/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http, $timeout) {
  $scope.tbl_th_pi = "PI Number";
  $scope.tbl_th_pidate = "PI Date";
  //$scope.loading = true;
  $scope.GetItemType = function () {
    $http({
      method: "get",
      url: "/Common/GetItemType",
    }).then(function (response) {
      $scope.itemtype = response.data;
    });
  };

  $scope.ApplyDisableAllListRows = function () {
    $timeout(function () {
      if (!$scope.detailsbyid) return;
      $scope.detailsbyid.forEach(function (row, index) {
        var Value = row.itemtypeid;
        var allFields = [
          "#size" + index,
          "#construction" + index,
          "#weight" + index,
          "#slit" + index,
          "#scrim" + index,
        ];
        allFields.forEach(function (id) {
          $(id).prop("disabled", false);
        });

        var disableFields = [];
        if (Value == "1") disableFields = allFields;
        else if (Value == "2")
          disableFields = ["#slit" + index, "#scrim" + index];
        else if (Value == "3") disableFields = ["#construction" + index];
        disableFields.forEach(function (id) {
          $(id).prop("disabled", true);
        });
      });
    });
  };

  $scope.ApplyDisableAllEditListRows = function () {
    $timeout(function () {
      if (!$scope.edetailsbyid) return;
      $scope.edetailsbyid.forEach(function (row, index) {
        var Value = row.itemtypeid;
        var allFields = [
          "#eetxtSize" + index,
          "#eetxtConstruction" + index,
          "#eetxtWeight" + index,
          "#eetxtSlit" + index,
          "#eetxtScrim" + index,
        ];
        allFields.forEach(function (id) {
          $(id).prop("disabled", false);
        });

        var disableFields = [];
        if (Value == "1") disableFields = allFields;
        else if (Value == "2")
          disableFields = ["#eetxtSlit" + index, "#eetxtScrim" + index];
        else if (Value == "3") disableFields = ["#eetxtConstruction" + index];
        disableFields.forEach(function (id) {
          $(id).prop("disabled", true);
        });
      });
    });
  };

  $scope.EnableDisableItemTypeWise = function () {
    var Value = $("#itemtypeid").val();

    // Clear Item Name (and its hidden code/text)
    $("#name").val("");
    $("#itemcode").val("");
    $("#hname").val("");

    // Clear specification fields
    $("#txtSize").val("");
    $("#txtSizeID").val("");
    $("#txtConstruction").val("");
    $("#txtConstructionID").val("");
    $("#txtWeight").val("");
    $("#txtWeightID").val("");
    $("#txtSlit").val("");
    $("#txtSlitID").val("");
    $("#txtScrim").val("");
    $("#txtScrimID").val("");
    $("#txtQuality").val("");
    $("#txtQualityID").val("");

    // Hide error spans
    $(
      "#name,#txtSize,#txtConstruction,#txtWeight,#txtSlit,#txtScrim,#txtQuality",
    )
      .siblings("span.error")
      .css("visibility", "hidden");

    // Enable all first
    var allFields = [
      "#txtSize",
      "#txtConstruction",
      "#txtWeight",
      "#txtSlit",
      "#txtScrim",
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    // Apply disable rules
    var disableFields = [];
    if (Value == "1") {
      disableFields = [
        "#txtSize",
        "#txtConstruction",
        "#txtWeight",
        "#txtSlit",
        "#txtScrim",
      ];
    } else if (Value == "2") {
      disableFields = ["#txtSlit", "#txtScrim"];
    } else if (Value == "3") {
      disableFields = ["#txtConstruction"];
    }
    disableFields.forEach(function (id) {
      $(id).prop("disabled", true);
    });
  };

  // ---------- Insert Modal: List of Item — initial render (no clearing) ----------

  $scope.InitialListEnableDisableItemTypeWiseLine = function (index) {
    $timeout(function () {
      if (!$scope.detailsbyid || !$scope.detailsbyid[index]) return;
      var Value = $scope.detailsbyid[index].itemtypeid;
      var allFields = [
        "#size" + index,
        "#construction" + index,
        "#weight" + index,
        "#slit" + index,
        "#scrim" + index,
      ];
      allFields.forEach(function (id) {
        $(id).prop("disabled", false);
      });
      var disableFields = [];
      if (Value == "1") disableFields = allFields;
      else if (Value == "2")
        disableFields = ["#slit" + index, "#scrim" + index];
      else if (Value == "3") disableFields = ["#construction" + index];
      disableFields.forEach(function (id) {
        $(id).prop("disabled", true);
      });
    });
  };

  //$scope.InitialListEnableDisableItemTypeWiseLine = function (index) {
  //    if (!$scope.detailsbyid || !$scope.detailsbyid[index]) return;
  //    var Value = $scope.detailsbyid[index].itemtypeid;

  //    var allFields = [
  //        '#size' + index, '#construction' + index, '#weight' + index,
  //        '#slit' + index, '#scrim' + index
  //    ];
  //    allFields.forEach(function (id) { $(id).prop('disabled', false); });

  //    var disableFields = [];
  //    if (Value == "1") {
  //        disableFields = allFields;
  //    } else if (Value == "2") {
  //        disableFields = ['#slit' + index, '#scrim' + index];
  //    } else if (Value == "3") {
  //        disableFields = ['#construction' + index];
  //    }
  //    disableFields.forEach(function (id) { $(id).prop('disabled', true); });
  //};

  // ---------- Edit Modal: Add Item row (top entry) ----------
  $scope.EditEnableDisableItemTypeWise = function () {
    var Value = $("#eitemtypeid").val();

    // Clear Item Name (and its hidden code)
    $("#ename").val("");
    $("#eitemcode").val("");

    // Clear specification fields
    $("#etxtSize").val("");
    $("#etxtConstruction").val("");
    $("#etxtWeight").val("");
    $("#etxtSlit").val("");
    $("#etxtScrim").val("");
    $("#etxtQuality").val("");

    // Hide error spans
    $(
      "#ename,#etxtSize,#etxtConstruction,#etxtWeight,#etxtSlit,#etxtScrim,#etxtQuality",
    )
      .siblings("span.error")
      .css("visibility", "hidden");

    // Enable all first
    var allFields = [
      "#etxtSize",
      "#etxtConstruction",
      "#etxtWeight",
      "#etxtSlit",
      "#etxtScrim",
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    // Apply disable rules
    var disableFields = [];
    if (Value == "1") {
      disableFields = [
        "#etxtSize",
        "#etxtConstruction",
        "#etxtWeight",
        "#etxtSlit",
        "#etxtScrim",
      ];
    } else if (Value == "2") {
      disableFields = ["#etxtSlit", "#etxtScrim"];
    } else if (Value == "3") {
      disableFields = ["#etxtConstruction"];
    }
    disableFields.forEach(function (id) {
      $(id).prop("disabled", true);
    });
  };

  // ---------- Insert Modal: List of Item (repeated rows from PI for PITOSC) ----------

  $scope.ListEnableDisableItemTypeWiseLine = function (index) {
    if (!$scope.detailsbyid || !$scope.detailsbyid[index]) return;
    var Value = $scope.detailsbyid[index].itemtypeid;

    // Clear Item Name in DOM + bound model
    $("#name" + index).val("");
    $("#itemcode" + index).val("");
    $scope.detailsbyid[index].itemname = "";
    $scope.detailsbyid[index].itemid = "";

    // Clear spec fields — IDs MUST match the HTML (size/construction/weight/slit/scrim)
    $("#size" + index).val("");
    $("#construction" + index).val("");
    $("#weight" + index).val("");
    $("#slit" + index).val("");
    $("#scrim" + index).val("");
    $("#quality" + index).val("");

    var allFields = [
      "#size" + index,
      "#construction" + index,
      "#weight" + index,
      "#slit" + index,
      "#scrim" + index,
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    var disableFields = [];
    if (Value == "1") {
      disableFields = allFields;
    } else if (Value == "2") {
      disableFields = ["#slit" + index, "#scrim" + index];
    } else if (Value == "3") {
      disableFields = ["#construction" + index];
    }
    disableFields.forEach(function (id) {
      $(id).prop("disabled", true);
    });
  };

  //$scope.ListEnableDisableItemTypeWiseLine = function (index) {
  //    if (!$scope.detailsbyid || !$scope.detailsbyid[index]) return;
  //    var Value = $scope.detailsbyid[index].itemtypeid;

  //    // Clear Item Name in DOM + bound model
  //    $("#name" + index).val('');
  //    $("#itemcode" + index).val('');
  //    $scope.detailsbyid[index].itemname = '';
  //    $scope.detailsbyid[index].itemid = '';

  //    // Clear spec fields in DOM
  //    $("#txtSize" + index).val('');
  //    $("#txtConstruction" + index).val('');
  //    $("#txtWeight" + index).val('');
  //    $("#txtSlit" + index).val('');
  //    $("#txtScrim" + index).val('');
  //    $("#txtQuality" + index).val('');

  //    // Apply disable rules
  //    var allFields = [
  //        '#txtSize' + index, '#txtConstruction' + index, '#txtWeight' + index,
  //        '#txtSlit' + index, '#txtScrim' + index
  //    ];
  //    allFields.forEach(function (id) { $(id).prop('disabled', false); });

  //    var disableFields = [];
  //    if (Value == "1") {
  //        disableFields = allFields;
  //    } else if (Value == "2") {
  //        disableFields = ['#txtSlit' + index, '#txtScrim' + index];
  //    } else if (Value == "3") {
  //        disableFields = ['#txtConstruction' + index];
  //    }
  //    disableFields.forEach(function (id) { $(id).prop('disabled', true); });
  //};

  // ---------- Edit Modal: List of Item — initial render (no clearing) ----------
  $scope.InitialEditEnableDisableItemTypeWiseLine = function (index) {
    if (!$scope.edetailsbyid || !$scope.edetailsbyid[index]) return;
    var Value = $scope.edetailsbyid[index].itemtypeid;

    var allFields = [
      "#eetxtSize" + index,
      "#eetxtConstruction" + index,
      "#eetxtWeight" + index,
      "#eetxtSlit" + index,
      "#eetxtScrim" + index,
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    var disableFields = [];
    if (Value == "1") {
      disableFields = allFields;
    } else if (Value == "2") {
      disableFields = ["#eetxtSlit" + index, "#eetxtScrim" + index];
    } else if (Value == "3") {
      disableFields = ["#eetxtConstruction" + index];
    }
    disableFields.forEach(function (id) {
      $(id).prop("disabled", true);
    });
  };

  // ---------- Edit Modal: List of Item — on user change (clear + apply) ----------
  $scope.EditEnableDisableItemTypeWiseLine = function (index) {
    if (!$scope.edetailsbyid || !$scope.edetailsbyid[index]) return;
    var Value = $scope.edetailsbyid[index].itemtypeid;

    // Clear Item Name (DOM + bound model)
    $("#eename" + index).val("");
    $("#eeitemcode" + index).val("");
    $scope.edetailsbyid[index].itemname = "";
    $scope.edetailsbyid[index].itemid = "";

    // Clear spec fields
    $("#eetxtSize" + index).val("");
    $("#eetxtConstruction" + index).val("");
    $("#eetxtWeight" + index).val("");
    $("#eetxtSlit" + index).val("");
    $("#eetxtScrim" + index).val("");
    $("#eetxtQuality" + index).val("");

    // Apply disable rules
    var allFields = [
      "#eetxtSize" + index,
      "#eetxtConstruction" + index,
      "#eetxtWeight" + index,
      "#eetxtSlit" + index,
      "#eetxtScrim" + index,
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    var disableFields = [];
    if (Value == "1") {
      disableFields = allFields;
    } else if (Value == "2") {
      disableFields = ["#eetxtSlit" + index, "#eetxtScrim" + index];
    } else if (Value == "3") {
      disableFields = ["#eetxtConstruction" + index];
    }
    disableFields.forEach(function (id) {
      $(id).prop("disabled", true);
    });
  };

  $scope.PIList = function () {
    //alert("call");
    $http({
      method: "get",
      url: "/AgreementLanding/GetAgreementLandingAll",
      params: { code: $scope.agreementtypeidsearch },
    }).then(function (response) {
      if ($scope.agreementtypeidsearch == "SC") {
        /*$('.your-table-class').find('#tbl_th_pi').text('SC Number');*/
        $scope.tbl_th_pi = "SC Number";
        $scope.tbl_th_pidate = "SC Date";
      }
      if ($scope.agreementtypeidsearch == "PI") {
        /*$('.your-table-class').find('#tbl_th_pi').text('SC Number');*/
        $scope.tbl_th_pi = "PI Number";
        $scope.tbl_th_pidate = "PI Date";
      }
      if ($scope.agreementtypeidsearch == "PITOSC") {
        /*$('.your-table-class').find('#tbl_th_pi').text('SC Number');*/
        $scope.tbl_th_pi = "PI/SC Number";
        $scope.tbl_th_pidate = "PI/SC Date";
      }
      $scope.PIlist = response.data;
      $scope.loading = false;
    });
  };

  function toggleDownloadButton() {
    var slNo = $("#vSINO").text().trim();
    if (slNo != "") {
      $("#downloadButton").show();
    } else {
      $("#downloadButton").hide();
    }
  }

  $scope.ViewByMasterID = function (ID, aggtypeid) {
    /*
        $("#vSINO").text('');
        $("#vFileName").text("");

        toggleDownloadButton();
        */

    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/AgreementApproval/ViewByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.masterdata = data;
      var PROCESSCODE = data[0].pinumber;

      $scope.ViewByDetailsID(ID);
      $scope.LoadDocument(ID);
      $scope.ViewLoadDocumentStatus(ID, aggtypeid);

      /*
            $http({
                method: "GET",
                url: '/SalesQuatationLanding/GetFileDetails',
                params: { prefix: PROCESSCODE }
            }).success(function (data) {
                GetUploadFileUsingAPI(PROCESSCODE,);

            })
            */
      var code = "PISC-" + $scope.ID;
      ViewImageFromAPI(code);
    });
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

  $scope.GetFGUOMAll = function (unitid) {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetFGUOMAll",
      params: { unitid: unitid },
    }).then(function (response) {
      $scope.uomlist = response.data;
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

  $scope.ViewLoadDocument = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/LoadDocument",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.imageitem = result;
    });
  };

  $scope.ViewLoadDocumentStatus = function (ID, agreementtypeid) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/AgreementLanding/GetDocStatus",
      params: { id: $scope.ID, aggcode: agreementtypeid },
    }).success(function (result) {
      $scope.docstatusview = result;
    });
  };

  $scope.TypeChange = function () {
    $scope.GetSalesQuotation($("#typeid").val());
  };

  $scope.AgreementType = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetAgreementType",
    }).then(function (response) {
      $scope.Agreementtype = response.data;
    });
  };

  $scope.GetSalesQuotation = function (id) {
    $scope.ID = id;

    $http({
      method: "get",
      url: "/AgreementLanding/GetSalesQuotation",
      params: { id: $scope.ID },
    }).then(function (response) {
      $scope.quotationlist = response.data;
    });
  };

  $scope.GetShipmentMode = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetShipmentMode",
    }).then(function (response) {
      $scope.shipmentmodelist = response.data;
    });
  };

  $scope.GetTransportationMode = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetTransportationMode",
    }).then(function (response) {
      $scope.transportationmode = response.data;
    });
  };

  $scope.GetCurrency = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetCurrency",
    }).then(function (response) {
      $scope.currencylist = response.data;
    });
  };

  $scope.GETLOADINGBY = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GETLOADINGBY",
    }).then(function (response) {
      $scope.deliverybylist = response.data;
    });
  };

  $scope.GetIncoTerm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetIncoTerm",
    }).then(function (response) {
      $scope.incotermlist = response.data;
    });
  };

  $scope.GetShipmentCountry = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetShipmentCountry",
    }).then(function (response) {
      $scope.shipmentcountrylist = response.data;
    });
  };

  $scope.GetDelTerm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetDelTerm",
    }).then(function (response) {
      $scope.deltermlist = response.data;
    });
  };

  $scope.GetPaymentTerm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetPaymentTerm",
    }).then(function (response) {
      $scope.paymenttermlist = response.data;
    });
  };

  $scope.GetLoadingport = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetLoadingport",
    }).then(function (response) {
      $scope.loadingportlist = response.data;
    });
  };

  $scope.GetConfirm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetConfirm",
    }).then(function (response) {
      $scope.loadconfirm = response.data;
    });
  };

  $scope.SellerBankInfo = function (id) {
    $http({
      method: "get",
      url: "/AgreementLanding/GetBankInfo",
      params: { sqid: id },
    }).then(function (response) {
      $scope.sellerbanklist = response.data;
    });
  };

  $scope.Dislist = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDiscountDetails",
    }).then(function (response) {
      $scope.Dislist = response.data;
    });
  };

  $scope.ToleranceList = function () {
    $http({
      method: "get",
      url: "/Common/GetTolarance",
    }).then(function (response) {
      // console.log(response);
      $scope.tollist = response.data;
    });
  };

  $scope.VatCal = function () {
    if ($("#vatid").val() == "") {
      $("#vatamount").prop("disabled", true);
      $("#vatamount").val(0);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetVatCal",
        params: { id: $scope.VatID },
      }).then(function (response) {
        var total =
          parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());

        if (response.data[0].code === "WV") {
          $("#vatamount").prop("disabled", false);
          $("#vatamount").val(0);
          //var totalvatamount = total + parseFloat($("#vatamount").val());
        } else {
          $("#vatamount").attr("disabled", "disabled");
          var vatamount = total * (response.data[0].vatValue / 100);
          var totalvatamount = vatamount;
          $("#vatamount").val(
            isNaN(vatamount.toFixed(4)) ? 0 : vatamount.toFixed(4),
          );

          var vat_dis =
            total + totalvatamount + parseFloat($("#discountamount").val());

          $("#totalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };
  $scope.EditVatCal = function () {
    if ($("#evatid").val() == "") {
      $("#evatamount").prop("disabled", true);
      $("#evatamount").val(0);
      var total =
        parseFloat($("#equantity").val()) * parseFloat($("#eunitprice").val());
      $("#etotalamount").val(isNaN(total.toFixed(4)) ? 0 : total.toFixed(4));
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetVatCal",
        params: { id: $scope.eVatID },
      }).then(function (response) {
        var total =
          parseFloat($("#equantity").val()) *
          parseFloat($("#eunitprice").val());

        if (response.data[0].code === "WV") {
          $("#evatamount").prop("disabled", false);
          $("#evatamount").val(0);
          //var totalvatamount = total + parseFloat($("#vatamount").val());
        } else {
          $("#evatamount").attr("disabled", "disabled");
          var vatamount = total * (response.data[0].vatValue / 100);
          var totalvatamount = vatamount;
          $("#evatamount").val(
            isNaN(vatamount.toFixed(4)) ? 0 : vatamount.toFixed(4),
          );

          var vat_dis =
            total + totalvatamount + parseFloat($("#ediscountamount").val());

          $("#etotalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };

  $scope.Calculate = function () {
    $scope.DiscountPercentageCalculate();
  };

  $scope.CalculateLine = function (index, id, qty) {
    $scope.QuantityValidation(index, qty);
    $scope.DiscountPercentageCalculateLine(index, id);
  };

  $scope.QuantityValidation = function (index, qty) {
    if (parseFloat($("#equantity" + index).val()) > parseFloat(qty)) {
      $("#equantity" + index).val(qty);
    }

    if (parseFloat($("#quantity" + index).val()) > parseFloat(qty)) {
      $("#quantity" + index).val(qty);
    }
  };

  $scope.EditCalculate = function () {
    $scope.EDiscountPercentageCalculate();
    //var total = parseFloat($("#equantity").val()) * parseFloat($("#eunitprice").val());
    //$("#etotalamount").val(isNaN((total + parseFloat($("#evatamount").val())) - parseFloat($("#ediscountamount").val())) ? 0 : (total + parseFloat($("#evatamount").val())) - parseFloat($("#ediscountamount").val())).toFixed(4);
  };
  $scope.EditCalculateLine = function (index, id) {
    $scope.EDiscountPercentageCalculateLine(index, id);
  };

  $scope.DiscountPercentageCalculate = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDisCal",
      params: { id: $scope.discountid },
    }).then(function (response) {
      var total =
        parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());
      if (response.data[0] === undefined) {
        $("#totalamount").val((isNaN(total) ? 0 : total).toFixed(4));
      } else if (response.data[0].code === "WD") {
        $("#totalamount").val(
          (isNaN(total - parseFloat($("#discountamount").val()))
            ? 0
            : total - parseFloat($("#discountamount").val())
          ).toFixed(4),
        );
      } else {
        var totaldiscount = 0;
        totaldiscount = (response.data[0].disValue / 100) * total;
        $("#discountamount").val(
          isNaN(totaldiscount.toFixed(4)) ? 0 : totaldiscount.toFixed(4),
        );
        $("#totalamount").val((isNaN(total) ? 0 : total).toFixed(4));
        //$("#totalamount").val(isNaN((total + parseFloat($("#vatamount").val())) - totaldiscount) ? 0 : (total + parseFloat($("#vatamount").val())) - totaldiscount);
        $("#totalamount").val(total - totaldiscount);
      }
    });
  };

  $scope.DiscountPercentageCalculateLine = function (index, discountid) {
    if (discountid == 0) {
      $("#discountamount" + index).prop("disabled", true);
      $("#discountamount" + index).val(0);
      var total =
        parseFloat($("#quantity" + index).val()) *
        parseFloat($("#unitprice" + index).val());
      $("#totalamount" + index)
        .val(total)
        .toFixed(4);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: discountid },
      }).then(function (response) {
        var total =
          parseFloat($("#quantity" + index).val()) *
          parseFloat($("#unitprice" + index).val());

        if (response.data[0] === undefined) {
          $("#totalamount" + index).val(
            isNaN(total + parseFloat($("#vatamount" + index).val()))
              ? 0
              : total + parseFloat($("#vatamount" + index).val()),
          );
        } else if (response.data[0].code === "WD") {
          $("#totalamount" + index).val(
            isNaN(total - parseFloat($("#discountamount" + index).val()))
              ? 0
              : total - parseFloat($("#discountamount" + index).val()),
          );
        } else {
          var totalvat = (response.data[0].disValue / 100) * total;

          //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
          $("#discountamount" + index).val(
            isNaN(totalvat.toFixed(4)) ? 0 : totalvat.toFixed(4),
          );
          $("#totalamount" + index).val(total - totalvat);
        }
      });
    }
  };

  $scope.EDiscountPercentageCalculate = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDisCal",
      params: { id: $scope.eDiscountID },
    }).then(function (response) {
      var total =
        parseFloat($("#equantity").val()) * parseFloat($("#eunitprice").val());

      if (response.data[0] === undefined) {
        $("#etotalamount").val((isNaN(total) ? 0 : total).toFixed(4));
      } else if (response.data[0].code === "WD") {
        $("#etotalamount").val(
          (isNaN(total - parseFloat($("#ediscountamount").val()))
            ? 0
            : total - parseFloat($("#ediscountamount").val())
          ).toFixed(4),
        );
      } else {
        var totaldiscount = (response.data[0].disValue / 100) * total;
        $("#ediscountamount").val(
          isNaN(totaldiscount.toFixed(4)) ? 0 : totaldiscount.toFixed(4),
        );
        $("#etotalamount").val((isNaN(total) ? 0 : total).toFixed(4));
        //$("#totalamount").val(isNaN((total + parseFloat($("#vatamount").val())) - totaldiscount) ? 0 : (total + parseFloat($("#vatamount").val())) - totaldiscount);
        $("#etotalamount").val(total - totaldiscount);
      }
    });
  };

  $scope.EDiscountPercentageCalculateLine = function (index, discountid) {
    if (discountid == 0) {
      var total =
        parseFloat($("#eequantity" + index).val()) *
        parseFloat($("#eeunitprice" + index).val());
      $("#eetotalamount" + index).val((isNaN(total) ? 0 : total).toFixed(4));
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: discountid },
      }).then(function (response) {
        var total =
          parseFloat($("#eequantity" + index).val()) *
          parseFloat($("#eeunitprice" + index).val());

        if (response.data[0] === undefined) {
          $("#eetotalamount" + index).val(
            (isNaN(total) ? 0 : total).toFixed(4),
          );
        } else if (response.data[0].code === "WD") {
          $("#eetotalamount" + index).val(
            isNaN(total - parseFloat($("#eediscountamount" + index).val()))
              ? 0
              : total - parseFloat($("#eediscountamount" + index).val()),
          );
        } else {
          var totaldiscount = (response.data[0].disValue / 100) * total;

          //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
          $("#eediscountamount" + index).val(
            isNaN(totaldiscount) ? 0 : totaldiscount.toFixed(4),
          );

          $("#eetotalamount" + index).val(
            isNaN(total - totaldiscount) ? 0 : total - totaldiscount.toFixed(4),
          );
        }
      });
    }
  };

  $scope.DisCalLineWithDis = function (index, id) {
    $("#discountamount" + index).prop("disabled", false);
    var total =
      parseFloat($("#quantity" + index).val()) *
      parseFloat($("#unitprice" + index).val());
    $("#totalamount" + index).val(
      (isNaN(total - parseFloat($("#discountamount" + index).val()))
        ? 0
        : total - parseFloat($("#discountamount" + index).val())
      ).toFixed(4),
    );
  };

  $scope.DisCal = function () {
    if ($("#discountid").val() == "") {
      $("#discountamount").prop("disabled", true);
      $("#discountamount").val(0);
      var total =
        parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());
      $("#totalamount").val(isNaN(total.toFixed(4)) ? 0 : total.toFixed(4));
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: $scope.DiscountID },
      }).then(function (response) {
        var total =
          parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());

        if (response.data[0].code === "WD") {
          $("#discountamount").prop("disabled", false);
          $("#discountamount").val(0);
          var totalvatamount = total - parseFloat($("#discountamount").val());

          $("#totalamount").val(totalvatamount);
        } else {
          $("#discountamount").attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          //var totaldisamount = disamount;
          $("#discountamount").val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total + 0 - disamount;

          $("#totalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };

  $scope.EditDisCal = function () {
    if ($("#ediscountid").val() == "") {
      $("#ediscountamount").prop("disabled", true);
      $("#ediscountamount").val(0);
      var total =
        parseFloat($("#equantity").val()) * parseFloat($("#eunitprice").val());
      $("#etotalamount").val(isNaN(total.toFixed(4)) ? 0 : total.toFixed(4));
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: $scope.eDiscountID },
      }).then(function (response) {
        var total =
          parseFloat($("#equantity").val()) *
          parseFloat($("#eunitprice").val());

        if (response.data[0].code === "WD") {
          $("#ediscountamount").prop("disabled", false);
          $("#ediscountamount").val(0);
          //var totalvatamount = total + parseFloat($("#discountamount").val());
        } else {
          $("#ediscountamount").attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          //var totaldisamount = disamount;
          $("#ediscountamount").val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          //var vat_dis = (total + parseFloat($("#evatamount").val())) - disamount;
          var vat_dis = total + 0 - disamount;
          $("#etotalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
          //$("#etotalamount").val(isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4));
        }
      });
    }
  };

  $scope.EditDisCalLine = function (index, id) {
    if ($("#eediscountid" + index).val() == "") {
      $("#eediscountamount" + index).prop("disabled", true);
      $("#eediscountamount" + index).val(0);
      var total =
        parseFloat($("#eequantity" + index).val()) *
        parseFloat($("#eeunitprice" + index).val());
      $("#eetotalamount" + index)
        .val(total)
        .toFixed(4);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: id },
      }).then(function (response) {
        var total =
          parseFloat($("#eequantity" + index).val()) *
          parseFloat($("#eeunitprice" + index).val());

        if (response.data[0].code === "WD") {
          $("#eediscountamount" + index).prop("disabled", false);
          $("#eediscountamount" + index).val(0);

          var totalvatamount =
            total - parseFloat($("#eediscountamount" + index).val());
          $("#eetotalamount" + index).val(
            isNaN(totalvatamount.toFixed(4)) ? 0 : totalvatamount.toFixed(4),
          );
        } else {
          $("#eediscountamount" + index).attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          //var totaldisamount = disamount;
          $("#eediscountamount" + index).val(
            isNaN(disamount) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total + 0 - disamount;

          $("#eetotalamount" + index).val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };

  $scope.EditVatCalLine = function (index, id) {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetVatCal",
      params: { id: id },
    }).then(function (response) {
      var total =
        parseFloat($("#equantity" + index).val()) *
        parseFloat($("#eunitprice" + index).val());

      if (response.data[0].code === "WV") {
        $("#evatamount" + index).prop("disabled", false);
        $("#evatamount" + index).val(0);
        //var totalvatamount = total + parseFloat($("#vatamount").val());
      } else {
        $("#evatamount" + index).attr("disabled", "disabled");
        var vatamount = total * (response.data[0].vatValue / 100);

        var totalvatamount = vatamount;
        $("#evatamount" + index).val(
          isNaN(vatamount.toFixed(4)) ? 0 : vatamount.toFixed(4),
        );

        var vat_dis =
          total +
          totalvatamount -
          parseFloat($("#ediscountamount" + index).val());

        $("#etotalamount" + index).val(
          isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
        );
      }
    });
  };

  $scope.Update = function () {
    var isAllValid = true;

    // null-safe string read
    var v = function (sel) {
      return ($(sel).val() || "").toString().trim();
    };
    // null-safe int read
    var safeIntVal = function (val) {
      var n = parseInt(val, 10);
      return isNaN(n) ? 0 : n;
    };

    // --- validations (only fields that actually exist in the Edit modal) ---

    if (v("#esqid") == "") {
      isAllValid = false;
      $("#esqid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#esqid").siblings("span.error").css("visibility", "hidden");
    }

    if (v("#eagreementtypeid") == "") {
      isAllValid = false;
      $("#eagreementtypeid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#eagreementtypeid").siblings("span.error").css("visibility", "hidden");
    }

    if (v("#etxtDate") == "") {
      isAllValid = false;
      $("#etxtDate").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtDate").siblings("span.error").css("visibility", "hidden");
    }

    if (v("#etxtExpireDate") == "") {
      isAllValid = false;
      $("#etxtExpireDate").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtExpireDate").siblings("span.error").css("visibility", "hidden");
    }

    if (v("#etxtshipmentmodeid") == "") {
      isAllValid = false;
      $("#etxtshipmentmodeid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtshipmentmodeid")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if (v("#etxtcurrencyid") == "") {
      isAllValid = false;
      $("#etxtcurrencyid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtcurrencyid").siblings("span.error").css("visibility", "hidden");
    }

    if (v("#etxtincotermid") == "") {
      isAllValid = false;
      $("#etxtincotermid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtincotermid").siblings("span.error").css("visibility", "hidden");
    }

    //if (v("#etxtBuyerRegNo") == "") {
    //    isAllValid = false;
    //    $("#etxtBuyerRegNo").siblings('span.error').css('visibility', 'visible');
    //} else {
    //    $("#etxtBuyerRegNo").siblings('span.error').css('visibility', 'hidden');
    //}

    if (v("#etxtpaymenttermid") == "") {
      isAllValid = false;
      $("#etxtpaymenttermid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtpaymenttermid")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if (v("#etxtloadingport") == "") {
      isAllValid = false;
      $("#etxtloadingport").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtloadingport").siblings("span.error").css("visibility", "hidden");
    }

    if (v("#etxtdischargeloadingport") == "") {
      isAllValid = false;
      $("#etxtdischargeloadingport")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtdischargeloadingport")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if (v("#etxtFromshipmentcountryid") == "") {
      isAllValid = false;
      $("#etxtFromshipmentcountryid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtFromshipmentcountryid")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if (v("#etxtToshipmentcountryid") == "") {
      isAllValid = false;
      $("#etxtToshipmentcountryid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtToshipmentcountryid")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if (v("#etxtShipmentDate") == "") {
      isAllValid = false;
      $("#etxtShipmentDate")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtShipmentDate").siblings("span.error").css("visibility", "hidden");
    }

    if (v("#esellerbankid") == "") {
      isAllValid = false;
      $("#esellerbankid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#esellerbankid").siblings("span.error").css("visibility", "hidden");
    }

    // --- build + send payload ---

    if (isAllValid) {
      var master = {
        ID: $("#eagreementid").val(),
        SALESQUOTATIONHEADERID: $("#esqid").val(),
        AGREEMENTTYPEID: $("#eagreementtypeid").val(),
        DATE: $("#etxtDate").val(),
        EXPIREDATE: $("#etxtExpireDate").val(),
        SHIPMENTDATE: $("#etxtShipmentDate").val(),
        SHIPMENTMODEID: $("#etxtshipmentmodeid").val(),
        PAYMENTTERMID: $("#etxtpaymenttermid").val(),
        DELIVERYTERMID: safeIntVal($("#edeliverytermid").val()),
        TERMSCONDITION: $("#etermscon").val(),

        TOSHIPMENTCOUNTRYID: safeIntVal($("#etxtToshipmentcountryid").val()),
        TEXTTOSHIPMENT: $("#txtFreeText").val(),
        FROMSHIPMENTCOUNTRYID: safeIntVal(
          $("#etxtFromshipmentcountryid").val(),
        ),

        FROMSHIPMENTPORTID: $("#etxtloadingport").val(),
        TODISCHARGEPORT: $("#etxtdischargeloadingport").val(),

        TARRIFCODE: $("#etxtTariffCode").val(),
        BUYERREGNO: $("#etxtBuyerRegNo").val(),
        HSCODE: $("#etxtHSCode").val(),
        INTOTERM: $("#etxtincotermid").val(),
        CURRENCYID: $("#etxtcurrencyid").val(),
        DESCRIPTIONS: $("#edescription").val(),

        BUYERBANKDETAILS: $("#etxtBuyerBank").val(),
        SELLERBANKID: $("#esellerbankid").val(),
        BUYERCOUNTRYHSCODE: $("#etxtBuyerHSCode").val(),
        TRANSHIPMENT: $("#etranshipmentid").val(),
        PARTIALSHIPMENT: $("#etxtpartialshipmentid").val(),
        ORIGINOFCOUNTRY: $("#etxtOriginCountry").val(),
        BUYERORDERCONFIRMDATE: $("#etxtOrderDate").val(),
        NOTIFYPARTY: $("#etxtNotifyParty").val(),
        OTHERSPAYTERM: "",
      };

      $.ajax({
        type: "POST",
        url: "/AgreementLanding/Update",
        dataType: "json",
        data: { al: master },
        success: function (result) {
          notify("success", "Success Message", result);

          var masterId = $("#eagreementid").val();

          $http({
            method: "GET",
            url: "/AgreementApproval/ViewByMasterID",
            params: { id: masterId },
          }).success(function (data) {
            var code = "PISC-" + $scope.ID;
            EditFileUsingAPI(code);
            //var PROCESSCODE = data[0].pinumber;
            //EditFileUsingAPI(PROCESSCODE);
          });

          $scope.Clear();
          $scope.PIList();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.UpdateByLineID = function (
    i,
    itemtypeid,
    uomid,
    id,
    discountid,
    toleranceid,
  ) {
    var isAllValid = true;
    if ($("#ename" + i).val() == "") {
      isAllValid = false;
      $("#ename" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#ename" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#eitemcode" + i).val() == "") {
      isAllValid = false;
      $("#eitemcode" + i)
        .siblings("span.error")
        .css("visibility", "visible");
      $("#euom" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#eitemcode" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
      $("#euom" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#ename" + i).val() == "") {
      isAllValid = false;
      $("#ename" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#ename" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#ehscodeline" + i).val() == "") {
      isAllValid = false;
      $("#ehscodeline" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#ehscodeline" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#eunitprice" + i).val() == 0 || $("#eunitprice" + i).val() == "") {
      isAllValid = false;
      $("#eunitprice" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#eunitprice" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    $scope.aggtypeid = $("#eagreementtypeid").val();
    if (isAllValid) {
      var details = {
        ID: id,
        //SALESQUOTATIONHEADERID: $("#hheaderid").val(),
        ITEMTYPEID: itemtypeid,
        ITEMID: $("#eeitemcode" + i).val(),
        QUALITY: $("#eetxtQuality" + i).val(),
        SIZE: $("#eetxtSize" + i).val(),
        SLIT: $("#eetxtSlit" + i).val(),
        SCRIM: $("#eetxtScrim" + i).val(),
        WEIGHT: $("#eetxtWeight" + i).val(),
        CONSTRUCTION: $("#eetxtConstruction" + i).val(),
        ITEMTITLE: $("#eeitemtitle" + i).val(),
        UOMID: uomid,

        PACKINGDETAILS: $("#eepackingdetails" + i).val(),

        QUANTITY: $("#eequantity" + i).val(),
        PRICE: $("#eeunitprice" + i).val(),
        DISCOUNTID: discountid,
        DISCOUNT: $("#eediscountamount" + i).val(),
        TOTALAMOUNT: $("#eetotalamount" + i).val(),

        REMARKS: $("#eeremarks" + i).val(),
      };

      $.ajax({
        type: "POST",
        url: "/AgreementLanding/UpdateDetailsByID",
        dataType: "json",
        data: { sqd: details, agreementtypeid: $scope.aggtypeid },
        success: function (result) {
          notify("success", "Success Message", result);
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.DeleteMaster = function (lineid, aggtypeid) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/AgreementLanding/DeleteMasterByID",
        params: { id: lineid, aggtypeid: aggtypeid },
      }).then(function (response) {
        $scope.PIList();
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.DeleteByLineID = function (lineid) {
    $scope.id = lineid;
    $scope.aggtypeid = $("#eagreementtypeid").val();
    $scope.headerid = $("#eagreementid").val();
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $("#editmycontainer").on("click", ".btn-danger", function () {
        $(this).parents("tr").remove();
      });
      $http({
        method: "POST",
        url: "/AgreementLanding/DeleteByLineByID",
        params: { id: lineid, aggtypeid: $scope.aggtypeid },
      }).then(function (response) {
        $scope.EditbyDetailsID($scope.headerid);
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.ESearchFGHeader = function () {
    $("#ename").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetFGlist/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#ehsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return {
                  label: item.name,
                  id: item.id,
                  uoM: item.uoM,
                  Name: item.name,
                };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#ename").val(ui.item.Name);
        $("#eitemcode").val(ui.item.id);
        $("#euom").val(ui.item.uoM);

        return false;
      },
      minlength: 3,
    });
  };

  $scope.Add = function () {
    var isAllValid = true;
    var count = 0;

    if ($("#name").val() == "") {
      isAllValid = false;
      $("#name").siblings("span.error").css("visibility", "visible");
    } else {
      $("#name").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#itemcode").val() == "") {
      isAllValid = false;
      $("#itemcode").siblings("span.error").css("visibility", "visible");
      $("#uom").siblings("span.error").css("visibility", "visible");
    } else {
      $("#itemcode").siblings("span.error").css("visibility", "hidden");
      $("#uom").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#hscodeline").val() == "") {
      isAllValid = false;
      $("#hscodeline").siblings("span.error").css("visibility", "visible");
    } else {
      $("#hscodeline").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#unitprice").val() == 0) {
      isAllValid = false;
      $("#unitprice").siblings("span.error").css("visibility", "visible");
    } else {
      $("#unitprice").siblings("span.error").css("visibility", "hidden");
    }

    if (isAllValid) {
      //var $newRow = $('#mainrow').clone().removeAttr('id');
      //$('.eitemtypeid', $newRow).val($("#eitemtypeid").val()).attr('disabled', 'disabled');
      var $newRow = $("#mainrow").clone().removeAttr("id");
      $newRow.prepend("<td></td>");
      // Fix item type: set both the select AND inject a hidden input for Save() to read
      var selectedItemTypeId = $("#itemtypeid").val();
      var selectedItemTypeText = $("#itemtypeid option:selected").text();

      $(".itemtypeid", $newRow)
        .val(selectedItemTypeId)
        .attr("disabled", "disabled");

      // Inject hidden input so Save() can reliably read via .listitemtypeid
      $newRow
        .find("td:first")
        .prepend(
          '<input type="hidden" class="listitemtypeid" value="' +
            selectedItemTypeId +
            '" />',
        );

      //$('.txtCount', $newRow).val($("#txtCount").val()).attr('disabled', 'disabled');
      //$('.txtPly', $newRow).val($("#txtPly").val()).attr('disabled', 'disabled');
      //$('.txtQuality', $newRow).val($("#txtQuality").val()).attr('disabled', 'disabled');
      //$('.txtWidth', $newRow).val($("#txtWidth").val()).attr('disabled', 'disabled');
      //$('.txtLength', $newRow).val($("#txtLength").val()).attr('disabled', 'disabled');
      //$('.txtWeight', $newRow).val($("#txtWeight").val()).attr('disabled', 'disabled');
      //$('.txtConstruction', $newRow).val($("#txtConstruction").val()).attr('disabled', 'disabled');
      //$('.txtItemTitle', $newRow).val($("#txtItemTitle").val()).attr('disabled', 'disabled');
      //$('.packingdetails', $newRow).val($("#packingdetails").val());

      //// FIX: UOM select uses class .uomid, sourced from #uomid (not .uom / #uom)
      //$('.uomid', $newRow).val($("#uomid").val()).attr('disabled', 'disabled');

      //$('.name', $newRow).val($("#name").val());
      //$('.quantity', $newRow).val($("#quantity").val());
      //// ... rest of your existing code unchanged

      //$('.takenqty', $newRow).val($("#takenqty").val());
      //$('.remqty', $newRow).val($("#remqty").val());

      //$('.hscodeline', $newRow).val($("#hscodeline").val());
      //$('.unitprice', $newRow).val($("#unitprice").val());
      //$('.vatid', $newRow).val($("#vatid").val());
      //$('.vatamount', $newRow).val($("#vatamount").val());
      //$('.discountid', $newRow).val($("#discountid").val()).attr('disabled', 'disabled');
      //$('.discountamount', $newRow).val($("#discountamount").val()).attr('disabled', 'disabled');
      //$('.totalamount', $newRow).val($("#totalamount").val()).attr('disabled', 'disabled');
      //$('.toleranceid', $newRow).val($("#toleranceid").val()).attr('disabled', 'disabled');
      //$('.remarks', $newRow).val($("#remarks").val());
      //$('.shortdetails', $newRow).val($("#shortdetails").val());
      //$('.toshipmentscdate', $newRow).val($("#toshipmentscdate").val());
      //$('.fromshipmentscdate', $newRow).val($("#fromshipmentscdate").val());
      //$('.txtShippingMark', $newRow).val($("#txtShippingMark").val());

      // Item Name (visible + hidden item id)
      $(".name", $newRow).val($("#name").val());
      $(".itemcode", $newRow).val($("#itemcode").val());

      // Spec columns — order: Size, Construction, Weight, Slit, Scrim, Quality
      $(".txtSize", $newRow)
        .val($("#txtSize").val())
        .attr("disabled", "disabled");
      $(".txtConstruction", $newRow)
        .val($("#txtConstruction").val())
        .attr("disabled", "disabled");
      $(".txtWeight", $newRow)
        .val($("#txtWeight").val())
        .attr("disabled", "disabled");
      $(".txtSlit", $newRow)
        .val($("#txtSlit").val())
        .attr("disabled", "disabled");
      $(".txtScrim", $newRow)
        .val($("#txtScrim").val())
        .attr("disabled", "disabled");
      $(".txtQuality", $newRow)
        .val($("#txtQuality").val())
        .attr("disabled", "disabled");

      $(".txtItemTitle", $newRow).val($("#txtItemTitle").val());
      $(".packingdetails", $newRow).val($("#packingdetails").val());
      $(".uomid", $newRow).val($("#uomid").val()).attr("disabled", "disabled");

      $(".quantity", $newRow).val($("#quantity").val());
      $(".unitprice", $newRow).val($("#unitprice").val());
      $(".discountid", $newRow)
        .val($("#discountid").val())
        .attr("disabled", "disabled");
      $(".discountamount", $newRow)
        .val($("#discountamount").val())
        .attr("disabled", "disabled");
      $(".totalamount", $newRow)
        .val($("#totalamount").val())
        .attr("disabled", "disabled");
      $(".remarks", $newRow).val($("#remarks").val());

      $("#add", $newRow).removeClass("btn-info").addClass("btn-danger");
      $("i", $newRow).removeClass("fas fa-ad").addClass("fas fa-trash btn-sm");

      $("#imodel", $newRow).removeClass("btn-primary");
      $("span", $newRow).removeClass("mdi mdi-plus me-1");

      $(
        "#eitemtypeid,#name,#txtCount,#txtPly,#txtQuality,#txtWidth,#txtLength,#txtWeight,#txtConstruction,#txtItemTitle,#uom,#hscode,#quantity,#takenqty,#remqty,#unitprice,#totalamount,#remarks,#shortdetails,#add,#imodel",
        $newRow,
      ).removeAttr("id");
      /*$('#itemtypeid,#uom,#name,#quantity,#txtCount,#txtPly,#txtQuality,#txtWidth,#txtLength,#txtWeight,#txtConstruction,#txtItemTitle,#hscode,#unitprice,#vatid,#vatamount,#discountid,#discountamount,#toleranceid,#totalamount,#remarks,#shortdetails,#toshipmentscdate,#fromshipmentscdate,#add,#imodel', $newRow).removeAttr('id');*/
      $("span.error", $newRow).remove();

      var newitemid = $("#itemcode").val();

      $("#editmycontainer tbody").append($newRow);
      $scope.ClearLine();

      // Bind delete once. .off() prevents the handler stacking on every Add()
      // (the old code re-bound it each call, so LockListOfItemRows ran N times per click).
      $("#editmycontainer")
        .off("click.delrow")
        .on("click.delrow", ".btn-danger", function () {
          $(this).parents("tr").remove();
          $scope.LockListOfItemRows();
        });

      //if ($($("#editmycontainer tbody tr")).length == 0) {
      //    $('#editmycontainer').append($newRow);
      //    $scope.ClearLine();
      //    $("#editmycontainer").on('click', '.btn-danger', function () {
      //        $(this).parents('tr').remove();
      //    });
      //}
      //else {
      //    $($("#editmycontainer tbody tr").each(function (index, ele) {
      //        $('#editmycontainer').append($newRow);
      //        $scope.ClearLine();
      //    }
      //    ));
      //}

      //$("#editmycontainer").on('click', '.btn-danger', function () {
      //    $(this).parents('tr').remove();
      //    // Lock all rows in List of Item after any new add
      //    $scope.LockListOfItemRows();
      //});
    }
  };
  // ---------- Insert Modal: Lock all List of Item rows (type + spec + data fields) ----------
  $scope.LockListOfItemRows = function () {
    $("#editmycontainer tbody tr").each(function () {
      // Disable every input, select, textarea, button (except delete) inside this row
      $(this).find("input, select, textarea").prop("disabled", true);

      // Optional: keep the delete button usable so user can still remove rows
      $(this).find("button.btn-danger").prop("disabled", false);
    });
  };

  $scope.eAdd = function () {
    var isAllValid = true;
    var count = 0;

    if ($("#ename").val() == "") {
      isAllValid = false;
      $("#ename").siblings("span.error").css("visibility", "visible");
    } else {
      $("#ename").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#eitemcode").val() == "") {
      isAllValid = false;
      $("#eitemcode").siblings("span.error").css("visibility", "visible");
      $("#euom").siblings("span.error").css("visibility", "visible");
    } else {
      $("#eitemcode").siblings("span.error").css("visibility", "hidden");
      $("#euom").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#ename").val() == "") {
      isAllValid = false;
      $("#ename").siblings("span.error").css("visibility", "visible");
    } else {
      $("#ename").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#ehscodeline").val() == "") {
      isAllValid = false;
      $("#ehscodeline").siblings("span.error").css("visibility", "visible");
    } else {
      $("#ehscodeline").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#eunitprice").val() == 0 || $("#eunitprice").val() == "") {
      isAllValid = false;
      $("#eunitprice").siblings("span.error").css("visibility", "visible");
    } else {
      $("#eunitprice").siblings("span.error").css("visibility", "hidden");
    }

    if (isAllValid) {
      var details = {
        ID: $("#eagreementid").val(),
        ITEMTYPEID: $("#eitemtypeid").val(),
        ITEMID: $("#eitemcode").val(),
        QUALITY: $("#etxtQuality").val(),
        SIZE: $("#etxtSize").val(),
        SLIT: $("#etxtSlit").val(),
        SCRIM: $("#etxtScrim").val(),
        WEIGHT: $("#etxtWeight").val(),
        CONSTRUCTION: $("#etxtConstruction").val(),
        ITEMTITLE: $("#etxtItemTitle").val(),
        UOMID: $("#euomid").val(),
        PACKINGDETAILS: $("#epackingdetails").val(),

        QUANTITY: $("#equantity").val(),
        PRICE: $("#eunitprice").val(),
        DISCOUNTID: $("#ediscountid").val(),
        DISCOUNT: $("#ediscountamount").val(),
        TOTALAMOUNT: $("#etotalamount").val(),

        REMARKS: $("#eremarks").val(),
        DESCRIPTIONS: $("#eshortdetails").val(),
      };

      $.ajax({
        type: "POST",
        url: "/AgreementLanding/EditDetailsAdd",
        dataType: "json",
        data: { sqd: details, agreementtype: $("#eagreementtypeid").val() },
        success: function (result) {
          $scope.EditbyDetailsID($("#eagreementid").val());
          notify("success", "Success Message", result);
          //$("#txtByerName,#txtComName,#txtPhone,#txtEmail,#Address", "#", "#").val('');
          //if (result == 1) {

          //    notify('warning', 'Warning Message', "This Item Already Exist");
          //}
          //else {
          //    notify('success', 'Success Message', result);
          //}
          $scope.ClearLine();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.Save = function () {
    if (confirm("Are You Sure? You Want to Save this Record.") == true) {
      var Details = [];

      var isAllValid = true;

      if ($("#sqid").val().trim() == "") {
        isAllValid = false;
        $("#sqid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#sqid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#agreementtypeid").val().trim() == "") {
        isAllValid = false;
        $("#agreementtypeid")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#agreementtypeid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      //if ($("#txtBuyerRegNo").val() == "") {

      //    isAllValid = false;
      //    $("#txtBuyerRegNo").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#txtBuyerRegNo").siblings('span.error').css('visibility', 'hidden');
      //}

      if ($("#txtpaymenttermid").val() == "") {
        isAllValid = false;
        $("#txtpaymenttermid")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtpaymenttermid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtloadingport").val() == "") {
        isAllValid = false;
        $("#txtloadingport")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtloadingport").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtpaymenttermid").val() == "") {
        isAllValid = false;
        $("#txtpaymenttermid")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtpaymenttermid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      //if ($("#deliveryby").val() == "") {
      //    isAllValid = false;
      //    $("#deliveryby").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#deliveryby").siblings('span.error').css('visibility', 'hidden');
      //}
      $(
        $("#editmycontainer > tbody > tr").each(function (index, ele) {
          var rowModel =
            ($scope.detailsbyid && $scope.detailsbyid[index]) || {};
          var discountId =
            rowModel.discountid !== undefined &&
            rowModel.discountid !== null &&
            rowModel.discountid !== ""
              ? parseInt(rowModel.discountid, 10)
              : parseInt($(".discountid", this).val(), 10);
          if (isNaN(discountId)) discountId = 0;

          var details = {
            ITEMTYPEID:
              $(".listitemtypeid", this).val() || $(".itemtypeid", this).val(),
            ITEMID: $(".itemcode", this).val(),
            //QUALITY: $(".txtQuality", this).val(),
            //SIZE: $(".txtSize", this).val(),
            //SLIT: $(".txtSlit", this).val(),
            //SCRIM: $(".txtScrim", this).val(),
            //WEIGHT: $(".txtWeight", this).val(),
            //CONSTRUCTION: $(".txtConstruction", this).val(),
            QUALITY: $(".txtQuality", this).val() || $(".quality", this).val(),
            SIZE: $(".txtSize", this).val() || $(".size", this).val(),
            SLIT: $(".txtSlit", this).val() || $(".slit", this).val(),
            SCRIM: $(".txtScrim", this).val() || $(".scrim", this).val(),
            WEIGHT: $(".txtWeight", this).val() || $(".weight", this).val(),
            CONSTRUCTION:
              $(".txtConstruction", this).val() ||
              $(".construction", this).val(),
            ITEMTITLE:
              $(".itemtitle", this).val() || $(".txtItemTitle", this).val(),
            PACKINGDETAILS: $(".packingdetails", this).val(),
            UOMID: $(".uomid", this).val(),

            QUANTITY: parseFloat($(".quantity", this).val()),
            PRICE: parseFloat($(".unitprice", this).val()),
            DISCOUNTID: discountId,
            DISCOUNT: parseFloat($(".discountamount", this).val()),
            TOTALAMOUNT: parseFloat($(".totalamount", this).val()),
            TOLERANCEID: parseInt($(".toleranceid", this).val()),
            DESCRIPTIONS: $(".shortdetails", this).val(),
            REMARKS: $(".remarks", this).val(),
          };

          Details.push(details);
        }),
      );

      if (isAllValid) {
        var master = {
          //SALESQUOTATIONHEADERID: $("#sqidhidden").val(),
          SALESQUOTATIONHEADERID: $("#sqid").val(),
          AGREEMENTTYPEID: $("#agreementtypeid").val(),
          DATE: $("#txtDate").val(),
          EXPIREDATE: $("#txtExpireDate").val(),
          SHIPMENTDATE: $("#txtShipmentDate").val(),
          SHIPMENTMODEID: $("#txtshipmentmodeid").val(),
          PAYMENTTERMID: $("#txtpaymenttermidval").val(),
          DELIVERYTERMID: $("#deliverytermid").val(),
          TERMSCONDITION: $("#termscon").val(),

          TOSHIPMENTCOUNTRYID: $("#txtToshipmentcountryid").val(),
          FROMSHIPMENTCOUNTRYID: $("#txtFromshipmentcountryid").val(),

          TEXTDESTINATIONPORT: $("#txtTEXTDESTINATIONPORT").val(),

          FROMSHIPMENTPORTID: $("#txtloadingport").val(),
          ///  TODISCHARGEPORT: $("#txtloadingport").val(),

          TARRIFCODE: $("#txtTariffCode").val(),
          BUYERREGNO: $("#txtBuyerRegNo").val(),
          HSCODE: $("#txtHSCode").val(),
          INTOTERM: $("#txtincotermid").val(),
          CURRENCYID: $("#txtcurrencyid").val(),
          DESCRIPTIONS: $("#description").val(),

          BUYERBANKDETAILS: $("#txtBuyerBank").val(),
          SELLERBANKID: $("#sellerbankid").val(),
          BUYERCOUNTRYHSCODE: $("#txtBuyerHSCode").val(),
          LOADINGPLACE: $("#loadingplace").val(),
          DELIVERYBY: $("#deliveryby").val(),
          TRANSHIPMENT: $("#transhipmentid").val(),
          PARTIALSHIPMENT: $("#txtpartialshipmentid").val(),
          ORIGINOFCOUNTRY: $("#txtOriginCountry").val(),
          BUYERORDERCONFIRMDATE: $("#txtOrderDate").val(),
          NOTIFYPARTY: $("#txtNotifyParty").val(),
          OTHERSPAYTERM: $("#txtPaytermothers").val(),
          UNITID: $("#unitid").val(),
        };

        $.ajax({
          type: "POST",
          url: "/AgreementLanding/Save",
          dataType: "json",
          data: { al: master, ald: Details },
          success: function (result) {
            notify("success", "Success Messsage", result);

            var msg = result || "";
            var generatedNo = msg.split(":")[1]; // PI-160626-123 / SC-160626-123
            //console.log("the id ", generatedNo);

            var tableId = generatedNo.trim().split("-").pop(); // 123
            UploadFileUsingAPI("PISC-" + tableId);

            //UploadFileUsingAPI(result.split(':')[1]);
            $scope.PIList();
            $scope.GetSalesQuotation();
            $scope.Clear();
            $scope.detailsbyid = null;
            var rowCount = editmycontainer.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
              editmycontainer.deleteRow(i);
            }
            //$("#savebutton").prop('disabled', true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else {
    }
  };

  $scope.ClearLine = function () {
    $("#name").val("");
    $("#itemcode").val(0);
    $("#uom").val("");
    $("#hscodeline").val("");
    $("#quantity").val(0);
    $("#unitprice").val(0);
    $("#vatid").val("");
    $("#vatamount").val(0);
    $("#discountid").val("");
    $("#discountamount").val(0);
    $("#totalamount").val(0);
    $("#fromshipmentscdate").val("");
    $("#toshipmentscdate").val("");

    $("#ename").val("");
    $("#eitemcode").val(0);
    $("#euom").val("");
    $("#ehscodeline").val("");
    $("#equantity").val(0);
    $("#eunitprice").val(0);
    $("#evatid").val("");
    $("#evatamount").val(0);
    $("#ediscountid").val("");
    $("#ediscountamount").val(0);
    $("#etotalamount").val(0);
    $("#efromshipmentscdate").val("");
    $("#etoshipmentscdate").val("");

    $("#remarks").val("");
    $("#shortdetails").val("");
    $("#eremarks").val("");
    $("#eshortdetails").val("");
    $("#toleranceid").val("");
  };

  $scope.Clear = function () {
    $(".error").css("visibility", "hidden");

    /*for save item clear*/
    $("#txtDate").val("");

    $("#txtOrderDate").val("");
    $("#txtNotifyParty").val("");
    $("#txtpartialshipmentid").val("");
    $("#transhipmentid").val("");
    $("#sellerbankid").val("");
    $("#txtBuyerHSCode").val("");

    $("#txtPaytermothers").val("");
    $("#txtBuyerBank").val("");

    $("#sqid").val("");
    $("#agreementtypeid").val("");
    $("#cusname").val("");
    $("#txtExpireDate").val("");

    $("#txtTariffCode").val("");
    $("#txtshipmentmodeid").val("");
    $("#txtToshipmentcountryid").val("");
    $("#txtFromshipmentcountryid").val("");
    $("#txtShipmentDate").val("");
    $("#txtloadingport").val("");
    $("#txtdischargeloadingport").val("");
    $("#txtHSCode").val("");

    $("#txtBuyerRegNo").val("");
    $("#txttransportmodeid").val("");
    $("#txtcurrencyid").val(0);
    $("#txtpaymenttermid").val("");

    $("#deliverytermid").val(0);
    $("#txtincotermid").val(0);
    $("#termscon").val("");
    $("#description").val("");
    $scope.detailsbyid = null;
    $scope.ClearLine();
    /*end save item clear*/
  };

  $scope.UploadFile = function (result) {
    var formdata = new FormData();
    var fileInput = document.getElementById("fileInput");
    for (i = 0; i < fileInput.files.length; i++) {
      var sfilename = fileInput.files[i].name;
      //let srandomid = Math.random().toString(36).substring(7);

      formdata.append(sfilename, fileInput.files[i]);
    }
    //chkatchtbl();
    $("#fileInput").val("");

    formdata.append("uploadername", $("#txtuploader").val());

    formdata.append("id", result.trim());

    $.ajax({
      type: "POST",
      url: "/SalesQuatationLanding/FileUpload",
      data: formdata,
      contentType: false,
      processData: false,
      success: function (data) {
        notify("success", "Success Message", data);
      },
    });

    $(
      "#txtByerName,#txtComName,#txtPhone,#txtEmail,#Address",
      "#termscon",
      "#description",
    ).val("");
    $("#detailsItems").empty();
  };

  $scope.EUploadFile = function (result) {
    var formdata = new FormData();
    var fileInput = document.getElementById("efileInput");
    for (i = 0; i < fileInput.files.length; i++) {
      var sfilename = fileInput.files[i].name;
      let srandomid = Math.random().toString(36).substring(7);

      formdata.append(sfilename, fileInput.files[i]);
    }
    //chkatchtbl();
    $("#efileInput").val("");

    //formdata.append('uploadername', $('#txtuploader').val());

    formdata.append("id", result.trim());
    $.ajax({
      type: "POST",
      url: "/SalesQuatationLanding/FileUpload",
      data: formdata,
      contentType: false,
      processData: false,
      success: function (data) {
        notify("success", "Success Message", data);
      },
    });

    $(
      "#txtByerName,#txtComName,#txtPhone,#txtEmail,#Address",
      "#termscon",
      "#description",
    ).val("");
    $("#detailsItems").empty();
  };

  $scope.sortBy = function (column) {
    $scope.sortColumn = column;
    $scope.reverse = !$scope.reverse;
  };

  $scope.EditbyMasterID = function (ID, sqnumber) {
    $scope.ID = ID;
    $("#editsqnumber").val(sqnumber);

    $http({
      method: "GET",
      url: "/AgreementLanding/EditByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $("#epinumber").val(data[0].pinumber);
      $("#ehsellerid").val(data[0].unitid);
      $("#eagreementid").val(data[0].agreementid);
      $("#esqid").val(data[0].salesquotationheaderid);
      $("#eesqid").val(data[0].salesquotationheaderid);
      $("#eagreementtypeid").val(data[0].agreementtypeid);
      $("#etxtDate").val(data[0].pidate);
      $("#etxtExpireDate").val(data[0].piexpiredate);
      $("#etxtTariffCode").val(data[0].tarrifcode);
      $("#txtTariffCodehidden").val(data[0].unitid);
      $scope.GetFGUOMAll(data[0].unitid);
      $("#ehsellerid").val(data[0].unitid);
      $("#txtFreeText").val(data[0].textfromshipment);

      $("#etxtshipmentmodeid").val(data[0].shipmentmodeid);
      $("#etxtFromshipmentcountryid").val(data[0].fromshipmentcountryid);
      $("#etxtToshipmentcountryid").val(data[0].toshipmentcountryid);
      $("#txtFreetextship").val(data[0].freetext);
      $("#etxtShipmentDate").val(data[0].shipmentdate);
      $("#etxtloadingport").val(data[0].fromshipmentportid);
      $("#etxtdischargeloadingport").val(data[0].toshipmentportid);
      $("#etxtHSCode").val(data[0].hscode);

      $("#etxtBuyerRegNo").val(data[0].buyerregno);
      $("#etxttransportmodeid").val(data[0].transhipment);
      $("#etxtcurrencyid").val(data[0].currencyid);
      $("#etxtpaymenttermid").val(data[0].paymenttermid);
      $("#edeliverytermid").val(data[0].deliverytermid);
      $("#etxtincotermid").val(data[0].incoid);
      $("#etermscon").val(data[0].termscondition);
      $("#edescription").val(data[0].descriptions);

      ($("#etxtBuyerBank").val(data[0].buyerbankdetails),
        $("#esellerbankid").val(data[0].sellerbankid),
        $("#etxtBuyerHSCode").val(data[0].buyercountryhscode),
        $("#etranshipmentid").val(data[0].transhipment),
        $("#etxtpartialshipmentid").val(data[0].partialshipment),
        $("#etxtOriginCountry").val(data[0].originofcountry),
        $("#etxtOrderDate").val(data[0].buyerorderconfirmdate),
        $("#etxtNotifyParty").val(data[0].notifyparty),
        $("#etxtPaytermothers").val(data[0].otherspayterm));
    });

    $scope.EditbyDetailsID($scope.ID);
  };

  $scope.GetSalesQuotationInsertionMode = function () {
    var isvalid = true;
    if ($("#typeid").val() == "") {
      isvalid = false;
      $("#typeid").siblings("span.error").css("visibility", "visible");
    }

    if ($("#typeid").val() != "") {
      isvalid = true;
    }

    if (isvalid) {
      var sqtext = document.getElementById("sqid");
      //alert(sqtext);
      //alert(selectedText);
      var selectedText = sqtext.options[sqtext.selectedIndex].text;

      let ALPHA = selectedText.substring(0, 2);
      console.log("ALPHA:", ALPHA, "| selectedText:", selectedText);
      let NUMBER = selectedText.substring(selectedText.lastIndexOf("-") + 1);
      $("#sqidhidden").val(NUMBER);

      $scope.ID = NUMBER;

      if (ALPHA === "SQ") {
        $scope.SQHeader(ALPHA);
        $http({
          method: "GET",
          url: "/AgreementLanding/GetSalesQuotationLine",
          params: { id: $("#sqid").val(), alpha: ALPHA },
        }).success(function (result) {
          $scope.detailsbyid = result;
          $scope.ApplyDisableAllListRows();
        });
      } else if (ALPHA === "PI") {
        $scope.ID = $("#sqid").val();
        $("#sqidhidden").val($scope.ID);

        $("#agreementtypeid").val("PITOSC");
        $("#agreementtypeid").prop("disabled", true);

        $http({
          method: "GET",
          url: "/AgreementLanding/EditByMasterID",
          params: { id: $scope.ID },
        }).success(function (data) {
          //$scope.PIDetailsID($scope.ID);

          $scope.GetFGUOMAll(data[0].unitid);

          $("#unitid").val(data[0].unitid);
          $("#agreementid").val(data[0].agreementid);
          $("#txtDate").val(data[0].pidate);
          $("#txtExpireDate").val(data[0].piexpiredate);
          $("#txtTariffCode").val(data[0].tarrifcode);
          $("#txtTariffCodehidden").val(data[0].unitid);
          $("#unitid").val(data[0].unitid);

          $("#txtshipmentmodeid").val(data[0].shipmentmodeid);
          $("#txtFromshipmentcountryid").val(data[0].fromshipmentcountryid);
          $("#txtToshipmentcountryid").val(data[0].toshipmentcountryid);
          $("#txtShipmentDate").val(data[0].shipmentdate);
          $("#txtloadingport").val(data[0].fromshipmentportid);
          $("#txtdischargeloadingport").val(data[0].toshipmentportid);
          $("#txtHSCode").val(data[0].hscode);

          $("#loadingplace").val(data[0].loadingplace);
          //$("#txtTEXTDESTINATIONPORT").val(data[0].textdestinationport);
          $("#txtTEXTDESTINATIONPORT").val(data[0].destinationport);
          $("#deliveryby").val(data[0].loadingbyid);

          $("#txtBuyerRegNo").val(data[0].buyerregno);
          //$("#txttransportmodeid").val(data[0].shipmentid);
          $("#txttransportmodeid").val(data[0].transportationmode);
          $("#txtcurrencyid").val(data[0].currencyid);

          $("#txtpaymenttermid").val(data[0].paymentterm);
          $("#txtpaymenttermidval").val(data[0].paymenttermid);
          $("#deliverytermid").val(data[0].deliverytermid);
          $("#txtincotermid").val(data[0].incoid);
          $("#termscon").val(data[0].termscondition);
          $("#description").val(data[0].descriptions);

          ($("#txtBuyerBank").val(data[0].buyerbankdetails),
            $("#sellerbankid").val(data[0].sellerbankid),
            $("#txtBuyerHSCode").val(data[0].buyercountryhscode),
            $("#transhipmentid").val(data[0].transhipment),
            $("#txtpartialshipmentid").val(data[0].partialshipment));
          ($("#txtOriginCountry").val(data[0].originofcountry),
            $("#txtOrderDate").val(data[0].buyerorderconfirmdate));
          $("#txtNotifyParty").val(data[0].notifyparty);
          $("#txtPaytermothers").val(data[0].otherspayterm);
        });

        $scope.DetailsPI($scope.ID);
      } else {
        //$scope.Clear();
        $scope.detailsbyid = null;
        //$scope.ClearLine();

        $http({
          method: "GET",
          url: "/AgreementLanding/GetSalesQuotationLine",
          params: { id: $("#sqid").val(), alpha: ALPHA },
        }).success(function (result) {
          //  console.log("hello");
          $("#txtTariffCodehidden").val(result[0].unitid);
          $("#txtshipmentmodeid").val(result[0].shipmentmode);
          $("#txtFromshipmentcountryid").val(result[0].fromshipment);
          $("#txtToshipmentcountryid").val(result[0].toshipment);
          $("#txtcurrencyid").val(result[0].currency);
          $("#txtloadingport").val(result[0].loadingport);
          $("#loadingplace").val(result[0].loadingplace);
          $("#txtincotermid").val(result[0].incoterm);
          $("#txtpaymenttermid").val(result[0].textpayment);
          // $("#txtShippingPeriod").val(result[0].shippingperod);
          $("#txttransportmodeid").val(result[0].transportationmode);
          $scope.detailsbyid = result;
          $scope.GetCusDate($scope.ID);
          $scope.SellerBankInfo($scope.ID);
          $scope.ApplyDisableAllListRows();
        });
      }
    }
  };

  //$scope.SQHeader = function (ALPHA) {

  //    //$scope.ID = id;
  //    $http({
  //        method: "GET",
  //        url: '/AgreementLanding/GetSalesQuotationHeader',
  //        params: { id: $("#sqid").val(), alpha: ALPHA }
  //    }).success(function (result) {

  //        $scope.GetFGUOMAll(result[0].unitid);
  //        $("#unitid").val(result[0].unitid);
  //        $("#txtcurrencyid").val(result[0].currency);
  //        //$("#txtshipmentmodeid").val(result[0].transportationmode);
  //        $("#txtshipmentmodeid").val(result[0].shipmentmode);
  //        $("#txtFromshipmentcountryid").val(result[0].fromshipment);
  //        //$("#Freetextshipid").val(result[0].currency);
  //        $("#Freetextshipid").val(result[0].toshipmentname);
  //        $("#txtloadingport").val(result[0].loadingport);
  //        $("#loadingplace").val(result[0].loadingplace);
  //        $("#txtTEXTDESTINATIONPORT").val(result[0].destinationport);
  //        $("#txttransportmodeid").val(result[0].transportationmode);
  //        $("#txtShippingPeriod").val(result[0].shippingperod);
  //        $("#txtpaymenttermid").val(result[0].paymentterms);
  //        $("#txtincotermid").val(result[0].incoterm);
  //    });
  //};

  $scope.SQHeader = function (ALPHA) {
    $http({
      method: "GET",
      url: "/AgreementLanding/GetSalesQuotationHeader",
      params: { id: $("#sqid").val(), alpha: ALPHA },
    }).success(function (result) {
      $scope.GetFGUOMAll(result[0].unitid);
      $("#unitid").val(result[0].unitid);
      $("#txtcurrencyid").val(result[0].currency);
      $("#txtshipmentmodeid").val(result[0].shipmentmode);
      $("#txtFromshipmentcountryid").val(result[0].fromshipment);
      $("#txtloadingport").val(result[0].loadingport);
      $("#loadingplace").val(result[0].loadingplace);
      $("#txtTEXTDESTINATIONPORT").val(result[0].destinationport);
      $("#txttransportmodeid").val(result[0].transportationmode);
      $("#txtShippingPeriod").val(result[0].shippingperod);
      $("#txtpaymenttermid").val(result[0].paymentterms);
      $("#txtpaymenttermidval").val(result[0].paymenttermid);
      $("#txtincotermid").val(result[0].incoterm);

      // Auto-fill To Shipment Country from SQ — wait for dropdown options to be ready
      var toCountryId = result[0].toshipment;
      if (toCountryId) {
        var attempts = 0;
        var setToCountry = function () {
          if ($("#txtToshipmentcountryid option").length > 1) {
            $("#txtToshipmentcountryid").val(toCountryId);
            $scope.txtToshipmentcountryid = String(toCountryId);
            if (!$scope.$$phase) $scope.$apply();
          } else if (attempts++ < 20) {
            setTimeout(setToCountry, 150);
          }
        };
        setToCountry();
      }
    });
  };

  $scope.PIDetailsID = function (id) {
    $scope.ID = id;
    $http({
      method: "GET",
      url: "/AgreementLanding/GetAgreementLine",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.detailsbyid = result;
      $("#txtshipmentmodeid").val(result[0].shipmentmode);
      $("#txtFromshipmentcountryid").val(result[0].fromshipment);
      $("#txtToshipmentcountryid").val(result[0].toshipment);
      $("#txtcurrencyid").val(result[0].currency);
      $("#txtloadingport").val(result[0].loadingport);
      $("#loadingplace").val(result[0].loadingplace);
      $("#txtincotermid").val(result[0].incoterm);
      $("#txtpaymenttermid").val(result[0].textpayment);
      // $("#txtShippingPeriod").val(result[0].shippingperod);
      $("#txttransportmodeid").val(result[0].transportationmode);
    });
  };

  $scope.DetailsPI = function (id) {
    $scope.ID = id;
    $http({
      method: "GET",
      url: "/AgreementLanding/EditByDetailsPI",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.detailsbyid = result;
      $scope.ApplyDisableAllListRows();
    });
  };

  $scope.EditbyDetailsPI = function (id) {
    $scope.ID = id;
    $http({
      method: "GET",
      url: "/AgreementLanding/EditByDetailsPI",
      params: { id: $scope.ID },
    }).success(function (result) {
      console.log(result);
      $scope.edetailsbyid = result;
      $scope.ApplyDisableAllEditListRows();
    });
  };

  $scope.EditbyDetailsID = function (id) {
    $scope.ID = id;
    $http({
      method: "GET",
      url: "/AgreementLanding/GetAgreementLine",
      params: { id: $scope.ID },
    }).success(function (result) {
      //  console.log("GetAgreementLine");
      console.log(result);
      $scope.edetailsbyid = result;
      $scope.ApplyDisableAllEditListRows();
    });
  };

  $scope.CalTotalEdit = function (index) {
    var sumIQ = 0;
    var avg = 0;
    var sumAmt = 0;

    var k = 0;
    var j = 0;
    var rowCount = $("#editmycontainer tbody tr").length;

    //var k = $("#eunitprice" + index).val();
    //var j = $("#equantity" + index).val();

    for (var i = 0; i < rowCount - 1; i++) {
      //var k = $("#eunitprice" + i).val();
      var j = $("#equantity" + i).val();
      var l = $("#evatamount" + i).val();
      sumIQ += parseFloat(j);
      //avg += parseFloat(k);
      sumAmt += parseFloat(l);
    }

    $("#totqty").val("");
    $("#totvalue").val("");

    $("#totqty").val(parseFloat(sumIQ.toFixed(0)));
    //$("#totqty").val(parseFloat(avg.toFixed(0)));
    $("#totvalue").val(parseFloat(sumAmt.toFixed(4)));

    //$("#totqty").val(sumIQ);
    //$("#totvalue").val(sumAmt);
  };

  $scope.SearchFGLine = function (index) {
    $("#ename" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetFGlist/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return {
                  label: item.name,
                  id: item.id,
                  uoM: item.uoM,
                  Name: item.name,
                };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#ename" + index).val(ui.item.Name);
        $("#eitemcode" + index).val(ui.item.id);
        $("#euom" + index).val(ui.item.uoM);

        return false;
      },
      minlength: 3,
    });
  };

  $scope.SearchFGHeader = function () {
    var checksq = $(".sqid").val();
    var checkesqid = $(".eesqid").val();
    //alert($("#txtTariffCodehidden").val())
    //alert(checkesqid)
    if (checksq != 0 || checkesqid != "") {
      $("#name,#ename").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/SalesQuatationLanding/GetFGlist/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term, unitid: $("#unitid").val() },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return {
                    label: item.name,
                    id: item.id,
                    uoM: item.uoM,
                    Name: item.name,
                  };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#name").val(ui.item.Name);
          $("#ename").val(ui.item.Name);

          $("#itemcode").val(ui.item.id);
          $("#uom").val(ui.item.uoM);

          $("#eitemcode").val(ui.item.id);
          $("#euom").val(ui.item.uoM);

          return false;
        },
        minlength: 3,
      });
    } else {
      alert("Please at first Select Quotation Type");
    }
    //$("#name,#ename").autocomplete({

    //    source: function (request, response) {
    //        $.ajax({
    //            url: '/SalesQuatationLanding/GetFGlist/',
    //            type: "Get",
    //            dataType: "json",
    //            data: { prefix: request.term, unitid: $("#hsellerid").val() },
    //            success: function (data) {
    //                response($.map(data, function (item) {

    //                    return { label: item.name, id: item.id, uoM: item.uoM, Name: item.name };
    //                }));
    //            }
    //        });

    //    },
    //    select: function (event, ui) {

    //        $("#name").val(ui.item.Name);
    //        $("#ename").val(ui.item.Name);

    //        $("#itemcode").val(ui.item.id);
    //        $("#uom").val(ui.item.uoM);

    //        $("#eitemcode").val(ui.item.id);
    //        $("#euom").val(ui.item.uoM);

    //        return false;
    //    },
    //    minlength: 3
    //});
  };

  $scope.SearchHeaderSeller = function () {
    $("#txtComName,#edittxtComName").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetSellerInfo/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return {
                  label: item.name,
                  id: item.id,
                  phone: item.phone,
                  tin: item.tin,
                  email: item.email,
                  address: item.address,
                  Name: item.name,
                };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtComName").val(ui.item.Name);
        $("#edittxtComName").val(ui.item.Name);

        $("#hsellerid").val(ui.item.id);
        $("#ehsellerid").val(ui.item.id);
        $("#txtSellerPhone").val(ui.item.phone);
        $("#txtSellerEmail").val(ui.item.email);
        $("#txtSellerTIN").val(ui.item.tin);
        $("#txtSellerAddress").val(ui.item.address);

        return false;
      },
      minlength: 3,
    });
  };

  $scope.GetCusDate = function (id) {
    $.ajax({
      url: "/AgreementLanding/GetCusInfo",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $("#cusname").text(data[0].name);
      },
    });
  };

  $scope.SearchHeaderBuyer = function () {
    $("#txtBuyerName,#etxtBuyerName").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetCusInfo/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return {
                  label: item.name,
                  id: item.id,
                  phone: item.phone,
                  tin: item.tin,
                  email: item.email,
                  address: item.address,
                  Name: item.name,
                };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtBuyerName").val(ui.item.Name);
        $("#etxtBuyerName").val(ui.item.Name);

        $("#hcusid").val(ui.item.id);
        $("#ehcusid").val(ui.item.id);
        $("#txtPhone").val(ui.item.phone);
        $("#txtPhone").val(ui.item.phone);
        $("#txtEmail").val(ui.item.email);
        $("#txtTIN").val(ui.item.tin);
        $("#txtAddress").val(ui.item.address);
        return false;
      },
      minlength: 2,
    });
  };

  $scope.SearchBuyer = function () {
    $("#txtBuyerName").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/AgreementLanding/GetCusInfo/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return {
                  label: item.name,
                  id: item.id,
                  phone: item.phone,
                  tin: item.tin,
                  email: item.email,
                  address: item.address,
                  Name: item.name,
                };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtBuyerName").val(ui.item.Name);
        $("#etxtBuyerName").val(ui.item.Name);

        $("#hcusid").val(ui.item.id);
        $("#ehcusid").val(ui.item.id);

        $("#txtCusCode").val(ui.item.id);
        $("#txtPhone").val(ui.item.phone);
        $("#txtPhone").val(ui.item.phone);
        $("#txtEmail").val(ui.item.email);
        $("#txtTIN").val(ui.item.tin);
        $("#txtAddress").val(ui.item.address);
        return false;
      },
      minlength: 2,
    });
  };

  $scope.GetToShipmentCountry = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetToShipmentCountry",
    }).then(function (response) {
      $scope.toshipmentcountrylist = response.data;
    });
  };

  $scope.GetHSCode = function (status, index) {
    if (status == 0) {
      $("#txtHSCode").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#txtHSCode").val(ui.item.id);

          return false;
        },
        minlength: 3,
      });
    } else if (status == 1) {
      $("#hscodeline").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#hscodeline").val(ui.item.id);

          return false;
        },
        minlength: 3,
      });
    } else {
      $("#hscodeline" + index).autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#hscodeline" + index).val(ui.item.id);
          return false;
        },
        minlength: 3,
      });
    }
  };

  $scope.GetEHSCode = function (status, index) {
    if (status == 0) {
      $("#etxtHSCode").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#etxtHSCode").val(ui.item.id);

          return false;
        },
        minlength: 3,
      });
    } else if (status == 1) {
      $("#ehscodeline").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#ehscodeline").val(ui.item.id);

          return false;
        },
        minlength: 3,
      });
    } else {
      $("#ehscodeline" + index).autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#ehscodeline" + index).val(ui.item.id);
          return false;
        },
        minlength: 3,
      });
    }
  };

  $scope.Report = function (id) {
    let ALPHA = id.substring(0, 2);

    var rooturl = "";
    if (ALPHA == "SC") {
      var folder = "/EXPORT/Common/Sales_Contract";
    } else {
      var folder = "/EXPORT/Common/PIreport";
    }

    var url =
      rooturl + folder + "&pinum=" + id + "&rs:Embed=true&rc:LinkTarget=_self";
    //var url = rooturl + folder + "&rs:Embed=true";

    var base_url = window.location.origin;
    newwindow = window.open(
      url,
      "/DocumentLanding/Print?id=" + id,
      "scrollbars=yes,toolbar=0,height=400,width=800,top=70,left=50",
    );
    if (window.focus) {
      newwindow.focus();
    }
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

  $scope.SearchSize = function () {
    $("#txtSize").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSize/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.size, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtSize").val(ui.item.size);
        $("#txtSizeID").val(ui.item.id);

        $this = $(this);
        setTimeout(function () {
          $("#txtSize").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.SearchContruction = function () {
    $("#txtConstruction").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetConstruction/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.construction, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtConstruction").val(ui.item.size);
        $("#txtConstructionID").val(ui.item.id);

        $this = $(this);
        setTimeout(function () {
          $("#txtConstruction").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.SearchWeight = function () {
    $("#txtWeight").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetWeight/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.weight, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtWeight").val(ui.item.size);
        $("#txtWeightID").val(ui.item.id);

        $this = $(this);
        setTimeout(function () {
          $("#txtWeight").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.SearchSlit = function () {
    $("#txtSlit").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSlit/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.slit, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtSlit").val(ui.item.slit);
        $("#txtSlitID").val(ui.item.id);

        $this = $(this);
        setTimeout(function () {
          $("#txtSlit").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.SearchScrim = function () {
    $("#txtScrim").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetScrim/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.scrim, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtScrim").val(ui.item.size);
        $("#txtScrimID").val(ui.item.id);

        $this = $(this);
        setTimeout(function () {
          $("#txtScrim").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.SearchQuality = function () {
    $("#txtQuality").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetQuality/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.quality, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtQuality").val(ui.item.quality);
        $("#txtQualityID").val(ui.item.id);

        $this = $(this);
        setTimeout(function () {
          $("#txtQuality").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };

  $scope.eSearchSize = function () {
    $("#etxtSize").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSize/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.size, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtSize").val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtSize").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchContruction = function () {
    $("#etxtConstruction").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetConstruction/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.construction, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtConstruction").val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtConstruction").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchWeight = function () {
    $("#etxtWeight").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetWeight/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.weight, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtWeight").val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtWeight").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };

  $scope.eSearchSlit = function () {
    $("#etxtSlit").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSlit/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.slit, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtSlit").val(ui.item.slit);

        $this = $(this);
        setTimeout(function () {
          $("#etxtSlit").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchScrim = function () {
    $("#etxtScrim").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetScrim/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.scrim, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtScrim").val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtScrim").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchQuality = function () {
    $("#etxtQuality").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetQuality/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.quality, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtQuality").val(ui.item.quality);

        $this = $(this);
        setTimeout(function () {
          $("#etxtQuality").val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };

  $scope.eSearchSizeLine = function (index) {
    $("#esize" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSize/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.size, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtSize" + index).val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtSize" + index).val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchContructionLine = function (index) {
    $("#etxtConstruction" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetConstruction/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.construction, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtConstruction" + index).val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtConstruction" + index).val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchWeightLine = function (index) {
    $("#etxtWeight" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetWeight/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.weight, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtWeight" + index).val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtWeight" + index).val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchSlitLine = function (index) {
    $("#etxtSlit" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSlit/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.slit, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtSlit" + index).val(ui.item.slit);

        $this = $(this);
        setTimeout(function () {
          $("#etxtSlit" + index).val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchScrimLine = function (index) {
    $("#etxtScrim" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetScrim/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.scrim, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtScrim" + index).val(ui.item.size);

        $this = $(this);
        setTimeout(function () {
          $("#etxtScrim" + index).val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.eSearchQualityLine = function (index) {
    $("#etxtQuality" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetQuality/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: $("#hsellerid").val() },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.quality, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#etxtQuality" + index).val(ui.item.quality);

        $this = $(this);
        setTimeout(function () {
          $("#etxtQuality" + index).val(ui.item.label);
        }, 1);

        return false;
      },
      minlength: 3,
    });
  };
  $scope.ContractReport = function (id) {
    var rooturl = "";
    var folder = "/Export/JUTE/SalesContract_Report";
    var url =
      rooturl +
      folder +
      "&PISCHEADERID=" +
      id +
      "&rs:Embed=true&rc:LinkTarget=_self";
    var newwindow = window.open(
      url,
      "_blank",
      "scrollbars=yes,toolbar=0,height=400,width=800,top=70,left=50",
    );
    if (window.focus) {
      newwindow.focus();
    }
  };
});
