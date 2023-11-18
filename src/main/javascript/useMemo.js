function useMemo(func, resolver = (...args) => args.join('_')) {
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

function test(){
    function increaseOne(b){
        return b + 1
    }

    const memoFunction = useMemo(increaseOne)

    console.log(memoFunction(1));
    console.log(memoFunction(5));
    console.log(memoFunction(1));
}

test()