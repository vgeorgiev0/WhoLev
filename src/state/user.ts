import { atom, selector, selectorFamily } from 'recoil';
import { User } from '../models';

export const subAtom = atom<string | undefined>({
  key: 'subAtom',
  default: ''
})

export const dbUserAtom = atom<User | undefined>({
  key: 'userAtom',
  default: undefined,
})