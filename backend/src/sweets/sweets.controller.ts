import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';
import { SearchSweetsDto } from './dto/search-sweets.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('sweets')
@UseGuards(JwtAuthGuard)
export class SweetsController {
  constructor(private readonly sweetsService: SweetsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createSweetDto: CreateSweetDto) {
    return this.sweetsService.create(createSweetDto);
  }

  @Get()
  findAll() {
    return this.sweetsService.findAll();
  }

  @Get('search')
  search(@Query() searchDto: SearchSweetsDto) {
    return this.sweetsService.search(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sweetsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateSweetDto: UpdateSweetDto) {
    return this.sweetsService.update(id, updateSweetDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.sweetsService.remove(id);
  }

  @Post(':id/purchase')
  purchase(@Param('id') id: string) {
    return this.sweetsService.purchase(id);
  }

  @Post(':id/restock')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  restock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.sweetsService.restock(id, quantity);
  }
}

