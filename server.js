import express from "express";
import webpush from "web-push";

const app = express();
app.use(express.json());
app.use(express.static("public"));

// 🔑 GENERA ESTO UNA VEZ (te explico abajo)
const publicVapidKey = "PEGA_AQUI_PUBLIC_KEY";
const privateVapidKey = "PEGA_AQUI_PRIVATE_KEY";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// guardar suscripciones en memoria (demo)
let subscriptions = [];

app.post("/subscribe", (req, res) => {
  subscriptions.push(req.body);
  res.json({ ok: true });
});

// botón de prueba
app.post("/send", async (req, res) => {
  const payload = JSON.stringify({
    title: "TEST",
    body: "Notificación de prueba 🔥"
  });

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (err) {}
  }

  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server listo en puerto 3000"));
