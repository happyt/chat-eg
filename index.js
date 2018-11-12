var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const MESS = 'messageChannel'
const MESS2 = 'centralChannel'

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on( MESS2, function(msg){
    io.emit( MESS2, msg);
  });
  socket.on( MESS, function(msg){
    io.emit( MESS, msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
