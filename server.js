/*
    Extract modules
*/
var express = require('express');
var http = require('http');
//body-parser extract post data
//body-parser give body attribute to request instance
var bodyParser = require('body-parser');
//express-session module can access cookie directly
//cookie-parser module doesn't need anymore
var session = require('express-session');
//fs module can access and open file
var fs = require("fs");

/*
    Create a server
*/
var app = express();
//bind port
var server = http.createServer(app).listen(8080, function(req, res){
    console.log("Express server has started on port 8080");
});
var io = require('socket.io')(server).listen(8081);

/*
    Set middleware
*/
//define path to access html document to make the server can read them
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
//define path to access static files to make the server can read them
app.use(express.static('public'));
//bodyParser settings
//router must place below these settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
/*
app.use(session({
    secret: '!@johannesTB@!',
    resave: false,
    saveUninitialized: true
}));
*/
//about socket.io
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
//get a router module to the app
var router = require("./routes/index.js")(app, fs);