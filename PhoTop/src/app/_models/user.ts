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
    visibility: string;
    ban_on_adding_photos: string;
    ban_to_rate: string;
    ban_account: string;
    moderator: string;
    dateCreatedOn: string;
    dateLastLogin: string;
    token: string;
}
