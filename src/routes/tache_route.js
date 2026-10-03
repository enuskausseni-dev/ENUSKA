const expresse = require("express") // module expresse
const tache_controle = require("../controller/tache_controller") // import controller
const {valider_tache} = require("../middlwares_validation/valider_tache") // import validation
const tache_schema = require("../zod/todo_zod")
const modifier_tache_schema = require("../zod/modifier_todo_zod")

// creation de routes 
const routes = expresse.Router()

routes.post("/taches", valider_tache(tache_schema), tache_controle.create_task) // route post pour crée
routes.get("/taches", tache_controle.get_tash)
routes.put("/taches/:id", valider_tache(modifier_tache_schema), tache_controle.update_task)
routes.delete("/taches/:id", tache_controle.delete_task)

module.exports = routes