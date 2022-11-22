import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";
import Sidebar from "./Component/Sidebar";
import Login from "./Auth/Login";
import UserProvider from "./Context/UserContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <div className="col">
                    <Routes>
                        <Route path='/' element={
                            <NeedAuth>
                                <div className="d-flex">
                                    <Sidebar/>
                                    <UserList/>
                                </div>
                            </NeedAuth>
                        }/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
