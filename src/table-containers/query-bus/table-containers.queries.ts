export class GetAllTableContainersPreviewQuery {}
export class GetTableContainerByIdQuery {
  constructor(public readonly id: number) {}
}
export const TableContainersQueries = {
  GetAllTableContainersPreviewQuery,
  GetTableContainerByIdQuery,
};
