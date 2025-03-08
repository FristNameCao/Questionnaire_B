import { useRef, FC } from "react";

const Demo: FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  //   useRef用于DOM节点操作，修改ref值不会触发rerender（state）,不同于Vue3中的Ref

  function handleClick() {
    const inputElement = nameRef.current;
    console.log(inputElement);
    if (inputElement) {
      inputElement.select(); // DOM 节点操作，Dom操作API
    }
  }
  return (
    <div>
      <input ref={nameRef} defaultValue={"hello"} />
      <button onClick={handleClick}>选中</button>
    </div>
  );
};

export default Demo;
