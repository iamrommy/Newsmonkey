import React from 'react'
import { Link} from "react-router-dom";
import MonkeyLogo from '../assets/monkeyLogo.png'
import { FiLogIn } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";

const Navbar = ()=>{

    const {user} = useSelector((state)=> state.auth);

    const ChangeTitle = (title)=>{
        document.title = `NewsMonkey - ${title}`;
    }

    function ToggleHide(){
        let menu = document.getElementById('menu');
        let cross = document.getElementById('cross');
        let hamburger = document.getElementById('hamburger');
        
        if(menu.hasAttribute('hidden')){
            menu.removeAttribute('hidden');
            cross.removeAttribute('hidden');
            hamburger.setAttribute('hidden', true);
        }
        else{
            menu.setAttribute('hidden', true);
            cross.setAttribute('hidden', true);
            hamburger.removeAttribute('hidden');
        }
    }

    return (
        <nav className="bg-black text-white sticky top-0 z-20">
            <div className="md:max-w-7xl md:mx-auto flex items-center justify-between h-16">
                <div className="flex items-center justify-between w-full">
                    <div className="hamburger pl-3 inline-block cursor-pointer lg:hidden" onClick={ToggleHide}>
                        <div id="hamburger" className="border border-white p-1">
                            <div className="line h-1 w-7 bg-white my-1"></div>
                            <div className="line h-1 w-7 bg-white my-1"></div>
                            <div className="line h-1 w-7 bg-white my-1"></div>
                        </div>
                        <div id="cross" hidden>
                            <div className="w-6 h-1 bg-white rotate-45"></div>
                            <div className="w-6 h-1 bg-white -rotate-45 -translate-y-1"></div>
                        </div>
                    </div>

                    <div className='flex mx-2 items-center'>
                        <img className='invert w-[30px] h-auto hidden sm:block' src={MonkeyLogo} alt="NewsMonkey" />
                        <h4 className="text-2xl font-bold px-4">NewsMonkey</h4>
                    </div>

                    <div id='menu' className="mt-[26rem] lg:mt-0 absolute z-10 lg:z-0 lg:static lg:flex lg:space-x-1 w-full lg:w-min" hidden>
                        <Link to='/' className="hover:bg-gray-700 px-3 py-4 lg:py-2 lg:rounded-md text-sm font-medium block text-center bg-gray-800 lg:bg-transparent" onClick={()=>ChangeTitle("Home")}>Home</Link>
                        <Link to='/business' className="hover:bg-gray-700 px-3 py-4 lg:py-2 lg:rounded-md text-sm font-medium block text-center bg-gray-800 lg:bg-transparent" onClick={()=>ChangeTitle("Business")}>Business</Link>
                        <Link to='/entertainment' className="hover:bg-gray-700 px-3 py-4 lg:py-2 lg:rounded-md text-sm font-medium text-center block bg-gray-800 lg:bg-transparent" onClick={()=>ChangeTitle("Entertainment")}>Entertainment</Link>
                        <Link to='/health' className="hover:bg-gray-700 px-3 py-4 lg:py-2 lg:rounded-md text-sm font-medium block text-center bg-gray-800 lg:bg-transparent" onClick={()=>ChangeTitle("Health")}>Health</Link>
                        <Link to='/science' className="hover:bg-gray-700 px-3 py-4 lg:py-2 lg:rounded-md text-sm font-medium block text-center bg-gray-800 lg:bg-transparent" onClick={()=>ChangeTitle("Science")}>Science</Link>
                        <Link to='/sports' className="hover:bg-gray-700 px-3 py-4 lg:py-2 lg:rounded-md text-sm font-medium block text-center bg-gray-800 lg:bg-transparent" onClick={()=>ChangeTitle("Sports")}>Sports</Link>
                        <Link to='/technology' className="hover:bg-gray-700 px-3 py-4 lg:py-2 lg:rounded-md text-sm font-medium block text-center bg-gray-800 lg:bg-transparent" onClick={()=>ChangeTitle("Technology")}>Technology</Link>
                    </div>

                        {
                            user?( 
                                <div className='border-2 border-white p-1 hover:bg-gray-800 active:bg-gray-700 cursor-pointer rounded-lg text-2xl mx-3'>
                                    <Link to="/profile"><FaUser /></Link> 
                                </div>
                            ):(
                                <div className='border-2 border-white p-1 hover:bg-gray-800 active:bg-gray-700 cursor-pointer rounded-lg text-2xl mx-3'>
                                    <Link to="/login" ><FiLogIn/></Link> 
                                </div>
                            )
                        
                        }

                </div>
            </div>
        </nav>
    );
}


export default Navbar;
