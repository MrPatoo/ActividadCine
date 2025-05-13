import moviesModel from "../models/Movies.js"
import {v2 as cloudinary} from "cloudinary"
import { config } from "../config.js"

//1. configurar cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const moviesController = {};

//Seleccionar
moviesController.getMovies = async(req, res)=>{
    const movies = await moviesModel.find()
    res.json(movies)
}

//Guardar
moviesController.postMovies = async (req, res)=>{
    try {
        const{title, description, director, genre, year, duration} = req.body;
        let imageUrl = ""

        if(req.file){
            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "public",
                    allowed_formats: ["jpg", "png", "jpeg"]
                }
            )
            imageUrl= result.secure_url
        }

        const newMovie = new moviesModel({title, description, director, genre, year, duration, image: imageUrl});
        newMovie.save();

        res.json({message: "movie saved"});

    } catch (error) {
        console.log("error"+ error);
    }
}

//Eliminar
moviesController.deleteMovies =async(req, res) =>{
    await moviesModel.findByIdAndDelete(req.param.id)

    res.json({message: "Movie deleted"})
}

//Actualizar
moviesController.putMovies = async(req, res) =>{
    const{title, description, director, genre, year, duration, image}=req.body
    const updateMovie = await moviesModel.findByIdAndUpdate(req.params.id, {title, description, director, genre, year, duration, image: imageUrl}, {new: true})

    res.json({message: "Movie updated successfully"})
}

export default moviesController;