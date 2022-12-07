import { Module, Logger } from '@nestjs/common';
import { JobjackModule } from './jobjack/jobjack.module';

@Module({
  imports: [
    JobjackModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule { }
