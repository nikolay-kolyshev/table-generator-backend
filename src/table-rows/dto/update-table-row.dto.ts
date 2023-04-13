import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTableRowDto {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly surname?: string;

  @ApiPropertyOptional()
  readonly age?: number;

  @ApiPropertyOptional()
  readonly cityId?: number;
}
