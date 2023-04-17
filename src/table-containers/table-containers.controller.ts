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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TABLE_CONTAINERS_API_TAG } from '@/table-containers/table-containers.constants';
import { TableContainersService } from '@/table-containers/table-containers.service';
import { TableContainerView } from '@/table-containers/views/table-container.view';
import { TableContainerEntity } from '@/table-containers/entities/table-container.entity';
import { CopyTableDto } from '@/table-containers/dto/copy-table.dto';

@ApiTags(TABLE_CONTAINERS_API_TAG)
@Controller(TABLE_CONTAINERS_API_TAG)
export class TableContainersController {
  constructor(private tableContainersService: TableContainersService) {}

  @ApiOperation({
    summary:
      'Получить все контейнеры таблиц (preview-информацию о каждом контейнере)',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllTableContainersPreview(): Promise<TableContainerView[]> {
    return await this.tableContainersService.getAllTableContainersPreview();
  }

  @ApiOperation({ summary: 'Получить контейнер таблиц по id' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getTableContainerById(@Param('id') id): Promise<TableContainerEntity> {
    return await this.tableContainersService.getTableContainerById(id);
  }

  @ApiOperation({ summary: 'Создать новый контейнер таблиц' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createTableContainer() {
    return this.tableContainersService.createTableContainer();
  }

  @ApiOperation({
    summary:
      'Копировать таблицу по id и добавить ее в список побочных таблиц контейнера',
  })
  @HttpCode(HttpStatus.CREATED)
  @Put('/copy-table')
  copyTable(@Body() dto: CopyTableDto) {
    return this.tableContainersService.copyTable(dto);
  }

  @ApiOperation({ summary: 'Удалить контейнер таблиц по id' })
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteTableContainerById(@Param('id') id: number) {
    await this.tableContainersService.deleteTableContainerById(id);
  }
}
