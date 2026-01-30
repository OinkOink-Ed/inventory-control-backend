import { AssertTManyProperty } from '@common/utils/typesUtils';
import type { Division } from '@Modules/division/entities/Division';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';

export type Assert = AssertTManyProperty<Kabinet, DivisionType>;

export type StrictDivisionType = Pick<Division, 'name'>;
export type DivisionType = Omit<Pick<Kabinet, 'division'>, 'division'> & {
  division: StrictDivisionType;
};
