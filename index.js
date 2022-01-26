let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var words = ['ABRIS', 'ABUSE', 'ABUTS', 'ABUZZ', 'ABYES', 'ABYSM', 'ABYSS', 'ACARI', 'ACERB', 'ACETA', 'ACHED', 'ACHES', 'ACHOO', 'ACIDS', 'ACIDY', 'ACING', 'ACINI', 'ACKEE', 'ACMES', 'ACMIC', 'ACNED', 'ACNES', 'ACOCK', 'ACOLD', 'ACORN', 'ACRED', 'ACRES', 'ACRID', 'ACTED', 'ACTIN', 'ACTOR', 'ACUTE', 'ACYLS', 'ADAGE', 'ADAPT', 'ADDAX', 'ADDED', 'ADDER', 'ADDLE', 'ADEEM', 'ADEPT', 'ADIEU', 'ADIOS', 'ADITS', 'ADMAN', 'ADMEN', 'ADMIT', 'ADMIX', 'ADOBE', 'ADOBO', 'ADOPT', 'ADORE', 'ADORN', 'ADOWN', 'ADOZE', 'ADULT', 'ADUNC', 'ADUST', 'ADYTA', 'ADZED', 'ADZES', 'AECIA', 'AEDES', 'AEGIS', 'AEONS', 'AERIE', 'AFARS', 'AFFIX', 'AFIRE', 'AFOOT', 'AFORE', 'AFOUL', 'AFRIT', 'AFTER', 'AGAIN', 'AGAMA', 'AGAPE', 'AGARS', 'AGATE', 'AGAVE', 'AGAZE', 'AGENE', 'AGENT', 'AGERS', 'AGGER', 'AGGIE', 'AGGRO', 'AGHAS', 'AGILE', 'AGING', 'AGIOS', 'AGISM', 'AGIST', 'AGITA', 'AGLEE', 'AGLET', 'AGLEY', 'AGLOW', 'AGMAS', 'AGONE'];

var letters = {}; // dictionary with letter names and objects
var guesses = 0; // number of guesses used
var won = false; // game state
var guessed = '_ _ _ _ _'; // correct letters guessed

var word = words[Math.floor(Math.random() * words.length)]; // word to guess

/* Not functioning properly
let response = fetch('https://random-word-api.herokuapp.com/all');
response
    .then(res => res.json())
    .then(data => {
        let goodData = data.map(word => word.toUpperCase()).filter(word => word.length == 5);
        console.log(goodData);
        setWords(goodData);
    });
*/

/* Currently not in use
class Letter {
    constructor(name) {
        this.used = false;
        this.name = name;
    }
}

alphabet.forEach(l => {
    let lo = new Letter(l);
    if (word.includes(l))
        lo.used = true;
    letters[l] = (lo);
})
*/

function resetGame() {
    guesses = 0;
    won = false;
    guessed = '_ _ _ _ _';
    word = words[Math.floor(Math.random() * words.length)];
    document.getElementById('guesses').innerHTML = '';
    document.getElementById('message').innerHTML = '<p>&nbsp;</p>'; // fill with whitespace
    document.getElementById('guess').value = '';
    document.getElementById('word').innerHTML = '<h3>_ _ _ _ _</h3>';
}

function makeGuess() {
    if (guesses == 5 || won) {
        return;
    }
    let guess = document.getElementById('guess').value.toUpperCase();
    if (guess.length === 5) {
        let output = '';
        document.getElementById('message').innerHTML = '<p>&nbsp;</p>';
        for(let i = 0; i < guess.length; i++) {
            if (guess.charAt(i) == word.charAt(i)) {
                output += `<u>${guess.charAt(i)}</u>`;
                guessed = guessed.substring(0,i*2) + `${guess.charAt(i)}` + guessed.substring(i*2+1, guessed.length);
            }
            else if (word.includes(guess.charAt(i))) {
                output += `<em>${guess.charAt(i)}</em>`;
            }
            else {
                output += `${guess.charAt(i)}`;
            }
        }
        document.getElementById('guesses').innerHTML += `<p>${output}</p>`;
        document.getElementById('word').innerHTML = `<h3>${guessed}</h3>`;
        document.getElementById('guess').value = '';
        guesses++;
    }
    else if (guess.length > 5){
        document.getElementById('message').innerHTML = '<p>Too long.</p>';
    }
    else {
        document.getElementById('message').innerHTML = '<p>Too short.</p>';
    }
    if (guess === word) {
        won = true;
        document.getElementById('message').innerHTML = '<p>You won!</p>';
    }
    else if (guesses == 5) {
        document.getElementById('message').innerHTML = `<p>Correct word: ${word}</p>`;
    }
}

resetGame();
