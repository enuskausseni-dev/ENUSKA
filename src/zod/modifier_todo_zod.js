const {z} = require("zod")

// validation zod pour la modification d'une tâche
const modifier_tache_schema = z.object({
    titre: z.string().min(2).optional(),
    tache: z.string().min(1).optional()
})

module.exports = modifier_tache_schema