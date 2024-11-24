import { OmitType } from "@nestjs/swagger";
import { Cartridges } from "src/common/entities/cartridges";

export class CreateCartridgeDto extends OmitType(Cartridges, ["id"]) { };

export class CreatedResponseCartridgeDto extends Cartridges { }