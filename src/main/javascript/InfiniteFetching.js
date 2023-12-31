// fetchList is provided
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>

/**
 * Using async/await loop
 */
async function fetchListWithAmount(amount = 5) {
  let cursor;
  const result = [];

  while (result.length < amount) {
    const { items } = await fetchList(cursor);
    if (items.length === 0) {
      break;
    }

    result.push(...items);
    cursor = items[items.length - 1].id;
    continue;
  }
  return result.slice(0, amount);
}

/**
 * Using async iterator
 */
async function fetchListWithAmount(amount = 5) {
  const result = [];

  for await (const nextItems of fetchListIterator()) {
    result.push(...nextItems);
  }
  return result.slice(0, amount);

  function fetchListIterator() {
    let totalAmountFetched = 0;
    let cursor;

    return {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            const { items } = await fetchList(cursor);
            // If API is exhausted OR we reached desired amount -> stop
            if (items.length === 0 || totalAmountFetched > amount) {
              return { done: true };
            }

            totalAmountFetched += items.length;
            cursor = items[items.length - 1].id;

            return {
              done: false,
              value: items,
            };
          },
        };
      },
    };
  }
}

/**
 * Using async generator
 */
async function fetchListWithAmount(amount = 5) {
  const result = [];

  for await (const nextItems of fetchListGenerator()) {
    result.push(...nextItems);
  }
  return result.slice(0, amount);

  async function* fetchListGenerator() {
    let totalAmountFetched = 0;
    let cursor;

    while (totalAmountFetched < amount) {
      const { items } = await fetchList(cursor);
      if (items.length === 0) break;
      cursor = items[items.length - 1].id;
      totalAmountFetched += items.length;
      yield items;
    }
  }
}

/**
 * Using recursion and Promise
 */
function fetchListWithAmount(amount = 5) {
  return new Promise((resolve) => {
    const result = [];
    getItems();

    function getItems(cursor) {
      fetchList(cursor).then(({ items }) => {
        result.push(...items);
        if (items.length === 0 || items.length >= amount) {
          return resolve(result.slice(0, amount));
        }
        getItems(items[items.length - 1].id);
      });
    }
  });
}
