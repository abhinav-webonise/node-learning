var querystring = require("querystring");
var fs = require("fs");
var url = require("url");
var exec = require("child_process").exec;
var formidable = require("formidable");

//function start(response, postData){
  function start(response){
  console.log("Request handler 'start' was called");

    var body = '<html>'+
              '<head>'+
              '<meta http-equiv="Content-Type" content="text/html; '+
              'charset=UTF-8" />'+
              '</head>'+
              '<body>'+
              '<form action="/show" enctype="multipart/form-data" method="post">'+
          //    '<textarea name="text" rows="20" cols="60"></textarea>'+
              '<input type="file" name="upload"  multiple="multiple">'+
              '&nbsp; <input type="submit" value="Upload File" />'+
              '</form>'+
              '</body>'+
              '</html>';
    response.writeHead(200, {"Content-Type":"text/html"});
    //response.write("Hello start");
    response.write(body);
    //response.end();

/*
  function sleep(milliseconds){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliseconds);
  }

  sleep(10000);
  return "Hello Start";
*/
  //var content = "empty";
  // exec("ls -lah", function(error, stdout, stderr){
  //   response.writeHead(200, {"Content-Type": 'text/plain'});
  //   response.write("stdout");
  //   //response.end();
  // });
}

//function upload(response, postData){
function upload(response, request){
  console.log("Request handler 'upload' was called");

  response.writeHead(200, {'content-type': 'text/html'});
  response.write(
    '<form action="/show" enctype="multipart/form-data" '+
    'method="post">'+
    //'<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )

  var form = new formidable.IncomingForm();
  form.uploadDir = process.env.TMP || process.env.TMPDIR || process.env.TEMP || '/tmp' || process.cwd();

  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    if(error){
      console.log(error);
    }
    console.log("parsing done");
    console.log(files.upload.path);

    fs.rename(files.upload.path, form.uploadDir + files.upload.name , function(error,value) {
      if (error) {
        console.error(error);
      }
        // fs.unlink("/tmp/test.png");
        console.log(value);
    });
    // response.writeHead(200, {"Content-Type": "text/html"});
    // response.write("received image:<br/>");
    // response.write("<img src='/show' />");
    //response.end();
    });

  /*
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Hello upload ")
    //response.write("You've sent: "+ postData);
    response.write("You've sent: " +
    querystring.parse(postData).text);
    response.end();

    */
}

// ----------------------------------------------------------------------------

function show (response, postData){
  console.log("Request handler show was called");
  fs.readFile("/tmp/test.png", "binary", function(error, file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(err + "\n");
      response.end();
    }
    else{
      response.writeHead(200, {"Content-Type":"image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

// ----------------------------------------------------------------------------

exports.start = start;
exports.upload = upload;
exports.show = show;
