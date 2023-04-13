import { IQuery } from '@nestjs/cqrs';

export class GetAllSideTablesByTableContainerIdQuery implements IQuery {
  constructor(public readonly tableContainerId: number) {}
}
export class GetMainTableByTableContainerIdQuery implements IQuery {
  constructor(public readonly tableContainerId: number) {}
}
export class GetTableByIdQuery implements IQuery {
  constructor(public readonly id: number) {}
}

export const TableQueries = {
  GetAllSideTablesByTableContainerIdQuery,
  GetMainTableByTableContainerIdQuery,
  GetTableByIdQuery,
};
