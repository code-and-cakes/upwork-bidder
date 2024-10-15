import { IsStrongPassword } from 'class-validator';

export const IsPassword = () =>
  IsStrongPassword({
    minSymbols: 0,
    minUppercase: 0,
    minLength: 8,
    minNumbers: 0,
  });
