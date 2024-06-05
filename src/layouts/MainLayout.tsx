import { Layout, Spin } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
const MainLayout: FC = () => {
  const { Header, Footer, Content } = Layout;
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <Layout>
      <Header className={styled.header}>
        <div className={styled.left}>
          <Logo />
        </div>
        <div className={styled.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styled.main}>
        <Content>
          {waitingUserData ? (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styled.footer}>
        问卷调查 &copy; 2023-present. Created by 曹志
      </Footer>
    </Layout>
  );
};
export default MainLayout;
