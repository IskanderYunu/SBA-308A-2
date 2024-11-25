// const requestOptions = {
//   method: "GET",
//   redirect: "follow",
// };

// fetch("https://pokeapi.co/api/v2/pokemon/pikachu", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

const pokemonCount = 151;
const pokedex = {}; //{1 : {"name" : "bulbasaur", "img": url, "type" : ["grass", "poison"], "desc" : "...."}}

window.onload = async function () {
  //getPokemon(1);
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    //<div id="1" class="pokemon-name">BULBASAUR</div>
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + "." + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemon);
  }

  console.log(pokedex);
};

async function getPokemon(num) {
  let url = `https://pokeapi.co/api/v2/pokemon/` + num.toString();

  let res = await fetch(url);
  let pokemon = await res.json();

  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  let pokemonImg = pokemon["sprites"]["front_default"];

  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();

  pokemonDesc = pokemonDesc["flavor_text_entries"][10]["flavor_text"];

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: pokemonDesc,
  };
}

function updatePokemon() {
  document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

  // Clear previous types
  let typesDiv = document.getElementById("pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }

  // Update Pokemon types
  let types = pokedex[this.id]["types"]; // Correct key "types"
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]); // Add background and font color
    typesDiv.append(type);
  }
}
