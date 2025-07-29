import type { Division } from '@Modules/division/entities/Division';
import type { Warehouse } from '../entities/Warehouse';
import type { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { AssertTManyProperty } from '@common/utils/typesUtils';

export type Assert = AssertTManyProperty<Warehouse, DivisionType>;

type StrictKabinet = Pick<Kabinet, 'id' | 'number'>;
type KabinetType = Omit<Pick<Division, 'kabinets'>, 'kabinets'> & {
  kabinets: StrictKabinet[];
};

export type StrictDivision = Omit<
  Pick<Division, 'id' | 'kabinets'>,
  'kabinets'
> &
  KabinetType;
export type DivisionType = Omit<Pick<Warehouse, 'division'>, 'division'> & {
  division: StrictDivision;
};
