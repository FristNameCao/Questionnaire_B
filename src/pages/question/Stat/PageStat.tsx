import { FC, useState } from "react";
import { getQuestionStatService } from "../../../services/stat";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import LoadingElem from "../../../components/Loading";
import { Pagination, Table, Typography } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { STAT_PAGE_SIZ } from "../../../constant";

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const { Title } = Typography;

const PageStat: FC<PropsType> = (props: PropsType) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { id = "" } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZ);
  const [page, setPage] = useState(1);

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatService(id, {
        page,
        pageSize,
      });
      return res;
    },
    {
      refreshDeps: [page, pageSize, id],
      onSuccess(res) {
        const { total, list = [] } = res;
        setList(list);
        setTotal(total);
      },
    },
  );

  const { compontList } = useGetComponentInfo();
  const columns = compontList.map((c) => {
    const { fe_id, title, props = {} } = c;
    const colTitle = props!.title || title;

    return {
      title: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(c.type);
          }}
        >
          <span
            style={{
              color: fe_id === selectedComponentId ? "#1890ff" : "inherit",
            }}
          >
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));

  const TableElem = (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 650 }}
      />
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPageSize(pageSize);
            setPage(page);
          }}
        />
      </div>
    </>
  );

  return (
    <div>
      <Title level={3}>答卷数量:{!loading && total}</Title>
      <div style={{ textAlign: "center" }}>{loading && <LoadingElem />}</div>
      {!loading && TableElem}
    </div>
  );
};

export default PageStat;
