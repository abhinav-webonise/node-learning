var http = require("http");
var url = require("url");
var formidable = require("formidable");
var sys = require("sys");

function start(route, handle){

/*
http.createServer(function(request,response){
  response.writeHead(200, {"Content-Type": 'text/plain'});
  response.write("Abhinav");
  response.end();
}).listen(8888);
*/


var server = http.createServer(function(request,response){
  console.log("Request received.");
  // response.writeHead(200, {"Content-Type": 'text/plain'});
  //----------------------------------------------------------------------------

  if (request.url == '/upload' && request.method.toLowerCase() == 'post'){
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files){
      response.writeHead(200,{'content-type':'text/plain'});
      response.write('received upload');
      response.end(sys.inspect({fields: fields, files: files}));
    });
    return;
  }

  response.writeHead(200, {'content-type': 'text/html'});
  response.end(
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  //----------------------------------------------------------------------------


/*
  var postData = "";
  var pathname = url.parse(request.url).pathname;
  console.log("request for " + pathname + "received");
  //var content = route(handle, pathname);
  //request.setEncoding("utf-8");
  request.addListener("data",function(postDataChunk){
    postData += postDataChunk;
    console.log("received postDataChunk '"+ postDataChunk + "'.");
  });

  request.addListener("end",function(){
    route(handle, pathname, response, postData);
  });
  //route(handle, pathname, response);
  //response.write("Bahiya Ji Namastey ");
  //response.write(content);
  // response.end();
*/

});

server.listen(8888);

/*
function onRequest(request,response){
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": 'text/plain'});
  response.write("Hello Bahiya Ji");
  response.end();
}

http.createServer(onRequest).listen(8888);
*/
console.log("Server has started.");


}

exports.start = start;
