import express from "express";
import path, { dirname } from "path";
import serveStatic from "serve-static";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const thedirname = dirname(filename);
const app = express();

app.use(serveStatic(path.join(thedirname, "dist")));

app.get(/.*/, (_, res) => {

  res.sendFile(`${thedirname}/dist/index.html`);

});

const port = process.env.PORT || 3000;

app.listen(port);
