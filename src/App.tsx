import "./App.css";
// import List1 from "./view/list1";
// import Demo from "./view/UseRefDemo";
// import Memo from "./view/UseMemo";
// import Mouse from "./hooks/useMouse";
// import useGetInfo from "./hooks/useGetInfo";
// import StyledComponentsDemo from "./components/StyledComponentsDemo";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "antd/dist/reset.css";
function App() {
  // const { x, y } = Mouse();
  // const { info, loading } = useGetInfo();
  return (
    <RouterProvider router={router}></RouterProvider>
    // <div className="App">
    //   {/* <List1 />是否擦地方
    //    */}
    //   {/* <Demo /> */}
    //   {/* <Memo /> */}
    //   {/* <div>x:{x}</div>
    //   <div>y:{y}</div> */}
    //   {/* <div>{loading ? info : "加载中"}</div> */}
    //   <StyledComponentsDemo />
    // </div>
  );
}

export default App;
