import {
  setupStubs,
  restoreStubToOriginals,
} from "../../main/raw_things/TinyMockLib.js";
import { tests, assertEquals } from "../../main/raw_things/TinyUTLib.js";

tests({
  givenAnonymousObject_stubOneOfItsMethod_assertStubCorrectly: function () {
    const createRealObject = function () {
      return {
        fetchData: function () {
          return originalRepsonse;
        },
      };
    };

    const myInstance = createRealObject();
    const originalRepsonse = "Real Data";
    const mockRepsonse = "Mock Data";

    setupStubs(myInstance, "fetchData", () => {
      return mockRepsonse;
    });

    assertEquals(mockRepsonse, myInstance.fetchData());

    restoreStubToOriginals(myInstance, "fetchData");

    assertEquals(originalRepsonse, myInstance.fetchData());
  },

  givenObjectWithMethodExtendFromParentPrototype_stubOneOfItsMethod_assertStubCorrectly:
    function () {
      const Animal = function (name) {
        this.name = name;
      };

      Animal.prototype.sayName = function () {
        return this.name;
      };

      const dog = new Animal("Buddy");

      const originalRepsonse = "Buddy";
      const mockRepsonse = "Mock Data";
      setupStubs(dog, "sayName", () => {
        return mockRepsonse;
      });

      assertEquals(mockRepsonse, dog.sayName());

      restoreStubToOriginals(dog, "sayName");

      assertEquals(originalRepsonse, dog.sayName());
    },

  givenObjectWithMethodExtendFromGrandParentChainedPrototype_stubOneOfItsMethod_assertStubCorrectly:
    function () {
      function Animal(name) {
        this.name = name;
      }

      Animal.prototype.sayName = function () {
        return this.name;
      };

      function Bird(name, color) {
        Animal.call(this, name);
        this.color = color;
      }

      Bird.prototype = Object.create(Animal.prototype);
      Bird.prototype.constructor = Bird;

      Bird.prototype.fly = function () {
        return `${this.name} is flying`;
      };

      function Parrot(name, color, canSpeak) {
        Bird.call(this, name, color);
        this.canSpeak = canSpeak;
      }

      Parrot.prototype = Object.create(Bird.prototype);
      Parrot.prototype.constructor = Parrot;

      Parrot.prototype.speak = function () {
        if (this.canSpeak) {
          return `${this.name} says '${this.name} wants a cracker'`;
        } else {
          return `${this.name} can not speak`;
        }
      };

      const parrot = new Parrot("Polly", "green", true);

      const originalRepsonse = "Polly";
      const mockRepsonse = "Mock Data";
      setupStubs(parrot, "sayName", () => {
        return mockRepsonse;
      });

      assertEquals(mockRepsonse, parrot.sayName());

      restoreStubToOriginals(parrot, "sayName");

      assertEquals(originalRepsonse, parrot.sayName());
    },

  givenObjectWithMethodExtendFromGrandParentChainedPrototypeViaClassFashion_stubOneOfItsMethod_assertStubCorrectly:
    function () {
      class Animal {
        constructor(name) {
          this.name = name;
        }

        sayName() {
          return this.name;
        }
      }

      class Bird extends Animal {
        constructor(name, color) {
          super(name);
          this.color = color;
        }

        fly() {
          return `${this.name} is flying`;
        }
      }

      class Parrot extends Bird {
        constructor(name, color, canSpeak) {
          super(name, color);
          this.canSpeak = canSpeak;
        }

        speak() {
          if (this.canSpeak) {
            return `${this.name} says 'Polly wants a cracker'`;
          } else {
            return `${this.name} cannot speak`;
          }
        }
      }

      const parrot = new Parrot("Polly", "green", true);

      const originalRepsonse = "Polly";
      const mockRepsonse = "Mock Data";
      setupStubs(parrot, "sayName", () => {
        return mockRepsonse;
      });

      assertEquals(mockRepsonse, parrot.sayName());

      restoreStubToOriginals(parrot, "sayName");

      assertEquals(originalRepsonse, parrot.sayName());
    },
});
