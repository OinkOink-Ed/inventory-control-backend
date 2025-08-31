import type { User } from '../entities/User';
import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Division } from '@Modules/division/entities/Division';

export type Assert = AssertTManyProperty<User, DivisionType>;

export type StrictDivision = Pick<Division, 'id'>;
export type DivisionType = Omit<Pick<User, 'division'>, 'division'> & {
  division: StrictDivision[];
};
