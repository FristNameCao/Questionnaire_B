import { QuestionListData, SearchOption } from "../types/list";
import axios, { ResDataType } from "./ajax";

export const getQuestionService = (id: string): Promise<ResDataType> =>
  axios.get(`/api/question/${id}`);

export const createQuestionService = (): Promise<ResDataType> =>
  axios.post("/api/question/");

export const getQuestionListService = (
  opt: Partial<SearchOption> = {},
): Promise<QuestionListData> => axios.get(`/api/question/`, { params: opt });
