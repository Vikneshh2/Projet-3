async function afficherCategories() {
  const response = await fetch ("http://localhost:5678/api/categories")
  const categories = await response.json()
  console.log(categories)
}

async function afficherWorks() {
  const response = await fetch ("http://localhost:5678/api/works")
  const works = await response.json()
  console.log(works)
}