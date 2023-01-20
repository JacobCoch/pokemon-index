const pokemonRepository = (() => {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    // this function allows you to add another pokemon with conditionals
    
    // this function will load the pokiapi list
    async function loadList() { 
      showLoadingMessage();
      try{
        const response = await fetch(apiUrl); // gets pokemonapi promise
        const json = await response.json(); // response turned with json() method to json
        json.results.forEach((item) => { // iterates over the results of the json
          let pokemon = {  // pokemon variable is the .name
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
      let url = pokemon.detailsUrl;
      showLoadingMessage();
      try {
        const response = await fetch(url);
        const details = await response.json();
        pokemon.height = details.height;
        pokemon.frontImgUrl = details.sprites.front_default;
        pokemon.backImgUrl = details.sprites.back_default;
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


    function showLoadingMessage() {
      let loadingMessage = document.createElement('p'); // this is creating an element 'p'
      loadingMessage.innerText = 'Loading...'; // this will display on the inner text
      loadingMessage.classList.add('loading-message'); //creates a classlist. call => '.loading-message'
      document.body.appendChild(loadingMessage); // adds element to the <body> element
    }
    
    function hideLoadingMessage() {
      let loadingMessage = document.querySelector('.loading-message'); //this is selecting the loadingMessage element
      document.body.removeChild(loadingMessage); // this is revoming the element when called 
    }
    
    function getAll() { // getAll function will return the array pokemonList
      return pokemonList;
    } 

    // this is defining what the showDetails function will do 
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        let modalContainer = document.querySelector('#modal-container');

        modalContainer.innerHTML = '';

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        let modalTitle = document.createElement('div');
        modalTitle.innerText = pokemon.name;
        modalTitle.classList.add('modal-title');
      
  
        let height = document.createElement('p');
        height.innerText = 'Height' + ': ' + pokemon.height;
        height.classList.add('modal-text')
        
  
        let frontImg = document.createElement('img');
        frontImg.src = pokemon.frontImgUrl;

        

        let backImg = document.createElement('img');
        backImg.src = pokemon.backImgUrl;
        
        frontImg.classList.add('modal-img');
        backImg.classList.add('modal-img');
  
        // let types = document.createElement('p');
        // types.innerText = 'Types' + ': ' + pokemon.types;
        // modalContainer.appendChild(types);
  
        let closeButton = document.createElement('button');
      closeButton.innerText = 'Close';
      closeButton.classList.add('modal-close')
      closeButton.addEventListener('click', () => {
          modalContainer.classList.remove('is-visible');
      });

      document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
          modalContainer.classList.remove('is-visible');
        }
      })

      document.body.addEventListener('click', function(event) {
        if (!modalContent.contains(event.target) && !modalTitle.contains(event.target) && !modalBody.contains(event.target)) {
            modalContainer.classList.remove('is-visible');
          }
      });

      
      modalContent.appendChild(modalTitle);
      modalContent.appendChild(modalBody);
      modalTitle.appendChild(closeButton);
      modalBody.appendChild(frontImg);
      modalBody.appendChild(backImg);
      modalBody.appendChild(height);
      
      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);

      modalContainer.classList.add('is-visible');
      
      })

    }   
    
    function addListItem(pokemon) { // this function is adding a listItem and a button
        let pokemonList = document.querySelector(".pokemon-list"); // this is grabing the .pokemon-list class in the HTML doc
        let listItems = document.createElement('li'); // this is creating a new 'li' element in the DOM
        let button = document.createElement('button'); // this is creating a button
        listItems.classList.add('list-items'); // added a css selector for the li
        button.innerText = pokemon.name; // this puts the pokemons name in the button
        button.classList.add("button-class"); // this created a button-class for CSS to call upon
        listItems.appendChild(button); // this is adding the button element as the last child of the listItem element
        pokemonList.appendChild(listItems); // is adding the listItem element as the last child of the pokemonList element.
        button.addEventListener('click', () => { // this will show the name of pokemon in console when the button is clicked
            showDetails(pokemon);
      })
    }

    return {
      loadList: loadList,
      add: add,
      loadDetails: loadDetails,
      getAll: getAll,
      showDetails: showDetails,
      addListItem: addListItem
    };
})();

// this will add a new pokemon to the pokemonRepository
pokemonRepository.loadList().then(() => { 
  const allpokemon = pokemonRepository.getAll();
  allpokemon.forEach((pokemon) => { 
    pokemonRepository.addListItem(pokemon);
  });
});


