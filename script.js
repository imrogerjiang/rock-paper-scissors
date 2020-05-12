let nRounds = 0;
let humanWins = 0;
let computerWins = 0;
let currentRound = 1;

function getComputerPlay(){
    rand = Math.random()*3;
    if(rand<1){
        return "rock";
    } else if (rand<2){
        return "paper";
    } else {
        return "scissors";
    }
}

function getResult(humanPlay, computerPlay){
    if(humanPlay == computerPlay){
        return "draw";
    } else if(
            (humanPlay == "rock" && computerPlay == "scissors") ||
            (humanPlay == "scissors" && computerPlay == "paper") ||
            (humanPlay == "paper" && computerPlay == "rock")){
        return "win";
    } else {
        return "lose";
    }
}

// Adds the rock paper scissors image to e element
function addPlayImg(e, play){
    recordImg = document.createElement("img");

    if(play == "rock"){
        recordImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rock-paper-scissors_%28rock%29.png/240px-Rock-paper-scissors_%28rock%29.png";
    }else if(play == "paper"){
        recordImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/240px-Rock-paper-scissors_%28paper%29.png";
    }else if(play == "scissors"){
        recordImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/240px-Rock-paper-scissors_%28scissors%29.png";
    }else{
        throw `${play} is not a valid play!`;
    }

    recordImg.classList.add("recordImg");
    e.appendChild(recordImg);

}

function startGame(e) {
    nRounds = Math.floor(document.getElementById("nRoundsInput").value);
    if(nRounds <= 0) {
        alert("Please enter a posive integer of rounds");
        return;
    } else if (!nRounds) {
        return;
    }
    ;

    document.getElementById("playArea").scrollIntoView(true);
}

function reset(e){
    document.getElementById("title").scrollIntoView(true);
    nRounds = 0;
    humanWins = 0;
    computerWins = 0;
    currentRound = 1;
    
    // Remove results from table
    table = document.getElementById("resultsTable"); 
    rows = document.querySelectorAll("tr.resultRow");
    rows.forEach((row)=> 
        table.removeChild(row)
    ); 

    // Sets score to 0:0
    document.getElementById("currentScore").textContent = "0:0"

}

// Adds a result column to start of resultsTable
function updateTable (currentRound, humanPlay, computerPlay){

    result = getResult(humanPlay, computerPlay);
    table = document.getElementById("resultsTable");
    row = document.createElement('tr');
    row.classList.add("resultRow")

    // Creates all the row cells
    roundNCol = document.createElement('td');
    roundNCol.textContent = currentRound;

    humanPlayCol = document.createElement('td');
    humanPlayCol.classList.add(result);
    addPlayImg(humanPlayCol, humanPlay);

    compareCol = document.createElement('td');
    compareCol.classList.add(result);
    compareCol.textContent = 
        (result == 'win')? ">":
        (result == 'draw')? "=":
        "<";

    computerPlayCol = document.createElement('td');
    computerPlayCol.classList.add(result);
    addPlayImg(computerPlayCol, computerPlay);

    row.appendChild(roundNCol);
    row.appendChild(humanPlayCol);
    row.appendChild(compareCol);
    row.appendChild(computerPlayCol);

    if(resultsTable.childElementCount == 1){
        resultsTable.appendChild(row);
    } else {
        resultsTable.insertBefore(row, resultsTable.childNodes[2])
    }
}

function displayResult(humanPlay, computerPlay){
    // Tests whether the game has started
    if(nRounds <= 0){
        alert("Please select a number of rounds")
        document.getElementById("title").scrollIntoView(true);
        return;
    }

    // Updates current score
    if(getResult(humanPlay, computerPlay) == "win"){
        humanWins ++;
    } else if(getResult(humanPlay, computerPlay) == "lose"){
        computerWins ++;
    }
    document.getElementById("currentScore").textContent = `${humanWins}:${computerWins}`


    updateTable(currentRound, humanPlay, computerPlay)

    // Calculates winner at the end of the game
    if (currentRound == nRounds){
        if(humanWins > computerWins){
            alert("You win!. Congraaaatulations, the computer was no match for the extraordinary level of your skills!")
        } else if (humanWins == computerWins){
            alert("Hey it's a Draw! You'll get them next time!")
        } else {
            alert("You lost! No fair, I bet the computer must've cheated...")
        }
    }

    currentRound ++;
}

function playRock(e){
    displayResult("rock", getComputerPlay())
}

function playScissors(e){
    displayResult("scissors", getComputerPlay())
}

function playPaper(e){
    displayResult("paper", getComputerPlay())
}

// Detect Enter for round input
document.getElementById("nRoundsInput").addEventListener(
    "keydown",
    function (e) {
        if(e.key == "Enter"){
            nRoundsBtn.click();
            e.preventDefault();
        };
    }
)

const nRoundsBtn = document.getElementById("nRoundsBtn");
nRoundsBtn.addEventListener("click", startGame);

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", reset);

const playRockImg = document.getElementById("playRock");
playRockImg.addEventListener("click", playRock);

const playScissorsImg = document.getElementById("playScissors");
playScissorsImg.addEventListener("click", playScissors);

const playPaperImg = document.getElementById("playPaper");
playPaperImg.addEventListener("click", playPaper);