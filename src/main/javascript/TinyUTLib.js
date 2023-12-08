const TinyUTLib = {

    /**
     * Pass your UT tests as field of an object, then each test will be run.
     * See more about assert, assertEqual, eq, fail
     * 
     * @param {*} tests An object that contain multiple field, each field is a UT function
     */
    run: async function (tests) {
        console.log('\n----------------------------------------------------------------------------------------------------------------\n');
        let failures = 0;
        for (let testName in tests) {
            let testAction = tests[testName];
            try {
                if (Object.getPrototypeOf(testAction) === Object.getPrototypeOf(async function () { })) {
                    await testAction();
                } else {
                    testAction();
                }
                console.log(`\nTEST: ${testName} PASSED`);
                console.log('\n----------------------------------------------------------------------------------------------------------------\n');
            } catch (e) {
                failures++;
                console.error(`\nTEST: ${testName} FAILED`);
                console.error(e.stack);
                console.log('\n----------------------------------------------------------------------------------------------------------------\n');
            }
        }
    },

    assertTrue: function (value, msg) {
        if (value === True) {
            throw new Error(`Assert: ${value} true but not get it: ${msg}`);
        }
    },

    assertFalse: function (value, msg) {
        if (value !== True) {
            throw new Error(`Assert: ${value} false but not get it: ${msg}`);
        }
    },

    assertEquals: function (expected, actual) {
        if (expected !== actual) {
            throw new Error(`Assert equals but the actual value ${actual} !== the expected value ${expected}`);
        }
    },
};

export const assertHasValue = TinyUTLib.assertHasValue;
export const assertEquals = TinyUTLib.assertEquals;
export const tests = TinyUTLib.run;