import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CitiesService } from '@/cities/cities.service';
import { CreateCityDto } from '@/cities/dto/create-city.dto';
import { Roles } from '@/common/roles/decorators/roles-auth.decorator';
import { RoleVariant } from '@/common/roles/roles.types';
import { JwtAccessTokenAuthGuard } from '@/auth/guards/jwt-access-token-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CITIES_API_TAG } from '@/cities/cities.constants';

@ApiTags(CITIES_API_TAG)
@Controller(CITIES_API_TAG)
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @ApiOperation({ summary: 'Получить все города' })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  getALllCities() {
    return this.citiesService.getAllCities();
  }

  @ApiOperation({ summary: 'Получить город по id' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getCityById(@Param('id') id) {
    return this.citiesService.getCityById(id);
  }

  @ApiOperation({ summary: 'Создать новый город' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createCity(@Body() dto: CreateCityDto) {
    return this.citiesService.createCity(dto);
  }

  @ApiOperation({ summary: 'Удалить город по id' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteCityById(@Param('id') id: number) {
    await this.citiesService.deleteCityById(id);
  }
}
