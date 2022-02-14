/**
 * 用于jsonArray数据的处理，一般用于树、树形表格的数据，数据格式如下：
 * [
 *  {
 *    key: 'xxx',
 *    otherprop: '',
 *    children: [
 *      {
 *        key: 'xxx',
 *        otherprop: '',
 *        children: [...],
 *      }
 *    ],
 *  },
 *  {
 *    ...
 *  },
 * ]
 */

// 根据key获取对应的数据
export function getRowByKey(jsonArr: Recordable[], key: string) {
  let rowData: Nullable<Recordable> = null;
  if (jsonArr && jsonArr.length > 0) {
    for (let i = 0; i < jsonArr.length; i++) {
      if (jsonArr[i].key == key) {
        rowData = jsonArr[i];
        break;
      } else if (jsonArr[i].children && jsonArr[i].children.length > 0) {
        rowData = getRowByKey(jsonArr[i].children, key);
        if (rowData) {
          break;
        }
      }
    }
  }
  return rowData;
}

// 根据key获取同辈的所有数据
export function siblings(jsonArr: Recordable[], key: string) {
  let rowsData: Recordable[] = [];
  if (jsonArr && jsonArr.length > 0) {
    for (let i = 0; i < jsonArr.length; i++) {
      if (jsonArr[i].key == key) {
        rowsData = jsonArr;
        break;
      } else if (jsonArr[i].children && jsonArr[i].children.length > 0) {
        rowsData = siblings(jsonArr[i].children, key);
        if (rowsData.length > 0) {
          break;
        }
      }
    }
  }
  return rowsData;
}

// 根据key删除对应的数据
export function deleteRowByKey(jsonArr: Recordable[], key: string) {
  let deleted = false;
  if (jsonArr && jsonArr.length > 0) {
    for (let i = 0; i < jsonArr.length; i++) {
      if (jsonArr[i].key == key) {
        jsonArr.splice(i, 1);
        deleted = true;
        break;
      } else if (jsonArr[i].children && jsonArr[i].children.length > 0) {
        const del = deleteRowByKey(jsonArr[i].children, key);
        if (del) {
          break;
        }
      }
    }
  }
  return deleted;
}
