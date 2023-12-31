/**
 * Creates a Testing Library for running unit tests.
 * @constructor
 */
const TestingLibrary = function () {
  /**
   * Pass your set of tests as field of an object, then each test will be run.
   * See more about assert, assertEqual, eq, fail
   *
   * @param {*} objContainTestingFunctions An object that contain multiple field, each field is a UT function
   */
  this.tests = async function (objContainTestingFunctions) {
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

  /**
   * Asserts that a value is true.
   * @param {boolean} value - The value to assert.
   * @param {string} [msg] - An optional message to display on failure.
   * @throws {Error} Throws an error if the value is not true.
   */
  this.assertTrue = function (value, msg) {
    if (!value) {
      throw new Error(`Assert true but not get it ${msg ? msg : ""}`);
    }
  };

  /**
   * Asserts that a value is false.
   * @param {boolean} value - The value to assert.
   * @param {string} [msg] - An optional message to display on failure.
   * @throws {Error} Throws an error if the value is not false.
   */
  this.assertFalse = function (value, msg) {
    if (!value) {
      throw new Error(`Assert: false but not get it ${msg ? msg : ""}`);
    }
  };

  /**
   * Asserts that two values are equal.
   * @param {*} expected - The expected value.
   * @param {*} actual - The actual value.
   * @throws {Error} Throws an error if the values are not equal.
   */
  this.assertEquals = function (expected, actual) {
    if (expected !== actual) {
      throw new Error(
        `Assert equals but the actual value ${actual} !== the expected value ${expected}`
      );
    }
  };

  /**
   * Asserts that two arrays are deeply equal.
   * @param {Array} arr1 - The first array.
   * @param {Array} arr2 - The second array.
   * @returns {boolean} Returns true if the arrays are deeply equal, otherwise false.
   */
  this.assert2ArraysEqual = function (arr1, arr2) {
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
};

const _test = new TestingLibrary();

// Check if the code is running in a Node.js environment
if (typeof exports === "object" && typeof module !== "undefined") {
  // CommonJS: export the module
  module.exports = _test;
}

// ESM or other environment: attach the module to the global object
global._ut = _test;

// Because in my pet project, I am currently setting my local NodeJs packages.json as  "type": "module"
// So at here I return it back the top level of the current module to export it for all other files can use and extract _ut
export const {
  tests,
  assertEquals,
  assertFalse,
  assertTrue,
  assert2ArraysEqual,
} = _test;
