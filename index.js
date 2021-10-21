var express         = require('express');
var app             = express();
var server          = require('http').Server(app);
var io              = require('socket.io')(server);

app.use(express.static('./public'));

io.sockets.on('connection', function (socket) {
    console.log('a user connected',socket.id);
    
    socket.on('disconnect', (socket) => {
        console.log('user disconnected',socket.id);
      });
      
      socket.on('message', (msg) => {
        io.emit('chat', msg);
      });
    
})

server.listen(4000, function(){
    console.log('listening on *:4000');
});