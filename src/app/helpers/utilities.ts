
export const simpleSortUsingStringProp = (myArray: Array<any>, prop): Array<any> => {
    if (!Array.isArray(myArray)) {
        return myArray;
    }
    const sortedArray = myArray.sort((a, b) => {
        if (`${a[prop]}` > `${b[prop]}`) {
            return 1;
        } else if (`${a[prop]}` < `${b[prop]}`) {
            return -1;
        } else {
            return 0;
        }
    });
    return sortedArray;
};

/* **************************************************************** */

export const makeClone = (original) => {
    return JSON.parse(JSON.stringify(original));
};

// function makeClone(original) {
// 	//WALDO - need better way to clone old state
// 	let cloned = {};
// 	Object.keys(original).map(p => cloned[p] = original[p]);
// 	return cloned;
// }

/* **************************************************************** */

export const getWeightedPercent = (xAmt, xPct, yAmt, yPct) => {
    if ((xAmt + yAmt) === 0) {
        return 0;
    }

    xPct = xPct / 100;
    yPct = yPct / 100;

    return ((xAmt * xPct) + (yAmt * yPct)) / (xAmt + yAmt);
};
