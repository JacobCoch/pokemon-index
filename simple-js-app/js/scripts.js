let pokemon1 = {
    name: 'Staraptor',
    type: ['Flying', 'Normal'],
    weight: 24.9, 
    unit: 'kg'
};

let pokemon2 = {
    name: 'Jigglypuff', 
    type: ['Fairy', 'Normal'], 
    weight: 5.5, 
    unit: 'kg'
};

let pokemon3 = {
    name: 'Onix', 
    type: ['Rock','Ground'], 
    weight: 210,
    unit: 'kg'
};

let pokemonList = [pokemon1, pokemon2, pokemon3];

for (let i = 0; i < pokemonList.length; i++ ){
    let pokemon = pokemonList[i];
    document.write (pokemon.name + ": " + pokemon.weight + " " + pokemon.unit + " ");
}