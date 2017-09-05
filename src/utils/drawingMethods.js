export const initDrawingMethods = () => {
	// taken from https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
	// user Grumdrig, Oct 20, 2011
	CanvasRenderingContext2D.prototype.roundedRect = function (x, y, w, h, r) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		this.beginPath();
		this.moveTo(x+r, y);
		this.arcTo(x+w, y,
		x+w, y+h, r);
		this.arcTo(x+w, y+h, x,
		y+h, r);
		this.arcTo(x,
		y+h, x,
		y,
		r);
		this.arcTo(x,
		y,
		x+w, y,
		r);
		this.closePath();
		return this;
	}
}
