"use strict";

const paperInstance = new paper.PaperScope();
const canvas = document.getElementById('paper-canvas');
const context = canvas.getContext('2d');
context.canvas.width  = window.innerWidth;
context.canvas.height = window.innerHeight;
paperInstance.setup(canvas);
const pathArray = [];
const directions = ['up', 'left', 'down', 'right'];
const colors = [
	'#FF6978', // red
	'#94EA54', // green
	'#3885F9', // blue
	'#F4EE36', // yellow
	'#C85ED8', // magenta
	'#4CEDDE', // cyan
	'#464B63', // black
	'#FFF8F4' // white
];

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = hex => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// adjust square count for mobile
const mq = window.matchMedia("(orientation: portrait)");
const count = mq.matches ? 20 : 50;

// Place the instances of the symbol:
for (let i = 0; i < count; i++) {
	// The center position is a random point in the view:
    const rand = paperInstance.Point.random();
    const centX = rand.x * paperInstance.view.size.width;
    const centY = rand.y * paperInstance.view.size.height;
    const center = new paperInstance.Point(centX, centY);
    const rectangleSize = Math.random() * 25 + 25;
	const rectangle = new paperInstance.Rectangle(new paperInstance.Point(centX, centY), new paperInstance.Point(centX + rectangleSize, centY + rectangleSize));
	const cornerSize = new paperInstance.Size(7.5, 7.5);
	const path = new paperInstance.Path.RoundRectangle(rectangle, cornerSize);
	const randomColorHex = colors[Math.floor(Math.random()*colors.length)];
	const colorRGB = hexToRgb(randomColorHex);
	path.fillColor = new paperInstance.Color(colorRGB.r/255,colorRGB.g/255,colorRGB.b/255,.5);
	// assign random direction, speed to each square
	const pathObj = {
		path: path,
		direction: directions[Math.floor(Math.random()*directions.length)],
		speed: Math.random() * 500 + 100
	};
	pathArray.push(pathObj);
}

paperInstance.view.onFrame = () => {
	pathArray.forEach(item => {
		switch (item.direction) {
			case 'up':
				item.path.position.y -= item.path.bounds.height / item.speed;
				break;
			case 'down':
				item.path.position.y += item.path.bounds.height / item.speed;
				break;
			case 'left': 
				item.path.position.x -= item.path.bounds.width / item.speed;
				break;
			case 'right':
			default:
				item.path.position.x += item.path.bounds.width / item.speed;
				break;
		}

        // wrap screen edges
        if (item.path.bounds.left > paperInstance.view.size.width) {
            item.path.position.x -= paperInstance.view.size.width + item.path.bounds.width
        } else if (item.path.bounds.top > paperInstance.view.size.height) {
            item.path.position.y -= paperInstance.view.size.height + item.path.bounds.height;
        } else if (item.path.bounds.right < 0) {
            item.path.position.x += paperInstance.view.size.width + item.path.bounds.width;
        } else if (item.path.bounds.bottom < 0) {
            item.path.position.y += paperInstance.view.size.height + item.path.bounds.height;
        }
	});
};
