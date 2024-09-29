import React from 'react'
import { Link} from "react-router-dom";
import MonkeyLogo from '../assets/monkeyLogo.png'
// import { FiLogIn } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import MenuSlider from './MenuSlider';

const Navbar = ()=>{

    const {user} = useSelector((state)=> state.auth);

    const ChangeTitle = (title)=>{
        document.title = `NewsMonkey - ${title}`;
    }

    // function ToggleHide(){
    //     let menu = document.getElementById('menu');
    //     let cross = document.getElementById('cross');
    //     let hamburger = document.getElementById('hamburger');
        
    //     if(menu.hasAttribute('hidden')){
    //         menu.removeAttribute('hidden');
    //         cross.removeAttribute('hidden');
    //         hamburger.setAttribute('hidden', true);
    //     }
    //     else{
    //         menu.setAttribute('hidden', true);
    //         cross.setAttribute('hidden', true);
    //         hamburger.removeAttribute('hidden');
    //     }
    // }

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
                                <div className='border-2 border-white hover:bg-gray-800 active:bg-gray-700 p-1 text-white cursor-pointer rounded-xl text-2xl mx-3'>
                                    <Link to="/profile"> <img src={user.image} alt="U" className='h-8 w-8 rounded-lg' /></Link> 
                                </div>
                            ):(
                                <div className='border-2 border-white p-1 hover:bg-gray-800 active:bg-gray-700 cursor-pointer rounded-lg text-2xl mx-3'>
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
