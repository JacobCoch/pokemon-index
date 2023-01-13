    
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
    return {
        getAll: function() { // the getAll method will return the pokemonLIst Array
            return pokemonList;
        },
        add: function(item) {  // the add method allows you to add something to the array
            let expectedKeys = ['name', 'type', 'weight', 'unit']; // an array with the types of keys we expect to see 
            let objectKeys = Object.keys(item); // get the keys of the passed object
            let isValid = expectedKeys.every(key => objectKeys.indexOf(key) !== -1);
            if (typeof item === 'object' && isValid) {
                pokemonList.push(item);
            } else {
                console.log("Error: Only objects can be added to this repository")   
            }  
        }
    }
})();

console.log(pokemonRepository.getAll());


function loopFunction(pokemon) {
    document.write(pokemon.name + ": " + pokemon.weight + "(" + pokemon.unit + ") ");
    if (pokemon.weight > 25) {
        document.write(" -" + "Wow, that's big!")
    }
    document.write("<br>")
} 
pokemonRepository.getAll().forEach(loopFunction);
