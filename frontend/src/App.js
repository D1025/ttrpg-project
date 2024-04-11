import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Game, HomePage, NotFoundPage, AdminPanel, AccountPage} from "./NovaX-TTRPG";

function App()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Gra" element={<Game/>}/>
                <Route path="/UstawieniaKonta" element={<AccountPage/>}/>
                <Route path="/PanelAdmina" element={<AdminPanel/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;