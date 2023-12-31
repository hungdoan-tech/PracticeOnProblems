/**
 * Creates a mocking instance for setting up stubs on object prototypes.
 * @returns {Object} An object containing methods for setting up stubs, resetting stubs, and restoring original methods.
 */
const MockingLibrary = function () {
  /**
   * A map for storing original methods of objects.
   * @type {WeakMap}
   */
  const originalMethodsMap = new WeakMap();

  /**
   * Finds a method in the prototype chain of an object.
   * @param {Object} instance - The object instance to search for the method.
   * @param {string} methodName - The name of the method to find.
   * @returns {Function|null} The found method or null if not found.
   */
  const findMethodInChainedPrototypes = function (instance, methodName) {
    let currentPrototype = Object.getPrototypeOf(instance);

    while (currentPrototype) {
      if (
        currentPrototype.hasOwnProperty(methodName) &&
        typeof currentPrototype[methodName] === "function"
      ) {
        return currentPrototype[methodName];
      }
      currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    return null;
  };

  /**
   * Set up a stub for a method on an object instance.
   * @param {Object} instance - The object instance on which to set up the stub.
   * @param {string} methodName - The name of the method to stub.
   * @param {Function} mockImpl - The mock implementation for the method.
   */
  this.setupStub = function (instance, methodName, mockImpl) {
    let originalMethod = instance[methodName];

    if (!originalMethod) {
      originalMethod = findMethodInChainedPrototypes(instance, methodName);
    }

    if (!originalMethod) {
      throw new Error(`Method ${methodName} not found in the prototype chain`);
    }

    instance[methodName] = function (...listArgs) {
      return mockImpl(listArgs);
    };

    if (!originalMethodsMap.has(instance)) {
      originalMethodsMap.set(instance, new Map());
    }
    originalMethodsMap.get(instance).set(methodName, originalMethod);
  };

  /**
   * Resets all stubs on an object instance.
   * @param {Object} instance - The object instance on which to reset the stubs.
   */
  this.resetAllStubs = function (instance) {
    if (originalMethodsMap.has(instance)) {
      const originalMethods = originalMethodsMap.get(instance);
      for (const [methodName, originalMethod] of originalMethods.entries()) {
        instance[methodName] = originalMethod;
      }
      originalMethods.clear();
      originalMethodsMap.delete(instance);
    }
  };

  /**
   * Restores a specific stub on an object instance.
   * @param {Object} instance - The object instance on which to restore the stub.
   * @param {string} methodName - The name of the method to restore.
   */
  this.restoreStubToOriginals = function (instance, methodName) {
    if (originalMethodsMap.has(instance)) {
      const originalMethods = originalMethodsMap.get(instance);
      if (originalMethods.has(methodName)) {
        instance[methodName] = originalMethods.get(methodName);
        originalMethods.delete(methodName);
      }
    }
  };
};

const _mock = new MockingLibrary();

if (typeof exports === "object" && typeof module !== "undefined") {
  module.exports = _mock;
} else {
  globalThis._mock = _mock;
}

export const { setupStub, resetAllStubs, restoreStubToOriginals } = _mock;
