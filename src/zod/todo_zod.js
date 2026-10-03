const {z} = require("zod")

// validation zoz
const liste_schema = z.object({
    titre : z.string().min(3, "le titre doit avoir au moins 3 caracteres"),
    tache : z.string()
})

module.exports = liste_schema
