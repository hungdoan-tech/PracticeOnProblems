/**
 * Kind of a caching approach when invoking a function
 * with a same args - memo will noop, return the cached one
 * rather than performing computing again
 * Note: currently just support primitives
 *
 * @param func
 * @param resolver - a function that define the way to construct a caching key from args
 * @returns {(function(...[*]): (any))|*}
 */
function useMemo(func, resolver = (...args) => args.join('_')) {
    if (!func || typeof func !== 'function') {
        throw new Error("The provided function is not valid");
    }
    if (!resolver || typeof resolver !== 'function') {
        throw new Error("The provided resolver is not valid");
    }

    const cache = new Map();

    return function (...args) {
        const key = resolver(...args);

        if (cache.has(key)) {
            console.debug('Hit');
            return cache.get(key);
        }

        console.debug('Miss');
        const result = func.apply(this, args);
        cache.set(key, result);

        return result;
    };
}

function test() {
    function increaseOne(b) {
        return b + 1;
    }

    const memoFunction = useMemo(increaseOne);

    console.log(memoFunction(1));
    console.log(memoFunction(5));
    console.log(memoFunction(1));
}

test();