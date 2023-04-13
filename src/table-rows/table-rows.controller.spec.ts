import { Test, TestingModule } from '@nestjs/testing';
import { TableRowsController } from './table-rows.controller';

describe('TableRowsController', () => {
  let controller: TableRowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableRowsController],
    }).compile();

    controller = module.get<TableRowsController>(TableRowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
