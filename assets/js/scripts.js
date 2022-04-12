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
	if (!verifyValidCombination()) return;

	game.currentPlayer.score += game.currentPlayer.score;
}

function verifyValidCombination() {
	let validCombination = false;

	validCombination = verifyCombinationDiagonal(
		game.matrix,
		game.currentPlayer.selectedSquares
	);

	for (let l = 0; l < game.matrix.length; l++) {
		const line = game.matrix[l];

		if (validCombination) break;

		validCombination = verifyCombinationHorizontal(
			line,
			game.currentPlayer.selectedSquares
		);
	}

	for (let c = 0; c < 3; c++) {
		if (validCombination) break;

		validCombination = verifyCombinationVertical(
			game.matrix,
			game.currentPlayer.selectedSquares,
			c
		);
	}

	console.log("Verificando combinações: ", validCombination);

	return validCombination;
}

function verifyCombinationHorizontal(line, playerSelectedSquares) {
	const column = 0;

	return (
		playerSelectedSquares.includes(line[column]) &&
		playerSelectedSquares.includes(line[column + 1]) &&
		playerSelectedSquares.includes(line[column + 2])
	);
}

function verifyCombinationVertical(matrix, playerSelectedSquares, column) {
	const line = 0;

	return (
		playerSelectedSquares.includes(matrix[line][column]) &&
		playerSelectedSquares.includes(matrix[line + 1][column]) &&
		playerSelectedSquares.includes(matrix[line + 2][column])
	);
}

function verifyCombinationDiagonal(matrix, playerSelectedSquares) {
	const middle = 1;

	return (
		(playerSelectedSquares.includes(matrix[middle - 1][middle - 1]) ||
			playerSelectedSquares.includes(matrix[middle - 1][middle + 1])) &&
		playerSelectedSquares.includes(matrix[middle][middle]) &&
		(playerSelectedSquares.includes(matrix[middle + 1][middle - 1]) ||
			playerSelectedSquares.includes(matrix[middle + 1][middle + 1]))
	);
}

game.init();

game.squares.forEach((square) => {
	square.addEventListener("click", function () {
		const id = parseInt(this.id);

		if (game.blockedSquares.includes(id)) return;

		this.innerText = game.currentPlayer.letter;
		game.blockedSquares = id;
		game.currentPlayer.selectedSquares = id;
		game.matrix[this.dataset.line][this.dataset.column] = id;

		verifyWinner();

		change();
	});
});
