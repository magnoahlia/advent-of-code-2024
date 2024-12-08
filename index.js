const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

function exec(solution) {
	const script = `./solutions/${solution}.js`;
	const label = `Day ${solution} execution time`;

	console.time(label);
	require(script);
	console.timeEnd(label)

	// this allows the same day's module to be run more than once from require()
	delete require.cache[require.resolve(script)];
}

const today = new Date();
const day = today.getDate();
if (today.getMonth() == 11) {
	exec(day);
	console.log();
}

function prompt() {
	// prompt for puzzle to run
	readline.question('Enter a number between 1-31 to run (or leave blank to run today\'s solution)', (input) => {
		let puzzle = 0;

		if (input) { // run a specific date
			puzzle = parseInt(input);
			if (Number.isNaN(puzzle)) {
				console.error(`Expected number between 1-31, got ${input}.`);
			}
		} else { // run today's date
			if (today.getMonth() == 11) {
				puzzle = day;
			} else {
				console.error('Advent of Code only runs in December. Please provide a number between 1-31.');
			}
		}

		// try to run the puzzle
		try {
			exec(puzzle);
		} catch (error) {
			throw error;
		}

		console.log();
		prompt();
	});
}

prompt();