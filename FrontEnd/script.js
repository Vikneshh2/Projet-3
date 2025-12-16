// let button = document.createElement("button")
// button.innerText = Tous

// let body = document.querySelector("body")
// body.appendChild(button)

let html = `
    <nav class="buttons-container">
			<ul class="buttons-filtre">
				<li><button class="button-change">Tous</button></li>
				<li><button class="button-change">Objets</button></li>
				<li><button class="button-change">Appartements</button></li>
				<li><button class="button-change" >Hotels & restaurants</button></li>
			</ul>
		</nav>
`
document.getElementById("filtres").innerHTML = html;
