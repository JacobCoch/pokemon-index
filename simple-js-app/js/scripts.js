    
let pokemonRepository = (function() {
    let pokemonList = [
        // object1
        {
            name: 'Staraptor',
            type: ['Flying', 'Normal'],
            weight: 24.9, 
            unit: 'kg'
        },
        // object 2
        {
            name: 'Jigglypuff', 
            type: ['Fairy', 'Normal'], 
            weight: 5.5, 
            unit: 'kg'
        },
        // object 3
        {
            name: 'Onix', 
            type: ['Rock','Ground'], 
            weight: 210,
            unit: 'kg'
        },
    ];
    // this function allows you to add another pokemon with conditionals
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "type" in pokemon &&
            "weight" in pokemon &&
            "unit" in pokemon 
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Error: Only objects can be added to this repository")   
        }
    }

    // this function getAll will return the array pokemonList
    function getAll() {
        return pokemonList;
    }

    // this is definin what the showDetails function will do 
    function showDetails(pokemon) {
        console.log(pokemon)
    }

    // this function is adding a listItem and a button
    function addListItem(pokemon) {  
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
        button.addEventListener('click', function(){
            showDetails(pokemon.name);
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };
})();

// this will add a new pokemon to the pokemonRepository
pokemonRepository.add({ name: "Pikachu", type: ['Electric'], weight: 6, unit: 'kg'});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) { 
    pokemonRepository.addListItem(pokemon);
});


