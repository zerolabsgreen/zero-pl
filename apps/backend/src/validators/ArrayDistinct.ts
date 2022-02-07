import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsStringArrayDistinctConstraint implements ValidatorConstraintInterface {
  validate(stringArray: string[]) {
    const detected = new Map<string, boolean>();

    for (const string of stringArray) {
      if (detected[string]) { // This string was already detected before
        return false;
      }

      detected[string] = true;
    }

    return true;
  }

  defaultMessage(args?: ValidationArguments): string {
    return `[${args.property}]: ${args.value} should not contain duplicates`;
  }
}

export function IsStringArrayDistinct(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStringArrayDistinctConstraint,
    });
  };
}