var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket) {
  console.log(io.sockets.clients())

  socket.on('disconnect', function() {
    io.emit('info', '一位用户退出');
  });

  socket.on('chat message', function(data) {
    console.log(data.name + ':' + data.msg);
    io.emit('get', data);
  });
  io.emit('info', '一位用户加入');
});

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
var server = http.listen(app.get('port'), function() {
  console.log('start at port:' + server.address().port);
});