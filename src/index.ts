import { Game } from "./Game.js";

// Get the canvas element from the DOM
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

// Create a new instance of the Game class and start the game loop
const game = new Game(canvas);
// game.loop();
