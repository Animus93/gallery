import {User} from './user.interface';

export interface Post {
  id?: number;
  imgPath?: string;
  text?: string
  authorId: number
  author?: User
}
