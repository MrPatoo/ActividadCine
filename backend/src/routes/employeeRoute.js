import express from "express";
import employeesController from "../controllers/employeesCtrl.js";

const router = express.Router();

router.route("/")
.get(employeesController.getEmployees)

router.route("/:id")
.put(employeesController.putEmployees)
.delete(employeesController.deleteEmployees)

export default router;