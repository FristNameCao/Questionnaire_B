import { useState, useMemo, FC } from "react";

const Memo: FC = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [text, setText] = useState("caozhi");
  console.log("增加count");

  const sum = useMemo(() => {
    console.log("sum1");
    return count + count2; //缓存，只会在触发count, count2依赖时候才会被执行
  }, [count, count2]);

  return (
    <>
      <div>
        <p>{"count：" + count}</p>
        <p>{"count2：" + count2}</p>
        <p>{"sum：" + sum}</p>
        <button onClick={() => setCount(count + 1)}>{"增加count"}</button>
        <button onClick={() => setCount2(count2 + 1)}>{"增加count2"}</button>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </>
  );
};
export default Memo;
