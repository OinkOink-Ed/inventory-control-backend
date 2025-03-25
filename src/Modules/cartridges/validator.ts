import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Cartridges } from 'src/common/entities/cartridges';
import { Repository } from 'typeorm';

// this. оказывается пустым, нужно читать об DI
@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Cartridges)
    private repoCartridges: Repository<Cartridges>,
  ) {}

  async validate(name: any, args: ValidationArguments): Promise<boolean> {
    const res = await this.repoCartridges.findOne({
      where: { modelName: name },
    });
    console.log(res);
    return false;
    //   return await this.repoCartridges.findOne({where: {modelName: name}}).then(user => {
    //     if (user) return false;
    //     return true;
    //   });
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
