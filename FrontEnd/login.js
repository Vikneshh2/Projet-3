
///////////// Login /////////////

const form = document.getElementById("login-form")
const errorMessage = document.getElementById("error-message")
form.addEventListener("submit", async function(event) {
event.preventDefault() // Empêche l'actualisation de page à chaque connexion
  errorMessage.style.display = "none" // Fait en sorte que le message d'erreur soit caché de base
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

// Essaie d'envoyer l'email et le mot de passe pour se connecter
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }) // JSON.stringify est une méthode qui convertit une valeur JavaScript en chaîne JSON
    })


    if (!response.ok) {
      // Affiche un message si identifiants incorrects
      errorMessage.textContent = "Email ou mot de passe incorrect"
      errorMessage.style.display = "block"
      return
    }

    // Ici on récupère le token
    const data = await response.json()
    localStorage.setItem("token", data.token)
    window.location.href = "index.html"

  } catch (error) {
    console.error("Erreur serveur", error)
    errorMessage.textContent = "Impossible de se connecter au serveur"
    errorMessage.style.display = "block"
  }
})

