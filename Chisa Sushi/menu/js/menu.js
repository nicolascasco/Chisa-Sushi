var producto;
var lastLog;

function paginaStartUP() {
	producto = JSON.parse(info);
}

var urlProductId;
var urlProductPlaceholder;
window.onload = function() {
	getURLParameter();
	console.log(urlProductId);
	console.log(urlProductPlaceholder);
	if (urlProductId && urlProductPlaceholder) {
		var row = document.getElementById("Row" + urlProductPlaceholder);
		HandleProductInfo(urlProductId, row);
	}
}
// url param start //
function getURLParameter() {
	var urlSearchString = window.location.search.substring(1);
	var urlVariables = urlSearchString.split('r');
	urlProductId = urlVariables[0];
	urlProductPlaceholder = urlVariables[1];
}
//url param end //

var infoTemplate = "<div id='descripcion' class='item-info'><div class='wrapper'><div class='container-fluid product-hero'><div class='row content clearfix'><a class='cerrar' onclick='exterminate()'><i class='fa fa-times-circle fa-4x' aria-hidden='true'></i></a><hgroup class='col-sm-6 text-left title-group'><h1 class='title'>{{nombre}}</h1><h2 class='subtitle'></h2></hgroup><div class='image col-sm-6 text-right'><img src='{{img}}' alt=''></div><div class='col-sm-6 description'>{{des}}</div><div clas='col-sm-6' style='text-align: center;'><iframe src='https://www.facebook.com/plugins/share_button.php?href={{url}}{{id}}r{{r}}&layout=button_count&size=large&mobile_iframe=true&width=110&height=28&appId' width='110' height='28' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe></div></div></div></div></div>";
//var infoTemplate = "<iframe src='https://www.facebook.com/plugins/share_button.php?href={{url}}&layout=button_count&size=large&mobile_iframe=true&width=110&height=28&appId' width='110' height='28' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe>";
var modalInfoTemplate = "<div id='modalContent' class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-body'><div class='modal-product-hero' ><a onclick='ocultarModal()' class='fa fa-times-circle fa-4x' aria-hidden='true' style=''></a><hgroup class='col-sm-12 title-group'><h1 class='title'>{{nombre}}</h1><h2 class='subtitle'></h2></hgroup><div class='col-sm-12 description'>{{des}}</div><div class='image col-sm-12 text-right'><img src='{{img}}' alt=''></div><div clas='col-xs-12' style='text-align: center;'><iframe src='https://www.facebook.com/plugins/share_button.php?href={{url}}{{id}}r{{r}}&layout=button_count&size=large&mobile_iframe=true&width=110&height=28&appId' width='110' height='28' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe></div></div></div></div></div>";

var completo;
function HandleProductInfo(id, target) {
	var selec = producto[id];
	if (selec) {
		completo = {"nombre":selec["nombre"], "des":selec["des"], "img":selec["img"], "url":window.location.href.split('?')[0], "r":target.id.substring(3), "id":id, "target":target} ;
		completo["url"] = "https://nicolascasco.github.io/Chisa-Sushi/Chisa%20Sushi/menu/maki-roll.html?";
		if (screen.width < 768) {
			mostrarModal()
		} else {
			mostrarDesktop();
		}
	}
}

function mostrarModal() {
	Mustache.parse(modalInfoTemplate);
	var rendered = Mustache.render(modalInfoTemplate, completo);
	document.getElementById("modalPlaceholder").innerHTML = rendered;
	$(function() {
		$("#modalPlaceholder").modal();
	});
}

function ocultarModal() {
	$(function() {
		$("#modalPlaceholder").modal('hide');
	});
	document.getElementById("modalContent").remove();
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
function mostrarDesktop() {
	if (completo["id"] == lastRecivedId) {
		exterminate();
	} else {
			if (document.getElementById("descripcion")) {
				cerrarActaulAbrirNuevo();
			} else {
				mostrar();
			}
	}
}

function mostrar() {
	Mustache.parse(infoTemplate);
	var rendered = Mustache.render(infoTemplate, completo);
	var target = completo["target"];
	document.getElementById(target.id).setAttribute("style", "height: 600px");
	scrollTo(target.id);
	target.innerHTML = rendered;
	setTimeout(function() {
		var openProductInfo = document.getElementById("descripcion");
		openProductInfo.setAttribute("style", "height:600px;")
	}, 0);
	lastRecivedId = completo["id"];
}

function cerrarActaulAbrirNuevo() {
	setTimeout(function() {mostrar();},600);
	exterminate();
}

function scrollTo(targetID) {
	var cpch = document.getElementById(targetID);
	cpch.scrollIntoView(true);
	window.scrollBy(0,-80);
}
