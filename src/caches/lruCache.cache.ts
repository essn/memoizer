import { Cache, Entry, Limit } from '../../types';

const lruCache = function <T>(limit: Limit): Cache<T> {
  const entries = new Map<keyof Entry, T>();

  return {
    get(key: keyof Entry): T | undefined {
      const normalizedKey = JSON.stringify(key);
      const hasKey = entries.has(normalizedKey);

      // eslint-disable-next-line functional/no-let
      let entry: T = null;

      if (hasKey) {
        entry = entries.get(normalizedKey);
        entries.delete(normalizedKey);
        entries.set(normalizedKey, entry);
      }

      return entry;
    },

    put(key: keyof Entry, value: T): T {
      if (entries.size >= limit) {
        const keyToDelete = entries.keys().next().value;
        entries.delete(keyToDelete);
      }

      entries.set(key, value);

      return value;
    },
  };
};

export { lruCache };
