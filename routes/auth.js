const express =  require('express')
const router = express.Router()
const User = require('../models/User')
const {body,validationResult} = require('express-validator');

//create a user using : POST "/api/auth/". doesnt require auth

router.post('/',[
    body('email','Enter a valid Email').isEmail(),                            // This validation is done by express- validator
    body('name','Enter a valid Name').isLength({min:3}),
    body('password').isLength({min:8})
],(req,res)=>{                      //use post to hide data from
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    res.send(req.body);
})

module.exports = router