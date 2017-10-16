
export const colorIndices = {
	BLACK: 0,
	RED: 1,
	GREEN: 2,
	YELLOW: 3,
	BLUE: 4,
	MAGENTA: 5,
	CYAN: 6,
	WHITE: 7,
	PLAYER: 8
}

const colorValues = {};

colorValues[colorIndices.RED] = "#FF6978";
colorValues[colorIndices.GREEN] = "#94EA54";
colorValues[colorIndices.BLUE] = "#5699fd";

colorValues[colorIndices.YELLOW] = "#fffa6c";
colorValues[colorIndices.MAGENTA] = "#ff7bd6";
colorValues[colorIndices.CYAN] = "#4CEDDE";

colorValues[colorIndices.BLACK] = "#464B63";
colorValues[colorIndices.WHITE] = "#fffdfc";
colorValues[colorIndices.PLAYER] = "#fffdfc";

export { colorValues };

const black = "#000000";
const lerpAmt = .12;
const altColorValues = {};
altColorValues[colorIndices.BLACK] = lerpColor(colorValues[colorIndices.BLACK], black, lerpAmt);
altColorValues[colorIndices.RED] = lerpColor(colorValues[colorIndices.RED], black, lerpAmt);
altColorValues[colorIndices.GREEN] = lerpColor(colorValues[colorIndices.GREEN], black, lerpAmt);
altColorValues[colorIndices.BLUE] = lerpColor(colorValues[colorIndices.BLUE], black, lerpAmt);
altColorValues[colorIndices.YELLOW] = lerpColor(colorValues[colorIndices.YELLOW], black, lerpAmt);
altColorValues[colorIndices.MAGENTA] = lerpColor(colorValues[colorIndices.MAGENTA], black, lerpAmt);
altColorValues[colorIndices.CYAN] = lerpColor(colorValues[colorIndices.CYAN], black, lerpAmt);
altColorValues[colorIndices.BLACK] = lerpColor(colorValues[colorIndices.BLACK], black, lerpAmt);
altColorValues[colorIndices.PLAYER] = lerpColor(colorValues[colorIndices.WHITE], black, lerpAmt * 2);
altColorValues[colorIndices.WHITE] = lerpColor(colorValues[colorIndices.PLAYER], altColorValues[colorIndices.PLAYER], .5);

export { altColorValues };

function pad(n) {
	if (n.length < 2) {
		return "0".repeat(2 - n.length) + n;
	}
	else {
		return n;
	}
}

function color(hex) {
	if (hex.length === 7) {
		const r = parseInt(hex.substr(1, 2), 16);
		const g = parseInt(hex.substr(3, 2), 16);
		const b = parseInt(hex.substr(5, 2), 16);
		return { r, g, b };
	}
	else {
		throw new Error('InvalidColorFormat');
	}
}

function lerpColor(a, b, t) {
	const colA = color(a);
	const colB = color(b);
	const colResult = {
		r: Math.floor(colA.r * (1 - t) + colB.r * t),
		g: Math.floor(colA.g * (1 - t) + colB.g * t),
		b: Math.floor(colA.b * (1 - t) + colB.b * t)
	};
	const result = "#" + pad(colResult.r.toString(16)) + pad(colResult.g.toString(16)) + pad(colResult.b.toString(16));
	return result;
}
