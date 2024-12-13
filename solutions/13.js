const fs = require('fs');
const Vector2 = require('./util/Vector2.js');
const input = fs.readFileSync('input/13.txt').toString().trim().match(/\d+/g).map(v => parseInt(v));
const machines = [];

for (let i = 0; i < input.length; i+= 6) {
	machines.push([
		new Vector2(input[i], input[i+1]),
		new Vector2(input[i+2], input[i+3]),
		new Vector2(input[i+4], input[i+5])
	]);
}

function cost(a, b, prize) {
	const sa = (b.y * prize.x - b.x * prize.y) / (a.x * b.y - a.y * b.x);
	const sb = (prize.x - sa * a.x) / b.x;
	return Number.isInteger(sa) && Number.isInteger(sb) ? sa *3 + sb : 0;
}

console.log(machines.reduce((s, [a,b,prize]) => s + cost(a,b,prize), 0))

const inc = new Vector2(10000000000000, 10000000000000);
console.log(machines.reduce((s, [a,b,prize]) => s + cost(a,b,prize.add(inc)), 0))

// solutions = machines.map(([a, b, prize]) => find(a, b, prize));
// console.log(solutions.reduce((s, v) => s + (v ? cost(v) : 0), 0));

// original p1 for posterity: silly, I just needed to do math!

// function eval(va, vb, a, b) {
// 	return new Vector2(
// 		a * va.x + b * vb.x,
// 		a * va.y + b * vb.y
// 	);
// }

// function cost(st) {
// 	return st.a * 3 + st.b;
// }

// function find(a, b, prize) {
	// const front = new PriorityQueue((a, b) => cost(a) - cost(b));
	// const found = new Set();
	// front.push({a: min?.a ?? 0, b: min?.b ?? 0});
	// while (!front.isEmpty()) {
	// 	const st = front.dequeue();

	// 	if (found.has(JSON.stringify(st))) continue;

	// 	found.add(JSON.stringify(st));

	// 	const ev = eval(a, b, st.a, st.b);

	// 	if (prize.equals(ev)) {
	// 		return st;
	// 	} 

	// 	if (ev.x > prize.x || ev.y > prize.y) continue;

	// 	front.enqueue({a: st.a + 1, b: st.b});
	// 	front.enqueue({a: st.a, b: st.b + 1});
	// }
// }
