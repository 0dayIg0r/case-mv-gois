import { IsInt, Min, IsString, Length } from 'class-validator';

export class CreditDto {
  @IsString()
  @Length(3, 100)
  roundId!: string;

  @IsInt()
  @Min(1)
  amount!: number; // TKN (inteiro)
}
