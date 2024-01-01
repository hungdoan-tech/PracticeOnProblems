import { flat } from "../../main/javascript/Array.prototype[flat].js";
import {
  tests,
  assert2ArraysEqual,
} from "../../main/raw_things/TestingLibrary.js";

tests("Test Array flat function", {
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
