import { Module } from '@nestjs/common';
import { TableContainersModule } from './table-containers/table-containers.module';
import { TablesModule } from './tables/tables.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import configuration from '../config/configuration';
import { AuthModule } from '@/auth/auth.module';
import { LoggerModule } from '@/common/logger/logger.module';
import { TableRowsModule } from './table-rows/table-rows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db.postgresql.host'),
        port: +configService.get('db.postgresql.port'),
        username: configService.get('db.postgresql.username'),
        password: configService.get('db.postgresql.password'),
        database: configService.get('db.postgresql.database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    AuthModule,
    TableContainersModule,
    TablesModule,
    CitiesModule,
    TableRowsModule,
  ],
})
export class AppModule {}
