import { lruCache, singletonCache } from './caches';
import { Cache, Limit } from './types';
import { MemoizedResource } from './types/memoized-resource';

function createCache<T>(limit?: Limit): Cache<T> {
  if (limit === undefined) {
    return singletonCache<T>();
  }

  return lruCache<T>(limit);
}

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
