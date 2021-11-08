import { Cache, Entry } from '../types';

/**
 * Creates a cache that only stores a single entry.
 *
 * @template T
 * @return {*}  {Cache<T>}
 */
const singleCache = function <T>(): Cache<T> {
  const entry = new Map<keyof Entry<T>, T>();

  return {
    /**
     * Gets the value of the entry if it exists.
     *
     * @param {keyof Entry<T>} key
     * @return {*}  {(T | undefined)}
     */
    get(key: keyof Entry<T>): T | undefined {
      return entry.get(JSON.stringify(key));
    },

    /**
     * Sets the value of an entry. Clears all other entries.
     *
     * @param {keyof Entry<T>} key
     * @param {T} value
     * @return {*}  {T}
     */
    put(key: keyof Entry<T>, value: T): T {
      entry.clear();
      entry.set(JSON.stringify(key), value);
      return value;
    }
  };
};

export { singleCache };
