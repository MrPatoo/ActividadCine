import EmployeesModel from "../models/Employees.js";    
import bcryptjs from "bcryptjs" //para encriptar
import  Jsonwebtoken  from "jsonwebtoken"; //para generar token
import { config } from "../config.js";

const registerEmployeesController ={};

registerEmployeesController.register = async (req, res) =>{
    const {name, email, password, telephone, address, role, hireDate, salary, status, isVerified} = req.body
    
    try{
        //verificamos si el empleado ya existe
        const existEmployee=await EmployeesModel.findOne({email})
        
        if(existEmployee){
            return res.json({message: "El empleado ya existe"})
        }

        
        //encriptar
        const passwordHash = await bcryptjs.hash(password, 10)

        //guardamos el empleado nuevo                                                                    
        const newEmployee = new EmployeesModel({name, email, password: passwordHash, telephone, address, role, hireDate, salary, status, isVerified})
        await newEmployee.save();


        //-->TOKEN<-------------------------------------------------------------------------------------
        
        Jsonwebtoken.sign(
            //1-que voy a guardar
            {id: newEmployee._id},

            //2-secreto
            config.JWT.secret,

            //3-cuando expira
            {expiresIn: config.JWT.expiresIn},

            //4-funcion flecha que espera el error o el token
            (error, token) =>{
                if(error) console.log(error)
                    res.cookie("authToken", token)
                    res.json({message: "Empleado registrado :D"})
            }

        )

    }catch(error){
        console.log(error);
    }
}

export default registerEmployeesController;