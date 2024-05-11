import React, {useState} from 'react'
import Navbar from './components2/Navbar';
import News3 from './components2/News3'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Footer from './components2/Footer';

const App = ()=>{
    
    const [progress, setProgress] = useState(0);
  
    const [country, setCountry] = useState('us');
    // const [country, setCountry] = useState("in");

    const ApiKey = process.env.REACT_APP_NEW_API;

    return (
        <div className='min-w-[375px]'>
            <Router>
                <LoadingBar
                    color='#f11946'
                    height={3}
                    progress={progress}
                />
                <Navbar setCountry={setCountry} country={country}/>
                <Routes>
                    <Route exact path="/" element={<News3 setProgress={setProgress} key="general" country={country} category="general" apikey={ApiKey}/>} />
                    <Route exact path="/business" element={<News3 setProgress={setProgress} key="business" country={country} category="business"  apikey={ApiKey}/>} />
                    <Route exact path="/entertainment" element={<News3 setProgress={setProgress} key="entertainment" country={country} category="entertainment"  apikey={ApiKey}/>} />
                    <Route exact path="/health" element={<News3 setProgress={setProgress} key="health" country={country} category="health"  apikey={ApiKey}/>} />
                    <Route exact path="/science" element={<News3 setProgress={setProgress} key="science" country={country} category="science"  apikey={ApiKey}/>} />
                    <Route exact path="/sports" element={<News3 setProgress={setProgress} key="sports" country={country} category="sports"  apikey={ApiKey}/>} />
                    <Route exact path="/technology" element={<News3 setProgress={setProgress} key="technology" country={country} category="technology"  apikey={ApiKey}/>} />
                </Routes>
                <Footer/>
            </Router>
        </div>
    )
}

export default App;
