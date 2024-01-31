import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Game, HomePage, NotFoundPage} from "./Page";

function App()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Gra" element={<Game/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
