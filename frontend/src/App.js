import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Game, HomePage, NotFoundPage, AdminRoom, AccountPage, AdminUser, InviteRoom} from "./NovaX-TTRPG";

function App()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Gra" element={<Game/>}/>
                <Route path="/UstawieniaKonta" element={<AccountPage/>}/>
                <Route path="/AdminPanel/Room" element={<AdminRoom/>}/>
                <Route path="/AdminPanel/User" element={<AdminUser/>}/>
                <Route path="/invite/:id" element={<InviteRoom/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;