import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { SearchComponent } from 'src/app/search/components/search/search.component';

import { SearchRoutingModule } from 'src/app/search/search-routing.module';

import { SearchService } from 'src/app/search/services/search.service';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    SharedModule,
    SearchRoutingModule
  ],
  providers: [
    SearchService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}
  ]
})

export class SearchModule { }
