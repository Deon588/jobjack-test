import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { DirEntry } from 'src/app/dto/dir-entry.dto';
import { PaginatedSearchResultDto } from '../../dto/paginated-search-result-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private hc: HttpClient) {
  }

  searchDir(search: PaginatedSearchResultDto<DirEntry>): Observable<any> {
    return this.hc.post(`/api/jobjack/search`, search);
  }

}
