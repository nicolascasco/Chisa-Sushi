var producto;
var lastLog;

function paginaStartUP() {
	producto = JSON.parse(info);
}

var infoTemplate = "<div id='descripcion' class='item-info'><div class='wrapper'><div class='container-fluid product-hero'><div class='row content clearfix'><a class='cerrar' onclick='exterminate()'><i class='fa fa-times-circle fa-4x' aria-hidden='true'></i></a><hgroup class='col-sm-6 text-left title-group'><h1 class='title'>{{nombre}}</h1><h2 class='subtitle'></h2></hgroup><div class='image col-sm-6 text-right'><img src='{{img}}' alt=''></div><div class='col-sm-6 description'>{{des}}</div></div></div></div></div>";

function HandleProductInfo(id, target) {
	if (screen.width < 768) {
		mostrarModal(id)
	} else {
		mostrarDesktop(id, target);
	}
}

function ocultarModal(id) {
	$(function() {
		$("#myModal").modal('hide');
	});
}

function mostrarModal(id) {
	$(function() {
		$("#myModal").modal();
	});
}

function exterminate() {
	var openProductInfo = document.getElementById("descripcion");
	if (openProductInfo != null) {
		setTimeout(function(){
			openProductInfo.remove();
			lastRecivedId = null;
		}, 500);
		openProductInfo.setAttribute("style", "height:1px;");
		var abierto = openProductInfo.parentElement;
		 abierto.removeAttribute("style");
	} else {
		lastLog = "Error: openProductInfo not found.";
	}
}



var lastRecivedId = null;

function mostrarDesktop(id, target) {
	var selec = producto[id];
	if (id == lastRecivedId) {
		exterminate();
	} else {
			if (document.getElementById("descripcion")) {
				cerrarActaulAbrirNuevo(id, target);
			} else {
				mostrar(id, target);
			}
	}
}

function mostrar(id, target) {
	var selec = producto[id];
	if (selec != null) {
		Mustache.parse(infoTemplate);
		var rendered = Mustache.render(infoTemplate, selec);
		document.getElementById(target.id).setAttribute("style", "height: 600px");
		scrollTo(target);
		target.innerHTML = rendered;
		setTimeout(function() {
			var openProductInfo = document.getElementById("descripcion");
			openProductInfo.setAttribute("style", "height:600px;")
		}, 0);
		lastRecivedId = id;
	}
}

function cerrarActaulAbrirNuevo(id, target) {
	setTimeout(function() {mostrar(id, target);},600);
	exterminate();
}

function scrollTo(target) {
	var cpch = document.getElementById(target.id);
	cpch.scrollIntoView(true);
	window.scrollBy(0,-80);
}
