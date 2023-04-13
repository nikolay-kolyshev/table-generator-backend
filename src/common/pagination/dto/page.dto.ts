import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '@/common/pagination/dto/page-meta.dto';

export class PageDto<Entity> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: Entity[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: Entity[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
