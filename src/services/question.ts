import { QuestionListData, SearchOption } from "../types/list";
import axios, { ResDataType } from "./ajax";

// 获取单个问卷详情
export const getQuestionService = (id: string): Promise<ResDataType> =>
  axios.get(`/api/question/${id}`);
// 创建问卷
export const createQuestionService = (): Promise<ResDataType> =>
  axios.post("/api/question/");

// 获取问卷列表
export const getQuestionListService = (
  opt: Partial<SearchOption> = {},
): Promise<QuestionListData> => axios.get(`/api/question/`, { params: opt });

// 更新
export const updateQuestionService = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any },
): Promise<ResDataType> => axios.patch(`/api/question/${id}`, data);

// 复制
export const duplicateQuestionService = (id: string): Promise<ResDataType> =>
  axios.post(`/api/question/duplicata/${id}`);
export const deleteQuestionService = (
  id: string | string[],
): Promise<ResDataType> => axios.delete(`/api/question/${id}`);
