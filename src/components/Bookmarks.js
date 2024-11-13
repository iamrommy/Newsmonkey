import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NewsItem from './NewsItem';

const Bookmarks = () => {
  const { user } = useSelector((state) => state.auth);
  const [articles, setArticles] = useState(user?.Bookmarks || []); // Initialize as empty array if undefined

  useEffect(() => {
    setArticles((user?.Bookmarks || []).slice().reverse());
  }, [user]);  

  return (
    <div className='w-full min-h-[90vh] flex flex-col justify-center my-7'>
      <div className='text-center my-7 font-bold text-2xl sm:text-5xl w-full'>Bookmarks</div>
      <div className='flex flex-wrap justify-center gap-4'>
          {
            articles?.length ? (
              articles?.map((element, index) => (
                <NewsItem key={index} title={element.title} description={element.description} date={element.date} author={element.author} imageUrl={element.imageUrl} newsUrl={element.newsUrl} source={element.source}/>
              ))
            ) : (
              <div className='text-2xl'>
                Bookmarks are Empty :(
              </div>
            )
          }
      </div>
    </div>
  );
}

export default Bookmarks;
