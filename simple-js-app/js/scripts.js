    
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
        getAll: function() {
            return pokemonList;
        },
        add: function(item) {
            pokemonList.push(item);
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
