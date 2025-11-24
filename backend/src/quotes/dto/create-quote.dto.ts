import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Average monthly energy bill in local currency' })
  @IsNumber()
  @IsPositive()
  @Min(0)
  averageMonthlyBill!: number;
}
