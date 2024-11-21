import { OmitType } from "@nestjs/swagger";
import { Cartridge } from "src/common/entities/cartridge";

export class CreateCartridgeDto extends OmitType(Cartridge, ["id"]) { };

export class CreatedResponseCartridgeDto extends Cartridge { }