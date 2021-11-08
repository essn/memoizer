import { Cache, Entry } from '../../types';

const singletonCache = function <T>(): Cache<T> {
  const entry = new Map<keyof Entry, T>();

  return {
    get(key: keyof Entry): T | undefined {
      return entry.get(JSON.stringify(key));
    },

    put(key: keyof Entry, value: T): T {
      entry.clear();
      entry.set(JSON.stringify(key), value);
      return value;
    },
  };
};

export { singletonCache };
