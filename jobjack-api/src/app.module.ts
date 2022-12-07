import { Module, Logger } from '@nestjs/common';
import { JobjackModule } from './jobjack/jobjack.module';
import { PromModule } from '@digikare/nestjs-prom';

@Module({
  imports: [
    JobjackModule,
    PromModule.forRoot({
      defaultLabels: {
        app: 'Jobjack Assessment',
        version: '1.0.0',
      },
      withHttpMiddleware: {
        enable: true,
      }
    })
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule { }
