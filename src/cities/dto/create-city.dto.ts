import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ name: 'name' })
  readonly name: string;
}
