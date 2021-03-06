export default class Player {
	constructor(letter, { scoreElement, scoreNumber }) {
		this._letter = letter;
		this._score = 0;
		this._elements = {
			score: scoreElement,
			scoreNumber: scoreNumber,
		};
		this._selectedSquares = [];
	}

	get letter() {
		return this._letter;
	}

	set letter(letter) {
		this._letter = letter;
	}

	get score() {
		return this._score;
	}

	set score(score) {
		this._score = score;
	}

	get elements() {
		return this._elements;
	}

	get selectedSquares() {
		return this._selectedSquares;
	}

	set selectedSquares(selectedSquares) {
		this._selectedSquares = selectedSquares;
	}

	reset(resetScore = true) {
		this._selectedSquares = [];

		if (resetScore) {
			this._score = 0;
		}
	}

	toggleActivePlayer() {
		this._elements.score.classList.toggle("player-active");
	}
}
