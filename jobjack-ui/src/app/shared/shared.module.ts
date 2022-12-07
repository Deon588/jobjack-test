import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { SpinnerOverlayModule } from 'src/app/shared/components/loader/spinner-overlay.module';
import { SpinnerOverlayService } from './services/spinner-overlay.service';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    MatToolbarModule,
    MatProgressSpinnerModule,
    SpinnerOverlayModule
  ],
  entryComponents: [SpinnerOverlayService],
  providers: [],
})

export class SharedModule { }
