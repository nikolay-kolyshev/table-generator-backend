import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ name: 'containerId' })
  readonly containerId: number;

  @ApiPropertyOptional({ name: 'isMain' })
  readonly isMain?: boolean;

  @IsArray()
  @ApiPropertyOptional({ name: 'name', isArray: true })
  readonly rowsIds?: number[];

  @ApiPropertyOptional({ name: 'copiedTableId' })
  readonly copiedTableId?: number;
}
