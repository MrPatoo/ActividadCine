import express from "express";
import registerClientsController from "../controllers/registerClientsCtrl.js";

const router = express.Router();

router.route("/").post(registerClientsController.register);
router.route("/verifyCodeEmail").post(registerClientsController.verificationCode);


export default router;