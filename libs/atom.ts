import { atom } from 'recoil';
import { IBlock, IModelJson, IRightClick, IUser } from './const';

export const userState = atom<IUser | undefined>({
  key: 'user',
  default: undefined,
});

export const dragBlockState = atom<IBlock | undefined>({
  key: 'dragBlock',
  default: undefined,
});

export const modelJsonState = atom<IModelJson>({
  key: 'modelJson',
  default: {
    pos: {
      x: 0,
      y: 0,
    },
    head: {
      name: 'Head',
      next: [],
    },
    blockMap: {},
  },
});

export const rightClickState = atom<IRightClick | undefined>({
  key: 'rightClick',
  default: undefined,
});
