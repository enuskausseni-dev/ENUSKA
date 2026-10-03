const mongoose = require("mongoose")
const { required } = require("zod/mini")

// creation du modele
const liste_modele = new mongoose.Schema({
    titre : {
        type : String,
        required : true
    },
    tache : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Liste", liste_modele)