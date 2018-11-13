var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const MESS = 'messageChannel'
const MESS2 = 'centralChannel'
let started = false
let pid = null

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on( MESS2, function(msg){
    if (msg === 'PINGo') {
      started = !started
      if (started) {
        io.emit( MESS, 'started');
        pid = setInterval(function(){
          io.emit( MESS, 'ping');
          }, 3000);
      } else {
        io.emit( MESS, 'stopped');
        clearTimeout(pid);
      }
    }
    io.emit( MESS2, msg);
  });
  socket.on( MESS, function(msg){
    io.emit( MESS, msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

