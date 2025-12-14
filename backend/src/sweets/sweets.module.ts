import { Module } from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { SweetsController } from './sweets.controller';
import { SweetsRepository } from './sweets.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SweetsController],
  providers: [SweetsService, SweetsRepository],
  exports: [SweetsService],
})
export class SweetsModule {}

