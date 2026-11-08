var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  $scope.loading = true;
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

  $scope.updateRemainingQty = function (list) {
    if (list.quantity - list.packingreqquantity < 0) {
      alert("Accepted Quantity cannot be more than the Order Quantity");
    } else {
      list.remainingqty = list.quantity - list.packingreqquantity;
    }
  };

  $scope.echeckavailable = function (i) {
    var isAllValid = true;
    if (
      parseFloat($("#eremainingqty" + i).val()) <
      parseFloat($("#etobeqty" + i).val())
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

  $scope.GetAllData = function () {
    $http({
      method: "get",
      url: "/PickingPackingRequest/GetAllData",
    }).then(function (response) {
      $scope.getalldata = response.data;
      $scope.loading = false;
    });
  };

  $scope.TransportAgencyList = function () {
    $http({
      method: "get",
      url: "/Common/GetTransportAgency",
    }).then(function (response) {
      $scope.transportagencyoptionlist = response.data;
    });
  };

  $scope.DeleteMaster = function (id) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "get",
        url: "/PickingPackingRequest/DeleteMasterByID",
        params: { id: id },
      }).then(function (result) {
        notify("success", "Success Messsage", result.data);
        $scope.GetAllData();
      });
    } else {
    }
  };

  $scope.DeleteByLineID = function (id) {
    $("#editmycontainer").on("click", ".btn-danger", function () {
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
      //$scope.EditDetailsByID();
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

  $scope.ViewData = function (ID) {
    $("#vSINO").text("");
    $("#vFileName").text("");
    toggleDownloadButton();
    $scope.ID = ID;

    $http({
      method: "GET",
      url: "/PickingPackingRequest/ViewByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      var PROCESSCODE = data[0].pickpacknumber;
      $http({
        method: "GET",
        url: "/SalesQuatationLanding/GetFileDetails",
        params: { prefix: PROCESSCODE },
      }).success(function (data) {});

      $scope.transportagencyname = data[0].transportagencyname || "";

      $scope.masterdata = data;
    });
    //$scope.LoadDocument(ID);
    $scope.ViewByDetailsData(ID);
    $scope.ViewLoadDocumentStatus(ID);
  };

  $scope.ViewByDetailsData = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PickingPackingRequest/ViewByDetailsID",
      params: { id: $scope.ID },
    }).success(function (data) {
      //console.log(data);
      $scope.listdetails = data;
    });
  };

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/PickingPackingRequest/GetDocStatus",
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

  function toDateInputFormat(dateString) {
    var date = new Date(dateString.replace(" ", "T"));
    if (!isNaN(date.getTime())) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } else {
      return "";
    }
  }

  $scope.updateRemainingQty = function (list) {
    if (list.quantity - list.packingreqquantity < 0) {
      alert("Accepted Quantity cannot be more than the Order Quantity");
    } else {
      list.remainingqty = list.quantity - list.packingreqquantity;
    }
  };

  $scope.SearchPI = function () {
    $("#txtPISC").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/PickingPackingRequest/GetPIInfo/",
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
        $.ajax({
          type: "GET",
          url: "/PackingRequest/ViewMasterOn",
          dataType: "json",
          data: { id: ui.item.id },
          success: function (result) {
            $("#txtPISCID").val(result[0].id);
            $("#txtPINumber").val(result[0].packreqnumber);
            //  $("#txtPISCID").val(result[0].packreqnumber);
            $("#txtPackingDate").val(result[0].packreqdate);

            //  $("#txtPINumber").val(result[0].packreqnumber);

            //   $("#txtMillDate").val(result[0].packreqdate);

            var packreqdate = toDateInputFormat(result[0].packreqdate);
            $("#txtMillDate").val(packreqdate);

            $("#txtInvoiceNumber").val(result[0].invoicenumber);

            //    $("#txtInvoiceDate").val(result[0].invoicedate);

            var invoicedate = toDateInputFormat(result[0].invoicedate);
            $("#txtInvoiceDate").val(invoicedate);

            $("#txtInvoiceTo").val(result[0].invoiceto);
            $("#txtShippedFrom").val(result[0].shippedfrom);
            $("#txtShippedTo").val(result[0].shippedto);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
        $("#txtPISC").val(ui.item.Name);

        $scope.GetCusData(ui.item.id);
        //$scope.GetSellerData(ui.item.id);
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
      url: "/PickingPackingRequest/GetPIDetailsByID",
    }).then(function (response) {
      $scope.edetailsbyid = response.data;
      //$scope.loading = false;
    });
  };

  $scope.Save = function () {
    if (confirm("Are You Sure? You Want to Save this Record.") == true) {
      var Details = [];

      if (1) {
        var master = {
          ID: $("#txtPISCID").val(),
          BUYERNAME: $("#txtBuyerName").val(),
          PHONE: $("#txtPhone").val(),
          EMAIL: $("#txtEmail").val(),
          ADDRESS: $("#txtAddress").val(),
          PACKINGEXPDATE: $("#txtPackingReqDate").val(),
          PACKINGDATE: $("#txtPickpackDate").val(),
          AGREEMENTNUMBER: $("#txtPINumber").val(),

          VEHICALNO: $("#txtVehicalNo").val(),
          DRIVERNAME: $("#txtDriverName").val(),
          DRIVERPHONE: $("#txtDriverPhone").val(),
          CUSTOMERDETAILS: $("#txtCustomerDetails").val(),
          GATENO: $("#txtGateNo").val(),
          GATEPERSON: $("#txtGatePerson").val(),
          TRANSPORTAGENCYID: $scope.transportagencyoptionid,
        };

        $("#emycontainer> tbody > tr").each(function (index, ele) {
          // console.log(index);
          if (
            parseFloat($("#tobeqty" + index).val()) >
            parseFloat($("#remainingqty" + index).val())
          ) {
            // isAllValid = false;
            // $("#tobeqty" + index).siblings('span.error').css('visibility', 'visible');
          } else {
            isAllValid = true;
            //    console.log("Fahim2");

            var details = {
              ITEMID: $("#itemcode" + index).val(),
              QUANTITY: $("#quantity" + index).val(),
              PACKINGREQQUANTITY: $("#packingreqquantity" + index).val(),
              COUNT: $("#count" + index).val(),
              GROSSMEASURE: $("#grossmeasure" + index).val(),
              TRUCKNO: $("#truckno" + index).val(),
              CONTAINERSIZE: $("#containername" + index).val(),
              CONTAINERNO: $("#containerno" + index).val(),
              REMARKS: $("#remarks" + index).val(),
              DESCRIPTIONS: $("#shortdescription" + index).val(),
            };

            if (details.ITEMID) {
              Details.push(details);
            }
          }
        });

        console.log(Details);

        if (isAllValid) {
          $.ajax({
            type: "POST",
            url: "/PickingPackingRequest/Save",
            dataType: "json",
            data: { pr: master, prd: Details },
            success: function (result) {
              let num = result.split(":")[1];
              let code = num.substring(3, 6);

              $http({
                method: "GET",
                url: "/PickingPackingRequest/ViewByMasterID",
                params: { id: code },
              }).success(function (data) {
                UploadFileUsingAPI(data[0].pickpacknumber);
              });

              //  UploadFileUsingAPI(result.split(':')[1]);
              //$scope.UploadFile(result);
              // alert(result)

              notify("success", "Success Messsage", result);
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

  $scope.Update = function () {
    if (confirm("Are You Sure? You Want to Update this Record.") != true) {
      return;
    }

    var master = {
      ID: $("#hpackinglineid").val(),
      VEHICALNO: $("#etxtVehicalNo").val(),
      DRIVERNAME: $("#etxtDriverName").val(),
      DRIVERPHONE: $("#etxtDriverPhone").val(),
      CUSTOMERDETAILS: $("#etxtCustomerDetails").val(),
      GATENO: $("#etxtGateNo").val(),
      GATEPERSON: $("#etxtGatePerson").val(),
      EXCHANGERATE: $("#etxtExchangeRate").val(),
      TERMSCONDITION: $("#etermscon").val(),
      DESCRIPTIONS: $("#edescription").val(),
      TRANSPORTAGENCYID: $scope.Etransportagencyoptionid || null,
    };

    // Collect every line row from the EDIT modal's table (#eemycontainer)
    // Uses the e-prefixed IDs that actually exist in the edit modal markup.
    var lineUpdates = [];
    $("#eemycontainer > tbody > tr").each(function (index) {
      var lineId = $("#eid" + index).val();
      if (!lineId) {
        return;
      }

      lineUpdates.push({
        ID: lineId,
        // UpdateDetailsByID maps this to @PACKINGREQQUANTITY in the SP,
        // which in turn writes to PICKINGPACKINGQUANTITY. Matches per-row button.
        //PACKINGQUANTITY: parseFloat($("#epackingreqquantity" + index).val()) || 0,
        PACKINGQUANTITY: parseFloat($("#eremainingqty" + index).val()) || 0,
        REMARKS: $("#eremarks" + index).val(),
        DESCRIPTIONS: $("#eshortdescription" + index).val(),
        GROSSMEASURE: $("#egrossmeasure" + index).val(),
        TRUCKNO: $("#etruckno" + index).val(),
        CONTAINERSIZE: $("#econtainersize" + index).val(),
        CONTAINERNO: $("#econtainerno" + index).val(),
      });
    });

    // Step 1: update the header (existing endpoint, existing SP spUpdatePickPackerByID)
    $.ajax({
      type: "POST",
      url: "/PickingPackingRequest/EditMasterWithId",
      dataType: "json",
      data: { pr: master, pd: [] }, // pd is ignored server-side; send empty array
      success: function (headerResult) {
        // Step 2: update every line sequentially via the existing per-row endpoint.
        // Sequential (not parallel) so any error stops the chain and the user sees
        // a clean message instead of a flood of toastr popups.
        var i = 0;
        function updateNextLine() {
          if (i >= lineUpdates.length) {
            // All lines done
            notify("success", "Success Message", headerResult);
            $scope.GetAllData();
            $scope.$apply(function () {
              $scope.Clear();
            });
            $("#savebutton").prop("disabled", true);
            return;
          }

          $.ajax({
            type: "POST",
            url: "/PickingPackingRequest/UpdateDetailsByID",
            dataType: "json",
            data: { prc: lineUpdates[i] },
            success: function () {
              i++;
              updateNextLine();
            },
            error: function (errormessage) {
              notify(
                "error",
                "Error Message",
                "Header saved, but line " +
                  (i + 1) +
                  " failed: " +
                  errormessage.responseText,
              );
            },
          });
        }

        updateNextLine();
      },
      error: function (errormessage) {
        notify("error", "Error Message", errormessage.responseText);
      },
    });
  };

  //$scope.Update = function () {
  //    if (confirm('Are You Sure? You Want to Update this Record.') == true) {
  //        var Details = [];

  //        var isAllValid = true;
  //        if ($("#etxtPackingReqDate").val() == "") {
  //           // isAllValid = false;
  //            $("#etxtPackingReqDate").siblings('span.error').css('visibility', 'visible');
  //        }
  //        else {
  //            $("#etxtPackingReqDate").siblings('span.error').css('visibility', 'hidden');
  //        }

  //        if (isAllValid) {
  //            var master = {
  //                ID: $("#hpackinglineid").val(),
  //                VEHICALNO: $("#etxtVehicalNo").val(),
  //                DRIVERNAME: $("#etxtDriverName").val(),
  //                DRIVERPHONE: $("#etxtDriverPhone").val(),
  //                CUSTOMERDETAILS: $("#etxtCustomerDetails").val(),
  //                GATENO: $("#etxtGateNo").val(),
  //                GATEPERSON: $("#etxtGatePerson").val(),
  //                TERMSCONDITION: $("#etermscon").val(),
  //                DESCRIPTIONS: $("#edescription").val()
  //            }

  //            $("#eemycontainer> tbody > tr").each(function (index, ele) {
  //                // console.log(index);
  //                if (parseFloat($("#tobeqty" + index).val()) > parseFloat($("#remainingqty" + index).val())) {
  //                    // isAllValid = false;
  //                    // $("#tobeqty" + index).siblings('span.error').css('visibility', 'visible');
  //                } else {
  //                    isAllValid = true;

  //                    var details = {
  //                        ID: $("#eid" + index).val(),
  //                        ITEMID: $("#itemcode" + index).val(),
  //                        QUANTITY: $("#quantity" + index).val(),
  //                        PACKINGREQQUANTITY: $("#packingreqquantity" + index).val(),
  //                        GROSSMEASURE: $("#grossmeasure" + index).val(),
  //                        TRUCKNO: $("#truckno" + index).val(),
  //                        CONTAINERSIZE: $("#containername" + index).val(),
  //                        CONTAINERNO: $("#containerno" + index).val(),
  //                        REMARKS: $("#remarks" + index).val(),
  //                        DESCRIPTIONS: $("#shortdescription" + index).val()
  //                    };

  //                    if (details.ITEMID) {
  //                        Details.push(details);
  //                    }
  //                }
  //            });

  //            console.log(Details);

  //            $.ajax({
  //                type: 'POST',
  //                url: '/PickingPackingRequest/EditMasterWithId',
  //                dataType: "json",
  //                data: { 'pr': master, 'pd': Details },
  //                success: function (result) {

  //                    notify("success", "Success Messsage", result);

  //                    $http({
  //                        method: "GET",
  //                        url: '/PickingPackingRequest/ViewByMasterID',
  //                        params: { id: master.ID }
  //                    }).success(function (data) {
  //                   //     EditFileUsingAPI(data[0].pickpacknumber);
  //                    });

  //                    $scope.GetAllData();
  //                    $scope.Clear();
  //                    $("#savebutton").prop('disabled', true);
  //                },
  //                error: function (errormessage) {
  //                    notify('error', 'Error Message', errormessage.responseText);
  //                }
  //            });
  //        }
  //    }
  //    else {

  //    }
  //}

  $scope.Clear = function () {
    $(".error").css("visibility", "hidden");
    $("#etermscon").val("");
    $("#edescription").val("");
    $scope.edetailsbyid = null;
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

    $("#txtMillDate").val("");
    $("#txtInvoiceNumber").val("");
    $("#txtInvoiceDate").val("");
    $("#txtInvoiceTo").val("");
    $("#txtShippedFrom").val("");
    $("#txtShippedTo").val("");
    $("#txtVehicalNo").val("");
    $("#txtDriverName").val("");
    $("#txtDriverPhone").val("");
    $("#txtCustomerDetails").val("");
    $("#txtGateNo").val("");
    $("#txtGatePerson").val("");
  };

  //$scope.Update = function () {
  //    alert($("#hpackinglineid").val());

  //    var Details = [];

  //    var isAllValid = true;
  //    if ($("#etxtPackingReqDate").val() == "") {
  //        isAllValid = false;
  //        $("#etxtPackingReqDate").siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#etxtPackingReqDate").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#etxtShipmentPeriod").val() == "") {
  //        isAllValid = false;
  //        $("#etxtShipmentPeriod").siblings('span.error').css('visibility', 'visible');

  //    }
  //    else {
  //        $("#etxtShipmentPeriod").siblings('span.error').css('visibility', 'hidden');
  //    }

  //    //if ($("#emycontainer tbody tr").length == 0) {
  //    //    notify('warning', 'Warning Message', 'At least 1 item required.');
  //    //    isAllValid = false;
  //    //}

  //    if (isAllValid) {
  //        var master = {
  //            ID: $("#hpackinglineid").val(),
  //            PACKREQDATE: $("#etxtPackingReqDate").val(),
  //            SHIPMENTPERIOD: $("#etxtShipmentPeriod").val(),
  //            TERMSCONDITION: $("#etermscon").val(),
  //            DESCRIPTIONS: $("#edescription").val()
  //        }

  //        $.ajax({
  //            type: 'POST',
  //            url: '/PackingRequest/UpdateMaster',
  //            dataType: "json",
  //            data: { 'pr': master },
  //            success: function (result) {

  //                //$scope.UploadFile(result);
  //                notify("success", "Success Messsage", result);
  //                $scope.GetAllData();
  //                //$scope.Clear();
  //            },
  //            error: function (errormessage) {
  //                notify('error', 'Error Message', errormessage.responseText);
  //            }
  //        });
  //    }

  //}

  $scope.GetCusData = function (id) {
    $.ajax({
      url: "/PickingPackingRequest/GetCusInfo",
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
        //$("#etxtTIN").val(data[0].tin);
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

  //$scope.EditbyMasterID = function (id, cusid) {

  //    $("#hpackinglineid").val(id);
  //    $.ajax({
  //        url: "/PickingPackingRequest/EditMasterByID",
  //        type: "Get",
  //        dataType: "json",
  //        data: { 'id': id },
  //        success: function (data) {
  //            $scope.EditGetCusData(cusid);
  //            $("#etxtPISC").val(data[0].piscnumber);
  //            $("#etxtPINumber").val(data[0].packreqnumber);
  //            $("#etxtMillDate").val(data[0].packreqdate);
  //            $("#etxtInvoiceNumber").val(data[0].invoiceno);
  //            $("#etxtInvoiceDate").val(data[0].invoicedate);
  //            $("#etxtInvoiceTo").val(data[0].invoiceto);
  //            $("#etxtShippedFrom").val(data[0].shippedfrom);
  //            $("#etxtShippedTo").val(data[0].shippedto);

  //            $("#etxtVehicalNo").val(data[0].vehicalno);
  //            $("#etxtDriverName").val(data[0].drivername);
  //            $("#etxtDriverPhone").val(data[0].driverphone);
  //            $("#etxtCustomerDetails").val(data[0].customerdetails);
  //            $("#etxtGateNo").val(data[0].gateno);
  //            $("#etxtGatePerson").val(data[0].gateperson);
  //            $("#etxtExchangeRate").val(data[0].exchangerate);
  //            $scope.$apply(function () {
  //                $scope.Etransportagencyoptionid =
  //                    (!data[0].transportagencyid || data[0].transportagencyid === 0)
  //                        ? ''
  //                        : String(data[0].transportagencyid);
  //            });

  //            $scope.EditDetailsByID(id);
  //        }
  //    });
  //};

  $scope.EditbyMasterID = function (id, cusid) {
    $("#hpackinglineid").val(id);

    // Reset before loading so stale values from a previous record never show
    $("#etermscon").val("");
    $("#edescription").val("");

    $.ajax({
      url: "/PickingPackingRequest/EditMasterByID",
      type: "Get",
      dataType: "json",
      data: { id: id },
      success: function (data) {
        if (!data || !data.length) {
          return;
        }
        var m = data[0];

        $scope.EditGetCusData(cusid);
        $("#etxtPISC").val(m.piscnumber);
        $("#etxtPINumber").val(m.packreqnumber);
        $("#etxtMillDate").val(m.packreqdate);
        $("#etxtInvoiceNumber").val(m.invoiceno);
        $("#etxtInvoiceDate").val(m.invoicedate);
        $("#etxtInvoiceTo").val(m.invoiceto);
        $("#etxtShippedFrom").val(m.shippedfrom);
        $("#etxtShippedTo").val(m.shippedto);

        $("#etxtVehicalNo").val(m.vehicalno);
        $("#etxtDriverName").val(m.drivername);
        $("#etxtDriverPhone").val(m.driverphone);
        $("#etxtCustomerDetails").val(m.customerdetails);
        $("#etxtGateNo").val(m.gateno);
        $("#etxtGatePerson").val(m.gateperson);
        $("#etxtExchangeRate").val(m.exchangerate);

        $("#etermscon").val(m.termscondition || ""); // added
        $("#edescription").val(m.descriptions || ""); // added

        $scope.$apply(function () {
          $scope.Etransportagencyoptionid =
            !m.transportagencyid || m.transportagencyid === 0
              ? ""
              : String(m.transportagencyid);
        });

        $scope.EditDetailsByID(id);
      },
    });
  };

  $scope.EditDetailsByID = function (id) {
    $http({
      method: "get",
      params: { id: id },
      url: "/PickingPackingRequest/EditByDetailsID",
    }).then(function (response) {
      $scope.edetailsbyid = response.data;
    });
  };

  $scope.UpdateByLineID = function (i, id) {
    var isAllValid = true;

    if (
      parseFloat($("#etobeqty" + i).val()) >
      parseFloat($("#eremainingqty" + i).val())
    ) {
      isAllValid = false;
      $("#etobeqty" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#etobeqty" + i)
        .siblings("span.error")
        .css("visibility", "hidden");
      isAllValid = true;
    }

    if (isAllValid) {
      var details = {
        ID: id,
        PACKINGQUANTITY: parseFloat($("#eremainingqty" + i).val()),
        REMARKS: $("#eremarks" + i).val(),
        DESCRIPTIONS: $("#eshortdescription" + i).val(),

        GROSSMEASURE: $("#egrossmeasure" + i).val(),
        TRUCKNO: $("#etruckno" + i).val(),
        CONTAINERSIZE: $("#econtainersize" + i).val(),
        CONTAINERNO: $("#econtainerno" + i).val(),
      };

      $.ajax({
        type: "POST",
        url: "/PickingPackingRequest/UpdateDetailsByID",
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

  $scope.TrucChallan = function (id) {
    var rooturl = "";
    var folder = "/EXPORT/DeliveryChallan/DeliveryChallan";

    var url =
      rooturl +
      folder +
      "&HEADERID=" +
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

  $scope.DelChallan = function (id) {
    var rooturl = "";

    var folder = "/Export/JUTE/Short_Packing_List";

    var url =
      rooturl +
      folder +
      "&HEADERID=" +
      id +
      "&rs:Embed=true&rc:LinkTarget=_self";
    // var url = rooturl + folder + "&rs:Embed=true";

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
  $scope.Report = function (id) {
    //alert(id);

    var rooturl = "";

    var folder = "/EXPORT/Common/PickingPacking";

    var url =
      rooturl + folder + "&ppnum=" + id + "&rs:Embed=true&rc:LinkTarget=_self";
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
});
