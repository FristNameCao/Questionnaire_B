import axios, { ResDataType } from "./ajax";

// 问卷统计页面
export const getQuestionStatService = (
  quesgionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> =>
  axios.get(`/api/stat/${quesgionId}`, { params: opt });

// 获取组件统计数据汇总

export const getComponentStatService = (
  quesgionId: string,
  componentId: string,
): Promise<ResDataType> => axios.get(`/api/stat/${quesgionId}/${componentId}`);
