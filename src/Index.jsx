import React from 'react';
import "tailwindcss/tailwind.css";
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';


const App=()=>{
    return(
        <div>
            <Navbar/>
            <About/>
            <Projects/>
            <Services/>
        </div>
    )
}

export default App