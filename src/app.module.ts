import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [DatabaseModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
