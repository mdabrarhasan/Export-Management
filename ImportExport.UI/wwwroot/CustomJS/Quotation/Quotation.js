/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  $scope.PrintDoc = function () {
    printElement(document.getElementById("printThis"));
  };

  function printElement(elem) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
      var $printSection = document.createElement("div");
      $printSection.id = "printSection";
      document.body.appendChild($printSection);
    }

    $printSection.innerHTML = "";
    $printSection.appendChild(domClone);
    window.print();
  }

  $(".sq").hide();
  $(".pi").show();
  $(".capp").hide();
  $(".spot").hide();

  $(".sqlandingview").hide();
  $(".pilandingview").hide();
  $(".conapplandingview").hide();

  $scope.Print = function (id) {
    $scope.HeaderPrint(id);
    $scope.LinePrint(id);
  };

  $scope.HeaderPrint = function (id) {
    var typeid = $("#sqtypeidhid").val();

    if (typeid == 135) {
      $("#PrintexampleModalFullscreen").modal("hide");
      var rooturl = "";
      var folder = "/EXPORT/Common/ProformaInvoice";
      var url =
        rooturl + folder + "&ID=" + id + "&rs:Embed=true&rc:LinkTarget=_self";
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
    } else {
      $scope.ID = id;
      typeid = $("#quotationid").val();

      $http({
        method: "get",
        url: "/Quotation/GetHeaderPrint",
        params: { id: $scope.ID, typeid: typeid },
      }).then(function (response) {
        console.log("Need this");
        console.log(response);

        document.getElementById("cusname").innerText =
          response.data[0].customername;
        document.getElementById("cusaddress").innerText =
          response.data[0].cusaddress;
        document.getElementById("regno").innerText = response.data[0].vatregno;
        document.getElementById("hscode").innerText = response.data[0].hscode;
        document.getElementById("productname").innerText =
          response.data[0].productHScodeName;

        document.getElementById("totalamtwords").innerText =
          response.data[0].totalamountinwords;

        document.getElementById("date").innerText = response.data[0].date;
        document.getElementById("expdate").innerText =
          response.data[0].expiredate;
        document.getElementById("invoiceno").innerText =
          response.data[0].quotationnumber;
        document.getElementById("cusid").innerText =
          response.data[0].customerid;
        document.getElementById("shippingmode").innerText =
          response.data[0].shippingmode;
        document.getElementById("modeoftransportation").innerText =
          response.data[0].modeoftransportation;
        document.getElementById("netweight").innerText =
          response.data[0].netweight;

        document.getElementById("terms").innerText =
          response.data[0].termscondition;
      });
    }
  };

  $scope.LinePrint = function (id) {
    //var typeid = $('#sqtypeidhid').val();
    //alert(typeid)
    //if (typeid == 136) {
    $scope.ID = id;
    var total = 0.0;
    let formattedAmount = "";
    $http({
      method: "get",
      url: "/Quotation/GetLinePrint",
      params: { id: $scope.ID },
    }).then(function (data) {
      $scope.lineprint = null;
      $scope.lineprint = data.data;

      for (var i = 0; i < data.data.length; i++) {
        total = parseFloat(total) + parseFloat(data.data[i].totalamount);
        formattedAmount = total.toLocaleString("en-US");
        console.log(formattedAmount);
      }

      document.getElementById("totalamt").innerText = formattedAmount;
    });
    /*}*/
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

  $scope.delToleranceList = function () {
    $http({
      method: "get",
      url: "/Common/GetTolarance",
    }).then(function (response) {
      // console.log(response);
      $scope.todelllist = response.data;
    });
  };

  $scope.GetTermsAndCondition = function () {
    $http({
      method: "get",
      url: "/Common/GetTermsAndCondition",
    })
      .then(function (response) {
        const textField = document.getElementById("termscon");
        textField.value = "";

        if (!response.data || response.data.length === 0) {
          textField.value = "No terms and conditions available.";
          return;
        }
        //console.log(response.data)
        //$('#termscon').val(response.data[0].name);

        let index = 1;
        for (let i = 0; i < response.data.length; i++) {
          const newValue = response.data[i].name;
          textField.value += `${index}) ${newValue}\n`;
          index++;
        }
      })
      .catch(function (error) {
        console.error("Error fetching terms and conditions:", error);
      });
  };

  // $scope.GetTermsAndCondition();

  $scope.UploadExcel = function () {
    var fileInput = $("#fileInput")[0].files[0];
    if (!fileInput) {
      alert("Please select a file before uploading.");
      return;
    }
    var inputdata = null;

    var fd = new FormData();
    fd.append("uploadFile", $("#fileInput")[0].files[0]);
    inputdata = fd;

    inputdata.skipAjaxPrefilter = true;

    $.ajax({
      type: "Post",
      url: "/Quotation/FileUpload",
      data: inputdata,
      processData: false,
      contentType: false,
      traditional: true,
      async: true,
      success: function (data) {},
      error: function () {},
    });

    $scope.GetExcelData();
  };

  $scope.GetExcelData = function () {
    $http({
      method: "get",
      url: "/Quotation/GetExcelData",
    }).then(function (response) {
      $scope.ocflist = null;
      $scope.ocflist = response.data;
    });
  };

  $scope.GetFGUOM = function () {
    $http({
      method: "get",
      url: "/Quotation/GetFGUOM",
    }).then(function (response) {
      $scope.fguomlist = response.data;
    });
  };

  $scope.ToleranceList = function () {
    $http({
      method: "get",
      url: "/Common/GetTolarance",
    }).then(function (response) {
      console.log(response);
      $scope.tollist = response.data;
    });
  };

  $scope.GetSalesType = function () {
    $http({
      method: "get",
      url: "/Common/GetSalesType",
    }).then(function (response) {
      $scope.salestypelist = response.data;
    });
  };

  $scope.BuyerBankInfo = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetBuyerBankInfo",
    }).then(function (response) {
      $scope.buyerbanklist = response.data;
    });
  };

  $scope.GetCreditType = function () {
    $http({
      method: "get",
      url: "/Common/GetCreditType",
    }).then(function (response) {
      $scope.credittypelist = response.data;
    });
  };

  $scope.GetTreatmentDirection = function () {
    $http({
      method: "get",
      url: "/Quotation/GetTreatmentDirection",
    }).then(function (response) {
      $scope.treatmentdirectionlist = response.data;
    });
  };

  $scope.GetBiaxFlimCore = function () {
    $http({
      method: "get",
      url: "/Quotation/GetBiaxFlimCore",
    }).then(function (response) {
      $scope.flimcorelist = response.data;
    });
  };

  $scope.GetWHName = function () {
    $http({
      method: "get",
      url: "/Quotation/GetWHName",
    }).then(function (response) {
      $scope.whlist = response.data;
    });

    $scope.whid = "1";
  };

  $scope.GetQuotationList = function () {
    $http({
      method: "GET",
      url: "/Quotation/GetQuotationList",
    }).success(function (result) {
      $scope.quotationlist = result;
      //$scope.loading = false;
      // $scope.GetTermsAndCondition();
    });

    //  $scope.selectedItemValue = "1";
  };

  $scope.GetQuotationHeading = function () {
    var selectedId = parseInt($("#quotationid").val());

    var item = $scope.quotationlist.find(function (x) {
      return x.id == selectedId;
    });

    return item ? item.name : "";
  };

  $scope.showRow = true;
  $scope.Getchangetype = function () {
    // alert($("#pitypeid").val())
    if ($("#pitypeid").val() === "135") {
      $("#tfromshiplable").text("Through Shipment:");
      // $scope.showRow = true;
      $("#txtorderrefno").hide();
      $("#txtLorderrefno").hide();
    } else {
      $("#tfromshiplable").text("From Shipment :");
      // $scope.showRow = false;
      $("#txtorderrefno").show();
      $("#txtLorderrefno").show();
    }
  };
  $scope.EGetchangetype = function () {
    // alert($("#pitypeid").val())
    if ($("#epitypeid").val() === "135") {
      $("#etextlabelchage").text("Through Shipment:");
      $scope.eshowRow = true;
    } else {
      $("#etextlabelchage").text("From Shipment :");
      $scope.eshowRow = false;
    }
  };
  $scope.EnabledDisabled = function () {
    //1	Proforma Invoice
    //2	Sales Quotation
    //3	Sport Order
    //console.log('CALL')
    //4	Conditional Approval
    // console.log($("#quotationtypeid").val())
    // alert($("#quotationtypeid").val());
    // $scope.GetTermsAndCondition();

    if ($("#quotationtypeid").val() === "1") {
      $(".sq").hide();
      $(".capp").hide();
      $(".spot").hide();
      $(".pi").show();
      $("#txtBuyerName").prop("disabled", false);
      $("#txtOCFNO").prop("disabled", false);
      $scope.GetTermsAndCondition();
    } else if ($("#quotationtypeid").val() === "2") {
      $(".pi").hide();
      $(".sq").show();
      $(".spot").hide();
      $(".capp").hide();
      $("#txtBuyerName").prop("disabled", false);
      $scope.GetTermsAndCondition();
    } else if ($("#quotationtypeid").val() === "3") {
      $(".pi").hide();
      $(".sq").hide();
      $(".spot").show();
      $(".capp").hide();
      $("#txtBuyerName").prop("disabled", false);
      $("#txtOCFNO").prop("disabled", false);
      $scope.GetTermsAndCondition();
    } else if ($("#quotationtypeid").val() === "4") {
      $(".pi").hide();
      $(".sq").hide();
      $(".spot").hide();
      $(".capp").show();
      $("#txtBuyerName").prop("disabled", true);
      $("#txtOCFNO").prop("disabled", true);
      $scope.GetTermsAndCondition();
    }
  };

  $scope.SQType = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetSQType",
      params: { unitid: 91 },
    }).then(function (response) {
      $scope.sqtypelist = response.data;
    });
  };

  $scope.GetData = function () {
    $http({
      method: "get",
      url: "/Quotation/GetQuotationAll",
      params: { typeid: $("#quotationid").val() },
    }).then(function (response) {
      $scope.pilist = null;
      $scope.sqlist = null;
      $scope.spotlist = null;
      $scope.conditionalapplistview = null;

      if ($("#quotationid").val() === "1") {
        $(".sqlandingview").hide();
        $(".pilandingview").show();
        $(".conapplandingview").hide();
        $(".spotlandingview").hide();
        $scope.pilist = response.data;
      } else if ($("#quotationid").val() === "2") {
        $(".sqlandingview").show();
        $(".pilandingview").hide();
        $(".conapplandingview").hide();
        $(".spotlandingview").hide();
        $scope.sqlist = response.data;
        console.log(response.data);
      } else if ($("#quotationid").val() === "3") {
        $(".conapplandingview").hide();
        $(".sqlandingview").hide();
        $(".pilandingview").hide();
        $(".spotlandingview").show();
        $scope.spotlist = response.data;
      } else if ($("#quotationid").val() === "4") {
        $(".conapplandingview").show();
        $(".sqlandingview").hide();
        $(".pilandingview").hide();
        $(".spotlandingview").hide();
        $scope.conditionalapplistview = response.data;
      }
    });
  };

  $scope.ViewByMasterID = function (ID, aggtypeid) {
    $scope.ID = ID;
    $scope.TYPEID = $("#quotationid").val();
    $("#lblquotationtype").text($("#quotationid option:selected").text());

    $http({
      method: "GET",
      url: "/Quotation/GetQuotationAllView",
      params: { typeid: $scope.TYPEID, id: $scope.ID },
    }).success(function (data) {
      $scope.pilistview = null;
      $scope.sqlistview = null;
      $scope.spotlistview = null;
      $scope.conditionalapplist = null;

      if ($("#quotationid").val() === "1") {
        $(".sqview").hide();
        $(".piview").show();
        $(".conappview").hide();
        $(".spotview").hide();
        // alert(data[0].pitypeid)

        if (data[0]?.pitypeid === "2") {
          // Optional chaining to avoid errors if data[0] is undefined
          $("#txtshipmentlabelchange").text("Through Shipment:");
        } else {
          $("#txtshipmentlabelchange").text("From Shipment :");
        }

        $scope.pilistview = data;
      } else if ($("#quotationid").val() === "2") {
        $(".sqview").show();
        $(".piview").hide();
        $(".conappview").hide();
        $(".spotview").hide();
        $scope.sqlistview = data;
      } else if ($("#quotationid").val() === "3") {
        $(".sqview").hide();
        $(".piview").hide();
        $(".conappview").hide();
        $(".spotview").show();
        $scope.spotlistview = data;
      } else if ($("#quotationid").val() === "4") {
        $(".sqview").hide();
        $(".piview").hide();
        $(".conappview").show();
        $(".spotview").hide();
        $scope.conditionalapplist = data;
      }
    });

    $scope.ViewByDetailsID(ID);
    $scope.LoadDocument(ID);
    //$scope.ViewLoadDocumentStatus(ID, $scope.TYPEID);
  };

  $scope.ViewByDetailsID = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/Quotation/OCFListView",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.viewdetailsbyid = null;
      $scope.viewdetailsbyid = result;
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
      console.log(response);
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
  $scope.CalculateLine = function (index, id) {
    $scope.DiscountPercentageCalculateLine(index, id);
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
      params: { id: $scope.DiscountID },
    }).then(function (response) {
      var total =
        parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());
      if (response.data[0] === undefined) {
        $("#totalamount").val(
          (isNaN(total + parseFloat($("#vatamount").val()))
            ? 0
            : total + parseFloat($("#vatamount").val())
          ).toFixed(4),
        );
      } else if (response.data[0].code === "WD") {
        $("#totalamount").val(
          (isNaN(total - parseFloat($("#discountamount").val()))
            ? 0
            : total - parseFloat($("#discountamount").val())
          ).toFixed(4),
        );
      } else if ($("#discountid").val() === "") {
        $("#discountamount").val("0");
        $("#totalamount").val(isNaN(total) ? 0 : total);
      } else {
        var totaldiscount = (response.data[0].disValue / 100) * total;

        //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
        $("#discountamount").val(
          isNaN(totaldiscount.toFixed(4)) ? 0 : totaldiscount.toFixed(4),
        );

        //var total = parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());
        $("#totalamount").val(
          isNaN(total - totaldiscount) ? 0 : total - totaldiscount,
        );
      }
    });
  };
  $scope.EDITDiscountPercentageCalculate = function (index) {
    var total =
      parseFloat($("#equantity" + index).val()) *
      parseFloat($("#eunitprice" + index).val());

    $("#etotalamount" + index).val(
      (isNaN(
        parseFloat(total) - parseFloat($("#ediscountamount" + index).val()),
      )
        ? 0
        : parseFloat(total) - parseFloat($("#ediscountamount" + index).val())
      ).toFixed(4),
    );
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
        $("#etotalamount").val(
          (isNaN(total + parseFloat($("#evatamount").val()))
            ? 0
            : total + parseFloat($("#evatamount").val())
          ).toFixed(4),
        );
      } else if (response.data[0].code === "WD") {
        $("#etotalamount").val(
          (isNaN(total - parseFloat($("#ediscountamount").val()))
            ? 0
            : total - parseFloat($("#ediscountamount").val())
          ).toFixed(4),
        );
      } else {
        var total =
          parseFloat($("#equantity").val()) *
          parseFloat($("#eunitprice").val());
        var totaldiscount = (response.data[0].disValue / 100) * total;
        //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
        $("#ediscountamount").val(isNaN(totaldiscount) ? 0 : totaldiscount);

        $("#etotalamount").val(
          (isNaN(total + parseFloat($("#evatamount").val()) - totaldiscount)
            ? 0
            : total + parseFloat($("#evatamount").val()) - totaldiscount
          ).toFixed(4),
        );
      }
    });
  };

  $scope.EDiscountPercentageCalculateLine = function (index, discountid) {
    $("#ediscountamount" + index).prop("disabled", false);

    if ($("#ediscountid" + index).val() != "3") {
      $("#ediscountamount" + index).prop("disabled", true);
      if (discountid == 0 || discountid === null) {
        var total =
          parseFloat($("#equantity" + index).val()) *
          parseFloat($("#eunitprice" + index).val());

        $("#ediscountamount" + index).val("0");
        $("#etotalamount" + index).val((isNaN(total) ? 0 : total).toFixed(4));
      } else {
        $http({
          method: "get",
          url: "/SalesQuatationLanding/GetDisCal",
          params: { id: discountid },
        }).then(function (response) {
          var total =
            parseFloat($("#equantity" + index).val()) *
            parseFloat($("#eunitprice" + index).val());

          if (response.data[0] === undefined) {
            $("#etotalamount" + index).val(
              (isNaN(total + parseFloat($("#evatamount" + index).val()))
                ? 0
                : total + parseFloat($("#evatamount" + index).val())
              ).toFixed(4),
            );
          } else if (response.data[0].code === "WD") {
            $("#etotalamount" + index).val(
              (isNaN(total - parseFloat($("#ediscountamount" + index).val()))
                ? 0
                : total - parseFloat($("#ediscountamount" + index).val())
              ).toFixed(4),
            );
          } else {
            var totaldiscount = (response.data[0].disValue / 100) * total;

            //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
            $("#ediscountamount" + index).val(
              isNaN(totaldiscount) ? 0 : totaldiscount.toFixed(4),
            );

            $("#etotalamount" + index).val(
              isNaN(total - totaldiscount)
                ? 0
                : total - totaldiscount.toFixed(4),
            );
          }
        });
      }
    } else {
      var total =
        parseFloat($("#equantity" + index).val()) *
        parseFloat($("#eunitprice" + index).val());
      $("#etotalamount" + index).val(
        (isNaN(total - parseFloat($("#ediscountamount" + index).val()))
          ? 0
          : total - parseFloat($("#ediscountamount" + index).val())
        ).toFixed(4),
      );
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

          $("#totalamount").val(
            isNaN(totalvatamount.toFixed(4)) ? 0 : totalvatamount.toFixed(4),
          );
        } else {
          $("#discountamount").attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          //var totaldisamount = disamount;
          $("#discountamount").val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total + parseFloat($("#vatamount").val()) - disamount;

          $("#totalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };
  $scope.DisCalLine = function (index, id) {
    if (id == 0 || id == null) {
      $("#discountamount" + index).prop("disabled", true);
      $("#discountamount" + index).val(0);
      var total =
        parseFloat($("#quantity" + index).val()) *
        parseFloat($("#unitprice" + index).val());
      $("#totalamount" + index).val(total);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: id },
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
          $("#discountamount" + index).prop("disabled", false);
          $("#discountamount" + index).val(0);
          var total =
            parseFloat($("#quantity" + index).val()) *
            parseFloat($("#unitprice" + index).val());
          $("#totalamount" + index).val(
            (isNaN(total - parseFloat($("#discountamount" + index).val()))
              ? 0
              : total - parseFloat($("#discountamount" + index).val())
            ).toFixed(4),
          );
        } else {
          $("#discountamount" + index).attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          $("#discountamount" + index).val(isNaN(disamount) ? 0 : disamount);
          var vat_dis = total - disamount;
          $("#totalamount" + index).val(isNaN(vat_dis) ? 0 : vat_dis);
        }
      });
    }
  };

  $scope.EditDisCal = function () {
    if ($("#ediscountid").val() == "") {
      $("#ediscountamount").prop("disabled", true);
      $("#ediscountamount").val(0);
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
          var totalvatamount = total - parseFloat($("#discountamount").val());
          $("#etotalamount").val(
            isNaN(totalvatamount.toFixed(4)) ? 0 : totalvatamount.toFixed(4),
          );
        } else {
          $("#ediscountamount").attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          //var totaldisamount = disamount;
          $("#ediscountamount").val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total + parseFloat($("#evatamount").val()) - disamount;

          $("#etotalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };
  $scope.EditDisCalLine = function (index, id) {
    if ($("#ediscountid" + index).val() == "") {
      $("#ediscountamount" + index).prop("disabled", true);
      $("#ediscountamount" + index).val(0);
      var total =
        parseFloat($("#equantity" + index).val()) *
        parseFloat($("#eunitprice" + index).val());
      $("#etotalamount" + index)
        .val(total)
        .toFixed(4);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: id },
      }).then(function (response) {
        var total =
          parseFloat($("#equantity" + index).val()) *
          parseFloat($("#eunitprice" + index).val());

        if (response.data[0].code === "WD") {
          $("#ediscountamount" + index).prop("disabled", false);
          $("#ediscountamount" + index).val(0);
          var total =
            parseFloat($("#equantity" + index).val()) *
            parseFloat($("#eunitprice" + index).val());
          $("#etotalamount" + index).val(
            (isNaN(total - parseFloat($("#ediscountamount" + index).val()))
              ? 0
              : total - parseFloat($("#ediscountamount" + index).val())
            ).toFixed(4),
          );

          //$("#ediscountamount" + index).prop("disabled", false);
          //$("#ediscountamount" + index).val(0);
          //var totalvatamount = total + parseFloat($("#discountamount" + index).val());
          //$("#etotalamount" + index).val(isNaN(totalvatamount.toFixed(4)) ? 0 : totalvatamount.toFixed(4));
        } else {
          $("#ediscountamount" + index).attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          //var totaldisamount = disamount;
          $("#ediscountamount" + index).val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          var vat_dis =
            total + parseFloat($("#evatamount" + index).val()) - disamount;

          $("#etotalamount" + index).val(
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
    if ($("#equotationtypeid").val() === "1") {
      if ($("#etxtBuyerName").val() == "") {
        isAllValid = false;
        $("#etxtBuyerName").siblings("span.error").css("visibility", "visible");
      } else {
        $("#etxtBuyerName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#etxtDate").val() == "") {
        isAllValid = false;
        $("#etxtDate").siblings("span.error").css("visibility", "visible");
      } else {
        $("#etxtDate").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#etxtPIExpireDate").val() == "") {
        isAllValid = false;
        $("#etxtPIExpireDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#etxtPIExpireDate")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#etxtHSCode").val() == "") {
        isAllValid = false;
        $("#etxtHSCode").siblings("span.error").css("visibility", "visible");
      } else {
        $("#etxtHSCode").siblings("span.error").css("visibility", "hidden");
      }

      //if ($("#etxtshipmentmodeid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtshipmentmodeid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtshipmentmodeid").siblings('span.error').css('visibility', 'hidden');
      //}

      if ($("#etxtcurrencyid").val() == "") {
        isAllValid = false;
        $("#etxtcurrencyid")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#etxtcurrencyid").siblings("span.error").css("visibility", "hidden");
      }

      //if ($("#etxtincotermid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtincotermid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtincotermid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtcurrencyid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtcurrencyid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtcurrencyid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtBuyerRegNo").val() == "") {
      //    isAllValid = false;
      //    $("#etxtBuyerRegNo").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtBuyerRegNo").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtpaymenttermid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtpaymenttermid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtpaymenttermid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtloadingport").val() == "") {
      //    isAllValid = false;
      //    $("#etxtloadingport").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtloadingport").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtdischargeloadingport").val() == "") {
      //    isAllValid = false;
      //    $("#etxtdischargeloadingport").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtdischargeloadingport").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#edeliverytermid").val() == "") {
      //    isAllValid = false;
      //    $("#edeliverytermid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#edeliverytermid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#edeliverytermid").val() == "") {
      //    isAllValid = false;
      //    $("#edeliverytermid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#edeliverytermid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#eagreementtypeid").val() == "") {
      //    isAllValid = false;
      //    $("#eagreementtypeid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#eagreementtypeid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtFromshipmentcountryid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtFromshipmentcountryid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtFromshipmentcountryid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtToshipmentcountryid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtToshipmentcountryid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtToshipmentcountryid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtShipmentDate").val() == "") {
      //    isAllValid = false;
      //    $("#etxtShipmentDate").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtShipmentDate").siblings('span.error').css('visibility', 'hidden');
      //}

      if ($("#etxttransportmodeid").val() == "") {
        isAllValid = false;
        $("#etxttransportmodeid")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#etxttransportmodeid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      //if ($("#esellerbankid").val() == "") {
      //    isAllValid = false;
      //    $("#esellerbankid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#esellerbankid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtcurrencyid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtcurrencyid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtcurrencyid").siblings('span.error').css('visibility', 'hidden');
      //}

      //if ($("#etxtpaymenttermid").val() == "") {
      //    isAllValid = false;
      //    $("#etxtpaymenttermid").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#etxtpaymenttermid").siblings('span.error').css('visibility', 'hidden');
      //}
      //if ($("#eloadingplace").val() == "") {
      //    isAllValid = false;
      //    $("#eloadingplace").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#eloadingplace").siblings('span.error').css('visibility', 'hidden');
      //}
      if ($("#edeliveryby").val() == "") {
        isAllValid = false;
        $("#edeliveryby").siblings("span.error").css("visibility", "visible");
      } else {
        $("#edeliveryby").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#quotationid").val() === "1") {
        var master = {
          ID: $("#editsqnumber").val(),
          QUOTATIONTYPEID: $("#equotationtypeid").val(),
          CUSTOMERID: $("#ehcusid").val(),
          ISEXCEL: 0,
          DATE: $("#etxtDate").val(),
          EXPIREDATE: $("#etxtPIExpireDate").val(),
          SHIPMENTDATE: $("#etxtShipmentDate").val(),
          SHIPMENTMODEID: $("#etxtshipmentmodeid").val(),
          PAYMENTTERMID: $("#etxtpaymenttermid").val(),
          DELIVERYTERMID: $("#edeliverytermid").val(),
          TERMSCONDITION: $("#etermscon").val(),

          TOSHIPMENTCOUNTRYID: $("#etxtToshipmentcountryid").val(),
          FROMSHIPMENTCOUNTRYID: $("#etxtFromshipmentcountryid").val(),

          FROMSHIPMENTPORTID: $("#etxtloadingport").val(),
          TODISCHARGEPORT: $("#etxtdischargeloadingport").val(),

          TARRIFCODE: $("#etxtTariffCode").val(),
          BUYERREGNO: $("#etxtBuyerRegNo").val(),
          HSCODE: $("#etxtHSCode").val(),
          INTOTERM: $("#etxtincotermid").val(),
          CURRENCYID: $("#etxtcurrencyid").val(),
          DESCRIPTIONS: $("#edescription").val(),

          FREEINCOTERM: $("#etxtfreeincoterm").val(),
          FREEPAYMENTTERM: $("#etxtfreepaymentterm").val(),
          TOLARENCEID: $("#etxttoleranceid").val(),
          DELPOINTID: $("#edelPointId").val(),

          BUYERBANKDETAILS: $("#etxtBuyerBank").val(),
          SELLERBANKID: $("#esellerbankid").val(),
          BUYERBANKID: $("#ebuyerbankid").val(),
          BUYERCOUNTRYHSCODE: $("#etxtBuyerHSCode").val(),
          LOADINGPLACE: $("#eloadingplace").val(),
          DELIVERYBY: $("#edeliveryby").val(),
          TRANSHIPMENT: $("#etranshipmentid").val(),
          PARTIALSHIPMENT: $("#etxtpartialshipmentid").val(),
          ORIGINOFCOUNTRY: $("#etxtOriginCountry").val(),
          BUYERORDERCONFIRMDATE: $("#etxtOrderDate").val(),
          NOTIFYPARTY: $("#etxtNotifyParty").val(),
          OTHERSPAYTERM: $("#etxtPaytermothers").val(),
          UNITID: $("#etxtTariffCodehidden").val(),

          SALESTYPEID: $("#esalestypeid").val(),
          CREDITTYPEID: $("#ecredittypeid").val(),
          CREDITDAYS: $("#etxtCreditDays").val(),
          PITYPEID: $("#epitypeid").val(),
        };

        $.ajax({
          type: "POST",
          url: "/Quotation/UpdatePI",
          dataType: "json",
          data: { PI: master },
          success: function (result) {
            //$scope.EUploadFile(result);
            notify("success", "Success Message", result);
            UploadFileUsingAPI(result.split(":")[1]);
            $scope.Clear();
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      } else if ($("#quotationid").val() === "2") {
        var master = {
          ID: $("#editsqnumber").val(),
          SQTYPEID: $("#esqtypeid").val(),
          EXPIREDATE: $("#etxtExpireDate").val(),
          DESCRIPTIONS: $("#edescription").val(),
          TERMSCONDITION: $("#etermscon").val(),
          SALESTYPEID: $("#esalestypeid").val(),
          CREDITTYPEID: $("#ecredittypeid").val(),
          CREDITDAYS: $("#etxtCreditDays").val(),
        };

        $.ajax({
          type: "POST",
          url: "/Quotation/UpdateSQ",
          dataType: "json",
          data: { PI: master },
          success: function (result) {
            //$scope.EUploadFile(result);
            notify("success", "Success Message", result);
            UploadFileUsingAPI(result.split(":")[1]);
            $scope.Clear();
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      } else if ($("#eagreementid").val() === "3") {
      } else if ($("#eagreementid").val() === "4") {
        var master = {
          ID: $("#editsqnumber").val(),
          SQTYPEID: $("#esqtypeid").val(),
          EXPIREDATE: $("#etxtExpireDate").val(),
          DESCRIPTIONS: $("#edescription").val(),
          TERMSCONDITION: $("#etermscon").val(),
          SALESTYPEID: $("#esalestypeid").val(),
          CREDITTYPEID: $("#ecredittypeid").val(),
          CREDITDAYS: $("#etxtCreditDays").val(),
        };

        $.ajax({
          type: "POST",
          url: "/Quotation/UpdateConApp",
          dataType: "json",
          data: { PI: master },
          success: function (result) {
            //$scope.EUploadFile(result);
            notify("success", "Success Message", result);
            UploadFileUsingAPI(result.split(":")[1]);
            $scope.Clear();
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else if ($("#equotationtypeid").val() === "2") {
      if ($("#esqtypeid").val() == "") {
        isAllValid = true;
        $("#esqtypeid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#esqtypeid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#etxtExpireDate").val() == "") {
        isAllValid = false;
        $("#etxtExpireDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#etxtExpireDate").siblings("span.error").css("visibility", "hidden");
      }

      var master = {
        ID: $("#editsqnumber").val(),
        SQTYPEID: $("#esqtypeid").val(),
        EXPIREDATE: $("#etxtExpireDate").val(),
        DESCRIPTIONS: $("#edescription").val(),
        TERMSCONDITION: $("#etermscon").val(),
        SALESTYPEID: $("#esalestypeid").val(),
        CREDITTYPEID: $("#ecredittypeid").val(),
        CREDITDAYS: $("#etxtCreditDays").val(),
      };

      if (isAllValid) {
        $.ajax({
          type: "POST",
          url: "/Quotation/UpdateSQ",
          dataType: "json",
          data: { SQ: master },
          success: function (result) {
            notify("success", "Success Messsage", result);
            UploadFileUsingAPI(result.split(":")[1]);
            //$scope.PIList();
            //$scope.GetSalesQuotation();
            $scope.Clear();
            $scope.detailsbyid = null;
            //var rowCount = editmycontainer.rows.length;
            //for (var i = rowCount - 1; i > 0; i--) {
            //    editmycontainer.deleteRow(i);
            //}
            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else if ($("#equotationtypeid").val() === "3") {
      if ($("#etxtBuyerName").val() == "") {
        isAllValid = false;
        $("#etxtBuyerName").siblings("span.error").css("visibility", "visible");
      } else {
        $("#etxtBuyerName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#etxtSpotDODate").val() == "") {
        isAllValid = false;
        $("#etxtSpotDODate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#etxtSpotDODate").siblings("span.error").css("visibility", "hidden");
      }

      if (isAllValid) {
        var master = {
          ID: $("#editsqnumber").val(),
          QUOTATIONTYPEID: $("#equotationtypeid").val(),
          SPOTDATE: $("#etxtSpotDate").val(),
          LASTDATEOFDO: $("#etxtSpotDODate").val(),
          DESCRIPTIONS: $("#edescription").val(),
          TERMSCONDITION: $("#etermscon").val(),
          SALESTYPEID: $("#esalestypeid").val(),
          CREDITTYPEID: $("#ecredittypeid").val(),
          CREDITDAYS: $("#etxtCreditDays").val(),
        };

        $.ajax({
          type: "POST",
          url: "/Quotation/UpdateSpot",
          dataType: "json",
          data: { SQ: master },
          success: function (result) {
            notify("success", "Success Messsage", result);

            //UploadFileUsingAPI(result.split(':')[1]);
            //$scope.PIList();
            //$scope.GetSalesQuotation();
            //$("#detailsItems").empty();
            //$scope.Clear();
            //$scope.detailsbyid = null;
            //$scope.GetData();
            //var rowCount = editmycontainer.rows.length;
            //for (var i = rowCount - 1; i > 0; i--) {
            //    editmycontainer.deleteRow(i);
            //}
            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else if ($("#equotationtypeid").val() === "4") {
      isAllValid = true;
      if ($("#ewhid").val() == "") {
        isAllValid = false;
        $("#ewhid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#ewhid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#etxtCAppStartDate").val() == "") {
        isAllValid = false;
        $("#etxtCAppStartDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#etxtCAppStartDate")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#etxtCAppEndDate").val() == "") {
        isAllValid = false;
        $("#etxtCAppEndDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#etxtCAppEndDate")
          .siblings("span.error")
          .css("visibility", "hidden");
      }
      if (isAllValid) {
        var master = {
          ID: $("#editsqnumber").val(),
          QUOTATIONTYPEID: $("#equotationtypeid").val(),
          ISEXCEL: 0,
          WHID: $("#ewhid").val(),
          CONAPPSTATRDATE: $("#etxtCAppStartDate").val(),
          CONAPPENDDATE: $("#etxtCAppEndDate").val(),
          DESCRIPTIONS: $("#edescription").val(),
          TERMSCONDITION: $("#etermscon").val(),
          SALESTYPEID: $("#esalestypeid").val(),
          CREDITTYPEID: $("#ecredittypeid").val(),
          CREDITDAYS: $("#etxtCreditDays").val(),
        };

        $.ajax({
          type: "POST",
          url: "/Quotation/UpdateConApp",
          dataType: "json",
          data: { SQ: master },
          success: function (result) {
            notify("success", "Success Messsage", result);

            //UploadFileUsingAPI(result.split(':')[1]);
            //$scope.PIList();
            //$scope.GetSalesQuotation();
            $scope.Clear();
            $scope.detailsbyid = null;
            $("#detailsItems").empty();
            $scope.GetData();
            //var rowCount = editmycontainer.rows.length;
            //for (var i = rowCount - 1; i > 0; i--) {
            //    editmycontainer.deleteRow(i);
            //}
            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    }
  };

  $scope.Details = function () {};

  $scope.UpdateByLineID = function (
    i,
    id,
    uomid,
    treatmentdirectionid,
    coreid,
    discountid,
    toleranceid,
  ) {
    var isAllValid = true;
    var Details = [];
    // alert($("#eunitprice" + i).val())
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
    } else {
      $("#eitemcode" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#ethikness" + i).val() == "" || $("#ethikness" + i).val() === "0") {
      isAllValid = false;
      $("#ethikness" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#ethikness" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#euomid" + i).val() == "") {
      isAllValid = false;
      $("#euomid" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#euomid" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#equantity" + i).val() == "" || $("#quantity" + i).val() === "0") {
      isAllValid = false;
      $("#equantity" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#equantity" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    //if ($("#eunitprice" + i).val() == "" || $("#eunitprice" + i).val() === '0') {
    //    isAllValid = false;
    //    $("#eunitprice" + i).siblings('span.error').css('visibility', 'visible');
    //}
    //else {
    //    $("#eunitprice" + i).siblings('span.error').css('visibility', 'hidden');
    //}

    if (isAllValid) {
      var details = {
        ITEMID: $("#eitemcode" + i).val(),
        HSCODE: $("#hscodeline" + i).val(),
        QUANTITY: parseFloat($("#equantity" + i).val()),
        PRICE: parseFloat($("#eunitprice" + i).val()),
        VATID: parseInt($("#evatid" + i).val()),
        VATAMOUNT: parseFloat($("#evatamount" + i).val()),
        DISCOUNTID: discountid,
        DISCOUNT: parseFloat($("#ediscountamount" + i).val()),
        TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()),
        TOLERANCEID: toleranceid,
        DESCRIPTIONS: $("#eshortdetails" + i).val(),
        REMARKS: $("#eremarks" + i).val(),
        FROMSHIPMENTSCHEDULEDATE: $("#elifromshipmentscdate" + i).val(),
        TOSHIPMENTSCHEDULEDATE: $("#elitoshipmentscdate" + i).val(),

        UOMID: uomid,
        THIKNESS: $("#ethikness" + i).val(),
        WIDTH: $("#ewidth" + i).val(),
        LENGTH: $("#elength" + i).val(),
        TREATMENTLEVEL: $("#etreatmentlevel" + i).val(),
        TREATMENTDIRECTIONID: treatmentdirectionid,
        COREID: coreid,
        REALOD: $("#erealod" + i).val(),
        DISEREDDATEOFDELIVERY: $("#edateofdelivery" + i).val(),
        TENTATIVEDATEOFDELIVERY: $("#etentativedelivery" + i).val(),
      };

      Details.push(details);
      console.log(Details);
      $.ajax({
        type: "POST",
        url: "/Quotation/UpdateLine",
        dataType: "json",
        data: { details: Details, ID: id },
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
        url: "/Quotation/DeleteMasterByID",
        params: { id: lineid, aggtypeid: aggtypeid },
      }).then(function (response) {
        $scope.GetData();
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.DeleteByLineID = function (lineid) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/Quotation/DeleteByLineByID",
        params: { id: lineid },
      }).then(function (response) {
        $scope.EditbyDetailsID($("#editsqnumber").val());
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.EnabledDisabledExcel = function () {
    if ($("#excel").val() == "1") {
      $("#add").prop("disabled", true);
      $("#imodel").prop("disabled", false);
      $("#txtOCFNO").prop("disabled", true);
      $("#txtOCFNO").val("");
      // $("#detailsItems").empty();
      // $("#ocflist").empty();
      const table = document.getElementById("ocflist");
      const tbody = table.querySelector("tbody > tr");
      // Remove all rows in tbody
      tbody.innerHTML = "";
    } else if ($("#excel").val() == "2") {
      $("#txtOCFNO").prop("disabled", true);
      $("#add").prop("disabled", false);
      $("#imodel").prop("disabled", true);
      // $("#detailsItems").empty();
      //  $("#ocflist").empty();
      const table = document.getElementById("ocflist");
      const tbody = table.querySelector("tbody > tr");
      // Remove all rows in tbody
      tbody.innerHTML = "";
    } else {
      $("#add").prop("disabled", true);
      $("#imodel").prop("disabled", true);
      $("#txtOCFNO").prop("disabled", false);

      // $("#detailsItems").empty();
      // $("#ocflist").empty();

      const table = document.getElementById("ocflist");
      const tbody = table.querySelector("tbody > tr");
      // Remove all rows in tbody
      tbody.innerHTML = "";
    }
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

    if ($("#thikness").val() == "" || $("#thikness").val() === "0") {
      isAllValid = false;
      $("#thikness").siblings("span.error").css("visibility", "visible");
    } else {
      $("#thikness").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#uomid").val() == "") {
      isAllValid = false;
      $("#uomid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#uomid").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#quantity").val() == "" || $("#quantity").val() === "0") {
      isAllValid = false;
      $("#quantity").siblings("span.error").css("visibility", "visible");
    } else {
      $("#quantity").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#unitprice").val() == "") {
      isAllValid = false;
      $("#unitprice").siblings("span.error").css("visibility", "visible");
    } else {
      $("#unitprice").siblings("span.error").css("visibility", "hidden");
    }
    if (isAllValid) {
      var $newRow = $("#mainrow").clone().removeAttr("id");
      $(".itemcode", $newRow)
        .val($("#itemcode").val())
        .attr("disabled", "disabled");
      $(".uom", $newRow).val($("#uom").val()).attr("disabled", "disabled");
      $(".name", $newRow).val($("#name").val()).attr("disabled", "disabled");
      $(".quantity", $newRow)
        .val($("#quantity").val())
        .attr("disabled", "disabled");
      $(".hscodeline", $newRow)
        .val($("#hscodeline").val())
        .attr("disabled", "disabled");
      $(".unitprice", $newRow)
        .val($("#unitprice").val())
        .attr("disabled", "disabled");

      $(".uomid", $newRow).val($("#uomid").val()).attr("disabled", "disabled");
      $(".thikness", $newRow)
        .val($("#thikness").val())
        .attr("disabled", "disabled");
      $(".width", $newRow).val($("#width").val()).attr("disabled", "disabled");
      $(".length", $newRow)
        .val($("#length").val())
        .attr("disabled", "disabled");
      $(".treatmentlevel", $newRow)
        .val($("#treatmentlevel").val())
        .attr("disabled", "disabled");
      $(".treatmentdirectionid", $newRow)
        .val($("#treatmentdirectionid").val())
        .attr("disabled", "disabled");
      $(".coreid", $newRow)
        .val($("#coreid").val())
        .attr("disabled", "disabled");
      $(".realod", $newRow)
        .val($("#realod").val())
        .attr("disabled", "disabled");
      $(".totalwt", $newRow)
        .val($("#totalwt").val())
        .attr("disabled", "disabled");
      $(".rolllength", $newRow)
        .val($("#rolllength").val())
        .attr("disabled", "disabled");

      $(".dateofdelivery", $newRow)
        .val($("#dateofdelivery").val())
        .attr("disabled", "disabled");
      $(".tentativedelivery", $newRow)
        .val($("#tentativedelivery").val())
        .attr("disabled", "disabled");

      $(".vatid", $newRow).val($("#vatid").val());
      $(".vatamount", $newRow).val($("#vatamount").val());
      $(".discountid", $newRow)
        .val($("#discountid").val())
        .attr("disabled", "disabled");
      $(".discountamount", $newRow)
        .val($("#discountamount").val())
        .attr("disabled", "disabled");
      $(".totalamount", $newRow)
        .val($("#totalamount").val())
        .attr("disabled", "disabled");
      $(".toleranceid", $newRow)
        .val($("#toleranceid").val())
        .attr("disabled", "disabled");
      $(".remarks", $newRow)
        .val($("#remarks").val())
        .attr("disabled", "disabled");
      $(".shortdetails", $newRow)
        .val($("#shortdetails").val())
        .attr("disabled", "disabled");
      $(".toshipmentscdate", $newRow)
        .val($("#toshipmentscdate").val())
        .attr("disabled", "disabled");
      $(".fromshipmentscdate", $newRow)
        .val($("#fromshipmentscdate").val())
        .attr("disabled", "disabled");

      $("#add", $newRow).removeClass("btn-info").addClass("btn-danger");
      $("i", $newRow).removeClass("fas fa-ad").addClass("fas fa-trash btn-sm");

      $("#imodel", $newRow).removeClass("btn-primary");
      $("span", $newRow).removeClass("mdi mdi-plus me-1");

      $(
        "#itemcode,#uom,#name,#quantity,#hscode,#unitprice,#vatid,#vatamount,#discountid,#discountamount,#toleranceid,#totalamount,#remarks,#shortdetails,#toshipmentscdate,#fromshipmentscdate, #uomid,#thikness,#width,#length,#treatmentlevel,#treatmentdirection,#coreid,#realod,#rolllength,#totalwt   #add,#imodel",
        $newRow,
      ).removeAttr("id");
      $("span.error", $newRow).remove();

      var newitemid = $("#itemcode").val();

      if ($($("#mycontainer tbody tr")).length == 0) {
        $("#detailsItems").append($newRow);
        $scope.ClearLine();
        $("#detailsItems").on("click", ".btn-danger", function () {
          $(this).parents("tr").remove();
        });
      } else {
        $(
          $("#mycontainer tbody tr").each(function (index, ele) {
            if ($(".itemcode", this).val() === newitemid) {
              notify("warning", "Warning Message", "Item already exists.");
              $("#detailsItems").on("click", ".btn-danger", function () {
                $(this).parents("tr").remove();
              });
              return false;
            } else {
              $("#detailsItems").append($newRow);
              $scope.ClearLine();
            }
          }),
        );
      }

      $("#detailsItems").on("click", ".btn-danger", function () {
        $(this).parents("tr").remove();
      });
    }
    //file:///C:/Users/sohan/Downloads/bootstrap-jquery-notify/index.html
    //notify('info', 'Info Message', 'This is an info message.');
    //notify('warning', 'Warning Message', 'Item already exists.');
    //notify('success', 'Success Message', 'This is a success message.');
    //notify('error', 'Error Message', 'This is an error message.');
    //notify('other', 'Other Message', 'This is an other message.');
  };

  $scope.eAdd = function () {
    var Details = [];
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
    } else {
      $("#eitemcode").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#ethikness").val() == "" || $("#ethikness").val() === "0") {
      isAllValid = false;
      $("#ethikness").siblings("span.error").css("visibility", "visible");
    } else {
      $("#ethikness").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#euomid").val() == "") {
      isAllValid = false;
      $("#euomid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#euomid").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#equantity").val() == "" || $("#Equantity").val() === "0") {
      isAllValid = false;
      $("#equantity").siblings("span.error").css("visibility", "visible");
    } else {
      $("#equantity").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#eunitprice").val() == "" || $("#Eunitprice").val() === "0") {
      isAllValid = false;
      $("#eunitprice").siblings("span.error").css("visibility", "visible");
    } else {
      $("#eunitprice").siblings("span.error").css("visibility", "hidden");
    }
    //alert($("#eeitemcode").val())
    if (isAllValid) {
      var details = {
        ITEMID: $("#eeitemcode").val(),
        HSCODE: $("#hscodeline").val(),
        QUANTITY: parseFloat($("#equantity").val()),
        PRICE: parseFloat($("#eunitprice").val()),
        VATID: parseInt($("#evatid").val()),
        VATAMOUNT: parseFloat($("#evatamount").val()),
        DISCOUNTID: $("#ediscountid").val(),
        DISCOUNT: parseFloat($("#ediscountamount").val()),
        TOTALAMOUNT: parseFloat($("#etotalamount").val()),
        TOLERANCEID: parseInt($("#etoleranceid").val()),
        DESCRIPTIONS: $("#eshortdetails").val(),
        REMARKS: $("#eremarks").val(),
        FROMSHIPMENTSCHEDULEDATE: $("#elifromshipmentscdate").val(),
        TOSHIPMENTSCHEDULEDATE: $("#elitoshipmentscdate").val(),

        TOTALWT: $(".totalwt", this).val(),
        ROLLLENGTH: $(".rolllength", this).val(),

        UOMID: $("#euomid").val(),
        THIKNESS: $("#ethikness").val(),
        WIDTH: $("#ewidth").val(),
        LENGTH: $("#elength").val(),
        TREATMENTLEVEL: $("#etreatmentlevel").val(),
        TREATMENTDIRECTIONID: parseInt($("#etreatmentdirectionid").val()),
        COREID: parseInt($("#ecoreid").val()),
        REALOD: $("#erealod").val(),
        DISEREDDATEOFDELIVERY: $("#edateofdelivery").val(),
        TENTATIVEDATEOFDELIVERY: $("#etentativedelivery").val(),
      };

      Details.push(details);

      $.ajax({
        type: "POST",
        url: "/Quotation/ESaveLine",
        dataType: "json",
        data: { details: Details, ID: $("#editsqnumber").val() },
        success: function (result) {
          $scope.EditbyDetailsID($("#editsqnumber").val());

          //$("#txtByerName,#txtComName,#txtPhone,#txtEmail,#Address", "#", "#").val('');
          if (result == 1) {
            notify("warning", "Warning Message", "This Item Already Exist");
          } else {
            notify("success", "Success Message", result);
          }
          $scope.ClearLine();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.Save = function () {
    var Details = [];
    var hscodeall = [];
    var isAllValid = true;
    if ($("#quotationtypeid").val() == "1") {
      if ($("#txtBuyerName").val() == "") {
        isAllValid = false;
        $("#txtBuyerName").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtBuyerName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtDate").val() == "") {
        isAllValid = false;
        $("#txtDate").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtDate").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtPIExpireDate").val() == "") {
        isAllValid = false;
        $("#txtPIExpireDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtPIExpireDate")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#pitypeid").val() == "") {
        isAllValid = false;
        $("#pitypeid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#pitypeid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtshipmentmodeid").val() == "") {
        isAllValid = false;
        $("#txtshipmentmodeid")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtshipmentmodeid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtcurrencyid").val() == "") {
        isAllValid = false;
        $("#txtcurrencyid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtcurrencyid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#deliveryby").val() == "") {
        isAllValid = false;
        $("#deliveryby").siblings("span.error").css("visibility", "visible");
      } else {
        $("#deliveryby").siblings("span.error").css("visibility", "hidden");
      }
      if ($("#delPointId").val() == "") {
        isAllValid = false;
        $("#delPointId").siblings("span.error").css("visibility", "visible");
      } else {
        $("#delPointId").siblings("span.error").css("visibility", "hidden");
      }

      if (isAllValid) {
        if (
          $("#detailsItems tbody tr").length == 0 &&
          $("#excel").val() === "2"
        ) {
          notify("error", "Error", "Add At Least One Item.");
        } else if (
          $($("#ocflist tbody tr")).length == 0 &&
          $("#excel").val() === "3"
        ) {
          notify("error", "Error", "Add At Least One Item.");
        } else {
          var master = {
            QUOTATIONTYPEID: $("#quotationtypeid").val(),

            OCFID: $("#ocfid").val(),
            OCFNO: $("#txtOCFNO").val(),
            PITYPEID: $("#pitypeid").val(),
            CUSTOMERID: $("#hcusid").val(),
            ISEXCEL: 0,
            DATE: $("#txtDate").val(),
            EXPIREDATE: $("#txtPIExpireDate").val(),
            SHIPMENTDATE: $("#txtShipmentDate").val(),
            SHIPMENTMODEID: $("#txtshipmentmodeid").val(),
            PAYMENTTERMID: $("#txtpaymenttermid").val(),
            DELIVERYTERMID: $("#deliverytermid").val(),
            TERMSCONDITION: $("#termscon").val(),

            TOSHIPMENTCOUNTRYID: $("#txtToshipmentcountryid").val(),
            FROMSHIPMENTCOUNTRYID: $("#txtFromshipmentcountryid").val(),

            FROMSHIPMENTPORTID: $("#txtloadingport").val(),
            TODISCHARGEPORT: $("#txtdischargeloadingport").val(),

            TARRIFCODE: $("#txtTariffCode").val(),
            BUYERREGNO: $("#txtBuyerRegNo").val(),
            HSCODE: $("#txtHSCode").val(),
            INTOTERM: $("#txtincotermid").val(),
            CURRENCYID: $("#txtcurrencyid").val(),
            DESCRIPTIONS: $("#description").val(),

            BUYERBANKID: $("#buyerbankid").val(),
            DELPOINTID: $("#delPointId").val(),

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
            UNITID: $("#txtTariffCodehidden").val(),
            ORDERREFNO: $("#txtorderrefno").val(),

            FREEINCOTERM: $("#txtfreeincoterm").val(),
            FREEPAYMENTTERM: $("#txtfreepaymentterm").val(),
            TOLARENCEID: $("#txttoleranceid").val(),

            SALESTYPEID: $("#salestypeid").val(),
            CREDITTYPEID: $("#credittypeid").val(),
            CREDITDAYS: $("#txtCreditDays").val(),
            DISCHARGEPLACE: $("#txtDischargeplace").val(),
          };
          const tags = document.querySelectorAll(".tag");
          const values = Array.from(tags).map((tag) =>
            tag.textContent.replace("x", "").trim(),
          );
          let index = 0;
          let hscodeall = [];

          values.forEach((value) => {
            var data = {
              HSCODE: value,
            };
            hscodeall.push(data);
            index++;
          });
          if ($("#excel").val() === "2") {
            $(
              $("#detailsItems > tbody > tr").each(function (index, ele) {
                var details = {
                  ITEMID: $(".itemcode", this).val(),
                  HSCODE: $(".hscodeline", this).val(),
                  QUANTITY: parseFloat($(".quantity", this).val()),
                  PRICE: parseFloat($(".unitprice", this).val()),
                  VATID: parseInt($(".vatid", this).val()),
                  VATAMOUNT: parseFloat($(".vatamount", this).val()),
                  DISCOUNTID: $(".discountid", this).val(),
                  DISCOUNT: parseFloat($(".discountamount", this).val()),
                  TOTALAMOUNT: parseFloat($(".totalamount", this).val()),
                  TOLERANCEID: parseInt($(".toleranceid", this).val()),
                  DESCRIPTIONS: $(".shortdetails", this).val(),
                  REMARKS: $(".remarks", this).val(),
                  TOTALWT: $(".totalwt", this).val(),
                  ROLLLENGTH: $(".rolllength", this).val(),
                  FROMSHIPMENTSCHEDULEDATE: $(
                    ".lifromshipmentscdate",
                    this,
                  ).val(),
                  TOSHIPMENTSCHEDULEDATE: $(".litoshipmentscdate", this).val(),

                  UOMID: $(".uomid", this).val(),
                  THIKNESS: $(".thikness", this).val(),
                  WIDTH: $(".width", this).val(),
                  LENGTH: $(".length", this).val(),
                  TREATMENTLEVEL: $(".treatmentlevel", this).val(),
                  TREATMENTDIRECTIONID: $(".treatmentdirectionid", this).val(),
                  COREID: parseInt($(".coreid", this).val()),
                  REALOD: $(".realod", this).val(),
                  DISEREDDATEOFDELIVERY: $(".dateofdelivery", this).val(),
                  TENTATIVEDATEOFDELIVERY: $(".tentativedelivery", this).val(),
                };
                Details.push(details);
              }),
            );
          } else {
            $(
              $("#ocflist > tbody > tr").each(function (i, ele) {
                var details = {
                  ITEMID: $("#eitemcode" + i).val(),
                  HSCODE: $("#hscodeline" + i).val(),
                  QUANTITY: parseFloat($("#equantity" + i).val()),
                  PRICE: parseFloat($("#eunitprice" + i).val()),
                  VATID: parseInt($("#eid" + i).val()),
                  //VATID: parseInt($("#evatid" + i).val()),
                  VATAMOUNT: parseFloat($("#evatamount" + i).val()),
                  DISCOUNTID: $("#ediscountidinput" + i).val(),
                  DISCOUNT: parseFloat($("#eofferprice" + i).val()), //DISCOUNT AS OFFERPRICE
                  TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()),
                  TOLERANCEID: parseInt($("#etoleranceid" + i).val()),
                  DESCRIPTIONS: $("#eshortdetails" + i).val(),
                  REMARKS: $("#eremarks" + i).val(),
                  FROMSHIPMENTSCHEDULEDATE: $(
                    "#elifromshipmentscdate" + i,
                  ).val(),
                  TOSHIPMENTSCHEDULEDATE: $("#elitoshipmentscdate" + i).val(),
                  TOTALWT: $(".etotalwt", this).val(),
                  ROLLLENGTH: $(".erolllength", this).val(),
                  UOMID: $("#euomidinput" + i).val(),
                  THIKNESS: $("#ethikness" + i).val(),
                  WIDTH: $("#ewidth" + i).val(),
                  LENGTH: $("#elength" + i).val(),
                  TREATMENTLEVEL: $("#etreatmentlevel" + i).val(),
                  TREATMENTDIRECTIONID: $(
                    "#etreatmentdirectionidinput" + i,
                  ).val(),
                  COREID: $("#ecoreidinput" + i).val(),
                  REALOD: $("#erealod" + i).val(),
                  DISEREDDATEOFDELIVERY: $("#edateofdelivery" + i).val(),
                  TENTATIVEDATEOFDELIVERY: $("#etentativedelivery" + i).val(),
                };
                Details.push(details);
              }),
            );
          }
          $.ajax({
            type: "POST",
            url: "/Quotation/SavePI",
            dataType: "json",
            data: { PI: master, PID: Details, HS: hscodeall },
            success: function (result) {
              notify("success", "Success Messsage", result);
              UploadFileUsingAPI(result.split(":")[1]);
              //$scope.PIList();
              //$scope.GetSalesQuotation();
              $("#detailsItems").empty();
              $scope.Clear();
              $scope.detailsbyid = null;
              $scope.ocflist = null;
              $scope.GetData();
              //var rowCount = editmycontainer.rows.length;
              //for (var i = rowCount - 1; i > 0; i--) {
              //    editmycontainer.deleteRow(i);
              //}

              $("#savebutton").prop("disabled", true);
            },
            error: function (errormessage) {
              notify("error", "Error Message", errormessage.responseText);
            },
          });
        }
      }
    } else if ($("#quotationtypeid").val() == "2") {
      if ($("#txtBuyerName").val() == "") {
        isAllValid = false;
        $("#txtBuyerName").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtBuyerName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#sqtypeid").val() == "") {
        isAllValid = false;
        $("#sqtypeid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#sqtypeid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtExpireDate").val() == "") {
        isAllValid = false;
        $("#txtExpireDate").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtExpireDate").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#ocflist > tbody >tr").length == 0 && $("#excel").val() === "3") {
        isAllValid = false;
        notify("error", "Error Message", "At Least One Item Required.");
      }

      if (isAllValid) {
        var master = {
          QUOTATIONTYPEID: $("#quotationtypeid").val(),
          OCFID: $("#ocfid").val(),
          OCFNO: $("#txtOCFNO").val(),
          CUSTOMERID: $("#hcusid").val(),
          ISEXCEL: 0,
          SQTYPEID: $("#sqtypeid").val(),
          EXPIREDATE: $("#txtExpireDate").val(),
          DESCRIPTIONS: $("#description").val(),
          TERMSCONDITION: $("#termscon").val(),

          SALESTYPEID: $("#salestypeid").val(),
          CREDITTYPEID: $("#credittypeid").val(),
          CREDITDAYS: $("#txtCreditDays").val(),
        };

        if ($("#excel").val() === "2") {
          $(
            $("#detailsItems > tbody > tr").each(function (index, ele) {
              var details = {
                ITEMID: $(".itemcode", this).val(),
                HSCODE: $(".hscodeline", this).val(),
                QUANTITY: parseFloat($(".quantity", this).val()),
                PRICE: parseFloat($(".unitprice", this).val()),
                VATID: parseInt($(".vatid", this).val()),
                VATAMOUNT: parseFloat($(".vatamount", this).val()),
                DISCOUNTID: $(".discountid", this).val(),
                DISCOUNT: parseFloat($(".discountamount", this).val()),
                TOTALAMOUNT: parseFloat($(".totalamount", this).val()),
                TOLERANCEID: parseInt($(".toleranceid", this).val()),
                DESCRIPTIONS: $(".shortdetails", this).val(),
                REMARKS: $(".remarks", this).val(),
                FROMSHIPMENTSCHEDULEDATE: $(
                  ".lifromshipmentscdate",
                  this,
                ).val(),
                TOSHIPMENTSCHEDULEDATE: $(".litoshipmentscdate", this).val(),

                UOMID: $(".uomid", this).val(),
                THIKNESS: $(".thikness", this).val(),
                WIDTH: $(".width", this).val(),
                LENGTH: $(".length", this).val(),
                TREATMENTLEVEL: $(".treatmentlevel", this).val(),
                TREATMENTDIRECTIONID: $(".treatmentdirectionid", this).val(),
                COREID: parseInt($(".coreid", this).val()),
                REALOD: $(".realod", this).val(),
                DISEREDDATEOFDELIVERY: $(".dateofdelivery", this).val(),
                TENTATIVEDATEOFDELIVERY: $(".tentativedelivery", this).val(),
              };
              Details.push(details);
            }),
          );
        } else {
          $(
            $("#ocflist > tbody > tr").each(function (i, ele) {
              var details = {
                ITEMID: $("#eitemcode" + i).val(),
                HSCODE: $("#hscodeline" + i).val(),
                QUANTITY: parseFloat($("#equantity" + i).val()),
                PRICE: parseFloat($("#eunitprice" + i).val()),
                VATID: parseInt($("#eid" + i).val()), //as ocfitemid
                //VATID: parseInt($("#evatid" + i).val()),
                VATAMOUNT: parseFloat($("#evatamount" + i).val()),
                DISCOUNTID: $("#ediscountidinput" + i).val(),
                DISCOUNT: parseFloat($("#eofferprice" + i).val()), //DISCOUNT AS OFFERPRICE
                TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()),
                TOLERANCEID: parseInt($("#etoleranceid" + i).val()),
                DESCRIPTIONS: $("#eshortdetails" + i).val(),
                REMARKS: $("#eremarks" + i).val(),
                FROMSHIPMENTSCHEDULEDATE: $("#elifromshipmentscdate" + i).val(),
                TOSHIPMENTSCHEDULEDATE: $("#elitoshipmentscdate" + i).val(),

                UOMID: $("#euomidinput" + i).val(),
                THIKNESS: $("#ethikness" + i).val(),
                WIDTH: $("#ewidth" + i).val(),
                LENGTH: $("#elength" + i).val(),
                TREATMENTLEVEL: $("#etreatmentlevel" + i).val(),
                TREATMENTDIRECTIONID: $(
                  "#etreatmentdirectionidinput" + i,
                ).val(),
                COREID: $("#ecoreidinput" + i).val(),
                REALOD: $("#erealod" + i).val(),
                DISEREDDATEOFDELIVERY: $("#edateofdelivery" + i).val(),
                TENTATIVEDATEOFDELIVERY: $("#etentativedelivery" + i).val(),
              };
              Details.push(details);
            }),
          );
        }

        $.ajax({
          type: "POST",
          url: "/Quotation/SaveSQ",
          dataType: "json",
          data: { SQ: master, SQD: Details },
          success: function (result) {
            notify("success", "Success Messsage", result);

            $("#detailsItems").empty();
            $scope.ocflist = null;
            $scope.Clear();
            $scope.detailsbyid = null;
            $scope.GetData();

            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else if ($("#quotationtypeid").val() == "3") {
      if ($("#txtBuyerName").val() == "") {
        isAllValid = false;
        $("#txtBuyerName").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtBuyerName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtSpotDODate").val() == "") {
        isAllValid = false;
        $("#txtSpotDODate").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtSpotDODate").siblings("span.error").css("visibility", "hidden");
      }
      if ($("#txtSpotDate").val() == "") {
        isAllValid = false;
        $("#txtSpotDate").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtSpotDate").siblings("span.error").css("visibility", "hidden");
      }
      if ($("#excel").val() == "") {
        isAllValid = false;
        $("#excel").siblings("span.error").css("visibility", "visible");
      } else {
        $("#excel").siblings("span.error").css("visibility", "hidden");
      }

      if (isAllValid) {
        var master = {
          QUOTATIONTYPEID: $("#quotationtypeid").val(),
          OCFID: $("#ocfid").val(),
          OCFNO: $("#txtOCFNO").val(),
          CUSTOMERID: $("#hcusid").val(),
          ISEXCEL: 0,
          SPOTDATE: $("#txtSpotDate").val(),
          LASTDATEOFDO: $("#txtSpotDODate").val(),
          DESCRIPTIONS: $("#description").val(),
          TERMSCONDITION: $("#termscon").val(),

          SALESTYPEID: $("#salestypeid").val(),
          CREDITTYPEID: $("#credittypeid").val(),
          CREDITDAYS: $("#txtCreditDays").val(),
        };

        if ($("#excel").val() === "2") {
          $(
            $("#detailsItems > tbody > tr").each(function (index, ele) {
              var details = {
                ITEMID: $(".itemcode", this).val(),
                HSCODE: $(".hscodeline", this).val(),
                QUANTITY: parseFloat($(".quantity", this).val()),
                PRICE: parseFloat($(".unitprice", this).val()),
                VATID: parseInt($(".vatid", this).val()),
                VATAMOUNT: parseFloat($(".vatamount", this).val()),
                DISCOUNTID: $(".discountid", this).val(),
                DISCOUNT: parseFloat($(".discountamount", this).val()),
                TOTALAMOUNT: parseFloat($(".totalamount", this).val()),
                TOLERANCEID: parseInt($(".toleranceid", this).val()),
                DESCRIPTIONS: $(".shortdetails", this).val(),
                REMARKS: $(".remarks", this).val(),
                FROMSHIPMENTSCHEDULEDATE: $(
                  ".lifromshipmentscdate",
                  this,
                ).val(),
                TOSHIPMENTSCHEDULEDATE: $(".litoshipmentscdate", this).val(),

                UOMID: $(".uomid", this).val(),
                THIKNESS: $(".thikness", this).val(),
                WIDTH: $(".width", this).val(),
                LENGTH: $(".length", this).val(),
                TREATMENTLEVEL: $(".treatmentlevel", this).val(),
                TREATMENTDIRECTIONID: $(".treatmentdirectionid", this).val(),
                COREID: parseInt($(".coreid", this).val()),
                REALOD: $(".realod", this).val(),
                DISEREDDATEOFDELIVERY: $(".dateofdelivery", this).val(),
                TENTATIVEDATEOFDELIVERY: $(".tentativedelivery", this).val(),
              };
              Details.push(details);
            }),
          );
        } else {
          $(
            $("#ocflist > tbody > tr").each(function (i, ele) {
              var details = {
                ITEMID: $("#eitemcode" + i).val(),
                HSCODE: $("#hscodeline" + i).val(),
                QUANTITY: parseFloat($("#equantity" + i).val()),
                PRICE: parseFloat($("#eunitprice" + i).val()),
                VATID: parseInt($("#eid" + i).val()),
                //VATID: parseInt($("#evatid" + i).val()),
                VATAMOUNT: parseFloat($("#evatamount" + i).val()),
                DISCOUNTID: $("#ediscountidinput" + i).val(),
                DISCOUNT: parseFloat($("#eofferprice" + i).val()), //DISCOUNT AS OFFERPRICE
                TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()),
                TOLERANCEID: parseInt($("#etoleranceid" + i).val()),
                DESCRIPTIONS: $("#eshortdetails" + i).val(),
                REMARKS: $("#eremarks" + i).val(),
                FROMSHIPMENTSCHEDULEDATE: $("#elifromshipmentscdate" + i).val(),
                TOSHIPMENTSCHEDULEDATE: $("#elitoshipmentscdate" + i).val(),

                UOMID: $("#euomidinput" + i).val(),
                THIKNESS: $("#ethikness" + i).val(),
                WIDTH: $("#ewidth" + i).val(),
                LENGTH: $("#elength" + i).val(),
                TREATMENTLEVEL: $("#etreatmentlevel" + i).val(),
                TREATMENTDIRECTIONID: $(
                  "#etreatmentdirectionidinput" + i,
                ).val(),
                COREID: $("#ecoreidinput" + i).val(),
                REALOD: $("#erealod" + i).val(),
                DISEREDDATEOFDELIVERY: $("#edateofdelivery" + i).val(),
                TENTATIVEDATEOFDELIVERY: $("#etentativedelivery" + i).val(),
              };
              Details.push(details);
            }),
          );
        }

        $.ajax({
          type: "POST",
          url: "/Quotation/SaveSpot",
          dataType: "json",
          data: { SQ: master, SQD: Details },
          success: function (result) {
            notify("success", "Success Messsage", result);

            //UploadFileUsingAPI(result.split(':')[1]);
            //$scope.PIList();
            //$scope.GetSalesQuotation();
            $("#detailsItems").empty();
            $scope.Clear();
            $scope.detailsbyid = null;
            $scope.ocflist = null;
            $scope.GetData();
            //var rowCount = editmycontainer.rows.length;
            //for (var i = rowCount - 1; i > 0; i--) {
            //    editmycontainer.deleteRow(i);
            //}
            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else if ($("#quotationtypeid").val() == "4") {
      isAllValid = true;
      if ($("#whid").val() == "") {
        isAllValid = false;
        $("#whid").siblings("span.error").css("visibility", "visible");
      } else {
        $("#whid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtCAppStartDate").val() == "") {
        isAllValid = false;
        $("#txtCAppStartDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtCAppStartDate")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtCAppEndDate").val() == "") {
        isAllValid = false;
        $("#txtCAppEndDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtCAppEndDate").siblings("span.error").css("visibility", "hidden");
      }

      //if ($("#txtOCFNO").val() == "") {
      //    isAllValid = false;
      //    $("#txtOCFNO").siblings('span.error').css('visibility', 'visible');
      //}
      //else {
      //    $("#txtOCFNO").siblings('span.error').css('visibility', 'hidden');
      //}

      if (isAllValid) {
        var master = {
          QUOTATIONTYPEID: $("#quotationtypeid").val(),
          OCFID: $("#ocfid").val(),
          OCFNO: $("#txtOCFNO").val(),
          ISEXCEL: 0,
          WHID: $("#whid").val(),
          CONAPPSTATRDATE: $("#txtCAppStartDate").val(),
          CONAPPENDDATE: $("#txtCAppEndDate").val(),
          DESCRIPTIONS: $("#description").val(),
          TERMSCONDITION: $("#termscon").val(),
          CUSTOMERID: $("#hcusid").val(),
          SALESTYPEID: $("#salestypeid").val(),
          CREDITTYPEID: $("#credittypeid").val(),
          CREDITDAYS: $("#txtCreditDays").val(),
        };

        if ($("#excel").val() === "2") {
          $(
            $("#detailsItems > tbody > tr").each(function (index, ele) {
              var details = {
                ITEMID: $(".itemcode", this).val(),
                HSCODE: $(".hscodeline", this).val(),
                QUANTITY: parseFloat($(".quantity", this).val()),
                PRICE: parseFloat($(".unitprice", this).val()),
                VATID: parseInt($(".vatid", this).val()),
                VATAMOUNT: parseFloat($(".vatamount", this).val()),
                DISCOUNTID: $(".discountid", this).val(),
                DISCOUNT: parseFloat($(".discountamount", this).val()),
                TOTALAMOUNT: parseFloat($(".totalamount", this).val()),
                TOLERANCEID: parseInt($(".toleranceid", this).val()),
                DESCRIPTIONS: $(".shortdetails", this).val(),
                REMARKS: $(".remarks", this).val(),
                FROMSHIPMENTSCHEDULEDATE: $(
                  ".lifromshipmentscdate",
                  this,
                ).val(),
                TOSHIPMENTSCHEDULEDATE: $(".litoshipmentscdate", this).val(),

                UOMID: $(".uomid", this).val(),
                THIKNESS: $(".thikness", this).val(),
                WIDTH: $(".width", this).val(),
                LENGTH: $(".length", this).val(),
                TREATMENTLEVEL: $(".treatmentlevel", this).val(),
                TREATMENTDIRECTIONID: $(".treatmentdirectionid", this).val(),
                COREID: parseInt($(".coreid", this).val()),
                REALOD: $(".realod", this).val(),
                DISEREDDATEOFDELIVERY: $(".dateofdelivery", this).val(),
                TENTATIVEDATEOFDELIVERY: $(".tentativedelivery", this).val(),
              };
              Details.push(details);
            }),
          );
        } else {
          $(
            $("#ocflist > tbody > tr").each(function (i, ele) {
              var details = {
                ITEMID: $("#eitemcode" + i).val(),
                HSCODE: $("#hscodeline" + i).val(),
                QUANTITY: parseFloat($("#equantity" + i).val()),
                PRICE: parseFloat($("#eunitprice" + i).val()),
                VATID: parseInt($("#eid" + i).val()),
                //VATID: parseInt($("#evatid" + i).val()),
                VATAMOUNT: parseFloat($("#evatamount" + i).val()),
                DISCOUNTID: $("#ediscountidinput" + i).val(),
                DISCOUNT: parseFloat($("#eofferprice" + i).val()), //DISCOUNT AS OFFERPRICE
                TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()),
                TOLERANCEID: parseInt($("#etoleranceid" + i).val()),
                DESCRIPTIONS: $("#eshortdetails" + i).val(),
                REMARKS: $("#eremarks" + i).val(),
                FROMSHIPMENTSCHEDULEDATE: $("#elifromshipmentscdate" + i).val(),
                TOSHIPMENTSCHEDULEDATE: $("#elitoshipmentscdate" + i).val(),

                UOMID: $("#euomidinput" + i).val(),
                THIKNESS: $("#ethikness" + i).val(),
                WIDTH: $("#ewidth" + i).val(),
                LENGTH: $("#elength" + i).val(),
                TREATMENTLEVEL: $("#etreatmentlevel" + i).val(),
                TREATMENTDIRECTIONID: $(
                  "#etreatmentdirectionidinput" + i,
                ).val(),
                COREID: $("#ecoreidinput" + i).val(),
                REALOD: $("#erealod" + i).val(),
                DISEREDDATEOFDELIVERY: $("#edateofdelivery" + i).val(),
                TENTATIVEDATEOFDELIVERY: $("#etentativedelivery" + i).val(),
              };
              Details.push(details);
            }),
          );
        }

        $.ajax({
          type: "POST",
          url: "/Quotation/SaveConApp",
          dataType: "json",
          data: { SQ: master, SQD: Details },
          success: function (result) {
            notify("success", "Success Messsage", result);
            $("#detailsItems").empty();
            //UploadFileUsingAPI(result.split(':')[1]);
            //$scope.PIList();
            //$scope.GetSalesQuotation();
            $scope.Clear();
            $scope.detailsbyid = null;
            $scope.ocflist = null;
            $("#detailsItems").empty();
            $scope.GetData();
            //var rowCount = editmycontainer.rows.length;
            //for (var i = rowCount - 1; i > 0; i--) {
            //    editmycontainer.deleteRow(i);
            //}
            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    }
  };

  $scope.DetailsAdd = function () {};

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

    $("#ocfid").val("0");
    $("#txtOCFNO").val("");

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

    $("#uomid").val("");
    $("#thikness").val(0);
    $("#width").val("");
    $("#length").val("");
    $("#treatmentlevel").val(0);
    $("#treatmentdirectionid").val("");
    $("#coreid").val("");
    $("#realod").val(0);
    $("#dateofdelivery").val("");
    $("#tentativedelivery").val("");

    $("#euomid").val("");
    $("#ethikness").val(0);
    $("#ewidth").val("");
    $("#elength").val("");
    $("#etreatmentlevel").val(0);
    $("#etreatmentdirectionid").val("");
    $("#ecoreid").val("");
    $("#erealod").val(0);
    $("#edateofdelivery").val("");
    $("#etentativedelivery").val("");
    $("#eremarks").val("");
    $("#eshortdetails").val("");
  };

  $scope.Clear = function () {
    $(".error").css("visibility", "hidden");

    /*for save item clear*/
    $("#txtDate").val("");
    $("#savebutton").prop("disabled", false);
    $("#txtOrderDate").val("");
    $("#txtNotifyParty").val("");
    $("#txtpartialshipmentid").val("");
    $("#transhipmentid").val("");
    $("#sellerbankid").val("");
    $("#txtBuyerHSCode").val("");

    $("#sqtypeid").val("");
    $("#txtBuyerName").val("");

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

    $("#whid").val("");
    $("#txtCAppStartDate").val("");
    $("#txtCAppEndDate").val("");

    $("#salestypeid").val("");
    $("#credittypeid").val("");
    $("#txtCreditDays").val("");

    $scope.detailsbyid = null;
    $scope.ClearLine();
    /*end save item clear*/
  };

  //$scope.UploadFile = function (result) {
  //    var formdata = new FormData();
  //    var fileInput = document.getElementById('fileInput');
  //    for (i = 0; i < fileInput.files.length; i++) {

  //        var sfilename = fileInput.files[i].name;
  //        //let srandomid = Math.random().toString(36).substring(7);

  //        formdata.append(sfilename, fileInput.files[i]);
  //    }
  //    //chkatchtbl();
  //    $('#fileInput').val('');

  //    formdata.append('uploadername', $('#txtuploader').val());

  //    formdata.append('id', result.trim());

  //    $.ajax({
  //        type: "POST",
  //        url: "/SalesQuatationLanding/FileUpload",
  //        data: formdata,
  //        contentType: false,
  //        processData: false,
  //        success: function (data) {
  //            notify('success', 'Success Message', data);
  //        }
  //    });

  //    $("#txtByerName,#txtComName,#txtPhone,#txtEmail,#Address", "#termscon", "#description").val('');
  //    $('#detailsItems').empty();
  //}

  //$scope.EUploadFile = function (result) {
  //    var formdata = new FormData();
  //    var fileInput = document.getElementById('efileInput');
  //    for (i = 0; i < fileInput.files.length; i++) {

  //        var sfilename = fileInput.files[i].name;
  //        let srandomid = Math.random().toString(36).substring(7);

  //        formdata.append(sfilename, fileInput.files[i]);
  //    }
  //    //chkatchtbl();
  //    $('#efileInput').val('');

  //    //formdata.append('uploadername', $('#txtuploader').val());

  //    formdata.append('id', result.trim());
  //    $.ajax({
  //        type: "POST",
  //        url: "/SalesQuatationLanding/FileUpload",
  //        data: formdata,
  //        contentType: false,
  //        processData: false,
  //        success: function (data) {
  //            notify('success', 'Success Message', data);
  //        }
  //    });

  //    $("#txtByerName,#txtComName,#txtPhone,#txtEmail,#Address", "#termscon", "#description").val('');
  //    $('#detailsItems').empty();
  //}

  $scope.sortBy = function (column) {
    $scope.sortColumn = column;
    $scope.reverse = !$scope.reverse;
  };

  $scope.CheckQuotationExist = function (ID) {
    $scope.ID = ID;
    $scope.TYPEID = $("#quotationtypeid").val();
    //$("#editsqnumber").val(sqnumber);
    //$("#editsqnumber").val(sqnumber);
    $("#editsqnumber").val(ID);

    $http({
      method: "GET",
      url: "/Quotation/GetQuotationAllViewOCF",
      params: { typeid: $scope.TYPEID, id: $scope.ID },
    }).success(function (data) {
      if ($("#quotationtypeid").val() === "1") {
        $(".pi").show();
        $(".sq").hide();
        $(".cp").hide();
        $(".spot").hide();

        $("#agreementid").val(data[0].agreementid);
        $("#esqid").val(data[0].customername);
        $("#txtBuyerName").val(data[0].customername);
        $("#esqid").val(data[0].salesquotationheaderid);
        $("#quotationtypeid").val(data[0].agreementtypeid);
        $("#txtDate").val(data[0].pidate);
        $("#txtPIExpireDate").val(data[0].piexpiredate);
        $("#txtTariffCode").val(data[0].tarrifcode);
        $("#txtTariffCodehidden").val(data[0].unitid);

        $("#txtshipmentmodeid").val(data[0].shipmentmodeid);
        $("#txtFromshipmentcountryid").val(data[0].fromshipmentcountryid);
        $("#txtToshipmentcountryid").val(data[0].toshipmentcountryid);
        $("#txtShipmentDate").val(data[0].shipmentdate);
        $("#txtloadingport").val(data[0].fromshipmentportid);
        $("#txtdischargeloadingport").val(data[0].toshipmentportid);
        $("#txtHSCode").val(data[0].hscode);

        $("#txtBuyerRegNo").val(data[0].buyerregno);
        $("#txttransportmodeid").val(data[0].shipmentid);
        $("#txtcurrencyid").val(data[0].currencyid);
        $("#txtpaymenttermid").val(data[0].paymenttermid);
        $("#deliverytermid").val(data[0].deliverytermid);
        $("#txtincotermid").val(data[0].incoid);
        $("#termscon").val(data[0].termscondition);
        $("#description").val(data[0].descriptions);
        $("#loadingplace").val(data[0].loadingplace);
        $("#deliveryby").val(data[0].loadingbyid);

        $("#txtBuyerBank").val(data[0].buyerbankdetails);
        $("#sellerbankid").val(data[0].sellerbankid);
        $("#txtBuyerHSCode").val(data[0].buyercountryhscode);
        $("#transhipmentid").val(data[0].transhipment);
        $("#txtpartialshipmentid").val(data[0].partialshipment);
        $("#txtOriginCountry").val(data[0].originofcountry);
        $("#txtOrderDate").val(data[0].buyerorderconfirmdate);
        $("#txtNotifyParty").val(data[0].notifyparty);
        $("#txtPaytermothers").val(data[0].otherspayterm);

        $("#credittypeid").val(data[0].credittypeid);
        $("#salestypeid").val(data[0].salestypeid);
        $("#txtCreditDays").val(data[0].creditdays);
        $("#txtOCFNO").val(data[0].ocfno);
      } else if ($("#quotationtypeid").val() === "2") {
        $(".pi").hide();
        $(".sq").show();
        $(".cp").hide();
        $(".spot").hide();
        $("#quotationtypeid").val(data[0].quotationtypeid);
        $("#txtBuyerName").val(data[0].cusname);

        $("#credittypeid").val(data[0].credittypeid);
        $("#salestypeid").val(data[0].salestypeid);
        $("#txtCreditDays").val(data[0].creditdays);

        $("#sqtypeid").val(data[0].sqtypeid);
        $("#txtExpireDate").val(data[0].expiredate);
        $("#txtOCFNO").val(data[0].ocfno);
      } else if ($("#quotationtypeid").val() === "3") {
        $(".pi").hide();
        $(".sq").hide();
        $(".cp").hide();
        $(".spot").show();

        $("#credittypeid").val(data[0].credittypeid);
        $("#salestypeid").val(data[0].salestypeid);
        $("#txtCreditDays").val(data[0].creditdays);

        $("#quotationtypeid").val(data[0].quotationtypeid);
        $("#txtBuyerName").val(data[0].cusname);
        $("#txtSpotDate").val(data[0].spotdate);
        $("#txtSpotDODate").val(data[0].lastdateofdo);
        $("#txtOCFNO").val(data[0].ocfno);
      } else if ($("#quotationtypeid").val() === "4") {
        $(".pi").hide();
        $(".sq").hide();
        $(".cp").show();
        $(".spot").hide();

        $("#credittypeid").val(data[0].credittypeid);
        $("#salestypeid").val(data[0].salestypeid);
        $("#txtCreditDays").val(data[0].creditdays);

        $("#whid").val(data[0].whid);
        $("#quotationtypeid").val(data[0].quotationtypeid);
        $("#txtCAppStartDate").val(data[0].conappstatrdate);
        $("#txtCAppEndDate").val(data[0].conappenddate);
        $("#txtOCFNO").val(data[0].ocfno);
      } else {
        $scope.Clear();
        $scope.ClearLine();
      }
    });
  };

  $scope.EditbyMasterID = function (ID, quotationnumber, agreementtypeid) {
    $scope.ID = ID;
    $scope.TYPEID = agreementtypeid;
    //$("#editsqnumber").val(sqnumber);
    //$("#editsqnumber").val(sqnumber);
    $("#editsqnumber").val(ID);

    $http({
      method: "GET",
      url: "/Quotation/GetQuotationAllView",
      params: { typeid: $scope.TYPEID, id: $scope.ID },
    }).success(function (data) {
      if ($("#quotationid").val() === "1") {
        $(".pi").show();
        $(".sq").hide();
        $(".cp").hide();
        $(".spot").hide();

        console.log("need this data now");
        console.log(data);

        $("#eagreementid").val(data[0].agreementid);
        $("#eesqid").val(data[0].customername);
        $("#etxtBuyerName").val(data[0].customername);
        $("#eesqid").val(data[0].salesquotationheaderid);
        $("#equotationtypeid").val(data[0].agreementtypeid);
        $("#etxtDate").val(data[0].pidate);
        $("#etxtPIExpireDate").val(data[0].piexpiredate);
        $("#etxtTariffCode").val(data[0].tarrifcode);
        $("#txtTariffCodehidden").val(data[0].unitid);

        $("#etxtBuyerBank").val(data[0].buyerbankdetails);
        $("#esellerbankid").val(data[0].sellerbankid);
        $("#ebuyerbankid").val(data[0].buyerbankid);

        $("#edelPointId").val(data[0].delpointid);
        $("#etxtContractPerson").val(data[0].delpointcontractperson);
        $("#etxtContractNo").val(data[0].delpointcontractno);
        $("#etxtAddress").val(data[0].delpointaddress);
        $("#edelPointname").val(data[0].delpointname);

        $("#etxtshipmentmodeid").val(data[0].shipmentmodeid);
        $("#etxtFromshipmentcountryid").val(data[0].fromshipmentcountryid);
        $("#etxtToshipmentcountryid").val(data[0].toshipmentcountryid);
        $("#etxtShipmentDate").val(data[0].shipmentdate);
        $("#etxtloadingport").val(data[0].fromshipmentportid);
        $("#etxtdischargeloadingport").val(data[0].toshipmentportid);
        $("#etxtHSCode").val(data[0].hscode);
        $("#epitypeid").val(data[0].pitypeid);
        if (data[0].pitypeid == "135") {
          $("#etextlabelchage").text("Through Shipment:");
          $scope.eshowRow = true;
        } else {
          $("#etextlabelchage").text("From Shipment :");
          $scope.eshowRow = false;
        }

        $("#etxtfreeincoterm").val(data[0].freeincoterm);
        $("#etxtfreepaymentterm").val(data[0].freepaymentterm);
        $("#etxttoleranceid").val(data[0].tolarenceid);

        $("#etxtBuyerRegNo").val(data[0].buyerregno);
        $("#etxttransportmodeid").val(data[0].shipmentid);
        $("#etxtcurrencyid").val(data[0].currencyid);
        $("#etxtpaymenttermid").val(data[0].paymenttermid);
        $("#edeliverytermid").val(data[0].deliverytermid);
        $("#etxtincotermid").val(data[0].incoid);
        $("#etermscon").val(data[0].termscondition);
        $("#edescription").val(data[0].descriptions);
        $("#eloadingplace").val(data[0].loadingplace);
        $("#edeliveryby").val(data[0].loadingbyid);

        $("#etxtBuyerBank").val(data[0].buyerbankdetails);
        $("#esellerbankid").val(data[0].sellerbankid);
        $("#ebuyerbankid").val(data[0].buyerbankid);

        $("#etxtBuyerHSCode").val(data[0].buyercountryhscode);
        $("#etranshipmentid").val(data[0].transhipment);
        $("#etxtpartialshipmentid").val(data[0].partialshipment);
        $("#etxtOriginCountry").val(data[0].originofcountry);
        $("#etxtOrderDate").val(data[0].buyerorderconfirmdate);
        $("#etxtNotifyParty").val(data[0].notifyparty);
        $("#etxtPaytermothers").val(data[0].otherspayterm);

        $("#ecredittypeid").val(data[0].credittypeid);
        $("#esalestypeid").val(data[0].salestypeid);
        $("#etxtCreditDays").val(data[0].creditdays);
        $("#etxtOCFNO").val(data[0].ocfno);
      } else if ($("#quotationid").val() === "2") {
        $(".pi").hide();
        $(".sq").show();
        $(".cp").hide();
        $(".spot").hide();
        $("#equotationtypeid").val(data[0].quotationtypeid);
        $("#etxtBuyerName").val(data[0].cusname);

        $("#ecredittypeid").val(data[0].credittypeid);
        $("#esalestypeid").val(data[0].salestypeid);
        $("#etxtCreditDays").val(data[0].creditdays);

        $("#etermscon").val(data[0].termscondition);
        $("#esqtypeid").val(data[0].sqtypeid);
        $("#etxtExpireDate").val(data[0].expiredate);
        $("#etxtOCFNO").val(data[0].ocfno);
      } else if ($("#quotationid").val() === "3") {
        $(".pi").hide();
        $(".sq").hide();
        $(".cp").hide();
        $(".spot").show();

        $("#ecredittypeid").val(data[0].credittypeid);
        $("#esalestypeid").val(data[0].salestypeid);
        $("#etxtCreditDays").val(data[0].creditdays);
        $("#etermscon").val(data[0].termscondition);
        $("#equotationtypeid").val(data[0].quotationtypeid);
        $("#etxtBuyerName").val(data[0].cusname);
        $("#etxtSpotDate").val(data[0].spotdate);
        $("#etxtSpotDODate").val(data[0].lastdateofdo);
        $("#etxtOCFNO").val(data[0].ocfno);
      } else if ($("#quotationid").val() === "4") {
        $(".pi").hide();
        $(".sq").hide();
        $(".cp").show();
        $(".spot").hide();

        $("#ecredittypeid").val(data[0].credittypeid);
        $("#esalestypeid").val(data[0].salestypeid);
        $("#etxtCreditDays").val(data[0].creditdays);
        $("#etermscon").val(data[0].termscondition);
        $("#ewhid").val(data[0].whid);
        $("#equotationtypeid").val(data[0].quotationtypeid);
        $("#etxtCAppStartDate").val(data[0].conappstatrdate);
        $("#etxtCAppEndDate").val(data[0].conappenddate);
        $("#etxtOCFNO").val(data[0].ocfno);
      }
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

      var selectedText = sqtext.options[sqtext.selectedIndex].text;

      //let ALPHA = selectedText.replace(/[0-9]/g, '');
      //let NUMBER = selectedText.match(/\d+/g);
      let ALPHA = selectedText.substring(0, 2);
      let NUMBER = selectedText.substring(selectedText.lastIndexOf("-") + 1);
      $("#sqidhidden").val(NUMBER);

      $scope.ID = NUMBER;
      if (ALPHA === "SQ") {
        $("#agreementtypeid").prop("disabled", false);
        $("#agreementtypeid").val("");
        $("#agreementtypeid option[value='PITOSC']").hide();
        $("#agreementid").val("");
        //$("#sqid").val(data[0].salesquotationheaderid);
        //$("#agreementtypeid").val(data[0].agreementtypeid);
        $("#txtDate").val("");
        $("#txtExpireDate").val("");
        $("#txtTariffCode").val("");

        $("#txtshipmentmodeid").val("");
        $("#txtFromshipmentcountryid").val("");
        $("#txtToshipmentcountryid").val("");
        $("#txtShipmentDate").val("");
        $("#txtloadingport").val("");
        $("#txtdischargeloadingport").val("");
        $("#txtHSCode").val("");

        $("#txtBuyerRegNo").val("");
        $("#txttransportmodeid").val("");
        $("#txtcurrencyid").val("");
        $("#txtpaymenttermid").val("");
        $("#deliverytermid").val("");
        $("#txtincotermid").val("");
        $("#termscon").val("");
        $("#description").val("");

        ($("#txtBuyerBank").val(""),
          $("#sellerbankid").val(""),
          $("#txtBuyerHSCode").val(""),
          $("#transhipmentid").val(""),
          $("#txtpartialshipmentid").val(""),
          $("#txtOriginCountry").val(""),
          $("#txtOrderDate").val(""),
          $("#txtNotifyParty").val(""),
          $("#txtPaytermothers").val(""));
      }
      if (ALPHA === "PI") {
        $("#agreementtypeid").val("PITOSC");
        $("#agreementtypeid").prop("disabled", true);
        $http({
          method: "GET",
          url: "/AgreementLanding/EditByMasterID",
          params: { id: $scope.ID },
        }).success(function (data) {
          $("#agreementid").val(data[0].agreementid);
          $("#txtDate").val(data[0].pidate);
          $("#txtExpireDate").val(data[0].piexpiredate);
          $("#txtTariffCode").val(data[0].tarrifcode);
          $("#txtTariffCodehidden").val(data[0].unitid);

          $("#txtshipmentmodeid").val(data[0].shipmentmodeid);
          $("#txtFromshipmentcountryid").val(data[0].fromshipmentcountryid);
          $("#txtToshipmentcountryid").val(data[0].toshipmentcountryid);
          $("#txtShipmentDate").val(data[0].shipmentdate);
          $("#txtloadingport").val(data[0].fromshipmentportid);
          $("#txtdischargeloadingport").val(data[0].toshipmentportid);
          $("#txtHSCode").val(data[0].hscode);

          $("#txtBuyerRegNo").val(data[0].buyerregno);
          $("#txttransportmodeid").val(data[0].shipmentid);
          $("#txtcurrencyid").val(data[0].currencyid);
          $("#txtpaymenttermid").val(data[0].paymenttermid);
          $("#deliverytermid").val(data[0].deliverytermid);
          $("#txtincotermid").val(data[0].incoid);
          $("#termscon").val(data[0].termscondition);
          $("#description").val(data[0].descriptions);

          ($("#txtBuyerBank").val(data[0].buyerbankdetails),
            $("#sellerbankid").val(data[0].sellerbankid),
            $("#txtBuyerHSCode").val(data[0].buyercountryhscode),
            $("#transhipmentid").val(data[0].transhipment),
            $("#txtpartialshipmentid").val(data[0].partialshipment),
            $("#txtOriginCountry").val(data[0].originofcountry),
            $("#txtOrderDate").val(data[0].buyerorderconfirmdate),
            $("#txtNotifyParty").val(data[0].notifyparty),
            $("#txtPaytermothers").val(data[0].otherspayterm));

          $scope.PIDetailsID($scope.ID);
        });
      } else {
        //$scope.Clear();
        $scope.detailsbyid = null;
        $scope.ClearLine();

        $http({
          method: "GET",
          url: "/AgreementLanding/GetSalesQuotationLine",
          params: { id: $("#sqid").val(), alpha: ALPHA },
        }).success(function (result) {
          $("#txtTariffCodehidden").val(result[0].unitid);
          $scope.detailsbyid = result;
          $scope.GetCusDate($scope.ID);
          $scope.SellerBankInfo($scope.ID);
        });
      }
    }
  };

  $scope.PIDetailsID = function (id) {
    $scope.ID = id;
    $http({
      method: "GET",
      url: "/AgreementLanding/GetAgreementLine",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.detailsbyid = result;
    });
  };

  $scope.EditbyDetailsID = function (id) {
    $scope.ID = id;
    $http({
      method: "GET",
      url: "/Quotation/OCFListView",
      params: { id: $scope.ID },
    }).success(function (result) {
      console.log(result);
      $scope.edetailsbyid = result;
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
        $("#eeitemcode").val(ui.item.id);
        $("#euom" + index).val(ui.item.uoM);

        return false;
      },
      minlength: 3,
    });
  };

  $scope.SearchDelHeader = function () {
    let cusid = $("#hcusid").val();
    console.log(cusid);

    $("#delPointname").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetDelPointlist/",
          type: "GET",
          dataType: "json",
          data: {
            unitid: 91,
            type: 135,
            cusId: cusid,
            prefix: request.term,
          },
          success: function (data) {
            console.log(data);
            response(
              $.map(data, function (item) {
                return {
                  label: item.strDisPointName,
                  value: item.strDisPointName,
                  id: item.id,
                  contactPerson: item.contractPerson,
                  contactNo: item.contractno,
                  address: item.address,
                };
              }),
            );
          },
          error: function () {
            console.error("Error fetching delivery points");
          },
        });
      },
      select: function (event, ui) {
        //   console.log(ui.item);
        $("#delPointname").val(ui.item.value);

        $("#delPointId").val(ui.item.id);

        $("#txtContractPerson").val(ui.item.contactPerson || "N/A");

        $("#txtContractNo").val(ui.item.contactNo || "N/A");

        $("#txtAdress").val(ui.item.address || "N/A");

        return false;
      },
      minLength: 1,
    });
  };

  $scope.EDITSearchDelHeader = function () {
    let cusid = $("#ehcusid").val();
    console.log(cusid);

    $("#edelPointname").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetDelPointlist/",
          type: "GET",
          dataType: "json",
          data: {
            unitid: 91,
            type: 0,
            cusId: cusid,
            prefix: request.term,
          },
          success: function (data) {
            console.log(data);
            response(
              $.map(data, function (item) {
                return {
                  label: item.strDisPointName,
                  value: item.strDisPointName,
                  id: item.id,
                  contactPerson: item.contractPerson,
                  contactNo: item.contractno,
                  address: item.address,
                };
              }),
            );
          },
          error: function () {
            console.error("Error fetching delivery points");
          },
        });
      },
      select: function (event, ui) {
        //   console.log(ui.item);

        $("#edelPointname").val(ui.item.value);

        $("#edelPointId").val(ui.item.id);

        $("#etxtContractPerson").val(ui.item.contactPerson || "N/A");

        $("#etxtContractNo").val(ui.item.contactNo || "N/A");
        // alert(ui.item.address);

        $("#etxtAddress").val(ui.item.address || "N/A");

        return false;
      },
      minLength: 1,
    });
  };

  $scope.SearchFGHeader = function () {
    $("#txtTariffCodehidden").val("91");

    var checksq = $(".sqid").val();
    var checkesqid = $(".eesqid").val();

    if (checksq != 0 || checkesqid != "") {
      $("#name,#ename").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/SalesQuatationLanding/GetFGlist/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term, unitid: 91 },
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
          $("#eeitemcode").val(ui.item.id);
          $("#ehname").val(ui.item.id);
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

  $scope.SearchOCF = function () {
    $("#txtOCFNO").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Quotation/GetOCF/",
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
        if ($("#quotationtypeid").val() === "") {
          notify("warning", "Alert Message", "Please Select Quotation Type.");
        } else {
          $("#ocfid").val(ui.item.id);
          $scope.CheckQuotationExist(ui.item.id);
          $scope.ViewByDetailsOCF(ui.item.id);
          return false;
        }
      },
      minlength: 3,
    });
  };

  //$scope.SearchOCF = function () {
  //    $("#txtOCFNO").autocomplete({
  //        source: function (request, response) {
  //            $.ajax({
  //                url: '/Quotation/GetOCF/',
  //                type: "Get",
  //                dataType: "json",
  //                data: { prefix: request.term },
  //                success: function (data) {
  //                    response($.map(data, function (item) {
  //                        return { label: item.name, id: item.id };
  //                    }));
  //                }
  //            });
  //        },
  //        select: function (event, ui) {

  //            $("#ocfid").val(ui.item.id);
  //            $scope.CheckQuotationExist(ui.item.id);
  //            $scope.ViewByDetailsOCF(ui.item.id);
  //            return false;
  //        },
  //        minlength: 3
  //    });
  //}

  $scope.ViewByDetailsOCF = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/Quotation/GetOCFItems",
      params: { id: $scope.ID },
    }).success(function (result) {
      console.log(result);
      $scope.ocflist = null;
      $scope.ocflist = result;

      $("#txtBuyerName").val(result[0].buyername);
      $("#hcusid").val(result[0].buyerid);
    });
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

        $("#ehsellerid").val(ui.item.id);

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
          url: "/Quotation/GetCusInfo/",
          type: "Get",
          dataType: "json",
          data: { prefix: request.term, unitid: 91 },
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
  const tagContainer = document.getElementById("tagContainer");
  const tagInput = document.getElementById("txtHSCode");

  $scope.GetHSCode = function (status, index) {
    //  alert(status)
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

          createTag(ui.item.id);
          tagInput.value = "";
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

          createTag(ui.item.id);
          tagInput.value = "";
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
          createTag(ui.item.id);
          tagInput.value = "";
          return false;
        },
        minlength: 3,
      });
    }
  };

  $scope.tags = "";

  function createTag(value) {
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.innerHTML = `${value} <button>x</button>`;
    const removeButton = tag.querySelector("button");

    removeButton.addEventListener("click", () => {
      tag.remove();
    });

    tagContainer.appendChild(tag);

    const tags = tagContainer.querySelectorAll(".tag");
    const values = Array.from(tags).map((tag) =>
      tag.textContent.replace("x", "").trim(),
    );
    $scope.tags = values;
    console.log($scope.tags);
  }

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
});
