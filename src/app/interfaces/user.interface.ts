import {Post} from './post.interface';

export interface User {
  avatar: File | null;
  id?: number;
  login?: string;
  firstName: string;
  lastName?: string;
  password?: string;
  roles: string[];
  isActive?: boolean;
  lastOnlineAt: Date;
  posts: Post[]
}
