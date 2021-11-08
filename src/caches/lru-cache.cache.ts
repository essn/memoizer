import { Cache, Entry, Limit } from '../types';

const lruCache = function <T>(limit: Limit): Cache<T> {
  const entries = new Map<keyof Entry<T>, T>();

  return {
    get(key: keyof Entry<T>): T | undefined {
      const normalizedKey = JSON.stringify(key);
      const hasKey = entries.has(normalizedKey);

      // eslint-disable-next-line functional/no-let
      let entry: T = undefined;

      if (hasKey) {
        entry = entries.get(normalizedKey);
        entries.delete(normalizedKey);
        entries.set(normalizedKey, entry);
      }

      return entry;
    },

    put(key: keyof Entry<T>, value: T): T {
      const normalizedKey = JSON.stringify(key);

      if (entries.size >= limit) {
        const keyToDelete = entries.keys().next().value;
        entries.delete(keyToDelete);
      }

      entries.set(normalizedKey, value);

      return value;
    },
  };
};

export { lruCache };
