const TinyUTLib = {

    /**
     * Pass your UT tests as field of an object, then each test will be run.
     * See more about assert, assertEqual, eq, fail
     * 
     * @param {*} tests An object that contain multiple field, each field is a UT function
     */
    run: async function (tests) {
        let failures = 0;
        for (let testName in tests) {
            let testAction = tests[testName];
            try {
                if (Object.getPrototypeOf(testAction) === Object.getPrototypeOf(async function () { })) {
                    await testAction();
                } else {
                    testAction();
                }
                console.log(`Test: ${testName} Passed`, 'OK');
                console.log('\n----------------------------------------------------------------------------------------------------------------\n');
            } catch (e) {
                failures++;
                console.error(`Test: ${testName} Failed`);
                console.error(e.stack);
                console.log('\n----------------------------------------------------------------------------------------------------------------\n');
            }
        }
    },

    fail: function (msg) {
        throw new Error(`Fail : ${msg}`);
    },

    assert: function (value, msg) {
        if (!value) {
            throw new Error(`Assert: ${value} but not get it: ${msg}`);
        }
    },

    assertEquals: function (expected, actual) {
        if (expected !== actual) {
            throw new Error(`Assert equals but the actual value ${actual} !== the expected value ${expected}`);
        }
    },
};

export const fail = TinyUTLib.fail;
export const assert = TinyUTLib.assert;
export const assertEquals = TinyUTLib.assertEquals;
export const eq = TinyUTLib.assertEquals;
export const tests = TinyUTLib.run;