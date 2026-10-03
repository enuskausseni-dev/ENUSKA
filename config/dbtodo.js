const mongoose = require("mongoose")

async function connecteDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URL,)
        console.log("mongoDB connecté")
    }catch(error){
        console.error("Erreur de connexion :", error)
    }
}

module.exports = connecteDB;