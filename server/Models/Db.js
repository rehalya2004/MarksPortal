const mongoose = require("mongoose")


 const Connection = mongoose.connect("mongodb://localhost:27017/School",
 {
    useNewUrlParser: true, useUnifiedTopology: true
 })
 .then(res=>{console.log("Connected to Mongodb")})

 module.exports = Connection


