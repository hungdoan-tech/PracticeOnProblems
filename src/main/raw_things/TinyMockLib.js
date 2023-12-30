const _mockingInstance = (function (global, factoryFunc) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    const _mock = factoryFunc();
    module.exports = _mock;
    return _mock;
  }

  global._mock = factoryFunc();

  return global._mock;
})(globalThis, function () {
  const _mock = {};

  const originalMethodsMap = new WeakMap();

  const findFuncInAllPrototype = function (instance, methodName) {
    let currentPrototype = Object.getPrototypeOf(instance);

    while (currentPrototype && !originalMethod) {
      if (
        currentPrototype.hasOwnProperty(methodName) &&
        typeof currentPrototype[methodName] === "function"
      ) {
        originalMethod = currentPrototype[methodName];
      } else {
        currentPrototype = Object.getPrototypeOf(currentPrototype);
      }
    }

    if (!originalMethod) {
      return null;
    }

    return originalMethod;
  };

  _mock.setupStubs = function (instance, methodName, mockImpl) {
    let originalMethod = instance[methodName];

    if (!originalMethod) {
      originalMethod = findFuncInAllPrototype(instance, methodName);
    }

    if (!originalMethod) {
      throw Error(`Method ${methodName} not found in the prototype chain`);
    }

    instance[methodName] = function (...listArgs) {
      return mockImpl(listArgs);
    };

    if (!originalMethodsMap.has(instance)) {
      originalMethodsMap.set(instance, new Map());
    }
    originalMethodsMap.get(instance).set(methodName, originalMethod);
  };

  _mock.resetAllStubs = function (instance) {
    if (originalMethodsMap.has(instance)) {
      const originalMethods = originalMethodsMap.get(instance);
      for (const [funcName, originalMethod] of originalMethods.entries()) {
        instance[funcName] = originalMethod;
      }
      originalMethods.clear();
      originalMethodsMap.delete(instance);
    }
  };

  _mock.restoreStubToOriginals = function (instance, methodName) {
    if (originalMethodsMap.has(instance)) {
      const originalMethods = originalMethodsMap.get(instance);
      if (originalMethods.has(methodName)) {
        instance[methodName] = originalMethods.get(methodName);
        originalMethods.delete(methodName);
      }
    }
  };

  return _mock;
});

export const { setupStubs, resetAllStubs, restoreStubToOriginals } =
  _mockingInstance;
