import express from "express";
import path from "path";
import serveStatic from "serve-static";

const app = express();

app.use(serveStatic(path.join(__dirname, "dist")));

app.get(/.*/, (_, res) => {

  res.sendFile(`${__dirname}/dist/index.html`);

});

const port = process.env.PORT || 3000;

app.listen(port);
