export default class Player {
	constructor(letter, scoreElement, score = 0) {
		this._letter = letter;
		this._score = score;
		this.scoreElement = scoreElement;
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
}
