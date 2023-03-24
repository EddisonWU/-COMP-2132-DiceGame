/**
 * get element
 * */
const human = new Player();// human
const computer = new Player();//computer
const DiceGame = new Dicegame(human, computer);

const FirstRound = 1;
const LastRound = 3;
let thisround = 0;

const PlayerScore = document.getElementById('Player-Score');
const ComputerScore = document.getElementById('Computer-Score');
//humpicture 
const HumanPicture = document.getElementById('HumanPicture');
//computerpicture
const ComputerPicture = document.getElementById('ComputerPicture');

HumanPicture.innerHTML += '<h1>You:</h1>'
HumanPicture.innerHTML += '<img class="humanYou" id="humanYou" src="./images/you.png">'
const $humanYou = $('#humanYou');
$humanYou.css('width', '60%');
$humanYou.css('height', 'auto');

ComputerPicture.innerHTML += '<h1>Computer:</h1>'
ComputerPicture.innerHTML += '<img class="computerpic" id="computerpic" src="./images/computer.png">'
const $computerpic = $('#computerpic');
$computerpic.css('width', '60%');
$computerpic.css('height', 'auto');


//get humandice element
const humandice1 = document.getElementById("humandice1");
const humandice2 = document.getElementById("humandice2");
// get computer element
const computerdice1 = document.getElementById("computerdice1");
const computerdice2 = document.getElementById("computerdice2");

//get buttom element
const Startgame = document.getElementById("RollDiceButton");
const NewGameButton = document.getElementById("NewGameButton");

//title
const GameName = document.getElementById("GameName");


//click Roll dice button
let rotatedicepc = 1;
let waittime = 80;
let Rolling = 2000;

let randomRollTimes = 9; 
const ROLLING_TERMINATION_TIME = 1500;
let rolling_start_utc = 0;

//Animation Rolling dice
function rotatedice() {
    if (!randomRollTimes) { // TERMINATION 
        randomRollTimes = Number((Math.random() * 11).toFixed(0)) + 10; // 10 ~ 20
        return GetGameScore();
    }
    else { // CONTINUE
        randomRollTimes--;
    }
    //rolling dice animation
    if (rotatedicepc < 6) {
        rotatedicepc++;
        //humandice rolling
        humandice1.src = `./images/${rotatedicepc}-point.png`;
        humandice2.src = `./images/${rotatedicepc}-point.png`;

        //computerdice rolling
        computerdice1.src = `./images/${rotatedicepc}-point.png`;
        computerdice2.src = `./images/${rotatedicepc}-point.png`;
    } else {
        rotatedicepc = 1;
        //humandice rolling
        humandice1.src = `./images/${rotatedicepc}-point.png`;
        humandice2.src = `./images/${rotatedicepc}-point.png`;

        //computerdice rolling
        computerdice1.src = `./images/${rotatedicepc}-point.png`;
        computerdice2.src = `./images/${rotatedicepc}-point.png`;
    }
    setTimeout(rotatedice, waittime);
}

// let dicerotate = rotatedice();
let winnerwindow = document.getElementById("winnerwindow");
const $winwindow1 =  $('#winnerwindow');
$winwindow1.hide();


function GetGameScore() {
    //use playerDiceRollOne function
    let RollingDice = DiceGame.PlayDiceGame();
    //human player Rolling two dice 
    let humanPL = RollingDice[0];
    // human rolling dice one
    let humanPLone = humanPL[0];
    //human rolling dice two
    let humanPLtwo = humanPL[1];

    //computer player Rolling tow dice
    let computerPL = RollingDice[1];
    let computerPLone = computerPL[0];
    let computerPLtwo = computerPL[1];

    ShowRollingDicePicture(humanPLone, humanPLtwo, computerPLone, computerPLtwo);

    // this round score
    let HmRoundscore = DiceGame.GetDiceScore(humanPL);
    let CpRoundscore = DiceGame.GetDiceScore(computerPL);

    //Humanplay and computerplayer getscore
    let HmPlayerScore = human.getScore();
    let CpPlayerScore = computer.getScore();


    PlayerScore.innerHTML = `<h3>Your Scoreboard</h3>`;
    PlayerScore.innerHTML += `<h4>Score this round:${HmRoundscore}</h4>`;
    PlayerScore.innerHTML += `<h4>Total scores:${HmPlayerScore}</h4>`;

    ComputerScore.innerHTML = ``;
    ComputerScore.innerHTML += `<h3>Computer Scoreboard</h3>`;
    ComputerScore.innerHTML += `<h4>Score this round:${CpRoundscore}</h4>`;
    ComputerScore.innerHTML += `<h4>Total scores:${CpPlayerScore}</h4>`;
    thisround++;

    if(thisround==LastRound){
        buttonlick = false;
        getwinner(HmPlayerScore, CpPlayerScore);
        // winnerwindow.innerHTML+='<a href="javascript:void(0)" class="closebtn" id="closebtn" onclick="closeNav()">&times;</a>';
        winnerwindow.innerHTML+=`<p>You got:${HmPlayerScore} </p>`;
        winnerwindow.innerHTML+=`<p>Computer got:${CpPlayerScore} </p>`;
        winnerwindow.innerHTML+=`<h5>*If you want to play again,Please click [New Game] Button.</h5>`;
        Startgame.removeEventListener('click',doit);
    }
    buttonlick = true;
}

function ShowRollingDicePicture(humanPLone, humanPLtwo, computerPLone, computerPLtwo) {
    //human rolling dice point
    humandice1.src = `./images/${humanPLone}-point.png`;
    humandice2.src = `./images/${humanPLtwo}-point.png`;

    //Computer rolling dice point
    computerdice1.src = `./images/${computerPLone}-point.png`;
    computerdice2.src = `./images/${computerPLtwo}-point.png`;
}
 
var buttonlick = true;
//click start button 
Startgame.addEventListener('click', doit);

function doit(){
    if(buttonlick == true){
        buttonlick = false;
        rotatedice();
    }
    GameName.innerHTML=`<h1>Round :${thisround+1} </h1>`

}

//click NewGameButton rest game
NewGameButton.addEventListener('click', function () {
    //picture default
    humandice1.src = "./images/1-point.png";
    humandice2.src = "./images/1-point.png";

    //picture default
    computerdice1.src = "./images/1-point.png";
    computerdice2.src = "./images/1-point.png";

    human.setScore(0);
    computer.setScore(0);

    thisround = 0;
    PlayerScore.innerHTML = `<h3>Your Scoreboard</h3>`;
    ComputerScore.innerHTML = `<h3>Computer Scoreboard</h3>`;
    $winwindow1.hide();
    Startgame.addEventListener('click', doit);
    GameName.innerHTML=`<h1>Dice Game</h1>`
})



function playagain(){
    //picture default
    humandice1.src = "./images/1-point.png";
    humandice2.src = "./images/1-point.png";

    //picture default
    computerdice1.src = "./images/1-point.png";
    computerdice2.src = "./images/1-point.png";

    human.setScore(0);
    computer.setScore(0);

    thisround = 0;
    PlayerScore.innerHTML = `<h3>Your Scoreboard</h3>`;
    ComputerScore.innerHTML = `<h3>Computer Scoreboard</h3>`;
    $winwindow1.hide();
}

//getwinner windows
function getwinner(HmPlayerScore, CpPlayerScore) {
    if (HmPlayerScore > CpPlayerScore) {
        $winwindow1.fadeIn();
        return winnerwindow.innerHTML= "<h2>You Win!</h2>";
    } else if (HmPlayerScore == CpPlayerScore) {
        $winwindow1.fadeIn();
        return winnerwindow.innerHTML= "<h2>Same Score!</h2>";
    } else {
        $winwindow1.fadeIn();
        return winnerwindow.innerHTML= "<h2>Computer Win!</h2>";
    }
}

