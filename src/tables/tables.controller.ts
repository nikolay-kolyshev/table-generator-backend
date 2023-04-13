import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TablesService } from '@/tables/tables.service';
import { CreateTableDto } from '@/tables/dto/create-table.dto';
import { TABLES_API_TAG } from '@/tables/tables.constants';

@ApiTags(TABLES_API_TAG)
@Controller(TABLES_API_TAG)
export class TablesController {
  constructor(private tableService: TablesService) {}

  @ApiOperation({ summary: 'Получить все побочные таблицы по id таблицы' })
  @HttpCode(HttpStatus.OK)
  @Get('/side-tables-by-table/:tableId')
  getAllSideTablesByTableContainerId(
    @Param('tableContainerId') tableContainerId: number,
  ) {
    return this.tableService.getAllSideTablesByTableContainerId(
      tableContainerId,
    );
  }

  @ApiOperation({ summary: 'Получить главную таблицу по id таблицы' })
  @HttpCode(HttpStatus.OK)
  @Get('/main-table-by-table/:tableId')
  getMainTableByTableContainerId(
    @Param('tableContainerId') tableContainerId: number,
  ) {
    return this.tableService.getMainTableByTableContainerId(tableContainerId);
  }

  @ApiOperation({ summary: 'Получить таблицы по id этой таблицы' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getTableById(@Param('id') id: number) {
    return this.tableService.getTableById(id);
  }

  @ApiOperation({ summary: 'Создать новую таблицу' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createTable(@Body() dto: CreateTableDto) {
    return this.tableService.createTable(dto);
  }

  @ApiOperation({ summary: 'Удалить таблицу по id' })
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteTableById(@Param('id') id: number) {
    await this.tableService.deleteTableById(id);
  }
}
