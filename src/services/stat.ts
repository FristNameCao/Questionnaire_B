import axios, { ResDataType } from "./ajax";

// 问卷统计页面
export const getQuestionStatService = (
  quesgionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> =>
  axios.get(`/api/stat/${quesgionId}`, { params: opt });
