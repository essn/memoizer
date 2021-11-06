import { Entry, Equals, SingletonCache } from '../../types';

export default function singleTonCache(equals: Equals): SingletonCache {
  // eslint-disable-next-line functional/no-let
  let entry: Entry;

  return {
    get(key: keyof Entry): unknown | boolean {
      if (entry && equals(key, entry.key)) {
        return entry.value;
      }

      return false;
    },

    put(key: keyof Entry, value: unknown): unknown {
      entry = { key, value };
      return value;
    }
  };
}
