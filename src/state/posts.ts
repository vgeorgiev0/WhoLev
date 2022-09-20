import { atom, selector, selectorFamily } from 'recoil';
import { Post } from '../models';

export const postsAtom = atom<Post[]>({
  key: 'postsAtom',
  default: []
})

