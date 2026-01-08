
//////////// Fetch ////////////


async function afficherWorks(works) {
  if (works === null){
       const response = await fetch ("http://localhost:5678/api/works")
      works = await response.json()
  }
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
      afficherWorks()
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





