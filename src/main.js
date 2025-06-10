import "./style.css";

//je crée un tableau d'objets animaux
let animals = [
  {
    name: "Girafe",
    description: "La girafe est un mammifère ruminant africain",
    category: "terrestre",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg",
  },
  {
    name: "Méduse",
    description: "La méduse est un animal marin gélatineux",
    category: "marin",
    image:
      "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Aigle",
    description: "L'aigle est un rapace diurne",
    category: "volant",
    image:
      "https://images.unsplash.com/photo-1557401620-67270b61ea82?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlnbGUlMjB2b2xhbnR8ZW58MHx8MHx8fDA%3D",
  },
];

// Affichage du tableau dans la console
console.log(animals);

// Fonction pour afficher les animaux dans le DOM
function displayAnimals(animalList = animals) {
  const container = document.querySelector("#animals");
  container.innerHTML = "";

  animalList.forEach((animal) => {
    const card = document.createElement("div");
    card.className = "p-4 border rounded shadow mb-4";

    //on reprend la strcture exemple de l'html et on lui insere les vraies valeurs à l'aide de ${} en entourant de backticks
    card.innerHTML = `
      <h2 class="text-xl font-bold">${animal.name}</h2>
      <p class="italic">${animal.category}</p>
      <p>${animal.description}</p>
      <img src="${animal.image}" alt="${animal.name}" class="w-48 h-48 object-cover mt-2 rounded" />
    `;

    container.appendChild(card);
  });
}

// Appel initial
displayAnimals();

// Ajout de l'écouteur pour filtrer les animaux par catégorie
let animalFilter = document.getElementById("animalFilter");

animalFilter.addEventListener("change", function (e) {
  const selectedCategory = animalFilter.value;

  let filteredAnimals = [];

  if (selectedCategory === "") {
    // Si aucune catégorie n'est sélectionnée, afficher tous les animaux
    filteredAnimals = animals;
  }
  // Sinon, filtrer les animaux par la catégorie sélectionnée (à l'ecoute du change)
  else {
    filteredAnimals = animals.filter(
      (animal) => animal.category === selectedCategory
    );
  }

  displayAnimals(filteredAnimals);
});

// Event listener SUBMIT sur le form
const animalForm = document.getElementById("animal_add_form");
//console.log(carForm);

//on  definit mes category valides
const validCategories = ["terrestre", "marin", "volant"];

animalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let nameInput = document.getElementById("nameInput");
  let descriptionInput = document.getElementById("descriptionInput");
  let categoryInput = document.getElementById("categoryInput");
  let imageInput = document.getElementById("imageInput");

  // ON vérifie si la catégorie est valide
  if (!validCategories.includes(categoryInput.value)) {
    alert(
      `Catégorie inconnue : "${
        categoryInput.value
      }". Veuillez choisir parmi : ${validCategories.join(", ")}`
    );
    return; // on empêche l'ajout si catégorie invalide
  }

  let newAnimal = {
    name: nameInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
    image: imageInput.value,
  };

  // on ajoute l'animal au tableau
  animals.push(newAnimal);
  // on Affich du tableau update
  displayAnimals(animals);
  //On remet à 0 le formulaire
  animalForm.reset();
});
