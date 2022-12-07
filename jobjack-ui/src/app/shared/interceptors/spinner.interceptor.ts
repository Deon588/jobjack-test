import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpinnerOverlayService } from '../services/spinner-overlay.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  count = 0;

  constructor(private spinner: SpinnerOverlayService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if (this.count === 0) {
        this.spinner.show();
      }
      this.count++;
      return next.handle(request)
      .pipe(
        finalize(() => {
          this.count--;
          if (this.count === 0) {
            this.spinner.hide();
          }
        }));
      }
    
  }
