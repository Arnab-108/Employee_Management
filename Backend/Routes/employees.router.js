const express = require("express")
const {employeeModel} = require("../Model/employee.model")

const employeeRouter = express.Router()

employeeRouter.post("/add" , async(req,res)=>{
    try {
        const data = employeeModel(req.body)
        await data.save()
        res.status(200).send({msg:"Employee Details Successfully Added!" , user:req.body})
    } catch (error) {
        res.status(404).send({err:error})
    }
})

employeeRouter.get("/",async(req,res)=>{
    const {department , orderby} = req.query
    const query={}
    if(department){
        query.department={$in:department}
    }

    let sortObj={}
    if(orderby==="acs"){
        sortObj.salary=1
    }
    else if(orderby==="desc"){
        sortObj.salary=-1
    }
    try {
        const data = await employeeModel.find(query).sort(sortObj)
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({err:error})
    }
})

employeeRouter.get("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const data = await employeeModel.find({_id:id})
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({err:error})
    }
})

employeeRouter.patch("/:id", async(req,res)=>{
    const {id} = req.params
    try {
        await employeeModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({msg:`Successfully updated the ${id}!`})
    } catch (error) {
        res.status(404).send({err:error})
    }
})

employeeRouter.delete("/:id" , async(req,res)=>{
    const {id} = req.params
    try {
        await employeeModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:`Successfully deleted the ${id}!`})
    } catch (error) {
        res.status(404).send({err:error})
    }
})
module.exports={employeeRouter}