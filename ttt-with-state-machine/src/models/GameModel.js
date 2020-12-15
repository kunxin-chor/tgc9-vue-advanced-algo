class GameModel {
    vueInstance = null;
    constructor(vueInstance) {
        this.vueInstance = vueInstance
    }

     checkForResults() {
      // check rows
      let someoneWon = false;
      for (let rowNumber = 0; rowNumber < 3; rowNumber++)
        if (
          this.vueInstance.board[rowNumber][0] == this.vueInstance.board[rowNumber][1] &&
          this.vueInstance.board[rowNumber][1] == this.vueInstance.board[rowNumber][2] &&
          this.vueInstance.board[rowNumber][0] != ""
        ) {
          this.vueInstance.message = "Player " + this.vueInstance.board[rowNumber][0] + " has won!";
          someoneWon = true;
        }

      // check columns
      for (let colNumber = 0; colNumber < 3; colNumber++) {
        if (
          this.vueInstance.board[0][colNumber] == this.vueInstance.board[1][colNumber] &&
          this.vueInstance.board[1][colNumber] == this.vueInstance.board[2][colNumber] &&
          this.vueInstance.board[2][colNumber] != ""
        ) {
          this.vueInstance.message = "Player " + this.vueInstance.board[colNumber][0] + " has won!";
          someoneWon = true;
        }
      }

      if (
        this.vueInstance.board[0][0] == this.vueInstance.board[1][1] &&
        this.vueInstance.board[1][1] == this.vueInstance.board[2][2] &&
        this.vueInstance.board[0][0] != ""
      ) {
       this.vueInstance.message = "Player " + this.vueInstance.board[0][0] + " has won!";
        someoneWon = true;
      }

      if (
        this.vueInstance.board[0][2] == this.vueInstance.board[1][1] &&
        this.vueInstance.board[1][1] == this.vueInstance.board[2][0] &&
        this.vueInstance.board[0][2] != ""
      ) {
        this.vueInstance.message = "Player " + this.vueInstance.board[0][2] + " has won!";
        someoneWon = true;
      }

      //   if (someoneWon == false && this.vueInstanceremainingMoves == 0) {
      //       alert("draw!");
      //   }

      if (someoneWon == false) {
        let numberOfEmptySquares = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.vueInstance.board[i][j] == "") {
              numberOfEmptySquares++;
            }
          }
        }
        if (numberOfEmptySquares == 0) {
          this.vueInstance.message="draw";
          this.vueInstance.gameState='finished';        }
      } else {
          // if someone wins the game
          this.vueInstance.gameState = 'finished'
      }
    }
}

export default GameModel;