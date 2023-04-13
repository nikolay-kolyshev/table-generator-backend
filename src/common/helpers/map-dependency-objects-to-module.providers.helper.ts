import { Provider } from '@nestjs/common';
export const mapDependencyObjectsToModuleProviders = (
  depsObjects: Array<Record<string, Provider>>,
): Provider[] => {
  return depsObjects.flatMap(Object.values);
};
