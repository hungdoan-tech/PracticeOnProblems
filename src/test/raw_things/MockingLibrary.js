import {
  setupStubs,
  restoreStubsToOriginals,
} from "../../main/raw_things/TinyMockLib.js";

class MyClass {
  fetchData() {
    return "Real Data";
  }
}
const myInstance = new MyClass();
setupStubs(MyClass.prototype, "fetchData", () => {
  return "Mocked Data";
});
console.log(myInstance.fetchData());

restoreStubsToOriginals(myInstance, "fetchData");

console.log(myInstance.fetchData());
