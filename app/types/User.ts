export enum Role { USER = 'USER', ADMIN = 'ADMIN'};

export type User = {
    id: number,
    username: string,
    role: Role
}
