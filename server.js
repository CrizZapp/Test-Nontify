import express from "express";
import webpush from "web-push";

const app = express();
app.use(express.json());
app.use(express.static("public"));

// 🔑 GENERA ESTO UNA VEZ (te explico abajo)
const publicVapidKey = "BP7Qt_P-I1EyNpFAEe34LimEOZB1WkNWaTblQgBehyZid5kT99-DumiX6V3PwpxnVlk1WxNVCplgPUS--xLUz70";
const privateVapidKey = "SYpz_R8JpUuB4D5k1Z_m9qzoiReyAaOqbcJuTlAq0g0";

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
