const fs = require('fs');

const input = fs.readFileSync('input/3.txt').toString().trim();


// part 1
const mul = (a,b) => a*b;
let sum = input.match(/mul\(\d+,\d+\)/gm).reduce((s, m) => {s += eval(m); return s;}, 0);

console.log(`P1 ${sum}`);

// part 2
let en = true;
sum = input.match(/(do(n't)?\(\)|mul\((\d+),(\d+)\))/gm).reduce((s, m) => {
	// "do" is a reserved keyword so we can't eval :(
	if (m.startsWith('do')) { 
		en = m === 'do()'; 
	} else if(en) {
		s += eval(m); 
	}

	return s;
}, 0);

console.log(`P2 ${sum}`);