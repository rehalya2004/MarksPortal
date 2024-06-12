const express = require("express")
const loginModel = require("../Models/UserSchema")
const jwt = require ("jsonwebtoken")
const MarkModel = require("../Models/MarkSchema")
const cors = require("cors")
const router = express.Router()
router.use(express.json())
router.use(cors())
router.use(express.urlencoded({extended: true}))


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
  
  
    jwt.verify(token, "MRKWWRTFLAFWWTFTGINL", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
  }


router.post("/addMark",async(req,res)=>{

   
        const {email,S1,S2,S3} = req.body
        if(!email || !S1 || !S2 || !S3){

            return res.status(400).json("not exist")
            
        }

        const existEmail = await loginModel.findOne({email:email})
        const Email = await MarkModel.findOne({email:email})
        if(existEmail){
            if(existEmail.role === "student"){
             if(!Email){
                await MarkModel.create({
                    email: email,
                    S1: S1,
                    S2: S2,
                    S3: S3
                })
                return res.status(400).json("existed")
             }else{
                return res.json("Mark already given")
             }

            }else{
                res.json("Your not a student")
            }
        }else{
            return res.status(400).json("not exist")
        }
        
})


router.get("/viewMark", authenticateToken,async(req,res)=>{
    const mark = await MarkModel.findOne({email: req.user.email})
    res.json(mark)
}

)

module.exports = router