
//////////// Afficher les works ////////////

async function afficherWorks(works) {
  // Vérifie si les works sont chargés ou non, S'ils ne le sont pas alors on récupère depuis le backend 
  if (works === null){ //// null ≠ undefined ////
       const response = await fetch ("http://localhost:5678/api/works")
      works = await response.json()
  }

/////////// Reprise des travaux pour la page d'accueuil ////////////

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

/////////// Reprise des travaux pour la modale ////////////

  document.getElementById("container-photo").innerHTML = ""

  works.forEach(work => {
    const big_container = document.getElementById("container-photo")
    const container = document.createElement("div")
    container.className = "image-container"
    const icon = document.createElement ("i")
    icon.className = "fa-solid fa-trash-can"
    const img = document.createElement ("img")
    img.src = work.imageUrl
    img.alt = work.title
    container.append(img)
    container.append(icon)
    big_container.append(container)
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


//////////// Connexion ////////////

// Sélection des éléments
const loginLink = document.querySelector(".deconnecter") // login
const logoutLink = document.querySelector(".connecter") // logout
const editBanner = document.getElementById("edit-banner") // bandeau mode édition
const modifierBtn = document.getElementById("modifier") // bouton modifier
const filtres = document.getElementById("filtres") // filtres
const editButtons = document.querySelectorAll(".edit-btn button") // autres boutons d'édition

// Vérifier si l'utilisateur est connecté
const token = localStorage.getItem("token")

if (token) {
  // l'utilisateur est connecté
  console.log("Utilisateur connecté")

  // Afficher le mode édition
  editBanner.style.display = "flex"

  // Cacher les filtres
  if (filtres) filtres.style.display = "none"

  // Afficher le bouton Modifier
  if (modifierBtn) modifierBtn.style.display = "inline-flex"

  // Afficher tous les boutons d'édition
  editButtons.forEach(btn => btn.style.display = "inline-flex")

  // Cacher le lien login et afficher logout
  loginLink.style.display = "none"
  logoutLink.style.display = "inline"

  // Déconnexion
  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.reload()
  })

} else {
  // L'utilisateur est déconnecté
  console.log("Utilisateur non connecté")

  // Cacher le mode édition et le bouton modifier
  editBanner.style.display = "none"
  if (modifierBtn) modifierBtn.style.display = "none"

  // Afficher les filtres
  if (filtres) filtres.style.display = "flex"

  // Cacher les autres boutons d'édition
  editButtons.forEach(btn => btn.style.display = "none")

  // Afficher login et cacher logout
  loginLink.style.display = "inline"
  logoutLink.style.display = "none"
}


////////// Gestion de la modale /////////

var btn = document.getElementById ("modifier");

var modal = document.getElementsByClassName ("modal-container") [0];

var close = document.getElementsByClassName ("close-modal") [0];

var overlay = document.getElementsByClassName ("overlay")[0]; 

var ajouter = document.getElementsByClassName ("button-add-photo")[0];

var content1 = document.getElementById ("content1");

var content2 = document.getElementById ("content2");

var previous = document.getElementById ("previous")
/*Lorsqu'on récupère un élément via get, la fonction renvoie toujours une liste et donc en mettant le 0,
 on réccupère le premier élement de la liste */ 

btn.onclick = function() {
  modal.style.display = "block";
}

close.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == overlay) {
    modal.style.display = "none"
  }
}

ajouter.addEventListener("click",() => {
   console.log("Bouton ajouter")
   content1.style.display = "none"
   content2.style.display = "block"
   
  }

)

previous.addEventListener ("click",() => {
   console.log("Bouton précèdent")
   content1.style.display = "block"
   content2.style.display = "none"
   
  }

)

