const pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    async function loadList() { 
      showLoadingMessage();
      try{
        const response = await fetch(apiUrl); // gets a promise from apiUrl
        const json = await response.json(); // response is then called with .json() method
        json.results.forEach(function(item) { // iterates over the results of the json
          let pokemon = {  
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon); //? Does this invoke the add() function for the condtitionals
        });
        hideLoadingMessage();
      } catch (e) { 
        console.error(e);
        hideLoadingMessage();
      }
    }
    
    async function loadDetails(pokemon) { //? is the parameter (pokemon) that gets passed from the api? or just a new parameter?
      let url = pokemon.detailsUrl;
      showLoadingMessage();
      try {
        const response = await fetch(url); // gets a promise from detailsUrl
        const details = await response.json(); // turns the response into a json called details
        pokemon.height = details.height;
        pokemon.frontImgUrl = details.sprites.front_default;
        pokemon.backImgUrl = details.sprites.back_default;
        
        let pokemonTypes = [];
        
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

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() { // loadDetails gets call in
        let modalContainer = document.querySelector('#modal-container'); // selects div
        modalContainer.innerHTML = ''; // clearing the div

        let modalContent = document.createElement('div'); // creating a new div for the modalContent
        modalContent.classList.add('modal-content');

        let modalBody = document.createElement('div'); // creating a new div for the body of the modal
        modalBody.classList.add('modal-body');

        let modalTitle = document.createElement('div'); //adding a div for the title of the modal
        modalTitle.innerText = pokemon.name;
        modalTitle.classList.add('modal-title');
      
  
        let height = document.createElement('p'); // creating an element for the pokemon.height
        height.innerText = 'Height' + ': ' + pokemon.height;
        height.classList.add('modal-height');
        
        
        // creating img elements for the pokemon
        let frontImg = document.createElement('img');
        frontImg.src = pokemon.frontImgUrl;
        let backImg = document.createElement('img');
        backImg.src = pokemon.backImgUrl;
        
        frontImg.classList.add('modal-img');
        backImg.classList.add('modal-img');
        
        let types = document.createElement('p');
        types.innerText = 'Types' + ': ' + pokemon.types;
        types.classList.add('modal-types');

        
        let closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.classList.add('modal-close')
        closeButton.addEventListener('click', () => {
          modalContainer.classList.remove('is-visible');
      });

      // closes modal if esc key is clicked
      document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
          modalContainer.classList.remove('is-visible');
        }
      })

      //! this eventListener will close if clicked anywhere on screen
      document.body.addEventListener('click', function(event) {
        if (!modalContent.contains(event.target)) {
            modalContainer.classList.remove('is-visible');
          }
      });

      
      modalContent.appendChild(modalTitle);
      modalContent.appendChild(modalBody);
      modalTitle.appendChild(closeButton);
      modalBody.appendChild(frontImg);
      modalBody.appendChild(backImg);
      modalBody.appendChild(height);
      modalBody.appendChild(types);

      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);

      modalContainer.classList.add('is-visible');
      
      })

    }   
    
    function addListItem(pokemon) { 
      loadDetails(pokemon).then(function() { // must load pokemondetails to load imgUrl onto button

        let pokemonList = document.querySelector(".pokemon-list"); // selecting div from html

        let listItems = document.createElement('li'); // creating li element
        listItems.classList.add('list-items'); 

        let button = document.createElement('button'); // creating button element
        button.innerText = pokemon.name;     // button has pokemon.name
        button.classList.add("button-class");  // added a class to button

        let pokemonImg = document.createElement('img');
        pokemonImg.src = pokemon.frontImg;
        
        button.addEventListener('click', () => {  // when button is clicked the showDetails() is invoked
            showDetails(pokemon);
      })
      button.appendChild(pokemonImg);
      listItems.appendChild(button); 
      pokemonList.appendChild(listItems); 
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


pokemonRepository.loadList().then(function()  {  
  const allpokemon = pokemonRepository.getAll();
  allpokemon.forEach(function(pokemon) { 
    pokemonRepository.addListItem(pokemon);
  });
});


