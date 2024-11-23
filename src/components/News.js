import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import black from '../assets/black.jpg'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'

const News = (props)=>{
    // console.log(props.apikey)
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async ()=>{
        props.setProgress(10);
        let url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&lang=en&category=${props.category}&apikey=${props.apikey}`;
        // console.log(url)

        let data = await fetch(url);
        props.setProgress(30);
        // console.log(data)

        let parsedData = await data.json();
        props.setProgress(70);
        // console.log(parsedData)

        setArticles(parsedData.articles);
        setLoading(false);
        
        props.setProgress(100);
    }

    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    }, [props.country]);
    
    return (
        <div className='md:max-w-[90rem] mx-auto mb-8'>
            <div className='mx-auto flex flex-col md:flex-row w-full md:w-[90%] justify-between items-center gap-5 my-12'>
                <div className='text-center font-bold text-2xl sm:text-4xl'>News Monkey - {props.category==='general'?"Top":props.category[0].toUpperCase() + props.category.slice(1)} Headlines</div>
                <Dropdown setCountry={props.setCountry} country={props.country}/>
            </div>
            {loading && <Spinner/>} {/*This loader is added just to show loading at starting manually */}

            {!loading && !articles?.length && 
            <div className='text-xl md:text-5xl flex justify-center items-center w-full h-[calc(100vh-264px)]'>
                Sorry, No Data Found
            </div>          
            }
                
            <div className='flex flex-wrap justify-center mx-10'>
                {
                    articles?.map((element,index)=>{
                        return <NewsItem key={index} title={element.title} description={element.description?element.description:element.title} imageUrl={element.image?element.image: black} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
                    })
                }
            </div>

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
