import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule,
    MatProgressSpinnerModule],
  declarations: [SpinnerOverlayComponent],
  entryComponents: [SpinnerOverlayComponent],
  providers: [SpinnerOverlayService],
  exports: []
})
export class SpinnerOverlayModule {}
