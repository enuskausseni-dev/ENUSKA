
const express = require("express");
const { error } = require("console");
const { success, date, email } = require("zod");
const { id } = require("zod/locales");
require("dotenv").config()
const app = express();


app.use(express.json())

// connexion a la bases de donnes
const connecteDB = require("./config/dbtodo")
connecteDB()

// const cors = require("cors")
// app.use(cors())
// importation de routes
const taches_routes = require("./src/routes/tache_route")
app.use(taches_routes)





app.use(express.static('public'))

app.listen(process.env.PORT || 5000, () =>{
   console.log("server demarrer")
})

