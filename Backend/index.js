const express = require("express")
const cors = require("cors")
const {connectionn} = require("./db")
const {userRouter} = require("./Routes/user.route")
const {employeeRouter} = require("./Routes/employees.router")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

app.use("/user" , userRouter)
app.use("/employee" , employeeRouter)
app.listen(8080,async()=>{
    try {
        await connectionn
        console.log("Connected to DB")
        console.log("Running at 8080")
    } catch (error) {
        console.log(error)
        console.log("Something went wrong!")
    }
    
})
