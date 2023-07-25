/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const pokemonRepository = (() => {
  const pokemonList = [];
  const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  const pokemonListContainer = document.querySelector('.pokemon-list'); // selecting div from html
  const searchInput = document.querySelector('.form-control');

  async function fetchPokemonDetails(pokemon) {
    const url = pokemon.detailsUrl;
    try {
      const response = await fetch(url); // gets a promise from detailsUrl
      const details = await response.json(); // turns the response into a json called details
      pokemon.height = details.height;
      pokemon.frontImgUrl = details.sprites.front_default;
      pokemon.backImgUrl = details.sprites.back_default;

      const pokemonTypeList = [];

      details.types.forEach((item) => {
        // iterating over the details.types
        pokemonTypeList.push(item.type.name); // pushing the items into pokemonTypeList
      });
      pokemon.types = pokemonTypeList.join(', ');
    } catch (e) {
      console.error(e);
    }
  }

  function addPokemon(pokemon) {
    // function grabs the pokemonapi
    if (
      typeof pokemon === 'object' &&
      Object.keys(pokemon).includes('name') &&
      Object.keys(pokemon).includes('detailsUrl')
    ) {
      pokemonList.push(pokemon); // if so push pokemon to the pokemonList array
    } else {
      console.error(
        'Pokémon has to be added using this format: {name:, detailsUrl:}'
      );
    }
  }

  function showLoadingMessage() {
    const loadingMessage = document.createElement('div'); // this is creating an element 'p'
    loadingMessage.classList.add('loading-message'); // creates a classlist. call => '.loading-message'

    const searchForm = document.querySelector('.form-inline');
    const { parentNode } = searchForm;

    parentNode.insertBefore(loadingMessage, searchForm);
  }

  function hideLoadingMessage() {
    const loadingMessage = document.querySelector('.loading-message'); // this is selecting the loadingMessage element
    loadingMessage.parentNode.removeChild(loadingMessage);
  }

  function showDetails(pokemon) {
    fetchPokemonDetails(pokemon).then(() => {
      // fetchPokemonDetails gets called in
      const modalBody = document.querySelector('.modal-body');
      const modalTitle = document.querySelector('.modal-title');

      modalBody.innerHTML = '';
      modalTitle.innerHTML = '';

      modalTitle.innerText = pokemon.name;
      modalTitle.classList.add('modal-title');

      const height = document.createElement('p'); // creating an element for the pokemon.height
      height.textContent = `Height: ${pokemon.height}`;
      height.classList.add('modal-height');

      const frontImg = document.createElement('img'); // creating img elements for the pokemon
      frontImg.src = pokemon.frontImgUrl;
      const backImg = document.createElement('img');
      backImg.src = pokemon.backImgUrl;
      frontImg.classList.add('modal-img');
      backImg.classList.add('modal-img');

      const modalText = document.createElement('div');
      modalText.classList.add('modal-text');

      const types = document.createElement('p');
      types.textContent = `Types: ${pokemon.types}`;
      types.classList.add('modal-types');

      modalBody.appendChild(frontImg);
      modalBody.appendChild(backImg);
      modalBody.appendChild(modalText);
      modalText.appendChild(height);
      modalText.appendChild(types);
    });
  }

  async function fetchPokemonList() {
    showLoadingMessage();
    try {
      const response = await fetch(pokemonApiUrl); // gets a promise from pokemonApiUrl
      const json = await response.json(); // response is then called with .json() method
      json.results.forEach((item) => {
        // iterates over the results of the json
        const pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        addPokemon(pokemon);
      });
      hideLoadingMessage();
    } catch (e) {
      console.error(e);
      hideLoadingMessage();
    }
  }

  function getPokemonList() {
    // getPokemonList function will return the array pokemonList
    return pokemonList;
  }

  function addPokemonToList(pokemon) {
    fetchPokemonDetails(pokemon).then(() => {
      // must load pokemondetails to load imgUrl onto button
      const listItems = document.createElement('li'); // creating li element
      listItems.classList.add('list-items');
      listItems.classList.add('group-list-item');

      const button = document.createElement('button'); // creating button element
      button.innerText = pokemon.name; // button has pokemon.name
      button.classList.add('button-class'); // added a class to button
      button.classList.add('btn');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '.modal');

      const pokemonImg = document.createElement('img');
      pokemonImg.src = pokemon.frontImgUrl;
      pokemonImg.classList.add('button-pokemonImg');

      button.addEventListener('click', () => {
        // when button is clicked the showDetails() is invoked
        showDetails(pokemon);
        document.querySelector('#exampleModalCenter').modal('show');
      });

      button.appendChild(pokemonImg);
      listItems.appendChild(button);
      pokemonListContainer.appendChild(listItems);
    });
  }

  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    pokemonListContainer.innerHTML = '';
    filteredPokemon.forEach((pokemon) => addPokemonToList(pokemon));
  });

  return {
    fetchPokemonList,
    addPokemon,
    fetchPokemonDetails,
    getPokemonList,
    showDetails,
    addPokemonToList,
  };
})();

pokemonRepository.fetchPokemonList().then(() => {
  const allpokemon = pokemonRepository.getPokemonList();
  allpokemon.forEach((pokemon) => {
    pokemonRepository.addPokemonToList(pokemon);
  });
});
