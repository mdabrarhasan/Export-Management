function isNumber(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}

function ViewImageFromAPI(PROCESSCODE) {
  //UUU
  //alert(PROCESSCODE);
  $("#tblData").empty();
  let ALPHA = PROCESSCODE.match(/^[^-]+/)[0];
  userFolder = ALPHA + "/" + PROCESSCODE.toUpperCase();

  $.ajax({
    type: "GET",
    url: "/Common/GetAccInfo",
    dataType: "json",
    success: function (data) {
      var requestData = {
        userid: data.result[0].userid,
        password: data.result[0].password,
        devicedetails: data.result[0].devicedetails,
        channel: data.result[0].channel,
      };

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: data.loginUrl,
        data: JSON.stringify(requestData),
        dataType: "json",
        success: function (response) {
          const authorizationToken = "Bearer " + response.token;

          var apiUrl =
            data.downloadMultiple +
            "?userid=" +
            data.result[0].userid +
            "&password=" +
            data.result[0].password +
            "&userFolder=" +
            userFolder;

          console.log("Download apiUrl:", apiUrl);
          console.log("VIEW userFolder:", userFolder);
          console.log("VIEW PROCESSCODE:", PROCESSCODE);
          $.ajax({
            url: apiUrl,
            type: "GET",
            headers: {
              Authorization: authorizationToken,
              "Content-Type": "application/json",
            },
            contentType: false,
            processData: false,
            success: function (result) {
              $.ajax({
                url: "/Common/GetActiveFiles",
                type: "POST",
                data: { processCode: PROCESSCODE },
                success: function (activeFiles) {
                  console.log("Active Files:", activeFiles);

                  var activeSet = {};

                  for (var i = 0; i < activeFiles.length; i++) {
                    activeSet[activeFiles[i].toLowerCase()] = true;
                  }

                  var html = "";
                  var slno = 1;

                  for (var i = 0; i < result.base64FileResponse.length; i++) {
                    var file = result.base64FileResponse[i];
                    var fname = file.fileName.trim();

                    if (!activeSet[fname.toLowerCase()]) {
                      continue;
                    }

                    var extension = fname.split(".").pop();

                    html += "<tr>";
                    html += "<td>" + slno++ + "</td>";
                    // html += '<td>' + fname + '</td>';
                    html +=
                      '<td title="' +
                      fname +
                      '" style="max-width:300px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' +
                      fname +
                      "</td>";

                    html += "<td style='white-space:nowrap;'>";
                    html +=
                      "<button type='button' class='btn btn-primary btn-sm insert me-2' onclick='Download(\"" +
                      fname +
                      '","' +
                      file.base64Content +
                      '","' +
                      extension +
                      "\")'><span class='fas fa-arrow-circle-down'></span> Download</button>";
                    html +=
                      "<button type='button' class='btn btn-danger btn-sm' onclick='DeleteFileFromDB(\"" +
                      PROCESSCODE +
                      '","' +
                      fname +
                      "\")'><span class='fas fa-trash'></span> Delete</button>";
                    html += "</td>";
                    html += "</tr>";
                  }

                  if (html === "") {
                    html =
                      "<tr><td colspan='3' class='text-center'>No Active Files</td></tr>";
                  }

                  $("#tblData").empty().append(html);

                  /*
                                    var html = "";

                                    var extension = "";
                                    var slno = 1;

                                    for (var i = 0; i < result.base64FileResponse.length; i++) {
                                        extension = result.base64FileResponse[i].fileName.split('.').pop();

                                        var slno = i + 1;

                                        html += '<tr>';
                                        html += '<td>' + parseInt(slno) + '</td>';
                                        html += '<td>' + result.base64FileResponse[i].fileName + '</td>';
                                        //html += "<td><a  href='data:'" + extension + "';base64," + result.base64FileResponse[i].base64Content + "' download> Download</a></td>";
                                        html += "<td><button type='button' class='btn btn-primary btn-sm insert' onclick='Download(\"" + result.base64FileResponse[i].fileName + "\",\"" + result.base64FileResponse[i].base64Content + "\",\"" + extension + "\")'><span class='fas fa-arrow-circle-down'></span> Download</button></td>";
                                        //html += '<td><button type="button" class="btn btn-primary btn-sm insert" onclick="Download()"><span class="fas fa-arrow-circle-down"></span> Download</button></td>';
                                        html += '</tr>';
                                    }
                                    $("#tblData").empty().append(html);
                                    */
                },
              });
            },
          });
        },
      });
    },
  });
}

function DeleteFileFromDB(PROCESSCODE, fileName) {
  if (!confirm("Are you sure you want to delete this file?")) {
    return;
  }

  $.ajax({
    url: "/Common/DeleteFileFromDB",
    type: "POST",
    data: {
      processCode: PROCESSCODE,
      fileName: fileName,
    },
    success: function (result) {
      console.log("Delete result:", result);
      ViewImageFromAPI(PROCESSCODE);
    },
    error: function (xhr) {
      console.log("Delete failed:", xhr.responseText);
    },
  });
}

function Download(name, file, extension) {
  if (extension == "txt") {
    extension = "plain/text";
  } else if (extension == "png") {
    extension = "data:application/octet-stream";
  } else if (extension == "jpg") {
    extension = "data:application/octet-stream;";
  } else if (extension == "jpeg") {
    extension = "data:application/octet-stream;";
  } else if (extension == "pdf") {
    extension = "application/pdf";
  } else if (extension == "xlsx") {
    extension =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }

  var link = document.createElement("a");
  document.body.appendChild(link);
  link.setAttribute("type", "hidden");
  link.href = "data:'" + extension + "';base64," + file;
  link.download = name;
  link.click();
  document.body.removeChild(link);
}

function toggleDownloadButton() {
  var slNo = $("#vSINO").text().trim();
  if (slNo != "") {
    $("#downloadButton").show();
  } else {
    $("#downloadButton").hide();
  }
}

function GetUploadFileUsingAPI(PROCESSCODE, fileType) {
  let NUMBER = PROCESSCODE.match(/[^-]+$/)[0];
  let ALPHA = PROCESSCODE.match(/^[^-]+/)[0];
  let concat = "/";
  //   userFolder = ALPHA.trim() + concat.trim() + PROCESSCODE.trim().toUpperCase();

  //  let concat = "/";

  //   var firstThreeNumbers = string(PROCESSCODE.Where(char.IsDigit).Take(3).ToArray());

  if (PROCESSCODE[0] == "P" && PROCESSCODE[1] == "R") {
    let concat = "/";
    //  userFolder = PROCESSCODE.trim().toUpperCase() + fileType.trim() + concat.trim()
    //  userFolder = PROCESSCODE;

    //  userFolder = ROOTDOCCODE + concat.trim() + DOCLINE;

    userFolder = PROCESSCODE + concat.trim() + fileType;
  } else {
    userFolder =
      ALPHA.trim() + concat.trim() + PROCESSCODE.trim().toUpperCase();
  }

  console.log("GetUploadFileUsingAPI & imidiate");
  console.log("Number & Alpha");
  console.log(NUMBER);
  console.log(ALPHA);
  console.log(userFolder);

  $.ajax({
    type: "GET",
    url: "/Common/GetAccInfo",
    dataType: "json",
    success: function (data) {
      var requestData = {
        userid: data.result[0].userid,
        password: data.result[0].password,
        devicedetails: data.result[0].devicedetails,
        channel: data.result[0].channel,
      };

      console.log("GetUploadFileUsingAPI");
      console.log(data);

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: data.loginUrl,
        data: JSON.stringify(requestData),
        dataType: "json",
        success: function (response) {
          console.log("GetUploadFileUsingAPI");
          console.log(response);

          const authorizationToken = "Bearer " + response.token;
          var apiUrl =
            data.downloadMultiple +
            "?userid=" +
            data.result[0].userid +
            "&password=" +
            data.result[0].password +
            "&userFolder=" +
            userFolder.trim();

          $.ajax({
            url: "/SalesQuatationLanding/GetFileDetails",
            type: "GET",

            data: { prefix: PROCESSCODE },
            success: function (conresult) {
              $.ajax({
                url: apiUrl,
                type: "GET",
                headers: {
                  Authorization: authorizationToken,
                },
                data: "",
                contentType: "application/json",
                processData: false,
                success: function (response) {
                  console.log("Full API Response: ", response);
                  if (
                    response.status &&
                    response.base64FileResponse &&
                    response.base64FileResponse.length > 0
                  ) {
                    if (PROCESSCODE[0] == "P" && PROCESSCODE[1] == "R") {
                      console.log("ok Biax");
                      console.log(conresult);

                      var fileNameWanted;

                      let item = response.base64FileResponse.length - 1;
                      let fileContent =
                        response.base64FileResponse[item].base64Content;
                      let fileName = response.base64FileResponse[item].fileName;

                      for (
                        var i = 0;
                        i < response.base64FileResponse.length;
                        i++
                      ) {
                        console.log(fileNameWanted);
                        if (
                          response.base64FileResponse[i].fileName === fileName
                        ) {
                          fileContent =
                            response.base64FileResponse[i].base64Content;
                          console.log("found");
                          break;
                        }
                      }

                      console.log("Filename i want The most");
                      console.log(fileContent);
                      console.log(fileName);

                      const byteCharacters = atob(fileContent);
                      const byteNumbers = new Array(byteCharacters.length);
                      for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                      }
                      const byteArray = new Uint8Array(byteNumbers);
                      const blob = new Blob([byteArray], { type: "text/xml" });

                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(blob);
                      link.download = fileName;
                      link.style.display = "none";

                      document.body.appendChild(link);
                      link.click();

                      document.body.removeChild(link);
                      URL.revokeObjectURL(link.href);

                      return;
                    }

                    var fileNameWanted;

                    let item = response.base64FileResponse.length - 1;
                    let fileContent =
                      response.base64FileResponse[item].base64Content;
                    let fileName = conresult[0].filename;

                    for (
                      var i = 0;
                      i < response.base64FileResponse.length;
                      i++
                    ) {
                      console.log(fileNameWanted);
                      if (
                        response.base64FileResponse[i].fileName === fileName
                      ) {
                        fileContent =
                          response.base64FileResponse[i].base64Content;
                        console.log("found");
                        break;
                      }
                    }

                    console.log("Filename i want The most");
                    console.log(fileContent);
                    console.log(fileName);

                    //let item = response.base64FileResponse.length - 1;
                    //const fileContent = response.base64FileResponse[item].base64Content;
                    //const fileName = response.base64FileResponse[item].fileName;

                    console.log("Extracted File Content: ", fileContent);
                    console.log("Extracted File Name: ", fileName);

                    if (fileContent && fileName) {
                      let downloadButton =
                        document.getElementById("downloadButton");
                      if (!downloadButton) {
                        downloadButton = document.createElement("button");
                        downloadButton.id = "downloadButton";
                        downloadButton.textContent = "Download XML File";
                        downloadButton.style.display = "block";
                        document.body.appendChild(downloadButton);
                      }

                      console.log(fileType);
                      var slno = "1";
                      $("#vSINO").text(slno);
                      $("#vFileName").text(fileName);
                      toggleDownloadButton();

                      downloadButton.addEventListener("click", function () {
                        const byteCharacters = atob(fileContent);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                          byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], {
                          type: "text/xml",
                        });

                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = fileName;
                        link.style.display = "none";

                        document.body.appendChild(link);
                        link.click();

                        document.body.removeChild(link);
                        URL.revokeObjectURL(link.href);
                      });
                    } else {
                      console.error(
                        "Error: File content or filename is missing in the response.",
                      );
                    }
                  } else {
                    console.error(
                      "Error: ",
                      response.message ||
                        "Unexpected error while processing the file.",
                    );
                  }
                },
              });
            },
          });
        },
      });
    },
  });
}

/*
function EditFileUsingAPI(PROCESSCODE) {

    console.log("Inside there ");
    console.log(PROCESSCODE);

    //let NUMBER = PROCESSCODE.match(/\d+/g);
    let NUMBER = PROCESSCODE.match(/[^-]+$/)[0];

    let ALPHA = PROCESSCODE.match(/^[^-]+/)[0];


    //alert(NUMBER)
    //alert(ALPHA)

    let concat = "/";
    userFolder = ALPHA.trim() + concat.trim() + PROCESSCODE.trim().toUpperCase();


    $.ajax({
        type: 'GET',
        url: '/Common/GetAccInfo',
        dataType: "json",
        success: function (data) {

            var requestData = {
                userid: data.result[0].userid,
                password: data.result[0].password,
                devicedetails: data.result[0].devicedetails,
                channel: data.result[0].channel
            };


            // alert(data.result[0].password)
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: data.loginUrl,
                data: JSON.stringify(requestData),
                dataType: "json",
                success: function (response) {

                    console.log("inside the edit");

                    const authorizationToken = 'Bearer ' + response.token;
                    var apiUrl = data.uploadMultiple + "?userid=" + data.result[0].userid + "&password=" + data.result[0].password + "&userFolder=" + userFolder.trim();

                    const fileInput = document.getElementById("efileInput");
                    const checkFilesButton = document.getElementById("checkFilesButton");

                    // Check files when the button is clicked
                    //checkFilesButton.addEventListener("click", function () {
                    //    const selectedFiles = fileInput.files;
                    //    if (selectedFiles.length === 0) {
                    //        console.log("No files found");
                    //    } else {
                    //        console.log("Files found:");
                    //        for (let i = 0; i < selectedFiles.length; i++) {
                    //            console.log(`File ${i + 1}: ${selectedFiles[i].name}`);
                    //        }
                    //    }
                    //});

                    // Alternatively, check files immediately when the user selects files
                    fileInput.addEventListener("change", function () {
                        const selectedFiles = fileInput.files;
                        if (selectedFiles.length === 0) {
                            console.log("No files found");
                        } else {
                            console.log("Files selected:");
                            for (let i = 0; i < selectedFiles.length; i++) {
                                console.log(`File ${i + 1}: ${selectedFiles[i].name}`);
                            }
                        }
                    });

                   // const fileInput = document.getElementById("efileInput");
                    const selectedFiles = fileInput.files;
                    if (selectedFiles.length === 0) {
                        console.log("file not found");
                        return;
                    }
                    else {

                        var formdata = new FormData();
                        for (let i = 0; i < selectedFiles.length; i++) {

                            formdata.append("formFiles", selectedFiles[i]);
                        }
                        $('#efileInput').val('');
                        formdata.append("ProcessID", NUMBER);
                        formdata.append("Processcode", PROCESSCODE);
                        formdata.append("ProcessName", ALPHA);

                        console.log("The format data");
                        console.log("ProcessID");
                        console.log(NUMBER);
                        console.log("Processcode");
                        console.log(PROCESSCODE);
                        console.log("ProcessName");
                        console.log(ALPHA);

                        console.log("above");

                        //alert(fileInput)

                        $.ajax({
                            url: apiUrl,
                            type: 'POST',
                            headers: {
                                'Authorization': authorizationToken
                            },

                            data: formdata,
                            contentType: false,
                            processData: false,
                            success: function (result) {

                                console.log("all edit ok");
                                console.log(result);

                                $.ajax({
                                    url: "/Common/FileUpload",
                                    type: 'POST',
                                    data: formdata,
                                    processData: false,
                                    contentType: false,
                                    success: function (response) {

                                        console.log(response);
                                    }
                                });



                            }
                        });
                    }
                }
            });
        }
    });
}  */

function EditFileUsingAPI(PROCESSCODE) {
  //alert(PROCESSCODE);

  let NUMBER = PROCESSCODE.match(/[^-]+$/)[0];
  let ALPHA = PROCESSCODE.match(/^[^-]+/)[0];

  let userFolder = ALPHA.trim() + "/" + PROCESSCODE.trim().toUpperCase();

  console.log("PROCESSCODE:", PROCESSCODE);
  console.log("ALPHA / ProcessName:", ALPHA);
  console.log("NUMBER / ProcessID:", NUMBER);
  console.log("userFolder:", userFolder);

  const fileInput = document.getElementById("efileInput");
  const selectedFiles = Array.from(fileInput.files);

  console.log("EDIT files", selectedFiles);

  if (selectedFiles.length === 0) {
    console.log("File can not be found");
    return;
  }

  $.ajax({
    url: "/Common/GetActiveFiles",
    type: "POST",
    data: { processCode: PROCESSCODE },
    success: function (activeFiles) {
      var activeSet = {};
      for (var i = 0; i < activeFiles.length; i++) {
        activeSet[activeFiles[i].toLowerCase()] = true;
      }

      var duplicateFiles = [];
      var filesToUpload = [];

      for (var i = 0; i < selectedFiles.length; i++) {
        var fname = selectedFiles[i].name;

        if (activeSet[fname.toLowerCase()]) {
          duplicateFiles.push(fname);
        } else {
          filesToUpload.push(selectedFiles[i]);
        }
      }

      function ContinueUpload(files) {
        if (files.length === 0) {
          console.log("No new files to upload.");
          return;
        }

        $.ajax({
          type: "GET",
          url: "/Common/GetAccInfo",
          dataType: "json",
          success: function (data) {
            var requestData = {
              userid: data.result[0].userid,
              password: data.result[0].password,
              devicedetails: data.result[0].devicedetails,
              channel: data.result[0].channel,
            };

            $.ajax({
              type: "POST",
              contentType: "application/json; charset=utf-8",
              url: data.loginUrl,
              data: JSON.stringify(requestData),
              dataType: "json",
              success: function (response) {
                const authorizationToken = "Bearer " + response.token;

                var apiUrl =
                  data.uploadMultiple +
                  "?userid=" +
                  data.result[0].userid +
                  "&password=" +
                  data.result[0].password +
                  "&userFolder=" +
                  userFolder.trim();

                // real task starts here

                var formdata = new FormData();

                for (var i = 0; i < files.length; i++) {
                  formdata.append("formFiles", files[i]);
                }

                formdata.append("ProcessID", NUMBER);
                formdata.append("Processcode", PROCESSCODE);
                formdata.append("ProcessName", ALPHA);

                console.log("Directory", apiUrl);
                for (const pair of formdata.entries()) {
                  console.log(pair[0], pair[1]);
                }

                $.ajax({
                  url: apiUrl,
                  type: "POST",
                  headers: {
                    Authorization: authorizationToken,
                  },
                  data: formdata,
                  contentType: false,
                  processData: false,
                  success: function (result) {
                    console.log("External upload success:", result);

                    $.ajax({
                      url: "/Common/FileUpload",
                      type: "POST",
                      data: formdata,
                      processData: false,
                      contentType: false,
                      success: function (response) {
                        if (duplicateFiles.length > 0) {
                          3;
                          //notify(
                          //    "error",
                          //    "Files Replaced",
                          //    duplicateFiles.join(", ")
                          //);

                          notify(
                            "info",
                            "Files Replaced",
                            "Existing file(s) were replaced: " +
                              duplicateFiles.join(", "),
                          );
                        }

                        console.log("Internal DB Save Success");
                        console.log("Response:", response);
                        $("#efileInput").val("");
                      },
                      error: function (xhr, status, error) {
                        console.log("Internal DB Save Failed");
                        console.log("Status:", xhr.status);
                        console.log("Response:", xhr.responseText);
                        console.log("Error:", error);
                      },
                    });
                  },
                  error: function (xhr, status, error) {
                    console.log("External upload failed");
                    console.log("Status:", xhr.status);
                    console.log("Response:", xhr.responseText);
                    console.log("Error:", error);
                  },
                });
              },
            });
          },
        });
      }

      if (duplicateFiles.length > 0) {
        $.ajax({
          url: "/Common/DeleteFilesFromDB",
          type: "POST",
          data: {
            processCode: PROCESSCODE,
            fileNames: JSON.stringify(duplicateFiles),
          },
          success: function (deleteResult) {
            console.log("Duplicate files soft deleted:", deleteResult);
            ContinueUpload(selectedFiles);
          },
          error: function (xhr) {
            console.log("Duplicate delete failed:", xhr.responseText);
          },
        });

        return;
      }

      ContinueUpload(selectedFiles);
    },
  });
}

function UploadFileUsingAPI(PROCESSCODE) {
  ////UUU
  //let NUMBER = PROCESSCODE.match(/\d+/g);
  //alert(PROCESSCODE);

  let NUMBER = PROCESSCODE.match(/[^-]+$/)[0];

  let ALPHA = PROCESSCODE.match(/^[^-]+/)[0];

  //var processParts = PROCESSCODE.split('-');

  //let ALPHA = processParts[0];        // Module/process name {SC, LC, ....}
  //let NUMBER = processParts[2];       //Process ID [Master table (ex- TBLLCDETAILS) entry ID]
  //let LCNO = processParts[1];         //

  let concat = "/";
  userFolder = ALPHA.trim() + concat.trim() + PROCESSCODE.trim().toUpperCase();

  console.log("PROCESSCODE:", PROCESSCODE);
  //console.log("processParts:", processParts);
  console.log("ALPHA / ProcessName:", ALPHA);
  console.log("NUMBER / ProcessID:", NUMBER);
  //console.log("LCNO:", LCNO);
  console.log("userFolder:", userFolder);

  $.ajax({
    type: "GET",
    url: "/Common/GetAccInfo",
    dataType: "json",
    success: function (data) {
      var requestData = {
        userid: data.result[0].userid,
        password: data.result[0].password,
        devicedetails: data.result[0].devicedetails,
        channel: data.result[0].channel,
      };

      //     console.log("I am inside");
      // alert(data.result[0].password)
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: data.loginUrl,
        data: JSON.stringify(requestData),
        dataType: "json",
        success: function (response) {
          const authorizationToken = "Bearer " + response.token;
          var apiUrl =
            data.uploadMultiple +
            "?userid=" +
            data.result[0].userid +
            "&password=" +
            data.result[0].password +
            "&userFolder=" +
            userFolder.trim();

          console.log("I am inside");
          const fileInput = document.getElementById("fileInput");
          const selectedFiles = fileInput.files;

          console.log("EDIT files", selectedFiles);
          if (selectedFiles.length === 0) {
            console.log("File can not be found");
            return;
          } else {
            var formdata = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
              formdata.append("formFiles", selectedFiles[i]);
            }
            $("#fileInput").val("");

            //if (ALPHA.length > 3) {
            //    ALPHA = ALPHA.substring(0, 3);
            //}

            //if (NUMBER.length > 3) {
            //    NUMBER = NUMBER.substring(3, 6);
            //}

            formdata.append("ProcessID", NUMBER);
            formdata.append("Processcode", PROCESSCODE);
            formdata.append("ProcessName", ALPHA);

            //alert(fileInput)
            console.log("Directory", apiUrl);
            for (const pair of formdata.entries()) {
              console.log(pair[0], pair[1]);
            }

            $.ajax({
              url: apiUrl,
              type: "POST",
              headers: {
                Authorization: authorizationToken,
              },

              data: formdata,
              contentType: false,
              processData: false,
              success: function (result) {
                $.ajax({
                  url: "/Common/FileUpload",
                  type: "POST",
                  data: formdata,
                  processData: false,
                  contentType: false,
                  success: function (response) {
                    console.log("Internal DB Save Success");
                    console.log("Response:", response);
                  },
                  error: function (xhr, status, error) {
                    console.log("Internal DB Save Failed");
                    console.log("Status:", xhr.status);
                    console.log("Response:", xhr.responseText);
                    console.log("Error:", error);
                  },
                });
              },
            });
          }
        },
      });
    },
  });
}

function UploadFileDocumentBrowseUsingAPI(
  CHILDNAME,
  ROOTDOCCODE,
  DOCHEADER,
  DOCLINE,
) {
  if ($("#txtPickPackID").val() != 0) {
    var pickpack = $("#txtPickPack").val();
    var pickpackID = $("#txtPickPackID").val();
    var pickpacknum = pickpack.split("[");
    var pickpacknumber = pickpacknum[0];
  } else {
    var pickpack = $("#etxtPickPack").val();
    var pickpackID = $("#etxtPickPackID").val();
    var pickpacknum = pickpack.split("[");
    var pickpacknumber = pickpacknum[0];
  }

  let concat = "/";
  // userFolder = ROOTDOCCODE + concat.trim() + pickpacknumber;// + concat.trim()  + CHILDNAME

  userFolder = ROOTDOCCODE + concat.trim() + DOCLINE;

  if (pickpack == "") {
    notify("error", "Error Message", "Enter Pick Pack Number.");
  } else {
    $.ajax({
      type: "GET",
      url: "/Common/GetAccInfo",
      dataType: "json",
      success: function (data) {
        var requestData = {
          userid: data.result[0].userid,
          password: data.result[0].password,
          devicedetails: data.result[0].devicedetails,
          channel: data.result[0].channel,
        };

        $.ajax({
          type: "POST",
          contentType: "application/json; charset=utf-8",
          url: data.loginUrl,
          data: JSON.stringify(requestData),
          dataType: "json",
          success: function (response) {
            const authorizationToken = "Bearer " + response.token;
            var apiUrl =
              data.uploadMultiple +
              "?userid=" +
              data.result[0].userid +
              "&password=" +
              data.result[0].password +
              "&userFolder=" +
              userFolder.trim();

            const fileInput = document.getElementById("fileInput" + DOCLINE);
            const selectedFiles = fileInput.files;
            if (selectedFiles.length === 0) {
              return;
            } else {
              var formdata = new FormData();
              for (let i = 0; i < selectedFiles.length; i++) {
                formdata.append("formFiles", selectedFiles[i]);
              }

              $("#fileInput" + DOCLINE).val("");
              /*formdata.append("ProcessID", NUMBER);*/
              formdata.append("ProcessID", DOCLINE); //as docline
              formdata.append("Processcode", DOCHEADER); //as docheader
              formdata.append("ProcessName", pickpackID); //as pickpack number

              $.ajax({
                url: apiUrl,
                type: "POST",
                headers: {
                  Authorization: authorizationToken,
                },

                data: formdata,
                contentType: false,
                processData: false,
                success: function (result) {
                  notify(
                    "success",
                    "success Message",
                    "File Uploaded Successfully.",
                  );
                  $.ajax({
                    url: "/Common/FileUploadForDocument",
                    type: "POST",
                    data: formdata,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                      //$scope.LoadDocByPickPackNumber();
                      //console.log(response);
                    },
                  });

                  //if (result.code == 200) {
                  //    notify('success', 'success Message', "File Uploaded Successfully.");
                  //    $.ajax({
                  //        url: "/Common/FileUploadForDocument",
                  //        type: 'POST',
                  //        data: formdata,
                  //        processData: false,
                  //        contentType: false,
                  //        success: function (response) {
                  //            //$scope.LoadDocByPickPackNumber();
                  //            //console.log(response);
                  //        }
                  //    });
                  //}
                  //else {
                  //    notify('error', 'error Message', "Unable to Upload File.");
                  //}
                },
              });
            }
          },
        });
      },
    });
  }
}

function ViewImageFromAPIForDocument(
  ID,
  PROCESSCODE,
  PICKPACKNUMBER,
  pickingpackingheaderid,
  STATUS,
) {
  let NUMBER = PROCESSCODE.match(/\d+/g);
  let ALPHA = PROCESSCODE.replace(/[0-9]/g, "");

  let concat = "/";
  userFolder = ALPHA.trim() + concat.trim() + PICKPACKNUMBER;

  $.ajax({
    type: "GET",
    url: "/Common/GetAccInfo",
    dataType: "json",
    success: function (data) {
      var requestData = {
        userid: data.result[0].userid,
        password: data.result[0].password,
        devicedetails: data.result[0].devicedetails,
        channel: data.result[0].channel,
      };

      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: data.loginUrl,
        data: JSON.stringify(requestData),
        dataType: "json",
        success: function (response) {
          const authorizationToken = "Bearer " + response.token;

          var apiUrl =
            data.downloadMultiple +
            "?userid=" +
            data.result[0].userid +
            "&password=" +
            data.result[0].password +
            "&userFolder=" +
            userFolder;

          $.ajax({
            url: apiUrl,
            type: "GET",
            headers: {
              Authorization: authorizationToken,
              "Content-Type": "application/json",
            },
            contentType: false,
            processData: false,
            success: function (result) {
              //$scope.detailsdata = result;
              var apiUrl =
                data.downloadMultiple +
                "?userid=" +
                data.result[0].userid +
                "&password=" +
                data.result[0].password +
                "&userFolder=" +
                userFolder;

              $.ajax({
                url: apiUrl,
                type: "GET",
                headers: {
                  Authorization: authorizationToken,
                  "Content-Type": "application/json",
                },
                contentType: false,
                processData: false,
                success: function (result) {
                  $.ajax({
                    url: "/DocumentLanding/EditbyDetailsID",
                    type: "GET",
                    data: {
                      id: ID,
                      pickpackid: pickingpackingheaderid,
                      status: STATUS,
                    },
                    success: function (resultdb) {
                      console.log(resultdb);

                      var html = "";
                      var extension = "";
                      var filefiting;
                      var k = 0;
                      for (var i = 0; i < resultdb.length; i++) {
                        var slno = 1;
                        //extension = resultdb[i].filename;
                        var slno = i + 1;

                        if (resultdb[i].type === "M") filefiting = "Manual";
                        else if (resultdb[i].type === "A") filefiting = "Auto";

                        if (resultdb[i].docstatus === "N") {
                          extension = result.base64FileResponse[k].fileName;
                          html += "<tr>";
                          html += "<td>" + parseInt(slno) + "</td>";
                          html += "<td>" + resultdb[i].childdocname + "</td>";
                          html += "<td>" + resultdb[i].filename + "</td>";
                          html += "<td>" + resultdb[i].mandatorylabel + "</td>";
                          html += "<td>" + filefiting + "</td>";
                          html +=
                            '<td><span class="badge rounded-pill badge-soft-primary font-size-11">Complete</span></td>';
                          //html += "<td><a  href='data:'" + extension + "';base64," + result.base64FileResponse[i].base64Content + "' download> Download</a></td>";
                          html +=
                            "<td><button type='button' class='btn btn-primary btn-sm insert' onclick='Download(\"" +
                            result.base64FileResponse[k].fileName +
                            '","' +
                            result.base64FileResponse[k].base64Content +
                            '","' +
                            extension +
                            "\")'><span class='fas fa-arrow-circle-down'></span> Download</button></td>";
                          //html += '<td><button type="button" class="btn btn-primary btn-sm insert" onclick="Download()"><span class="fas fa-arrow-circle-down"></span> Download</button></td>';
                          html += "</tr>";
                          k++;
                        } else {
                          extension = resultdb[i].filename;
                          html += "<tr>";
                          html += "<td>" + parseInt(slno) + "</td>";
                          html += "<td>" + resultdb[i].childdocname + "</td>";
                          html += "<td>" + resultdb[i].filename + "</td>";
                          html += "<td>" + resultdb[i].mandatorylabel + "</td>";
                          html += "<td>" + filefiting + "</td>";
                          html +=
                            '<td><span class="badge rounded-pill badge-soft-info font-size-11">Pending</span></td>';
                          html +=
                            "<td><button type='button' class='btn btn-primary btn-sm insert' disabled><span class='fas fa-arrow-circle-down'></span> Download</button></td>";
                          //html += "<td><button type='button' class='btn btn-primary btn-sm insert' disabled><span class='fas fa-arrow-circle-down'></span> Download</button></td>";
                          html += "</tr>";
                        }
                      }
                      $("#tblData").append(html);
                    },
                  });
                },
              });
            },
          });
        },
      });
    },
  });
}

function ShowPopUp(id, rooturl, folder) {
  alert(rooturl);
  var enroll = 545065;
  /* var url = rooturl + folder + "&enroll=" + enroll + "&rs:Embed=true&rc:LinkTarget=_self";*/
  var url = rooturl + folder + "&rs:Embed=true";
  var base_url = window.location.origin;
  newwindow = window.open(
    url,
    "/DocumentLanding/Print?id=" + id,
    "scrollbars=yes,toolbar=0,height=400,width=800,top=70,left=50",
  );
  if (window.focus) {
    newwindow.focus();
  }

  //var myWindow = window.open(base_url + "/DocumentLanding/Print?id=" + id + '&ysnUploder=' + ysnUpload, 'myWindow', "width=700, height=800");
  //var myWindow = window.open(base_url + "/DocumentLanding/Print?id=" + id + 'myWindow', "width=700, target=_self, height=800");
}

function loadIframe(iframeName, url) {
  var $iframe = $("#" + iframeName);
  if ($iframe.length) {
    $iframe.attr("src", url);
    return false;
  }
  return true;
}
