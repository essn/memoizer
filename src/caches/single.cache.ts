import { Cache, Entry } from '../types';

const singleCache = function <T>(): Cache<T> {
  const entry = new Map<keyof Entry<T>, T>();

  return {
    get(key: keyof Entry<T>): T | undefined {
      return entry.get(JSON.stringify(key));
    },

    put(key: keyof Entry<T>, value: T): T {
      entry.clear();
      entry.set(JSON.stringify(key), value);
      return value;
    }
  };
};

export { singleCache };
