var producto;
var lastLog;
var urlProductId;
var urlProductPlaceholder;

function paginaStartUP() {
	producto = JSON.parse(info);
}

window.onload = function() {
	urlProductId = getURLParameter('producto');
	urlProductPlaceholder = getURLParameter('r');
	if (urlProductId && urlProductPlaceholder) {
		var row = document.getElementById("Row" + urlProductPlaceholder);
		HandleProductInfo(urlProductId, row);
	}
}
// url param start //
function getURLParameter(param) {
	var urlSearchString = window.location.search.substring(1);
	var urlVariables = urlSearchString.split('&');

	for (var i = 0; i < urlVariables.length; i++) {
		var parameterName = urlVariables[i].split('=');
		if (parameterName[0] == param) {
			return decodeURIComponent(parameterName[1]);
		}
	}
}
//url param end //

var infoTemplate = "<div id='descripcion' class='item-info'><div class='wrapper'><div class='container-fluid product-hero'><div class='row content clearfix'><a class='cerrar' onclick='exterminate()'><i class='fa fa-times-circle fa-4x' aria-hidden='true'></i></a><hgroup class='col-sm-6 text-left title-group'><h1 class='title'>{{nombre}}</h1><h2 class='subtitle'></h2></hgroup><div class='image col-sm-6 text-right'><img src='{{img}}' alt=''></div><div class='col-sm-6 description'>{{des}}</div></div></div></div></div>";

var modalInfoTemplate = "<div id='modalContent' class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-body'><div class='modal-product-hero' ><a onclick='ocultarModal()' class='fa fa-times-circle fa-4x' aria-hidden='true' style=''></a><hgroup class='col-sm-12 title-group'><h1 class='title'>{{nombre}}</h1><h2 class='subtitle'></h2></hgroup><div class='col-sm-12 description'>{{des}}</div><div class='image col-sm-12 text-right'><img src='{{img}}' alt=''></div></div></div></div></div>";

function HandleProductInfo(id, target) {
	if (screen.width < 768) {
		mostrarModal(id)
	} else {
		mostrarDesktop(id, target);
	}
}

function ocultarModal(id) {
	$(function() {
		$("#modalPlaceholder").modal('hide');
	});
	document.getElementById("modalContent").remove();
}

function mostrarModal(id) {
	var selec = producto[id];
	if (selec != null) {
		Mustache.parse(modalInfoTemplate);
		var rendered = Mustache.render(modalInfoTemplate, selec);
		document.getElementById("modalPlaceholder").innerHTML = rendered;
	}
	$(function() {
		$("#modalPlaceholder").modal();
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
