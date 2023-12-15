export const _ut = (function (global, factoryFunc) {
  // Check if the code is running in a Node.js environment
  if (typeof exports === "object" && typeof module !== "undefined") {
    // CommonJS: export the module
    module.exports = factoryFunc();
    return;
  }

  // ESM or other environment: attach the module to the global object
  globalThis._ut = factoryFunc();

  // Because in my pet project, I am currently setting my local NodeJs packages.json as  "type": "module"
  // So at here I return it back the top level of the current module to export it for all other files can use and extract _ut
  return global._ut;
})(globalThis, function () {
  /**
   * Pass your UT tests as field of an object, then each test will be run.
   * See more about assert, assertEqual, eq, fail
   *
   * @param {*} objectContainTestingFunction An object that contain multiple field, each field is a UT function
   */
  const tests = async function (objectContainTestingFunction) {
    console.log(
      "\n----------------------------------------------------------------------------------------------------------------\n"
    );
    let failures = 0;
    for (let testName in objectContainTestingFunction) {
      let testAction = objectContainTestingFunction[testName];
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

  const assertTrue = function (value, msg) {
    if (value === true) {
      throw new Error(`Assert: ${value} true but not get it: ${msg}`);
    }
  };

  const assertFalse = function (value, msg) {
    if (value === false) {
      throw new Error(`Assert: ${value} false but not get it: ${msg}`);
    }
  };

  const assertEquals = function (expected, actual) {
    if (expected !== actual) {
      throw new Error(
        `Assert equals but the actual value ${actual} !== the expected value ${expected}`
      );
    }
  };

  return {
    tests: tests,
    assertTrue: assertTrue,
    assertFalse: assertFalse,
    assertEquals: assertEquals,
  };
});
