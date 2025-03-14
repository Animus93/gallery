import {Post} from './post.interface';

export interface User {
  id?: number;
  login?: string;
  firstName: string;
  lastName?: string;
  password?: string;
  roles: string[];
  isActive?: boolean;
  posts: Post[]
}
