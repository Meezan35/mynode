const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.post("/todo", (req, res) => {
  const body = req.body;
  body.id = new Date().valueOf();

  fs.writeFile(
    `todos/${body.id}.json`,
    JSON.stringify(body),
    "utf-8",
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(body);
      }
    }
  );
});

app.put("/todo/:todoId", (req, res) => {
  const body = req.body;
  const todoId = req.params.todoId;

  fs.readFile(`todos/${todoId}.json`, "utf-8", (err, fileData) => {
    if (err) {
      res.status(404).send("not found");
    } else {
      const existingData = JSON.parse(fileData);
      existingData.task = body.task;
      fs.writeFile(
        `todos/${todoId}.json`,
        JSON.stringify(existingData),
        "utf-8",
        (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(existingData);
          }
        }
      );
    }
  });
});

app.delete("/todo/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  fs.rm(`todos/${todoId}.json`, (err) => {
    if (err) {
      res.status(404).send("file not founmd");
    } else {
      res.sendStatus(200);
    }
  });
});

app.get("/todo", (req, res) => {
  const arr = [];
  fs.readdir("todos", (err, files) => {
    files.forEach((file) => {
      fs.readFile("todos/" + file, "utf-8", (err, fileData) => {
        const jsonData = JSON.parse(fileData);
        arr.push(jsonData);
        if (arr.length === files.length) {
          res.send(arr);
        }
      });
    });
  });
});

app.listen(9999);

// const data = JSON.stringify({
//   id: new Date().valueOf(),
//   task: "Hey Meezan how are you",
// });

// fs.writeFile("todos/dummy.json", data, "utf-8", function (err) {
//   if (err) {
//     console.log("error while writing", err);
//   } else {
//     console.log("wrote successfully");
//   }
// });

// fs.readFile("todos/dummy.json", "utf-8", function (err, fileData) {
//   if (err) {
//     console.log("error while reading a file", err);
//   } else {
//     const fileJson = JSON.parse(fileData);
//     console.log("read theee file", fileJson);
//   }
// });

// fs.rm("todos/dummy21.json", function (err) {
//   if (err) {
//     console.log("cant delete", err);
//   } else {
//     console.log("deleted");
//   }
// });

// fs.readdir("src", function (err, fileList) {
//   if (err) {
//     console.log("cannot read all");
//   } else {
//     console.log("read successfully", fileList);
//   }
// });
