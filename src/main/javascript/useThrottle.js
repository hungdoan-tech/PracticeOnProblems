/**
 * Throttling approach when invoking a function
 * we define a way that prevents invoking function too many times in a specific period
 * over suit for the rate limiting
 *
 * @param {(...args: any[]) => any} func
 * @param {Number} wait
 * @param {{trailing: boolean, leading: boolean}} option
 * @returns
 */
function useThrottle(func, wait, option = { leading: true, trailing: true }) {
    if (!func || typeof func !== 'function') {
        throw new Error("The provided function is not valid");
    }

    if (!wait || typeof wait !== 'number') {
        throw new Error("The provided waiting time is not valid");
    }

    let isCooling = false;
    let lastArgs = null;
    const { leading, trailing } = option;

    function coolingFunction() {
        setTimeout(() => {
            if (trailing === true && lastArgs !== null) {
                func.apply(this, lastArgs);
                lastArgs = null;
                isCooling = true;
                coolingFunction();
                return;
            }

            isCooling = false;
        }, wait);
    }

    return function (...args) {

        if (isCooling) {
            lastArgs = args;

        } else {
            if (leading === true) {
                func.apply(this, args);
                lastArgs = null;
            }

            isCooling = true;
            coolingFunction(func, wait);
        }
    };
}

const run = (input) => {
    const func = (arg) => {
        console.log(`${arg} ${new Date().getMilliseconds()}`);
    };

    const throttled = useThrottle(func, 5);
    input.forEach((call) => {
        const [arg, time] = call.split('@');
        setTimeout(() => throttled(arg), time);
    });
};

run(['A@0', 'B@2', 'C@3']);