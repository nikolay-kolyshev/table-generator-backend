export class GetAllCitiesQuery {}
export class GetCityByIdQuery {
  constructor(public readonly id: number) {}
}
export class GetCityByNameQuery {
  constructor(public readonly name: string) {}
}

export const CitiesQueries = {
  GetAllCitiesQuery,
  GetCityByIdQuery,
  GetCityByNameQuery,
};
