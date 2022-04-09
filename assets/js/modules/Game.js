export default class Game {
	constructor() {
		this.content = document.getElementById("squares");
		this._squares = null;
	}

	get squares() {
		return this._squares;
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
