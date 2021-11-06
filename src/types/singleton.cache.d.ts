import { Entry } from './entry';

export type SingletonCache = {
  readonly get: (key: keyof Entry) => unknown | boolean;
  readonly put: (key: keyof Entry, value: unknown) => unknown;
};
