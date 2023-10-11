/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
    let isCooling = false;
    let lastArgs = null;

    return function(...args) {

        if (isCooling) {
            lastArgs = args;

        } else {
            //able to fire
            isCooling = true;
            lastArgs = null;
            func.apply(this, args);

            setTimeout(() => {
                isCooling = false;
                if(lastArgs !== null){
                    func.apply(this, lastArgs);
                }
            }, wait);
        }
    };
}

const run = (input) => {
    const func = (arg) => {
        console.log(`${arg} ${new Date().getMilliseconds()}`);
    }

    const throttled = throttle(func, 3);
    input.forEach((call) => {
        const [arg, time] = call.split('@')
        setTimeout(() => throttled(arg), time)
    });
}

run(['A@0', 'B@2', 'C@8']);