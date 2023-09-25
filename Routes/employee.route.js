const express=require('express');


const {EmployeeModel}=require("../Models/employee.model");
const { Authorization } = require("../Middleware/Authorization.middleware");

const employeeRouter= express.Router();
employeeRouter.use(Authorization)

employeeRouter.get("/",async(req,res)=>{

    try {
        const findAll= await EmployeeModel.find()
    if(findAll){
        res.json({employees:findAll})
    }else{
        res.json({msg:"something went wrong"})
    }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

employeeRouter.post("/add", async(req,res)=>{
    console.log(req.body)
    try {
        const emp=new EmployeeModel(req.body);
        await emp.save();
        res.json({msg:"successfully emp created"},emp)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

employeeRouter.patch("/update?:id", async(req,res)=>{
    const {id}=req.params
    const {firstName,lastName,email,department,salary}=req.body

    const updateQuery = {}
    if(firstName){
        updateQuery.firstName=firstName
    }
    if(lastName){
        updateQuery.lastName=lastName
    }
    if(email){
        updateQuery.email=email
    }
    if(department){
        updateQuery.department=department
    }
    if(salary){
        updateQuery.salary=salary
    }
    try {
        const updateEmp=await EmployeeModel.findOneAndUpdate({_id:id},updateQuery)
        if(updateEmp){
            res.json({msg:"employee updated"})
        }else{
            res.json({msg:"something went wrong"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


employeeRouter.delete("/delete/:id",async(req,res)=>{
    const {id}= req.params

    try {
        const deletedEmp=await EmployeeModel.findOneAndDelete({_id:id})
        if(deletedEmp){
            res.json({msg:"employee deleted successfully"})
        }else{
            res.json({msg:"something went wrong"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports={employeeRouter}
