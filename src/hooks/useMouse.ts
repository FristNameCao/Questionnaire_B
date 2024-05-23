import { useState, useEffect } from "react";

// 获取鼠标位置
function Mouse() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const MouseHandle = (e: MouseEvent) => {
    setX(e.clientX);
    setY(e.clientY);
  };
  useEffect(() => {
    // 监听鼠标事件
    window.addEventListener("mousemove", MouseHandle);

    // 销毁鼠标事件，组件销毁时，一定要解绑DOM事件，否则可能出现组件内存泄漏问题
    return () => {
      window.removeEventListener("mousemove", MouseHandle);
    };
  }, []);

  return { x, y };
}

export default Mouse;
