var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const MESS = 'messageChannel'
const CMND = 'commandChannel'
let started = false
let pid = null
let count = 0

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('connected===>')
  socket.on( MESS, function(msg){
    console.log('message==> ', msg)
    io.emit( MESS, msg);
  })

  socket.on( CMND, function(msg){
    console.log('COMMAND ', msg)
    if (msg === 'PINGo') {
      started = !started
      if (started) {
        io.emit( MESS, 'started');
        pid = setInterval(function(){
          count++
          io.emit( MESS, 'ping ' + count);
          }, 3000);
      } else {
        io.emit( MESS, 'stopped');
        clearTimeout(pid);
      }
    }
    io.emit( CMND, msg);
  });
  
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

