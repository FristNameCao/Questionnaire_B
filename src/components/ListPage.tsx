import { Pagination } from "antd";
import { FC, useEffect, useState } from "react";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type ProprType = {
  total: number;
};

const ListPage: FC<ProprType> = (props: ProprType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_DEFAULT);

  //   获取url中的page pageSize
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE_DEFAULT;

    setCurrent(page);
    setPageSize(pageSize);
  }, [searchParams]);

  //   page pageSize改变时,跳转页面改变url
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    console.log("pathname", pathname, searchParams.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }
  return (
    <Pagination
      total={total}
      current={current}
      pageSize={pageSize}
      onChange={handlePageChange}
    />
  );
};

export default ListPage;
