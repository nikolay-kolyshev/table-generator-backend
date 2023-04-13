import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TableRowEntity } from '@/table-rows/entities/table-row.entity';
import { PageMetaDto } from '@/common/pagination/dto/page-meta.dto';
import { PageDto } from '@/common/pagination/dto/page.dto';
import { PageOptionsDto } from '@/common/pagination/dto/page-options.dto';

@Injectable()
export class TableRowsQueryRepository {
  constructor(
    @InjectRepository(TableRowEntity)
    private tableRowsRepository: Repository<TableRowEntity>,
  ) {}

  async findById(id: number): Promise<TableRowEntity> {
    return await this.tableRowsRepository.findOne({ where: { id } });
  }

  async findAll(dto: PageOptionsDto): Promise<PageDto<TableRowEntity>> {
    const queryBuilder =
      this.tableRowsRepository.createQueryBuilder('tableRow');

    queryBuilder
      .orderBy('tableRow.createdAt', 'DESC')
      .skip(dto.skip)
      .take(dto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: dto });

    return new PageDto(entities, pageMetaDto);
  }

  async findAllByIds(
    ids: number[],
    tableId: number,
  ): Promise<TableRowEntity[]> {
    return await this.tableRowsRepository.find({
      where: { id: In(ids), table: { id: tableId } },
    });
  }
}
