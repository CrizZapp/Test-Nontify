let permissionGranted = false;

// pedir permiso
document.getElementById("btn-allow").onclick = async () => {
  if (!("Notification" in window)) {
    alert("Este navegador no soporta notificaciones");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    permissionGranted = true;
    alert("Notificaciones activadas ✔️");
  } else {
    alert("Permiso denegado ❌");
  }
};

// enviar notificación de prueba
document.getElementById("btn-send").onclick = () => {
  const msg = document.getElementById("msg").value || "Hola mundo";

  if (!permissionGranted) {
    alert("Primero activa notificaciones");
    return;
  }

  new Notification("TEST APP", {
    body: msg,
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
  });
};
