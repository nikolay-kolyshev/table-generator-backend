import { PageOptionsDto } from '@/common/pagination/dto/page-options.dto';

export class GetAllTableRowsByTableIdQuery {
  constructor(
    public readonly tableId: number,
    public readonly dto: PageOptionsDto,
  ) {}
}
export class GetTableRowByIdQuery {
  constructor(public readonly id: number) {}
}
export class GetTableRowsByIdsAndTableId {
  constructor(public readonly ids: number[], public readonly tableId: number) {}
}

export const TableRowsQueries = {
  GetAllTableRowsByTableIdQuery,
  GetTableRowByIdQuery,
  GetTableRowsByIdsAndTableId,
};
