import { Controller, Get, Post, Body, UseFilters, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiBadRequestResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from './interceptor/http-exception.filter';
import { JobjackService } from './jobjack.service';
import { PaginatedSearchResultDto } from './dto/paginated-search-result-dto';
import { DirEntry } from './dto/dir-entry.dto';

@Controller('api/jobjack')
@UseFilters(new HttpExceptionFilter)
export class JobjackController {

  constructor(private jobjackService: JobjackService) { }

  /**
   * Returns a list of directory entries given a base path
   * @param 
   * @returns 
   */
  @ApiBadRequestResponse({ description: 'One of the expected properties wasn\'t set on the Incoming DTO' })
  @ApiUnauthorizedResponse({ description: 'The client cert is invalid.' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong on the server side.' })
  @ApiOkResponse("Success")
  @Post('search')
  async getEntries(@Body() search: PaginatedSearchResultDto<DirEntry>): Promise<any> {
    return await this.jobjackService.getEntries(search);
  }
}
