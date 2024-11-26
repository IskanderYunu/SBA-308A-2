export const pokedex = {}; // {1 : {"name" : "pokemon", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

export async function fetchPokemon(num) {
  const url = `https://pokeapi.co/api/v2/pokemon/${num}`;
  const res = await fetch(url);
  const pokemon = await res.json();

  const pokemonName = pokemon["name"];
  const pokemonType = pokemon["types"];
  const pokemonImg = pokemon["sprites"]["front_default"];

  const speciesRes = await fetch(pokemon["species"]["url"]);
  const speciesData = await speciesRes.json();
  const pokemonDesc = speciesData["flavor_text_entries"][10]["flavor_text"];

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: pokemonDesc,
  };
}
