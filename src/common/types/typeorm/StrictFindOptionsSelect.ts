import { FindOptionsSelect } from "typeorm";

export type StrictFindOptionsSelect<T> = Required<FindOptionsSelect<T>>;
