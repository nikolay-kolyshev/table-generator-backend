import { Test, TestingModule } from '@nestjs/testing';
import { TableContainersController } from './table-containers.controller';

describe('TableContainersController', () => {
  let controller: TableContainersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableContainersController],
    }).compile();

    controller = module.get<TableContainersController>(TableContainersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
