import { Entry } from './entry';

export type Cache<T> = {
  readonly get: (key: keyof Entry) => T | undefined;
  readonly put: (key: keyof Entry, value: T) => T;
};
