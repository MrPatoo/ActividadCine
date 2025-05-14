//SOLO SELECT , DELETE Y UPDATE
const clientsController = {};

import clientsModel from "../models/Clients.js";

//SELECT
clientsController.getClients = async(req, res) =>{
    const clients = await clientsModel.find();

    res.json(clients)
}

//DELETE
clientsController.deleteClients = async(req,res) =>{
    await clientsModel.findByIdAndDelete(req.params.id)

    res.json({message: "Client deleted"})
}

//UPDATE
clientsController.putClients = async(req, res)=>{
    const{name, email, password,telephone, address, status, isVerified } = req.body;
    const updateClients = await clientsModel.findByIdAndUpdate(req.params.id, {name, email, password,telephone, address, status, isVerified}, {new: true})

    res.json({message: "Client updated successfully"})
}

export default clientsController;