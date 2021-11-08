import { Cache, Entry, Limit } from '../types';

/**
 * Creates a new LRU cache.
 *
 * @template T
 * @param {Limit} [limit] The maximum number of items to store in the cache.
 * @return {*}  {Cache<T>}
 */
const lruCache = function <T>(limit: Limit): Cache<T> {
  const entries = new Map<keyof Entry<T>, T>();

  return {
    /**
     * Returns a given key from the cache if it exists.
     *
     * @param {keyof Entry<T>} key
     * @return {*}  {(T | undefined)}
     */
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

    /**
     * Adds a given key to the cache. Removes the oldest entry if the cache
     * is full.
     *
     * @param {keyof Entry<T>} key
     * @param {T} value
     * @return {*}  {T}
     */
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
