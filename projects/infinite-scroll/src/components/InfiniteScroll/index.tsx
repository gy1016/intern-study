import React, { FC, useEffect, useRef, useState } from 'react';
import Card from './Card';
import { ITweetInfo } from '@/types/tweet';
import { useDebounce } from '@/hooks';
import { getTweetList } from '@/api/tweet';

interface IInfiniteScroll {
  mode: 'text' | 'picture' | 'animation';
  limit: number;
  width: number | string;
}

const InfiniteScroll: FC<IInfiniteScroll> = (props) => {
  const { mode, children, width } = props;
  const infiniteRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(props.limit);
  const [tweetList, setTweetList] = useState<any>([]);

  const page = useRef(1);
  const count = useRef(0);

  const loadNewList = () => {
    getTweetList({ page: page.current, limit }).then((res) => {
      // 这里之所以写.rows是因为后端还返回了计数
      // 如果要将其封装到组件库里，这里需要考量
      // 之所以也返回了count，是想判断是否为空的
      setTweetList((pre: ITweetInfo[]) => [...pre, ...res.data.rows]);
      // setTweetList([...tweetList, ...res.data.rows]);
      count.current = res.data.count;
      // 解决当前limit没有达到出现滚动条的问题
      if ((infiniteRef.current!.lastChild as HTMLDivElement).offsetTop < infiniteRef.current!.offsetHeight) {
        page.current++;
        loadNewList();
      }
    });
  };

  useEffect(() => {
    console.log('hahaha');
    loadNewList();
  }, []);

  const check = () => {
    const tmp = infiniteRef.current;
    const distance = tmp!.scrollHeight - tmp!.scrollTop - tmp!.clientHeight;

    // 这就有一个问题，如果服务器没数据了，下来还要继续请求吗
    // 肯定需要一次额外请求，得到返回结果为空，进而推断出没有新的数据
    console.log(page.current);
    if (distance <= 200 && ++page.current <= Math.ceil(count.current / limit)) {
      console.log('快到底了！');
      loadNewList();
    }
  };

  return (
    <div
      className="infinite-scroll"
      onScroll={useDebounce(check)}
      ref={infiniteRef}
      style={{ width: `${parseInt(width.toString(), 10)}px` }}
    >
      {tweetList.length
        ? (tweetList as ITweetInfo[]).map((tweet) => (
            <Card key={tweet.id} tweet={tweet} mode={mode} children={children} />
          ))
        : 'Loading...'}
    </div>
  );
};

export default InfiniteScroll;
