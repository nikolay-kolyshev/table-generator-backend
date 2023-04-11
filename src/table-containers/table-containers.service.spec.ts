import { Test, TestingModule } from '@nestjs/testing';
import { TableContainersService } from './table-containers.service';

describe('TableContainersService', () => {
  let service: TableContainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableContainersService],
    }).compile();

    service = module.get<TableContainersService>(TableContainersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
