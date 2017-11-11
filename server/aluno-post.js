var http = require('http');

var config = {
	hostname: 'localhost',
	port: 3000,
	path: '/aluno',
	method: 'post',
	headers: {
		'accept': 'application/json',
		'content-type': 'application/json'
	}
};

var client = http.request(config, function(res) {

	console.log(res.statusCode);

	res.on('data', function(body) {
		console.log('Body: ' + body);
	});
});

var aluno = {
	//
};

client.end(JSON.stringify(aluno));