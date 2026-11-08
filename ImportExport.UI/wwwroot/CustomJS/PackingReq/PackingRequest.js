var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http, $timeout) {
  $scope.checkavailable = function (i) {
    var isAllValid = true;
    if (
      parseFloat($("#remainingqty" + i).val()) <
      parseFloat($("#tobeqty" + i).val())
    ) {
      isAllValid = false;
      $("#tobeqty" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#tobeqty" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }
  };

  $(document).on("click", "#checkboxAllPR", function () {
    var isChecked = this.checked;
    $("#keditmycontainer input[name='checkmulPR']").prop("checked", isChecked);
  });

  $scope.echeckavailable = function (i) {
    var isAllValid = true;
    if (
      parseFloat($("#eremainingqty" + i).val()) <
      parseFloat($("#epackingreqquantity" + i).val())
    ) {
      isAllValid = false;
      $("#etobeqty" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etobeqty" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }
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

  //$scope.generateRandomNumber = function () {
  //    var randomNumber = Math.floor(1000 + Math.random() * 9000);
  //    var currentDate = new Date();
  //    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  //    var year = currentDate.getFullYear().toString().slice(-2);
  //    var finalNumber = randomNumber.toString() + month + year;
  //    document.getElementById('txtInvoiceCode').value = finalNumber;
  //};

  $scope.generateRandomNumber = function () {
    document.getElementById("txtInvoiceCode").value = "0";
  };

  $scope.GetAllData = function () {
    $http({
      method: "get",
      url: "/PackingRequest/GetAllData",
    }).then(function (response) {
      console.log(response.data);
      $scope.getalldata = response.data;
      $scope.generateRandomNumber();
    });
  };

  $scope.DeleteMaster = function (id) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "get",
        url: "/PackingRequest/DeleteMasterByID",
        params: { id: id },
      }).then(function (result) {
        notify("success", "Success Messsage", result.data);
        $scope.GetAllData();
      });
    } else {
    }
  };

  $scope.DeleteByLineID = function (id) {
    $("#keditmycontainer").on("click", ".btn-danger", function () {
      $(this).parents("tr").remove();
    });
  };

  $scope.DeleteByLineIDEdit = function (id) {
    $http({
      method: "get",
      url: "/PackingRequest/DeleteLineByID",
      params: { id: id },
    }).then(function (result) {
      notify("success", "Success Messsage", result.data);
    });
  };

  function toDateInputFormat(dateString) {
    var date = new Date(dateString.replace(" ", "T"));
    if (!isNaN(date.getTime())) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
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
    $("#vSINO").text("");
    $("#vFileName").text("");
    toggleDownloadButton();

    var combo;
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PackingRequest/ViewMasterOn",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.masterdata = data;

      $("#vtxtPISC").val(data[0].packreqnumber);

      var PROCESSCODE = data[0].packreqnumber;

      $http({
        method: "GET",
        url: "/SalesQuatationLanding/GetFileDetails",
        params: { prefix: PROCESSCODE },
      }).success(function (data) {
        GetUploadFileUsingAPI(PROCESSCODE, data[0].filetype);
      });
    });

    $scope.ViewByDetailsData(ID);
    $scope.ViewLoadDocumentStatus(ID);
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

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PackingRequest/GetDocStatus",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.docstatusview = result;
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
      var normalized = angular.extend({}, row, {
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

      // Recalculate remaining qty per-row: Agg. wise Quantity - Accepted Quantity
      var qty = parseFloat(normalized.quantity) || 0;
      var accepted = parseFloat(normalized.packingreqquantity) || 0;
      //normalized.remainingqty = qty - accepted;

      return normalized;
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

  $scope.SearchPI = function () {
    $("#txtPISC").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/PackingRequest/GetPIInfo/",
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
        $("#txtPINumber").val(ui.item.Name);
        $("#txtPISCID").val(ui.item.id);
        $scope.GetMillByPISC(ui.item.id);

        $scope.LoadShippedfromAndTo(ui.item.id);
        $scope.GetCusDataByPISC(ui.item.id);

        $scope.GetPIDetailsData(ui.item.id);

        return false;
      },
      minlength: 2,
    });
  };

  $scope.GetPIDetailsData = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "/PackingRequest/GetPIDetailsByIDOnAdd",
    }).then(function (response) {
      console.log(response);
      $scope.detailsbyid = $scope.normalizePackingRequestRows(response.data);
    });
  };

  $scope.navigateToNextRowSameColumn = function (event, index, fieldIdPrefix) {
    if (event.keyCode === 13) {
      event.preventDefault();

      const nextElementId = `${fieldIdPrefix}${index + 1}`;
      const nextElement = document.getElementById(nextElementId);

      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  $scope.Save = function () {
    if (confirm("Are You Sure? You Want to Save this Record.") == true) {
      var Details = [];

      let isAllValid = true;
      var isAllValiditems = true;

      if ($("#txtPackingReqDate").val() == "") {
        isAllValid = false;
        $("#txtPackingReqDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtPackingReqDate")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtShipmentPeriod").val() == "") {
        isAllValid = false;
        $("#txtShipmentPeriod")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtShipmentPeriod")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtPurchaseOderDate").val() == "") {
        isAllValid = false;
        $("#txtPurchaseOderDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtPurchaseOderDate")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtInvoiceDate").val() == "") {
        isAllValid = false;
        $("#txtInvoiceDate")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtInvoiceDate").siblings("span.error").css("visibility", "hidden");
      }

      //if ($("#txtInvoiceNumber").val() == "") {
      //    isAllValid = false;
      //    $("#txtInvoiceNumber").siblings('span.error').css('visibility', 'visible');

      //}
      //else {
      //    $("#txtInvoiceNumber").siblings('span.error').css('visibility', 'hidden');
      //}

      if ($("#txtInvoiceTo").val() == "") {
        isAllValid = false;
        $("#txtInvoiceTo").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtInvoiceTo").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtShipperPer").val() == "") {
        isAllValid = false;
        $("#txtShipperPer").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtShipperPer").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtContract").val() == "") {
        isAllValid = false;
        $("#txtContract").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtContract").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtPurchaseOderNo").val() == "") {
        isAllValid = false;
        $("#txtPurchaseOderNo")
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        $("#txtPurchaseOderNo")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if (
        $("#keditmycontainer input[name='checkmulPR']:checked").length === 0
      ) {
        isAllValid = false;
        notify(
          "warning",
          "Warning Message",
          "Please check at least one item to save.",
        );
        return;
      }

      if (isAllValid) {
        let focus = 0;
        $("#keditmycontainer input[name='checkmulPR']:checked").each(
          function () {
            focus++;

            // Recover the row's $index from the data attribute
            var index = $(this).data("index");
            if (index === undefined || index === null) return;

            // Only Exp Production Date is required
            if (!$("#Exproductiondate" + index).val()) {
              isAllValiditems = false;
              $("#Exproductiondate" + index)
                .siblings("span.error")
                .css("visibility", "visible");
            } else {
              $("#Exproductiondate" + index)
                .siblings("span.error")
                .css("visibility", "hidden");
            }

            // Mill ID is required (treat blank and "0" as missing — the placeholder "--Select Mill--" has value="")
            var millVal = $("#MillID" + index).val();

            if (
              millVal === undefined ||
              millVal === null ||
              millVal === "" ||
              millVal === "0"
            ) {
              // catches "", null, undefined
              isAllValiditems = false;
              $("#MillID" + index)
                .siblings("span.error")
                .css("visibility", "visible");
            } else {
              $("#MillID" + index)
                .siblings("span.error")
                .css("visibility", "hidden");
            }

            // Hide error indicators for all other line fields (no longer validated)
            $(
              "#CountNo" +
                index +
                ",#TotalPallet" +
                index +
                ",#TotalCartoon" +
                index +
                ",#AddWeight" +
                index +
                ",#GrossWeight" +
                index +
                ",#SINo" +
                index +
                ",#TotalSpool" +
                index +
                ",#MarkInk" +
                index +
                ",#SpoolOrPalat" +
                index,
            )
              .siblings("span.error")
              .css("visibility", "hidden");

            if (isAllValiditems) {
              var details = {
                ID: $("#pisclineid" + index).val(),
                ITEMID: $("#itemcode" + index).val(),
                QUANTITY: $("#quantity" + index).val(),
                PACKINGREQQUANTITY: $("#packingreqquantity" + index).val(),
                EXPPRODUCTIONORDERDATE: $("#Exproductiondate" + index).val(),

                // Numeric fields — coerced to 0 when blank to avoid SQL conversion errors
                TRUSSNO: $("#TrussNo" + index).val() || 0,
                CountNo: $("#CountNo" + index).val() || 0,
                TotalPallet: $("#TotalPallet" + index).val() || 0,
                TotalCartoon: $("#TotalCartoon" + index).val() || 0,
                TotalBale: $("#TotalBale" + index).val() || 0,
                TotalTare: $("#TotalTare" + index).val() || 0,
                AddWeight: $("#AddWeight" + index).val() || 0,
                GrossWeight: $("#GrossWeight" + index).val() || 0,
                TotalSpool: $("#TotalSpool" + index).val() || 0,
                MILLID: $("#MillID" + index).val() || 0,

                // String fields — sent as-is (empty string acceptable)
                Measurement: $("#Measurement" + index).val(),
                SINo: $("#SINo" + index).val(),
                MILLNAME: $("#MillID" + index).text(),
                MarkInk: $("#MarkInk" + index).val(),
                SpoolOrPalat: $("#SpoolOrPalat" + index).val(),
                REMARKS: $("#remarks" + index).val(),
                DESCRIPTIONS: $("#shortdescription" + index).val(),
              };

              if (details.ITEMID) {
                Details.push(details);
              }
            } else {
              isAllValid = false;
            }
          },
        );

        if (isAllValid && isAllValiditems) {
          var master = {
            PACKREQDATE: $("#txtPackingReqDate").val(),
            CUSTOMERID: $("#hcusid").val(),
            PISCNUMBER: $("#txtPISCID").val(),
            SHIPMENTPERIOD: $("#txtShipmentPeriod").val(),
            TERMSCONDITION: $("#termscon").val(),
            DESCRIPTIONS: $("#description").val(),
            PACKINGMODE: $("#packingmodeid").val(),
            CUSTOMERCATEGORY: $("#customercategotryid").val(),
            SHIPPOINT: $("#shippointid").val(),
            BIAXPROTYPE: $("#biaxtypeid").val(),
            INVOICENUMBER: $("#txtInvoiceCode").val(),
            INVOICEDATE: $("#txtInvoiceDate").val(),
            INVOICETO: $("#txtInvoiceTo").val(),
            UNITID: $("#hunitid").val(),
            SHIPPEDFROM: $("#txtShippedfrom").val(),
            SHIPPEDTO: $("#txtShippedto").val(),

            PURCHASEORDERNO: $("#txtPurchaseOderNo").val(),
            PURCHASEORDERDATED: $("#txtPurchaseOderDate").val(),

            SHIPPEDPER: $("#txtShipperPer").val(),
            CONTRACTNO: $("#txtContract").val(),
          };

          $.ajax({
            type: "POST",
            url: "/PackingRequest/Save",
            dataType: "json",
            data: { pr: master, prd: Details },
            success: function (result) {
              // Validation/error message from SP — no record saved
              if (!result || result.indexOf(":") === -1) {
                notify(
                  "warning",
                  "Warning Message",
                  result || "Unable to save record.",
                );
                return;
              }

              // Success path — record saved, upload file and refresh
              UploadFileUsingAPI(result.split(":")[1]);
              notify("success", "Success Message", result);
              $scope.GetAllData();
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
    }
  };

  $scope.Clear = function () {
    $(".error").css("visibility", "hidden");
    $("#termscon").val("");
    $("#description").val("");
    $scope.detailsbyid = null;
    $("#hcusid").val(0);
    $("#txtPhone").val("");
    $("#txtBuyerName").val("");
    $("#txtEmail").val("");
    $("#txtAddress").val("");

    $("#txtPISC").val("");
    $("#txtPISCID").val("");

    $("#txtPackingReqDate").val("");
    $("#txtShipmentPeriod").val("");
    $("#txtPINumber").val("");

    $("#txtInvoiceTo").val("");
    $("#txtShippedfrom").val("");
    $("#txtShippedto").val("");

    //$("#txtInvoiceNumber").val('');
    $("#txtInvoiceDate").val("");
    $("#txtShipperPer").val("");
    $("#txtContract").val("");
    $("#txtPurchaseOderNo").val("");
    $("#txtPurchaseOderDate").val("");

    $scope.generateRandomNumber();
  };

  $scope.Update = function () {
    if (confirm("Are You Sure? You Want to Update this Record.") == true) {
      var Details = [];
      var isAllValid = true;

      if (isAllValid) {
        var master = {
          ID: $("#etxtPISCID").val(),
          PACKREQDATE: $("#etxtPackingReqDate").val(),
          PACKREQNUMBER: $("#etxtPISC").val(),
          CUSTOMERID: $("#ehcusid").val(),
          PISCNUMBER: 1,
          SHIPMENTPERIOD: $("#etxtShipmentPeriod").val(),
          TERMSCONDITION: $("#etxtermscon").val(),
          DESCRIPTIONS: $("#etxtdescription").val(),
          PACKINGMODE: $("#etxtpackingmodeid").val(),
          CUSTOMERCATEGORY: $("#etxtcustomercategotryid").val(),
          SHIPPOINT: $("#etxtshippointid").val(),
          BIAXPROTYPE: $("#etxtbiaxtypeid").val(),
          INVOICENUMBER: $("#etxtInvoiceCode").val(),
          INVOICEDATE: $("#etxtInvoiceDate").val(),
          INVOICETO: $("#etxtInvoiceTo").val(),

          SHIPPEDFROM: $("#etxtShippedfrom").val(),
          SHIPPEDTO: $("#etxtShippedto").val(),

          PURCHASEORDERNO: $("#etxtPurchaseOderNo").val(),
          PURCHASEORDERDATED: $("#etxtPurchaseDated").val(),

          SHIPPEDPER: $("#etxtShipperPer").val(),
          CONTRACTNO: $("#etxtContract").val(),
        };

        var PROCESSCODE = $("#etxtPINumber").val();

        $http({
          method: "GET",
          url: "/SalesQuatationLanding/GetFileDetails",
          params: { prefix: PROCESSCODE },
        }).success(function (data) {
          EditFileUsingAPI(PROCESSCODE);
        });

        if (isAllValid) {
          $.ajax({
            type: "POST",
            url: "/PackingRequest/UpdateMaster",
            dataType: "json",
            data: { pr: master, prd: Details },
            success: function (result) {
              notify("success", "Success Message", result);
              $scope.GetAllData();
              $scope.Clear();
              $("#updatebutton").prop("disabled", true);
            },
            error: function (errormessage) {
              notify("error", "Error Message", errormessage.responseText);
            },
          });
        }
      }
    }
  };

  $scope.LoadShippedfromAndTo = function (id) {
    $.ajax({
      url: "/PackingRequest/GetShipment",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        console.log("Shipment response:", data);
        $("#txtShippedfrom").val(data[0].fromshipment);
        $("#txtShippedto").val(data[0].toshipment);

        $("#hunitid").val(data[0].unitid);
      },
      error: function (xhr) {
        console.error("Shipment call failed:", xhr.responseText); // <-- add this
      },
    });
  };

  $scope.GetCusData = function (id) {
    $.ajax({
      url: "/LC/GetCusInfo",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $("#txtInvoiceTo").val(data[0].name);

        $("#hcusid").val(data[0].id);
        $("#txtBuyerName").val(data[0].name);
        $("#txtCusCode").val(data[0].id);
        $("#txtCusCode").val(1);
        $("#txtPhone").val(data[0].phone);
        $("#txtEmail").val(data[0].email);
        $("#txtTIN").val(data[0].tin);
        $("#txtTIN").val(1);
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

  $scope.GetCusDataByPISC = function (id) {
    $.ajax({
      url: "/PackingRequest/GetCusInfoByPISC",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        if (data && data.length > 0) {
          $("#hcusid").val(data[0].id);
          $("#txtInvoiceTo").val(data[0].name);
        }
      },
    });
  };

  $scope.GetSellerData = function (id) {
    $.ajax({
      url: "/PriceConfirm/GetSellerInfo",
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
      },
    });
  };
  $scope.EditGetCusData = function (id) {
    $.ajax({
      url: "/PriceConfirm/GetCusInfoGeneral",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $("#ehcusid").val(data[0].id);
        $("#etxtBuyerName").val(data[0].name);
        $("#etxtCusCode").val(data[0].id);
        $("#etxtPhone").val(data[0].phone);
        $("#etxtEmail").val(data[0].email);

        $("#etxtAddress").val(data[0].address);
      },
    });
  };

  $scope.EditGetSellerData = function (id) {
    $.ajax({
      url: "/PriceConfirm/GetSellerInfoGeneral",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $("#etxtComName").val(data[0].name);
        $("#ehsellerid").val(data[0].id);
        $("#etxtSellerPhone").val(data[0].phone);
        $("#etxtSellerEmail").val(data[0].email);
        $("#etxtSellerTIN").val(data[0].tin);
        $("#etxtSellerAddress").val(data[0].address);
      },
    });
  };

  // Function to update remaining quantity
  $scope.eupdateRemainingQty = function (list, index) {
    var remaining = parseFloat(list.remainingqty) || 0;
    var entered = parseFloat(list.packingreqquantity) || 0;

    if (entered > remaining) {
      alert("Accepted Quantity cannot be more than the Remaining Quantity");

      list.packingreqquantity = 0;
      $("#epackingreqquantity" + index).val(remaining);
    } else {
      $("#eremainingqty" + index).val(remaining - entered);
    }
  };

  $scope.updateRemainingQty = function (list, index) {
    var remaining = parseFloat(list.remainingqty) || 0;
    var entered = parseFloat(list.packingreqquantity) || 0;

    if (entered > remaining) {
      alert("Accepted Quantity cannot be more than the Remaining Quantity");

      list.packingreqquantity = 0;
      $("#packingreqquantity" + index).val(remaining);
    } else {
      $("#remainingqty" + index).val(remaining - entered);
    }
  };

  $scope.EditbyMasterID = function (id, cusid) {
    $("#hpackinglineid").val(id);
    $.ajax({
      url: "/PackingRequest/ViewMasterOn",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $scope.EditGetCusData(cusid);

        $("#etxtPISCID").val(data[0].id);

        $("#etxtPISC").val(data[0].packreqnumber);
        $("#etxtPINumber").val(data[0].packreqnumber);
        $("#etermscon").val(data[0].termscondition);
        $("#edescription").val(data[0].descriptions);

        var packReqDate = toDateInputFormat(data[0].packreqdate);
        $("#etxtPackingReqDate").val(packReqDate);

        var shipmentPeriodDate = toDateInputFormat(data[0].shipmentperiod);
        $("#etxtShipmentPeriod").val(shipmentPeriodDate);

        var purchaseOrderDate = toDateInputFormat(data[0].purchaseorderdated);
        $("#etxtPurchaseDated").val(purchaseOrderDate);

        //let invoicenumber = data[0].invoicenumber;
        //let invoiceCode = invoicenumber.slice(-8);
        //let invoiceNumber = invoicenumber.slice(0, -8);

        //$("#etxtInvoiceNumber").val(invoiceNumber);
        //$("#etxtInvoiceCode").val(invoiceCode);

        $("#etxtInvoiceCode").val(
          $scope.formatInvoiceNo(data[0].invoicenumber),
        );

        $("#etxtInvoiceDate").val(data[0].invoicedate);
        $("#etxtInvoiceTo").val(data[0].invoiceto);
        $("#etxtShippedfrom").val(data[0].shippedfrom);
        $("#etxtShippedto").val(data[0].shippedto);
        $("#etxtShipperPer").val(data[0].shippedper);
        $("#etxtContract").val(data[0].contractno);
        $("#etxtPurchaseOderNo").val(data[0].purchaseorderno);

        var PROCESSCODE = data[0].packreqnumber;

        EditFileUsingAPI(PROCESSCODE);

        $scope.GetMillByPISC(data[0].piscnumber);
        $scope.GetMillByPISC(data[0].piscnumber || data[0].packreqnumber);

        $scope.EditDetailsByID(id);
      },
    });
  };

  $scope.makeItDat = function (index, data) {
    var packReqDate = toDateInputFormat(data[index].packreqdate);
    $("#etxtPackingReqDate").val(packReqDate);
  };

  $scope.EditDetailsByID = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "/PackingRequest/ViewByDetailsID",
    }).then(function (response) {
      $scope.edetailsbyid = $scope.normalizePackingRequestRows(response.data);
    });
  };

  $scope.UpdateByLineID = function (i, id) {
    var isAllValid = true;

    if ($("#packingreqquantity" + i).val() == "") {
      isAllValid = false;
      $("#packingreqquantity" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#packingreqquantity" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#exproductiondate" + i).val() == "") {
      isAllValid = false;
      $("#exproductiondate" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#exproductiondate" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if (isAllValid) {
      if (
        parseFloat($("#eremainingqty" + i).val()) <
        parseFloat($("#etobeqty" + i).val())
      ) {
        isAllValid = false;
        $("#etobeqty" + i)
          .siblings("span.error")
          .css("visibility", "visible");
      }

      if (
        parseFloat($("#exproductiondate" + i).val()) <
        parseFloat($("#exproductiondate" + i).val())
      ) {
        isAllValid = false;
        $("#exproductiondate" + i)
          .siblings("span.error")
          .css("visibility", "visible");
      } else {
        isAllValid = true;
        $("#etobeqty" + i)
          .siblings("span.error")
          .css("visibility", "hidden");

        var details = {
          ID: id,
          ITEMID: $("#eitemcode" + i).val(),
          PACKINGREQQUANTITY: parseFloat($("#epackingreqquantity" + i).val()),
          EXPPRODUCTIONORDERDATE: $("#exproductiondate" + i).val(),
          TRUSSNO: $("#etrussNo" + i).val(),
          REMARKS: $("#eremarks" + i).val(),
          DESCRIPTIONS: $("#edescriptions" + i).val(),
          CountNo: $("#ecountNo" + i).val(),
          TotalPallet: $("#etotalPallet" + i).val(),
          TotalCartoon: $("#etotalCartoon" + i).val(),
          TotalBale: $("#etotalBale" + i).val(),
          TotalTare: $("#etotalTare" + i).val(),
          AddWeight: $("#eaddWeight" + i).val(),
          GrossWeight: $("#egrossWeight" + i).val(),
          Measurement: $("#emeasurement" + i).val(),
          SINo: $("#esiNo" + i).val(),
          TotalSpool: $("#etotalSpool" + i).val(),
          MILLID: $("#editMillName" + i).val(),
          MarkInk: $("#emarkInk" + i).val(),
          SpoolOrPalat: $("#espoolOrPalat" + i).val(),
        };
      }

      if (isAllValid) {
        $.ajax({
          type: "POST",
          url: "/PackingRequest/UpdateDetailsByID",
          dataType: "json",
          data: { prc: details },
          success: function (result) {
            notify("success", "Success Message", result);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    }
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
  $scope.Report = function (id) {
    var rooturl = "";

    var folder = "/EXPORT/COMMON/JuteInvoiceReport";

    var url =
      rooturl +
      folder +
      "&prnum=" +
      id +
      "&AJR=" +
      id +
      "&data=" +
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

  $scope.GetPackingMode = function () {
    $http({
      method: "get",
      url: "/PackingRequest/GetPackingMode",
      params: {},
    }).then(function (response) {
      $scope.packingmodelist = response.data;
    });
  };

  $scope.GetCustomerCategory = function () {
    $http({
      method: "get",
      url: "/PackingRequest/GetCustomerCategory",
      params: {},
    }).then(function (response) {
      $scope.customercategorylist = response.data;
    });
  };

  $scope.GetShipPoint = function () {
    $http({
      method: "get",
      url: "/PackingRequest/GetShipPoint",
      params: {},
    }).then(function (response) {
      $scope.shippointlist = response.data;
    });
  };

  $scope.GetMillByUnit = function (unitid) {
    $http({
      method: "get",
      url: "/PackingRequest/GetMillByUnit",
      params: { unitid: unitid },
    }).then(
      function (response) {
        $scope.milllist = response.data;
      },
      function () {
        $scope.milllist = [];
      },
    );
  };

  $scope.GetMillByPISC = function (piscid) {
    $http({
      method: "get",
      url: "/PackingRequest/GetMillByPISC",
      params: { piscid: piscid },
    }).then(
      function (response) {
        $scope.milllist = response.data;
        if (!$scope.milllist || $scope.milllist.length === 0) {
          $scope.GetMillByUnit($("#hUnitID").val());
        }
      },
      function () {
        $scope.GetMillByUnit($("#hUnitID").val());
      },
    );
  };

  $scope.OpenReport = function (id, reportName) {
    if (!reportName) return;

    var rooturl = "";
    var reportConfig = null;

    switch (reportName) {
      case "JuteInvoiceReport":
        reportConfig = {
          folder: "/Export/JUTE/Invoice_Report",
          paramName: "HEADERID",
        };
        break;
      case "PackingListReport":
        reportConfig = {
          folder: "/Export/JUTE/Declaration_Report",
          paramName: "HEADERID",
        };
        break;
      case "ThePackingList":
        reportConfig = {
          folder: "/Export/JUTE/PackingList_Report",
          paramName: "HEADERID",
        };
        break;
      default:
        return;
    }

    var url =
      rooturl +
      reportConfig.folder +
      "&" +
      reportConfig.paramName +
      "=" +
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

    setTimeout(function () {
      $scope.$apply(function () {
        var row = $scope.getalldata.find(function (r) {
          return r.id === id;
        });
        if (row) row.selectedReport = "";
      });
    }, 100);
  };
});
