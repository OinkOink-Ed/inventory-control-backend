import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { CartridgeModels } from "src/common/entities/cartridgeModels";
import { Repository } from "typeorm";


//НУжен вот такой вот кастомный валидатор, но нужно читать доку как его правильно использовать
@Injectable()
@ValidatorConstraint({ name: "ValidateCartridgeModel", async: true })
export class ValidateCartridgeModel implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(CartridgeModels)
        private readonly repo: Repository<CartridgeModels>,
    ) { }

    async validate(modelName: string, args: ValidationArguments): Promise<boolean> {
        const model = await this.repo.findOne({ where: { modelName: modelName } });
        return !!model;
    }

    defaultMessage(args: ValidationArguments) {
        return "Указанная модель картриджа не существует.";
    }
}