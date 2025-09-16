import { IsInt, Min, IsString, Length } from 'class-validator';

export class DebitDto {
  @IsString()
  @Length(3, 100)
  orderId!: string;

  @IsInt()
  @Min(1)
  amount!: number; // TKN (inteiro)
}
