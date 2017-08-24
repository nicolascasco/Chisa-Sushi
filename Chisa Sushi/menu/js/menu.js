var producto;
var lastLog;

function paginaStartUP() {

}

var urlProductId;
window.onload = function() {
	getURLParameter();
	if (urlProductId) {
		getData(urlProductId);
	}
}
// url param start //
function getURLParameter() {
	var urlSearchString = window.location.search.substring(1);
	urlProductId = urlSearchString;

}
//url param end //

var infoTemplate = "<div id='descripcion' class='item-info'><div class='wrapper'><div class='container-fluid product-hero'><div class='row content clearfix'><a class='cerrar' onclick='exterminate()'><i class='fa fa-times-circle fa-4x' aria-hidden='true'></i></a><hgroup class='col-sm-6 text-left title-group'><h1 class='title'>{{nombre}}</h1><h2 class='subtitle'></h2></hgroup><div class='image col-sm-6 text-right'><img src='{{img}}' alt=''></div><div class='col-sm-6 description'>{{des}}</div><div class='col-sm-6'><iframe src='https://www.facebook.com/plugins/like.php?href={{url}}&width=450&layout=standard&action=recommend&size=large&show_faces=true&share=true&height=80&appId' width='100%' height='80' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe></div></div></div></div></div></div>";

var modalInfoTemplate = "<div id='modalContent' class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-body'><div class='modal-product-hero' ><a onclick='ocultarModal()' class='fa fa-times-circle fa-4x' aria-hidden='true' style=''></a><hgroup class='col-sm-12 title-group'><h1 class='title'>{{nombre}}</h1><h2 class='subtitle'></h2></hgroup><div class='col-sm-12 description'>{{des}}</div><div class='image col-sm-12 text-right'><img src='{{img}}' alt=''></div><div class='col-xs-12'style='text-align:center'><iframe src='https://www.facebook.com/plugins/like.php?href={{url}}&width=211&layout=button_count&action=recommend&size=large&show_faces=true&share=true&height=46&appId' width='211' height='46' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe></div></div></div></div></div>";

var completo;
function HandleProductInfo(data) {
		completo = data;
	if (screen.width < 768) {
		mostrarModal()
	} else {
		mostrarDesktop();
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
	var target = document.getElementById(completo["target"]);
	target.setAttribute("style", "height: 600px");
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

/* ==================================== AJAX ==================================== */
function getData(id) {
	var key = JSON.stringify(id);
	ajax = fetchData("productInfo", key);
	ajax.done(processData);
	ajax.fail(function() {alert("Failure!");});
}

function fetchData(method, id) {
	return $.ajax({
		url: 'js/getDatabaseInfo.php',
		type: 'POST',
		data: {method:method, id:id}
  });
}

var response;
function processData(response_in) {
	response = JSON.parse(response_in);
	if (response) {
		HandleProductInfo(response)
	} else {
		console.log("err");
	}
}
