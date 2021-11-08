import { Entry } from './entry';

export type Cache<T> = {
  readonly get: (key: keyof Entry<T>) => T | undefined;
  readonly put: (key: keyof Entry<T>, value: T) => T;
};
