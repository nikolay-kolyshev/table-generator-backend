import {
  ConsoleLogger,
  Injectable,
  LoggerService as BaseLoggerService,
  Scope,
} from '@nestjs/common';
import { Context, logWithContext } from '@/common/logger/logger.decorators';
import * as colors from 'colors';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger implements BaseLoggerService {
  /**
   * Write a 'log' level log.
   */
  @logWithContext
  log(message: any, @Context context?: string, isSuccess?: boolean): void {
    console.info(
      isSuccess ? '🟢' : '🔵',
      colors[isSuccess ? 'bgGreen' : 'bgBlue'].black.italic(
        this.getWrappedMessage(message),
      ),
    );
  }

  /**
   * Write a 'log' level log.
   */
  success(message: any, context?: string): void {
    this.log(message, context, true);
  }

  /**
   * Write a 'warn' level log, if the configured level allows for it.
   */
  @logWithContext
  warn(message: any, @Context context?: string): void {
    console.warn(
      '🟡',
      colors.bgYellow.black.italic(this.getWrappedMessage(message)),
    );
  }

  /**
   * Write an 'error' level log, if the configured level allows for it.
   */
  @logWithContext
  error(message: any, stack?: string, @Context context?: string): void {
    console.error(
      '🔴',
      colors.bgRed.black.italic(this.getWrappedMessage(message)),
    );
  }

  private getWrappedMessage(message: any) {
    return ` -- ${message} -- `;
  }
}
