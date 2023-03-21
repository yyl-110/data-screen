/**
 * 数组的数据格式转换拆分-----一维转二维
 * @param {Object} arr 源数组
 * @param {Object} len 二维中一维的长度
 */
const splitArray = (arr: any[], len: number) => {
  let arrLen = arr.length;
  let result = [];
  for (let i = 0; i < arrLen; i += len) {
    result.push(arr.slice(i, i + len));
  }
  return result;
};

export {splitArray};
