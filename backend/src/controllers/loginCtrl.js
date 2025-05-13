//importamos las tablas de los usuarios
import clientsModel from "../models/Clients.js";
import employeesModel from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        
        let userFound; //esta variable es para guardar el usuario encontrado.
        let userType; //esta variable es para guardar el tipo de usuario.

        //1. ADMIN
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "admin",
            userFound = {_id: "email"}
        }else{
            //2. EMPLEADO
            userFound = await employeesModel.findOne({email})
            userType = "employee"
            
            //3. CLIENTE
            if(!userFound){
                userFound = await clientsModel.findOne({email})
                userType = "client"
            }
        }

        //esto es para mostrar si no se encontro un usuario
        if(!userFound){
            console.log("No se encontró el usuario");
            return res.json({message: "User not found"});
        }

        //validar la contraseña
        //solo si no es admin
        if(userType !== "admin"){
            //veamos si la contraseña que se esta escribiendo en el login es la misma que la que esta en la base de datos
            const isMatch = await bcrypt.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "Contraseña incorrecta"})
            }
            
           }

           //--> TOKEN <--
           jsonwebtoken.sign(
            //1. lo que voy a guardar
            {id: userFound._id, userType},

            //2: secreto
            config.JWT.secret,
            
            //3. cuando expira
            {expiresIn: config.JWT.expiresIn},

            //4. funcion flecha
            (error, token) =>{
                if(error) console.log(error)

                    res.cookie("authToken", token)
                    res.json({message: "login successful"})
            }
           )
        


    } catch (error) {
        res.json({message: "error"})
    }
}

export default loginController;