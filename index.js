/* eslint-disable import/newline-after-import */
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const app = express();

app.use(serveStatic(path.join(__dirname, "dist")));

const port = process.env.PORT || 8080;

app.listen(port);
