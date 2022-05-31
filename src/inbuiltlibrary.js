const http = require("http");

const server = http.createServer((req, res) => {
  console.log("received request to host", req.headers.host);
  console.log("request verb", req.method);
  console.log("request HEADERS", req.headers);
  console.log("params", req.url);

  res.writeHead(255, {
    "content-type": "application/json",
  });
  res.write("hello");

  res.end();
});
server.listen(9999);
