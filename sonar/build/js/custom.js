


function init_random(){
	document.getElementById('totalacesso2').innerHTML = 29339;
	$.ajax({
				url: "localhost:8888/web/teste.php",
				method: "GET",
				success: function(data) {
					document.getElementById('totalacesso2').innerHTML = data[i];
					},
				error: function(data) {
					console.log(data);
				}
			});
}


function init_bur(){
	document.getElementById('totalacesso2').innerHTML = 299;
}

$(document).ready(function() {
	init_random();
});