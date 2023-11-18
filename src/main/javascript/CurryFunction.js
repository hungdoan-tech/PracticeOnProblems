// Currying is a useful technique used in JavaScript applications.
// Implement a useCurry function, which accepts a function and return a curried one.

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function useCurry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.call(this, ...args)
        }
        return curried.bind(this, ...args)
    }
}

const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}

const curriedJoin = useCurry(join)

// expect '1_2_3'
console.log(curriedJoin(1, 2, 3))

console.log(curriedJoin(1)(2, 3))

console.log(curriedJoin(1, 2)(3))

console.log(curriedJoin(1)(2)(3))