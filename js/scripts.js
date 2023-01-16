    
let pokemonRepository = (() => {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    // this function allows you to add another pokemon with conditionals
    
    // Validation of input type: Has to be an object which contains the keys name and detailsUrl
    let add = (pokemon) => {
        if (
          typeof pokemon === 'object' &&
          Object.keys(pokemon).includes('name' && 'detailsUrl')
        ) {
          pokemonList.push(pokemon);
        } else {
          console.error(
            'Pokémon has to be added using this format: {name:, detailsUrl:}'
          );
        }
    }

    // this function getAll will return the array pokemonList
    const getAll = () => pokemonList;

    // this is defining what the showDetails function will do 
    let showDetails = (pokemon) => {
        loadDetails(pokemon)
        .then(() => {
            console.log(pokemon);
        });

    }   

    // this function is adding a listItem and a button
    let addListItem = (pokemon) => {  
        // this is grabing the .pokemon-list class in the HTML doc
        let pokemonList = document.querySelector(".pokemon-list"); 
        // this is creating a new 'li' element in the DOM
        let listItem = document.createElement('li');
        // this is creating a button
        let button = document.createElement('button');
        // this puts the pokemons name in the button
        button.innerText = pokemon.name; 
        // this created a button-class for CSS to call upon
        button.classList.add("button-class");
        // this is adding the button element as the last child of the listItem element
        listItem.appendChild(button);
        // is adding the listItem element as the last child of the pokemonList element.
        pokemonList.appendChild(listItem);
        // this will show the name of pokemon in console when the button is clicked
        button.addEventListener('click', () => {
            showDetails(pokemon.name);
        })
    }

    // this function will load the list of pokemon
    let loadList = () => {
        return fetch(apiUrl)
        .then((response) => {
          return response.json();
        }).then((json) => {
          json.results.forEach((item) => {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch((e) => {
          console.error(e);
        })
    }

    let loadDetails = (item) => {
        let url = item.detailsUrl;
        return fetch(url)
        .then((response) => {
          return response.json();
        }).then((details) => {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch((e) => {
          console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

// this will add a new pokemon to the pokemonRepository
pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach((pokemon) => { 
    pokemonRepository.addListItem(pokemon);
});


