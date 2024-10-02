import React from 'react'

const Footer = ({progress}) => {
    return (
        <footer className={`bg-black text-white py-1 w-full ${progress !== 100 && "fixed z-20 bottom-0"}`}>
            <div className="container mx-auto text-center">
                <p>&copy; 2024 NewsMonkey All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
