const { flattenDeep } = require("lodash");
function convertToNestedArray(arr) {
    if (arr.length === 1) {
        return [arr[0]];
    } else {
        return [arr[0], convertToNestedArray(arr.slice(1))];
    }
}

const a = {
    1: [1, [2, [3]]]
};

const flatten = flattenDeep(a[1]);
// console.log(flatten,' flatten ');
const nestedArray = convertToNestedArray(flatten);
// console.log(nestedArray,' nestedArray ');