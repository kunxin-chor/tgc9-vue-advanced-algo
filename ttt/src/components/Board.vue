<template>
  <div>
    <h1>Currenet Player: {{ currentPlayer }}</h1>
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
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // player 1 is X and player 2 is O
      currentPlayer: 1,
      remainingMoves: 9,
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      gameState:''
    };
  },
  // when we display the component for the first time, mounted will be call on that particular component
  mounted:function() {
      this.gameState= 'new';
  },

  methods: {
    putSymbol: function(rindex, cindex) {
      // if (this.currentPlayer == 1) {
      //     this.$set(this.board[rindex], cindex, 'X');
      //     this.currentPlayer = 2;
      // }
      // else if (this.currentPlayer == 2) {
      //     this.$set(this.board[rindex], cindex, 'O');
      //     this.currentPlayer =1;
      // }

      if (this.board[rindex][cindex] == "") {
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
          alert("Player " + this.board[rowNumber][0] + " has won!");
          someoneWon = true;
        }

      // check columns
      for (let colNumber = 0; colNumber < 3; colNumber++) {
        if (
          this.board[0][colNumber] == this.board[1][colNumber] &&
          this.board[1][colNumber] == this.board[2][colNumber] &&
          this.board[2][colNumber] != ""
        ) {
          alert("Player " + this.board[colNumber][0] + " has won!");
          someoneWon = true;
        }
      }

      if (
        this.board[0][0] == this.board[1][1] &&
        this.board[1][1] == this.board[2][2] &&
        this.board[0][0] != ""
      ) {
        alert("Player " + this.board[0][0] + " has won!");
        someoneWon = true;
      }

      if (
          this.board[0][2] == this.board[1][1] &&
          this.board[1][1] == this.board[2][0] &&
          this.board[0][2] != ''
      ) {
           alert("Player " + this.board[0][2] + " has won!");
           someoneWon = true;
      }

    //   if (someoneWon == false && this.remainingMoves == 0) {
    //       alert("draw!");
    //   }

    if (someoneWon == false) {
        let numberOfEmptySquares = 0;
        for (let i=0; i < 3; i++) {
            for (let j=0; j<3; j++) {
                if (this.board[i][j] == '') {
                    numberOfEmptySquares++;
                }
            }
        }
        if (numberOfEmptySquares == 0) {
            alert('draw');
        }
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
</style>
