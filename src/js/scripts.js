const pokemonRepository = (function() {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    const listPokemon = document.querySelector(".pokemon-list"); // selecting div from html
    const inputField = document.querySelector('.form-control');

    inputField.addEventListener('input', function() { 
      const searchValue = inputField.value.toLowerCase();
      const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
      );
      listPokemon.innerHTML = '';
      filteredPokemon.forEach(pokemon => addListItem(pokemon));
    });

    async function loadList() { 
      showLoadingMessage();
      try{
        const response = await fetch(apiUrl); // gets a promise from apiUrl
        const json = await response.json(); // response is then called with .json() method
        json.results.forEach(function(item) { // iterates over the results of the json
          const pokemon = {  
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon); 
        });
        hideLoadingMessage();
      } catch (e) { 
        console.error(e);
        hideLoadingMessage();
      }
    }
    
    async function loadDetails(pokemon) { 
      const url = pokemon.detailsUrl;
      showLoadingMessage();
      try {
        const response = await fetch(url); // gets a promise from detailsUrl
        const details = await response.json(); // turns the response into a json called details
        pokemon.height = details.height;
        pokemon.frontImgUrl = details.sprites.front_default;
        pokemon.backImgUrl = details.sprites.back_default;
        
        const pokemonTypes = [];
        
        details.types.forEach(function(item){ // iterating over the details.types
          pokemonTypes.push(item.type.name); // pushing the items into pokemonTypes
        })
        pokemon.types = pokemonTypes.join(', ');

        hideLoadingMessage();
      } catch (e) {
        console.error(e);
        hideLoadingMessage();
      }
    }
        
    function add(pokemon) { // function grabs the pokemonapi list through the loadList function
        if ( 
          typeof pokemon === 'object' &&  // if pokemon is an object 
          Object.keys(pokemon).includes('name' && 'detailsUrl') // and the keys are .name and .detailsUrl
        ) {
          pokemonList.push(pokemon); // if so push pokemon to the pokemonList array
        } else {
          console.error(
            'Pokémon has to be added using this format: {name:, detailsUrl:}'
          );
        }
    }

    function hideModal() {
      modalContainer.classList.add('hidden');
    }

    function showLoadingMessage() {
      const loadingMessage = document.createElement('p'); // this is creating an element 'p'
      loadingMessage.innerText = 'Loading...'; // this will display on the inner text
      loadingMessage.classList.add('loading-message'); //creates a classlist. call => '.loading-message'
      document.body.appendChild(loadingMessage); // adds element to the <body> element
    }
    
    function hideLoadingMessage() {
      const loadingMessage = document.querySelector('.loading-message'); //this is selecting the loadingMessage element
      document.body.removeChild(loadingMessage); // this is revoming the element when called 
    }
    
    function getAll() { // getAll function will return the array pokemonList
      return pokemonList;
    } 

    
    function addListItem(pokemon) { 
      loadDetails(pokemon).then(function() { // must load pokemondetails to load imgUrl onto button
        const listItems = document.createElement('li'); // creating li element
        listItems.classList.add('list-items'); 
        listItems.classList.add('group-list-item');

        const button = document.createElement('button'); // creating button element
        button.innerText = pokemon.name;     // button has pokemon.name
        button.classList.add('button-class');  // added a class to button
        button.classList.add('btn');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '.modal');

        const pokemonImg = document.createElement('img'); 
        pokemonImg.src = pokemon.frontImgUrl;
        pokemonImg.classList.add('button-pokemonImg');
        
        button.addEventListener('click', function() {  // when button is clicked the showDetails() is invoked
            showDetails(pokemon);
            $('#exampleModalCenter').modal('show')
      });

      button.appendChild(pokemonImg);
      listItems.appendChild(button); 
      listPokemon.appendChild(listItems); 
      });

    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() { // loadDetails gets called in
        const modalBody = document.querySelector('.modal-body');
        const modalTitle = document.querySelector('.modal-title');

        modalBody.innerHTML = '';
        modalTitle.innerHTML = '';

        modalTitle.innerText = pokemon.name;
        modalTitle.classList.add('modal-title');

        const height = document.createElement('p'); // creating an element for the pokemon.height
        height.innerText = 'Height' + ': ' + pokemon.height;
        height.classList.add('modal-height');

        const frontImg = document.createElement('img'); // creating img elements for the pokemon
        frontImg.src = pokemon.frontImgUrl;
        const backImg = document.createElement('img');
        backImg.src = pokemon.backImgUrl;
        frontImg.classList.add('modal-img');
        backImg.classList.add('modal-img');
        
        let modalText = document.createElement('div');
        modalText.classList.add('modal-text');

        const types = document.createElement('p');
        types.innerText = 'Types' + ': ' + pokemon.types;
        types.classList.add('modal-types');

        modalBody.appendChild(frontImg);
        modalBody.appendChild(backImg);
        modalBody.appendChild(modalText);
        modalText.appendChild(height);
        modalText.appendChild(types);
      });

    }

    // closes the modal on ESC
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        hideModal();
      }
    });

    return {
      loadList: loadList,
      add: add,
      loadDetails: loadDetails,
      getAll: getAll,
      showDetails: showDetails,
      addListItem: addListItem,
    };
})();


pokemonRepository.loadList().then(function()  {  
  const allpokemon = pokemonRepository.getAll();
  allpokemon.forEach(function(pokemon) { 
    pokemonRepository.addListItem(pokemon);
  });
});


