import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
        <footer className="bg-black text-white py-1 fixed bottom-0 w-full">
            <div className="container mx-auto text-center">
                <p>&copy; 2023 NewsMonkey All rights reserved.</p>
            </div>
        </footer>
    )
  }
}

export default Footer;
