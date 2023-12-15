import { tests, assert2ArraysEqual } from "./TinyUTLib.js";

/**
 * Create a unique symbol - act like a global symbol to avoid duplicating the properties flat of the Array.prototype
 */
const flat = Symbol("flat_arr");
Array.prototype[flat] = performFlat;

/**
 * Flattening the array until reach the provided max depth
 *
 * @param {number} depth
 * @returns
 */
export function performFlat(depth = 1) {
  if (depth < 0) {
    return null;
  }

  let newArr = [];

  for (const element of this) {
    if (element instanceof Array === false) {
      newArr.push(element);
      continue;
    }

    const nestedArr = element;
    const flattenedNestedArray = nestedArr[flat](depth - 1);

    if (flattenedNestedArray === null) {
      newArr.push(element);
      continue;
    }

    for (const subFlatArrayElement of flattenedNestedArray) {
      newArr.push(subFlatArrayElement);
    }
  }

  return newArr;
}

tests({
  giveNestedLevelFrom1to3AndAnNestedArr_performFlattenTheArrToReachTo3NestedLevels_expectFlattenCorrect:
    function () {
      const arr = [1, [2], [3, [4, [5]]]];

      let expetedArr = [1, 2, 3, [4, [5]]];
      let actualArr = arr[flat]();
      assert2ArraysEqual(expetedArr, actualArr);

      expetedArr = [1, 2, 3, 4, [5]];
      actualArr = arr[flat](2);
      assert2ArraysEqual(expetedArr, actualArr);

      expetedArr = [1, 2, 3, 4, 5];
      actualArr = arr[flat](3);
      assert2ArraysEqual(expetedArr, actualArr);
    },
});
