export interface IUser {
  id: string;
  email: string;
  recent: {
    id: number;
    title: string;
  }[];
}

export interface IBlock {
  description: string;
  name: string;
  parameters: string[][];
  prefix: string;
  sub_category: string;
  originName: string;
  next: string[];
  prev: string[];
  active: boolean;
}

export interface IHead {
  name: string;
  next: string[];
}

export interface IBlockData {
  [index: string]: IBlock[];
  Activation: IBlock[];
  Layer: IBlock[];
  Loss: IBlock[];
  Operation: IBlock[];
}

export interface IModelJson {
  pos: {
    x: number;
    y: number;
  };
  head: IHead;
  blockMap: {
    [index: string]: IBlock;
  };
}

export interface IRightClick {
  target: string;
  x: number;
  y: number;
}

export enum cookieKey {
  locale = 'locale',
}

export enum modelKey {
  Layer = 'Layer',
  Operation = 'Operation',
  Activation = 'Activation',
  Loss = 'Loss',
  Custom = 'Custom',
}

export const userData = {
  id: 'heekang',
  email: 'hk.shin2271@gmail.com',
  recent: [
    {
      id: 0,
      title: '음성변조 프로젝트',
    },
    {
      id: 1,
      title: '번역 기술 프로젝트',
    },
    {
      id: 2,
      title: '이미지처리 프로젝트',
    },
    {
      id: 3,
      title: '자막 자동생성 프로젝트',
    },
    {
      id: 4,
      title: '알파고 프로젝트',
    },
  ],
} as IUser;
