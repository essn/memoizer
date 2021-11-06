import singletonCache from './lib/caches/singleton.cache';
import { SingletonCache } from './types';

function createCache(): SingletonCache {
  return singletonCache();
}

export default function memoizer() {
  const cache = createCache();

  return (fn) =>
    // eslint-disable-next-line functional/functional-parameters
    (...args) => {
      const value = cache.get(args);
      if (value === undefined) {
        return cache.put(args, fn.apply(fn, args));
      }
      return value;
    };
}
