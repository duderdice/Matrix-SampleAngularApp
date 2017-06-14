export const makeClone = (original) => {
    return JSON.parse(JSON.stringify(original));
};

export const makeClone2 = (original) => {
    return Object.assign({}, original);
}