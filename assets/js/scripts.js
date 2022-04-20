import Player from "./modules/Player.js";
import Game from "./modules/Game.js";

const playerX = new Player("X", {
	scoreElement: document.getElementById("player-x"),
	scoreNumber: document.getElementById("player-x-score"),
});
const playerO = new Player("O", {
	scoreElement: document.getElementById("player-o"),
	scoreNumber: document.getElementById("player-o-score"),
});

const game = new Game(playerX);

function change() {
	game.currentPlayer.toggleActivePlayer();

	changePlayer();

	game.currentPlayer.toggleActivePlayer();
	game.toggleActivePlayerLetter();
}

function changePlayer() {
	if (game.currentPlayer.letter === "X") {
		game.currentPlayer = playerO;
	} else {
		game.currentPlayer = playerX;
	}
}

function gameHasAWinner() {
	// TODO implementar mensagem para quando der velha
	if (!game.verifyValidCombination()) return;

	// TODO realçar quadrados da combinação vencedora
	alert(`Jogador ${game.currentPlayer.letter} ganhou!!`);

	// Sum score
	game.adjustScore();

	resetGame(false);

	return true;
}

function resetGame(resetScore = true) {
	game.reset(playerX);
	playerX.reset(resetScore);
	playerO.reset(resetScore);
}

game.init();

game.squares.forEach((square) => {
	square.addEventListener("click", function () {
		const id = parseInt(this.id);

		if (game.blockedSquares.includes(id)) return;

		this.innerText = game.currentPlayer.letter;
		game.blockedSquares.push(id);
		game.currentPlayer.selectedSquares.push(id);
		game.matrix[this.dataset.line][this.dataset.column] = id;

		if (gameHasAWinner()) return;

		change();
	});
});
