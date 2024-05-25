import axios, { ResDataType } from "./ajax";

export const getQuestionService = (id: string): Promise<ResDataType> =>
  axios.get(`/api/question/${id}`);

export const createQuestionService = (): Promise<ResDataType> =>
  axios.post("/api/question/");
