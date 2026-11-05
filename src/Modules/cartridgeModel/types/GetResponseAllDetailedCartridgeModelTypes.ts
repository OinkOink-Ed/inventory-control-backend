import { AssertTManyProperty } from "@common/types/typesUtils";
import type { User } from "@Modules/user/entities/User";
import type { CartridgeModel } from "../entities/CartridgeModel";

export type StrictCreatorType = Pick<
  User,
  "id" | "lastname" | "name" | "patronymic"
>;
export type CreatorType = Omit<Pick<CartridgeModel, "creator">, "creator"> & {
  creator: StrictCreatorType;
};

export type Assert = AssertTManyProperty<CartridgeModel, CreatorType>;
