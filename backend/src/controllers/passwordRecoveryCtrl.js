import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientsModel from "../models/Clients.js";
import employeeModel from "../models/Employees.js";

import { config } from "../config.js";
import { sendMail, HTMLRecoveryEmail } from "../utils/MailPasswordRecovery.js";
import { verify } from "crypto";


const passwordRecoveryController = {};

//ENVIAR CODIGO--------------------------------------------------------------------------------------
passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    //Buscar los correos
    userFound = await clientsModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeeModel.findOne({ email });
      if (userFound) {
        userType = "employee";
      }
    }
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Generar un código aleatorio
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    //Crear un token que guarde todo
    const token = jsonwebtoken.sign(
      { email, code, userType, verfied: false },

      config.JWT.secret,

      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    // ULTIMO PASO, enviar el correo
    await sendMail(
      email,
      "Password recovery code", //Asunto
      `Your verification code is: ${code}`, //Texto
      HTMLRecoveryEmail(code) //
    );

    res.json({ message: "Verification code send" });
  } catch (error) {}
};


//VERIFICAR CODIGO----------------------------------------------------------------------------------------
passwordRecoveryController.verfiedCode = async(req, res)=>{
    //pedir codigo
    const {code} = req.body;

    try {
        //extraer el token de las cookies
        const token = req.cookies.tokenRecoveryCode;
        
        //decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        //verificar si el token es el mismoque esta guardado
        if(decoded.code !== code){
            return res.json({message: "Invalid Code"})
        }

        //generamos un nuevo token
        const newToken = jsonwebtoken.sign(
            {
                //lo que vamos a guardar
                email: decoded.email,
                code: decoded.code,
                userType: decoded.userType,
                verify: true
            },

            //secreto
            config.JWT.secret,

            //expira
            {expiresIn: "20m"}

        )

        res.cookie("tokenRecoveryCode", newToken, {maxAge:20*60*1000})

        res.json({message: "Code verified successfully"})



    } catch (error) {
        console.log("error: "+ error)
    }

}

//CAMBIAR LA CONTRASEÑA--------------------------------------------------------------------------------
passwordRecoveryController.newPassword = async(req, res)=>{
    const {newPassword} = req.body;
    try {
        //extraer el token de las cookies
        const token = req.cookies.tokenRecoveryCode;

        //desglozar lo que tiene el codigo adentro ----- espera el token y el secreto
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        //accedemos a la variable verified para ver qu valor tiene
        if(!decoded.verify){
            return res.json({message: "Code no verified"})
        }

        //extraer el correo y tipo de usuario
        const {email, userType} = decoded;

        let user;

        //buscamos al usuario dependiendo del userType
        if(userType === "clients"){
            user = await clientsModel.findOne ({email})

        }else if(userType === "employees"){
            user = await employeeModel.findOne ({email})

        }

        const hashPassword = await bcryptjs.hash(newPassword, 10)

        //actualizar la contraseña
        let updateUser;
        if(userType === "clients"){
            updateUser= await clientsModel.findByIdAndUpdate(
                {email},
                {password: hashPassword}, 
                {new: true}
            )
        }else if(userType === "employees"){
            updateUser= await employeeModel.findByIdAndUpdate(
            {email},
            {password: hashPassword},
            {new: true}
            )

        }

        res.clearCookie("tokenRecoveryCode");
        res.json({message: "Password updated successfully"});
        
    } catch (error) {
        console.log("error here: "+ error)
    }

}


export default passwordRecoveryController;