import { ApiProperty } from '@nestjs/swagger';

export class CopyTableDto {
  @ApiProperty({ name: 'tableContainerId' })
  tableContainerId: number;
  @ApiProperty({ name: 'copiedTableId' })
  copiedTableId: number;
}
