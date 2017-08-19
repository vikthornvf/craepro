var express =    require('express')
var app =        express()
var bodyParser = require('body-parser')
var routes =     require('../app/routes')
var path =       require('path');

app.set('clientPath', path.join(__dirname, '../..', 'client'));
console.log(app.get('clientPath'));

app.use(express.static(app.get('clientPath')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

module.exports = app;