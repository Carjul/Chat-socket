//coneccion de los websocket
var socket = io()

//DOM elements 
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var username = document.getElementById('username');
var select = document.getElementById('canal');

function cambio(){
  var data =select.value;
  socket.emit('canal', data);   
}
socket.on('canal', function(data){
  window.alert("Conectado a: "+data);
 });


//limpiar etiqueta

function clean(){
  document.getElementById('input').value = null;
};  


//envio de mensajes

form.addEventListener('submit', function(e) {
e.preventDefault();
socket.emit('chat message', {
  mensaje: input.value,
  usuario: username.value,});    
  clean()      
});

socket.on('chat message', function(data) {

  var item = document.createElement('div');
  item.innerHTML= '<p><strong>'+data.usuario +'</strong>:  '+ data.mensaje + '</p>'
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);




});

//para mostrar quien escribe
input.addEventListener('keypress', function(){
  socket.emit('escribiendo',{
    mensaje:" esta escribiendo...",
    usuario: username.value})

});

socket.on('escribiendo', function(data){
  var etiq = document.getElementById('accion');
  etiq.innerHTML = '<pre style="color: darkgreen; font-size: 20px;"><em>'+data.usuario+'</em>'+data.mensaje+'</pre>'
})

