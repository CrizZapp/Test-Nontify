import express from "express";
import webpush from "web-push";
import path from "path";

const app = express();

app.use(express.json());

// 👇 ESTO ES LO QUE TE FALTABA
app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

// si tienes sw.js en la misma carpeta
app.use(express.static("."));
