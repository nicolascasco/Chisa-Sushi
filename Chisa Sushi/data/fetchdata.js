function loadDatabase() {
  doAjax();
  return;
}

function doAjax() {
  //var server, username, password;
  var id = JSON.stringify($('#id').val());
  ajax = theAjax("getDB", id);
  ajax.done(processData);
  ajax.fail(function() {alert("Failure!");});
}

function theAjax(method, id) {
  return $.ajax({
    url: 'GetDatabase.php',
    type: 'POST',
    data: {method:method, id:id}
  });
}

var response;
function processData(response_in) {
  response = JSON.parse(response_in);
  console.log(response);
  for (var i = 0; i < response.length; i++) {
    $("#databases").append($('<option>', {value: response[i]["nombre"],text: response[i]["nombre"]}));
  }
}
