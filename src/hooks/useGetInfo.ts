import { useState, useEffect } from "react";

// 获取异步信息
function getInfo(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now().toString());
    }, 1500);
  });
}

const useGetInfo = () => {
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getInfo().then((res) => {
      setInfo(res);
      setLoading(true);
    });
  }, []);

  return { info, loading };
};

export default useGetInfo;
