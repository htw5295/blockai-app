import { IBlock, IHead, IModelJson } from './const';

interface IBody {
  [key: string]: string;
}

export const fetchApi = async (method: string, url: string, body?: IBody) => {
  const result = {
    ok: false,
    data: undefined,
  };

  try {
    const data = await (
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...(method === 'POST' && {
          body: JSON.stringify(body),
        }),
      })
    ).json();

    result.ok = true;
    result.data = data;
  } catch (e) {
    result.ok = false;
  }

  return result;
};

export const getNewBlockName = (map: any, name: string) => {
  name = `self.${name}_`;
  let i = 1;

  while (map[`${name}${i}`]) {
    i++;
  }

  return `${name}${i}`;
};

export const getBlockList = (modelJson: IModelJson) => {
  const result = [] as IBlock[];
  let cnt = modelJson.head;

  while (cnt.next.length > 0) {
    const cntName = cnt.next[0];
    cnt = modelJson.blockMap[cntName] as IBlock;
    result.push({
      ...cnt,
    } as IBlock);
  }

  return result;
};

export const unLinkBlock = (target: IBlock, modelJson: IModelJson) => {
  const newModelJson = { ...modelJson };
  const newBlockMap = { ...modelJson.blockMap };
  const targetPrevName = target.prev[0];

  if (targetPrevName === 'Head') {
    newModelJson.head = {
      ...newModelJson.head,
      next: target.next,
    };
  } else {
    const newTargetPrev = {
      ...newBlockMap[targetPrevName],
      next: target.next,
    };
    newBlockMap[targetPrevName] = newTargetPrev;
  }

  target.next.forEach((targetNextName) => {
    const newTargetNext = {
      ...newBlockMap[targetNextName],
      prev: target.prev,
    };
    console.log(newTargetNext);
    newBlockMap[targetNextName] = newTargetNext;
  });

  delete newBlockMap[target.name];
  newModelJson.blockMap = newBlockMap;

  return newModelJson;
};

export const linkBlock = (
  dragBlock: IBlock,
  target: IBlock | IHead,
  modelJson: IModelJson
) => {
  let newModelJson = { ...modelJson };
  let newBlockMap = { ...newModelJson.blockMap };
  if (dragBlock.active) {
    newModelJson = unLinkBlock(dragBlock, newModelJson);
    newBlockMap = newModelJson.blockMap;
    target = newBlockMap[target.name];
  }

  const newDragBlockName = dragBlock.active
    ? dragBlock.name
    : getNewBlockName(
        modelJson.blockMap,
        dragBlock.originName ?? dragBlock.name
      );
  const newDragBlock = {
    ...dragBlock,
    prev: [target.name],
    next: target.next,
    originName: dragBlock.originName ?? dragBlock.name,
    name: newDragBlockName,
  };

  target.next.forEach((targetNextName) => {
    const newTargetNext = {
      ...newBlockMap[targetNextName],
      prev: [newDragBlockName],
    };
    newBlockMap[targetNextName] = newTargetNext;
  });

  const newTarget = {
    ...target,
    next: [newDragBlockName],
  };

  newBlockMap[newDragBlock.name] = newDragBlock;

  if (newTarget.name === 'Head') {
    newModelJson.head = newTarget;
  } else {
    newBlockMap[newTarget.name] = newTarget as IBlock;
  }

  newModelJson.blockMap = newBlockMap;

  return newModelJson;
};
