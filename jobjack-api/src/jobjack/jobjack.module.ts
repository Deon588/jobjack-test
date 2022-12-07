import { Module } from '@nestjs/common';
import { JobjackController } from './jobjack.controller';
import { JobjackService } from './jobjack.service';

@Module({
  controllers: [JobjackController],
  imports: [],
  providers: [
    JobjackService],
})
export class JobjackModule { }
