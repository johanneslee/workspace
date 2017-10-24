/*
    Extract modules
*/
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");

/*
    Create a server
*/
var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var http = http.createServer(app);

/*
    About socket.io
*/
var io = require('socket.io').listen(http);

io.on('connection',function(socket){
    console.log('A user connected');
    socket.on('join', function(data) {
        console.log('user joined');
        socket.join(data.roomname);
        socket.set('room', data.roomname);
        socket.get('room', function(error, room) {
            io.sockets.in(room).emit('join', data.userid);
        });
    });
    socket.on('message', function(msg){
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

/*
    get a router module to the app
*/
var router = require("./routes/index.js")(app, fs);

/*
    Listening
*/
http.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});