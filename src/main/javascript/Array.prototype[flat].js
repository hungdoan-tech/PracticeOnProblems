/**
 * Create a unique symbol - act like a global symbol to avoid duplicating the properties flat of the Array.prototype
 */
flat = Symbol('flat function');
Array.prototype[flat] = performFlat

/**
 * Flattening the array until reach the provided max depth
 *
 * @param {number} depth
 * @returns
 */
function performFlat(depth = 1) {
    if (depth < 0) {
        return null;
    }

    let newArr = [];

    for (const element of this) {

        if ((element instanceof Array) === false) {
            newArr.push(element);
            continue;
        }

        subArr = element;
        let subFlatArray = subArr[flat](depth - 1);

        if (subFlatArray === null) {
            newArr.push(element);
            continue;
        }

        for (const subFlatArrayElement of subFlatArray) {
            newArr.push(subFlatArrayElement);
        }
    }

    return newArr;
}

const arr = [1, [2], [3, [4, [5]]]];

console.log(arr[flat]())
// // [1, 2, 3, [4]]

console.log(arr[flat](1))
// // [1, 2, 3, [4]]

console.log(arr[flat](2))
// // [1, 2, 3, 4]