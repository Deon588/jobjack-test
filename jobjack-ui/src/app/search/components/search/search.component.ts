import { Component, ViewChild, OnInit, AfterViewChecked, AfterViewInit, ElementRef } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from "rxjs";
import { map, filter, debounceTime, tap, switchMap, distinctUntilChanged } from "rxjs/operators";

import { DirEntry } from 'src/app/dto/dir-entry.dto';
import { PaginatedSearchResultDto } from 'src/app/dto/paginated-search-result-dto';
import { CustomPathValidator } from 'src/app/validation/path-validator';

import { SearchService } from 'src/app/search/services/search.service';
import { DataSource } from '@angular/cdk/collections';
import { DirEntryDatasource } from 'src/app/search/components/dir-entry-datasource/dir-entry-datasource';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
	search: PaginatedSearchResultDto<DirEntry> = new PaginatedSearchResultDto<DirEntry>();
	term = new FormControl();
	dataSource: DirEntryDatasource;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
	@ViewChild('input') input: ElementRef;
	
	displayedColumns: string[] = ['path', 'size', 'name', 'permissions'];

	constructor(private searchService: SearchService) {}

	ngOnInit(): void {
		this.term.valueChanges.pipe(debounceTime(400))
    .pipe(
		distinctUntilChanged(),
    	filter(term => term !== ''),
		tap(term => this.loadDirEntryPage())
	);

		this.dataSource = new DirEntryDatasource(this.searchService);
	}

	ngAfterViewInit() {
this.term.setValidators([Validators.required, Validators.pattern(/^\/[a-zA-Z0-9]*$/)]);

		this.term.valueChanges.pipe(
			debounceTime(150),
			distinctUntilChanged(),
			tap(() => {
				this.paginator.pageIndex = 0;
				this.loadDirEntryPage();
			})
		)
		.subscribe();

        this.paginator.page
            .pipe(
                tap(() => this.loadDirEntryPage())
            )
            .subscribe();

			this.term.setValue('/');
    }

	loadDirEntryPage() {
		if (!this.term.invalid) {
			this.dataSource.searchDir(
	            this.term.value,
            	this.paginator.pageIndex + 1,
            	this.paginator.pageSize);
				console.log("errors", this.term.errors);
				console.log("term", this.term.get('term'));
			}
			console.log("errors", this.term.errors);
		}
	

	openDir(dir: DirEntry) {
		if (dir.isDir) {
			this.term.setValue(dir.path);
		}
	}
}
