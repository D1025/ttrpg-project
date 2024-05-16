import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import {
    GamePage,
    HomePage,
    NotFoundPage,
    AdminPage_Rooms,
    AccountPage,
    AdminPage_Users,
    InviteRoomPage, YouHaveBeenBaned
} from "./NovaX-TTRPG";

function App()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Gra" element={<GamePage/>}/>
                <Route path="/UstawieniaKonta" element={<AccountPage/>}/>
                <Route path="/Zbanowany" element={<YouHaveBeenBaned/>}/>

                <Route path="/AdminPanel/Room" element={<AdminPage_Rooms/>}/>
                <Route path="/AdminPanel/User" element={<AdminPage_Users/>}/>

                <Route path="/invite/:id" element={<InviteRoomPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;