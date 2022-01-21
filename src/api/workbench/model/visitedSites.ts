export interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

/**
 * @description: Get menu return value
 */
export type getVisitedSitesResultModel = GroupItem[];
