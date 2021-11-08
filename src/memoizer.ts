import { lruCache, singleCache } from './caches';
import { Cache, Limit } from './types';
import { MemoizedResource } from './types/memoized-resource';

/**
 * Creates a cache that stores the results of a resource.
 * If a limit is specified an LRU Cache is created, otherwise
 * a single cache is created.
 *
 * @template T
 * @param {Limit} [limit] The maximum number of items to store in the cache.
 * @return {*}  {Cache<T>}
 */
function createCache<T>(limit?: Limit): Cache<T> {
  if (limit === undefined) {
    return singleCache<T>();
  }

  return lruCache<T>(limit);
}

/**
 * Returns a function that can wrap a resource and memoize its results.
 *
 * @export
 * @template T
 * @param {Limit} [limit] The maximum number of items to store in the cache.
 * @return {*}  {MemoizedResource<T>}
 */
export default function memoizer<T>(limit?: Limit): MemoizedResource<T> {
  const cache = createCache<T>(limit);

  return (fn) =>
    // eslint-disable-next-line functional/functional-parameters
    (...args): T => {
      const value: T | undefined = cache.get(args);
      if (value === undefined) {
        return cache.put(args, fn.apply(fn, args));
      }
      return value;
    };
}
