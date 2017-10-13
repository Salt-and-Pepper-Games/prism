import Block from './block';
import Player from './player';
import Switch from './switch';
import Home from './home';
import Background from './background';

export const blockTypes = {
	BLOCK: "BLOCK",
	SWITCH: "SWITCH",
	EMPTY: "EMPTY"
}

/**
 * A board is one singular level
 * It is a dumb component: it simply renders its current state
 * All state changes come from the higher-order BoardManager class
 */
export default class Board {
	constructor({ bgColor=0, blocks, player, enemies, home }, { boardLayer, playerLayer, switchLayer }) {
		this.background = new Background(bgColor, boardLayer);

		this.blocks = [];
		this.width = blocks.length;
		this.height = blocks[0].length;
		for (let i=0; i<blocks.length; i++) {
			this.blocks[i] = [];
			for (let j=0; j<blocks[i].length; j++) {
				let block = blocks[i][j];
				if (block.type === blockTypes.SWITCH) {
					this.blocks[i][j] = new Switch(blocks[i][j].color, i, j, this.width, this.height, switchLayer);
				}
				else if (block.type === blockTypes.BLOCK) {
					this.blocks[i][j] = new Block(blocks[i][j].color, i, j, this.width, this.height, boardLayer);
				}
				// else {
				// 	this.blocks[i][j] = null;
				// }
			}
		}
		this.home = new Home(home.x, home.y, this.width, this.height, boardLayer);
		this.player = new Player(player.x, player.y, this.width, this.height, playerLayer);
		this.enemies = enemies;
	}

	setPlayerPosition(x, y) {
		return this.player.moveTo(x, y);
	}

	onPlayerSquish(dx, dy) {
		return this.player.onSquish(dx, dy);
	}

	setBackgroundColor(color) {
		let promises = [];
		promises.push(this.background.setColor(color));
		for (let i=0; i<this.blocks.length; i++) {
			for (let j=0; j<this.blocks[i].length; j++) {
				if (this.blocks[i][j]) {
					promises.push(this.blocks[i][j].onBackgroundColor(color));
				}
			}
		}
		promises.push(this.home.onBackgroundColor(color));
		promises.push(this.player.onBackgroundColor(color));
		return Promise.all(promises);
	}

	hasSwitch(x, y) {
		return this.blocks[x] && this.blocks[x][y] && this.blocks[x][y].type === blockTypes.SWITCH;
	}

	onLoad() {
		let promises = [];
		for (let i=0; i<this.width; i++) {
			for (let j=0; j<this.height; j++) {
				if (this.blocks[i][j]) {
					promises.push(this.blocks[i][j].onLoad());
				}
			}
		}
		// for (let enemy in this.enemies) {
		// 	enemy.destroy();
		// }
		promises.push(this.home.onLoad());
		promises.push(this.player.onLoad());
		promises.push(this.background.onLoad());
		return Promise.all(promises);
	}

	destroy() {
		let promises = [];
		for (let i=0; i<this.width; i++) {
			for (let j=0; j<this.height; j++) {
				if (this.blocks[i][j]) {
					promises.push(this.blocks[i][j].destroy());
				}
			}
		}
		// for (let enemy in this.enemies) {
		// 	enemy.destroy();
		// }
		promises.push(this.home.destroy());
		promises.push(this.player.destroy());
		promises.push(this.background.destroy());
		return Promise.all(promises);
	}
}
