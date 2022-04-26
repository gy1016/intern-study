import React, { FC } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ITweetInfo } from '@/types/tweet';

interface ICardProps {
  mode: 'text' | 'picture' | 'animation';
  tweet: ITweetInfo;
}

dayjs.locale('zh-cn');

const Card: FC<ICardProps> = (props) => {
  const { tweet, mode, children } = props;

  const formatDate = (date: string): string => {
    const now = dayjs();
    const target = dayjs(date);
    const res = now.diff(target, 'day');
    if (res === 0) return '今天';
    else if (res === 1) return '昨天';
    else return target.format('YYYY-MM-DD');
  };

  return (
    <div className="infinite-scroll-card">
      <div className="card-headr">{formatDate(tweet.date)}</div>
      <div className="card-container">
        {mode === 'text' ? (
          tweet.desc
        ) : (
          <div className={`card-pic-container ${mode === 'animation' ? 'btn-animation' : ''}`}>
            <h3>{tweet.desc}</h3>
            <img src={tweet.pic} alt={tweet.title} />
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
