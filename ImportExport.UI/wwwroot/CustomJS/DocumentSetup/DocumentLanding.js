/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  //$scope.loading = true;

  $scope.List = function () {
    $scope.ID = $("#rootdoclistid").val();
    $http({
      method: "get",
      url: "/DocumentLanding/GetData",
      params: { id: $scope.ID },
    }).then(function (response) {
      $scope.list = response.data;
      //$scope.loading = false;
    });
  };

  $scope.GetUnit = function () {
    $http({
      method: "GET",
      url: "/LC/GetUnit",
    }).success(function (result) {
      $scope.unitlist = result;
    });
  };

  $scope.GetRootDocumentList = function () {
    $http({
      method: "get",
      url: "/Common/GetRootDocumentList",
    }).then(function (response) {
      $scope.rootdoclist = response.data;
    });
  };

  //$scope.LoadDocByPickPackNumber = function () {

  //    if ($("#txtPickPackID").val() == 0) {
  //        isAllValid = false;
  //        $("#popuprootdoclistid").val("");
  //        $("#txtPickPackID").siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#txtPickPackID").siblings('span.error').css('visibility', 'hidden');

  //        $.ajax({
  //            url: "/DocumentLanding/GetDoclistData",
  //            type: 'GET',
  //            data: { id: $("#popuprootdoclistid").val(), pickpackid: $("#txtPickPackID").val() },
  //            success: function (result) {
  //                console.log(result);
  //                var html = "";
  //                var slno = 1;

  //                for (var i = 0; i < result.length; i++) {

  //                    //console.log(result[i].rootdoccode);
  //                    if (result[i].type == "A") {
  //                        html = html + "<div style='height:200px;border: none;float:left;width:150px;background-color:#46a8c7;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><h6>Auto</h6><h6>" + result[i].childdocname + "</h6><button class='btn btn-primary' onclick='ShowPopUp(\"" + result[i].id + "\")'>Print</button></div>"
  //                    }
  //                    else {
  //                        if (result[i].docstatus=='Y')
  //                        //html = html + "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input class='custom-file-input' type='file' id='fileInput" + result[i].id + "' multiple><h6>Manual</h6><h6>" + result[i].childdocname + "</h6><h6>" + result[i].mandatorylabel + "</h6> <button class='btn btn-primary' onclick='UploadFileDocumentBrowseUsingAPI(" + $scope.pickpack + ")'>Upload</button></div>"
  //                            html = html + "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input style='visibility:hidden'  class='custom-file-input' type='file' id='fileInput" + result[i].id + "' multiple><h6>Manual</h6><h6>Completed</h6><h6>" + result[i].childdocname + "</h6><h6>" + result[i].mandatorylabel + "</h6> <button class='btn btn-primary' style='visibility:hidden' onclick='UploadFileDocumentBrowseUsingAPI(\"" + result[i].childdocname + "\",\"" + result[i].rootdoccode + "\",\"" + result[i].docheader + "\",\"" + result[i].id + "\")'>Upload</button></div>"
  //                        else
  //                            html = html + "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input class='custom-file-input' type='file' id='fileInput" + result[i].id + "' multiple><h6>Manual</h6><h6>Pending</h6><h6>" + result[i].childdocname + "</h6><h6>" + result[i].mandatorylabel + "</h6> <button class='btn btn-primary' onclick='UploadFileDocumentBrowseUsingAPI(\"" + result[i].childdocname + "\",\"" + result[i].rootdoccode + "\",\"" + result[i].docheader + "\",\"" + result[i].id + "\")'>Upload</button></div>"
  //                    }
  //                }

  //                $("#sortable-left").html('');
  //                $("#sortable-left").append(html);
  //            }
  //        });
  //    }
  //};
  $scope.LoadDocByPickPackNumber = function () {
    if ($("#txtPickPackID").val() == 0) {
      isAllValid = false;
      $("#popuprootdoclistid").val("");
      $("#txtPickPackID").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtPickPackID").siblings("span.error").css("visibility", "hidden");

      $.ajax({
        url: "/DocumentLanding/GetDoclistData",
        type: "GET",
        data: {
          id: $("#popuprootdoclistid").val(),
          pickpackid: $("#txtPickPackID").val(),
        },
        success: function (result) {
          console.log(result);
          var html = "";
          var slno = 1;

          for (var i = 0; i < result.length; i++) {
            //console.log(result[i].rootdoccode);
            if (result[i].type == "A") {
              /* html = html + "<div style='height:200px;border: none;float:left;width:150px;background-color:#46a8c7;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><h6>Auto</h6><h6>" + result[i].childdocname + "</h6><button class='btn btn-primary' onclick='ShowPopUp( 1 )'>Print</button></div>"*/
              html =
                html +
                "<div style='height:200px;border: none;float:left;width:150px;background-color:#46a8c7;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><h6>Auto</h6><h6>" +
                result[i].childdocname +
                "</h6><button class='btn btn-primary' onclick='ShowPopUp( \"" +
                result[i].id +
                '","' +
                result[i].rooturl +
                '","' +
                result[i].endurl +
                "\")'>Print</button></div>";
            } else {
              if (result[i].docstatus == "Y")
                //html = html + "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input class='custom-file-input' type='file' id='fileInput" + result[i].id + "' multiple><h6>Manual</h6><h6>" + result[i].childdocname + "</h6><h6>" + result[i].mandatorylabel + "</h6> <button class='btn btn-primary' onclick='UploadFileDocumentBrowseUsingAPI(" + $scope.pickpack + ")'>Upload</button></div>"

                html =
                  html +
                  "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input style='visibility:hidden'  class='custom-file-input' type='file' id='fileInput" +
                  result[i].id +
                  "' multiple><h6>Manual</h6><h6>Completed</h6><h6>" +
                  result[i].childdocname +
                  "</h6><h6>" +
                  result[i].mandatorylabel +
                  "</h6> <button class='btn btn-primary btn-sm insert'  onclick='GetUploadFileUsingAPI(\"" +
                  result[i].rootdoccode +
                  '","' +
                  result[i].id +
                  "\")'>Download</button></div>";
              else {
                html =
                  html +
                  "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input class='custom-file-input' type='file' id='fileInput" +
                  result[i].id +
                  "' multiple><h6>Manual</h6><h6>Pending</h6><h6>" +
                  result[i].childdocname +
                  "</h6><h6>" +
                  result[i].mandatorylabel +
                  "</h6> <button class='btn btn-primary' onclick='UploadFileDocumentBrowseUsingAPI(\"" +
                  result[i].childdocname +
                  '","' +
                  result[i].rootdoccode +
                  '","' +
                  result[i].docheader +
                  '","' +
                  result[i].id +
                  "\")'>Upload</button></div>";
              }
            }
          }

          //     GetUploadFileUsingAPI(PROCESSCODE, );

          $("#sortable-left").html("");
          $("#sortable-left").append(html);
        },
      });
    }
  };

  $scope.Save = function () {
    var isAllValid = true;

    if ($("#popuprootdoclistid").val() == "") {
      isAllValid = false;
      $("#popuprootdoclistid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#popuprootdoclistid")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    if ($("#txtPickPackID").val() == 0) {
      isAllValid = false;
      $("#txtPickPackID").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtPickPackID").siblings("span.error").css("visibility", "hidden");
    }

    if (isAllValid) {
      var master = {
        ID: 0,
        PICKINGPACKINGHEADERID: $("#txtPickPackID").val(),
        DOCUMENTSETUPHEADERID: $("#popuprootdoclistid").val(),
        DOCDATE: "",
        CUSTOMERID: 0,
        TERMSCONDITION: $("#termscon").val(),
        DESCRIPTIONS: $("#description").val(),
        UNITID: 0,
        DOCUMENTCREATEDBY: "",
      };

      $.ajax({
        type: "POST",
        url: "/DocumentLanding/Save",
        dataType: "json",
        data: { master: master },
        success: function (result) {
          notify("success", "Success Messsage", result);
          $scope.List();
          $scope.Clear();
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

  $scope.Clear = function () {
    $("#termscon").val("");
    $("#description").val("");
    $("#popuprootdoclistid").val();
    $("#txtPickPackID").val(0);
    $("#txtPickPack").val("");
  };

  $scope.DeleteMaster = function (id, pickingpackingid) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/DocumentLanding/DeleteMasterByID",
        params: {
          id: id,
          pickpackid: pickingpackingid,
          rootdoclistid: $("#rootdoclistid").val(),
        },
      }).then(function (response) {
        console.log(response);
        $scope.List();
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.SearchPickPack = function () {
    $("#txtPickPack").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetPickPackNumber/",
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
        $("#txtPickPack").val(ui.item.Name);
        $("#txtPickPackID").val(ui.item.id);
        return false;
      },
      minlength: 2,
    });
  };

  $scope.Update = function () {
    var isAllValid = true;

    if ($("#epopuprootdoclistid").val() == "") {
      isAllValid = false;
      $("#epopuprootdoclistid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#epopuprootdoclistid")
        .siblings("span.error")
        .css("visibility", "hidden");
    }

    //if ($("#etxtPickPackID").val() == "") {
    //    isAllValid = false;
    //    $("#etxtPickPackID").siblings('span.error').css('visibility', 'visible');
    //}
    //else {
    //    $("#etxtPickPackID").siblings('span.error').css('visibility', 'hidden');
    //}

    if (isAllValid) {
      var master = {
        ID: $("#eid").val(),
        PICKINGPACKINGHEADERID: $("#etxtPickPackID").val(),
        DOCUMENTSETUPHEADERID: $("#epopuprootdoclistid").val(),
        DOCDATE: "",
        CUSTOMERID: 0,
        TERMSCONDITION: $("#etermscon").val(),
        DESCRIPTIONS: $("#edescription").val(),
        UNITID: 0,
        DOCUMENTCREATEDBY: "",
      };

      $.ajax({
        type: "POST",
        url: "/DocumentLanding/Update",
        dataType: "json",
        data: { master: master },
        success: function (result) {
          notify("success", "Success Messsage", result);
          $scope.List();
          $scope.Clear();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.EditbyMasterID = function (ID, pickpackheaderid) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/DocumentLanding/EditByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $("#eid").val(data[0].id);
      $("#epopuprootdoclistid").val(data[0].docsetupheaderid);
      $("#etxtPickPack").val(data[0].pickpacknumber);
      $("#etxtPickPackID").val(data[0].pickingpackingheaderid);
      $("#etermscon").val(data[0].termscondition);
      $("#edescription").val(data[0].descriptions);
    });

    $scope.EditbyDetailsID(ID, pickpackheaderid);
  };

  $scope.EditbyDetailsID = function (ID, pickpackheaderid) {
    $.ajax({
      url: "/DocumentLanding/EditbyDetailsID",
      type: "GET",
      data: { id: ID, pickpackid: pickpackheaderid },
      success: function (result) {
        console.log(result);
        var html = "";
        var slno = 1;

        for (var i = 0; i < result.length; i++) {
          if (result[i].type == "A") {
            html =
              html +
              "<div style='height:200px;border: none;float:left;width:150px;background-color:#46a8c7;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><h6>Auto</h6><h6>" +
              result[i].childdocname +
              "</h6></div>";
          } else {
            if (result[i].docstatus == "Y")
              html =
                html +
                "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input class='custom-file-input' type='file' id='fileInput" +
                result[i].id +
                "' multiple><h6>Manual</h6><h6>Pending</h6><h6>" +
                result[i].childdocname +
                "</h6><h6>" +
                result[i].mandatorylabel +
                "</h6> <button class='btn btn-primary' onclick='UploadFileDocumentBrowseUsingAPI(\"" +
                result[i].childdocname +
                '","' +
                result[i].rootdoccode +
                '","' +
                result[i].docheader +
                '","' +
                result[i].id +
                "\")'>Upload</button></div>";
            //html = html + "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input class='custom-file-input' type='file' id='fileInput" + result[i].id + "' multiple><h6>Manual</h6><h6>" + result[i].childdocname + "</h6><h6>" + result[i].mandatorylabel + "</h6> <button class='btn btn-primary' onclick='UploadFileDocumentBrowseUsingAPI(" + $scope.pickpack + ")'>Upload</button></div>"
            else
              html =
                html +
                "<div style='height:200px;width:150px;background-color:#ed5555;border: none;float:left;margin:10px;text-align:center;padding:8px;font-family:calibri;list-style-type:none;'><input style='visibility:hidden'  class='custom-file-input' type='file' id='fileInput" +
                result[i].id +
                "' multiple><h6>Manual</h6><h6>Completed</h6><h6>" +
                result[i].childdocname +
                "</h6><h6>" +
                result[i].mandatorylabel +
                "</h6> <button class='btn btn-primary' style='visibility:hidden' onclick='UploadFileDocumentBrowseUsingAPI(\"" +
                result[i].childdocname +
                '","' +
                result[i].rootdoccode +
                '","' +
                result[i].docheader +
                '","' +
                result[i].id +
                "\")'>Upload</button></div>";
          }
        }

        $("#esortable-left").html("");
        $("#esortable-left").append(html);
      },
    });
  };

  $scope.ViewByMasterID = function (
    ID,
    pickpacknumber,
    DOCNUMBER,
    pickingpackingheaderid,
  ) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/DocumentLanding/EditByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      console.log(data);
      $scope.masterdata = data;
    });
    //$scope.ViewbyDetailsID(ID, DOCNUMBER, pickpacknumber);
    //$scope.ViewbyDetailsID(ID);
    $scope.ViewLoadDocumentStatus(ID);
    ViewImageFromAPIForDocument(
      ID,
      DOCNUMBER,
      pickpacknumber,
      pickingpackingheaderid,
      "L",
    );
  };

  $scope.ViewbyDetailsID = function (ID, DOCNUMBER, pickpacknumber) {
    $.ajax({
      url: "/DocumentLanding/EditbyDetailsID",
      type: "GET",
      data: { id: ID },
      success: function (result) {
        //console.log(result);
        $scope.detailsdata = result;
      },
    });
  };

  $scope.ViewLoadDocumentStatus = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/DocumentLanding/GetDocStatus",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.docstatusview = result;
    });
  };
});
