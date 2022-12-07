export class DirEntry {
    path: string;
    name: string;
    size: string;
    permissions: string;
    isDir: boolean;

    constructor(path: string, name: string, size: string, permissions: string, isDir: boolean) {
        this.path = path;
        this.name = name;
        this.size = size;
        this.permissions = permissions;
        this.isDir = isDir;
    }
}
