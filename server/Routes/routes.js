const express = require("express")
const loginModel = require("../Models/UserSchema")
const router = express.Router()
const cors = require("cors")
router.use(express.json())
router.use(cors())
router.use(express.urlencoded({extended: true}))


router.get("/",cors(),(req,res) => {
  res.send(`Hello World`)
})

router.post("/login",async(req,res)=>{

    try{
        const {email,password} = req.body
        if(!email || !password){

            return res.status(400).json("not exist")
            
        }

        const existEmail = await loginModel.findOne({email:email})
        if(existEmail){
            if(!(password === existEmail.password)){

                return res.status(400).json("not exist")
                
            }else{
                
                const token = existEmail.generateAuthToken();
                res.json({"msg":"exist","data":token})

            }
        }else{
            return res.status(400).json("not exist")
        }
        
    }catch(e){
       res.json("not exist")
    }
})


router.post("/signup",async(req,res)=>{
    const {email,password,role} = req.body

    if( !email || !password || !role){
        return res.status(472).json({error: "Plz fill the field properly"})
    }else{
        try{
            const existEmail = await loginModel.findOne({email:email})
            if(!existEmail){
                res.json("not exist")
                const user = new loginModel({email,password,role})
                await user.save();
   
            }else{
                res.json("exist")
            }
        }catch(e){
           res.json("not exist")
        }
    }

    
})



module.exports = router