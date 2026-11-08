/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  $(".jute").hide();
  $(".biax").hide();

  $(".juteview").hide();
  $(".biaxview").hide();

  $(".eeditjute").hide();
  $(".eeditbiax").hide();

  //$scope.loading = true;

  $scope.GetChange = function () {
    if ($("#txttypelocalcheck").val() === "135") {
      $("#txtBillnoid").prop("disabled", true);
    } else {
      $("#txtBillnoid").prop("disabled", false);
    }
    if ($("#txttypelocalcheck").val() === "136") {
      $("#txtInvoiceno").prop("disabled", true);
    } else {
      $("#txtInvoiceno").prop("disabled", false);
    }
  };

  $scope.EGetChange = function () {
    if ($("#etxttypelocalcheck").val() === "1") {
      $("#etxtBillnoid").prop("disabled", true);
    } else {
      $("#etxtBillnoid").prop("disabled", false);
    }
    if ($("#etxttypelocalcheck").val() === "2") {
      $("#etxtInvoiceno").prop("disabled", true);
    } else {
      $("#etxtInvoiceno").prop("disabled", false);
    }
  };
  $scope.GetDocument = function () {
    $http({
      method: "get",
      url: "/LC/GetDocument",
    }).then(function (response) {
      $scope.documentstypelist = response.data;
    });
  };

  $scope.LoadDatabytype = function () {
    if ($("#unitidforload").val() === "91") {
      var cnt = $("#typeidforload").val();
      if (cnt == "2") cnt = "0";

      $http({
        method: "get",
        url: "LC/GetLCDetailsBiax",
        params: { typeid: $("#unitidforload").val() },
      }).then(function (response) {
        $scope.LClist = response.data.filter(function (item) {
          return item.type == cnt;
        });
      });
    } else {
      $http({
        method: "get",
        url: "LC/GetLCData",
      }).then(function (response) {
        $scope.LClist = null;
        $scope.LClist = response.data;
        //$scope.loading = false;
      });
    }
  };

  $scope.LoadData = function () {
    if ($("#unitidforload").val() === "91") {
      $http({
        method: "get",
        url: "LC/GetLCDetailsBiax",
        params: { typeid: $("#unitidforload").val() },
      }).then(function (response) {
        $scope.LClist = null;
        $scope.LClist = response.data;
        //$scope.loading = false;
      });
    } else {
      $http({
        method: "get",
        url: "LC/GetLCData",
      }).then(function (response) {
        $scope.LClist = null;
        $scope.LClist = response.data;
        //$scope.loading = false;
      });
    }
  };
  $scope.CheckLocal = function (ID) {
    $http({
      method: "get",
      url: "LC/CheckLocal",
      params: { id: ID },
    }).then(function (response) {
      $("#txttypelocalcheck").val(response.data[0].id);
      // alert(response.data[0].id)
      if (response.data[0].id == "135") {
        $("#txtBillno").prop("disabled", true);
        $("#txtInvoiceno").prop("disabled", false);
      } else {
        $("#txtInvoiceno").prop("disabled", true);
        $("#txtBillno").prop("disabled", false);
      }
      //if (response.data[0].id == "136") {
      //    $('#txtInvoiceno').prop('disabled', true);
      //}
      //else {
      //    $('#txtBillnoid').prop('disabled', false);
      //}

      //$scope.loading = false;
    });
    //$scope.GetChange();
    //$scope.EGetChange();
  };

  $scope.BuyerBankInfo = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetBuyerBankInfo",
    }).then(function (response) {
      $scope.buyerbanklist = response.data;
    });
  };

  $scope.getReport = function (id) {};

  $scope.ReportGenerate = function (id, type) {
    if (type == 1) {
      $scope.PrepReport(id);
    } else {
      $scope.PrepSalesReport(id);
    }
  };

  $scope.PrepReport = function (id) {
    //alert('h')

    var rooturl = "Dummy_String";
    if ($("#printid").val() == "1") {
      var folder = "/EXPORT/COMMON/BIAXREPORT_BOE";
    } else if ($("#printid").val() == "2") {
      var folder = "/EXPORT/COMMON/COMMERCIAL INVOICE";
    } else if ($("#printid").val() == "3") {
      var folder = "/EXPORT/COMMON/DELIVERY_CHALLAN";
    } else if ($("#printid").val() == "4") {
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

    // var rooturl = "Dummy_String";

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

  $scope.ViewCData = function (ID, PINO) {
    if ($("#unitidforload").val() === "91") {
      $(".juteview").hide();
      $(".biaxview").show();

      $scope.ID = ID;

      console.log("View ID:", ID);
      console.log("PINO:", PINO);

      // temporary test
      //ViewImageFromAPI(ID.toString());

      $http({
        method: "GET",
        url: "/LCApproval/ViewCDataBiax",
        params: { id: $scope.ID },
      }).success(function (data) {
        $scope.masterdata = data;
      });

      //$scope.LoadDocument(ID);
      //$scope.ViewLoadDocumentStatus(ID);
      $scope.ViewByDetailsDataBiax(PINO);
    } else {
      $(".juteview").show();
      $(".biaxview").hide();
      $scope.ID = ID;
      $http({
        method: "GET",
        url: "/LCApproval/ViewLCData",
        params: { id: $scope.ID },
      }).success(function (data) {
        $scope.masterdata = data;
      });

      $scope.LoadDocument(ID);
      $scope.ViewLoadDocumentStatus(ID);
      $scope.ViewByDetailsData(PINO);
    }

    // Attached File retrival

    //$.ajax({
    //    url: "/LC/GetLCProcessCode",
    //    type: "GET",
    //    data: { id: ID },
    //    success: function (data) {

    //var lcNo = data[0].name;

    var processCode = "LC-" + ID; //"LC-" + lcNo + "-" + ID;

    console.log("VIEW PROCESSCODE:", processCode);

    ViewImageFromAPI(processCode.trim());
    //    }
    //});
  };

  $scope.ViewByDetailsDataBiax = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      //url: '/AgreementLanding/GetAgreementLine',
      url: "/LC/OCFListViewByID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.biaxlistdetails = data;
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

  $scope.ViewByDetailsData = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      //url: '/AgreementLanding/GetAgreementLine',
      url: "/AgreementApproval/ViewByDetailsID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.pclistdetails = data;
    });
  };

  $scope.GetUnit = function () {
    $http({
      method: "GET",
      //url: '/LC/GetUnit'
      url: "/Common/GetUnitByUser",
    }).success(function (result) {
      $scope.unitlist = result;
    });
  };

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/LC/GetDocStatus",
      params: { id: $scope.ID },
    }).success(function (result) {
      console.log(result);
      $scope.docstatusview = result;
    });
  };

  $scope.LoadConfirm = function () {
    $http({
      method: "GET",
      url: "/Common/GetConfirm",
    }).success(function (result) {
      console.log(result);
      $scope.confirmlist = result;
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

  $scope.Clear = function () {
    $("#txtPISCID").val("");
    $("#txtLCNumber").val("");
    $("#txtDateIssue").val("");
    $("#txtExpireDate").val("");
    $("#txtTolerancePer").val("");
    $("#PerformanceInvoiceNo").val("");
    $("#txtPeriodPresentation").val("");
    $("#txtTranshipment").val("");
    $("#txtCreatedPlace").val("");
    $("#txtPeriodPresentation").val("");
    $("#txtPartialShipment").val("");
    $("#txtBuyerDocReq").val("");
    $("#BuyerAdditionCon").val("");
    $("#etxtNotifyParty").val("");
    $("#txtNotifyParty").val("");
    $("#txtPISC").val("");
    //$("#editmycontainer").empty();

    $("#txtComName").val("");
    $("#txtSellerPhone").val("");
    $("#txtSellerEmail").val("");
    $("#txtSellerTIN").val("");
    $("#txtSellerAddress").val("");
    $("#txtBuyerName").val("");
    $("#txtPhone").val("");
    $("#txtEmail").val("");
    $("#txtAddress").val("");
    $scope.detailsbyid = null;
  };

  $scope.sortBy = function (column) {
    $scope.sortColumn = column;
    $scope.reverse = !$scope.reverse;
  };

  $scope.GetSellerData = function (id) {
    $.ajax({
      url: "/LC/GetSellerInfo",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $("#txtComName").val(data[0].name);
        $("#hsellerid").val(data[0].id);
        $("#txtSellerPhone").val(data[0].phone);
        $("#txtSellerEmail").val(data[0].email);
        $("#txtSellerTIN").val(data[0].tin);
        $("#txtSellerAddress").val(data[0].address);

        //$("#etxtComName").val(data[0].name);
        //$("#ehsellerid").val(data[0].id);
        //$("#etxtSellerPhone").val(data[0].phone);
        //$("#etxtSellerEmail").val(data[0].email);
        //$("#etxtSellerTIN").val(data[0].tin);
        //$("#etxtSellerAddress").val(data[0].address);
      },
    });
  };

  $scope.GetSellerInfoShortForBusiness = function (id) {
    $.ajax({
      url: "/LC/GetSellerInfoShortForBusiness",
      type: "Get",
      dataType: "json",
      data: { typeid: $("#unitid").val(), id: id },
      success: function (data) {
        $("#txtComName").val(data[0].name);
        $("#hsellerid").val(data[0].id);
        $("#txtSellerPhone").val(data[0].phone);
        $("#txtSellerEmail").val(data[0].email);
        $("#txtSellerTIN").val(data[0].tin);
        $("#txtSellerAddress").val(data[0].address);

        $("#etxtComName").val(data[0].name);
        $("#ehsellerid").val(data[0].id);
        $("#etxtSellerPhone").val(data[0].phone);
        $("#etxtSellerEmail").val(data[0].email);
        $("#etxtSellerTIN").val(data[0].tin);
        $("#etxtSellerAddress").val(data[0].address);
      },
    });
  };

  $scope.GetCusData = function (id) {
    var url = "/LC/GetCusInfo";
    $.ajax({
      url: "/LC/GetCusInfo",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $("#txtBuyerName").val(data[0].name);
        $("#txtCusCode").val(data[0].id);
        $("#txtPhone").val(data[0].phone);
        $("#txtEmail").val(data[0].email);
        $("#txtTIN").val(data[0].tin);
        $("#txtAddress").val(data[0].address);

        //$("#etxtBuyerName").val(data[0].name);
        //$("#etxtCusCode").val(data[0].id);
        //$("#etxtPhone").val(data[0].phone);
        //$("#etxtEmail").val(data[0].email);
        //$("#etxtTIN").val(data[0].tin);
        //$("#etxtAddress").val(data[0].address);
      },
    });
  };

  $scope.GetCusInfoForBusiness = function (id) {
    $.ajax({
      url: "/LC/GetCusInfoForBusiness",
      type: "Get",
      dataType: "json",
      data: { typeid: $("#unitid").val(), id: id },
      success: function (data) {
        $("#txtBuyerName").val(data[0].name);
        $("#txtCusCode").val(data[0].id);
        $("#txtPhone").val(data[0].phone);
        $("#txtEmail").val(data[0].email);
        $("#txtTIN").val(data[0].tin);
        $("#txtAddress").val(data[0].address);

        $("#etxtBuyerName").val(data[0].name);
        $("#etxtCusCode").val(data[0].id);
        $("#etxtPhone").val(data[0].phone);
        $("#etxtEmail").val(data[0].email);
        $("#etxtTIN").val(data[0].tin);
        $("#etxtAddress").val(data[0].address);
      },
    });
  };

  $scope.GetSellerDataEdit = function (id) {
    $.ajax({
      url: "/LC/GetSellerInfoEdit",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        //$("#txtComName").val(data[0].name);
        //$("#hsellerid").val(data[0].id);
        //$("#txtSellerPhone").val(data[0].phone);
        //$("#txtSellerEmail").val(data[0].email);
        //$("#txtSellerTIN").val(data[0].tin);
        //$("#txtSellerAddress").val(data[0].address);

        $("#etxtComName").val(data[0].name);
        $("#ehsellerid").val(data[0].id);
        $("#etxtSellerPhone").val(data[0].phone);
        $("#etxtSellerEmail").val(data[0].email);
        $("#etxtSellerTIN").val(data[0].tin);
        $("#etxtSellerAddress").val(data[0].address);
      },
    });
  };

  $scope.GetCusDataEdit = function (id) {
    $.ajax({
      url: "/LC/GetCusInfoEdit",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        //console.log(data);
        //$("#txtBuyerName").val(data[0].name);
        //$("#txtCusCode").val(data[0].id);
        //$("#txtPhone").val(data[0].phone);
        //$("#txtEmail").val(data[0].email);
        //$("#txtTIN").val(data[0].tin);
        //$("#txtAddress").val(data[0].address);

        $("#etxtBuyerName").val(data[0].name);
        $("#etxtCusCode").val(data[0].id);
        $("#etxtPhone").val(data[0].phone);
        $("#etxtEmail").val(data[0].email);
        $("#etxtTIN").val(data[0].tin);
        $("#etxtAddress").val(data[0].address);
      },
    });
  };

  $scope.Search = function () {
    if ($("#unitid").val() === "91") {
      $scope.SearchPIBiax();
      $(".jute").hide();
      $(".biax").show();
    } else {
      $scope.SearchPI();
      $(".jute").show();
      $(".biax").hide();
    }
  };

  $scope.SearchPI = function () {
    $("#txtPISC").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/LC/GetPIInfo/",
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
        $("#txtPISC").val(ui.item.Name);
        $("#txtPISCID").val(ui.item.id);
        $scope.GetCusData(ui.item.id);
        $scope.GetSellerData(ui.item.id);
        $scope.GetPIDetailsData(ui.item.id);
        return false;
      },
      minlength: 2,
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
  $scope.EBillno = function () {
    $("#etxtBillno").autocomplete({
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
        $("#etxtBillno").val(ui.item.Name);
        $("#etxtBillnoid").val(ui.item.id);
        //$scope.GetCusData(ui.item.id);
        //$scope.GetSellerData(ui.item.id);
        //$scope.GetPIDetailsData(ui.item.id);
        return false;
      },
      minlength: 2,
    });
  };

  $scope.SearchPIBiax = function () {
    $("#txtPISC").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/LC/GetPIInfoBiax/",
          type: "Get",
          dataType: "json",
          data: { typeid: $("#unitid").val(), prefix: request.term },
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
        $("#txtPISC").val(ui.item.Name);
        $("#txtPISCID").val(ui.item.id);

        $scope.GetCusInfoForBusiness(ui.item.id);
        $scope.GetSellerInfoShortForBusiness(ui.item.id);
        $scope.OCFListView(ui.item.id);
        $scope.CheckLocal(ui.item.id);

        //   $scope.GetChange();
        // $scope.GetChange();
        return false;
      },
      minlength: 2,
    });
  };

  $scope.GetPIDetailsData = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "LC/GetPIDetailsByID",
    }).then(function (response) {
      $scope.detailsbyid = null;
      $scope.detailsbyid = response.data;
      //$scope.loading = false;
    });
  };

  $scope.OCFListView = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "LC/OCFListView",
    }).then(function (response) {
      $scope.ocflistview = null;
      $scope.ocflistview = response.data;
      //$scope.loading = false;
    });
  };

  $scope.GetPIDetailsDataEdit = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "LC/GetPIDetailsByIDEdit",
    }).then(function (response) {
      $scope.edetailsbyid = response.data;
      //$scope.loading = false;
    });
  };

  $scope.GetPIDetailsDataEditBiax = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "LC/OCFListView",
    }).then(function (response) {
      $scope.edetailsbyidbiax = response.data;
      //$scope.loading = false;
    });
  };

  $scope.EditbyMasterID = function (id, headerid) {
    $("#lcid").val(id);

    if ($("#unitidforload").val() === "91") {
      $(".eeditjute").hide();
      $(".eeditbiax").show();

      $http({
        method: "POST",
        url: "/LC/GetLCDetailsByIDBiax",
        params: { id: id },
      }).then(function (response) {
        $("#etxtBuyerBank").val(response.data[0].buyerbank);
        $("#etxtLCNumber").val(response.data[0].lcnumber);
        $("#etxtDateIssue").val(response.data[0].lcissuedate);
        $("#etxtExpireDate").val(response.data[0].lcexpiredate);
        $("#etxtTolerancePer").val(response.data[0].toelrancecramtpercentage);
        $("#etxtTranshipment").val(response.data[0].transhipmentid);
        $("#etxtNotifyParty").val(response.data[0].notifiedpartydetails);

        $("#etxtCreatedPlace").val(response.data[0].lcexpiredplace);
        $("#etxtPartialShipment").val(response.data[0].partialshipmentid);
        $("#etxtPeriodPresentation").val(response.data[0].presentationindate);

        $("#etxtBuyerDocReq").val(response.data[0].buyerdocumentrequired);
        $("#etxtBuyerAdditionCon").val(
          response.data[0].buyeradditionalcondition,
        );
        $("#etxtBuyerBank").val(response.data[0].buyerbank);
        $("#etxtPISC").val(response.data[0].pisc);

        $("#etxtLatestDate").val(response.data[0].shipmentlatestdate);
        $("#etxtTenore").val(response.data[0].lctenorperiod);
        $("#etxtCreatedPlace").val(response.data[0].lcexpiredplace);

        $("#ebuyerbankid").val(response.data[0].buyerbankid);
        $("#etxtInvoiceno").val(response.data[0].invoiceno);
        $("#etxtBillno").val(response.data[0].billno);
        $("#esaletypeid").val(response.data[0].type);
        $("#etxtDocumentrequre").val(response.data[0].documentrequire);

        $scope.GetCusInfoForBusiness(headerid);
        $scope.GetSellerInfoShortForBusiness(headerid);
        $scope.GetPIDetailsDataEditBiax(headerid);

        $scope.CheckLocal(headerid);
        //$scope.GetLCData();
        //notify('success', 'Message', response.data);
      });
    } else {
      $(".eeditjute").show();
      $(".eeditbiax").hide();
      $http({
        method: "POST",
        url: "/LC/GetLCDetailsByID",
        params: { id: id },
      }).then(function (response) {
        $("#etxtBuyerBank").val(response.data[0].buyerbank);
        $("#etxtLCNumber").val(response.data[0].lcnumber);
        $("#etxtDateIssue").val(response.data[0].lcissuedate);
        $("#etxtExpireDate").val(response.data[0].lcexpiredate);
        $("#etxtTolerancePer").val(response.data[0].toelrancecramtpercentage);
        $("#etxtTranshipment").val(response.data[0].transshipment);
        $("#etxtNotifyParty").val(response.data[0].notifiedpartydetails);

        $("#etxtCreatedPlace").val(response.data[0].lccreatedplace);
        $("#etxtPartialShipment").val(response.data[0].partialshipment);
        $("#etxtPeriodPresentation").val(response.data[0].presentationindate);

        $("#etxtBuyerDocReq").val(response.data[0].buyerdocumentrequired);
        $("#etxtBuyerAdditionCon").val(
          response.data[0].buyeradditionalcondition,
        );
        $("#etxtBuyerBank").val(response.data[0].buyerbank);
        $("#etxtPISC").val(response.data[0].pisc);

        $("#etxtLatestDate").val(response.data[0].shipmentlatestdate);
        $("#etxtTenore").val(response.data[0].lctenorperiod);
        $("#etxtCreatedPlace").val(response.data[0].lcexpiredplace);

        $("#esaletypeid").val(response.data[0].type);
        $("#ebuyerbankid").val(response.data[0].buyerbankid);

        $scope.GetCusDataEdit(id);
        $scope.GetSellerDataEdit(id);
        $scope.GetPIDetailsData(id);
        $scope.GetPIDetailsDataEdit(id);
        //$scope.GetLCData();
        //notify('success', 'Message', response.data);
      });
    }
  };

  $scope.DeleteMaster = function (id) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/LC/DeleteMasterByID",
        params: { id: id },
      }).then(function (response) {
        $scope.GetLCData();
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.Save = function () {
    if (confirm("Are You Sure? You Want to Save this Record.") == true) {
      var Details = [];

      var isAllValid = true;

      if ($("#unitid").val().trim() == "") {
        isAllValid = false;
        $("#unitid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#unitid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtPISCID").val().trim() == "") {
        isAllValid = false;
        $("#txtPISCID").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtPISCID").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtLCNumber").val().trim() == "") {
        isAllValid = false;
        $("#txtLCNumber").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtLCNumber").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtDateIssue").val().trim() == "") {
        isAllValid = false;
        $("#txtDateIssue").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtDateIssue").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtExpireDate").val() == "") {
        isAllValid = false;
        $("#txtExpireDate").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtExpireDate").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtTolerancePer").val() == "") {
        isAllValid = false;
        $("#txtTolerancePer")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtTolerancePer")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#PerformanceInvoiceNo").val() == "") {
        isAllValid = false;
        $("#PerformanceInvoiceNo")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#PerformanceInvoiceNo")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtPeriodPresentation").val() == "") {
        isAllValid = false;
        $("#txtPeriodPresentation")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtPeriodPresentation")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtTranshipment").val() == "") {
        isAllValid = false;
        $("#txtTranshipment")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtTranshipment")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      //if ($("#txtCreatedPlace").val() == "") {
      //    isAllValid = false;
      //    $("#txtCreatedPlace").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#txtCreatedPlace").siblings('span.error').css('visibility', 'hidden');
      //}

      if ($("#txtPeriodPresentation").val() == "") {
        isAllValid = false;
        $("#txtPeriodPresentation")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtPeriodPresentation")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtPartialShipment").val() == "") {
        isAllValid = false;
        $("#txtPartialShipment")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtPartialShipment")
          .siblings("span.error")
          .css("visibility", "hidden");
      }
      //if ($("#txtNotifyParty").val() == "") {
      //    isAllValid = false;
      //    $("#txtNotifyParty").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#txtNotifyParty").siblings('span.error').css('visibility', 'hidden');
      //}
      if (isAllValid) {
        var master = {
          BUSINESSUNIT: $("#unitid").val(),
          PROFORMAINVOICEHEADERID: $("#txtLCNumber").val(),
          LCNUMBER: $("#txtLCNumber").val(),
          LCISSUEDATE: $("#txtDateIssue").val(),
          LCEXPIREDATE: $("#txtExpireDate").val(),

          LCEXPIREDPLACE: $("#txtCreatedPlace").val(),
          //CUSTOMERID: $("#hsellerid").val(),
          TOELRANCECRAMTPERCENTAGE: $("#txtTolerancePer").val(),
          PRESENTATIONINDATE: $("#txtPeriodPresentation").val(),
          PARTIALSHIPMENT: $("#txtPartialShipment").val(),

          BUYERDOCUMENTREQUIRED: $("#txtBuyerDocReq").val(),
          BUYERADDITIONALCONDITION: $("#BuyerAdditionCon").val(),
          TRANSSHIPMENT: $("#txtTranshipment").val(),
          NOTIFIEDPARTYDETAILS: $("#txtNotifyParty").val(),
          PISCHEADERID: $("#txtPISCID").val(),
          BUYERBANK: $("#txtBuyerBank").val(),
          DESCRIPTIONS: "",

          LCCREATEDPLACE: $("#txtCreatedPlace").val(),
          SHIPMENTLATESTDATE: $("#txtLatestDate").val(),
          BUYERBANKID: $("#buyerbankid").val(),
          BILLNOID: $("#txtBillnoid").val(),
          INVOICENO: $("#txtInvoiceno").val(),
          TYPE: $("#saletypeid").val(),
          LCTENORPERIOD: $("#txtTenore").val(),
          DOCUMENTREQUIRE: $("#txtDocumentrequre").val(),
        };

        $.ajax({
          type: "POST",
          url: "/LC/Save",
          dataType: "json",
          data: { lc: master },
          success: function (result) {
            //$scope.UploadFile(result);

            console.log("success", "Success Messsage", result);
            var parts = result.trim().split(" ");

            var processParts = parts[parts.length - 1].split("-");

            var processCode = processParts[0] + "-" + processParts[1];

            var lcNo = processParts[2];

            console.log("LCno", lcNo);

            var displayMessage = parts.slice(0, -1).join(" ");

            var L = displayMessage + " LC: " + lcNo;

            notify("success", "Success Messsage", L);

            console.log("Upload PROCESSCODE:", processCode);

            UploadFileUsingAPI(processCode);

            $scope.edetailsbyid = null;
            $scope.detailsbyid = null;
            $scope.GetLCData();
            $scope.Clear();
            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else {
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

    //if ($("#etxtCreatedPlace").val() == "") {
    //    isAllValid = false;
    //    $("#etxtCreatedPlace").siblings('span.error').css('visibility', 'visible');
    //}
    //else {
    //    $("#etxtCreatedPlace").siblings('span.error').css('visibility', 'hidden');
    //}
    $("#etxtCreatedPlace").siblings("span.error").css("visibility", "hidden");

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
      console.log("PROCESS", $("#lcid").val(), $("#etxtLCNumber").val());
      //return
      $.ajax({
        type: "POST",
        url: "/LC/Update",
        dataType: "json",
        data: { lc: master },
        success: function (result) {
          //$scope.UploadFile(result);
          notify("success", "Success Messsage", result);

          var processCode = "LC-" + $("#lcid").val();

          console.log("UPDATE Upload PROCESSCODE:", processCode);

          //UploadFileUsingAPI(processCode);
          EditFileUsingAPI(processCode);

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
