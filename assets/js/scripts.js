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
	let validCombination = false;
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

	// console.log("Verificando diagonais");
	/* validCombination = verifyCombinationDiagonal(
		game.matrix,
		game.currentPlayer.letter
	); */

	for (let l = 0; l < game.matrix.length; l++) {
		const line = game.matrix[l];

		if (validCombination) break;

		validCombination = verifyCombinationHorizontal(
			line,
			game.currentPlayer.selectedSquares,
			0
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

	console.log(validCombination);
}

function verifyCombinationHorizontal(line, playerSelectedSquares, column) {
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

function verifyCombinationDiagonal(matrix, letter) {
	const middleLine = 2;
	const middleColumn = 1;

	return (
		(matrix[middleLine - 1][middleColumn - 1].letter === letter ||
			matrix[middleLine - 1][middleColumn + 1].letter === letter) &&
		matrix[middleLine][middleColumn].letter === letter &&
		(matrix[middleLine + 1][middleColumn - 1].letter === letter ||
			matrix[middleLine + 1][middleColumn + 1].letter === letter)
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

		console.log(
			`Quadrados selecionados pelo jogador (${game.currentPlayer.letter}): `,
			game.currentPlayer.selectedSquares
		);

		verifyWinner();

		change();
	});
});
