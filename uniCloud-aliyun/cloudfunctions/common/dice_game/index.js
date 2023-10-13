const getNewDice = (preDice, mask) => {
	//mask == (0 / false) , redice ; mask == (1 / true) , do nothing
	const newDice = preDice.map((v, i) =>
		mask[i] ? v : Math.floor(Math.random() * 6) + 1
	);
	// newDice.sort();
	return newDice;
};

// const getNowDice = (diceNum) => {
// 	const preDice = [];
// 	for (let i = 1; i < 7; i++) {
// 		let n = diceNum % 10;
// 		diceNum = Math.floor(diceNum / 10);
// 		for (let j = 0; j < n; j++) preDice.push(i);
// 	}
// 	return preDice;
// };

const getScore = (diceArray) => {
	let score = diceArray.reduce(
		(accumulator, current) => accumulator + current,
		0
	);
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
const queryStateScore = (states, state) => {
	let newState = [...state];
	newState.sort();
	newState = newState.reduce(
		(accumulator, current) => accumulator * 10 + current,
		0
	);
	if (!states.has(newState)) {
		setStateSpace(states, state);
	}
	return states.get(newState);
};

const setStateSpace = (stateSpace, state, score) => {
	let newSt = [...state];
	newSt.sort();
	newSt = newSt.reduce((accumulator, current) => accumulator * 10 + current, 0);
	if (!stateSpace.has(newSt)) {
		if (!score) score = getScore(state);
		stateSpace.set(newSt, score);
	}
};
const getStateSpace = () => {
	const states = new Map();
	let sum = 0,
		count = 0;
	for (let i = 0; i < 6; i++)
		for (let j = 0; j < 6; j++)
			for (let k = 0; k < 6; k++)
				for (let l = 0; l < 6; l++)
					for (let m = 0; m < 6; m++) {
						let temp = getScore([i + 1, j + 1, k + 1, l + 1, m + 1]);
						setStateSpace(states, [i + 1, j + 1, k + 1, l + 1, m + 1], temp);
						sum += temp;
						count += 1;
					}
	states.set("AVG", sum / count);
	return states;
};

const calScoreRecursively = (states, state, step, action) => {
	if (step < 1) return [queryStateScore(states, state), 1];
	if (step <= 5) {
		let stateCopy = [...state],
			sum = 0,
			count = 0,
			tempS,
			TempC;
		if (action[step - 1]) {
			[tempS, TempC] = calScoreRecursively(states, stateCopy, step - 1, action);
		} else {
			[tempS, TempC] = [1, 2, 3, 4, 5, 6].reduce(
				(accumulator, current) => {
					stateCopy[step - 1] = current;
					let [s1, c0] = calScoreRecursively(
						states,
						stateCopy,
						step - 1,
						action
					);
					accumulator[0] += s1;
					accumulator[1] += c0;
					return accumulator;
				},
				[0, 0]
			);
		}
		sum += tempS;
		count += TempC;
		if (step == 5) {
			sum = tempS / TempC;
			count = 1;
		}
		return [sum, count];
	}
	return [0, 0];
};

const nextDecision = (states, state, lockerList, threshold = 0) => {
	let bestScore = queryStateScore(states, state),
		bestAction = [true, true, true, true, true];

	const remainMask = lockerList.reduce((preValue, currentValue) => currentValue ? preValue - 1 : preValue, 5);
	const generateMaskScore = (sts, st, maskNum, step, action, lockerList) => {
		if (step > 5 && maskNum == 0) {
			let [tempS, _] = calScoreRecursively(sts, st, 5, action);
			if (tempS > bestScore + threshold) {
				bestScore = tempS;
				bestAction = action;
			}
		}
		if (step <= 5 && maskNum >= 0) {
			generateMaskScore(sts, st, maskNum, step + 1, [...action, true], lockerList);
			if (!lockerList[step - 1])
				generateMaskScore(sts, st, maskNum - 1, step + 1, [...action, false], lockerList);
		}
	};
	for (let maskNum = remainMask == 5 ? 4 : remainMask; maskNum > 0; maskNum--) {
		generateMaskScore(states, state, maskNum, 1, [], lockerList);
	}
	if (remainMask == 5 && states.get("AVG") > bestScore + threshold) {
		bestScore = states.get("AVG");
		bestAction = [false, false, false, false, false];
	}
	return {
		bestAction,
		bestScore,
		state,
	};
};

const finalAction = (
	states,
	myDiceList, myLockerList, mymagnification,
	enemyDiceList, enemyLockerList, enemymagnification,
	round
) => {
	const {
		bestAction: myBestAction,
		bestScore: myBestScore
	} = nextDecision(states, myDiceList, myLockerList), {
		bestAction: enemyBestAction,
		bestScore: enemyBestScore
	} = nextDecision(states, enemyDiceList, enemyLockerList);
};
module.exports = {
	getNewDice,
	getScore,
	getStateSpace,
	nextDecision,
	queryStateScore,
};