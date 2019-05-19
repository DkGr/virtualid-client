import { User } from './user';

export class Post {
    id: string;
    author: User;
    visibility: string = 'friends';
    content: string;
    date: string;
}
