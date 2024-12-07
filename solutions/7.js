const fs = require('fs');
const input = fs.readFileSync('input/7.txt').toString().trim().split('\n').map(l => l.split(/:? /g).map(s => parseInt(s)));

function test(equation, concat) {
	const value = equation[0];
	const search = [equation.slice(1)];

	while (search.length > 0) {
		let eq = search.pop();

		if (eq.length > 1) {
			search.push([eq[0]+eq[1], ...eq.slice(2)]);
			search.push([eq[0]*eq[1], ...eq.slice(2)]);
			if (concat) search.push([parseInt(eq[0].toString()+eq[1]), ...eq.slice(2)])
			continue;
		} else if (eq[0] === value) {
			return true;
		}
	}

	return false;
}

console.log(input.reduce((s, eq) => s + (test(eq) ? eq[0] : 0), 0));
console.log(input.reduce((s, eq) => s + (test(eq, true) ? eq[0] : 0), 0));