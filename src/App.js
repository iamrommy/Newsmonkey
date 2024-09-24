import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News'
import {
    Routes,
    Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import OpenRoute from './components/OpenRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';

const App = ()=>{
    
    const [progress, setProgress] = useState(0);
  
    const [country, setCountry] = useState('us');
    // const [country, setCountry] = useState("in");

    const ApiKey = process.env.REACT_APP_NEWS_API;

    return (
        <div className='min-w-[355px]'>
            <LoadingBar
                color='#f11946'
                height={3}
                progress={progress}
            />
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<News setCountry={setCountry} setProgress={setProgress} key="general" country={country} category="general" apikey={ApiKey}/>} />
                <Route exact path="/business" element={<News setCountry={setCountry} setProgress={setProgress} key="business" country={country} category="business"  apikey={ApiKey}/>} />
                <Route exact path="/entertainment" element={<News setCountry={setCountry} setProgress={setProgress} key="entertainment" country={country} category="entertainment"  apikey={ApiKey}/>} />
                <Route exact path="/health" element={<News setCountry={setCountry} setProgress={setProgress} key="health" country={country} category="health"  apikey={ApiKey}/>} />
                <Route exact path="/science" element={<News setCountry={setCountry} setProgress={setProgress} key="science" country={country} category="science"  apikey={ApiKey}/>} />
                <Route exact path="/sports" element={<News setCountry={setCountry} setProgress={setProgress} key="sports" country={country} category="sports"  apikey={ApiKey}/>} />
                <Route exact path="/technology" element={<News setCountry={setCountry} setProgress={setProgress} key="technology" country={country} category="technology"  apikey={ApiKey}/>} />
                <Route exact path="/login" element={<OpenRoute><Login/></OpenRoute>} />
                <Route exact path="/signup" element={<OpenRoute><Signup/></OpenRoute>} />
                <Route exact path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />
                <Route exact path="/profile" 
                    element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    } />
            </Routes>
            <Footer/>
        </div>
    )
}

export default App;
