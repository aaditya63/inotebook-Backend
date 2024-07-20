const express =  require('express')
const router = express.Router()
const User = require('../models/User')
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')     //Importing Bcrypt file
var jwt = require('jsonwebtoken');      //importing JWT tocken


const JWT_SECRET = 'LifeIsGood$'        //Json web token,.. signature

//create a user using : POST "/api/auth/". doesnt require auth

router.post('/createuser',[
    body('email','Enter a valid Email').isEmail(),                            // This validation is done by express- validator
    body('name','Enter a valid Name').isLength({min:3}),
    body('password',"Password must be atleast 8 letters").isLength({min:8})
],async (req,res)=>{                      //use post to hide data from
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {                                                                          //check if code is running properly,.. preventing from app crash


        let user = await User.findOne({email:req.body.email});                    //checking if user is already registered with the same email                 
        if(user){
            return res.status(400).json({error:"Sorry User is already Exists"});
        }
        const salt = await bcrypt.genSalt(10);          //Getting salt
        secPass = await bcrypt.hash(req.body.password,salt)    //hashing password with salt
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass                                    //storing hashed password
        })

        const Data = {                                           //Gathering data
            user:user.id
        }
        const authToken = jwt.sign(Data,JWT_SECRET);         //generate token and sign on token



        res.json({authToken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
    // .then(user => res.json(user))
    // .catch(err=>console.log(err))
})

module.exports = router