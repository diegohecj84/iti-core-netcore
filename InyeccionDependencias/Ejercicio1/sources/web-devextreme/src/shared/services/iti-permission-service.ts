export class ItiPermissionService {

    private internalPermissions: string[] = [];
    public get permissions() {
        return this.internalPermissions;
    }

    public setPermissions(permissions: string[]) {
        this.internalPermissions = permissions || [];
    }

    public hasPermission(permission: string) {
        return this.permissions.findIndex((x) => x === permission) !== -1;
    }
}

export const itiPermissionService = new ItiPermissionService();
