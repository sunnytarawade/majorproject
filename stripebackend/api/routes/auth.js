const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const UserSchema = require('../models/auth')

router.post('/signin',(req,res,next)=>{
    const email = req.body.email
    const password = req.body.password

    UserSchema.find({email}).exec()
    .then(users=>{
        if(users.length ===0 ){
            res.status(501).json({
                err : "error"
            })
        }
        
        const user = users[0]

        bcrypt.compare(user.password,password,(err,result)=>{
            if(err){
                res.status(501).json({
                    err
                })
            }
            if(result){
                const token = jwt.sign({
                email },
                   
              "secretkey", 
              {
                expiresIn: "1h"
              })
              res.status(200).json({
                message: "Auth successful",
                token: token
              });
            }
        })
    })             
    .catch(err=>{
        res.json({
            err
        })
    })
    

})

router.post('/signup',async (req,res,next)=>{

    const email = req.body.email
    const password = req.body.password

    try{
        const hashedPassword = await bcrypt.hash(password,10)
        console.log(hashedPassword)
        const user = new UserSchema({
            email,
            password : hashedPassword
        })
    


        UserSchema.find({email}).exec().then(result => {
            console.log(result)
            if(result[0].email === email)
            {
                res.status(501).json({
                    error : "email already exists"
                })
            }
        }).catch(err => {
            user.save().then(result => {
    
                res.status(200).json({
                    message : result
                })
        
            }).catch(err=>{
                res.status(500).json({
                    error : err
                })
            })
        })
        
    }catch(err){
        res.status(504).json({
            error : err
        })
    }
    



})

module.exports = router;
