const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

const today = new Date();
const day = today.getDate();
if (today.getMonth() == 11) {
	try {
		require(`./solutions/${day}.js`);
		console.log();
	} catch (error) {
		if (error.code !== 'MODULE_NOT_FOUND') {
			throw error;
		}
	}
}

// prompt for puzzle to run
readline.question('Enter a number between 1-31 to run (or leave blank to run today\'s solution)', (input) => {
	let puzzle = 0;

	if (input) { // run a specific date
		puzzle = parseInt(input);
		if (Number.isNaN(puzzle)) {
			console.error(`Expected number between 1-31, got ${input}.`);
			process.exit(1);
		}
	} else { // run today's date
		if (today.getMonth() == 11) {
			puzzle = day;
		} else {
			console.error('Advent of Code only runs in December. Please provide a number between 1-31.');
			process.exit(1);
		}
	}

	// try to run the puzzle
	try {
		require(`./solutions/${puzzle}.js`);
	} catch (error) {
		if (error.code == 'MODULE_NOT_FOUND') {
			console.log(`No solution yet for ${puzzle}`);
			process.exit(1);
		} else {
			throw error;
		}
	}

	readline.close();
});