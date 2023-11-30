/**
 * Currying is a useful technique which accepts a function
 * then creates a new function that, when called, has its this keyword set to the provided value,
 * with a given sequence of arguments preceding any provided when the new function is called.
 *
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function useCurry(fn) {
    if (!fn || typeof fn !== 'function') {
        throw new Error("The provided function is not valid");
    }
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.call(this, ...args);
        }
        return curried.bind(this, ...args);
    };
}

const join = (a, b, c) => {
    return `${a}_${b}_${c}`;
};

const curriedJoin = useCurry(join);

// expect '1_2_3'
console.log(curriedJoin(1, 2, 3));

console.log(curriedJoin(1)(2, 3));

console.log(curriedJoin(1, 2)(3));

console.log(curriedJoin(1)(2)(3));