import Mock from "mockjs";

Mock.mock("/api/test", "get", () => {
  return {
    code: 0,
    msg: "success",
    data: {
      name: `zhangsan${Mock.Random.integer(1, 1000)}`,
    },
  };
});
