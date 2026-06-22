import express from "express";
import webpush from "web-push";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const subscriptions = [];

// tus keys

const publicVapidKey = "BP7Qt_P-I1EyNpFAEe34LimEOZB1WkNWaTblQgBehyZid5kT99-DumiX6V3PwpxnVlk1WxNVCplgPUS--xLUz70";

const privateVapidKey = "SYpz_R8JpUuB4D5k1Z_m9qzoiReyAaOqbcJuTlAq0g0";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);
                                        
// guardar suscripción
app.post("/subscribe", (req, res) => {
  subscriptions.push(req.body);
  res.json({ ok: true });
});

// enviar notificación
app.post("/send", async (req, res) => {
  const payload = JSON.stringify({
    title: "TEST",
    body: "Notificación real 🔥"
  });

  try {
    await Promise.all(
      subscriptions.map(sub =>
        webpush.sendNotification(sub, payload)
      )
    );

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false });
  }
});

app.listen(3000, () => console.log("RUN"));
