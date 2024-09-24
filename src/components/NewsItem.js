import React from 'react'

const NewsItem = (props)=>{
    
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
        <div className="w-80 min-w-[20rem] h-min bg-white border border-gray-200 rounded-lg shadow m-2 md:hover:scale-105 transition-all ease-in-out duration-300">
            <div className='flex justify-end'>
                <span className="px-1 text-xs absolute font-bold -translate-y-3 text-white bg-red-500 border-2 border-white rounded-full">{source}</span>
            </div>
            <img className="rounded-t-lg" src={imageUrl} alt="" />
            <div className="p-5"> 
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{title}</h5>
                <p className="mb-3 font-normal text-gray-700"> {description} </p>
                <p className="mb-3 font-normal text-gray-700"><small>By {author} on {new Date(date).toGMTString()}</small></p>
                {/* Above we first made a Date Object with the given date and then used toGMTString to print GMT style date*/}
                <a href={newsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"> Read more <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                </a>
            </div>
        </div>
        
    );
    
}

export default NewsItem;
