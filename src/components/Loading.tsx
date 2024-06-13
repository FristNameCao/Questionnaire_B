import { Spin } from "antd";
import { FC } from "react";

const LoadingElem: FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );
};

export default LoadingElem;
