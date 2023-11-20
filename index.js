var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017//mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to databasse"));
db.once('open',()=>console.log("Connected to database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "name":name,
        "email":email,
        "phone":phone,
        "password":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Sucessfully");

    });

    return res.redirect('signup_sucess.html')
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-acess-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("listening on port 3000");