import { Module } from '@nestjs/common';
import { EventTypeService } from './event_types.service';
import { EventTypeController } from './event_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from './entities/event_type.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([EventType]), AuthModule, JwtModule],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypesModule {}
