const mongoose =require('mongoose')

const {Schema, model, connect  }= mongoose;

connect('mongodb+srv://carlos:12345@cluster0.losq7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(db =>{console.log("data connect") })
.catch(err =>{console.log(err)})

var msg = new Schema({
   usuario:String,
   mensaje:String 
})

module.exports= model("mensaje", msg)