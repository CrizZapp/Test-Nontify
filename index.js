import express from "express";
import webpush from "web-push";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static("public"));

let subscriptions = [];

// VAPID (los tuyos
const publicKey = "BP7Qt_P-I1EyNpFAEe34LimEOZB1WkNWaTblQgBehyZid5kT99-DumiX6V3PwpxnVlk1WxNVCplgPUS--xLUz70";

const privateKey = "SYpz_R8JpUuB4D5k1Z_m9qzoiReyAaOqbcJuTlAq0g0";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicKey,
  privateKey
);

// guardar suscripción
app.post("/subscribe", (req, res) => {
  subscriptions.push(req.body);
  res.json({ ok: true });
});

// enviar notificación
app.post("/send", async (req, res) => {
  const payload = JSON.stringify({
    title: "CODEBREAKER",
    body: req.body?.text || "Mensaje nuevo 🔥"
  });

  await Promise.all(
    subscriptions.map(sub =>
      webpush.sendNotification(sub, payload).catch(() => {})
    )
  );

  res.json({ ok: true });
});

app.listen(3000, () => console.log("🔥 server on 3000"));
