const fs = require('fs');
const input = fs.readFileSync('input/9.txt').toString().trim().split('').map(v => parseInt(v));

const disk = []
const emptyBlocks = [];
const fileBlocks = [];
const files = [];
for (let i = 0; i < input.length; i++) {
	const v = input[i];
	const isEmpty = i % 2 !== 0;
	const sect = Array(v).fill(isEmpty ? -1 : i/2);

	(isEmpty ? emptyBlocks: fileBlocks).push(...sect.keys().map(bi => bi+disk.length));
	if (!isEmpty) files.push([i/2, disk.length, v]);
	disk.push(...sect);
}

function compress() {
	const eb = [...emptyBlocks].reverse();
	const fb = [...fileBlocks];
	const d = [...disk];

	while (eb.length > 0 && fb.length > 0) 
	{
		const fi = fb.pop();
		const ei = eb.pop();

		if (ei > fi) break;

		d[ei] = d[fi];
		d[fi] = -1;

		for (let i = 0; i < eb.length; i++) {
			if (eb[i] < fi) {
				eb.splice(i, 0, fi);
				break;
			}
		}
	}

	return d;
}

console.log(compress().reduce((s, v, i) => s + (v > 0 ? v * i : 0), 0));

function compressContig() {
	const eb = [...emptyBlocks];
	const fs = [...files];
	const d = [...disk];

	while (fs.length > 0) {
		const f = fs.pop();
		const fv = f[0];
		const fi = f[1];
		const size = f[2];

		let sbi = -1;
		let biLen = 0;
		for (let i = 0; i < eb.length; i++) {
			var bi = eb[i];
			if (bi > fi) break;

			if (sbi === -1 || bi !== sbi + biLen)  {
				sbi = bi;
				biLen = 0;
			} 

			biLen++;

			if (biLen === size) {
				d.fill(fv, sbi, sbi + biLen);
				d.fill(-1, fi, fi + size);
				eb.splice(i-biLen+1, biLen);
				break;
			}
		}
	}

	return d;
}

console.log(compressContig().reduce((s, v, i) => s + (v > 0 ? v * i : 0), 0));