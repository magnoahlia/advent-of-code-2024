function mod(n, m) {
	return ((n % m) + m) % m;
}

function gcd(a, b) {
	return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
	return a / gcd(a, b) * b;
}

module.exports = { mod, gcd, lcm };