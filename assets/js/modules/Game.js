export default class Game {
	constructor(currentPlayer) {
		this.content = document.getElementById("squares");
		this._squares = null;
		this._blockedSquares = [];
		this._currentPlayer = currentPlayer;
		this._elements = {
			activePlayer: document.getElementById("player"),
		};
		this._matrix = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
	}

	get squares() {
		return this._squares;
	}

	get blockedSquares() {
		return this._blockedSquares;
	}

	set blockedSquares(blockedSquares) {
		this._blockedSquares = blockedSquares;
	}

	get currentPlayer() {
		return this._currentPlayer;
	}

	set currentPlayer(currentPlayer) {
		this._currentPlayer = currentPlayer;
	}

	get elements() {
		return this._elements;
	}

	get matrix() {
		return this._matrix;
	}

	set matrix(matrix) {
		this._matrix = matrix;
	}

	init() {
		for (let i = 0; i < 9; i++) {
			this.content.insertAdjacentElement(
				"beforeend",
				this.createSquare(i)
			);
		}

		this._squares = document.querySelectorAll(".content__square");
	}

	reset(player) {
		this._currentPlayer.toggleActivePlayer();

		this._blockedSquares.forEach((id) => {
			const square = document.getElementById(id);
			square.innerText = "";
		});

		this._matrix = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		this._blockedSquares = [];
		this._currentPlayer = player;

		this._currentPlayer.toggleActivePlayer();
		this.toggleActivePlayerLetter();
	}

	createSquare(id) {
		const square = document.createElement("div");
		square.classList.add("content__square", "col-4");
		square.id = id;
		square.dataset.line = id <= 2 ? 0 : id <= 5 && id > 2 ? 1 : 2;
		square.dataset.column =
			id === 0 || id % 3 === 0
				? 0
				: id === 4 || id === 1 || id === 7
				? 1
				: 2;

		return square;
	}

	verifyValidCombination() {
		let validCombination = false;

		validCombination = this.verifyCombinationDiagonal(
			this._matrix,
			this._currentPlayer.selectedSquares
		);

		for (let l = 0; l < this._matrix.length; l++) {
			const line = this._matrix[l];

			if (validCombination) break;

			validCombination = this.verifyCombinationHorizontal(
				line,
				this._currentPlayer.selectedSquares
			);
		}

		for (let c = 0; c < this._matrix[0].length; c++) {
			if (validCombination) break;

			validCombination = this.verifyCombinationVertical(
				this._matrix,
				this._currentPlayer.selectedSquares,
				c
			);
		}

		return validCombination;
	}

	verifyCombinationDiagonal(matrix, playerSelectedSquares) {
		const middle = 1;

		return (
			(playerSelectedSquares.includes(matrix[middle - 1][middle - 1]) ||
				playerSelectedSquares.includes(
					matrix[middle - 1][middle + 1]
				)) &&
			playerSelectedSquares.includes(matrix[middle][middle]) &&
			(playerSelectedSquares.includes(matrix[middle + 1][middle - 1]) ||
				playerSelectedSquares.includes(matrix[middle + 1][middle + 1]))
		);
	}

	verifyCombinationHorizontal(line, playerSelectedSquares) {
		const column = 0;

		return (
			playerSelectedSquares.includes(line[column]) &&
			playerSelectedSquares.includes(line[column + 1]) &&
			playerSelectedSquares.includes(line[column + 2])
		);
	}

	verifyCombinationVertical(matrix, playerSelectedSquares, column) {
		const line = 0;

		return (
			playerSelectedSquares.includes(matrix[line][column]) &&
			playerSelectedSquares.includes(matrix[line + 1][column]) &&
			playerSelectedSquares.includes(matrix[line + 2][column])
		);
	}

	adjustScore() {
		this._currentPlayer.score += 1;
		this._currentPlayer.elements.scoreNumber.innerText =
			this._currentPlayer.score;
	}

	toggleActivePlayerLetter() {
		this._elements.activePlayer.innerText = this._currentPlayer.letter;
	}
}
