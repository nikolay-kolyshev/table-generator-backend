import {
  ConsoleLogger,
  Injectable,
  LoggerService as IBaseLoggerService,
  Scope,
} from '@nestjs/common';
import {
  Context,
  GlobalContextSetter,
  LogWithContext,
} from '@/common/logger/logger.decorators';
import * as colors from 'colors';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger implements IBaseLoggerService {
  /**
   * Write a 'log' level log.
   */
  @LogWithContext
  public override log(
    message: any,
    @Context context?: string,
    isSuccess?: boolean,
  ): void {
    console.info(
      isSuccess ? '🟢' : '🔵',
      colors[isSuccess ? 'bgGreen' : 'bgBlue'].black.italic(
        this.getWrappedMessage(message),
      ),
    );
  }

  /**
   * Write a 'warn' level log, if the configured level allows for it.
   */
  @LogWithContext
  public override warn(message: any, @Context context?: string): void {
    console.warn(
      '🟡',
      colors.bgYellow.black.italic(this.getWrappedMessage(message)),
    );
  }

  /**
   * Write an 'error' level log, if the configured level allows for it.
   */
  @LogWithContext
  public override error(
    message: any,
    stack?: string,
    @Context context?: string,
  ): void {
    console.error(
      '🔴',
      colors.bgRed.black.italic(this.getWrappedMessage(message)),
    );
  }

  /**
   * Write a 'log' level log.
   */
  public success(message: any, context?: string): void {
    this.log(message, context, true);
  }

  @GlobalContextSetter
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public set globalContext(context: string) {}

  // FIXME: Разобраться, почему не работает полиморфизм от базового класса в случае с этим методом
  /**
   * @deprecated Используйте сеттер globalContext для установки глобального контекста.
   * */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public override setContext() {}

  private getWrappedMessage(message: any) {
    return ` -- ${message} -- `;
  }
}
