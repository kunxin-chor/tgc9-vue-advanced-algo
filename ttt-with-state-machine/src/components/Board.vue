<template>
  <div>
      <button v-if='gameState==""'  @click='beginGame'>Begin Game</button>
    <h1>Current Player: {{ playerNames[currentPlayer-1] }}</h1>
    <table>
      <tr v-for="(each_row, rindex) in board" v-bind:key="rindex">
        <Box
          v-for="(each_col, cindex) in each_row"
          v-bind:key="rindex * 3 + cindex"
          v-bind:rindex='rindex'
          v-bind:cindex='cindex'
          v-bind:content='each_col'
          v-on:put_symbol='putSymbol'
        />
      </tr>
    </table>

    <MessageBox :message='message' v-on:ok_pressed='okPressed'/>
    <AskForName :askingForName='askingForName' 
                :question='question'
                @name_submitted='submitName'/>
   
  </div>
</template>

<script>
import Box from './Box';
import MessageBox from './MessageBox'
import AskForName from './AskForName'
import GameModel from '../models/GameModel';
export default {
  components:{
      Box, MessageBox, AskForName
  }, 
  mounted:function(){
    this.gameState='new';
    this.gameModel = new GameModel(this);
  },
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
      question:'',
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
            // this.gameState = 'playing';
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
        this.gameState = 'new';

    },
    putSymbol: function(rindex, cindex) {
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
      this.gameModel.checkForResults();
    },
    okPressed:function(){
        this.nextAction();
    },
    submitName:function(){
        this.nextAction();
    },
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
