export default class Game {
	constructor(currentPlayer) {
		this.content = document.getElementById("squares");
		this._squares = null;
		this._blockedSquares = [];
		this._currentPlayer = currentPlayer;
		this._elements = {
			activePlayer: document.getElementById("player"),
		};
		this._finished = false;
	}

	get squares() {
		return this._squares;
	}

	get blockedSquares() {
		return this._blockedSquares;
	}

	set blockedSquares(id) {
		this._blockedSquares.push(id);
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

	get finished() {
		return this._finished;
	}

	set finished(finished) {
		this.finished = finished;
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

	createSquare(id) {
		const square = document.createElement("div");
		square.classList.add("content__square", "col-4");
		square.id = id;

		return square;
	}
}
