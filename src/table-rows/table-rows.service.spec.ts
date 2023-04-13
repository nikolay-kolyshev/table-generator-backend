import { Test, TestingModule } from '@nestjs/testing';
import { TableRowsService } from './table-rows.service';

describe('TableRowsService', () => {
  let service: TableRowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableRowsService],
    }).compile();

    service = module.get<TableRowsService>(TableRowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
