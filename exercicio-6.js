const Li = (num1, num2) => {
	if (num1 > 15 || num2 > 2) return console.log('Error');

	let count = 0;

	while (count < num1) {
		for (let i = 0; i < num2; i++) {
			if (count === 14 && i === 0) {
				console.log(`<li>página: ${count * num2 + i + 1}</li>`);
				break;
			} else {
				console.log(`<li>página: ${count * num2 + i + 1}</li>`);
			};
		};
		count++;
	};
};

Li(15, 2);
