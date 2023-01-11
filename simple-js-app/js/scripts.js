//this is an array
let pokemonList = [
    pokemon1 = {
        name: 'Staraptor',
        type: ['Flying', 'Normal'],
        weight: 24.9, 
        unit: 'kg'
    },
    // object 2
    pokemon2 = {
        name: 'Jigglypuff', 
        type: ['Fairy', 'Normal'], 
        weight: 5.5, 
        unit: 'kg'
    },
    // object 3
    pokemon3 = {
        name: 'Onix', 
        type: ['Rock','Ground'], 
        weight: 210,
        unit: 'kg'
    },
];
// this is the 2nd array
let pokemonList2 = [
    pokemon4 = {
        name: 'Charmander',
        type:['fire'],
        weight: 8.5,
        unit: 'kg'
    },
    pokemon4 = {
        name: 'Squirtle',
        type:['water'],
        weight: 9,
        unit: 'kg'
    },
    pokemon4 = {
        name: 'Beedrill',
        type:['bug', 'poison'],
        weight: 29.5,
        unit: 'kg'
    }
]

// this is a function
function printArrayDetails(list){
    for (let i = 0; i < list.length; i++){
        let pokemon = list[i];
        document.write(pokemon.name + ": " + " (" + pokemon.weight + " " + pokemon.unit + ") ");
        if (pokemon.weight > 25){ 
            document.write (" -" + "Wow, that's big!")
        }
        document.write("<br>")
    }
}

printArrayDetails(pokemonList);
printArrayDetails(pokemonList2);


function div(dividend, divisor){
    if (divisor === 0) {
        return "You're trying to divide by zero."
    } else{
        let result = dividend/divisor;
        return result;
    }
}