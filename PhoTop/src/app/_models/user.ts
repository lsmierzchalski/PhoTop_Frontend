export * from './user';

export class User {
    user_id: number;
    login: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    avatar: string;
    description: string;
    visibility: boolean;
    ban_on_adding_photos: boolean;
    ban_to_rate: boolean;
    ban_account: boolean;
    moderator: boolean;
    date_created_on: Date;
    date_last_login: Date;
    ip_address_last_login: Date;
}
