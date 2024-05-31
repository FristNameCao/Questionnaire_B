import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styled from "./Home.module.scss";
import axios from "axios";
// import "../_mock/index";
const Home: FC = () => {
  // 第三方 hook
  const nav = useNavigate();

  // function handleClick() {
  //   nav({
  //     pathname: "/login",
  //     search: "b=21",
  //   });
  // }
  const { Title, Paragraph } = Typography;
  // return (
  //   <div>
  //     <h1>Home</h1>
  //     <Button onClick={handleClick}>登录</Button>
  //     &nbsp;
  //     <Link to="/register">注册</Link>
  //   </div>
  // );

  useEffect(() => {
    // fetch("/api/test")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
    // mock.js 只能劫持 XMLHttpRequest,不能劫持 fetch
    axios.get("/api/question/100").then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className={styled.container}>
      <div className={styled.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已经累计创建100份，发布问卷90份，收到答卷980份</Paragraph>
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </div>
  );
};
export default Home;
