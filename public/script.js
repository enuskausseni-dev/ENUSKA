
setTimeout(() =>{
    document.getElementById("splash-screen").style.display = "none";
    document.getElementById("app").style.display = "block"
}, 1500)
// variables globals pour stocker les tache
let tous_les_taches = []


// recuperation des elements Html
const titre = document.getElementById("title")
const texte = document.getElementById("task")
const add_task_btn = document.getElementById("add_task")

const erreur = document.getElementById("error")
// liste
const listes_de_tache = document.getElementById("task_listes")

add_task_btn.addEventListener("click", async () =>{
    const reponse = await fetch("/taches",{
        method:"POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            titre : titre.value,
            tache : texte.value
        })
    })

    const data = await reponse.json()
    if(!reponse.ok){
        erreur.textContent = data.error[0].message;
        return
    }

    erreur.textContent = ""

    if(reponse.ok){
        titre.value = "";
        texte.value = "";

        titre.focus()
    }
    display_todos()
    console.log(data)
})

// fonction pour afficher la liste
async function display_todos(todos = null) {
    try{
        //recuperer les données dépuis backend²
        if(!todos){
            const reponse = await fetch("/taches");
            if(!reponse.ok) throw new Error("Erreur réseau");
            todos = await reponse.json()

            tous_les_taches = todos

        }

        //vider le contenaire pour eviter le doublons
        listes_de_tache.innerHTML = ""

        //afficher un message si aucun tache n'est trouvé
        if(todos.length === 0){
            listes_de_tache.innerHTML = "<p>Aucune tache pour le moment</p>"
            return
        }

        todos.forEach(todo =>{
            const carte_tache = document.createElement("div")
            carte_tache.className = "tache";
            carte_tache.dataset.id = todo._id
            carte_tache.dataset.titre = todo.titre
            carte_tache.dataset.tache = todo.tache

            carte_tache.innerHTML = `
            <span class = "titre">${todo.titre}</span>
            <span class = "contenue">${todo.tache}</span>
            <div class="btn_div">
                <button class="edit_btn">modifier</button>
                <button class="delete_btn">supprimer</button>
            </div>`

            listes_de_tache.appendChild(carte_tache)
        })

    } catch(error){
        console.error(`Erreur lors du chargement de la page :`, error)
        listes_de_tache.innerHTML = "<p>impossible de charger la tache</p>"
    }
}

function attachTodeEvents(){
    listes_de_tache.addEventListener("click", (e) => {
        const carte = e.target.closest(".tache")
        if(!carte) return

        const id = carte.dataset.id
        const nouveau_donnees = {
            titre : carte.dataset.titre,
            tache : carte.dataset.tache
        }

        if(e.target.classList.contains("delete_btn")){
            deleteTodo(id)
        }else if(e.target.classList.contains("edit_btn")){
            editTode(id, nouveau_donnees)
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    display_todos(),
    attachTodeEvents()
})


// fonction pour supprimer un taches

async function deleteTodo(id) {
    const cofirm_la_suppression = confirm("Es tu sur de vouloir supprimer cette tache")
    if(!cofirm_la_suppression) return

    try{
        const response = await fetch(`/taches/${id}`, {
            method : "DELETE"
        })

        if(!response.ok) throw new Error("Erreur lors de la suppression")
        
        display_todos()
    } catch(error){
        console.log(error)
        alert("impossible de supprimer la tache")
    }
}

async function editTode(id, nouveau_donnees){

    const nouveau_titre = prompt("Modifier le titre", nouveau_donnees.titre)
    const nouvelle_tache = prompt("Modifier la tache", nouveau_donnees.tache)
    try{
        const response = await fetch(`/taches/${id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                titre : nouveau_titre.trim(),
                tache : nouvelle_tache.trim()
            })
        })

        if(!response.ok) throw new Error("Erreur lors de la mise en jours")
        
        display_todos()
    } catch(error){
        console.error(error)
        alert("Impossible de mettre a jour la tache")
    }
}


// la fonctionalité recherche

// variable pour stocker le texte de la recherche
let texte_recherche = ""
function cherche_tache(){
    const input = document.getElementById("search_input")
    texte_recherche = input.value.toLowerCase().trim()

    if(texte_recherche === ""){
        display_todos()
    }else{
        const filtre_tache = tous_les_taches.filter(tache =>(
            tache.titre.toLowerCase().includes(texte_recherche)
        ))

        display_todos(filtre_tache)
    }
}

// enregistrment de service worker

if("ServiceWorker" in navigator){
    window.addEventListener("load", () =>{
        navigator.serviceWorker.register("/service-worker.js")
        .then((registration) =>{
            console.log("Service worker enregistré avec succès:", registration.scope)
        })
        .catch((error) =>{
            console.error("Erreur lors de l'enregistrement du service worker:", error)
        })
})}

