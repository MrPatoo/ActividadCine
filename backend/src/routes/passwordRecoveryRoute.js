import express from "express";
import passwordRecoveryController from "../controllers/passwordRecoveryCtrl.js";

const router = express.Router();

router.route("/requestCode").post(passwordRecoveryController.requestCode);//enviar código
router.route("/verifyCode").post(passwordRecoveryController.verfiedCode);//verificar código
router.route("/newPassword").post(passwordRecoveryController.newPassword);//poner nueva contraseña

export default router;
