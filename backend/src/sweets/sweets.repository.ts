import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Sweet, Prisma } from '@prisma/client';

@Injectable()
export class SweetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SweetCreateInput): Promise<Sweet> {
    return this.prisma.sweet.create({ data });
  }

  async findAll(): Promise<Sweet[]> {
    return this.prisma.sweet.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Sweet | null> {
    return this.prisma.sweet.findUnique({
      where: { id },
    });
  }

  async search(filters: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Sweet[]> {
    const where: Prisma.SweetWhereInput = {};

    if (filters.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }

    if (filters.category) {
      where.category = { contains: filters.category, mode: 'insensitive' };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }

    return this.prisma.sweet.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Prisma.SweetUpdateInput): Promise<Sweet> {
    return this.prisma.sweet.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sweet.delete({
      where: { id },
    });
  }

  async purchase(id: string): Promise<Sweet> {
    return this.prisma.sweet.update({
      where: { id },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }

  async restock(id: string, quantity: number): Promise<Sweet> {
    return this.prisma.sweet.update({
      where: { id },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }
}

