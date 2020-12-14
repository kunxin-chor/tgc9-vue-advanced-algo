<template>
  <div>
      <button v-if='gameState==""'  @click='beginGame'>Begin Game</button>
    <h1>Current Player: {{ playerNames[currentPlayer-1] }}</h1>
    <table>
      <tr v-for="(each_row, rindex) in board" v-bind:key="rindex">
        <td
          v-for="(each_col, cindex) in each_row"
          v-bind:key="rindex * 3 + cindex"
          @click="putSymbol(rindex, cindex)"
        >
          {{ each_col }}
        </td>
      </tr>
    </table>

    <div id='message-box' v-if="message != ''">
        <div id="message-box-content">
            {{message}}
        </div>
        <div>
            <button id='message-box-ok-button' @click="okPressed">OK</button>
        </div>
    </div>

    <div id="ask-for-name" v-if="askingForName==true">
        <label>{{question}}</label>
        <input type="text" v-model="playerName"/>
        <button id='ask-for-name-ok-button' @click='submitName'>OK</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // player 1 is X and player 2 is O
      currentPlayer: 0,
      remainingMoves: 9,
      board: [],
      gameState: "",
      message:"",
      nextAction: ()=>{},
      askingForName: false,
      playerName: '',
      playerNames:[],
      question:''
    };
  },
  watch: {
    gameState: function() {
      console.log("game state is now " + this.gameState);
      // after there has been a change in the gameState, we check what is the new state
      if (this.gameState == 'new') {
          this.board= [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.currentPlayer = 1;
        this.remainingMoves = 9;
        this.message = "Press OK to begin";
        this.nextAction = () => {
            this.gameState = 'ask_for_player1_name'
            // set message to blank to hide the message box
            this.message = '';
        }
        
      } else if (this.gameState == 'ask_for_player1_name') {
          this.question = "Enter player 1 name"
          this.askingForName = true;
          this.nextAction = ()=> {
              this.playerNames[0] = this.playerName;
              this.askingForName = false;
              this.gameState = "ask_for_player2_name"
          };
      } 
      else if (this.gameState == 'ask_for_player2_name') {
          this.question = "Enter player 2 name"
          this.askingForName = true;
          this.nextAction = ()=> {
              this.playerNames[1] = this.playerName;
              this.askingForName = false;
              this.gameState = "playing"
          };
      } 
      
      else if (this.gameState == 'finished') {
          this.nextAction = () => {
              this.gameState ='new';
              this.message = '';
          }
      }
    }
  },
  methods: {
    beginGame:function(){
        this.gameState = 'new'
    },
    putSymbol: function(rindex, cindex) {
      // if (this.currentPlayer == 1) {
      //     this.$set(this.board[rindex], cindex, 'X');
      //     this.currentPlayer = 2;
      // }
      // else if (this.currentPlayer == 2) {
      //     this.$set(this.board[rindex], cindex, 'O');
      //     this.currentPlayer =1;
      // }

      if (this.board[rindex][cindex] == "" && this.gameState =='playing') {
        this.$set(
          this.board[rindex],
          cindex,
          this.currentPlayer == 1 ? "X" : "O"
        );
        this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
        this.remainingMoves -= 1;
        this.checkForResults();
      } else {
        alert("Invalid move");
      }
    },
    checkForResults: function() {
      // check rows
      let someoneWon = false;
      for (let rowNumber = 0; rowNumber < 3; rowNumber++)
        if (
          this.board[rowNumber][0] == this.board[rowNumber][1] &&
          this.board[rowNumber][1] == this.board[rowNumber][2] &&
          this.board[rowNumber][0] != ""
        ) {
          this.message = "Player " + this.board[rowNumber][0] + " has won!";
          someoneWon = true;
        }

      // check columns
      for (let colNumber = 0; colNumber < 3; colNumber++) {
        if (
          this.board[0][colNumber] == this.board[1][colNumber] &&
          this.board[1][colNumber] == this.board[2][colNumber] &&
          this.board[2][colNumber] != ""
        ) {
          this.message = "Player " + this.board[colNumber][0] + " has won!";
          someoneWon = true;
        }
      }

      if (
        this.board[0][0] == this.board[1][1] &&
        this.board[1][1] == this.board[2][2] &&
        this.board[0][0] != ""
      ) {
       this.message = "Player " + this.board[0][0] + " has won!";
        someoneWon = true;
      }

      if (
        this.board[0][2] == this.board[1][1] &&
        this.board[1][1] == this.board[2][0] &&
        this.board[0][2] != ""
      ) {
        this.message = "Player " + this.board[0][2] + " has won!";
        someoneWon = true;
      }

      //   if (someoneWon == false && this.remainingMoves == 0) {
      //       alert("draw!");
      //   }

      if (someoneWon == false) {
        let numberOfEmptySquares = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board[i][j] == "") {
              numberOfEmptySquares++;
            }
          }
        }
        if (numberOfEmptySquares == 0) {
          this.message="draw";
          this.gameState='finished';        }
      } else {
          // if someone wins the game
          this.gameState = 'finished'
      }

      // for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
      //        let previousSymbol = this.board[rowNumber][0];
      //        if (previousSymbol == '') {
      //            continue;
      //        }
      //        let numberOfMatches = 0;
      //      for (let colNumber=0; colNumber < 3; colNumber++) {
      //         if (this.board[rowNumber][colNumber] == previousSymbol) {
      //             numberOfMatches = numberOfMatches + 1;
      //         }

      //         if (numberOfMatches == 3) {
      //             alert("Winner is " + previousSymbol);
      //             break;
      //         }
      //     }
      // }
    },
    okPressed:function(){
        this.nextAction();
    },
    submitName:function(){
        this.nextAction();
    }
  }
};
</script>

<style scoped>
td {
  width: 100px;
  height: 100px;
  font-size: 32px;
  border: 1px solid black;
  text-align: center;
}

#message-box, #ask-for-name {
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    padding: 20px;
    margin: 10px;
    transform: translate(-50%, -50%);
    min-width: 200px;
    min-height: 150px;
    border: 1px black solid;
}


</style>
