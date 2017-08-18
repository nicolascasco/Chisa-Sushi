var f, d, h, m, r;
function carga() {
  actualizar();
  //setInterval(actualizar, 5000);
}

function actualizar() {
  f = new Date();
  dia();
	document.getElementById("actual").innerHTML = r;
}
function dia() {
  d = f.getDay();
  if (d >= 3 && d <= 6) {
    hora();
  } else {
    r = "Hoy Cerrado";
  }
}
function hora() {
  h = f.getHours();
  m = f.getMinutes();
  if (h >= 20 && h <= 23) {
    r = "Ahora Abierto";
  } else if (h == 19 && m >= 30) {
    r = "Ahora Abierto";
  } else {
      r = "Ahora Cerrado";
  }
}

var tog = false;
function verHorarios() {
  tog = !tog;
  var text;
  if (tog == true) {
    text = "Ocultar horarios"
  } else if (tog == false) {
    text = "Mostrar horarios"
  }
  document.getElementById("ver").innerHTML = text;
}

function alerta() {
  alert("Hello! I am an alert box!");
  console.log("alert");
}
