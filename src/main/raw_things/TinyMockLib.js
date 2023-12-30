const _mockingInstance = (function (global, factoryFunc) {
  // Check if the code is running in a Node.js environment
  if (typeof exports === "object" && typeof module !== "undefined") {
    // CommonJS: export the module
    _mock = factoryFunc();
    module.exports = _mock;
    return _mock;
  }

  // ESM or other environment: attach the module to the global object
  global._mock = factoryFunc();

  // Because in my pet project, I am currently setting my local NodeJs packages.json as  "type": "module"
  // So at here I return it back the top level of the current module to export it for all other files can use and extract _mock
  return global._mock;
})(globalThis, function () {
  const _mock = {};

  // Stubing section
  _mock.stubFuncToOriginalFunc = new Map();
  _mock.prototypeNameToOriginalPrototype = new Map();

  _mock.setupStubs = function (instance, funcName, mockImpl) {
    const targetPrototype = instance.prototype;
    const originalMethod = targetPrototype[funcName];

    targetPrototype[funcName] = function (...listArgs) {
      return mockImpl(listArgs);
    };

    _mock.prototypeNameToOriginalPrototype.set(
      `${targetPrototype.constructor.name}`,
      targetPrototype
    );

    _mock.stubFuncToOriginalFunc.set(
      `${targetPrototype.constructor.name}.${funcName}`,
      originalMethod
    );
  };

  _mock.resetAllStubs = function () {
    for (const key in _mock.stubFuncToOriginalFunc) {
      const [prototypeName, funcName] = key.split(".");
      const originalFunc = _mock.stubFuncToOriginalFunc.get(key);

      if (!originalFunc) {
        console.log(
          `Can not find out the original function with the key ${key}`
        );
        continue;
      }

      const originalPrototype =
        _mock.prototypeNameToOriginalPrototype.get(prototypeName);

      if (!originalPrototype) {
        console.log(
          `Can not find out the original prototype with the key ${prototypeName}`
        );
        continue;
      }

      // back to original func
      originalPrototype[funcName] = originalFunc;
    }

    _mock.stubFuncToOriginalFunc.clear();
    _mock.prototypeNameToOriginalPrototype.clear();
  };

  _mock.restoreStubToOriginals = function (instance, funcName) {
    const targetPrototype = instance.prototype;
    const keyToOriginalFunc = `${targetPrototype.constructor.name}.${funcName}`;
    const prototypeName = `${targetPrototype.constructor.name}`;

    const originalFunc = _mock.stubFuncToOriginalFunc.get(keyToOriginalFunc);
    if (!originalFunc) {
      console.log(`Can not find out the original function with the key ${key}`);
    }

    const originalPrototype =
      _mock.prototypeNameToOriginalPrototype.get(prototypeName);
    if (!originalPrototype) {
      console.log(
        `Can not find out the original prototype with the key ${prototypeName}`
      );
    }

    originalPrototype[funcName] = originalFunc;
    _mock.stubFuncToOriginalFunc.delete(keyToOriginalFunc);
    _mock.prototypeNameToOriginalPrototype.clear(prototypeName);
  };

  return _mock;
});

export const { setupStubs, resetAllStubs, restoreStubsToOriginals } =
  _mockingInstance;
