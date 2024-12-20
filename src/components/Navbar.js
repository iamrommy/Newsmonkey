import React from 'react'
import { Link} from "react-router-dom";
import MonkeyLogo from '../assets/monkeyLogo.png'
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import MenuSlider from './MenuSlider';
import { FaBookmark } from "react-icons/fa";

const Navbar = ()=>{

    const {user} = useSelector((state)=> state.auth);

    const ChangeTitle = (title)=>{
        document.title = `NewsMonkey - ${title}`;
    }

    return (
        <nav className="bg-black text-white sticky top-0 z-20">
            <div className="md:max-w-7xl md:mx-auto flex items-center justify-between h-16">
                <div className="flex items-center justify-between w-full ">
                    <MenuSlider/>

                    <div className='flex mx-2 items-center'>
                        <img className='invert w-[30px] h-auto hidden sm:block' src={MonkeyLogo} alt="NewsMonkey" />
                        <h4 className="text-2xl font-bold px-4">NewsMonkey</h4>
                    </div>

                    <div className="hidden lg:flex space-x-1 w-min">
                        <Link to='/' className="hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-center" onClick={()=>ChangeTitle("Home")}>Home</Link>
                        <Link to='/business' className="hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-center" onClick={()=>ChangeTitle("Business")}>Business</Link>
                        <Link to='/entertainment' className="hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-center" onClick={()=>ChangeTitle("Entertainment")}>Entertainment</Link>
                        <Link to='/health' className="hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-center" onClick={()=>ChangeTitle("Health")}>Health</Link>
                        <Link to='/science' className="hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-center" onClick={()=>ChangeTitle("Science")}>Science</Link>
                        <Link to='/sports' className="hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-center" onClick={()=>ChangeTitle("Sports")}>Sports</Link>
                        <Link to='/technology' className="hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium text-center" onClick={()=>ChangeTitle("Technology")}>Technology</Link>
                    </div>

                        {
                            user?(
                                <div className='flex items-center justify-center mx-3 gap-3'> 
                                    <div className='border-2 border-white hover:bg-gray-800 active:bg-gray-700 p-1 text-white cursor-pointer rounded-xl'>
                                        <Link to="/profile"> <img src={user.image} alt="U" className='h-6 w-6 rounded-lg' /></Link> 
                                    </div>
                                    <div className='text-xl relative'>
                                        <Link to="/bookmarks"><FaBookmark/></Link>
                                        { user?.Bookmarks.length !==0 && <span className='absolute -top-1 -right-2 bg-red-600 border-white border-[1px] text-xs px-1 font-bold flex justify-center items-center animate-bounce rounded-full text-white'> {user?.Bookmarks.length} </span>
                                        }
                                    </div>
                                </div>
                            ):(
                                <div className='border-2 border-white p-1 hover:bg-gray-800 active:bg-gray-700 cursor-pointer rounded-lg text-xl mx-3'>
                                    <Link to="/login" ><FaUser/></Link> 
                                </div>
                            )
                        
                        }

                </div>
            </div>
        </nav>
    );
}


export default Navbar;
