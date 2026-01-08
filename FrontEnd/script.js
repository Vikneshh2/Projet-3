// const form = document.getElementById ("contact")
// form.addEventListener("submit", async function (event) {
//   event.preventDefault()
//   const email = document.getElementById("email").value
//   const password = document.getElementById("password").value
//   try {
//     const response = await fetch("http://localhost:5678/api/users/login") 
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//   body: JSON.stringify({
//     email: email,
//     password: password
//   })
// })
//   if (!response.ok) {
//     console.log("Identifiants incorrects")
//     return
//   }

//    const data = await response.json()
//     localStorage.setItem("token", data.token)
//     window.location.href = "login.html"
//   }catch(error){
//     console.log("Erreur serveur",error)
//   } 

// })



const form = document.getElementById("login-form")

form.addEventListener("submit", async function (event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    if (!response.ok) {
      console.log("Identifiants incorrects")
      return
    }

    const data = await response.json()

    localStorage.setItem("token", data.token)

    window.location.href = "login.html"

  } catch (error) {
    console.log("Erreur serveur", error)
  }
})

