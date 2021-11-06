import { Entry, SingletonCache } from '../../types';

export default function singleTonCache(): SingletonCache {
  const entry = new Map<keyof Entry, unknown>();

  return {
    get(key: keyof Entry): unknown | null {
      return entry.get(JSON.stringify(key));
    },

    put(key: keyof Entry, value: unknown): unknown {
      entry.clear();
      entry.set(JSON.stringify(key), value);
      return value;
    }
  };
}
