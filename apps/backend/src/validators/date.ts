import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

/**
 * validates if a string is parseable by the Date object constructor
 */
export function IsDatetimePrismaCompatible(validationOptions?: ValidationOptions) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsDateParseable',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(value);
        },
        defaultMessage(args?: ValidationArguments): string {
          return `${args.property} should have format: 2021-01-01T00:00:00.000+08:00 or 2021-04-30T21:59:59.999Z`;
        }
      }
    });
  };
}
