import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Footer = ({progress}) => {
    const { loading } = useSelector((state) => state.auth);
    const location = useLocation();
    const pathsToCheck = ['/login', '/signup', '/profile'];
    const isPresentOnPage = pathsToCheck.includes(location.pathname);
    return (
        <footer className={`bg-black text-white py-1 w-full ${(progress !== 100 || loading) && !(isPresentOnPage && progress !== 100 && !loading) && "fixed z-20 bottom-0"}`}>
            <div className="container mx-auto text-center">
                <p>&copy; 2024 NewsMonkey All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
