const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello, Express dans local host 2"));

app
  .listen(port)
  .on("listening", () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start:", err);
  });
