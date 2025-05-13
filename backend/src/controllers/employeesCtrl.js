//SOLO SELECT, DELETE Y UPDATE  
const employeesController = {};

import EmployeesModel from "../models/Employees.js";

//SELECT
employeesController.getEmployees = async (req, res) =>{
    const employees =await EmployeesModel.find()

    res.json(employees)
}

//DELETE
employeesController.deleteEmployees = async (req, res) =>{
    await EmployeesModel.findByIdAndDelete(req.params.id)

    res.json({message: "Product deleted"})
}

//UPDATE
employeesController.putEmployees = async (req, res) =>{
    const {name, email, password, telephone, address, role, hireDate, salary, status, isVerified} = req.body;
    const updateEmployees = await EmployeesModel.findByIdAndUpdate(req.params.id, {name, email, password, telephone, address, role, hireDate, salary, status, isVerified}, {new: true})

        res.json({message: "Employee updated successfully"})

};

export default employeesController;
