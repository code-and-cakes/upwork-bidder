import { Account } from '@prisma/client';
import { IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateAccountDto implements Dto<Account> {
  @IsUUID()
  companyId: Id;

  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsString()
  upworkId: string;

  @IsString()
  title: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  githubId: string;

  @IsBoolean()
  isActive: boolean;

  @IsString({ each: true })
  skills: Id[];
}
