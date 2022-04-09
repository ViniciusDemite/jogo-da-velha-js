import Player from "./modules/Player.js";
import Game from "./modules/Game.js";

const game = new Game();
const playerX = new Player("X", document.getElementById("player-x-score"));
const playerY = new Player("Y", document.getElementById("player-y-score"));

game.init();

game.squares.forEach((square) => {
	square.addEventListener("click", function () {
		console.log("clicked");
	});
});
