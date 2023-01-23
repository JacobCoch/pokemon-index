const pokemonRepository = (function() {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
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
        const pokemonList = document.querySelector(".pokemon-list"); // selecting div from html
        const listItems = document.createElement('li'); // creating li element
        listItems.classList.add('list-items'); 

        const button = document.createElement('button'); // creating button element
        button.innerText = pokemon.name;     // button has pokemon.name
        button.classList.add("button-class");  // added a class to button

        const pokemonImg = document.createElement('img'); 
        pokemonImg.src = pokemon.frontImgUrl;
        pokemonImg.classList.add('button-pokemonImg');
        
        button.addEventListener('click', function() {  // when button is clicked the showDetails() is invoked
            showDetails(pokemon);
      })
      button.appendChild(pokemonImg);
      listItems.appendChild(button); 
      pokemonList.appendChild(listItems); 
      })

    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() { // loadDetails gets called in
        const modalContainer = document.querySelector('.modal-container'); // selects div
        const modalContent = document.querySelector('.modal-content'); // selects div
        
        const modalTitle = document.createElement('div'); //adding a div for the title of the modal
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
        
        const types = document.createElement('p');
        types.innerText = 'Types' + ': ' + pokemon.types;
        types.classList.add('modal-types');

        
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.classList.add('modal-close')
        closeButton.addEventListener('click', () => {
          hideModal();
      });

        modalContainer.appendChild(modalContent);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(closeButton);
        modalContent.appendChild(frontImg);
        modalContent.appendChild(backImg);
        modalContent.appendChild(types);

      })

    }  
        // closes modal if esc key is clicked
    window.addEventListener('keydown', function(event) {
      if (event.key === "Escape") {
        hideModal();
      }  
    });

    // modalContainer.addEventListener('click', function(event) {
    //   if (!modalContent.contains(event.target)) {
    //     modalContainer.classList.remove('is-visible');
    //   }
    // });
    

    return {
      loadList: loadList,
      add: add,
      loadDetails: loadDetails,
      getAll: getAll,
      showDetails: showDetails,
      addListItem: addListItem
    };
})();


pokemonRepository.loadList().then(function()  {  
  const allpokemon = pokemonRepository.getAll();
  allpokemon.forEach(function(pokemon) { 
    pokemonRepository.addListItem(pokemon);
  });
});


