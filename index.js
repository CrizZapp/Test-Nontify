import express from "express";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// botón de prueba
app.post("/send", async (req, res) => {
  try {
    const payload = {
      title: "TEST",
      body: "Notificación de prueba 🔥"
    };

    console.log("📩 /send recibido:", req.body);

    // aquí no “magia”, solo respuesta del server
    res.json({
      ok: true,
      message: "Notificación simulada enviada",
      data: payload
    });

  } catch (err) {
    console.error("❌ ERROR /send:", err);

    res.status(500).json({
      ok: false,
      error: "falló el endpoint"
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
