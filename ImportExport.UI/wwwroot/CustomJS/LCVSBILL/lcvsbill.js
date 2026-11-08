/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  $scope.LoadData = function () {
    $http({
      method: "get",
      url: "LCVSBILL/GetLCVSBILL",
      params: { typeid: 1 }, //false parameter
    }).then(function (response) {
      //console.log(response.data);
      $scope.LClist = null;
      $scope.LClist = response.data;
    });
  };

  $scope.UpdateRM = function (id, rmdate, rmby) {
    if (!confirm("Are you sure you want to update RM?")) {
      return; // stop if user clicks Cancel
    } else {
      var master = {
        ID: id,
        RMDATE: rmdate,
        RMBY: rmby,
      };

      $.ajax({
        type: "POST",
        url: "/LCVSBILL/UpdateRM",
        dataType: "json",
        data: { master: master },
        success: function (result) {
          $scope.LoadData();
          notify("success", "Success Message", result);
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.GetShipment = function () {
    $http({
      method: "get",
      url: "/LCVSBILL/GetShipment",
    }).then(
      function (response) {
        $scope.shipmentList = response.data;
      },
      function (error) {
        //console.log("Shipment load error:", error);
        $scope.shipmentList = [];
      },
    );
  };

  $scope.GetDocument = function () {
    $http({
      method: "get",
      url: "/LC/GetDocument",
    }).then(function (response) {
      $scope.documentstypelist = response.data;
    });
  };

  $scope.Billno = function () {
    $("#txtBillno").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/LC/Billno/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.name, id: item.id, Name: item.name };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtBillno").val(ui.item.Name);
        $("#txtBillnoid").val(ui.item.id);
        //$scope.GetCusData(ui.item.id);
        //$scope.GetSellerData(ui.item.id);
        //$scope.GetPIDetailsData(ui.item.id);
        return false;
      },
      minlength: 2,
    });
  };

  $scope.LCNO = function () {
    $("#txtLCNo").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/LCVSBILL/LCNO/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.name, id: item.id, Name: item.name };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#txtLCNo").val(ui.item.Name);
        $("#txtLCNOID").val(ui.item.id);
        //$scope.GetCusData(ui.item.id);
        //$scope.GetSellerData(ui.item.id);
        //$scope.GetPIDetailsData(ui.item.id);
        return false;
      },
      minlength: 2,
    });
  };

  $scope.Clear = function () {
    $("#txtslno").val("");
    $("#txtBillnoid").val("");
    $("#txtBillno").val("");
    $("#txtLCNo").val("");
    $("#txtLCNOID").val("");
    $("#txtindate").val("");
    $scope.shipmentId = "";
  };

  $scope.ReportGenerate = function (id, index) {
    $scope.PrepReport(id, index);
  };

  $scope.PrepReport = function (id, index) {
    // alert($('#printid'+index).val());

    var rooturl = "";
    if ($("#printid" + index).val() == "1") {
      var folder = "/EXPORT/COMMON/BIAXREPORT_BOE";
    } else if ($("#printid" + index).val() == "2") {
      var folder = "/EXPORT/COMMON/COMMERCIAL INVOICE";
    } else if ($("#printid" + index).val() == "3") {
      var folder = "/EXPORT/COMMON/DELIVERY_CHALLAN";
    } else if ($("#printid" + index).val() == "4") {
      var folder = "/EXPORT/COMMON/Packing_and_W_List";
    } else {
      var folder = "/EXPORT/COMMON/Beneficiary Certificate";
    }

    var url =
      rooturl + folder + "&ID=" + id + "&rs:Embed=true&rc:LinkTarget=_self";

    var width = screen.availWidth;
    var height = screen.availHeight;
    var base_url = window.location.origin;
    //newwindow = window.open(url, "/DocumentLanding/Print?id=" + id, 'scrollbars=yes,toolbar=0,height=400,width=800,top=70,left=50');
    newwindow = window.open(
      url,
      "/DocumentLanding/Print?id=" + id,
      "scrollbars=yes,toolbar=no,resizable=yes,top=0,left=0,width=" +
        width +
        ",height=" +
        height,
    );
    if (window.focus) {
      newwindow.focus();
    }
  };

  $scope.PrepSalesReport = function (id) {
    var rooturl = "";

    var folder = "/EXPORT/Common/LCrelatedSalesContract";

    var url =
      rooturl +
      folder +
      "&headid=" +
      id +
      "&id=" +
      id +
      "&rs:Embed=true&rc:LinkTarget=_self";
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

  $scope.DeleteMaster = function (id) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/LCVSBILL/Delete",
        params: { id: id },
      }).then(function (response) {
        notify("error", "Message", response.data);
        $scope.LoadData();
      });
    } else {
    }
  };

  $scope.Save = function () {
    if (confirm("Are You Sure? You Want to Save this Record.") == true) {
      var Details = [];

      var isAllValid = true;

      if ($("#txtLCNo").val().trim() == "") {
        isAllValid = false;
        $("#txtLCNo").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtLCNo").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtBillnoid").val().trim() == "") {
        isAllValid = false;
        $("#txtBillnoid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtBillnoid").siblings("span.error").css("visibility", "hidden");
      }

      if (!$scope.shipmentId || $scope.shipmentId.toString().trim() == "") {
        isAllValid = false;
        $("#txtShipment").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtShipment").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtslno").val().trim() == "") {
        isAllValid = false;
        $("#txtslno").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtslno").siblings("span.error").css("visibility", "hidden");
      }
      if ($("#txtindate").val().trim() == "") {
        isAllValid = false;
        $("#txtindate").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtindate").siblings("span.error").css("visibility", "hidden");
      }

      if (isAllValid) {
        var master = {
          BILLID: $("#txtBillnoid").val(),
          LCSCID: $("#txtLCNOID").val(),
          TYPEID: 1,
          SLNO: $("#txtslno").val(),
          INDATE: $("#txtindate").val(),
          SHIPMENTID: $scope.shipmentId,
        };

        $.ajax({
          type: "POST",
          url: "/LCVSBILL/Save",
          dataType: "json",
          data: { lcvsbill: master },
          success: function (result) {
            notify("success", "Success Messsage", result);
            $scope.Clear();
            $scope.LoadData();

            $("#savebutton").prop("disabled", false);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else {
      $("#savebutton").prop("disabled", false);
    }
  };

  $scope.Update = function () {
    //$scope.UploadFile("335");

    var Details = [];

    var isAllValid = true;

    //if ($("#etxtPISCID").val().trim() == "") {
    //    isAllValid = false;
    //    $("#etxtPISCID").siblings('span.error').css('visibility', 'visible');
    //}
    //else {
    //    $("#etxtPISCID").siblings('span.error').css('visibility', 'hidden');
    //}

    if ($("#etxtLCNumber").val().trim() == "") {
      isAllValid = false;
      $("#etxtLCNumber").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtLCNumber").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#etxtDateIssue").val().trim() == "") {
      isAllValid = false;
      $("#etxtDateIssue").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtDateIssue").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#etxtExpireDate").val() == "") {
      isAllValid = false;
      $("#etxtExpireDate").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtExpireDate").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#etxtTolerancePer").val() == "") {
      isAllValid = false;
      $("#etxtTolerancePer")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtTolerancePer").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#ePerformanceInvoiceNo").val() == "") {
      isAllValid = false;
      $("#ePerformanceInvoiceNo")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#ePerformanceInvoiceNo")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#etxtPeriodPresentation").val() == "") {
      isAllValid = false;
      $("#etxtPeriodPresentation")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtPeriodPresentation")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#etxtTranshipment").val() == "") {
      isAllValid = false;
      $("#etxtTranshipment")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtTranshipment").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#etxtCreatedPlace").val() == "") {
      isAllValid = false;
      $("#etxtCreatedPlace")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtCreatedPlace").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#etxtPeriodPresentation").val() == "") {
      isAllValid = false;
      $("#etxtPeriodPresentation")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtPeriodPresentation")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#etxtPartialShipment").val() == "") {
      isAllValid = false;
      $("#etxtPartialShipment")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtPartialShipment")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if (isAllValid) {
      var master = {
        ID: $("#lcid").val(),
        PROFORMAINVOICEHEADERID: $("#etxtLCNumber").val(),
        LCNUMBER: $("#etxtLCNumber").val(),
        LCISSUEDATE: $("#etxtDateIssue").val(),
        LCEXPIREDATE: $("#etxtExpireDate").val(),

        LCEXPIREDPLACE: $("#etxtCreatedPlace").val(),
        //CUSTOMERID: $("#hsellerid").val(),
        TOELRANCECRAMTPERCENTAGE: $("#etxtTolerancePer").val(),
        PRESENTATIONINDATE: $("#etxtPeriodPresentation").val(),
        PARTIALSHIPMENT: $("#etxtPartialShipment").val(),

        BUYERDOCUMENTREQUIRED: $("#etxtBuyerDocReq").val(),
        BUYERADDITIONALCONDITION: $("#etxtBuyerAdditionCon").val(),
        TRANSSHIPMENT: $("#etxtTranshipment").val(),
        NOTIFIEDPARTYDETAILS: $("#etxtNotifyParty").val(),
        PISCHEADERID: $("#etxtPISCID").val(),
        BUYERBANK: $("#etxtBuyerBank").val(),
        DESCRIPTIONS: "",

        LCCREATEDPLACE: $("#etxtCreatedPlace").val(),
        SHIPMENTLATESTDATE: $("#etxtLatestDate").val(),
        LCTENORPERIOD: $("#etxtTenore").val(),
        BUYERBANKID: $("#ebuyerbankid").val(),
        BILLNOID: $("#etxtBillnoid").val(),
        INVOICENO: $("#etxtInvoiceno").val(),
        TYPE: $("#esaletypeid").val(),
        DOCUMENTREQUIRE: $("#etxtDocumentrequre").val(),
      };

      //console.log(master);
      $.ajax({
        type: "POST",
        url: "/LC/Update",
        dataType: "json",
        data: { lc: master },
        success: function (result) {
          //$scope.UploadFile(result);
          notify("success", "Success Messsage", result);
          UploadFileUsingAPI(result.split(":")[1]);
          $scope.GetLCData();
          //$scope.Clear();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };
});
