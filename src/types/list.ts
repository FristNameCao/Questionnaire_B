export interface QuestionList {
  _id: string;
  title: string;
  answerCount?: number;
  isDeleted?: boolean;
  isPublished: boolean;
  isStart: boolean;
  createAt: string;
  updateTime?: string;
}

export interface QuestionListData {
  list: QuestionList[];
  total: number;
}

export type SearchOption = {
  keyWord: string;
  isStar: boolean;
  isDeleted: boolean;
  // page: number;
  // pageSize: number;
};
