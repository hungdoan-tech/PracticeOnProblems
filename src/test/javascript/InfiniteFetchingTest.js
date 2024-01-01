import {
  fetchList,
  fetchListWithAmount,
} from "../../main/javascript/InfiniteFetching.js";

import { setupStub } from "../../main/raw_things/MockingLibrary.js";

// Create a mock data store with a large number of items
const mockDataStore = [];
for (let i = 1; i <= 1000; i++) {
  mockDataStore.push({ id: i, name: `Item ${i}` });
}

globalThis.fetchList = fetchList;

setupStub(globalThis, "fetchList", async (sinceId) => {
  const startIndex = sinceId
    ? mockDataStore.findIndex((item) => item.id === sinceId) + 1
    : 0;

  // Return a subset of items starting from the startIndex
  return Promise.resolve({
    items: mockDataStore.slice(startIndex, startIndex + 5),
  });
});

const abc = await fetchListWithAmount(5);
console.log(abc);
