const express = require("express")
const {userModel} = require("../Model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

userRouter.post("/signup" , async(req,res)=>{
    const {email,name,password,age} = req.body
    const user = await userModel.findOne({email:email})
    if(user){
        res.status(200).send({msg:"User Already Exists. Please Login!"})
    }
    else{
        try {
            bcrypt.hash(password,5,async(err,hash)=>{
                const data = userModel({name,email,password:hash,age})
                await data.save()
                res.status(200).send({msg:"User Registered Successfuly!" , user:req.body})
            })
        } catch (error) {
            res.status(404).send({err:error})
        }
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email:email})
        if(user){
            bcrypt.compare(password , user.password , (err,result)=>{
                if(result){
                    const token = jwt.sign({employeeID:user._id , employeeName:user.name} , "employee",{

                        expiresIn:"7d"
                    })

                    res.status(200).send({msg:"Logged in successfully!" , token:token})
                }
                else{
                    res.status(404).send({msg:"Password incorrect!"})
                }
            })
        }
        else{
            res.status(404).send({msg:"Provide Proper Email Id!"})
        }
    } catch (error) {
        res.status(404).send({err:error})
    }
})

module.exports={userRouter}