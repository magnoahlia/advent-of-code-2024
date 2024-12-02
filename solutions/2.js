const fs = require('fs');

const reports = fs.readFileSync('input/2.txt').toString().trim().split('\n').map(l => l.split(' ').map(v=>parseInt(v)));

// part 1
let safe = 0;
for (let r = 0; r < reports.length; r++) {
	if (isSafe(reports[r])) {
		safe++;
	}
}

console.log(`P1: ${safe}`);

// part 2
safe = 0;
for (let r = 0; r < reports.length; r++) {
	const report = reports[r];
	if (isSafe(reports)) {
		safe++;
		continue;
	}

	for (let i = 0; i < report.length; i++) {
		if(isSafe(report, i)) {
			safe++;
			break;
		}
	}
}

console.log(`P2: ${safe}`);

function isSafe(report, skip) {
	let dir = 0;
	let last = 0;
	for (let i = 0; i < report.length; i++) {
		if (i === skip) {
			continue;
		}

		const v = report[i];
		if(i === 0 || i === 1 && skip === 0) {
			last = v;
			continue;
		}

		const delta = v - last;
		const dAbs = Math.abs(delta);
		const dSign = Math.sign(delta);

		if((dAbs < 1 || dAbs > 3) || (dir !== 0 && dSign !== dir)) {
			return false;
		}

		last = v;
		dir = Math.sign(delta);
	}

	return true;
}