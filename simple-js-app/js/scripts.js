// object 1
let pokemon1 = {
    name: 'Staraptor',
    type: ['Flying', 'Normal'],
    weight: 24.9, 
    unit: 'kg'
};
// object 2
let pokemon2 = {
    name: 'Jigglypuff', 
    type: ['Fairy', 'Normal'], 
    weight: 5.5, 
    unit: 'kg'
};
// object 3
let pokemon3 = {
    name: 'Onix', 
    type: ['Rock','Ground'], 
    weight: 210,
    unit: 'kg'
};
//this is an array
let pokemonList = [pokemon1, pokemon2, pokemon3];

// a for loop that writes the pokemon and their weight on the DOM
for (let i = 0; i < pokemonList.length; i++ ){
    let pokemon = pokemonList[i];
    document.write (pokemon.name + ": " + " (" + pokemon.weight + " " + pokemon.unit + ") ");
    if (pokemon.weight > 100){
        document.write ("Wow, that's big! ")
    }
    document.write("<br>")
    
}
