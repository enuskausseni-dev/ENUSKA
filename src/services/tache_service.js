const Liste = require("../model/todo_modele")

//la creation de tache
async function create_task(data) {
    const tache = await Liste.create(data)
    return tache
}

//la modification de tache
async function update_task(id, new_data) {
    const tache = await Liste.findByIdAndUpdate(id, new_data, { returnDocument: "after" })
    return tache
}

async function delete_task(id) {
    const delete_task = await Liste.findByIdAndDelete(id)
    return delete_task
}

module.exports = {
    create_task,
    update_task,
    delete_task
}
