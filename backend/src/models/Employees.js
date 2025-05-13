/*
name, email, password, telephone, address, role, hireDate, salary, status
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
    name:{
        type: String,
        require: true
    },

    email:{
        type: String,
        require: true,
        unique: true,
        match:[
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/,
            "Por favor ingrese un correo electronico valido", //validar el correo electronico
        ],
    },

    password:{
        type: String,
        require: true,
        minlenght: 6 //para poner un minimo de caracteres
    },

    telephone:{
        type: String,
        require: true,
        unique: true,
        //match: [/^[0-9]{8}$/, "el numero de teléfono tiene que ser válido"] //validar número de teléfono
    },

    address:{
        type: String,
        require: true,
    },

    role:{
        type: String,
        require: true,
    },

    hireDate:{
        type: Date,
        require: true,
        max:[new Date(), "No puede ser una fecha futura"] //validar que no pueda poner una fecha en el futuro
    },

    salary:{
        type: Number,
        require: true,
    },

    status:{
        type: Boolean,
        require: true
    },

    isVerified:{
        type: Boolean,
        require: true
    }
},
{
    //tabla auditoria PRO
    timestamps: true,
    strict: false
})

export default model("Employees", employeesSchema);