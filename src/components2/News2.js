import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import black from './assets/black.jpg'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News2 = (props)=>{

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalResults, settotalResults] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        updateData(page);
        // eslint-disable-next-line 
    }, [])   

    const updateData = async (currpage)=>{
        setLoading(true);
        // props.setProgress(10);
        console.log(currpage);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${currpage}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        // props.setProgress(30);

        let parsedData = await data.json();
        // props.setProgress(70);

        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        
        // props.setProgress(100);
    }
    
    const handlePrevClick = async ()=>{
        updateData(page - 1);
        setPage(page - 1);
    }

    const handleNextClick = async ()=>{
        updateData(page + 1);
        setPage(page + 1);
    }
    
    return (
        <div className='md:max-w-[90rem] mx-auto mb-8'>
            <div className='text-center font-bold text-2xl sm:text-4xl my-12'>News Monkey - {props.category==='general'?"Top":props.category[0].toUpperCase() + props.category.slice(1)} Headlines</div>
            
            <div className='flex justify-around my-8'>
                <button disabled={page<=1} className={"bg-black hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 cursor-pointer py-2 px-4 text-white rounded-lg shadow-md " + (page <=1 ? "invisible":"visible")}  onClick={handlePrevClick}>&larr; Prev</button>
                <div>{page}/{Math.ceil(totalResults/props.pageSize)}</div>
                <button className={"bg-black hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 cursor-pointer py-2 px-4 text-white rounded-lg shadow-md " + ((page + 1 > Math.ceil(totalResults/props.pageSize)) ? "invisible":"visible") }  onClick={handleNextClick}>Next &rarr;</button>
            </div>

            {loading && <Spinner/>}

            <div className='flex flex-wrap justify-center mx-10'>
                {!loading &&
                    articles.map((element)=>{
                        return <NewsItem key={element.url} title={element.title} description={element.description?element.description:element.title} imageUrl={element.urlToImage?element.urlToImage: black} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                    })
                }
            </div>

        </div>
    );
}


News2.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News2.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News2;
