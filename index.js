//App logic
const typeColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

//Pokemon Info tab
const pokedex = document.getElementById('pokedex')
const pokemonInfo = document.getElementById('pokemonInfo')
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokemonMoves = document.getElementById('pokemonMoves')
const pokemonMovesTable = document.getElementById('movesTable')
const pokemonLocations = document.getElementById('pokemonLocations')
const pokemonLocationsTable = document.getElementById('pokemonLocationTable')
const searchBtn = document.getElementById('searchBtn')
const searchPokemonInput = document.getElementById('searchPokemonInput')

const searchPokemon = event => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
    .catch(err => renderNotFound(err))
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1)
}

const renderPokemonData = data => {
  const sprite = data.sprites.front_default;
  const { stats, types, abilities } = data;
  pokeName.textContent = capitalize(data.name);
  pokeImg.setAttribute('src', sprite);
  pokeId.textContent = `Nº ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonAbilities(abilities)
  renderPokemonStats(stats);
}


const setCardColor = types => {
  const colorOne = typeColors[types[0].type.name];
  pokeImg.style.background = `${colorOne}`;
  pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
  pokeTypes.innerHTML = '';
  types.forEach(type => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = capitalize(type.type.name);
    pokeTypes.appendChild(typeTextElement);
  });
}

const renderPokemonAbilities = abilities => {
  pokeAbilities.innerHTML = '';
  abilities.forEach(ability => {
    const abilityTextElement = document.createElement("div");
    abilityTextElement.textContent = capitalize(ability.ability.name);
    if (ability.is_hidden) {
      console.log("IS HIDDEN")
      abilityTextElement.textContent += "(!)"
    }
    pokeAbilities.appendChild(abilityTextElement);
  });
  pokeAbilities.style.display = "block"
} 

const renderPokemonStats = stats => {
  pokeStats.innerHTML = '';
  let sumStats = 0
  stats.forEach(stat => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = capitalize(stat.stat.name);
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
    sumStats += stat.base_stat
  })
  let statElement = document.createElement("div");
  let statElementName = document.createElement("div");
  let statElementAmount = document.createElement("div");
  statElementName.textContent = "Total";
  statElementAmount.textContent = sumStats;
  statElement.appendChild(statElementName);
  statElement.appendChild(statElementAmount);
  pokeStats.appendChild(statElement);
}

const renderNotFound = (err) => {
  console.log(err)
  pokeName.textContent = 'No encontrado';
  pokeImg.setAttribute('src', 'poke-shadow.png');
  pokeImg.style.background =  '#fff';
  pokeTypes.innerHTML = '';
  pokeStats.innerHTML = '';
  pokeId.textContent = '';
}