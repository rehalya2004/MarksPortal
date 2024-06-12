const mongoose = require("mongoose")
const jwt = require ("jsonwebtoken")

const LoginSchema = new mongoose.Schema({
    email:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    }
})


LoginSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id,email:this.email,role:this.role},"MRKWWRTFLAFWWTFTGINL",{expiresIn:"1d"})
  return token
};


const loginModel = mongoose.model("user",LoginSchema)

module.exports = loginModel

