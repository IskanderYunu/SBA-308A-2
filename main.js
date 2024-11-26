import { pokedex, fetchPokemon } from "./pokemonService.js";
import { clearElement, createTypeBox } from "./utils.js";

const pokemonCount = 150;
// get Pokemon List
window.onload = async function () {
  const pokemonList = document.getElementById("pokemon-list");
  const pokemonDescription = document.getElementById("pokemon-description");

  for (let i = 1; i <= pokemonCount; i++) {
    await fetchPokemon(i);

    const pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = `${i}. ${pokedex[i]["name"].toUpperCase()}`;
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    pokemonList.append(pokemon);
  }

  pokemonDescription.innerText = pokedex[1]["desc"];
};

//Update Types
function updatePokemon() {
  const pokemonImg = document.getElementById("pokemon-img");
  const pokemonTypes = document.getElementById("pokemon-types");
  const pokemonDescription = document.getElementById("pokemon-description");

  const currentPokemon = pokedex[this.id];
  pokemonImg.src = currentPokemon["img"];
  clearElement(pokemonTypes);

  currentPokemon["types"].forEach((type) => {
    const typeBox = createTypeBox(type["type"]["name"]);
    pokemonTypes.append(typeBox);
  });

  pokemonDescription.innerText = currentPokemon["desc"];
}
