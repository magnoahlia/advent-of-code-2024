const fs = require('fs');
const input = fs.readFileSync('input/11.txt').toString().trim().split(' ').map(v => parseInt(v));

function evolve(stones) {
	return stones.reduce((arr, v) => {
		if (v === 0) {
			arr.push(1);
			return arr;
		}

		const t = Math.floor(Math.log10(v))
		if (t % 2 === 1) {
			const p = Math.pow(10,(t+1)/2);
			const v2 = v%p;
			const v1 = (v-v2)/p;
			arr.push(v1);
			arr.push(v2);
		}
		else {
			arr.push(v*2024);
		}

		return arr;
	}, []);
}

function evolveAtomic(stones, count) {
	const d = stones.reduce((o, v) => {o[v] = 1; return o;}, {});
	for (let i = 0; i < count; i++) {
		for (let [v, c] of [...Object.entries(d)]) {
			d[v] -= c;
			v = parseInt(v);
			if (v === 0) {
				v = 1;
				d[v] = (d[v] ?? 0) + c;
				continue;
			}

			const t = Math.floor(Math.log10(v))
			if (t % 2 === 1) {
				const p = Math.pow(10,(t+1)/2);
				const v2 = v%p;
				const v1 = (v-v2)/p;
				d[v1] = (d[v1] ?? 0) + c;
				d[v2] = (d[v2] ?? 0) + c;
			}
			else {
				v *= 2024;
				d[v] = (d[v] ?? 0) + c;
			}

		}
	}

	return Object.values(d).reduce((s, v) => { return s + v}, 0);
}

let s = input;
for (let i = 0; i < 25; i++)  {
	s = evolve(s);
}

console.log(s.length);
console.log(evolveAtomic(input, 75))