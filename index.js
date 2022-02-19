//requerimientos. 
const express = require('express');
const http = require('http');
const {Server}  = require("socket.io");
const mensaje = require('./models/mensajes')
//guardando los frameworks en constantes.
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//setting
app.set('port', process.env.PORT || 3000)

//static files.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/',(req,res)=>{
  res.sendFile('public');
})
app.post('/h', (req, res) => {
 
  
});
app.get('/home', (req, res) => {

  
  res.sendFile( __dirname+'/public/home.html');
  
});

//coneccion de soket con el servidor.
io.on('connection', (socket) => {console.log('a user connected',socket.id); socket.on('disconnect', () => {console.log('user disconnected',socket.id); });});

 
io.on('connection', (socket) => { 
 
  var channel =" ";
  socket.on('canal',(data)=>{
    socket.join(data);
    socket.emit('canal',data);
    channel = data
  })
  socket.on('escribiendo', (data)=>{socket.broadcast.in(channel).emit('escribiendo', data);});
  
  socket.on('chat message', async (data) => {
    var msg =  new mensaje(data)
    await msg.save() 
    var datos = await mensaje.find()
    
    io.in(channel).emit('chat message', datos);
  
  });

  
});




 

//servidor escucha al puerto 3000.
server.listen(app.get('port') , () => console.log('Socket.IO server running at http://localhost:',app.get('port')));