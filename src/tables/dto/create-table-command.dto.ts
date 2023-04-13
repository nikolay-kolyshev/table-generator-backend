import { TableRowEntity } from '@/table-rows/entities/table-row.entity';

export class CreateTableCommandDto {
  readonly containerId: number;

  readonly isMain?: boolean;

  readonly rows?: TableRowEntity[];
}
