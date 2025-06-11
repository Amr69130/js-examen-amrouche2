import "./style.css";

// On declare une class Animal
class Animal {
  constructor(name, description, category, image) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.image = image;
  }
}

// On crée un tableau d'instances de la class Animal
let animals = [
  new Animal(
    "Girafe",
    "La girafe est un mammifère ruminant africain",
    "terrestre",
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg"
  ),
  new Animal(
    "Méduse",
    "La méduse est un animal marin gélatineux",
    "marin",
    "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=600"
  ),
  new Animal(
    "Aigle",
    "L'aigle est un rapace diurne",
    "volant",
    "https://images.unsplash.com/photo-1557401620-67270b61ea82?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlnbGUlMjB2b2xhbnR8ZW58MHx8MHx8fDA%3D"
  ),

  new Animal(
    "Éléphant",
    "L'éléphant est le plus grand mammifère terrestre vivant.",
    "terrestre",
    "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg"
  ),

  new Animal(
    "Dauphin",
    "Le dauphin est un mammifère marin très intelligent.",
    "marin",
    "https://media.istockphoto.com/id/182481157/fr/photo/dauphins-bondissants.jpg?s=2048x2048&w=is&k=20&c=3DDOiSECcOCNcWIcyjdbvUl0jDeWB2ZsEBnokwzpaRg="
  ),

  new Animal(
    "Perroquet",
    "Le perroquet est un oiseau coloré connu pour imiter les sons.",
    "volant",
    "https://media.istockphoto.com/id/1873605186/fr/photo/un-ara-%C3%A9carlate.jpg?s=2048x2048&w=is&k=20&c=s2rCl49-XxbrSbUY5dRJoGLH7vYAmSuBfy2yj7O2UiY="
  ),
  new Animal(
    "Tigre",
    "Le tigre est un félin carnivore au pelage rayé.",
    "terrestre",
    "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg"
  ),

  new Animal(
    "Requin",
    "Le requin est un prédateur marin aux multiples espèces.",
    "marin",
    "https://media.istockphoto.com/id/533130811/fr/photo/grand-requin-blanc-sourire.jpg?s=2048x2048&w=is&k=20&c=6xGkK6fwyDnB3ywvml3Fr9ym_DgoPREsuqDya4-VOXk="
  ),

  new Animal(
    "Chauve-souris",
    "La chauve-souris est un mammifère volant nocturne.",
    "volant",
    "https://media.istockphoto.com/id/1365008587/fr/photo/renard-volant-%C3%A0-t%C3%AAte-grise-daustralie.jpg?s=2048x2048&w=is&k=20&c=TLX2KtHGs54GSfuDcCrmhSxvXYvQRStl6nQ3osB4K5o="
  ),
];

// On log le tableau en console
console.log(animals);

// On crée une fonction pour afficher les animaux dans le DOM
function displayAnimals(animalList = animals) {
  const container = document.querySelector("#animals");
  container.innerHTML = "";

  animalList.forEach((animal) => {
    const card = document.createElement("div");
    card.className = "card p-4 border rounded shadow mb-4";

    card.innerHTML = `
      <h2 class="text-xl font-bold">${animal.name}</h2>
      <p class="italic">${animal.category}</p>
      <p>${animal.description}</p>
      <img src="${animal.image}" alt="${animal.name}" class="w-48 h-48 object-cover mt-2 rounded" />
    `;

    container.appendChild(card);
  });
}

// On appelle la function pour afficher tous les animaux en 1er lieu
displayAnimals();

// On ajoute un filtre par catégories
let animalFilter = document.getElementById("animalFilter");

animalFilter.addEventListener("change", function () {
  const selectedCategory = animalFilter.value;

  let filteredAnimals =
    selectedCategory === ""
      ? animals
      : animals.filter((animal) => animal.category === selectedCategory);

  //on rappelle la function mais avec les animaux filtrés
  displayAnimals(filteredAnimals);
});

// On crée la possibilité d'ajouter un nouvel animal via un formulaire avec verification de la catégorie et validation
const animalForm = document.getElementById("animal_add_form");
const validCategories = ["terrestre", "marin", "volant"];

animalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let nameInput = document.getElementById("nameInput");
  let descriptionInput = document.getElementById("descriptionInput");
  let categoryInput = document.getElementById("categoryInput");
  let imageInput = document.getElementById("imageInput");

  const errorsDiv = document.getElementById("errors");

  if (!validCategories.includes(categoryInput.value)) {
    errorsDiv.textContent = `Catégorie inconnue : "${
      categoryInput.value
    }". VOUS DEVEZ CHOISIR PARMI CES 3 SEULEMENT : ${validCategories.join(
      ", "
    )}`;
    return;
  } else {
    errorsDiv.textContent = "";

    let newAnimal = new Animal(
      nameInput.value,
      descriptionInput.value,
      categoryInput.value,
      imageInput.value
    );

    animals.push(newAnimal);
    displayAnimals(animals);
    animalForm.reset();
  } // 👈🏽 cette accolade manquait
});
