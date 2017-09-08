import Block from './block';
import Player from './player';
import Switch from './switch';
import Home from './home';

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
	constructor({ bgColor=0, blocks, player, enemies, home }) {
		this.blocks = [];
		for (let i=0; i<blocks.length; i++) {
			this.blocks.push([]);
			for (let j=0; j<blocks[i].length; j++) {
				let block = blocks[i][j];
				if (block.type === blockTypes.SWITCH) {
					this.blocks[i].push(new Switch(blocks[i][j].type, blocks[i][j].color, i, j));
				}
				else {
					this.blocks[i].push(new Block(blocks[i][j].type, blocks[i][j].color, i, j));
				}
			}
		}
		this.player = new Player(player.x, player.y);
		this.enemies = enemies;
		this.home = new Home(home.x, home.y);
		this.bgColor = bgColor;
	}

	render(ctx, time) {
		// need to render the entire board here
		// render background first
		ctx.beginPath();
		ctx.
		for (let i=0; i<this.blocks.length; i++) {
			for (let j=0; j<this.blocks[i].length; j++) {
				this.blocks[i][j].render(ctx, time);
			}
		}
		this.player.render(ctx, time);
		this.home.render(ctx, time);
	}
}
