export const ut = (function (global, factoryFunc) {
  // Check if the code is running in a Node.js environment
  if (typeof exports === "object" && typeof module !== "undefined") {
    // CommonJS: export the module
    module.exports = factoryFunc();
    return;
  }

  // ESM or other environment: attach the module to the global object
  global._ut = factoryFunc();

  // Because in my pet project, I am currently setting my local NodeJs packages.json as  "type": "module"
  // So at here I return it back the top level of the current module to export it for all other files can use and extract _ut
  return global._ut;
})(globalThis, function () {
  const _ut = {};

  /**
   * Pass your UT tests as field of an object, then each test will be run.
   * See more about assert, assertEqual, eq, fail
   *
   * @param {*} objContainTestingFunctions An object that contain multiple field, each field is a UT function
   */
  _ut.tests = async function (objContainTestingFunctions) {
    console.log(
      "\n----------------------------------------------------------------------------------------------------------------\n"
    );
    let failures = 0;
    for (let testName in objContainTestingFunctions) {
      let testAction = objContainTestingFunctions[testName];
      try {
        if (
          Object.getPrototypeOf(testAction) ===
          Object.getPrototypeOf(async function () {})
        ) {
          await testAction();
        } else {
          testAction();
        }
        console.log(`\nTEST: ${testName} PASSED`);
        console.log(
          "\n----------------------------------------------------------------------------------------------------------------\n"
        );
      } catch (e) {
        failures++;
        console.error(`\nTEST: ${testName} FAILED`);
        console.error(e.stack);
        console.log(
          "\n----------------------------------------------------------------------------------------------------------------\n"
        );
      }
    }
  };

  _ut.assertTrue = function (value, msg) {
    if (!value) {
      throw new Error(`Assert true but not get it ${msg ? msg : ""}`);
    }
  };

  _ut.assertFalse = function (value, msg) {
    if (value) {
      throw new Error(`Assert: false but not get it ${msg ? msg : ""}`);
    }
  };

  _ut.assertEquals = function (expected, actual) {
    if (expected !== actual) {
      throw new Error(
        `Assert equals but the actual value ${actual} !== the expected value ${expected}`
      );
    }
  };

  _ut.assert2ArraysEqual = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      const element1 = arr1[i];
      const element2 = arr2[i];

      if (Array.isArray(element1) && Array.isArray(element2)) {
        // Recursively check nested arrays
        if (!assert2ArraysEqual(element1, element2)) {
          return false;
        }
      } else if (element1 !== element2) {
        // Check non-array elements
        return false;
      }
    }

    return true;
  };

  return _ut;
});

export const {
  tests,
  assertEquals,
  assertFalse,
  assertTrue,
  assert2ArraysEqual,
} = ut;
