var express         = require('express');
var app             = express();
var server          = require('http').Server(app);
var io              = require('socket.io')(server);

app.use(express.static('./public'));
app.get("/ok",(req,res)=>{
  res.send("okkkkkk");
})
//opening a socket connection and listening for event connection
io.sockets.on('connection', function (socket) {
    console.log('a user connected',socket.id);
    
    //listening for disconnect event
    socket.on('disconnect', (socket) => {
        console.log('user disconnected',socket.id);
      });
      
      //listening for message event
      socket.on('message', (msg) => {
        io.emit('chat', msg);
      });

      socket.on('client', (data) => {
        console.log('data received \n %o',data)
        socket.send(data);
     })
})

server.listen(4000, function(){
    console.log('listening on *:4000');
});