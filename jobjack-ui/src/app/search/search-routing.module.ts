import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchComponent } from 'src/app/search/components/search/search.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'search', component: SearchComponent,
        children: [
          { path: '**', redirectTo: 'search' },
        ],
      },
    ]),
  ],
  exports: [
    RouterModule,
  ],
})

export class SearchRoutingModule { }
