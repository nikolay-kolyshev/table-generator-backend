import { LoggerService } from '@/common/logger/logger.service';
import { CONTEXT_PROPERTY_METADATA_KEY } from '@/common/logger/logger.symbols';
import * as colors from 'colors';

export const Context = (
  target: LoggerService,
  propertyKey: string,
  parameterIndex: number,
) => {
  Reflect.defineMetadata(
    CONTEXT_PROPERTY_METADATA_KEY,
    parameterIndex,
    target,
    propertyKey,
  );
};

export const logWithContext = (
  target: LoggerService,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originalMethod = descriptor.value;

  const contextParameterIndex: number = Reflect.getOwnMetadata(
    CONTEXT_PROPERTY_METADATA_KEY,
    target,
    propertyKey,
  );

  descriptor.value = async function (...props) {
    const contextProperty = props?.[contextParameterIndex];
    if (contextProperty) {
      console.group(
        colors.bgWhite.black(
          ` -- ${colors.bold(contextProperty)} -- [context] -- `,
        ),
        '--------------------------------------',
      );
    }
    originalMethod.apply(this, props);
    if (contextProperty) {
      console.groupEnd();
      console.log(
        '----------------------------------------------------------------\n',
      );
    }
  };
};
