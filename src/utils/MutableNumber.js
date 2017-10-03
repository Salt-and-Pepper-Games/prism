class MutableNumber {
	constructor(n) {
		this.n = n;
	}
	set(n) {
		this.n = n;
	}
}

MutableNumber.prototype.valueOf = function() {
	return this.n;
}

export default MutableNumber;
