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

function verifyWinner() {
	let validCombination;
	const combinations = [
		[0, 1, 2], // Linha horizontal 1
		[3, 4, 5], // Linha horizontal 2
		[6, 7, 8], // Linha horizontal 3
		[0, 3, 6], // Linha vertical 1
		[1, 4, 7], // Linha vertical 2
		[2, 5, 8], // Linha vertical 3
		[0, 4, 8], // Diagonal 1
		[6, 4, 2], // Diagonal 2
	];

	validCombination = verifyCombinationHorizontal(
		game.matrix,
		game.currentPlayer
	);

	/* if (!validCombination) {
		validCombination = verifyCombinationVertical(
			game.matrix,
			game.currentPlayer
		);
	} */

	console.log(validCombination);
}

function verifyCombinationHorizontal(matrix, player) {
	let line = 0;
	let column = 0;
	let validCombination = true;

	do {
		console.log(
			`Verificando linha (${line}) na coluna (${column}). Valor: `,
			matrix[line][column]
		);

		if (matrix[line][column] !== player.letter) {
			validCombination = false;
			line++;
			column = 0;
		}

		column++;
	} while (line <= 2 && column <= 2);

	return validCombination;
}

function verifyCombinationVertical(matrix, player) {
	let line = 0;
	let column = 0;
	let validCombination = true;

	do {
		console.log(
			`Verificando linha (${line}) na coluna (${column}). Valor: `,
			matrix[line][column]
		);

		if (matrix[line][column] !== player.letter) {
			validCombination = false;
			column = 0;
		}

		line++;
	} while (line <= 2 && column <= 2);

	return validCombination;
}

function verifyCombinationDiagonal() {}

game.init();

game.squares.forEach((square) => {
	square.addEventListener("click", function () {
		if (game.blockedSquares.includes(this.id)) return;

		this.innerText = game.currentPlayer.letter;
		game.blockedSquares = this.id;
		game.matrix[this.dataset.line][this.dataset.column] =
			game.currentPlayer.letter;
		game.currentPlayer.selectedSquares = this.id;

		verifyWinner();

		change();
	});
});
