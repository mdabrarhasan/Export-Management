var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  //$scope.loading = true;
  $(".jute").hide();
  $(".biax").hide();
  $(".juteview").hide();
  $(".biaxview").hide();

  //function convertTo2DArray(data) {
  //    if (!Array.isArray(data) || data.length === 0) return [];

  //    const headers = Object.keys(data[0].columns);

  //    const rows = data.map(item => headers.map(header => item.columns[header]));

  //    return [headers, ...rows];
  //}

  function convertTo2DArray(data) {
    if (!Array.isArray(data) || data.length === 0) return [];

    // Define the priority order
    const priorityHeaders = ["PRODUCTCODE", "PRODUCTNAME", "THIKNESS"];

    // Get all the headers from the first item's columns
    const allHeaders = Object.keys(data[0].columns);

    // Reorder headers to ensure priority headers come first
    const headers = [
      ...priorityHeaders,
      ...allHeaders.filter((header) => !priorityHeaders.includes(header)),
    ];

    // Map each item's columns to match the header order
    const rows = data.map((item) =>
      headers.map((header) => item.columns[header]),
    );

    // Return the headers and rows
    return [headers, ...rows];
  }

  $scope.GetLasttenItem = function (id) {
    $scope.ID = id;

    $http({
      method: "get",
      url: "/PriceConfirm/GetLasttenItem",
      params: { id: $scope.ID },
    }).then(function (response) {
      // $scope.getitemtenlist = response.data;

      console.log("Need this data");
      console.log(response);
      // $scope.getitemtenlist = response.data[0].columns;

      //  var col = response.data[0].columns;

      var col = response.data;

      $scope.tableArray = convertTo2DArray(col);

      console.log("Table Array:");
      console.log($scope.tableArray);

      //var headers = Object.keys(col);
      //var body = [];

      //$scope.tableHeaders = Object.keys(response.data[0].columns);

      //$scope.tableBody = response.data.map(item => {
      //    let row = [];
      //    $scope.tableHeaders.forEach(header => {
      //        row.push(item.columns[header]);
      //    });
      //    return row;
      //});

      //console.log("Headers:", $scope.tableHeaders);
      //console.log("Body:", $scope.tableBody);

      //var prioritizedKeys = ["PRODUCTNAME", "THIKNESS","PRODUCTCODE"];

      //    var allKeys = Object.keys(col);
      //    console.log("All Keys:", allKeys);

      //    var prioritized = [];
      //    var nonPrioritized = [];

      //    allKeys.forEach(function (key) {

      //        if (prioritizedKeys.some(pk => pk.toLowerCase() === key.toLowerCase())) {
      //            prioritized.push(key);
      //        } else {
      //            nonPrioritized.push(key);
      //        }
      //    });

      //   // nonPrioritized.reverse();

      //    var orderedKeys = [...prioritized, ...nonPrioritized];
      //    console.log("Ordered Keys:", orderedKeys);

      //    var reorderedArray = orderedKeys.map(key => ({
      //        key: key,
      //        value: col[key]
      //    }));

      //    console.log("Reordered Array:", reorderedArray);

      //    $scope.getitemtenlist = reorderedArray;

      //  $scope.getitemtenlist = col;
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

  $scope.EditCalculateLine = function (index, id) {
    $scope.EDiscountPercentageCalculateLine(index, id);
  };

  $scope.Print = function (id) {
    $scope.HeaderPrint(id);
    $scope.LinePrint(id);
    $scope.GetLasttenItem(id);
  };

  $scope.HeaderPrint = function (id) {
    $scope.ID = id;

    $http({
      method: "get",
      url: "/PriceConfirm/GetPriceConfirmQuotationApproval",
      params: { id: $scope.ID },
    }).then(function (response) {
      // console.log("lets go rafayet");
      //  console.log(response);

      //document.getElementById('cusname').innerText = response.data[0].customername;
      //document.getElementById('cusaddress').innerText = response.data[0].cusaddress;
      //document.getElementById('regno').innerText = response.data[0].vatregno;
      //  document.getElementById('hscode').innerText = response.data[0].hscode;
      //  document.getElementById('producthscode').innerText = response.data[0].productHScodeName;
      const today = new Date();
      const formattedDate = today.toLocaleDateString(); // This will format the date according to your locale

      document.getElementById("date").innerText = response.data[0].startdate;
      document.getElementById("expdate").innerText = response.data[0].enddate;
      document.getElementById("terms").innerText =
        response.data[0].termscondition;

      // UOM In header
      var uom = response.data[0].uom || response.data[0].UOM;

      if (uom && uom.trim() !== "") {
        document.getElementById("qtyHeader").innerText =
          "Quantity (" + uom + ")";
      } else {
        document.getElementById("qtyHeader").innerText = "Quantity";
      }

      //document.getElementById('date').innerText = response.data[0].date;

      //document.getElementById('invoiceno').innerText = response.data[0].quotationnumber;
      //document.getElementById('cusid').innerText = response.data[0].customerid;
      //document.getElementById('shippingmode').innerText = response.data[0].shippingmode;
      //document.getElementById('modeoftransportation').innerText = response.data[0].modeoftransportation;
      //document.getElementById('netweight').innerText = response.data[0].netweight;
    });
  };

  $scope.LinePrint = function (id) {
    $scope.ID = id;
    var total = 0.0;
    $http({
      method: "get",
      url: "/PriceConfirm/GetPriceConfirmQuotationApproval",
      params: { id: $scope.ID },
    }).then(function (response) {
      $scope.lineprint = response;
      //$scope.lineprint = null;
      $scope.lineprint = response.data;
      console.log("need the line data");
      console.log(response.data);
      $scope.terms = response.data.termscondition;
      document.getElementById("RefNumber").innerText =
        $scope.lineprint[0].referencenumber;
      document.getElementById("cusname").innerText =
        $scope.lineprint[0].customertname;
      document.getElementById("paymentTerms").innerText =
        $scope.lineprint[0].salestypename;
      //  console.log("Need that value");
      //   console.log($scope.lineprint[0].salestypename);

      //  alert(response.data[0].id)

      //for (var i = 0; i < response.data.length; i++) {

      //    total = parseFloat(total) + parseFloat(response.data[i].proposedbaseprice);
      //}

      //document.getElementById('totalamt').innerText = total;
    });
  };

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

  //////// Alternative for no blank second page
  /*

    $scope.PrintDoc = function () {
        printElement(document.getElementById("printThis"));
    };

    function printElement(elem) {
        // 1. Create dynamic style override for isolation
        var styleTag = document.createElement('style');
        styleTag.id = 'dynamic-page-print-style';
        styleTag.innerHTML = `
        @media print {
            // Hide all page content except the cloned print section 
            body > *:not(#printSection) {
                display: none !important;
            }
            #printSection, #printSection * {
                visibility: visible !important;
            }
            #printSection {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            // Remove scrollable modal boundaries 
            #printSection .modal-body {
                max-height: none !important;
                overflow: visible !important;
                padding: 0 !important;
            }
            @page {
                size: A4 portrait;
                margin: 8mm;
            }
        }
    `;
        document.head.appendChild(styleTag);

        // 2. Clone the printable area
        var domClone = elem.cloneNode(true);
        var $printSection = document.getElementById("printSection");

        if (!$printSection) {
            $printSection = document.createElement("div");
            $printSection.id = "printSection";
            document.body.appendChild($printSection);
        }

        $printSection.innerHTML = "";
        $printSection.appendChild(domClone);

        // 3. Trigger Print
        window.print();

        // 4. Clean up injected dynamic styles after print dialog closes
        setTimeout(function () {
            var styleElement = document.getElementById('dynamic-page-print-style');
            if (styleElement) {
                styleElement.parentNode.removeChild(styleElement);
            }
        }, 1000);
    }
    */

  $scope.PrintReport = function () {
    //var id = document.getElementById("RefNumber");
    //console.log(id);

    var label = document.getElementById("RefNumber"); // Get the element
    var text = label.innerHTML; // Get the text content (you can also use textContent)

    console.log(text); // Output: "PA-24DEC1181"

    console.log(label);

    var rooturl = "";
    var folder = "/EXPORT/Common/PriceApproval";

    let id = text;

    console.log("Inside Report Function");

    var url =
      rooturl + folder + "&PCNUM=" + id + "&rs:Embed=true&rc:LinkTarget=_self";
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

  //$scope.downloadExcel = function () {
  //    const tableData = $scope.prepareData(); // Assuming this function retrieves the table data for export

  //    if (tableData.length === 0) {
  //        alert("No data to export!");
  //        return;
  //    }

  //    try {
  //        // Header Data
  //        const headerData = [
  //            { label: "Date", value: document.getElementById("date").innerText },
  //            { label: "Expiration Date", value: document.getElementById("expdate").innerText },
  //            { label: "Reference Number", value: document.getElementById("RefNumber").innerText },
  //            { label: "Customer Name", value: document.getElementById("cusname").innerText },
  //            { label: "Payment Terms", value: document.getElementById("paymentTerms").innerText },
  //            { label: "Terms and Conditions", value: document.getElementById("terms").innerText }
  //        ];

  //        // Prepare header section as key-value pairs (labels and their values)
  //        const headerSection = headerData.map(item => ({
  //            Header: item.label,
  //            Value: item.value
  //        }));

  //        // Create a gap row to separate header from table data
  //        const verticalGap = { Header: "", Value: "" }; // Empty row to create a gap

  //        // Prepare table data
  //        const tableDataWithGap = tableData.map((row) => ({
  //            Header: "",
  //            Value: "",
  //            ...row
  //        }));

  //        // Create an empty row before table data to ensure proper separation
  //        const emptyRowBeforeTable = [{ Header: "", Value: "" }];

  //        // Combine the header section, empty row for separation, and the table data
  //        const dataWithHeaders = [
  //            ...headerSection, // Header data
  //            ...emptyRowBeforeTable, // Empty row before table
  //            ...tableDataWithGap // Table data
  //        ];

  //        // Additional approver data to be added after the table data
  //        const approverData = [
  //            { label: "Attn Person", value: "Executive, S & M\nABFL" },
  //            { label: "Checked by", value: "Asst. Manager, S & M\nABFL" },
  //            { label: "Proposed by", value: "Sr. Manager, S & M\nABFL" },
  //            { label: "Approved by", value: "Director(Operations)\nABFL" }
  //        ];

  //        // Add the approver data at the bottom
  //        const approversSection = approverData.map(item => ({
  //            Header: item.label,
  //            Value: item.value
  //        }));

  //        // Combine the table data with approvers data
  //        const finalData = [
  //            ...dataWithHeaders, // Header + table data
  //            ...approversSection // Approvers data at the bottom
  //        ];

  //        // Convert the data into a worksheet
  //        const worksheet = XLSX.utils.json_to_sheet(finalData);

  //        // Create a new workbook and append the worksheet
  //        const workbook = XLSX.utils.book_new();
  //        XLSX.utils.book_append_sheet(workbook, worksheet, "Prices");

  //        // Trigger Excel file download
  //        XLSX.writeFile(workbook, "PriceApproval.xlsx");
  //        console.log("Excel file generated successfully.");
  //    } catch (error) {
  //        console.error("Error generating Excel file:", error);
  //        alert("Failed to generate Excel file. Check the console for details.");
  //    }
  //};

  $scope.prepareData = function () {
    if (!$scope.lineprint || $scope.lineprint.length === 0) {
      console.error("No data available in $scope.lineprint");
      return [];
    }

    // Prepare the data for Excel
    return $scope.lineprint.map((price) => ({
      "Product Code": price.productcode || "",
      "Product Name": price.productname || "",
      "Thickness (μ)": price.thikness || "",
      Length: price.width || "",
      "Quantity (KG)": price.quantity || "",
      "Previous Base Price": price.previousbasedprice || "",
      "Proposed Base Price": price.proposedbaseprice || "",
    }));
  };

  //$scope.downloadExcel = function () {
  //    const tableData = $scope.prepareData();

  //    if (tableData.length === 0) {
  //        alert("No data to export!");
  //        return;
  //    }

  //    try {
  //        // Create worksheet and workbook
  //        const worksheet = XLSX.utils.json_to_sheet(tableData);
  //        const workbook = XLSX.utils.book_new();
  //        XLSX.utils.book_append_sheet(workbook, worksheet, "Prices");

  //        // Write Excel file
  //        XLSX.writeFile(workbook, "PriceApproval.xlsx");
  //        console.log("Excel file generated successfully.");
  //    } catch (error) {
  //        console.error("Error generating Excel file:", error);
  //        alert("Failed to generate Excel file. Check the console for details.");
  //    }
  //};

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
  $scope.EDiscountPercentageCalculateLine = function (index, discountid) {
    $("#ediscountamount" + index).prop("disabled", false);

    if ($("#ediscountid" + index).val() != "3") {
      $("#ediscountamount" + index).prop("disabled", true);
      if (discountid == 0 || discountid === null) {
        var total =
          parseFloat($("#equantity" + index).val()) *
          parseFloat($("#eofferprice" + index).val());

        $("#ediscountamount" + index).val("0");
        $("#etotalamount" + index).val((isNaN(total) ? 0 : total).toFixed(4));
      } else {
        $http({
          method: "get",
          url: "/SalesQuatationLanding/GetDisCal",
          params: { id: discountid },
        }).then(function (response) {
          // alert(response.data[0]);

          var total =
            parseFloat($("#equantity" + index).val()) *
            parseFloat($("#eofferprice" + index).val());

          if (response.data[0] === undefined) {
            //  alert(total);
            $("#etotalamount" + index).val(
              (isNaN(total + parseFloat($("#evatamount" + index).val()))
                ? 0
                : total + parseFloat($("#evatamount" + index).val())
              ).toFixed(4),
            );
          } else if (response.data[0].code === "WD") {
            // alert(total);
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

  $scope.Dislist = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDiscountDetails",
    }).then(function (response) {
      $scope.Dislist = response.data;
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

  $scope.PCList = function () {
    if ($("#unitid").val() === "91") {
      $http({
        method: "get",
        url: "/PriceConfirm/GetPCPendingBiax",
        params: { unitid: $("#unitid").val() },
      }).then(function (response) {
        $scope.PClist = response.data;
        //$scope.loading = false;
      });
    } else {
      $http({
        method: "get",
        url: "/PriceConfirm/GetPCPending",
        params: { unitid: $("#unitid").val() },
      }).then(function (response) {
        $scope.PClist = response.data;
        //$scope.loading = false;
      });
    }
  };

  $scope.GetFGUOM = function () {
    $http({
      method: "get",
      url: "/Quotation/GetFGUOM",
    }).then(function (response) {
      $scope.fguomlist = response.data;
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

  $scope.Dislist = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDiscountDetails",
    }).then(function (response) {
      $scope.Dislist = response.data;
    });
  };

  $scope.GetUnit = function () {
    $http({
      method: "GET",
      url: "/Common/GetUnitByUser",
    }).success(function (result) {
      $scope.unitlist = result;
    });
  };

  $scope.DeleteMaster = function (id) {
    $http({
      method: "get",
      url: "/PriceConfirm/DeleteMaster",
      params: { id: id },
    }).then(function (result) {
      notify("success", "Success Messsage", result.data);
      $scope.PCList();
    });
  };

  $scope.Save = function () {
    $("#savebutton").prop("disabled", true);
    var isAllValid = true;
    var Details = [];
    if ($("#unitidforload").val() === "91") {
      if ($($("#detailsItems tbody tr")).length == 0) {
        notify("error", "Error", "Add At Least One Item.");
      }
      $(
        $("#detailsItems > tbody > tr").each(function (i, ele) {
          if (
            $("#eofferprice" + i).val() === "0" ||
            $("#eofferprice" + i).val() === ""
          ) {
            isAllValid = false;
            $("#eofferprice" + i)
              .siblings("span.error")
              .css("visibility", "visible");
          } else {
            $("#eofferprice" + i)
              .siblings("span.error")
              .css("visibility", "hidden");
            var details = {
              ID: $("#eid" + i).val(),
              ITEMID: $("#eitemcode" + i).val(),
              HSCODE: $("#hscodeline" + i).val(),
              QUANTITY: parseFloat($("#equantity" + i).val()),
              PRICE: parseFloat($("#eofferprice" + i).val()),
              VATID: parseInt($("#evatid" + i).val()),
              VATAMOUNT: parseFloat($("#evatamount" + i).val()),
              DISCOUNTID: 0,
              DISCOUNT: parseFloat($("#eofferprice" + i).val()), //DISCOUNT AS OFFERPRICE
              TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()),
              TOLERANCEID: parseInt($("#etoleranceid" + i).val()),
              DESCRIPTIONS: $("#eshortdetails" + i).val(),
              REMARKS: $("#eremarks" + i).val(),
              FROMSHIPMENTSCHEDULEDATE: $("#elifromshipmentscdate" + i).val(),
              TOSHIPMENTSCHEDULEDATE: $("#elitoshipmentscdate" + i).val(),

              UOMID: 0,
              THIKNESS: $("#ethikness" + i).val(),
              WIDTH: $("#ewidth" + i).val(),
              LENGTH: $("#elength" + i).val(),
              TREATMENTLEVEL: $("#etreatmentlevel" + i).val(),
              TREATMENTDIRECTIONID: 0,
              COREID: 0,
              REALOD: $("#erealod" + i).val(),
              DISEREDDATEOFDELIVERY: $("#edateofdelivery" + i).val(),
              TENTATIVEDATEOFDELIVERY: $("#etentativedelivery" + i).val(),
            };
            Details.push(details);
          }
        }),
      );

      if (isAllValid) {
        if (confirm("Are You Sure? You Want to Save this Record.") == true) {
          var master = {
            SELLERID: $("#hsellerid").val(),
            CUSTOMERID: $("#hcusid").val(),
            PROFORMAINVOICEHEADERID: $("#txtPISCID").val(),
            TERMSCONDITION: $("#termscon").val(),
            DESCRIPTIONS: $("#description").val(),
            PRICEEXDATE: $("#txtPriceexdate").val(),
          };

          $.ajax({
            type: "POST",
            url: "/PriceConfirm/SaveBiax",
            dataType: "json",
            data: { pc: master, pcd: Details },
            success: function (result) {
              //UploadFileUsingAPI(result.split(':')[1]);
              //$scope.UploadFile(result);
              notify("success", "Success Messsage", result);
              $scope.viewdetailsbyid = null;
              $scope.PCList();
              $scope.Clear();
              $("#detailsItems > tbody > tr").empty();
              $("#savebutton").prop("disabled", false);
            },
            error: function (errormessage) {
              notify("error", "Error Message", errormessage.responseText);
            },
          });
        }
      }
    } else {
      if (confirm("Are You Sure? You Want to Save this Record.") == true) {
        $("#savebutton").prop("disabled", true);
        var Details = [];

        var master = {
          SELLERID: $("#unitidforload").val(),
          CUSTOMERID: $("#hcusid").val(),
          PROFORMAINVOICEHEADERID: $("#txtPISCID").val(),
          TERMSCONDITION: $("#termscon").val(),
          DESCRIPTIONS: $("#description").val(),
        };

        $(
          $("#editmycontainer > tbody > tr").each(function (index, ele) {
            var details = {
              ID: $(".piscitemid", this).val(),
              ITEMID: $(".itemcode", this).val(),
              QUANTITY: parseFloat($(".quantity", this).val()),
              PRICE: parseFloat($(".unitprice", this).val()),
              OFFERPRICE: parseInt($(".offerprice", this).val()),
              CONFIRMPRICE: parseFloat($(".confirmprice", this).val()),
            };
            Details.push(details);
          }),
        );

        $.ajax({
          type: "POST",
          url: "/PriceConfirm/Save",
          dataType: "json",
          data: { pc: master, pcd: Details },
          success: function (result) {
            notify("success", "Success Messsage", result);

            //$scope.UploadFile(result);

            $scope.PCList();
            $scope.Clear();
            $("#savebutton").prop("disabled", false);
            UploadFileUsingAPI(result.split(":")[1]);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      } else {
      }
    }
  };

  $scope.Clear = function () {
    $("#termscon").val();
    $("#description").val();
    $scope.detailsbyid = null;
    $("#hcusid").val(0);
    $("#hsellerid").val(0);
    $("#txtComName").val("");
    $("#txtBuyerName").val("");
    $("#description").val("");
    $("#termscon").val("");

    $("#txtSellerPhone").val("");
    $("#txtSellerEmail").val("");
    $("#txtSellerTIN").val("");
    $("#txtSellerAddress").val("");

    $("#txtPhone").val("");
    $("#txtEmail").val("");
    $("#txtAddress").val("");
    $("#txtPISC").val("");
    $("#txtPISCID").val("");

    $("#txtNotifyParty").val("");
  };

  $scope.Update = function () {
    var $jute = $(".editjute"); // scope reads to the Jute edit table (avoids duplicate-id collisions)
    var rows = [];
    var invalid = false;

    // 1) Validate + collect every Jute line first (so we don't do partial updates)
    angular.forEach($scope.edetailsbyid, function (line, i) {
      var unitPrice = $jute.find("#eunitprice" + i).val();
      if (unitPrice == "" || unitPrice === "0") {
        invalid = true;
      }
      rows.push({ line: line, unitPrice: unitPrice });
    });

    if (invalid) {
      notify(
        "error",
        "Error Message",
        "Unit price could not be empty or zero on any line.",
      );
      return;
    }

    var requests = [];

    // 2) Update each line (persists PRICE on the PC line + pushes to TBLPISCLINE)
    angular.forEach(rows, function (row) {
      requests.push(
        $.ajax({
          type: "POST",
          url: "/PriceConfirm/UpdateDetailsByID",
          dataType: "json",
          data: {
            pcd: {
              ID: row.line.id,
              ITEMID: row.line.itemid,
              QUANTITY: row.line.quantity,
              PRICE: row.unitPrice,
              OFFERPRICE: row.line.offerprice,
              CONFIRMPRICE: row.line.confirmprice,
            },
          },
        }),
      );
    });

    // 3) Update the master (terms & description) as before
    requests.push(
      $.ajax({
        type: "POST",
        url: "/PriceConfirm/UpdateMaster",
        dataType: "json",
        data: {
          pc: {
            ID: $("#priceconfirmheaderid").val(),
            TERMSCONDITION: $("#etermscon").val(),
            DESCRIPTIONS: $("#edescription").val(),
          },
        },
      }),
    );

    // 4) When all of them finish, notify once and refresh
    $.when
      .apply($, requests)
      .done(function () {
        notify("success", "Success Message", "All lines updated successfully.");
        $scope.PCList();
      })
      .fail(function (err) {
        notify(
          "error",
          "Error Message",
          err && err.responseText
            ? err.responseText
            : "One or more updates failed.",
        );
      });
  };

  //$scope.Update = function () {
  //    var Details = [];

  //    var master = {
  //        //SELLERID: $("#ehsellerid").val(),
  //        ID: $("#priceconfirmheaderid").val(),
  //        //PROFORMAINVOICEHEADERID: $("#etxtPISCID").val(),
  //        TERMSCONDITION: $("#etermscon").val(),
  //        DESCRIPTIONS: $("#edescription").val()
  //    }

  //    $.ajax({
  //        type: 'POST',
  //        url: '/PriceConfirm/UpdateMaster',
  //        dataType: "json",
  //        data: { 'pc': master },
  //        success: function (result) {

  //            //$scope.UploadFile(result);
  //            notify("success", "Success Messsage", result);
  //            UploadFileUsingAPI(result.split(':')[1]);
  //            $scope.PCList();
  //            //$scope.Clear();
  //        },
  //        error: function (errormessage) {
  //            notify('error', 'Error Message', errormessage.responseText);
  //        }
  //    });
  //}

  $scope.SearchPI = function () {
    if ($("#unitidforload").val() === "91") {
      $(".jute").hide();
      $(".biax").show();

      $("#txtPISC").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/PriceConfirm/GetPIInfoBiax/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term, unitid: $("#unitidforload").val() },
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
          $scope.GetCusDataBiax(ui.item.id);
          //$scope.GetSellerData(ui.item.id);
          $scope.GetPIDetailsDataBiax(ui.item.id);

          return false;
        },
        minlength: 2,
      });
    } else {
      $(".jute").show();
      $(".biax").hide();

      $("#txtPISC").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/PriceConfirm/GetPIInfo/",
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
    }
  };

  $scope.GetCusData = function (id) {
    $.ajax({
      url: "/LC/GetCusInfo",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        $("#hcusid").val(data[0].id);
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

  $scope.GetCusDataBiax = function (id) {
    $.ajax({
      url: "/LC/GetCusInfoForBusiness",
      type: "Get",
      dataType: "json",
      data: { typeid: $("#unitidforload").val(), id: id },
      success: function (data) {
        $("#hcusid").val(data[0].id);
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

  $scope.GetPriceConfirmQuotationApproval = function (id) {
    $ajax({
      url: "/PriceConfirm/GetPriceConfirmQuotationApproval",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (result) {
        notify("success", "Success Messsage", result);
      },
      error: function (errormessage) {
        notify("error", "Error Message", errormessage.responseText);
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

        //$("#etxtComName").val(data[0].name);
        //$("#ehsellerid").val(data[0].id);
        //$("#etxtSellerPhone").val(data[0].phone);
        //$("#etxtSellerEmail").val(data[0].email);
        //$("#etxtSellerTIN").val(data[0].tin);
        //$("#etxtSellerAddress").val(data[0].address);
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
        $("#etxtTIN").val(data[0].tin);
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
  //url: "PriceConfirm/GetPIDetailsByID",
  $scope.GetPIDetailsData = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "PriceConfirm/GetPIDetailsByID",
    }).then(function (response) {
      $scope.detailsbyid = response.data;
      //$scope.loading = false;
    });
  };

  $scope.GetPIDetailsDataBiax = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "PriceConfirm/OCFListViewPending",
    }).then(function (response) {
      $scope.edetailsbyid = null;
      $scope.edetailsbyid = response.data;
      //$scope.loading = false;
    });
  };

  $scope.EditbyMasterID = function (
    id,
    cusid,
    sellerid,
    number,
    description,
    termscon,
  ) {
    if ($("#unitid").val() === "91") {
      $(".editbiax").show();
      $(".editjute").hide();

      $("#priceconfirmheaderid").val(id);
      $http({
        method: "get",
        params: { id: id },
        url: "PriceConfirm/EditMasterByID",
      }).then(function (response) {
        $("#etxtPISC").val(number);
        $("#etermscon").val(termscon);
        $("#edescription").val(description);

        $scope.EditDetailsByIDBiax(id);
        $scope.EditGetCusData(cusid);
        $scope.EditGetSellerData(sellerid);

        //$scope.loading = false;
      });
    } else {
      $(".editbiax").hide();
      $(".editjute").show();
      $("#priceconfirmheaderid").val(id);
      $http({
        method: "get",
        params: { id: id },
        url: "PriceConfirm/EditMasterByID",
      }).then(function (response) {
        $("#etxtPISC").val(number);
        $("#etermscon").val(termscon);
        $("#edescription").val(description);

        $scope.EditDetailsByID(id);
        $scope.EditGetCusData(cusid);
        $scope.EditGetSellerData(sellerid);

        //$scope.loading = false;
      });
    }
  };

  $scope.EditDetailsByID = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "PriceConfirm/EditDetailsByID",
    }).then(function (response) {
      console.log(response);
      $scope.edetailsbyid = response.data;
    });
  };

  $scope.EditDetailsByIDBiax = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "PriceConfirm/EditDetailsByIDBiax",
    }).then(function (response) {
      $scope.edetailsbyidbiax = response.data;
    });
  };

  //$scope.ViewCData = function (ID, proformainvoiceheaderid) {
  //    $scope.ID = ID;
  //    $http({
  //        method: "GET",
  //        url: '/PriceConfirmApproval/ViewByMasterID',
  //        params: { id: $scope.ID, businessunitid: $scope.unitid }
  //    }).success(function (data) {
  //        $scope.LClistView = data;
  //    });

  //    //$scope.LoadDocument(ID);
  //    $scope.ViewByDetailsID(proformainvoiceheaderid);
  //};

  $scope.ViewByDetailsID = function (ID) {
    $http({
      method: "get",
      params: { id: ID },
      url: "PriceConfirm/EditDetailsByIDBiax",
    }).then(function (response) {
      $scope.viewdetailsbyid = response.data;
    });
  };

  $scope.UpdateBiaxByLineID = function (i, id, confirmprice) {
    var isAllValid = true;
    if (
      $("#eofferprice" + i).val() == "" ||
      $("#eofferprice" + i).val() === "0"
    ) {
      isAllValid = false;
      $("#eofferprice" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#eofferprice" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    //alert(confirmprice);

    if (isAllValid) {
      var details = {
        ID: id,
        ITEMID: $("#eitemcode" + i).val(),
        QUANTITY: $("#equantity" + i).val(),
        PRICE: $("#eunitprice" + i).val(),
        OFFERPRICE: $("#eofferprice" + i).val(),
        CONFIRMPRICE: $("#econfirmprice" + i).val(),
        DISCOUNTID: $("#ediscountid" + i).val(),
        DISCOUNT: $("#ediscountamount" + i).val(),
        TOTALAMOUNT: $("#etotalamount" + i).val(),
        UOMID: $("#euomid" + i).val(),

        THIKNESS: $("#ethikness" + i).val(),
        WIDTH: $("#ewidth" + i).val(),
        LENGTH: $("#elength" + i).val(),
        TREATMENTLEVEL: $("#etreatmentlevel" + i).val(),
        TREATMENTDIRECTIONID: $("#etreatmentdirectionid" + i).val(),

        COREID: $("#ecoreid" + i).val(),

        DISEREDDATEOFDELIVERY: $("#edateofdelivery" + i).val(),
        TENTATIVEDATEOFDELIVERY: $("#etentativedelivery" + i).val(),
        REMARKS: $("#eremarks" + i).val(),
        DESCRIPTIONS: $("#eshortdetails" + i).val(),
        REALOD: $("#erealod" + i).val(),
      };

      $.ajax({
        type: "POST",
        url: "/PriceConfirm/UpdateDetailsByID",
        dataType: "json",
        data: { pcd: details },
        success: function (result) {
          notify("success", "Success Message", result);
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.UpdateJuteByLineID = function (i, id, eofferprice) {
    var $jute = $(".editjute"); // scope to the Jute edit table to dodge duplicate-id collisions
    var isAllValid = true;

    if (
      $jute.find("#eunitprice" + i).val() == "" ||
      $jute.find("#eunitprice" + i).val() === "0"
    ) {
      isAllValid = false;
      notify(
        "error",
        "Error Message",
        "Unit Price could not be empty or zero.",
      );
    }

    if (isAllValid) {
      var details = {
        ID: id,
        ITEMID: $jute.find("#eitemcode" + i).val(),
        QUANTITY: $jute.find("#equantity" + i).val(),
        PRICE: $jute.find("#eunitprice" + i).val(), // now reads the edit-table value you typed
        OFFERPRICE: eofferprice,
        CONFIRMPRICE: $jute.find("#econfirmprice" + i).val(),
      };

      $.ajax({
        type: "POST",
        url: "/PriceConfirm/UpdateDetailsByID",
        dataType: "json",
        data: { pcd: details },
        success: function (result) {
          notify("success", "Success Message", result);
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  //$scope.UpdateJuteByLineID = function (i, id, eofferprice) {

  //    var isAllValid = true;
  //    if ($("#eofferprice" + i).val() == "") {
  //        isAllValid = false;
  //        $("#eofferprice" + i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#eofferprice" + i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#econfirmprice" + i).val() == "") {
  //        isAllValid = false;
  //        $("#econfirmprice" + i).siblings('span.error').css('visibility', 'visible');

  //    }
  //    else {
  //        $("#econfirmprice" + i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if (isAllValid) {

  //        var details = {
  //            ID: id,
  //            ITEMID: $("#eitemcode" + i).val(),
  //            QUANTITY: $("#equantity" + i).val(),
  //            PRICE: $("#eunitprice" + i).val(),
  //            OFFERPRICE: eofferprice,
  //            CONFIRMPRICE: $("#econfirmprice" + i).val()
  //        }

  //        $.ajax({
  //            type: 'POST',
  //            url: "/PriceConfirm/UpdateDetailsByID",
  //            dataType: "json",
  //            data: { 'pcd': details },
  //            success: function (result) {
  //                notify('success', 'Success Message', result);
  //            },
  //            error: function (errormessage) {
  //                notify('error', 'Error Message', errormessage.responseText);
  //            }
  //        });
  //    }
  //};

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

  $scope.ViewCData = function (ID, proformainvoiceheaderid) {
    $scope.ID = ID;
    if ($("#unitid").val() === "91") {
      $scope.ID = ID;
      $http({
        method: "GET",
        url: "/PriceConfirm/GetPCPendingBiaxView",
        params: { unitid: $scope.ID },
      }).success(function (data) {
        $scope.masterdata = data;
      });

      //$scope.LoadDocument(ID);
      $scope.ViewByDetailsData(ID, proformainvoiceheaderid);
      //$scope.ViewLoadDocumentStatus(ID);
    } else {
      $scope.ID = ID;
      $http({
        method: "GET",
        url: "/PriceConfirmApproval/ViewByMasterID",
        params: { id: $scope.ID },
      }).success(function (data) {
        $scope.masterdata = data;
      });

      //$scope.LoadDocument(ID);
      $scope.ViewByDetailsData(ID, proformainvoiceheaderid);
      $scope.ViewLoadDocumentStatus(ID);
    }
  };

  $scope.ViewByDetailsData = function (ID, proformainvoiceheaderid) {
    if ($("#unitid").val() === "91") {
      $(".juteview").hide();
      $(".biaxview").show();
      $scope.quotationid = ID;
      $http({
        method: "GET",
        url: "PriceConfirm/EditDetailsByIDBiax",
        params: { id: $scope.quotationid },
      }).success(function (result) {
        $scope.viewdetailsbyid = null;
        $scope.viewdetailsbyid = result;
      });
    } else {
      $(".juteview").show();
      $(".biaxview").hide();
      $scope.ID = ID;
      $http({
        method: "GET",
        url: "/PriceConfirmApproval/ViewByDetailsID",
        params: { id: $scope.ID },
      }).success(function (data) {
        $scope.pclistdetails = data;
      });
    }
  };

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PriceConfirm/GetDocStatus",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.docstatusview = result;
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
});
