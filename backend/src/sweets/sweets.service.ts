import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SweetsRepository } from './sweets.repository';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';
import { SearchSweetsDto } from './dto/search-sweets.dto';

@Injectable()
export class SweetsService {
  constructor(private readonly sweetsRepository: SweetsRepository) {}

  async create(createSweetDto: CreateSweetDto) {
    return this.sweetsRepository.create({
      name: createSweetDto.name,
      category: createSweetDto.category,
      price: createSweetDto.price,
      quantity: createSweetDto.quantity,
    });
  }

  async findAll() {
    return this.sweetsRepository.findAll();
  }

  async findOne(id: string) {
    const sweet = await this.sweetsRepository.findById(id);
    if (!sweet) {
      throw new NotFoundException(`Sweet with ID ${id} not found`);
    }
    return sweet;
  }

  async search(searchDto: SearchSweetsDto) {
    return this.sweetsRepository.search({
      name: searchDto.name,
      category: searchDto.category,
      minPrice: searchDto.minPrice,
      maxPrice: searchDto.maxPrice,
    });
  }

  async update(id: string, updateSweetDto: UpdateSweetDto) {
    await this.findOne(id); // Check if exists
    return this.sweetsRepository.update(id, updateSweetDto);
  }

  async remove(id: string) {
    await this.findOne(id); // Check if exists
    await this.sweetsRepository.delete(id);
  }

  async purchase(id: string) {
    const sweet = await this.findOne(id);
    
    if (sweet.quantity === 0) {
      throw new BadRequestException('Sweet is out of stock');
    }

    return this.sweetsRepository.purchase(id);
  }

  async restock(id: string, quantity: number) {
    await this.findOne(id); // Check if exists
    return this.sweetsRepository.restock(id, quantity);
  }
}

