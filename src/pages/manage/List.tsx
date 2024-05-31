/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react";
import QuestionsCard from "../../components/QuestionsCard";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import styled from "./common.module.scss";
import Header from "./components/Header";
import { Empty, Spin } from "antd";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_SIZE_DEFAULT, LIST_SEARCH_PARAM_KEY } from "../../constant";
import { QuestionList } from "../../types/list";
const List: FC = () => {
  useTitle("我的问卷");
  // const [questionList, seQuestionList] = useState<QuestionList[]>([]);

  // const { list = [], total = 0 } = data || {};
  // page为滑动页面初始化
  const [page, setPage] = useState(1);
  const [list, setList] = useState<QuestionList[]>([]); // 全部数据列表，上划加载更多
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false); // 是否已经开始加载(防抖，有延迟时间)
  const haveMoreData = total > list.length; // 有没有更多的、为加载完成的数据

  const [searchParams] = useSearchParams(); //url 参数 虽然没有page pageSize，但是有keyword

  const keyWord = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  useEffect(() => {
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyWord]);
  // 正真加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
        keyWord,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(data) {
        const { list: res = [], total = 0 } = data || {};
        setList(list.concat(res));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  // 触发加载——防抖
  const ref = useRef<HTMLDivElement>(null);
  // getBoundingClientRect 拿到的是距离窗口的距离，意思就是滚动条往下滚动时候bottom值越小，因bottom距离最上边窗口会越近
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = ref.current;
      if (elem == null) return;

      const domReact = elem.getBoundingClientRect();

      if (domReact == null) return;
      const { bottom } = domReact;
      // document.documentElement.clientHeight拿到的是可视区域的高度
      if (bottom < document.documentElement.clientHeight) {
        // 触发加载更多
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );

  // 当页面滚动时候加载，或者url参数（keyword）变化时，触发加载数据
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore); //防抖
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore); // 解绑事件
    };
  }, [haveMoreData]);

  useEffect(() => {
    tryLoadMore(); // 第一次加载，初始化
  }, [searchParams]);

  // 组件是一个函数（执行返回JSX片段），组件初次渲染执行这个函数
  // 任何stete更新，都会执行组建的更新（重新执行函数）
  // useEffect(() => {
  //   seQuestionList(data?.list || []);
  // }, [data]);

  // function handleDelete(_id: string) {
  //   console.log("_id", _id);
  //   // const newQuestionList = questionList.filter((item) => item._id !== _id);
  //   // seQuestionList(newQuestionList);
  //   // seQuestionList(
  //   //   produce((draft) => {
  //   //     draft.splice(
  //   //       draft.findIndex((item) => item._id === _id),
  //   //       1,
  //   //     );
  //   //   }),
  //   // );
  // }

  // function handleAdd() {
  //   seQuestionList(
  //     questionList.concat({
  //       _id: Date.now(),
  //       title: "问卷" + Date.now(),
  //       isPublished: false,
  //     }),
  //   );

  // immer写法可以改变数据
  // seQuestionList(
  //   produce((draft) => {
  //     draft.push({
  //       _id: Date.now().toString(),
  //       title: "问卷" + Date.now(),
  //       isPublished: false,
  //       isStar: false,
  //       createAt: "5月20日13:14",
  //       answerCount: 0,
  //       isDeleted: false,
  //     });
  //   }),
  // );

  // function handlePublish(_id: string) {
  //   console.log("_id", _id);

  //   // const newQuestionList = questionList.map((item) => {
  //   //   if (item._id === _id) {
  //   //     return {
  //   //       ...item,
  //   //       isPublished: true,
  //   //     };
  //   //   }
  //   //   return item;
  //   // });
  //   // seQuestionList(newQuestionList);
  //   // // immer写法
  //   // seQuestionList(
  //   //   produce((draft) => {
  //   //     draft.find((item) => {
  //   //       if (item._id === _id) {
  //   //         item.isPublished = true;
  //   //       }
  //   //     });
  //   //   }),
  //   // );
  // }

  const loadMoreContentElem = () => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (haveMoreData) return <div>LoadMore... 上滑加载更多</div>;
    return <span>开始加载下一页</span>;
  };

  return (
    <>
      <Header title="我的问卷" />
      <div className={styled.content}>
        {list?.length > 0 &&
          list?.map((item) => {
            const { _id } = item;
            return <QuestionsCard key={_id} {...item} />;
          })}
      </div>
      <div className={styled.footer} ref={ref}>
        {loadMoreContentElem()}
      </div>
    </>
  );
};
export default List;
