import { ApiProperty } from '@nestjs/swagger';

export class CreateTableRowDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly cityId: number;

  @ApiProperty()
  readonly tableContainerId: number;
}
