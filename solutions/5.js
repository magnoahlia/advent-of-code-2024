const fs = require('fs');
const input = fs.readFileSync('input/5.txt').toString().trim().split('\n\n');

const rules = input[0].split('\n').map(l => l.split('|').map(v => parseInt(v)));
const updates = input[1].split('\n').map(l => l.split(',').map(v => parseInt(v)));

function isCorrect(update) {
	for (let i = 0; i < update.length; i++) {
		const c = update[i];
		for (let r = 0; r < rules.length; r++) {
			const rule = rules[r];
			if (rule[0] !== c) continue;

			const n = rule[1];
			for (let ci = 0; ci < update.length; ci++) {
				if (update[ci] !== n) continue;

				if (ci < i) {
					return false;
				} else {
					break;
				}
			}
		}
	}

	return true;
}

// part 1
let sum = updates.reduce((s, update) => isCorrect(update) ? s + update[Math.floor(update.length/2)] : s, 0);
console.log(`P1 ${sum}`);

// part 2
const incorrect = updates.filter(u => !isCorrect(u));
sum = incorrect.reduce((s, update) => s + update.sort((a,b) => {
	for (let r = 0; r < rules.length; r++) {
		const rule = rules[r];
		if (rule[0] === b && rule[1] === a) {
			return 1;
		} else if (rule[0] === a && rule[1] === b) {
			return -1;
		}
	}

	return 0;
})[Math.floor(update.length/2)], 0);

console.log(`P2 ${sum}`)