import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { DirEntry } from 'src/app/dto/dir-entry.dto';
import { SearchService } from 'src/app/search/services/search.service';
import { PaginatedSearchResultDto } from 'src/app/dto/paginated-search-result-dto';

export class DirEntryDatasource implements DataSource<DirEntry> {
  private DirEntrysSubject = new BehaviorSubject<DirEntry[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  totalResults: number = 0;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private searchService: SearchService) {}

  connect(collectionViewer: CollectionViewer): Observable<DirEntry[]> {
    return this.DirEntrysSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.DirEntrysSubject.complete();
    this.loadingSubject.complete();
  }

  searchDir(term = '/', page = 1, pageSize = 20) {
let search = new PaginatedSearchResultDto<DirEntry>();
search.term = term;
search.page = page;
search.size = pageSize;    
this.loadingSubject.next(true);
    this.searchService.searchDir(search)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(
      (res: PaginatedSearchResultDto<DirEntry>) => {
        // this.search = res;
        search.results = res.results;
        this.DirEntrysSubject.next(search.results);
        this.totalResults = res.total;
        this.loadingSubject.next(false);
        console.log(res);      
        // this.newResults(res);
      });
    }



}