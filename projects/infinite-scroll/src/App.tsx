import React, { FC } from 'react';
import InfiniteScroll from '@/components/InfiniteScroll';
import './styles/index.scss';

const App: FC = () => {
  return (
    <div
      id="app"
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 0,
        gap: '1rem',
      }}
    >
      <InfiniteScroll width={350} mode="text" limit={10} />
      <InfiniteScroll width={350} mode="picture" limit={10} children={<button>继续答题</button>} />
      <InfiniteScroll width={350} mode="animation" limit={10} children={<button>继续答题</button>} />
    </div>
  );
};

export default App;
