import { FindOptionsSelect } from 'typeorm';

export type AssertTManyProperty<
  T,
  Props extends Record<string, any>,
> = T extends { [K in keyof Props]: Props[K] } ? T : never;

export type RequiredFindOptionsSelect<T> = Required<FindOptionsSelect<T>>;
