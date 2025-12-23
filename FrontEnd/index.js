
//////////// Fetch ////////////


async function afficherCategories() {
  const response = await fetch ("http://localhost:5678/api/categories")
  const categories = await response.json()

    const button = document.createElement ("button")
    button.textContent = "Tous"
    button.addEventListener("click", function(){
    })
    const filtres = document.getElementById ("filtres")
    filtres.appendChild(button)

  categories.forEach(categorie => {
    const button = document.createElement ("button")
    button.textContent = categorie.name
    button.addEventListener("click", function() {
    })
    filtres.appendChild(button)
    
  })

  console.log(categories)
}
afficherCategories()


async function afficherWorks() {
  const response = await fetch ("http://localhost:5678/api/works")
  const works = await response.json()

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
    
  }); 

  console.log(works)
}
afficherWorks()


