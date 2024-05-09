import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import black from './assets/black.jpg'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=>{

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, settotalResults] = useState(0);
    const [page, setPage] = useState(1);

    const fetchData = async ()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        props.setProgress(30);

        let parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        
        props.setProgress(100);
    }

    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    }, []);
    
    const fetchMoreData = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
    }

    
    return (
        <div className='md:max-w-[90rem] mx-auto mb-8'>
            <div className='text-center font-bold text-2xl sm:text-4xl my-12'>News Monkey - {props.category==='general'?"Top":props.category[0].toUpperCase() + props.category.slice(1)} Headlines</div>

            {loading && <Spinner/>} {/*This loader is added just to show loading at starting manually */}

            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner/>}
            >
                
            <div className='flex flex-wrap justify-center mx-10'>
                {
                    articles.map((element,index)=>{
                        return <NewsItem key={index} title={element.title} description={element.description?element.description:element.title} imageUrl={element.urlToImage?element.urlToImage: black} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                    })
                }
            </div>
            </InfiniteScroll>

        </div>
    );
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;