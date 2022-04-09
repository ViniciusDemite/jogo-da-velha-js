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

console.log("Player X: ", playerX);
console.log("Player Y: ", playerO);

const game = new Game(playerX);

console.log("Objeto do jogo: ", game);

function changeLayout() {
	game.currentPlayer.elements.score.classList.remove("player-active");

	changePlayer();

	game.currentPlayer.elements.score.classList.add("player-active");
	game.elements.activePlayer.innerText = game.currentPlayer.letter;
}

function changePlayer() {
	if (game.currentPlayer.letter === "X") {
		game.currentPlayer = playerO;
	} else {
		game.currentPlayer = playerX;
	}
}

game.init();

game.squares.forEach((square) => {
	square.addEventListener("click", function () {
		if (game.blockedSquares.includes(this.id)) return;

		this.innerText = game.currentPlayer.letter;

		changeLayout();
		game.blockedSquares = this.id;
	});
});
