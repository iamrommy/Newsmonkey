import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Footer = ({progress}) => {
    const { loading } = useSelector((state) => state.auth);
    const location = useLocation();
    const isPresentOnloginOrsignUp = location.pathname === '/login' || location.pathname ===  '/signup';
    return (
        <footer className={`bg-black text-white py-1 w-full ${(progress !== 100 || loading) && !(isPresentOnloginOrsignUp && progress !== 100) && "fixed z-20 bottom-0"}`}>
            <div className="container mx-auto text-center">
                <p>&copy; 2024 NewsMonkey All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
