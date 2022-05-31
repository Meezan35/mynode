//var http = require("http");

const express = require("express");

//const httpServer = http.createServer(handleServer);

const app = express(); //create a new express app

app.use(express.json()); //enhances the express's readibility to understand json

app.get("/welcome", (req, res) => {
  //   res.writeHead(200, {
  //     "content-type": "text/plain",
  //   });
  //   res.write("welcome to domiunoes");
  //   res.end();
  res.send("welcome to dominoes");
});

app.get("/post/:postId/:comments", (req, res) => {
  console.log("path params", req.params);
  res.send(req.params.comments);
});
app.post("/create", (req, res) => {
  console.log("request body", req.body);
  res.send(req.body.phone + "");
});
app.get("/contact", (req, res) => {
  console.log("query params", req.url);
  console.log("query params using express", req.query);
  console.log("printing sep", req.query.name);
  //   res.writeHead(200, {
  //     "content-type": "application/json",
  //   });
  //   res.write(
  //     JSON.stringify({
  //       phone: "88981341654",
  //       email: "heymeezan@gmail.com",
  //     })
  //   );
  //   res.end();
  res.status(201).send({
    //for different status code i.e.201 use status.send
    phone: "88981341654",
    email: "heymeezan@gmail.com",
  });
});

// function handleServer(req, res) {
//   if (req.url.startsWith("/welcome") && req.method === "GET") {
//     res.writeHead(200, {
//       "content-type": "text/plain",
//     });
//     res.write("welcome to domiunoes");
//     res.end();
//   } else if (req.url.startsWith("/contact") && req.method === "GET") {
//     res.writeHead(200, {
//       "content-type": "application/json",
//     });
//     res.write(
//       JSON.stringify({
//         phone: "88981341654",
//         email: "heymeezan@gmail.com",
//       })
//     );
//     res.end();
//   } else {
//     res.writeHead(404, {});
//     res.end();
//   }
// }

app.listen(8081);
