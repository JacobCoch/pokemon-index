//this is an array
let repositoryOne = [
    // object1
    Staraptor = {
        name: 'Staraptor',
        type: ['Flying', 'Normal'],
        weight: 24.9, 
        unit: 'kg'
    },
    // object 2
    Jigglypuff = {
        name: 'Jigglypuff', 
        type: ['Fairy', 'Normal'], 
        weight: 5.5, 
        unit: 'kg'
    },
    // object 3
    Onix = {
        name: 'Onix', 
        type: ['Rock','Ground'], 
        weight: 210,
        unit: 'kg'
    },
];
// this is the 2nd array
let repositoryTwo = [
    Charmander = {
        name: 'Charmander',
        type:['fire'],
        weight: 8.5,
        unit: 'kg'
    },
    Squirtle = {
        name: 'Squirtle',
        type:['water'],
        weight: 9,
        unit: 'kg'
    },
    Beedrill = {
        name: 'Beedrill',
        type:['bug', 'poison'],
        weight: 29.5,
        unit: 'kg'
    }
]

function loopFunction(user) {
    document.write(user.name + ": " + user.weight + "(" + user.unit + ") ");
    if (user.weight > 25) {
        document.write(" -" + "Wow, that's big!")
    }
    document.write("<br>")
} 
repositoryOne.forEach(loopFunction);
repositoryTwo.forEach(loopFunction);