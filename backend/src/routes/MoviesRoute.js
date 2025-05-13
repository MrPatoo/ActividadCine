import moviesController from "../controllers/MoviesCtrl.js"
import express from "express"
import multer from "multer";

const router = express.Router()

//confugurar una carpeta global que guarde las imagenes
const upload = multer({dest: "public/"})

router.route("/")
.get(moviesController.getMovies)
.post(upload.single("image"), moviesController.postMovies)

export default router;