import { LRUCache } from "../../main/raw_things/LRUCache.js";
import { tests, assertEquals } from "../../main/raw_things/TestingLibrary.js";

tests("Test LRU cache", {
  give4EntriesKeyToValues_insertTheseEntriesToLRUTimmingCachesMax3Elements_expectedMissTheOldestElement:
    function () {
      const lruCache = new LRUCache(3);

      lruCache.put(10, "one");
      lruCache.put(2, "two");
      lruCache.put(30, "three");

      assertEquals("one", lruCache.get(10));

      lruCache.put(4, "four", 0);

      assertEquals(-1, lruCache.get(2));
      assertEquals("three", lruCache.get(30));
      assertEquals(-1, lruCache.get(4));
    },
});
