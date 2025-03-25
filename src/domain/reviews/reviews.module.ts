import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { DatabaseModule } from 'src/database/databas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

@Module({
  imports: [DatabaseModule,TypeOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
