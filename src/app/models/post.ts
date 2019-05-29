import { User } from './user';

export class CreatePost {
    id: string;
    authorid: string;
    visibility: string = 'friends';
    content: string;
    date: Date;
}

export class Post {
    id: string;
    author: User;
    visibility: string = 'friends';
    content: string;
    date: Date;
}
