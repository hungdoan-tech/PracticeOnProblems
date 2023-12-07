const mock = {
    methodToOriginalImpl: {},

    setMock: (targetPrototype, methodName, mockImpl) => {
        const originalMethod = targetPrototype[methodName];

        targetPrototype[methodName] = (...args) => {
            return mockImpl(args);
        };

        mock[`${targetPrototype.constructor.name}`] = targetPrototype;
        mock.methodToOriginalImpl[`${targetPrototype.constructor.name}.${methodName}`] = originalMethod;
    },

    restoreOriginals: () => {
        for (const key in mock.methodToOriginalImpl) {
            const [className, methodName] = key.split('.');
            const originalMethod = mock.methodToOriginalImpl[key];

            if (originalMethod) {
                const classPrototype = mock[className];

                if (classPrototype) {
                    classPrototype[methodName] = originalMethod;
                }
            }
        }

        mock.methodToOriginalImpl = {};
    },
};

class MyClass {
    fetchData() {
        return 'Real Data';
    }
}
const myInstance = new MyClass();
mock.setMock(MyClass.prototype, 'fetchData', () => {
    return 'Mocked Data';
});
console.log(myInstance.fetchData());
mock.restoreOriginals();
console.log(myInstance.fetchData()); 
