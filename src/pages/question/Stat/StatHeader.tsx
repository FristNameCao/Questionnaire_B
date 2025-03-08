import { FC, useMemo, useRef } from "react";
import styled from "./StatHeader.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Input,
  InputRef,
  Popover,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import QRCode from "qrcode.react";

const { Title } = Typography;
const StatHeader: FC = () => {
  const nav = useNavigate();
  const { title, isPublished } = useGetPageInfo();
  const { id } = useParams();

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null);
  function copy() {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); // 选中input内容
    document.execCommand("copy"); //  拷贝选中内容
    message.success("拷贝成功");
  }

  // function genLinkAndQRCodeElem() {
  //   if (!isPublished) return;
  //   // 拼接url，需要参考c端的规则
  //   // const url = `http://localhost:3000/question/stat/${id}`;
  //   const url = `${window.location.origin}/question/stat/${id}`;

  //   // 定义二维码组件
  //   const QRCcodeElem = (
  //     <div style={{ textAlign: "center" }}>
  //       {/* 二维码组件 npm i qrcode.react  */}
  //       <QRCode value={url} size={150} />
  //     </div>
  //   );

  //   return (
  //     <Space>
  //       <Input value={url} style={{ width: 300 }} ref={urlInputRef} />
  //       <Tooltip title="拷贝链接">
  //         <Button onClick={copy} icon={<CopyOutlined />}>
  //           复制
  //         </Button>
  //       </Tooltip>
  //       <Popover content={QRCcodeElem}>
  //         <Button type="primary" icon={<QrcodeOutlined />}>
  //           {"生成二维码"}
  //         </Button>
  //       </Popover>
  //     </Space>
  //   );
  // }

  // 富文本编辑器， excel，ppt工具这些性能大可以考虑用useMemo，因为useMemo可以缓存减少反复执行，可以提升性能
  // 使用useMemo 缓存生成二维码，如果依赖性经常变化就没必要使用useMemo，因为这样会影响性能
  const genLinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;
    // 拼接url，需要参考c端的规则
    const url = `http://localhost:3000/question/stat/${id}`;
    // const url = `${window.location.origin}/question/stat/${id}`;

    // 定义二维码组件
    const QRCcodeElem = (
      <div style={{ textAlign: "center" }}>
        {/* 二维码组件 npm i qrcode.react  */}
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: 300 }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button onClick={copy} icon={<CopyOutlined />}>
            复制
          </Button>
        </Tooltip>
        <Popover content={QRCcodeElem}>
          <Button type="primary" icon={<QrcodeOutlined />}>
            {"生成二维码"}
          </Button>
        </Popover>
      </Space>
    );
  }, [isPublished, id]);

  return (
    <div className={styled["header-wrapper"]}>
      <div className={styled.header}>
        <div className={styled.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              {"返回"}
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styled.main}>{genLinkAndQRCodeElem}</div>
        <div className={styled.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            {"编辑"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
