import { Input } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [search, setSearch] = useState<string>("");
  const [searchParams] = useSearchParams();

  //   写完了确定或者回车
  function handleSearch(value: string) {
    if (!value) return;
    nav({
      pathname,
      search: `?${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  function performNavigation() {
    const currentSearch = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    if (!currentSearch) {
      nav({
        pathname,
      });
    }
    setSearch(currentSearch);
  }

  useEffect(() => {
    performNavigation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  //   实时数据
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div>
      <Search
        size="large"
        placeholder="Search"
        allowClear
        value={search}
        onSearch={handleSearch}
        onChange={handleChange}
      />
    </div>
  );
};

export default ListSearch;
