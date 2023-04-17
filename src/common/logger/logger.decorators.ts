import { LoggerService } from '@/common/logger/logger.service';
import {
  CONTEXT_PROPERTY_INDEX_METADATA_KEY,
  GLOBAL_CONTEXT_VALUE_METADATA_KEY,
} from '@/common/logger/logger.symbols';
import * as colors from 'colors';

export const Context = (
  target: LoggerService,
  propertyKey: string,
  parameterIndex: number,
) => {
  Reflect.defineMetadata(
    CONTEXT_PROPERTY_INDEX_METADATA_KEY,
    parameterIndex,
    target,
  );
};

export const GlobalContextSetter = (
  target: LoggerService,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originalSetter = descriptor.set;

  descriptor.set = async function (context: string) {
    Reflect.defineMetadata(GLOBAL_CONTEXT_VALUE_METADATA_KEY, context, target);
    originalSetter.call(this, context);
  };
};

export const LogWithContext = (
  target: LoggerService,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const originalMethod = descriptor.value;

  const contextParameterIndex: number = Reflect.getOwnMetadata(
    CONTEXT_PROPERTY_INDEX_METADATA_KEY,
    target,
  );

  descriptor.value = async function (...props) {
    const globalContextValue: string = Reflect.getOwnMetadata(
      GLOBAL_CONTEXT_VALUE_METADATA_KEY,
      target,
    );

    const context = props?.[contextParameterIndex] ?? globalContextValue;
    if (context) {
      console.group(
        colors.bgWhite.black(` -- ${colors.bold(context)} -- [context] -- `),
        '--------------------------------------',
      );
    }
    originalMethod.apply(this, props);
    if (context) {
      console.groupEnd();
      console.log(
        '----------------------------------------------------------------\n',
      );
    }
  };
};
