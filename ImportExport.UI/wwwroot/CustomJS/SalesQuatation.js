/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.directive("runoncreate", function ($timeout) {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      $timeout(function () {
        scope.$eval(attrs.runoncreate); // calls your function
      }, 0); // wait for DOM to exist
    },
  };
});

app.controller("Ctl", function ($scope, $window, $http, $timeout) {
  angular.element("#quantity").val(0);
  angular.element("#unitprice").val(0);
  angular.element("#vatamount").val(0);
  angular.element("#discountamount").val(0);
  angular.element("#totalamount").val(0);

  $scope.loading = true;

  $scope.BindItemNameBlur = function () {
    $("#name").on("blur", function () {
      // delay so autocomplete's select fires first
      setTimeout(function () {
        var id = $("#itemcode").val();
        if (!id || id === "0") {
          $("#name").val("");
          $("#itemcode").val("");
        }
      }, 200);
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

  $scope.EnableDisableItemTypeWise = function () {
    $scope.firstBtn = true;

    var Value = $("#itemtypeid").val();

    // Clear Item Name (and its hidden code)
    $("#name").val("");
    $("#itemcode").val("");
    $("#hname").val("");

    // Clear all fields first
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

    // Hide all error spans
    $("#name").siblings("span.error").css("visibility", "hidden");
    $("#txtSize").siblings("span.error").css("visibility", "hidden");
    $("#txtConstruction").siblings("span.error").css("visibility", "hidden");
    $("#txtWeight").siblings("span.error").css("visibility", "hidden");
    $("#txtSlit").siblings("span.error").css("visibility", "hidden");
    $("#txtScrim").siblings("span.error").css("visibility", "hidden");
    $("#txtQuality").siblings("span.error").css("visibility", "hidden");

    // Enable all first, then disable based on type
    var allFields = [
      "#txtSize",
      "#txtWeight",
      "#txtConstruction",
      "#txtSlit",
      "#txtScrim",
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    var disableFields = [];

    if (Value == "1") {
      disableFields = [
        "#txtSize",
        "#txtWeight",
        "#txtConstruction",
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

  $scope.SearchFGLineExcelUpload = function (element) {
    var $input = $(element);

    // prevent multiple initialization
    if ($input.data("ui-autocomplete")) {
      return;
    }

    $input.autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetFGlist/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#ehsellerid").val(),
          },

          success: function (data) {
            response(
              $.map(data, function (item) {
                return {
                  label: item.name,
                  value: item.name,
                  id: item.id,
                  uoM: item.uoM,
                };
              }),
            );
          },
        });
      },

      minLength: 1,

      select: function (event, ui) {
        var row = $input.closest("tr");

        // set selected text
        $input.val(ui.item.value);

        // hidden item id
        row.find(".itemcode").val(ui.item.id);

        // uom
        row.find(".uomid").val(ui.item.uoM);

        return false;
      },
    });
  };

  $scope.UploadExcelSalesQuotation = function () {
    if ($("#hsellerid").val() === "" || $("#txtComName").val() === "") {
      alert("Please select Seller Info before Excel File Upload!");
      return;
    } else {
      var fileInputSQ = $("#fileInputSQ")[0].files[0];
      if (!fileInputSQ) {
        alert("Please select a file before uploading.");
        return;
      } else {
        var inputdata = null;

        var fd = new FormData();
        fd.append("uploadFile", $("#fileInputSQ")[0].files[0]);
        inputdata = fd;

        inputdata.skipAjaxPrefilter = true;

        $.ajax({
          type: "Post",
          url: "/SalesQuatationLanding/FileUpload",
          data: inputdata,
          processData: false,
          contentType: false,
          traditional: true,
          async: true,
          success: function (data) {
            $("#itemmodelSQ").modal("hide");

            var sqlinelist = data.data;
            console.log(sqlinelist);
            angular.forEach(sqlinelist, function (ditem, index) {
              if (index === 0) {
                return;
              } // skip first row
              else {
                $scope.ExcelUploadAdd(ditem, index);
              }
            });
          },
          error: function () {
            alert("Upload Failed");
            $("#itemmodelSQ").modal("hide");
          },
        });
      }
    }
  };

  $scope.ExcelUploadAdd = function (ditem, index) {
    //FUNCTION WRITTEN BY MUBTASIM AHMED RAKHEEN 586992
    // Item Type Check
    if (ditem.ItemType == null || ditem.ItemType == "") {
      alert("Item Type required! Excel Row: " + (index + 1));
      return;
    }

    // Item Name Check
    else if (ditem.ItemName == null || ditem.ItemName == "") {
      alert("Item Name is required! Excel Row: " + (index + 1));
      return;
    }

    // Size Check (only if enabled)
    else if (
      ditem.ItemType == "YARN" &&
      ditem.Size != null &&
      ditem.Size != ""
    ) {
      alert("Size needs to be null for YARN! Excel Row: " + (index + 1));
      return;
    }

    // Construction Check (only if enabled)
    else if (
      ditem.ItemType == "YARN" &&
      ditem.Construction != null &&
      ditem.Construction != ""
    ) {
      alert(
        "Construction needs to be null for YARN! Excel Row: " + (index + 1),
      );
      return;
    } else if (
      ditem.ItemType == "NON-WEAVEN" &&
      ditem.Construction != null &&
      ditem.Construction != ""
    ) {
      alert(
        "Construction needs to be null for NON-WEAVEN! Excel Row: " +
          (index + 1),
      );
      return;
    }

    // Weight Check(only if enabled)
    else if (
      ditem.ItemType == "YARN" &&
      ditem.Weight != null &&
      ditem.Weight != ""
    ) {
      alert("Weight needs to be null for YARN! Excel Row: " + (index + 1));
      return;
    }

    // Slit Check(only if enabled)
    else if (
      ditem.ItemType == "YARN" &&
      ditem.Slit != null &&
      ditem.Slit != ""
    ) {
      alert("Slit needs to be null for YARN! Excel Row: " + (index + 1));
      return;
    } else if (
      ditem.ItemType == "WEAVING" &&
      ditem.Slit != null &&
      ditem.Slit != ""
    ) {
      alert("Slit needs to be null for WEAVING! Excel Row: " + (index + 1));
      return;
    }

    // Scrim Check(only if enabled)
    else if (
      ditem.ItemType == "YARN" &&
      ditem.Scrim != null &&
      ditem.Scrim != ""
    ) {
      alert("Scrim needs to be null for YARN! Excel Row: " + (index + 1));
      return;
    } else if (
      ditem.ItemType == "WEAVING" &&
      ditem.Scrim != null &&
      ditem.Scrim != ""
    ) {
      alert("Scrim needs to be null for WEAVING! Excel Row: " + (index + 1));
      return;
    }

    // Quality Check
    //else if (ditem.Quality == null || ditem.Quality == "") {
    //    alert("Quality is required! Excel Row: " + (index+1));
    //    return;
    //}

    // Item Title Check
    //else if (ditem.ItemTitle == null || ditem.ItemTitle == "") {
    //    alert("Item Title is required! Excel Row: " + (index+1));
    //    return;
    //}

    // UOM Check
    else if (ditem.UOM == null || ditem.UOM == "") {
      alert("UOM is required! Excel Row: " + (index + 1));
      return;
    }

    // Quantity Check
    else if (ditem.Quantity == null || ditem.Quantity === 0) {
      alert("Quantity is required! Excel Row: " + (index + 1));
      return;
    }

    // Unit Price Check
    else if (ditem.UnitPrice == null || ditem.UnitPrice == 0) {
      alert("Unit Price is required! Excel Row: " + (index + 1));
      return;
    } else {
      var $newRow = $("#mainrow").clone().removeAttr("id");

      // =========================
      // ITEM TYPE
      // =========================

      var arritem = ($scope.itemtype || []).find(
        (x) => x.name == ditem.ItemType,
      );

      if (arritem) {
        //console.log(arritem.id);
        $(".itemtypeid", $newRow).val(arritem.id).attr("disabled", true);

        $scope.itemtypeid = arritem.id;
      } else {
        $(".name", $newRow).on("keyup", function () {
          $scope.SearchFGLine();
          $scope.$applyAsync();
        });

        $(".itemcode", $newRow).val(null);
      }
      // =========================
      // TEXT FIELDS
      // =========================

      $(".txtSize", $newRow).val(ditem.Size).attr("disabled", true);

      $(".txtConstruction", $newRow)
        .val(ditem.Construction)
        .attr("disabled", true);

      $(".txtWeight", $newRow).val(ditem.Weight).attr("disabled", true);

      $(".txtSlit", $newRow).val(ditem.Slit).attr("disabled", true);

      $(".txtScrim", $newRow).val(ditem.Scrim).attr("disabled", true);

      //$('.txtQuality', $newRow)
      //    .val(ditem.Quality)
      //    .attr('disabled', true);

      $(".txtQuality", $newRow)
        .val((ditem.Quality || "").trim())
        .attr("disabled", true);

      $(".txtItemTitle", $newRow).val(ditem.ItemTitle).attr("disabled", true);

      $(".packingdetails", $newRow)
        .val(ditem.PackingDetails)
        .attr("disabled", true);

      // =========================
      // UOM
      // =========================

      var uomArr = ($scope.uomlist || []).find((x) => x.name == ditem.UOM);

      if (uomArr) {
        $(".uomid", $newRow).val(uomArr.id).attr("disabled", true);

        $scope.UOMID = uomArr.id;
      }

      // =========================
      // ITEM NAME
      // =========================
      //$scope.GetItemNameIDByName(ditem.ItemName, function (itemArr) {

      //    var $nameInput = $('.name', $newRow);
      //    var $itemCode = $('.itemcode', $newRow);

      //    if (itemArr) {
      //        if ($nameInput.data("ui-autocomplete")) {
      //            $nameInput.autocomplete("destroy");
      //        }

      //        $nameInput
      //            .val(ditem.ItemName)
      //            .prop('disabled', true);

      //        $itemCode
      //            .val(itemArr)
      //            .prop('disabled', true);

      //    }
      //    else {

      //        $nameInput
      //            .prop('disabled', false);

      //        // enable autocomplete if already exists
      //        if ($nameInput.data("ui-autocomplete")) {
      //            $nameInput.autocomplete("enable");
      //        }

      //        $nameInput.off('input');

      //        $nameInput.on('input', function () {
      //            $scope.SearchFGLineExcelUpload(this);
      //        });

      //    }
      //});

      var $nameInput = $(".name", $newRow);
      var $itemCode = $(".itemcode", $newRow);

      // show the value immediately — regardless of lookup result
      $nameInput.val((ditem.ItemName || "").trim());

      $scope.GetItemNameIDByName(
        ditem.ItemName,
        arritem ? arritem.id : 0,
        function (itemId, term) {
          if (itemId) {
            if ($nameInput.data("ui-autocomplete")) {
              $nameInput.autocomplete("destroy");
            }
            $nameInput.val(term).prop("disabled", true);
            $itemCode.val(itemId).prop("disabled", true);
          } else {
            // not found in master — leave editable so user can pick
            $nameInput.prop("disabled", false).addClass("is-invalid");
            $itemCode.val("");
            $nameInput.off("input").on("input", function () {
              $scope.SearchFGLineExcelUpload(this);
            });
          }
        },
      );

      // =========================
      // QUANTITY / PRICE
      // =========================

      $(".quantity", $newRow).val(ditem.Quantity).attr("disabled", true);

      $(".unitprice", $newRow).val(ditem.UnitPrice).attr("disabled", true);

      $(".hunitprice", $newRow).val(ditem.UnitPrice);

      // =========================
      // DISCOUNT
      // =========================

      if (ditem.DiscountPercent != null && ditem.DiscountPercent != "") {
        var disArr = ($scope.Dislist || []).find(
          (x) => x.disName == ditem.DiscountPercent,
        );

        if (disArr) {
          $(".discountid", $newRow).val(disArr.id).attr("disabled", true);

          $scope.discountid = disArr.id;
        }
      } else {
        $(".discountid", $newRow).val("").attr("disabled", true);
      }

      // =========================
      // DISCOUNT AMOUNT
      // =========================

      if (ditem.DiscountAmount != null && ditem.DiscountAmount != 0) {
        $(".discountamount", $newRow)
          .val(ditem.DiscountAmount)
          .attr("disabled", true);
      }

      // =========================
      // TOTAL AMOUNT
      // =========================

      if (ditem.TotalAmount != null && ditem.TotalAmount != 0) {
        $(".totalamount", $newRow)
          .val(ditem.TotalAmount)
          .attr("disabled", true);
      }

      // =========================
      // REMARKS
      // =========================

      $(".remarks", $newRow).val(ditem.ShortDetails).attr("disabled", true);

      // =========================
      // BUTTONS
      // =========================

      $("#add", $newRow).removeClass("btn-info").addClass("btn-danger");

      $("#add i", $newRow).attr("class", "fas fa-trash btn-sm");

      $("#excelButton", $newRow).remove();

      $("span", $newRow).removeClass("mdi mdi-plus me-1");

      // =========================
      // REMOVE DUPLICATE IDS
      // =========================

      $newRow
        .find(
          `
                #itemtypeid,
                #itemcode,
                #txtSize,
                #txtSizeID,
                #txtWeight,
                #txtWeightID,
                #txtScrim,
                #txtScrimID,
                #txtSlit,
                #txtSlitID,
                #txtConstruction,
                #txtConstructionID,
                #txtQuality,
                #txtQualityID,
                #uomid,
                #name,
                #quantity,
                #unitprice,
                #hvatvalue,
                #discountid,
                #discountamount,
                #totalamount,
                #remarks,
                #packingdetails,
                #txtItemTitle,
                #add,
                #imodel
            `,
        )
        .removeAttr("id");

      // =========================
      // REMOVE ERRORS
      // =========================

      $("span.error", $newRow).remove();

      // =========================
      // APPEND ROW
      // =========================

      $("#detailsItems").append($newRow);

      $scope.ClearLine();

      // =========================
      // DELETE ROW
      // =========================

      $("#detailsItems").on("click", ".btn-danger", function () {
        $(this).closest("tr").remove();
      });
    }
  };

  $scope.EditEnableDisableItemTypeWise = function () {
    var Value = $("#eitemtypeid").val();

    // Clear Item Name (and its hidden code)
    $("#ename").val("");
    $("#eitemcode").val("");

    // Clear all fields first
    $("#etxtSize").val("");
    $("#etxtConstruction").val("");
    $("#etxtWeight").val("");
    $("#etxtSlit").val("");
    $("#etxtScrim").val("");
    $("#etxtQuality").val("");

    // Hide all error spans
    $("#ename").siblings("span.error").css("visibility", "hidden");
    $("#etxtSize").siblings("span.error").css("visibility", "hidden");
    $("#etxtConstruction").siblings("span.error").css("visibility", "hidden");
    $("#etxtWeight").siblings("span.error").css("visibility", "hidden");
    $("#etxtSlit").siblings("span.error").css("visibility", "hidden");
    $("#etxtScrim").siblings("span.error").css("visibility", "hidden");
    $("#etxtQuality").siblings("span.error").css("visibility", "hidden");

    // Enable all first, then disable based on type
    var allFields = [
      "#etxtSize",
      "#etxtWeight",
      "#etxtConstruction",
      "#etxtSlit",
      "#etxtScrim",
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    var disableFields = [];

    if (Value == "1") {
      disableFields = [
        "#etxtSize",
        "#etxtWeight",
        "#etxtConstruction",
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

  $scope.InitialEditEnableDisableItemTypeWiseLine = function (index) {
    var Value = $scope.edetailsbyid[index].itemtypeid; //fixed here

    var disableFields = [];

    // Enable all first
    var allFields = [
      "#etxtSize" + index,
      "#etxtWeight" + index,
      "#etxtConstruction" + index,
      "#etxtSlit" + index,
      "#etxtScrim" + index,
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    if (Value == "1") {
      disableFields = [
        "#etxtSize" + index,
        "#etxtWeight" + index,
        "#etxtConstruction" + index,
        "#etxtSlit" + index,
        "#etxtScrim" + index,
      ];
    } else if (Value == "2") {
      disableFields = ["#etxtSlit" + index, "#etxtScrim" + index];
    } else if (Value == "3") {
      disableFields = ["#etxtConstruction" + index];
    }

    disableFields.forEach(function (id) {
      $(id).prop("disabled", true);
    });
  };

  $scope.EditEnableDisableItemTypeWiseLine = function (index) {
    var Value = $scope.edetailsbyid[index].itemtypeid; //fixed here
    console.log(index);

    // Clear Item Name (and its hidden code) for this row
    $("#ename" + index).val("");
    $("#eitemcode" + index).val("");

    // Also clear it in the bound scope object so AngularJS doesn't re-populate it
    if ($scope.edetailsbyid[index]) {
      $scope.edetailsbyid[index].itemname = "";
      $scope.edetailsbyid[index].itemid = "";
    }

    // Clear all fields first
    $("#etxtSize" + index).val("");
    $("#etxtConstruction" + index).val("");
    $("#etxtWeight" + index).val("");
    $("#etxtSlit" + index).val("");
    $("#etxtScrim" + index).val("");
    $("#etxtQuality" + index).val("");

    // Enable all first
    var allFields = [
      "#etxtSize" + index,
      "#etxtWeight" + index,
      "#etxtConstruction" + index,
      "#etxtSlit" + index,
      "#etxtScrim" + index,
    ];
    allFields.forEach(function (id) {
      $(id).prop("disabled", false);
    });

    var disableFields = [];

    if (Value == "1") {
      disableFields = [
        "#etxtSize" + index,
        "#etxtWeight" + index,
        "#etxtConstruction" + index,
        "#etxtSlit" + index,
        "#etxtScrim" + index,
      ];
    } else if (Value == "2") {
      disableFields = ["#etxtSlit" + index, "#etxtScrim" + index];
    } else if (Value == "3") {
      disableFields = ["#etxtConstruction" + index];
    }

    disableFields.forEach(function (id) {
      $(id).prop("disabled", true);
    });
  };

  $scope.GetItemType = function () {
    $http({
      method: "get",
      url: "/Common/GetItemType",
    }).then(function (response) {
      console.log($scope.itemtype);
      $scope.itemtype = response.data;
    });
  };

  $scope.GetFGUOMAll = function (unitid) {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetFGUOMAll",
      params: { unitid: unitid },
    }).then(function (response) {
      $scope.uomlist = response.data;
      //console.log($scope.uomlist);
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

  $scope.GetSQShipmentCountry = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetShipmentCountry",
    }).then(function (response) {
      response.data.pop();
      $scope.shipmentcountrylist = response.data;
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

  $scope.GetToShipment = function () {
    $http({
      method: "get",
      url: "/Common/GetToShipment",
    }).then(function (response) {
      $scope.toshipmentcountrylist = response.data;
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

  $scope.GetTransportationMode = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetTransportationMode",
    }).then(function (response) {
      $scope.transportationmode = response.data;
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

  $scope.SQList = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetSalesQuatationLandingAll",
    }).then(function (response) {
      console.log("RESPONSE", response);
      $scope.SQlist = response.data;
      $scope.loading = false;
    });
  };

  $scope.ESQType = function (unitid) {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetSQType",
      params: { unitid: unitid },
    }).then(function (response) {
      $scope.esqtypelist = response.data;
    });
  };

  $scope.SQType = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetSQType",
      params: { unitid: $("#hsellerid").val() },
    }).then(function (response) {
      $scope.sqtypelist = response.data;
    });
  };

  $scope.sortBy = function (column) {
    $scope.sortColumn = column;
    $scope.reverse = !$scope.reverse;
  };

  $scope.Vatlist = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetVatDetails",
    }).then(function (response) {
      $scope.Vatlist = response.data;
    });
  };

  $scope.GetDislist = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDiscountDetails",
    }).then(function (response) {
      $scope.Dislist = response.data;
      console.log($scope.Dislist);
    });
  };

  $scope.GetShipmentCountry = function () {
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
        params: { id: $scope.discountid },
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
        params: { id: $scope.ediscountid },
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

          var totalvatamount =
            total - parseFloat($("#ediscountamount" + index).val());
          $("#etotalamount" + index).val(
            isNaN(totalvatamount.toFixed(4)) ? 0 : totalvatamount.toFixed(4),
          );
        } else {
          $("#ediscountamount" + index).attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          //var totaldisamount = disamount;
          $("#ediscountamount" + index).val(
            isNaN(disamount) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total + 0 - disamount;

          $("#etotalamount" + index).val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
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

  $scope.EDiscountPercentageCalculate = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDisCal",
      params: { id: $scope.ediscountid },
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
        parseFloat($("#equantity" + index).val()) *
        parseFloat($("#eunitprice" + index).val());
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
          $("#etotalamount" + index).val((isNaN(total) ? 0 : total).toFixed(4));
        } else if (response.data[0].code === "WD") {
          $("#etotalamount" + index).val(
            isNaN(total - parseFloat($("#ediscountamount" + index).val()))
              ? 0
              : total - parseFloat($("#ediscountamount" + index).val()),
          );
        } else {
          var totaldiscount = (response.data[0].disValue / 100) * total;

          //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
          $("#ediscountamount" + index).val(
            isNaN(totaldiscount) ? 0 : totaldiscount.toFixed(4),
          );

          $("#etotalamount" + index).val(
            isNaN(total - totaldiscount) ? 0 : total - totaldiscount.toFixed(4),
          );
        }
      });
    }
  };

  $scope.Calculate = function () {
    $scope.DiscountPercentageCalculate();
  };

  $scope.EditCalculate = function () {
    $scope.EDiscountPercentageCalculate();
  };

  $scope.EditCalculateLine = function (index, id) {
    $scope.EDiscountPercentageCalculateLine(index, id);
  };

  $scope.Update = function () {
    var isAllValid = true;
    var selected = $("#Etxtpaymenttermid  option:selected");
    var Epaymenttermid = selected.val(); // list.id
    var Epaymenttermname = selected.data("name");
    var master = {
      ID: $("#hheaderid").val(),
      UNITID: $("#ehsellerid").val(),
      CUSTOMERID: $("#ehcusid").val(),

      SQNUMBER: $("#yourSqNumberField").val(), // optional / backend preferred

      QUANTITYSUMMARY: $("#EtxtQuantitySummary").val(),
      PACKING: $("#EtxtPacking").val(),
      MARKER: $("#EtxtMarker").val(),
      DESCRIPTIONSPECIFICATION: $("#EtxtDescriptionSpecification").val(),
      DESCRIPTIONS: $("#edescription").val(),

      DOCUMENTCREATEDBY: 0,
      DOCUMENTSTATUSID: 1,

      FROMSHIPMENT: $("#EtxtFromshipmentcountryid").val(),
      TEXTFROMSHIPMENT: $("#EtxtFromshipmentText").val(),

      //TOSHIPMENT: $("#etxtToShipment").val(),
      TOSHIPMENT: $("#EtxtToshipmentcountryid").val(),

      CURRENCY: $("#Etxtcurrencyid").val(),
      LOADINGPORT: $("#Etxtloadingport").val(),
      DESTINATIONPORT: $("#EtxtDESTINATIONPORT").val(),

      INCOTERM: $("#Etxtincotermid").val(),
      TRANSPORTATIONMODE: $("#Etxttransportmodeid").val(),

      TERMSCONDITION: $("#etermscon").val(),
      LOADINGPLACE: $("#Eloadingplace").val(),

      PAYMENTTERMS: Epaymenttermname,
      PAYMENTTERMS_OTHERS: $("#Eetxtpaymentterm").val(),
      PAYMENTTERMSID: Epaymenttermid,

      SHIPPINGPERIOD: $("#EtxtShippingPeriod").val(),
      SQTYPEID: $("#esqtypeid").val(),

      EXPIREDATE: $("#etxtExpireDate").val(),
    };

    if (
      $("#ehsellerid").val().trim() == "" ||
      $("#edittxtComName").val().trim() == ""
    ) {
      isAllValid = false;
      $("#edittxtComName").siblings("span.error").css("visibility", "visible");
    } else {
      $("#edittxtComName").siblings("span.error").css("visibility", "hidden");
    }

    if (
      $("#ehcusid").val().trim() == "" ||
      $("#etxtBuyerName").val().trim() == ""
    ) {
      isAllValid = false;
      $("#etxtBuyerName").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtBuyerName").siblings("span.error").css("visibility", "hidden");
    }

    if ($("#esqtypeid").val() == "") {
      $("#esqtypeid").siblings("span.error").css("visibility", "visible");
      isAllValid = false;
    } else {
      $("#esqtypeid").siblings("span.error").css("visibility", "hidden");
    }

    if (isAllValid) {
      $.ajax({
        type: "POST",
        url: "/SalesQuatationLanding/Update",
        dataType: "json",
        data: { sql: master },
        success: function (result) {
          //$scope.EUploadFile(result);
          notify("success", "Success Message", result);

          let masterid = $("#hheaderid").val();

          $http({
            method: "GET",
            url: "/SalesQuatationLanding/EditByMasterID",
            params: { id: masterid },
          }).success(function (data) {
            //console.log("DATA 0 ",data[0]);
            EditFileUsingAPI("SQ-" + data[0].id);
          });

          //  $scope.Clear();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.UpdateByLineID = function (i, id, itemtypeid, discountid, uomid) {
    var isAllValid = true;

    function validateField(selector, condition) {
      if (condition) {
        isAllValid = false;
        $(selector).siblings("span.error").css("visibility", "visible");
      } else {
        $(selector).siblings("span.error").css("visibility", "hidden");
      }
    }

    validateField(
      "#ename" + i,
      $("#ename" + i)
        .val()
        .trim() === "",
    );
    validateField(
      "#eitemcode" + i,
      $("#eitemcode" + i)
        .val()
        .trim() === "" || $("#eitemcode" + i).val() == "0",
    );
    validateField(
      "#etxtSize" + i,
      !$("#etxtSize" + i).prop("disabled") &&
        $("#etxtSize" + i)
          .val()
          .trim() === "",
    );
    validateField(
      "#etxtConstruction" + i,
      !$("#etxtConstruction" + i).prop("disabled") &&
        $("#etxtConstruction" + i)
          .val()
          .trim() === "",
    );
    validateField(
      "#etxtWeight" + i,
      !$("#etxtWeight" + i).prop("disabled") &&
        $("#etxtWeight" + i)
          .val()
          .trim() === "",
    );
    validateField(
      "#etxtSlit" + i,
      !$("#etxtSlit" + i).prop("disabled") &&
        $("#etxtSlit" + i)
          .val()
          .trim() === "",
    );
    validateField(
      "#etxtScrim" + i,
      !$("#etxtScrim" + i).prop("disabled") &&
        $("#etxtScrim" + i)
          .val()
          .trim() === "",
    );
    //validateField("#eitemtitle" + i, $("#eitemtitle" + i).val().trim() === "");
    validateField("#euomid" + i, !$("#euomid" + i).val());
    validateField(
      "#equantity" + i,
      $("#equantity" + i)
        .val()
        .trim() === "" ||
        parseFloat($("#equantity" + i).val()) <= 0 ||
        isNaN(parseFloat($("#equantity" + i).val())),
    );
    validateField(
      "#eunitprice" + i,
      $("#eunitprice" + i)
        .val()
        .trim() === "" ||
        parseFloat($("#eunitprice" + i).val()) <= 0 ||
        isNaN(parseFloat($("#eunitprice" + i).val())),
    );

    if (isAllValid) {
      var details = {
        ID: id,
        SALESQUOTATIONHEADERID: parseInt($("#hheaderid").val()),

        ITEMTYPEID: itemtypeid,

        ITEMID: $("#eitemcode" + i).val(),
        UOMID: uomid,

        SIZE: $("#etxtSize" + i).val() || "",
        CONSTRUCTION: $("#etxtConstruction" + i).val() || "",
        WEIGHT: $("#etxtWeight" + i).val() || "",
        SLIT: $("#etxtSlit" + i).val() || "",
        SCRIM: $("#etxtScrim" + i).val() || "",
        QUALITY: $("#etxtQuality" + i).val() || "",
        ITEMTITLE: $("#eitemtitle" + i).val() || "",
        PACKINGDETAILS: $("#epackingdetails" + i).val(),

        QUANTITY: parseFloat($("#equantity" + i).val()) || 0,
        PRICE: parseFloat($("#eunitprice" + i).val()) || 0,

        DISCOUNTID: discountid,
        DISCOUNT: parseFloat($("#ediscountamount" + i).val()) || 0,

        TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()) || 0,
        REMARKS: $("#eremarks" + i).val() || "",
        DESCRIPTIONS: $("#edescription" + i).val() || "",
      };

      $.ajax({
        type: "POST",
        url: "/SalesQuatationLanding/UpdateDetailsByID",
        dataType: "json",
        data: { sqd: details },
        success: function (result) {
          notify("success", "Success Message", result);
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  //$scope.UpdateByLineID = function (i, id, discountid,uomid) {

  //    var isAllValid = true;
  //    if ($("#ename"+i).val() == "") {
  //        isAllValid = false;
  //        $("#ename"+i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#ename"+i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#eitemcode"+i).val() == "") {
  //        isAllValid = false;
  //        $("#eitemcode"+i).siblings('span.error').css('visibility', 'visible');
  //        $("#euom"+i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#eitemcode"+i).siblings('span.error').css('visibility', 'hidden');
  //        $("#euom"+i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#ename"+i).val() == "") {
  //        isAllValid = false;
  //        $("#ename"+i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#ename"+i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    //if ($("#equantity" + i).val().trim() == '0' || parseFloat($("#equantity").val() == 0)) {
  //    //    isAllValid = false;
  //    //    $("#equantity"+i).siblings('span.error').css('visibility', 'visible');
  //    //}
  //    //else {
  //    //    $("#equantity"+i).siblings('span.error').css('visibility', 'hidden');
  //    //}

  //    //if ($("#eunitprice"+i).val().trim() == '0' || parseFloat($("#eunitprice").val() == 0)) {
  //    //    isAllValid = false;
  //    //    $("#eunitprice"+i).siblings('span.error').css('visibility', 'visible');
  //    //}
  //    //else {
  //    //    $("#eunitprice"+i).siblings('span.error').css('visibility', 'hidden');
  //    //}

  //    //if ($("#evatid"+i).val() == "") {
  //    //    isAllValid = false;
  //    //    $("#evatid"+i).siblings('span.error').css('visibility', 'visible');
  //    //}
  //    //else {
  //    //    $("#evatid"+i).siblings('span.error').css('visibility', 'hidden');
  //    //}

  //    //if ($("#ediscountid"+i).val() == "") {
  //    //    isAllValid = false;
  //    //    $("#ediscountid"+i).siblings('span.error').css('visibility', 'visible');
  //    //}
  //    //else {
  //    //    $("#ediscountid"+i).siblings('span.error').css('visibility', 'hidden');
  //    //}

  //    if (isAllValid) {
  //        var details = {
  //            ID: id,
  //            SALESQUOTATIONHEADERID: $("#hheaderid").val(),
  //            ITEMTYPEID: $("#eitemtypeid"+i).val(),
  //            ITEMID: $("#eitemcode" + i).val(),
  //            QUALITY: $("#etxtQuality" + i).val(),
  //            SIZE: $("#etxtSize" + i).val(),
  //            SLIT: $("#etxtSlit" + i).val(),
  //            SCRIM: $("#etxtScrim" + i).val(),
  //            WEIGHT: $("#etxtWeight" + i).val(),
  //            CONSTRUCTION: $("#etxtConstruction" + i).val(),
  //            ITEMTITLE: $("#etxtItemTitle" + i).val(),
  //            UOMID: uomid,

  //            QUANTITY: $("#equantity" + i).val(),
  //            PRICE: $("#eunitprice" + i).val(),
  //            DISCOUNTID: discountid,
  //            DISCOUNT: $("#ediscountamount" + i).val(),
  //            TOTALAMOUNT: $("#etotalamount" + i).val(),

  //            REMARKS: $("#eremarks" + i).val()
  //        }

  //        //var details = {
  //        //    ID: id,
  //        //    SALESQUOTATIONHEADERID: 0,
  //        //    BATCHID: "",
  //        //    SERIALNO: 0,
  //        //    ITEMID: $("#eitemcode" + i).val(),
  //        //    ITEMNAME: "",
  //        //    UOM: "",
  //        //    QUANTITY: $("#equantity" + i).val(),
  //        //    PRICE: $("#eunitprice" + i).val(),
  //        //    DISCOUNTID: discountid,
  //        //    DISCOUNT: $("#ediscountamount" + i).val(),
  //        //    VATID: vatid,
  //        //    VATAMOUNT: $("#evatamount" + i).val(),
  //        //    TOTALAMOUNT: $("#etotalamount" + i).val(),
  //        //    TOLERANCEID: 0,
  //        //    DESCRIPTIONS: $("#eshortdetails" + i).val(),
  //        //    REMARKS: $("#eremarks" + i).val(),
  //        //    COUNT: $("#etxtCount" +i).val(),
  //        //    PLY: $("#etxtPly" + i).val(),
  //        //    QUALITY: $("#etxtQuality" + i).val(),
  //        //    WIDTH: $("#etxtWidth" + i).val(),
  //        //    LENGTH: $("#etxtLength" + i).val(),
  //        //    WEIGHT: $("#etxtWeight" + i).val(),
  //        //    CONSTRUCTION: $("#etxtConstruction" + i).val(),
  //        //    ITEMTITLE: $("#etxtItemTitle" + i).val(),
  //        //    ITEMTYPEID: $("#eitemtypeid" + i).val()
  //        //}

  //        $.ajax({
  //            type: 'POST',
  //            url: "/SalesQuatationLanding/UpdateDetailsByID",
  //            dataType: "json",
  //            data: { 'sqd': details },
  //            success: function (result) {
  //               // $scope.EditbyDetailsID($("#editheaderid").val());
  //                notify('success', 'Success Message', result);
  //            },
  //            error: function (errormessage) {
  //                notify('error', 'Error Message', errormessage.responseText);
  //            }
  //        });
  //    }
  //};

  $scope.DeleteMaster = function (lineid) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/SalesQuatationLanding/DeleteMasterByID",
        params: { id: lineid },
      }).then(function (response) {
        $scope.SQList();
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.CopyMaster = function (id) {
    if (
      confirm("Are You Sure? You Want to Copy this Sales Quotation.") == true
    ) {
      $http({
        method: "POST",
        url: "/SalesQuatationLanding/CopyMaster",
        params: { id: id },
      }).then(function (response) {
        $scope.SQList();
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.DeleteByLineID = function (lineid) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/SalesQuatationLanding/DeleteByLineByID",
        params: { id: lineid },
      }).then(function (response) {
        $scope.EditbyDetailsID($("#editheaderid").val());
        notify("success", "Message", response.data);
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

  $scope.ViewbyMasterID = function (ID, SQNUM) {
    $("#vSINO").text("");
    $("#vFileName").text("");
    toggleDownloadButton();
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/ViewByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      console.log(data);
      $scope.masterdata = data;
      //GetUploadFileUsingAPI(data[0].sqNumber);
    });

    //ViewImageFromAPI(SQNUM);
    $scope.ViewbyDetailsID(ID);
    ViewImageFromAPI("SQ-" + ID);
    //  $scope.GetUploadedFiles()
    $scope.ViewLoadDocumentStatus(ID);
  };

  $scope.ViewbyDetailsID = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/ViewByDetaisID",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.detailsbyid = result;
    });
  };

  //$scope.ViewLoadDocument = function (ID, PROCESSCODE) {
  //    //let NUMBER = PROCESSCODE.match(/\d+/g);
  //    let ALPHA = PROCESSCODE.replace(/[0-9]/g, '');
  //    userFolder = ALPHA+"/"+PROCESSCODE.toUpperCase();

  //    ViewImageFromAPI(ALPHA, userFolder);
  //}

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/GetDocStatus",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.docstatusview = result;
    });
  };

  $scope.Add = function () {
    var isAllValid = true;

    // Item Type
    if ($("#itemtypeid").val() == null || $("#itemtypeid").val().trim() == "") {
      isAllValid = false;
      $("#itemtypeid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#itemtypeid").siblings("span.error").css("visibility", "hidden");
    }

    // Item Name
    if ($("#name").val().trim() == "") {
      isAllValid = false;
      $("#name").siblings("span.error").css("visibility", "visible");
    } else {
      $("#name").siblings("span.error").css("visibility", "hidden");
    }

    // Item Code (hidden)
    if (
      $("#itemcode").val() == null ||
      $("#itemcode").val().trim() == "" ||
      $("#itemcode").val().trim() == "0"
    ) {
      isAllValid = false;
      $("#name").siblings("span.error").css("visibility", "visible");
    } else {
      $("#name").siblings("span.error").css("visibility", "hidden");
    }

    // Size (only if enabled)
    if (!$("#txtSize").prop("disabled") && $("#txtSize").val().trim() == "") {
      isAllValid = false;
      $("#txtSize").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtSize").siblings("span.error").css("visibility", "hidden");
    }

    // Construction (only if enabled)
    if (
      !$("#txtConstruction").prop("disabled") &&
      $("#txtConstruction").val().trim() == ""
    ) {
      isAllValid = false;
      $("#txtConstruction").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtConstruction").siblings("span.error").css("visibility", "hidden");
    }

    // Weight (only if enabled)
    if (
      !$("#txtWeight").prop("disabled") &&
      $("#txtWeight").val().trim() == ""
    ) {
      isAllValid = false;
      $("#txtWeight").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtWeight").siblings("span.error").css("visibility", "hidden");
    }

    // Slit (only if enabled)
    if (!$("#txtSlit").prop("disabled") && $("#txtSlit").val().trim() == "") {
      isAllValid = false;
      $("#txtSlit").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtSlit").siblings("span.error").css("visibility", "hidden");
    }

    // Scrim (only if enabled)
    if (!$("#txtScrim").prop("disabled") && $("#txtScrim").val().trim() == "") {
      isAllValid = false;
      $("#txtScrim").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtScrim").siblings("span.error").css("visibility", "hidden");
    }

    // Quality (always required) — currently disabled, uncomment if you want to enforce
    //if ($("#txtQuality").val().trim() == "") {
    //    isAllValid = false;
    //    $("#txtQuality").siblings('span.error').css('visibility', 'visible');
    //} else {
    //    $("#txtQuality").siblings('span.error').css('visibility', 'hidden');
    //}

    // Item Title
    //if ($("#txtItemTitle").val().trim() == "") {
    //    isAllValid = false;
    //    $("#txtItemTitle").siblings('span.error').css('visibility', 'visible');
    //} else {
    //    $("#txtItemTitle").siblings('span.error').css('visibility', 'hidden');
    //}

    // UOM
    if ($("#uomid").val() == null || $("#uomid").val().trim() == "") {
      isAllValid = false;
      $("#uomid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#uomid").siblings("span.error").css("visibility", "hidden");
    }

    // Quantity
    if (
      $("#quantity").val().trim() == "" ||
      parseFloat($("#quantity").val()) == 0 ||
      isNaN(parseFloat($("#quantity").val()))
    ) {
      isAllValid = false;
      $("#quantity").siblings("span.error").css("visibility", "visible");
    } else {
      $("#quantity").siblings("span.error").css("visibility", "hidden");
    }

    // Unit Price
    if (
      $("#unitprice").val().trim() == "" ||
      parseFloat($("#unitprice").val()) == 0 ||
      isNaN(parseFloat($("#unitprice").val()))
    ) {
      isAllValid = false;
      $("#unitprice").siblings("span.error").css("visibility", "visible");
    } else {
      $("#unitprice").siblings("span.error").css("visibility", "hidden");
    }

    if (isAllValid) {
      var $newRow = $("#mainrow").clone().removeAttr("id"); //UUUU

      $(".itemtypeid", $newRow)
        .val($("#itemtypeid").val())
        .attr("disabled", "disabled");
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
      $(".txtItemTitle", $newRow)
        .val($("#txtItemTitle").val())
        .attr("disabled", "disabled");
      $(".packingdetails", $newRow)
        .val($("#packingdetails").val())
        .attr("disabled", "disabled");

      $(".uomid", $newRow).val($("#uomid").val()).attr("disabled", "disabled");
      $(".name", $newRow).val($("#name").val()).attr("disabled", "disabled");
      $(".quantity", $newRow)
        .val($("#quantity").val())
        .attr("disabled", "disabled");
      $(".unitprice", $newRow)
        .val($("#unitprice").val())
        .attr("disabled", "disabled");
      $(".vatid", $newRow).val($("#vatid").val()).attr("disabled", "disabled");
      $(".vatamount", $newRow)
        .val($("#vatamount").val())
        .attr("disabled", "disabled");
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

      $("#add", $newRow).removeClass("btn-info").addClass("btn-danger");

      $("#add i", $newRow).attr("class", "fas fa-trash btn-sm");

      $("#excelButton", $newRow).remove();

      $("span", $newRow).removeClass("mdi mdi-plus me-1");

      $(
        "#itemtypeid,#itemcode,#txtSize,#txtWeight,#txtScrim,#txtSlit,#txtConstruction,#txtQuality,#uomid,#name,#quantity,#unitprice,#discountid,#discountamount,#totalamount,#remarks,#shortdetails,#txtItemTitle,#add,#imodel",
        $newRow,
      ).removeAttr("id");

      $("span.error", $newRow).remove();

      $("#detailsItems").append($newRow);
      $scope.ClearLine();

      $("#detailsItems").on("click", ".btn-danger", function () {
        $(this).parents("tr").remove();
      });
    }
  };

  //$scope.Add = function () {
  //    var isAllValid = true;

  //    // Item Type
  //    if ($("#itemtypeid").val() == null || $("#itemtypeid").val().trim() == "") {
  //        isAllValid = false;
  //        $("#itemtypeid").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#itemtypeid").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Item Name
  //    if ($("#name").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Item Name is required.");
  //        $("#name").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#name").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Item Code (hidden - set by autocomplete)
  //    if ($("#itemcode").val() == null || $("#itemcode").val().trim() == "" || $("#itemcode").val().trim() == "0") {
  //        isAllValid = false;
  //        $("#name").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#name").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Size (only if enabled)
  //    if (!$("#txtSize").prop('disabled') && $("#txtSize").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Size is required.");
  //    }

  //    // Construction (only if enabled)
  //    if (!$("#txtConstruction").prop('disabled') && $("#txtConstruction").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Construction is required.");
  //    }

  //    // Weight (only if enabled)
  //    if (!$("#txtWeight").prop('disabled') && $("#txtWeight").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Weight is required.");
  //    }

  //    // Slit (only if enabled)
  //    if (!$("#txtSlit").prop('disabled') && $("#txtSlit").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Slit is required.");
  //    }

  //    // Scrim (only if enabled)
  //    if (!$("#txtScrim").prop('disabled') && $("#txtScrim").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Scrim is required.");
  //    }

  //    // Quality (always required)
  //    if ($("#txtQuality").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Quality is required.");
  //    }

  //    // Item Title
  //    if ($("#txtItemTitle").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Item Title is required.");
  //    }

  //    // UOM
  //    if ($("#uomid").val() == null || $("#uomid").val().trim() == "") {
  //        isAllValid = false;
  //        $("#uomid").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#uomid").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Quantity
  //    if ($("#quantity").val().trim() == "" || parseFloat($("#quantity").val()) == 0 || isNaN(parseFloat($("#quantity").val()))) {
  //        isAllValid = false;
  //        $("#quantity").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#quantity").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Unit Price
  //    if ($("#unitprice").val().trim() == "" || parseFloat($("#unitprice").val()) == 0 || isNaN(parseFloat($("#unitprice").val()))) {
  //        isAllValid = false;
  //        $("#unitprice").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#unitprice").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if (isAllValid) {

  //        var $newRow = $('#mainrow').clone().removeAttr('id');

  //        $('.itemtypeid', $newRow).val($("#itemtypeid").val()).attr('disabled', 'disabled');

  //        $('.txtSize', $newRow).val($("#txtSize").val()).attr('disabled', 'disabled');
  //        $('.txtConstruction', $newRow).val($("#txtConstruction").val()).attr('disabled', 'disabled');
  //        $('.txtWeight', $newRow).val($("#txtWeight").val()).attr('disabled', 'disabled');
  //        $('.txtSlit', $newRow).val($("#txtSlit").val()).attr('disabled', 'disabled');
  //        $('.txtScrim', $newRow).val($("#txtScrim").val()).attr('disabled', 'disabled');
  //        $('.txtQuality', $newRow).val($("#txtQuality").val()).attr('disabled', 'disabled');
  //        $('.txtItemTitle', $newRow).val($("#txtItemTitle").val()).attr('disabled', 'disabled');
  //        $('.packingdetails', $newRow).val($("#packingdetails").val()).attr('disabled', 'disabled');

  //        $('.uomid', $newRow).val($("#uomid").val()).attr('disabled', 'disabled');
  //        $('.name', $newRow).val($("#name").val()).attr('disabled', 'disabled');
  //        $('.quantity', $newRow).val($("#quantity").val()).attr('disabled', 'disabled');
  //        $('.unitprice', $newRow).val($("#unitprice").val()).attr('disabled', 'disabled');
  //        $('.vatid', $newRow).val($("#vatid").val()).attr('disabled', 'disabled');
  //        $('.vatamount', $newRow).val($("#vatamount").val()).attr('disabled', 'disabled');
  //        $('.discountid', $newRow).val($("#discountid").val()).attr('disabled', 'disabled');
  //        $('.discountamount', $newRow).val($("#discountamount").val()).attr('disabled', 'disabled');
  //        $('.totalamount', $newRow).val($("#totalamount").val()).attr('disabled', 'disabled');
  //        $('.toleranceid', $newRow).val($("#toleranceid").val()).attr('disabled', 'disabled');
  //        $('.remarks', $newRow).val($("#remarks").val()).attr('disabled', 'disabled');
  //        $('.shortdetails', $newRow).val($("#shortdetails").val()).attr('disabled', 'disabled');

  //        $('#add', $newRow).removeClass('btn-info').addClass('btn-danger');
  //        $('i', $newRow).removeClass('fas fa-ad').addClass('fas fa-trash btn-sm');

  //        $('#imodel', $newRow).removeClass('btn-primary');
  //        $('span', $newRow).removeClass('mdi mdi-plus me-1');

  //        $('#itemtypeid,#itemcode,#txtSize,#txtWeight,#txtScrim,#txtSlit,#txtConstruction,#txtQuality,#uomid,#name,#quantity,#unitprice,#discountid,#discountamount,#totalamount,#remarks,#shortdetails,#txtItemTitle,#add,#imodel', $newRow).removeAttr('id');

  //        $('span.error', $newRow).remove();

  //        var newitemid = $("#itemcode").val();

  //        if ($("#detailsItems tbody tr").length == 0) {
  //            $('#detailsItems').append($newRow);
  //            $scope.ClearLine();
  //            $("#detailsItems").on('click', '.btn-danger', function () {
  //                $(this).parents('tr').remove();
  //            });
  //        }
  //        else {
  //            var isDuplicate = false;
  //            $("#detailsItems tbody tr").each(function (index, ele) {
  //                if ($(".itemcode", this).val() === newitemid) {
  //                    isDuplicate = true;
  //                    return false;
  //                }
  //            });

  //            if (isDuplicate) {
  //                notify('warning', 'Warning Message', 'Item already exists.');
  //            } else {
  //                $('#detailsItems').append($newRow);
  //                $scope.ClearLine();
  //            }
  //        }

  //        $("#detailsItems").on('click', '.btn-danger', function () {
  //            $(this).parents('tr').remove();
  //        });
  //    }
  //}

  $scope.eAdd = function () {
    var isAllValid = true;

    // Item Type
    if (
      $("#eitemtypeid").val() == null ||
      $("#eitemtypeid").val().trim() == ""
    ) {
      isAllValid = false;
      $("#eitemtypeid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#eitemtypeid").siblings("span.error").css("visibility", "hidden");
    }

    // Item Name
    if ($("#ename").val().trim() == "") {
      isAllValid = false;
      $("#ename").siblings("span.error").css("visibility", "visible");
    } else {
      $("#ename").siblings("span.error").css("visibility", "hidden");
    }

    // Item Code (hidden)
    if (
      $("#eitemcode").val() == null ||
      $("#eitemcode").val().trim() == "" ||
      $("#eitemcode").val().trim() == "0"
    ) {
      isAllValid = false;
      $("#ename").siblings("span.error").css("visibility", "visible");
    } else {
      $("#ename").siblings("span.error").css("visibility", "hidden");
    }

    // Size (only if enabled)
    if (!$("#etxtSize").prop("disabled") && $("#etxtSize").val().trim() == "") {
      isAllValid = false;
      $("#etxtSize").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtSize").siblings("span.error").css("visibility", "hidden");
    }

    // Construction (only if enabled)
    if (
      !$("#etxtConstruction").prop("disabled") &&
      $("#etxtConstruction").val().trim() == ""
    ) {
      isAllValid = false;
      $("#etxtConstruction")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etxtConstruction").siblings("span.error").css("visibility", "hidden");
    }

    // Weight (only if enabled)
    if (
      !$("#etxtWeight").prop("disabled") &&
      $("#etxtWeight").val().trim() == ""
    ) {
      isAllValid = false;
      $("#etxtWeight").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtWeight").siblings("span.error").css("visibility", "hidden");
    }

    // Slit (only if enabled)
    if (!$("#etxtSlit").prop("disabled") && $("#etxtSlit").val().trim() == "") {
      isAllValid = false;
      $("#etxtSlit").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtSlit").siblings("span.error").css("visibility", "hidden");
    }

    // Scrim (only if enabled)
    if (
      !$("#etxtScrim").prop("disabled") &&
      $("#etxtScrim").val().trim() == ""
    ) {
      isAllValid = false;
      $("#etxtScrim").siblings("span.error").css("visibility", "visible");
    } else {
      $("#etxtScrim").siblings("span.error").css("visibility", "hidden");
    }

    // Quality (always required)
    //if ($("#etxtQuality").val().trim() == "") {
    //    isAllValid = false;
    //    $("#etxtQuality").siblings('span.error').css('visibility', 'visible');
    //} else {
    //    $("#etxtQuality").siblings('span.error').css('visibility', 'hidden');
    //}

    // Item Title
    //if ($("#etxtItemTitle").val().trim() == "") {
    //    isAllValid = false;
    //    $("#etxtItemTitle").siblings('span.error').css('visibility', 'visible');
    //} else {
    //    $("#etxtItemTitle").siblings('span.error').css('visibility', 'hidden');
    //}

    // UOM
    if ($("#euomid").val() == null || $("#euomid").val().trim() == "") {
      isAllValid = false;
      $("#euomid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#euomid").siblings("span.error").css("visibility", "hidden");
    }

    // Quantity
    if (
      $("#equantity").val().trim() == "" ||
      parseFloat($("#equantity").val()) == 0 ||
      isNaN(parseFloat($("#equantity").val()))
    ) {
      isAllValid = false;
      $("#equantity").siblings("span.error").css("visibility", "visible");
    } else {
      $("#equantity").siblings("span.error").css("visibility", "hidden");
    }

    // Unit Price
    if (
      $("#eunitprice").val().trim() == "" ||
      parseFloat($("#eunitprice").val()) == 0 ||
      isNaN(parseFloat($("#eunitprice").val()))
    ) {
      isAllValid = false;
      $("#eunitprice").siblings("span.error").css("visibility", "visible");
    } else {
      $("#eunitprice").siblings("span.error").css("visibility", "hidden");
    }

    if (isAllValid) {
      var details = {
        SALESQUOTATIONHEADERID: $("#hheaderid").val(),
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
        url: "/SalesQuatationLanding/EditDetailsAdd",
        dataType: "json",
        data: { sqd: details },
        success: function (result) {
          $scope.EditbyDetailsID($("#hheaderid").val());
          notify("success", "Success Message", result);
          $scope.ClearLine();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  //$scope.eAdd = function () {
  //    var isAllValid = true;

  //    // Item Type
  //    if ($("#eitemtypeid").val() == null || $("#eitemtypeid").val().trim() == "") {
  //        isAllValid = false;
  //        $("#eitemtypeid").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#eitemtypeid").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Item Name
  //    if ($("#ename").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Item Name is required.");
  //        $("#ename").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#ename").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Item Code (hidden - set by autocomplete)
  //    if ($("#eitemcode").val() == null || $("#eitemcode").val().trim() == "" || $("#eitemcode").val().trim() == "0") {
  //        isAllValid = false;
  //        $("#ename").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#ename").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Size (only if enabled)
  //    if (!$("#etxtSize").prop('disabled') && $("#etxtSize").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Size is required.");
  //    }

  //    // Construction (only if enabled)
  //    if (!$("#etxtConstruction").prop('disabled') && $("#etxtConstruction").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Construction is required.");
  //    }

  //    // Weight (only if enabled)
  //    if (!$("#etxtWeight").prop('disabled') && $("#etxtWeight").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Weight is required.");
  //    }

  //    // Slit (only if enabled)
  //    if (!$("#etxtSlit").prop('disabled') && $("#etxtSlit").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Slit is required.");
  //    }

  //    // Scrim (only if enabled)
  //    if (!$("#etxtScrim").prop('disabled') && $("#etxtScrim").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Scrim is required.");
  //    }

  //    // Quality (always required)
  //    if ($("#etxtQuality").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Quality is required.");
  //    }

  //    // Item Title
  //    if ($("#etxtItemTitle").val().trim() == "") {
  //        isAllValid = false;
  //        alert("Item Title is required.");
  //    }

  //    // UOM
  //    if ($("#euomid").val() == null || $("#euomid").val().trim() == "") {
  //        isAllValid = false;
  //        $("#euomid").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#euomid").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Quantity
  //    if ($("#equantity").val().trim() == "" || parseFloat($("#equantity").val()) == 0 || isNaN(parseFloat($("#equantity").val()))) {
  //        isAllValid = false;
  //        $("#equantity").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#equantity").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    // Unit Price
  //    if ($("#eunitprice").val().trim() == "" || parseFloat($("#eunitprice").val()) == 0 || isNaN(parseFloat($("#eunitprice").val()))) {
  //        isAllValid = false;
  //        $("#eunitprice").siblings('span.error').css('visibility', 'visible');
  //    } else {
  //        $("#eunitprice").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if (isAllValid) {
  //        var details = {
  //            SALESQUOTATIONHEADERID: $("#hheaderid").val(),
  //            ITEMTYPEID: $("#eitemtypeid").val(),
  //            ITEMID: $("#eitemcode").val(),
  //            QUALITY: $("#etxtQuality").val(),
  //            SIZE: $("#etxtSize").val(),
  //            SLIT: $("#etxtSlit").val(),
  //            SCRIM: $("#etxtScrim").val(),
  //            WEIGHT: $("#etxtWeight").val(),
  //            CONSTRUCTION: $("#etxtConstruction").val(),
  //            ITEMTITLE: $("#etxtItemTitle").val(),
  //            UOMID: $("#euomid").val(),

  //            QUANTITY: $("#equantity").val(),
  //            PRICE: $("#eunitprice").val(),
  //            DISCOUNTID: $("#ediscountid").val(),
  //            DISCOUNT: $("#ediscountamount").val(),
  //            TOTALAMOUNT: $("#etotalamount").val(),

  //            REMARKS: $("#eremarks").val(),
  //            DESCRIPTIONS: $("#eshortdetails").val(),
  //        }

  //        $.ajax({
  //            type: 'POST',
  //            url: '/SalesQuatationLanding/EditDetailsAdd',
  //            dataType: "json",
  //            data: { 'sqd': details },
  //            success: function (result) {
  //                $scope.EditbyDetailsID($("#hheaderid").val());
  //                notify('success', 'Success Message', result);
  //                $scope.ClearLine();
  //            },
  //            error: function (errormessage) {
  //                notify('error', 'Error Message', errormessage.responseText);
  //            }
  //        });
  //    }
  //}

  $scope.onPaymentChange = function () {
    if ($scope.txtPaymentTerms !== "Others") {
      $scope.etxtpaymentterm = "";
    }
  };

  $scope.Save = function () {
    if (confirm("Are You Sure? You Want to Save this Record.") == true) {
      var isAllValid = true;
      $("#ItemsError").text("");
      var Details = [];

      $(
        $("#detailsItems tbody tr").each(function (index, ele) {
          var details = {
            ITEMTYPEID: $(".itemtypeid", this).val(),
            ITEMID: $(".itemcode", this).val(),
            QUALITY: $(".txtQuality", this).val(),
            SIZE: $(".txtSize", this).val(),
            SLIT: $(".txtSlit", this).val(),
            SCRIM: $(".txtScrim", this).val(),
            WEIGHT: $(".txtWeight", this).val(),
            CONSTRUCTION: $(".txtConstruction", this).val(),
            ITEMTITLE: $(".txtItemTitle", this).val(),
            UOMID: $(".uomid", this).val(),
            PACKINGDETAILS: $(".packingdetails", this).val(),
            QUANTITY: parseFloat($(".quantity", this).val()),
            PRICE: parseFloat($(".unitprice", this).val()),
            DISCOUNTID: parseInt($(".discountid", this).val()),
            DISCOUNT: parseFloat($(".discountamount", this).val()),
            TOTALAMOUNT: parseFloat($(".totalamount", this).val()),
            TOLERANCEID: parseInt($(".toleranceid", this).val()),
            DESCRIPTIONS: $(".shortdetails", this).val(),
            REMARKS: $(".remarks", this).val(),
          };
          Details.push(details);
        }),
      );

      if (
        $("#hcusid").val().trim() == "" ||
        $("#txtBuyerName").val().trim() == ""
      ) {
        //alert(1);
        isAllValid = false;
        $("#txtBuyerName").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtBuyerName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#hsellerid").val() == "" || $("#txtComName").val() == "") {
        //alert(2);
        isAllValid = false;
        $("#txtComName").siblings("span.error").css("visibility", "visible");
      } else {
        $("#txtComName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#detailsItems tbody tr").length == 0) {
        notify("warning", "Warning Message", "At least 1 item required.");
        //alert(3);
        isAllValid = false;
      }

      if ($("#txtByerName").val() == "") {
        $("#txtByerName").siblings("span.error").css("visibility", "visible");
        //alert(4);
        isAllValid = false;
      } else {
        $("#txtByerName").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtincotermid").val() == "") {
        $("#txtincotermid").siblings("span.error").css("visibility", "visible");
        //alert(5);
        isAllValid = false;
      } else {
        $("#txtincotermid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtShippingPeriod").val() == "") {
        $("#txtShippingPeriod")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(7);
        isAllValid = false;
      } else {
        $("#txtShippingPeriod")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txttransportmodeid").val() == "") {
        $("#txttransportmodeid")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(8);
        isAllValid = false;
      } else {
        $("#txttransportmodeid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#hsellerid").val() == "") {
        $("#hsellerid").siblings("span.error").css("visibility", "visible");
        //alert(9);
        isAllValid = false;
      } else {
        $("#hsellerid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtExpireDate").val() == "") {
        $("#txtExpireDate").siblings("span.error").css("visibility", "visible");
        //alert(10);
        isAllValid = false;
      } else {
        $("#txtExpireDate").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#sqtypeid").val() == "") {
        $("#sqtypeid").siblings("span.error").css("visibility", "visible");
        //alert(11);
        isAllValid = false;
      } else {
        $("#sqtypeid").siblings("span.error").css("visibility", "hidden");
      }

      //if ($("#txtshipmentmodeid").val() == "") {
      //    $("#txtshipmentmodeid").siblings('span.error').css('visibility', 'visible');
      //    alert(12);
      //    isAllValid = false;
      //} else {
      //    $("#txtshipmentmodeid").siblings('span.error').css('visibility', 'hidden');
      //}

      if ($("#txtFromshipmentcountryid").val() == "") {
        $("#txtFromshipmentcountryid")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(13);
        isAllValid = false;
      } else {
        $("#txtFromshipmentcountryid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtTEXTFROMSHIPMENT").val() == "") {
        $("#txtTEXTFROMSHIPMENT")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(14);
        isAllValid = false;
      } else {
        $("#txtTEXTFROMSHIPMENT")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtcurrencyid").val() == "") {
        $("#txtcurrencyid").siblings("span.error").css("visibility", "visible");
        //alert(15);
        isAllValid = false;
      } else {
        $("#txtcurrencyid").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtloadingport").val() == "") {
        $("#txtloadingport")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(16);
        isAllValid = false;
      } else {
        $("#txtloadingport").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtDESTINATIONPORT").val() == "") {
        $("#txtDESTINATIONPORT")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(17);
        isAllValid = false;
      } else {
        $("#txtDESTINATIONPORT")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      //if ($("#loadingplace").val() == "") {
      //    $("#loadingplace").siblings('span.error').css('visibility', 'visible');
      //    //alert(18);
      //    isAllValid = false;
      //} else {
      //    $("#loadingplace").siblings('span.error').css('visibility', 'hidden');
      //}

      if ($("#txtQuantitySummary").val() == "") {
        $("#txtQuantitySummary")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(19);
        isAllValid = false;
      } else {
        $("#txtQuantitySummary")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtPacking").val() == "") {
        $("#txtPacking").siblings("span.error").css("visibility", "visible");
        //alert(19);
        isAllValid = false;
      } else {
        $("#txtPacking").siblings("span.error").css("visibility", "hidden");
      }

      if ($("#txtDescriptionSpecification").val() == "") {
        $("#txtDescriptionSpecification")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(19);
        isAllValid = false;
      } else {
        $("#txtDescriptionSpecification")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if ($("#txtToshipmentcountryid").val() == "") {
        $("#txtToshipmentcountryid")
          .siblings("span.error")
          .css("visibility", "visible");
        //alert(19);
        isAllValid = false;
      } else {
        $("#txtToshipmentcountryid")
          .siblings("span.error")
          .css("visibility", "hidden");
      }

      if (isAllValid) {
        var selected = $("#txtPaymentTerms option:selected");
        var paymenttermid = parseInt(selected.data("id"), 10); // list.id
        var paymenttermname = selected.val();

        var master = {
          CUSTOMERID: $("#hcusid").val(),
          UNITID: $("#hsellerid").val(),
          DESCRIPTIONS: $("#description").val(),
          DOCUMENTCREATEDBY: 0,
          DOCUMENTSTATUSID: 1,
          TERMSCONDITION: $("#termscon").val(),
          SQTYPEID: $("#sqtypeid").val(),
          EXPIREDATE: $("#txtExpireDate").val(),
          SHIPMENTMODE: $("#txtshipmentmodeid").val(),
          FROMSHIPMENT: $("#txtFromshipmentcountryid").val(),
          TOSHIPMENT: $("#txtToshipmentcountryid").val(),
          TEXTFROMSHIPMENT: $("#txtTEXTFROMSHIPMENT").val(),
          CURRENCY: $("#txtcurrencyid").val(),
          LOADINGPORT: $("#txtloadingport").val(),
          DESTINATIONPORT: $("#txtDESTINATIONPORT").val(),
          LOADINGPLACE: $("#loadingplace").val(),
          INCOTERM: $("#txtincotermid").val(),

          PAYMENTTERMS: paymenttermname,
          PAYMENTTERMSID: paymenttermid,
          PAYMENTTERMS_OTHERS: $("#etxtpaymentterm").val(),
          DESCRIPTIONSPECIFICATION: $("#txtDescriptionSpecification").val(),

          SHIPPINGPERIOD: $("#txtShippingPeriod").val(),
          TRANSPORTATIONMODE: $("#txttransportmodeid").val(),
          QUANTITYSUMMARY: $("#txtQuantitySummary").val(),
          PACKING: $("#txtPacking").val(),
          MARKER: $("#txtMarker").val(),
        };

        $.ajax({
          type: "POST",
          url: "/SalesQuatationLanding/Save",
          dataType: "json",
          data: { sq: master, sqd: Details },
          success: function (result) {
            notify("success", "Success Message", result);

            var sqNumber = result.split(":")[1].trim();

            var parts = sqNumber.split("-");

            var Modulename = parts[0].trim();
            var HeaderID = parts[2].trim();

            var processCode = Modulename + "-" + HeaderID;

            UploadFileUsingAPI(processCode);

            $scope.SQList();
            //$scope.Clear();
            //$('#detailsItems').empty();
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
    $("#quantity").val(0);
    $("#unitprice").val(0);

    $scope.DiscountID = 0;

    $("#discountid").val("0");
    $("#discountamount").val("0");

    $("#totalamount").val(0);

    $("#ename").val("");
    $("#eitemcode").val(0);
    $("#euom").val("");
    $("#equantity").val(0);
    $("#eunitprice").val(0);

    $scope.eDiscountID = 0;
    $("#ediscountamount").val("0");

    $("#etotalamount").val(0);

    $("#remarks").val("");
    $("#shortdetails").val("");
    $("#eremarks").val("");
    $("#eshortdetails").val("");
  };

  $scope.Clear = function () {
    $(".error").css("visibility", "hidden");

    /*for save item clear*/
    $("#hcusid").val(0);
    $("#hsellerid").val(0);
    $("#txtComName").val("");
    $("#txtBuyerName").val("");
    $("#description").val("");

    $("#txtExpireDate").val("");
    $("#sqtypeid").val("");
    $("#txtshipmentmodeid").val("");
    $("#txtFromshipmentcountryid").val("");
    $("#txtTEXTFROMSHIPMENT").val("");
    $("#txtcurrencyid").val("");
    $("#txtloadingport").val("");
    $("#txtDESTINATIONPORT").val("");
    $("#loadingplace").val("");
    $("#txtloadingport").val("");
    // $("#txtOriginCountry").val('');
    $("#txtincotermid").val("");
    $("#txtShippingPeriod").val("");
    $("#txttransportmodeid").val("");

    $("#txtSellerPhone").val("");
    $("#txtSellerEmail").val("");
    $("#txtSellerTIN").val("");
    $("#txtSellerAddress").val("");

    $("#txtPhone").val("");
    $("#txtEmail").val("");
    $("#txtAddress").val("");

    $("#txtpaymenttermid").val("");
    $("#etxtpaymentterm").val("");
    $("#txtDescriptionSpecification").val("");
    $("#txtQuantitySummary").val("");
    $("#txtPacking").val("");
    $("#txtMarker").val("");

    var rowCount = detailsItems.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
      detailsItems.deleteRow(i);
    }

    $scope.ClearLine();
    /*end save item clear*/
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

  $scope.EonPaymentChange = function () {
    var selected = $("#Etxtpaymenttermid option:selected");
    var Paymenttermname = selected.data("name"); // list.name
    if (Paymenttermname !== "Others") {
      $scope.paymenttermsname = Paymenttermname;
      $("#Eetxtpaymentterm").val("");
    } else {
      $scope.paymenttermsname = "Others";
    }
  };

  $scope.EditbyMasterID = function (ID, sqnumber) {
    $("#editheaderid").val(ID);
    $("#editsqnumber").val(sqnumber); //for item specification

    $("#Eetxtpaymentterm").val("");
    $("#Etxtpaymenttermid").val("");

    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/EditByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      //console.log(data);
      $scope.ESQType(data[0].unitid);
      $("#hheaderid").val(data[0].id);
      $("#etxtExpireDate").val(data[0].expiredate);
      $("#ehsellerid").val(data[0].unitid);
      $("#ehcusid").val(data[0].cusid);
      $("#edittxtComName").val(data[0].unitname);
      $("#etxtSellerPhone").val(data[0].sellerPhone);
      $("#etxtSellerEmail").val(data[0].sellerEmail);
      $("#etxtSellerTIN").val(data[0].sellerTin);
      $("#ehselleridunitid").val(data[0].unitID);
      $("#etxtBuyerName").val(data[0].customername);
      $("#etxtPhone").val(data[0].cusPhone);
      $("#etxtEmail").val(data[0].cusEmail);
      $("#etermscon").val(data[0].termscondition);
      $("#edescription").val(data[0].descriptions);
      $("#esqtypeid").val(data[0].sqtypeid);
      $scope.GetFGUOMAll(data[0].unitid);

      //$("#etxtToShipment").val(data[0].toshipment);
      setTimeout(function () {
        $("#EtxtToshipmentcountryid").val(data[0].toshipment);
      }, 1000);
      $("#Eloadingplace").val(data[0].loadingplace);
      $("#Etxtcurrencyid").val(data[0].currency);
      $("#Etxtloadingport").val(data[0].loadingport);
      $("#EtxtDESTINATIONPORT").val(data[0].destinationport);
      $("#EtxtQuantitySummary").val(data[0].quantitysummary);
      $("#EtxtPacking").val(data[0].packing);
      $("#EtxtMarker").val(data[0].marker);
      $("#EtxtDescriptionSpecification").val(data[0].descriptionspecification);
      $("#Etxtincotermid").val(data[0].incoterm);

      $("#EtxtShippingPeriod").val(data[0].shippingperiod);
      $("#Etxttransportmodeid").val(data[0].transportationmode);

      $scope.paymenttermsname = data[0].paymentterms;
      $("#Eetxtpaymentterm").val(data[0].paymenttermsothers);

      setTimeout(function () {
        $("#Etxtpaymenttermid").val(data[0].paymenttermsid);
        $("#EtxtFromshipmentcountryid").val(data[0].fromshipment);
        $("#esqtypeid").val(data[0].sqtypeid);
      }, 1000);
    });

    $scope.EditbyDetailsID(ID);
  };

  $scope.EditbyDetailsID = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationLanding/EditByDetaisID",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.edetailsbyid = result;
    });
  };

  $scope.SearchFGLine = function (index) {
    $("#ename" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetFGlist/",
          type: "Get",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#ehsellerid").val(),
            itemtypeid: $("#eitemtypeid" + index).val() || 0,
          },
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
      minlength: 1,
    });
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
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
      minlength: 1,
    });
  };

  $scope.SearchFGHeader = function () {
    $("#name").autocomplete({
      minLength: 0, // enables open on focus (was minlength:1, wrong casing)
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetFGlist/",
          type: "Get",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#hsellerid").val(),
            itemtypeid: $("#itemtypeid").val() || 0,
          },
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
        //$("#ename").val(ui.item.Name);
        $("#itemcode").val(ui.item.id);
        $("#uom").val(ui.item.uoM);
        //$("#eitemcode").val(ui.item.id);
        //$("#euom").val(ui.item.uoM);
        return false;
      },
    });

    // open list on focus/click (dropdown feel)
    $("#name")
      .off("focus.sqopen")
      .on("focus.sqopen", function () {
        $(this).autocomplete("search", $(this).val());
      });
  };

  //$scope.SearchFGHeader = function () {

  //    $("#name").autocomplete({
  //        source: function (request, response) {
  //            $.ajax({
  //                url: '/SalesQuatationLanding/GetFGlist/',
  //                type: "Get",
  //                dataType: "json",
  //                data: { prefix: request.term, unitid: $("#hsellerid").val(), itemtypeid: $("#itemtypeid").val() || 0 },
  //                success: function (data) {
  //                    response($.map(data, function (item) {
  //                        return { label: item.name, id: item.id, uoM: item.uoM, Name: item.name };
  //                    }));
  //                }
  //            });
  //        },
  //        select: function (event, ui) {

  //            $("#name").val(ui.item.Name);
  //            //$("#ename").val(ui.item.Name);

  //            $("#itemcode").val(ui.item.id);
  //            $("#uom").val(ui.item.uoM);

  //            //$("#eitemcode").val(ui.item.id);
  //            //$("#euom").val(ui.item.uoM);

  //            return false;
  //        },
  //        minlength: 1
  //    });
  //};

  $scope.GetItemNameIDByName = function (itemName, itemTypeId, callback) {
    var term = (itemName || "").trim();

    $.ajax({
      url: "/SalesQuatationLanding/GetFGlist/",
      type: "GET",
      dataType: "json",
      data: {
        prefix: term,
        unitid: $("#hsellerid").val(),
        itemtypeid: itemTypeId || 0,
      },
      success: function (data) {
        var item = (data || []).find(function (x) {
          return (x.name || "").trim().toLowerCase() === term.toLowerCase();
        });
        callback(item ? item.id : null, term);
      },
      error: function () {
        callback(null, term);
      },
    });
  };

  //$scope.GetItemNameIDByName = function (itemName, callback) {

  //    $.ajax({

  //        url: '/SalesQuatationLanding/GetFGlist/',
  //        type: "GET",
  //        dataType: "json",

  //        data: {
  //            prefix: itemName,
  //            unitid: $("#hsellerid").val()
  //        },

  //        success: function (data) {

  //            var item = data.find(x => x.name == itemName);

  //            if (item) {
  //                callback(item.id);
  //            }
  //            else {
  //                callback(null);
  //            }
  //        }
  //    });
  //};

  $scope.ESearchFGHeader = function () {
    $("#ename").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetFGlist/",
          type: "Get",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#ehsellerid").val(),
            itemtypeid: $("#eitemtypeid").val() || 0,
          },
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
      minlength: 1,
    });
  };

  //$scope.SearchHeaderSeller = function () {
  //    $("#txtComName,#edittxtComName").autocomplete({
  //        source: function (request, response) {
  //            $.ajax({
  //                url: '/SalesQuatationLanding/GetSellerInfo/',
  //                type: "Get",
  //                dataType: "json",
  //                data: { prefix: request.term },
  //                success: function (data) {
  //                    response($.map(data, function (item) {
  //                        return { label: item.name, id: item.id, phone: item.phone, tin: item.tin, email: item.email, address: item.address, Name: item.name };
  //                    }));
  //                }
  //            });
  //        },
  //        select: function (event, ui) {
  //            $("#txtComName").val(ui.item.Name);
  //            $("#edittxtComName").val(ui.item.Name);
  //            //alert(ui.item.id)

  //            $("#ehsellerid").val(ui.item.id);

  //            $("#hsellerid").val(ui.item.id);
  //            $("#ehsellerid").val(ui.item.id);

  //            $("#txtSellerPhone").val(ui.item.phone);
  //            $("#txtSellerEmail").val(ui.item.email);
  //            $("#txtSellerTIN").val(ui.item.tin);
  //            $("#txtSellerAddress").val(ui.item.address);

  //            $scope.SQType();
  //            $scope.GetDislist();
  //            $scope.GetFGUOMAll(ui.item.id);  //get UOM using selected seller.
  //            return false;
  //        },
  //        minlength: 1
  //    });

  //};

  // Load all sellers once (call this on page/modal init)
  $scope.LoadSellerList = function () {
    $.ajax({
      url: "/SalesQuatationLanding/GetSellerInfo/",
      type: "GET",
      dataType: "json",
      data: { prefix: "" },
      success: function (data) {
        console.log("SELLERS:", data);
        $timeout(function () {
          $scope.sellerList = $.map(data, function (item) {
            return {
              id: item.id,
              name: item.name,
              phone: item.phone,
              tin: item.tin,
              email: item.email,
              address: item.address,
            };
          });
        });
      },
      error: function (xhr) {
        console.log("Seller load failed:", xhr.status, xhr.responseText);
      },
    });
  };

  $scope.OnSellerChange = function () {
    var seller = $scope.sellerList.find(function (s) {
      return String(s.id) === String($scope.selectedSellerId);
    });

    if (!seller) {
      $("#hsellerid").val("");
      $("#ehsellerid").val("");
      $("#txtSellerPhone").val("");
      $("#txtSellerEmail").val("");
      $("#txtSellerTIN").val("");
      $("#txtSellerAddress").val("");
      return;
    }

    $("#hsellerid").val(seller.id);
    $("#ehsellerid").val(seller.id);
    $("#txtSellerPhone").val(seller.phone);
    $("#txtSellerEmail").val(seller.email);
    $("#txtSellerTIN").val(seller.tin);
    $("#txtSellerAddress").val(seller.address);

    $scope.SQType();
    $scope.GetDislist();
    $scope.GetFGUOMAll(seller.id);
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
      minlength: 1,
    });
  };

  $scope.viewDocument = function () {
    var userId = "Dummy_String";
    var password = "Dummy_String";
    var userFolder = "Dummy_String";

    var apiUrl =
      "Dummy_String" +
      "?userid=" +
      encodeURIComponent(userId) +
      "&password=" +
      encodeURIComponent(password) +
      "&userFolder=" +
      encodeURIComponent(userFolder);
    $.ajax({
      url: apiUrl,
      type: "GET",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      },

      contentType: false,
      processData: false,
      success: function (data) {
        var baseContent = data[0].base64Content;
        //var fileName = data.fileName;
        var img = $("<img>", {
          id: "imgDemoUser",
          src: "data:image/png;base64," + baseContent,
          alt: "Demo User Image",
          class: "img-responsive",
          style: "max-width: 100px; max-height: 100px;",
        });
        $("#imageContainer").append(img);
      },
    });
  };

  $scope.Report = function (id) {
    //alert(id);

    var rooturl = "";

    var folder = "/EXPORT/Common/SQ";

    var url =
      rooturl + folder + "&sqnum=" + id + "&rs:Embed=true&rc:LinkTarget=_self";
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
  $scope.LoadSellerList();
  $scope.BindItemNameBlur();
});
