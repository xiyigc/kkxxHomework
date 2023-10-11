export const sleep = (time) => {
		return new Promise(resolve => setTimeout(resolve, time))
	},
	getNewDice = (preDice, mask) => {
		//mask == (0 / false) , redice ; mask == (1 / true) , do nothing
		const newDice = preDice.map((v, i) =>
			mask[i] ? v : Math.floor(Math.random() * 6) + 1
		);
		// newDice.sort();
		return newDice;
	},
	getMasks = (locker, mask) => {
		return locker.map((v, i) => v | mask[i])
	},
	getScore = (diceArray) => {
		let score = diceArray.reduce(
			(accumulator, current) => accumulator + current,
			0
		);
		diceArray = [...diceArray];
		diceArray.sort();
		const dicebox = new Map();
		diceArray.forEach((v) => {
			let n = dicebox.get(v);
			if (n) dicebox.set(v, n + 1);
			else dicebox.set(v, 1);
		});
		const size = dicebox.size,
			keysArray = Array.from(dicebox.keys());
		if (size == 1) score += 100;
		else if (size == 2) {
			let count = dicebox.get(keysArray[0]);
			if (count == 1 || count == 4) score += 40;
			else score += 20;
		} else if (size == 3) {
			score += 10;
		} else if (size == 5) {
			const first = keysArray[0],
				last = keysArray[4];
			if ((first == 1 && last == 5) || (first == 2 && last == 6)) score += 60;
			else score += 30;
		}
		return score;
	};

export default {
	sleep,
	getNewDice,
	getMasks,
	getScore
}