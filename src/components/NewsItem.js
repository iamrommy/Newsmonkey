import React, { useState, useEffect } from 'react'
import { FaBookmark } from "react-icons/fa";
import { GoBookmarkSlashFill } from "react-icons/go";
import { addToBookmarks, removeFromBookmarks } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NewsItem = (props) => {
    const { title, description, imageUrl, newsUrl, author, date, source } = props;
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?._id && user?.Bookmarks) {
            const isBookmarked = user.Bookmarks.some(bookmark => bookmark.title === title);
            setClicked(isBookmarked);
        }
    }, [user, title]);

    const HandleBookmark = async () => {
        if (user?._id) {
            setLoading(true);
            const article = { title, description, imageUrl, newsUrl, author, date, source };
            if (clicked) {
                await dispatch(removeFromBookmarks(title, user._id));
            } else {
                await dispatch(addToBookmarks(article, user._id));
            }
            setLoading(false);
            setClicked(!clicked);
        } else {
            toast("Login to use Bookmarks");
            navigate('/login');
        }
    }

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
                <div className="flex justify-between items-center">
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"> Read more <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                    </a>
                    <button onClick={HandleBookmark} disabled={loading}>
                        {
                            clicked ? 
                                (<GoBookmarkSlashFill className="text-2xl text-black hover:text-gray-600 active:text-black" />)
                                :
                                (<FaBookmark className="text-xl text-black hover:text-gray-600 active:text-black" />)
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
