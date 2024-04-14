import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Game, HomePage, NotFoundPage, AdminPanel, AccountPage} from "./NovaX-TTRPG";
import InvitePage from "./NovaX-TTRPG/Page/InvitePage";

function App()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Gra" element={<Game/>}/>
                <Route path="/UstawieniaKonta" element={<AccountPage/>}/>
                <Route path="/PanelAdmina" element={<AdminPanel/>}/>
                <Route path="/invite/:id" element={<InvitePage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;