
//Player class
class Player{
  //begin score
   Begin_Score = 0;

   constructor(){
    this.Totalscore = this.Begin_Score;
   }
   //add score
   addScore(RoundScore){
        this.Totalscore += RoundScore;
   }

   //get score
   getScore(){
        return this.Totalscore;
   }

   //set score
   setScore(score){
    this.Totalscore = score;
   }
}



// DiceGame Class
class Dicegame{
    
    constructor(humam,computer){
        this.randomdice = [];
        this.humam = humam;
        this.computer = computer;
    }
   
    PlayDiceGame(){
        let humanplayerRollDice = this.RollDice();
        // console.log(`${humanplayerRollDice}`);
        let humanplayerGetScore = this.GetDiceScore(humanplayerRollDice);
        // console.log(`${humanplayerGetScore}`);
        //play game add score
        this.humam.addScore(humanplayerGetScore);

        let computerRollDice = this.RollDice();
        let computerGetScore = this.GetDiceScore(computerRollDice);
        // computer play
        this.computer.addScore(computerGetScore);

        let allRollDice = [humanplayerRollDice,computerRollDice];
        return allRollDice;

    }

    //Roll dice
    RollDice(){
        const FirstPoint =1;
        const LastPoint =6;

        const randomdice1 = Math.floor(Math.random() * (LastPoint - FirstPoint + 1) + FirstPoint);
        const randomdice2 = Math.floor(Math.random() * (LastPoint - FirstPoint + 1) + FirstPoint);
        const randomdice = [randomdice1,randomdice2];
        return randomdice;
    }

    //Get dice score    
    GetDiceScore(randomdice){
        console.log(randomdice);
        const No_Score_Dice = 1;
        const No_Score = 0;
        const dice1 = randomdice[0];
        const dice2 = randomdice[1];

        if(randomdice.includes(No_Score_Dice)){
            return  No_Score;
        }else if(dice1==dice2){
            let RoundScore = (dice1+dice2)*2;
            return RoundScore;
        }else{
            return dice1+dice2;
        }
    }

}