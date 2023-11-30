/**
 * Only invoke a function when a element invoking it end completely 
 * after @param wait miliseconds
 * 
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @returns {(...args: any[]) => any}
 */
function useDebounce(func, wait) {
    if (!func || typeof func !== 'function') {
        throw new Error("The provided function is not valid");
    }

    if (!wait || typeof wait !== 'number') {
        throw new Error("The provided waiting time is not valid");
    }

    let timerId = null;

    return function (...args) {
        date = new Date();
        console.log(`try ${args} at @${date.getSeconds()}@${date.getMilliseconds()}`);

        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(function () {
            func.apply(this, args);
        }, wait);
    };
}


const run = (input) => {
    const calls = [];

    const func = (arg) => {
        date = new Date();
        calls.push(`Run ${arg} att ${date.getSeconds()}@${date.getMilliseconds()}`);
        console.log(calls);
    };

    const debounced = useDebounce(func, 5);
    input.forEach((call) => {
        const [arg, time] = call.split('@');
        setTimeout(() => debounced(arg), time);
    });
    return calls;
};

run(['A@0', 'B@2', 'C@3']);