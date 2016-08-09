var querystring = require("querystring");
var exec = require("child_process").exec;
function start(response, postData){
  console.log("Request handler 'start' was called");
    var body = '<html>'+
              '<head>'+
              '<meta http-equiv="Content-Type" content="text/html; '+
              'charset=UTF-8" />'+
              '</head>'+
              '<body>'+
              '<form action="/upload" method="post">'+
              '<textarea name="text" rows="20" cols="60"></textarea>'+
              '&nbsp; <input type="submit" value="Submit Text" />'+
              '</form>'+
              '</body>'+
              '</html>';
    response.writeHead(200, {"Content-Type":"text/html"});
    //response.write("Hello start");
    response.write(body);
    response.end();

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

function upload(response, postData){
  console.log("Request handler 'upload' was called");
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write("Hello upload ")
    //response.write("You've sent: "+ postData);
    response.write("You've sent: " +
    querystring.parse(postData).text);
    response.end();


}

exports.start = start;
exports.upload = upload;
