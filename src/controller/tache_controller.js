const tache_service = require("../services/tache_service")
const Liste = require("../model/todo_modele")

exports.create_task = async (req, res) =>{
    try{
        const tache = await tache_service.create_task(req.body)
        res.status(200).json(tache)
    } catch(error){
        console.error(error.message)
        console.error(error.stack)
        res.status(500).json({message : "erreur du serveur"})
        
    }
}

exports.get_tash = async (req, res) =>{
    try{
        const taches = await Liste.find()
        res.status(200).json(taches)
    } catch(error){
        res.status(500).json({erreur : "erreur du serveur"})
        console.error(error)
    }
}

// modifier une teche
exports.update_task = async (req, res) =>{
    try{
        const tache = await tache_service.update_task(req.params.id, req.body)
        res.status(200).json(tache)
    } catch(error){
        res.status(500).json({erreur : "erreur du serveur"})
        console.error(error)
    }
}

// supprimer une tache

exports.delete_task = async (req, res) =>{
    try{
        const tache = await tache_service.delete_task(req.params.id)
        res.status(200).json(tache)
    } catch(error){
        res.status(500).json({erreur : "erreur du serveur"})
        console.error(error)
    }
}