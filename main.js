let express = require('express');
let cors = require('cors');
let app = express();
let fs = require('fs');
let server = require('http').createServer(app);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use('/', express.static(__dirname + '/public', {index: 'index.html'}));


//server.listen(80, "192.168.13.1"); //hotspot
server.listen(80, "localhost"); //localhost
//server.listen(80, "192.168.100.12"); //wifi