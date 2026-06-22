let permiso = false;

// pedir permiso
document.getElementById("btn-permiso").addEventListener("click", async () => {
  const res = await Notification.requestPermission();

  if (res === "granted") {
    permiso = true;
    alert("Notificaciones activadas");
  } else {
    alert("Permiso denegado");
  }
});

// enviar notificación de prueba
document.getElementById("btn-enviar").addEventListener("click", () => {
  if (!permiso) {
    alert("Primero activa las notificaciones");
    return;
  }

  new Notification("🔥 PRUEBA", {
    body: "Esto es una notificación real del navegador",
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
  });
});
