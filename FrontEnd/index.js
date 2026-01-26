
//////////// Fetch ////////////

async function afficherWorks(works) {
  // Vérifie si les works sont chargés ou non, S'ils ne le sont pas alors on récupère depuis le backend 
  if (works === null){ //// null ≠ undefined ////
       const response = await fetch ("http://localhost:5678/api/works")
      works = await response.json()
  }
  // Vide la galerie avant de pouvoir à nouveau remettre des éléments. Au cas contraire ils ajouteraient sans supprimer le reste 
  document.getElementById("gallery").innerHTML = ""

  works.forEach(work => {
    const figure = document.createElement("figure")
    const img = document.createElement ("img")
    img.src = work.imageUrl
    const figcaption = document.createElement ("figcaption")
    figcaption.textContent = work.title
    const gallery = document.getElementById("gallery")
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
    
  }) 

  console.log(works)
}
afficherWorks(null)


async function afficherCategories() {
  const response = await fetch ("http://localhost:5678/api/categories")
  const categories = await response.json()

    const buttonTous = document.createElement ("button")
    buttonTous.textContent = "Tous"
    const filtres = document.getElementById ("filtres")
    filtres.appendChild(buttonTous)
    buttonTous.addEventListener("click",async function(){
      afficherWorks(null)
      console.log("Clique sur Tous")
    })
  categories.forEach(categorie => {
    const button = document.createElement ("button")
    button.textContent = categorie.name
    filtres.appendChild(button)
    button.addEventListener("click", async function (){
        const response = await fetch ("http://localhost:5678/api/works")
        const works = await response.json()
      const worksFiltres = works.filter(
        work => work.category.name === categorie.name
      )
      console.log(categorie.name)
      afficherWorks(worksFiltres)
      console.log(worksFiltres)
      console.log("Clique sur Catégorie:")
    })
  })

  console.log(categories)
}

afficherCategories()



let deconnecter = document.getElementsByClassName ("deconnecter")
let connecter = document.getElementsByClassName ("connecter")

function init() {
  let token = localStorage.getItem ("token")
  if (token == null) {
    for (let utilisateur_connecter of connecter) {
      utilisateur_connecter.style.display = "none"
      console.log("L'utilisateur est connecté")
    }
  }
  else {
        for (let utilisateur_deconnecter of deconnecter) {
      utilisateur_deconnecter.style.display = "none"
      console.log("L'utilisateur est déconnecté")
    }
  }
}


init()

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll (".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener ("click", toggleModal))

function toggleModal () {
  modalContainer.classList.toggle("active")
}