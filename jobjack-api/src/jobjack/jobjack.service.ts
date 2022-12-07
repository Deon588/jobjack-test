import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { DirEntry } from './dto/dir-entry.dto';
import { PaginatedSearchResultDto } from './dto/paginated-search-result-dto';

@Injectable()
export class JobjackService {
    private readonly logger = new Logger('JobjackService');

    async getEntries(search: PaginatedSearchResultDto<DirEntry>): Promise<PaginatedSearchResultDto<DirEntry>> {
        const results: Array<DirEntry> = new Array<DirEntry>();
        try {
            const files = await fs.readdir(search.term);
            search.total = files.length;
            search.results = await this.processFiles(this.paginate(files, search.page, search.size), search.term);
            return search;
        } catch (e) {
            console.log(e);
            if (e instanceof BadRequestException) {
                throw e;
            } else {
                this.logger.error("Error reading directory", e);
                throw new InternalServerErrorException();
            }
        }
    }

    async processFiles(files: string[], basePath: string): Promise<DirEntry[]> {
        return Promise.all<DirEntry>(files.map(async file => {

            const fullPath = basePath === '/' ? `/${file}` : `${basePath}/${file}`;
            try {
                if (!fullPath.startsWith('x')) {
                    const stats = await fs.stat(fullPath);
                    return new DirEntry(fullPath, file, this.formatBytes(stats.size.toString()), this.getUnixFilepermissions(stats.mode), stats.isDirectory())
                }
            } catch (e) {
                this.logger.error(`Unable to get stats for file ${file}`, e);
            }
        }));

    }

    private getUnixFilepermissions(mode: number): string {
        return '0' + (mode & parseInt('777', 8)).toString(8);
    }

    private formatBytes(bytes: string): string {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0, n = parseInt(bytes, 10) || 0;

        while (n >= 1024 && ++l) {
            n = n / 1024;
        }

        return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
    }

    private paginate(files: string[], page: number, size: number): string[] {
        const start = (page * size) - size;
        const end = page * size - 1
        if (start > files.length) {
            throw new BadRequestException("INvalid Pagination request page out of bounds");
        } else {
            return files.slice(start, end);
        }
    }

}
