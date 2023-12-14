function stringify(data) {
  if ([NaN, null, undefined, Infinity].includes(data)) {
    return 'null';
  }
  const type = typeof data;
  switch (type) {
    case 'function': return undefined;
    case 'bigint': throw Error('bigints are not supported');
    case 'string': return `"${data}"`;
    case 'symbol': return 'null';
    case 'object': {
      if (data instanceof Date) {
        return `"${data.toISOString()}"`;
      }
      if (Array.isArray(data)) {
        return `[${data.map(e => stringify(e)).join(',')}]`;
      }
      return '{' + Object.keys(data).filter(key => data[key] !== undefined).map(key => `"${key}":${stringify(data[key])}`).join(',') + '}';
    }
    default: return String(data);
  }
}

const object = {
  'a': [Infinity, NaN, 6, Symbol('special')],
  'b': () => 123,
  'c': {
    'd': '7',
    'e': 3.4,
    'f': {
      'g': [1, new Date(), 3],
      'h': 'hung'
    }
  }
};

console.log(stringify(object));