import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TableRowsService } from '@/table-rows/table-rows.service';
import { CreateTableRowDto } from '@/table-rows/dto/create-table-row.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TABLE_ROWS_API_TAG } from '@/table-rows/table-rows.constants';
import { UpdateTableRowDto } from '@/table-rows/dto/update-table-row.dto';
import { PageOptionsDto } from '@/common/pagination/dto/page-options.dto';

@ApiTags(TABLE_ROWS_API_TAG)
@Controller(TABLE_ROWS_API_TAG)
export class TableRowsController {
  constructor(private tableRowsService: TableRowsService) {}

  @ApiOperation({ summary: 'Получить все строки таблицы по id таблицы' })
  @HttpCode(HttpStatus.OK)
  @Get('/by-table/:tableId')
  getAllTableRowsByTableId(
    @Param('tableId') tableId: number,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return this.tableRowsService.getAllTableRowsByTableId(
      tableId,
      pageOptionsDto,
    );
  }

  @ApiOperation({ summary: 'Получить строку таблицы по id этой строки' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getTableRowById(@Param('id') id: number) {
    return this.tableRowsService.getTableRowsById(id);
  }

  @ApiOperation({ summary: 'Создать новую строку таблицы' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createTableRow(@Body() dto: CreateTableRowDto) {
    return this.tableRowsService.createTableRow(dto);
  }

  @ApiOperation({ summary: 'Обновить строку таблицы' })
  @HttpCode(HttpStatus.OK)
  @Put('/update/:id')
  updateTableRow(@Body() dto: UpdateTableRowDto, @Param('id') id: number) {
    return this.tableRowsService.updateTableRow(id, dto);
  }

  @ApiOperation({ summary: 'Удалить строку таблицы по id' })
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteTableRowById(@Param('id') id: number) {
    await this.tableRowsService.deleteTableRowById(id);
  }
}
