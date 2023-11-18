/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @param option
 * @returns {(...args:any[]) => any}
 */
function useThrottle(func, wait, option = {leading: true, trailing: true}) {
    let isCooling = false;
    let lastArgs = null;
    const {leading, trailing} = option;

    function coolingFunction() {
        setTimeout(() => {
            if(trailing === true && lastArgs !== null){
                func.apply(this, lastArgs);
                lastArgs = null;
                coolingFunction(func, wait);
                return;
            }

            isCooling = false;
        }, wait);
    }

    return function(...args) {

        if (isCooling) {
            lastArgs = args;

        } else {
            //able to fire
            if(leading === true) {
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
    }

    const throttled = useThrottle(func, 3);
    input.forEach((call) => {
        const [arg, time] = call.split('@')
        setTimeout(() => throttled(arg), time);
    });
}

run(['A@0', 'B@2', 'C@3']);