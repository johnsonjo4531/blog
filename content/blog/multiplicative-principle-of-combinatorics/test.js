const breads = ["White 🍞", "Wheat 🍞"];
const cheeses = ["Provolone 🧀", "Cheddar 🧀", "American 🧀"];
let k = 0;
for (const cheese of cheeses) {
	const row = [];
	for (const bread of breads) {
		row.push(`${cheese} & ${bread} = 🥪 #${k}`);
		k += 1;
	}
	console.log(row.join("\t\t"));
	console.log("\n");
}

console.log(k, "total grilledCheeses");
