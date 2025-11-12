const mongoose = require("mongoose");

const recetteSchema = mongoose.Schema({
    titre:String,
    url:String,
    type:String,
});

const Recette = mongoose.model("recettes", recetteSchema);

module.exports = Recette;