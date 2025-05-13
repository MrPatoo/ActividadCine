import express from "express";
import clientsController from "../controllers/clientsCtrl.js";

const router = express.Router();

router.route("/")
.get(clientsController.getClients)

router.route("/:id")
.put(clientsController.putClients)
.delete(clientsController.deleteClients )

export default router;

