import React, {useState} from 'react'
import Navbar from './components2/Navbar';
// import News3 from './components2/News3'; //If you want infinite scroll (comment this to use News2)
// import News2 from './components2/News2'; //If You want next and previous buttons (To use this replace <News3/> component from <News2/> 
                                                                                    // & uncomment this line)
import News3 from './components2/News3'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    // Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Footer from './components2/Footer';


// This is App2 component which is converted into functional based component from App1 (which was class based component)
//with the help of hooks
//read About Hooks in ../Notes/Hooks.jpg

const App = ()=>{
    
    const [progress, setProgress] = useState(0);
    let pageSize = 12;
    // const [pageSize, setPageSize] = useState(12);
    let country = "us";
    // const [country, setCountry] = useState("in");

    //These api keys are loaded from local environment variables or .env.local file. variables that are started from REACT_APP_ can be accessed
    //anywhere in a react app. Note that whenever changes are made in environment variables file, you have to restart react app to load changes
    // const ApiKey = process.env.REACT_APP_NEWS_API_1;
    // const ApiKey = process.env.REACT_APP_NEWS_API_2;
    // const ApiKey = process.env.REACT_APP_NEWS_API_3;
    const ApiKey = "f449dfc74d1081b0ebe1d4885e00f226";
    console.log(ApiKey)

    return (
        
        <Router>
            <LoadingBar
                color='#f11946'
                height={3}
                progress={progress}
            />
            <Navbar />
            <Routes>
                <Route exact path="/" element={<News3 setProgress={setProgress} key="general" pageSize={pageSize} country={country} category="general" apikey={ApiKey}/>} />
                <Route exact path="/business" element={<News3 setProgress={setProgress} key="business" pageSize={pageSize} country={country} category="business"  apikey={ApiKey}/>} />
                <Route exact path="/entertainment" element={<News3 setProgress={setProgress} key="entertainment" pageSize={pageSize} country={country} category="entertainment"  apikey={ApiKey}/>} />
                <Route exact path="/health" element={<News3 setProgress={setProgress} key="health" pageSize={pageSize} country={country} category="health"  apikey={ApiKey}/>} />
                <Route exact path="/science" element={<News3 setProgress={setProgress} key="science" pageSize={pageSize} country={country} category="science"  apikey={ApiKey}/>} />
                <Route exact path="/sports" element={<News3 setProgress={setProgress} key="sports" pageSize={pageSize} country={country} category="sports"  apikey={ApiKey}/>} />
                <Route exact path="/technology" element={<News3 setProgress={setProgress} key="technology" pageSize={pageSize} country={country} category="technology"  apikey={ApiKey}/>} />
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;