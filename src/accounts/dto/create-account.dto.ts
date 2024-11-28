import { Account } from '@prisma/client';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateAccountDto implements Dto<Account> {
  @IsUUID()
  companyId: Id;

  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsString()
  title: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  githubId: string;

  @IsUUID(4, { each: true })
  skills: Id[];
}
